const listeners: { [key: string]: () => void } = {};
const queryMatches: { [key: string]: boolean } = {};

export const matchMedia = (query: string, matches: boolean) => {
  queryMatches[query] = matches;
  listeners[query] && listeners[query]();
};

const origMatchMedia = window.matchMedia;
window.matchMedia = (query: string) => {
  return {
    get matches() {
      return queryMatches[query] as boolean;
    },
    addListener(listener: () => void) {
      listeners[query] = listener;
    },
    removeListener(_listener) {
      delete listeners[query];
    }
  } as MediaQueryList;
};

export const restoreMatchMedia = () => {
  window.matchMedia = origMatchMedia;
};
