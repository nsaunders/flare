import React, {
  ComponentClass,
  ReactElement,
  ReactNode,
  VoidFunctionComponent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cssExport, cssRules } from "demitasse";

const cssModuleId = "flare-core";

/**
 * The basic building block of a Flare UI, capable of providing a value when
 * queried and invoking some upstream handler when the value changes
 *
 * @typeParam A - The value the Flare produces
 */
export type Flare<A> = {
  /**
   * Tags the object as a Flare.
   * @internal
   */
  _tag: "Flare";

  /**
   * Initializes the Flare.
   * @internal
   */
  make: () => {
    /**
     * Queries the current value of the Flare.
     * @internal
     */
    query: () => A;

    /**
     * Renders the Flare.
     * @internal
     */
    render: VoidFunctionComponent<{ onChange: () => void }>;
  };
};

/**
 * A utility type that extracts the type parameter `A` from a `Flare<A>`
 *
 * @remarks
 * A `Flare<A>` produces values of type `A`. The `A` type can sometimes be
 * useful, for example to annotate function parameters where TypeScript
 * struggles to infer types.
 *
 * @typeParam F - The `Flare<A>` from which to extract `A`
 */
export type Unflare<F> = F extends Flare<infer A> ? A : never;

/**
 * Applies a function to a value within a `Flare` context.
 *
 * @typeParam A - The value to which to apply the function
 * @typeParam B - The return value of the function
 *
 * @param fa - The Flare that produces the original value
 * @param fab - The Flare that produces the function to apply
 *
 * @returns A Flare that produces the result of the function application
 */
export function ap<A, B>(fa: Flare<A>): (fab: Flare<(a: A) => B>) => Flare<B> {
  return (fab) => ({
    _tag: "Flare",
    make: () => {
      const fab_ = fab.make();
      const fa_ = fa.make();
      const ComponentFAB = fab_.render;
      const ComponentFA = fa_.render;
      return {
        _tag: "Flare",
        query: () => fab_.query()(fa_.query()),
        render: ({ onChange }) => (
          <>
            <ComponentFAB onChange={onChange} />
            <ComponentFA onChange={onChange} />
          </>
        ),
      };
    },
  });
}

/**
 * Composes Flares in a sequence.
 *
 * @typeParam A - The value produced by the first Flare
 * @typeParam B - The value produced by the second Flare
 *
 * @param afb - The function to apply to the output of the first Flare to
 * produce the second Flare
 * @param fa - The first Flare whose value determines the second
 *
 * @returns The Flare resulting from the composition
 */
export function chain<A, B>(
  afb: (a: A) => Flare<B>,
): (fa: Flare<A>) => Flare<B> {
  return (fa) => ({
    _tag: "Flare",
    make: () => {
      const fa_ = fa.make();
      const ComponentFA = fa_.render;
      let flareB = afb(fa_.query()).make();
      return {
        query: () => flareB.query(),
        render: ({ onChange }) => (
          <>
            <ComponentFA
              onChange={() => {
                flareB = afb(fa_.query()).make();
                onChange();
              }}
            />
            {flareB.render({ onChange })}
          </>
        ),
      };
    },
  });
}

/**
 * Applies a function to a Flare to change its output.
 *
 * @typeParam A - The value produced by the original Flare
 * @typeParam B - The value produced by the modified Flare
 *
 * @param ab - The function to apply to the output of the original Flare
 * @param fa - The original Flare
 *
 * @returns A Flare that produces the result of the function application
 */
export function map<A, B>(ab: (a: A) => B): (fa: Flare<A>) => Flare<B> {
  return (fa) => ({
    _tag: "Flare",
    make: () => {
      const fa_ = fa.make();
      return {
        query: () => ab(fa_.query()),
        render: fa_.render,
      };
    },
  });
}

/**
 * Lifts a value into a `Flare` context.
 *
 * @typeParam A - The value to lift
 *
 * @param a - The value to lift
 *
 * @returns A Flare that produces the specified value `a`
 */
export function of<A>(a: A): Flare<A> {
  return {
    _tag: "Flare",
    make: () => ({
      query: () => a,
      render: () => null,
    }),
  };
}

