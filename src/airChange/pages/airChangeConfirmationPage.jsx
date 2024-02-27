// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import CarCrossSellBanner from 'src/airBooking/components/carCrossSellBanner';
import {
  getChangeConfirmationPageResponse,
  getPageHeaderSubtitle
} from 'src/airChange/selectors/airChangeConfirmationPageSelectors';
import { getChangeType } from 'src/airChange/selectors/changeTypeSelector';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import Button from 'src/shared/components/button';
import ConfirmationTripHeader from 'src/shared/components/confirmationTripHeader';
import Container from 'src/shared/components/container';
import FundResultsList from 'src/shared/components/fundResultsList';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import NavGroupItemLinks from 'src/shared/components/navGroupItemLinks';
import PageHeader from 'src/shared/components/pageHeader';
import RefundSummary from 'src/shared/components/refundSummary';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import RefundTypes from 'src/shared/constants/refundTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';
import ReaccomBanner from 'src/viewReservation/components/reaccomBanner';

import FlightChangeMessageKey from 'src/airChange/constants/flightChangeMessageKey';

import i18n from '@swa-ui/locale';
import type {
  AirChangeConfirmationPageType,
  ChangeType,
  ReaccomConfirmationPageType
} from 'src/airChange/flow-typed/airChange.types';
import type { GetCarBookingLinkQueryType } from 'src/carBooking/flow-typed/carBooking.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import type { LookUpFundRequestType } from 'src/travelFunds/flow-typed/travelFunds.types';

