const { location, history, navigator, Image } = window;

const loadJSAsync = (src) => {
  const ref = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');

  script.src = src;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
};

export default {
  window,
  location,
  history,
  navigator,
  document,
  Image,
  loadJSAsync
};
