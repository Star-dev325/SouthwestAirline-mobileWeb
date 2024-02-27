// @flow
import React, { Component } from 'react';

import SpecialAssistanceForm from 'src/shared/form/components/specialAssistanceForm';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  onSubmit: () => void,
  formId: string,
  goBack: () => void,
  updateFormDataValueFn: (string, *) => {},
  initialFormData?: FormData
};

class SpecialAssistancePage extends Component<Props> {
  render() {
    const { updateFormDataValueFn, formId, onSubmit, goBack, initialFormData } = this.props;

    return (
      <SpecialAssistanceForm
        formId={formId}
        goBack={goBack}
        onSubmit={onSubmit}
        initialFormData={initialFormData}
        updateFormDataValueFn={updateFormDataValueFn}
      />
    );
  }
}

export default withBodyClass('special-assistance-page')(SpecialAssistancePage);
