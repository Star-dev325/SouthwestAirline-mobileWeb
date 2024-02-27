// @flow
import _ from 'lodash';

import type {
  HazmatDeclarationType,
  MobileBoardingPassViewType,
  FlightDepartureDateAndAirportType,
  ConfirmationPageFlightsType
} from 'src/checkIn/flow-typed/checkIn.types';

export const getFlightDepartureAirportsAndDates = (mobileBoardingPasses: Array<MobileBoardingPassViewType>) =>
  _.map(mobileBoardingPasses, (mbPass) => ({
    departureDate: mbPass.departureDate,
    originAirportCode: mbPass.originAirportCode
  }));

export const getHazmatDeclarationKeysFromConfirmationPage = (
  flights: Array<ConfirmationPageFlightsType>,
  flightAirportsAndDates: Array<FlightDepartureDateAndAirportType>
): Array<HazmatDeclarationType> => {
  const mergedFlights = _.merge(
    _.keyBy(flightAirportsAndDates, 'originAirportCode'),
    _.keyBy(flights, 'originAirportCode')
  );
  const flightsWithDepartureDates = _.values(mergedFlights);

  return _.flatten(
    _.map(flightsWithDepartureDates, (flight) =>
      _.map(flight.passengers, (passenger) => ({
        flightDate: flight.departureDate,
        travelerSegmentIdentifier: passenger.travelerSegmentIdentifier,
        travelerId: passenger.travelerID
      }))
    )
  );
};

export const getHazmatDeclarationKeysFromMobileBoardingPass = (
  mobileBoardingPasses: Array<MobileBoardingPassViewType>
) =>
  _.map(mobileBoardingPasses, (mbPass) => ({
    flightDate: mbPass.departureDate,
    travelerSegmentIdentifier: mbPass.travelerSegmentIdentifier,
    travelerId: mbPass.passenger.travelerId
  }));
