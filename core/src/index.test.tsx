require("@testing-library/jest-dom/extend-expect");

import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Flare, RunFlare } from ".";
import * as F from ".";
import { pipe } from "fp-ts/lib/function";

type MockHandler<A> = jest.Mock<void, [A]>;

function runFlare<A>(flare: Flare<A>): MockHandler<A> {
  const handler = jest.fn<void, [A]>();
  render(<RunFlare flare={flare} handler={handler} />);
  return handler;
}

afterEach(cleanup);

describe("checkbox", () => {
  const initial = true;

  let handler: MockHandler<boolean>, checkbox: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.checkbox({ initial }));
    const maybeCheckbox = screen.getByRole("checkbox");
    if (maybeCheckbox instanceof HTMLInputElement) {
      checkbox = maybeCheckbox;
    }
  });

  it("renders control", () => {
    expect(checkbox).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(checkbox?.checked).toEqual(initial);
  });

  it("triggers handler with initial", () => {
    expect(handler).toHaveBeenCalledWith(initial);
  });

  it("triggers handler on change", () => {
    checkbox && userEvent.click(checkbox);
    expect(handler).toHaveBeenLastCalledWith(!initial);
  });
});

describe("comboBox", () => {
  const initial = "red",
    options = ["blue", "red", "yellow"];

  let handler: MockHandler<typeof options[number]>, comboBox: HTMLSelectElement;

  beforeEach(() => {
    handler = runFlare(F.comboBox({ initial, options }));
    const maybeComboBox = screen.getByRole("combobox");
    if (maybeComboBox instanceof HTMLSelectElement) {
      comboBox = maybeComboBox;
    }
  });

  it("renders a control", () => {
    expect(comboBox).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(comboBox?.value).toEqual(initial);
  });

  it("triggers handler with initial", () => {
    expect(handler).toHaveBeenCalledWith(initial);
  });

  it("renders provided options", () => {
    expect(Array.from(comboBox?.options).map(({ value }) => value)).toEqual(
      options,
    );
  });

  it("triggers handler on change", () => {
    const updated = "blue";
    if (comboBox) {
      userEvent.selectOptions(comboBox, "blue");
    }
    expect(handler).toHaveBeenLastCalledWith(updated);
  });
});

describe("radioGroup", () => {
  const initial = "red",
    options = ["blue", "red", "yellow"];

  let handler: MockHandler<typeof options[number]>, radios: HTMLInputElement[];

  beforeEach(() => {
    handler = runFlare(F.radioGroup({ initial, options }));
    radios = screen
      .getAllByRole("radio")
      .flatMap((x) => (x instanceof HTMLInputElement ? [x] : []));
  });

  it("renders controls", () => {
    expect(radios.length).toEqual(options.length);
  });

  it("renders with initial", () => {
    expect(radios?.find(({ checked }) => checked)?.value).toEqual(initial);
  });

  it("renders provided options", () => {
    expect(radios.map(({ value }) => value)).toEqual(options);
  });

  it("triggers handler with initial", () => {
    expect(handler).toHaveBeenCalledWith(initial);
  });

  it("triggers handler on change", () => {
    const updated = options[(options.indexOf(initial) + 1) % options.length];
    radios
      .filter(({ value }) => value === updated)
      .forEach((radio) => {
        userEvent.click(radio);
      });
    expect(handler).toHaveBeenLastCalledWith(updated);
  });
});

