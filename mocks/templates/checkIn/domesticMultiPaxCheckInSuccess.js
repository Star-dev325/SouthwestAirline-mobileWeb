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
            name: 'HELEN WANG',
            hasPrecheck: false,
            boardingGroup: 'A',
            boardingPosition: '02',
            mobileBoardingPassEligible: true,
            mobileBoardingPassIneligibilityErrorCode: '',
            checkedIn: true,
            confirmationNumber: 'RMXAUA',
            travelerID: '0000000000000001',
            travelerSegmentIdentifier: '2301DC5200028241',
            _links: {
              viewPassengerBoardingPass: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
                method: 'POST',
                body: {
                  checkInSessionToken: 'checkInSessionToken',
                  firstName: 'HELEN',
                  lastName: 'WANG',
                  travelerID: ['0000000000000001']
                }
              }
            }
          },
          {
            name: 'ANDREW TERRIS',
            hasPrecheck: false,
            boardingGroup: 'A',
            boardingPosition: '03',
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
            checkedIn: true,
            confirmationNumber: 'RMXAUA',
            travelerID: '0000000000000002',
            travelerSegmentIdentifier: '2301DC5200028242',
            _links: {
              viewPassengerBoardingPass: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
                method: 'POST',
                body: {
                  checkInSessionToken: 'checkInSessionToken',
                  firstName: 'ANDREW',
                  lastName: 'TERRIS',
                  travelerID: ['0000000000000002']
                }
              }
            }
          },
          {
            name: 'Bob Bobster',
            hasPrecheck: false,
            boardingGroup: 'A',
            boardingPosition: '04',
            mobileBoardingPassEligible: false,
            mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
            checkedIn: true,
            confirmationNumber: 'RMXAUA',
            travelerID: '0000000000000003',
            travelerSegmentIdentifier: '2301DC5200028243',
            _links: {
              viewPassengerBoardingPass: {
                href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
                method: 'POST',
                body: {
                  checkInSessionToken: 'checkInSessionToken',
                  firstName: 'Bob',
                  lastName: 'Bobster',
                  travelerID: ['0000000000000003']
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
          recordLocator: 'RMXAUA',
          firstName: 'HELEN',
          lastName: 'WANG',
          travelerID: ['123']
        }
      },
      viewAllBoardingPasses: {
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
        method: 'POST',
        body: {
          checkInSessionToken: 'checkInSessionToken',
          firstName: 'HELEN',
          lastName: 'WANG',
          travelerID: ['0000000000000001', '0000000000000002', '0000000000000003']
        },
        nonSequentialPositionsMessage: null
      },
      viewUpgradedBoarding: {
        href: '/upgraded-boarding',
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
