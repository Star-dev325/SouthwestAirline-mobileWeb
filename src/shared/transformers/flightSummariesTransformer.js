import _ from 'lodash';
import { isInSameDayIgnoreTimezone } from 'src/shared/helpers/dateHelper';
import passengerTypes from 'src/shared/constants/passengerTypes';

function getTripDetail(airportGetter, tripResponse) {
  const {
    itinerary: { originationDestinations },
    passengers
  } = tripResponse;
  const bounds = _transformOriginDestinationsToBounds(airportGetter, originationDestinations);

  return {
    bounds,
    passengers
  };
}

function _transformOriginDestinationsToBounds(airportGetter, originationDestinations) {
  return originationDestinations.map((bound, index) => {
    const isReturning = index !== 0 && isFlightReturning(originationDestinations);

    const firstSegment = _.head(bound.segments);
    const lastSegment = _.last(bound.segments);

    const departureAirport = airportGetter(firstSegment.originationAirportCode);
    const arrivalAirport = airportGetter(lastSegment.destinationAirportCode);

    const departureDetail = _getDepartureDetail(firstSegment, departureAirport);
    const arrivalDetail = _getArrivalDetail(lastSegment, arrivalAirport);

    arrivalDetail.arrivesNextDay = !isInSameDayIgnoreTimezone(
      lastSegment.arrivalDateTime,
      firstSegment.departureDateTime
    );
    const stops = _getStopsBySegments(bound.segments).map((stop) =>
      _.set(stop, 'airport', airportGetter(stop.airport))
    );

    const segments = _getSegmentsInBound(bound.segments);

    const isCancelled = _isBoundCancelled(bound.segments);

    return {
      fareType: bound.fareType,
      durationMinutes: bound.durationMinutes,
      departureDetail,
      arrivalDetail,
      isCancelled,
      stops,
      segments,
      isReturning
    };
  });
}

function _isBoundCancelled(segments) {
  return !!_.chain(segments)
    .map('flightStatus')
    .compact()
    .find((flightStatus) => {
      const arrivalCancelled = flightStatus.arrivalStatus === 'Cancelled';
      const departureStatus = flightStatus.departureStatus === 'Cancelled';

      return arrivalCancelled || departureStatus;
    })
    .value();
}

function _getStopsBySegments(segments) {
  let stops = [];

  _.each(segments, (segment, index) => {
    stops = stops.concat(_getStopsFromLegs(segment.legs));

    const nextSegment = segments[index + 1];

    if (nextSegment) {
      stops = stops.concat({
        layoverTimes: {
          startTime: segment.arrivalDateTime,
          departureFlightStatus: _.get(nextSegment, 'flightStatus.departureStatus'),
          endTime: nextSegment.departureDateTime,
          arrivalFlightStatus: _.get(segment, 'flightStatus.arrivalStatus')
        },
        airport: nextSegment.originationAirportCode
      });
    }
  });

  return stops;
}

function _getStopsFromLegs(legs) {
  return _.reduce(
    legs,
    (result, leg, index) => {
      if (index > 0) {
        return result.concat({
          airport: leg.originationAirportCode
        });
      } else {
        return result;
      }
    },
    []
  );
}

function _getSegmentsInBound(segments) {
  return _.map(segments, (segment) =>
    _.set(
      _.pick(segment, ['wifiAvailable', 'arrivalDateTime', 'departureDateTime']),
      'flightNumber',
      segment.operatingCarrierInfo.flightNumber
    )
  );
}

function _getDepartureDetail(firstSegment, departureAirport) {
  return {
    dateTime: firstSegment.departureDateTime,
    actualTime: _.get(firstSegment, 'flightStatus.departureActualTime'),
    flightStatus: _.get(firstSegment, 'flightStatus.departureStatus'),
    airportCode: departureAirport.code,
    airportName: departureAirport.airportName,
    cityState: departureAirport.cityState
  };
}

function _getArrivalDetail(lastSegment, arrivalAirport) {
  return {
    dateTime: lastSegment.arrivalDateTime,
    actualTime: _.get(lastSegment, 'flightStatus.arrivalActualTime'),
    flightStatus: _.get(lastSegment, 'flightStatus.arrivalStatus'),
    airportCode: arrivalAirport.code,
    airportName: arrivalAirport.airportName,
    cityState: arrivalAirport.cityState
  };
}

function _retrievePriceInfoFromFlightBound(flightBound, passengerCount) {
  const { fareType } = flightBound;

  return {
    adultPriceInfo: {
      fareType,
      passengerType: passengerTypes.ADULT,
      passengerCount
    }
  };
}

function isFlightReturning(originationDestinations) {
  if (originationDestinations.length === 2) {
    const firstBound = _.chain(originationDestinations).head().get('segments').value();
    const secondBound = _.chain(originationDestinations).last().get('segments').value();
    const firstBoundOrigin = _.chain(firstBound).first().get('originationAirportCode').value();
    const firstBoundDestination = _.chain(firstBound).last().get('destinationAirportCode').value();
    const secondBoundOrigin = _.chain(secondBound).first().get('originationAirportCode').value();
    const secondBoundDestination = _.chain(secondBound).last().get('destinationAirportCode').value();

    return firstBoundOrigin === secondBoundDestination && firstBoundDestination === secondBoundOrigin;
  }

  return false;
}

function retrieveFlightSummariesFromReservation(reservationDetails) {
  const { bounds, passengers } = reservationDetails;

  return bounds.map((flightBound) => {
    const priceInfo = _retrievePriceInfoFromFlightBound(flightBound, passengers.length);
    const flightInfo = {
      segments: flightBound.segments,
      durationMinutes: flightBound.durationMinutes
    };
    const itineraryInfo = {
      departureDetail: flightBound.departureDetail,
      arrivalDetail: flightBound.arrivalDetail,
      stops: flightBound.stops
    };

    return {
      priceInfo,
      flightSummaryDetails: {
        flightInfo,
        itineraryInfo,
        departureDateTime: flightBound.departureDetail.dateTime,
        isReturning: flightBound.isReturning,
        isCancelled: flightBound.isCancelled
      }
    };
  });
}

export default {
  getTripDetail: _.curry(getTripDetail),
  isFlightReturning,
  retrieveFlightSummariesFromReservation
};
