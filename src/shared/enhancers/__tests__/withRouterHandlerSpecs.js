import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import withRouterHandler from 'src/shared/enhancers/withRouterHandler';

const sinon = sandbox.create();

describe('withRouterHandler', () => {
  let mockLocation;
  let WithRouterHandler;
  let spy;

  beforeEach(() => {
    mockLocation = { location: { pathname: '/', search: '' } };
    WithRouterHandler = withRouterHandler(() => <div />);
    spy = sinon.spy(WithRouterHandler.prototype, 'shouldComponentUpdate');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should re-render component when pathname changed', () => {
    const wrapper = createComponent(mockLocation);

    wrapper.setProps({ location: { pathname: '/some-url', search: '' } });

    expect(spy).to.have.been.calledOnce;
    expect(spy.returnValues[0]).to.be.true;
  });

  it('should re-render component when in checkQueryList and only search changed', () => {
    const wrapper = createComponent(mockLocation);

    wrapper.setProps({ location: { pathname: '/', search: '?tab=FLIGHT' } });

    expect(spy).to.have.been.calledOnce;
    expect(spy.returnValues[0]).to.be.true;
  });

  it('should not re-render component when url not change', () => {
    const wrapper = createComponent(mockLocation);

    wrapper.setProps({ location: { pathname: '/', search: '' } });

    expect(spy).to.have.been.calledOnce;
    expect(spy.returnValues[0]).to.be.false;
  });

  function createComponent(props = {}) {
    return mount(<WithRouterHandler {...props} />);
  }
});
