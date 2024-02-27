// @flow
import React, { Component } from 'react';

import CountryNavItemField from 'src/shared/form/fields/countryNavItemField';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import { getStatesOfUS } from 'src/shared/helpers/optionsHelper';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import CountryList from 'src/shared/components/countryList';

const COUNTRY_LIST_MODAL_ID = 'countryList';

type Props = {
  isoCountryCode: string,
  onCountrySelected: ?(?string) => void
};

export class DestinationAddressFields extends Component<Props> {
  _onSelectCountry = (selectedCountryCode: ?string) => {
    const { onCountrySelected } = this.props;

    onCountrySelected && onCountrySelected(selectedCountryCode);

    hideFullScreenModal(COUNTRY_LIST_MODAL_ID);
  };

  render() {
    const { isoCountryCode } = this.props;
    const isUS = isoCountryCode === 'US';

    return (
      <div className="destination-address">
        <CountryNavItemField
          name="isoCountryCode"
          placeholder="Country"
          onNavItemClick={() => showFullScreenModal(COUNTRY_LIST_MODAL_ID)}
        />
        <FormInputField name="addressLine" placeholder="Street address" maxLength={35} />
        <FormInputField name="city" placeholder="City" />
        {isUS ? (
          <FormSelectField
            name="stateProvinceRegion"
            options={getStatesOfUS()}
            placeholder="State"
            required
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
        <FormInputField
          name="zipOrPostalCode"
          size="large"
          type={isUS ? 'tel' : null}
          placeholder={isUS ? 'ZIP code' : 'Postal Code'}
          {...(isUS ? getMaskProps({ rule: '9', repeat: 5 }) : { maxLength: 10 })}
        />
        <FullScreenModal id={COUNTRY_LIST_MODAL_ID}>
          <CountryList
            title="Select Country"
            selectedIsoCountryCode={isoCountryCode}
            onCancel={() => hideFullScreenModal(COUNTRY_LIST_MODAL_ID)}
            onSelectedCountry={this._onSelectCountry}
          />
        </FullScreenModal>
      </div>
    );
  }
}
