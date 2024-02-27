import React from 'react';
import { mount, shallow } from 'enzyme';
import { sandbox } from 'sinon';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import imagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import waitFor from 'test/unit/helpers/waitFor';

import { OffersPage } from 'src/homeAndNav/pages/offersPage';

const sinon = sandbox.create();

describe('Offers Page', () => {
  const shouldShallow = true;
  let handleFirmOfferOfCreditFnStub;
  let loadOffersPagePlacementsFnStub;
  let raiseSatelliteEventStub;
  let saveOffersPagePlacementsFnStub;

  beforeEach(() => {
    handleFirmOfferOfCreditFnStub = sinon.stub();
    loadOffersPagePlacementsFnStub = sinon.stub().returns(Promise.resolve());
    raiseSatelliteEventStub = sinon.stub(AnalyticsEventHelper, 'raiseSatelliteEvent');
    saveOffersPagePlacementsFnStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('on render', () => {
    it('should render with default props', () => {
      const wrapper = createComponent({}, shouldShallow);

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with placements and templateData', () => {
      const placements = [
        new imagePlacementBuilder().build(),
        new imagePlacementBuilder().build(),
        new imagePlacementBuilder().build()
      ];
      const templateData = { key: 'value' };

      const wrapper = createComponent({ placements, templateData }, shouldShallow);

      expect(wrapper).toMatchSnapshot();
    });
  });

  context('on component mount', () => {
    it('should call loadOffersPagePlacementsFn', () => {
      createComponent();

      expect(loadOffersPagePlacementsFnStub).to.have.been.called;
      expect(saveOffersPagePlacementsFnStub).to.not.have.been.called;
    });

    it('should call analytics after offers page placements load', (done) => {
      createComponent();

      waitFor.untilAssertPass(() => {
        expect(loadOffersPagePlacementsFnStub).to.have.been.called;
        expect(raiseSatelliteEventStub).to.have.been.calledWith('SPCL:SWA:offers');
      }, done);
    });

    it('should call analytics even after offers page placements fail', (done) => {
      loadOffersPagePlacementsFnStub.returns(Promise.reject());

      createComponent();

      waitFor.untilAssertPass(() => {
        expect(loadOffersPagePlacementsFnStub).to.have.been.called;
        expect(raiseSatelliteEventStub).to.have.been.calledWith('SPCL:SWA:offers');
      }, done);
    });
  });

  context('on component unmount', () => {
    it('should call saveOffersPagePlacementsFn', () => {
      const wrapper = createComponent();

      wrapper.unmount();

      expect(saveOffersPagePlacementsFnStub).to.have.been.calledWith({});
    });
  });

  context('with placements', () => {
    it('should call handleFirmOfferOfCreditFn when observerCallback is invoked', () => {
      const placement = new imagePlacementBuilder().build();

      placement.shouldObserveViewPort = true;

      const offersPageWrapper = createComponent({ placements: [placement] }, shouldShallow);

      const observerCallback = offersPageWrapper.find(`[data-qa="offers-page-placement"]`).prop('observerCallback');

      observerCallback();

      expect(handleFirmOfferOfCreditFnStub).to.have.been.called;
    });
  });

  const createComponent = (props = {}, shouldShallow = false) => {
    const defaultProps = {
      placements: [],
      templateData: {},
      loadOffersPagePlacementsFn: loadOffersPagePlacementsFnStub,
      saveOffersPagePlacementsFn: saveOffersPagePlacementsFnStub,
      handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnStub
    };
    const finalProps = { ...defaultProps, ...props };

    const mockStore = createMockStoreWithRouterMiddleware()();

    return shouldShallow
      ? shallow(<OffersPage {...finalProps} />)
      : mount(
        <Provider store={mockStore}>
          <OffersPage {...finalProps} />
        </Provider>
      );
  };
});
