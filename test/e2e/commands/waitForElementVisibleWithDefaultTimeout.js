module.exports.command = function(el) {
  this.waitForElementVisible(el, 10000);

  return this;
};
