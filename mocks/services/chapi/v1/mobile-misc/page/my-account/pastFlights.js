module.exports = {
  path: '/chapi/v1/mobile-misc/page/my-account/past-flights',
  method: 'GET',
  cache: false,
  template: () => ({
    pastFlightsPage: {
      numberOfPastFlights: 6,
      pastFlights: [
        {
          dates: {
            first: '2015-04-07',
            second: '2015-05-09'
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Dallas (Love Field), TX',
          confirmationNumber: 'F4HYUR',
          isRebookable: true,
          _infoNeededToRebook: {
            type: 'ROUND_TRIP',
            origin: 'HOU',
            destination: 'DAL'
          }
        },
        {
          dates: {
            first: '2015-04-07',
            second: null
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Dallas (Love Field), TX',
          confirmationNumber: 'F4HYUR',
          isRebookable: true,
          _infoNeededToRebook: {
            type: 'ROUND_TRIP',
            origin: 'HOU',
            destination: 'DAL'
          }
        },
        {
          dates: {
            first: '2015-04-07',
            second: null
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Dallas (Love Field), TX',
          confirmationNumber: 'F4HYUR',
          isRebookable: true,
          _infoNeededToRebook: {
            type: 'ONE_WAY',
            origin: 'HOU',
            destination: 'DAL'
          }
        },
        {
          dates: {
            first: '2015-04-07',
            second: null
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Aruba, Aruba',
          confirmationNumber: 'F4HYUR',
          isRebookable: false,
          _infoNeededToRebook: {
            type: 'ONE_WAY',
            origin: 'HOU',
            destination: 'AUA'
          }
        },
        {
          dates: {
            first: '2015-04-07',
            second: '2015-04-08'
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Aruba, Aruba',
          confirmationNumber: 'F4HYUR',
          isRebookable: false,
          _infoNeededToRebook: {
            type: 'ROUND_TRIP',
            origin: 'HOU',
            destination: 'AUA'
          }
        },
        {
          dates: {
            first: '2015-04-07',
            second: null
          },
          originDescription: 'Houston (Hobby), TX',
          destinationDescription: 'Aruba, Aruba',
          confirmationNumber: 'F4HYUR',
          isRebookable: false,
          _infoNeededToRebook: {
            type: 'ROUND_TRIP',
            origin: 'HOU',
            destination: 'AUA'
          }
        }
      ]
    }
  })
};
