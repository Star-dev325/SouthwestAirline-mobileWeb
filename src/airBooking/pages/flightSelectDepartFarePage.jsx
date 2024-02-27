// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import SelectFare from 'src/airBooking/components/selectFare';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { get, flowRight } from 'src/shared/helpers/jsUtils';
import { fetchFareDetailsJson } from 'src/wcm/actions/wcmActions';

import type { FlightSelectFarePage } from 'src/airBooking/flow-typed/airBooking.types';

export const FlightSelectDepartFarePage = (props: FlightSelectFarePage) => <SelectFare {...props} />;

export const mapStateToProps = (state: any) => ({
  accountInfo: get(state, 'app.account.accountInfo'),
  fareDetailsLink: get(state, 'app.airBooking.flightShoppingPage.response.flightShoppingPage._links.fareDetailsJson'),
  isWebView: get(state, 'app.webView.isWebView'),
  placements: get(state, 'app.airBooking.flightSelectFarePagePlacements'),
  productDefinitions: get(state, 'app.airBooking.flightShoppingPage.response.flightShoppingPage.productDefinitions'),
  selectedCompanyName: get(state, 'app.account.corporateInfo.selectedCompany.companyName'),
  tier: get(state, 'app.account.userInfo.customers.UserInformation.tier'),
  ...get(state, `app.airBooking.selectedFlight.outbound`)
});

const mapDispatchToProps = {
  fetchFareDetailsJsonFn: fetchFareDetailsJson,
  getFlightSelectFarePagePlacementsFn: AirBookingActions.getFlightSelectFarePagePlacements,
  selectFlightProductFn: AirBookingActions.selectFlightProduct,
  sortFlightProductsFn: AirBookingActions.sortFlightProducts
};

const enhancers = flowRight(
  withRouter,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('flight-select-fare-page')
);

export default enhancers(FlightSelectDepartFarePage);
