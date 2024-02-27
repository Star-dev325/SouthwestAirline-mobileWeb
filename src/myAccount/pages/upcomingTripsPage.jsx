// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import Container from 'src/shared/components/container';
import AllUpcomingTrips from 'src/myAccount/components/allUpcomingTrips';
import BookingTeaser from 'src/myAccount/components/bookingTeaser';
import MyTripsPageHeader from 'src/myAccount/components/myTripsPageHeader';
import MyTripsNumberHeader from 'src/myAccount/components/myTripsNumberHeader';
import AircraftTypeFooter from 'src/shared/components/aircraftTypeFooter';
import {
  getUpcomingTrips,
  clearUpcomingTrips,
  setTripTypeForDetailsPage
} from 'src/myAccount/actions/myAccountActions';
import { retrieveBookingTeaser } from 'src/wcm/actions/wcmActions';
import {
  getReserveCheckInReservation,
  resetFlowData,
  checkIn,
  transitToBoardingPosition,
  showShareLink,
  goDirectlyToBoardingPasses
} from 'src/checkIn/actions/checkInActions';
import {
  retrieveFlightReservation,
  clearFlightReservation,
  retrieveCarReservation
} from 'src/viewReservation/actions/viewReservationActions';
import { resetSelectedAirportInfo } from 'src/airports/actions/airportInfoActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { retrieveReservationChangeable } from 'src/airChange/actions/airChangeActions';
import {
  checkEnhancedStandbyNearAirport,
  checkStandbyNearAirport
} from 'src/standby/actions/standbyActions';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import {
  getRetrieveReservationInfoFromTrip,
  getCarRetrieveReservationInfoFromTrip
} from 'src/myAccount/helpers/upcomingTripsHelper';
import { getUpgradedBoardingReservation } from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import { pushToPathOnCriteria } from 'src/shared/routeUtils/routeHelper';
import { FLIGHT, CAR } from 'src/myAccount/constants/upcomingTripType';
import MyTripType from 'src/myAccount/constants/myTripType';
import { STATUS } from 'src/shared/constants/flowConstants';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { BookingTeaserType } from 'src/wcm/flow-typed/wcm.types';
import type {
  FlightReservationType,
  FlightRetrieveInfoRequestType,
  RetrieveReservationRequestType,
  CarReservationType
} from 'src/viewReservation/flow-typed/viewReservation.types';
import type {
  PassengerNameRecord,
  Push,
  UpcomingTripPage,
  ViewBoardingPass,
  SplitPnrDetailsType
} from 'src/shared/flow-typed/shared.types';

type StandbyListClickType = {
  enhancedLink?: Link,
  link: Link,
  isNonRevPnr: boolean
};

type Props = {
  push: Push,
  upcomingTripsPage: Array<UpcomingTripPage>,
  isLoggedIn: boolean,
  AIRCRAFT_TYPE_TRIPCARD: boolean,
  bookingTeaser: ?BookingTeaserType,
  retrieveBookingTeaserFn: () => void,
  getUpcomingTripsFn: () => void,
  clearUpcomingTripsFn: () => void,
  getReserveCheckInReservationFn: (PassengerNameRecord, boolean) => void,
  resetCheckInFlowDataFn: () => void,
  checkInFn: (Link) => Promise<*>,
  transitToBoardingPositionFn: () => void,
  setTripTypeForDetailsPageFn: (string) => void,
  retrieveFlightReservationFn: (FlightRetrieveInfoRequestType) => Promise<FlightReservationType>,
  clearFlightReservationFn: () => void,
  retrieveCarReservationFn: (RetrieveReservationRequestType) => Promise<CarReservationType>,
  resetSelectedAirportInfoFn: () => void,
  setFlowStatusFn: (string, string) => void,
  retrieveReservationChangeableFn: (Link) => Promise<*>,
  showShareLinkForCheckinFn: () => void,
  checkStandbyNearAirportFn: (*, boolean, boolean) => void,
  checkEnhancedStandbyNearAirportFn: (*, boolean, boolean) => void,
  goDirectlyToBoardingPassesFn: ({
    viewBoardingPassesLink: ?ViewBoardingPass,
    recordLocator: string,
    firstName?: string,
    lastName?: string
  }) => void,
  UPGRADED_BOARDING: boolean,
  useEnhancedStandbyList: boolean,
  getUpgradedBoardingReservationFn: (link: Link) => void,
  splitPnrDetails: SplitPnrDetailsType
};

