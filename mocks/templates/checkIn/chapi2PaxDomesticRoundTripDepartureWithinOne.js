module.exports = {
  checkInViewReservationPage: {
    pnr: {
      confirmationNumber: 'VEDGD4',
      passengers: ['Yang Lu', 'Ron Claw']
    },
    cards: [
      {
        dates: {
          first: '2017-06-23',
          second: null
        },
        destinationDescription: 'Dallas',
        departureDate: '2017-06-23',
        departureAirport: 'LGA',
        departureTime: '06:00',
        arrivalAirport: 'DAL',
        arrivalTime: '11:35',
        hazmatCheckInDisclaimer:
          "By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.",
        flights: [
          {
            flightNumber: '1177',
            hasWifi: true
          },
          {
            flightNumber: '1085',
            hasWifi: true
          }
        ],
        travelTime: '6h 35m'
      },
      {
        dates: {
          first: '2017-06-23',
          second: null
        },
        destinationDescription: 'New York',
        departureDate: '2017-06-23',
        departureAirport: 'DAL',
        departureTime: '16:10',
        arrivalAirport: 'LGA',
        arrivalTime: '23:00',
        hazmatCheckInDisclaimer:
          "By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.",
        flights: [
          {
            flightNumber: '252',
            hasWifi: false
          },
          {
            flightNumber: '2027',
            hasWifi: true
          }
        ],
        travelTime: '5h 50m'
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
    hazmatText:
      'Federal law forbids the carriage of hazardous materials such as aerosols, fireworks, lithium batteries and flammable liquids aboard the aircraft in your checked or carryon baggage. E-cigarettes are not permitted in checked baggage and must be transported in carryon baggage only.',
    _v1_infoNeededToCheckin: {
      href: '/v1/mobile/reservations/record-locator/VEDGD4/boarding-passes',
      method: 'POST',
      body: {
        names: [
          {
            firstName: 'YANG',
            lastName: 'LU'
          },
          {
            firstName: 'RON',
            lastName: 'CLAW'
          }
        ]
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
      checkIn: {
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          recordLocator: 'VEDGD4',
          checkInSessionToken: '...',
          firstName: 'y',
          lastName: 'lu'
        }
      },
      travelDocuments: [
        {
          href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
          method: 'POST',
          body: {
            recordLocator: 'VEDGD4',
            travelerIdentifier: '2401D99000002FA8',
            checkInSessionToken: '...'
          },
          meta: null
        },
        {
          href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
          method: 'POST',
          body: {
            recordLocator: 'VEDGD4',
            travelerIdentifier: '2401D99000002FA9',
            checkInSessionToken: '...'
          },
          meta: null
        }
      ]
    }
  },
  prefillPassengerAPISDocuments: null
};
