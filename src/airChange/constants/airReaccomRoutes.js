import { viewReservationOldRoutes, viewReservationRoutes } from 'src/viewReservation/constants/viewReservationRoutes';

export const airReaccomRoutes = {
  confirmation: '/air/reaccom/confirmation.html',
  flightShopping: '/air/reaccom/:direction/results',
  flightShoppingIndex: '/air/reaccom/find-flights.html',
  reaccom: '/air/reaccom/details',
  view: '/air/reaccom/view.html',
  viewReservationIndex: viewReservationRoutes['index']
};

export const airReaccomOldRoutes = {
  confirmation: '/air/change/confirmation',
  flightShopping: '/air/change/shopping/:paxType/:direction/results',
  flightShoppingIndex: '/air/change/shopping',
  reaccom: '/air/change/reaccom/summary',
  view: '/air/change',
  viewReservationIndex: viewReservationOldRoutes['index']
};
