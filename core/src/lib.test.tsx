import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { RunFlare } from "./lib";
import * as F from "./lib";

describe("checkbox", () => {
  const initial = true;

  let handler: jest.Mock, checkbox: HTMLInputElement | null | undefined;

  beforeEach(() => {
    handler = jest.fn();
    render(
      <RunFlare
        flare={F.checkbox({ initial, label: "Label" })}
        handler={handler}
      />,
    );
    checkbox = screen
      .getByLabelText("Label")
      ?.closest("label")
      ?.querySelector("input");
  });

  it("renders with default value as initial", () => {
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
    handler = jest.fn();
    render(
      <RunFlare
        flare={F.numberInput({ initial, label: "Label" })}
        handler={handler}
      />,
    );
    input = screen
      .getByLabelText("Label")
      ?.closest("label")
      ?.querySelector("input");
  });

  it("renders with default value as initial", () => {
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

describe("textInput", () => {
  const initial = "Foo";

  let handler: jest.Mock, input: HTMLInputElement | null | undefined;

  beforeEach(() => {
    handler = jest.fn();
    render(
      <RunFlare
        flare={F.textInput({ initial, label: "Label" })}
        handler={handler}
      />,
    );
    input = screen
      .getByLabelText("Label")
      ?.closest("label")
      ?.querySelector("input");
  });

  it("renders with default value as initial", () => {
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
