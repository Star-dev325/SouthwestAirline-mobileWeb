// @flow
import type { ValidateTransferPageResponse } from 'src/travelFunds/flow-typed/travelFunds.types';

class TransferTravelFundsBuilder {
  validateFunds: ValidateTransferPageResponse;

  constructor() {
    this.validateFunds = {
      _links: {
        transferFund: {
          body: {
            fundSearchToken: 'hTJT50nyF-iGGB8MyhvinZskE8Jl-2iYiwsPLpw8Q2zzH5eaUKOavrQBmkh2iU319PUYxHDuLl-pHxllD6_STgXC0rkz2KxiMKqeWUjnrj9z7Fy8K0Pu1q_GixTWbBnPhAPlhUAehtcnLNBNUiii',
            transferAmount: {
              amount: '50',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          href: '/v1/mobile-air-booking/page/transfer-fund',
          labelText: 'Transfer travel funds',
          method: 'POST'
        }
      },
      learnMoreWithLinks: '<a href="https://www.southwest.com/faq/travel-funds-general-info" target="_blank">Learn More</a>',
      recipientInfoText: 'mock First name, mock last name, and mock Rapid Rewards® number must match Rapid Rewards account information on file.',
      transferAmount: {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      viewTravelFund: {
        displayName: 'Thomas Shelby',
        expirationDate: '2030-03-17',
        fundIdentifier: '00000',
        leisureFund: true,
        transferableAmount: {
          amount: '50.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        travelFundType: 'TRAVEL_FUNDS'
      }
    };

    return this;
  }

  build() {
    return this.validateFunds;
  }
}

export default TransferTravelFundsBuilder;
