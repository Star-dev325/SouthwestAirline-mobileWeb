// @flow
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import countryCodes from 'src/shared/constants/countryCode';
import FormInputField from 'src/shared/form/fields/formInputField';
import i18n from '@swa-ui/locale';
import withFields from 'src/shared/form/enhancers/withFields';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  isISOCountryCode: boolean,
  phoneNumberMaxLength: number,
  formData: FormData,
  nameForPhoneCountryCode: string,
  nameForPhoneNumber: string,
  className?: string
};

class PhoneNumberFields extends React.Component<Props> {
  static contextTypes = {
    form: PropTypes.object
  };

  static defaultProps = {
    isISOCountryCode: true,
    phoneNumberMaxLength: 12,
    nameForPhoneCountryCode: 'phoneCountryCode',
    nameForPhoneNumber: 'phoneNumber'
  };

  UNSAFE_componentWillMount() {
    const { nameForPhoneCountryCode } = this.props;

    this.context.form.register(nameForPhoneCountryCode);
  }

  componentWillUnmount() {
    const { nameForPhoneCountryCode } = this.props;

    this.context.form.unregister(nameForPhoneCountryCode);
  }

  _getCountryCodePrefix(isISOCountryCode, countryCodeValue) {
    if (_.isUndefined(countryCodeValue)) {
      return '1';
    }

    if (!isISOCountryCode) {
      return countryCodeValue;
    } else {
      return `${countryCodes[countryCodeValue]}`;
    }
  }

  _isUS() {
    const { isISOCountryCode, formData, nameForPhoneCountryCode } = this.props;

    return this._getCountryCodePrefix(isISOCountryCode, formData[nameForPhoneCountryCode]) === '1';
  }

  render() {
    const {
      nameForPhoneCountryCode,
      nameForPhoneNumber,
      isISOCountryCode,
      phoneNumberMaxLength,
      formData,
      className,
      ...restProps
    } = this.props;

    let formatChars = { '*': '[0-9]' };
    let maskChar = null;
    let maskStr = '*'.repeat(12);

    if (this._isUS()) {
      formatChars = null;
      maskChar = undefined;
      maskStr = '999-999-9999';
    }

    return (
      <FormInputField
        fieldClassName={className}
        name={nameForPhoneNumber}
        placeholder={i18n('SHARED__PLACEHOLDER__PHONE_NUMBER')}
        labelStyles="mr4"
        label={`+${this._getCountryCodePrefix(isISOCountryCode, formData[nameForPhoneCountryCode])}`}
        labelLeft
        type="tel"
        size="large"
        mask={maskStr}
        maskChar={maskChar}
        maxLength={phoneNumberMaxLength || maskStr.length}
        formatChars={formatChars}
        {...restProps}
      />
    );
  }
}

export default withFields(PhoneNumberFields);
