/**
 * CSS environment variables https://caniuse.com/#search=env
 *
 * Only use "safe-area-inset-bottom" on portrait orientation.
 * When set on landscape orientation, it will prevent bottom
 * navbar (touch-optimized) from fully hiding on body scroll.
 */
const safeAreaStyle = document.createElement('style');

safeAreaStyle.textContent = `
  html {
    --safe-area-inset-top: env(safe-area-inset-top, 0px);
    --safe-area-inset-right: env(safe-area-inset-right, 0px);
    --safe-area-inset-bottom: 0px;
    --safe-area-inset-left: env(safe-area-inset-left, 0px);
  }

  @media screen and (orientation: portrait) {
    html {
      --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
    }
  }
`;

document.head.appendChild(safeAreaStyle);
