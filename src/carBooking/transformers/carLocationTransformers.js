import _ from 'lodash';

const CarLocationTransformers = {
  transformToAirportList(airStations) {
    return _.map(airStations, (airport) => {
      airport.airportFullName = airport.airport.airportName;

      return airport;
    });
  }
};

export default CarLocationTransformers;
