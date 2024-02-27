// @flow
import React from 'react';
import Icon from 'src/shared/components/icon';
import Segment from 'src/shared/components/segment';
import CarConnect from 'src/carBooking/components/carConnect';
import { formatDate } from 'src/shared/helpers/dateHelper';

import type { SearchRequestType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  searchRequest: SearchRequestType,
  shouldShowDeleteButton?: boolean,
  indexOfRecentSearch: number,
  onRecentSearchCardClicked: (*) => void,
  onDeleteCurrentSearch: (*) => void
};

class CarBookingRecentSearchCard extends React.Component<Props> {
  _handleDelete = () => {
    const { onDeleteCurrentSearch, indexOfRecentSearch } = this.props;

    onDeleteCurrentSearch(indexOfRecentSearch);
  };

  render() {
    const { searchRequest, shouldShowDeleteButton, onRecentSearchCardClicked } = this.props;
    const { pickUp, dropOff, pickUpDate, dropOffDate, pickUpTime, dropOffTime, vehicleType } = searchRequest;
    const dateFormat = 'ddd, MMM D';

    return (
      <div data-qa="recent-search-card" ref="card" className="recent-search bgwhite">
        <div data-testid="recent-search-card-click" onClick={() => onRecentSearchCardClicked(searchRequest)}>
          <Segment>
            <div className="header">
              <CarConnect pickUp={pickUp} dropOff={dropOff} />
            </div>
            <div className="meta flex">
              <div className="flex-column">
                <div>{formatDate(pickUpDate, dateFormat)}</div>
                <div>{pickUpTime}</div>
              </div>
              <div className="flex1 center flex-column">
                <div>-</div>
              </div>
              <div className="flex-column">
                <div>{formatDate(dropOffDate, dateFormat)}</div>
                <div>{dropOffTime}</div>
              </div>
              <div className="flex-column">
                <div>&nbsp;</div>
                <div className="pl6">{vehicleType}</div>
              </div>
            </div>
          </Segment>
        </div>
        {shouldShowDeleteButton && (
          <div className="recent-search-card--delete-icon" onClick={this._handleDelete}>
            <Icon type="delete" />
          </div>
        )}
      </div>
    );
  }
}

export default CarBookingRecentSearchCard;
