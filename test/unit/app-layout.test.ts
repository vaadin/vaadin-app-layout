import {
  expect,
  fixture,
  html,
  aTimeout,
  nextFrame,
  oneEvent
} from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { matchMedia, restoreMatchMedia } from './match-media';
import { VaadinAppLayout } from '../../src/vaadin-app-layout';
import '../../src/vaadin-drawer-toggle';

const { sinon } = window;

describe('app-layout', () => {
  let layout: VaadinAppLayout;

  describe('custom element definition', () => {
    let tagName: string;

    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-app-layout></vaadin-app-layout>
      `);

      tagName = layout.tagName.toLowerCase();
    });

    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(layout instanceof VaadinAppLayout).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });

    it('should have a valid version number', () => {
      expect(customElements.get(tagName).version).to.match(/^(\d+\.)?(\d+\.)?(\d+)(-(alpha|beta)\d+)?$/);
    });
  });

  describe('resizing', () => {
    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-app-layout></vaadin-app-layout>
      `);
    });

    it('should disable animation on resize and restore again', async () => {
      layout.style.height = '200px';
      await oneEvent(layout, 'resize');
      expect(layout.hasAttribute('no-anim')).to.be.true;
      await nextFrame();
      await aTimeout(0);
      expect(layout.hasAttribute('no-anim')).to.be.false;
    });
  });

  describe('primarySection', () => {
    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-app-layout></vaadin-app-layout>
      `);
    });

    it('should fire "primary-section-changed" event when property changes', async () => {
      const spy = sinon.spy();
      layout.addEventListener('primary-section-changed', spy);
      layout.primarySection = 'drawer';
      await layout.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should fallback to navbar if invalid "primarySection" is set', async () => {
      layout.primarySection = 'foobar';
      await layout.updateComplete;
      expect(layout.primarySection).to.be.equal('navbar');
    });
  });

  describe('drawer', () => {
    let drawer: Element;

    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-app-layout>
          <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
          <h2 slot="navbar">App name</h2>
          <section slot="drawer">
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </section>
          <main>Page content</main>
        </vaadin-app-layout>
      `);

      drawer = layout.renderRoot.querySelector('[part="drawer"]')!;
    });

    it('should hide drawer if corresponding slot has no content', async () => {
      const section = layout.querySelector('[slot="drawer"]')!;
      section.parentNode!.removeChild(section);
      await nextFrame();
      await layout.updateComplete;
      expect(drawer.hasAttribute('hidden')).to.be.true;
    });

    it('should toggle drawer on vaadin-drawer-toggle click', async () => {
      const toggle = layout.querySelector('vaadin-drawer-toggle')!;
      const currentDrawerState = layout.drawerOpened;
      toggle.click();
      await layout.updateComplete;
      expect(layout.drawerOpened).to.be.not.equal(currentDrawerState);
    });

    it('should fire "drawer-opened-changed" event when opening drawer', async () => {
      layout.drawerOpened = false;
      await layout.updateComplete;
      const spy = sinon.spy();
      layout.addEventListener('drawer-opened-changed', spy);
      layout.drawerOpened = true;
      await layout.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should have overflow on the drawer part to allow vertical content scroll', async () => {
      layout.drawerOpened = true;
      await layout.updateComplete;
      layout.style.height = '150px';
      await oneEvent(layout, 'resize');
      expect(drawer.scrollHeight).to.be.greaterThan(drawer.clientHeight);
    });

    it('should set custom CSS property to scrollHeight when drawer has overflow', async () => {
      layout.drawerOpened = true;
      await layout.updateComplete;
      layout.style.height = '150px';
      await oneEvent(layout, 'resize');
      const value = getComputedStyle(layout).getPropertyValue('--_vaadin-app-layout-drawer-scroll-size');
      expect(value).to.equal(`${drawer.scrollHeight}px`);
    });

    it('should set custom CSS property to 100% when drawer does not have overflow', async () => {
      layout.drawerOpened = true;
      await layout.updateComplete;
      layout.style.height = '300px';
      await oneEvent(layout, 'resize');
      const value = getComputedStyle(layout).getPropertyValue('--_vaadin-app-layout-drawer-scroll-size');
      expect(value).to.equal('100%');
    });
  });

  describe('overlay', () => {
    const OVERLAY = '(max-width: 800px), (max-height: 600px)';

    let drawer: Element;

    beforeEach(async () => {
      matchMedia(OVERLAY, false);

      layout = await fixture(html`
        <vaadin-app-layout>
          <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
          <h2 slot="navbar">App name</h2>
          <section slot="drawer">Drawer content</section>
          <main>Page content</main>
        </vaadin-app-layout>
      `);

      drawer = layout.renderRoot.querySelector('[part="drawer"]')!;
    });

    describe('property and attribute', () => {
      it('should toggle "overlay" property depending on query', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(layout.overlay).to.be.true;
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(layout.overlay).to.be.false;
      });

      it('should toggle "overlay" attribute depending on query', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(layout.hasAttribute('overlay')).to.be.true;
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(layout.hasAttribute('overlay')).to.be.false;
      });

      it('should discard "overlay" property value set manually', async () => {
        layout.overlay = true;
        await layout.updateComplete;
        expect(layout.overlay).to.be.false;
      });

      it('should not set "overlay" property value when setting attribute', async () => {
        layout.setAttribute('overlay', '');
        await layout.updateComplete;
        expect(layout.overlay).to.be.false;
      });

      it('should fire "overlay-changed" event when changing property', async () => {
        const spy = sinon.spy();
        layout.addEventListener('overlay-changed', spy);
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(spy).to.be.calledOnce;
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(spy).to.be.calledTwice;
      });
    });

    describe('drawer opening and closing', () => {
      it('should close drawer using helper when "overlay" is true', async () => {
        matchMedia(OVERLAY, true);
        layout.drawerOpened = true;
        await layout.updateComplete;
        VaadinAppLayout.dispatchCloseOverlayDrawerEvent();
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.false;
      });

      it('should not close drawer using helper when "overlay" is false', async () => {
        layout.drawerOpened = true;
        await layout.updateComplete;
        VaadinAppLayout.dispatchCloseOverlayDrawerEvent();
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.true;
      });

      it('should close drawer using event when "overlay" is true', async () => {
        matchMedia(OVERLAY, true);
        layout.drawerOpened = true;
        await layout.updateComplete;
        window.dispatchEvent(new CustomEvent('close-overlay-drawer'));
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.false;
      });

      it('should not close drawer using event when "overlay" is false', async () => {
        layout.drawerOpened = true;
        await layout.updateComplete;
        window.dispatchEvent(new CustomEvent('close-overlay-drawer'));
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.true;
      });

      it('should close drawer state when "overlay" property is set to true', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.false;
      });

      it('should restore drawer state when "overlay" changes back to false', async () => {
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        layout.drawerOpened = true;
        await layout.updateComplete;
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.false;
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.true;
      });

      it('should close drawer backdrop click when "overlay" is true', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        layout.drawerOpened = true;
        await layout.updateComplete;
        const backdrop = layout.renderRoot.querySelector('[part="backdrop"]') as HTMLElement;
        backdrop.click();
        await layout.updateComplete;
        expect(layout.drawerOpened).to.be.false;
      });
    });

    describe('focusing drawer', () => {
      it('should call focus() on drawer when opening overlay', async () => {
        const spy = sinon.spy(drawer as HTMLElement, 'focus');
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(spy).to.not.be.called;
        layout.drawerOpened = true;
        await layout.updateComplete;
        expect(spy).to.be.calledOnce;
      });

      it('should set "tabindex" attribute on drawer when opening overlay', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(drawer.hasAttribute('tabindex')).to.be.false;
        layout.drawerOpened = true;
        await layout.updateComplete;
        expect(drawer.getAttribute('tabindex')).to.equal('0');
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(drawer.hasAttribute('tabindex')).to.be.false;
      });
    });

    describe('ARIA', () => {
      it('should toggle "role" attribute on drawer depending on overlay', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(drawer.getAttribute('role')).to.equal('dialog');
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(drawer.hasAttribute('role')).to.be.false;
      });

      it('should toggle "aria-label" attribute on drawer depending on overlay', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(drawer.getAttribute('aria-label')).to.equal('drawer');
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(drawer.hasAttribute('aria-label')).to.be.false;
      });

      it('should toggle "aria-modal" attribute on drawer depending on overlay', async () => {
        matchMedia(OVERLAY, true);
        await layout.updateComplete;
        expect(drawer.getAttribute('aria-modal')).to.equal('true');
        matchMedia(OVERLAY, false);
        await layout.updateComplete;
        expect(drawer.hasAttribute('aria-modal')).to.be.false;
      });
    });
  });

  describe('touch-optimized', () => {
    const TOUCH = '(pointer: coarse) and (max-width: 800px) and (min-height: 500px)';

    let title: Element;
    let toggle: Element;

    beforeEach(async () => {
      layout = await fixture(html`
        <vaadin-app-layout>
          <vaadin-drawer-toggle slot="navbar touch-optimized"></vaadin-drawer-toggle>
          <h2 slot="navbar touch-optimized">App name</h2>
          <section slot="drawer">Drawer content</section>
          <main>Page content</main>
        </vaadin-app-layout>
      `);

      toggle = layout.querySelector('vaadin-drawer-toggle')!;
      title = layout.querySelector('h2')!;
    });

    it('should toggle "touchOptimized" property depending on query', async () => {
      matchMedia(TOUCH, true);
      await layout.updateComplete;
      expect(layout.touchOptimized).to.be.true;
      matchMedia(TOUCH, false);
      await layout.updateComplete;
      expect(layout.touchOptimized).to.be.false;
    });

    it('should toggle "touch-optimized" attribute depending on query', async () => {
      matchMedia(TOUCH, true);
      await layout.updateComplete;
      expect(layout.hasAttribute('touch-optimized')).to.be.true;
      matchMedia(TOUCH, false);
      await layout.updateComplete;
      expect(layout.hasAttribute('touch-optimized')).to.be.false;
    });

    it('should not override "touchOptimized" property value when set manually', async () => {
      layout.touchOptimized = true;
      await layout.updateComplete;
      matchMedia(TOUCH, false);
      await layout.updateComplete;
      expect(layout.touchOptimized).to.be.true;
    });

    it('should set "touchOptimized" property again when unset manually', async () => {
      matchMedia(TOUCH, false);
      await layout.updateComplete;
      layout.touchOptimized = true;
      await layout.updateComplete;
      layout.touchOptimized = false;
      await layout.updateComplete;
      matchMedia(TOUCH, true);
      await layout.updateComplete;
      expect(layout.touchOptimized).to.be.true;
    });

    it('should move nodes from navbar to navbar-bottom depending on query', async () => {
      matchMedia(TOUCH, true);
      await layout.updateComplete;
      await nextFrame();
      expect(toggle.getAttribute('slot')).to.equal('navbar-bottom');
      expect(title.getAttribute('slot')).to.equal('navbar-bottom');

      matchMedia(TOUCH, false);
      await layout.updateComplete;
      await nextFrame();
      expect(toggle.getAttribute('slot')).to.equal('navbar');
      expect(title.getAttribute('slot')).to.equal('navbar');
    });

    it('should fire "touch-optimized-changed" event on media change', async () => {
      matchMedia(TOUCH, true);
      await layout.updateComplete;
      const spy = sinon.spy();
      layout.addEventListener('touch-optimized-changed', spy);
      matchMedia(TOUCH, false);
      await layout.updateComplete;
      expect(spy).to.be.calledOnce;
    });

    it('should fire "touch-optimized-changed" event on manual change', async () => {
      const spy = sinon.spy();
      layout.addEventListener('touch-optimized-changed', spy);
      layout.touchOptimized = true;
      await layout.updateComplete;
      expect(spy).to.be.calledOnce;
    });
  });

  after(() => {
    restoreMatchMedia();
  });
});
