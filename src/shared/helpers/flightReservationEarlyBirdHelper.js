import _ from 'lodash';
import EarlyBirdStatus from 'src/shared/constants/earlyBirdStatus';

function _getAllEarlyBirdEligibilities(reservation) {
  return _.chain(reservation.passengers).map('earlyBirdEligibilities').flatten().compact().value();
}

function getAllEligibleEarlyBird(reservation) {
  return _.filter(_getAllEarlyBirdEligibilities(reservation), (item) => item.status === EarlyBirdStatus.ELIGIBLE);
}

function getAllPurchasedEarlyBird(reservation) {
  return _.filter(_getAllEarlyBirdEligibilities(reservation), (item) => item.status === EarlyBirdStatus.PURCHASED);
}

const FlightReservationEarlyBirdHelper = {
  isEligibleForEarlyBirdCheckIn(reservation) {
    return getAllEligibleEarlyBird(reservation).length > 0;
  },
  getAllProductIds(reservation) {
    return _.map(getAllEligibleEarlyBird(reservation), 'earlyBirdProductId');
  },
  getTotalPriceCents(reservation) {
    const allEligibleEarlyBird = getAllEligibleEarlyBird(reservation);

    return _.chain(allEligibleEarlyBird).map('priceCents').sum().value();
  },
  getAllEligibleEarlyBird,
  getAllPurchasedEarlyBird
};

export default FlightReservationEarlyBirdHelper;
