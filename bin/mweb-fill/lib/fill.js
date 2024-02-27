const Fill = {
  fillField: function (field) {
    const target = $(Fill._getValue(field.selector));
    const originalTarget = target.get(0);
    const event = Fill._event(field.event);

    const filledValue = Fill._getValue(field.value);
    if (field.value && target.length > 0) {
      // see https://github.com/vitalyq/react-trigger-change/blob/master/lib/change.js#L122
      delete originalTarget.value;
      target.val(filledValue);
    }

    console.log(`Fill: ${Fill._getValue(field.selector)} - ${filledValue}`);
    if (target !== undefined && target.length > 0) {
      originalTarget.dispatchEvent(event);
    }
  },

  matchPath: function (path) {
    const matcher = new RegExp(path, 'g');

    return matcher.test(window.location.pathname);
  },

  _getValue: function (value) {
    return typeof value === 'function' ? value() : value;
  },

  _event: function (type) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(type || 'input', true, true);

    return event;
  }
};

module.exports = Fill;
