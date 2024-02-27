jest.mock('src/shared/helpers/browserObject', () => ({
  ...jest.requireActual,
  location: { pathname: 'account' }
}));

import { fireEvent } from '@testing-library/react';
import { PastFlightsPage } from 'src/myAccount/pages/pastFlightsPage';
import ChapiPastFlightBuilder from 'test/builders/model/chapiPastFlightBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('PastFlightsPage', () => {
  let clearPastFlightsFnMock;
  let getPastFlightsFnMock;
  let pushMock;
  let retrieveBookingTeaserFnMock;
  let setFlowStatusFnMock;
  let showDialogFnMock;
  let updateFlightSearchRequestAndSyncToFormDataFnMock;

  beforeEach(() => {
    clearPastFlightsFnMock = jest.fn();
    getPastFlightsFnMock = jest.fn();
    pushMock = jest.fn();
    retrieveBookingTeaserFnMock = jest.fn();
    setFlowStatusFnMock = jest.fn();
    showDialogFnMock = jest.fn();
    updateFlightSearchRequestAndSyncToFormDataFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mount', () => {
    it('should retrieve past flights on mount', () => {
      createPageComponent();

      expect(getPastFlightsFnMock).toHaveBeenCalled();
    });

    it('should render past trips if there are past trips', () => {
      const { container } = createPageComponent();

      expect(container.querySelectorAll('.my-account-flight-card')).toHaveLength(1);
      expect(container.querySelector('.my-trips-number-header').textContent).toContain('1 PAST');
    });

    it('should render the booking teaser if there are no past trips', () => {
      const { container } = createPageComponent({
        pastFlightsPage: {
          numberOfPastFlights: 0,
          pastFlights: []
        }
      });

      expect(container.querySelector('.booking-teaser-btn-wrapper')).not.toBeNull();
    });
  });

  describe('unmount', () => {
    it('should clear past flights on unmount', () => {
      const { unmount } = createPageComponent();

      unmount();

      expect(clearPastFlightsFnMock).toHaveBeenCalled();
    });
  });

  describe('click', () => {
    it('should push to air booking shopping if user clicks Book a Trip button', () => {
      const { container } = createPageComponent({
        pastFlightsPage: {
          numberOfPastFlights: 0,
          pastFlights: []
        }
      });

      fireEvent.click(container.querySelector('button[data-qa="book-a-trip-btn"]'));

      expect(pushMock).toHaveBeenCalledWith('/air/booking/?cleanFlow=true');
    });

    it('should play error popup if a user tries to rebook a non-rebookable flight', () => {
      const { container } = createPageComponent({
        pastFlightsPage: {
          pastFlights: [new ChapiPastFlightBuilder().withIsRebookable(false).build()]
        }
      });

      fireEvent.click(container.querySelector('button.button--grey'));

      expect(showDialogFnMock).toHaveBeenCalled();
    });

    it('should push user to airbooking if user clicks rebook button a rebook-eligible flight', () => {
      const { container } = createPageComponent({
        pastFlightsPage: {
          pastFlights: [new ChapiPastFlightBuilder().build()]
        }
      });

      fireEvent.click(container.querySelector('button.button--grey'));

      expect(setFlowStatusFnMock).toHaveBeenCalledWith('airBooking', 'initial');
      expect(updateFlightSearchRequestAndSyncToFormDataFnMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith('/air/booking/');
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      bookingTeaser: {
        alt_text: '',
        image: '/content/mkt/images/product_features/destination_content_icon.jpg',
        product_attributes: [],
        product_description: '',
        product_heading: '',
        product_tagline: '',
        style: 'image'
      },
      clearPastFlightsFn: clearPastFlightsFnMock,
      getPastFlightsFn: getPastFlightsFnMock,
      pastFlightsPage: {
        numberOfPastFlights: 1,
        pastFlights: [new ChapiPastFlightBuilder().build()]
      },
      push: pushMock,
      retrieveBookingTeaserFn: retrieveBookingTeaserFnMock,
      setFlowStatusFn: setFlowStatusFnMock,
      showDialogFn: showDialogFnMock,
      updateFlightSearchRequestAndSyncToFormDataFn: updateFlightSearchRequestAndSyncToFormDataFnMock
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {};

    return createComponent(PastFlightsPage, { state, props: mergedProps });
  };
});
