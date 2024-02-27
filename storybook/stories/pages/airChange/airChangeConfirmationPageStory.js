import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-router';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import configureMockStore from 'redux-mock-store';

import changeConfirmationPageWithPointsDowngradeMoneyUpgrade from 'mocks/templates/air-change/confirmation/pointsDowngradeMoneyUpgrade';
import { AirChangeConfirmationPage } from 'src/airChange/pages/airChangeConfirmationPage';
import AirChangeConfirmationPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/airChangeConfirmationPageBuilder';
import ReaccomConfirmationPageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/change/reaccomConfirmationPageBuilder';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const changeConfirmationPageWithDollarUpgrade = new AirChangeConfirmationPageBuilder()
  .withUpgrade()
  .build().changeConfirmation;
const changeConfirmationPageWithTravelFunds = new AirChangeConfirmationPageBuilder()
  .withUpgradeTravelFunds()
  .build().changeConfirmation;
const changeConfirmationPageWithTravelFundsNoExpiration = new AirChangeConfirmationPageBuilder()
  .withUpgradeTravelFundsNoExpirationDateText()
  .build().changeConfirmation;
const changeConfirmationPagewithUpgradeAdditionalPaid = new AirChangeConfirmationPageBuilder()
  .withUpgradeAdditionalPaid()
  .build().changeConfirmation;
const changeConfirmationPageWithUpgradeWithApplePay = new AirChangeConfirmationPageBuilder()
  .withUpgradeAdditionalPaidWithApplePay()
  .build().changeConfirmation;
const changeConfirmationPageWithDowngradeReturnToTravelFunds = new AirChangeConfirmationPageBuilder()
  .withDowngradeReturnToTravelFunds()
  .build().changeConfirmation;
const reaccomConfirmationPageDefault = new ReaccomConfirmationPageBuilder().build().reaccomConfirmation;
const reaccomConfirmationPageWithTicketingError = new ReaccomConfirmationPageBuilder()
  .withTicketingFailureMessage()
  .build().reaccomConfirmation;
const reaccomConfirmationPageWithCheckinError = new ReaccomConfirmationPageBuilder()
  .withCheckinFailureMessage()
  .build().reaccomConfirmation;

const store = configureMockStore()({
  app: {
    wcmContent: {
      applicationProperties: {}
    }
  },
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});
const webViewStore = configureMockStore()({
  app: {
    webView: {
      isWebView: true
    },
    wcmContent: {
      applicationProperties: {}
    }
  },
  router: {
    location: {
      search: 'search'
    }
  },
  toggles: {}
});
const WebViewAirChangeConfirmationPage = withBodyClass(['is-webview', 'air-change-confirmation-container'])(
  AirChangeConfirmationPage
);
const defaultProps = {
  pageHeaderSubTitle: 'AUS - DAL (Round Trip)'
}

storiesOf('pages/airChange/airChangeConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('upgrade', () => {
    return (
      <AirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPageWithDollarUpgrade}
        changeType={{ upGrade: true, downGrade: false, evenExchange: false }}
        {...defaultProps}
      />
    );
  })
  .add('upgrade - with TravelFunds applied', () => {
    return (
      <AirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPageWithTravelFunds}
        changeType={{ upGrade: true, downGrade: false, evenExchange: false }}
        {...defaultProps}
      />
    );
  })
  .add('upgrade - funds with no expiration date text', () => {
    return (
      <AirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPageWithTravelFundsNoExpiration}
        changeType={{ upGrade: true, downGrade: false, evenExchange: false }}
        {...defaultProps}
      />
    );
  })
  .add('upgrade - Additional Paid', () => {
    return (
      <AirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPagewithUpgradeAdditionalPaid}
        changeType={{ upGrade: true, downGrade: false, evenExchange: false }}
        {...defaultProps}
      />
    );
  })
  .add('upgrade - Additional Paid With Apple Pay', () => {
    return (
      <AirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPageWithUpgradeWithApplePay}
        changeType={{ upGrade: true, downGrade: false, evenExchange: false }}
        {...defaultProps}
      />
    );
  })
  .add('downgrade - with view travel funds credit', () => {
    return (
      <AirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPageWithDowngradeReturnToTravelFunds}
        changeType={{ upGrade: false, downGrade: true, evenExchange: false }}
        {...defaultProps}
      />
    );
  })
  .add('point downgrade money upgrade', () => {
    return (
      <AirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPageWithPointsDowngradeMoneyUpgrade.changeConfirmation}
        changeType={{ upGrade: false, downGrade: true, evenExchange: false }}
        accountNumber={'6689512685'}
        {...defaultProps}
      />
    );
  })
  .add('default reaccom', () => {
    return (
      <AirChangeConfirmationPage
        reaccomConfirmationPage={reaccomConfirmationPageDefault}
        changeType={{}}
        {...defaultProps}
      />
    );
  })
  .add('reaccom with ticketing error', () => {
    return (
      <AirChangeConfirmationPage
        reaccomConfirmationPage={reaccomConfirmationPageWithTicketingError}
        changeType={{}}
        {...defaultProps}
      />
    );
  })
  .add('reaccom with checkin error', () => {
    return (
      <AirChangeConfirmationPage
        reaccomConfirmationPage={reaccomConfirmationPageWithCheckinError}
        changeType={{}}
        {...defaultProps}
      />
    );
  });
storiesOf('pages/airChange/airChangeConfirmationPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(webViewStore))
  .add('in a webview', () => {
    return (
      <WebViewAirChangeConfirmationPage
        changeConfirmationPage={changeConfirmationPageWithDollarUpgrade}
        changeType={{ upGrade: true, downGrade: false, evenExchange: false }}
        isWebView={true}
        {...defaultProps}
      />
    );
  });
