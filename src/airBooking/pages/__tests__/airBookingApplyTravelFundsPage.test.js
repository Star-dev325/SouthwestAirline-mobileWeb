import React from 'react';
import { airBookingRoutes } from 'src/airBooking/constants/airBookingRoutes.js';
import { AirBookingApplyTravelFundsPage } from 'src/airBooking/pages/airBookingApplyTravelFundsPage';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import localStorage from 'store2';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import CalcFundsApiResponseBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/calcFundsApiResponseBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';
import * as AppSelector from 'src/shared/selectors/appSelector';

const { FUND_TYPES_FORMATTED } = TravelFundsConstants;
const DIALOG_CANCEL_BUTTON_INDEX = 0;
const DIALOG_OK_BUTTON_INDEX = 1;
const { index } = airBookingRoutes;

describe('AirBookingApplyTravelFundsPage', () => {
  let goBackMock;
  let pushMock;
  let calculateFundsFnMock;
  let removeFundFnMock;
  let updateSelectedApplyTabFnMock;
  let hideDialogFnMock;
  let refreshFundsFnMock;
  let resetCalculateFlowDataFnMock;
  let showDialogFnMock;
  let addHistoryBackToHomeFnMock;
  let fetchSavedCreditCardsFnMock;
  let resetAirBookingPurchaseDataFnMock;
  let clearAllApplyFormsFnMock;
  let saveLastSearchedFundFnMock;
  let setReLoginCallbackFunctionsFnMock;

  beforeEach(() => {
    pushMock = jest.fn();
    goBackMock = jest.fn();
    updateSelectedApplyTabFnMock = jest.fn();
    calculateFundsFnMock = jest.fn();
    removeFundFnMock = jest.fn();
    resetCalculateFlowDataFnMock = jest.fn();
    setReLoginCallbackFunctionsFnMock = jest.fn();
    showDialogFnMock = jest.fn();
    hideDialogFnMock = jest.fn(() => Promise.resolve());
    refreshFundsFnMock = jest.fn();
    resetAirBookingPurchaseDataFnMock = jest.fn();
    fetchSavedCreditCardsFnMock = jest.fn();
    addHistoryBackToHomeFnMock = jest.fn();
    saveLastSearchedFundFnMock = jest.fn();
    clearAllApplyFormsFnMock = jest.fn();

    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call the refresh endpoint on mount if there is not already a fundsAppliedToken present', () => {
    createPageComponent({ fundsAppliedToken: null });

    expect(refreshFundsFnMock).not.toBeCalled();
  });

  it('should call appropriate actions', () => {
    const instance = React.createRef();

    jest.spyOn(localStorage, 'get').mockReturnValue({ expirationDate: 'token' });

    createPageComponent({
      applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().build(),
      isLoggedIn: false,
      ref: instance
    });

    instance.current._removeTravelFund('ABC123');

    expect(resetCalculateFlowDataFnMock).toHaveBeenCalled();
  });

  describe('render', () => {
    it('should load Travel Funds form by default', () => {
      const { baseElement } = createPageComponent();

      expect(baseElement).toMatchSnapshot();
    });

    it('should call the refresh endpoint on mount if there is already a fundsAppliedToken present', () => {
      createPageComponent();

      expect(refreshFundsFnMock).toHaveBeenCalledWith(
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
        index?.canonicalPath,
        false
      );
    });
  });

  describe('any booking', () => {
    it('should push to airBooking review page when click continue', () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().build(),
        ref: instance
      });

      instance.current._returnToReviewPage();

      expect(clearAllApplyFormsFnMock).toHaveBeenCalled();
      expect(goBackMock).toHaveBeenCalled();
    });

    it('should trigger dialog when the cancel button is clicked and funds were looked up', () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().build(),
        isLoggedIn: false,
        ref: instance
      });

      instance.current._onClickCancelButton();

      expect(showDialogFnMock).toHaveBeenCalled();
    });

    it('should not trigger dialog when the cancel button is clicked and no funds have been looked up', () => {
      const instance = React.createRef();

      createPageComponent({ ref: instance });

      instance.current._onClickCancelButton();

      expect(showDialogFnMock).not.toHaveBeenCalled();
    });

    it('should not trigger dialog when the cancel button is clicked and only split payment fund is added', () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().withOneFundSplitPayResponse().build(),
        isLoggedIn: true,
        ref: instance
      });

      instance.current._onClickCancelButton();

      expect(showDialogFnMock).not.toHaveBeenCalled();
    });

    it('should close the dialog and remova all travel funds when user clicks Cancel dialog OK', async () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().withTwoFundSplitPayResponse().build(),
        isLoggedIn: true,
        ref: instance
      });

      instance.current._onClickCancelButton();

      await clickDialogButton(DIALOG_OK_BUTTON_INDEX);

      expect(hideDialogFnMock).toHaveBeenCalled();
      expect(removeFundFnMock).toHaveBeenCalledWith({
        method: 'PUT',
        href: '/v1/mobile-air-booking/page/calculate-funds',
        body: {
          removalTravelFundId: '0',
          removeAll: true,
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
      });
    });

    it('should close the dialog, clear results, and call goBack when user clicks OK on popup dialog', async () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().build(),
        isLoggedIn: false,
        ref: instance
      });

      instance.current._onClickCancelButton();

      await clickDialogButton(DIALOG_OK_BUTTON_INDEX);

      expect(clearAllApplyFormsFnMock).toHaveBeenCalled();
      expect(hideDialogFnMock).toHaveBeenCalled();
      expect(resetCalculateFlowDataFnMock).toHaveBeenCalled();
      expect(goBackMock).toHaveBeenCalled();
    });

    it('should close the dialog, not clear results, and not call goBack when user clicks Cancel on popup dialog', async () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().build(),
        isLoggedIn: false,
        ref: instance
      });

      instance.current._onClickCancelButton();

      await clickDialogButton(DIALOG_CANCEL_BUTTON_INDEX);

      expect(hideDialogFnMock).toHaveBeenCalled();
      expect(clearAllApplyFormsFnMock).not.toHaveBeenCalled();
      expect(resetCalculateFlowDataFnMock).not.toHaveBeenCalled();
      expect(goBackMock).not.toHaveBeenCalled();
    });

    it('should load correct form when a different fund selector is set', () => {
      const instance = React.createRef();

      createPageComponent({ ref: instance });

      instance.current._onSelectionChange('test');

      expect(updateSelectedApplyTabFnMock).toHaveBeenCalledWith('test');
    });
  });

  describe('dollars on guest booking', () => {
    it('should call the TRAVEL_FUNDS calculate endpoint without checking session when form is submitted', () => {
      const instance = React.createRef();
      const mockFormData = {
        confirmationNumber: 'ABC123',
        passengerFirstName: 'Hank',
        passengerLastName: 'Hill'
      };

      createPageComponent({
        isLoggedIn: false,
        ref: instance
      });

      instance.current._onSubmitRTFCalculate(mockFormData);

      expect(saveLastSearchedFundFnMock).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[0], mockFormData);
      expect(calculateFundsFnMock).toHaveBeenCalledWith(
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
        index?.canonicalPath,
        false
      );
    });

    it('should call the LUV_VOUCHER calculate endpoint when LUV Voucher form is submitted', () => {
      const instance = React.createRef();
      const mockFormData = {
        securityCode: '1234',
        voucherNumber: '1234567890123456'
      };

      createPageComponent({
        currentlySelectedTab: 'luv-voucher',
        isLoggedIn: false,
        ref: instance
      });

      instance.current._onSubmitVoucherCalculate(mockFormData);

      expect(saveLastSearchedFundFnMock).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[1], mockFormData);
      expect(calculateFundsFnMock).toHaveBeenCalledWith(
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
        index?.canonicalPath,
        false
      );
    });

    it('should call the GIFT_CARD calculate endpoint when Gift Card form is submitted', () => {
      const instance = React.createRef();
      const mockFormData = {
        cardNumber: '1234567890123456',
        securityCode: '1234'
      };

      createPageComponent({
        currentlySelectedTab: 'gift-card',
        isLoggedIn: false,
        ref: instance
      });

      instance.current._onSubmitCardCalculate(mockFormData);

      expect(saveLastSearchedFundFnMock).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[2], mockFormData);
      expect(calculateFundsFnMock).toHaveBeenCalledWith(
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
        index?.canonicalPath,
        false
      );
    });

    it('should clear the apply funds flow when the one and only fund displayed is individually removed', () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().build(),
        isLoggedIn: false,
        ref: instance
      });

      instance.current._removeTravelFund('ABC123');

      expect(resetCalculateFlowDataFnMock).toHaveBeenCalled();
    });

    it('should call the removal API when an individual fund is removed when there are multiple funds displayed', () => {
      const instance = React.createRef();

      createPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().withTwoFundResponse().build(),
        fundsAppliedToken: null,
        isLoggedIn: false,
        ref: instance
      });

      instance.current._removeTravelFund('2');

      expect(removeFundFnMock).toHaveBeenCalledWith(
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
        index?.canonicalPath,
        false
      );
    });
  });

  describe('points booking', () => {
    const createLoggedInPageComponent = (props) =>
      createPageComponent({
        isLoggedIn: true,
        priceTotal: new PriceTotalBuilder().withPointsTotal().build(),
        ...props
      });

    it('should clear the apply funds flow when the one and only fund displayed is individually removed', () => {
      const instance = React.createRef();

      createLoggedInPageComponent({
        applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().build(),
        ref: instance
      });

      instance.current._removeTravelFund('ABC123');

      expect(resetCalculateFlowDataFnMock).toHaveBeenCalled();
    });

    describe('session expiration', () => {
      it('should check for expired session when Travel Funds form is submitted', () => {
        const instance = React.createRef();
        const mockFormData = {
          confirmationNumber: 'ABC123',
          passengerFirstName: 'Hank',
          passengerLastName: 'Hill'
        };

        createLoggedInPageComponent({
          ref: instance
        });

        instance.current._onSubmitRTFCalculate(mockFormData);

        expect(calculateFundsFnMock).toHaveBeenCalledWith(
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
          index?.canonicalPath,
          true
        );
      });

      it('should check for expired session when LUV Voucher form is submitted', () => {
        const instance = React.createRef();
        const mockFormData = {
          voucherNumber: '1234567890123456',
          securityCode: '1234'
        };

        createLoggedInPageComponent({
          currentlySelectedTab: 'luv-voucher',
          ref: instance
        });

        instance.current._onSubmitVoucherCalculate(mockFormData);

        expect(calculateFundsFnMock).toHaveBeenCalledWith(
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
          index?.canonicalPath,
          true
        );
      });

      it('should check for expired session when Gift Card form is submitted', () => {
        const instance = React.createRef();
        const mockFormData = {
          cardNumber: '1234567890123456',
          securityCode: '1234'
        };

        createLoggedInPageComponent({
          currentlySelectedTab: 'gift-card',
          ref: instance
        });

        instance.current._onSubmitCardCalculate(mockFormData);

        expect(calculateFundsFnMock).toHaveBeenCalledWith(
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
          index?.canonicalPath,
          true
        );
      });

      it('should check for expired session when an individual fund is removed when there are multiple funds displayed', () => {
        const instance = React.createRef();

        createLoggedInPageComponent({
          applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().withTwoFundResponse().build(),
          fundsAppliedToken: null,
          ref: instance
        });

        instance.current._removeTravelFund('2');

        expect(removeFundFnMock).toHaveBeenCalledWith(
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
          index?.canonicalPath,
          true
        );
      });

      it('should check for expired session when attempting to refresh funds on pageload', () => {
        const instance = React.createRef();

        createLoggedInPageComponent({
          fundsAppliedToken: 'funds-token',
          ref: instance
        });

        expect(refreshFundsFnMock).toHaveBeenCalledWith(
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
          index?.canonicalPath,
          true
        );
      });

      it('should calculate funds after relogin', () => {
        const instance = React.createRef();
        const mockFormData = {
          confirmationNumber: 'ABC123',
          passengerFirstName: 'Hank',
          passengerLastName: 'Hill'
        };

        createLoggedInPageComponent({
          ref: instance
        });

        instance.current._onSubmitRTFCalculate(mockFormData);

        expect(calculateFundsFnMock).toHaveBeenCalled();
      });

      it('should remove fund after relogin', () => {
        const instance = React.createRef();

        createLoggedInPageComponent({
          applyTravelFundsPageResponse: new CalcFundsApiResponseBuilder().withTwoFundResponse().build(),
          ref: instance
        });

        instance.current._removeTravelFund('2');

        expect(removeFundFnMock).toHaveBeenCalledWith(
          {
            method: 'PUT',
            href: '/v1/mobile-air-booking/page/calculate-funds',
            body: {
              removalTravelFundId: '2',
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
          '/air/booking/',
          true
        );
      });

      it('should refresh funds after relogin', () => {
        createLoggedInPageComponent({});

        expect(refreshFundsFnMock).toBeCalledWith(
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
          index?.canonicalPath,
          true
        );
      });

      it('should reset flow and redirect to price page when continue as guest', () => {
        const instance = React.createRef();

        createLoggedInPageComponent({ ref: instance });
        instance.current._continueAsGuest();

        expect(resetAirBookingPurchaseDataFnMock).toBeCalled();
        expect(addHistoryBackToHomeFnMock).toBeCalledWith(true);
        expect(pushMock).toBeCalledWith('/air/booking/price.html');
      });
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      push: pushMock,
      goBack: goBackMock,
      calculateFundsFn: calculateFundsFnMock,
      removeFundFn: removeFundFnMock,
      refreshFundsFn: refreshFundsFnMock,
      updateSelectedApplyTabFn: updateSelectedApplyTabFnMock,
      resetCalculateFlowDataFn: resetCalculateFlowDataFnMock,
      showDialogFn: showDialogFnMock,
      hideDialogFn: hideDialogFnMock,
      currentlySelectedTab: 'travel-funds',
      fundsAppliedToken: 'funds-token',
      itineraryPricingToken: 'itinerary-token',
      applyTravelFundsPageResponse: null,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
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
      resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnMock,
      fetchSavedCreditCardsFn: fetchSavedCreditCardsFnMock,
      addHistoryBackToHomeFn: addHistoryBackToHomeFnMock,
      accountNumber: 'account-number',
      saveLastSearchedFundFn: saveLastSearchedFundFnMock,
      clearAllApplyFormsFn: clearAllApplyFormsFnMock
    };
    const mergedProps = { ...defaultProps, ...props };
    const state = {
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    };

    return createComponent(AirBookingApplyTravelFundsPage, { state, props: mergedProps });
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