describe("slider", () => {
  const getControl = (): HTMLInputElement | undefined => {
    const element = screen.getByRole("slider");
    if (element instanceof HTMLInputElement) {
      return element;
    }
  };

  describe("given initial only", () => {
    const initial = 5;

    let handler: MockHandler<number>, control: HTMLInputElement | undefined;

    beforeEach(() => {
      handler = runFlare(F.slider({ initial }));
      control = getControl();
    });

    it("renders a control", () => {
      expect(control).toBeTruthy();
    });

    it("renders with initial", () => {
      expect(control?.value).toEqual(initial.toString());
    });

    it("triggers handler with initial", () => {
      expect(handler).toHaveBeenCalledWith(initial);
    });

    it("triggers handler on change", () => {
      const updated = 75;
      if (control) {
        userEvent.clear(control);
        userEvent.type(control, updated.toString());
      }
      expect(handler).toHaveBeenLastCalledWith(updated);
    });
  });

  it("limits selectable range from min", () => {
    const min = 0;
    runFlare(F.slider({ initial: 5, min }));
    expect(getControl()?.min).toEqual(min.toString());
  });

  it("limits selectable range to max", () => {
    const max = 0;
    runFlare(F.slider({ initial: 5, max }));
    expect(getControl()?.max).toEqual(max.toString());
  });

  it("uses step value", () => {
    const step = 2;
    runFlare(F.slider({ initial: 0, step }));
    expect(getControl()?.step).toEqual(step.toString());
  });
});

describe("spinButton", () => {
  const getControl = (): HTMLInputElement | undefined => {
    const element = screen.getByRole("spinbutton");
    if (element instanceof HTMLInputElement) {
      return element;
    }
  };

  describe("given initial only", () => {
    const initial = 5;

    let handler: MockHandler<number>, control: HTMLInputElement | undefined;

    beforeEach(() => {
      handler = runFlare(F.spinButton({ initial }));
      control = getControl();
    });

    it("renders a control", () => {
      expect(control).toBeTruthy();
    });

    it("renders with initial", () => {
      expect(control?.value).toEqual(initial.toString());
    });

    it("triggers handler with initial", () => {
      expect(handler).toHaveBeenCalledWith(initial);
    });

    it("triggers handler on change", () => {
      const updated = 10;
      if (control) {
        userEvent.clear(control);
        userEvent.type(control, updated.toString());
      }
      expect(handler).toHaveBeenLastCalledWith(updated);
    });
  });

  describe("given min", () => {
    const initial = 5,
      min = 0;

    let handler: MockHandler<number>, control: HTMLInputElement | undefined;

    beforeEach(() => {
      handler = runFlare(F.spinButton({ initial, min }));
      control = getControl();
    });

    it("limits selectable range", () => {
      expect(control?.min).toEqual(min.toString());
    });

    it("rejects value less than min", () => {
      if (control) {
        userEvent.clear(control);
        userEvent.type(control, (min - 1).toString());
      }
      expect(handler).toHaveBeenLastCalledWith(initial);
    });
  });

  describe("given max", () => {
    const initial = 5,
      max = 6;

    let handler: MockHandler<number>, control: HTMLInputElement | undefined;

    beforeEach(() => {
      handler = runFlare(F.spinButton({ initial, max }));
      control = getControl();
    });

    it("limits selectable range", () => {
      expect(control?.getAttribute("max")).toEqual(max.toString());
    });

    it("rejects value greater than max", () => {
      if (control) {
        userEvent.clear(control);
        userEvent.type(control, (max + 1).toString());
      }
      expect(handler).toHaveBeenLastCalledWith(initial);
    });
  });

  it("uses step value", () => {
    const step = 3;
    runFlare(F.spinButton({ initial: 0, step }));
    expect(getControl()?.step).toEqual(step.toString());
  });
});

describe("switch_", () => {
  const initial = true;

  let handler: MockHandler<boolean>, switch_: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.switch_({ initial }));
    const maybeSwitch = screen.getByRole("switch");
    if (maybeSwitch instanceof HTMLInputElement) {
      switch_ = maybeSwitch;
    }
  });

  it("renders a control", () => {
    expect(switch_).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(switch_?.checked).toEqual(initial);
  });

  it("triggers handler with initial", () => {
    expect(handler).toHaveBeenCalledWith(initial);
  });

  it("triggers handler on change", () => {
    switch_ && userEvent.click(switch_);
    expect(handler).toHaveBeenLastCalledWith(!initial);
  });
});

