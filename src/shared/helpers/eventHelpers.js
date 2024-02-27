export const addEventListenerOnce = (target, eventName, listener) => {
  if (!target.addEventListener) {
    throw new TypeError('addEventListenerOnce: target must have addEventListener property');
  }

  const invokeOnce = function () {
    target.removeEventListener(eventName, invokeOnce);
    listener.apply(target, arguments);
  };

  target.addEventListener(eventName, invokeOnce);
};