export class UpcomingTripsPage extends Component<Props> {
  componentDidMount() {
    this.props.getUpcomingTripsFn();
  }

  componentWillUnmount() {
    this.props.clearUpcomingTripsFn();
  }

  _getPNRByConfirmationNumber = (confirmationNumber: string): PassengerNameRecord => {
    const { upcomingTripsPage } = this.props;
    const trip = _.find(upcomingTripsPage, { confirmationNumber });
    const query = _.get(trip, '_links.viewReservationViewPage.query');

    return {
      recordLocator: confirmationNumber,
      firstName: query['first-name'],
      lastName: query['last-name']
    };
  };

  _checkInToUpcomingTrip = (confirmationNumber: string) => {
    const { getReserveCheckInReservationFn } = this.props;
    const pnr = this._getPNRByConfirmationNumber(confirmationNumber);
    const isOnDetailsPage = false;

    getReserveCheckInReservationFn(pnr, isOnDetailsPage);
  };

  _viewBoardingPositions = (link: Link) => {
    const { isLoggedIn, resetCheckInFlowDataFn, checkInFn, transitToBoardingPositionFn } = this.props;
    const mergedLink = _.merge({}, link, { isLoggedIn });

    resetCheckInFlowDataFn();
    checkInFn(mergedLink).then(() => transitToBoardingPositionFn());
  };

  _goToTripDetails = (tripType: string, tripIndex: number, query?: Link) => {
    const { push, setTripTypeForDetailsPageFn } = this.props;

    setTripTypeForDetailsPageFn(tripType);
    const recordLocator = _.pick(query, 'recordLocator');
    const name = _.pick(query, ['firstName', 'lastName']);

    push(
      buildPathWithParamAndQuery('/my-account/upcoming-trip-details/:tripIndex', { tripIndex }, recordLocator),
      null,
      null,
      name
    );
  };

  _onClickTripCard = (trip: *, tripIndex: number) => {
    const { clearFlightReservationFn, retrieveCarReservationFn } = this.props;
    const { tripType } = trip;

    if (tripType === FLIGHT) {
      clearFlightReservationFn();
      this._goToTripDetails(tripType, tripIndex, getRetrieveReservationInfoFromTrip(trip));
    } else if (tripType === CAR) {
      retrieveCarReservationFn(getCarRetrieveReservationInfoFromTrip(trip)).then(() => {
        this._goToTripDetails(tripType, tripIndex);
      });
    }
  };

  _onSelectNewFlightForCancelledFlight = (confirmationNumber: string) => {
    const {
      push,
      upcomingTripsPage,
      resetSelectedAirportInfoFn,
      setFlowStatusFn,
      retrieveReservationChangeableFn,
      splitPnrDetails
    } = this.props;
    const selectedCard = _.find(upcomingTripsPage, { confirmationNumber });
    const link = _.get(selectedCard, '_links.changeFlightPage');

    resetSelectedAirportInfoFn();
    setFlowStatusFn('airChange', STATUS.IN_PROGRESS);
    retrieveReservationChangeableFn(link).then(() => {
      pushToPathOnCriteria(!!splitPnrDetails, '/air/change/select-passengers', '/air/change', push);
    });
  };

  _viewBoardingPass = (confirmationNumber: string) => {
    const { upcomingTripsPage, resetCheckInFlowDataFn, showShareLinkForCheckinFn, goDirectlyToBoardingPassesFn } =
      this.props;
    const pnr = this._getPNRByConfirmationNumber(confirmationNumber);
    const trip = _.find(upcomingTripsPage, { confirmationNumber });
    const viewBoardingPassIssuance = _.get(trip, '_links.viewBoardingPassIssuance', null);
    const labelText = _.get(viewBoardingPassIssuance, 'labelText');
    const queryParams =
      labelText && labelText.toLowerCase() === 'security document' ? { clk: 'secdoc_upcomingtrips' } : null;

    resetCheckInFlowDataFn();
    showShareLinkForCheckinFn();
    goDirectlyToBoardingPassesFn({ viewBoardingPassesLink: viewBoardingPassIssuance, queryParams, ...pnr });
  };

  _onClickBookATrip = () => {
    this.props.push(getNormalizedRoute({ routeName: 'airBookingIndex' }));
  };

