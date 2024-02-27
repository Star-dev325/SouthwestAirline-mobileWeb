// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import ManageCarReservationWithDetails from 'src/shared/components/manageCarReservationWithDetails';
import ReservationDetail from 'src/shared/components/reservationDetail';
import SubHeader from 'src/shared/components/subHeader';
import { updateViewBoardingPass } from 'src/shared/actions/sharedActions';
import { prepareCarCrossSellAndTransitionToCarBooking } from 'src/carBooking/actions/carBookingActions';
import { cancelCarReservationAndTransitionToConfirmationPage } from 'src/carCancel/actions/carCancelActions';
import { retrieveFlightReservation, clearFlightReservation } from 'src/viewReservation/actions/viewReservationActions';
import { getUpgradeFareReservation, saveUpgradeType } from 'src/airUpgrade/actions/airUpgradeActions';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import { getUpgradeQueryParams } from 'src/airUpgrade/constants/airUpgradeConstants';
import { FLIGHT, CAR } from 'src/myAccount/constants/upcomingTripType';

import type { AccountCompanionName } from 'src/companion/flow-typed/companion.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { RouterHistory } from 'react-router';
import type {
  FlightReservationType,
  FlightRetrieveRequestType,
  FlightRetrieveInfoRequestType,
  CarReservationType
} from 'src/viewReservation/flow-typed/viewReservation.types';
import type { SearchRequestType } from 'src/carBooking/flow-typed/carBooking.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';

type Props = {
  cancelCarReservationAndTransitionToConfirmationPageFn: (CarReservationType) => void,
  carReservation: ?CarReservationType,
  clearFlightReservationFn: () => void,
  companionFullName?: string,
  companionName?: AccountCompanionName,
  flightReservation: FlightReservationType,
  getUpgradeFareReservationFn: ({ link: Link }) => void,
  hideDialogFn: () => void,
  history: RouterHistory,
  isLoggedIn: boolean,
  location: HistoryLocation,
  prepareCarCrossSellAndTransitionToCarBookingFn: (SearchRequestType) => void,
  push: Push,
  retrieveFlightReservationFn: (retrieveReservationInfo: FlightRetrieveInfoRequestType) => Promise<FlightReservationType>,
  saveUpgradeTypeFn: (upgradeType: string) => void,
  showDialogFn: (options: DialogOptionsType) => void,
  tripType: FLIGHT | CAR,
  UI_ENCRYPTION: boolean,
  updateViewBoardingPassFn: (Link) => void,
  viewReservationSearchRequest: FlightRetrieveRequestType
};

export class UpcomingTripDetailsPage extends Component<Props> {
  componentDidMount() {
    const { tripType } = this.props;

    if (tripType !== CAR) {
      this._refreshReservationDetails();
    }
  }

  componentWillUnmount() {
    this.props.clearFlightReservationFn();
  }

  _refreshReservationDetails = () => {
    const {
      history: { action },
      companionFullName,
      companionName,
      isLoggedIn,
      retrieveFlightReservationFn,
      updateViewBoardingPassFn,
      location
    } = this.props;
    const { recordLocator } = transformSearchToQuery(_.get(location, 'search'));
    const companionInfo = { companionFullName, companionName };
    const name = _.get(location, 'state');

    retrieveFlightReservationFn({
      recordLocator,
      ...name,
      isLoggedIn,
      companionInfo,
      dispatchPageLoadComplete: {
        location,
        action
      }
    }).then((res) => {
      const viewBoardingPassIssuance = _.get(res, '_links.viewBoardingPassIssuance', null);

      viewBoardingPassIssuance && updateViewBoardingPassFn(viewBoardingPassIssuance);
    });
  };

  _onCancelCarReservationClick = (carReservation: CarReservationType) => {
    this.props.cancelCarReservationAndTransitionToConfirmationPageFn(carReservation);
  };

  _onUpgradeMyFlight = () => {
    const { flightReservation, getUpgradeFareReservationFn, saveUpgradeTypeFn } = this.props;
    const link = _.get(flightReservation, '_links.upgradeMyFlight');
    const chapiUpgradeType = _.get(flightReservation, 'upsellDetails.upsellToProductId', 'BUS');

    saveUpgradeTypeFn(getUpgradeQueryParams(chapiUpgradeType));
    link && getUpgradeFareReservationFn({ link });
  };

  _onAddOtherCarClick = (request: SearchRequestType) => {
    this.props.prepareCarCrossSellAndTransitionToCarBookingFn(request);
  };

  _renderCarReservation = (carReservation: ?CarReservationType) => {
    const { hideDialogFn, showDialogFn } = this.props;

    return (
      <div className="lazy-loaded-car">
        {!!carReservation && (
          <div>
            <SubHeader title={'Reservation'} />
            <ManageCarReservationWithDetails
              carReservation={carReservation}
              onCancelCarReservationClick={this._onCancelCarReservationClick}
              onAddOtherCarClick={this._onAddOtherCarClick}
              showDialogFn={showDialogFn}
              hideDialogFn={hideDialogFn}
            />
          </div>
        )}
      </div>
    );
  };

  _onContactInfoClick = () => {
    const { flightReservation, location, push } = this.props;
    const baseUrl = location.pathname;
    const contactInformationGETData = _.get(flightReservation, '_links.contactInformation');

    push(`${baseUrl}/contact-method`, null, { clk: 'AOMupcoming' }, contactInformationGETData);
  };

  render() {
    const { carReservation, flightReservation, isLoggedIn, tripType, UI_ENCRYPTION, viewReservationSearchRequest } =
      this.props;

    return (
      <div data-qa="upcoming-trip-details-page">
        {tripType === FLIGHT && !_.isEmpty(flightReservation) && (
          <ReservationDetail
            {...flightReservation}
            isUserLoggedIn={isLoggedIn}
            onContactInfoClick={() => this._onContactInfoClick()}
            onUpgradeMyFlight={() => this._onUpgradeMyFlight()}
            UI_ENCRYPTION={UI_ENCRYPTION}
            viewReservationSearchRequest={viewReservationSearchRequest}
          />
        )}
        {tripType === CAR && !_.isEmpty(carReservation) && this._renderCarReservation(carReservation)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  carReservation: _.get(state, 'app.viewReservation.carReservation', {}),
  companionFullName: _.get(state, 'app.account.accountInfo.companionFullName'),
  companionName: _.get(state, 'app.account.accountInfo.companionName'),
  flightReservation: _.get(state, 'app.viewReservation.flightReservation', {}),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  tripType: _.get(state, 'app.myAccountPages.tripType'),
  UI_ENCRYPTION: _.get(state, 'app.toggles.UI_ENCRYPTION', false),
  viewReservationSearchRequest: _.get(state, 'app.viewReservation.searchRequest')
});

const mapDispatchToProps = {
  updateViewBoardingPassFn: updateViewBoardingPass,
  retrieveFlightReservationFn: retrieveFlightReservation,
  clearFlightReservationFn: clearFlightReservation,
  prepareCarCrossSellAndTransitionToCarBookingFn: prepareCarCrossSellAndTransitionToCarBooking,
  cancelCarReservationAndTransitionToConfirmationPageFn: cancelCarReservationAndTransitionToConfirmationPage,
  getUpgradeFareReservationFn: getUpgradeFareReservation,
  saveUpgradeTypeFn: saveUpgradeType,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(UpcomingTripDetailsPage);
