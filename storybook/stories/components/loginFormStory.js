import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import LoginForm from 'src/login/components/loginForm';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { LOGIN_FORM } from 'src/shared/constants/formIds';

const mockStore = createMockedFormStore();

storiesOf('components/loginForm', module)
  .addDecorator(StoryReduxProvider(mockStore))
  .add('default', () => {
    return (
      <div>
        <LoginForm
          formId={LOGIN_FORM}
          onEnrollClick={_.noop}
          onSubmit={_.noop}
          shouldRememberUser={false}
          onValidationFailed={() => {
            mockStore.dispatch(FormDataActions.updateFormFieldDataValue('LOGIN_FORM', 'password', ''));

            const passwordNode = ReactDOM.findDOMNode(this.refs.password);
            passwordNode instanceof HTMLElement && passwordNode.blur();
          }}
        />
      </div>
    );
  })
  .add('with default values', () => {
    return (
      <div>
        <LoginForm
          formId={LOGIN_FORM}
          onEnrollClick={_.noop}
          onSubmit={_.noop}
          shouldRememberUser={true}
          userNameOrAccountNumber={'Default value'}
          password={'some password'}
        />
      </div>
    );
  });
