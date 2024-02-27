module.exports = {
  viewReservationViewPage: {
    dates: { first: '2018-03-02', second: '2018-03-05' },
    checkInIneligibilityReason: null,
    destinationDescription: 'Atlanta',
    originAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
    destinationAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Qianqian Wang',
        accountNumber: '601141461',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'K9ZTCX',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '1728', wifiOnBoard: true },
          { number: '497', wifiOnBoard: true }
        ],
        travelTime: '4h 55m',
        departureDate: '2018-03-02',
        departureTime: '05:40',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '11:35',
        arrivalAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
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
            airport: { name: 'Orlando', state: 'FL', code: 'MCO', country: null },
            arrivalTime: '09:05',
            departureTime: '10:00',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      },
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '1752', wifiOnBoard: true },
          { number: '5857', wifiOnBoard: true }
        ],
        travelTime: '4h 0m',
        departureDate: '2018-03-05',
        departureTime: '06:00',
        departureAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        arrivalTime: '09:00',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'RETURNING',
        standbyFlight: null,
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
            arrivalTime: '07:15',
            departureTime: '08:00',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'AUS - ATL',
    shareDetails: {
      subject: 'Southwest Flight 1728 Austin to Atlanta',
      confirmationInfo: 'Confirmation #: K9ZTCX',
      passengerInfo: 'Passenger names: Qianqian Wang',
      flightInfo: [
        {
          header: 'Departing Flight: Fri, Mar 02, 2018',
          flightInfo: 'Flight #: 1728/497',
          departureInfo: 'Departs: 05:40 AM AUS',
          stops: ['Stop: Orlando, FL. Change planes'],
          arrivalInfo: 'Arrives: 11:35 AM ATL',
          travelTime: 'Travel time: 4hr 55 mins'
        },
        {
          header: 'Returning Flight: Mon, Mar 05, 2018',
          flightInfo: 'Flight #: 1752/5857',
          departureInfo: 'Departs: 06:00 AM ATL',
          stops: ['Stop: Dallas (Love Field), TX. Change planes'],
          arrivalInfo: 'Arrives: 09:00 AM AUS',
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
      href: '/v1/mobile/reservations/record-locator/K9ZTCX',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'QIANQIAN', 'last-name': 'WANG' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/K9ZTCX',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'QIANQIAN', 'last-name': 'WANG' }
    },
    _v1_infoNeededToAddCompanion: {
      href: '/v1/air-reservations/reservations/record-locator/K9ZTCX/companion-reservation/prices',
      method: 'GET',
      query: { 'first-name': 'QIANQIAN', 'last-name': 'WANG' }
    },
    _links: {
      checkInSessionToken: null,
      change: null,
      cancel: null,
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: {
        href: '/v1/mobile-air-booking/page/flights/prices/K9ZTCX/companion',
        method: 'POST',
        body: {
          companionPricingRequestToken:
            'eyJwcmljaW5nR3JvdXBzIjpbeyJudW1iZXJPZlBhc3NlbmdlcnMiOjEsInBhc3NlbmdlclR5cGUiOiJBRFVMVCIsImJvdW5kRmxpZ2h0RGV0YWlscyI6W3siZmFyZUZhbWlseSI6IkNPTVBBTklPTiIsInNlZ21lbnRzIjpbeyJtYXJrZXRpbmdDYXJyaWVyQ29kZSI6IldOIiwibWFya2V0aW5nRmxpZ2h0TnVtYmVyIjoiMTcyOCIsIm9yaWdpbmF0aW9uQWlycG9ydENvZGUiOiJBVVMiLCJkZXN0aW5hdGlvbkFpcnBvcnRDb2RlIjoiTUNPIiwiZGVwYXJ0dXJlRGF0ZVRpbWUiOiIyMDE4LTAzLTAyVDA1OjQwOjAwLjAwMC0wNjowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMTgtMDMtMDJUMDk6MDU6MDAuMDAwLTA1OjAwIn0seyJtYXJrZXRpbmdDYXJyaWVyQ29kZSI6IldOIiwibWFya2V0aW5nRmxpZ2h0TnVtYmVyIjoiNDk3Iiwib3JpZ2luYXRpb25BaXJwb3J0Q29kZSI6Ik1DTyIsImRlc3RpbmF0aW9uQWlycG9ydENvZGUiOiJBVEwiLCJkZXBhcnR1cmVEYXRlVGltZSI6IjIwMTgtMDMtMDJUMTA6MDA6MDAuMDAwLTA1OjAwIiwiYXJyaXZhbERhdGVUaW1lIjoiMjAxOC0wMy0wMlQxMTozNTowMC4wMDAtMDU6MDAifV19LHsiZmFyZUZhbWlseSI6IkNPTVBBTklPTiIsInNlZ21lbnRzIjpbeyJtYXJrZXRpbmdDYXJyaWVyQ29kZSI6IldOIiwibWFya2V0aW5nRmxpZ2h0TnVtYmVyIjoiMTc1MiIsIm9yaWdpbmF0aW9uQWlycG9ydENvZGUiOiJBVEwiLCJkZXN0aW5hdGlvbkFpcnBvcnRDb2RlIjoiREFMIiwiZGVwYXJ0dXJlRGF0ZVRpbWUiOiIyMDE4LTAzLTA1VDA2OjAwOjAwLjAwMC0wNTowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMTgtMDMtMDVUMDc6MTU6MDAuMDAwLTA2OjAwIn0seyJtYXJrZXRpbmdDYXJyaWVyQ29kZSI6IldOIiwibWFya2V0aW5nRmxpZ2h0TnVtYmVyIjoiNTg1NyIsIm9yaWdpbmF0aW9uQWlycG9ydENvZGUiOiJEQUwiLCJkZXN0aW5hdGlvbkFpcnBvcnRDb2RlIjoiQVVTIiwiZGVwYXJ0dXJlRGF0ZVRpbWUiOiIyMDE4LTAzLTA1VDA4OjAwOjAwLjAwMC0wNjowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMTgtMDMtMDVUMDk6MDA6MDAuMDAwLTA2OjAwIn1dfV19XSwiY3VycmVuY3lUeXBlIjoiQ09NUEFOSU9OIiwiY3VycmVuY3lDb2RlIjoiVVNEIn0='
        }
      },
      editPNRPassengers: null
    },
    hasUnaccompaniedMinor: false
  }
};
