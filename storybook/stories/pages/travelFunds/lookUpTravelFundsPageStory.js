import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import _ from 'lodash';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

import { LookUpTravelFundsPage } from 'src/travelFunds/pages/lookUpTravelFundsPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const EnhancedLookUpTravelFundsPage = withBodyClass(['is-webview'])(LookUpTravelFundsPage);
const store = createMockedFormStore();
const defaultProps = {
  retrievedFunds: [],
  currentlySelectedTab: 'travel-funds',
  retrieveTravelFundsFn: _.noop,
  updateSelectedLookupTabFn: _.noop,
  saveLastSearchedFundFn: _.noop,
  clearAllLookUpFormsFn: _.noop,
  loadTravelFundsPagePlacementsFn: _.noop,
  resumeAfterLogin: {
    shouldResume: false,
    requestInfo: {}
  },
  placements: []
};

storiesOf('pages/travelFunds/LookUpTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <LookUpTravelFundsPage {...defaultProps} />;
  })
  .add('luv voucher tab selected', () => {
    return <LookUpTravelFundsPage {..._.merge({}, defaultProps, { currentlySelectedTab: 'luv-voucher' })} />;
  })
  .add('gift card tab selected', () => {
    return <LookUpTravelFundsPage {..._.merge({}, defaultProps, { currentlySelectedTab: 'gift-card' })} />;
  })
  .add('with message', () => {
    return (
      <LookUpTravelFundsPage
        {..._.merge({}, defaultProps, {
          message: {
            key: 'SOMESUCH',
            header: 'No Travel Funds Found',
            body: 'No travel funds found on this account.'
          }
        })}
      />
    );
  })
  .add('funds associated', () => {
    return (
      <LookUpTravelFundsPage
        {..._.merge({}, defaultProps, {
          retrievedFunds: [
            {
              expirationDate: '2021-03-03',
              travelFundType: 'TRAVEL_FUNDS',
              leisureFund: false,
              displayName: 'Michael Scott',
              fundIdentifier: 'WBB-1234',
              errorMessage: '',
              refundableAmount: {
                amount: '100.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              nonRefundableAmount: {
                amount: '0.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              transferableText: '$100.00 is eligible for transfer',
              currentAmount: {
                amount: '100.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              _links: {
                validateTransfer: {
                  test: 'link',
                  labelText: 'Test Label Text'
                },
                associateFund: {
                  test: 'link'
                }
              }
            }
          ],
          associateFundsMessage: {
            header: 'Travel Funds were added to My Account',
            icon: 'POSITIVE',
            textColor: 'DEFAULT'
          }
        })}
      />
    );
  })
  .add('funds with no expiration date text', () => {
    return (
      <LookUpTravelFundsPage
        {..._.merge({}, defaultProps, {
          retrievedFunds: [
            {
              expirationDate: null,
              expirationDateString: 'Expiration: None',
              travelFundType: 'TRAVEL_FUNDS',
              leisureFund: false,
              displayName: 'Michael Scott',
              fundIdentifier: 'WBB-1234',
              errorMessage: '',
              refundableAmount: {
                amount: '100.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              nonRefundableAmount: {
                amount: '0.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              transferableText: '$100.00 is eligible for transfer',
              currentAmount: {
                amount: '100.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              _links: {
                validateTransfer: {
                  test: 'link',
                  labelText: 'Test Label Text'
                },
                associateFund: {
                  test: 'link'
                }
              }
            }
          ],
          associateFundsMessage: {
            header: 'Travel Funds were added to My Account',
            icon: 'POSITIVE',
            textColor: 'DEFAULT'
          }
        })}
      />
    );
  })
  .add('with results', () => {
    return (
      <LookUpTravelFundsPage
        {..._.merge({}, defaultProps, {
          retrievedFunds: [
            {
              expirationDate: '2020-08-27',
              travelFundType: 'TRAVEL_FUNDS',
              displayName: 'Rahul Sengupta',
              leisureFund: true,
              fundIdentifier: 'LOOKUP-9876',
              errorMessage: '',
              refundableAmount: {
                amount: '987.65',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              nonRefundableAmount: {
                amount: '123.45',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              currentAmount: {
                amount: '987.65',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            {
              travelFundType: 'GIFT_CARD',
              displayName: 'Southwest Gift Card',
              fundIdentifier: 'XXXXXXXXXXXX-1816',
              currentAmount: {
                amount: '110.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            {
              travelFundType: 'GIFT_CARD',
              displayName: 'Southwest Gift Card',
              fundIdentifier: 'XXXXXXXXXXXX-1840',
              errorMessage: 'No funds available',
              currentAmount: {
                amount: '0.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            {
              expirationDate: '2019-12-25',
              travelFundType: 'LUV_VOUCHER',
              displayName: 'Southwest LUV Voucher',
              fundIdentifier: 'Voucher 9289',
              errorMessage: '',
              currentAmount: {
                amount: '427.74',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            },
            {
              expirationDate: '2020-08-27',
              travelFundType: 'TRAVEL_FUNDS',
              leisureFund: false,
              displayName: 'Dr. Sastry Iosdeveloper Chamarthy VIII',
              fundIdentifier: 'LOOKUP-1234',
              errorMessage: '',
              refundableAmount: {
                amount: '10,300.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              nonRefundableAmount: {
                amount: '0.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              transferableText: '$300.00 is eligible for transfer within your company',
              currentAmount: {
                amount: '10,300.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              _links: {
                validateTransfer: {
                  test: 'link'
                },
                associateFund: {
                  test: 'link'
                }
              }
            },
            {
              expirationDate: '2021-03-03',
              travelFundType: 'TRAVEL_FUNDS',
              leisureFund: true,
              displayName: 'Michael Scott',
              fundIdentifier: 'WBB-1234',
              errorMessage: '',
              refundableAmount: {
                amount: '100.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              nonRefundableAmount: {
                amount: '0.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              transferableText: '$100.00 is eligible for transfer',
              currentAmount: {
                amount: '100.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              _links: {
                validateTransfer: {
                  test: 'link',
                  labelText: 'Test Label Text'
                },
                associateFund: {
                  test: 'link'
                }
              }
            }
          ]
        })}
      />
    );
  })
  .add('in a webview', () => {
    return <EnhancedLookUpTravelFundsPage {..._.merge({}, defaultProps, { isWebView: true })} />;
  })
  .add('not eligible for transfer', () => {
    const getMockNonTransferableFund = ({
      greyBoxMessage,
      fundIdentifier,
      amount,
      nonRefundableAmount = 0.0,
      associateFund = null,
      displayName = 'Non Transferable User'
    }) => ({
      expirationDate: '2027-05-08',
      travelFundType: 'TRAVEL_FUNDS',
      displayName,
      fundIdentifier,
      errorMessage: '',
      greyBoxMessage,
      leisureFund: true,
      refundableAmount: {
        amount,
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      nonRefundableAmount: {
        amount: 0.0,
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      transferableText: null,
      currentAmount: {
        amount,
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: {
        associateFund: null,
        validateTransfer: null
      }
    });

    const retrievedFunds = [
      {
        greyBoxMessage: {
          key: 'GREY_BOX_UNAVAILABLE_FUNDS_RR_MISMATCH',
          header: 'Not eligible for transfer',
          body: "The account you're logged in with does not match the account of the travel fund"
        },
        fundIdentifier: 'SSBR9S-0164',
        amount: '111.50',
        displayName: 'Unmatching Account User'
      },
      {
        greyBoxMessage: {
          key: 'GREY_BOX_UNAVAILABLE_FUNDS_RR_MISMATCH',
          header: 'Not eligible for transfer',
          body: "The account you're logged in with does not match the account of the travel fund"
        },
        fundIdentifier: 'SSBR9S-0165',
        amount: '616.37',
        displayName: 'Unmatching Login User'
      },
      {
        greyBoxMessage: {
          key: 'GREY_BOX_UNAVAILABLE_FUNDS_NAME_MISMATCH',
          header: 'Not eligible for transfer',
          body: 'The name on your account does not match name of the travel fund'
        },
        fundIdentifier: 'SSBR9S-0166',
        amount: '55.45',
        displayName: 'Unmatching Name User'
      },
      {
        greyBoxMessage: {
          key: 'GREY_BOX_UNAVAILABLE_FUNDS_TRANSFER_INELIGIBLE',
          header: 'Not eligible for transfer',
          body: 'The fare purchased did not qualify to allow the fund to be transferred'
        },
        fundIdentifier: 'SSBR9S-0167',
        amount: '12.56',
        displayName: 'Not Qualified User'
      },
      {
        greyBoxMessage: {
          key: 'GREY_BOX_UNAVAILABLE_FUNDS_TRANSFER_INELIGIBLE',
          header: 'Not eligible for transfer',
          body: 'This fund was previously transferred and only 1 transfer of a travel fund is allowed'
        },
        fundIdentifier: 'SSBR9S-0168',
        amount: '300.01',
        displayName: 'Previously Transferred User'
      }
    ].map(getMockNonTransferableFund);

    return <LookUpTravelFundsPage {..._.merge({}, defaultProps, { retrievedFunds })} />;
  });
