module.exports = {
  checkInConfirmationPage: {
    messages: [],
    contactInformationMessage: {
      key: 'VERIFY_CONTACT_METHOD',
      header: null,
      body: 'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.',
      icon: 'NONE',
      textColor: 'DEFAULT',
      linkText: 'Edit contact method'
    },
    title: {
      key: 'CHECKIN__YOURE_ON_STANDBY',
      body: "You're on standby.",
      icon: 'SUCCESS',
      textColor: 'NORMAL'
    },
    flights: [
      {
        boundIndex: 0,
        segmentType: 'DEPARTING',
        departureTime: '06:00',
        gate: null,
        passengers: [
          {
            name: 'John Doe JR',
            hasPrecheck: false,
            boardingGroup: null,
            boardingPosition: null,
            mobileBoardingPassEligible: true,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_STANDBY',
            greyBoxMessage: null,
            specialAssistanceMessage: null,
            travelerSegmentIdentifier: '2301DE560001A00B',
            travelerID: '2301CE560000AF2E',
            checkedIn: false,
            confirmationNumber: '2IGGMN',
            _links: {
              viewPassengerBoardingPass: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/2IGGMN',
                method: 'POST',
                body: {
                  firstName: 'JOHN',
                  lastName: 'DOE',
                  passengerSearchToken:
                    '4hwu96CMUzFZPoXYFAatLHU2CIz7GaVQnvYEaUk2DWt4Q3FHY1BtnmDCM_qym4fZ9Yug8nRA79QZMIBHIhaURMH2O2sVyD-0-EKppsOiizh_tE-eH2BN7xcwroRmWb7vMDAYITD6HZYLSg==',
                  travelerID: ['2301CE560000AF2E']
                },
                labelText: 'Security document'
              }
            }
          }
        ],
        originAirportCode: 'AUS',
        destinationAirportCode: 'MCO',
        flightNumber: '212',
        hasWifi: true,
        travelTime: '2h 30m'
      },
      {
        boundIndex: 0,
        segmentType: 'CHANGE_PLANES',
        departureTime: '10:25',
        gate: null,
        passengers: [
          {
            name: 'John Doe JR',
            hasPrecheck: false,
            boardingGroup: null,
            boardingPosition: null,
            mobileBoardingPassEligible: true,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_STANDBY',
            greyBoxMessage: null,
            specialAssistanceMessage: null,
            travelerSegmentIdentifier: '2301DE560001A00C',
            travelerID: '2301CE560000AF2E',
            checkedIn: false,
            confirmationNumber: '2IGGMN',
            _links: {
              viewPassengerBoardingPass: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/2IGGMN',
                method: 'POST',
                body: {
                  firstName: 'JOHN',
                  lastName: 'DOE',
                  passengerSearchToken:
                    '4hwu96CMUzFZPoXYFAatLHU2CIz7GaVQnvYEaUk2DWt4Q3FHY1BtnmDCM_qym4fZ9Yug8nRA79QZMIBHIhaURMH2O2sVyD-0-EKppsOiizh_tE-eH2BN7xcwroRmWb7vMDAYITD6HZYLSg==',
                  travelerID: ['2301CE560000AF2E']
                },
                labelText: 'Security document'
              }
            }
          }
        ],
        originAirportCode: 'MCO',
        destinationAirportCode: 'ALB',
        flightNumber: '234',
        hasWifi: true,
        travelTime: '2h 40m'
      }
    ],
    _analytics: {
      'checkin.odout': 'AUSALB'
    },
    _links: {
      checkInSessionToken: 'bigtoken',
      viewBoardingPassIssuance: {
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/2IGGMN',
        method: 'POST',
        body: {
          firstName: 'JOHN',
          lastName: 'DOE',
          passengerSearchToken:
            'y2wwz1IneFujVFSIkmB5ZakOxk0R81fmwcdO70gjDWd8WnLZmU6l94S82yYTqGpipXvBlrD-onLOxjGTbXrUKbUJ-zj96HSrfStPTKlpHowFpCXkbRV0QoUNvvAhVG3EHqx5Zb1LBOTj2A==',
          travelerID: ['2301CE560000AF2E']
        },
        labelText: 'Security documents'
      },
      viewAllBoardingPasses: null,
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/2IGGMN',
        method: 'GET',
        query: {
          'passenger-search-token':
            '7a3g62HN2kHvlTQp-lwMXIhWx5b57VWm9qUZtsxDQvXUBScUOa73zDthkiuBdsRYebEhUmFb973hSDGWS65DlPQ1wt_CALIUjK-2gAu0T38KTPUMhuJg9i4cYTxh00nyBkxB6Inp2kFKqg=='
        }
      }
    }
  }
};
