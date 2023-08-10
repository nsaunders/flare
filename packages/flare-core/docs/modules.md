# flare-core

## Table of contents

### Type Aliases

- [Button](modules.md#button)
- [ButtonProps](modules.md#buttonprops)
- [Checkbox](modules.md#checkbox)
- [CheckboxProps](modules.md#checkboxprops)
- [ComboBox](modules.md#combobox)
- [ComboBoxProps](modules.md#comboboxprops)
- [ComponentType](modules.md#componenttype)
- [Components](modules.md#components)
- [Flare](modules.md#flare)
- [RadioGroup](modules.md#radiogroup)
- [RadioGroupProps](modules.md#radiogroupprops)
- [ResizableList](modules.md#resizablelist)
- [ResizableListItem](modules.md#resizablelistitem)
- [ResizableListItemProps](modules.md#resizablelistitemprops)
- [ResizableListProps](modules.md#resizablelistprops)
- [RunFlareProps](modules.md#runflareprops)
- [Slider](modules.md#slider)
- [SliderProps](modules.md#sliderprops)
- [SpinButton](modules.md#spinbutton)
- [SpinButtonProps](modules.md#spinbuttonprops)
- [Switch](modules.md#switch)
- [SwitchProps](modules.md#switchprops)
- [TextBox](modules.md#textbox)
- [TextBoxProps](modules.md#textboxprops)
- [Unflare](modules.md#unflare)

### Functions

- [RunFlare](modules.md#runflare)
- [ap](modules.md#ap)
- [chain](modules.md#chain)
- [checkbox](modules.md#checkbox-1)
- [comboBox](modules.md#combobox-1)
- [ifElse](modules.md#ifelse)
- [makeFlare](modules.md#makeflare)
- [map](modules.md#map)
- [match](modules.md#match)
- [of](modules.md#of)
- [radioGroup](modules.md#radiogroup-1)
- [resizableList](modules.md#resizablelist-1)
- [slider](modules.md#slider-1)
- [spinButton](modules.md#spinbutton-1)
- [switch\_](modules.md#switch_)
- [textBox](modules.md#textbox-1)

## Type Aliases

### Button

Ƭ **Button**: [`ComponentType`](modules.md#componenttype)<[`ButtonProps`](modules.md#buttonprops)\>

The React component used to render a button

#### Defined in

[index.tsx:299](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L299)

___

### ButtonProps

Ƭ **ButtonProps**: `Object`

The props of the React component used to render a button

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | `ReactNode` | The content of the button * |
| `disabled?` | `boolean` | Whether the button should be disabled **`Remarks`** For example, this is used in resizable lists when adding or removing an item would exceed the minimum or maximum allowed list length. |
| `onClick` | () => `void` | The callback to invoke when the button is clicked * |

#### Defined in

[index.tsx:281](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L281)

___

### Checkbox

Ƭ **Checkbox**: [`ComponentType`](modules.md#componenttype)<[`CheckboxProps`](modules.md#checkboxprops)\>

The React component used to render a checkbox

#### Defined in

[index.tsx:314](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L314)

___

### CheckboxProps

Ƭ **CheckboxProps**: `Object`

The props of the React component used to render a checkbox

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `checked` | `boolean` | Whether the checkbox is checked |
| `label?` | `string` | The label to display next to the checkbox |
| `onCheckedChange` | (`checked`: `boolean`) => `void` | The callback to invoke when the checked state changes |

#### Defined in

[index.tsx:302](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L302)

___

### ComboBox

Ƭ **ComboBox**: [`ComponentType`](modules.md#componenttype)<[`ComboBoxProps`](modules.md#comboboxprops)\>

The React component used to render a combo box

#### Defined in

[index.tsx:332](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L332)

___

### ComboBoxProps

Ƭ **ComboBoxProps**: `Object`

The props of the React component used to render a combo box

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `label?` | `string` | The label to display next to the combo box |
| `onValueChange` | (`value`: `string`) => `void` | The callback to invoke when the selected value changes |
| `options` | `string`[] | The list of available options |
| `value` | `string` | The selected value |

#### Defined in

[index.tsx:317](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L317)

___

### ComponentType

Ƭ **ComponentType**<`P`\>: `ComponentClass`<`P`\> \| `VoidFunctionComponent`<`P`\>

A React component

**`Remarks`**

This varies from the `ComponentType` alias in the `@types/react` package in
that it does not implicitly add a `children` prop.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `P` | `Record`<`string`, `unknown`\> | Component props |

#### Defined in

[index.tsx:276](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L276)

___

### Components

Ƭ **Components**: `Object`

The React components used to render various Flares

**`Remarks`**

These can be customized through the `components` prop of the
[RunFlare](modules.md#runflare) component.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `Button` | [`Button`](modules.md#button) | The React component used to render a button |
| `Checkbox` | [`Checkbox`](modules.md#checkbox) | The React component used to render a checkbox |
| `ComboBox` | [`ComboBox`](modules.md#combobox) | The React component used to render a combo box |
| `RadioGroup` | [`RadioGroup`](modules.md#radiogroup) | The React component used to render a group of radio buttons |
| `ResizableList` | [`ResizableList`](modules.md#resizablelist) | The React component used to render a resizable list |
| `ResizableListItem` | [`ResizableListItem`](modules.md#resizablelistitem) | The React component used to render a resizable list item |
| `Slider` | [`Slider`](modules.md#slider) | The React component used to render a slider |
| `SpinButton` | [`SpinButton`](modules.md#spinbutton) | The React component used to render a spin button |
| `Switch` | [`Switch`](modules.md#switch) | The React component used to render a switch |
| `TextBox` | [`TextBox`](modules.md#textbox) | The React component used to render a text box |

#### Defined in

[index.tsx:658](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L658)

___

### Flare

Ƭ **Flare**<`A`\>: `Object`

The basic building block of a Flare UI, capable of providing a value when
queried and invoking some upstream handler when the value changes

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value the Flare produces |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `_tag` | ``"Flare"`` | Tags the object as a Flare. |
| `make` | () => { `query`: () => `A` ; `render`: `VoidFunctionComponent`<{ `onChange`: () => `void`  }\>  } | Initializes the Flare. |

#### Defined in

[index.tsx:20](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L20)

___

### RadioGroup

Ƭ **RadioGroup**: [`ComponentType`](modules.md#componenttype)<[`RadioGroupProps`](modules.md#radiogroupprops)\>

The React component used to render a group of radio buttons

#### Defined in

[index.tsx:377](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L377)

___

### RadioGroupProps

Ƭ **RadioGroupProps**: `Object`

The props of the React component used to render a group of radio buttons

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `label?` | `string` | The label to display next to the group of radio buttons |
| `onValueChange` | (`value`: `string`) => `void` | The callback to invoke when the selected value changes |
| `options` | `string`[] | The list of available options |
| `value` | `string` | The selected value |

#### Defined in

[index.tsx:362](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L362)

___

### ResizableList

Ƭ **ResizableList**: [`ComponentType`](modules.md#componenttype)<[`ResizableListProps`](modules.md#resizablelistprops)\>

The React component used to render a resizable list

#### Defined in

[index.tsx:344](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L344)

___

### ResizableListItem

Ƭ **ResizableListItem**: [`ComponentType`](modules.md#componenttype)<[`ResizableListItemProps`](modules.md#resizablelistitemprops)\>

The React component used to render a resizable list item

#### Defined in

[index.tsx:359](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L359)

___

### ResizableListItemProps

Ƭ **ResizableListItemProps**: `Object`

The props of the React component used to render a resizable list item

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `addButton` | `ReactNode` | The button used to add an item before the current item |
| `children` | `ReactNode` | The main content of the item |
| `removeButton` | `ReactNode` | The button used to remove the item |

#### Defined in

[index.tsx:347](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L347)

___

### ResizableListProps

Ƭ **ResizableListProps**: `Object`

The props of the React component used to render a resizable list

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `addButton` | `ReactNode` | The button used to add an item to the end of the list |
| `children` | `ReactNode` | The current list of items |

#### Defined in

[index.tsx:335](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L335)

___

### RunFlareProps

Ƭ **RunFlareProps**<`A`\>: `Object`

[RunFlare](modules.md#runflare) component props

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the Flare |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `components?` | `Partial`<[`Components`](modules.md#components)\> | Component overrides |
| `flare` | [`Flare`](modules.md#flare)<`A`\> | The Flare to run |
| `handler` | (`a`: `A`) => `void` | The procedure to run when the value changes |

#### Defined in

[index.tsx:710](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L710)

___

### Slider

Ƭ **Slider**: [`ComponentType`](modules.md#componenttype)<[`SliderProps`](modules.md#sliderprops)\>

The React component used to render a slider

#### Defined in

[index.tsx:401](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L401)

___

### SliderProps

Ƭ **SliderProps**: `Object`

The props of the React component used to render a slider

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `label?` | `string` | The label to display next to the slider |
| `max?` | `number` | The maximum value that can be selected |
| `min?` | `number` | The minimum value that can be selected |
| `onValueChange` | (`value`: `number`) => `void` | The callback to invoke when the selected value changes |
| `step?` | `number` | The granularity of the selected value |
| `value` | `number` | The selected value |

#### Defined in

[index.tsx:380](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L380)

___

### SpinButton

Ƭ **SpinButton**: [`ComponentType`](modules.md#componenttype)<[`SpinButtonProps`](modules.md#spinbuttonprops)\>

The React component used to render a spin button

#### Defined in

[index.tsx:425](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L425)

___

### SpinButtonProps

Ƭ **SpinButtonProps**: `Object`

The props of the React component used to render a spin button

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `label?` | `string` | The label to display next to the spin button |
| `max?` | `number` | The maximum value that can be selected |
| `min?` | `number` | The minimum value that can be selected |
| `onValueChange` | (`value`: `number`) => `void` | The callback to invoke when the selected value changes |
| `step?` | `number` | The granularity of the selected value |
| `value` | `number` | The selected value |

#### Defined in

[index.tsx:404](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L404)

___

### Switch

Ƭ **Switch**: [`ComponentType`](modules.md#componenttype)<[`SwitchProps`](modules.md#switchprops)\>

The React component used to render a switch

#### Defined in

[index.tsx:440](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L440)

___

### SwitchProps

Ƭ **SwitchProps**: `Object`

The props of the React component used to render a switch

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `checked` | `boolean` | Whether the switch is toggled on |
| `label?` | `string` | The label to display next to the switch |
| `onCheckedChange` | (`checked`: `boolean`) => `void` | The callback to invoke when the switch is toggled |

#### Defined in

[index.tsx:428](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L428)

___

### TextBox

Ƭ **TextBox**: [`ComponentType`](modules.md#componenttype)<[`TextBoxProps`](modules.md#textboxprops)\>

The React component used to render a text box

#### Defined in

[index.tsx:455](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L455)

___

### TextBoxProps

Ƭ **TextBoxProps**: `Object`

The props of the React component used to render a text box

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `label?` | `string` | The label to display next to the text box |
| `onValueChange` | (`value`: `string`) => `void` | The callback to invoke when the value changes |
| `value` | `string` | The value |

#### Defined in

[index.tsx:443](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L443)

___

### Unflare

Ƭ **Unflare**<`F`\>: `F` extends [`Flare`](modules.md#flare)<infer A\> ? `A` : `never`

A utility type that extracts the type parameter `A` from a `Flare<A>`

**`Remarks`**

A `Flare<A>` produces values of type `A`. The `A` type can sometimes be
useful, for example to annotate function parameters where TypeScript
struggles to infer types.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `F` | The `Flare<A>` from which to extract `A` |

#### Defined in

[index.tsx:56](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L56)

## Functions

### RunFlare

▸ **RunFlare**<`A`\>(`props`): `ReactElement`

A React component that renders the specified Flare.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`RunFlareProps`](modules.md#runflareprops)<`A`\> |

#### Returns

`ReactElement`

#### Defined in

[index.tsx:724](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L724)

___

### ap

▸ **ap**<`A`, `B`\>(`fa`): (`fab`: [`Flare`](modules.md#flare)<(`a`: `A`) => `B`\>) => [`Flare`](modules.md#flare)<`B`\>

Applies a function to a value within a `Flare` context.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value to which to apply the function |
| `B` | The return value of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fa` | [`Flare`](modules.md#flare)<`A`\> | The Flare that produces the original value |

#### Returns

`fn`

A Flare that produces the result of the function application

▸ (`fab`): [`Flare`](modules.md#flare)<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fab` | [`Flare`](modules.md#flare)<(`a`: `A`) => `B`\> |

##### Returns

[`Flare`](modules.md#flare)<`B`\>

#### Defined in

[index.tsx:69](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L69)

___

### chain

▸ **chain**<`A`, `B`\>(`afb`): (`fa`: [`Flare`](modules.md#flare)<`A`\>) => [`Flare`](modules.md#flare)<`B`\>

Composes Flares in a sequence.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the first Flare |
| `B` | The value produced by the second Flare |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `afb` | (`a`: `A`) => [`Flare`](modules.md#flare)<`B`\> | The function to apply to the output of the first Flare to produce the second Flare |

#### Returns

`fn`

The Flare resulting from the composition

▸ (`fa`): [`Flare`](modules.md#flare)<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fa` | [`Flare`](modules.md#flare)<`A`\> |

##### Returns

[`Flare`](modules.md#flare)<`B`\>

#### Defined in

[index.tsx:103](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L103)

___

### checkbox

▸ **checkbox**(`options`): [`Flare`](modules.md#flare)<`boolean`\>

Creates a Flare that renders as a checkbox control.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Checkbox options |
| `options.initial` | `boolean` | Initial checked state |
| `options.label?` | `string` | Checkbox label |

#### Returns

[`Flare`](modules.md#flare)<`boolean`\>

The Flare that was created

#### Defined in

[index.tsx:239](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L239)

___

### comboBox

▸ **comboBox**<`A`, `C`\>(`options`): [`Flare`](modules.md#flare)<`A`\>

Creates a Flare that renders as a combo box.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `A` | `A` | The value that the combo box produces |
| `C` | extends { `optionToString?`: `undefined`  } \| { `optionToString`: (`option`: `A`) => `string`  } | An additional `optionToString` option, required to convert `A` to `string` when it doesn't already extend `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | { `initial`: `A` ; `label?`: `string` ; `options`: readonly `A`[]  } & `C` | Combo box options |

#### Returns

[`Flare`](modules.md#flare)<`A`\>

The Flare that was created

#### Defined in

[index.tsx:779](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L779)

___

### ifElse

▸ **ifElse**<`A`, `B`\>(`a`, `b`): (`cond`: `boolean`) => [`Flare`](modules.md#flare)<`A` \| `B`\>

Combines two Flares into one, producing the value from the original Flare
that corresponds to the boolean expression provided.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the first Flare |
| `B` | The value produced by the second Flare |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Flare`](modules.md#flare)<`A`\> | The value produced by the first Flare |
| `b` | [`Flare`](modules.md#flare)<`B`\> | The value produced by the second Flare |

#### Returns

`fn`

The first Flare when the boolean expession is `true`; otherwise, the
second Flare

▸ (`cond`): [`Flare`](modules.md#flare)<`A` \| `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `cond` | `boolean` |

##### Returns

[`Flare`](modules.md#flare)<`A` \| `B`\>

**`Remarks`**

This is typically used with [chain](modules.md#chain).

#### Defined in

[index.tsx:190](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L190)

___

### makeFlare

▸ **makeFlare**<`O`, `A`\>(`Component`): (`options`: `O` extends { `initial`: `A`  } ? `O` : `never`) => [`Flare`](modules.md#flare)<`A`\>

Turns an ordinary React component into a function that produces a Flare.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `O` | `O` | Flare options, forwarded to the component as props |
| `A` | `O` extends { `initial`: `X`  } ? `X` : `never` | The value the Flare produces |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Component` | (`props`: `Omit`<`O`, ``"initial"``\> & { `onChange`: (`value`: `A`) => `void` ; `value`: `A`  }) => `Element` | The React component to turn into a Flare |

#### Returns

`fn`

A Flare that renders as the provided React component

▸ (`options`): [`Flare`](modules.md#flare)<`A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `O` extends { `initial`: `A`  } ? `O` : `never` |

##### Returns

[`Flare`](modules.md#flare)<`A`\>

**`Remarks`**

This is primarily intended for internal use. Before creating custom
Flares, consider using CSS to customize existing elements or using the
`components` prop of [RunFlare](modules.md#runflare).

#### Defined in

[index.tsx:234](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L234)

___

### map

▸ **map**<`A`, `B`\>(`ab`): (`fa`: [`Flare`](modules.md#flare)<`A`\>) => [`Flare`](modules.md#flare)<`B`\>

Applies a function to a Flare to change its output.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the original Flare |
| `B` | The value produced by the modified Flare |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ab` | (`a`: `A`) => `B` | The function to apply to the output of the original Flare |

#### Returns

`fn`

A Flare that produces the result of the function application

▸ (`fa`): [`Flare`](modules.md#flare)<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fa` | [`Flare`](modules.md#flare)<`A`\> |

##### Returns

[`Flare`](modules.md#flare)<`B`\>

#### Defined in

[index.tsx:141](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L141)

___

### match

▸ **match**<`M`\>(`map`): `M` extends `Record`<`string` \| `number`, [`Flare`](modules.md#flare)<infer A\>\> ? (`key`: keyof `M`) => [`Flare`](modules.md#flare)<`A`\> : `never`

Combines multiple Flares into one, producing the value from the original Flare
that corresponds to the expression provided.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `M` | The map of Flares from which to select |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `M` | The map of Flares from which to select |

#### Returns

`M` extends `Record`<`string` \| `number`, [`Flare`](modules.md#flare)<infer A\>\> ? (`key`: keyof `M`) => [`Flare`](modules.md#flare)<`A`\> : `never`

A function that returns the Flare from the `map` corresponding to the
specified `key`

**`Remarks`**

This is typically used with [chain](modules.md#chain).

#### Defined in

[index.tsx:210](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L210)

___

### of

▸ **of**<`A`\>(`a`): [`Flare`](modules.md#flare)<`A`\>

Lifts a value into a `Flare` context.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value to lift |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | The value to lift |

#### Returns

[`Flare`](modules.md#flare)<`A`\>

A Flare that produces the specified value `a`

#### Defined in

[index.tsx:163](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L163)

___

### radioGroup

▸ **radioGroup**<`A`, `C`\>(`options`): [`Flare`](modules.md#flare)<`A`\>

Creates a Flare that renders as a group of radio buttons.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `A` | `A` | The value that the radio button group produces |
| `C` | extends { `optionToString?`: `undefined`  } \| { `optionToString`: (`option`: `A`) => `string`  } | An additional `optionToString` option, required to convert `A` to `string` when it doesn't already extend `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | { `initial`: `A` ; `label?`: `string` ; `options`: readonly `A`[]  } & `C` | Radio group options |

#### Returns

[`Flare`](modules.md#flare)<`A`\>

The Flare that was created

#### Defined in

[index.tsx:821](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L821)

___

### resizableList

▸ **resizableList**<`A`\>(`options`): [`Flare`](modules.md#flare)<`A`[]\>

Creates a Flare that renders as a resizable list of Flares.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Resizable list options |
| `options.initial?` | [`Flare`](modules.md#flare)<`A`\>[] | The initial list of Flares |
| `options.item` | [`Flare`](modules.md#flare)<`A`\> | The Flare used each time an item is added to the list |
| `options.maxLength?` | `number` | The maximum length of the list |
| `options.minLength?` | `number` | The minimum length of the list |

#### Returns

[`Flare`](modules.md#flare)<`A`[]\>

The Flare that was created

#### Defined in

[index.tsx:994](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L994)

___

### slider

▸ **slider**(`options`): [`Flare`](modules.md#flare)<`number`\>

Creates a Flare that renders as a slider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Slider options |
| `options.initial` | `number` | Initial slider state |
| `options.label?` | `string` | Slider label |
| `options.max?` | `number` | Maximum selectable value |
| `options.min?` | `number` | Minimum selectable value |
| `options.step?` | `number` | The granularity of the slider value |

#### Returns

[`Flare`](modules.md#flare)<`number`\>

The Flare that was created

#### Defined in

[index.tsx:239](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L239)

___

### spinButton

▸ **spinButton**(`options`): [`Flare`](modules.md#flare)<`number`\>

Creates a Flare that renders as a spin button.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Spin button options |
| `options.initial` | `number` | Initial spin button state |
| `options.label?` | `string` | Spin button label |
| `options.max?` | `number` | Maximum selectable value |
| `options.min?` | `number` | Minimum selectable value |
| `options.step?` | `number` | The granularity of the spin button value |

#### Returns

[`Flare`](modules.md#flare)<`number`\>

The Flare that was created

#### Defined in

[index.tsx:239](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L239)

___

### switch\_

▸ **switch_**(`options`): [`Flare`](modules.md#flare)<`boolean`\>

Creates a Flare that renders as a switch.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Switch options |
| `options.initial` | `boolean` | Initial switch state |
| `options.label?` | `string` | Switch label |

#### Returns

[`Flare`](modules.md#flare)<`boolean`\>

The Flare that was created

#### Defined in

[index.tsx:239](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L239)

___

### textBox

▸ **textBox**(`options`): [`Flare`](modules.md#flare)<`string`\>

Creates a Flare that renders as a text box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Text box options |
| `options.initial` | `string` | Initial text box state |
| `options.label?` | `string` | Text box label |
| `options.nonEmpty?` | `boolean` | - |

#### Returns

[`Flare`](modules.md#flare)<`string`\>

The Flare that was created

#### Defined in

[index.tsx:239](https://github.com/nsaunders/flare/blob/9315e13/packages/flare-core/src/index.tsx#L239)
