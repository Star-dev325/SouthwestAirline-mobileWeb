import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import BrowserObject from 'src/shared/helpers/browserObject';
import ToastDialog from 'src/shared/components/toastDialog';

const { window } = BrowserObject;

const sinon = sandbox.create();

describe('ToastDialog', () => {
  let onDismissCbStub;
  let message;
  let addEventListenerSpy;
  let removeEventListenerSpy;
  let setTimeoutSpy;
  let clearTimeoutSpy;

  beforeEach(() => {
    onDismissCbStub = sinon.stub();
    addEventListenerSpy = sinon.spy(window, 'addEventListener');
    removeEventListenerSpy = sinon.spy(window, 'removeEventListener');
    setTimeoutSpy = sinon.spy(window, 'setTimeout');
    clearTimeoutSpy = sinon.spy(window, 'clearTimeout');
    message = 'Some toast message';
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should render the Toast Dialog as invisible', () => {
      const component = createComponent({ isVisible: false, message });

      expect(component).to.exist;
      expect(component).to.have.prop('isVisible', false);
      expect(component.find('.toast-dialog')).to.exist;
      expect(component.find('.toast-dialog.visible')).to.not.exist;
    });

    it('should render the Toast Dialog as visible', () => {
      const component = createComponent({ isVisible: true, message });

      expect(component).to.exist;
      expect(component).to.have.prop('isVisible', true);
      expect(component.find('.toast-dialog')).to.exist;
      expect(component.find('.toast-dialog.visible')).to.exist;
    });

    it('should have message', () => {
      const component = createComponent({ isVisible: true, message });

      expect(component).to.exist;
      expect(component).to.have.prop('message', message);
      expect(component.find('.toast-dialog')).to.have.text(message);
    });
  });

  context('on mount', () => {
    it('should add window event listeners when isVisible is true', () => {
      createComponent({ isVisible: true, message });
      expect(addEventListenerSpy).to.have.been.calledWith('click');
      expect(addEventListenerSpy).to.have.been.calledWith('scroll');
      expect(setTimeoutSpy).to.have.been.called;
    });

    it('should not add window event listeners when isVisible is false', () => {
      createComponent({ isVisible: false, message });
      expect(addEventListenerSpy).to.not.be.calledWith('click');
      expect(addEventListenerSpy).to.not.be.calledWith('scroll');
    });

    it('should set timeout at window level when isVisible is true', () => {
      const component = createComponent({ isVisible: true, message });

      component.unmount();
      expect(setTimeoutSpy).to.have.been.called;
    });
  });

  context('on unmount', () => {
    it('should remove window event listeners when component unmounts', () => {
      const component = createComponent({ isVisible: true, message });

      component.unmount();
      expect(removeEventListenerSpy).to.have.been.calledWith('click');
      expect(removeEventListenerSpy).to.have.been.calledWith('scroll');
    });

    it('should not add window event listeners when isVisible is false', () => {
      createComponent({ isVisible: false, message });
      expect(removeEventListenerSpy).to.not.be.calledWith('click');
      expect(removeEventListenerSpy).to.not.be.calledWith('scroll');
    });

    it('should clear timeout at window level when component unmounts', () => {
      const component = createComponent({ isVisible: true, message });

      component.unmount();
      expect(clearTimeoutSpy).to.have.been.called;
    });
  });

  context('onDismissCb', () => {
    const map = {};

    beforeEach(() => {
      window.addEventListener = (event, cb) => {
        map[event] = cb;
      };
      window.removeEventListener = (event, cb) => {
        map[event] = cb;
      };
    });

    it('should call onDismissCb and remove event listeners when any part of the page clicked besides ToastDialog', () => {
      createComponent({ isVisible: true, message }, true);

      map.click(); // simulate clicking outside ToastDialog

      expect(onDismissCbStub).to.have.been.called;
      expect(clearTimeoutSpy).to.have.been.called;
    });

    it('should not call onDismissCb when ToastDialog is clicked', () => {
      const wrapper = createComponent({ isVisible: true, message }, true);

      click(wrapper.find('ToastDialog'));
      expect(onDismissCbStub).to.not.have.been.called;
    });
  });

  const createComponent = (props = {}, withWrapper = false) => {
    if (withWrapper) {
      return mount(
        <div className="wrapperDiv">
          <ToastDialog onDismissCb={onDismissCbStub} {...props} />
        </div>
      );
    } else {
      return mount(<ToastDialog onDismissCb={onDismissCbStub} {...props} />);
    }
  };
});
