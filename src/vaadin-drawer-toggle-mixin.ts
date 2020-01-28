import { LitElement, html, PropertyValues } from 'lit-element';
import { ActiveStateMixin } from '@vaadin/active-state-mixin/active-state-mixin.js';
import { ActiveStateClass } from '@vaadin/active-state-mixin/active-state-class.js';
import { ControlStateMixin, ControlStateInterface } from '@vaadin/control-state-mixin/control-state-mixin.js';
import { DisabledStateMixin, DisabledStateInterface } from '@vaadin/disabled-state-mixin/disabled-state-mixin.js';
import { FocusVisibleMixin, FocusVisibleInterface } from '@vaadin/focus-visible-mixin/focus-visible-mixin.js';

type DrawerToggleBase = new () => LitElement;

type DrawerToggle = new () => LitElement &
  DisabledStateInterface &
  FocusVisibleInterface &
  ActiveStateClass &
  ControlStateInterface;

export const DrawerToggleMixin = <T extends DrawerToggleBase>(base: T): DrawerToggle => {
  class DrawerToggle extends ControlStateMixin(FocusVisibleMixin(ActiveStateMixin(DisabledStateMixin(base)))) {
    protected render() {
      return html`
        <slot>
          <div part="icon"></div>
        </slot>
        <button type="button" role="presentation"></button>
      `;
    }

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      this.setAttribute('role', 'button');

      this.addEventListener('click', (_event: MouseEvent) => {
        this.dispatchEvent(new CustomEvent('drawer-toggle-click', { bubbles: true, composed: true }));
      });
    }

    protected get focusElement() {
      return this.renderRoot.querySelector('button');
    }
  }

  return DrawerToggle;
};
