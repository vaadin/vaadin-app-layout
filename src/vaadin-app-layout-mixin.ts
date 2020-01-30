import { LitElement, html, property, query, PropertyValues } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { MediaQueryMixin, mediaProperty } from '@vaadin/media-query-mixin';
import { ResizableMixin } from '@vaadin/resizable-mixin';
import { ResizableClass } from '@vaadin/resizable-mixin/resizable-class.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export interface AppLayoutInterface {
  drawerOpened: boolean | null | undefined;

  primarySection: string;

  touchOptimized: boolean | null | undefined;
}

export const AppLayoutMixin = <T extends Constructor<LitElement>>(
  base: T
): T & Constructor<LitElement & AppLayoutInterface & ResizableClass> => {
  class AppLayout extends MediaQueryMixin(ResizableMixin(base)) {
    /**
     * Helper static method that dispatches a `close-overlay-drawer` event
     */
    public static dispatchCloseOverlayDrawerEvent() {
      window.dispatchEvent(new CustomEvent('close-overlay-drawer'));
    }

    /**
     * Controls whether the drawer is opened (visible) or not.
     *
     * Default value depends on the viewport:
     * - `true`, for desktop size views
     * - `false`, for mobile size views
     */
    @property({ type: Boolean, attribute: 'drawer-opened', reflect: true })
    drawerOpened: boolean | null | undefined = true;

    /**
     * Defines whether navbar or drawer will come first visually.
     * - if `navbar` is set, then the navbar takes full available width and moves the drawer down.
     * - if `drawer` is set, then the drawer will move the navbar, taking the full available height.
     */
    @property({ type: String, attribute: 'primary-section', reflect: true })
    primarySection = 'navbar';

    @property({ type: Boolean, attribute: 'touch-optimized', reflect: true })
    touchOptimized: boolean | null | undefined = false;

    /**
     * When true, drawer shows an overlay on top of the content.
     *
     * TODO: expose media query as custom CSS property.
     */
    @mediaProperty({ media: '(max-width: 800px), (max-height: 600px)' })
    overlay: boolean | null | undefined;

    /**
     * TODO: expose media query as custom CSS property.
     */
    @mediaProperty({ media: '(pointer: coarse) and (max-width: 800px) and (min-height: 500px)' })
    protected touch: boolean | null | undefined;

    @query('[part="drawer"]')
    protected _drawer!: HTMLElement;

    @query('[part="navbar"]')
    protected _navbar!: HTMLElement;

    @query('[part~="navbar"][part~="bottom"]')
    protected _navbarBottom!: HTMLElement;

    private _boundDrawerToggleClick: EventListener = this._onDrawerToggleClick.bind(this);

    private _boundCloseOverlayDrawer: EventListener = this._onCloseOverlayDrawer.bind(this);

    private _forceTouch = false;

    private _drawerStateSaved: boolean | null | undefined;

    protected render() {
      return html`
        <div part="navbar">
          <slot name="navbar"></slot>
        </div>
        <div part="backdrop" @click="${this._close}" @touchstart="${this._close}"></div>
        <div
          part="drawer"
          tabindex="${ifDefined(this.overlay && this.drawerOpened ? '0' : undefined)}"
          role="${ifDefined(this.overlay ? 'dialog' : undefined)}"
          aria-label="${ifDefined(this.overlay ? 'drawer' : undefined)}"
          aria-modal="${ifDefined(this.overlay ? 'true' : undefined)}"
        >
          <slot name="drawer"></slot>
        </div>
        <div part="content">
          <slot></slot>
        </div>
        <div part="navbar bottom" ?hidden="${!this.touchOptimized}">
          <slot name="navbar-bottom"></slot>
        </div>
      `;
    }

    connectedCallback() {
      super.connectedCallback();

      this._blockAnimationUntilNextRender();

      window.addEventListener('close-overlay-drawer', this._boundCloseOverlayDrawer);
    }

    disconnectedCallback() {
      super.disconnectedCallback();

      window.removeEventListener('close-overlay-drawer', this._boundCloseOverlayDrawer);
    }

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      this.addEventListener('drawer-toggle-click', this._boundDrawerToggleClick);

      const drawerSlot = this.renderRoot.querySelector('slot[name="drawer"]') as HTMLSlotElement;
      drawerSlot.addEventListener('slotchange', () => {
        this._updateDrawerSize(drawerSlot);
      });

      this._updateDrawerSize(drawerSlot);

      window.requestAnimationFrame(() => {
        this._updateOffsetSize();
      });
    }

    protected update(props: PropertyValues) {
      if (props.has('primarySection') && ['navbar', 'drawer'].indexOf(this.primarySection) === -1) {
        this.primarySection = 'navbar';
      }

      // Allow user to override "touch-optimized"
      if (props.has('touchOptimized')) {
        if (this.touchOptimized && !this.touch) {
          // property set by the user
          this._forceTouch = true;
        } else if (!this.touchOptimized && this._forceTouch) {
          // property unset by the user
          this._forceTouch = false;
        }
      }

      if (props.has('touch') && !this._forceTouch) {
        this.touchOptimized = this.touch;
      }

      if (props.has('overlay')) {
        this._blockAnimationUntilNextRender();

        if (this.overlay) {
          this._drawerStateSaved = this.drawerOpened;
          this.drawerOpened = false;
        } else if (this._drawerStateSaved) {
          this.drawerOpened = this._drawerStateSaved;
          this._drawerStateSaved = null;
        }
      }

      super.update(props);
    }

    protected updated(props: PropertyValues) {
      super.updated(props);

      if (props.has('overlay')) {
        this.toggleAttribute('overlay', Boolean(this.overlay));
      }

      if (props.has('drawerOpened') && this.drawerOpened) {
        this._updateOffsetSize();

        if (this.overlay) {
          this._drawer.focus();
        }
      }

      if (props.has('touchOptimized')) {
        this._updateTouchOptimizedMode();
      }
    }

    protected _sizeChanged(contentRect: DOMRect) {
      // Ensure resize event is fired after calculations
      this._blockAnimationUntilNextRender();
      this._updateOffsetSize();

      super._sizeChanged && super._sizeChanged(contentRect);
    }

    private _blockAnimationUntilNextRender() {
      this.setAttribute('no-anim', '');

      window.requestAnimationFrame(() => {
        setTimeout(() => {
          this.removeAttribute('no-anim');
        });
      });
    }

    private _close() {
      this.drawerOpened = false;
    }

    private _onCloseOverlayDrawer() {
      if (this.overlay) {
        this._close();
      }
    }

    private _onDrawerToggleClick(event: Event) {
      event.stopPropagation();

      this.drawerOpened = !this.drawerOpened;
    }

    private _setOffsetSize(part: string, value: number) {
      this.style.setProperty(`--_vaadin-app-layout-${part}-offset-size`, `${value}px`);
    }

    private _updateDrawerSize(slot: HTMLSlotElement) {
      const nodes = slot.assignedNodes({ flatten: true });
      this._drawer.toggleAttribute('hidden', nodes.length === 0);
      this._updateOffsetSize();
    }

    private _updateOffsetSize() {
      this._setOffsetSize('navbar', this._navbar.getBoundingClientRect().height);
      this._setOffsetSize('navbar-bottom', this._navbarBottom.getBoundingClientRect().height);
      this._setOffsetSize('drawer', this._drawer.getBoundingClientRect().width);
    }

    private _updateTouchOptimizedMode() {
      const navbarItems = this.querySelectorAll('[slot*="navbar"]');

      if (navbarItems.length > 0) {
        Array.from(navbarItems).forEach(item => {
          const slot = item.getAttribute('slot');
          if (slot && slot.indexOf('touch-optimized') > -1) {
            item.setAttribute('data-touch', 'true');
          }

          if (this.touchOptimized && (item as HTMLElement).dataset.touch) {
            item.setAttribute('slot', 'navbar-bottom');
          } else {
            item.setAttribute('slot', 'navbar');
          }
        });
      }

      const navbarSlot = this.renderRoot.querySelector('slot[name="navbar"]') as HTMLSlotElement;
      this._navbar.toggleAttribute('hidden', navbarSlot.assignedNodes().length === 0);

      this._updateOffsetSize();
    }
  }

  return AppLayout;
};
