import * as restClient from 'src/shared/api/restClient';
import environment from 'src/shared/api/apiRoutes';
import url from 'url';

const carCHAPIReservations = 'v1/mobile-misc/feature/cars';

export const cancelCarReservation = (request) => {
  const { confirmationNumber = 'CARRECLOCAT', firstName, lastName, pickUpDate, searchToken } = request;
  let queryParameters = {
    'first-name': firstName,
    'last-name': lastName,
    'pickup-date': pickUpDate
  };

  if (searchToken) {
    queryParameters = { 'car-search-token': searchToken };
  }

  const queryUrl = `${carCHAPIReservations}/reservations/${confirmationNumber}`;

  return restClient.ajax({
    url: url.resolve(environment.chapiMisc, queryUrl),
    type: 'DELETE',
    query: queryParameters
  });
};
