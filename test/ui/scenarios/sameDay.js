module.exports = [
  {
    label: 'Same Day Bound Select Page',
    selectedKind: 'pages/sameDay/sameDayBoundSelectionPage',
    type: 'Bound select page'
  },
  {
    label: 'Same Day Shopping page (default)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'default'
  },
  {
    label: 'Same Day Shopping page (with return)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with return'
  },
  {
    label: 'Same Day Shopping page (with next day)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with next day'
  },
  {
    label: 'Same Day Shopping page (with stop description)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with stop description'
  },
  {
    label: 'Same Day Shopping page (with expanded cards)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'default',
    clickAllSelector: '[data-testid="flightProducts"]'
  },
  {
    label: 'Same Day Shopping page (with expanded cards when sameDay changes are not allowed)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with expanded cards when sameDay changes are not allowed',
    clickAllSelector: '[data-testid="flightProducts"]'
  },
  {
    label: 'Same Day Shopping page (with expanded cards when sameDay changes are allowed)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with expanded cards when sameDay changes are allowed',
    clickAllSelector: '[data-testid="flightProducts"]'
  },
  {
    label: 'Same Day Shopping page (with double connects)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with double connects'
  },
  {
    label: 'Same Day Shopping page (with double connects and max flight length)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with double connects and max flight length'
  },
  {
    label: 'Same Day Shopping page (with allow same day change and with label subText)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with allow same day change and with label subText'
  },
  {
    label: 'Same Day Shopping page (with expanded cards with PTS label)',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with expanded cards with PTS label',
    clickAllSelector: '[data-testid="flightProducts"]'
  },
  {
    label: 'Same Day Price Difference page (default)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'default'
  },
  {
    label: 'Same Day Price Difference page (with email recipient)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with email recipient'
  },
  {
    label: 'Same Day Price Difference page (with invalid email recipient)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with invalid email recipient',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Same Day Price Difference page (with no email validation)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'default',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Same Day Price Difference page (With Payment Method)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with payment method'
  },
  {
    label: 'Same Day Price Difference page (With Payment Method Missing)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with payment method missing'
  },
  {
    label: 'Same Day Price Difference page (with points downgrade scenario)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with points downgrade scenario'
  },
  {
    label: 'Same Day Price Difference page (with points credit and tax dollar amount due scenario)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with points downgrade and tax dollar amount due scenario'
  },
  {
    label: 'Same Day Price Difference page (with points upgrade and tax dollar credit due scenario)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with points upgrade and tax dollar credit due scenario'
  },
  {
    label: 'Same Day Price Difference page (with points even exchange scenario)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with points even exchange scenario'
  },
  {
    label: 'Same Day Price Difference page (with points even exchange and tax refund scenario)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with points even exchange and tax refund scenario'
  },
  {
    label: 'Same Day Price Difference page (with points upgrade scenario)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with points upgrade scenario'
  },
  {
    label: 'Same Day Price Difference page (with refund scenario)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with refund scenario'
  },
  {
    label: 'Same Day Price Difference page (without email field)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'without email field'
  },
  {
    label: 'Same Day Price Difference page (With CVV Missing For The Selected Card)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with cvv missing for the selected card'
  },
  {
    label: 'Same Day Price Difference page (with PayPal selected)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'PayPal selected'
  },
  {
    label: 'Same Day Price Difference page (with Apple Pay selected)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'apple pay selected'
  },
  {
    label: 'Same Day Price Difference page (with Uplift selected)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'uplift selected'
  },
  {
    label: 'Same Day Price Difference page (with webView on)',
    selectedKind: 'pages/sameDay/SameDayPriceDifferencePage',
    type: 'with webView on'
  },
  {
    label: 'Same Day Purchase Confirmation page (default)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'default'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points and tax amount due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points and tax amount due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points and no tax amount due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points and no tax amount due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points and tax credit due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points and tax credit due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points and no tax credit due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points and no tax credit due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with credit due and stand by)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with credit due and stand by'
  },
  {
    label: 'Same Day Purchase Confirmation page (with tax credit due and stand by)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with tax credit due and stand by'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points and tax due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points and tax due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points even exchange and tax due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points even exchange and tax due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points even exchange and tax credit due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points even exchange and tax credit due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points even exchange and tax credit due standby)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points even exchange and tax credit due standby'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points credit and tax credit due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points credit and tax credit due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with no points due and tax credit)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with no points due and tax credit'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points credit and tax due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points credit and tax due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points due and tax credit due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points due and tax credit due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points due and no tax due)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points due and no tax due'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points due only)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points due only'
  },
  {
    label: 'Same Day Purchase Confirmation page (with amount due only)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with amount due only'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points even exchange only)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points even exchange only'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points even exchange only standby)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points even exchange only standby'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points credit only)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points credit only'
  },
  {
    label: 'Same Day Purchase Confirmation page (with points credit only standby)',
    selectedKind: 'pages/sameDay/SameDayPurchaseConfirmationPage',
    type: 'with points credit only standby'
  },
  {
    label: 'Same Day Select Fare page (default)',
    selectedKind: 'pages/sameDay/sameDaySelectFarePage',
    type: 'default'
  },
  {
    label: 'Same Day Select Fare page (next day)',
    selectedKind: 'pages/sameDay/sameDaySelectFarePage',
    type: 'next day'
  },
  {
    label: 'Same Day Select Fare page (overnight)',
    selectedKind: 'pages/sameDay/sameDaySelectFarePage',
    type: 'overnight'
  },
  {
    label: 'Same Day Payment Page (New Card)',
    selectedKind: 'pages/sameDay/SameDayPaymentPage',
    type: 'newCreditCard'
  },
  {
    label: 'Same Day Payment Page (Saved Credit Card)',
    selectedKind: 'pages/sameDay/SameDayPaymentPage',
    type: 'savedCards'
  },
  {
    label: 'Same Day Payment Page (Apple Pay)',
    selectedKind: 'pages/sameDay/SameDayPaymentPage',
    type: 'applePay'
  },
  {
    label: 'Same Day Refund method page (default)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'default'
  },
  {
    label: 'Same Day Refund method page (With Payment Method)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with payment method'
  },
  {
    label: 'Same Day Refund method page (With Payment Method Missing)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with payment method missing'
  },
  {
    label: 'Same Day Refund method page (With CVV Missing For The  Selected Card)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with cvv missing for the selected card'
  },
  {
    label: 'Same Day Refund method page (hide global header)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'default'
  },
  {
    label: 'Same Day Refund method page (hybrid view)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'hybrid view'
  },
  {
    label: 'Same Day Refund method page (with dollar fare due and no tax)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with dollar fare due and no tax'
  },
  {
    label: 'Same Day Refund method page (with even exchange points and tax amount due)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with even exchange points and tax amount due'
  },
  {
    label: 'Same Day Refund method page (with even exchange points and tax credit)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with even exchange points and tax credit'
  },
  {
    label: 'Same Day Refund method page (With points fare due and tax credit)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with points fare due and tax credit'
  },
  {
    label: 'Same Day Refund method page (With points fare due and tax amount due)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with points fare due and tax amount due'
  },
  {
    label: 'Same Day Refund method page (With points fare credit due and tax amount due)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with points fare credit due and tax amount due'
  },
  {
    label: 'Same Day Refund method page (With points fare credit due and tax credit)',
    selectedKind: 'pages/sameDay/SameDayRefundMethod',
    type: 'with points fare credit due and tax credit'
  },
  {
    label: 'Same Day Shopping Page with all flights filtered out',
    selectedKind: 'pages/sameDay/SameDayShoppingPage',
    type: 'with all flights filtered out'
  }
];
