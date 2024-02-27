export default {
  vendor: 'Avis',
  vehicleType: 'Economy',
  productId: 'Product-ID-1',
  name: 'Group A - FORD FIESTA SEDAN or similar',
  numberOfDays: 3,
  pickupDateTime: '2016-03-01T11:00:00.000',
  dropOffDateTime: '2016-03-04T11:00:00.000',
  pickupLocation: 'DAL',
  dropOffLocation: 'DAL',
  price: {
    dailyRateCents: 6059,
    totalCents: 14100,
    totalCentsWithTaxes: 18175,
    rates: [
      {
        cents: 4700,
        quantity: 3,
        per: 'DAY'
      }
    ],
    taxes: [
      {
        type: 'Airport Concession Fee',
        cents: 1592
      },
      {
        type: 'Local Tax',
        cents: 1652
      },
      {
        type: 'VEH LICENSE FEE',
        cents: 600
      },
      {
        type: 'ENERGY RECOVERY FEE',
        cents: 231
      }
    ],
    dailyRateWithCurrencyCode: {
      amount: '47.00',
      currencyCode: 'USD'
    },
    totalWithCurrencyCode: {
      amount: '141.00',
      currencyCode: 'USD'
    },
    totalWithTaxesAndCurrencyCode: {
      amount: '181.75',
      currencyCode: 'USD'
    },
    taxesWithCurrencyCode: [
      {
        taxWithCurrencyCode: {
          amount: '11.69',
          currencyCode: 'USD'
        },
        type: 'Tax'
      },
      {
        taxWithCurrencyCode: {
          amount: '11.69',
          currencyCode: 'USD'
        },
        type: 'AIRPORT CONCESSION RECOVERY:'
      },
      {
        taxWithCurrencyCode: {
          amount: '3.68',
          currencyCode: 'USD'
        },
        type: 'PROPERTY TAX, TITLE/LICENSE REIMBURSEMENT:'
      },
      {
        taxWithCurrencyCode: {
          amount: '1.49',
          currencyCode: 'USD'
        },
        type: 'ENERGY SURCHARGE:'
      }
    ]
  },
  appliedDiscounts: [],
  additionalCharges: {
    mileage: {
      cents: 0,
      freeMileage: 'Unlimited',
      per: ''
    },
    dropOffChargeCents: 0,
    noShowFeeCents: 0
  },

  termsAndConditions: [],

  extras: [
    {
      type: 'SKI_RACK',
      description: 'Ski Rack'
    },
    {
      type: 'INFANT_SEAT',
      description: 'Infant Seat (5 to 20 lbs.)'
    },
    {
      type: 'CHILD_TODDLER_SEAT',
      description: 'Toddler Seat (20 to 40 lbs.)'
    },
    {
      type: 'BOOSTER_SEAT',
      description: 'Booster Seat (40 to 80 lbs.)'
    },
    {
      type: 'NAVIGATIONAL_SYSTEM',
      description: 'Where2&trade; GPS navigation'
    }
  ],
  rentalDeskLocation: 'Rental Counter is located outside of the Airport Terminal. Shuttle is provided.'
};
