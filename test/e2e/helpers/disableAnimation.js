module.exports = function(client, classNames, callback) {
  // eslint-disable-next-line prefer-arrow-callback
  client.execute(function(selectors) {
    selectors.forEach((selector) => {
      Array.prototype.forEach.call(document.querySelectorAll(selector), (element) => {
        element.style.transitionDuration = '0s';
      });
    });
  }, [classNames], callback);
};