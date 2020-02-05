import { customElement } from 'lit-element';
import { AppLayoutBase } from './vaadin-app-layout-base';
import { AppLayoutMixin } from './vaadin-app-layout-mixin';

/**
 * `<vaadin-app-layout>` is a Web Component providing a quick and easy way to get a common
 * application layout structure done. For best results, please take the following recommendations
 * into account:
 *
 *  1. add the component to the root level of your application (as a direct child of `<body>`),
 *  2. include a viewport meta tag which contains `viewport-fit=cover` to the page as follows:
 * ```
 * <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
 * ```
 *
 * #### Scrolling areas
 *
 * By default, the height of layout is defined by its content, and the component acts with the
 * "body scrolling" so on mobile (iOS Safari and Android Chrome) the toolbars will collapse
 * when a scroll happens.
 *
 * To use the "content scrolling" instead, set `height: 100%` on `html` and `body` to expand the
 * layout to full document height. That will make the `content` wrapper scrollable. In this case,
 * the toolbars on mobile device won't collapse.
 *
 * @attr {boolean} overlay - Attribute set when layout has drawer overlay on mobile devices.
 *
 * @csspart backdrop - Overlay displayed when opening drawer on mobile devices
 * @csspart drawer - Container for the drawer area
 * @csspart navbar - Container for the navigation bar (top and bottom)
 * @csspart navbar-bottom - Container for the bottom navigation bar
 * @csspart content - Container for the page content
 *
 * @slot - Default slot for the page content
 * @slot navbar - Slot for the top navbar area
 * @slot drawer - Slot for an application menu
 * @slot touch-optimized - Slot for the bottom navbar area (only visible on mobile devices)
 *
 * @event close-overlay-drawer - Event that can be used to close drawer programmatically.
 * @event drawer-opened-changed - Fired when the `drawerOpened` property changes.
 * @event overlay-changed - Fired when the `overlay` property changes.
 * @event primary-section-changed - Fired when the `primarySection` property changes.
 * @event touch-optimized-changed - Fired when the `touchOptimized` property changes.
 * @event resize - Fired when the element is resized. Non-bubbling.
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
