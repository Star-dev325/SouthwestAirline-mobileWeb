module.exports = [
  {
    label: 'Upgraded Boarding Page',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPage',
    type: 'default'
  },
  {
    label: 'Upgraded Boarding Page (iPad Webview)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPage',
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
    label: 'Upgraded Boarding Purchase Page',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'default'
  },
  {
    label: 'Upgraded Boarding Purchase Page (iPad Webview)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
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
    label: 'Upgraded Boarding Purchase Page With Overnight',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'with overnight'
  },
  {
    label: 'Upgraded Boarding Purchase Page Multi Pax Single Segment',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'multi pax single segment'
  },
  {
    label: 'Upgraded Boarding Purchase Page Single Pax Multi Segment',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'single pax multi segment'
  },
  {
    label: 'Upgraded Boarding Purchase Page Multi Pax Multi Segment',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'multi pax multi segment'
  },
  {
    label: 'Upgraded Boarding Purchase Page by Segment',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'by segment'
  },
  {
    label: 'Upgraded Boarding Purchase Page (PayPal)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'pay pal selected'
  },
  {
    label: 'Upgraded Boarding Purchase Page (Apple Pay)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'apple pay selected'
  },
  {
    label: 'Upgraded Boarding Purchase Page (Placement)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'with placement'
  },
  {
    label: 'Upgraded Boarding Purchase Page (Valid Email Id)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'with valid email when logged in'
  },
  {
    label: 'Upgraded Boarding Purchase Page (with cvv field)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'with cvv field when cvv not not verified for selected card'
  },
  {
    label: 'Upgraded Boarding Purchase Page (no cvv entered)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'with cvv field when cvv not not verified for selected card',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Upgraded Boarding Purchase Page (Invalid Email Id)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'with invalid email id',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Upgraded Boarding Purchase Page (Blank Email Id)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPurchasePage',
    type: 'with blank email field',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Upgraded Boarding Payment Page',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPaymentPage',
    type: 'default'
  },
  {
    label: 'Upgraded Boarding Payment Page with Apple Pay',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPaymentPage',
    type: 'with Apple Pay'
  },
  {
    label: 'Upgraded Boarding Payment Page (iPad Webview)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingPaymentPage',
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
    label: 'Upgraded Boarding Confirmation Page Multi Pax Multi Segment',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingConfirmationPage',
    type: 'multi pax multi segment'
  },
  {
    label: 'Upgraded Boarding Confirmation Page Single Pax Single Segment',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingConfirmationPage',
    type: 'single pax single segment'
  },
  {
    label: 'Upgraded Boarding Confirmation Page (iPad Webview)',
    selectedKind: 'pages/upgradedBoarding/upgradedBoardingConfirmationPage',
    type: 'ipad webview',
    viewports: [
      {
        label: 'iPad',
        width: 1024,
        height: 768
      }
    ]
  }
];
