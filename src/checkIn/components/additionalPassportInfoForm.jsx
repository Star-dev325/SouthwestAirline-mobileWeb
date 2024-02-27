// @flow

import _ from 'lodash';
import React, { Component } from 'react';

import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormNavItemField from 'src/shared/form/fields/formNavItemField';
import additionalPassportInfoFormValidator from 'src/shared/form/formValidators/additionalPassportInfoFormValidator';
import { placeHolders } from 'src/checkIn/constants/additionalPassportInfoFormConstants';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  documentTitles?: { [string]: string },
  onSubmit: () => void,
  isLastPAX: boolean,
  formData: FormData,
  passengerName: string,
  onAdditionalNavItemClick: (string) => void
};

class AdditionalPassportInfoForm extends Component<Props> {
  _renderFormNavItemFields = () => {
    const { formData, onAdditionalNavItemClick, documentTitles = {} } = this.props;

    return _.chain(formData)
      .keys()
      .map((key) => (
        <FormNavItemField
          name={key}
          key={key}
          placeholder={documentTitles[key] || placeHolders[key]}
          onNavItemClick={() => onAdditionalNavItemClick(key)}
          shouldShowDisplayValue={false}
        />
      ))
      .value();
  };

  render() {
    const { formId, onSubmit, passengerName, isLastPAX } = this.props;
    const submitButtonText = isLastPAX
      ? i18n('SHARED__BUTTON_TEXT__CONTINUE')
      : i18n('CHECK_IN__CONFIRM_AND_CONTINUE_BUTTON');

    return (
      <Form formId={formId} className="passport-form" onSubmit={onSubmit}>
        <div className="passport-form--passenger">
          <p className="passport-form--passenger-label">{i18n('SHARED__PLACEHOLDER__PASSENGER')}</p>
          <span className="passport-form--passenger-name">{passengerName}</span>
        </div>
        <Segments>
          <Segment ordinality="secondary" className="passport-form--info">
            <div className="gray5">{i18n('SHARED__PLACEHOLDER__TRAVEL_DOCUMENT_INFORMATION')}</div>
            {this._renderFormNavItemFields()}
          </Segment>
          <Segment>
            <Button className="check-in" type="submit" color="yellow" size="huge" fluid>
              {submitButtonText}
            </Button>
          </Segment>
        </Segments>
      </Form>
    );
  }
}

export default withForm({
  formValidator: additionalPassportInfoFormValidator,
  disableFormData: true
})(AdditionalPassportInfoForm);