/**
 * Combines two Flares into one, producing the value from the original Flare
 * that corresponds to the boolean expression provided.
 *
 * @remarks This is typically used with {@link chain}.
 *
 * @typeParam A - The value produced by the first Flare
 * @typeParam B - The value produced by the second Flare
 *
 * @param a - The value produced by the first Flare
 * @param b - The value produced by the second Flare
 * @param cond - The boolean expression used to select either the first Flare
 * (when `true`) or the second (when `false`)
 *
 * @returns The first Flare when the boolean expession is `true`; otherwise, the
 * second Flare
 */
export function ifElse<A, B>(
  a: Flare<A>,
  b: Flare<B>,
): (cond: boolean) => Flare<A | B> {
  return (cond) => (cond ? a : b);
}

/**
 * Combines multiple Flares into one, producing the value from the original Flare
 * that corresponds to the expression provided.
 *
 * @remarks This is typically used with {@link chain}.
 *
 * @typeParam M - The map of Flares from which to select
 *
 * @param map - The map of Flares from which to select
 *
 * @returns A function that returns the Flare from the `map` corresponding to the
 * specified `key`
 */
export function match<M>(
  map: M,
): M extends Record<string | number, Flare<infer A>>
  ? (key: keyof M) => Flare<A>
  : never {
  return ((key: keyof M) => map[key]) as ReturnType<typeof match>;
}

/**
 * Turns an ordinary React component into a function that produces a Flare.
 *
 * @remarks This is primarily intended for internal use. Before creating custom
 * Flares, consider using CSS to customize existing elements or using the
 * `components` prop of {@link RunFlare}.
 *
 * @typeParam A - The value the Flare produces
 * @typeParam O - Flare options, forwarded to the component as props
 *
 * @param Component - The React component to turn into a Flare
 *
 * @returns A Flare that renders as the provided React component
 *
 * @experimental
 */
export function makeFlare<O, A = O extends { initial: infer X } ? X : never>(
  Component: (
    props: Omit<O, "initial"> & { value: A; onChange: (value: A) => void },
  ) => JSX.Element,
) {
  return function (options: O extends { initial: A } ? O : never): Flare<A> {
    const { initial, ...restOptions } = options;
    return {
      _tag: "Flare",
      make: () => {
        let state = initial;
        return {
          query: () => state,
          render: ({ onChange }) => (
            <Component
              value={state}
              onChange={(value: A) => {
                state = value;
                onChange();
              }}
              {...restOptions}
            />
          ),
        };
      },
    };
  };
}

const uniqueId = () => Math.round(Math.random() * 1000000000).toString(36);

/**
 * A React component
 *
 * @remarks
 * This varies from the `ComponentType` alias in the `@types/react` package in
 * that it does not implicitly add a `children` prop.
 *
 * @typeParam P - Component props
 *
 * @internal
 */
export type ComponentType<P = Record<string, unknown>> =
  | ComponentClass<P>
  | VoidFunctionComponent<P>;

/** The props of the React component used to render a button */
export type ButtonProps = {
  /**
   * Whether the button should be disabled
   *
   * @remarks
   * For example, this is used in resizable lists when adding or removing an item
   * would exceed the minimum or maximum allowed list length.
   */
  disabled?: boolean;

  /** The callback to invoke when the button is clicked **/
  onClick: () => void;

  /** The content of the button **/
  children: ReactNode;
};

/** The React component used to render a button */
export type Button = ComponentType<ButtonProps>;

/** The props of the React component used to render a checkbox */
export type CheckboxProps = {
  /** The label to display next to the checkbox */
  label?: string;

  /** Whether the checkbox is checked */
  checked: boolean;

  /** The callback to invoke when the checked state changes */
  onCheckedChange: (checked: boolean) => void;
};

/** The React component used to render a checkbox */
export type Checkbox = ComponentType<CheckboxProps>;

/** The props of the React component used to render a combo box */
export type ComboBoxProps = {
  /** The label to display next to the combo box */
  label?: string;

  /** The list of available options */
  options: string[];

  /** The selected value */
  value: string;

  /** The callback to invoke when the selected value changes */
  onValueChange: (value: string) => void;
};

/** The React component used to render a combo box */
export type ComboBox = ComponentType<ComboBoxProps>;

/** The props of the React component used to render a resizable list */
export type ResizableListProps = {
  /** The button used to add an item to the end of the list */
  addButton: ReactNode;

  /** The current list of items */
  children: ReactNode;
};

/** The React component used to render a resizable list */
export type ResizableList = ComponentType<ResizableListProps>;

