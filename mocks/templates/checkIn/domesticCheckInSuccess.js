module.exports = {
  checkInConfirmationPage: {
    title: {
      key: 'CHECKIN__YOURE_CHECKEDIN',
      body: "You're checked in!",
      icon: 'SUCCESS',
      textColor: 'NORMAL'
    },
    messages: [
      {
        body: 'Certain fruits, vegetables, plants, and flowers are prohibited in carryon items when traveling between Hawaiian islands.',
        header: 'Interisland Carryon Restrictions:',
        icon: 'NONE',
        key: 'INTER_ISLAND__MESSAGE',
        learnMoreUrl: 'https://www.southwest.com/html/air/newservicehawaii.html',
        textColor: 'NORMAL'
      }
    ],
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
            confirmationNumber: 'R4ZGJ3'
          }
        ],
        flightNumber: '388',
        hasWifi: true,
        travelTime: '12h 10m'
      },
      {
        boundIndex: 0,
        departureTime: '09:10',
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
            confirmationNumber: 'R4ZGJ3',
            _links: {
              viewPassengerBoardingPass: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
                method: 'POST',
                body: {
                  checkInSessionToken: 'checkInSessionToken',
                  firstName: 'Yang',
                  lastName: 'Lu',
                  travelerID: ['0000000000000001']
                }
              }
            }
          }
        ],
        flightNumber: '1179',
        hasWifi: true,
        travelTime: '1h 15m'
      }
    ],
    _v1_infoNeededToViewBoardingPasses: {
      href: '/v1/mobile/record-locator/R4ZGJ3/mobile-boarding-passes',
      method: 'GET',
      query: { 'first-name': 'YANG', 'last-name': 'LU' }
    },
    _links: {
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
      },
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/KSC7ZD',
        method: 'GET',
        query: {
          'passenger-search-token':
            'gTySZe5zo-KNy5sMnJnjHvvA1DDQxR9pBV12VsoxCSeqdTLMY0q8odV2MHzl3gBwcUDcABs-G4kvjkvmvKedWtvItHx0oikgfydNA-upvh9SEhpyrh4AXKT1OzKUwuVqr3smep91uiRBsfCvTg'
        }
      }
    }
  }
};
