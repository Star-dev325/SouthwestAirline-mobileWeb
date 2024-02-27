import _ from 'lodash';
import createMockStore from 'test/unit/helpers/createMockStore';
import React from 'react';
import { RELOGIN_FORM } from 'src/shared/constants/formIds';
import ReloginForm from 'src/login/components/reloginForm';
import ReLoginModal from 'src/login/components/reLoginModal';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

const mockStore = createMockStore();
const reLoginModalStore = mockStore({
  app: {
    account: {
      accountNumber: '601400125'
    },
    reLoginModal: {
      reLoginLocation: '/test/path',
      isActive: true,
      reLoginModalOptions: {
        hasCancelButton: false,
        shouldRedirectToHomePage: false,
        isAccountNumberEditable: false
      },
      retryFunctions: [_.noop],
      reLoginCallbackFunctions: {
        continueAsGuestFn: _.noop,
        postLoginCallbackFn: _.noop
      }
    }
  }
});

const reLoginModalWithCancelAndEditStore = mockStore({
  app: {
    account: {
      accountNumber: '601400125'
    },
    reLoginModal: {
      reLoginLocation: '/test/path',
      isActive: true,
      reLoginModalOptions: {
        hasCancelButton: true,
        shouldRedirectToHomePage: false,
        isAccountNumberEditable: true
      },
      retryFunctions: [_.noop],
      reLoginCallbackFunctions: {
        continueAsGuestFn: _.noop,
        postLoginCallbackFn: _.noop
      }
    }
  }
});

storiesOf('components/reLoginModal', module)
  .addDecorator(StoryReduxProvider(reLoginModalStore))
  .add('default', () => {
    return <ReLoginModal />;
  });

storiesOf('components/reLoginModal', module)
  .addDecorator(StoryReduxProvider(reLoginModalWithCancelAndEditStore))
  .add('with cancel button and editable account number field', () => {
    return <ReLoginModal />;
  });
