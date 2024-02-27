// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import CancellationTitle from 'src/airCancel/components/cancellationTitle';
import RefundSummaryForCancel from 'src/airCancel/components/refundSummaryForCancel';
import { getReserveCheckInReservationWithLink } from 'src/checkIn/actions/checkInActions';
import Button from 'src/shared/components/button';
import Container from 'src/shared/components/container';
import FlightInfoSummary from 'src/shared/components/flightInfoSummary';
import InfoBanner from 'src/shared/components/infoBanner';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import NavItemLink from 'src/shared/components/navItemLink';
import RefundSummaryPassengers from 'src/shared/components/refundSummaryPassengers';
import SubHeader from 'src/shared/components/subHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as TravelFundsActions from 'src/travelFunds/actions/travelFundsActions';

import type { CancelBoundConfirmationPageType } from 'src/airCancel/flow-typed/airCancel.types';
import RefundTypes from 'src/shared/constants/refundTypes';
import type { ConfirmedPassenger, Push } from 'src/shared/flow-typed/shared.types';
import type { LookUpFundRequestType } from 'src/travelFunds/flow-typed/travelFunds.types';

const { BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

type Props = {
  push: Push,
  getReserveCheckInReservationWithLinkFn: (Link) => *,
  cancelBoundConfirmationPage: CancelBoundConfirmationPageType,
  retrieveTravelFundsFn: (request: LookUpFundRequestType) => void
};

export const AirCancelBoundConfirmationPage = ({
  cancelBoundConfirmationPage,
  getReserveCheckInReservationWithLinkFn,
  push,
  retrieveTravelFundsFn
}: Props) => {
  const _passengerDisplayNames = (): Array<ConfirmedPassenger> =>
    _.map(passengers, (passenger) => ({
      displayName: passenger.name,
      accountNumber: passenger.accountNumber
    }));

  const _onCheckInButtonClick = () => {
    const {
      _links: { checkIn }
    } = cancelBoundConfirmationPage;

    if (checkIn) {
      getReserveCheckInReservationWithLinkFn(checkIn);
    }
  };

  const _renderMessages = () =>
    _.map(messages, (message) => (
      <InfoBanner key={message.key} header={message.header} body={message.body} iconTypeColor={'error'} />
    ));

  const _onClickViewTravelFunds = () => {
    const checkTravelFundsLink = get(cancelBoundConfirmationPage, '_links.checkTravelFunds');

    retrieveTravelFundsFn(checkTravelFundsLink);
    push(getNormalizedRoute({ routeName: 'travelFundsIndex' }));
  };

  const {
    _links: { checkIn, checkTravelFunds },
    allowBookAnotherFlight,
    cancelledBounds,
    expirationDateString,
    guestPasses,
    headerMessage,
    messages,
    nonRefundableExpirationDate,
    nonRefundableFunds,
    passengers,
    pointsToCreditAccount,
    pointsToCreditTotal,
    receiptEmail,
    recordLocator,
    recordLocatorLabel,
    refundableFunds,
    refundMessage,
    remainingBounds
  } = cancelBoundConfirmationPage;

  const shouldShowReceiptEmail = receiptEmail && receiptEmail.length > 0;

  return (
    <div className="cancel-bound-confirmation">
      <SubHeader title="Confirmation" />
      {_renderMessages()}
      <MessageWithInstructions
        className="cancel-confirmation--trip-canceled"
        title={headerMessage.header}
        subInstruction={headerMessage.body}
        status={'success'}
      />
      {
        <div>
          <CancellationTitle title={i18n('AIR_CANCEL__FLIGHT_INFO__SUMMARY')} />
          {passengers.length > 0 && (
            <RefundSummaryPassengers
              passengers={_passengerDisplayNames()}
              recordLocator={recordLocator}
              recordLocatorLabel={recordLocatorLabel}
            />
          )}
          <FlightInfoSummary flightDetails={cancelledBounds} />
        </div>
      }
      <RefundSummaryForCancel
        refundableFunds={refundableFunds}
        nonRefundableFunds={nonRefundableFunds}
        refundMethod={BACK_TO_ORIGINAL_PAYMENT}
        pointsToCreditTotal={pointsToCreditTotal}
        pointsToCreditAccount={pointsToCreditAccount}
        nonRefundableExpirationDate={nonRefundableExpirationDate}
        expirationDateString={expirationDateString}
        showRefundableSelection={false}
        guestPasses={guestPasses}
        isConfirmationPage
        boldTopMessage
        isCancelBoundFlow
        forceBackgroundGreen
      />
      {refundMessage && (
        <div className="p5 gray5 large" data-qa="page-level-refund-message">
          {refundMessage}
        </div>
      )}
      {!isEmpty(checkTravelFunds) && (
        <Container noBottomPadding>
          <Button
            onClick={() => _onClickViewTravelFunds()}
            className="view-travel-funds-button"
            size="larger"
            color="blue"
            fluid
          >
            {get(checkTravelFunds, 'labelText', 'View Travel Funds')}
          </Button>
        </Container>
      )}
      {shouldShowReceiptEmail && (
        <div data-qa="receipt-email-container">
          <CancellationTitle title={i18n('SHARED__REFUND_METHOD__REFUND_SUMMARY_RECEIPT_EMAILED_TO')} />
          <div className="receipt-email-container">
            <p className="receipt-email-container--text">{receiptEmail}</p>
          </div>
        </div>
      )}
      {remainingBounds && remainingBounds.length > 0 && (
        <div data-qa="remaining-bounds-container">
          <CancellationTitle title={i18n('AIR_CANCEL__FLIGHT_INFO__UPDATED_TRIP')} />
          {passengers.length > 0 && (
            <RefundSummaryPassengers
              passengers={_passengerDisplayNames()}
              recordLocator={recordLocator}
            />
          )}
          <FlightInfoSummary flightDetails={remainingBounds} />
        </div>
      )}
      <div className="p5">
        {allowBookAnotherFlight && !checkIn && (
          <NavItemLink
            className="link-bar"
            data-qa="link-bar"
            href={getNormalizedRoute({ routeName: 'airBookingIndex' })}
          >
            Book a flight
          </NavItemLink>
        )}
        {checkIn && (
          <Button type="submit" data-qa="check-in-button" size="xlarge" fluid onClick={_onCheckInButtonClick}>
            Check In
          </Button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cancelBoundConfirmationPage: get(state, 'app.airCancel.cancelBoundConfirmationPage.response')
});

const mapDispatchToProps = {
  getReserveCheckInReservationWithLinkFn: getReserveCheckInReservationWithLink,
  retrieveTravelFundsFn: TravelFundsActions.retrieveTravelFunds
};

const enhancers = flowRight(
  withConnectedReactRouter,
  withHideLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirCancelBoundConfirmationPage);
