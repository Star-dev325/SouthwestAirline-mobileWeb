// @flow
import i18n from '@swa-ui/locale';
import React, { Component } from 'react';
import Button from 'src/shared/components/button';
import { ContentLink } from 'src/shared/components/contentLink';
import Fields from 'src/shared/components/fields';
import { sitePaths } from 'src/shared/constants/siteLinks';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormInputField from 'src/shared/form/fields/formInputField';
import loginFormValidator from 'src/shared/form/formValidators/loginFormValidator';

type Props = {
  accountNumber: string,
  continueAsGuest?: () => void,
  formId: string,
  isAccountNumberEditable?: boolean,
  isReLoginPointsBooking?: boolean,
  onSubmit: (*) => void,
  onValidationFailed?: () => void
};

export class ReloginForm extends Component<Props> {
  _renderAccountNumberField() {
    const { accountNumber, isAccountNumberEditable } = this.props;

    return isAccountNumberEditable ? (
      <FormInputField
        name="userNameOrAccountNumber"
        placeholder="Username or Account number"
        size="huge"
        ref="userNameOrAccountNumber"
      />
    ) : (
      <div className="input">
        <div className="input--like">{accountNumber}</div>
      </div>
    );
  }

  render() {
    const { continueAsGuest, formId, isReLoginPointsBooking, onSubmit, onValidationFailed } = this.props;

    return (
      <Form
        name="sessionExpiredLogin"
        className="relogin-form"
        formId={formId}
        onSubmit={onSubmit}
        onValidationFailed={onValidationFailed}
      >
        <Fields>
          {this._renderAccountNumberField()}
          <FormInputField name="password" placeholder="Password" size="huge" ref="password" type="password" />
          <div className="flex">
            <div className="mt4 flex6" />
            <div className="flex6 mt5 align-right">
              <a className="pblue log-in-help" href={sitePaths.loginHelpFullSite} target="_blank">
                {i18n('LOGIN__LOGIN_HELP')}
              </a>
            </div>
          </div>
        </Fields>
        <div className="field mt4">
          <Button id="login-btn" ref="submitButton" size="larger" color="yellow" fluid type="submit" role="submit">
            {i18n('LOGIN__LOGIN_PAGE__BUTTON_TEXT')}
          </Button>
        </div>
        {isReLoginPointsBooking && (
          <p className="relogin-form--prompt-point-message">
            {i18n('LOGIN__USING_SIMPLE_LOGIN_WITH_POINTS')}
          </p>
        )}
        {!isReLoginPointsBooking && continueAsGuest && (
          <div className="field center mt4">
            <ContentLink className="continue-as-guest" onClick={continueAsGuest}>
              {i18n('LOGIN__CONTINUE_AS_GUEST')}
            </ContentLink>
          </div>
        )}
      </Form>
    );
  }
}

export default withForm({
  autoClearFormData: false,
  formValidator: loginFormValidator
})(ReloginForm);
