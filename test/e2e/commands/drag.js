module.exports.command = function(element, from, to) {
  this.moveToElement(element, from.x, from.y)
    .mouseButtonDown(0)
    .moveToElement(element, to.x, to.y)
    .mouseButtonUp(0);

  return this;
};
