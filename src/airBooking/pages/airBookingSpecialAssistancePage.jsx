// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import SpecialAssistancePage from 'src/shared/pages/specialAssistancePage';
import { AIR_BOOKING_SPECIAL_ASSISTANCE_FORM } from 'src/shared/constants/formIds';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';

import type { SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  goBack: () => void,
  updateFormDataValueFn: (string, *) => {},
  clearFormDataByIdFn: (string) => {},
  params: { paxNumber: string },
  updatePassengerWithSpecialAssistanceFn: (*, string) => void,
  specialAssistanceFormData?: FormData,
  savedFormData?: SpecialAssistanceType,
  specialAssistanceAnalyticsFn: (boolean) => void
};

const _buildFormId = (paxNumber) => `${AIR_BOOKING_SPECIAL_ASSISTANCE_FORM}_${paxNumber}`;

export class AirBookingSpecialAssistancePage extends React.Component<Props> {
  _onFormSubmit = () => {
    const {
      specialAssistanceFormData,
      updatePassengerWithSpecialAssistanceFn,
      params: { paxNumber },
      clearFormDataByIdFn,
      specialAssistanceAnalyticsFn
    } = this.props;

    updatePassengerWithSpecialAssistanceFn(specialAssistanceFormData, paxNumber);
    _.isEqual(specialAssistanceFormData, DEFAULT_FIELD_VALUES)
      ? specialAssistanceAnalyticsFn(false)
      : specialAssistanceAnalyticsFn(true);
    clearFormDataByIdFn(_buildFormId(paxNumber));
  };

  render() {
    const {
      updateFormDataValueFn,
      savedFormData,
      goBack,
      params: { paxNumber }
    } = this.props;
    const initialFormData = _.merge({}, DEFAULT_FIELD_VALUES, savedFormData);

    return (
      <SpecialAssistancePage
        onSubmit={this._onFormSubmit}
        formId={_buildFormId(paxNumber)}
        goBack={goBack}
        initialFormData={initialFormData}
        updateFormDataValueFn={updateFormDataValueFn}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  specialAssistanceFormData: _.get(state, `app.formData.${_buildFormId(props.params.paxNumber)}.data`),
  savedFormData: _.get(state, `app.airBooking.passengerInfos[${props.params.paxNumber}].specialAssistance`)
});

const mapDispatchToProps = {
  updatePassengerWithSpecialAssistanceFn: AirBookingActions.updatePassengerWithSpecialAssistance,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  specialAssistanceAnalyticsFn: AnalyticsActions.specialAssistanceAnalytics
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(AirBookingSpecialAssistancePage);
