import { customElement } from 'lit-element';
import { DrawerToggleBase } from './vaadin-drawer-toggle-base';
import { DrawerToggleMixin } from './vaadin-drawer-toggle-mixin';

/**
 * `<vaadin-drawer-toggle>` is a Web Component that toggles the layout drawer.
 */
@customElement('vaadin-drawer-toggle')
export class VaadinDrawerToggle extends DrawerToggleMixin(DrawerToggleBase) {
  static is = 'vaadin-drawer-toggle';
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-drawer-toggle': VaadinDrawerToggle;
  }
}
