import i18n from '@swa-ui/locale';
import { cleanup, fireEvent } from '@testing-library/react';
import { airChangeRoutes } from 'src/airChange/constants/airChangeRoutes.js';
import { AirChangeApplyTravelFundsPage } from 'src/airChange/pages/airChangeApplyTravelFundsPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

const { APPLY_GIFT_CARD_FORM_ID, APPLY_LUV_VOUCHER_FORM_ID, APPLY_TRAVEL_FUNDS_FORM_ID, FUND_TYPES_FORMATTED } =
  TravelFundsConstants;

describe('AirChangeApplyTravelFundsPage', () => {
  const { viewReservationIndex } = airChangeRoutes;
  let calculateFundsFnStub, refreshFundsFnStub, removeFundFnStub, resetCalculateFlowDataFnStub;
  let clearAllApplyFormsFnStub, hideDialogFnStub, saveLastSearchedFundFnStub, showDialogFnStub;
  let goBackStub, page, pushStub, updateSelectedApplyTabFnStub;
  let goToAirChangePricingReviewFnStub, goToPricingFnStub;

  beforeEach(() => {
    calculateFundsFnStub = jest.fn();
    clearAllApplyFormsFnStub = jest.fn();
    goBackStub = jest.fn();
    goToAirChangePricingReviewFnStub = jest.fn().mockResolvedValueOnce(Promise.resolve());
    goToPricingFnStub = jest.fn().mockResolvedValueOnce(Promise.resolve());
    hideDialogFnStub = jest.fn().mockResolvedValueOnce(Promise.resolve());
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');
    pushStub = jest.fn();
    refreshFundsFnStub = jest.fn();
    removeFundFnStub = jest.fn();
    resetCalculateFlowDataFnStub = jest.fn();
    saveLastSearchedFundFnStub = jest.fn();
    showDialogFnStub = jest.fn();
    updateSelectedApplyTabFnStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not call the refresh endpoint on mount if there is not already a fundsAppliedToken present', () => {
    createPageComponent({ fundsAppliedToken: null });
    expect(refreshFundsFnStub).not.toHaveBeenCalled();
  });

  describe('render', () => {
    beforeEach(() => {
      page = createPageComponent();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should load Travel Funds form by default', () => {
      const { container } = page;

      expect(container.querySelector('.fund-type-selector').textContent).toContain('Flight Credit');
      expect(container.querySelector('[data-qa="travel-funds-selector"]').getAttribute('class')).toContain('active');
      expect(container.querySelector('.look-up-funds-form').getAttribute('name')).toEqual(APPLY_TRAVEL_FUNDS_FORM_ID);
    });

    it('should not show change travel fund info if not in the change travel funds flow', () => {
      const { container } = page;

      expect(container.querySelector('.change-travel-funds--totals')).toBeNull();
    });

    it('should call the refresh endpoint on mount if there is already a fundsAppliedToken present', () => {
      expect(refreshFundsFnStub).toHaveBeenCalledWith(
        {
          body: {
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token'
          },
          href: '/v1/mobile-air-booking/page/change/calculate-funds',
          method: 'POST'
        },
        viewReservationIndex?.canonicalPath,
        true
      );
    });

    it('should render the correct tab from redux', () => {
      const { container } = page;

      expect(container.querySelector('.look-up-funds-form').getAttribute('name')).toEqual(APPLY_TRAVEL_FUNDS_FORM_ID);
      expect(container.querySelector('[data-qa="travel-funds-selector"]').getAttribute('class')).toContain('active');

      const { container: containerGiftCard } = createPageComponent({ currentlySelectedTab: 'gift-card' });

      expect(containerGiftCard.querySelector('[data-qa="gift-card-selector"]').getAttribute('class')).toContain(
        'active'
      );
      expect(containerGiftCard.querySelector('.look-up-funds-form').getAttribute('name')).toEqual(
        APPLY_GIFT_CARD_FORM_ID
      );

      const { container: containerLuvVoucher } = createPageComponent({ currentlySelectedTab: 'luv-voucher' });

      expect(containerLuvVoucher.querySelector('[data-qa="luv-voucher-selector"]').getAttribute('class')).toContain(
        'active'
      );
      expect(containerLuvVoucher.querySelector('.look-up-funds-form').getAttribute('name')).toEqual(
        APPLY_LUV_VOUCHER_FORM_ID
      );
    });

    it('should render the special note on the luv-voucher tab', () => {
      const { container } = createPageComponent({ currentlySelectedTab: 'luv-voucher' });

      expect(container.querySelector('.look-up-funds-form--special-note')).not.toBeNull();
    });

    it('should not render the results list when there are no results saved in Redux', () => {
      const { container } = page;

      expect(container.querySelector('.apply-travel-funds--results')).toBeNull();
    });

    it('should render the results list with the results saved in Redux', () => {
      const { container } = createPageComponent({ applyTravelFundsPageResponse: oneFundResponse });

      expect(container.querySelectorAll('.fund-results-list--item')).toHaveLength(1);
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

    it('should render change details when in the change flow', () => {
      const { container } = createPageComponent({
        applyTravelFundsPageResponse: twoFundResponse,
        showChangeTFCalculations: true
      });

      expect(container.querySelector('.change-travel-funds--totals')).not.toBeNull();
    });
  });

  describe('air change apply funds flow', () => {
    const fundsAppliedToken = 'funds-token';
    const ignoreNavigationLogic = true;
    const isLoggedIn = true;
    const selectedProducts = {
      outbound: {
        fareProductId: 'fare product id',
        flightCardIndex: 1,
        flightProductType: 'NORMAL'
      }
    };

    beforeEach(() => {
      page = createPageComponent({ fundsAppliedToken });
    });

    describe('componentWillUnmount', () => {
      describe('and funds are applied', () => {
        it('should call goToPricing with default change link if the user is cancelling', async () => {
          const shouldResetCalculateFundsFlow = true;
          const changePricingPageLink = {
            href: '/some/href',
            method: 'POST',
            body: {
              fake: 'data',
              fundsAppliedToken: 'funds-token'
            }
          };

          page = createPageComponent({
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            applyTravelFundsPageResponse: mixedAutoAndManualFundsResponse,
            fundsAppliedToken
          });

          const { container } = page;

          fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

          const cancelConfirmationButton = showDialogFnStub.mock.calls[0][0].buttons.find(
            (obj) => obj.label === i18n('SHARED__BUTTON_TEXT__OK')
          );

          await cancelConfirmationButton.onClick();

          cleanup();

          expect(goToPricingFnStub).toHaveBeenCalledWith(
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            shouldResetCalculateFundsFlow,
            ignoreNavigationLogic
          );
        });

        it('should call goToPricing with change link and funds applied token if the user is applying', async () => {
          const shouldResetCalculateFundsFlow = false;
          const changePricingPageLink = {
            href: '/some/href',
            method: 'POST',
            body: {
              fake: 'data',
              fundsAppliedToken: 'funds-token'
            }
          };

          const { container } = createPageComponent({
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            applyTravelFundsPageResponse: mixedAutoAndManualFundsResponse,
            fundsAppliedToken
          });

          fireEvent.click(container.querySelector('button.apply-continue-button'));

          cleanup();

          expect(goToPricingFnStub).toHaveBeenCalledWith(
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            shouldResetCalculateFundsFlow,
            ignoreNavigationLogic
          );
        });

        it('should call goToPricing with default change link if the user removed the last fund then clicked cancel', async () => {
          const shouldResetCalculateFundsFlow = false;
          const changePricingPageLink = {
            href: '/some/href',
            method: 'POST',
            body: {
              fake: 'data',
              fundsAppliedToken: 'funds-token'
            }
          };

          const { container } = createPageComponent({
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            applyTravelFundsPageResponse: lastFundRemovedResponse,
            fundsAppliedToken
          });

          fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

          cleanup();

          expect(goToPricingFnStub).toHaveBeenCalledWith(
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            shouldResetCalculateFundsFlow,
            ignoreNavigationLogic
          );
        });
      });

      describe('upgrade flow', () => {
        it('should call goToAirChangePricingReviewFn with default change link if the user is cancelling', async () => {
          const shouldResetCalculateFundsFlow = true;
          const ignoreNavigationLogic = true;
          const changePricingPageLink = {
            href: '/some/href',
            method: 'POST',
            body: {
              fake: 'data'
            }
          };

          const { container } = createPageComponent({
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            isUpgrade: true,
            applyTravelFundsPageResponse: mixedAutoAndManualFundsResponse,
            fundsAppliedToken
          });

          fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

          const cancelConfirmationButton = showDialogFnStub.mock.calls[0][0].buttons.find(
            (obj) => obj.label === i18n('SHARED__BUTTON_TEXT__OK')
          );

          await cancelConfirmationButton.onClick();

          cleanup();

          expect(goToAirChangePricingReviewFnStub).toHaveBeenCalledWith(
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            shouldResetCalculateFundsFlow,
            ignoreNavigationLogic
          );
        });

        it('should call goToAirChangePricingReviewFn with change link and funds applied token if the user is applying', async () => {
          const shouldResetCalculateFundsFlow = false;
          const ignoreNavigationLogic = true;
          const changePricingPageLink = {
            href: '/some/href',
            method: 'POST',
            body: {
              fake: 'data',
              fundsAppliedToken: 'funds-token'
            }
          };

          const { container } = createPageComponent({
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            isUpgrade: true,
            applyTravelFundsPageResponse: mixedAutoAndManualFundsResponse,
            fundsAppliedToken
          });

          fireEvent.click(container.querySelector('button.apply-continue-button'));

          cleanup();

          expect(goToAirChangePricingReviewFnStub).toHaveBeenCalledWith(
            changePricingPageLink,
            selectedProducts,
            isLoggedIn,
            shouldResetCalculateFundsFlow,
            ignoreNavigationLogic
          );
        });
      });
    });

    it('should push to airchange review page when click continue', () => {
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

    it('should trigger dialog when the cancel button is clicked and mixed auto and manual funds are applied', () => {
      const { container } = createPageComponent({ applyTravelFundsPageResponse: mixedAutoAndManualFundsResponse });

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));
      expect(showDialogFnStub).toHaveBeenCalled();
    });

    it('should not trigger dialog when the cancel button is clicked and no funds have been looked up', () => {
      const { container } = page;

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));
      expect(showDialogFnStub).not.toHaveBeenCalled();
    });

    it('should not trigger dialog when the cancel button is clicked and only automatically applied funds are applied', () => {
      const { container } = createPageComponent({ applyTravelFundsPageResponse: automaticallyAppliedFundResponse });

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));
      expect(showDialogFnStub).not.toHaveBeenCalled();
    });

    it('should close the Are You Sure dialog, clear results, and call goBack when user clicks OK on cancel popup', async () => {
      const { container } = createPageComponent({
        isLoggedIn: false,
        applyTravelFundsPageResponse: oneFundResponse
      });

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

      const cancelConfirmationButton = showDialogFnStub.mock.calls[0][0].buttons.find(
        (obj) => obj.label === i18n('SHARED__BUTTON_TEXT__OK')
      );

      await cancelConfirmationButton.onClick();

      expect(hideDialogFnStub).toHaveBeenCalled();
      expect(goBackStub).toHaveBeenCalled();
    });

    it('should close the Are You Sure dialog, clear results, and call goBack when user clicks OK on cancel popup with mixed auto and manual funds', async () => {
      const { container } = createPageComponent({
        isLoggedIn: false,
        applyTravelFundsPageResponse: mixedAutoAndManualFundsResponse
      });

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

      const cancelConfirmationButton = showDialogFnStub.mock.calls[0][0].buttons.find(
        (obj) => obj.label === i18n('SHARED__BUTTON_TEXT__OK')
      );

      await cancelConfirmationButton.onClick();

      expect(hideDialogFnStub).toHaveBeenCalled();
      expect(goBackStub).toHaveBeenCalled();
    });

    it('should close the dialog, not clear results, and not call goBack when user clicks Cancel on popup dialog', async () => {
      const { container } = createPageComponent({ isLoggedIn: false, applyTravelFundsPageResponse: oneFundResponse });

      fireEvent.click(container.querySelector('.action-bar--right-buttons button'));

      const cancelCancelButton = showDialogFnStub.mock.calls[0][0].buttons.find(
        (obj) => obj.label === i18n('SHARED__BUTTON_TEXT__CANCEL')
      );

      await cancelCancelButton.onClick();

      expect(hideDialogFnStub).toHaveBeenCalled();

      expect(clearAllApplyFormsFnStub).not.toHaveBeenCalled();
      expect(resetCalculateFlowDataFnStub).not.toHaveBeenCalled();
      expect(goBackStub).not.toHaveBeenCalled();
    });

    it('should load correct form when a different fund selector is set', () => {
      const { container } = page;

      fireEvent.click(container.querySelector('[data-qa="travel-funds-selector"]'));
      expect(updateSelectedApplyTabFnStub).toHaveBeenCalledWith('travel-funds');
      fireEvent.click(container.querySelector('[data-qa="gift-card-selector"]'));
      expect(updateSelectedApplyTabFnStub).toHaveBeenCalledWith('gift-card');
      fireEvent.click(container.querySelector('[data-qa="luv-voucher-selector"]'));
      expect(updateSelectedApplyTabFnStub).toHaveBeenCalledWith('luv-voucher');
    });

    it('should not change forms or active selector when active selector is clicked', () => {
      const { container } = page;

      expect(container.querySelector('.look-up-funds-form').getAttribute('name')).toEqual(APPLY_TRAVEL_FUNDS_FORM_ID);
      expect(container.querySelector('[data-qa="travel-funds-selector"]').getAttribute('class')).toContain('active');
      fireEvent.click(container.querySelector('[data-qa="travel-funds-selector"]'));
      expect(container.querySelector('[data-qa="travel-funds-selector"]').getAttribute('class')).toContain('active');
      expect(container.querySelector('.look-up-funds-form').getAttribute('name')).toEqual(APPLY_TRAVEL_FUNDS_FORM_ID);
    });

    it('should call the TRAVEL_FUNDS calculate endpoint when Travel Funds form is submitted', () => {
      const { container } = page;

      const confirmationNumberInput = container.querySelector('[name="confirmationNumber"]');
      const passengerFirstNameInput = container.querySelector('[name="passengerFirstName"]');
      const passengerLastNameInput = container.querySelector('[name="passengerLastName"]');

      fireEvent.change(confirmationNumberInput, { target: { value: 'ABC123' } });
      fireEvent.change(passengerFirstNameInput, { target: { value: 'Hank' } });
      fireEvent.change(passengerLastNameInput, { target: { value: 'Hill' } });

      fireEvent.click(container.querySelector('[type="submit"]'));
      expect(calculateFundsFnStub).toHaveBeenCalledWith(
        {
          href: '/v1/mobile-air-booking/page/change/calculate-funds/TRAVEL_FUNDS',
          method: 'POST',
          body: {
            travelFundIdentifier: 'ABC123',
            fundsAppliedToken: 'funds-token',
            firstName: 'Hank',
            lastName: 'Hill',
            itineraryPricingToken: 'itinerary-token'
          }
        },
        viewReservationIndex?.canonicalPath,
        true
      );

      expect(saveLastSearchedFundFnStub).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[0], {
        confirmationNumber: 'ABC123',
        passengerFirstName: 'Hank',
        passengerLastName: 'Hill'
      });
    });

    it('should call the LUV_VOUCHER calculate endpoint when LUV Voucher form is submitted', () => {
      const { container } = createPageComponent({ currentlySelectedTab: 'luv-voucher' });
      const securityCodeInput = container.querySelector('[name="securityCode"]');
      const voucherNumberInput = container.querySelector('[name="voucherNumber"]');

      fireEvent.change(voucherNumberInput, { target: { value: '1234567890123456' } });
      fireEvent.change(securityCodeInput, { target: { value: '1234' } });
      fireEvent.click(container.querySelector('[type="submit"]'));

      expect(calculateFundsFnStub).toHaveBeenCalledWith(
        {
          href: '/v1/mobile-air-booking/page/change/calculate-funds/LUV_VOUCHER',
          method: 'POST',
          body: {
            travelFundIdentifier: '1234567890123456',
            securityCode: '1234',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token'
          }
        },
        viewReservationIndex?.canonicalPath,
        true
      );

      expect(saveLastSearchedFundFnStub).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[1], {
        voucherNumber: '1234567890123456',
        securityCode: '1234'
      });
    });
    it('should call the GIFT_CARD calculate endpoint when Gift Card form is submitted', () => {
      const { container } = createPageComponent({ currentlySelectedTab: 'gift-card' });
      const cardNumberInput = container.querySelector('[name="cardNumber"]');
      const securityCodeInput = container.querySelector('[name="securityCode"]');

      fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
      fireEvent.change(securityCodeInput, { target: { value: '1234' } });
      fireEvent.click(container.querySelector('[type="submit"]'));

      expect(calculateFundsFnStub).toHaveBeenCalledWith(
        {
          href: '/v1/mobile-air-booking/page/change/calculate-funds/GIFT_CARD',
          method: 'POST',
          body: {
            travelFundIdentifier: '1234567890123456',
            securityCode: '1234',
            fundsAppliedToken: 'funds-token',
            itineraryPricingToken: 'itinerary-token'
          }
        },
        viewReservationIndex?.canonicalPath,
        true
      );

      expect(saveLastSearchedFundFnStub).toHaveBeenCalledWith(FUND_TYPES_FORMATTED[2], {
        cardNumber: '1234567890123456',
        securityCode: '1234'
      });
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
          href: '/v1/mobile-air-booking/page/change/calculate-funds',
          body: {
            removalTravelFundId: '2',
            fundsAppliedToken: null,
            itineraryPricingToken: 'itinerary-token'
          }
        },
        viewReservationIndex?.canonicalPath,
        true
      );
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      applyTravelFundsPageResponse: null,
      balanceRemaining: new PriceTotalBuilder().build().totals.moneyTotal,
      calculateFundsFn: calculateFundsFnStub,
      changePricingPageLink: {},
      clearAllApplyFormsFn: clearAllApplyFormsFnStub,
      currentlySelectedTab: 'travel-funds',
      fundsAppliedToken: 'funds-token',
      goBack: goBackStub,
      goToAirChangePricingReviewFn: goToAirChangePricingReviewFnStub,
      goToPricingFn: goToPricingFnStub,
      hideDialogFn: hideDialogFnStub,
      isLoggedIn: true,
      isUpgrade: false,
      itineraryPricingToken: 'itinerary-token',
      push: pushStub,
      refreshFundsFn: refreshFundsFnStub,
      removeFundFn: removeFundFnStub,
      resetCalculateFlowDataFn: resetCalculateFlowDataFnStub,
      saveLastSearchedFundFn: saveLastSearchedFundFnStub,
      selectedProducts: {},
      showChangeTFCalculations: false,
      showDialogFn: showDialogFnStub,
      updateSelectedApplyTabFn: updateSelectedApplyTabFnStub
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

    return createComponent(AirChangeApplyTravelFundsPage, { state, props: mergedProps });
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
        _links: {
          removeTravelFund: {}
        }
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
  const automaticallyAppliedFundResponse = {
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
  const mixedAutoAndManualFundsResponse = {
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
      },
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
          removeTravelFund: {}
        }
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
  const lastFundRemovedResponse = {
    travelFunds: [],
    balanceRemaining: null,
    totalFunds: null,
    totals: null,
    fundsAppliedToken: null
  };
});
