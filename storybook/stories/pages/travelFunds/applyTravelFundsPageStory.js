import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { AirBookingApplyTravelFundsPage } from 'src/airBooking/pages/airBookingApplyTravelFundsPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = createMockedFormStore();
const webViewStore = createMockedFormStore({
  app: {
    webView: {
      isWebView: true
    }
  }
});
const defaultProps = {
  priceTotal: new PriceTotalBuilder().build(),
  balanceRemaining: {
    totals: {
      moneyTotal: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    }
  },
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
  goBack: _.noop,
  calculateFundsFn: _.noop,
  refreshFundsFn: _.noop,
  removeFundFn: _.noop,
  updateSelectedApplyTabFn: _.noop,
  resetCalculateFlowDataFn: _.noop,
  showDialogFn: _.noop,
  hideDialogFn: _.noop,
  checkSessionExpired: _.noop,
  resetAirBookingPurchaseDataFn: _.noop,
  fetchSavedCreditCardsFn: _.noop,
  addHistoryBackToHomeFn: _.noop,
  saveLastSearchedFundFn: _.noop,
  clearAllApplyFormsFn: _.noop,
  setReLoginCallbackFunctionsFn: _.noop
};
const WebViewAirBookingApplyTravelFundsPage = withBodyClass(['is-webview', 'air-booking-apply-travel-funds-page'])(
  AirBookingApplyTravelFundsPage
);

storiesOf('pages/travelFunds/ApplyTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('apply default', () => {
    return <AirBookingApplyTravelFundsPage {...defaultProps} />;
  })
  .add('apply luv voucher tab selected', () => {
    return <AirBookingApplyTravelFundsPage {..._.merge({}, defaultProps, { currentlySelectedTab: 'luv-voucher' })} />;
  })
  .add('apply gift card tab selected', () => {
    return <AirBookingApplyTravelFundsPage {..._.merge({}, defaultProps, { currentlySelectedTab: 'gift-card' })} />;
  })
  .add('with apply results', () => {
    return (
      <AirBookingApplyTravelFundsPage
        {..._.merge({}, defaultProps, {
          applyTravelFundsPageResponse: {
            travelFunds: [
              {
                expirationDate: '2020-08-27',
                travelFundType: 'TRAVEL_FUNDS',
                leisureFund: true,
                displayName: 'Ben Lacy',
                fundIdentifier: 'JH2879-7457',
                errorMessage: null,
                appliedAmount: {
                  amount: '233.98',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                remainingAmount: {
                  amount: '4.20',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                _links: {
                  removeTravelFund: {
                    href: '/v1/mobile-air-booking/page/calculate-funds',
                    method: 'PUT',
                    body: {
                      removalTravelFundId: '1'
                    }
                  }
                }
              },
              {
                travelFundType: 'GIFT_CARD',
                displayName: 'Southwest Gift Card',
                fundIdentifier: 'XXXXXXXXXXXX-1204',
                errorMessage: 'Funds not applied',
                appliedAmount: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                remainingAmount: {
                  amount: '1,000.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                _links: {
                  removeTravelFund: {
                    href: '/v1/mobile-air-booking/page/calculate-funds',
                    method: 'PUT',
                    body: {
                      removalTravelFundId: '2'
                    }
                  }
                }
              },
              {
                expirationDate: '2019-12-25',
                travelFundType: 'LUV_VOUCHER',
                displayName: 'Southwest LUV Voucher',
                fundIdentifier: 'Voucher 9289',
                errorMessage: 'No funds available.',
                appliedAmount: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                remainingAmount: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                _links: {
                  removeTravelFund: {
                    href: '/v1/mobile-air-booking/page/calculate-funds',
                    method: 'PUT',
                    body: {
                      removalTravelFundId: '3'
                    }
                  }
                }
              },
              {
                expirationDate: '2020-08-27',
                travelFundType: 'TRAVEL_FUNDS',
                leisureFund: false,
                displayName: 'Dr. Roberto Reallylongname Wallace III',
                fundIdentifier: 'ABC123-4567',
                errorMessage:
                  'The name attached to this fund does not match the Passenger name. Please edit Passenger name or remove the fund.',
                appliedAmount: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                remainingAmount: {
                  amount: '1,393.56',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                _links: {
                  removeTravelFund: {
                    href: '/v1/mobile-air-booking/page/calculate-funds',
                    method: 'PUT',
                    body: {
                      removalTravelFundId: '4'
                    }
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
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            totals: {
              pointsTotal: null,
              moneyTotal: {
                amount: '1,389.36',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            fundsAppliedToken: 'funds-token'
          }
        })}
      />
    );
  })
  .add('funds with no expiration date text', () => {
    return (
      <AirBookingApplyTravelFundsPage
        {..._.merge({}, defaultProps, {
          applyTravelFundsPageResponse: {
            travelFunds: [
              {
                expirationDate: null,
                expirationDateString: 'Expiration: None',
                travelFundType: 'TRAVEL_FUNDS',
                leisureFund: true,
                displayName: 'Ben Lacy',
                fundIdentifier: 'JH2879-7457',
                errorMessage: null,
                appliedAmount: {
                  amount: '233.98',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                remainingAmount: {
                  amount: '4.20',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                _links: {
                  removeTravelFund: {
                    href: '/v1/mobile-air-booking/page/calculate-funds',
                    method: 'PUT',
                    body: {
                      removalTravelFundId: '1'
                    }
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
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            totals: {
              pointsTotal: null,
              moneyTotal: {
                amount: '1,389.36',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            fundsAppliedToken: 'funds-token'
          }
        })}
      />
    );
  })
  .add('with results and points booking', () => {
    return (
      <AirBookingApplyTravelFundsPage
        {..._.merge({}, defaultProps, {
          priceTotal: new PriceTotalBuilder().withPointsTotal().build(),
          applyTravelFundsPageResponse: {
            travelFunds: [
              {
                expirationDate: '2020-08-27',
                travelFundType: 'TRAVEL_FUNDS',
                leisureFund: true,
                displayName: 'Steve Jobs',
                fundIdentifier: 'APPLE5-1234',
                errorMessage: null,
                appliedAmount: {
                  amount: '233.98',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                remainingAmount: {
                  amount: '1,382.36',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                _links: null
              }
            ],
            balanceRemaining: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            totalFunds: {
              amount: '233.98',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            totals: {
              pointsTotal: {
                amount: '62,256',
                currencyCode: 'PTS',
                currencySymbol: null
              },
              moneyTotal: {
                amount: '11.20',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            fundsAppliedToken: 'funds-token'
          }
        })}
      />
    );
  });

storiesOf('pages/travelFunds/ApplyTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('ipad webview', () => {
    return <WebViewAirBookingApplyTravelFundsPage {...defaultProps} />;
  });