describe("textBox", () => {
  const initial = "Foo";

  let handler: MockHandler<string>, textBox: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.textBox({ initial }));
    const maybeTextBox = screen.getByRole("textbox");
    if (maybeTextBox instanceof HTMLInputElement) {
      textBox = maybeTextBox;
    }
  });

  it("renders a control", () => {
    expect(textBox).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(textBox?.value).toEqual(initial);
  });

  it("triggers handler with initial", () => {
    expect(handler).toHaveBeenCalledWith(initial);
  });

  it("triggers handler on change", () => {
    const additional = "Bar";
    if (textBox) {
      userEvent.type(textBox, additional);
    }
    expect(handler).toHaveBeenLastCalledWith(initial + additional);
  });
});

describe("of", () => {
  it("lifts the provided value into a flare", () => {
    const { _tag: tag } = F.of(5);
    expect(tag).toEqual("Flare");
  });
});

describe("map", () => {
  const initial = "Hello",
    f = (s: string) => s.length;

  let handler: MockHandler<number>;

  beforeEach(() => {
    handler = runFlare(pipe(F.textBox({ initial }), F.map(f)));
  });

  it("applies the specified function to the initial value", () => {
    expect(handler).toHaveBeenCalledWith(f(initial));
  });

  it("applies the specified function to changed values", () => {
    const additional = "!";
    const control = screen.getByRole("textbox");
    if (control) {
      userEvent.type(control, additional);
    }
    expect(handler).toHaveBeenLastCalledWith(f(initial + additional));
  });
});

describe("ap", () => {
  it("applies the specified function to initial value", () => {
    const f = (x: number) => x * x;
    const a = 2;
    const handler = runFlare(pipe(F.of(f), F.ap(F.of(a))));
    expect(handler).toHaveBeenCalledWith(f(a));
  });

  it("applies the specified function to changed values", () => {
    const f = (x: number) => x * x;
    const a = 8;
    const handler = runFlare(pipe(F.of(f), F.ap(F.spinButton({ initial: 0 }))));
    const control = screen.getByRole("spinbutton");
    if (control) {
      userEvent.clear(control);
      userEvent.type(control, a.toString());
    }
    expect(handler).toHaveBeenLastCalledWith(f(a));
  });
});

describe("chain", () => {
  const initial = false;
  const checkedValue = "apple banana grape";
  const uncheckedValue = "lemur";
  let handler: MockHandler<string>;

  beforeEach(() => {
    handler = runFlare(
      pipe(
        F.checkbox({ initial }),
        F.chain((x) =>
          x ? F.textBox({ initial: checkedValue }) : F.of(uncheckedValue),
        ),
      ),
    );
  });

  it("passes initial flare value", () => {
    expect(handler).toHaveBeenCalledWith(
      initial ? checkedValue : uncheckedValue,
    );
  });

  it("triggers changes", () => {
    const checkbox = screen.getByRole("checkbox");
    if (checkbox) {
      userEvent.click(checkbox);
    }
    expect(!!screen.queryByRole("textbox")).toEqual(!initial);
    expect(handler).toHaveBeenLastCalledWith(
      initial ? uncheckedValue : checkedValue,
    );
  });
});

describe("ifElse", () => {
  const flareA = F.of("A");
  const flareB = F.of("B");

  it("returns the first flare given true", () => {
    expect(pipe(true, F.ifElse(flareA, flareB))).toEqual(flareA);
  });

  it("returns the first flare given false", () => {
    expect(pipe(false, F.ifElse(flareA, flareB))).toEqual(flareB);
  });
});

describe("match", () => {
  it("returns the flare corresponding to the provided value", () => {
    const flare1 = F.of("A");
    const flare2 = F.of("B");
    const flare3 = F.of(3);

    const match_ = F.match({
      1: flare1,
      two: flare2,
      3: flare3,
    });

    expect(match_(1)).toEqual(flare1);
    expect(match_("two")).toEqual(flare2);
    expect(match_(3)).toEqual(flare3);
  });
});

