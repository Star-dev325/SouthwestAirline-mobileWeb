import _ from 'lodash';

export const getPnr = (state) => ({ pnr: _.get(state, 'app.viewReservation.searchRequest.recordLocator') });
