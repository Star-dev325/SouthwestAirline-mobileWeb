import { carBookingOldRoutes, carBookingRoutes } from 'src/carBooking/constants/carBookingRoutes';

export const carCancelRoutes = {
  carBookingIndex: carBookingRoutes['index'],
  carCancelConfirmation: '/car/cancel-reservation/summary.html',
  carReservationIndex: '/car/manage-reservation/index.html'
};

export const carCancelOldRoutes = {
  carBookingIndex: carBookingOldRoutes['index'],
  carCancelConfirmation: '/car/cancel/confirmation',
  carReservationIndex: '/view-reservation'
};
