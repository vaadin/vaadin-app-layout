import { LitElement, html, property, PropertyValues } from 'lit-element';
import { Constructor } from '@vaadin/mixin-utils';
import { ActiveStateMixin } from '@vaadin/active-state-mixin/active-state-mixin.js';
import { ActiveStateClass } from '@vaadin/active-state-mixin/active-state-class.js';
import { ControlStateMixin, ControlStateInterface } from '@vaadin/control-state-mixin/control-state-mixin.js';
import { DisabledStateMixin, DisabledStateInterface } from '@vaadin/disabled-state-mixin/disabled-state-mixin.js';
import { FocusVisibleMixin, FocusVisibleInterface } from '@vaadin/focus-visible-mixin/focus-visible-mixin.js';

export type DrawerToggle = DisabledStateInterface &
  FocusVisibleInterface &
  ActiveStateClass &
  ControlStateInterface &
  DrawerToggleInterface;

export interface DrawerToggleInterface {
  ariaLabel: string;
}

export const DrawerToggleMixin = <T extends Constructor<LitElement>>(base: T): T & Constructor<DrawerToggle> => {
  class DrawerToggle extends ControlStateMixin(FocusVisibleMixin(ActiveStateMixin(DisabledStateMixin(base)))) {
    @property({ type: String, attribute: 'aria-label' }) ariaLabel = 'Toggle';

    protected render() {
      return html`
        <slot>
          <div part="icon"></div>
        </slot>
        <button type="button" aria-label="${this.ariaLabel}"></button>
      `;
    }

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      this.addEventListener('click', () => {
        !this.disabled && this._fireClick();
      });

      this.addEventListener('keyup', (event: KeyboardEvent) => {
        if (/^( |SpaceBar|Enter)$/.test(event.key) && !this.disabled) {
          this._fireClick();
        }
      });
    }

    protected get focusElement() {
      return this.renderRoot.querySelector('button');
    }

    private _fireClick() {
      this.dispatchEvent(new CustomEvent('drawer-toggle-click', { bubbles: true, composed: true }));
    }
  }

  return DrawerToggle;
};
