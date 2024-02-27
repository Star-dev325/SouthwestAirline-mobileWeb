import _ from 'lodash';

const pageIdentifierTransformer = [
  { matcher: /^\/$|^\/\?/, id: 'home' },
  { matcher: /\/flight-status\/(?!.*html).*/, id: 'flight-status-results' },

  { matcher: /\/flight-status\?.*_modal=originAirport/, id: 'flight-status-from' },
  { matcher: /\/flight-status\?.*_modal=destinationAirport/, id: 'flight-status-to' },

  { matcher: /\/air\/booking\/shopping\?.*_modal=from/, id: 'air-booking-shopping-from' },
  { matcher: /\/air\/booking\/shopping\?.*_modal=to/, id: 'air-booking-shopping-to' },
  { matcher: /\/air\/booking\/shopping\?.*_modal=airBookingCalendar/, id: 'air-booking-shopping-dates' },

  { matcher: /\/air\/change\/shopping\?.*_modal=from/, id: 'air-change-shopping-from' },
  { matcher: /\/air\/change\/shopping\?.*_modal=to/, id: 'air-change-shopping-to' },
  { matcher: /\/air\/change\/shopping\?.*_modal=airBookingCalendar/, id: 'air-change-shopping-dates' },

  { matcher: /\/car\/booking\?.*_modal=pickUpModal/, id: 'car-booking-pick-up' },
  { matcher: /\/car\/booking\?.*_modal=dropOffModal/, id: 'car-booking-drop-off' },
  { matcher: /\/car\/booking\?.*_modal=carBookingCalendar/, id: 'car-booking-dates' },

  { matcher: /\/check-in\/reservation\/\w{6}$/, id: 'checkin-view-reservation' }
];

const _matchPath = (path) =>
  _.get(
    _.find(pageIdentifierTransformer, (t) => path.match(t.matcher)),
    'id'
  );

export const transformPath = (path, search = null) => {
  if (!path) {
    return '';
  }
  let toMatchPath = path;

  if (search) {
    toMatchPath = `${path}${search}`;
  }

  return _matchPath(toMatchPath) || path.replace(/\//g, '-').slice(1);
};

export const raiseEvent = (eventName) => {
  window._trackAnalytics && window._trackAnalytics.event();

  const customEvent = new window.CustomEvent(eventName);

  document.body.dispatchEvent(customEvent);
};

export const raiseSatelliteEvent = (eventName, detail) => {
  if (window._satellite) {
    detail ? window._satellite.track(eventName, detail) : window._satellite.track(eventName);
  }
};

export const customerMessageAnalytics = (messages) => {
  if (messages) {
    const messageKeys = _.chain(messages).map('key').compact().join().value();

    _.set(window, 'data_a.message.customer', messageKeys);
    _.set(window, 'data_a.message.customerdisplay', '1');
  }
};

export const getPageIdentifier = (location) => {
  const { pathname = '', search = '' } = location || {};

  return transformPath(pathname, search);
};
