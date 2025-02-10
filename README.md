# &lt;vaadin-app-layout&gt;

> ⚠️ Starting from Vaadin 20, the source code and issues for this component are migrated to the [`vaadin/web-components`](https://github.com/vaadin/web-components/tree/master/packages/vaadin-app-layout) monorepository.
> This repository contains the source code and releases of `<vaadin-app-layout>` for the Vaadin versions 10 to 19.

[&lt;vaadin-app-layout&gt;](https://vaadin.com/components/vaadin-app-layout) is a Web Component providing a quick and easy way to get a common application layout structure done, part of the [Vaadin components](https://vaadin.com/components).

[Live Demo ↗](https://vaadin.com/components/vaadin-app-layout/html-examples)
|
[API documentation ↗](https://vaadin.com/components/vaadin-app-layout/html-api)

[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-app-layout)](https://www.npmjs.com/package/@vaadin/vaadin-app-layout)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-app-layout)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-app-layout)
[![Discord](https://discordapp.com/api/guilds/732335336448852018/widget.png)](https://vaad.in/chat)

```html
<vaadin-app-layout>
  <vaadin-drawer-toggle slot="navbar touch-optimized"></vaadin-drawer-toggle>
  <h3 slot="navbar touch-optimized">Application Name</h3>
  <vaadin-tabs orientation="vertical" slot="drawer">
    <vaadin-tab>
      <a href="/profile">
        <iron-icon icon="lumo:user"></iron-icon>
        Profile
      </a>
    </vaadin-tab>
    <vaadin-tab>
      <a href="/contact">
        <iron-icon icon="lumo:phone"></iron-icon>
        Contact
      </a>
    </vaadin-tab>
  </vaadin-tabs>
  <div>Page content</div>
</vaadin-app-layout>
```

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-app-layout/master/screenshot.png" width="900" alt="Screenshot of vaadin-app-layout">](https://vaadin.com/components/vaadin-app-layout)

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-app-layout/master/screenshot-mobile.png" width="350" alt="Screenshot of vaadin-app-layout on mobile">](https://vaadin.com/components/vaadin-app-layout)


## Installation

The Vaadin components are distributed as Bower and npm packages.
Please note that the version range is the same, as the API has not changed.
You should not mix Bower and npm versions in the same application, though.

Unlike the official Polymer Elements, the converted Polymer 3 compatible Vaadin components
are only published on npm, not pushed to GitHub repositories.

### Polymer 2 and HTML Imports compatible version

Install `vaadin-app-layout`:

```sh
bower i vaadin/vaadin-app-layout --save
```

Once installed, import it in your application:

```html
<link rel="import" href="bower_components/vaadin-app-layout/vaadin-app-layout.html">
<link rel="import" href="bower_components/vaadin-app-layout/vaadin-drawer.toggle.html">
```
### Polymer 3 and ES Modules compatible version


Install `vaadin-app-layout`:

```sh
npm i @vaadin/vaadin-app-layout --save
```

Once installed, import it in your application:

```js
import '@vaadin/vaadin-app-layout/vaadin-app-layout.js';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle.js';
```

## Getting Started

Vaadin components use the Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The components with the Lumo theme:

  `theme/lumo/vaadin-app-layout.html`
  `theme/lumo/vaadin-drawer-toggle.html`

- The components with the Material theme:

  `theme/material/vaadin-app-layout.html`
  `theme/material/vaadin-drawer-toggle.html`

- Aliases for `theme/lumo/vaadin-app-layout.html` `theme/lumo/vaadin-drawer-toggle.html`

  `vaadin-app-layout.html`
  `vaadin-drawer-toggle.html`


## Running demos and tests in browser

1. Fork the `vaadin-app-layout` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `vaadin-app-layout` directory, run `npm install` and then `bower install` to install dependencies.

1. Make sure you have [polymer-cli](https://www.npmjs.com/package/polymer-cli) installed globally: `npm i -g polymer-cli`.

1. Run `polymer serve --open`, browser will automatically open the component API documentation.

1. You can also open demo or in-browser tests by adding **demo** or **test** to the URL, for example:

  - http://127.0.0.1:8080/components/vaadin-app-layout/demo
  - http://127.0.0.1:8080/components/vaadin-app-layout/test


## Running tests from the command line

> [!WARNING]
> Running tests locally from the CLI does not work due to outdated dependencies. Run tests via SauceLabs or in the browser instead.

1. When in the `vaadin-app-layout` directory, run `polymer test`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. You can check if your code is following our standards by running `npm run lint`, which will automatically lint all `.js` files as well as JavaScript snippets inside `.html` files.


## Contributing

  - Make sure your code is compliant with our code linters: `npm run lint`
  - Check that tests are passing: `polymer test`
  - [Submit a pull request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) with detailed title and description
  - Wait for response from one of Vaadin components team members


## License

Apache License 2.0

Vaadin collects development time usage statistics to improve this product. For details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.
