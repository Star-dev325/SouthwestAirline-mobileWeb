import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getFlightCards = (state) => _.get(state, 'app.flightStatus.flightStatusDetailsPage.response.flightCards');

export const getFlightDetails = createSelector([getFlightCards], (flightCards) => {
  let aircraftType = '';
  let flightNumber = '';

  if (flightCards) {
    flightCards.forEach((card) => {
      const { legs } = card;

      legs.forEach((leg) => {
        if (flightNumber.length > 0) flightNumber += '|';
        flightNumber += leg.flightNumber;

        if (aircraftType.length > 0) aircraftType += '|';
        const newAircraftType = _.get(leg, 'aircraftInfo.aircraftType');

        aircraftType += newAircraftType ? newAircraftType.replace('Boeing ', '') : '';
      });
    });
  }

  return {
    aircraftType,
    flightNumber
  };
});
