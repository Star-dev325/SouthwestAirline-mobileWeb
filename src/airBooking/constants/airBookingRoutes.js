import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import { earlyBirdOldRoutes, earlyBirdRoutes } from 'src/earlyBird/constants/earlyBirdRoutes';

export const airBookingRoutes = {
  addManualIrn: '/air/booking/manual-irn',
  applyRapidRewards: '/air/booking/apply-rapid-rewards?clearFormData=false',
  applyTravelFunds: '/air/booking/apply-travel-funds',
  billingAddress: '/air/booking/billing-address',
  carBookingIndex: carBookingRoutes['index'],
  checkin: earlyBirdRoutes['checkin'],
  confirmation: '/air/booking/confirmation.html',
  contactInfoTravelManager: '/air/booking/contact-info-travel-manager',
  contactMethod: '/air/booking/contact-method',
  fareDetails: '/air/booking/fare-details',
  flightShoppingDepart: '/air/booking/select-depart.html',
  flightShoppingReturn: '/air/booking/select-return.html',
  flightShoppingOutbound: '/air/booking/outbound/results',
  frequentTravelers: '/air/booking/passenger/:paxNumber/frequent-travelers',
  index: {
    canonicalPath: '/air/booking/',
    htmlPath: '/air/booking/index.html'
  },
  indexWithoutClearForm: '/air/booking?clearFormData=false',
  internalReferenceNumber: '/air/booking/irn-info',
  lowFareCalendar: {
    canonicalPath: '/air/low-fare-calendar/',
    htmlPath: '/air/low-fare-calendar/select-dates.html'
  },
  lowFareCalendarDate: '/air/low-fare-calendar/date-select',
  passengers: '/air/booking/passenger',
  passengersWithPassport: '/air/booking/passenger/:paxNumber/passport',
  passengersWithPax: '/air/booking/passenger/:paxNumber',
  passengersWithPaxEdit: '/air/booking/passenger/:paxNumber/edit',
  passengersWithSpecialAssistance: '/air/booking/passenger/:paxNumber/special-assistance',
  payment: '/air/booking/payment',
  paymentEdit: '/air/booking/payment/edit',
  price: '/air/booking/price.html',
  priceReview: '/air/booking/price/detail',
  purchase: '/air/booking/purchase.html',
  purchasePaypal: '/air/booking/purchase/paypal',
  purchasePaypalCanceled: '/air/booking/purchase/paypal-canceled',
  purchaseWithoutClearForm: '/air/booking/purchase.html?clearFormData=false',
  recent: '/air/booking/recent',
  reprice: '/air/booking/reprice',
  selectCompany: '/air/booking/select-company',
  selectCompanyToggle: '/air/booking/select-company?CLK=swabizomnitoggle',
  selectDepartFare: '/air/booking/select-fare-depart.html',
  selectFare: '/air/booking/:direction/select-fare',
  selectPassengers: '/air/booking/select-passenger',
  selectReturnFare: '/air/booking/select-fare-return.html',
  viewReservationView: '/air/manage-reservation/view/:recordLocator',
  youngTraveler: '/air/booking/young-traveler',
  youngTravelerEditWithoutClearForm: '/air/booking/young-traveler/edit?clearFormData=false',
  youngTravelerParentConsent: '/air/booking/young-traveler-parent-consent'
};

export const airBookingOldRoutes = {
  addManualIrn: '/air/booking/addManualIrn',
  applyRapidRewards: '/air/booking/apply-rapid-rewards?clearFormData=false',
  carBookingIndex: carBookingOldRoutes['index'],
  checkin: earlyBirdOldRoutes['checkin'],
  confirmation: '/air/booking/confirmation',
  fareDetails: '/air/booking/shopping/fare-details',
  flightShoppingDepart: '/air/booking/shopping/:paxType/:direction/results',
  flightShoppingReturn: '/air/booking/shopping/:paxType/:direction/results',
  flightShoppingOutbound: '/air/booking/shopping/adult/outbound/results',
  frequentTravelers: '/air/booking/passengers/:paxNumber/frequent-travelers',
  index: '/air/booking/shopping',
  indexWithoutClearForm: '/air/booking/shopping?clearFormData=false',
  internalReferenceNumber: '/air/booking/irnInfo',
  lowFareCalendar: '/air/booking/shopping/low-fare-calendar',
  lowFareCalendarDate: '/air/booking/shopping/low-fare-calendar/date-select',
  passengers: '/air/booking/passengers',
  passengersWithPassport: '/air/booking/passengers/:paxNumber/passport',
  passengersWithPax: '/air/booking/passenger/:paxNumbers',
  passengersWithPaxEdit: '/air/booking/passengers/:paxNumber/edit',
  passengersWithSpecialAssistance: '/air/booking/passengers/:paxNumber/special-assistance',
  price: '/air/booking/pricing/summary',
  priceReview: '/air/booking/pricing/review',
  purchase: '/air/booking/review',
  purchaseWithoutClearForm: '/air/booking/review?clearFormData=false',
  recent: '/air/booking/shopping/recent',
  reprice: '/air/booking/pricing/repricing',
  selectCompany: '/air/booking/shopping/select-company',
  selectCompanyToggle: '/air/booking/shopping/select-company?CLK=swabizomnitoggle',
  selectDepartFare: '/air/booking/shopping/:paxType/:direction/select-fare',
  selectFare: '/air/booking/shopping/:paxType/:direction/select-fare',
  selectPassengers: '/air/booking/shopping/select-passengers',
  selectReturnFare: '/air/booking/shopping/:paxType/:direction/select-fare',
  viewReservationView: '/view-reservation/trip-details/:recordLocator',
  youngTraveler: '/air/booking/young-traveler',
  youngTravelerEditWithoutClearForm: '/air/booking/young-traveler/edit?clearFormData=false',
  youngTravelerParentConsent: '/air/booking/young-traveler-parent-consent'
};
