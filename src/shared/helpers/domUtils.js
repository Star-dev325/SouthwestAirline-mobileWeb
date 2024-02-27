import _ from 'lodash';

/**
 * Shortcut to compute element style
 *
 * @param {HTMLElement} elem
 * @returns {CssStyle}
 */
export const getComputedStyles = (elem) => elem.ownerDocument.defaultView.getComputedStyle(elem, null);

/**
 * Get elements offset
 *
 * TODO: REMOVE JQUERY!
 *
 * @param {HTMLElement} DOMNode
 * @returns {{top: number, left: number, height: number, width: number}}
 */
export const getOffset = (DOMNode) => {
  if (window.jQuery) {
    const $dom = window.jQuery(DOMNode);
    const offset = $dom.offset();

    return {
      top: offset.top,
      left: offset.left,
      height: $dom.height(),
      width: $dom.width()
    };
  }

  const docElem = document.documentElement;
  let box = { top: 0, left: 0 };

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if (typeof DOMNode.getBoundingClientRect !== 'undefined') {
    box = DOMNode.getBoundingClientRect();
  }

  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft,
    height: box.height,
    width: box.width
  };
};

/**
 * Get parent element
 *
 * @param {HTMLElement?} elem
 * @returns {HTMLElement}
 */
export const offsetParent = (elem) => {
  const docElem = document.documentElement;
  let offsetParentElem = elem.offsetParent || docElem;

  while (
    offsetParentElem &&
    offsetParentElem.nodeName !== 'HTML' &&
    getComputedStyles(offsetParentElem).position === 'static'
  ) {
    offsetParentElem = offsetParentElem.offsetParent;
  }

  return offsetParentElem || docElem;
};

export const getAppContent = () => document.getElementById('appContents');

export const hasClass = (ele, cls) => {
  if (!ele.className) {
    return;
  }

  return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
};

export const addClass = (ele, cls) => {
  if (!ele) {
    return;
  }

  if (!hasClass(ele, cls)) ele.className += ` ${cls}`;
};

export const removeClass = (ele, cls) => {
  if (!ele) {
    return;
  }

  if (hasClass(ele, cls)) {
    const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);

    ele.className = _.trim(ele.className.replace(reg, ' '));
  }
};
