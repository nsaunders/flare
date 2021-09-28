# flare

## Table of contents

### Type aliases

- [Flare](#flare)
- [Unflare](#unflare)

### Functions

- [ap](#ap)
- [chain](#chain)
- [checkbox](#checkbox)
- [comboBox](#combobox)
- [ifElse](#ifelse)
- [map](#map)
- [match](#match)
- [of](#of)
- [radioGroup](#radiogroup)
- [resizableList](#resizablelist)
- [runFlare](#runflare)
- [runFlareWith](#runflarewith)
- [slider](#slider)
- [spinButton](#spinbutton)
- [switch\_](#switch_)
- [textBox](#textbox)

## Type aliases

### Flare

Ƭ **Flare**<`A`\>: `Object`

The basic building block of a Flare UI, capable of providing a value when
queried and invoking some upstream handler when the value changes

**`typeparam`** The value the Flare produces

#### Type parameters

| Name |
| :------ |
| `A` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `_tag` | ``"Flare"`` | Tags the object as a Flare.  **`internal`** |
| `make` | () => { `render`: `VoidFunctionComponent`<`Object`\> ; `query`: () => `A`  } | - |

___

### Unflare

Ƭ **Unflare**<`F`\>: `F` extends [`Flare`](#flare)<infer A\> ? `A` : `never`

A utility type that extracts the type parameter `A` from a `Flare<A>`

**`remarks`**
A `Flare<A>` produces values of type `A`. The `A` type can sometimes be
useful, for example to annotate function parameters where TypeScript
struggles to infer types.

**`typeparam`** The `Flare<A>` from which to extract `A`

#### Type parameters

| Name |
| :------ |
| `F` |

## Functions

### ap

▸ **ap**<`A`, `B`\>(`fa`): (`fab`: [`Flare`](#flare)<`fn`\>) => [`Flare`](#flare)<`B`\>

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

Applies a function to a value within a `Flare` context.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fab` | [`Flare`](#flare)<`fn`\> | The Flare that produces the function to apply |

##### Returns

[`Flare`](#flare)<`B`\>

A Flare that produces the result of the function application

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

Composes Flares in a sequence.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fa` | [`Flare`](#flare)<`A`\> | The first Flare whose value determines the second |

##### Returns

[`Flare`](#flare)<`B`\>

The Flare resulting from the composition

___

### checkbox

▸ `Const` **checkbox**(`options`): [`Flare`](#flare)<`boolean`\>

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
| `options` | { `initial`: `A` ; `label?`: `string` ; `options`: `A`[]  } & `C` | Combo box options |

#### Returns

[`Flare`](#flare)<`A`\>

The Flare that was created

___

### ifElse

▸ **ifElse**<`A`, `B`\>(`a`, `b`): (`cond`: `boolean`) => [`Flare`](#flare)<`A` \| `B`\>

Combines two Flares into one, producing the value from the original Flare
that corresponds to the boolean expression provided.

**`remarks`** This is typically used with [chain](#chain).

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

Combines two Flares into one, producing the value from the original Flare
that corresponds to the boolean expression provided.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cond` | `boolean` | The boolean expression used to select either the first Flare (when `true`) or the second (when `false`) |

##### Returns

[`Flare`](#flare)<`A` \| `B`\>

The first Flare when the boolean expession is `true`; otherwise, the
second Flare

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

Applies a function to a Flare to change its output.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fa` | [`Flare`](#flare)<`A`\> | The original Flare |

##### Returns

[`Flare`](#flare)<`B`\>

A Flare that produces the result of the function application

___

### match

▸ **match**<`M`\>(`map`): `M` extends `Record`<`string` \| `number`, [`Flare`](#flare)<infer A\>\> ? (`key`: keyof `M`) => [`Flare`](#flare)<`A`\> : `never`

Combines multiple Flares into one, producing the value from the original Flare
that corresponds to the expression provided.

**`remarks`** This is typically used with [chain](#chain).

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
| `options` | { `initial`: `A` ; `label?`: `string` ; `options`: `A`[]  } & `C` | Radio group options |

#### Returns

[`Flare`](#flare)<`A`\>

The Flare that was created

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

___

### runFlare

▸ **runFlare**(`controlsElementId`, `targetElementId`, `flare`): `void`

Runs the specified Flare, rendering its HTML output to the target element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `controlsElementId` | `string` | The id of the element in which to render the Flare controls |
| `targetElementId` | `string` | The id of the element in which to render the HTML output |
| `flare` | [`Flare`](#flare)<`HTML`\> | The Flare to run |

#### Returns

`void`

___

### runFlareWith

▸ **runFlareWith**<`A`\>(`controlsElementId`, `handler`, `flare`): `void`

Runs the specified Flare, invoking the handler on each change.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `A` | The value produced by the Flare |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `controlsElementId` | `string` | The id of the element in which to render the Flare controls |
| `handler` | (`a`: `A`) => `void` | The callback function to invoke each time the value changes |
| `flare` | [`Flare`](#flare)<`A`\> | The Flare to run |

#### Returns

`void`

___

### slider

▸ `Const` **slider**(`options`): [`Flare`](#flare)<`number`\>

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

___

### spinButton

▸ `Const` **spinButton**(`options`): [`Flare`](#flare)<`number`\>

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

___

### switch\_

▸ `Const` **switch_**(`options`): [`Flare`](#flare)<`boolean`\>

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

___

### textBox

▸ `Const` **textBox**(`options`): [`Flare`](#flare)<`string`\>

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
