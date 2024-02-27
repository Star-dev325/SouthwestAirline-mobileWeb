jest.mock('src/shared/selectors/appSelector', () => ({
  getCurrentAppFlow: jest.fn().mockReturnValue('account')
}));

import { fireEvent } from '@testing-library/react';
import { SavedFlightsPage } from 'src/myAccount/pages/savedFlightsPage';
import BrowserObject from 'src/shared/helpers/browserObject';
import ChapiSavedFlightBuilder from 'test/builders/model/chapiSavedFlightBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('SavedFlightsPage', () => {
  let clearSavedFlightsFnMock;
  let getSavedFlightsFnMock;
  let pushMock;
  let resetAirBookingFlowDataFnMock;
  let retrieveBookingTeaserFnMock;
  let searchForFlightsFnMock;
  let showDialogFnMock;

  beforeEach(() => {
    clearSavedFlightsFnMock = jest.fn();
    getSavedFlightsFnMock = jest.fn();
    pushMock = jest.fn();
    resetAirBookingFlowDataFnMock = jest.fn();
    retrieveBookingTeaserFnMock = jest.fn();
    searchForFlightsFnMock = jest.fn();
    showDialogFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mount', () => {
    it('should retrieve saved flights on mount', () => {
      createPageComponent();

      expect(getSavedFlightsFnMock).toHaveBeenCalled();
    });

    it('should render saved trips if there are saved trips', () => {
      const { container } = createPageComponent();

      expect(container.querySelectorAll('.my-account-flight-card')).toHaveLength(1);
      expect(container.querySelector('.my-trips-number-header').textContent).toContain('1 SAVED');
    });

    it('should render the booking teaser if there are no saved trips', () => {
      const { container } = createPageComponent({
        savedFlightsPage: {
          numberOfSavedFlights: 0,
          savedFlights: []
        }
      });

      expect(container.querySelector('.booking-teaser-btn-wrapper')).not.toBeNull();
    });
  });

  describe('unmount', () => {
    it('should clear saved flights on unmount', () => {
      const { unmount } = createPageComponent();

      unmount();

      expect(clearSavedFlightsFnMock).toHaveBeenCalled();
    });
  });

  describe('click', () => {
    it('should push to air booking shopping if user clicks Book a Trip button within the new route flow', () => {
      BrowserObject.location = { pathname: '/myaccount' };

      const { container } = createPageComponent({
        savedFlightsPage: {
          numberOfSavedFlights: 0,
          savedFlights: []
        }
      });

      fireEvent.click(container.querySelector('button[data-qa="book-a-trip-btn"]'));

      expect(pushMock).toHaveBeenCalledWith('/air/booking/?cleanFlow=true');
    });

    it('should push to air booking shopping if user clicks Book a Trip button within the old route flow', () => {
      BrowserObject.location = { pathname: '/my-account' };

      const { container } = createPageComponent({
        savedFlightsPage: {
          numberOfSavedFlights: 0,
          savedFlights: []
        }
      });

      fireEvent.click(container.querySelector('button[data-qa="book-a-trip-btn"]'));

      expect(pushMock).toHaveBeenCalledWith('/air/booking/shopping?cleanFlow=true');
    });

    it('should push user to shopping if user clicks check price button a saved flight within the new route flow', () => {
      BrowserObject.location = { pathname: '/myaccount' };

      const { container } = createPageComponent({
        savedFlightsPage: {
          savedFlights: [new ChapiSavedFlightBuilder().build()]
        }
      });

      fireEvent.click(container.querySelector('button.button--grey'));

      expect(resetAirBookingFlowDataFnMock).toHaveBeenCalled();
      expect(searchForFlightsFnMock).toHaveBeenCalledWith({
        nextPagePath: '/air/booking/select-depart.html',
        searchRequest: {
          currencyType: 'USD',
          departureDate: '2015-04-07',
          destination: 'DAL',
          numberOfAdults: 1,
          origin: 'HOU',
          promoCode: '',
          returnDate: null,
          tripType: 'oneWay'
        }
      });
    });

    it('should push user to shopping if user clicks check price button a saved flight within the old route flow', () => {
      BrowserObject.location = { pathname: '/my-account' };

      const { container } = createPageComponent({
        savedFlightsPage: {
          savedFlights: [new ChapiSavedFlightBuilder().build()]
        }
      });

      fireEvent.click(container.querySelector('button.button--grey'));

      expect(resetAirBookingFlowDataFnMock).toHaveBeenCalled();
      expect(searchForFlightsFnMock).toHaveBeenCalledWith({
        nextPagePath: '/air/booking/shopping/adult/outbound/results',
        searchRequest: {
          currencyType: 'USD',
          departureDate: '2015-04-07',
          destination: 'DAL',
          numberOfAdults: 1,
          origin: 'HOU',
          promoCode: '',
          returnDate: null,
          tripType: 'oneWay'
        }
      });
    });

    it('should play error popup if CHAPI sends checkPriceMessage and user clicks check price button', () => {
      const { container } = createPageComponent({
        savedFlightsPage: {
          savedFlights: [new ChapiSavedFlightBuilder().withCheckPriceMessage().build()]
        }
      });

      fireEvent.click(container.querySelector('button.button--grey'));

      expect(resetAirBookingFlowDataFnMock).not.toBeCalled();
      expect(searchForFlightsFnMock).not.toBeCalled();
      expect(showDialogFnMock).toBeCalled();
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
      clearSavedFlightsFn: clearSavedFlightsFnMock,
      getSavedFlightsFn: getSavedFlightsFnMock,
      hideDialogFn: () => {},
      push: pushMock,
      resetAirBookingFlowDataFn: resetAirBookingFlowDataFnMock,
      retrieveBookingTeaserFn: retrieveBookingTeaserFnMock,
      savedFlightsPage: {
        numberOfSavedFlights: 1,
        savedFlights: [new ChapiSavedFlightBuilder().build()]
      },
      searchForFlightsFn: searchForFlightsFnMock,
      showDialogFn: showDialogFnMock
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {};

    return createComponent(SavedFlightsPage, { state, props: mergedProps });
  };
});
