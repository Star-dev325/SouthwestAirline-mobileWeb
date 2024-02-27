// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as CompanionActions from 'src/companion/actions/companionActions';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import SpecialAssistancePage from 'src/shared/pages/specialAssistancePage';
import { COMPANION_SPECIAL_ASSISTANCE_FORM } from 'src/shared/constants/formIds';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';

import type { SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';

type Props = {
  goBack: () => void,
  updateFormDataValueFn: (string, *) => {},
  clearFormDataByIdFn: (string) => {},
  updateCompanionWithSpecialAssistanceFn: (*) => void,
  specialAssistanceFormData?: *,
  savedFormData?: SpecialAssistanceType
};

export class CompanionSpecialAssistancePage extends React.Component<Props> {
  _onFormSubmit = () => {
    const { specialAssistanceFormData, updateCompanionWithSpecialAssistanceFn, clearFormDataByIdFn } = this.props;

    updateCompanionWithSpecialAssistanceFn(specialAssistanceFormData);
    clearFormDataByIdFn(COMPANION_SPECIAL_ASSISTANCE_FORM);
  };

  render() {
    const { updateFormDataValueFn, savedFormData, goBack } = this.props;
    const initialFormData = _.merge({}, DEFAULT_FIELD_VALUES, savedFormData);

    return (
      <SpecialAssistancePage
        onSubmit={this._onFormSubmit}
        formId={COMPANION_SPECIAL_ASSISTANCE_FORM}
        goBack={goBack}
        initialFormData={initialFormData}
        updateFormDataValueFn={updateFormDataValueFn}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  specialAssistanceFormData: _.get(state, `app.formData.${COMPANION_SPECIAL_ASSISTANCE_FORM}.data`),
  savedFormData: _.get(state, `app.companion.specialAssistance`)
});

const mapDispatchToProps = {
  updateCompanionWithSpecialAssistanceFn: CompanionActions.updateCompanionWithSpecialAssistance,
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  clearFormDataByIdFn: FormDataActions.clearFormDataById
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideGlobalHeader,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CompanionSpecialAssistancePage);
