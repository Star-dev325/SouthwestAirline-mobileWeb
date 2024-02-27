module.exports = {
  changeFlightPage: {
    messages: [
      {
        key: 'CHANGE_DW_SUMMARY',
        icon: 'WARNING',
        textColor: 'NEGATIVE',
        header: 'You may change your travel date/time at no additional cost.',
        body: 'Circumstances beyond our control (weather, etc.) are creating disruptions to our scheduled service and a flight(s) on which you are currently booked may be adversely affected. To minimize your inconvenience, we are offering the one time opportunity to change your flight date(s) and/or time(s) at no additional cost in accordance with our established recommended practices.',
        note: 'None'
      },
      {
        key: 'CHANGE_FEE_DW_MESSAGE',
        icon: 'None',
        textColor: 'DEFAULT',
        header: 'none',
        body: "Select the flight(s) you'd like to modify:",
        note: 'None'
      },
      {
        key: 'CHANGE_DW_DEP_STATIONS',
        icon: 'None',
        textColor: 'NEGATIVE',
        header: 'For your departing flight:',
        body: 'Departure Airport: Dallas (Love Field), TX (DAL) . Arrival Airport: Boise, ID (BOI) ',
        note: 'None'
      },
      {
        key: 'CHANGE_DW_DEP_DATE',
        icon: 'None',
        textColor: 'NEGATIVE',
        header: 'none',
        body: 'Available Travel Dates: You can move your departing flight by up to 14 days at no additional cost.',
        note: 'None'
      },
      {
        key: 'CHANGE_DW_RET_DATE',
        icon: 'None',
        textColor: 'NEGATIVE',
        header: 'None',
        body: 'Available Travel Dates: You can move your returning flight by up to 14 days at no additional cost.',
        note: 'None'
      },
      {
        key: 'CHANGE_DW_RET_STATIONS',
        icon: 'None',
        textColor: 'NEGATIVE',
        header: 'For your returning flight:',
        body: 'Departure Airport: Boise, ID (BOI) . Arrival Airport: Dallas (Love Field), TX (DAL) ',
        note: 'None'
      }
    ],
    dynamicWaivers: [
      {
        alternativeDepartureCities: ['DAL'],
        alternativeArrivalCities: ['BOI'],
        eligibleStartDate: '2019-02-05',
        eligibleEndDate: '2019-02-20',
        rangeType: 'PLUS_MINUS',
        rangeValue: '30',
        flightType: 'DEPARTURE',
        firstTravelDate: null,
        lastTravelDate: null,
        calculatedStartDate: '2019-02-05',
        calculatedEndDate: '2019-03-08'
      },
      {
        alternativeDepartureCities: ['BOI'],
        alternativeArrivalCities: ['DAL'],
        eligibleStartDate: '2019-02-05',
        eligibleEndDate: '2019-02-23',
        rangeType: 'PLUS_MINUS',
        rangeValue: '30',
        flightType: 'RETURN',
        firstTravelDate: null,
        lastTravelDate: null,
        calculatedStartDate: '2019-02-05',
        calculatedEndDate: '2019-03-11'
      }
    ],
    selectionMode: 'ALL',
    boundSelections: [
      {
        flightType: 'Departure',
        originalDate: '2019-02-06',
        fromAirport: 'Dallas (Love Field), TX (DAL)',
        fromAirportCode: 'DAL',
        toAirport: 'Boise, ID (BOI)',
        toAirportCode: 'BOI',
        flight: '859/975',
        timeDeparts: '06:00',
        timeArrives: '13:40',
        showWarningIcon: true,
        isSelectable: true
      },
      {
        flightType: 'Return',
        originalDate: '2019-02-09',
        fromAirport: 'Boise, ID (BOI)',
        fromAirportCode: 'BOI',
        toAirport: 'Dallas (Love Field), TX (DAL)',
        toAirportCode: 'DAL',
        flight: '5513/4902',
        timeDeparts: '07:15',
        timeArrives: '14:45',
        showWarningIcon: true,
        isSelectable: true
      }
    ],
    _links: {
      changeShopping: {
        href: 'v1/mobile-air-booking/page/flights/change/shopping',
        method: 'POST',
        body: [{ boundReference: 'CHDWDE-1' }, { boundReference: 'CHDWDE-2' }]
      }
    },
    _meta: { hasSenior: false, hasUnaccompaniedMinor: false, showSeniorFares: true, isSwabiz: false }
  }
};
