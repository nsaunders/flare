import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { Flare, RunFlare } from "./lib";
import * as F from "./lib";
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

  it("triggers handler on change", () => {
    checkbox && userEvent.click(checkbox);
    expect(handler).toHaveBeenLastCalledWith(!initial);
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

describe("select", () => {
  const initial = "red",
    options = ["blue", "red", "yellow"];

  let handler: MockHandler<typeof options[number]>, select: HTMLSelectElement;

  beforeEach(() => {
    handler = runFlare(F.select({ initial, options }));
    const maybeSelect = screen.getByRole("combobox");
    if (maybeSelect instanceof HTMLSelectElement) {
      select = maybeSelect;
    }
  });

  it("renders a control", () => {
    expect(select).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(select?.value).toEqual(initial);
  });

  it("renders provided options", () => {
    expect(Array.from(select?.options).map(({ value }) => value)).toEqual(
      options,
    );
  });

  it("triggers handler on change", () => {
    const updated = "blue";
    if (select) {
      userEvent.selectOptions(select, "blue");
    }
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

  it("triggers handler on change", () => {
    switch_ && userEvent.click(switch_);
    expect(handler).toHaveBeenLastCalledWith(!initial);
  });
});

describe("textbox", () => {
  const initial = "Foo";

  let handler: MockHandler<string>, textbox: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.textbox({ initial }));
    const maybeTextbox = screen.getByRole("textbox");
    if (maybeTextbox instanceof HTMLInputElement) {
      textbox = maybeTextbox;
    }
  });

  it("renders a control", () => {
    expect(textbox).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(textbox?.value).toEqual(initial);
  });

  it("triggers handler on change", () => {
    const additional = "Bar";
    if (textbox) {
      userEvent.type(textbox, additional);
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
    handler = runFlare(pipe(F.textbox({ initial }), F.map(f)));
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
          x ? F.textbox({ initial: checkedValue }) : F.of(uncheckedValue),
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

describe("makeFlare", () => {
  const toggle = F.makeFlare<unknown, boolean>(function Toggle({
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

  it("triggers handler on change", () => {
    if (control) {
      userEvent.click(control);
    }
    expect(handler).toHaveBeenLastCalledWith(!initial);
  });
});
