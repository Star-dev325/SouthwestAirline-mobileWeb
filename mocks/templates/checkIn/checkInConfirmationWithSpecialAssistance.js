module.exports = {
  checkInConfirmationPage: {
    title: {
      key: 'CHECKIN__YOURE_CHECKEDIN',
      body: "You're checked in!",
      icon: 'SUCCESS',
      textColor: 'NORMAL'
    },
    contactInformationMessage: {
      key: 'VERIFY_CONTACT_METHOD',
      header: null,
      body: 'Please verify that your day of travel contact method is correct so we can keep you updated on changes or cancellations.',
      linkText: 'Edit contact method',
      icon: 'NONE',
      textColor: 'DEFAULT'
    },
    flights: [
      {
        boundIndex: 0,
        departureTime: '09:10',
        gate: '2',
        passengers: [
          {
            name: 'SA Passenger Checkinson',
            hasPrecheck: false,
            boardingGroup: 'A',
            boardingPosition: '02',
            mobileBoardingPassEligible: true,
            mobileBoardingPassIneligibilityErrorCode: '',
            checkedIn: true,
            confirmationNumber: 'SPESHL',
            specialAssistanceMessage: {
              body: 'Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.',
              icon: 'WARNING',
              key: 'DISABILITIES_SPECIAL_ASSISTANCE_MESSAGE'
            },
            _links: {
              viewPassengerBoardingPass: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
                method: 'POST',
                body: {
                  checkInSessionToken: 'checkInSessionToken',
                  firstName: 'SA Passenger',
                  lastName: 'Checkinson',
                  travelerID: ['0000000000000001']
                }
              }
            }
          }
        ],
        flightNumber: '63',
        hasWifi: true,
        travelTime: '1h 5m'
      }
    ],
    _v1_infoNeededToViewBoardingPasses: null,
    _links: {
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/KSC7ZD',
        method: 'GET',
        query: {
          'passenger-search-token':
            'gTySZe5zo-KNy5sMnJnjHvvA1DDQxR9pBV12VsoxCSeqdTLMY0q8odV2MHzl3gBwcUDcABs-G4kvjkvmvKedWtvItHx0oikgfydNA-upvh9SEhpyrh4AXKT1OzKUwuVqr3smep91uiRBsfCvTg'
        }
      },
      viewBoardingPassIssuance: {
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
        method: 'POST',
        body: {
          checkInSessionToken: 'checkInSessionToken',
          recordLocator: 'SPESHL',
          firstName: 'SA PASSENGER',
          lastName: 'CHECKINSON',
          travelerID: ['123']
        }
      }
    }
  }
};
