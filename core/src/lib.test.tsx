import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { RunFlare } from "./lib";
import * as F from "./lib";

describe("checkbox", () => {
  const initial = true;

  let handler: jest.Mock, checkbox: HTMLInputElement | null | undefined;

  beforeEach(() => {
    const label = "Label";
    handler = jest.fn();
    render(
      <RunFlare flare={F.checkbox({ initial, label })} handler={handler} />,
    );
    checkbox = screen
      .getByLabelText(label)
      ?.closest("label")
      ?.querySelector("input");
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

  let handler: jest.Mock, input: HTMLInputElement | null | undefined;

  beforeEach(() => {
    const label = "Label";
    handler = jest.fn();
    render(
      <RunFlare flare={F.numberInput({ initial, label })} handler={handler} />,
    );
    input = screen
      .getByLabelText(label)
      ?.closest("label")
      ?.querySelector("input");
  });

  it("renders with initial", () => {
    expect(input?.value).toEqual(initial.toString());
  });

  it("triggers handler on change", () => {
    const updated = 10;
    if (input) {
      userEvent.clear(input);
      userEvent.type(input, updated.toString());
    }
    expect(handler).toHaveBeenLastCalledWith(updated);
  });
});

describe("segmentedControl", () => {
  const initial = "red",
    options = ["blue", "red", "yellow"];

  let handler: jest.Mock, radios: HTMLInputElement[];

  beforeEach(() => {
    const label = "Label";
    handler = jest.fn();
    render(
      <RunFlare
        flare={F.segmentedControl({
          initial,
          options,
          label,
        })}
        handler={handler}
      />,
    );
    radios = Array.from(
      screen.getByText(label)?.nextElementSibling?.querySelectorAll("input") ||
        [],
    );
  });

  it("renders with initial", () => {
    expect(radios?.find(({ checked }) => checked)?.value).toEqual(initial);
  });

  it("renders provided options", () => {
    expect(radios.map(({ value }) => value)).toEqual(options);
  });

  it("triggers handler on change", () => {
    const updated = options[(options.indexOf(initial) + 1) % options.length];
    const radio = radios.find(({ value }) => value === updated);
    if (radio) {
      userEvent.click(radio);
    }
    expect(handler).toHaveBeenLastCalledWith(updated);
  });
});

describe("select", () => {
  const initial = "red",
    options = ["blue", "red", "yellow"];

  let handler: jest.Mock, select: HTMLSelectElement | null | undefined;

  beforeEach(() => {
    const label = "Label";
    handler = jest.fn();
    render(
      <RunFlare
        flare={F.select({
          initial,
          options,
          label,
        })}
        handler={handler}
      />,
    );
    select = screen
      .getByLabelText(label)
      ?.closest("label")
      ?.querySelector("select");
  });

  it("renders with initial", () => {
    expect(select?.value).toEqual(initial);
  });

  it("renders provided options", () => {
    expect(Array.from(select?.options || []).map(({ value }) => value)).toEqual(
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

describe("textInput", () => {
  const initial = "Foo";

  let handler: jest.Mock, input: HTMLInputElement | null | undefined;

  beforeEach(() => {
    const label = "Label";
    handler = jest.fn();
    render(
      <RunFlare flare={F.textInput({ initial, label })} handler={handler} />,
    );
    input = screen
      .getByLabelText(label)
      ?.closest("label")
      ?.querySelector("input");
  });

  it("renders with initial", () => {
    expect(input?.value).toEqual(initial);
  });

  it("triggers handler on change", () => {
    const additional = "Bar";
    if (input) {
      userEvent.type(input, additional);
    }
    expect(handler).toHaveBeenLastCalledWith(initial + additional);
  });
});

describe("toggle", () => {
  const initial = true;

  let handler: jest.Mock, toggle: HTMLInputElement | null | undefined;

  beforeEach(() => {
    const label = "Label";
    handler = jest.fn();
    render(<RunFlare flare={F.toggle({ initial, label })} handler={handler} />);
    toggle = screen
      .getByLabelText(label)
      ?.closest("label")
      ?.querySelector("input");
  });

  it("renders with initial", () => {
    expect(toggle?.checked).toEqual(initial);
  });

  it("triggers handler on change", () => {
    toggle && userEvent.click(toggle);
    expect(handler).toHaveBeenLastCalledWith(!initial);
  });
});
