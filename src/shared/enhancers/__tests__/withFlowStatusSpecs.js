import React from 'react';
import { sandbox } from 'sinon';
import { STATUS } from 'src/shared/constants/flowConstants';
import { integrationMount } from 'test/unit/helpers/testUtils';

const sinon = sandbox.create();

describe('withFlowStatus', () => {
  let withFlowStatus;
  let setFlowStatusStub;
  let addHistoryForceRedirectStub, isBrowserBackOrForwardStub, isComingFromHomePageStub, isModalOpenStub;

  beforeEach(() => {
    const routeStateHelper = require('src/shared/routeUtils/routeStateHelper');
    const HistoryActions = require('src/shared/actions/historyActions');
    const routeStore = require('src/shared/stores/routerStore').default;

    isBrowserBackOrForwardStub = sinon.stub(routeStateHelper, 'isBrowserBackOrForward');
    isModalOpenStub = sinon.stub(routeStateHelper, 'isModalOpen');
    addHistoryForceRedirectStub = sinon.stub(HistoryActions, 'addHistoryForceRedirect').returns({ type: 'fakeType' });
    isComingFromHomePageStub = sinon.stub(routeStore, 'isComingFromHomePage').returns(true);
    setFlowStatusStub = sinon.stub().returns({ type: 'fake-type' });
    sinon.stub(routeStore, 'getCurrentState').returns({ pathname: 'test-path', search: '?cleanFlow=true' });
    sinon.stub(routeStore, 'getPrevPath').returns('not-home-path');
    withFlowStatus = require('src/shared/enhancers/withFlowStatus').default;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set flow status when is not back or forward', () => {
    isBrowserBackOrForwardStub.returns(false);
    createComponent({
      action: { setFlowStatus: setFlowStatusStub },
      flowStatus: STATUS.IN_PROGRESS
    });

    expect(setFlowStatusStub).to.be.calledWith(STATUS.IN_PROGRESS);
  });

  it('should not set flow status when is back or forward', () => {
    isBrowserBackOrForwardStub.returns(true);
    createComponent({
      action: { setFlowStatus: setFlowStatusStub },
      flowStatus: STATUS.IN_PROGRESS
    });

    expect(setFlowStatusStub).to.not.be.called;
  });

  it('should set flowStatus default to INITIAL and add a history force redirect', () => {
    isBrowserBackOrForwardStub.returns(false);
    isComingFromHomePageStub.returns(false);
    isModalOpenStub.returns(false);
    createComponent({
      action: { setFlowStatus: setFlowStatusStub }
    });

    expect(setFlowStatusStub).to.be.calledWith(STATUS.INITIAL);
    expect(addHistoryForceRedirectStub).to.be.calledWith('test-path');
  });

  it('should not add history force redirect when opening a modal', () => {
    isBrowserBackOrForwardStub.returns(false);
    isComingFromHomePageStub.returns(false);
    isModalOpenStub.returns(true);
    createComponent({
      action: { setFlowStatus: setFlowStatusStub }
    });

    expect(setFlowStatusStub).to.be.calledWith(STATUS.INITIAL);
    expect(addHistoryForceRedirectStub).to.not.be.called;
  });

  it('should not render component when adding history force redirect', () => {
    isBrowserBackOrForwardStub.returns(false);
    isComingFromHomePageStub.returns(false);
    isModalOpenStub.returns(false);
    const wrapper = createComponent({
      action: { setFlowStatus: setFlowStatusStub }
    });

    expect(wrapper.find('#inner-component')).to.not.exist;
  });

  it('should render component when not adding history force redirect', () => {
    isBrowserBackOrForwardStub.returns(true);
    const wrapper = createComponent({
      action: { setFlowStatus: setFlowStatusStub }
    });

    expect(wrapper.find('#inner-component')).to.exist;
  });

  function createComponent({ action, flowStatus }) {
    const WithFlowStatusComponent = withFlowStatus({
      action,
      flowStatus
    })(() => <div id="inner-component" />);

    return integrationMount()({}, WithFlowStatusComponent);
  }
});
