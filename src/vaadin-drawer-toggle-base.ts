import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';
import { drawerToggleStyles } from './vaadin-drawer-toggle-css';

export class DrawerToggleBase extends VaadinElement {
  static get styles() {
    return drawerToggleStyles;
  }
}
