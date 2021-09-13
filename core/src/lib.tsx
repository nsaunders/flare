import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
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

export function makeFlare<A, O = unknown>(
  Component: (
    props: O & { value: A; onChange: (value: A) => void },
  ) => JSX.Element,
) {
  return function (opts: O & { initial: A }): Flare<A> {
    return {
      _tag: "Flare",
      make: () => {
        let state = opts.initial;
        return {
          query: () => state,
          render: ({ onChange }) => (
            <Component
              value={state}
              onChange={(value: A) => {
                state = value;
                onChange();
              }}
              {...{ ...opts, initial: undefined }}
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
  ResizableList: FC<{ addButton: ReactNode }>;
  ResizableListItem: FC<{ addButton: ReactNode; removeButton: ReactNode }>;
  RadioGroup: FC<{ children?: undefined } & LabelProp & SelectionProps>;
  Select: FC<{ children?: undefined } & LabelProp & SelectionProps>;
  Slider: FC<
    { children?: undefined } & LabelProp & ValueProps<number> & NumberProps
  >;
  SpinButton: FC<
    { children?: undefined } & LabelProp & ValueProps<number> & NumberProps
  >;
  Switch: FC<
    { children?: undefined } & LabelProp & ValueProps<boolean, "checked">
  >;
  Textbox: FC<{ children?: undefined } & LabelProp & ValueProps<string>>;
};

const Button: Components["Button"] = (props) => <button {...props} />;

const fieldStyles = css("field", {
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

const Checkbox: Components["Checkbox"] = ({
  label,
  checked,
  onCheckedChange,
}) => (
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

const ResizableList: FC<{ addButton: ReactNode }> = ({
  children,
  addButton,
}) => (
  <div>
    {children}
    {addButton}
  </div>
);

const resizableListItemStyles = css("resizable-list-item", {
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

const RadioGroup: Components["RadioGroup"] = ({
  label,
  onValueChange,
  options,
  value,
}) => {
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

const Select: Components["Select"] = ({
  label,
  onValueChange,
  options,
  value,
}) => (
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

const Slider: Components["Slider"] = ({
  label,
  onValueChange,
  ...restProps
}) => (
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

const SpinButton: Components["SpinButton"] = ({
  label,
  onValueChange,
  ...restProps
}) => (
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

const Switch: Components["Switch"] = ({ label, checked, onCheckedChange }) => (
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

const Textbox: Components["Textbox"] = ({ label, value, onValueChange }) => (
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

const defaultComponents = {
  Button,
  Checkbox,
  ResizableList,
  ResizableListItem,
  RadioGroup,
  Select,
  Slider,
  SpinButton,
  Switch,
  Textbox,
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

export const checkbox = /*#__PURE__*/ makeFlare<boolean, LabelProp>(
  ({ value, onChange, ...restProps }) => {
    const { Checkbox } = useContext(Components);
    return (
      <Checkbox checked={value} onCheckedChange={onChange} {...restProps} />
    );
  },
);

type OptionToStringOpt<T> = T extends string
  ? { optionToString?: undefined }
  : { optionToString: (option: T) => string };

export function radioGroup<T>(
  opts: LabelProp & {
    options: Readonly<T[]>;
    initial: T;
  } & OptionToStringOpt<T>,
): Flare<T> {
  const make = makeFlare<
    T,
    LabelProp & { options: Readonly<T[]> } & OptionToStringOpt<T>
  >(({ label, options, value, onChange, ...restProps }) => {
    const { RadioGroup } = useContext(Components);
    const optionToString: (option: T) => string = restProps.optionToString
      ? restProps.optionToString
      : (o) => o as unknown as string;
    return (
      <RadioGroup
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
    initial: T;
  } & OptionToStringOpt<T>,
): Flare<T> {
  const make = makeFlare<
    T,
    LabelProp & { options: Readonly<T[]> } & OptionToStringOpt<T>
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

export const slider = /*#__PURE__*/ makeFlare<number, LabelProp & NumberProps>(
  ({ min, max, onChange, ...restProps }) => {
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
  },
);

export const spinButton = /*#__PURE__*/ makeFlare<
  number,
  LabelProp & NumberProps
>(({ min, max, onChange, ...restProps }) => {
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

export const switch_ = /*#__PURE__*/ makeFlare<boolean, LabelProp>(
  ({ onChange, value, ...restProps }) => {
    const { Switch } = useContext(Components);
    return <Switch checked={value} onCheckedChange={onChange} {...restProps} />;
  },
);

export const textbox = /*#__PURE__*/ makeFlare<
  string,
  LabelProp & { nonEmpty?: boolean }
>(({ nonEmpty, onChange, ...restProps }) => {
  const { Textbox } = useContext(Components);
  return (
    <Textbox
      onValueChange={(v) => {
        if (v || !nonEmpty) {
          onChange(v);
        }
      }}
      {...restProps}
    />
  );
});

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
  initial,
  minLength = 0,
  maxLength,
}: {
  item: Flare<A>;
  initial?: Flare<A>[];
  minLength?: number;
  maxLength?: number;
}): Flare<A[]> {
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

export const styles = [fieldStyles, resizableListItemStyles]
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
