module.exports = [
  {
    label: 'Contact Tracing Page - First Passenger',
    selectedKind: 'pages/contactTracing/contractTracingPage',
    type: 'default'
  },
  {
    label: 'Contact Tracing Page - Last Passenger',
    selectedKind: 'pages/contactTracing/contractTracingPage',
    type: 'lastPassenger'
  },
  {
    label: 'Contact Tracing Page - Validation Errors',
    selectedKind: 'pages/contactTracing/contractTracingPage',
    type: 'lastPassenger',
    clickSelector: 'button[type="submit"]'
  }
];
