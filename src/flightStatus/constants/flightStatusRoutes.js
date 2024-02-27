export const flightStatusRoutes = {
  details: '/air/flight-status/details.html',
  index: {
    canonicalPath: '/air/flight-status/',
    htmlPath: '/air/flight-status/index.html'
  },
  indexWithClearForm: '/air/flight-status/index.html?cleanFlow=true',
  recent: '/air/flight-status/recent.html',
  results: '/air/flight-status/results.html'
};

export const flightStatusOldRoutes = {
  details: '/flight-details',
  index: '/flight-status',
  indexWithClearForm: '/flight-status?cleanFlow=true',
  recent: '/flight-status/recent',
  results: '/flight-status/:from/:to/:date'
};