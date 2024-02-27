const getTransitionEndEventName = () => {
  const transitions = {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'mozTransitionEnd',
    OTransition: 'oTransitionEnd',
    msTransition: 'MSTransitionEnd'
  };

  const bodyStyle = canUseDOM && document.body.style;

  for (const transition in transitions) {
    if (bodyStyle[transition] !== undefined) {
      return transitions[transition];
    }
  }
};

export const canUseDOM = () => !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const addEndEventListener = (node, callback, endEvent = getTransitionEndEventName()) => {
  endEvent && node && node.addEventListener(endEvent, callback);
};

export const removeEndEventListener = (node, callback, endEvent = getTransitionEndEventName()) => {
  endEvent && node && node.removeEventListener(endEvent, callback);
};
