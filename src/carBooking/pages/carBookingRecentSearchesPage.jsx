// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import CarBookingRecentSearchCard from 'src/carBooking/components/carBookingRecentSearchCard';
import EditRecentSearches from 'src/shared/components/editRecentSearches';
import { CAR_BOOKING_SEARCH_FORM } from 'src/shared/constants/formIds';

import type { SearchRequestType } from 'src/carBooking/flow-typed/carBooking.types';
import type { GoBack } from 'src/shared/flow-typed/shared.types';

type Props = {
  searchRequests: Array<SearchRequestType>,
  saveSelectedRecentSearchRequestFn: (SearchRequestType) => void,
  clearFormDataByIdFn: (string) => void,
  deleteRecentSearchFn: (Array<SearchRequestType>, number) => void,
  goBack: GoBack
};

export class CarBookingRecentSearchesPage extends React.Component<Props> {
  _onCarBookingRecentSearchCardClicked = (searchRequest: SearchRequestType) => {
    const { saveSelectedRecentSearchRequestFn, clearFormDataByIdFn, goBack } = this.props;

    saveSelectedRecentSearchRequestFn(searchRequest);
    clearFormDataByIdFn(CAR_BOOKING_SEARCH_FORM);
    goBack();
  };

  _onDeleteSearchCardClick = (indexToDelete: number) => {
    const { deleteRecentSearchFn, searchRequests } = this.props;

    deleteRecentSearchFn(searchRequests, indexToDelete);
  };

  render() {
    const { searchRequests } = this.props;

    return (
      <EditRecentSearches
        listOfRecentSearches={searchRequests}
        recentSearchComponent={CarBookingRecentSearchCard}
        onRecentSearchCardClicked={this._onCarBookingRecentSearchCardClicked}
        onDeleteCurrentSearch={this._onDeleteSearchCardClick}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  searchRequests: _.get(state, 'app.carBooking.recentSearchRequests')
});

const mapDispatchToProps = {
  saveSelectedRecentSearchRequestFn: CarBookingActions.saveSelectedRecentSearchRequest,
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  deleteRecentSearchFn: CarBookingActions.deleteRecentSearchRequestFromLocalStorage
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(CarBookingRecentSearchesPage);
