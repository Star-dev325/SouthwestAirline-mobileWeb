module.exports = {
  viewReservationViewPage: {
    dates: { first: '2018-11-24', second: null },
    checkInIneligibilityReason: null,
    destinationDescription: 'Austin',
    originAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
    destinationAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'SA Passenger Viewrezerton',
        accountNumber: '601005646',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'SPESHL',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '3347', wifiOnBoard: true },
          { number: '3999', wifiOnBoard: true }
        ],
        travelTime: '4h 0m',
        departureDate: '2018-11-24',
        departureTime: '06:25',
        departureAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        arrivalTime: '09:25',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
            arrivalTime: '07:40',
            departureTime: '08:35',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'ATL - AUS',
    shareDetails: {
      subject: 'Southwest Flight 3347 Atlanta to Austin',
      confirmationInfo: 'Confirmation #: SPESHL',
      passengerInfo: 'Passenger names: SA Passenger Viewrezerton',
      flightInfo: [
        {
          header: 'Departing Flight: Sat, Nov 24, 2018',
          flightInfo: 'Flight #: 3347/3999',
          departureInfo: 'Departs: 06:25 AM ATL',
          stops: ['Stop: Houston (Hobby), TX. Change planes'],
          arrivalInfo: 'Arrives: 09:25 AM AUS',
          travelTime: 'Travel time: 4hr 0 mins'
        }
      ]
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: false,
    isCheckedIn: false,
    isInternational: false,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/SPESHL',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'SA PASSENGER', 'last-name': 'VIEWREZERTON' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/SPESHL',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'AGE', 'last-name': 'SENIOR' }
    },
    _v1_infoNeededToAddCompanion: {
      href: '/v1/air-reservations/reservations/record-locator/SPESHL/companion-reservation/prices',
      method: 'GET',
      query: { 'first-name': 'SA PASSENGER', 'last-name': 'VIEWREZERTON' }
    },
    _links: {
      checkInSessionToken: null,
      earlyBird: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/SPESHL',
        method: 'GET',
        query: { 'first-name': 'SA Passenger', 'last-name': 'Viewrezerton' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/SPESHL',
        method: 'GET',
        query: { 'first-name': 'SA Passenger', 'last-name': 'Viewrezerton' }
      },
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: {
        href: '/v1/mobile-air-booking/page/flights/prices/SPESHL/companion',
        method: 'POST',
        body: {
          companionPricingRequestToken:
            'eyJwcmljaW5nR3JvdXBzIjpbeyJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclR5cGUiOiJBRFVMVCIsImJvdW5kRmxpZ2h0RGV0YWlscyI6W3siZmFyZUZhbWlseSI6IkNPTVBBTklPTiIsInNlZ21lbnRzIjpbeyJtYXJrZXRpbmdDYXJyaWVyQ29kZSI6IldOIiwibWFya2V0aW5nRmxpZ2h0TnVtYmVyIjoiMzM0NyIsIm9yaWdpbmF0aW9uQWlycG9ydENvZGUiOiJBVEwiLCJkZXN0aW5hdGlvbkFpcnBvcnRDb2RlIjoiSE9VIiwiZGVwYXJ0dXJlRGF0ZVRpbWUiOiIyMDE4LTExLTI0VDA2OjI1OjAwLjAwMC0wNTowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMTgtMTEtMjRUMDc6NDA6MDAuMDAwLTA2OjAwIn0seyJtYXJrZXRpbmdDYXJyaWVyQ29kZSI6IldOIiwibWFya2V0aW5nRmxpZ2h0TnVtYmVyIjoiMzk5OSIsIm9yaWdpbmF0aW9uQWlycG9ydENvZGUiOiJIT1UiLCJkZXN0aW5hdGlvbkFpcnBvcnRDb2RlIjoiQVVTIiwiZGVwYXJ0dXJlRGF0ZVRpbWUiOiIyMDE4LTExLTI0VDA4OjM1OjAwLjAwMC0wNjowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMTgtMTEtMjRUMDk6MjU6MDAuMDAwLTA2OjAwIn1dfV19XSwiY3VycmVuY3lUeXBlIjoiQ09NUEFOSU9OIiwiY3VycmVuY3lDb2RlIjoiVVNEIn0='
        }
      },
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/SPESHL',
          method: 'GET',
          query: { 'first-name': 'SA PASSENGER', 'last-name': 'VIEWREZERTON', 'passenger-reference': '2' }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};
