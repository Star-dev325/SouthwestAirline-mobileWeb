import { mount } from 'enzyme';
import proxyquire from 'proxyquire';
import React from 'react';
import { sandbox } from 'sinon';

const sinon = sandbox.create();

describe('Disable Scrolling', () => {
  const FakeComponent = () => <span />;
  let EnhancedComponent;
  let addClassStub;
  let removeClassStub;
  let withDisableScrolling;
  let wrapper;

  beforeEach(() => {
    addClassStub = sinon.stub();
    removeClassStub = sinon.stub();
    sinon.stub(document, 'getElementById').returns('element');
    withDisableScrolling = proxyquire('src/shared/enhancers/withDisableScrolling', {
      'src/shared/helpers/domUtils': {
        addClass: addClassStub,
        removeClass: removeClassStub
      }
    }).default;
  });

  afterEach(() => {
    sinon.restore();
  });

  context('spinner', () => {
    beforeEach(() => {
      EnhancedComponent = withDisableScrolling({
        activeName: 'showSpinner'
      })(FakeComponent);
      wrapper = mount(<EnhancedComponent />);
    });

    context('component will update', () => {
      it('should add disable scrolling spinner class when the disable condition is true', () => {
        wrapper.instance().UNSAFE_componentWillUpdate({ showSpinner: true });

        expect(addClassStub).to.be.calledWith('element', 'disable-scrolling--spinner');
      });

      it('should not add disable scrolling spinner class when disable condition is false', () => {
        wrapper = mount(<EnhancedComponent showSpinner />);

        wrapper.instance().UNSAFE_componentWillUpdate({ showSpinner: false });

        expect(removeClassStub).to.be.calledWith('element', 'disable-scrolling--spinner');
      });
    });

    context('component will unmount', () => {
      it('should remove disable scrolling spinner class', () => {
        wrapper.instance().componentWillUnmount();

        expect(removeClassStub).to.be.calledWith('element', 'disable-scrolling--spinner');
      });
    });
  });

  context('popup', () => {
    beforeEach(() => {
      EnhancedComponent = withDisableScrolling()(FakeComponent);
      wrapper = mount(<EnhancedComponent />);
    });

    context('component will update', () => {
      it('should add disable scrolling popup class when the disable condition is true', () => {
        wrapper.instance().UNSAFE_componentWillUpdate({ active: true });

        expect(addClassStub).to.be.calledWith('element', 'disable-scrolling');
      });

      it('should not add disable scrolling popup class when disable condition is false', () => {
        wrapper = mount(<EnhancedComponent ative />);

        wrapper.instance().UNSAFE_componentWillUpdate({ active: false });

        expect(removeClassStub).to.be.calledWith('element', 'disable-scrolling');
      });

      it('should not add disable scrolling class if hasStickyFooterButton is true', () => {
        wrapper.instance().UNSAFE_componentWillUpdate({ active: true, hasStickyFooterButton: true });

        expect(addClassStub).not.to.be.calledWith('element', 'disable-scrolling');
      });

      it('should add disable scrolling class if hasStickyFooterButton is false', () => {
        wrapper.instance().UNSAFE_componentWillUpdate({ active: true, hasStickyFooterButton: false });

        expect(addClassStub).to.be.calledWith('element', 'disable-scrolling');
      });
    });

    context('component will unmount', () => {
      it('should remove disable scrolling popup class', () => {
        wrapper.instance().componentWillUnmount();

        expect(removeClassStub).to.be.calledWith('element', 'disable-scrolling');
      });
    });
  });
});
