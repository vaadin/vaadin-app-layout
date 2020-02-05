/* istanbul ignore file */
if (window.navigator.userAgent.match(/iPhone|iPad/i)) {
  const doc = document.documentElement;
  const prop = '--vaadin-viewport-offset-bottom';

  const detectIosNavbar = () => {
    const { innerHeight, innerWidth } = window;
    const landscape = innerWidth > innerHeight;
    const { clientHeight } = doc;
    if (landscape && clientHeight > innerHeight) {
      doc.style.setProperty(prop, `${clientHeight - innerHeight}px`);
    } else {
      doc.style.setProperty(prop, '');
    }
  };

  detectIosNavbar();

  window.addEventListener('resize', detectIosNavbar);
}
