export const detectIosNavbar = () => {
  if (window.navigator.userAgent.match(/iPhone|iPad/i)) {
    const { innerHeight, innerWidth } = window;
    const landscape = innerWidth > innerHeight;
    const { clientHeight } = document.documentElement;
    if (landscape && clientHeight > innerHeight) {
      document.documentElement.style.setProperty('--vaadin-viewport-offset-bottom', `${clientHeight - innerHeight}px`);
    } else {
      document.documentElement.style.setProperty('--vaadin-viewport-offset-bottom', '');
    }
  }
};

detectIosNavbar();

window.addEventListener('resize', detectIosNavbar);
