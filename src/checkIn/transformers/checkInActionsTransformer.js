import _ from 'lodash';

export const transformReservationDetailsResponseToBoardingPassInfoForSharing = (response) => {
  const firstCard = _.get(response, 'checkInViewReservationPage.cards[0]');

  return {
    destinationDescription: _.get(firstCard, 'destinationDescription'),
    originAirportCode: _.get(firstCard, 'departureAirport'),
    destinationAirportCode: _.get(firstCard, 'arrivalAirport'),
    dates: _.get(firstCard, 'dates')
  };
};
