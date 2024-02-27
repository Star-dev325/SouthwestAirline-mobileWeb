export default {
  'in-the-air': '/in-the-air',
  airbooking: { target: '/air/booking/shopping', query: { cleanFlow: true } },
  aircheckin: '/check-in',
  airearlybird: '/earlybird/checkin',
  airflightstatus: { target: '/flight-status', query: { cleanFlow: true } },
  airport: '/at-the-airport',
  boarding: '/boarding-the-plane',
  carbooking: { target: '/car/booking', query: { cleanFlow: true } },
  carlookup: { target: '/view-reservation', param: {}, query: { cleanFlow: true, clearFormData: false, tab: 'CAR' } },
  contactcall: '/contact-us',
  emailenroll: '/email-enroll',
  enroll: { target: '/rapid-rewards', query: { cleanFlow: true } },
  flyingsw: { target: '/flying-southwest', query: { cleanFlow: true } },
  home: { target: '/' },
  myaccountlanding: '/my-account',
  rrabout: '/about-rapid-rewards',
  rrpromotions: undefined,
  travelfunds: { target: '/travel-funds/look-up', query: { cleanFlow: true, clearFormData: false } },
  viewflightreservation: {
    target: '/view-reservation',
    query: { cleanFlow: true, clearFormData: false, tab: 'FLIGHT' }
  },
  wherewefly: { target: '/where-we-fly', query: { cleanFlow: true } }
};
