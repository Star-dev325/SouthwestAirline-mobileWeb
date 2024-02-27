import _ from 'lodash';

export const getIsNonRevPnr = (state) => _.get(state, 'app.viewReservation.flightReservation.isNonRevPnr', false);
