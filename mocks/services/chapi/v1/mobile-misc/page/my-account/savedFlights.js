module.exports = {
  path: '/chapi/v1/mobile-misc/page/my-account/saved-flights',
  method: 'GET',
  cache: false,
  template: () => ({
    savedFlightsPage: {
      numberOfSavedFlights: 4,
      savedFlights: [
        {
          dates: {
            first: '2016-12-22',
            second: null
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Dallas (Love Field), TX',
          passengers: {
            adults: 4
          },
          _links: null,
          _v1_infoNeededToCheckPrice: {
            type: 'ONE_WAY',
            origin: 'HOU',
            destination: 'DAL',
            originDepartureDate: '2016-12-22',
            destinationDepartureDate: null,
            promoCode: '',
            currencyType: 'POINTS',
            numberAdults: '4'
          }
        },
        {
          dates: {
            first: '2016-12-22',
            second: '2016-12-24'
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Dallas (Love Field), TX',
          passengers: {
            adults: 4
          },
          _links: null,
          _v1_infoNeededToCheckPrice: {
            type: 'ROUND_TRIP',
            origin: 'HOU',
            destination: 'DAL',
            originDepartureDate: '2016-12-22',
            destinationDepartureDate: '2016-12-24',
            promoCode: '',
            currencyType: 'POINTS',
            numberAdults: '4'
          }
        },
        {
          dates: {
            first: '2016-12-22',
            second: null
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Dallas (Love Field), TX',
          passengers: {
            adults: 4
          },
          _links: null,
          _v1_infoNeededToCheckPrice: {
            type: 'ROUND_TRIP',
            origin: 'HOU',
            destination: 'DAL',
            originDepartureDate: '2016-12-22',
            destinationDepartureDate: '2016-12-22',
            promoCode: '',
            currencyType: 'POINTS',
            numberAdults: '4'
          }
        },
        {
          dates: {
            first: '2016-12-22',
            second: '2016-12-23'
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Dallas (Love Field), TX',
          passengers: {
            adults: 4
          },
          _links: null,
          _v1_infoNeededToCheckPrice: {
            type: 'ROUND_TRIP',
            origin: 'HOU',
            destination: 'DAL',
            originDepartureDate: '2016-12-22',
            destinationDepartureDate: '2016-12-23',
            promoCode: '',
            currencyType: 'POINTS',
            numberAdults: '4'
          }
        }
      ]
    }
  })
};
