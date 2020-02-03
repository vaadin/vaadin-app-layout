import { css } from 'lit-element';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/typography.js';

export const drawerToggleStyles = css`
  :host {
    box-sizing: border-box;
    position: relative !important;
    display: inline-flex;
    align-items: baseline;
    justify-content: center;
    width: 48px;
    height: 48px;
    margin-right: 1em;
    overflow: hidden;
    padding: 0;
    color: var(--material-primary-text-color);
    font-family: var(--material-font-family);
    text-transform: uppercase;
    font-size: var(--material-button-font-size);
    line-height: 20px;
    font-weight: 500;
    border-radius: 50%;
    transition: box-shadow 0.2s;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host::before,
  :host::after {
    content: '';
    pointer-events: none;
    position: absolute;
    border-radius: inherit;
    opacity: 0;
    background-color: currentColor;
  }

  :host::before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 0.5s;
  }

  :host::after {
    border-radius: 50%;
    width: 320px;
    height: 320px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.9s;
  }

  :host(:hover)::before,
  :host([focus-ring])::before {
    opacity: 0.08;
    transition-duration: 0.2s;
  }

  :host([active])::before {
    opacity: 0.16;
    transition: opacity 0.4s;
  }

  :host([active])::after {
    transform: translate(-50%, -50%) scale(0.0000001); /* animation works weirdly with scale(0) */
    opacity: 0.1;
    transition: 0s;
  }

  :host(:hover:not([active]))::after {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }

  :host([disabled]) {
    pointer-events: none;
    color: var(--material-disabled-text-color);
  }

  [part='icon'],
  [part='icon']::after,
  [part='icon']::before {
    background-color: currentColor;
  }

  [part='icon'] {
    top: 18px;
    left: 15px;
  }

  [part='icon'],
  [part='icon']::after,
  [part='icon']::before {
    height: 2px;
    width: 18px;
  }

  [part='icon']::after {
    top: 5px;
  }

  [part='icon']::before {
    top: 10px;
  }
`;
