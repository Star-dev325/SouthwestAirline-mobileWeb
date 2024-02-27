(function () {
  function loadMwebFill(src) {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  loadMwebFill('https://10.17.0.12/bundle.min.js');
})();
