// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getUpgradeFareReservation, saveUpgradeType } from 'src/airUpgrade/actions/airUpgradeActions';
import { getUpgradeQueryParams } from 'src/airUpgrade/constants/airUpgradeConstants';
import ReservationDetail from 'src/shared/components/reservationDetail';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { get } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as viewReservationActions from 'src/viewReservation/actions/viewReservationActions';

import type { AccountCompanionName } from 'src/companion/flow-typed/companion.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type {
  FlightRetrieveInfoRequestType,
  FlightRetrieveInfoWithSearchTokenRequestType,
  FlightRetrieveRequestType,
  LocationStateType
} from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  clearFlightReservationFn: () => void,
  companionFullName?: string,
  companionName?: AccountCompanionName,
  getUpgradeFareReservationFn: ({ link: Link }) => void,
  history: {
    action: string
  },
  isUserLoggedIn: boolean,
  location: HistoryLocationWithState<LocationStateType>,
  params: {
    recordLocator?: string
  },
  push: Push,
  query: {
    searchToken?: string
  },
  retrieveFlightReservationFn: (FlightRetrieveInfoRequestType: FlightRetrieveInfoRequestType) => void,
  retrieveFlightReservationWithTokenFn: (FlightRetrieveInfoRequestType: FlightRetrieveInfoWithSearchTokenRequestType, withSearchToken: boolean) => void,
  saveUpgradeTypeFn: (upgradeType: string) => void,
  UI_ENCRYPTION: boolean,
  viewReservationSearchRequest: FlightRetrieveRequestType,
  viewReservationViewPage: *
};

export class ViewReservationDetailPage extends React.Component<Props> {
  componentDidMount() {
    const { query: { searchToken } = {} } = this.props;

    if (!searchToken) {
      this._refreshReservationDetails(this.props);
    } else {
      this._refreshReservationDetailsWithSearchToken(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.params?.recordLocator !== this.props.params?.recordLocator) {
      this._refreshReservationDetails(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.clearFlightReservationFn();
  }

  _refreshReservationDetails = (props: Props) => {
    const {
      companionFullName,
      companionName,
      isUserLoggedIn,
      retrieveFlightReservationFn,
      location,
      history: { action }
    } = props;

    const pathname = _.get(location, 'pathname');
    const params = _.split(pathname, '/');
    const recordLocatorParam = params[params.length - 1];
    const hasEditedName = _.get(location, 'state.hasEditedName', false);
    const passengerSearchToken = _.get(location, 'state.passengerSearchToken', null);

    const companionInfo = { companionFullName, companionName };
    const recordLocatorState = get(location, 'state.recordLocator');
    const firstName = get(location, 'state.firstName');
    const lastName = get(location, 'state.lastName');
    const recordLocator = recordLocatorState? recordLocatorState: recordLocatorParam;
    const name = {
      firstName: firstName,
      lastName: lastName
    };

    retrieveFlightReservationFn({
      recordLocator: recordLocator,
      ...name,
      hasEditedName,
      passengerSearchToken,
      isLoggedIn: isUserLoggedIn,
      companionInfo,
      dispatchPageLoadComplete: {
        location,
        action
      }
    });
  };

  _refreshReservationDetailsWithSearchToken = (props: Props) => {
    const {
      companionFullName,
      companionName,
      isUserLoggedIn,
      query: { searchToken: passengerSearchToken },
      retrieveFlightReservationWithTokenFn
    } = props;
    const companionInfo = { companionFullName, companionName };

    retrieveFlightReservationWithTokenFn({ isLoggedIn: isUserLoggedIn, passengerSearchToken, companionInfo }, true);
  };

  _onContactInfoClick = () => {
    const { location, push, viewReservationViewPage, params: { recordLocator }, query: { searchToken } = {} } = this.props;
    const queryParams = searchToken ? { searchToken } : {};
    const contactMethodUrl = buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'contactMethod' }), { recordLocator: recordLocator }, queryParams);
    const firstName = _.get(location, 'state.firstName');
    const lastName = _.get(location, 'state.lastName');
    const contactInformationLinks = _.get(viewReservationViewPage, '_links.contactInformation');

    push(contactMethodUrl, null, { clk: 'AOMiten' }, { firstName, lastName, isInternalNav: true, ...contactInformationLinks });
  };

  _onUpgradeMyFlight = () => {
    const { viewReservationViewPage, getUpgradeFareReservationFn, saveUpgradeTypeFn } = this.props;
    const link = _.get(viewReservationViewPage, '_links.upgradeMyFlight');
    const chapiUpgradeType = _.get(viewReservationViewPage, 'upsellDetails.upsellToProductId', 'BUS');

    saveUpgradeTypeFn(getUpgradeQueryParams(chapiUpgradeType));
    link && getUpgradeFareReservationFn({ link });
  };

  render() {
    const { UI_ENCRYPTION, viewReservationSearchRequest, viewReservationViewPage } = this.props;
    const messages = _.get(viewReservationViewPage, 'messages', []);

    return (
      !_.isEmpty(viewReservationViewPage) && (
        <ReservationDetail
          {...viewReservationViewPage}
          messages={messages}
          onContactInfoClick={this._onContactInfoClick}
          onUpgradeMyFlight={this._onUpgradeMyFlight}
          UI_ENCRYPTION={UI_ENCRYPTION}
          viewReservationSearchRequest={viewReservationSearchRequest}
        />
      )
    );
  }
}

const mapStateToProps = (state) => ({
  companionFullName: _.get(state, 'app.account.accountInfo.companionFullName'),
  companionName: _.get(state, 'app.account.accountInfo.companionName'),
  isUserLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  UI_ENCRYPTION: _.get(state, 'app.toggles.UI_ENCRYPTION', false),
  viewReservationSearchRequest: _.get(state, 'app.viewReservation.searchRequest'),
  viewReservationViewPage: state?.app?.viewReservation?.flightReservation
});

const mapDispatchToProps = {
  retrieveFlightReservationFn: viewReservationActions.retrieveFlightReservation,
  retrieveFlightReservationWithTokenFn: viewReservationActions.retrieveFlightReservation,
  clearFlightReservationFn: viewReservationActions.clearFlightReservation,
  saveUpgradeTypeFn: saveUpgradeType,
  getUpgradeFareReservationFn: getUpgradeFareReservation
};

const enhancers = _.flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(ViewReservationDetailPage);
