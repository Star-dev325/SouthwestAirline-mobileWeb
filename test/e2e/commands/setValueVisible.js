module.exports.command = function(el, value) {
  this.waitForElementVisible(el, 10000)
    .setValue(el, value);

  return this;
};
