import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import footer from 'mocks/templates/content-delivery/footer';
import React from 'react';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import TransferTravelFundsPage from 'src/travelFunds/pages/transferTravelFundsPage';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import TransferTravelFundsBuilder from 'test/builders/apiResponse/transferTravelFundsBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const EnhancedTransferTravelFundsPage = withBodyClass(['is-webview'])(TransferTravelFundsPage);
const validateFunds = new TransferTravelFundsBuilder().build()

const nonLeisureValidateFunds = _.merge({}, validateFunds, { viewTravelFund: { leisureFund: false } });
const footerLinkRows = footer.results.footer.content.placement.linkRows;
const defaultProps = {
  accountNumber: '123456789',
  checkSessionExpired: _.noop,
  footerLinkRows,
  goBack: _.noop,
  isLoggedIn: true,
  isWebView: false,
  location: {
    search: 'search'
  },
  match: {
    params: {}
  },
  push: _.noop,
  receiptEmailAddress: '',
  setReLoginCallbackFunctionsFn: _.noop,
  TF_PERSONAL_MSG_MAX_CHAR: 340,
  transferTravelFundsFn: _.noop,
  validateFunds: {}
};

const mockStore = createMockStore();
const defaultStore = {
  app: {
    travelFunds: {
      lookUpTravelFundsPage: {
        validateFunds
      }
    },
    account: {
      accountInfo: {
        contactInfo: {
          emailAddress: 'sam.travels@email.com'
        }
      }
    }
  },
  router: {
    location: {
      pathname: '/',
      search: '',
      hash: ''
    }
  }
};
const leisureStore = mockStore(defaultStore);
const nonLeisureStore = mockStore(
  _.merge({}, defaultStore, {
    app: { travelFunds: { lookUpTravelFundsPage: { validateFunds: nonLeisureValidateFunds } } }
  })
);
const webViewStore = mockStore(_.merge({}, defaultStore, { app: { webView: { isWebView: true } } }));
const withNoExpirationTextTravelFundStore = mockStore(
  _.merge({}, defaultStore, {
    app: {
      travelFunds: {
        lookUpTravelFundsPage: { validateFunds: { viewTravelFund: { expirationDateString: 'Expiration: None' } } }
      }
    }
  })
);

storiesOf('pages/travelFunds/TransferTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(leisureStore))
  .add('leisure fund', () => {
    return <TransferTravelFundsPage {...defaultProps} />;
  });

storiesOf('pages/travelFunds/TransferTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(nonLeisureStore))
  .add('non leisure fund', () => {
    return <TransferTravelFundsPage {...defaultProps} />;
  });

storiesOf('pages/travelFunds/TransferTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('in a webview', () => {
    return <EnhancedTransferTravelFundsPage {...defaultProps} />;
  });

storiesOf('pages/travelFunds/TransferTravelFundsPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(withNoExpirationTextTravelFundStore))
  .add('funds with no expiration date text', () => {
    return <EnhancedTransferTravelFundsPage {...defaultProps} />;
  });
