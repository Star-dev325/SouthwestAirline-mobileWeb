module.exports = [
  {
    label: 'Car Booking Search Form',
    selectedKind: 'components/carBookingSearchForm',
    type: 'default'
  },
  {
    label: 'Car Booking Search Page',
    selectedKind: 'pages/carBooking/carBookingSearchPage',
    type: 'default'
  },
  {
    label: 'Car Booking Search Page (web view)',
    selectedKind: 'pages/carBooking/carBookingSearchPageWebView',
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
    label: 'Car Booking Search Page (with validation errors)',
    selectedKind: 'pages/carBooking/carBookingSearchPage',
    type: 'default',
    clickSelectors: ['.button--yellow']
  },
  {
    label: 'Car Shopping Results Page',
    selectedKind: 'pages/carBooking/carShoppingResultsPage',
    type: 'default'
  },
  {
    label: 'Car Shopping Results Page (web view)',
    selectedKind: 'pages/carBooking/carShoppingResultsPage',
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
    label: 'Car Shopping Results Page (promos)',
    selectedKind: 'pages/carBooking/carShoppingResultsPage',
    type: 'with valid and invalid promo codes'
  },
  {
    label: 'Car Booking Pricing Page',
    selectedKind: 'pages/carBooking/carBookingPricingPage',
    type: 'default'
  },
  {
    label: 'Car Booking Pricing Page (web view)',
    selectedKind: 'pages/carBooking/carBookingPricingPage',
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
    label: 'Car Booking Purchase Page',
    selectedKind: 'pages/carBooking/carBookingPurchasePage',
    type: 'default'
  },
  {
    label: 'Car Booking Purchase Page (web view)',
    selectedKind: 'pages/carBooking/carBookingPurchasePage',
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
    label: 'Car Booking Purchase Page (log in for faster checkout)',
    selectedKind: 'pages/carBooking/carBookingPurchasePage',
    type: 'log in for faster checkout'
  },
  {
    label: 'Car Booking Purchase Page(logged in)',
    selectedKind: 'pages/carBooking/carBookingPurchasePage',
    type: 'logged in'
  },
  {
    label: 'Car Booking Driver Info Edit Pricing Page',
    selectedKind: 'pages/carBooking/driverInfoEditPage',
    type: 'default'
  },
  {
    label: 'Car Booking Driver Info Edit Pricing Page(errors)',
    selectedKind: 'pages/carBooking/driverInfoEditPage',
    type: 'no default values',
    clickSelectors: ['.button']
  },
  {
    label: 'Car Booking Confirmation Pricing Page',
    selectedKind: 'pages/carBooking/carBookingConfirmationPage',
    type: 'default'
  },
  {
    label: 'Car Booking Confirmation Pricing Page (web view)',
    selectedKind: 'pages/carBooking/carBookingConfirmationPageWebView',
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
    label: 'Car Booking Confirmation Pricing Page(show price)',
    selectedKind: 'pages/carBooking/carBookingConfirmationPage',
    type: 'default',
    clickSelectors: ['div[data-qa="price-breakdown"]']
  },
  {
    label: 'Car Booking Recent Searches Page',
    selectedKind: 'pages/carBooking/carBookingRecentSearchesPage',
    type: 'default'
  },
  {
    label: 'Car Booking Recent Searches Page (web view)',
    selectedKind: 'pages/carBooking/carBookingRecentSearchesPage',
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
    label: 'Car Booking Recent Searches Page(edit)',
    selectedKind: 'pages/carBooking/carBookingRecentSearchesPage',
    type: 'default',
    clickSelectors: ['.button']
  },
  {
    label: 'Car Booking Recent Searches Page(empty list)',
    selectedKind: 'pages/carBooking/carBookingRecentSearchesPage',
    type: 'empty list'
  },
  {
    label: 'Car Booking Vendor Terms And Conditions Page',
    selectedKind: 'pages/carBooking/vendorTermsAndConditionsPage',
    type: 'default'
  }
];
