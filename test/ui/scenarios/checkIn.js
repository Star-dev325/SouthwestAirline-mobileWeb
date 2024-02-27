module.exports = [
  {
    label: 'Check In Boarding Positions Page',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'default'
  },
  {
    label: 'Check In Boarding Positions Page with view all boarding passes button',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'view all boarding passes button'
  },
  {
    label: 'Check In Boarding Positions Page with view edit contact method link/text',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'view edit contact method message link'
  },
  {
    label: 'Check In Boarding Positions Page with Upgrading Boarding Placement',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'with upgrading boarding placement'
  },
  {
    label: 'Check In Boarding Positions Page with Check Standard Bags Now',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'with check baggage button'
  },
  {
    label: 'Check In Boarding Positions Page with Track Check Bags Button',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'with track check bags'
  },
  {
    label: 'Check In Boarding Positions Page without Upgrading Boarding Placement',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'without upgrading boarding placement'
  },
  {
    label: 'Check In Boarding Positions Page with Contact Information Message',
    selectedKind: 'pages/checkIn/boardingPositionsPage',
    type: 'with contact information message'
  },
  {
    label: 'Check In Passport Page',
    selectedKind: 'pages/checkIn/checkInPassportPage',
    type: 'default'
  },
  {
    label: 'Check In Passport Page(prefilled passport information)',
    selectedKind: 'pages/checkIn/checkInPassportPage',
    type: 'prefilled'
  },
  {
    label: 'Check In Additional Passport Info Page',
    selectedKind: 'pages/checkIn/additionalPassportInfoPage',
    type: 'default'
  },
  {
    label: 'Check In Additional Passport Info Page (form data empty)',
    selectedKind: 'pages/checkIn/additionalPassportInfoPage',
    type: 'default',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'check in APIS permanentResidentCard form (default)',
    selectedKind: 'component/checkIn/CheckInAPISPermanentResidentCardForm',
    type: 'default'
  },
  {
    label: 'check in APIS permanentResidentCard form (form data empty)',
    selectedKind: 'component/checkIn/CheckInAPISPermanentResidentCardForm',
    type: 'empty',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'check in APIS visa form (default)',
    selectedKind: 'component/checkIn/CheckInAPISVisaForm',
    type: 'default'
  },
  {
    label: 'check in APIS visa form (form data empty)',
    selectedKind: 'component/checkIn/CheckInAPISVisaForm',
    type: 'empty',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'check in APIS destination form (default)',
    selectedKind: 'component/checkIn/checkInAPISDestinationForm',
    type: 'default'
  },
  {
    label: 'check in APIS destination form (form with error)',
    selectedKind: 'component/checkIn/checkInAPISDestinationForm',
    type: 'default',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'check in APIS destination contact-tracing form',
    selectedKind: 'component/checkIn/checkInAPISDestinationForm',
    type: 'contact-tracing'
  },
  {
    label: 'check in APIS destination contact-tracing form (form with error)',
    selectedKind: 'component/checkIn/checkInAPISDestinationForm',
    type: 'contact-tracing',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'check in APIS destination contact-tracing form (first passenger)',
    selectedKind: 'component/checkIn/checkInAPISDestinationForm',
    type: 'contact-tracing-pax-one'
  },
  {
    label: 'check in mobile boarding pass (default)',
    selectedKind: 'pages/checkIn/mobileBoardingPassPage',
    type: 'default'
  },
  {
    label: 'check in APIS destination form (multiple boarding passes)',
    selectedKind: 'pages/checkIn/mobileBoardingPassPage',
    type: 'multiple boarding passes'
  },
  {
    label: 'check in mobile boarding pass security document',
    selectedKind: 'pages/checkIn/mobileBoardingPassPage',
    type: 'security document'
  },
  {
    label: 'check in mobile boarding pass drink coupon header',
    selectedKind: 'pages/checkIn/mobileBoardingPassPage',
    type: 'drink coupon'
  },
  {
    label: 'choose Mobile Boarding Passes Page (multi-pax)',
    selectedKind: 'pages/checkIn/chooseMobileBoardingPassesPage',
    type: 'default'
  },
  {
    label: 'choose Mobile Boarding Passes Page (multi-pax w/ connection)',
    selectedKind: 'pages/checkIn/chooseMobileBoardingPassesPage',
    type: 'with connection'
  },
  {
    label: 'choose Mobile Boarding Passes Page (with ineligible pax)',
    selectedKind: 'pages/checkIn/chooseMobileBoardingPassesPage',
    type: 'with ineligible pax'
  },
  {
    label: 'choose Mobile Boarding Passes Page with lap infants',
    selectedKind: 'pages/checkIn/chooseMobileBoardingPassesPage',
    type: 'with lap infants'
  },
  {
    label: 'choose Mobile Boarding Passes Page (error)',
    selectedKind: 'pages/checkIn/chooseMobileBoardingPassesPage',
    type: 'default',
    clickSelectors: [
      'div[data-qa="checkbox-allPasses"]',
      'div[data-qa="checkbox-0-0000000000000001-2301DC520002823E"]',
      'div[data-qa="checkbox-0-0000000000000002-2301DC5200028240"]',
      'button[type="submit"]'
    ]
  },
  {
    label: 'Check In Confirmation Page',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'default'
  },
  {
    label: 'Check In Confirmation Page view all boarding passes button',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'view all boarding passes button'
  },
  {
    label: 'Check In Confirmation Page view edit contact method link/text',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'view edit contact method message link'
  },
  {
    label: 'Check In Confirmation Page view health documents',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'view health documents'
  },
  {
    label: 'Check In Confirmation Page view upgraded boarding button',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'view upgraded boarding button'
  },
  {
    label: 'Check In Confirmation Page view upgraded boarding button and health documents',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'view upgraded boarding button and health documents'
  },
  {
    label: 'Check In Confirmation Page view upgraded boarding button and ineligible boarding pass',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'view upgraded boarding button and ineligible boarding pass'
  },
  {
    label: 'Check In Confirmation Page with upgrade to business select placement',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with upgrade to business select placement'
  },
  {
    label: 'Check In Confirmation Page with upgraded boarding placement',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with upgraded boarding placement'
  },
  {
    label: 'Check In Confirmation Page with getaway placement',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with getaway placement'
  },
  {
    label: 'Check In Confirmation Page with check standard bags now button',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with check standard bags now button'
  },
  {
    label: 'Check In Confirmation Page with view boarding pass and check bags buttons',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with view boarding pass and check bags buttons'
  },
  {
    label: 'Check In Confirmation Page with edit contact information, view boarding pass, and check bags buttons',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with edit contact information, view boarding pass, and check bags buttons'
  },
  {
    label: 'Check In Confirmation Page with edit contact information and check bags button',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with edit contact information and check bags button'
  },
  {
    label: 'Check In Confirmation Page with with overnight indicator',
    selectedKind: 'pages/checkIn/checkInConfirmationPage',
    type: 'with overnight indicator'
  },
  {
    label: 'Hazmat Declaration Page',
    selectedKind: 'pages/checkIn/hazmatDeclarationPage',
    type: 'default'
  }
];
