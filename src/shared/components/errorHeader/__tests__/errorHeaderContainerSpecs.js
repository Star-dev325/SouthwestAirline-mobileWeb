import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';

import { ErrorHeaderContainer } from 'src/shared/components/errorHeader/errorHeaderContainer';
import ErrorHeader from 'src/shared/components/errorHeader/errorHeader';
import * as uiHelper from 'src/shared/helpers/uiHelper';

const sinon = sandbox.create();

describe('ErrorHeaderContainer', () => {
  let wrapper;

  afterEach(() => {
    sinon.restore();
  });

  context('componentDidUpdate', () => {
    let scrollToTopStub;

    beforeEach(() => {
      scrollToTopStub = sinon.stub(uiHelper, 'scrollToTop');
    });

    it('should call scrollToTop if there is an error', () => {
      wrapper = createComponent({
        hasError: false
      });
      const prevProps = wrapper.props();

      wrapper.setProps({ ...prevProps, hasError: true });

      expect(scrollToTopStub).to.have.been.called;
    });

    it('should not call scrollToTop if there is not an error', () => {
      wrapper = createComponent({
        hasError: false
      });
      const prevProps = wrapper.props();

      wrapper.setProps({ ...prevProps, hasError: false });

      expect(scrollToTopStub).to.not.have.been.called;
    });
  });

  context('when the error header store says there is an error', () => {
    it('should display error header', () => {
      wrapper = createComponent();

      expect(wrapper.find(ErrorHeader)).to.be.present();
    });

    it('should display error message', () => {
      wrapper = createComponent();
      const errorHeader = wrapper.find(ErrorHeader);

      expect(errorHeader).to.have.text('some error message');
    });
  });

  context('when the error header store says there is no error', () => {
    beforeEach(() => {
      wrapper = createComponent({
        hasError: false
      });
    });

    it('should not display error header', () => {
      expect(wrapper.find(ErrorHeader)).to.not.be.present();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      errorMessage: 'some error message',
      hasError: true
    };

    return mount(<ErrorHeaderContainer {...defaultProps} {...props} />);
  };
});
