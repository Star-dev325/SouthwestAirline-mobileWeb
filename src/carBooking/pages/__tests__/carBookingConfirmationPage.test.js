import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CarBookingConfirmationPage } from 'src/carBooking/pages/carBookingConfirmationPage';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingConfirmationPage', () => {
  let pushStub;
  let enableNavigationControlsFnStub;
  let displayAppReviewStub;

  beforeEach(() => {
    pushStub = jest.fn();
    enableNavigationControlsFnStub = jest.fn();
    displayAppReviewStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component did mount', () => {
    it('should not call enableNavigationControlsFnStub or displayAppReviewStub when not in web view state', () => {
      const { container } = createComponent({ isWebView: false });

      expect(container).toMatchSnapshot();
    });

    it('should call enableNavigationControlsFnStub and displayAppReviewStub when in web view state', () => {
      const { container } = createComponent({ isWebView: true });

      expect(container).toMatchSnapshot();
    });
  });

  describe('render', () => {
    it('should render page header', () => {
      const { container } = createComponent();

      expect(container.querySelector('.page-header').textContent).toEqual(
        i18n('CAR_BOOKING__PURCHASE_CONFIRMATION__HEADER')
      );
    });

    it('should render container', () => {
      const { container } = createComponent();

      expect(container.querySelector('.label-container--label').textContent).toEqual(
        i18n('CAR_BOOKING__CAR_RESERVATION__PICK_UP')
      );
    });

    it('should render car booking driver card with confirmation number', () => {
      const { container } = createComponent();

      expect(container.querySelector('.mx4 car-booking-driver-card')).toMatchSnapshot();
    });

    it('should render car booking total price', () => {
      const { container } = createComponent();

      expect(container.querySelector('.carbooking-total-price price-total')).toMatchSnapshot();
    });

    it('should render car booking confirmation footer', () => {
      const { container } = createComponent();

      expect(container.querySelector('.confirm-footer mt6')).toMatchSnapshot();
    });
  });

  describe('webview', () => {
    it('should render DONE button', () => {
      const { container } = createComponent({ isWebView: true });

      expect(container.querySelector('.page-header--right-button')).toMatchSnapshot();
    });

    it('should navigate to home page when user clicks DONE button', () => {
      const { container } = createComponent({ isWebView: true });

      fireEvent.click(container.querySelector('.page-header--right-button'));

      expect(pushStub).toHaveBeenCalledWith('/');
    });
  });

  const createComponent = (extraProps = {}) => {
    const defaultProps = {
      carReservation: new CarReservationBuilder().build(),
      bookingResponse: {
        confirmationNumber: 'AJC129876234',
        driver: {
          firstName: 'Amy',
          lastName: 'Awesome'
        }
      },
      history: {
        push: pushStub
      },
      enableNavigationControlsFn: enableNavigationControlsFnStub,
      displayAppReviewFn: displayAppReviewStub
    };

    const newProps = {
      ...defaultProps,
      ...extraProps
    };
   
    return render(
      <BrowserRouter>
        <Provider store={createMockedFormStore()}>
          <CarBookingConfirmationPage {...newProps} />
        </Provider>
      </BrowserRouter>
    );
  };
});