/** The props of the React component used to render a resizable list item */
export type ResizableListItemProps = {
  /** The button used to add an item before the current item */
  addButton: ReactNode;

  /** The button used to remove the item */
  removeButton: ReactNode;

  /** The main content of the item */
  children: ReactNode;
};

/** The React component used to render a resizable list item */
export type ResizableListItem = ComponentType<ResizableListItemProps>;

/** The props of the React component used to render a group of radio buttons */
export type RadioGroupProps = {
  /** The label to display next to the group of radio buttons */
  label?: string;

  /** The list of available options */
  options: string[];

  /** The selected value */
  value: string;

  /** The callback to invoke when the selected value changes */
  onValueChange: (value: string) => void;
};

/** The React component used to render a group of radio buttons */
export type RadioGroup = ComponentType<RadioGroupProps>;

/** The props of the React component used to render a slider */
export type SliderProps = {
  /** The label to display next to the slider */
  label?: string;

  /** The selected value */
  value: number;

  /** The callback to invoke when the selected value changes */
  onValueChange: (value: number) => void;

  /** The minimum value that can be selected */
  min?: number;

  /** The maximum value that can be selected */
  max?: number;

  /** The granularity of the selected value */
  step?: number;
};

/** The React component used to render a slider */
export type Slider = ComponentType<SliderProps>;

/** The props of the React component used to render a spin button */
export type SpinButtonProps = {
  /** The label to display next to the spin button */
  label?: string;

  /** The selected value */
  value: number;

  /** The callback to invoke when the selected value changes */
  onValueChange: (value: number) => void;

  /** The minimum value that can be selected */
  min?: number;

  /** The maximum value that can be selected */
  max?: number;

  /** The granularity of the selected value */
  step?: number;
};

/** The React component used to render a spin button */
export type SpinButton = ComponentType<SpinButtonProps>;

/** The props of the React component used to render a switch */
export type SwitchProps = {
  /** The label to display next to the switch */
  label?: string;

  /** Whether the switch is toggled on */
  checked: boolean;

  /** The callback to invoke when the switch is toggled */
  onCheckedChange: (checked: boolean) => void;
};

/** The React component used to render a switch */
export type Switch = ComponentType<SwitchProps>;

/** The props of the React component used to render a text box */
export type TextBoxProps = {
  /** The label to display next to the text box */
  label?: string;

  /** The value */
  value: string;

  /** The callback to invoke when the value changes */
  onValueChange: (value: string) => void;
};

/** The React component used to render a text box */
export type TextBox = ComponentType<TextBoxProps>;

/** The React component used to render a button */
const Button: Button = (props) => <button {...props} />;

const [fieldCSS, fieldStyles] = /*#__PURE__*/ cssRules(cssModuleId, {
  container: {
    display: "block",
    "& + &": {
      marginTop: 8,
    },
  },
  label: {
    display: "inline-block",
    minWidth: 150,
    "&:empty": {
      display: "none",
    },
  },
  value: {
    display: "inline-block",
  },
});

const Checkbox: Checkbox = ({ label, checked, onCheckedChange }) => (
  <label className={fieldStyles.container}>
    <span className={fieldStyles.label}>{label}</span>
    <div className={fieldStyles.value}>
      <input
        type="checkbox"
        checked={checked}
        onChange={({ target: { checked } }) => {
          onCheckedChange(checked);
        }}
      />
    </div>
  </label>
);

