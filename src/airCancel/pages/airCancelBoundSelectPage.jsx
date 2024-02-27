// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import { AIR_CANCEL_FLOW_NAME, CANCEL_SPLIT_PNR_CONFIRMATION } from 'src/airCancel/constants/airCancelConstants';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import BoundSelectForm from 'src/shared/components/boundSelect/boundSelectForm';
import Message from 'src/shared/components/message';
import SubHeader from 'src/shared/components/subHeader';
import { STATUS } from 'src/shared/constants/flowConstants';
import { AIR_CANCEL_SELECT_BOUND_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';
import {
  convertBackgroundBrandColor,
  convertBrandColor,
  iconTypeMap
} from 'src/shared/helpers/productDefinitionsHelper';

import type {
  BoundSelectionNoticeType,
  CancelBoundPageType,
  CancelBoundRefundQuoteRequestType,
  RefundQuoteLinkType
} from 'src/airCancel/flow-typed/airCancel.types';
import type { MessageType } from 'src/shared/flow-typed/shared.types';

type Props = {
  cancelBoundPage: CancelBoundPageType,
  hideDialogFn: () => Promise<*>,
  isLoggedIn: boolean,
  query: {
    searchToken?: string
  },
  retrieveFlightAndCancelBoundWithSearchTokenFn: (string, boolean, boolean) => Promise<*>,
  retrieveRefundQuoteForCancelBoundFn: (CancelBoundRefundQuoteRequestType, boolean, boolean) => Promise<*>,
  retrieveFlightAndTravelInformationWithSearchTokenFn: (searchToken: string, passengerReference: string) => void,
  showDialogFn: (*) => Promise<*>,
  selectBoundAnalyticsFn: () => void,
  setFlowStatusFn: (string, string) => *
};

export const AirCancelBoundSelectPage = ({
  cancelBoundPage,
  cancelBoundPage: { _links, messages } = {},
  hideDialogFn,
  isLoggedIn,
  query: { searchToken = '' } = {},
  retrieveFlightAndCancelBoundWithSearchTokenFn,
  retrieveRefundQuoteForCancelBoundFn,
  showDialogFn,
  selectBoundAnalyticsFn,
  setFlowStatusFn
}: Props) => {
  const boundSelections = get(cancelBoundPage, 'boundSelections', []);
  const cancelMessage = get(cancelBoundPage, 'cancelMessage', '');
  const cancelSplitPnrConfirmationMessage =
    messages && messages.find((message) => message.key === CANCEL_SPLIT_PNR_CONFIRMATION);

  useEffect(() => {    
    selectBoundAnalyticsFn();
    
    const retrieveFlightWithSearchToken = () => {
      retrieveFlightAndCancelBoundWithSearchTokenFn(searchToken, isLoggedIn, false).then((cancelBoundResponse) => {
        const showBoundSelection = cancelBoundResponse?.viewForCancelBoundPage?._meta?.showBoundSelection ?? true;

        setFlowStatusFn(AIR_CANCEL_FLOW_NAME, STATUS.IN_PROGRESS);

        if (!showBoundSelection) {
          const refundQuoteLink = cancelBoundResponse?.viewForCancelBoundPage?._links?.refundQuote;
          const quoteRequestData = _.merge({}, refundQuoteLink, {
            body: {
              refundRequested: null
            }
          });

          retrieveRefundQuoteForCancelBoundFn(quoteRequestData, true, isLoggedIn);
        }
      });
    };

    if (searchToken && isEmpty(cancelBoundPage)) {
      retrieveFlightWithSearchToken();
    }
  }, []);

  const _onSubmit = (selections: *) => {
    const { boundSelectionNotice = {}, boundSelections } = cancelBoundPage;
    const productIds = Object.keys(selections).filter((productId) => selections[productId] === true);
    const getSelectedBoundInfo = boundSelections && boundSelections.find((bound) => bound.productId === productIds[0]);
    const refundQuoteLink: RefundQuoteLinkType = get(_links, 'refundQuote');
    const shouldShowModal =
      boundSelectionNotice && getSelectedBoundInfo?.hasInactiveBags && Object.values(boundSelectionNotice).length > 0;
    const quoteRequestData = _.merge({}, refundQuoteLink, {
      body: {
        ...(shouldShowModal ? { cancelAcceptanceConfirmed: true } : {}),
        productIds,
        refundRequested: null
      }
    });

    if (shouldShowModal) {
      _openCancelFlightConfirm(boundSelectionNotice, () =>
        hideDialogFn().then(() => {
          retrieveRefundQuoteForCancelBoundFn(quoteRequestData, true, isLoggedIn);
        })
      );
    } else {
      retrieveRefundQuoteForCancelBoundFn(quoteRequestData, true, isLoggedIn);
    }
  };

  const _renderCancelSplitPnrConfirmationMessage = ({ header, icon, inverseThemeColor, primaryThemeColor }: MessageType) => {
    const backgroundColor = convertBackgroundBrandColor(inverseThemeColor, 'bgpdkblue');
    const textColor = convertBrandColor(primaryThemeColor, 'white');
    const classnames = `split-pnr-confirmation-message ${backgroundColor} ${textColor}`;

    return (
      <Message className={classnames} status={iconTypeMap[icon]}>
        {header}
      </Message>
    );
  };

  const _openCancelFlightConfirm = (messageBody: BoundSelectionNoticeType, confirmOnClickFn: () => Promise<*>) => {
    const { message, title } = messageBody;

    showDialogFn({
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__NO'),
          onClick: hideDialogFn
        },
        {
          label: i18n('SHARED__BUTTON_TEXT__YES'),
          onClick: confirmOnClickFn
        }
      ],
      message,
      name: 'cancel-select-bounds',
      title
    });
  };

  return (
    <div className="cancel-select-bound">
      <SubHeader title={i18n('AIR_CANCEL__SELECT_BOUND__TITLE')} />
      {cancelSplitPnrConfirmationMessage &&
        _renderCancelSplitPnrConfirmationMessage(cancelSplitPnrConfirmationMessage)}
      <div className="flight-cancel--intro">
        <p data-qa="flight-cancel-bound-message">{i18n('AIR_CANCEL__SELECT_BOUND__SELECT_FLIGHTS_TO_CANCEL')}</p>
      </div>
      <BoundSelectForm
        formId={AIR_CANCEL_SELECT_BOUND_FORM}
        onSubmit={_onSubmit}
        boundSelections={boundSelections}
        cancelMessage={cancelMessage}
        selectType="checkbox"
        name="air-cancel"
        boundCancel
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  cancelBoundPage: get(state, 'app.airCancel.cancelBoundPage.response'),
  isLoggedIn: get(state, 'app.account.isLoggedIn')
});

const mapDispatchToProps = {
  getSplitPnrReservationForCancelFn: AirCancelActions.getSplitPnrReservationForCancel,
  hideDialogFn: hideDialog,
  retrieveFlightAndCancelBoundWithSearchTokenFn: AirCancelActions.retrieveFlightAndCancelBoundWithSearchToken,
  retrieveRefundQuoteForCancelBoundFn: AirCancelActions.retrieveRefundQuoteForCancelBound,
  selectBoundAnalyticsFn: AirCancelActions.selectBoundAnalytics,
  showDialogFn: showDialog,
  setFlowStatusFn: FlowStatusActions.setFlowStatus
};

const enhancers = flowRight(withRouter, withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AirCancelBoundSelectPage);
