class UpcomingCarTripDetailBuilder {
  static build() {
    return {
      manageCarReservationDetails: {
        driver: { firstName: 'Cannon', lastName: 'Biggs' },
        confirmationNumber: '08172185US0',
        isCancelled: false
      },
      carReservationItinerary: {
        pickUpTime: '2017-09-16T11:30',
        dropOffTime: '2017-09-19T11:30',
        pickUpDate: 'Saturday, Sep 16, 2017',
        dropOffDate: 'Tuesday, Sep 19, 2017',
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
        },
        vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png'
      },
      carReservationDetail: {
        carType: 'Mid-size',
        baseRate: 21900,
        dailyRate: { cents: 7300, perQuantity: '3 Days' },
        promoCodeApplied: false,
        selectedCarExtras: [{
          description: 'Toddler Seat (20 to 40 lbs.)',
          type: 'Toddler Seat (20 to 40 lbs.)'
        }, { description: 'Booster Seat (40 to 80 lbs.)', type: 'Booster Seat (40 to 80 lbs.)' }],
        totalPrice: 27709,
        showTotalPrice: true,
        vendorImage: '/content/mkt/images/car_vendors/Avis_Logo_results.png',
        mileage: { cents: 0, freeMileage: 'Unlimited', per: '' },
        rentalDeskLocation: 'Rental Counter is at the terminal. Shuttle is provided to pick up your car.',
        dailyRateWithCurrencyCode: {
          amount: '73.00',
          currencyCode: 'USD'
        },
        totalWithCurrencyCode: {
          amount: '181.75',
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
      }
    };
  }
}

module.exports = UpcomingCarTripDetailBuilder;
