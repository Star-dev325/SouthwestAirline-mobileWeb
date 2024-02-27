// @flow

import _ from 'lodash';
import cx from 'classnames';
import React, { Component } from 'react';

import Form from 'src/shared/form/components/form';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import FormRadioField from 'src/shared/form/fields/formRadioField';
import withForm from 'src/shared/form/enhancers/withForm';
import { DestinationAddressFields } from 'src/checkIn/components/destinationAddressFields';
import destinationFormValidator from 'src/shared/form/formValidators/destinationFormValidator';
import ContactTracingFields from 'src/contactTracing/components/contactTracingFields';
import i18n from '@swa-ui/locale';
import { CHECK_IN_APIS_DESTINATION_FORM } from 'src/shared/constants/formIds';

import type { CheckInAPISDestinationFormType } from 'src/checkIn/flow-typed/checkIn.types';
import type { DestinationConfig } from 'src/contactTracing/flow-typed/contactTracing.types';

const contactTracingCssClass = 'contact-tracing-form';

type Props = {
  formData: CheckInAPISDestinationFormType,
  destinationConfig?: DestinationConfig,
  onSubmit: (*) => void,
  formId: string,
  onCancel: () => void,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  onChange: (string, *) => void
};

export class CheckInAPISDestinationForm extends Component<Props> {
  _onSelectCountry = (selectedCountryCode: ?string) => {
    const { onChange, updateFormDataValueFn } = this.props;

    onChange('isoCountryCode', selectedCountryCode);

    updateFormDataValueFn &&
      updateFormDataValueFn(CHECK_IN_APIS_DESTINATION_FORM, {
        zipOrPostalCode: '',
        addressLine: '',
        city: '',
        stateProvinceRegion: ''
      });
  };

  render() {
    const { formData, onSubmit, formId, onCancel, destinationConfig = {} } = this.props;
    const isoCountryCode = _.get(formData, 'isoCountryCode', '');
    const {
      title,
      addressTextWithLinks,
      includeContactTracingFields,
      applyToAllLabel,
      allowApplyToAll,
      collectionNoticeHeader,
      collectionNoticeTextWithLinks,
      termsAndConditionsHeader,
      termsAndConditionsTextWithLinks
    } = destinationConfig;
    const finalTitle = !includeContactTracingFields || !title ? 'Destination Address' : title;

    return (
      <div className={cx('apis-destination-page', { 'include-contact-tracing': includeContactTracingFields })}>
        <Form formId={formId} name="destination" className="apis-form" onSubmit={onSubmit}>
          <PageHeaderWithButtons
            title={finalTitle}
            leftButtons={[{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), onClick: onCancel }]}
            rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__DONE'), type: 'submit' }]}
          />
          <Segments>
            {collectionNoticeTextWithLinks && (
              <Segment>
                {collectionNoticeHeader && (
                  <div className={`${contactTracingCssClass}--info-header`}>{collectionNoticeHeader}</div>
                )}
                <div
                  className={`${contactTracingCssClass}--info`}
                  dangerouslySetInnerHTML={{ __html: collectionNoticeTextWithLinks }}
                />
              </Segment>
            )}
            {includeContactTracingFields && (
              <ContactTracingFields
                destinationConfig={_.pick(destinationConfig, [
                  'contactEmailLabel',
                  'contactPhone1Label',
                  'contactPhone2Label'
                ])}
              />
            )}
            {addressTextWithLinks && (
              <Segment>
                <div className="destination-address--info" dangerouslySetInnerHTML={{ __html: addressTextWithLinks }} />
              </Segment>
            )}
            <Segment ordinality="secondary" label={includeContactTracingFields ? i18n('DESTINATION_ADDRESS') : ''}>
              <DestinationAddressFields isoCountryCode={isoCountryCode} onCountrySelected={this._onSelectCountry} />
            </Segment>
            {allowApplyToAll && (
              <Segment>
                <FormRadioField className="mt5" label={applyToAllLabel} name="contactTracingSaveForAllPassengers" />
              </Segment>
            )}
            {termsAndConditionsTextWithLinks && (
              <Segment className={`${contactTracingCssClass}--terms-and-conditions`}>
                {termsAndConditionsHeader && (
                  <div className={`${contactTracingCssClass}--info-header`}>{termsAndConditionsHeader}</div>
                )}
                <div
                  className={`${contactTracingCssClass}--info`}
                  dangerouslySetInnerHTML={{ __html: termsAndConditionsTextWithLinks }}
                />
              </Segment>
            )}
          </Segments>
        </Form>
      </div>
    );
  }
}

export default withForm({
  formValidator: destinationFormValidator,
  defaultValues: () => ({
    isoCountryCode: 'US'
  })
})(CheckInAPISDestinationForm);
