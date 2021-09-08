import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { css } from "demitasse";
import { Flare } from "./common";
export { Flare } from "./common";
export { match } from "./match";

export type Unflare<F> = F extends Flare<infer A> ? A : never;

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

export function chain<A, B>(f: (a: A) => Flare<B>): (fa: Flare<A>) => Flare<B> {
  return (fa) => ({
    _tag: "Flare",
    make: () => {
      const fa_ = fa.make();
      const ComponentFA = fa_.render;
      let flareB = f(fa_.query()).make();
      return {
        query: () => flareB.query(),
        render: ({ onChange }) => (
          <>
            <ComponentFA
              onChange={() => {
                flareB = f(fa_.query()).make();
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

export function map<A, B>(f: (a: A) => B): (ma: Flare<A>) => Flare<B> {
  return (ma) => ({
    _tag: "Flare",
    make: () => {
      const ma_ = ma.make();
      return {
        query: () => f(ma_.query()),
        render: ma_.render,
      };
    },
  });
}

export function of<A>(a: A): Flare<A> {
  return {
    _tag: "Flare",
    make: () => ({
      query: () => a,
      render: () => null,
    }),
  };
}

export function ifElse<A, B>(
  a: Flare<A>,
  b: Flare<B>,
): (cond: boolean) => Flare<A | B> {
  return (cond) => (cond ? a : b);
}

export function makeFlare<O, A>(
  Component: FC<
    O & { value: A; onChange: (value: A) => void; children?: undefined }
  >,
) {
  return function (opts: O & { defaultValue: A }): Flare<A> {
    return {
      _tag: "Flare",
      make: () => {
        let state = opts.defaultValue;
        return {
          query: () => state,
          render: ({ onChange }) => (
            <Component
              value={state}
              onChange={(value: A) => {
                state = value;
                onChange();
              }}
              {...{ ...opts, defaultValue: undefined }}
            />
          ),
        };
      },
    };
  };
}

const uniqueId = () => Math.round(Math.random() * 1000000000).toString(36);

type LabelProp = { label?: string };

type ValueProps<T, P extends string = "value"> = Record<P, T> &
  Record<`on${Capitalize<P>}Change`, (t: T) => void>;

type SelectionProps = {
  options: string[];
} & ValueProps<string>;

type NumberProps = {
  min?: number;
  max?: number;
  step?: number;
};

export type Components = {
  Button: FC<{ disabled?: boolean; onClick: () => void }>;
  Checkbox: FC<
    { children?: undefined } & LabelProp & ValueProps<boolean, "checked">
  >;
  NumberInput: FC<
    { children?: undefined } & LabelProp & ValueProps<number> & NumberProps
  >;
  ResizableList: FC<{ addButton: ReactNode }>;
  ResizableListItem: FC<{ addButton: ReactNode; removeButton: ReactNode }>;
  SegmentedControl: FC<{ children?: undefined } & LabelProp & SelectionProps>;
  Select: FC<{ children?: undefined } & LabelProp & SelectionProps>;
  Slider: FC<
    { children?: undefined } & LabelProp & ValueProps<number> & NumberProps
  >;
  TextInput: FC<{ children?: undefined } & LabelProp & ValueProps<string>>;
  Toggle: FC<
    { children?: undefined } & LabelProp & ValueProps<boolean, "checked">
  >;
};

const Button: Components["Button"] = (props) => <button {...props} />;

const fieldStyles = css({
  field: {
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

const Checkbox: Components["Checkbox"] = ({
  label,
  checked,
  onCheckedChange,
}) => (
  <label className={fieldStyles.field}>
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

const numberInputStyles = css({
  width: 80,
});

const NumberInput: Components["NumberInput"] = ({
  label,
  onValueChange,
  ...restProps
}) => (
  <label className={fieldStyles.field}>
    <span className={fieldStyles.label}>{label}</span>
    <div className={fieldStyles.value}>
      <input
        className={numberInputStyles}
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

const ResizableList: FC<{ addButton: ReactNode }> = ({
  children,
  addButton,
}) => (
  <div>
    {children}
    {addButton}
  </div>
);

const resizableListItemStyles = css({
  display: "flex",
  alignItems: "center",
});

const ResizableListItem: FC<{ addButton: ReactNode; removeButton: ReactNode }> =
  ({ addButton, children, removeButton }) => (
    <div className={resizableListItemStyles}>
      <div>{addButton}</div>
      <div>{children}</div>
      <div>{removeButton}</div>
    </div>
  );

const SegmentedControl: Components["SegmentedControl"] = ({
  label,
  onValueChange,
  options,
  value,
}) => {
  const [name] = useState(uniqueId);
  return (
    <div className={fieldStyles.field}>
      <span className={fieldStyles.label}>{label}</span>
      <div className={fieldStyles.value}>
        {options.map((option, i) => (
          <label key={option}>
            <input
              type="radio"
              name={name}
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

const Select: Components["Select"] = ({
  label,
  onValueChange,
  options,
  value,
}) => (
  <label className={fieldStyles.field}>
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

const Slider: Components["Slider"] = ({
  label,
  onValueChange,
  ...restProps
}) => (
  <label className={fieldStyles.field}>
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

const TextInput: Components["TextInput"] = ({
  label,
  value,
  onValueChange,
}) => (
  <label className={fieldStyles.field}>
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

const Toggle: Components["Toggle"] = ({ label, checked, onCheckedChange }) => (
  <label className={fieldStyles.field}>
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

const defaultComponents = {
  Button,
  Checkbox,
  NumberInput,
  ResizableList,
  ResizableListItem,
  SegmentedControl,
  Select,
  Slider,
  TextInput,
  Toggle,
};

const Components = createContext<Components>(defaultComponents);

export function RunFlare<A>({
  flare,
  handler,
  components,
}: {
  flare: Flare<A>;
  handler: (a: A) => void;
  components?: Partial<Components>;
}): JSX.Element {
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

export const checkbox = /*#__PURE__*/ makeFlare<LabelProp, boolean>(
  ({ value, onChange, ...restProps }) => {
    const { Checkbox } = useContext(Components);
    return (
      <Checkbox checked={value} onCheckedChange={onChange} {...restProps} />
    );
  },
);

export const numberInput = /*#__PURE__*/ makeFlare<
  LabelProp & NumberProps,
  number
>(({ onChange, ...restProps }) => {
  const { NumberInput } = useContext(Components);
  return <NumberInput onValueChange={onChange} {...restProps} />;
});

type OptionToStringOpt<T> = T extends string
  ? { optionToString?: undefined }
  : { optionToString: (option: T) => string };

export function segmentedControl<T>(
  opts: LabelProp & {
    options: Readonly<T[]>;
    defaultValue: T;
  } & OptionToStringOpt<T>,
): Flare<T> {
  const make = makeFlare<
    LabelProp & { options: Readonly<T[]> } & OptionToStringOpt<T>,
    T
  >(({ label, options, value, onChange, ...restProps }) => {
    const { SegmentedControl } = useContext(Components);
    const optionToString: (option: T) => string = restProps.optionToString
      ? restProps.optionToString
      : (o) => o as unknown as string;
    return (
      <SegmentedControl
        label={label}
        options={options.map(optionToString)}
        value={optionToString(value)}
        onValueChange={(value) => {
          onChange(
            options.find((o) => optionToString(o) === value) || options[0],
          );
        }}
      />
    );
  });
  return make(opts);
}

export function select<T>(
  opts: LabelProp & {
    options: Readonly<T[]>;
    defaultValue: T;
  } & OptionToStringOpt<T>,
): Flare<T> {
  const make = makeFlare<
    LabelProp & { options: Readonly<T[]> } & OptionToStringOpt<T>,
    T
  >(({ label, options, value, onChange, ...restProps }) => {
    const { Select } = useContext(Components);
    const optionToString: (option: T) => string = restProps.optionToString
      ? restProps.optionToString
      : (o) => o as unknown as string;
    return (
      <Select
        label={label}
        options={options.map(optionToString)}
        value={optionToString(value)}
        onValueChange={(value) => {
          onChange(
            options.find((o) => optionToString(o) === value) || options[0],
          );
        }}
      />
    );
  });
  return make(opts);
}

export const slider = /*#__PURE__*/ makeFlare<LabelProp & NumberProps, number>(
  ({ onChange, ...restProps }) => {
    const { Slider } = useContext(Components);
    return <Slider onValueChange={onChange} {...restProps} />;
  },
);

export const textInput = /*#__PURE__*/ makeFlare<
  LabelProp & { nonEmpty?: boolean },
  string
>(({ nonEmpty, onChange, ...restProps }) => {
  const { TextInput } = useContext(Components);
  return (
    <TextInput
      onValueChange={(v) => {
        if (v || !nonEmpty) {
          onChange(v);
        }
      }}
      {...restProps}
    />
  );
});

export const toggle = /*#__PURE__*/ makeFlare<LabelProp, boolean>(
  ({ onChange, value, ...restProps }) => {
    const { Toggle } = useContext(Components);
    return <Toggle checked={value} onCheckedChange={onChange} {...restProps} />;
  },
);

const ResizableListView: Components["ResizableList"] = (props) => {
  const { ResizableList } = useContext(Components);
  return <ResizableList {...props} />;
};

const ResizableListItemView: Components["ResizableListItem"] = (props) => {
  const { ResizableListItem } = useContext(Components);
  return <ResizableListItem {...props} />;
};

const ButtonView: Components["Button"] = (props) => {
  const { Button } = useContext(Components);
  return <Button {...props} />;
};

export function resizableList<A>({
  item,
  defaultItems,
  minLength = 0,
  maxLength,
}: {
  item: Flare<A>;
  defaultItems?: Flare<A>[];
  minLength?: number;
  maxLength?: number;
}): Flare<A[]> {
  return {
    _tag: "Flare",
    make: () => {
      const itemFlares: ReturnType<Flare<A>["make"]>[] =
        (defaultItems || []).map((x) => x.make()) || [];
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

export const styles = [fieldStyles, numberInputStyles, resizableListItemStyles]
  .reduce((xs: string[], x) => {
    switch (typeof x) {
      case "object":
        return xs.concat(Object.values(x));
      case "string":
        return xs.concat(x);
      default:
        return xs;
    }
  }, [])
  .join("\n");
