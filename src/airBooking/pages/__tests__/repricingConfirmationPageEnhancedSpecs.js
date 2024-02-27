import Q from 'q';
import sinonModule from 'sinon';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import waitFor from 'test/unit/helpers/waitFor';
import { integrationMount } from 'test/unit/helpers/testUtils';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import RepricingConfirmationPage from 'src/airBooking/pages/repricingConfirmationPage';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import SearchRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import * as AppSelector from 'src/shared/selectors/appSelector';

const sinon = sinonModule.sandbox.create();

describe('Enhanced RepricingConfirmationPage', () => {
  let initialState;
  let repricingConfirmationPage;

  const defaultFlightProducts = new PricesBuilder().withReprice().build().flightPricingPage;
  const defaultSearchRequest = new SearchRequestBuilder().build();

  beforeEach(() => {
    repricingConfirmationPage = createComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('click', () => {
    it('should change the location pathname when click continue button', (done) => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      click(repricingConfirmationPage.find('RepricingNavigation').find('button.continue'));

      waitFor.untilAssertPass(() => {
        expect(repricingConfirmationPage.instance().props.history.location.pathname).to.equal(
          '/air/booking/price.html'
        );
      }, done);
    });

    it('should transition to product list page when click cancel button', (done) => {
      const response = new ProductsBuilder().build();

      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/booking');
      sinon.stub(FlightBookingApi, 'findFlightProducts').returns(Q(response));

      click(repricingConfirmationPage.find('RepricingNavigation').find('button.cancel'));

      waitFor.untilAssertPass(() => {
        expect(repricingConfirmationPage.instance().props.history.location.pathname).to.equal(
          '/air/booking/select-depart.html'
        );
      }, done);
    });
  });

  const createComponent = (flightProducts = defaultFlightProducts) => {
    initialState = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: {
              flightPricingPage: flightProducts
            }
          },
          searchRequest: defaultSearchRequest
        }
      }
    };

    return integrationMount()(initialState, RepricingConfirmationPage);
  };
});
