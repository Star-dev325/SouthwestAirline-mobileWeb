// @flow
import React from 'react';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import FormInputField from 'src/shared/form/fields/formInputField';
import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import manualIrnFormValidator from 'src/shared/form/formValidators/manualIrnFormValidator';
import Field from 'src/shared/components/field';
import i18n from '@swa-ui/locale';

import type { AddManualIrnFormPropsType } from 'src/airBooking/flow-typed/airBooking.types';

export class AddManualIrnForm extends React.Component<AddManualIrnFormPropsType> {
  render() {
    const { onCancel, onSubmit, formId } = this.props;

    return (
      <div className="add-manual-internal-reference-number">
        <Form
          formId={formId}
          name="add-manual-irn"
          className="add-manual-internal-reference-number--form"
          onSubmit={onSubmit}
        >
          <PageHeaderWithButtons
            title={i18n('AIR_BOOKING__CORPORATE_BOOKING__ADD_IRN')}
            rightButtons={[{ name: i18n('AIR_BOOKING__CORPORATE_BOOKING__DONE'), type: 'submit' }]}
            leftButtons={[{ name: i18n('AIR_BOOKING__CORPORATE_BOOKING__CANCEL'), onClick: () => onCancel() }]}
          />
          <Field>
            <FormInputField name="manualIrn" placeholder={i18n('AIR_BOOKING__CORPORATE_BOOKING__IRN')} maxLength={30} />
          </Field>
          <p className="add-manual-internal-reference-number--message">
            {i18n('AIR_BOOKING__CORPORATE_BOOKING__MANUAL_IRN_MESSAGE')}
          </p>
        </Form>
      </div>
    );
  }
}

export default withForm({
  defaultValues: ({ selectedIrn }: AddManualIrnFormPropsType) => ({
    manualIrn: selectedIrn && selectedIrn.manuallyEntered ? selectedIrn.name : ''
  }),
  formValidator: manualIrnFormValidator
})(AddManualIrnForm);
