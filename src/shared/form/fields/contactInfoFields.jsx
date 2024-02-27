// @flow

import React from 'react';
import { getCountryOptions, getStatesOfUS } from 'src/shared/helpers/optionsHelper';
import withFields from 'src/shared/form/enhancers/withFields';
import Fields from 'src/shared/components/fields';
import CountryCodeNavItemField from 'src/shared/form/fields/countryCodeNavItemField';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';
import CountryCodeList from 'src/shared/components/countryCodeList';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  showFullScreenModal,
  hideFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

const CONTACT_INFO_FIELDS_MODAL_ID = 'CONTACT_INFO_FIELDS_MODAL_ID';
const CONTACT_INFO_FIELDS_COUNTRY_CODE_MODAL_ID = 'CONTACT_INFO_FIELDS_COUNTRY_CODE_MODAL_ID';
const UNITED_STATES_ISO_CODE = 'US';

type Props = {
  label: string,
  showPhoneNumber: boolean,
  supportModifyCountryCode: boolean,
  formData: FormData,
  onChange: (fieldName: string, fieldValue: *) => void,
  showCountryCodeAsDropDown?: boolean
};

class ContactInfoFields extends React.Component<Props> {
  static defaultProps = {
    label: 'CONTACT INFO',
    showPhoneNumber: true,
    supportModifyCountryCode: false,
    showCountryCodeAsDropDown: false
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { isoCountryCode, phoneCountryCode } = this.props.formData;
    const {
      formData: { isoCountryCode: nextIsoCountryCode, phoneCountryCode: nextPhoneCountryCode },
      showPhoneNumber,
      supportModifyCountryCode
    } = nextProps;

    if (isoCountryCode !== nextIsoCountryCode) {
      this.props.onChange('zipOrPostalCode', '');
      this.props.onChange('stateProvinceRegion', '');
      this.props.onChange('addressLine1', '');
      this.props.onChange('addressLine2', '');
      this.props.onChange('city', '');
      this.props.onChange('phoneCountryCode', nextIsoCountryCode);

      if (showPhoneNumber) {
        this.props.onChange('phoneNumber', '');
      }

      if (!supportModifyCountryCode) {
        this.props.onChange('country', nextIsoCountryCode);
      }
    }

    if (phoneCountryCode !== nextPhoneCountryCode) {
      this.props.onChange('phoneNumber', '');
    }
  }

  _onPhoneNumberCountryCodeSelect = ({ countryCode }: { countryCode: string }) => {
    hideFullScreenModal(CONTACT_INFO_FIELDS_MODAL_ID);
    this.props.onChange('phoneCountryCode', countryCode);
  };

  _onPhoneNumberLabelClicked = () => {
    const { supportModifyCountryCode } = this.props;

    if (supportModifyCountryCode) {
      showFullScreenModal(CONTACT_INFO_FIELDS_MODAL_ID);
    }
  };

  _onCountryCodeSelect = ({ countryCode }: { countryCode: string }) => {
    hideFullScreenModal(CONTACT_INFO_FIELDS_COUNTRY_CODE_MODAL_ID);
    this.props.onChange('isoCountryCode', countryCode);
  };

  render() {
    const {
      formData: { isoCountryCode },
      label,
      showPhoneNumber,
      supportModifyCountryCode,
      showCountryCodeAsDropDown
    } = this.props;
    const isUS = isoCountryCode === UNITED_STATES_ISO_CODE;

    return (
      <div>
        <Fields type="grouped" label={label} className="mt5">
          {showCountryCodeAsDropDown && (
            <FormSelectField name="isoCountryCode" className="country-field" options={getCountryOptions()} />
          )}
          {!showCountryCodeAsDropDown && (
            <CountryCodeNavItemField
              name="isoCountryCode"
              countryCode={isoCountryCode}
              onLabelClick={() => showFullScreenModal(CONTACT_INFO_FIELDS_COUNTRY_CODE_MODAL_ID)}
            />
          )}
          <FormInputField name="addressLine1" placeholder="Street address" maxLength={40} size="large" />
          <FormInputField name="addressLine2" placeholder="Street address 2 (optional)" maxLength={40} size="large" />
          <FormInputField
            name="zipOrPostalCode"
            maxLength={isUS ? isUS : 10}
            placeholder={isUS ? 'ZIP code' : 'Postal Code'}
            type={isUS ? 'tel' : 'text'}
            size="large"
            {...(isUS ? getMaskProps({ rule: '9', repeat: 5 }) : {})}
          />
          <FormInputField name="city" placeholder="City" size="large" />
          {isUS ? (
            <FormSelectField
              name="stateProvinceRegion"
              placeholder={'State'}
              options={getStatesOfUS()}
              className="province-field_us"
              size="large"
            />
          ) : (
            <FormInputField
              name="stateProvinceRegion"
              placeholder="State/Province/Region"
              className="province-field_international"
              size="large"
            />
          )}
          {showPhoneNumber && (
            <PhoneNumberFields
              names={['phoneNumber', 'phoneCountryCode']}
              className="phone-number-field phone-number-field--international"
              onLabelClick={this._onPhoneNumberLabelClicked}
            />
          )}
        </Fields>
        {supportModifyCountryCode && (
          <FullScreenModal id={CONTACT_INFO_FIELDS_MODAL_ID}>
            <PhoneCountryCodeList
              showSearchBar
              onCancel={() => hideFullScreenModal(CONTACT_INFO_FIELDS_MODAL_ID)}
              onCountryCodeSelect={this._onPhoneNumberCountryCodeSelect}
            />
          </FullScreenModal>
        )}
        {!showCountryCodeAsDropDown && (
          <FullScreenModal id={CONTACT_INFO_FIELDS_COUNTRY_CODE_MODAL_ID}>
            <CountryCodeList
              showSearchBar
              onCancel={() => hideFullScreenModal(CONTACT_INFO_FIELDS_COUNTRY_CODE_MODAL_ID)}
              onCountryCodeSelect={this._onCountryCodeSelect}
            />
          </FullScreenModal>
        )}
      </div>
    );
  }
}

export default withFields(ContactInfoFields);
