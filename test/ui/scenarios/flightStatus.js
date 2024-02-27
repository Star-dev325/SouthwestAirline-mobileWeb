module.exports = [
  {
    label: 'Flight Status Landing Page',
    selectedKind: 'pages/flightStatus/FlightStatusLandingPage',
    type: 'default'
  },
  {
    label: 'Flight Status Landing Page (web view)',
    selectedKind: 'pages/flightStatus/FlightStatusLandingPage',
    type: 'webview',
    viewports: [
      {
        label: 'iPhone4',
        width: 320,
        height: 480
      },
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Flight Status Landing Page (with validation errors)',
    selectedKind: 'pages/flightStatus/FlightStatusLandingPage',
    type: 'default',
    clickSelector: '.button--yellow'
  },
  {
    label: 'Flight Status Landing Page with Aircraft Type',
    selectedKind: 'components/FlightStatusDetailCard',
    type: 'flight status type toggle ON'
  },
  {
    label: 'Flight Status Search Results Page',
    selectedKind: 'pages/flightStatus/SearchFlightResultsPage',
    type: 'default'
  },
  {
    label: 'Flight Status Search Results Page (web view)',
    selectedKind: 'pages/flightStatus/SearchFlightResultsPage',
    type: 'webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Flight Status Details Page',
    selectedKind: 'pages/flightStatus/FlightDetailsPage',
    type: 'with Connection'
  },
  {
    label: 'Flight Status Details Page (web view)',
    selectedKind: 'pages/flightStatus/FlightDetailsPage',
    type: 'webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Flight Status Recent Searches Page',
    selectedKind: 'pages/flightStatus/FlightStatusRecentPage',
    type: 'default'
  },
  {
    label: 'Flight Status Recent Searches Page (web view)',
    selectedKind: 'pages/flightStatus/FlightStatusRecentPageWebView',
    type: 'webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Flight Status Recent Searches Page(Edit)',
    selectedKind: 'pages/flightStatus/FlightStatusRecentPage',
    type: 'default',
    clickSelector: '.button'
  },
  {
    label: 'Flight Status Recent Searches Page(Empty List)',
    selectedKind: 'pages/flightStatus/FlightStatusRecentPage',
    type: 'empty list'
  }
];
