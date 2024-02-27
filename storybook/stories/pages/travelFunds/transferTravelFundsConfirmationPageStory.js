import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';

import createMockStore from 'test/unit/helpers/createMockStore';
import TransferTravelFundsConfirmationPage from 'src/travelFunds/pages/transferTravelFundsConfirmationPage';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import footer from 'mocks/templates/content-delivery/footer';
import transferTravelFundsConfirmation from 'mocks/templates/travelFunds/transferTravelFundsConfirmation';
import transferTravelFundsConfirmationWithPartialSuccess from 'mocks/templates/travelFunds/transferTravelFundsConfirmationWithPartialSuccess';

const EnhancedTransferTravelFundsConfirmationPage = withBodyClass(['is-webview'])(TransferTravelFundsConfirmationPage);
const baseProps = {
  location: {
    search: 'search'
  },
  match: {
    params: {}
  },
  push: _.noop
};

const defaultProps = {
  ...baseProps,
  transferTravelFundsConfirmation
};

const propsWithPartialSuccessMessage = {
  ...baseProps,
  transferTravelFundsConfirmation: transferTravelFundsConfirmationWithPartialSuccess
};

const mockStore = createMockStore();
const store = mockStore({
  app: {
    travelFunds: {
      lookUpTravelFundsPage: {
        transferTravelFundsConfirmation: transferTravelFundsConfirmation
      }
    },
    wcmContent: {
      footer
    },
    webView: {
      isWebView: false
    }
  }
});
const withNoExpirationTextTravelFundStore = mockStore({
  app: {
    travelFunds: {
      lookUpTravelFundsPage: {
        transferTravelFundsConfirmation: {
          ...transferTravelFundsConfirmation,
          originalTravelFund: {
            ...transferTravelFundsConfirmation.originalTravelFund,
            expirationDateString: 'Expiration: None'
          }
        }
      }
    },
    wcmContent: {
      footer
    },
    webView: {
      isWebView: false
    }
  }
});
const webViewStore = mockStore({
  app: {
    travelFunds: {
      lookUpTravelFundsPage: {
        transferTravelFundsConfirmation: _.merge({}, transferTravelFundsConfirmation, {
          originalTravelFund: { leisureFund: true }
        })
      }
    },
    wcmContent: {
      footer
    },
    webView: {
      isWebView: true
    }
  }
});

const partialSuccessStore = mockStore({
  app: {
    travelFunds: {
      lookUpTravelFundsPage: {
        transferTravelFundsConfirmation: propsWithPartialSuccessMessage.transferTravelFundsConfirmation
      }
    },
    wcmContent: {
      footer
    },
    webView: {
      isWebView: false
    }
  }
});

storiesOf('pages/travelFunds/TransferTravelFundsConfirmationPage', module)
  .addDecorator(withFakeClock('2022-02-03'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <TransferTravelFundsConfirmationPage {...defaultProps} />;
  });

storiesOf('pages/travelFunds/TransferTravelFundsConfirmationPage', module)
  .addDecorator(withFakeClock('2022-02-03'))
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('web view', () => {
    return <EnhancedTransferTravelFundsConfirmationPage {...defaultProps} />;
  });

storiesOf('pages/travelFunds/TransferTravelFundsConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(partialSuccessStore))
  .add('with partial success message', () => {
    return <TransferTravelFundsConfirmationPage {...propsWithPartialSuccessMessage} />;
  });

storiesOf('pages/travelFunds/TransferTravelFundsConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(withNoExpirationTextTravelFundStore))
  .add('funds with no expiration date text', () => {
    return <TransferTravelFundsConfirmationPage {...defaultProps} />;
  });
