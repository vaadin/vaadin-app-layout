import { css } from 'lit-element';

export const appLayoutStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    height: 100%;
    transition: padding var(--vaadin-app-layout-transition);
    --vaadin-app-layout-transition: 200ms;
    --vaadin-app-layout-navbar-offset-top: var(--_vaadin-app-layout-navbar-offset-size);
    --vaadin-app-layout-navbar-offset-bottom: var(--_vaadin-app-layout-navbar-bottom-offset-size);
  }

  :host([hidden]),
  [hidden] {
    display: none !important;
  }

  :host([no-anim]) {
    --vaadin-app-layout-transition: none !important;
  }

  :host([drawer-opened]) {
    --vaadin-app-layout-drawer-offset-left: var(--_vaadin-app-layout-drawer-offset-size);
  }

  :host([overlay]) {
    --vaadin-app-layout-drawer-offset-left: 0;
    --vaadin-app-layout-navbar-offset-left: 0;
  }

  /* navbar */
  [part~='navbar'] {
    position: sticky;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
    left: 0;
    transition: left var(--vaadin-app-layout-transition);
    padding-top: var(--safe-area-inset-top);
    padding-left: var(--safe-area-inset-left);
    padding-right: var(--safe-area-inset-right);
    z-index: 1;
  }

  [part~='navbar']::before {
    display: block;
    content: '';
  }

  [part~='navbar'][part~='navbar-bottom'] {
    top: auto;
    bottom: 0;
    padding-bottom: var(--safe-area-inset-bottom);
  }

  /* drawer */
  [part='drawer'] {
    position: absolute;
    top: var(--vaadin-app-layout-navbar-offset-top, 0);
    right: auto;
    bottom: var(--vaadin-app-layout-navbar-offset-bottom, var(--vaadin-viewport-offset-bottom, 0));
    left: var(--vaadin-app-layout-navbar-offset-left, 0);
    transition: transform var(--vaadin-app-layout-transition), top var(--vaadin-app-layout-transition);
    transform: translateX(-100%);
    max-width: 90%;
    width: 16em;
    box-sizing: border-box;
    padding: var(--safe-area-inset-top) 0 var(--safe-area-inset-bottom) var(--safe-area-inset-left);
    outline: none;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  :host([drawer-opened]) [part='drawer'] {
    transform: translateX(0%);
    touch-action: manipulation;
  }

  /* backdrop */
  [part='backdrop'] {
    background-color: #000;
    opacity: 0.3;
  }

  :host(:not([drawer-opened])) [part='backdrop'] {
    opacity: 0;
  }

  :host([overlay]) [part='backdrop'] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    transition: opacity var(--vaadin-app-layout-transition);
    -webkit-tap-highlight-color: transparent;
  }

  :host([overlay]) [part='drawer'] {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 20em;
  }

  :host([overlay]) [part='drawer'],
  :host([overlay]) [part='backdrop'] {
    z-index: 2;
  }

  :host([drawer-opened][overlay]) [part='backdrop'] {
    pointer-events: auto;
    touch-action: manipulation;
  }

  /* content */
  [part='content'] {
    flex-grow: 1;
    transition: padding var(--vaadin-app-layout-transition);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  :host([drawer-opened]:not([overlay]):not([primary-section='drawer'])) [part='content'] {
    padding-left: var(--vaadin-app-layout-drawer-offset-left);
  }

  /* primary drawer */
  :host([primary-section='drawer']) {
    transition: padding var(--vaadin-app-layout-transition);
  }

  :host([primary-section='drawer'][drawer-opened]:not([overlay])) {
    padding-left: var(--vaadin-app-layout-drawer-offset-left);
  }

  :host([primary-section='drawer']) [part='drawer'] {
    top: 0;
    bottom: 0;
  }

  /* TODO: add RTL support */
`;
