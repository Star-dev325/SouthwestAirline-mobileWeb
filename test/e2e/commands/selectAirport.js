'use strict';

/**
 * Clicks an element using jquery selectors.
 *
 * h3 Examples:
 *
 *     browser.jqueryClick(".classname:first > input:checked")
 *     browser.jqueryClick("div:has(.classname):contains('something'):last")
 *
 * @author maxgalbu
 * @param {String} selector - jQuery selector for the element
 * @param {Function} [callback] - function that will be called after the element is clicked
 */
module.exports.command = function(selector, callback) {
  const params = [selector];
  const execute = function(selector) {
    const airports = document.querySelectorAll('.airport-group li span');

    for (let i = 0; i < airports.length; i++) {
      if (airports[i].innerHTML.includes(selector)) {
        return airports[i].click();
      }
    }

    return false;
  };
  const execcallback = (function(_this) {
    return function() {
      if (callback) {
        return callback.call(_this, true);
      }
    };
  })(this);

  this.execute(execute, params, execcallback);

  return this;
};
