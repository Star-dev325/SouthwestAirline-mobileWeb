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
        gate: null,
        passengers: [
          {
            name: 'Yang Lu',
            hasPrecheck: false,
            boardingGroup: null,
            boardingPosition: null,
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: '',
            checkedIn: false,
            confirmationNumber: 'VDWE69'
          }
        ],
        departureTime: '09:10',
        flightNumber: '1177',
        hasWifi: true,
        travelTime: '2h 20m',
        boundIndex: 0
      },
      {
        gate: null,
        passengers: [
          {
            name: 'Yang Lu',
            hasPrecheck: false,
            boardingGroup: null,
            boardingPosition: null,
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: '',
            checkedIn: false,
            confirmationNumber: 'VDWE69'
          }
        ],
        flightNumber: '1085',
        hasWifi: true,
        travelTime: '2h 10m',
        boundIndex: 0
      },
      {
        gate: null,
        passengers: [
          {
            name: 'Yang Lu',
            hasPrecheck: false,
            boardingGroup: 'A',
            boardingPosition: '16',
            mobileBoardingPassEligible: true,
            mobileBoardingPassIneligibilityErrorCode: '',
            checkedIn: true,
            confirmationNumber: 'VDWE69'
          }
        ],
        departureTime: '09:10',
        flightNumber: '39',
        hasWifi: false,
        travelTime: '1h 5m',
        boundIndex: 1
      },
      {
        gate: null,
        passengers: [
          {
            name: 'Yang Lu',
            hasPrecheck: false,
            boardingGroup: 'A',
            boardingPosition: '16',
            mobileBoardingPassEligible: true,
            mobileBoardingPassIneligibilityErrorCode: '',
            checkedIn: true,
            confirmationNumber: 'VDWE69'
          }
        ],
        flightNumber: '1723',
        hasWifi: true,
        travelTime: '3h 35m',
        boundIndex: 1
      }
    ],
    _v1_infoNeededToViewBoardingPasses: {
      href: '/v1/mobile/record-locator/VDWE69/mobile-boarding-passes',
      method: 'GET',
      query: {
        'first-name': 'YANG',
        'last-name': 'LU'
      }
    },
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
          recordLocator: 'RMXAUA',
          firstName: 'HELEN',
          lastName: 'WANG',
          travelerID: ['123']
        }
      }
    }
  }
};
