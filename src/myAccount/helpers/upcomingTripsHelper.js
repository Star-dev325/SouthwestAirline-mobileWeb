import _ from 'lodash';

export const isCompanionEligible = (flights) => _.every(flights, '_links.bookCompanion.href');

export const getOriginDestinationTitle = (reservation) => {
  const outboundSegments = _.get(reservation, 'itinerary.originationDestinations[0].segments');
  const { originationAirportCode } = _.head(outboundSegments);
  const { destinationAirportCode } = _.last(outboundSegments);

  return `${originationAirportCode} - ${destinationAirportCode}`;
};

export const getUserInfoRequest = (userInfo) => ({
  isLoggedIn: true,
  companionInfo: {
    companionFullName: _.get(userInfo, 'companionFullName'),
    companionName: _.get(userInfo, 'companionName')
  }
});

export const getRetrieveReservationInfoFromTrip = (trip, userInfo) => {
  const href = _.get(trip, '_links.viewReservationViewPage.href');

  if (_.isEmpty(href)) {
    return {};
  }

  const recordLocator = href.slice(href.lastIndexOf('/') + 1);
  const query = _.get(trip, '_links.viewReservationViewPage.query');

  return _.merge(
    {
      recordLocator,
      firstName: _.get(query, 'first-name'),
      lastName: _.get(query, 'last-name')
    },
    !_.isEmpty(userInfo) ? getUserInfoRequest(userInfo) : {}
  );
};

export const getCarRetrieveReservationInfoFromTrip = (trip) => {
  const { href, query } = _.get(trip, '_links.carReservationDetails');

  // TODO: we split confirmationNumber by ourself, we should make a new action accept href
  const confirmationNumber = href.slice(href.lastIndexOf('/') + 1);

  return {
    confirmationNumber,
    firstName: query['first-name'],
    lastName: query['last-name'],
    pickupDate: query['pickup-date']
  };
};
