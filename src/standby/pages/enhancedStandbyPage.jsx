// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import { AIR_CANCEL_FLOW_NAME, AIR_CANCEL_SPLIT_PNR_FLOW_NAME } from 'src/airCancel/constants/airCancelConstants';
import * as SameDayActions from 'src/sameDay/actions/sameDayActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import Button from 'src/shared/components/button';
import Container from 'src/shared/components/container';
import FlightNumber from 'src/shared/components/flightNumber';
import FlightTimes from 'src/shared/components/flightTimes';
import LabelContainer from 'src/shared/components/labelContainer';
import PageHeader from 'src/shared/components/pageHeader';
import SearchFlightsSummaryHeader from 'src/shared/components/searchFlightsSummaryHeader';
import { STATUS } from 'src/shared/constants/flowConstants';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { buildPathWithParamAndQuery, transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as StandbyActions from 'src/standby/actions/standbyActions';
import StandbyList from 'src/standby/components/standbyList';
import * as viewReservationActions from 'src/viewReservation/actions/viewReservationActions';

import type {
  CancelBoundPageType,
  CancelBoundRefundQuoteRequestType,
  RefundQuoteLinkType
} from 'src/airCancel/flow-typed/airCancel.types';
import type { SameDayCancellation } from 'src/sameDay/flow-typed/sameDay.types';
import type { PassengerNameRecord } from 'src/shared/flow-typed/shared.types';
import type { StandbyListPageType } from 'src/standby/flow-typed/standby.types';
import type { FlightRetrieveInfoRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';

type PassengerNameEditStateType = {
  hasEditedName?: boolean,
  passengerSearchToken?: string
};

type LocationStateType = PassengerNameEditStateType & PassengerNameRecord;
type Props = {
  checkEnhancedStandbyNearAirportFn: (*, boolean, boolean) => void,
  hideDialogFn: () => Promise<*>,
  history: {
    action: string,
    push: (string) => void
  },
  isEnhancedStandbyList: boolean,
  isNonRevPnr: boolean,
  isUserLoggedIn: boolean,
  location: HistoryLocationWithState<LocationStateType>,
  retrieveFlightReservationFn: (FlightRetrieveInfoRequestType) => void,
  retrieveRefundQuoteForCancelBoundFn: (CancelBoundRefundQuoteRequestType, boolean, boolean, boolean) => void,
  retrieveReservationForCancelBoundFn: (Link, boolean) => *,
  setFlowStatusFn: (string, string) => void,
  showDialogFn: (*) => Promise<*>,
  standbyListPage: StandbyListPageType,
  retrieveCancelStandbyListingMethodFn: (SameDayCancellation) => void
};

export const EnhancedStandbyPage = ({
  checkEnhancedStandbyNearAirportFn,
  hideDialogFn,
  history,
  isEnhancedStandbyList,
  isUserLoggedIn,
  location,
  retrieveRefundQuoteForCancelBoundFn,
  retrieveReservationForCancelBoundFn,
  setFlowStatusFn,
  showDialogFn,
  standbyListPage = {},
  retrieveCancelStandbyListingMethodFn
}: Props) => {
  const {
    _links,
    cancelStandbyListingMessage = {},
    disclaimerText,
    disclaimerWithLinks,
    faqWithLinks,
    header,
    seatsAvailableText,
    standbyList
  } = standbyListPage;
  const { arrivalTime, date, departureTime, destinationDescription, flightNumber, from, to } = header || {};
  const { search } = location;
  const cancelBoundLabelText = _links?.cancelBound?.labelText;
  const cancelStandbyListingLabelText = _links?.cancelStandbyListing?.labelText;
  const lastUpdateTime = `${i18n('STANDBY__LAST_UPDATED')} ${dayjs().format('MM/DD/YYYY h:mm:ss A')}`;

  useEffect(() => {
    _.isEmpty(standbyListPage) && _onRefreshClicked();
  }, []);

  const _renderStandbyFlightTitle = () => (
    <div className="standby-container--title">
      <div className="standby-container--title-destination-description">{destinationDescription}</div>
      <div className="standby-container--title-airport-info-detail">
        {from} {i18n('STANDBY__TO')}
        <br />
        {to}
      </div>
    </div>
  );

  const _renderStandbyFlightInfo = () => (
    <div className="standby-body--flight-info">
      <LabelContainer className="standby-body--flight-info-label" labelText="Flight">
        <FlightNumber className="standby-body--flight-info-flight-number" flightNumber={flightNumber} />
      </LabelContainer>
      <FlightTimes departureTime={departureTime} arrivalTime={arrivalTime} />
    </div>
  );

  const _onRefreshClicked = () => {
    checkEnhancedStandbyNearAirportFn(transformSearchToQuery(search), false, false);
  };

  const _renderRefreshButton = () => (
    <a className="page-header--right-button" onClick={_onRefreshClicked}>
      {i18n('SHARED__FLIGHT_STATUS__REFRESH')}
    </a>
  );

  const _transitionToAirCancelSelectPassengersPage = () => {
    const { push } = history;

    setFlowStatusFn(AIR_CANCEL_SPLIT_PNR_FLOW_NAME, STATUS.INITIAL);
    push(getNormalizedRoute({ routeName: 'selectPassengers' }));
  };

  const _transitionToCancelBoundSelectPage = (recordLocator: string) => {
    history.push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'selectBound' }), { recordLocator }));
  };

  const _transitionToCancelRefundQuotePage = (cancelBoundPage: CancelBoundPageType) => {
    const refundQuoteLink: RefundQuoteLinkType = cancelBoundPage?._links?.refundQuote;

    const quoteRequestData: CancelBoundRefundQuoteRequestType = Object.assign({}, refundQuoteLink, {
      body: { ...refundQuoteLink?.body, refundRequested: null }
    });

    retrieveRefundQuoteForCancelBoundFn(quoteRequestData, true, isUserLoggedIn, true);
  };

  const _cancelStandbyList = () => {
    const { cancelBound, cancelStandbyListing } = _links;

    if (cancelBound) {
      retrieveReservationForCancelBoundFn(cancelBound, isUserLoggedIn).then(
        ({ viewForCancelBoundPage = {} }: { viewForCancelBoundPage: CancelBoundPageType }) => {
          const { _meta, recordLocator, splitPnrDetails } = viewForCancelBoundPage;
          const showBoundSelection = _meta?.showBoundSelection ?? null;

          setFlowStatusFn(AIR_CANCEL_FLOW_NAME, STATUS.IN_PROGRESS);

          if (splitPnrDetails) {
            _transitionToAirCancelSelectPassengersPage();
          } else if (showBoundSelection) {
            _transitionToCancelBoundSelectPage(recordLocator);
          } else {
            _transitionToCancelRefundQuotePage(viewForCancelBoundPage);
          }
        }
      );
    } else if (cancelStandbyListing) {
      const { body: message, header: title } = cancelStandbyListingMessage;

      raiseSatelliteEvent('squid', { page_description: 'modal: cancel standby' });
      showDialogFn({
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: () => {
              hideDialogFn();
            }
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn().then(() => {
                retrieveCancelStandbyListingMethodFn(cancelStandbyListing);
              });
            }
          }
        ],
        message,
        name: 'enhanced_standby_page_cancel_standby_listing',
        title
      });
    }
  };

  return (
    <div className="enhanced-standby-page">
      <PageHeader>
        <span className="page-title">{i18n('STANDBY__TITLE')}</span>
        {_renderRefreshButton()}
      </PageHeader>
      {!_.isEmpty(header) && (
        <div>
          <SearchFlightsSummaryHeader
            date={date}
            faqWithLinks={faqWithLinks}
            from={from}
            isEnhancedStandby={isEnhancedStandbyList}
            to={to}
          />
          <Container className="standby-container-parent">
            <div className="standby-container">
              {seatsAvailableText && <div className="standby-container--header">{seatsAvailableText}</div>}
              {_renderStandbyFlightTitle()}
              {_renderStandbyFlightInfo()}
              <div className="standby-container--last-update-time">{lastUpdateTime}</div>
              <div className="standby-container--list">
                <StandbyList standbyList={standbyList} isEnhancedStandby />
              </div>
            </div>
          </Container>
          {(cancelStandbyListingLabelText || cancelBoundLabelText) && (
            <div className="standby-button">
              <Button color="blue" fluid onClick={_cancelStandbyList} role="submit" size="larger" type="submit" >
                {cancelStandbyListingLabelText || cancelBoundLabelText}
              </Button>
            </div>
          )}
          {disclaimerText && (
            <div className="standby-disclaimer" data-qa="standby-disclaimer">
              {disclaimerText}
            </div>
          )}
          {disclaimerWithLinks && (
            <div className="standby-wcm" dangerouslySetInnerHTML={{ __html: disclaimerWithLinks }}></div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isEnhancedStandbyList: _.get(state, 'app.toggles.ENHANCED_STANDBY_LIST'),
  isUserLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  standbyListPage: _.get(state, 'app.standby.standbyPage.response.standbyListPage')
});

const mapDispatchToProps = {
  checkEnhancedStandbyNearAirportFn: StandbyActions.checkEnhancedStandbyNearAirport,
  hideDialogFn: hideDialog,
  retrieveCancelStandbyListingMethodFn: SameDayActions.retrieveCancelStandbyListingMethod,
  retrieveFlightReservationFn: viewReservationActions.retrieveFlightReservation,
  retrieveRefundQuoteForCancelBoundFn: AirCancelActions.retrieveRefundQuoteForCancelBound,
  retrieveReservationForCancelBoundFn: AirCancelActions.retrieveReservationForCancelBound,
  setFlowStatusFn: FlowStatusActions.setFlowStatus,
  showDialogFn: showDialog
};

const enhancers = _.flowRight(
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('enhanced-standby-page'),
  withConnectedReactRouter,
  withRouter
);

export default enhancers(EnhancedStandbyPage);
