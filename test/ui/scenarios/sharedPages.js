module.exports = [
  {
    label: 'Subscription Details Page',
    selectedKind: 'pages/shared/subscriptionDetailsPage',
    type: 'default'
  },
  {
    label: 'Contact Method Page (domestic)',
    selectedKind: 'pages/shared/contactMethodPage',
    type: 'domestic'
  },
  {
    label: 'Contact Method Page (international)',
    selectedKind: 'pages/shared/contactMethodPage',
    type: 'international'
  },
  {
    label: 'Contact Method Page (domestic day of travel with email and message)',
    selectedKind: 'pages/shared/contactMethodPage',
    type: 'domestic day of travel with email and message'
  },
  {
    label: 'Contact Method Page (domestic day of travel with text and message)',
    selectedKind: 'pages/shared/contactMethodPage',
    type: 'domestic day of travel with text and message'
  },
  {
    label: 'Contact Method Page (domestic day of travel with call and message)',
    selectedKind: 'pages/shared/contactMethodPage',
    type: 'domestic day of travel with call and message'
  },
  {
    label: 'Contact Method Page (international day of travel)',
    selectedKind: 'pages/shared/contactMethodPage',
    type: 'international day of travel'
  },
  {
    label: 'Contact Method Page (international day of travel and has no notifications)',
    selectedKind: 'pages/shared/contactMethodPage',
    type: 'international day of travel and has no notifications'
  },
  {
    label: 'Fare Details Page (Default)',
    selectedKind: 'pages/shared/fareDetailsPage',
    type: 'default'
  },
  {
    label: 'Fare Details Page (iPad Webview)',
    selectedKind: 'pages/shared/fareDetailsPage',
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
    label: 'Special Assistance Page (Default)',
    selectedKind: 'pages/shared/specialAssistancePage',
    type: 'default'
  },
  {
    label: '(Special Assistance Page (iPad Webview)',
    selectedKind: 'pages/shared/specialAssistancePage',
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
    label: 'Email Enroll Page (Default)',
    selectedKind: 'pages/shared/emailEnrollPage',
    type: 'default'
  },
  {
    label: 'Error Page (Default)',
    selectedKind: 'pages/shared/errorPage',
    type: 'default'
  }
];
