// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import EditRecentSearches from 'src/shared/components/editRecentSearches';
import FlightStatusRecentSearchCard from 'src/flightStatus/components/flightStatusRecentSearchCard';
import * as FlightStatusSearchActions from 'src/flightStatus/actions/flightStatusSearchActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { FLIGHT_STATUS_SEARCH_FORM } from 'src/shared/constants/formIds';
import type { RecentSearchRequestType } from 'src/flightStatus/flow-typed/flightStatus.types';
import type { GoBack } from 'src/shared/flow-typed/shared.types';

type Props = {
  goBack: GoBack,
  saveSelectedRecentSearchRequestFn: (RecentSearchRequestType) => void,
  clearFormDataByIdFn: (string) => void,
  onDeleteCurrentSearchFn: (RecentSearchRequestType) => void,
  searches: Array<RecentSearchRequestType>
};

export class FlightStatusRecentPage extends React.Component<Props> {
  _onRecentSearchCardClicked = (searchRequest: RecentSearchRequestType) => {
    const { saveSelectedRecentSearchRequestFn, clearFormDataByIdFn, goBack } = this.props;

    saveSelectedRecentSearchRequestFn(searchRequest);
    clearFormDataByIdFn(FLIGHT_STATUS_SEARCH_FORM);
    goBack();
  };

  render() {
    return (
      <EditRecentSearches
        listOfRecentSearches={this.props.searches}
        recentSearchComponent={FlightStatusRecentSearchCard}
        onDeleteCurrentSearch={this.props.onDeleteCurrentSearchFn}
        onRecentSearchCardClicked={this._onRecentSearchCardClicked}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  searches: _.get(state, 'app.flightStatus.flightStatusRecentPage.searches')
});

const mapDispatchToProps = {
  saveSelectedRecentSearchRequestFn: FlightStatusSearchActions.saveSelectedRecentSearchRequest,
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  onDeleteCurrentSearchFn: FlightStatusSearchActions.deleteRecentSearchRequest
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(FlightStatusRecentPage);
