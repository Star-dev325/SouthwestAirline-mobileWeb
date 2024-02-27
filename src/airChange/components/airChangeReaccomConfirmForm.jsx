// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import Button from 'src/shared/components/button';
import Fields from 'src/shared/components/fields';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormInputField from 'src/shared/form/fields/formInputField';
import changeReaccomConfirmFormValidator from 'src/shared/form/formValidators/airChangeReaccomConfirmFormValidator';

type Props = {
  formId: string,
  needsEmailAddress?: boolean,
  onSubmit: (*) => void
};

export class AirChangeReaccomConfirmForm extends React.Component<Props> {
  render() {
    const { formId, needsEmailAddress, onSubmit } = this.props;

    return (
      <Form className="air-change-reaccom-form" formId={formId} name="airChangeReaccomForm" onSubmit={onSubmit}>
        {needsEmailAddress && (
          <div className="air-change-reaccom-form--receipt-email">
            <div className="mb4">
              <Fields
                className="form-fields--receipt-email"
                label={i18n('AIR_CHANGE__PRICE_DIFFERENCE__EMAIL_RECEIPT_TO')}
                type="grouped"
              >
                <FormInputField
                  className="air-change-reaccom-form--receipt-email-field"
                  name="fulfillmentEmail"
                  placeholder={i18n('SHARED__PLACEHOLDER__EMAIL_ADDRESS')}
                  type="email"
                />
              </Fields>
            </div>
          </div>
        )}

        <div className="air-change-reaccom-form--submit">
          <div className="air-change-reaccom-form--disclaimer" data-qa="air-change--hazmat-disclaimer">
            {i18n('AIR_CHANGE__REACCOM_SHOPPING__REACCOM_CONDITIONS')}
          </div>

          <Button
            className="reaccom-confirm-change"
            color="yellow"
            data-qa="air-reaccom-confirm-change-button"
            fluid
            size="larger"
            type="submit"
          >
            {i18n('AIR_CHANGE__REACCOM_SHOPPING__CONFIRM_CHANGE')}
          </Button>
        </div>
      </Form>
    );
  }
}

export default withForm({
  autoClearFormData: false,
  formValidator: changeReaccomConfirmFormValidator
})(AirChangeReaccomConfirmForm);