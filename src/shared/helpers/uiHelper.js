export const scrollToTop = () => {
  const appDom = document.querySelector('.app__contents');

  if (appDom) {
    setTimeout(() => {
      appDom.scrollTop = 0;
    }, 0);
  }
};

export const forceDomUpdatesAndThenExecute = (callbackFn) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => callbackFn());
  });
};
