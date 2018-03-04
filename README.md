# jsincss-auto-expand

An auto-expand plugin for [jsincss](https://github.com/tomhodgins/jsincss)

## About

This plugin is a JavaScript module that works with [JS-in-CSS stylesheets](https://responsive.style/theory/what-is-a-jic-stylesheet.html), to expand elements to match their scroll dimensions.

## Downloading

You can download `index.js` and add it to your codebase, or download it with npm:

```bash
npm install jsincss-auto-expand
```

Another option that works for building or testing, that isn't ideal for production use, is linking to the module directly from a CDN like unpkg:

```html
<script type=module>
  import expand from 'https://unpkg.com/jsincss-auto-expand/index.js'
</script>
```

## Importing

You can import the plugin into your own JavaScript modules in a couple of ways.

The first way is using the native [`import` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) in JavaScript. Here you can assign any name you want to the function you are importing, and you only need to provide a path to the plugin's `index.js` file:

```js
import expand from './node_modules/jsincss-auto-expand/index.js'
```

If you want to use `require` to load this plugin instead, and use a bundler like Webpack or Parcel, make sure to add `.default` as you require it:

```js
const expand = require('jsincss-auto-expand').default
```

Once you have imported this plugin into your module, you can use the plugin as `expand()`

## Using JS-in-CSS Stylesheets

The main goal of this plugin is to allow CSS authors the ability to style elements that can auto expand in height and width based on their contents and scroll dimensions as rendered in the browser.

The plugin has the following format:

```js
expand(selector, rule)
```

- `selector` is a string containing a CSS selector
- `option` is a string containing the desired direction: `width`, `height`, or `both`

## Example

This example will use the `jsincss` plugin to load a JS-in-CSS stylesheet making use of this plugin. To test it in a JavaScript module, import both the `jsincss` package and any helper plugins you want:

```js
<script type=module>
  import jsincss from 'https://unpkg.com/jsincss/index.js'
  import expand from 'https://unpkg.com/jsincss-auto-expand/index.js'

  jsincss(() => `

    ${expand('input', 'width')}

    ${expand('textarea', 'height')}

  `)
</script>
```

It's also possible to write your stylesheets as a separate JavaScript module like this, where you import any helper plugins at the top of the stylesheet:

```js
import expand from 'https://unpkg.com/jsincss-auto-expand/index.js'

export default () => `

  ${expand('input', 'width')}

  ${expand('textarea', 'height')}

`
```

And then import both the `jsincss` plugin and the stylesheet into your code and run them like this, suppling any `selector` or `events` list the `jsincss` plugin might need to apply the stylesheet only the the element(s) and event(s) you require, depending on what you're doing:

```js
import jsincss from 'https://unpkg.com/jsincss/index.js'
import stylesheet from './path/to/stylesheet.js'

jsincss(stylesheet)
```

## Compatible JS-in-CSS Stylesheet Loaders

- [jsincss](https://github.com/tomhodgins/jsincss)