import * as AppSelector from 'src/shared/selectors/appSelector';
import _ from 'lodash';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import waitFor from 'test/unit/helpers/waitFor';
import { Provider } from 'react-redux';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import chaseBannerConfigBuilder from 'test/builders/model/chaseBannerConfigBuilder';
import { PricingSummaryPage } from 'src/airBooking/pages/pricingSummaryPage';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import localStorage from 'store2';
import { LOGIN_TYPES } from 'src/shared/constants/webViewConstants';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import ChaseAndPromoBannerContent from 'test/builders/apiResponse/v1/content-delivery/query/placements';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { getMultipleAdultPassengersWithInputDOBFormat } from 'test/builders/model/passengerInfosBuilder';

const { EXTERNAL_TARGETS } = SharedConstants;

describe('Pricing Summary', () => {
  const searchRequest = {
    tripType: 'oneWay',
    isRoundTrip: false,
    departureDate: '2001-10-11',
    numberOfAdults: 1,
    numberOfLapInfants: 0,
    currencyType: 'USD'
  };
  const passengerInfos = getMultipleAdultPassengersWithInputDOBFormat();
  const frequentTravelerList = [
    { frequentTravelerId: 'abcd1', frequentTravelerToken: 'fwsdasd' },
    { frequentTravelerId: 'xyz', frequentTravelerToken: '2ddadxs' }
  ];
  const defaultFlightProducts = new PricesBuilder().build().flightPricingPage;
  const { CHASE } = EXTERNAL_TARGETS;
  let fetchSavedCreditCardsAndPassengerInfoFnStub;
  let fetchSavedCCsAndPassengerInfoWithExpressCheckOutFnStub;
  let generatePassengerPageInfoFnStub;
  let getProductListFnStub;
  let gotoFirstPassengerPageFnStub;
  let handleFirmOfferOfCreditFnStub;
  let loadPricePagePlacementsFnStub;
  let persistAppStateFnStub;
  let pushStub;
  let getChaseApplicationStatusFnStub;
  let resetAirBookingPurchaseDataFnStub;
  let resetContactMethodFnStub;
  let resumeAfterLoginFnStub;
  let resumeAppStateFnStub;
  let setChaseBannerShownFnStub;
  let setWebViewDeepLinkContinueFnStub;
  let setReLoginCallbackFunctionsFnStub;
  let shouldResumeAppStateFnStub;
  let getAccountInfoFnStub;
  let hideDialogFnStub, showDialogFnStub;
  let showNativeAppLoginFnStub;
  let updateFlightSearchRequestAndSyncToFormDataFnStub;
  let cleanUpFrequentTravelerSelectedFnStub;
  let removeFrequentTravelerSelectedByPaxNumberFnStub;
  let clearFormDataByIdFnStub;
  let deleteUserInfoStub;

  beforeEach(() => {
    fetchSavedCreditCardsAndPassengerInfoFnStub = jest.fn();
    fetchSavedCCsAndPassengerInfoWithExpressCheckOutFnStub = jest.fn(() => Promise.resolve());
    generatePassengerPageInfoFnStub = jest.fn();
    getProductListFnStub = jest.fn();
    gotoFirstPassengerPageFnStub = jest.fn();
    handleFirmOfferOfCreditFnStub = jest.fn();
    hideDialogFnStub = jest.fn(() => Promise.resolve());
    loadPricePagePlacementsFnStub = jest.fn();
    persistAppStateFnStub = jest.fn();
    pushStub = jest.fn();
    getChaseApplicationStatusFnStub = jest.fn();
    resetAirBookingPurchaseDataFnStub = jest.fn();
    resetContactMethodFnStub = jest.fn();
    resumeAfterLoginFnStub = jest.fn();
    resumeAppStateFnStub = jest.fn(() => Promise.resolve());
    setChaseBannerShownFnStub = jest.fn();
    setWebViewDeepLinkContinueFnStub = jest.fn();
    setReLoginCallbackFunctionsFnStub = jest.fn();
    shouldResumeAppStateFnStub = jest.fn();
    getAccountInfoFnStub = jest.fn();
    showDialogFnStub = jest.fn();
    showNativeAppLoginFnStub = jest.fn();
    updateFlightSearchRequestAndSyncToFormDataFnStub = jest.fn();
    cleanUpFrequentTravelerSelectedFnStub = jest.fn();
    removeFrequentTravelerSelectedByPaxNumberFnStub = jest.fn();
    clearFormDataByIdFnStub = jest.fn();
    deleteUserInfoStub = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should render price summary page', () => {
    it('should render passenger price', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="passenger-price-passengers--number-and-type"]')).toBeInTheDocument();
    });
  });

  describe('should handle placements', () => {
    const shouldShallow = true;

    it('and not render promoBottom01 if it does not exist', () => {
      const { container } = createComponent({ promoBannerConfig: {} });

      expect(container.querySelector('[data-qa="promoBottom01"]')).not.toBeInTheDocument();
    });

    it('and render promoBottom01 if it exists', () => {
      const promoBottom01 = new ChaseAndPromoBannerContent().getContentOf('promoBottom01');

      const { container } = createComponent({ promoBannerConfig: { promoBottom01 } });

      expect(container.querySelector('.pricing-summary--promos')).toBeInTheDocument();
      expect(container.querySelector('.pricing-summary--promos')).toMatchSnapshot();
    });

    it('and not render promoBottom02 if it does not exist', () => {
      const { container } = createComponent({ promoBannerConfig: {} });

      expect(container.querySelector('[data-qa="promoBottom02"]')).not.toBeInTheDocument();
    });

    it('and render promoBottom02 if it exists', () => {
      const promoBottom02 = new ChaseAndPromoBannerContent().getContentOf('promoBottom02');

      const { container } = createComponent({ promoBannerConfig: { promoBottom02 } }, shouldShallow);

      expect(container.querySelector('.pricing-summary--promos')).toBeInTheDocument();
      expect(container.querySelector('.pricing-summary--promos')).toMatchSnapshot();
    });
  });

  describe('when clicking the continue button', () => {
    let updatedGivenFlightProducts;

    beforeEach(() => {
      updatedGivenFlightProducts = new PricesBuilder()
        .withMoneyTotal({
          amount: '50',
          currencyCode: 'USD'
        })
        .build().flightPricingPage;
    });

    describe('when user is logged in', () => {
      describe('when isEligibleForExpressCheckout true', () => {
        it('should go to passenger page and not fetch user info when user relogin', () => {
          const { container } = createComponent({
            flightPricingPage: {
              response: {
                flightPricingPage: updatedGivenFlightProducts
              }
            },
            searchRequest,
            isLoggedIn: true,
            isEligibleForExpressCheckout: true
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(generatePassengerPageInfoFnStub).toHaveBeenCalledWith({ searchRequest });
          expect(fetchSavedCreditCardsAndPassengerInfoFnStub).not.toHaveBeenCalled();
        });

        it('should call resumeAfterLoginFn, when _handleResumeAfterLogin triggers', () => {
          const instance = React.createRef();

          createComponent({
            flightPricingPage: {
              resumeAfterLogin: true
            },
            searchRequest,
            isLoggedIn: true,
            ref: instance
          });

          instance.current._handleResumeAfterLogin();
          expect(resumeAfterLoginFnStub).toHaveBeenCalledWith(false);
        });

        it('should call resumeAfterLoginFn, when resumeAppStateFnStub triggers', () => {
          const instance = React.createRef();

          createComponent({
            flightPricingPage: {
              resumeAfterLogin: true
            },
            searchRequest,
            isLoggedIn: true,
            ref: instance
          });

          instance.current._resumeFromChaseApplication();
          expect(resumeAppStateFnStub).toHaveBeenCalled();
        });

        it('should pass shouldCheckSessionWarm as false', () => {
          const { container } = createComponent({
            flightPricingPage: {
              response: {
                flightPricingPage: updatedGivenFlightProducts
              }
            },
            searchRequest,
            isLoggedIn: true,
            isEligibleForExpressCheckout: true
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(gotoFirstPassengerPageFnStub).not.toHaveBeenCalled();
        });

        it('should call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn', () => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
          const { container } = createComponent({
            searchRequest,
            isLoggedIn: true,
            isEligibleForExpressCheckout: true
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(generatePassengerPageInfoFnStub).toHaveBeenCalledWith({ searchRequest });
          expect(fetchSavedCCsAndPassengerInfoWithExpressCheckOutFnStub).toHaveBeenCalledWith(
            true,
            '/air/booking/passenger/0',
            1,
            false,
            false
          );
        });

        it('should call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn with numberOfLapInfants being undefined', () => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
          const searchRequestData = {
            tripType: 'oneWay',
            isRoundTrip: false,
            departureDate: '2001-10-11',
            numberOfAdults: 1,
            numberOfLapInfants: undefined,
            currencyType: 'USD'
          };
          const { container } = createComponent({
            searchRequestData,
            isLoggedIn: true,
            isEligibleForExpressCheckout: true
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(generatePassengerPageInfoFnStub).toHaveBeenCalledWith({ searchRequest });
          expect(fetchSavedCCsAndPassengerInfoWithExpressCheckOutFnStub).toHaveBeenCalledWith(
            true,
            '/air/booking/passenger/0',
            1,
            false,
            false
          );
        });

        it('should call gotoFirstPassengerPage and syncSelectedFrequentTravelers when fetchPassengerPageInfo is called', (done) => {
          const instance = React.createRef();

          createComponent({
            isLoggedIn: true,
            isEligibleForExpressCheckout: true,
            ref: instance
          });
          const syncSelectedFrequentTravelersStub = jest.spyOn(instance.current, 'syncSelectedFrequentTravelers');
          const gotoFirstPassengerPageStub = jest.spyOn(instance.current, '_goToFirstPassengerPage');

          instance.current._fetchPassengerPageInfo();

          waitFor.untilAssertPass(() => {
            expect(syncSelectedFrequentTravelersStub).toHaveBeenCalled();
            expect(gotoFirstPassengerPageStub).toHaveBeenCalled();
          }, done);
        });

        it('should call removeFrequentTravelerSelectedByPaxNumberFn', () => {
          const { container } = createComponent({
            searchRequest,
            selectedFrequentTravelers: [
              {
                addFrequentTravelerToggle: false,
                frequentTravelerId: 'ACCOUNT',
                paxNumber: 0
              }
            ],
            isLoggedIn: true,
            isEligibleForExpressCheckout: true
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(removeFrequentTravelerSelectedByPaxNumberFnStub).toHaveBeenCalledWith(0);
        });

        it('should not call removeFrequentTravelerSelectedByPaxNumberFn', () => {
          const { container } = createComponent({
            searchRequest,
            isLoggedIn: true,
            isEligibleForExpressCheckout: true
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(removeFrequentTravelerSelectedByPaxNumberFnStub).not.toHaveBeenCalled();
        });
      });

      describe('when isEligibleForExpressCheckout false', () => {
        it('should continue to passenger page', () => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
          const { container } = createComponent({
            isLoggedIn: true
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(gotoFirstPassengerPageFnStub).toHaveBeenCalledWith({
            searchRequest,
            path: '/air/booking/passenger/0'
          });
        });

        it('should not call fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn', () => {
          const { container } = createComponent({
            searchRequest,
            isLoggedIn: true,
            isEligibleForExpressCheckout: false
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(generatePassengerPageInfoFnStub).not.toHaveBeenCalled();
          expect(fetchSavedCCsAndPassengerInfoWithExpressCheckOutFnStub).not.toHaveBeenCalled();
        });

        it('should call gotoFirstPassengerPage on continue button', () => {
          const instance = React.createRef();

          createComponent({
            isLoggedIn: true,
            isEligibleForExpressCheckout: false,
            ref: instance
          });

          const gotoFirstPassengerPageStub = jest.spyOn(instance.current, '_goToFirstPassengerPage');

          instance.current._continue();

          expect(gotoFirstPassengerPageStub).toHaveBeenCalled();
        });

        it('should call gotoFirstPassengerPageFn if gotoFirstPassengerPage is called', () => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
          const instance = React.createRef();

          createComponent({
            isLoggedIn: true,
            isEligibleForExpressCheckout: false,
            ref: instance
          });

          instance.current._goToFirstPassengerPage();

          expect(gotoFirstPassengerPageFnStub).toHaveBeenCalledWith({
            searchRequest,
            path: '/air/booking/passenger/0'
          });
        });

        it('should call clearFormDataByIdFnStub and removeFrequentTravelerSelectedByPaxNumberFnStub when frequent traveler is deleted from the list', () => {
          const instance = React.createRef();

          createComponent({
            isLoggedIn: true,
            isEligibleForExpressCheckout: false,
            selectedFrequentTravelers: [
              { frequentTravelerId: 'abcd', paxNumber: 1 },
              { frequentTravelerId: 'xyz', paxNumber: 2 }
            ],
            ref: instance
          });

          instance.current.syncSelectedFrequentTravelers();

          expect(clearFormDataByIdFnStub).toHaveBeenCalledWith('AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM_ADULT_1');
          expect(removeFrequentTravelerSelectedByPaxNumberFnStub).toHaveBeenCalledWith(1);
        });

        it('should not call clearFormDataByIdFnStub and removeFrequentTravelerSelectedByPaxNumberFnStub when frequent traveler is present in the list', () => {
          const instance = React.createRef();

          createComponent({
            isLoggedIn: true,
            isEligibleForExpressCheckout: false,
            selectedFrequentTravelers: [
              { frequentTravelerId: 'abcd1', paxNumber: 1 },
              { frequentTravelerId: 'xyz', paxNumber: 2 }
            ],
            ref: instance
          });

          instance.current.syncSelectedFrequentTravelers();

          expect(clearFormDataByIdFnStub).not.toHaveBeenCalled();
          expect(removeFrequentTravelerSelectedByPaxNumberFnStub).not.toHaveBeenCalled();
        });

        it('should pass loginType as `PURCHASE` when not points booking', () => {
          const instance = React.createRef();

          createComponent({
            flightPricingPage: {
              response: {
                flightPricingPage: updatedGivenFlightProducts
              }
            },
            searchRequest,
            isLoggedIn: true,
            isEligibleForExpressCheckout: false,
            ref: instance
          });

          instance.current._continueAsGuest();

          expect(gotoFirstPassengerPageFnStub).toHaveBeenCalled();
        });

        it('should pass loginType as `POINTS` when is points booking', () => {
          const { flightPricingPage } = new PricesBuilder()
            .withPointsTotal({
              amount: '10000',
              currencyCode: POINTS
            })
            .build();
          const { container } = createComponent({
            flightPricingPage: {
              response: {
                flightPricingPage
              }
            },
            searchRequest,
            isLoggedIn: true,
            isEligibleForExpressCheckout: false
          });

          fireEvent.click(container.querySelector('.continue.button'));

          expect(gotoFirstPassengerPageFnStub).not.toHaveBeenCalled();
        });
      });

      describe('when points booking', () => {
        describe('when enough points', () => {
          describe('when isEligibleForExpressCheckout true', () => {
            it('should fetchPassengerPageInfo on continue button with points', () => {
              const instance = React.createRef();

              createComponent({
                isLoggedIn: true,
                isEligibleForExpressCheckout: true,
                ref: instance
              });
              const fetchPassengerPageInfoStub = jest.spyOn(instance.current, '_fetchPassengerPageInfo');

              instance.current._handleContinueForPointsBooking();

              expect(fetchPassengerPageInfoStub).toHaveBeenCalled();
            });
          });

          describe('when isEligibleForExpressCheckout false', () => {
            it('should call gotoFirstPassengerPage on continue button with points', () => {
              const instance = React.createRef();

              createComponent({
                isLoggedIn: true,
                isEligibleForExpressCheckout: false,
                ref: instance
              });
              const gotoFirstPassengerPageStub = jest.spyOn(instance.current, '_goToFirstPassengerPage');

              instance.current._handleContinueForPointsBooking();

              expect(gotoFirstPassengerPageStub).toHaveBeenCalled();
            });
          });
        });

        describe('when not enough points', () => {
          it('should show the `not enough points` dialog', () => {
            const updatedGivenFlightProductsPoints = new PricesBuilder()
              .withPointsTotal({
                amount: '10000000',
                currencyCode: POINTS
              })
              .build().flightPricingPage;
            const { container } = createComponent({
              flightPricingPage: {
                response: {
                  flightPricingPage: updatedGivenFlightProductsPoints
                }
              },
              searchRequest,
              isLoggedIn: true
            });

            fireEvent.click(container.querySelector('.continue.button'));

            expect(showDialogFnStub).toHaveBeenCalled();
          });

          it('get updated account info when dialog is closed', async () => {
            const updatedGivenFlightProductsPoints = new PricesBuilder()
              .withPointsTotal({
                amount: '10000000',
                currencyCode: POINTS
              })
              .build().flightPricingPage;
            const { container } = createComponent({
              flightPricingPage: {
                response: {
                  flightPricingPage: updatedGivenFlightProductsPoints
                }
              },
              searchRequest,
              isLoggedIn: true
            });

            fireEvent.click(container.querySelector('.continue.button'));

            const closeFn = showDialogFnStub.mock.calls[0][0].onClose;

            await closeFn();

            expect(hideDialogFnStub).toHaveBeenCalled();
            expect(getAccountInfoFnStub).toHaveBeenCalled();
          });

          describe('when selecting', () => {
            const sharedRequestFormDataSync = {
              departureDate: '2001-10-11',
              isRoundTrip: false,
              numberOfAdults: 1,
              numberOfLapInfants: 0,
              tripType: 'oneWay'
            };

            describe('`With Dollars` button', () => {
              it('should get the latest dollar results, hide dialog, update search results, and go to results page', async () => {
                jest.spyOn(AppSelector, 'getCurrentAppFlow')
                  .mockReturnValueOnce('air/booking');
                const expectedRequestFormDataSync = {
                  ...sharedRequestFormDataSync,
                  currencyType: DOLLAR
                };
                const updatedGivenFlightProductsPoints = new PricesBuilder()
                  .withPointsTotal({
                    amount: '10000000',
                    currencyCode: POINTS
                  })
                  .build().flightPricingPage;
                const { container } = createComponent({
                  flightPricingPage: {
                    response: {
                      flightPricingPage: updatedGivenFlightProductsPoints
                    }
                  },
                  searchRequest,
                  isLoggedIn: true
                });

                fireEvent.click(container.querySelector('.continue.button'));

                const continueWithDollarsFunc = showDialogFnStub.mock.calls[0][0].verticalLinks.links[1].onClick;

                await continueWithDollarsFunc();

                expect(getProductListFnStub).toHaveBeenCalled();
                expect(hideDialogFnStub).toHaveBeenCalled();
                expect(updateFlightSearchRequestAndSyncToFormDataFnStub).toHaveBeenCalledWith(
                  expectedRequestFormDataSync
                );
                expect(pushStub).toHaveBeenCalledWith('/air/booking/select-depart.html');
                expect(getAccountInfoFnStub).toHaveBeenCalled();
              });
            });

            describe('when selecting `With Points` button', () => {
              describe(`when ${POINTS} is currencyType`, () => {
                it('should get the latest dollar results, hide dialog, update search results, and go to results page', async () => {
                  jest.spyOn(AppSelector, 'getCurrentAppFlow')
                    .mockReturnValueOnce('air/booking');
                  const expectedRequestFormDataSync = {
                    ...sharedRequestFormDataSync,
                    currencyType: POINTS
                  };
                  const updatedSearchRequest = {
                    ...searchRequest,
                    currencyType: POINTS
                  };
                  const updatedGivenFlightProductsPoints = new PricesBuilder()
                    .withPointsTotal({
                      amount: '10000000',
                      currencyCode: POINTS
                    })
                    .build().flightPricingPage;
                  const { container } = createComponent({
                    flightPricingPage: {
                      response: {
                        flightPricingPage: updatedGivenFlightProductsPoints
                      }
                    },
                    searchRequest: updatedSearchRequest,
                    isLoggedIn: true
                  });

                  fireEvent.click(container.querySelector('.continue.button'));

                  const continueWithPointsFunc = showDialogFnStub.mock.calls[0][0].verticalLinks.links[0].onClick;

                  await continueWithPointsFunc();

                  expect(getProductListFnStub).not.toHaveBeenCalled();
                  expect(hideDialogFnStub).toHaveBeenCalled();
                  expect(updateFlightSearchRequestAndSyncToFormDataFnStub).toHaveBeenCalledWith(
                    expectedRequestFormDataSync
                  );
                  expect(pushStub).toHaveBeenCalledWith('/air/booking/select-depart.html');
                  expect(getAccountInfoFnStub).toHaveBeenCalled();
                  expect(deleteUserInfoStub).not.toHaveBeenCalled();
                });
              });

              describe(`when ${DOLLAR} is currencyType`, () => {
                it('should get the latest dollar results, hide dialog, update search results, and go to results page', async () => {
                  jest.spyOn(AppSelector, 'getCurrentAppFlow')
                    .mockReturnValueOnce('air/booking');
                  const expectedRequestFormDataSync = {
                    ...sharedRequestFormDataSync,
                    currencyType: POINTS
                  };
                  const updatedGivenFlightProductsPoints = new PricesBuilder()
                    .withPointsTotal({
                      amount: '10000000',
                      currencyCode: POINTS
                    })
                    .build().flightPricingPage;
                  const { container } = createComponent({
                    flightPricingPage: {
                      response: {
                        flightPricingPage: updatedGivenFlightProductsPoints
                      }
                    },
                    searchRequest,
                    isLoggedIn: true
                  });

                  fireEvent.click(container.querySelector('.continue.button'));

                  const continueWithPointsFunc = showDialogFnStub.mock.calls[0][0].verticalLinks.links[0].onClick;

                  await continueWithPointsFunc();

                  expect(getProductListFnStub).toHaveBeenCalled();
                  expect(hideDialogFnStub).toHaveBeenCalled();
                  expect(updateFlightSearchRequestAndSyncToFormDataFnStub).toHaveBeenCalledWith(
                    expectedRequestFormDataSync
                  );
                  expect(pushStub).toHaveBeenCalledWith('/air/booking/select-depart.html');
                  expect(getAccountInfoFnStub).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });

    describe('when user is not logged in', () => {
      it('should continue to passenger page', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
        const { container } = createComponent({
          flightPricingPage: {
            response: {
              flightPricingPage: updatedGivenFlightProducts
            }
          },
          searchRequest,
          isLoggedIn: false
        });

        fireEvent.click(container.querySelector('.continue.button'));

        expect(gotoFirstPassengerPageFnStub).toHaveBeenCalledWith({
          chaseCardHolder: {
            accountNumber: '',
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName'
          },
          searchRequest,
          path: '/air/booking/passenger/0'
        });
      });

      it('should continue to passenger page if guest', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
        const { container } = createComponent({
          flightPricingPage: {
            response: {
              flightPricingPage: updatedGivenFlightProducts
            }
          },
          searchRequest,
          isLoggedIn: false
        });

        fireEvent.click(container.querySelector('.continue.button'));

        expect(gotoFirstPassengerPageFnStub).toHaveBeenCalledWith({
          chaseCardHolder: {
            accountNumber: '',
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName'
          },
          searchRequest,
          path: '/air/booking/passenger/0'
        });
      });

      it('should clear passenger info, payment info, credit cards when continue as guest from session expired journey', () => {
        const instance = React.createRef();

        createComponent({
          flightPricingPage: {
            response: {
              flightPricingPage: updatedGivenFlightProducts
            }
          },
          searchRequest,
          isLoggedIn: false,
          resetAirBookingPurchaseDataFn: resetAirBookingPurchaseDataFnStub,
          ref: instance
        });

        instance.current._continueAsGuest();

        expect(resetAirBookingPurchaseDataFnStub).toHaveBeenCalled();
      });

      it('should stay in current page when continue as guest from session expired journey with points booking', () => {
        updatedGivenFlightProducts = new PricesBuilder()
          .withPointsTotal({
            amount: '10000',
            currencyCode: POINTS
          })
          .build().flightPricingPage;

        const instance = React.createRef();

        createComponent({
          flightPricingPage: {
            response: {
              flightPricingPage: updatedGivenFlightProducts
            }
          },
          searchRequest,
          isLoggedIn: false,
          ref: instance
        });

        instance.current._continueAsGuest();

        expect(gotoFirstPassengerPageFnStub).not.toHaveBeenCalled();
        expect(pushStub).not.toHaveBeenCalled();
      });

      it('should dispatch showNativeAppLoginFn when not logged in and in a webview', () => {
        updatedGivenFlightProducts = new PricesBuilder()
          .withPointsTotal({
            amount: '10000',
            currencyCode: POINTS
          })
          .build().flightPricingPage;
        const { container } = createComponent({
          flightPricingPage: {
            response: {
              flightPricingPage: updatedGivenFlightProducts
            }
          },
          searchRequest,
          isLoggedIn: false,
          isWebView: true
        });

        fireEvent.click(container.querySelector('.continue.button'));

        expect(gotoFirstPassengerPageFnStub).not.toHaveBeenCalled();
        expect(showNativeAppLoginFnStub).toHaveBeenCalledWith({ loginType: LOGIN_TYPES.POINTS });
        expect(resumeAfterLoginFnStub).toHaveBeenCalledWith(true);
      });

      it('should go to passenger page and fetch user info', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
        const { container } = createComponent({
          isLoggedIn: false
        });

        fireEvent.click(container.querySelector('.continue.button'));

        expect(gotoFirstPassengerPageFnStub).toHaveBeenCalledWith({
          chaseCardHolder: {
            accountNumber: '',
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName'
          },
          searchRequest,
          path: '/air/booking/passenger/0'
        });
      });

      it('should call gotoFirstPassengerPageFn if gotoFirstPassengerPage is called', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
        const instance = React.createRef();

        createComponent({ isEligibleForExpressCheckout: true, ref: instance });

        instance.current._goToFirstPassengerPage();

        expect(gotoFirstPassengerPageFnStub).toHaveBeenCalledWith({
          chaseCardHolder: {
            accountNumber: '',
            firstName: 'firstName',
            lastName: 'lastName',
            middleName: 'middleName'
          },
          searchRequest,
          path: '/air/booking/passenger/0'
        });
      });
    });
  });

  describe('chase', () => {
    describe('load chase banner config', () => {
      it('should load chase banner config when shouldShowChasePlacement true', () => {
        createComponent({ shouldShowChasePlacement: true });

        expect(loadPricePagePlacementsFnStub).toHaveBeenCalledWith(true);
      });

      it('should load chase banner config when shouldShowChasePlacement false', () => {
        createComponent({ shouldShowChasePlacement: false });

        expect(loadPricePagePlacementsFnStub).toHaveBeenCalledWith(false);
      });
    });

    describe('show chase banner', () => {
      it('should not show chase banner when chaseBannerConfig empty', () => {
        const { container } = createComponent();

        expect(container.querySelector('[data-qa="chase"]')).not.toBeInTheDocument();
        expect(setChaseBannerShownFnStub).not.toHaveBeenCalled();
      });

      it('should not show chase banner when shouldShowChasePlacement is false', () => {
        const chaseBannerConfig = new chaseBannerConfigBuilder().build();
        const { container } = createComponent({ chaseBannerConfig, shouldShowChasePlacement: false });

        expect(container.querySelector('[data-qa="chase"]')).not.toBeInTheDocument();
        expect(setChaseBannerShownFnStub).not.toHaveBeenCalled();
      });
    });

    describe('click chase banner button', () => {
      it('should be saved in local storage on learn more button click', () => {
        const instance = React.createRef();
        const saveChaseInstantCreditReturnUrlStub = jest.spyOn(LocalStorageCache, 'saveChaseInstantCreditReturnUrl');
        const chaseBannerConfig = new chaseBannerConfigBuilder().build();

        createComponent({ shouldShowChasePlacement: true, chaseBannerConfig, ref: instance });

        instance.current._onChaseButtonClick();

        expect(saveChaseInstantCreditReturnUrlStub).toHaveBeenCalledWith('/pricingSummary');
        expect(persistAppStateFnStub).toHaveBeenCalledWith(CHASE);
      });
    });
  });

  describe('when using API gateway cookies', () => {
    it('should continue to passenger page if guest', (done) => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
      jest.spyOn(localStorage, 'get').mockReturnValue({ expirationDate: 'token' });
      const { container } = createComponent({
        isLoggedIn: true,
        isEligibleForExpressCheckout: true
      });

      fireEvent.click(container.querySelector('.continue.button'));

      waitFor.untilAssertPass(() => {
        expect(gotoFirstPassengerPageFnStub).toHaveBeenCalledWith({
          searchRequest,
          path: '/air/booking/passenger/0'
        });
      }, done);
    });
  });

  const createComponent = (props = {}) => {
    const priceTotal = new PriceTotalBuilder().build();
    const defaultProps = {
      flightPricingPage: {
        response: {
          flightPricingPage: defaultFlightProducts,
          prefill: {
            chaseCardHolder: {
              accountNumber: '',
              firstName: 'firstName',
              lastName: 'lastName',
              middleName: 'middleName'
            }
          }
        },
        resumeAfterLogin: false
      },
      showChaseInstantCreditCard: false,
      resetContactMethodFn: resetContactMethodFnStub,
      setExpressCheckoutFromPassengerPageFn: _.noop,
      gotoFirstPassengerPageFn: gotoFirstPassengerPageFnStub,
      resetAirBookingPurchaseDataFn: _.noop,
      priceTotal,
      resumeAfterLoginFn: resumeAfterLoginFnStub,
      loadPricePagePlacementsFn: loadPricePagePlacementsFnStub,
      handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnStub,
      history: { location: { pathname: '/pricingSummary' } },
      accountRedeemablePoints: 0,
      isLoggedIn: false,
      isWebView: false,
      showNativeAppLoginFn: showNativeAppLoginFnStub,
      accountNumber: 'accountNumber',
      shouldShowChasePlacement: false,
      isEligibleForExpressCheckout: false,
      chaseBannerConfig: null,
      promoBannerConfig: {},
      searchRequest,
      push: pushStub,
      earlyBirdSelected: false,
      fetchSavedCreditCardsAndPassengerInfoFn: fetchSavedCreditCardsAndPassengerInfoFnStub,
      fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn: fetchSavedCCsAndPassengerInfoWithExpressCheckOutFnStub,
      generatePassengerPageInfoFn: generatePassengerPageInfoFnStub,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnStub,
      getAccountInfoFn: getAccountInfoFnStub,
      showDialogFn: showDialogFnStub,
      hideDialogFn: hideDialogFnStub,
      updateFlightSearchRequestAndSyncToFormDataFn: updateFlightSearchRequestAndSyncToFormDataFnStub,
      isInternationalBooking: true,
      MWEB_ADOBE_TARGET_TIMEOUT_MS: 5000,
      getProductListFn: getProductListFnStub,
      EARLY_BIRD_AB_TESTING: false,
      webViewDeepLinkContinue: null,
      setWebViewDeepLinkContinueFn: setWebViewDeepLinkContinueFnStub,
      setChaseBannerShownFn: setChaseBannerShownFnStub,
      resumeAppStateFn: resumeAppStateFnStub,
      shouldResumeAppStateFn: shouldResumeAppStateFnStub,
      persistAppStateFn: persistAppStateFnStub,
      getChaseApplicationStatusFn: getChaseApplicationStatusFnStub,
      cleanUpFrequentTravelerSelectedFn: cleanUpFrequentTravelerSelectedFnStub,
      removeFrequentTravelerSelectedByPaxNumberFn: removeFrequentTravelerSelectedByPaxNumberFnStub,
      clearFormDataByIdFn: clearFormDataByIdFnStub,
      selectedFrequentTravelers: [],
      frequentTravelerList,
      passengerInfos,
      ref: null
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <PricingSummaryPage {..._.merge({}, defaultProps, props)} ref={props.ref} />
      </Provider>
    );
  };
});
