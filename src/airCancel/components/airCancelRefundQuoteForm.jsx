// @flow
import React from 'react';
import _ from 'lodash';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import Button from 'src/shared/components/button';
import CancellationBoundsRefundInfo from 'src/airCancel/components/cancellationBoundsRefundInfo';
import { airCancelSummaryFormValidator } from 'src/shared/form/formValidators/airCancelFormValidators';
import CancellationTitle from 'src/airCancel/components/cancellationTitle';
import FlightInfoSummary from 'src/shared/components/flightInfoSummary';
import RefundSummaryForCancel from 'src/airCancel/components/refundSummaryForCancel';
import type { CurrencyType, BriefBoundType, ConfirmedPassenger } from 'src/shared/flow-typed/shared.types';
import type {
  CurrencyLabelType,
  PassengerRecordType,
  GuestPassType
} from 'src/airCancel/flow-typed/airCancel.types';
import RefundSummaryPassengers from 'src/shared/components/refundSummaryPassengers';
import FormInputField from 'src/shared/form/fields/formInputField';
import RefundMethod from 'src/shared/components/refundMethod';
import RefundInfoPerType from 'src/shared/components/refundInfoPerType';
import GuestPassesSection from 'src/shared/components/guestPassesSection';
import i18n from '@swa-ui/locale';

type Props = {
  bounds: Array<BriefBoundType>,
  cancellationLink: ?string,
  formData: *,
  formId: string,
  guestPasses: ?GuestPassType,
  nonRefundableFunds: ?CurrencyLabelType,
  onRefundOptionChange: (*) => void,
  onSubmit: (*) => void,
  passengers: Array<PassengerRecordType>,
  pointsToCreditAccount: ?string,
  pointsToCreditTotal: ?CurrencyLabelType,
  recordLocator: string,
  recordLocatorLabel: string,
  refundableFunds: ?CurrencyLabelType,
  requireEmailReceipt: boolean,
  showRefundableSelection: boolean,
  tripTotals: ?Array<CurrencyType>,
};

class AirCancelRefundQuoteForm extends React.Component<Props> {
  _passengerTransformer = (passengerRecords: Array<PassengerRecordType>): Array<ConfirmedPassenger> =>
    _.map(passengerRecords, (record) => ({
      displayName: record.name,
      firstName: null,
      lastName: null,
      accountNumber: record.accountNumber
    }));

  render() {
    const {
      bounds,
      cancellationLink,
      formData: { refundMethod },
      formId,
      guestPasses,
      nonRefundableFunds,
      onRefundOptionChange,
      onSubmit,
      passengers,
      pointsToCreditAccount,
      pointsToCreditTotal,
      recordLocator,
      recordLocatorLabel,
      refundableFunds,
      requireEmailReceipt,
      showRefundableSelection,
      tripTotals
    } = this.props;
    const passengerDisplayNames = this._passengerTransformer(passengers);
    const showCancelRefundSummary =
      !!refundableFunds || !!nonRefundableFunds || (!!pointsToCreditTotal && pointsToCreditAccount);
    const pointsTotal = tripTotals && tripTotals.length > 1 ? _.get(tripTotals, '0') : null;
    const refundableFundsSubText = refundableFunds?.itemSubText ? refundableFunds?.itemSubText : i18n('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');

    return (
      <div>
        <Form name="airCancelRefundQuoteForm" className="air-cancel-summary-form" onSubmit={onSubmit} formId={formId}>
          <div className="p5">
            <RefundSummaryPassengers
              className="bd"
              passengers={passengerDisplayNames}
              recordLocator={recordLocator}
              recordLocatorLabel={recordLocatorLabel}
            />
          </div>
          <CancellationTitle
            title={i18n('AIR_CANCEL__FLIGHT_INFO__CANCEL_FLIGHT_RESERVATION')}
            className="flight-info-header"
          />
          <div className="mx5 my4 bd">
            <FlightInfoSummary
              recordLocator={recordLocator}
              passengers={passengerDisplayNames}
              flightDetails={bounds}
            />
            {tripTotals && <CancellationBoundsRefundInfo priceTotals={tripTotals} />}
          </div>
          {tripTotals && !!pointsToCreditTotal && pointsTotal && (
            <RefundInfoPerType
              className="mx5 my4 bd"
              label={pointsToCreditTotal.item}
              amount={pointsTotal}
              hideRefundMessage
            />
          )}
          {tripTotals && !!refundableFunds && (
            <div>
              <RefundInfoPerType
                className="mx5 mt4 bd bdl bdr"
                label={refundableFunds.item}
                amount={refundableFunds}
                hideRefundMessage
              />
              {showRefundableSelection && (
                <div className="mx5 mb4 bdb bdl bdr">
                  <div className="cancel-refund-quote">
                    <RefundMethod isCancelOneBound onRefundOptionChange={onRefundOptionChange} />
                  </div>
                </div>
              )}
              {!showRefundableSelection && (
                <div className="mx5 mb4 bdb bdl bdr p5 bgwhite" data-qa="non-refundable-method">
                  <span className="large gray4">{refundableFundsSubText}</span>
                </div>
              )}

              {!!guestPasses && (
                <GuestPassesSection
                  item={guestPasses.item}
                  itemSubText={guestPasses.itemSubText}
                />
              )}
            </div>
          )}

          {tripTotals && !!nonRefundableFunds && (
            <div>
              <RefundInfoPerType
                className="mx5 mt4 bd bdl bdr"
                label={nonRefundableFunds.item}
                amount={nonRefundableFunds}
                hideRefundMessage
              />
              <div className="mx5 mb4 bdb bdl bdr p5 bgwhite" data-qa="non-refundable-method">
                <span className="large gray4">{i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE')}</span>
              </div>
            </div>
          )}
          {requireEmailReceipt && (
            <div className="require-receipt-field mt4">
              <CancellationTitle
                title={i18n('AIR_CANCEL__FLIGHT_INFO__EMAIL_RECEIPT_TO')}
                data-qa="email-receipt-header"
              />
              <FormInputField
                name="emailReceiptTo"
                placeholder={i18n('SHARED__PLACEHOLDER__EMAIL_ADDRESS')}
                type="email"
              />
            </div>
          )}
          <div className="px5 pb5">
            <a href={cancellationLink} target="_blank" className="pblue medium cancellation-policy">
              {i18n('AIR_CANCEL__WCM_LINK')}
            </a>
          </div>
          {showCancelRefundSummary && (
            <RefundSummaryForCancel
              refundableFunds={refundableFunds}
              nonRefundableFunds={nonRefundableFunds}
              pointsToCreditTotal={pointsToCreditTotal}
              refundMethod={refundMethod}
              pointsToCreditAccount={pointsToCreditAccount}
              boldTopMessage
              isCancelBoundFlow
              showRefundableSelection={showRefundableSelection}
              guestPasses={guestPasses}
            />
          )}

          <div className="bgpblue p5 bd bdsdkblue">
            <Button type="submit" data-qa="cancel-button" size="xlarge" fluid>
              {i18n('AIR_CANCEL__HEADER_MESSAGE__TITLE_FORM')}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withForm({
  formValidator: airCancelSummaryFormValidator
})(AirCancelRefundQuoteForm);
