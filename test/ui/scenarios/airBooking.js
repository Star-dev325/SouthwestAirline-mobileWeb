module.exports = [
  {
    label: 'Air Booking Shopping Landing Page',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'default'
  },
  {
    label: 'Air Booking Shopping Landing Page (homepage redesign)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'homepage redesign'
  },
  {
    label: 'Air Booking Shopping Landing Page(corporate booking company selected)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'corporateBookingCompanySelected',
    clickSelector: '.toggle-switch'
  },
  {
    label: 'Air Booking Shopping Landing Page (multiSelectGroup)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'multiSelectGroup'
  },
  {
    label: 'Air Booking Shopping Landing Page (multiSelectGroup with long airport name)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'multiSelectGroup with long airport name'
  },
  {
    label: 'Air Booking Shopping Landing Page (iPad Webview)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Shopping Landing Page(corporate booking)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'corporateBooking'
  },
  {
    label: 'Air Booking Shopping Landing Page(with Error)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'default',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Shopping Landing Page(homepage redesign with error)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'homepage redesign',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Shopping Landing Page(lap child booking)',
    selectedKind: 'pages/airBooking/shoppingLandingPage',
    type: 'lapChildBooking',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Trip and Price Details Page (Default)',
    selectedKind: 'pages/airBooking/tripAndPriceDetailsPage',
    type: 'default'
  },
  {
    label: 'Air Booking Trip and Price Details Page (iPad Webview)',
    selectedKind: 'pages/airBooking/tripAndPriceDetailsPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Recent Search Page',
    selectedKind: 'pages/airBooking/recentSearchesPage',
    type: 'default'
  },
  {
    label: 'Air Booking Recent Search Page With Lap Child',
    selectedKind: 'pages/airBooking/recentSearchesPage',
    type: 'lap child enabled'
  },
  {
    label: 'Air Booking Recent Search Page (Multiple Aiports)',
    selectedKind: 'pages/airBooking/recentSearchesPage',
    type: 'multiSelectGroup'
  },
  {
    label: 'Air Booking Recent Search Page (Edit)',
    selectedKind: 'pages/airBooking/recentSearchesPage',
    type: 'default',
    clickSelector: 'button'
  },
  {
    label: 'Air Booking Recent Search Page (iPad Webview)',
    selectedKind: 'pages/airBooking/recentSearchesPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 769
      }
    ]
  },
  {
    label: 'Air Booking Recent Search Page With Lap Child (iPad Webview)',
    selectedKind: 'pages/airBooking/recentSearchesPage',
    type: 'lap child enabled ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Select Company Page',
    selectedKind: 'pages/airBooking/selectCompanyPage',
    type: 'default'
  },
  {
    label: 'Air Booking internal Reference Number Select',
    selectedKind: 'pages/airBooking/internalReferenceNumberSelect',
    type: 'default'
  },
  {
    label: 'Air Booking internal Reference Number Select (WithAlternateIrnAllowed)',
    selectedKind: 'pages/airBooking/internalReferenceNumberSelect',
    type: 'alternateIrnAllowed'
  },
  {
    label: 'Air Booking Low Fare Calendar Page ($ RT)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'default'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (PTS RT)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'points roundtrip (domestic)'
  },
  {
    label: 'Air Booking Low Fare Calendar Page ($ OW)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'dollars oneway trip'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (PTS OW)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'points oneway trip (domestic)'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (dollar past date)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'not available dollar fare (past date)'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (points past date)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'not available points fare (past date)'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (no fare available)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'lowestPrice is null (no fare available)'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (PTS RT Intl)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'points roundtrip (intl)'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (PTS OW Intl)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'points oneway trip (intl)'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (fetch prev/next)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'dollars roundtrip fetch prev/next avail'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (unselectable dates)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'roundtrip with not available and unselectable dates greyed'
  },
  {
    label: 'Air Booking Low Fare Calendar Page (without money/points switch)',
    selectedKind: 'pages/airBooking/lowFareCalendarPage',
    type: 'without money/points switch when with lap child'
  },
  {
    label: 'Air Booking Flight Shopping Page (Default)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'default'
  },
  {
    label: 'Air Booking Flight Shopping Page (corporate booking)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'corporateBooking'
  },
  {
    label: 'Air Booking Flight Shopping Page (without money/points switch)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'without money/points switch'
  },
  {
    label: 'Air Booking Flight Shopping Page (with multiSelectGroup bound)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'with multiSelectGroup bound'
  },
  {
    label: 'Air Booking Flight Shopping Page (with multiSelectGroup bound unavailable)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'with multiSelectGroup bound unavailable'
  },
  {
    label: 'Air Booking Flight Shopping Page (with multiSelectGroup bound selected)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'with multiSelectGroup bound selected'
  },
  {
    label: 'Air Booking Flight Shopping Page (with top placement)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'with top placement for outbound flow'
  },
  {
    label: 'Air Booking Flight Shopping Page (with bottom placement)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'with bottom placement for outbound flow'
  },
  {
    label: 'Air Booking Flight Shopping Page (with both placements)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'with both placements for outbound flow'
  },
  {
    label: 'Air Booking Flight Shopping Page (iPad Webview)',
    selectedKind: 'pages/airBooking/flightShoppingPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Price Page(Dollars)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'dollar',
    clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
  },
  {
    label: 'Air Booking Price Page(Points)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'points',
    clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
  },
  {
    label: 'Air Booking Price Page (corporate booking)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'corporateBooking',
    clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
  },
  {
    label: 'Air Booking Price Page(with vacation button and legal footer)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'with vacation button and legal footer',
    clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
  },
  {
    label: 'Air Booking Price Page With Messages',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'with messages'
  },
  {
    label: 'Air Booking Price Page (With PP Upsell)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'with PP Upsell'
  },
  {
    label: 'Air Booking Price Page (with WGA Plus PP Upsell)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'with WGA Plus PP Upsell'
  },
  {
    label: 'Air Booking Price Page (with PP Upsell success widget)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'with PP Upsell success widget'
  },
  {
    label: 'Air Booking Price Page (iPad Webview)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Price Page (iPad Webview With Messages)',
    selectedKind: 'pages/airBooking/pricingSummary',
    type: 'ipad webview with messages',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Reprice Page(Dollars)',
    selectedKind: 'pages/airBooking/repricingConfirmation',
    type: 'dollar',
    clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
  },
  {
    label: 'Air Booking Reprice Page(Points)',
    selectedKind: 'pages/airBooking/repricingConfirmation',
    type: 'points',
    clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
  },
  {
    label: 'Air Booking Reprice Page (corporate booking)',
    selectedKind: 'pages/airBooking/repricingConfirmation',
    type: 'corporateBooking',
    clickSelectors: ['.stops-detail', 'div[data-qa="toggleBreakdown"]']
  },
  {
    label: 'Air Booking Flight Passenger Page(With Empty Form Error)',
    selectedKind: 'pages/airBooking/passengerInformation',
    type: 'default',
    clickSelector: '.continue'
  },
  {
    label: 'Air Booking Flight Passenger Page(With Validation Error)',
    selectedKind: 'pages/airBooking/passengerInformation',
    type: 'withError',
    clickSelector: '.continue'
  },
  {
    label: 'Air Booking Flight Passenger Page (With Frequent Traveler Button)',
    selectedKind: 'pages/airBooking/passengerInformation',
    type: 'with Frequent Traveler Button'
  },
  {
    label: 'Air Booking Flight Passenger Page (Adult With Lap Child)',
    selectedKind: 'pages/airBooking/passengerInformation',
    type: 'adult with lap child'
  },
  {
    label: 'Air Booking Flight Passenger Page (corporate booking)',
    selectedKind: 'pages/airBooking/passengerInformation',
    type: 'corporateBooking',
    clickSelector: '.continue'
  },
  {
    label: 'Air Booking Flight Passenger Page (iPad Webview)',
    selectedKind: 'pages/airBooking/passengerInformation',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Flight Passenger Page Edit Mode',
    selectedKind: 'pages/airBooking/passengers/edit',
    type: 'default'
  },
  {
    label: 'Air Booking Flight Passenger Page Edit Mode (No SharedItineraryEmail)',
    selectedKind: 'pages/airBooking/passengers/edit',
    type: 'no itinerary email'
  },
  {
    label: 'Air Booking Flight Passenger Page Edit Mode (With Frequent Traveler Button)',
    selectedKind: 'pages/airBooking/passengers/edit',
    type: 'with Frequent Traveler Button'
  },
  {
    label: 'Air Booking Flight Passenger Page Edit Mode (International)',
    selectedKind: 'pages/airBooking/passengers/edit',
    type: 'international'
  },
  {
    label: 'Air Booking Flight Passenger Page Edit Mode (iPad Webview)',
    selectedKind: 'pages/airBooking/passengers/edit',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Young Traveler Page default',
    selectedKind: 'pages/airBooking/youngTravelerPage',
    type: 'default'
  },
  {
    label: 'Air Booking Young Traveler Page with round trip',
    selectedKind: 'pages/airBooking/youngTravelerPage',
    type: 'with round trip'
  },
  {
    label: 'Air Booking Young Traveler Edit Page default',
    selectedKind: 'pages/airBooking/youngTravelerEditPage',
    type: 'default'
  },
  {
    label: 'Air Booking Young Traveler Page with swabiz account',
    selectedKind: 'pages/airBooking/youngTravelerPage',
    type: 'with swabiz account'
  },
  {
    label: 'Air Booking Young Traveler Parent Consent default',
    selectedKind: 'pages/airBooking/youngTravelerParentConsent',
    type: 'default'
  },
  {
    label: 'Passenger Personal Information Form (Domestic)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'domestic'
  },
  {
    label: 'Passenger Personal Information Form (International)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'international'
  },
  {
    label: 'Passenger Personal Information Form (Lap Child International)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'lap child international'
  },
  {
    label: 'Passenger Personal Information Form (Edit Domestic)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit domestic'
  },
  {
    label: 'Passenger Personal Information Form (Edit International)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit international'
  },
  {
    label: 'Passenger Personal Information Form (Edit With Disabled Contact Information)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit with disabled contact information'
  },
  {
    label: 'Passenger Personal Information Form (Edit Lap Child Form)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit lap child form'
  },
  {
    label: 'Passenger Personal Information Form (Edit Adult With Lap Child)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit adult form with lap child in booking'
  },
  {
    label: 'Passenger Personal Information Form (Save Frequent Traveler Checkbox)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'save frequent traveler checkbox'
  },
  {
    label: 'Passenger Personal Information Form (Save Frequent Traveler Checkbox With Disclaimer Text)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'save frequent traveler checkbox with disclaimer text'
  },
  {
    label: 'Passenger Personal Information Form (Frequent Traveler Edit Instruction Helper Text)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'frequent traveler edit instruction helper text'
  },
  {
    label: 'Passenger Personal Information Form (Web View Domestic)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'web view domestic'
  },
  {
    label: 'Passenger Personal Information Form (Web View International)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'web view international'
  },
  {
    label: 'Passenger Personal Information Form (Edit Web View Domestic)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit web view domestic'
  },
  {
    label: 'Passenger Personal Information Form (Edit Web View International)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit web view international'
  },
  {
    label: 'Passenger Personal Information Form (Edit Web View Adult with Lap Child)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit web view adult form with lap child in booking'
  },
  {
    label: 'Passenger Personal Information Form (Edit Web View Lap Child Form)',
    selectedKind: 'components/passengerPersonalInfoForm',
    type: 'edit web view lap child form'
  },
  {
    label: 'Air Booking Select Fare (Default)',
    selectedKind: 'components/selectFare',
    type: 'default'
  },
  {
    label: 'Air Booking Select Fare (with one stop)',
    selectedKind: 'components/selectFare',
    type: 'with one stop'
  },
  {
    label: 'Air Booking Select Fare (with two stops and has small flight number)',
    selectedKind: 'components/selectFare',
    type: 'with two stops and has small flight number'
  },
  {
    label: 'Air Booking Select Fare (with two stops and longer flight number)',
    selectedKind: 'components/selectFare',
    type: 'with two stops and longer flight number'
  },
  {
    label: 'Air Booking Select Fare (with overnight)',
    selectedKind: 'components/selectFare',
    type: 'with overnight'
  },
  {
    label: 'Air Booking Select Fare (with top placement)',
    selectedKind: 'components/selectFare',
    type: 'with top placement'
  },
  {
    label: 'Air Booking Select Fare (with bottom placement)',
    selectedKind: 'components/selectFare',
    type: 'with bottom placement'
  },
  {
    label: 'Air Booking Select Fare (with both placements)',
    selectedKind: 'components/selectFare',
    type: 'with both placements'
  },
  {
    label: 'Air Booking Flight Purchase Review Page',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'money',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (EB Ineligible)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'eb ineligible'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With Points)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'points',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With CVV Missing)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'cvvRequiredButMissing',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With Contact Method Missing)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'contactMethodMissing',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With international Contact Method Missing)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'international'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With CVV And Contact Method Missing)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'cvvAndContactMethodMissing',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With Chase Card)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'chaseCardPresent'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With WCM Placements)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'wcm placements'
  },
  {
    label: 'Air Booking Flight Purchase Review Page(With Payment Method Missing)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'paymentMethodMissing'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporateBooking'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with 1 required ghost card)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with 1 required ghost card'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with multiple required ghost card)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with multiple required ghost card'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with 1 ghost card and not required)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with 1 ghost card and not required'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with multiple ghost card and not required)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with multiple ghost card and not required'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with one IRN)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with one IRN'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with multiple IRN)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with multiple IRN'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with multiple IRN and preselected object)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with multiple IRN and preselected object'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with no IRN)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with no IRN'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with multiple optional IRN)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with multiple optional IRN'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with DOC information optional)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with DOC information optional'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (corporate booking with DOC information)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'corporate booking with DOC information'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (with overnight indicator)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'with overnight indicator'
  },
  {
    label: 'Air Booking Flight Purchase Review Page (with review messages)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'with review messages'
  },
  {
    label: 'Air Booking Confirmation Page',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'default',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (with lap child in booking)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with lap child in booking'
  },
  {
    label: 'Air Booking Confirmation Page (with long destination name)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with long destination name'
  },
  {
    label: 'Air Booking Confirmation Page (chase auto provisioning success)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'chase auto provisioning successful',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (chase auto provisioning email)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'chase auto provisioning with email',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (earlyBird)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with early bird',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (with warning icon)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with warning icon',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (Single Pax no Passport)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'Single Pax no Passport',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (Multi Pax no Passport)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'Multi Pax no Passport',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (earlyBirdAndCOS)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with early bird and COS',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (PayPal)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'paypal',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (Apple Pay)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'apple pay',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (with null bounds)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with null bounds',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (with travel funds)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with travel funds'
  },
  {
    label: 'Air Booking Confirmation Page (funds with no expiration date text)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'funds with no expiration date text'
  },
  {
    label: 'Air Booking Confirmation Page (corporate booking)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'corporateBooking',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (corporate booking with irn)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'corporateBooking with irn',
    clickSelector: 'div[data-qa="toggleBreakdown"]'
  },
  {
    label: 'Air Booking Confirmation Page (iPad Webview)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Confirmation Page (with promo bottom placements)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with promo bottom placements'
  },
  {
    label: 'Air Booking Confirmation Page (with split payment)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with split payment'
  },
  {
    label: 'Air Booking Confirmation Page (with young traveler section)',
    selectedKind: 'pages/airBooking/purchaseConfirmation',
    type: 'with young traveler section'
  },
  {
    label: 'Air Booking Purchase Summary Page (with Travel Funds partially paying)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'Travel Funds partially paying'
  },
  {
    label: 'Air Booking Purchase Summary Page (with Travel Funds completely paying)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'Travel Funds completely paying'
  },
  {
    label: 'Air Booking Purchase Summary Page with parent or guardian',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'Parent or Guardian'
  },
  {
    label: 'Air Booking Purchase Summary Page (with Split Pay available)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'Split Pay available'
  },
  {
    label: 'Air Booking Purchase Summary Page (with Split Pay applied)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'Split Pay applied'
  },
  {
    label: 'Air Booking Purchase Summary Page (with billing address incomplete)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'billing address incomplete'
  },
  {
    label: 'Air Booking Purchase Summary Page (with PayPal selected)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'PayPal selected'
  },
  {
    label: 'Air Booking Purchase Summary Page (with Apple Pay selected)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'apple pay selected'
  },
  {
    label: 'Air Booking Purchase Summary Page (with Uplift selected)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'uplift selected'
  },
  {
    label: 'Air Booking Purchase Summary Page (load early bird with placement)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'load early bird from placement'
  },
  {
    label: 'Air Booking Purchase Summary Page (load early bird with placement iPad)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'load early bird from placement iPad',
    viewports: [
      {
        label: 'iPad Pro',
        width: 1024,
        height: 1366
      }
    ]
  },
  {
    label: 'Air Booking Purchase Summary Page (iPad Webview)',
    selectedKind: 'pages/airBooking/purchaseSummary',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Payment Edit Page (multiple saved credit cards)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'multipleSavedCreditCards'
  },
  {
    label: 'Air Booking Payment Edit Page (no saved credit cards)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'noSavedCreditCards'
  },
  {
    label: 'Air Booking Payment Edit Page (logged in edit mode)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'loggedInEditMode'
  },
  {
    label: 'Air Booking Payment Edit Page (guest user)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'guestUser'
  },
  {
    label: 'Air Booking Payment Edit Page (apple pay available)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'applePayAvailable'
  },
  {
    label: 'Air Booking Payment Edit Page (uplift available)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'upliftAvailable'
  },
  {
    label: 'Air Booking Payment Edit Page (uplift disabled)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'upliftDisabled'
  },
  {
    label: 'Air Booking Payment Edit Page (iPad Webview)',
    selectedKind: 'pages/airBooking/paymentEditPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'components/contactMethodForm(domestic air booking)',
    selectedKind: 'components/contactMethodForm',
    type: 'domestic air booking'
  },
  {
    label: 'components/contactMethodForm(international air booking)',
    selectedKind: 'components/contactMethodForm',
    type: 'international air booking'
  },
  {
    label: 'Air Booking Contact Method Page (Default)',
    selectedKind: 'pages/airBooking/airBookingContactMethodPage',
    type: 'default'
  },
  {
    label: 'Air Booking Contact Method Page (iPad Webview)',
    selectedKind: 'pages/airBooking/airBookingContactMethodPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Passenger Passport Page (Default)',
    selectedKind: 'pages/airBooking/airBookingPassengerPassportPage',
    type: 'default'
  },
  {
    label: 'Air Booking Passenger Passport Page (iPad Webview)',
    selectedKind: 'pages/airBooking/airBookingPassengerPassportPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  },
  {
    label: 'Air Booking Frequent Travelers Page (Default)',
    selectedKind: 'pages/airBooking/frequentTravelersPage',
    type: 'default'
  },
  {
    label: 'Air Booking Frequent Travelers Page (with Frequent Traveler Selected)',
    selectedKind: 'pages/airBooking/frequentTravelersPage',
    type: 'with Frequent Traveler Selected'
  },
  {
    label: 'Air Booking Select Passengers Count Page (Default)',
    selectedKind: 'pages/airBooking/selectPassengersCountPage',
    type: 'default'
  },
  {
    label: 'Air Booking Lap Child Form Validations (default)',
    selectedKind: 'pages/airBooking/lapChildPassengerInformation',
    type: 'default',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Lap Child Form Validations (with lapChild below 14 days Error)',
    selectedKind: 'pages/airBooking/lapChildPassengerInformation',
    type: 'with lapChild below 14 days Error',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Lap Child Form Validations (with Associated adult required Error)',
    selectedKind: 'pages/airBooking/lapChildPassengerInformation',
    type: 'with Associated adult required Error',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Lap Child Form Validations (Associated adult should be min 12 years old)',
    selectedKind: 'pages/airBooking/lapChildPassengerInformation',
    type: 'Associated adult should be min 12 years old',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Lap Child Form Validations (Associated adult should be assigned to only one lap child)',
    selectedKind: 'pages/airBooking/lapChildPassengerInformation',
    type: 'Associated adult should be assigned to only one lapchild',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Air Booking Apply Rapid Rewards Page',
    selectedKind: 'pages/airBooking/applyRapidRewardsPage',
    type: 'default'
  },
  {
    label: 'Air Booking Apply Rapid Rewards Page (with not enough points message)',
    selectedKind: 'pages/airBooking/applyRapidRewardsPage',
    type: 'with not enough points message'
  },
  {
    label: 'Air Booking Apply Rapid Rewards Page (offer placement)',
    selectedKind: 'pages/airBooking/applyRapidRewardsPage',
    type: 'with new offer placement'
  },
  {
    label: 'Air Booking Apply Rapid Rewards Page (with applied funds)',
    selectedKind: 'pages/airBooking/applyRapidRewardsPage',
    type: 'with applied funds and updated totals section'
  }
];
