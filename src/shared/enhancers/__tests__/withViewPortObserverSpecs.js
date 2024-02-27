import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';

import withViewPortObserver from 'src/shared/enhancers/withViewPortObserver';

const sinon = sandbox.create();

describe('WithViewPortObserver', () => {
  const FakeComponent = () => <div />;

  let intersectionObserverStub;
  let observeStub;
  let observer;
  let setStateStub;
  let useStateStub;

  beforeEach(() => {
    intersectionObserverStub = sinon.stub(global, 'IntersectionObserver');
    observeStub = sinon.stub();
    observer = { observe: observeStub };
    intersectionObserverStub.returns(observer);
    setStateStub = sinon.stub();
    useStateStub = sinon.stub(React, 'useState').returns([{ hasLoaded: true, hasSetObserver: false }, setStateStub]);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('should omit props', () => {
      const wrapper = createComponent({
        shouldObserveViewPort: false,
        viewPortThreshold: 0.5,
        observerCallback: _.noop
      });

      expect(wrapper.find('FakeComponent').props()).to.deep.equal({
        shouldObserveViewPort: false,
        viewPortThreshold: 0.5
      });
    });

    it('should create IntersectionObserver on element when child has loaded and there is no other observer', () => {
      const wrapper = createComponent();

      wrapper.unmount();

      expect(intersectionObserverStub).to.have.been.calledOnce;
      expect(observeStub).to.have.been.calledOnce;
    });

    it('should not create IntersectionObserver on element when child has not loaded', () => {
      useStateStub.returns([{ hasLoaded: false, hasSetObserver: false }, setStateStub]);
      const wrapper = createComponent();

      wrapper.unmount();

      expect(intersectionObserverStub).to.not.have.been.called;
      expect(observeStub).to.not.have.been.called;
    });

    it('should not create IntersectionObserver on element when there is another observer', () => {
      useStateStub.returns([{ hasLoaded: true, hasSetObserver: true }, setStateStub]);
      const wrapper = createComponent();

      wrapper.unmount();

      expect(intersectionObserverStub).to.not.have.been.called;
      expect(observeStub).to.not.have.been.called;
    });
  });

  context('callback', () => {
    let observerCallbackStub;

    beforeEach(() => {
      observerCallbackStub = sinon.stub();
    });

    it('should invoke observerCallback when target isIntersecting', () => {
      createComponent({ shouldObserveViewPort: true, observerCallback: observerCallbackStub });

      const target = [{ isIntersecting: true }];

      const callback = intersectionObserverStub.args[0][0];

      callback(target);

      expect(intersectionObserverStub).to.have.been.called;
      expect(observerCallbackStub).to.have.been.called;
    });

    it('should invoke observerCallback when target intersectionRatio is above viewPortThreshold', () => {
      createComponent({
        shouldObserveViewPort: true,
        viewPortThreshold: 0.1,
        observerCallback: observerCallbackStub
      });

      const target = [{ intersectionRatio: 0.2 }];

      const callback = intersectionObserverStub.args[0][0];

      callback(target);

      expect(intersectionObserverStub).to.have.been.called;
      expect(observerCallbackStub).to.have.been.called;
    });

    it('should invoke observerCallback when child has loaded', () => {
      createComponent({
        shouldObserveViewPort: true,
        viewPortThreshold: 0.1,
        observerCallback: observerCallbackStub,
        pageId: 'mobile-index-home',
        target: 'https://mweb.com?REF=MWEB&CELL=6LTV&SPID=GKHN&cbid=5051041&isChaseCombo=true'
      });

      const target = [{ intersectionRatio: 0.2 }];

      const callback = intersectionObserverStub.args[0][0];

      callback(target);

      expect(intersectionObserverStub).to.have.been.called;
      expect(observerCallbackStub).to.have.been.calledWith({
        CELL: '6LTV',
        REF: 'MWEB',
        SPID: 'GKHN',
        cbid: '5051041',
        isChaseCombo: 'true',
        pageId: 'mobile-index-home'
      });
    });

    it('should not invoke observerCallback when not intersecting', () => {
      createComponent({
        shouldObserveViewPort: true,
        observerCallback: observerCallbackStub
      });

      const target = [{ isIntersecting: false }];

      const callback = intersectionObserverStub.args[0][0];

      callback(target);

      expect(intersectionObserverStub).to.have.been.called;
      expect(observerCallbackStub).to.not.have.been.called;
    });

    it('should not invoke observerCallback when target intersectionRatio is below viewPortThreshold', () => {
      createComponent({
        shouldObserveViewPort: true,
        viewPortThreshold: 0.2,
        observerCallback: observerCallbackStub
      });

      const target = [{ intersectionRatio: 0.1 }];

      const callback = intersectionObserverStub.args[0][0];

      callback(target);

      expect(intersectionObserverStub).to.have.been.called;
      expect(observerCallbackStub).to.not.have.been.called;
    });

    it('should not invoke observerCallback when target is null', () => {
      createComponent({
        shouldObserveViewPort: true,
        viewPortThreshold: 0.2,
        observerCallback: observerCallbackStub
      });

      const callback = intersectionObserverStub.args[0][0];

      callback(undefined);

      expect(intersectionObserverStub).to.have.been.called;
      expect(observerCallbackStub).to.not.have.been.called;
    });

    it('should not invoke observerCallback when target is empty', () => {
      createComponent({
        shouldObserveViewPort: true,
        viewPortThreshold: 0.2,
        observerCallback: observerCallbackStub
      });

      const callback = intersectionObserverStub.args[0][0];

      callback([]);

      expect(intersectionObserverStub).to.have.been.called;
      expect(observerCallbackStub).to.not.have.been.called;
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {};

    const WithViewPortObserver = withViewPortObserver(FakeComponent);

    return mount(<WithViewPortObserver {..._.merge({}, defaultProps, props)} />);
  };
});
