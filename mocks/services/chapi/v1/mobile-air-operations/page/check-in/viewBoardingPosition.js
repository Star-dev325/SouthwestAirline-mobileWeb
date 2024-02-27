'use strict';

const domesticMultiPaxCheckinSuccess = require('mocks/templates/checkIn/domesticMultiPaxCheckInSuccess');

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/view-boarding-details',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    if (body.recordLocator === 'RMXAUA') {
      return domesticMultiPaxCheckinSuccess;
    }

    return {
      checkInConfirmationPage: {
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
            gate: null,
            passengers: [
              {
                name: 'Itest Wang',
                hasPrecheck: false,
                boardingGroup: 'A',
                boardingPosition: '16',
                mobileBoardingPassEligible: false,
                mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
                checkedIn: true,
                confirmationNumber: 'TTHEAU'
              },
              {
                name: 'Ron Phillips',
                hasPrecheck: false,
                boardingGroup: 'A',
                boardingPosition: '17',
                mobileBoardingPassEligible: false,
                mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
                checkedIn: true,
                confirmationNumber: 'TTHEAU'
              }
            ],
            flightNumber: '9044',
            hasWifi: true,
            travelTime: '1h 10m'
          }
        ],
        _v1_infoNeededToViewBoardingPasses: null,
        _links: {
          contactInformation: {
            href: '/v1/mobile-air-booking/page/view-reservation/contact-info/GDSINT',
            method: 'GET',
            query: {
              'passenger-search-token':
                'gTySZe5zo-KNy5sMnJnjHvvA1DDQxR9pBV12VsoxCSeqdTLMY0q8odV2MHzl3gBwcUDcABs-G4kvjkvmvKedWtvItHx0oikgfydNA-upvh9SEhpyrh4AXKT1OzKUwuVqr3smep91uiRBsfCvTg'
            }
          }
        }
      }
    };
  }
};
