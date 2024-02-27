// @flow

import _ from 'lodash';
import React from 'react';
import Button from 'src/shared/components/button';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import FormRadioField from 'src/shared/form/fields/formRadioField';
import i18n from '@swa-ui/locale';
import ContactTracingFields from 'src/contactTracing/components/contactTracingFields';
import destinationFormValidator from 'src/shared/form/formValidators/destinationFormValidator';
import { DestinationAddressFields } from 'src/checkIn/components/destinationAddressFields';

import type { DestinationConfig } from 'src/contactTracing/flow-typed/contactTracing.types';

const cssClass = 'contact-tracing-form';

type Props = {
  onSubmit: (event: Event) => void,
  formId: string,
  formData: *,
  passengerName: string,
  passengerNumber: number,
  passengerCount: number,
  submitButtonText: string,
  destinationConfig?: DestinationConfig,
  onChange: (string, *) => void,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void
};

export class ContactTracingForm extends React.Component<Props> {
  _onSelectCountry = (selectedCountryCode: ?string) => {
    const { onChange, updateFormDataValueFn, formId } = this.props;

    onChange('isoCountryCode', selectedCountryCode);

    updateFormDataValueFn &&
      updateFormDataValueFn(formId, {
        zipOrPostalCode: '',
        addressLine: '',
        city: '',
        stateProvinceRegion: ''
      });
  };

  render() {
    const {
      formData: { isoCountryCode = '' },
      passengerName,
      passengerNumber,
      passengerCount,
      onSubmit,
      formId,
      submitButtonText,
      destinationConfig = {}
    } = this.props;

    const {
      addressTextWithLinks,
      applyToAllLabel,
      allowApplyToAll,
      collectionNoticeHeader,
      collectionNoticeTextWithLinks,
      termsAndConditionsHeader,
      termsAndConditionsTextWithLinks
    } = destinationConfig;
    const shouldDisplayUseForAll = passengerCount > 1 && passengerNumber === 1;

    return (
      <div className={cssClass}>
        <div className={`${cssClass}--passenger`}>
          <p className={`${cssClass}--passenger-label`}>
            Passenger {passengerNumber} of {passengerCount}
          </p>
          <span className={`${cssClass}--passenger-name`}>{passengerName}</span>
        </div>
        <Form formId={formId} name={'contact-tracing'} onSubmit={onSubmit}>
          <Segments>
            {collectionNoticeTextWithLinks && (
              <Segment>
                {collectionNoticeHeader && <div className={`${cssClass}--info-header`}>{collectionNoticeHeader}</div>}
                <div
                  className={`${cssClass}--info`}
                  dangerouslySetInnerHTML={{ __html: collectionNoticeTextWithLinks }}
                />
              </Segment>
            )}
            <ContactTracingFields destinationConfig={_.omit(destinationConfig, ['addressTextWithLinks'])} />
            {addressTextWithLinks && (
              <Segment>
                <div className="destination-address--info" dangerouslySetInnerHTML={{ __html: addressTextWithLinks }} />
              </Segment>
            )}
            <Segment label={i18n('DESTINATION_ADDRESS')}>
              <DestinationAddressFields isoCountryCode={isoCountryCode} onCountrySelected={this._onSelectCountry} />
            </Segment>
            {allowApplyToAll && shouldDisplayUseForAll && (
              <Segment>
                <FormRadioField className="mt5" label={applyToAllLabel} name="saveForAll" />
              </Segment>
            )}
            {termsAndConditionsTextWithLinks && (
              <Segment className={`${cssClass}--terms-and-conditions`}>
                {termsAndConditionsHeader && (
                  <div className={`${cssClass}--info-header`}>{termsAndConditionsHeader}</div>
                )}
                <div
                  className={`${cssClass}--info`}
                  dangerouslySetInnerHTML={{ __html: termsAndConditionsTextWithLinks }}
                />
              </Segment>
            )}
            <Segment className={`${cssClass}--save-button`}>
              <Button color="yellow" fluid role="submit" size="huge" type="submit">
                {submitButtonText}
              </Button>
            </Segment>
          </Segments>
        </Form>
      </div>
    );
  }
}

const wrapped = withForm({
  formValidator: destinationFormValidator,
  defaultValues: () => ({
    isoCountryCode: 'US'
  })
});

export default wrapped(ContactTracingForm);