describe("makeFlare", () => {
  const toggle = F.makeFlare<{ initial: boolean }>(function Toggle({
    onChange,
    value,
  }) {
    const label = value ? "True" : "False";
    return (
      <button
        onClick={() => {
          onChange(!value);
        }}
      >
        {label}
      </button>
    );
  });

  const initial = true;

  let handler: MockHandler<boolean>, control: HTMLElement;

  beforeEach(() => {
    handler = runFlare(toggle({ initial }));
    control = screen.getByRole("button");
  });

  it("renders control", () => {
    expect(control).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(control?.textContent).toEqual(initial ? "True" : "False");
  });

  it("triggers handler with initial", () => {
    expect(handler).toHaveBeenCalledWith(initial);
  });

  it("triggers handler on change", () => {
    if (control) {
      userEvent.click(control);
    }
    expect(handler).toHaveBeenLastCalledWith(!initial);
  });
});

describe("resizableList", () => {
  describe("given initial only", () => {
    const initials = ["X", "Y", "Z"];

    let handler: MockHandler<string[]>, controls: HTMLInputElement[];

    beforeEach(() => {
      handler = runFlare(
        F.resizableList({
          item: F.textBox({ initial: "hello" }),
          initial: initials.map((initial) => F.textBox({ initial })),
        }),
      );
      controls = screen
        .queryAllByRole("textbox")
        .filter((x) => x instanceof HTMLInputElement)
        .map((x) => x as HTMLInputElement);
    });

    it("renders with initial", () => {
      expect(controls.map(({ value }) => value)).toEqual(initials);
    });

    it("triggers handler with initial", () => {
      expect(handler).toHaveBeenCalledWith(initials);
    });

    it("triggers handler on change", () => {
      const change = "A";
      if (controls.length) {
        userEvent.clear(controls[0]);
        userEvent.type(controls[0], change);
      }
      expect(handler).toHaveBeenLastCalledWith(
        [change].concat(initials.slice(1)),
      );
    });
  });

  describe("given minLength exceeding initial", () => {
    const head = "hello";
    const tailItem = "hi";
    const tail = Array(2).fill(tailItem);

    let handler: MockHandler<string[]>, controls: HTMLInputElement[];

    beforeEach(() => {
      handler = runFlare(
        F.resizableList({
          item: F.textBox({ initial: tailItem }),
          initial: [F.textBox({ initial: head })],
          minLength: tail.length + 1,
        }),
      );
      controls = screen
        .queryAllByRole("textbox")
        .filter((x) => x instanceof HTMLInputElement)
        .map((x) => x as HTMLInputElement);
    });

    it("renders with initial and additional items until minLength is reached", () => {
      expect(controls.map(({ value }) => value)).toEqual([head].concat(tail));
    });

    it("triggers handler with initial and additional items until minLength is reached", () => {
      expect(handler).toHaveBeenCalledWith([head].concat(tail));
    });
  });

  describe("given no initial or minLength", () => {
    let handler: MockHandler<string[]>, controls: HTMLElement[];

    beforeEach(() => {
      handler = runFlare(
        F.resizableList({ item: F.textBox({ initial: "hello" }) }),
      );
      controls = screen.queryAllByRole("textbox");
    });

    it("renders empty list", () => {
      expect(controls.length).toEqual(0);
    });

    it("triggers handler with empty list", () => {
      expect(handler).toHaveBeenLastCalledWith([]);
    });
  });

  describe("given a maxLength less than the list of items", () => {
    const initials = ["A", "B", "C"];
    const maxLength = 2;

    let handler: MockHandler<string[]>, controls: HTMLInputElement[];

    beforeEach(() => {
      handler = runFlare(
        F.resizableList({
          item: F.textBox({ initial: "hello" }),
          initial: initials.map((initial) => F.textBox({ initial })),
          maxLength,
        }),
      );
      controls = screen
        .queryAllByRole("textbox")
        .filter((x) => x instanceof HTMLInputElement)
        .map((x) => x as HTMLInputElement);
    });

    it("renders truncated list of controls", () => {
      expect(controls.map(({ value }) => value)).toEqual(
        initials.slice(0, maxLength),
      );
    });

    it("triggers handler with truncated list", () => {
      expect(handler).toHaveBeenCalledWith(initials.slice(0, maxLength));
    });
  });

  describe('when "add" button is clicked on a reference list item', () => {
    const itemInitial = false;
    const initials = [true, true, true];
    const insertionPoint = 1;
    let handler: MockHandler<boolean[]>;

    beforeEach(() => {
      handler = runFlare(
        F.resizableList({
          item: F.checkbox({ initial: itemInitial }),
          initial: initials.map((initial) => F.checkbox({ initial })),
        }),
      );
      const addButtons = screen.getAllByText("+");
      if (addButtons[insertionPoint]) {
        userEvent.click(addButtons[insertionPoint]);
      }
    });

    it("renders an additional list item before the reference list item", () => {
      expect(
        screen
          .getAllByRole("checkbox")
          .map((x) => (x instanceof HTMLInputElement ? x.checked : null)),
      ).toEqual(
        initials
          .slice(0, insertionPoint)
          .concat(itemInitial)
          .concat(initials.slice(insertionPoint)),
      );
    });

    it("triggers handler with an additional list item before the reference list item", () => {
      expect(handler).toHaveBeenLastCalledWith(
        initials
          .slice(0, insertionPoint)
          .concat(itemInitial)
          .concat(initials.slice(insertionPoint)),
      );
    });
  });

  describe('when "remove" button is clicked on a reference list item', () => {
    const initials = [true, false, true, true];
    const removalPoint = 1;
    let handler: MockHandler<boolean[]>;

    beforeEach(() => {
      handler = runFlare(
        F.resizableList({
          item: F.checkbox({ initial: false }),
          initial: initials.map((initial) => F.checkbox({ initial })),
        }),
      );
      const removeButtons = screen.getAllByText("-");
      if (removeButtons[removalPoint]) {
        userEvent.click(removeButtons[removalPoint]);
      }
    });

    it("renders the list without the reference list item", () => {
      expect(
        screen
          .getAllByRole("checkbox")
          .map((x) => (x instanceof HTMLInputElement ? x.checked : null)),
      ).toEqual(
        initials
          .slice(0, removalPoint)
          .concat(initials.slice(removalPoint + 1)),
      );
    });

    it("triggers handler with the list without the reference list item", () => {
      expect(handler).toHaveBeenLastCalledWith(
        initials
          .slice(0, removalPoint)
          .concat(initials.slice(removalPoint + 1)),
      );
    });
  });

  describe('when "add" button is clicked at the end of the list', () => {
    const itemInitial = false;
    const initials = [true, true, true];
    let handler: MockHandler<boolean[]>;

    beforeEach(() => {
      handler = runFlare(
        F.resizableList({
          item: F.checkbox({ initial: itemInitial }),
          initial: initials.map((initial) => F.checkbox({ initial })),
        }),
      );
      const addButtons = screen.getAllByText("+");
      if (addButtons[addButtons.length - 1]) {
        userEvent.click(addButtons[addButtons.length - 1]);
      }
    });

    it("renders an additional list item at the end", () => {
      expect(
        screen
          .getAllByRole("checkbox")
          .map((x) => (x instanceof HTMLInputElement ? x.checked : null)),
      ).toEqual(initials.concat(itemInitial));
    });

    it("triggers handler with an additional list item at the end", () => {
      expect(handler).toHaveBeenLastCalledWith(initials.concat(itemInitial));
    });
  });

  it("doesn't allow an item to be added when the maxLength has been reached", () => {
    runFlare(
      F.resizableList({ item: F.of(""), initial: [F.of("")], maxLength: 1 }),
    );
    expect(
      screen.getAllByText("+").some((el) => !el.hasAttribute("disabled")),
    ).toEqual(false);
  });

  it("doesn't allow an item to be removed when the minLength has been reached", () => {
    runFlare(
      F.resizableList({ item: F.of(""), initial: [F.of("")], minLength: 1 }),
    );
    expect(
      screen.getAllByText("-").some((el) => !el.hasAttribute("disabled")),
    ).toEqual(false);
  });
});
