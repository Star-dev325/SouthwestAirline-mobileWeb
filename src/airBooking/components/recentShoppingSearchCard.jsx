// @flow
import React from 'react';
import _ from 'lodash';
import FlightsConnect from 'src/shared/components/flightsConnect';
import Segment from 'src/shared/components/segment';
import { POINTS, WAPI_POINTS } from 'src/shared/constants/currencyTypes';
import TripTypes from 'src/shared/constants/tripTypes';
import Icon from 'src/shared/components/icon';
import { formatDate } from 'src/shared/helpers/dateHelper';
import PassengerFormatter from 'src/shared/helpers/passengerFormatter';
import type { FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  searchRequest: FlightProductSearchRequest,
  shouldShowDeleteButton: boolean,
  indexOfRecentSearch: number,
  onRecentSearchCardClicked: (FlightProductSearchRequest) => void,
  onDeleteCurrentSearch: (number) => void
};

const formatPassengerCount = (numberOfPassengers, passengerType) =>
  _.compact([PassengerFormatter.formatPassengerType(numberOfPassengers, passengerType)]).join(', ');

const formattedTravelPeriod = (searchRequest, dateFormat = 'ddd, MMM D') => {
  const departureDateFormatted = formatDate(searchRequest.departureDate, dateFormat);
  const returnDateFormatted = formatDate(searchRequest.returnDate, dateFormat);

  return _.isEmpty(returnDateFormatted)
    ? departureDateFormatted
    : `${departureDateFormatted} - ${formatDate(searchRequest.returnDate, dateFormat)}`;
};

const formattedTripType = (searchRequest) =>
  (_.isEmpty(formatDate(searchRequest.returnDate)) ? TripTypes.ONE_WAY.label : TripTypes.ROUND_TRIP.label);

const RecentShoppingSearchCard = (props: Props) => {
  const {
    searchRequest,
    onRecentSearchCardClicked,
    indexOfRecentSearch,
    onDeleteCurrentSearch,
    shouldShowDeleteButton
  } = props;
  const { currencyType } = searchRequest;

  return (
    <div data-qa="recent-search-card" className="recent-search bgwhite">
      <div onClick={() => onRecentSearchCardClicked(searchRequest)}>
        <Segment>
          <div className="header">
            <FlightsConnect from={searchRequest.origin} to={searchRequest.destination} />
          </div>

          <div className="meta travel-period">
            <span>{formattedTravelPeriod(searchRequest)}</span>
          </div>
          <div className="meta trip-type">
            <span>{formattedTripType(searchRequest)} - </span>
            <span>{formatPassengerCount(searchRequest.numberOfAdults, 'Passenger')}{searchRequest.numberOfLapInfants ? ',' : ''} {formatPassengerCount(searchRequest.numberOfLapInfants, 'Lap Child')}</span>
            {(currencyType === WAPI_POINTS || currencyType === POINTS) && (
              <span className="recent-search--currency-type">&nbsp;-&nbsp; Points</span>
            )}
          </div>
        </Segment>
      </div>
      {!!shouldShowDeleteButton && (
        <div onClick={() => onDeleteCurrentSearch(indexOfRecentSearch)} className="recent-search-card--delete-icon">
          <Icon type="delete" />
        </div>
      )}
    </div>
  );
};

export default RecentShoppingSearchCard;
