// @flow
import store2 from 'store2';
import _ from 'lodash';
import dayjs from 'dayjs';
import StorageKeys from 'src/shared/helpers/storageKeys';

import type { HazmatDeclarationType } from 'src/checkIn/flow-typed/checkIn.types';

const { CHECKIN_HAZMAT_ACK_KEY } = StorageKeys;

class CheckInLocalStorageHelper {
  static saveAcceptedHazmatDeclarations(flights: Array<HazmatDeclarationType>) {
    let acceptedHazmatDeclarations = this._getAcceptedHazmatDeclarations();

    acceptedHazmatDeclarations = _.uniqWith(acceptedHazmatDeclarations.concat(flights), _.isEqual);
    store2.set(CHECKIN_HAZMAT_ACK_KEY, acceptedHazmatDeclarations);
  }

  static hasAcceptedHazmatDeclarations(flights: Array<HazmatDeclarationType>): boolean {
    const acceptedHazmatDeclarations = this._getAcceptedHazmatDeclarations();
    const results = _.map(flights, (item) =>
      _.some(
        _.map(acceptedHazmatDeclarations, (flight) =>
          _.isEqual(item.travelerSegmentIdentifier, flight.travelerSegmentIdentifier)
        )
      )
    );

    return flights.length > 0 && _.every(results);
  }

  static clearAcceptedHazmatDeclarations() {
    store2.set(CHECKIN_HAZMAT_ACK_KEY, []);
  }

  static _getAcceptedHazmatDeclarations() {
    const acceptedHazmatDeclarations = store2.get(CHECKIN_HAZMAT_ACK_KEY) || [];

    return this._removeExpiredHazmatDeclarations(acceptedHazmatDeclarations);
  }

  static _removeExpiredHazmatDeclarations(
    acceptedHazmatDeclarations: Array<HazmatDeclarationType>
  ): Array<HazmatDeclarationType> {
    const date = dayjs();

    const filteredArray = _.filter(acceptedHazmatDeclarations, (declaration) => {
      const flightDate = dayjs(declaration.flightDate);

      if (dayjs(flightDate).isSameOrAfter(date, 'day')) {
        return declaration;
      }
    });

    if (acceptedHazmatDeclarations.length !== filteredArray.length) {
      store2.set(CHECKIN_HAZMAT_ACK_KEY, filteredArray);
    }

    return filteredArray;
  }
}

export default CheckInLocalStorageHelper;
