import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';

export default class AirChangeConfirmationPageBuilder {
  constructor() {
    this.response = {
      changeConfirmation: {
        dates: {
          first: '2017-12-13',
          second: null
        },
        destinationDescription: 'Austin',
        pnrs: [
          {
            passengers: [
              {
                displayName: 'Xin Wang',
                accountNumber: '01010101101'
              }
            ],
            recordLocator: 'ABC123'
          }
        ],
        failedPassengers: null,
        bounds: [new BoundDetailBuilder().build()],
        headerMessage: {
          backgroundColor: 'DEFAULT',
          body: 'If you are logged in, it will appear in your upcoming trips shortly. Business select was added to the following flights and passengers.',
          header: 'Great Choice!',
          icon: 'POSITIVE',
          key: 'BOOKING_UPSELL_CONFIRMATION_BUS',
          textColor: 'DEFAULT'
        },
        fareSummary: {
          originalTripCost: {
            item: 'Original trip total',
            fare: {
              amount: '412.80',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            tax: null
          },
          newTripCost: {
            item: 'New trip total',
            fare: {
              amount: '601.58',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            tax: null
          },
          nonRefundable: null,
          refundable: null,
          youOwe: {
            item: 'Amount Due',
            fare: {
              amount: '401.78',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            tax: null
          },
          totalRefundability: null
        },
        billingInfo: {
          cardType: null,
          lastFourDigits: null,
          cardHolderName: null,
          amountApplied: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: null
          },
          billingAddress: null
        },
        changeTotals: [
          {
            item: 'ORIGINAL PRICE',
            amount: {
              amount: '123.36',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        _links: {
          carBooking: {
            href: '/v1/mobile-misc/feature/cars/products',
            method: 'GET',
            query: {
              'pickup-location': 'DAL',
              'return-location': 'AUS',
              'pickup-datetime': '2017-12-18T11:30',
              'return-datetime': '2017-12-20T11:30'
            }
          }
        },
        _meta: {
          purchaseWithPoints: false
        }
      }
    };
  }

  withUpgrade() {
    this.response.changeConfirmation.billingInfo = {
      cardType: 'DINERS',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: {
        amount: '401.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '441 Main St',
        streetTwo: '442 Main St',
        location: 'Brooklyn, NY US 57508'
      }
    };

    this.response.changeConfirmation.changeTotals.push({
      item: 'ADDITIONAL PAID',
      amount: {
        amount: '159.18',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    });

    return this;
  }

  withFundsApplied() {
    this.response.changeConfirmation.fundsApplied = [
      {
        travelFundType: 'GIFT_CARD',
        appliedAmount: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Southwest Gift Card',
        fundIdentifier: 'XXXXXXXXXXXX-2403'
      }
    ];

    return this;
  }

  withUpgradeTravelFunds() {
    this.response.changeConfirmation.changeTotals = [
      {
        item: 'ORIGINAL PRICE',
        amount: {
          amount: '384.36',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        item: 'TRAVEL FUNDS APPLIED',
        amount: {
          amount: '123.36',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        item: 'TRAVEL FUNDS REMAINING',
        amount: {
          amount: '123.36',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ];

    this.response.changeConfirmation.fareSummary.youOwe = {
      item: 'Total Paid',
      fare: {
        amount: '29.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      tax: null
    };

    this.response.changeConfirmation.fundsApplied = [
      {
        travelFundType: 'TRAVEL_FUNDS',
        leisureFund: false,
        appliedAmount: {
          amount: '23.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Xin Wang',
        fundIdentifier: 'TVLFND',
        expirationDate: '2020-08-27'
      },
      {
        travelFundType: 'TRAVEL_FUNDS',
        leisureFund: true,
        appliedAmount: {
          amount: '6.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Xin Wang',
        fundIdentifier: 'TVLFND',
        expirationDate: '2020-08-27'
      }
    ];

    return this;
  }

  withUpgradeTravelFundsNoExpirationDateText() {
    this.withUpgradeTravelFunds();
    this.response.changeConfirmation.fundsApplied[0].expirationDateString = 'Expiration: None';
    
    return this;
  }

  withDowngradeReturnToCreditCard() {
    this.response.changeConfirmation.changeTotals.push({
      item: 'AMOUNT REFUNDED',
      amount: {
        amount: '50.36',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    });

    return this;
  }

  withDowngradeReturnToTravelFunds() {
    this.response.changeConfirmation.fareSummary = {
      originalTripCost: {
        item: 'Original trip total',
        fare: {
          amount: '333.33',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: {
          amount: '222.22',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      nonRefundable: {
        item: 'Total Credit',
        fare: {
          amount: '111.11',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      refundable: null,
      youOwe: null,
      totalRefundability: {
        item: 'Total Credit',
        fare: {
          amount: '111.11',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      }
    };

    this.response.changeConfirmation.headerMessage = {
      backgroundColor: 'DEFAULT',
      body: 'Check in up to 24 hours in advance. The earlier you check in, the better your seat selection.',
      header: 'Your trip is booked!',
      icon: 'POSITIVE',
      key: 'BOOKING_CONFIRMATION',
      textColor: 'DEFAULT'
    };

    this.response.changeConfirmation._links = {
      ...this.response.changeConfirmation._links,
      checkTravelFunds: {
        labelText: 'View Travel Funds',
        href: '/v1/mobile-air-booking/page/view-fund',
        method: 'POST',
        body: {
          pnrToken: 'encryptedToken'
        }
      }
    };

    return this;
  }

  withUpgradeAdditionalPaid() {
    this.response.changeConfirmation.billingInfo = {
      cardType: 'DINERS',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: {
        amount: '401.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '441 Main St',
        streetTwo: '442 Main St',
        location: 'Brooklyn, NY US 57508'
      }
    };

    this.response.changeConfirmation.changeTotals = [
      {
        item: 'ORIGINAL PRICE',
        amount: {
          amount: '123.36',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        item: 'ADDITIONAL PAID',
        amount: {
          amount: '401.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        item: 'TRAVEL FUNDS APPLIED',
        amount: {
          amount: '123.36',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ];

    return this;
  }

  withUpgradeAdditionalPaidWithApplePay() {
    this.response.changeConfirmation.billingInfo = {
      cardType: 'APPLE_PAY',
      cardHolderName: 'Li Rui',
      afpCardType: 'Visa',
      lastFourDigits: '1234',
      amountApplied: {
        amount: '401.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '441 Main St',
        streetTwo: '442 Main St',
        location: 'Brooklyn, NY US 57508'
      }
    };

    this.response.changeConfirmation.changeTotals = [
      {
        item: 'ORIGINAL PRICE',
        amount: {
          amount: '123.36',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        item: 'ADDITIONAL PAID',
        amount: {
          amount: '401.78',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ];

    return this;
  }

  withEvenExchange() {
    this.response.changeConfirmation.changeTotals = [
      {
        item: 'ORIGINAL PRICE',
        amount: {
          amount: '123.36',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      {
        item: 'ADDITIONAL PAID',
        amount: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ];

    return this;
  }

  withDownGradePoints() {
    this.response.changeConfirmation.changeTotals = [
      {
        item: 'ORIGINAL PRICE',
        amount: {
          amount: '15,294',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      },
      {
        item: 'AMOUNT REFUNDED',
        amount: {
          amount: '12,547',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      }
    ];

    this.response.changeConfirmation._meta = {
      purchaseWithPoints: true
    };

    return this;
  }

  withEvenExchangePoints() {
    this.response.changeConfirmation.changeTotals = [
      {
        item: 'ORIGINAL PRICE',
        amount: {
          amount: '15,294',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      },
      {
        item: 'ADDITIONAL PAID',
        amount: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      }
    ];

    this.response.changeConfirmation.totals._meta = {
      purchaseWithPoints: true
    };

    return this;
  }

  withUpgradePoints() {
    this.response.changeConfirmation.changeTotals = [
      {
        item: 'ORIGINAL PRICE',
        amount: {
          amount: '2,747',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      },
      {
        item: 'ADDITIONAL PAID',
        amount: {
          amount: '12,402',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      }
    ];

    this.response.changeConfirmation._meta = {
      purchaseWithPoints: true
    };

    return this;
  }

  build() {
    return this.response;
  }
}
