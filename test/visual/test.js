describe('vaadin-app-layout', () => {
  const locator = 'vaadin-app-layout[data-ready]';

  ['lumo', 'lumo-dark', 'material'].forEach(theme => {
    it(`${theme}-drawer`, function() {
      return this.browser
        .url(`drawer.html?theme=${theme}`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-drawer`, locator);
    });

    it(`${theme}-drawer-touch`, function() {
      return this.browser
        .url(`drawer.html?theme=${theme}&touch=true`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-drawer-touch`, locator);
    });

    it(`${theme}-primary-drawer`, function() {
      return this.browser
        .url(`primary-drawer.html?theme=${theme}`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-primary-drawer`, locator);
    });

    it(`${theme}-primary-drawer-touch`, function() {
      return this.browser
        .url(`primary-drawer.html?theme=${theme}&touch=true`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-primary-drawer-touch`, locator);
    });

    it(`${theme}-tabs`, function() {
      return this.browser
        .url(`tabs.html?theme=${theme}`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-tabs`, locator);
    });

    it(`${theme}-tabs-touch`, function() {
      return this.browser
        .url(`tabs.html?theme=${theme}&touch=true`)
        .waitForVisible(locator, 15000)
        .assertView(`${theme}-tabs-touch`, locator);
    });
  });
});
