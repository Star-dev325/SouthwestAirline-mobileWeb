import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';
import { travelFundsOldRoutes, travelFundsRoutes } from 'src/travelFunds/constants/travelFundsRoutes';
import { viewReservationOldRoutes, viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';

export const airChangeRoutes = {
  applyTravelFunds: '/air/change/apply-travel-funds',
  carBookingIndex: carBookingRoutes['index'],
  confirmation: '/air/change/confirmation.html',
  contactMethod: '/air/change/contact-method',
  fareDetails: '/air/change/fare-details',
  flightShopping: '/air/change/:direction/results',
  flightShoppingIndex: '/air/change/find-flights.html',
  payment: '/air/change/payment',
  price: '/air/change/price.html',
  purchasePaypal: '/air/change/reconcile/paypal',
  purchasePaypalCanceled: '/air/change/reconcile/paypal-canceled',
  reaccom: '/air/change/reaccom/details',
  reconcile: '/air/change/reconcile.html',
  reprice: '/air/change/reprice',
  selectFare: '/air/change/:direction/select-fare',
  selectPassengers: '/air/change/select-passengers.html',
  travelFundsIndex: travelFundsRoutes['index'],
  view: {
    canonicalPath: '/air/change/',
    htmlPath: '/air/change/view.html'
  },
  viewReservationIndex: viewReservationRoutes['index']
};

export const airChangeOldRoutes = {
  applyTravelFunds: '/air/change/apply-travel-funds',
  carBookingIndex: carBookingOldRoutes['index'],
  confirmation: '/air/change/confirmation',
  contactMethod: '/air/change/contact-method',
  fareDetails: '/air/change/shopping/fare-details',
  flightShopping: '/air/change/shopping/:paxType/:direction/results',
  flightShoppingIndex: '/air/change/shopping',
  payment: '/air/change/pricing/payment',
  price: '/air/change/pricing/summary',
  purchasePaypal: '/air/change/pricing/review/paypal',
  purchasePaypalCanceled: '/air/change/pricing/review/paypal-canceled',
  reaccom: '/air/change/reaccom/summary',
  reconcile: '/air/change/pricing/review',
  reprice: '/air/change/pricing/repricing',
  selectFare: '/air/change/shopping/:paxType/:direction/select-fare',
  selectPassengers: '/air/change/select-passengers',
  travelFundsIndex: travelFundsOldRoutes['index'],
  view: '/air/change',
  viewReservationIndex: viewReservationOldRoutes['index']
};
