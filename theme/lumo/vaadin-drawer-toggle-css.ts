import { css } from 'lit-element';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/font-icons.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';

export const drawerToggleStyles = css`
  :host {
    box-sizing: border-box;
    position: relative !important;
    width: var(--lumo-size-l);
    height: var(--lumo-size-l);
    margin: 0 var(--lumo-space-s);
    padding: 0;
    background: transparent;
    color: var(--lumo-primary-text-color);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    font-weight: 500;
    border-radius: var(--lumo-border-radius);
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host::before,
  :host::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  :host(:hover)::before {
    opacity: 0.05;
  }

  @media (pointer: coarse) {
    :host(:not([active]):hover)::before {
      opacity: 0;
    }
  }

  :host::after {
    transition: opacity 1.4s, transform 0.1s;
    filter: blur(8px);
  }

  :host([active])::before {
    opacity: 0.1;
    transition-duration: 0s;
  }

  :host([active])::after {
    opacity: 0.1;
    transition-duration: 0s, 0s;
    transform: scale(0);
  }

  :host([focus-ring]) {
    box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
  }

  [part='icon'],
  [part='icon']::after,
  [part='icon']::before {
    position: inherit;
    height: auto;
    width: auto;
    background: transparent;
    top: auto;
  }

  [part='icon']::before {
    font-family: lumo-icons;
    font-size: var(--lumo-icon-size-m);
    content: var(--lumo-icons-menu);
  }
`;
