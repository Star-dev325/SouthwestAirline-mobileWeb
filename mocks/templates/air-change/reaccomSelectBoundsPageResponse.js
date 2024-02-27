module.exports = {
  reaccomFlightPage: {
    messages: [
      {
        key: 'REACCOM_CHANGE_FLIGHT',
        header: null,
        body: 'The selected flight(s) may be modified at no additional cost.',
        icon: 'NONE',
        textColor: 'DEFAULT'
      }
    ],
    boundSelections: [
      {
        flightType: 'Departure',
        originalDate: '2019-11-13',
        fromAirport: 'Dallas (Love Field), TX - DAL',
        fromAirportCode: 'DAL',
        toAirport: 'Austin, TX - AUS',
        toAirportCode: 'AUS',
        flight: '750',
        timeDeparts: '20:30',
        timeArrives: '21:30',
        boundFlown: false,
        isSelectable: true
      },
      {
        flightType: 'Return',
        originalDate: '2019-11-14',
        fromAirport: 'Austin, TX - AUS',
        fromAirportCode: 'AUS',
        toAirport: 'Dallas (Love), TX - DAL',
        toAirportCode: 'DAL',
        flight: '973',
        timeDeparts: '17:50',
        timeArrives: '18:55',
        boundFlown: false,
        isSelectable: true
      }
    ],
    _links: {
      reaccomProducts: {
        href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
        method: 'POST',
        body: {
          outbound: {
            date: '2019-11-13',
            'origin-airport': 'DAL',
            'destination-airport': 'AUS',
            isChangeBound: true
          },
          inbound: {
            date: '2019-11-14',
            'origin-airport': 'AUS',
            'destination-airport': 'DAL',
            isChangeBound: true
          },
          shareDataToken: 'reaccom-pnr'
        }
      }
    },
    _meta: {
      hasUnaccompaniedMinor: false,
      isSwabiz: false,
      isBlockMultiBoundSelection: false
    }
  }
};
