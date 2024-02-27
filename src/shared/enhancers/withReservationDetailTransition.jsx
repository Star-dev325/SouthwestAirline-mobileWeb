// @flow

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import { AIR_CANCEL_FLOW_NAME, AIR_CANCEL_SPLIT_PNR_FLOW_NAME } from 'src/airCancel/constants/airCancelConstants';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import { AIR_CHANGE_SPLIT_PNR_FLOW_NAME } from 'src/airChange/constants/airChangeConstants';
import * as AirportInfoActions from 'src/airports/actions/airportInfoActions';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import * as CompanionActions from 'src/companion/actions/companionActions';
import * as ContactTracingActions from 'src/contactTracing/actions/contactTracingActions';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import { showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import BrowserObject from 'src/shared/helpers/browserObject';
import { flowRight, get } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery, transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { pushToPathOnCriteria } from 'src/shared/routeUtils/routeHelper';
import { hasAllInState } from 'src/shared/routeUtils/routeStateHelper';
import * as StandbyActions from 'src/standby/actions/standbyActions';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';

import type {
  CancelBoundPageType,
  CancelBoundRefundQuoteRequestType,
  RefundQuoteLinkType
} from 'src/airCancel/flow-typed/airCancel.types';
import type {
  CheckInPassengerRequestType,
  CheckInViewResDetailRequestType
} from 'src/checkIn/flow-typed/checkIn.types';
import type {
  GreyBoxMessage,
  MessageType,
  PassengerName,
  Push,
  SameDayReservation,
  ViewBoardingPass
} from 'src/shared/flow-typed/shared.types';
import type { StandbyFlightProps } from 'src/standby/components/standbyCard';
import type { Passenger } from 'src/viewReservation/components/passengerReservationInfo';

type Props = {
  _links: {
    addCompanion: ?Link,
    cancelBound: ?Link,
    change: ?Link,
    checkIn: ?Link,
    contactInformation: ?Link,
    contactTracing: ?Link,
    earlyBird: ?Link,
    editPNRPassengers: ?Array<Link>,
    reaccom: ?Link,
    viewBoardingPass: ?ViewBoardingPass,
    viewBoardingPassIssuance: ?ViewBoardingPass,
    viewBoardingPositions: ?Link
  },
  bounds: Array<*>,
  cancelBlockedMessage: ?MessageType,
  cancelBoundPage: ?CancelBoundPageType,
  changeBlockedMessage: ?MessageType,
  checkEnhancedStandbyNearAirportFn: (*, boolean, boolean, *) => void,
  checkInFn: (CheckInPassengerRequestType) => Promise<*>,
  checkInIneligibilityReason: ?string,
  checkStandbyNearAirportFn: (*, boolean, boolean) => void,
  companion: ?*,
  companionFullName: ?string,
  companionName: ?{
    firstName: string,
    lastName: string
  },
  confirmationNumber: string,
  date: string,
  dayOfTravelContactInfo: string,
  destinationAirport: string,
  destinationDescription: string,
  getEarlyBirdReservationFn: (Link, string, boolean) => *,
  getReserveCheckInReservationFn: (CheckInViewResDetailRequestType, boolean) => Promise<*>,
  goDirectlyToBoardingPassesFn: ({
    firstName?: string,
    lastName?: string,
    recordLocator: string,
    viewBoardingPassesLink: ?ViewBoardingPass
  }) => void,
  goToCompanionPricingPageFn: (Link) => *,
  goToContactTracingFn: (Link, string) => *,
  greyBoxMessage: ?GreyBoxMessage,
  greyBoxPassengerMessage: ?GreyBoxMessage,
  hasAnyCancelledFlights: ?boolean,
  hasUnaccompaniedMinor: boolean,
  history: RouterHistoryObject,
  isCheckInEligible: boolean,
  isDynamicWaiver: boolean,
  isInternational: boolean,
  isNonRevPnr?: boolean,
  isUserLoggedIn: boolean,
  location: HistoryLocationWithState<PassengerName>,
  match: HistoryMatch,
  messages: Array<MessageType>,
  originAirport: string,
  pageHeader: string,
  passengers: Array<Passenger>,
  push: Push,
  query: {
    searchToken?: string
  },
  resetCheckInFlowFn: () => void,
  resetSelectedAirportInfoFn: () => void,
  retrieveReaccomFlightProductsFn: (Link) => *,
  retrieveRefundQuoteForCancelBoundFn: (CancelBoundRefundQuoteRequestType, boolean, boolean) => void,
  retrieveReservationChangeableFn: (Link) => *,
  retrieveReservationForCancelBoundFn: (Link, boolean) => *,
  retrieveSameDayBoundInformationFn: (sameDayUpdates: SameDayReservation) => void,
  retrieveTravelInformationFn: (Link, string, string, boolean) => void,
  setFlowStatusFn: (string, string) => *,
  showDialogFn: (*) => Promise<*>,
  showShareLinkFn: () => void,
  standbyFlight?: StandbyFlightProps,
  toggles: {
    AIRCRAFT_TYPE_VIEWRES: boolean,
    ENHANCED_STANDBY_LIST: boolean
  },
  transitToBoardingPositionFn: () => void
};

type State = {
  pnrsWithBoardingPass: Array<*>
};

const withReservationDetailTransition = (Component: *) => {
  class WithReservationDetailTransition extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
    }

    state = {
      pnrsWithBoardingPass: []
    };

    _onViewBoardingPositionsButtonClick = (viewBoardingPosition: *) => {
      const { checkInFn, resetCheckInFlowFn, isUserLoggedIn, transitToBoardingPositionFn } = this.props;

      resetCheckInFlowFn();
      checkInFn(_.merge({}, viewBoardingPosition, { isLoggedIn: isUserLoggedIn })).then(transitToBoardingPositionFn);
    };

    _onViewBoardingPassButtonClickCb = (confirmationNumber: string) => {
      const { _links, goDirectlyToBoardingPassesFn, location, resetCheckInFlowFn, showShareLinkFn } = this.props;
      const { search, state } = location;

      const shouldUseState = hasAllInState(state, ['firstName', 'lastName']);
      const { firstName, lastName } = shouldUseState ? state : transformSearchToQuery(search);

      resetCheckInFlowFn();
      showShareLinkFn();

      const viewBoardingPassIssuance = _links ? _links.viewBoardingPassIssuance : null;
      const labelText = get(viewBoardingPassIssuance, 'labelText');
      const queryParams =
        labelText && labelText.toLowerCase() === 'security document' ? { clk: 'secdoc_Itin_detail' } : null;

      goDirectlyToBoardingPassesFn({
        viewBoardingPassesLink: viewBoardingPassIssuance,
        recordLocator: confirmationNumber,
        firstName,
        lastName,
        queryParams
      });
    };

    _onContactTracingButtonClick = () => {
      const { confirmationNumber, goToContactTracingFn, _links } = this.props;

      const link = get(_links, 'contactTracing');

      link && goToContactTracingFn(link, confirmationNumber);
    };

    _onEarlyBirdButtonClick = () => {
      const { _links, confirmationNumber, getEarlyBirdReservationFn, isUserLoggedIn } = this.props;
      const earlyBirdLink = get(_links, 'earlyBird');

      getEarlyBirdReservationFn(earlyBirdLink, confirmationNumber, isUserLoggedIn);
    };

    _onPassengerNameClick = (passengerReference: string) => {
      const { _links, confirmationNumber, location, retrieveTravelInformationFn } = this.props;
      const { searchToken } = transformSearchToQuery(location?.search);

      const editPNRPassengerLink = _.find(
        _links.editPNRPassengers,
        (editPNRPassenger) => get(editPNRPassenger, 'query.passenger-reference') === passengerReference
      );

      editPNRPassengerLink && retrieveTravelInformationFn(editPNRPassengerLink, confirmationNumber, searchToken, true);
    };

    _addCompanion = () => {
      const {
        _links: { addCompanion },
        goToCompanionPricingPageFn
      } = this.props;

      addCompanion && goToCompanionPricingPageFn(addCompanion);
    };

    _changeFlight = () => {
      const {
        _links: {
          change,
          reaccom
        },
        changeBlockedMessage,
        history: {
          push
        },
        query: {
          searchToken
        },
        resetSelectedAirportInfoFn,
        retrieveReaccomFlightProductsFn,
        retrieveReservationChangeableFn,
        setFlowStatusFn,
        showDialogFn
      } = this.props;

      resetSelectedAirportInfoFn();
      setFlowStatusFn('airChange', STATUS.IN_PROGRESS);

      if (changeBlockedMessage) {
        showDialogFn({
          name: changeBlockedMessage.key,
          title: changeBlockedMessage.header,
          message: changeBlockedMessage.body,
          closeLabel: 'OK'
        });
      } else if (reaccom) {
        retrieveReaccomFlightProductsFn(reaccom).then(() => push(getNormalizedRoute({ routeName: 'airReaccomView' })));
      } else if (change) {
        retrieveReservationChangeableFn(change).then((response) => {
          const splitPnrDetails = get(response, 'changeFlightPage.splitPnrDetails');
          const queryParams = searchToken ? { searchToken } : {};

          !!splitPnrDetails && setFlowStatusFn(AIR_CHANGE_SPLIT_PNR_FLOW_NAME, STATUS.INITIAL);

          pushToPathOnCriteria(
            !!splitPnrDetails,
            buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'airChangeSelectPassengers' }), {}, queryParams),
            buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'airChangeView' }), {}, queryParams),
            push
          );
        });
      } else {
        // backup error in case CHAPI doesn't send an error but also doesn't send a change or reaccom link
        showDialogFn({
          name: 'change-flight-ineligible',
          message: i18n('AIR_CHANGE__ERROR'),
          closeLabel: 'OK'
        });
      }
    };

    _cancelFlight = () => {
      this._retrieveReservationForCancel();
    };

    _retrieveReservationForCancel() {
      const {
        _links: { cancelBound },
        cancelBlockedMessage,
        isUserLoggedIn,
        retrieveReservationForCancelBoundFn,
        setFlowStatusFn,
        showDialogFn
      } = this.props;

      if (cancelBlockedMessage) {
        showDialogFn({
          name: cancelBlockedMessage.key,
          title: cancelBlockedMessage.header,
          message: cancelBlockedMessage.body,
          closeLabel: 'OK'
        });
      } else if (cancelBound) {
        const actionResult = retrieveReservationForCancelBoundFn(cancelBound, isUserLoggedIn);

        actionResult.then((response) => {
          const showBoundSelection = get(response, 'viewForCancelBoundPage._meta.showBoundSelection', null);
          const recordLocator = get(response, 'viewForCancelBoundPage.recordLocator');
          const splitPnrDetails = get(response, 'viewForCancelBoundPage.splitPnrDetails');

          setFlowStatusFn(AIR_CANCEL_FLOW_NAME, STATUS.IN_PROGRESS);

          if (splitPnrDetails) {
            this._transitionToAirCancelSelectPassengersPage();
          } else {
            if (showBoundSelection) {
              this._transitionToCancelBoundSelectPage(recordLocator);
            } else {
              this._transitionToCancelRefundQuotePage();
            }
          }
        });
      } else {
        // backup error in case CHAPI doesn't send an error but also doesn't send a cancel link
        showDialogFn({
          name: 'cancel-flight-ineligible',
          message: i18n('AIR_CANCEL__MANAGE_NON_CANCELABLE_RESERVATION'),
          closeLabel: 'OK'
        });
      }
    }

    _transitionToAirCancelSelectPassengersPage() {
      const {
        push,
        query: { searchToken },
        setFlowStatusFn
      } = this.props;

      const queryParams = searchToken ? { searchToken } : {};

      setFlowStatusFn(AIR_CANCEL_SPLIT_PNR_FLOW_NAME, STATUS.INITIAL);
      push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'airCancelSelectPassengers' }), {}, queryParams));
    }

    _onCheckBagsButtonClick = (checkBagsHref: string) => {
      const { window } = BrowserObject;

      window.open(checkBagsHref, '_self');
    };

    _transitionToCancelBoundSelectPage(recordLocator: string) {
      const {
        push,
        query: { searchToken }
      } = this.props;

      const queryParams = searchToken ? { searchToken } : {};

      push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'airCancelSelectBound' }), {
        recordLocator
      }, queryParams));
    }

    _transitionToCancelRefundQuotePage() {
      const { cancelBoundPage, retrieveRefundQuoteForCancelBoundFn, isUserLoggedIn } = this.props;

      const refundQuoteLink: RefundQuoteLinkType = get(cancelBoundPage, '_links.refundQuote');
      const quoteRequestData: CancelBoundRefundQuoteRequestType = _.merge({}, refundQuoteLink, {
        body: {
          refundRequested: null
        }
      });

      retrieveRefundQuoteForCancelBoundFn(quoteRequestData, true, isUserLoggedIn);
    }

    _onCheckInButtonClick = (checkIn: *) => {
      const { confirmationNumber: recordLocator, getReserveCheckInReservationFn } = this.props;

      const isOnDetailsPage = false;
      const query = get(checkIn, 'query');
      const { 'first-name': firstName, 'last-name': lastName } = query;

      getReserveCheckInReservationFn({ firstName, lastName, recordLocator }, isOnDetailsPage);
    };

    _onClickStandbyList = ({ isNonRevPnr, link: { query }, enhancedLink }) => {
      const {
        checkEnhancedStandbyNearAirportFn,
        checkStandbyNearAirportFn,
        confirmationNumber: recordLocator,
        location: { state },
        toggles
      } = this.props;
      const { firstName, lastName } = state;
      const shouldUseEnhancedStandbyList = toggles?.ENHANCED_STANDBY_LIST && !!enhancedLink;

      if (shouldUseEnhancedStandbyList) {
        checkEnhancedStandbyNearAirportFn(enhancedLink, true, !isNonRevPnr, {
          firstName,
          lastName,
          recordLocator
        });
      } else {
        checkStandbyNearAirportFn(query, true, !isNonRevPnr);
      }
    };

    _onDetailsButtonClick = ({ recordLocator, firstName, lastName }) => {
      this.props.history.push(
        buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'viewReservationView' }), { recordLocator: recordLocator }),
        { firstName, lastName }
      );
    };

    _onSameDayButtonClick = (sameDayUpdate) => {
      const { retrieveSameDayBoundInformationFn } = this.props;

      retrieveSameDayBoundInformationFn(sameDayUpdate);
    };

    render() {
      return (
        <Component
          {...this.props}
          onClickStandbyList={this._onClickStandbyList}
          onPassengerNameClick={this._onPassengerNameClick}
          onViewBoardingPositionsButtonClick={this._onViewBoardingPositionsButtonClick}
          onViewBoardingPassButtonClickCb={this._onViewBoardingPassButtonClickCb}
          onContactTracingButtonClick={this._onContactTracingButtonClick}
          onEarlyBirdButtonClick={this._onEarlyBirdButtonClick}
          onCancelFlightClick={this._cancelFlight}
          onAddCompanionButtonClick={this._addCompanion}
          onCheckInButtonClick={this._onCheckInButtonClick}
          onCheckBagsButtonClick={this._onCheckBagsButtonClick}
          onChangeFlightClick={this._changeFlight}
          onDetailsButtonClick={this._onDetailsButtonClick}
          onSameDayButtonClick={this._onSameDayButtonClick}
        />
      );
    }
  }

  const mapStateToProps = (state) => ({
    cancelBoundLink: get(state, 'app.airCancel.cancelBoundPage.response._links.cancelBound'),
    cancelBoundPage: get(state, 'app.airCancel.cancelBoundPage.response'),
    companionName: get(state, 'app.account.accountInfo.companionName'),
    companionFullName: get(state, 'app.account.accountInfo.companionFullName'),
    isUserLoggedIn: get(state, 'app.account.isLoggedIn')
  });

  const mapDispatchToProps = {
    retrieveReservationForCancelBoundFn: AirCancelActions.retrieveReservationForCancelBound,
    goToContactTracingFn: ContactTracingActions.goToContactTracing,
    getEarlyBirdReservationFn: EarlyBirdActions.getEarlyBirdReservation,
    goToCompanionPricingPageFn: CompanionActions.goToCompanionPricingPage,
    retrieveReservationChangeableFn: AirChangeActions.retrieveReservationChangeable,
    retrieveReaccomFlightProductsFn: AirChangeActions.retrieveReaccomFlightProducts,
    retrieveTravelInformationFn: ViewReservationActions.retrieveTravelInformation,
    resetCheckInFlowFn: CheckInActions.resetFlowData,
    showShareLinkFn: CheckInActions.showShareLink,
    checkInFn: CheckInActions.checkIn,
    getReserveCheckInReservationFn: CheckInActions.getReserveCheckInReservation,
    transitToBoardingPositionFn: CheckInActions.transitToBoardingPosition,
    setFlowStatusFn: FlowStatusActions.setFlowStatus,
    goDirectlyToBoardingPassesFn: CheckInActions.goDirectlyToBoardingPasses,
    resetSelectedAirportInfoFn: AirportInfoActions.resetSelectedAirportInfo,
    showDialogFn: showDialog,
    checkStandbyNearAirportFn: StandbyActions.checkStandbyNearAirport,
    checkEnhancedStandbyNearAirportFn: StandbyActions.checkEnhancedStandbyNearAirport,
    retrieveRefundQuoteForCancelBoundFn: AirCancelActions.retrieveRefundQuoteForCancelBound,
    retrieveSameDayBoundInformationFn: ViewReservationActions.retrieveSameDayBoundInformation
  };

  return flowRight(
    withRouter,
    withFeatureToggles,
    withConnectedReactRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(WithReservationDetailTransition);
};

export default withReservationDetailTransition;
