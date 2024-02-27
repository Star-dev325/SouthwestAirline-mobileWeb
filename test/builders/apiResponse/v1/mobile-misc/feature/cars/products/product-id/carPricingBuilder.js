function carPricingBuilder() {
  this.build = function() {
    return {
      vendor: 'Hertz',
      vehicleType: 'ECONOMY',
      productId: 'eyJwaWNrdXBEYXRlVGltZSI6IjIwMTYtMTItMjBUMDg6MDAiLCJwaWNrdXBMb2NhdGlvbiI6IkRBTCIsInJldHVybkRhdGVUaW1lIjoiMjAxNi0xMi0yMlQwODowMCIsInJldHVybkxvY2F0aW9uIjoiREFMIiwidmVuZG9yIjoiSEVSVFoiLCJ2ZWhpY2xlVHlwZSI6IkVDT05PTVkiLCJzaXBwQ29kZSI6IkVDQVIiLCJyZWZlcmVuY2VJZCI6IlM3TFdQMVg1Wk42MjkzNi0yNTAxIiwicmF0ZVF1YWxpZmllciI6IkFQSEUxIiwibmFtZSI6IkEgQ0hFVlJPTEVUIFNQQVJLIE9SIFNJTUlMQVIiLCJwcm9kdWN0UHJpY2UiOnsiZGFpbHlSYXRlIjp7InZhbHVlIjoiNjQyOCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ0b3RhbCI6eyJ2YWx1ZSI6IjEwMDAwIiwiY3VycmVuY3lDb2RlIjoiVVNEIn0sInRvdGFsV2l0aFRheGVzIjp7InZhbHVlIjoiMTI4NTUiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwicmF0ZXMiOlt7ImFtb3VudCI6eyJ2YWx1ZSI6IjUwMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwicmVudGFsUmF0ZVR5cGUiOiJEQVkiLCJxdWFudGl0eSI6Mn1dLCJ0YXhlcyI6W3sidHlwZSI6IlRheCIsImFtb3VudCI6eyJ2YWx1ZSI6IjExNjkiLCJjdXJyZW5jeUNvZGUiOiJVU0QifX0seyJ0eXBlIjoiQUlSUE9SVCBDT05DRVNTSU9OIFJFQ09WRVJZOiIsImFtb3VudCI6eyJ2YWx1ZSI6IjExNjkiLCJjdXJyZW5jeUNvZGUiOiJVU0QifX0seyJ0eXBlIjoiUFJPUEVSVFkgVEFYLCBUSVRMRS9MSUNFTlNFIFJFSU1CVVJTRU1FTlQ6IiwiYW1vdW50Ijp7InZhbHVlIjoiMzY4IiwiY3VycmVuY3lDb2RlIjoiVVNEIn19LHsidHlwZSI6IkVORVJHWSBTVVJDSEFSR0U6IiwiYW1vdW50Ijp7InZhbHVlIjoiMTQ5IiwiY3VycmVuY3lDb2RlIjoiVVNEIn19XX0sImFkZGl0aW9uYWxDaGFyZ2VzIjp7Im1pbGVhZ2UiOnsiYW1vdW50Ijp7InZhbHVlIjoiMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ1bml0IjoiTWlsZSIsImZyZWVNaWxlYWdlIjoiVW5saW1pdGVkIn0sInJldHVybkNoYXJnZSI6eyJ2YWx1ZSI6IjAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwibm9TaG93RmVlIjp7InZhbHVlIjoiMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9fX0=',
      name: 'A CHEVROLET SPARK OR SIMILAR',
      numberOfDays: 2,
      pickupDateTime: '2016-12-20T08:00:00.000',
      returnDateTime: '2016-12-22T08:00:00.000',
      pickupLocation: 'DAL',
      returnLocation: 'DAL',
      price: {
        dailyRate: {
          value: '64.28',
          currencyCode: 'USD'
        },
        total: {
          value: '100.00',
          currencyCode: 'USD'
        },
        totalWithTaxes: {
          value: '128.55',
          currencyCode: 'USD'
        },
        rates: [
          {
            amount: {
              value: '50.00',
              currencyCode: 'USD'
            },
            quantity: 2,
            per: 'DAY'
          }
        ],
        taxes: [
          {
            type: 'Tax',
            amount: {
              value: '11.69',
              currencyCode: 'USD'
            }
          },
          {
            type: 'AIRPORT CONCESSION RECOVERY:',
            amount: {
              value: '11.69',
              currencyCode: 'USD'
            }
          },
          {
            type: 'PROPERTY TAX, TITLE/LICENSE REIMBURSEMENT:',
            amount: {
              value: '3.68',
              currencyCode: 'USD'
            }
          },
          {
            type: 'ENERGY SURCHARGE:',
            amount: {
              value: '1.49',
              currencyCode: 'USD'
            }
          }
        ]
      },
      appliedDiscounts: [
        {
          type: 'CORPORATE_RATE',
          code: '79315'
        }
      ],
      additionalCharges: {
        mileage: {
          amount: {
            value: '0',
            currencyCode: 'USD'
          },
          freeMileage: 'Unlimited',
          per: 'Mile'
        },
        returnCharge: {
          value: '0',
          currencyCode: 'USD'
        },
        noShowFee: {
          value: '0',
          currencyCode: 'USD'
        }
      },
      termsAndConditions: [
        'An acceptable valid driver\'s license, issued from your country of residence, MUST be presented at time of rental.',
        'Approximate rental charges are based on the available information at time of reservation.',
        'Additional fees or surcharges including Frequent Flyer Surcharge may be applied at time of rental.',
        'Debit Card Policies: This location does accept bank debit cards with the MasterCard or Visa logo at the time of rental if you are at least 21 years of age. You will be subject to a credit scoring check to determine credit worthiness. Hertz reserves the right, in its sole discretion, to seek a Debit Card authorization hold in excess of the estimated rental charges. We will place a hold on your account of $200 plus the estimated rental charges. THESE FUNDS WILL NOT BE AVAILABLE FOR YOUR USE. Upon returning the vehicle, will process a release of the unused portion of the hold subject to your Bank\'s procedures. Your bank should release the original authorization when the charge is received, however, depending on the bank, there may be a significant delay between the time the charges are received and the card issuer releases the authorization. If you fail to return the vehicle as agreed, Hertz will obtain additional authorizations from your account to cover the rental charges. Hertz is not responsible for any returned checks or over-drafts based on this policy. Positive identification in addition to your driver\'s license may be required. In the United States, Debit, Cash or Check cards can be used at the end for payment of rental charges. Note: Prepaid Debit/Gift cards are not acceptable methods of credit identification to pick up a car at any location. One of the above mentioned cards must be presented.',
        'Corporate renters, contact your travel department to check the Terms and Conditions of your contract regarding personal business travel.',
        'For details on these or any rental requirements please contact Hertz at 1-800-654-3131.'
      ],
      extras: [
        {
          type: 'NAVIGATIONAL_SYSTEM',
          description: 'NeverLost'
        },
        {
          type: 'CHILD_TODDLER_SEAT',
          description: 'Child Safety Seat (up to 40 lbs.)'
        },
        {
          type: 'SKI_RACK',
          description: 'Ski Rack'
        }
      ],
      rentalDeskLocation: 'Rental Counter is at the terminal. Shuttle is provided to pick up your car.'
    };
  };
}

module.exports = carPricingBuilder;
