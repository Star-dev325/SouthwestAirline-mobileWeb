// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getSplitPnrReservationForChange } from 'src/airChange/actions/airChangeActions';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';
import { hideErrorHeaderMsg } from 'src/shared/actions/sharedActions';
import { AIR_CHANGE_SELECT_PASSENGERS_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { get, flowRight } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import {
  getSelectedPassengerIds,
  getShowEmailFieldWithTexts,
  getSplitPnrLinkObjWithSelectedIdsAndEmail
} from 'src/shared/helpers/selectPassengersHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import SelectPassengersPage from 'src/shared/pages/selectPassengersPage';

import type { SplitPnrDetailsType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  airChangeSplitPnrDetails: SplitPnrDetailsType,
  airChangeSplitPnrLinkObj: Link,
  formData: FormData,
  getSplitPnrReservationForChangeFn: (link: Link) => Promise<*>,
  hideErrorHeaderMsgFn: () => void,
  history: RouterHistoryObject,
  query: {
    searchToken: string
  },
  recordLocator: string,
  showAirCancelBoundSelectionPage: boolean,
  updateFormFieldDataValueFn: (formId: string, fieldName: string, value: *) => void
};

export const AirChangeSelectPassengersPage = ({
  airChangeSplitPnrDetails,
  airChangeSplitPnrDetails: { passengerSelections = [] },
  airChangeSplitPnrLinkObj,
  formData,
  getSplitPnrReservationForChangeFn,
  hideErrorHeaderMsgFn,
  history: { push },
  query: { searchToken = '' } = {},
  updateFormFieldDataValueFn
}: Props) => {
  const selectedPassengerIds = getSelectedPassengerIds(formData);
  const showEmailFieldWithTexts = getShowEmailFieldWithTexts(passengerSelections, selectedPassengerIds);

  const _onSubmit = () => {
    if (showEmailFieldWithTexts) {
      const splitPnrLinkObjWithSelectedIdsAndEmail = getSplitPnrLinkObjWithSelectedIdsAndEmail(
        formData,
        airChangeSplitPnrLinkObj,
        selectedPassengerIds
      );

      getSplitPnrReservationForChangeFn(splitPnrLinkObjWithSelectedIdsAndEmail);
    } else {
      const queryParams = searchToken ? { searchToken } : {};

      push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'view' }), {}, queryParams));
    }
  };

  return (
    <SelectPassengersPage
      formData={formData}
      formId={AIR_CHANGE_SELECT_PASSENGERS_FORM}
      hideErrorHeaderMsgFn={hideErrorHeaderMsgFn}
      onSubmit={_onSubmit}
      showBoundSelection
      showEmailFieldWithTexts={showEmailFieldWithTexts}
      splitPnrDetails={airChangeSplitPnrDetails}
      updateFormFieldDataValueFn={updateFormFieldDataValueFn}
    />
  );
};

const mapStateToProps = (state) => ({
  airChangeSplitPnrDetails: get(state, 'app.airChange.changeFlightPage.response.splitPnrDetails') || {},
  airChangeSplitPnrLinkObj: get(state, 'app.airChange.changeFlightPage.response._links.splitPnr') || {},
  formData: get(state, `app.formData.${AIR_CHANGE_SELECT_PASSENGERS_FORM}.data`)
});

const mapDispatchToProps = {
  getSplitPnrReservationForChangeFn: getSplitPnrReservationForChange,
  hideErrorHeaderMsgFn: hideErrorHeaderMsg,
  updateFormFieldDataValueFn: updateFormFieldDataValue
};

const enhancers = flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AirChangeSelectPassengersPage);
