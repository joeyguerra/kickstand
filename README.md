# Kickstand

## Static Site Generator

Uses ExpressJS and HandlebarsJS.

## Setup

```bash
npm i
npm t
npm run dev
```

## Static Site

Add an HTML file in `layouts` to use as a layout template. Call it something like `index.html` and add

```html
{{> @partial-block}}
```

where you want the partial content to be inserted.

Add some HTML files in the `pages` folder. Something like `index.html` and put `{{#> index.html}}` at the top of it, indicating that you want Kikcstand to use the `layouts/index.html` template for the main layout document. Don't forget to close that tag with `{{/index.html}}` at the bottom of the document.