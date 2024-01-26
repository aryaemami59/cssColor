# CSS color

CSS color resolver, parser, converter.


## Install

```console
npm i @asamuzakjp/css-color
```


## Usage

```javascript
import { convert, parse, resolve } from '@asamuzakjp/css-color';
```

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## resolve

resolve CSS color

### Parameters

* `color` **[string][93]** color value
  * [&lt;system-color&gt;](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color)s are not supported
* `opt` **[object][94]?** options
  * `opt.currentColor` **[string][93]?** color to use for `currentcolor` keyword
  * `opt.format` **[string][93]?** output format, one of `rgb`(default), `array`, `hex` or `hexAlpha`
    * `hexAlpha` gets hex color with alpha channel, i.e. `#rrggbbaa`
  * `opt.key` **any?** key e.g. CSS property `background-color`

Returns **([string][93]? | [Array][96])** `rgba?()`, `[r, g, b, a]`, `#rrggbb(aa)?`, `null`, or if `key` is specified, `[key, rgba?()|[r, g, b, a]|#rrggbb(aa)?|null]`
* in `rgb`, `r`, `g`, `b` values are rounded
* in `array`, values are floating point
* in `hex`, `transparent` resolves as `null`


## parse

parse CSS color

### Parameters

* `value` **[string][93]** color value
  * `color-mix()` and [&lt;system-color&gt;](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color)s are not supported
* `opt` **[object][94]?** options
  * `opt.d50` **[boolean][95]?** get xyz values in d50 white point

Returns **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1


## convert

container for conversion functions


## convert.xyzToHex

convert xyz to hex color

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[string][93]** `#rrggbbaa`


## convert.xyzToHsl

convert xyz to hsl

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[h, s, l, a]` h: 0..360 s|l: 0..100 a: 0..1


## convert.xyzToHwb

convert xyz to hwb

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[h, w, b, a]` h: 0..360 w|b: 0..100 a: 0..1


## convert.xyzToOklab

convert xyz to oklab

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[l, a, b, A]` l|A: 0..1 a|b: -0.4..0.4


## convert.xyzToOklch

convert xyz to oklch

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[l, c, h, a]` l|a: 0..1 c: 0..0.4 h: 0..360


## convert.xyzToRgb

convert xyz to rgb

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[r, g, b, a]` r|g|b: 0..255 a: 0..1


## convert.xyzToXyzD50

convert xyz to xyz-d50

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** xyz - `[x, y, z, a]` x|y|z|a: 0..1


## convert.xyzD50ToHex

convert xyz D50 to hex color

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[string][93]** #rrggbbaa


## convert.xyzD50ToLab

convert xyz-d50 to lab

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[l, a, b, A]` l: 0..100 a|b: -125..125 A: 0..1


## convert.xyzD50ToLch

convert xyz-d50 to lch

### Parameters

* `xyz` **[Array][96]<[number][97]>** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[l, c, h, a]` l: 0..100 c: 0..150 h: 0..360 a: 0..1


## convert.xyzD50ToRgb

convert xyz D50 to rgb

### Parameters

* `xyz` **[Array][96]** `[x, y, z, a]` x|y|z|a: 0..1

Returns **[Array][96]<[number][97]>** `[r, g, b, a]` r|g|b: 0..255 a: 0..1

[93]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
[94]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
[95]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[96]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
[97]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number
