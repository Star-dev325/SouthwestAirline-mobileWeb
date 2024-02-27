// @flow
import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getSplitPnrReservationForCancel,
  retrieveFlightAndCancelBoundWithSearchToken,
  retrieveRefundQuoteForCancelBound
} from 'src/airCancel/actions/airCancelActions';
import { AIR_CANCEL_FLOW_NAME } from 'src/airCancel/constants/airCancelConstants';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';
import { hideErrorHeaderMsg } from 'src/shared/actions/sharedActions';
import { STATUS } from 'src/shared/constants/flowConstants';
import { AIR_CANCEL_SELECT_PASSENGERS_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import {
  getRefundQuoteRequestData,
  getSelectedPassengerIds,
  getShowEmailFieldWithTexts,
  getSplitPnrLinkObjWithSelectedIdsAndEmail
} from 'src/shared/helpers/selectPassengersHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import SelectPassengersPage from 'src/shared/pages/selectPassengersPage';

import type { CancelBoundRefundQuoteRequestType, RefundQuoteLinkType } from 'src/airCancel/flow-typed/airCancel.types';
import type { SplitPnrDetailsType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  airCancelSplitPnrDetails: SplitPnrDetailsType,
  airCancelSplitPnrLinkObject: Link,
  formData: FormData,
  getSplitPnrReservationForCancelFn: (link: Link) => Promise<*>,
  hideErrorHeaderMsgFn: () => void,
  history: RouterHistoryObject,
  isLoggedIn: boolean,
  isUserLoggedIn: boolean,
  query: {
    searchToken?: string
  },
  recordLocator: string,
  refundQuoteLinkObject: RefundQuoteLinkType,
  retrieveFlightAndCancelBoundWithSearchTokenFn: (string, boolean, boolean) => Promise<*>,
  retrieveRefundQuoteForCancelBoundFn: (request: CancelBoundRefundQuoteRequestType, navigateToAirCancelQuotePage: boolean, isLoggedIn: boolean) => void,
  setFlowStatusFn: (string, string) => *,
  showBoundSelection: boolean,
  updateFormFieldDataValueFn: (formId: string, fieldName: string, value: *) => void
};

export const AirCancelSelectPassengersPage = ({
  airCancelSplitPnrDetails,
  airCancelSplitPnrDetails: { passengerSelections = [] },
  airCancelSplitPnrLinkObject,
  formData,
  getSplitPnrReservationForCancelFn,
  hideErrorHeaderMsgFn,
  history: { push },
  isLoggedIn,
  isUserLoggedIn,
  query: { searchToken = '' } = {},
  recordLocator,
  refundQuoteLinkObject,
  retrieveFlightAndCancelBoundWithSearchTokenFn,
  retrieveRefundQuoteForCancelBoundFn,
  setFlowStatusFn,
  showBoundSelection,
  updateFormFieldDataValueFn
}: Props) => {
  const selectedPassengerIds = getSelectedPassengerIds(formData);
  const showEmailFieldWithTexts = getShowEmailFieldWithTexts(passengerSelections, selectedPassengerIds);

  useEffect(() => {
    const checkCancelBoundSelectPassengerSearchToken = () => {
      setFlowStatusFn(AIR_CANCEL_FLOW_NAME, STATUS.IN_PROGRESS);

      retrieveFlightAndCancelBoundWithSearchTokenFn(searchToken, isLoggedIn, false).then((cancelBoundResponse) => {
        const splitPnrDetails = cancelBoundResponse?.viewForCancelBoundPage?.splitPnrDetails;

        if (!splitPnrDetails) {
          if (showBoundSelection) {
            const queryParams = searchToken ? { searchToken } : {};

            push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'selectBound' }), { recordLocator }, queryParams));
          } else {
            const refundQuoteLink: RefundQuoteLinkType = cancelBoundResponse?.viewForCancelBoundPage?._links?.refundQuote;
            const quoteRequestData: CancelBoundRefundQuoteRequestType = _.merge({}, refundQuoteLink, {
              body: {
                refundRequested: null
              }
            });

            retrieveRefundQuoteForCancelBoundFn(quoteRequestData, true, isLoggedIn);
          }
        }
      });
    };

    if (searchToken && isEmpty(refundQuoteLinkObject)) {
      checkCancelBoundSelectPassengerSearchToken();
    }
  }, []);

  const _onSubmit = () => {
    if (showEmailFieldWithTexts) {
      const splitPnrLinkObjWithSelectedIdsAndEmail = getSplitPnrLinkObjWithSelectedIdsAndEmail(
        formData,
        airCancelSplitPnrLinkObject,
        selectedPassengerIds
      );

      getSplitPnrReservationForCancelFn(splitPnrLinkObjWithSelectedIdsAndEmail);
    } else {
      if (showBoundSelection) {
        const queryParams = searchToken ? { searchToken } : {};

        push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'selectBound' }), { recordLocator }, queryParams));
      } else {
        const refundQuoteRequestData = refundQuoteLinkObject && getRefundQuoteRequestData(refundQuoteLinkObject);

        retrieveRefundQuoteForCancelBoundFn(refundQuoteRequestData, true, isUserLoggedIn);
      }
    }
  };

  return (
    <SelectPassengersPage
      formData={formData}
      formId={AIR_CANCEL_SELECT_PASSENGERS_FORM}
      hideErrorHeaderMsgFn={hideErrorHeaderMsgFn}
      onSubmit={_onSubmit}
      showBoundSelection={showBoundSelection}
      showEmailFieldWithTexts={showEmailFieldWithTexts}
      splitPnrDetails={airCancelSplitPnrDetails}
      updateFormFieldDataValueFn={updateFormFieldDataValueFn}
    />
  );
};

const mapStateToProps = (state) => ({
  airCancelSplitPnrDetails: get(state, 'app.airCancel.cancelBoundPage.response.splitPnrDetails') || {},
  airCancelSplitPnrLinkObject: get(state, 'app.airCancel.cancelBoundPage.response._links.splitPnr') || {},
  formData: get(state, `app.formData.${AIR_CANCEL_SELECT_PASSENGERS_FORM}.data`),
  isUserLoggedIn: get(state, 'app.account.isLoggedIn', false),
  recordLocator: get(state, 'app.airCancel.cancelBoundPage.response.recordLocator'),
  refundQuoteLinkObject: get(state, 'app.airCancel.cancelBoundPage.response._links.refundQuote') || {},
  showBoundSelection: get(state, 'app.airCancel.cancelBoundPage.response._meta.showBoundSelection')
});

const mapDispatchToProps = {
  getSplitPnrReservationForCancelFn: getSplitPnrReservationForCancel,
  hideErrorHeaderMsgFn: hideErrorHeaderMsg,
  retrieveFlightAndCancelBoundWithSearchTokenFn: retrieveFlightAndCancelBoundWithSearchToken,
  retrieveRefundQuoteForCancelBoundFn: retrieveRefundQuoteForCancelBound,
  setFlowStatusFn: FlowStatusActions.setFlowStatus,
  updateFormFieldDataValueFn: updateFormFieldDataValue
};

const enhancers = flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AirCancelSelectPassengersPage);
