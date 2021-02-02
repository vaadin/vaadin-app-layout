import '@vaadin/vaadin-button/theme/lumo/vaadin-button-styles.js';
import '@vaadin/vaadin-lumo-styles/font-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`<dom-module id="lumo-drawer-toggle" theme-for="vaadin-drawer-toggle">
  <template>
    <style include="lumo-button">
      :host {
        width: var(--lumo-size-l);
        height: var(--lumo-size-l);
        min-width: auto;
        margin: 0 var(--lumo-space-s);
        padding: 0;
        background: transparent;
      }

      [part="icon"],
      [part="icon"]::after,
      [part="icon"]::before {
        position: inherit;
        height: auto;
        width: auto;
        background: transparent;
        top: auto;
      }

      [part=icon]::before {
        font-family: lumo-icons;
        font-size: var(--lumo-icon-size-m);
        content: var(--lumo-icons-menu);
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