const ComboBox: ComboBox = ({ label, onValueChange, options, value }) => (
  <label className={fieldStyles.container}>
    <span className={fieldStyles.label}>{label}</span>
    <div className={fieldStyles.value}>
      <select
        value={value}
        onChange={({ target: { value } }) => {
          onValueChange(value);
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  </label>
);

const ResizableList: ResizableList = ({ children, addButton }) => (
  <div>
    {children}
    {addButton}
  </div>
);

const [resizableListItemCSS, resizableListItemStyles] = /*#__PURE__*/ cssRules(
  cssModuleId,
  {
    display: "flex",
    alignItems: "center",
  },
);

const ResizableListItem: ResizableListItem = ({
  addButton,
  children,
  removeButton,
}) => (
  <div className={resizableListItemStyles}>
    <div>{addButton}</div>
    <div>{children}</div>
    <div>{removeButton}</div>
  </div>
);

const RadioGroup: RadioGroup = ({ label, onValueChange, options, value }) => {
  const name = useRef(uniqueId());
  return (
    <div
      className={fieldStyles.container}
      role="radiogroup"
      aria-labelledby={`${name.current}Label`}
    >
      <span className={fieldStyles.label} id={`${name.current}Label`}>
        {label}
      </span>
      <div className={fieldStyles.value}>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={name.current}
              value={option}
              checked={value === option}
              onChange={({ target: { checked } }) => {
                if (checked) {
                  onValueChange(option);
                }
              }}
            />{" "}
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

/** The React component used to render a slider */
const Slider: Slider = ({ label, onValueChange, ...restProps }) => (
  <label className={fieldStyles.container}>
    <span className={fieldStyles.label}>{label}</span>
    <div className={fieldStyles.value}>
      <input
        type="range"
        onChange={({ target: { value } }) => {
          for (const fValue = parseFloat(value); !isNaN(fValue); ) {
            return onValueChange(fValue);
          }
        }}
        {...restProps}
      />
    </div>
  </label>
);

/** The React component used to render a spin button */
const SpinButton: SpinButton = ({ label, onValueChange, ...restProps }) => (
  <label className={fieldStyles.container}>
    <span className={fieldStyles.label}>{label}</span>
    <div className={fieldStyles.value}>
      <input
        type="number"
        onChange={({ target: { value } }) => {
          for (const fValue = parseFloat(value); !isNaN(fValue); ) {
            return onValueChange(fValue);
          }
        }}
        {...restProps}
      />
    </div>
  </label>
);

/** The React component used to render a switch */
const Switch: Switch = ({ label, checked, onCheckedChange }) => (
  <label className={fieldStyles.container}>
    <span className={fieldStyles.label}>{label}</span>
    <div className={fieldStyles.value}>
      <input
        role="switch"
        type="checkbox"
        checked={checked}
        onChange={({ target: { checked } }) => {
          onCheckedChange(checked);
        }}
      />
    </div>
  </label>
);

/** The React component used to render a text box */
const TextBox: TextBox = ({ label, value, onValueChange }) => (
  <label className={fieldStyles.container}>
    <span className={fieldStyles.label}>{label}</span>
    <div className={fieldStyles.value}>
      <input
        type="text"
        value={value}
        onChange={({ target: { value } }) => {
          onValueChange(value);
        }}
      />
    </div>
  </label>
);

/**
 * The React components used to render various Flares
 *
 * @remarks These can be customized through the `components` prop of the
 * {@link RunFlare} component.
 */
export type Components = {
  /** The React component used to render a button */
  Button: Button;

  /** The React component used to render a checkbox */
  Checkbox: Checkbox;

  /** The React component used to render a combo box */
  ComboBox: ComboBox;

  /** The React component used to render a resizable list */
  ResizableList: ResizableList;

  /** The React component used to render a resizable list item */
  ResizableListItem: ResizableListItem;

  /** The React component used to render a group of radio buttons */
  RadioGroup: RadioGroup;

  /** The React component used to render a slider */
  Slider: Slider;

  /** The React component used to render a spin button */
  SpinButton: SpinButton;

  /** The React component used to render a switch */
  Switch: Switch;

  /** The React component used to render a text box */
  TextBox: TextBox;
};

const defaultComponents: Components = {
  Button,
  Checkbox,
  ComboBox,
  ResizableList,
  ResizableListItem,
  RadioGroup,
  Slider,
  SpinButton,
  Switch,
  TextBox,
};

const Components = createContext<Components>(defaultComponents);

/**
 * {@link RunFlare} component props
 *
 * @typeParam A - The value produced by the Flare
 */
export type RunFlareProps<A> = {
  /** The Flare to run */
  flare: Flare<A>;

  /** The procedure to run when the value changes */
  handler: (a: A) => void;

  /** Component overrides */
  components?: Partial<Components>;
};

/**
 * A React component that renders the specified Flare.
 */
export function RunFlare<A>(props: RunFlareProps<A>): ReactElement {
  const { flare, handler, components } = props;

  // TODO: useMemo doesn't offer the semantic guarantees required here.
  const flare_ = useMemo(() => flare.make(), [flare]);

  const [state, setState] = useState<A>(flare_.query());

  useEffect(() => {
    setState(flare_.query());
  }, [flare_]);

  const onChange = () => {
    setState(flare_.query());
  };

  useEffect(() => {
    handler(state);
  }, [handler, state]);

  return (
    <Components.Provider value={{ ...defaultComponents, ...components }}>
      {flare_.render({ onChange })}
    </Components.Provider>
  );
}

/**
 * Creates a Flare that renders as a checkbox control.
 *
 * @param options - Checkbox options
 * @param options.initial - Initial checked state
 * @param options.label - Checkbox label
 *
 * @returns The Flare that was created
 */
export const checkbox = /*#__PURE__*/ makeFlare<{
  label?: string;
  initial: boolean;
}>(({ value, onChange, ...restProps }) => {
  const { Checkbox } = useContext(Components);
  return <Checkbox checked={value} onCheckedChange={onChange} {...restProps} />;
});

/**
 * Creates a Flare that renders as a combo box.
 *
 * @typeParam A - The value that the combo box produces
 * @typeParam C - An additional `optionToString` option, required to convert `A`
 * to `string` when it doesn't already extend `string`
 *
 * @param options - Combo box options
 *
 * @returns The Flare that was created
 */
export function comboBox<
  A,
  C extends A extends string
    ? { optionToString?: undefined }
    : { optionToString: (option: A) => string },
>(options: { label?: string; initial: A; options: Readonly<A[]> } & C) {
  const { optionToString, ...restOptions } = options;
  const stringOptions = restOptions.options.map(
    optionToString || ((x: A) => x as unknown as string),
  );
  const getOption = (o: string) =>
    restOptions.options[stringOptions.indexOf(o)];
  const impl = makeFlare<{
    label?: string;
    options: string[];
    initial: string;
  }>(({ onChange, ...restProps }) => {
    const { ComboBox } = useContext(Components);
    return <ComboBox onValueChange={onChange} {...restProps} />;
  });
  return map(getOption)(
    impl({
      ...restOptions,
      initial: optionToString
        ? optionToString(restOptions.initial)
        : (restOptions.initial as unknown as string),
      options: stringOptions,
    }),
  );
}

/**
 * Creates a Flare that renders as a group of radio buttons.
 *
 * @typeParam A - The value that the radio button group produces
 * @typeParam C - An additional `optionToString` option, required to convert `A`
 * to `string` when it doesn't already extend `string`
 *
 * @param options - Radio group options
 *
 * @returns The Flare that was created
 */
export function radioGroup<
  A,
  C extends A extends string
    ? { optionToString?: undefined }
    : { optionToString: (option: A) => string },
>(options: { label?: string; initial: A; options: Readonly<A[]> } & C) {
  const { optionToString, ...restOptions } = options;
  const stringOptions = restOptions.options.map(
    optionToString || ((x: A) => x as unknown as string),
  );
  const getOption = (o: string) =>
    restOptions.options[stringOptions.indexOf(o)];
  const impl = makeFlare<{
    label?: string;
    options: string[];
    initial: string;
  }>(({ onChange, ...restProps }) => {
    const { RadioGroup } = useContext(Components);
    return <RadioGroup onValueChange={onChange} {...restProps} />;
  });
  return map(getOption)(
    impl({
      ...restOptions,
      initial: optionToString
        ? optionToString(restOptions.initial)
        : (restOptions.initial as unknown as string),
      options: stringOptions,
    }),
  );
}

/**
 * Creates a Flare that renders as a slider.
 *
 * @param options - Slider options
 * @param options.label - Slider label
 * @param options.initial - Initial slider state
 * @param options.min - Minimum selectable value
 * @param options.max - Maximum selectable value
 * @param options.step - The granularity of the slider value
 *
 * @returns The Flare that was created
 */
export const slider = /*#__PURE__*/ makeFlare<{
  label?: string;
  initial: number;
  min?: number;
  max?: number;
  step?: number;
}>(({ min, max, onChange, ...restProps }) => {
  const { Slider } = useContext(Components);
  return (
    <Slider
      min={min}
      max={max}
      onValueChange={(value) => {
        const minOk = (!min && min !== 0) || value >= min;
        const maxOk = (!max && max !== 0) || value <= max;
        if (minOk && maxOk) {
          onChange(value);
        }
      }}
      {...restProps}
    />
  );
});

/**
 * Creates a Flare that renders as a spin button.
 *
 * @param options - Spin button options
 * @param options.label - Spin button label
 * @param options.initial - Initial spin button state
 * @param options.min - Minimum selectable value
 * @param options.max - Maximum selectable value
 * @param options.step - The granularity of the spin button value
 *
 * @returns The Flare that was created
 */
export const spinButton = /*#__PURE__*/ makeFlare<{
  label?: string;
  initial: number;
  min?: number;
  max?: number;
  step?: number;
}>(({ min, max, onChange, ...restProps }) => {
  const { SpinButton } = useContext(Components);
  return (
    <SpinButton
      min={min}
      max={max}
      onValueChange={(value) => {
        const minOk = (!min && min !== 0) || value >= min;
        const maxOk = (!max && max !== 0) || value <= max;
        if (minOk && maxOk) {
          onChange(value);
        }
      }}
      {...restProps}
    />
  );
});

/**
 * Creates a Flare that renders as a switch.
 *
 * @param options - Switch options
 * @param options.label - Switch label
 * @param options.initial - Initial switch state
 *
 * @returns The Flare that was created
 */
export const switch_ = /*#__PURE__*/ makeFlare<{
  label?: string;
  initial: boolean;
}>(({ onChange, value, ...restProps }) => {
  const { Switch } = useContext(Components);
  return <Switch checked={value} onCheckedChange={onChange} {...restProps} />;
});

/**
 * Creates a Flare that renders as a text box.
 *
 * @param options - Text box options
 * @param options.label - Text box label
 * @param options.initial - Initial text box state
 *
 * @returns The Flare that was created
 */
export const textBox = /*#__PURE__*/ makeFlare<{
  label?: string;
  initial: string;
  nonEmpty?: boolean;
}>(({ nonEmpty, onChange, ...restProps }) => {
  const { TextBox } = useContext(Components);
  return (
    <TextBox
      onValueChange={(v) => {
        if (v || !nonEmpty) {
          onChange(v);
        }
      }}
      {...restProps}
    />
  );
});

const ResizableListView: ResizableList = (props) => {
  const { ResizableList } = useContext(Components);
  return <ResizableList {...props} />;
};

const ResizableListItemView: ResizableListItem = (props) => {
  const { ResizableListItem } = useContext(Components);
  return <ResizableListItem {...props} />;
};

const ButtonView: Button = (props) => {
  const { Button } = useContext(Components);
  return <Button {...props} />;
};

/**
 * Creates a Flare that renders as a resizable list of Flares.
 *
 * @param options - Resizable list options
 * @param options.item - The Flare used each time an item is added to the list
 * @param options.initial - The initial list of Flares
 * @param options.minLength - The minimum length of the list
 * @param options.maxLength - The maximum length of the list
 *
 * @returns The Flare that was created
 */
export function resizableList<A>(options: {
  item: Flare<A>;
  initial?: Flare<A>[];
  minLength?: number;
  maxLength?: number;
}): Flare<A[]> {
  const { item, initial, minLength = 0, maxLength } = options;
  return {
    _tag: "Flare",
    make: () => {
      const itemFlares: ReturnType<Flare<A>["make"]>[] =
        (initial || []).map((x) => x.make()) || [];
      while (minLength !== undefined && itemFlares.length < minLength) {
        itemFlares.push(item.make());
      }
      if (maxLength !== undefined && itemFlares.length > maxLength) {
        itemFlares.splice(maxLength, itemFlares.length - maxLength);
      }
      return {
        query: () => itemFlares.map((flare) => flare.query()),
        render: ({ onChange }) => {
          return (
            <ResizableListView
              addButton={
                (maxLength === undefined || itemFlares.length < maxLength) && (
                  <ButtonView
                    onClick={() => {
                      itemFlares.push(item.make());
                      onChange();
                    }}
                  >
                    +
                  </ButtonView>
                )
              }
            >
              {itemFlares.map((flare, key) => (
                <ResizableListItemView
                  key={key}
                  addButton={
                    <ButtonView
                      disabled={
                        maxLength !== undefined &&
                        maxLength <= itemFlares.length
                      }
                      onClick={() => {
                        itemFlares.splice(key, 0, item.make());
                        onChange();
                      }}
                    >
                      +
                    </ButtonView>
                  }
                  removeButton={
                    <ButtonView
                      disabled={minLength >= itemFlares.length}
                      onClick={() => {
                        itemFlares.splice(key, 1);
                        onChange();
                      }}
                    >
                      -
                    </ButtonView>
                  }
                >
                  {flare.render({ onChange })}
                </ResizableListItemView>
              ))}
            </ResizableListView>
          );
        },
      };
    },
  };
}

/** @ignore */
export const css = /*#__PURE__*/ cssExport(cssModuleId, [
  ...fieldCSS,
  ...resizableListItemCSS,
]);
