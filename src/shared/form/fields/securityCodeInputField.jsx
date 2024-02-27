// @flow

import React from 'react';
import _ from 'lodash';

import FormInputMaskAllField from 'src/shared/form/fields/formInputMaskAllField';

type Props = {
  shouldShowSecurityInputField?: boolean,
  showWarningIcon?: boolean,
  name: string
};

export class SecurityCodeInputField extends React.Component<Props> {
  static defaultProps = {
    showWarningIcon: true,
    name: 'securityCode'
  };

  render() {
    const { shouldShowSecurityInputField, showWarningIcon } = this.props;
    const formProps = _.omit(this.props, 'shouldShowSecurityInputField');

    _.isEmpty(_.get(formProps, 'className')) &&
      _.set(formProps, 'className', 'purchase-summary-security-code--input-field');

    return (
      !!shouldShowSecurityInputField && (
        <FormInputMaskAllField
          type="tel"
          placeholder="Security Code (CVV)"
          pattern="[0-9]*"
          showWarningIcon={showWarningIcon}
          maskChar="*"
          maxLength={4}
          {...formProps}
        />
      )
    );
  }
}

export default SecurityCodeInputField;
