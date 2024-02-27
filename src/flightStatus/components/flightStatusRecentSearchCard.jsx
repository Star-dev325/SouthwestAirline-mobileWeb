// @flow
import React from 'react';
import FlightsConnect from 'src/shared/components/flightsConnect';
import Segment from 'src/shared/components/segment';
import Icon from 'src/shared/components/icon';
import { formatDate } from 'src/shared/helpers/dateHelper';
import _ from 'lodash';

type SearchRequest = {
  from: string,
  to: string,
  date: string,
  flightNumber?: string
};

type Props = {
  searchRequest: SearchRequest,
  shouldShowDeleteButton: boolean,
  onRecentSearchCardClicked: (SearchRequest) => void,
  onDeleteCurrentSearch: (SearchRequest) => void
};

const FlightStatusRecentSearchCard = (props: Props) => {
  const { searchRequest, onRecentSearchCardClicked, onDeleteCurrentSearch, shouldShowDeleteButton } = props;
  const descriptionFormatter = (request) => {
    if (request.flightNumber) {
      return `${formatDate(request.date, 'ddd, MMM D')} - Flight ${_.get(request, 'flightNumber')}`;
    } else {
      return formatDate(request.date, 'ddd, MMM D');
    }
  };

  return (
    <div data-qa="recent-search-card" className="recent-search bgwhite">
      <div onClick={() => onRecentSearchCardClicked(searchRequest)}>
        <Segment>
          <div className="header">
            <FlightsConnect from={searchRequest.from} to={searchRequest.to} />
          </div>

          <div className="meta travel-period">
            <span>{descriptionFormatter(searchRequest)}</span>
          </div>
        </Segment>
      </div>
      {shouldShowDeleteButton && (
        <div onClick={() => onDeleteCurrentSearch(searchRequest)} className="recent-search-card--delete-icon">
          <Icon type="delete" />
        </div>
      )}
    </div>
  );
};

export default FlightStatusRecentSearchCard;