const { ERROR__REACCOM_TICKETING_FAILURE, ERROR__REACCOM_CHECK_IN_FAILURE } = FlightChangeMessageKey;
const { BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

type Props = {
  push: Push,
  pageHeaderSubtitle: string,
  accountNumber: string,
  changeConfirmationPage: AirChangeConfirmationPageType,
  reaccomConfirmationPage: ReaccomConfirmationPageType | {},
  changeType: ChangeType,
  retrieveTravelFundsFn: (request: LookUpFundRequestType) => void,
  isWebView: boolean,
  prepareCarCrossSellFromQueryAndTransitionToCarBookingFn: (
    carBookingLinkQuery: GetCarBookingLinkQueryType,
    isWebView: boolean
  ) => void
};

export class AirChangeConfirmationPage extends React.Component<Props> {
  _renderReaccomMessages() {
    const messages = _.get(this.props, 'reaccomConfirmationPage.messages');

    if (messages) {
      const reaccomTicketingErrorMessage = _.find(messages, { key: ERROR__REACCOM_TICKETING_FAILURE });
      const reaccomCheckinErrorMessage = _.find(messages, { key: ERROR__REACCOM_CHECK_IN_FAILURE });

      return (
        <div>
          {reaccomTicketingErrorMessage && (
            <ReaccomBanner
              body={_.get(reaccomTicketingErrorMessage, 'body', '')}
              header={_.get(reaccomTicketingErrorMessage, 'header', '')}
              showBodyAsHtml
            />
          )}
          {reaccomCheckinErrorMessage && (
            <ReaccomBanner
              body={_.get(reaccomCheckinErrorMessage, 'body', '')}
              header={_.get(reaccomCheckinErrorMessage, 'header', '')}
              showBodyAsHtml
            />
          )}
        </div>
      );
    }

    return null;
  }

  _renderReaccomMessageInstructions() {
    const reaccomConfirmationMessage = _.get(this.props, 'reaccomConfirmationPage.headerMessage');

    if (reaccomConfirmationMessage) {
      return (
        <MessageWithInstructions
          title={_.get(reaccomConfirmationMessage, 'header', '')}
          mainInstruction={_.get(reaccomConfirmationMessage, 'body', '')}
        />
      );
    }
  }

  _onClickViewTravelFunds() {
    const { changeConfirmationPage, retrieveTravelFundsFn, push } = this.props;

    const checkTravelFunds = _.get(changeConfirmationPage, '_links.checkTravelFunds');

    retrieveTravelFundsFn(checkTravelFunds);
    push(getNormalizedRoute({ routeName: 'travelFundsIndex' }));
  }

  render() {
    const {
      pageHeaderSubtitle,
      accountNumber,
      changeConfirmationPage,
      reaccomConfirmationPage,
      changeType: { downGrade, upGrade },
      prepareCarCrossSellFromQueryAndTransitionToCarBookingFn,
      isWebView
    } = this.props;
    const dates = _.get(changeConfirmationPage, 'dates', _.get(reaccomConfirmationPage, 'dates', {}));
    const destinationDescription = _.get(
      changeConfirmationPage,
      'destinationDescription',
      _.get(reaccomConfirmationPage, 'destinationDescription', '')
    );
    const pnrs = _.get(changeConfirmationPage, 'pnrs', [
      {
        passengers: _.get(reaccomConfirmationPage, 'passengers', []),
        recordLocator: _.get(reaccomConfirmationPage, 'recordLocator', '')
      }
    ]);
    const bounds = _.get(changeConfirmationPage, 'bounds', _.get(reaccomConfirmationPage, 'bounds', []));
    const nonRefundable = _.get(changeConfirmationPage, 'fareSummary.nonRefundable', {});
    const refundable = _.get(changeConfirmationPage, 'fareSummary.refundable', {});
    const youOwe = _.get(changeConfirmationPage, 'fareSummary.youOwe', {});
    const billingInfo = _.get(changeConfirmationPage, 'billingInfo', {});
    const fundsApplied = _.get(changeConfirmationPage, 'fundsApplied', []);
    const _meta = _.get(changeConfirmationPage, '_meta', {});
    const checkTravelFunds = _.get(changeConfirmationPage, '_links.checkTravelFunds', {});
    const purchaseWithPoints = _.get(_meta, 'purchaseWithPoints', false);
    const isReaccomScenario = !_.isEmpty(reaccomConfirmationPage);
    const headerMessage = _.get(changeConfirmationPage, 'headerMessage', {});
    const carBookingQuery = changeConfirmationPage?._links?.carBooking?.query;

    return (
      <div className="air-change-confirmation-page">
        <PageHeader hidden={isWebView}>
          <span className="pr3">{i18n('AIR_CHANGE__CONFIRMATION__HEADER_LABEL')}</span>
          <span className="normal">{pageHeaderSubtitle}</span>
        </PageHeader>
        {isReaccomScenario && this._renderReaccomMessages()}
        {!isReaccomScenario && (
          <MessageWithInstructions title={headerMessage.header} mainInstruction={headerMessage.body} />
        )}
        {isReaccomScenario && this._renderReaccomMessageInstructions()}
        <ConfirmationTripHeader
          dates={dates}
          destinationDescription={destinationDescription}
          pnrs={pnrs}
          bounds={bounds}
        />
        <ReservationFlightSummary bounds={bounds} />
        {!_.isEmpty(changeConfirmationPage) && (
          <RefundSummary
            nonRefundable={nonRefundable}
            refundable={refundable}
            newAmountDue={youOwe}
            purchaseWithPoints={purchaseWithPoints}
            refundMethod={BACK_TO_ORIGINAL_PAYMENT}
            showBriefNotes
            isConfirmationPage
          />
        )}
        {purchaseWithPoints && downGrade && (
          <div className="bggray2 p4">{i18n('AIR_CHANGE__CONFIRMATION__DOWNGRADE_VERBIAGE') + accountNumber}</div>
        )}
        {purchaseWithPoints && upGrade && (
          <div className="bggray2 p4">{i18n('AIR_CHANGE__CONFIRMATION__UPGRADE_VERBIAGE') + accountNumber}</div>
        )}
        {(!_.isEmpty(_.get(billingInfo, 'cardType')) || !_.isEmpty(fundsApplied)) && (
          <FundResultsList
            listTitle={i18n('SHARED__TRIP_BOOKED__AMOUNT_APPLIED')}
            billingInfo={billingInfo}
            retrievedFunds={fundsApplied}
          />
        )}
        <Container noBottomPadding>
          {!_.isEmpty(checkTravelFunds) && (
            <Button
              onClick={() => this._onClickViewTravelFunds()}
              className="view-travel-funds-button"
              size="larger"
              color="blue"
              fluid
            >
              {_.get(checkTravelFunds, 'labelText', 'View Travel Funds')}
            </Button>
          )}
          {carBookingQuery && (
            <CarCrossSellBanner
              onClick={() => prepareCarCrossSellFromQueryAndTransitionToCarBookingFn(carBookingQuery, isWebView)}
            />
          )}
          <NavGroupItemLinks />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const changeConfirmationResponse = getChangeConfirmationPageResponse(state);
  const reaccomConfirmationResponse = _.get(state, 'app.airChange.reaccomConfirmationPage.response');

  return {
    pageHeaderSubtitle: changeConfirmationResponse
      ? getPageHeaderSubtitle(_.get(changeConfirmationResponse, 'bounds', []))
      : getPageHeaderSubtitle(_.get(reaccomConfirmationResponse, 'bounds', [])),
    accountNumber: _.get(state, 'app.account.accountNumber', ''),
    changeConfirmationPage: changeConfirmationResponse,
    reaccomConfirmationPage: reaccomConfirmationResponse,
    changeType: getChangeType(state),
    isWebView: _.get(state, 'app.webView.isWebView')
  };
};

const mapDispatchToProps = {
  retrieveTravelFundsFn: TravelFundsActions.retrieveTravelFunds,
  prepareCarCrossSellFromQueryAndTransitionToCarBookingFn:
    CarBookingActions.prepareCarCrossSellFromQueryAndTransitionToCarBooking
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideLoginButton,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('air-change-confirmation-container')
);

export default enhancers(AirChangeConfirmationPage);
