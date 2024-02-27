// @flow
import _ from 'lodash';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import React from 'react';
import PropTypes from 'prop-types';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import PhoneCountryCodeList from 'src/shared/components/phoneCountryCodeList';
import countryCodes from 'src/shared/constants/countryCode';

type PropsWithModal = {
  nameForPhoneCountryCode: string,
  nameForPhoneNumber: string,
  isISOCountryCode?: boolean,
  className?: string
};

export class PhoneNumberWithModal extends React.Component<PropsWithModal> {
  static contextTypes = {
    form: PropTypes.object
  };

  render() {
    const { nameForPhoneCountryCode, nameForPhoneNumber, isISOCountryCode } = this.props;
    const COUNTRY_CODE_MODAL_ID = _.toUpper(_.snakeCase(nameForPhoneCountryCode));

    const updateCountryCode = ({ countryCode }: { countryCode: string }) => {
      const { onChange } = this.context.form;
      const countryCodeValue = isISOCountryCode ? countryCode : `${countryCodes[countryCode]}`;

      hideFullScreenModal(COUNTRY_CODE_MODAL_ID);
      onChange && onChange(nameForPhoneCountryCode, countryCodeValue);
      onChange && onChange(nameForPhoneNumber, '');
    };

    return (
      <div>
        <PhoneNumberFields
          names={[nameForPhoneCountryCode, nameForPhoneNumber]}
          {...this.props}
          onLabelClick={() => showFullScreenModal(COUNTRY_CODE_MODAL_ID)}
        />
        <FullScreenModal id={COUNTRY_CODE_MODAL_ID}>
          <PhoneCountryCodeList
            onCountryCodeSelect={updateCountryCode}
            onCancel={() => hideFullScreenModal(COUNTRY_CODE_MODAL_ID)}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default PhoneNumberWithModal;
