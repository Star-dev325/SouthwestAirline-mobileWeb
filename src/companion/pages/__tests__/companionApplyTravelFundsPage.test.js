import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { TRAVEL_FUNDS } from 'src/companion/constants/companionConstants';
import { CompanionApplyTravelFundsPage } from 'src/companion/pages/companionApplyTravelFundsPage';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const { FUND_TYPES_FORMATTED } = TravelFundsConstants;

describe('CompanionApplyTravelFundsPage', () => {
  const { TOKEN_EXPIRED_COMPANION_URL } = TRAVEL_FUNDS;
  let goBackStub;
  let pushStub;
  let updateSelectedApplyTabFnStub;
  let calculateFundsFnStub;
  let refreshFundsFnStub;
  let removeFundFnStub;
  let resetCalculateFlowDataFnStub;
  let clearAllApplyFormsFnStub;
  let hideDialogFnStub;
  let saveLastSearchedFundFnStub;
  let showDialogFnStub;

  beforeEach(() => {
    pushStub = jest.fn();
    goBackStub = jest.fn();
    updateSelectedApplyTabFnStub = jest.fn();
    calculateFundsFnStub = jest.fn();
    removeFundFnStub = jest.fn();
    resetCalculateFlowDataFnStub = jest.fn();
    showDialogFnStub = jest.fn();
    hideDialogFnStub = jest.fn().mockResolvedValueOnce('promise');
    refreshFundsFnStub = jest.fn();
    saveLastSearchedFundFnStub = jest.fn();
    clearAllApplyFormsFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call the refresh endpoint on mount if there is not already a fundsAppliedToken present', () => {
    createPageComponent({ fundsAppliedToken: null });
    expect(refreshFundsFnStub).not.toBeCalled();
  });

  describe('render', () => {
    it('should render', () => {
      const { container } = createPageComponent();

      expect(container).toMatchSnapshot();
    });

    it('should call the refresh endpoint on mount if there is already a fundsAppliedToken present', () => {
      createPageComponent();

      expect(refreshFundsFnStub).toBeCalledWith(
        {
          body: {
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                },
                passengerReference: 1,
                passengerType: 'ADULT'
              }
            ]
          },
          href: '/v1/mobile-air-booking/page/calculate-funds',
          method: 'POST'
        },
        TOKEN_EXPIRED_COMPANION_URL,
        true
      );
    });

    it('should render the travel funds tab from redux', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('[data-qa="travel-funds-selector"]')).not.toBeNull();
    });

    it('should render the gift card tab from redux', () => {
      const { container } = createPageComponent({ currentlySelectedTab: 'gift-card' });

      expect(container.querySelector('[data-qa="gift-card-selector"]')).not.toBeNull();
    });

    it('should render the correct tab from redux', () => {
      const { container } = createPageComponent({ currentlySelectedTab: 'luv-voucher' });

      expect(container.querySelector('[data-qa="luv-voucher-selector"]')).not.toBeNull();
    });

    it('should render the special note on the luv-voucher tab', () => {
      const { container } = createPageComponent({ currentlySelectedTab: 'luv-voucher' });

      expect(container.querySelector('.look-up-funds-form--special-note')).not.toBeNull();
    });

    it('should not render the results list when there are no results saved in Redux', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('.apply-travel-funds--results')).toBeNull();
    });

    it('should render the results list with the results saved in Redux', () => {
      const { container } = createPageComponent({ applyTravelFundsPageResponse: oneFundResponse });

      expect(container.querySelector('.fund-results-list--item')).not.toBeNull();
    });

    it('should not render the ledger and continue button on page load', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('.apply-travel-funds--footer')).toBeNull();
      expect(container.querySelector('.purchase-content--summary-footer-nav')).toBeNull();
    });

    it('should render the ledger and continue button when funds have been looked up', () => {
      const { container } = createPageComponent({ applyTravelFundsPageResponse: twoFundResponse });

      expect(container.querySelector('.apply-travel-funds--footer')).not.toBeNull();
      expect(container.querySelector('.purchase-content--summary-footer-nav')).not.toBeNull();
    });
  });

  describe('booking', () => {
    it('should push to companion purchase page when click continue', () => {
      const { container } = createPageComponent({ applyTravelFundsPageResponse: oneFundResponse });

      fireEvent.click(container.querySelector('button.apply-continue-button'));

      expect(clearAllApplyFormsFnStub).toHaveBeenCalled();
      expect(goBackStub).toHaveBeenCalled();
    });

    it('should trigger dialog when the cancel button is clicked and funds were looked up', () => {
      const { container } = createPageComponent({ isLoggedIn: false, applyTravelFundsPageResponse: oneFundResponse });

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

      expect(showDialogFnStub).toHaveBeenCalled();
    });

    it('should not trigger dialog when the cancel button is clicked and no funds have been looked up', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

      expect(showDialogFnStub).not.toBeCalled();
    });

    it('should close the dialog, clear results, and call goBack when user clicks OK on popup dialog', async () => {
      const instance = React.createRef();

      createPageComponent({ isLoggedIn: false, applyTravelFundsPageResponse: oneFundResponse, ref: instance });

      instance.current._onClickCancelButton();
      await clickDialogButton(1);

      expect(hideDialogFnStub).toHaveBeenCalled();

      expect(resetCalculateFlowDataFnStub).toHaveBeenCalled();

      expect(goBackStub).toHaveBeenCalled();

      expect(clearAllApplyFormsFnStub).toHaveBeenCalled();
    });

    it('should close the dialog, not clear results, and not call goBack when user clicks Cancel on popup dialog', async () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: oneFundResponse,
        isLoggedIn: false,
        ref: instance
      });

      instance.current._onClickCancelButton();

      await clickDialogButton(0);

      expect(hideDialogFnStub).toHaveBeenCalled();
      expect(clearAllApplyFormsFnStub).not.toBeCalled();
      expect(resetCalculateFlowDataFnStub).not.toBeCalled();
      expect(goBackStub).not.toBeCalled();
    });

    it('should load correct form when a different fund selector is set travel-funds', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('[data-qa="travel-funds-selector"]'));

      expect(updateSelectedApplyTabFnStub).toHaveBeenCalledWith('travel-funds');
    });

    it('should load correct form when a different fund selector is set gift-card', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('[data-qa="gift-card-selector"]'));

      expect(updateSelectedApplyTabFnStub).toHaveBeenCalledWith('gift-card');
    });

    it('should load correct form when a different fund selector is set luv-voucher', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('[data-qa="luv-voucher-selector"]'));

      expect(updateSelectedApplyTabFnStub).toHaveBeenCalledWith('luv-voucher');
    });

    it('should not change forms or active selector when active selector is clicked', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('[data-qa="travel-funds-selector"]')).not.toBeNull();

      fireEvent.click(container.querySelector('[data-qa="travel-funds-selector"]'));

      expect(container.querySelector('[data-qa="travel-funds-selector"]')).not.toBeNull();
    });

    it('should call the TRAVEL_FUNDS calculate endpoint when Travel Funds form is submitted', () => {
      const instance = React.createRef();

      createPageComponent({ ref: instance });

      const mockFormData = {
        confirmationNumber: 'ABC123',
        passengerFirstName: 'Hank',
        passengerLastName: 'Hill'
      };

      instance.current._onSubmitRTFCalculate(mockFormData);

      expect(calculateFundsFnStub).toHaveBeenCalledWith(
        {
          href: '/v1/mobile-air-booking/page/calculate-funds/TRAVEL_FUNDS',
          method: 'POST',
          body: {
            travelFundIdentifier: 'ABC123',
            fundsAppliedToken: 'funds-token',
            firstName: 'Hank',
            lastName: 'Hill',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        },
        TOKEN_EXPIRED_COMPANION_URL,
        true
      );

      expect(saveLastSearchedFundFnStub).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[0], {
        confirmationNumber: 'ABC123',
        passengerFirstName: 'Hank',
        passengerLastName: 'Hill'
      });
    });

    it('should call the LUV_VOUCHER calculate endpoint when LUV Voucher form is submitted', () => {
      const instance = React.createRef();

      createPageComponent({ currentlySelectedTab: 'luv-voucher', ref: instance });

      const mockFormData = {
        voucherNumber: '1234567890123456',
        securityCode: '1234'
      };

      instance.current._onSubmitVoucherCalculate(mockFormData);

      expect(calculateFundsFnStub).toHaveBeenCalledWith(
        {
          href: '/v1/mobile-air-booking/page/calculate-funds/LUV_VOUCHER',
          method: 'POST',
          body: {
            travelFundIdentifier: '1234567890123456',
            securityCode: '1234',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        },
        TOKEN_EXPIRED_COMPANION_URL,
        true
      );

      expect(saveLastSearchedFundFnStub).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[1], {
        voucherNumber: '1234567890123456',
        securityCode: '1234'
      });
    });

    it('should call the GIFT_CARD calculate endpoint when Gift Card form is submitted', () => {
      const instance = React.createRef();

      createPageComponent({ currentlySelectedTab: 'gift-card', ref: instance });

      const mockFormData = {
        cardNumber: '1234567890123456',
        securityCode: '1234'
      };

      instance.current._onSubmitCardCalculate(mockFormData);

      expect(calculateFundsFnStub).toHaveBeenCalledWith(
        {
          href: '/v1/mobile-air-booking/page/calculate-funds/GIFT_CARD',
          method: 'POST',
          body: {
            travelFundIdentifier: '1234567890123456',
            securityCode: '1234',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        },
        TOKEN_EXPIRED_COMPANION_URL,
        true
      );

      expect(saveLastSearchedFundFnStub).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[2], {
        cardNumber: '1234567890123456',
        securityCode: '1234'
      });
    });

    it('should clear the apply funds flow when the one and only fund displayed is individually removed', () => {
      const { container } = createPageComponent({ isLoggedIn: false, applyTravelFundsPageResponse: oneFundResponse });

      fireEvent.click(container.querySelector('.icon_remove'));

      expect(resetCalculateFlowDataFnStub).toHaveBeenCalled();
    });

    it('should call the removal API when an individual fund is removed when there are multiple funds displayed', () => {
      const { container } = createPageComponent({
        fundsAppliedToken: null,
        applyTravelFundsPageResponse: twoFundResponse
      });

      fireEvent.click(container.querySelectorAll('.icon_remove')[1]);

      expect(removeFundFnStub).toHaveBeenCalledWith(
        {
          method: 'PUT',
          href: '/v1/mobile-air-booking/page/calculate-funds',
          body: {
            removalTravelFundId: '2',
            fundsAppliedToken: null,
            itineraryPricingToken: 'itinerary-token',
            passengers: [
              {
                accountNumber: '1234567890',
                dateOfBirth: '1954-4-19',
                gender: 'M',
                passengerReference: 1,
                passengerType: 'ADULT',
                name: {
                  firstName: 'Hank',
                  lastName: 'Hill',
                  middleName: null,
                  suffix: null
                }
              }
            ]
          }
        },
        TOKEN_EXPIRED_COMPANION_URL,
        true
      );
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      push: pushStub,
      goBack: goBackStub,
      calculateFundsFn: calculateFundsFnStub,
      removeFundFn: removeFundFnStub,
      refreshFundsFn: refreshFundsFnStub,
      updateSelectedApplyTabFn: updateSelectedApplyTabFnStub,
      resetCalculateFlowDataFn: resetCalculateFlowDataFnStub,
      showDialogFn: showDialogFnStub,
      hideDialogFn: hideDialogFnStub,
      currentlySelectedTab: 'travel-funds',
      fundsAppliedToken: 'funds-token',
      itineraryPricingToken: 'itinerary-token',
      applyTravelFundsPageResponse: null,
      passengerInfos: [
        {
          type: 'adult',
          passengerReference: 1,
          passengerInfo: {
            firstName: 'Hank',
            lastName: 'Hill',
            gender: 'M',
            dateOfBirth: '1954-4-19',
            rapidRewardsNumber: '1234567890'
          }
        }
      ],
      isLoggedIn: true,
      priceTotal: new PriceTotalBuilder().build(),
      balanceRemaining: new PriceTotalBuilder().build(),
      saveLastSearchedFundFn: saveLastSearchedFundFnStub,
      clearAllApplyFormsFn: clearAllApplyFormsFnStub
    };

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <CompanionApplyTravelFundsPage {...mergedProps} />
      </Provider>
    );
  };

  const twoFundResponse = {
    travelFunds: [
      {
        expirationDate: '2020-2-20',
        travelFundType: 'TRAVEL_FUNDS',
        displayName: 'Hank Hill',
        fundIdentifier: 'ABC123',
        errorMessage: null,
        appliedAmount: {
          amount: '408.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        remainingAmount: {
          amount: '30.70',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        _links: {
          removeTravelFund: {
            body: {
              removalTravelFundId: '1'
            },
            href: '/fake/path',
            method: 'PUT'
          }
        }
      },
      {
        expirationDate: '2021-1-10',
        travelFundType: 'TRAVEL_FUNDS',
        displayName: 'Hank Hill',
        fundIdentifier: '123ABC',
        errorMessage: null,
        appliedAmount: {
          amount: '123.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        remainingAmount: {
          amount: '67.89',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        _links: {
          removeTravelFund: {
            body: {
              removalTravelFundId: '2'
            },
            href: '/fake/path',
            method: 'PUT'
          }
        }
      }
    ],
    balanceRemaining: {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totalFunds: {
      amount: '408.98',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totals: {
      moneyTotal: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsTotal: null
    },
    fundsAppliedToken: 'funds-token'
  };
  const oneFundResponse = {
    travelFunds: [
      {
        expirationDate: '2020-2-20',
        travelFundType: 'TRAVEL_FUNDS',
        displayName: 'Hank Hill',
        fundIdentifier: 'ABC123',
        errorMessage: null,
        appliedAmount: {
          amount: '408.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        remainingAmount: {
          amount: '30.70',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        _links: null
      }
    ],
    balanceRemaining: {
      amount: '408.98',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totalFunds: {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    totals: {
      moneyTotal: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsTotal: null
    },
    fundsAppliedToken: 'funds-token'
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnStub.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
