import _ from 'lodash';
import { sandbox } from 'sinon';
import { canUseDOM, addEndEventListener, removeEndEventListener } from 'src/shared/helpers/transitionEndEventsHelper';

const sinon = sandbox.create();

describe('TransitionEndEventsHelper', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('canUseDOM', () => {
    it('should return true if DOM is available', () => {
      expect(canUseDOM()).to.eq(true);
    });

    context('with DOM unavailable', () => {
      beforeEach(() => {
        sinon.stub(window, 'document').returns(undefined);
      });

      it('should return true if DOM is available', () => {
        expect(canUseDOM()).to.eq(true);
      });
    });
  });

  context('addEndEventListener', () => {
    let eventListenerSpy;
    let node;

    beforeEach(() => {
      node = document.createElement('div');
      eventListenerSpy = sinon.spy(node, 'addEventListener');
    });

    it('should not add any event listeners if css transitions not supported', () => {
      addEndEventListener(node, _.noop);
      expect(eventListenerSpy).to.not.have.been.called;
    });

    it('should add an event listener', () => {
      addEndEventListener(node, _.noop, 'fakeEndEvent');
      expect(eventListenerSpy).to.have.been.called;
    });

    it('should not add an event listener when node is undefined', () => {
      addEndEventListener(undefined, _.noop, 'fakeEndEvent');
      expect(eventListenerSpy).to.not.have.been.called;
    });
  });

  context('removeEndEventListener', () => {
    let eventListenerSpy;
    let node;

    beforeEach(() => {
      node = document.createElement('div');
      eventListenerSpy = sinon.spy(node, 'removeEventListener');
    });

    it('should not add any event listeners if css transitions not supported', () => {
      removeEndEventListener(node, _.noop);
      expect(eventListenerSpy).to.not.have.been.called;
    });

    it('should remove an event listener', () => {
      removeEndEventListener(node, _.noop, 'fakeEndEvent');
      expect(eventListenerSpy).to.have.been.called;
    });

    it('should not add an event listener when node is undefined', () => {
      removeEndEventListener(undefined, _.noop, 'fakeEndEvent');
      expect(eventListenerSpy).to.not.have.been.called;
    });
  });
});
