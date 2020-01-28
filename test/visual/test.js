gemini.suite('vaadin-app-layout', rootSuite => {
  function wait(actions, find) {
    return actions.waitForJSCondition(window => {
      return window.webComponentsAreReady;
    }, 80000);
  }

  rootSuite.before(wait);

  ['lumo', 'lumo-dark', 'material'].forEach(theme => {
    gemini.suite(`drawer-${theme}`, suite => {
      suite
        .setUrl(`drawer.html?theme=${theme}`)
        .setCaptureElements('#drawer-tests')
        .capture('default');
    });

    gemini.suite(`primary-drawer-${theme}`, suite => {
      suite
        .setUrl(`primary-drawer.html?theme=${theme}`)
        .setCaptureElements('#primary-drawer-tests')
        .capture('default');
    });

    gemini.suite(`tabs-${theme}`, suite => {
      suite
        .setUrl(`tabs.html?theme=${theme}`)
        .setCaptureElements('#tabs-tests')
        .capture('default');
    });
  });
});
