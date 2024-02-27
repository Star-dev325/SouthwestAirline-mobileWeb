import _ from 'lodash';

const preventScrolling = (document) => {
  document.addEventListener(
    'touchmove',
    (event) => {
      let { target } = event;

      while (target !== null) {
        const containDisableScrollingClass =
          target.classList &&
          (target.classList.contains('disable-scrolling') || target.classList.contains('disable-scrolling--spinner'));

        if (containDisableScrollingClass) {
          event.preventDefault();
          event.stopPropagation();
          break;
        }

        target = target.parentNode;
      }
    },
    { passive: false }
  );
};

const removeIOSRubberEffect = (element) => {
  _.get(element, 'nodeType') &&
    element.addEventListener('touchstart', () => {
      const top = element.scrollTop;
      const totalScroll = element.scrollHeight;
      const currentScroll = top + element.offsetHeight;

      if (top === 0) {
        element.scrollTop = 1;
      } else if (currentScroll === totalScroll) {
        element.scrollTop = top - 1;
      }
    });
};

const disableSafariScrolling = (document) => {
  // This is to fix a scrolling bug which only happens on iPhone & Safari.
  preventScrolling(document);
  removeIOSRubberEffect(document.getElementsByClassName('drawer--content')[0]);
};

export default disableSafariScrolling;
