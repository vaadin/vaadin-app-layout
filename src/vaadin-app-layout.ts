import { customElement } from 'lit-element';
import { AppLayoutBase } from './vaadin-app-layout-base';
import { AppLayoutMixin } from './vaadin-app-layout-mixin';

/**
 * `<vaadin-app-layout>` is a Web Component providing a quick and easy way to get a common
 * application layout structure done.
 */
@customElement('vaadin-app-layout')
export class VaadinAppLayout extends AppLayoutMixin(AppLayoutBase) {
  static is = 'vaadin-app-layout';

  static get version() {
    return '2.0.4';
  }

  /**
   * Helper method that dispatches a `close-overlay-drawer` event.
   */
  static dispatchCloseOverlayDrawerEvent() {
    window.dispatchEvent(new CustomEvent('close-overlay-drawer'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-app-layout': VaadinAppLayout;
  }
}
