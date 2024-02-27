import { sandbox } from 'sinon';
import _ from 'lodash';
import waitFor from 'test/unit/helpers/waitFor';
import { submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { integrationMount } from 'test/unit/helpers/testUtils';
import SearchRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import ShoppingLandingPage from 'src/airBooking/pages/shoppingLandingPage';
import * as AppSelector from 'src/shared/selectors/appSelector';

const sinon = sandbox.create();

describe('Enhanced ShoppingLandingPage', () => {
  let connectedShoppingLandingPage;
  let initialState;
  let toggles;

  beforeEach(() => {
    toggles = {};
    initialState = {
      app: {
        airBooking: {
          searchRequest: {}
        },
        toggles
      }
    };

    sinon.stub(FlightBookingApi, 'findFlightProducts').returns(Promise.resolve(new ProductsBuilder().build()));
    sinon.stub(FlightBookingApi, 'fetchShoppingDetails').returns(Promise.resolve({}));
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('#onSearchFlightSubmit', () => {
    it('should transition to airBookingFlightProductPage', (done) => {
      const defaultSearchRequest = new SearchRequestBuilder().build();

      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      _.set(initialState, 'app.airBooking.searchRequest', defaultSearchRequest);
      connectedShoppingLandingPage = integrationMount()(initialState, ShoppingLandingPage);

      submitForm(connectedShoppingLandingPage);

      waitFor.untilAssertPass(() => {
        expect(connectedShoppingLandingPage).to.have.pathname('/air/booking/select-depart.html');
      }, done);
    });
  });

  describe('enhancers', () => {
    describe('withQueryOverrideSearchRequest', () => {
      it.skip('should use search request from query', () => {
        const location = '?fromCity=CAK&toCity=ATL&departDate=08/23/2016&returnDate=08/25/2016&tripType=RT';

        connectedShoppingLandingPage = integrationMount({ location })(initialState, ShoppingLandingPage);
        submitForm(connectedShoppingLandingPage);

        const { searchRequest } = connectedShoppingLandingPage.find('ShoppingLandingPage').props();

        expect(searchRequest.origin).to.be.equal('CAK');
        expect(searchRequest.destination).to.be.equal('ATL');
      });
    });
  });
});
