module.exports = {
  vendor: 'Hertz',
  vehicleType: 'ECONOMY',
  productId:
    'eyIwIjoiMjAxNy0wMy0yMVQxMTozMCIsIjEiOiJERlciLCIyIjoiMjAxNy0wMy0yNFQxMTozMCIsIjMiOiJBQkkiLCI0IjoiSEVSVFoiLCI1IjoiRUNPTk9NWSIsIjYiOiJFQ0FSIiwiNyI6IlFPREdNTjJQUTcyOTEzMy0yNTAxIiwiOCI6IklDWEEiLCI5IjoiQSBDSEVWUk9MRVQgU1BBUksgT1IgU0lNSUxBUiIsIjEwIjp7IjAiOnsidiI6IjEwMS4wMCJ9LCIxIjp7InYiOiIzMDMuMDAifSwiMiI6eyJ2IjoiNDE1Ljk0In0sIjMiOlt7IjAiOnsidiI6IjEwMS4wMCJ9LCIxIjoiREFZIiwiMiI6M31dLCI0IjpbeyIwIjoiVGF4IiwiMSI6eyJ2IjoiNTQuMjYifX0seyIwIjoiQUlSUE9SVCBDT05DRVNTSU9OIFJFQ09WRVJZOiIsIjEiOnsidiI6IjMzLjY2In19LHsiMCI6Ik1JU0NFTExBTkVPVVMgVFJGIEZFRSIsIjEiOnsidiI6IjE5LjUwIn19LHsiMCI6Ik1JU0NFTExBTkVPVVMgVkxGIEZFRSIsIjEiOnsidiI6IjUuNTIifX1dfSwiMTEiOnsibSI6eyJhIjp7InYiOiIwLjAwIn0sInAiOiJNaWxlIiwiZk0iOiJVbmxpbWl0ZWQifSwickMiOnsidiI6IjAuMDAifSwiblNGIjp7InYiOiIwLjAwIn19LCIxMiI6IlVTRCJ9',
  name: 'A CHEVROLET SPARK OR SIMILAR',
  numberOfDays: 3,
  pickupDateTime: '2017-03-21T11:30:00.000',
  returnDateTime: '2017-03-24T11:30:00.000',
  pickupLocation: 'DFW',
  returnLocation: 'ABI',
  price: {
    dailyRate: {
      value: '101.00',
      currencyCode: 'USD'
    },
    total: {
      value: '303.00',
      currencyCode: 'USD'
    },
    totalWithTaxes: {
      value: '415.94',
      currencyCode: 'USD'
    },
    rates: [
      {
        amount: {
          value: '101.00',
          currencyCode: 'USD'
        },
        quantity: 3,
        per: 'DAY'
      }
    ],
    taxes: [
      {
        type: 'Tax',
        amount: {
          value: '54.26',
          currencyCode: 'USD'
        }
      },
      {
        type: 'AIRPORT CONCESSION RECOVERY:',
        amount: {
          value: '33.66',
          currencyCode: 'USD'
        }
      },
      {
        type: 'MISCELLANEOUS TRF FEE',
        amount: {
          value: '19.50',
          currencyCode: 'USD'
        }
      },
      {
        type: 'MISCELLANEOUS VLF FEE',
        amount: {
          value: '5.52',
          currencyCode: 'USD'
        }
      }
    ]
  },
  appliedDiscounts: [],
  additionalCharges: {
    mileage: {
      amount: {
        value: '0.00',
        currencyCode: 'USD'
      },
      freeMileage: 'Unlimited',
      per: 'Mile'
    },
    returnCharge: {
      value: '0.00',
      currencyCode: 'USD'
    },
    noShowFee: {
      value: '0.00',
      currencyCode: 'USD'
    }
  },
  termsAndConditions: [
    "An acceptable valid driver's license, issued from your country of residence, MUST be presented at time of rental.",
    'Approximate rental charges are based on the available information at time of reservation.',
    'Additional fees or surcharges including Frequent Flyer Surcharge may be applied at time of rental.',
    "Debit Card Policies: This location does accept bank debit cards with the MasterCard or Visa logo at the time of rental if you are at least 21 years of age. You will be subject to a credit scoring check to determine credit worthiness. Hertz reserves the right, in its sole discretion, to seek a Debit Card authorization hold in excess of the estimated rental charges. We will place a hold on your account of $200 plus the estimated rental charges. THESE FUNDS WILL NOT BE AVAILABLE FOR YOUR USE. Upon returning the vehicle, will process a release of the unused portion of the hold subject to your Bank's procedures. Your bank should release the original authorization when the charge is received, however, depending on the bank, there may be a significant delay between the time the charges are received and the card issuer releases the authorization. If you fail to return the vehicle as agreed, Hertz will obtain additional authorizations from your account to cover the rental charges. Hertz is not responsible for any returned checks or over-drafts based on this policy. Positive identification in addition to your driver's license may be required. In the United States, Debit, Cash or Check cards can be used at the end for payment of rental charges. Note: Prepaid Debit/Gift cards are not acceptable methods of credit identification to pick up a car at any location. One of the above mentioned cards must be presented.",
    'Corporate renters, contact your travel department to check the Terms and Conditions of your contract regarding personal business travel.',
    'For details on these or any rental requirements please contact Hertz at 1-800-654-3131.'
  ],
  extras: [
    {
      type: 'CHILD_TODDLER_SEAT',
      description: 'Child Safety Seat (up to 40 lbs.)'
    },
    {
      type: 'NAVIGATIONAL_SYSTEM',
      description: 'NeverLost'
    },
    {
      type: 'SKI_RACK',
      description: 'Ski Rack'
    }
  ],
  rentalDeskLocation: 'Rental Counter is located outside of the Airport Terminal. Shuttle is provided.'
};
