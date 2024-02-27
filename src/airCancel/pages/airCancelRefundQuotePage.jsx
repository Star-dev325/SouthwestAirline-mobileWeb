// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { 
  cancelReservationByBounds,
  retrieveFlightAndCancelBoundWithSearchToken,
  retrieveRefundQuoteForCancelBound } from 'src/airCancel/actions/airCancelActions';
import AirCancelRefundQuoteForm from 'src/airCancel/components/airCancelRefundQuoteForm';
import { transformToRefundQuoteFormData } from 'src/airCancel/transformers/refundQuoteFormTransformer';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { AIR_CANCEL_REFUND_QUOTE_FORM } from 'src/shared/constants/formIds';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import { REFUND_METHOD } from 'src/shared/constants/refundMethods';
import RefundTypes from 'src/shared/constants/refundTypes';
import SubHeader from 'src/shared/components/subHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';

import type {
  CancelBoundConfirmationRequestType,
  CancelBoundRefundQuoteRequestType,
  CancelRefundQuotePageType
} from 'src/airCancel/flow-typed/airCancel.types';

const { BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

type Props = {
  cancelRefundQuotePage: CancelRefundQuotePageType,
  cancelReservationByBoundsFn: (CancelBoundConfirmationRequestType, boolean) => void,
  hideDialogFn: () => Promise<*>,
  isLoggedIn: boolean,
  query: {
    searchToken?: string
  },
  retrieveFlightAndCancelBoundWithSearchTokenFn: (string, boolean, boolean) => void,
  retrieveRefundQuoteForCancelBoundFn: (CancelBoundRefundQuoteRequestType, boolean, boolean) => void,
  showDialogFn: (*) => Promise<*>
};

export const AirCancelRefundQuotePage = ({
  cancelRefundQuotePage,
  cancelReservationByBoundsFn,
  hideDialogFn,
  isLoggedIn,
  query: { searchToken } = {},
  retrieveFlightAndCancelBoundWithSearchTokenFn,
  retrieveRefundQuoteForCancelBoundFn,
  showDialogFn
}: Props) => {
  let refundOptionChanged = false;

  useEffect(() => {
    if (searchToken && isEmpty(cancelRefundQuotePage)) {
      retrieveFlightAndCancelBoundWithSearchTokenFn(searchToken, isLoggedIn, true);
    }
  }, []);

  const _onSubmit = (formData: *) => {
    const { cancelBoardingPassMessage } = cancelRefundQuotePage;

    if (cancelBoardingPassMessage && cancelBoardingPassMessage.body) {
      _openCancelFlightConfirm(cancelBoardingPassMessage.body, () =>
        hideDialogFn().then(() => {
          _cancelFlights(formData);
        })
      );
    } else {
      _cancelFlights(formData);
    }
  };

  const _cancelFlights = (formData: *) => {
    const { cancel } = _links;
    const bodyParams = {
      body: {
        refundRequested: formData.refundMethod === BACK_TO_ORIGINAL_PAYMENT
      }
    };
    
    requireEmailReceipt && _.set(bodyParams, 'body.receiptEmail', formData.emailReceiptTo);

    const cancelReservationRequestData: CancelBoundConfirmationRequestType = _.merge({}, cancel, bodyParams);

    cancelReservationByBoundsFn(cancelReservationRequestData, isLoggedIn);
  };

  const _openCancelFlightConfirm = (messageBody: string, confirmOnClickFn: () => Promise<*>) => {
    showDialogFn({
      name: 'cancel-bounds-confirmation',
      message: messageBody,
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__NO'),
          onClick: hideDialogFn
        },
        {
          label: i18n('SHARED__BUTTON_TEXT__YES'),
          onClick: confirmOnClickFn
        }
      ]
    });
  };

  const _onRefundOptionChange = (refundMethod: string) => {
    const { refundQuote } = _links;

    if (refundOptionChanged || refundMethod === REFUND_METHOD.HOLD_FUTURE_USE) {
      const quoteRequestData: CancelBoundRefundQuoteRequestType = _.merge({}, refundQuote, {
        body: {
          refundRequested: refundMethod === BACK_TO_ORIGINAL_PAYMENT
        }
      });

      retrieveRefundQuoteForCancelBoundFn(quoteRequestData, false, isLoggedIn);
    }

    refundOptionChanged = true;
  };

  const {
    _links,
    cancelBounds,
    guestPasses,
    headerMessage,
    nonRefundableFunds,
    passengers,
    pointsToCreditAccount,
    pointsToCreditTotal,
    recordLocator,
    recordLocatorLabel,
    refundableFunds,
    refundRequested,
    requireEmailReceipt,
    showRefundableSelection,
    tripTotals
  } = cancelRefundQuotePage;
  const {
    cancelPolicies: { href = '' } = {}
  } = _links ?? {};

  const initialFormData = transformToRefundQuoteFormData(refundRequested);

  return (
    <div className="cancel-flight">
      <SubHeader title={i18n('AIR_CANCEL__HEADER_MESSAGE__TITLE')} />
      {headerMessage && (
        <MessageWithInstructions
          className="cancel-refund-quote--header-message"
          title={headerMessage.header}
          subInstruction={headerMessage.body}
          status="information"
        />
      )}
      <AirCancelRefundQuoteForm
        bounds={cancelBounds}
        cancellationLink={href}
        formId={AIR_CANCEL_REFUND_QUOTE_FORM}
        guestPasses={guestPasses}
        initialFormData={initialFormData}
        nonRefundableFunds={nonRefundableFunds}
        onRefundOptionChange={_onRefundOptionChange}
        onSubmit={_onSubmit}
        passengers={passengers}
        pointsToCreditAccount={pointsToCreditAccount}
        pointsToCreditTotal={pointsToCreditTotal}
        recordLocator={recordLocator}
        recordLocatorLabel={recordLocatorLabel}
        refundableFunds={refundableFunds}
        requireEmailReceipt={requireEmailReceipt}
        showRefundableSelection={showRefundableSelection}
        tripTotals={tripTotals}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  cancelRefundQuotePage: get(state, 'app.airCancel.cancelRefundQuotePage.response'),
  isLoggedIn: get(state, 'app.account.isLoggedIn')
});

const mapDispatchToProps = {
  showDialogFn: showDialog,
  hideDialogFn: hideDialog,
  cancelReservationByBoundsFn: cancelReservationByBounds,
  retrieveFlightAndCancelBoundWithSearchTokenFn: retrieveFlightAndCancelBoundWithSearchToken,
  retrieveRefundQuoteForCancelBoundFn: retrieveRefundQuoteForCancelBound
};

const enhancers = flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AirCancelRefundQuotePage);
