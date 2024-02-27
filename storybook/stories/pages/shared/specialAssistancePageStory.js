import _ from 'lodash';
import React from 'react';

import configureMockStore from 'redux-mock-store';
import SpecialAssistancePage from 'src/shared/pages/specialAssistancePage';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const store = {
  app: {
    formData: {
      TEST_FORM: {
        data: {
          BLIND: false,
          DEAF: false,
          COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
          ASSISTANCE_ANIMAL: false,
          PEANUT_DUST_ALLERGY: false,
          PORTABLE_OXYGEN_CONCENTRATOR: false,
          WHEELCHAIR_ASSISTANCE: 'NONE',
          WHEELCHAIR_STOWAGE: 'NONE',
          WET_BATTERIES: null,
          DRY_BATTERIES: null
        }
      }
    }
  },
  router: {
    location: {
      pathname: 'path'
    }
  }
};
const webViewStore = _.merge({}, store, {
  app: {
    webView: {
      isWebView: true
    }
  }
});

const props = {
  onSubmit: _.noop,
  formId: 'TEST_FORM',
  goBack: _.noop,
  updateFormDataValueFn: _.noop,
  initialFormData: {}
};

const WebViewSpecialAssistancePage = withBodyClass('is-webview')(SpecialAssistancePage);

storiesOf('pages/shared/specialAssistancePage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(store)))
  .add('default', () => {
    return <SpecialAssistancePage {...props} />;
  });

storiesOf('pages/shared/specialAssistancePage', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(webViewStore)))
  .add('ipad webview', () => {
    return <WebViewSpecialAssistancePage {...props} />;
  });
