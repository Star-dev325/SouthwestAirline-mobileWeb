// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';

import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import FormInputField from 'src/shared/form/fields/formInputField';
import CountryNavItemField from 'src/shared/form/fields/countryNavItemField';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import Fields from 'src/shared/components/fields';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import CountryList from 'src/shared/components/countryList';
import { visaFormValidator } from 'src/shared/form/formValidators/visaCardFormValidator';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formData: FormData,
  formId: string,
  onSubmit: (*) => void,
  onChange: (fieldName: string, fieldValue: *) => void,
  onCancel: () => void
};

const COUNTRY_LIST_MODAL_ID = 'countryIssuedByList';

export class CheckInAPISVisaForm extends Component<Props> {
  currentField: *;

  _onCountrySelected = (fieldData: *) => {
    const { onChange } = this.props;

    hideFullScreenModal(COUNTRY_LIST_MODAL_ID);

    onChange(this.currentField, fieldData);
  };

  _showFullScreenModal = (currentField: string) => {
    this.currentField = currentField;
    showFullScreenModal(COUNTRY_LIST_MODAL_ID);
  };

  render() {
    const { formId, onCancel, onSubmit } = this.props;

    return (
      <div>
        <Form formId={formId} name={'passport'} className="apis-form" onSubmit={onSubmit}>
          <PageHeaderWithButtons
            title={i18n('CHECK_IN__VISA__PAGE_TITLE')}
            leftButtons={[{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), onClick: () => onCancel() }]}
            rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__DONE'), type: 'submit' }]}
          />
          <Segments>
            <Segment ordinality="secondary">
              <FormInputField
                name={'number'}
                maxLength={20}
                mask={'*'.repeat(20)}
                maskChar={null}
                placeholder="Visa Number"
              />
              <CountryNavItemField
                name={'country'}
                onNavItemClick={() => this._showFullScreenModal('country')}
                placeholder={'Visa Country'}
              />
              <CountryNavItemField
                name={'issuedBy'}
                onNavItemClick={() => this._showFullScreenModal('issuedBy')}
                placeholder={'Country issued by'}
              />
              <Fields type="grouped" label={i18n('CHECK_IN__VISA__EXPIRATION_DATE')}>
                <FormDatePickerField
                  name={'expiration'}
                  min={dayjs().toDate()}
                  max={dayjs().add(20, 'year').toDate()}
                />
              </Fields>
            </Segment>
          </Segments>
        </Form>
        <FullScreenModal id={COUNTRY_LIST_MODAL_ID}>
          <CountryList
            title="Select Country"
            selectedIsoCountryCode={() => _.get(this.props, `formData.${this.currentField}`) || ''}
            onCancel={() => hideFullScreenModal(COUNTRY_LIST_MODAL_ID)}
            onSelectedCountry={this._onCountrySelected}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withForm({ formValidator: visaFormValidator })(CheckInAPISVisaForm);
