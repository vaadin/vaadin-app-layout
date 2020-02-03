import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';
import { appLayoutStyles } from './vaadin-app-layout-css';

export class AppLayoutBase extends VaadinElement {
  static get styles() {
    return appLayoutStyles;
  }
}
