[![npm version](https://badgen.net/npm/v/@vaadin/vaadin-app-layout)](https://www.npmjs.com/package/@vaadin/vaadin-app-layout)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/vaadin/vaadin-app-layout)
[![Build Status](https://travis-ci.org/vaadin/vaadin-app-layout.svg?branch=master)](https://travis-ci.org/vaadin/vaadin-app-layout)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/vaadin/web-components?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/vaadinvaadin-app-layout)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/stars/vaadinvaadin-app-layout.svg)](https://vaadin.com/directory/component/vaadinvaadin-app-layout)

# &lt;vaadin-app-layout&gt;

[&lt;vaadin-app-layout&gt;](https://vaadin.com/components/vaadin-app-layout) is a Web Component providing a quick and easy way to get a common application layout structure done, part of the [Vaadin components](https://vaadin.com/components).

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-app-layout/master/screenshot.png" width="900" alt="Screenshot of vaadin-app-layout">](https://vaadin.com/components/vaadin-app-layout)

[<img src="https://raw.githubusercontent.com/vaadin/vaadin-app-layout/master/screenshot-mobile.png" width="350" alt="Screenshot of vaadin-app-layout on mobile">](https://vaadin.com/components/vaadin-app-layout)

## Example Usage

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
