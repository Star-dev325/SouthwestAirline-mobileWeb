import _ from 'lodash';
import sinonModule from 'sinon';
import { CALL_HISTORY_METHOD } from 'connected-react-router';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import * as UrlHelper from 'src/shared/helpers/urlHelper';
import earlyBirdPricingFetchMiddleware from 'src/shared/redux/middlewares/earlyBirdPricingFetchMiddleware';
import * as EarlyBirdInPathActions from 'src/airBooking/actions/earlyBirdInPathActions';

const sinon = sinonModule.sandbox.create();

describe('earlyBirdPricingFetchMiddleware', () => {
  const store = {};
  const state = {};

  const mockFetchEarlybirdPricingAction = { type: 'fakeEBType' };
  const mockAction = { finally: (cb) => cb() };

  beforeEach(() => {
    store.getState = sinon.stub().returns(state);
    store.dispatch = sinon.stub().returns(mockAction);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('next page is airBooking review page', () => {
    const mockPushAction = {
      type: CALL_HISTORY_METHOD,
      payload: { args: ['/air/booking/purchase'] }
    };

    it('should call fetch earlyBird pricing action  when earlyBirdPricing link not empty', () => {
      sinon.stub(EarlyBirdInPathActions, 'fetchEarlybirdPricing').returns(mockFetchEarlybirdPricingAction);
      _.set(
        state,
        'app.airBooking.flightPricingPage.response.flightPricingPage',
        new PricesBuilder().build().flightPricingPage
      );
      sinon.stub(UrlHelper, 'getNormalizedRoute').returns('/air/booking/purchase');

      earlyBirdPricingFetchMiddleware(store)(store.dispatch)(mockPushAction);

      expect(store.dispatch.args[0][0]).to.equal(mockFetchEarlybirdPricingAction);
      expect(store.dispatch.args[1][0]).to.equal(mockPushAction);
    });

    it('should not call fetch earlyBird pricing action when earlyBirdPricing link  empty', () => {
      _.set(state, 'app.airBooking.flightPricingPage.response.flightPricingPage._links.earlyBirdPricing', null);

      earlyBirdPricingFetchMiddleware(store)(store.dispatch)(mockPushAction);

      expect(store.dispatch.args[0][0]).to.equal(mockPushAction);
    });
  });

  context('next page is not airBooking review page', () => {
    const mockPushAction = {
      type: CALL_HISTORY_METHOD,
      payload: { args: ['/air/booking/notReview'] }
    };

    it('should not call fetch earlyBird pricing action', () => {
      earlyBirdPricingFetchMiddleware(store)(store.dispatch)(mockPushAction);

      expect(store.dispatch.args[0][0]).to.equal(mockPushAction);
    });
  });

  context('back to airBooking review page', () => {
    const mockBackAction = {
      type: CALL_HISTORY_METHOD,
      payload: { args: [], method: 'goBack' }
    };

    it('should call fetch earlyBird pricing action when earlyBirdPricing link not empty and back from passenger edit page', () => {
      sinon.stub(EarlyBirdInPathActions, 'fetchEarlybirdPricing').returns(mockFetchEarlybirdPricingAction);
      _.set(
        state,
        'app.airBooking.flightPricingPage.response.flightPricingPage',
        new PricesBuilder().build().flightPricingPage
      );
      _.set(state, 'router.location.pathname', '/air/booking/passengers/0/edit');

      earlyBirdPricingFetchMiddleware(store)(store.dispatch)(mockBackAction);

      expect(store.dispatch.args[0][0]).to.equal(mockFetchEarlybirdPricingAction);
      expect(store.dispatch.args[1][0]).to.equal(mockBackAction);
    });

    it('should not call fetch earlyBird pricing action  when earlyBirdPricing link not empty and back from not passenger page', () => {
      _.set(
        state,
        'app.airBooking.flightPricingPage.response.flightPricingPage',
        new PricesBuilder().build().flightPricingPage
      );
      _.set(state, 'router.location.pathname', '/not/passenger/page');
      sinon.stub(EarlyBirdInPathActions, 'fetchEarlybirdPricing').returns(mockBackAction);
      earlyBirdPricingFetchMiddleware(store)(store.dispatch)(mockBackAction);

      expect(store.dispatch.args[0][0]).to.equal(mockBackAction);
    });
  });

  context('earlyBirdPricingToken', () => {
    const mockPushAction = {
      type: CALL_HISTORY_METHOD,
      payload: { args: ['/air/booking/purchase'] }
    };

    let fetchEarlybirdPricingStub;

    beforeEach(() => {
      _.set(state, 'app.airBooking.earlyBirdPricingToken', 'increase');
      _.set(
        state,
        'app.airBooking.flightPricingPage.response.flightPricingPage',
        new PricesBuilder().build().flightPricingPage
      );
    });

    afterEach(() => {
      _.set(state, 'app.toggles.EARLY_BIRD_AB_TESTING', false);
      sinon.reset();
    });

    it('should call pricing with earlyBirdPricingToken', () => {
      fetchEarlybirdPricingStub = sinon
        .stub(EarlyBirdInPathActions, 'fetchEarlybirdPricing')
        .returns(mockFetchEarlybirdPricingAction);
      store.dispatch = sinon.stub().returns(mockAction);
      sinon.stub(UrlHelper, 'getNormalizedRoute').returns('/air/booking/purchase');
      earlyBirdPricingFetchMiddleware(store)(store.dispatch)(mockPushAction);
      expect(fetchEarlybirdPricingStub).to.have.been.calledWith(
        {
          body: {
            adultPassengers: {
              productIds: ['eyJwcm9kdWN0SWQiO']
            }
          },
          href: '/v1/mobile-air-booking/feature/earlybird/prices',
          method: 'POST'
        },
        undefined,
        'USD',
        'increase'
      );
    });
  });
});
