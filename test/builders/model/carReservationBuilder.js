function CarReservationBuilder() {
  this.dailyRateWithCurrencyCode = {
    amount: '47.00',
    currencyCode: 'USD'
  };
  
  this.totalWithCurrencyCode = {
    amount: '141.00',
    currencyCode: 'USD'
  };

  this.totalWithTaxesAndCurrencyCode = {
    amount: '181.75',
    currencyCode: 'USD'
  };

  this.taxesWithCurrencyCode = [
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
  ];

  this.carReservationItinerary = {
    pickUpTime: '2016-03-01T11:00:00.000',
    dropOffTime: '2016-03-04T11:00:00.000',
    pickUpDate: 'Tuesday, Mar 1, 2016',
    dropOffDate: 'Friday, Mar 4, 2016',
    pickUpAirport: {
      airportCode: 'DAL',
      airportName: 'Dallas (Love Field)',
      cityName: 'Dallas (Love Field)',
      cityState: 'TX'
    },
    dropOffAirport: {
      airportCode: 'DAL',
      airportName: 'Dallas (Love Field)',
      cityName: 'Dallas (Love Field)',
      cityState: 'TX'
    }
  };

  this.carReservationDetail = {
    carType: 'Economy',
    baseRate: 14100,
    dailyRate: {
      cents: 4700,
      perQuantity: '3 Days'
    },
    promoCodeApplied: false,
    selectedCarExtras: [
      {
        type: 'SKI_RACK',
        description: 'Ski Rack'
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
    totalPrice: 18175,
    vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
    rrIncentiveText: 'Earn up to 600 points',
    mileage: {
      cents: 0,
      freeMileage: 'Unlimited',
      per: ''
    },
    rentalDeskLocation: 'Rental Counter is located outside of the Airport Terminal. Shuttle is provided.',
    dailyRateWithCurrencyCode: this.dailyRateWithCurrencyCode,
    taxesWithCurrencyCode: this.taxesWithCurrencyCode,
    totalWithCurrencyCode: this.totalWithCurrencyCode,
    totalWithTaxesAndCurrencyCode: this.totalWithTaxesAndCurrencyCode
  };

  this.build = () => ({
    carReservationItinerary: this.carReservationItinerary,
    carReservationDetail: this.carReservationDetail
  });

  this.withReduxTransformer = () => {
    this.carReservationDetail = {
      carType: 'Economy',
      baseRate: {
        amount: '141.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      dailyRate: {
        price: {
          amount: '47.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        perQuantity: '3 Days'
      },
      promoCodeApplied: false,
      selectedCarExtras: [
        {
          type: 'SKI_RACK',
          description: 'Ski Rack'
        }
      ],
      totalPrice: {
        amount: '181.75',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
      rrIncentiveText: 'Earn up to 600 points',
      mileage: {
        cents: 0,
        freeMileage: 'Unlimited',
        per: ''
      },
      rentalDeskLocation: 'Rental Counter is located outside of the Airport Terminal. Shuttle is provided.',
      dailyRateWithCurrencyCode: this.dailyRateWithCurrencyCode,
      taxesWithCurrencyCode: this.taxesWithCurrencyCode,
      totalWithCurrencyCode: this.totalWithCurrencyCode,
      totalWithTaxesAndCurrencyCode: this.totalWithTaxesAndCurrencyCode
    };

    return this;
  };
}

module.exports = CarReservationBuilder;
