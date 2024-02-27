module.exports.command = function(selector, text) {
  // eslint-disable-next-line prefer-arrow-callback
  this.execute(function(selector, text) {
    const elements = document.querySelectorAll(selector);
    let target;

    elements.forEach((element) => {
      if (element.innerHTML.indexOf(text) !== -1) {
        target = element;
      }
    });
    target && target.click();
  }, [selector, text]);
};