  _onClickStandbyList = ({ enhancedLink, link, isNonRevPnr }: StandbyListClickType) => {
    const {
      checkStandbyNearAirportFn,
      checkEnhancedStandbyNearAirportFn,
      useEnhancedStandbyList
    } = this.props;

    if (useEnhancedStandbyList && enhancedLink) {
      checkEnhancedStandbyNearAirportFn(enhancedLink, true, !isNonRevPnr);
    } else {
      const query = _.get(link, 'query');

      checkStandbyNearAirportFn(query, true, !isNonRevPnr);
    }
  };

  _onTripTypeSelectChange = (path: string) => {
    this.props.push(path);
  };

  render() {
    const {
      upcomingTripsPage,
      bookingTeaser,
      retrieveBookingTeaserFn,
      AIRCRAFT_TYPE_TRIPCARD,
      UPGRADED_BOARDING,
      getUpgradedBoardingReservationFn
    } = this.props;
    const upcomingTripsCount = upcomingTripsPage.length;

    return (
      <div>
        <MyTripsPageHeader
          currentView={MyTripType.UPCOMING_TRIPS.value}
          onTripTypeSelectChange={this._onTripTypeSelectChange}
        />
        <Container>
          <MyTripsNumberHeader value={upcomingTripsCount} type={MyTripType.UPCOMING_TRIPS.value} />
          {upcomingTripsCount > 0 ? (
            <AllUpcomingTrips
              trips={upcomingTripsPage}
              onCheckInButtonClick={this._checkInToUpcomingTrip}
              onViewBoardingPositionsButtonClick={this._viewBoardingPositions}
              onViewBoardingPassButtonClickCb={this._viewBoardingPass}
              onSelectNewFlightForCancelledFlight={this._onSelectNewFlightForCancelledFlight}
              onClickTripCard={this._onClickTripCard}
              onClickStandbyList={this._onClickStandbyList}
              UPGRADED_BOARDING={UPGRADED_BOARDING}
              onUpgradedBoardingButtonClick={getUpgradedBoardingReservationFn}
            />
          ) : (
            <BookingTeaser
              bookingTeaser={bookingTeaser}
              retrieveBookingTeaserFn={retrieveBookingTeaserFn}
              onClickBookATrip={this._onClickBookATrip}
            />
          )}
        </Container>
        {AIRCRAFT_TYPE_TRIPCARD && <AircraftTypeFooter dark />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  useEnhancedStandbyList: _.get(state, 'app.toggles.ENHANCED_STANDBY_LIST', false),
  upcomingTripsPage: _.get(state, 'app.upcomingTrips.upcomingTripsPage', []),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  bookingTeaser: _.get(state, 'app.wcmContent.bookingTeaser.product_feature', {}),
  AIRCRAFT_TYPE_TRIPCARD: _.get(state, 'app.toggles.AIRCRAFT_TYPE_TRIPCARD', false),
  UPGRADED_BOARDING: _.get(state, 'app.toggles.UPGRADED_BOARDING', false),
  splitPnrDetails: _.get(state, 'app.airChange.changeFlightPage.response.splitPnrDetails')
});

const mapDispatchToProps = {
  getUpcomingTripsFn: getUpcomingTrips,
  clearUpcomingTripsFn: clearUpcomingTrips,
  retrieveBookingTeaserFn: retrieveBookingTeaser,
  getReserveCheckInReservationFn: getReserveCheckInReservation,
  resetCheckInFlowDataFn: resetFlowData,
  checkInFn: checkIn,
  transitToBoardingPositionFn: transitToBoardingPosition,
  setTripTypeForDetailsPageFn: setTripTypeForDetailsPage,
  retrieveFlightReservationFn: retrieveFlightReservation,
  clearFlightReservationFn: clearFlightReservation,
  retrieveCarReservationFn: retrieveCarReservation,
  resetSelectedAirportInfoFn: resetSelectedAirportInfo,
  setFlowStatusFn: FlowStatusActions.setFlowStatus,
  retrieveReservationChangeableFn: retrieveReservationChangeable,
  showShareLinkForCheckinFn: showShareLink,
  goDirectlyToBoardingPassesFn: goDirectlyToBoardingPasses,
  checkStandbyNearAirportFn: checkStandbyNearAirport,
  checkEnhancedStandbyNearAirportFn: checkEnhancedStandbyNearAirport,
  getUpgradedBoardingReservationFn: getUpgradedBoardingReservation
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(UpcomingTripsPage);
