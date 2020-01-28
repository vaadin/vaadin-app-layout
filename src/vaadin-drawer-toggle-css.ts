import { css } from 'lit-element';

export const drawerToggleStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    position: relative;
    outline: none;
    height: 24px;
    width: 24px;
    padding: 4px;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: inherit;
  }

  [part='icon'],
  [part='icon']::after,
  [part='icon']::before {
    position: absolute;
    top: 8px;
    height: 3px;
    width: 24px;
    background-color: #000;
  }

  [part='icon']::after,
  [part='icon']::before {
    content: '';
  }

  [part='icon']::after {
    top: 6px;
  }

  [part='icon']::before {
    top: 12px;
  }
`;
