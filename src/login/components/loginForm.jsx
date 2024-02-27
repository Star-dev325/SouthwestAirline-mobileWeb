// @flow
import React from 'react';
import _ from 'lodash';

import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';
import { sitePaths } from 'src/shared/constants/siteLinks';
import loginFormValidator from 'src/shared/form/formValidators/loginFormValidator';

type Props = {
  formId: string,
  userNameOrAccountNumber: ?string,
  shouldRememberUser?: boolean,
  isUsingSimpleLogin: boolean,
  isUsingSimpleLoginWithPoints: boolean,
  onSubmit: (*) => void,
  onValidationFailed?: () => void
};

class LoginForm extends React.Component<Props> {
  static defaultProps = {
    isUsingSimpleLogin: false,
    isUsingSimpleLoginWithPoints: false
  };

  render() {
    const { isUsingSimpleLogin, onSubmit, formId, onValidationFailed } = this.props;

    return (
      <Form
        ref="form"
        formId={formId}
        name="login"
        className="login-form"
        onSubmit={onSubmit}
        onValidationFailed={onValidationFailed}
      >
        <Fields type="grouped" divided>
          <FormInputField
            name="userNameOrAccountNumber"
            placeholder="Username or Account number"
            size="huge"
            ref="userNameOrAccountNumber"
          />
          <FormInputField name="password" placeholder="Password" size="huge" ref="password" type="password" />
          <div className="flex">
            <div className="mt4 flex6">
              {!isUsingSimpleLogin && (
                <FormCheckboxField
                  name="shouldRememberUser"
                  className="checkbox-button"
                  size="large"
                  clickableChildren
                  ref="shouldRememberUser"
                >
                  <span className="gray5 large">{i18n('LOGIN__LOGIN_PAGE__REMEMBER_ME')}</span>
                </FormCheckboxField>
              )}
            </div>
            <div className="flex6 mt5 align-right">
              <a className="pblue" href={sitePaths.loginHelpFullSite} target="_blank">
                {i18n('LOGIN__LOGIN_HELP')}
              </a>
            </div>
          </div>
        </Fields>

        <div className="field">
          <Button
            id="login-btn"
            className="mt4"
            ref="submitButton"
            size="larger"
            color="yellow"
            fluid
            type="submit"
            role="submit"
          >
            {i18n('LOGIN__LOGIN_PAGE__BUTTON_TEXT')}
          </Button>
        </div>
      </Form>
    );
  }
}

const enhancers = _.flowRight(
  withHideLoginButton,
  withForm({
    autoClearFormData: false,
    defaultValues: ({ shouldRememberUser, userNameOrAccountNumber }: Props) => ({
      shouldRememberUser,
      userNameOrAccountNumber
    }),
    formValidator: loginFormValidator
  })
);

export default enhancers(LoginForm);
