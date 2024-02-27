import { storiesOf } from '@storybook/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import ReservationDetail from 'src/shared/components/reservationDetail';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { getModifyBaggageDetailsMockData } from 'test/builders/model/reservationDetailBuilder';

const json = {
  viewReservationViewPage: {
    dates: 'Feb 14',
    checkInIneligibilityReason: 'MBP_UNAVAILABLE_INTL',
    destinationDescription: 'Mexico City',
    originAirport: 'Houston (Hobby), TX',
    destinationAirport: 'Mexico City, MEX',
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Test Jablonski',
        accountNumber: '601422393',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: true,
        hasExtraSeat: true,
        isUnaccompaniedMinor: false
      },
      {
        name: 'Pest Tester',
        accountNumber: '601422395 ',
        passengerReference: '4',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: true,
        checkInIneligibilityReason: 'MBP_UNAVAILABLE_INTL',
        isCheckedIn: true,
        isCheckInEligible: true,
        isUnaccompaniedMinor: false,
        hasExtraSeat: true
      },
      {
        name: 'Vest Tester',
        accountNumber: null,
        passengerReference: '3',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: true,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'VVORRE',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [{ number: '953', wifiOnBoard: true }],
        travelTime: '2h 20m',
        departureDate: '2018-02-14',
        departureTime: '12:50',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '15:10',
        arrivalAirport: { name: 'Mexico City', state: null, code: 'MEX', country: 'Mexico' },
        passengerTypeCounts: { adult: 3, senior: 0 },
        fareType: 'WannaGetAway',
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [],
        isNextDayArrival: false,
        fareProductDetails: {
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        passengers: [{ count: 2, type: 'Passengers', fareType: 'Wanna Get Away' }]
      }
    ],
    pageHeader: 'HOU - MEX',
    shareDetails: {
      subject: 'Southwest Flight 953 Houston (Hobby) to Mexico City',
      confirmationInfo: 'Confirmation #: VVORRE',
      passengerInfo: 'Passenger names: Test Jablonski, Pest Tester, Vest Tester',
      flightInfo: [
        {
          header: 'Departing Flight: Wed, Feb 14, 2018',
          flightInfo: 'Flight #: 953',
          departureInfo: 'Departs: 12:50 PM HOU',
          stops: null,
          arrivalInfo: 'Arrives: 03:10 PM MEX',
          travelTime: 'Travel time: 2hr 20 mins'
        }
      ]
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: true,
    isCheckedIn: false,
    isInternational: false,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    greyBoxPassengerMessage: {
      key: 'NOT_ELIGIBLE_FOR_MBP_KEY',
      header: null,
      body: 'This flight is not eligible for Mobile Boarding Pass. Please visit a kiosk or ticket counter for your boarding passes.'
    },
    _links: {
      checkInSessionToken: '...',
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/VVORRE',
        method: 'GET',
        query: { 'first-name': 'Pest', 'last-name': 'Tester' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/VVORRE',
        method: 'GET',
        query: { 'first-name': 'Pest', 'last-name': 'Tester' }
      },
      viewStandbyList: null,
      checkIn: {
        href: '/v1/mobile-air-operations/page/check-in/VVORRE',
        method: 'GET',
        query: { 'first-name': 'TEST', 'last-name': 'JABLONSKI' }
      },
      viewBoardingPassIssuance: null,
      viewBoardingPositions: {
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        method: 'POST',
        body: { firstName: 'TEST', lastName: 'JABLONSKI', recordLocator: 'VVORRE' }
      },
      addCompanion: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-misc/page/view-reservation/passport-emergency-contact/VVORRE',
          method: 'GET',
          query: { 'first-name': 'TEST', 'last-name': 'JABLONSKI', 'passenger-reference': '2' }
        },
        {
          href: '/v1/mobile-misc/page/view-reservation/passport-emergency-contact/VVORRE',
          method: 'GET',
          query: { 'first-name': 'PEST', 'last-name': 'TESTER', 'passenger-reference': '4' }
        },
        {
          href: '/v1/mobile-misc/page/view-reservation/passport-emergency-contact/VVORRE',
          method: 'GET',
          query: { 'first-name': 'VEST', 'last-name': 'TESTER', 'passenger-reference': '3' }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};

const earlyBirdProps = _.merge({}, json.viewReservationViewPage, {
  _links: {
    earlyBird: {
      href: '/v1/mobile-misc/page/view-reservation/early-bird/VVORRE',
      method: 'GET',
      query: { 'first-name': 'VEST', 'last-name': 'TESTER', 'passenger-reference': '3' }
    }
  }
});

const lapChildrenProps = _.cloneDeep(json.viewReservationViewPage);
lapChildrenProps.bounds[0].passengers.push({ count: 2, type: 'Lap Children' });

const viewReservationSearchRequest = {
  firstName: 'Bob',
  lastName: 'Tucker',
  recordLocator: 'ABC123'
};

const checkBagsButtonProps = _.merge({}, json.viewReservationViewPage, {
  _links: {
    viewModifyCheckedBags: {
      labelText: 'Check standard bags now',
      url: 'mockUrl'
    }
  },
  viewReservationSearchRequest: viewReservationSearchRequest
});

const trackBagsButtonProps = _.merge({}, json.viewReservationViewPage, {
  _links: {
    trackCheckedBags: {
      labelText: 'Track checked bags',
      url: 'mockUrl'
    }
  },
  viewReservationSearchRequest: viewReservationSearchRequest
});

const baggageDetailsProps = {
  ...checkBagsButtonProps,
  _links: {
    ...checkBagsButtonProps._links,
    viewModifyCheckedBags: { labelText: 'Modify checked bags' }
  },
  modifyBaggageDetails: getModifyBaggageDetailsMockData()
};

const store = configureMockStore()({
  app: {
    wcmContent: {
      applicationProperties: {}
    },
    toggles: {
      AIRCRAFT_TYPE_VIEWRES: false
    }
  },
  router: {
    location: {
      search: 'search'
    }
  }
});

storiesOf('components/reservationDetail', module)
  .addDecorator(StoryReduxProvider(store))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return (
      <div>
        <ReservationDetail {..._.merge({}, json.viewReservationViewPage)} />
      </div>
    );
  })
  .add('international', () => {
    return (
      <div>
        <ReservationDetail {..._.merge({}, json.viewReservationViewPage, { isInternational: true })} />
      </div>
    );
  })
  .add('earlyBird display check in button', () => {
    return (
      <div>
        <ReservationDetail {...earlyBirdProps} />
      </div>
    );
  })
  .add('with lap children', () => {
    return (
      <div>
        <ReservationDetail {...lapChildrenProps} />
      </div>
    );
  })
  .add('with check bags button', () => {
    return (
      <div>
        <ReservationDetail {...checkBagsButtonProps} />
      </div>
    );
  })
  .add('with track checked bags button', () => {
    return (
      <div>
        <ReservationDetail {...trackBagsButtonProps} />
      </div>
    );
  })
  .add('with baggage details', () => {
    return (
      <div>
        <ReservationDetail {...baggageDetailsProps} />
      </div>
    );
  });
