import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { Flare, RunFlare } from "./lib";
import * as F from "./lib";

type MockHandler<A> = jest.Mock<void, [A]>;

function runFlare<A>(flare: Flare<A>): MockHandler<A> {
  const handler = jest.fn<void, [A]>();
  render(<RunFlare flare={flare} handler={handler} />);
  return handler;
}

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

  it("renders a checkbox", () => {
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

describe("numberInput", () => {
  const initial = 5;

  let handler: MockHandler<number>, spinButton: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.numberInput({ initial }));
    const maybeSpinButton = screen.getByRole("spinbutton");
    if (maybeSpinButton instanceof HTMLInputElement) {
      spinButton = maybeSpinButton;
    }
  });

  it("renders a number input", () => {
    expect(spinButton).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(spinButton?.value).toEqual(initial.toString());
  });

  it("triggers handler on change", () => {
    const updated = 10;
    if (spinButton) {
      userEvent.clear(spinButton);
      userEvent.type(spinButton, updated.toString());
    }
    expect(handler).toHaveBeenLastCalledWith(updated);
  });
});

describe("segmentedControl", () => {
  const initial = "red",
    options = ["blue", "red", "yellow"];

  let handler: MockHandler<typeof options[number]>, radios: HTMLInputElement[];

  beforeEach(() => {
    handler = runFlare(F.segmentedControl({ initial, options }));
    radios = screen
      .getAllByRole("radio")
      .flatMap((x) => (x instanceof HTMLInputElement ? [x] : []));
  });

  it("renders radio buttons", () => {
    expect(radios?.map(({ value }) => value)).toEqual(options);
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

  it("renders a select", () => {
    expect(select).toBeTruthy();
  });

  it("renders with provided options", () => {
    expect(Array.from(select?.options).map(({ value }) => value)).toEqual(
      options,
    );
  });

  it("renders with initial", () => {
    expect(select?.value).toEqual(initial);
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
  const initial = 5;

  let handler: MockHandler<number>, slider: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.slider({ initial }));
    const maybeSlider = screen.getByRole("slider");
    if (maybeSlider instanceof HTMLInputElement) {
      slider = maybeSlider;
    }
  });

  it("renders an input", () => {
    expect(slider).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(slider?.value).toEqual(initial.toString());
  });

  it("triggers handler on change", () => {
    const updated = 75;
    if (slider) {
      userEvent.clear(slider);
      userEvent.type(slider, updated.toString());
    }
    expect(handler).toHaveBeenLastCalledWith(updated);
  });
});

describe("textInput", () => {
  const initial = "Foo";

  let handler: MockHandler<string>, textbox: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.textInput({ initial }));
    const maybeTextbox = screen.getByRole("textbox");
    if (maybeTextbox instanceof HTMLInputElement) {
      textbox = maybeTextbox;
    }
  });

  it("renders a textbox", () => {
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

describe("toggle", () => {
  const initial = true;

  let handler: MockHandler<boolean>, toggle: HTMLInputElement;

  beforeEach(() => {
    handler = runFlare(F.toggle({ initial }));
    const maybeToggle = screen.getByRole("switch");
    if (maybeToggle instanceof HTMLInputElement) {
      toggle = maybeToggle;
    }
  });

  it("renders a checkbox", () => {
    expect(toggle).toBeTruthy();
  });

  it("renders with initial", () => {
    expect(toggle?.checked).toEqual(initial);
  });

  it("triggers handler on change", () => {
    toggle && userEvent.click(toggle);
    expect(handler).toHaveBeenLastCalledWith(!initial);
  });
});
