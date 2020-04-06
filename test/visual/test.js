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
        .setCaptureElements('vaadin-app-layout')
        .capture('default')
        .capture('rtl', actions => {
          actions.executeJS(window => {
            window.document.querySelector('vaadin-app-layout').setAttribute('dir', 'rtl');
          });
        })
        .capture('touch-optimized', actions => {
          actions.executeJS(window => {
            const layout = window.document.querySelector('vaadin-app-layout');
            layout.removeAttribute('dir');
            layout.setAttribute('touch-optimized', '');
          });
        });
    });

    gemini.suite(`primary-drawer-${theme}`, suite => {
      suite
        .setUrl(`primary-drawer.html?theme=${theme}`)
        .setCaptureElements('vaadin-app-layout')
        .capture('default')
        .capture('rtl', actions => {
          actions.executeJS(window => {
            window.document.querySelector('vaadin-app-layout').setAttribute('dir', 'rtl');
          });
        })
        .capture('touch-optimized', actions => {
          actions.executeJS(window => {
            const layout = window.document.querySelector('vaadin-app-layout');
            layout.removeAttribute('dir');
            layout.setAttribute('touch-optimized', '');
          });
        });
    });

    gemini.suite(`tabs-${theme}`, suite => {
      suite
        .setUrl(`tabs.html?theme=${theme}`)
        .setCaptureElements('vaadin-app-layout')
        .capture('default')
        .capture('touch-optimized', actions => {
          actions.executeJS(window => {
            window.document.querySelector('vaadin-app-layout').setAttribute('touch-optimized', '');
          });
        });
    });
  });
});
