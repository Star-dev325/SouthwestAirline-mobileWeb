// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import RecentShoppingSearchCard from 'src/airBooking/components/recentShoppingSearchCard';
import type { FlightBoundMultiSelectSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';
import * as AirportsActions from 'src/airports/actions/airportsActions';
import EditRecentSearches from 'src/shared/components/editRecentSearches';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import type { MultiSelectGroup } from 'src/shared/flow-typed/shared.types';

type Props = {
  clearMultiSelectGroupFn: () => void,
  loadMultiSelectGroupFn: (multiSelectGroup?: MultiSelectGroup) => void,
  multiSelectGroup: MultiSelectGroup,
  onDeleteCurrentSearchFn: (number) => void,
  searches: FlightBoundMultiSelectSearchRequest[],
  transitionToShoppingLandingPageFn: (FlightBoundMultiSelectSearchRequest) => void
};
export class RecentSearchesPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  _onRecentSearchCardClicked = (searchRequest: FlightBoundMultiSelectSearchRequest) => {
    const { clearMultiSelectGroupFn, loadMultiSelectGroupFn, transitionToShoppingLandingPageFn } = this.props;

    searchRequest.multiSelectGroup ? loadMultiSelectGroupFn(searchRequest.multiSelectGroup) : clearMultiSelectGroupFn();
    transitionToShoppingLandingPageFn(searchRequest);
  };

  render() {
    const { onDeleteCurrentSearchFn, searches } = this.props;

    return (
      <EditRecentSearches
        listOfRecentSearches={searches}
        onDeleteCurrentSearch={onDeleteCurrentSearchFn}
        onRecentSearchCardClicked={this._onRecentSearchCardClicked}
        recentSearchComponent={RecentShoppingSearchCard}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  multiSelectGroup: _.get(state, 'app.airports.multiSelectGroup'),
  passengerCountValue: _.get(state, 'app.airBooking.savePassengerCount'),
  searches: state.app.airBooking.recentSearchesPage.searches
});

const mapDispatchToProps = {
  clearMultiSelectGroupFn: AirportsActions.clearMultiSelectGroup,
  loadMultiSelectGroupFn: AirportsActions.loadMultiSelectGroup,
  onDeleteCurrentSearchFn: AirBookingActions.deleteCurrentSearchRequest,
  transitionToShoppingLandingPageFn: AirBookingActions.transitionToShoppingLandingPage
};

const enhancers = _.flowRight(connect(mapStateToProps, mapDispatchToProps), withBodyClass('recent-searches-page'));

export default enhancers(RecentSearchesPage);
