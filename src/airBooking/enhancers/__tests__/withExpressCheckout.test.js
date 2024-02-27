jest.mock('src/shared/helpers/webViewHelper', () => ({
  isWebViewLogin: jest.fn()
}));

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import withExpressCheckout from 'src/airBooking/enhancers/withExpressCheckout';
import { LOGIN_STATES } from 'src/shared/constants/webViewConstants';
import { isWebViewLogin } from 'src/shared/helpers/webViewHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

const { NATIVE_LOG_OUT, NATIVE_LOG_IN } = LOGIN_STATES;

describe('withExpressCheckout', () => {
  let fetchSavedCreditCardsAndPassengerInfoFnMock;
  let removeFrequentTravelerSelectedByPaxNumberFnMock;
  let mockComponent;

  beforeEach(() => {
    mockComponent = jest.fn().mockReturnValue(<div data-testid="mock" />);
    fetchSavedCreditCardsAndPassengerInfoFnMock = jest.fn();
    removeFrequentTravelerSelectedByPaxNumberFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('user logged in', () => {
    it('should not render child component by default', () => {
      createComponent(mockComponent);

      expect(screen.queryByTestId('mock')).not.toBeInTheDocument();
    });

    it('should call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn with isInternationalFlight and passengerPageUrl when accountInfo and passenger info empty', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
      const props = { isEligibleForExpressCheckout: true };

      createComponent(mockComponent, props);
      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).toHaveBeenCalledWith(
        true,
        '/air/booking/passenger/0',
        1,
        false,
        true
      );
    });

    it('should call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn with isInternationalFlight, passengerPageUrl and passenger number when accountInfo and passenger info empty', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
      const props = {
        isEligibleForExpressCheckout: true,
        searchRequest: {
          numberOfAdults: 2
        }
      };

      createComponent(mockComponent, props);
      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).toHaveBeenCalledWith(
        true,
        '/air/booking/passenger/0',
        2,
        false,
        true
      );
    });

    it('should call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn with numberOfLapInfants being undefined', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
      const props = {
        isEligibleForExpressCheckout: true,
        searchRequest: {
          numberOfAdults: 2,
          numberOfLapInfants: undefined
        }
      };

      createComponent(mockComponent, props);
      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).toHaveBeenCalledWith(
        true,
        '/air/booking/passenger/0',
        2,
        false,
        true
      );
    });

    it('should call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn with numberOfLapInfants being greater than 0', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
      const props = {
        isEligibleForExpressCheckout: true,
        searchRequest: {
          numberOfAdults: 2,
          numberOfLapInfants: 2
        }
      };

      createComponent(mockComponent, props);
      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).toHaveBeenCalledWith(
        true,
        '/air/booking/passenger/0',
        4,
        false,
        true
      );
    });

    it('should not call removeFrequentTravelerSelectedByPaxNumberFn', () => {
      createComponent(mockComponent);

      expect(removeFrequentTravelerSelectedByPaxNumberFnMock).not.toHaveBeenCalled();
    });

    it('should call removeFrequentTravelerSelectedByPaxNumberFn', () => {
      createComponent(mockComponent, {
        selectedFrequentTravelers: [
          {
            addFrequentTravelerToggle: false,
            frequentTravelerId: 'ACCOUNT',
            paxNumber: 0
          }
        ]
      });

      expect(removeFrequentTravelerSelectedByPaxNumberFnMock).toHaveBeenCalledWith(0);
    });

    describe('not express checkout', () => {
      it('should pass props to sub component', () => {
        const mockProps = { mockPropsData: 'mockPropsData', isEligibleForExpressCheckout: false };

        createComponent(mockComponent, mockProps);

        expect(mockComponent.mock.calls[0][0].mockPropsData).toEqual('mockPropsData');
      });
    });
  });

  describe('user not logged in', () => {
    it('should render child component by default', () => {
      createComponent(mockComponent, { isLoggedIn: false });

      expect(screen.queryByTestId('mock')).toBeInTheDocument();
    });
  });

  describe('componentDidUpdate', () => {
    it('should call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn when web view login and isEligibleForExpressCheckout', () => {
      const props = {
        isLoggedIn: false,
        isEligibleForExpressCheckout: true,
        isWebView: true,
        webViewLoginStatus: NATIVE_LOG_IN
      };

      isWebViewLogin.mockImplementationOnce(() => true);

      createComponent(mockComponent, props);

      expect(isWebViewLogin).toHaveBeenCalled();
      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).toHaveBeenCalled();
    });

    it('should not call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn when not isEligibleForExpressCheckout', () => {
      const props = {
        isLoggedIn: false,
        isEligibleForExpressCheckout: false,
        isWebView: true,
        webViewLoginStatus: NATIVE_LOG_IN
      };

      isWebViewLogin.mockImplementationOnce(() => true);

      createComponent(mockComponent, props);

      expect(isWebViewLogin).toHaveBeenCalled();
      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).not.toHaveBeenCalled();
    });

    it('should not call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn when not web view login', () => {
      const props = {
        isEligibleForExpressCheckout: true,
        isWebView: false,
        webViewLoginStatus: NATIVE_LOG_OUT,
        isLoggedIn: false
      };

      isWebViewLogin.mockImplementationOnce(() => false);

      createComponent(mockComponent, props);

      expect(isWebViewLogin).toHaveBeenCalled();
      expect(fetchSavedCreditCardsAndPassengerInfoFnMock).not.toHaveBeenCalled();
    });
  });

  const createComponent = (mockComponent, props) => {
    const defaultProps = {
      searchRequest: {
        numberOfAdults: 1
      },
      params: {
        paxNumber: 0
      },
      isLoggedIn: true,
      isInternationalBooking: true,
      isEligibleForExpressCheckout: true,
      selectedFrequentTravelers: [],
      isWebView: false,
      webViewLoginStatus: NATIVE_LOG_OUT,
      shouldShowChaseInstantCreditCard: true,
      isExpressCheckoutFromPassengerPage: false,
      fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn: fetchSavedCreditCardsAndPassengerInfoFnMock,
      removeFrequentTravelerSelectedByPaxNumberFn: removeFrequentTravelerSelectedByPaxNumberFnMock
    };

    const WithExpressCheckoutComponent = withExpressCheckout(mockComponent);

    return render(<WithExpressCheckoutComponent {..._.merge({}, defaultProps, props)} />);
  };
});
