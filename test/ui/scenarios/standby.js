module.exports = [
  {
    label: 'Standby Page',
    selectedKind: 'pages/standby/standbyPage',
    type: 'default'
  },
  {
    label: 'Enhanced Standby Page',
    selectedKind: 'pages/standby/standbyPage',
    type: 'Enhanced Standby Page'
  },
  {
    label: 'Enhanced Standby Page (with modal)',
    selectedKind: 'pages/standby/standbyPage',
    type: 'Enhanced Standby Page',
    clickSelector: 'button[type="submit"]'
  },
  {
    label: 'Enhanced Standby Page (with out seats available text)',
    selectedKind: 'pages/standby/standbyPage',
    type: 'with out seats available text'
  },
  {
    label: 'Cancel Standby List Confirmation Page',
    selectedKind: 'pages/standby/cancelStandbyListConfirmationPage',
    type: 'default'
  },
  {
    label: 'Cancel Standby List Confirmation Page (with out same day update label text)',
    selectedKind: 'pages/standby/cancelStandbyListConfirmationPage',
    type: 'with out same day update label text'
  }
];
