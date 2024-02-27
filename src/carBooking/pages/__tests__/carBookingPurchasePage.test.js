import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CarBookingPurchasePage } from 'src/carBooking/pages/carBookingPurchasePage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingPurchasePage', () => {
  let reserveCarFnStub;
  let showNativeAppLoginFnStub;
  let pushStub;

  beforeEach(() => {
    reserveCarFnStub = jest.fn();
    showNativeAppLoginFnStub = jest.fn();
    pushStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should pass the right props to carPurchaseForm component when user is logged in ', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should pass the right props to carPurchaseForm component when user is not logged in ', () => {
      const { container } = createComponent({ isUserLoggedIn: false, driverInfo: null });
      
      expect(container.getElementsByClassName('[name="CAR_BOOKING_SEARCH_FORM"]')).not.toBeNull();
    });
  });

  describe('submit', () => {
    it('should call the reserverCarFn when the form is submitted with correct data', () => {
      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      expect(reserveCarFnStub).toHaveBeenCalled();
    });

    it('should call the pushStub when the DriveInfo Field is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('[data-qa="passenger-info-summary--passenger-name"]'));

      expect(pushStub).toHaveBeenCalled();
    });

    it('should not call the reserverCarFn action when the form is submitted with correct data', () => {
      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      expect(reserveCarFnStub).toHaveBeenCalled();
    });
  });

  describe('log in for faster checkout', () => {
    it('should not appear when the user is logged in', () => {
      const { container } = createComponent({ isUserLoggedIn: true });

      expect(container.querySelector('[data-qa="loginBanner"]')).toBeNull();
    });

    it('should not appear when the user is not in a web view', () => {
      const { container } = createComponent({ isWebView: false });

      expect(container.querySelector('[data-qa="loginBanner"]')).toBeNull();
    });

    it('should appear when the user is in a web view and not logged in', () => {
      const { container } = createComponent({ isUserLoggedIn: false, isWebView: true });
      
      expect(container.querySelector('[data-qa="loginBanner"]')).not.toBeNull();
    });

    it('should invoke the showNativeAppLoginFn when clicked', () => {
      const { container } = createComponent({ isUserLoggedIn: false, isWebView: true });

      fireEvent.click(container.querySelector('[data-qa="loginBanner"]'));
      expect(showNativeAppLoginFnStub).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const driverInfo = { firstName: 'Alex', lastName: 'Fisher' };
    const contactInfo = {
      confirmationEmail: 'test@test.com',
      driverPhoneNumber: '812-926-1966',
      driverCountryCode: '1',
      driverIsoCountryCode: 'US'
    };
    const selectedCarResult = {
      imageUrl: '/some/url/image',
      vendorName: 'Hertz',
      productId: 'product-id',
      isRapidRewardsPartner: true,
      isUnavailable: false,
      pricePerDayCents: 10199,
      promoCodeApplied: false,
      totalCentsWithTaxes: 15299,
      dailyRateWithCurrencyCode: {
        amount: '101.99',
        currencyCode: 'USD'
      },
      totalWithTaxesAndCurrencyCode: {
        amount: '152.99',
        currencyCode: 'USD'
      }
    };
    const defaultProps = {
      driverInfo,
      contactInfo,
      totalPrice: 200,
      reserveCarFn: reserveCarFnStub,
      showNativeAppLoginFn: showNativeAppLoginFnStub,
      isUserLoggedIn: true,
      isWebView: false,
      selectedCarResult,
      selectedExtras: [],
      push: pushStub,
      totalWithTaxesAndCurrencyCode: {
        amount: '152.99',
        currencyCode: 'USD'
      }
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <BrowserRouter>
        <Provider store={createMockedFormStore()}>
          <CarBookingPurchasePage {...newProps} />
        </Provider>
      </BrowserRouter>
    );
  };
});
