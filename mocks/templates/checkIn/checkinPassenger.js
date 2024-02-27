const _ = require('lodash');
const passengerTemplate = require('mocks/templates/checkIn/passengersForCheckin');

const passengers = _.map(passengerTemplate, (passenger) => ({
  name: `${passenger.firstName} ${passenger.lastName}`,
  hasPrecheck: true,
  boardingGroup: ['A', 'B', 'C'][Math.floor(Math.random() * 2)],
  boardingPosition: `${Math.floor(Math.random() * 60)}`,
  mobileBoardingPassEligible: false,
  mobileBoardingPassIneligibilityErrorCode: 'BP_UNAVAILABLE_MULTI_PAX',
  checkedIn: true,
  confirmationNumber: 'MISAPI'
}));

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
        departureTime: '09:10',
        passengers,
        flightNumber: '1177',
        hasWifi: true,
        travelTime: '2h 20m',
        boundIndex: 0
      },
      {
        gate: null,
        departureTime: '09:10',
        passengers,
        flightNumber: '39',
        hasWifi: false,
        travelTime: '1h 5m',
        boundIndex: 1
      }
    ],
    _v1_infoNeededToViewBoardingPasses: {
      href: '/v1/mobile/record-locator/MISAPI/mobile-boarding-passes',
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
