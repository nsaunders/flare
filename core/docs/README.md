# flare-core

## Table of contents

### Type Aliases

- [Button](#button)
- [ButtonProps](#buttonprops)
- [Checkbox](#checkbox)
- [CheckboxProps](#checkboxprops)
- [ComboBox](#combobox)
- [ComboBoxProps](#comboboxprops)
- [ComponentType](#componenttype)
- [Components](#components)
- [Flare](#flare)
- [RadioGroup](#radiogroup)
- [RadioGroupProps](#radiogroupprops)
- [ResizableList](#resizablelist)
- [ResizableListItem](#resizablelistitem)
- [ResizableListItemProps](#resizablelistitemprops)
- [ResizableListProps](#resizablelistprops)
- [RunFlareProps](#runflareprops)
- [Slider](#slider)
- [SliderProps](#sliderprops)
- [SpinButton](#spinbutton)
- [SpinButtonProps](#spinbuttonprops)
- [Switch](#switch)
- [SwitchProps](#switchprops)
- [TextBox](#textbox)
- [TextBoxProps](#textboxprops)
- [Unflare](#unflare)

### Functions

- [RunFlare](#runflare)
- [ap](#ap)
- [chain](#chain)
- [checkbox](#checkbox-1)
- [comboBox](#combobox-1)
- [ifElse](#ifelse)
- [makeFlare](#makeflare)
- [map](#map)
- [match](#match)
- [of](#of)
- [radioGroup](#radiogroup-1)
- [resizableList](#resizablelist-1)
- [slider](#slider-1)
- [spinButton](#spinbutton-1)
- [switch\_](#switch_)
- [textBox](#textbox-1)

## Type Aliases

### Button

Ƭ **Button**: [`ComponentType`](#componenttype)<[`ButtonProps`](#buttonprops)\>

The React component used to render a button

#### Defined in

[index.tsx:302](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L302)

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

[index.tsx:284](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L284)

___

### Checkbox

Ƭ **Checkbox**: [`ComponentType`](#componenttype)<[`CheckboxProps`](#checkboxprops)\>

The React component used to render a checkbox

#### Defined in

[index.tsx:317](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L317)

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

[index.tsx:305](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L305)

___

### ComboBox

Ƭ **ComboBox**: [`ComponentType`](#componenttype)<[`ComboBoxProps`](#comboboxprops)\>

The React component used to render a combo box

#### Defined in

[index.tsx:335](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L335)

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

[index.tsx:320](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L320)

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

[index.tsx:279](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L279)

___

### Components

Ƭ **Components**: `Object`

The React components used to render various Flares

**`Remarks`**

These can be customized through the `components` prop of the
[RunFlare](#runflare) component.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `Button` | [`Button`](#button) | The React component used to render a button |
| `Checkbox` | [`Checkbox`](#checkbox) | The React component used to render a checkbox |
| `ComboBox` | [`ComboBox`](#combobox) | The React component used to render a combo box |
| `RadioGroup` | [`RadioGroup`](#radiogroup) | The React component used to render a group of radio buttons |
| `ResizableList` | [`ResizableList`](#resizablelist) | The React component used to render a resizable list |
| `ResizableListItem` | [`ResizableListItem`](#resizablelistitem) | The React component used to render a resizable list item |
| `Slider` | [`Slider`](#slider) | The React component used to render a slider |
| `SpinButton` | [`SpinButton`](#spinbutton) | The React component used to render a spin button |
| `Switch` | [`Switch`](#switch) | The React component used to render a switch |
| `TextBox` | [`TextBox`](#textbox) | The React component used to render a text box |

#### Defined in

[index.tsx:652](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L652)

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

[index.tsx:23](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L23)

___

### RadioGroup

Ƭ **RadioGroup**: [`ComponentType`](#componenttype)<[`RadioGroupProps`](#radiogroupprops)\>

The React component used to render a group of radio buttons

#### Defined in

[index.tsx:380](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L380)

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

[index.tsx:365](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L365)

___

### ResizableList

Ƭ **ResizableList**: [`ComponentType`](#componenttype)<[`ResizableListProps`](#resizablelistprops)\>

The React component used to render a resizable list

#### Defined in

[index.tsx:347](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L347)

___

### ResizableListItem

Ƭ **ResizableListItem**: [`ComponentType`](#componenttype)<[`ResizableListItemProps`](#resizablelistitemprops)\>

The React component used to render a resizable list item

#### Defined in

[index.tsx:362](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L362)

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

[index.tsx:350](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L350)

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

[index.tsx:338](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L338)

___

### RunFlareProps

Ƭ **RunFlareProps**<`A`\>: `Object`

[RunFlare](#runflare) component props

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the Flare |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `components?` | `Partial`<[`Components`](#components)\> | Component overrides |
| `flare` | [`Flare`](#flare)<`A`\> | The Flare to run |
| `handler` | (`a`: `A`) => `void` | The procedure to run when the value changes |

#### Defined in

[index.tsx:704](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L704)

___

### Slider

Ƭ **Slider**: [`ComponentType`](#componenttype)<[`SliderProps`](#sliderprops)\>

The React component used to render a slider

#### Defined in

[index.tsx:404](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L404)

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

[index.tsx:383](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L383)

___

### SpinButton

Ƭ **SpinButton**: [`ComponentType`](#componenttype)<[`SpinButtonProps`](#spinbuttonprops)\>

The React component used to render a spin button

#### Defined in

[index.tsx:428](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L428)

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

[index.tsx:407](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L407)

___

### Switch

Ƭ **Switch**: [`ComponentType`](#componenttype)<[`SwitchProps`](#switchprops)\>

The React component used to render a switch

#### Defined in

[index.tsx:443](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L443)

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

[index.tsx:431](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L431)

___

### TextBox

Ƭ **TextBox**: [`ComponentType`](#componenttype)<[`TextBoxProps`](#textboxprops)\>

The React component used to render a text box

#### Defined in

[index.tsx:458](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L458)

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

[index.tsx:446](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L446)

___

### Unflare

Ƭ **Unflare**<`F`\>: `F` extends [`Flare`](#flare)<infer A\> ? `A` : `never`

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

[index.tsx:59](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L59)

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
| `props` | [`RunFlareProps`](#runflareprops)<`A`\> |

#### Returns

`ReactElement`

#### Defined in

[index.tsx:718](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L718)

___

### ap

▸ **ap**<`A`, `B`\>(`fa`): (`fab`: [`Flare`](#flare)<(`a`: `A`) => `B`\>) => [`Flare`](#flare)<`B`\>

Applies a function to a value within a `Flare` context.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value to which to apply the function |
| `B` | The return value of the function |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fa` | [`Flare`](#flare)<`A`\> | The Flare that produces the original value |

#### Returns

`fn`

A Flare that produces the result of the function application

▸ (`fab`): [`Flare`](#flare)<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fab` | [`Flare`](#flare)<(`a`: `A`) => `B`\> |

##### Returns

[`Flare`](#flare)<`B`\>

#### Defined in

[index.tsx:72](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L72)

___

### chain

▸ **chain**<`A`, `B`\>(`afb`): (`fa`: [`Flare`](#flare)<`A`\>) => [`Flare`](#flare)<`B`\>

Composes Flares in a sequence.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the first Flare |
| `B` | The value produced by the second Flare |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `afb` | (`a`: `A`) => [`Flare`](#flare)<`B`\> | The function to apply to the output of the first Flare to produce the second Flare |

#### Returns

`fn`

The Flare resulting from the composition

▸ (`fa`): [`Flare`](#flare)<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fa` | [`Flare`](#flare)<`A`\> |

##### Returns

[`Flare`](#flare)<`B`\>

#### Defined in

[index.tsx:106](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L106)

___

### checkbox

▸ **checkbox**(`options`): [`Flare`](#flare)<`boolean`\>

Creates a Flare that renders as a checkbox control.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Checkbox options |
| `options.initial` | `boolean` | Initial checked state |
| `options.label?` | `string` | Checkbox label |

#### Returns

[`Flare`](#flare)<`boolean`\>

The Flare that was created

#### Defined in

[index.tsx:242](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L242)

___

### comboBox

▸ **comboBox**<`A`, `C`\>(`options`): [`Flare`](#flare)<`A`\>

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

[`Flare`](#flare)<`A`\>

The Flare that was created

#### Defined in

[index.tsx:773](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L773)

___

### ifElse

▸ **ifElse**<`A`, `B`\>(`a`, `b`): (`cond`: `boolean`) => [`Flare`](#flare)<`A` \| `B`\>

Combines two Flares into one, producing the value from the original Flare
that corresponds to the boolean expression provided.

**`Remarks`**

This is typically used with [chain](#chain).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the first Flare |
| `B` | The value produced by the second Flare |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Flare`](#flare)<`A`\> | The value produced by the first Flare |
| `b` | [`Flare`](#flare)<`B`\> | The value produced by the second Flare |

#### Returns

`fn`

The first Flare when the boolean expession is `true`; otherwise, the
second Flare

▸ (`cond`): [`Flare`](#flare)<`A` \| `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `cond` | `boolean` |

##### Returns

[`Flare`](#flare)<`A` \| `B`\>

#### Defined in

[index.tsx:193](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L193)

___

### makeFlare

▸ **makeFlare**<`O`, `A`\>(`Component`): (`options`: `O` extends { `initial`: `A`  } ? `O` : `never`) => [`Flare`](#flare)<`A`\>

Turns an ordinary React component into a function that produces a Flare.

**`Remarks`**

This is primarily intended for internal use. Before creating custom
Flares, consider using CSS to customize existing elements or using the
`components` prop of [RunFlare](#runflare).

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

▸ (`options`): [`Flare`](#flare)<`A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `O` extends { `initial`: `A`  } ? `O` : `never` |

##### Returns

[`Flare`](#flare)<`A`\>

#### Defined in

[index.tsx:237](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L237)

___

### map

▸ **map**<`A`, `B`\>(`ab`): (`fa`: [`Flare`](#flare)<`A`\>) => [`Flare`](#flare)<`B`\>

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

▸ (`fa`): [`Flare`](#flare)<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `fa` | [`Flare`](#flare)<`A`\> |

##### Returns

[`Flare`](#flare)<`B`\>

#### Defined in

[index.tsx:144](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L144)

___

### match

▸ **match**<`M`\>(`map`): `M` extends `Record`<`string` \| `number`, [`Flare`](#flare)<infer A\>\> ? (`key`: keyof `M`) => [`Flare`](#flare)<`A`\> : `never`

Combines multiple Flares into one, producing the value from the original Flare
that corresponds to the expression provided.

**`Remarks`**

This is typically used with [chain](#chain).

#### Type parameters

| Name | Description |
| :------ | :------ |
| `M` | The map of Flares from which to select |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `M` | The map of Flares from which to select |

#### Returns

`M` extends `Record`<`string` \| `number`, [`Flare`](#flare)<infer A\>\> ? (`key`: keyof `M`) => [`Flare`](#flare)<`A`\> : `never`

A function that returns the Flare from the `map` corresponding to the
specified `key`

#### Defined in

[index.tsx:213](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L213)

___

### of

▸ **of**<`A`\>(`a`): [`Flare`](#flare)<`A`\>

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

[`Flare`](#flare)<`A`\>

A Flare that produces the specified value `a`

#### Defined in

[index.tsx:166](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L166)

___

### radioGroup

▸ **radioGroup**<`A`, `C`\>(`options`): [`Flare`](#flare)<`A`\>

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

[`Flare`](#flare)<`A`\>

The Flare that was created

#### Defined in

[index.tsx:815](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L815)

___

### resizableList

▸ **resizableList**<`A`\>(`options`): [`Flare`](#flare)<`A`[]\>

Creates a Flare that renders as a resizable list of Flares.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Resizable list options |
| `options.initial?` | [`Flare`](#flare)<`A`\>[] | The initial list of Flares |
| `options.item` | [`Flare`](#flare)<`A`\> | The Flare used each time an item is added to the list |
| `options.maxLength?` | `number` | The maximum length of the list |
| `options.minLength?` | `number` | The minimum length of the list |

#### Returns

[`Flare`](#flare)<`A`[]\>

The Flare that was created

#### Defined in

[index.tsx:988](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L988)

___

### slider

▸ **slider**(`options`): [`Flare`](#flare)<`number`\>

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

[`Flare`](#flare)<`number`\>

The Flare that was created

#### Defined in

[index.tsx:242](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L242)

___

### spinButton

▸ **spinButton**(`options`): [`Flare`](#flare)<`number`\>

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

[`Flare`](#flare)<`number`\>

The Flare that was created

#### Defined in

[index.tsx:242](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L242)

___

### switch\_

▸ **switch_**(`options`): [`Flare`](#flare)<`boolean`\>

Creates a Flare that renders as a switch.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Switch options |
| `options.initial` | `boolean` | Initial switch state |
| `options.label?` | `string` | Switch label |

#### Returns

[`Flare`](#flare)<`boolean`\>

The Flare that was created

#### Defined in

[index.tsx:242](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L242)

___

### textBox

▸ **textBox**(`options`): [`Flare`](#flare)<`string`\>

Creates a Flare that renders as a text box.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Text box options |
| `options.initial` | `string` | Initial text box state |
| `options.label?` | `string` | Text box label |
| `options.nonEmpty?` | `boolean` | - |

#### Returns

[`Flare`](#flare)<`string`\>

The Flare that was created

#### Defined in

[index.tsx:242](https://github.com/nsaunders/flare/blob/528cf19/core/src/index.tsx#L242)
