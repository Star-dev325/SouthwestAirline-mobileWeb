import disableSafariScrolling from 'src/polyfills/disableSafariScrolling';

describe('DisableSafariScrolling', () => {
  describe('preventScrolling', () => {
    it('should invoke preventDefault and stopPropagation when has class', () => {
      const { doc } = createDocument();
      const event = createEventWithTarget({
        classList: { contains: jest.fn(() => true) },
        parentNode: null
      });

      disableSafariScrolling(doc);
      performTouchMoveInDocument(doc, event);

      expect(event.preventDefault).toHaveBeenCalled;
      expect(event.stopPropagation).toHaveBeenCalled;
    });

    it('should not invoke preventDefault and stopPropagation when does not have class', () => {
      const { doc } = createDocument();
      const event = createEventWithTarget({
        classList: { contains: jest.fn(() => false) },
        parentNode: null
      });

      disableSafariScrolling(doc);
      performTouchMoveInDocument(doc, event);

      expect(event.preventDefault).not.toHaveBeenCalled;
      expect(event.stopPropagation).not.toHaveBeenCalled;
    });
  });

  describe('removeIOSRubberEffect', () => {
    it('should change scrollTop value to 1 when given element scrollTop value is 0', () => {
      const { doc, element } = createDocument();

      disableSafariScrolling(doc);
      performTouchStartInElement(element);

      expect(element.scrollTop).toEqual(1);
    });

    it('should subtract 1 from scrollTop when given element scrollTop value is not 0 and currentScroll equals to totalScroll', () => {
      const { doc, element } = createDocument();

      element.scrollTop = 3;
      element.scrollHeight = 8;
      element.offsetHeight = 5;

      disableSafariScrolling(doc);
      performTouchStartInElement(element);

      expect(element.scrollTop).toEqual(2);
    });

    it('should not change scrollTop value when given element scrollTop value is not 0 and currentScroll does not equal to totalScroll', () => {
      const { doc, element } = createDocument();

      element.scrollTop = 3;
      element.scrollHeight = 10;
      element.offsetHeight = 5;

      disableSafariScrolling(doc);
      performTouchStartInElement(element);

      expect(element.scrollTop).toEqual(3);
    });
  });

  const noop = () => {};

  const createDocument = () => {
    const addEventListenerStub = jest.fn(noop);
    const addEventListenerForElementStub = jest.fn(noop);
    const element = {
      addEventListener: addEventListenerForElementStub,
      nodeType: 'div',
      offsetHeight: 0,
      scrollHeight: 0,
      scrollTop: 0
    };
    const getElementsByClassName = () => [element];
    const doc = {
      addEventListener: addEventListenerStub,
      getElementsByClassName
    };

    return {
      doc,
      element
    };
  };

  const createEventWithTarget = (target) => {
    const preventDefaultStub = jest.fn(noop);
    const stopPropagationStub = jest.fn(noop);

    return {
      target,
      preventDefault: preventDefaultStub,
      stopPropagation: stopPropagationStub
    };
  };

  const performTouchMoveInDocument = (doc, event) => {
    const touchMoveFn = doc?.addEventListener?.mock?.calls?.[0]?.[1];

    if (typeof touchMoveFn === "function") {
      touchMoveFn(event);
    } else {
      throw Error("You must add an event listener by calling disableSafariScrolling first");
    }
  };

  const performTouchStartInElement = (element) => {
    const touchStartFn = element?.addEventListener?.mock?.calls?.[0]?.[1];

    if (typeof touchStartFn === "function") {
      touchStartFn();
    } else {
      throw Error("You must add an event listener by calling disableSafariScrolling first");
    }
  };
});
