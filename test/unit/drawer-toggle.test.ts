import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { enterKeyDown, enterKeyUp, spaceKeyDown, spaceKeyUp } from '@vaadin/vaadin-component-dev-dependencies/keys.js';
import { VaadinDrawerToggle } from '../../src/vaadin-drawer-toggle';

const { sinon } = window;

describe('drawer-toggle', () => {
  let toggle: VaadinDrawerToggle;

  beforeEach(async () => {
    toggle = await fixture(html`
      <vaadin-drawer-toggle></vaadin-drawer-toggle>
    `);
  });

  describe('custom element definition', () => {
    let tagName: string;

    beforeEach(() => {
      tagName = toggle.tagName.toLowerCase();
    });

    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(toggle instanceof VaadinDrawerToggle).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });
  });

  describe('click event', () => {
    it('should fire "drawer-toggle-click" event on click', () => {
      const spy = sinon.spy();
      toggle.addEventListener('drawer-toggle-click', spy);
      toggle.click();
      expect(spy).to.be.calledOnce;
    });

    it('should fire "drawer-toggle-click" event on Enter', () => {
      const spy = sinon.spy();
      toggle.addEventListener('drawer-toggle-click', spy);
      enterKeyDown(toggle);
      enterKeyUp(toggle);
      expect(spy).to.be.calledOnce;
    });

    it('should fire "drawer-toggle-click" event on Space', () => {
      const spy = sinon.spy();
      toggle.addEventListener('drawer-toggle-click', spy);
      spaceKeyDown(toggle);
      spaceKeyUp(toggle);
      expect(spy).to.be.calledOnce;
    });

    it('should not fire "drawer-toggle-click" event on click when disabled', async () => {
      toggle.disabled = true;
      await toggle.updateComplete;
      const spy = sinon.spy();
      toggle.addEventListener('drawer-toggle-click', spy);
      toggle.click();
      expect(spy).to.not.be.called;
    });

    it('should not fire "drawer-toggle-click" event on Enter when disabled', async () => {
      toggle.disabled = true;
      await toggle.updateComplete;
      const spy = sinon.spy();
      toggle.addEventListener('drawer-toggle-click', spy);
      enterKeyDown(toggle);
      enterKeyUp(toggle);
      expect(spy).to.not.be.called;
    });

    it('should not fire "drawer-toggle-click" event on Space when disabled', async () => {
      toggle.disabled = true;
      await toggle.updateComplete;
      const spy = sinon.spy();
      toggle.addEventListener('drawer-toggle-click', spy);
      spaceKeyDown(toggle);
      spaceKeyUp(toggle);
      expect(spy).to.not.be.called;
    });
  });

  describe('aria-label', () => {
    it('should have ariaLabel property set to "Toggle"', () => {
      expect(toggle.ariaLabel).to.equal('Toggle');
    });

    it('should sync ariaLabel property with aria-label attribute', async () => {
      toggle.setAttribute('aria-label', 'Label');
      await toggle.updateComplete;
      expect(toggle.ariaLabel).to.equal('Label');
    });

    it('should set "aria-label" on the native button', () => {
      const button = toggle.renderRoot.querySelector('button') as HTMLButtonElement;
      expect(button.getAttribute('aria-label')).to.equal('Toggle');
    });
  });

  describe('a11y', () => {
    it('should pass accessibility test', async () => {
      await expect(toggle).to.be.accessible();
    });
  });
});
