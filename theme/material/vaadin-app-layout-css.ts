import { css } from 'lit-element';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/shadow.js';
import '@vaadin/vaadin-material-styles/typography.js';

export const appLayoutStyles = css`
  :host {
    background-color: var(--material-background-color);
  }

  [part~='navbar'] {
    background: var(--vaadin-app-layout-navbar-background, var(--material-secondary-background-color));
    box-shadow: var(--material-shadow-elevation-8dp);
  }

  :host(:not([overlay])) [part~='navbar'] {
    padding: 0.25em 0.5em;
  }

  [part='drawer'] {
    background: var(--material-background-color);
  }

  :host(:not([dir='rtl'])) [part='drawer'] {
    border-right: 1px solid var(--material-secondary-background-color);
  }

  :host([dir='rtl']) [part='drawer'] {
    border-left: 1px solid var(--material-secondary-background-color);
  }

  :host([primary-section='drawer']) [part='drawer'] {
    z-index: 1;
  }

  :host([primary-section='navbar']:not([overlay])) [part~='navbar'] {
    z-index: 1;
  }

  [part] ::slotted(h2),
  [part] ::slotted(h3),
  [part] ::slotted(h4) {
    line-height: 2.5rem;
    margin-top: 0.25rem !important;
    margin-bottom: 0.25rem !important;
  }

  [part~='navbar-bottom'] {
    box-shadow: var(--material-shadow-elevation-4dp);
  }

  :host(:not([overlay])) [part~='navbar'][part~='navbar-bottom'] {
    padding: 0 1em;
  }

  /* TODO: use mediaProperty instead */
  @media (min-width: 700px) {
    [part~='navbar'] {
      box-shadow: var(--material-shadow-elevation-4dp);
    }

    :host(:not([overlay])) [part~='navbar'] {
      padding: 0.5em 0.75em;
    }
  }
`;
