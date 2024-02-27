import { fireEvent } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import PricingSummaryPage from 'src/airBooking/pages/pricingSummaryPage';
import * as AppSelector from 'src/shared/selectors/appSelector';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import SearchRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils.js';
import waitFor from 'test/unit/helpers/waitFor';

describe('Enhanced PricingSummaryPage', () => {
  let initialState;

  const defaultFlightProducts = new PricesBuilder().build().flightPricingPage;
  const defaultSearchRequest = new SearchRequestBuilder().build();
  const mockState = {
    app: {
      account: {
        accountInfo: {
          rapidRewardsDetails: {
            redeemablePoints: 1000
          }
        },
        isLoggedIn: true
      }
    }
  };
  const updatedFlightProducts = new PricesBuilder()
    .withPointsTotal({
      amount: '1,000',
      currencyCode: 'PTS'
    })
    .build().flightPricingPage;

  describe('when clicking the continue button', () => {
    describe('logged in', () => {
      describe('points booking', () => {
        describe('insufficient points dialog', () => {
          const updatedFlightProducts = new PricesBuilder()
            .withPointsTotal({
              amount: '30,000',
              currencyCode: 'PTS'
            })
            .build().flightPricingPage;

          it('should show the dialog', (done) => {
            const instance = React.createRef();
            const { container: pricingSummaryPage } = createComponent(updatedFlightProducts, true, mockState, {
              instance
            });

            fireEvent.click(pricingSummaryPage.querySelector('.continue.button'));

            waitFor.untilAssertPass(() => {
              const errorPopup = pricingSummaryPage.querySelector(
                '[data-qa="flight-purchase-not-enough-points-modify"]'
              );

              expect(errorPopup.querySelector('.popup-title').textContent).toEqual(
                'SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__TITLE'
              );
              expect(errorPopup.querySelector('.popup-body').textContent).toEqual(
                'SHARED__PRICING_SUMMARY_INSUFFICIENT_POINTS__MESSAGE'
              );
              expect(errorPopup.querySelector('[data-qa="continue-with-points-button"]').textContent).toEqual(
                'With Points'
              );
              expect(errorPopup.querySelector('[data-qa="continue-with-dollars-button"]').textContent).toEqual(
                'With Dollars'
              );
              expect(errorPopup.querySelector('[data-qa="close"]').textContent).toEqual('SHARED__BUTTON_TEXT__CANCEL');
            }, done);
          });

          it('should go to the select flight page for departing bound when the "With Points" button is clicked', (done) => {
            jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
            const instance = React.createRef();
            const { container: pricingSummaryPage } = createComponent(updatedFlightProducts, true, mockState, {
              instance
            });

            fireEvent.click(pricingSummaryPage.querySelector('.continue.button'));
            const errorPopup = pricingSummaryPage.querySelector('[data-qa="flight-purchase-not-enough-points-modify"]');

            fireEvent.click(errorPopup.querySelector('[data-qa="continue-with-points-button"]'));

            waitFor.untilAssertPass(() => {
              expect(instance.current.props.history.location.pathname).toEqual('/air/booking/select-depart.html');
            }, done);
          });
        });

        describe('sufficient points', () => {
          it('should go to the first passenger information page if the customer has more than enough points to purchase the flight', (done) => {
            jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
            const instance = React.createRef();
            const { container: pricingSummaryPage } = createComponent(updatedFlightProducts, false, mockState, {
              instance
            });

            fireEvent.click(pricingSummaryPage.querySelector('.continue.button'));

            waitFor.untilAssertPass(() => {
              expect(instance.current.props.history.location.pathname).toEqual('/air/booking/passenger/0');
            }, done);
          });

          it('should go to the first passenger information page if the customer has exactly enough points to purchase the flight', (done) => {
            jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
            const instance = React.createRef();
            const { container: pricingSummaryPage } = createComponent(updatedFlightProducts, false, mockState, {
              instance
            });

            fireEvent.click(pricingSummaryPage.querySelector('.continue.button'));

            waitFor.untilAssertPass(() => {
              expect(instance.current.props.history.location.pathname).toEqual('/air/booking/passenger/0');
            }, done);
          });
        });
      });

      describe('money booking', () => {
        it('should go to the first passenger information page', (done) => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/booking');
          const instance = React.createRef();
          const { container: pricingSummaryPage } = createComponent(updatedFlightProducts, false, mockState, {
            instance
          });

          fireEvent.click(pricingSummaryPage.querySelector('.continue.button'));

          waitFor.untilAssertPass(() => {
            expect(instance.current.props.history.location.pathname).toEqual('/air/booking/passenger/0');
          }, done);
        });
      });
    });

    describe('not logged in', () => {
      describe('points booking', () => {
        it('should go to the login page with correct query', (done) => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
          const instance = React.createRef();
          const { container: pricingSummaryPage } = createComponent(updatedFlightProducts, false, {}, { instance });

          fireEvent.click(pricingSummaryPage.querySelector('.continue.button'));

          waitFor.untilAssertPass(() => {
            expect(instance.current.props.history.location.pathname).toEqual('/login');
            expect(instance.current.props.history.location.search).toEqual(
              '?to=%2Fair%2Fbooking%2Fprice.html&simpleLogin=true&withPoints=true'
            );
          }, done);
        });
      });

      describe('money booking', () => {
        it('should go to the first passenger information page', (done) => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/booking');
          const updatedFlightProducts = new PricesBuilder()
            .withMoneyTotal({
              amount: '50',
              currencyCode: 'USD'
            })
            .build().flightPricingPage;

          const instance = React.createRef();
          const { container: pricingSummaryPage } = createComponent(updatedFlightProducts, false, {}, { instance });

          fireEvent.click(pricingSummaryPage.querySelector('.continue.button'));

          waitFor.untilAssertPass(() => {
            expect(instance.current.props.history.location.pathname).toEqual('/air/booking/passenger/0');
          }, done);
        });
      });
    });
  });

  const createComponent = (flightProducts = defaultFlightProducts, withDialog = false, state = {}, props = {}) => {
    initialState = {
      app: {
        wcmContent: {
          applicationProperties: {
            MWEB_ADOBE_TARGET_TIMEOUT_MS: 5000
          }
        },
        airBooking: {
          flightPricingPage: {
            response: {
              flightPricingPage: flightProducts
            }
          },
          flightShoppingPage: {
            response: {
              flightShoppingPage: {
                _links: {
                  flightPricingPage: {
                    href: '/v1/mobile-air-booking/page/flights/prices',
                    method: 'POST',
                    body: {
                      adultPassengers: null,
                      currency: 'USD',
                      chaseSessionId: null
                    }
                  }
                }
              }
            }
          },
          searchRequest: defaultSearchRequest,
          selectedProducts: { adult: { outbound: { fareProductId: 'new-product-id', flightCardIndex: 0 } } }
        },
        account: {
          accountInfo: {
            rapidRewardsDetails: {
              redeemablePoints: 0
            }
          },
          isLoggedIn: false
        }
      }
    };
    const mergedState = _.merge({}, initialState, state);

    return integrationRender({ withDialog })(mergedState, PricingSummaryPage, props);
  };
});
