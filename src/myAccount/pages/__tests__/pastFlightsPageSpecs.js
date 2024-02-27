import _ from 'lodash';
import { sandbox } from 'sinon';
import { airBookingRoutes } from "src/airBooking/constants/airBookingRoutes";
import * as UrlHelper from 'src/shared/helpers/urlHelper';
import { PastFlightsPage } from 'src/myAccount/pages/pastFlightsPage';
import ChapiPastFlightBuilder from 'test/builders/model/chapiPastFlightBuilder';
import { createComponent } from 'test/unit/helpers/testUtils';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sandbox.create();
const airBookingRoute = airBookingRoutes['index'];

describe('PastFlightsPage', () => {
  let clearPastFlightsFnStub,
    getPastFlightsFnStub,
    pageComponent,
    pushStub,
    retrieveBookingTeaserFnStub,
    setFlowStatusFnStub,
    showDialogFnStub,
    updateFlightSearchRequestAndSyncToFormDataFnStub,
    wrapper;

  beforeEach(() => {
    pushStub = sinon.stub();
    showDialogFnStub = sinon.stub();
    getPastFlightsFnStub = sinon.stub();
    clearPastFlightsFnStub = sinon.stub();
    setFlowStatusFnStub = sinon.stub();
    updateFlightSearchRequestAndSyncToFormDataFnStub = sinon.stub();
    retrieveBookingTeaserFnStub = sinon.stub();
    pageComponent = createPageComponent();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('mount', () => {
    it('should retrieve past flights on mount', () => {
      expect(getPastFlightsFnStub).to.have.been.called;
    });

    it('should render past trips if there are past trips', () => {
      expect(pageComponent.find('MyAccountFlightCard')).to.exist;
      expect(pageComponent.find('MyAccountFlightCard')).have.lengthOf(1);
      expect(pageComponent.find('MyTripsNumberHeader')).have.text('1 PAST');
    });

    it('should render the booking teaser if there are no past trips', () => {
      pageComponent = createPageComponent({
        pastFlightsPage: {
          numberOfPastFlights: 0,
          pastFlights: []
        }
      });
      expect(pageComponent.find('BookingTeaser')).to.exist;
    });
  });

  context('unmount', () => {
    it('should clear past flights on unmount', () => {
      wrapper.unmount();
      expect(clearPastFlightsFnStub).to.have.been.called;
    });
  });

  context('click', () => {
    it('should push to air booking shopping if user clicks Book a Trip button', () => {
      sinon.stub(UrlHelper, 'getNormalizedRoute').returns(airBookingRoute);
      pageComponent = createPageComponent({
        pastFlightsPage: {
          numberOfPastFlights: 0,
          pastFlights: []
        }
      });
      click(pageComponent.find('button[data-qa="book-a-trip-btn"]'));

      expect(pushStub).to.have.been.calledWith(`${airBookingRoutes['index']}?cleanFlow=true`);
    });

    it('should play error popup if a user tries to rebook a non-rebookable flight', () => {
      pageComponent = createPageComponent({
        pastFlightsPage: {
          pastFlights: [new ChapiPastFlightBuilder().withIsRebookable(false).build()]
        }
      });
      click(pageComponent.find('button.button--grey'));

      expect(showDialogFnStub).to.have.been.called;
    });

    it('should push user to air booking if user clicks rebook button a rebook-eligible flight', () => {
      sinon.stub(UrlHelper, 'getNormalizedRoute').returns(airBookingRoute);
      pageComponent = createPageComponent({
        pastFlightsPage: {
          pastFlights: [new ChapiPastFlightBuilder().build()]
        }
      });
      click(pageComponent.find('button.button--grey'));

      expect(setFlowStatusFnStub).to.have.been.calledWith('airBooking', 'initial');
      expect(updateFlightSearchRequestAndSyncToFormDataFnStub).to.have.been.called;
      expect(pushStub).to.have.been.calledWith(airBookingRoute);
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      push: pushStub,
      pastFlightsPage: {
        numberOfPastFlights: 1,
        pastFlights: [new ChapiPastFlightBuilder().build()]
      },
      bookingTeaser: {
        style: 'image',
        image: '/content/mkt/images/product_features/destination_content_icon.jpg',
        alt_text: '',
        product_heading: '',
        product_description: '',
        product_attributes: [],
        product_tagline: ''
      },
      showDialogFn: showDialogFnStub,
      getPastFlightsFn: getPastFlightsFnStub,
      clearPastFlightsFn: clearPastFlightsFnStub,
      setFlowStatusFn: setFlowStatusFnStub,
      updateFlightSearchRequestAndSyncToFormDataFn: updateFlightSearchRequestAndSyncToFormDataFnStub,
      retrieveBookingTeaserFn: retrieveBookingTeaserFnStub
    };

    const mergedProps = _.merge({}, defaultProps, props);
    const state = {};

    wrapper = createComponent(PastFlightsPage, { state, props: mergedProps });

    return wrapper.find('PastFlightsPage');
  };
});
