import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import configureMockStore from 'redux-mock-store';
import { EarlyBirdReviewPage } from 'src/earlyBird/pages/earlyBirdReviewPage';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';

const store = configureMockStore()({
  app: {},
  router: {
    location: {
      search: 'search'
    }
  }
});

const savedCreditCards = new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(true).build();

const defaultProps = {
  push: _.noop,
  paymentInfo: {
    selectedCardId: '1-ENKS4K',
    cardNumber: '4012999999999999'
  },
  reviewPage: {
    firstName: 'David',
    lastName: 'Liu',
    recordLocator: 'XHKJ98',
    moneyTotalFare: { amount: '60.00', currencyCode: 'USD' },
    earlyBirdBounds: new EarlyBirdBoundsBuilder().build(),
    receiptEmail: 'arris@163.com',
    destinationDescription: 'destinationDescription',
    dates: { first: '2018-05-03' },
    productIds: ['productIds00', 'productIds01'],
    earlyBirdAnalytics: null,
    _links: {
      earlyBirdConfirmationPage: {
        href: '/v1/mobile-air-booking/page/early-bird/PL4ND6',
        method: 'POST'
      }
    }
  },
  isLoggedIn: false,
  savedCreditCards,
  onPaymentEditClick: _.noop,
  params: {
    pnr: 'ABC123'
  },
  history: {
    location: {
      pathname: '/earlybird/checkin/PNR123/review'
    }
  },
  purchaseFn: _.noop,
  getPaymentOptionsFn: _.noop,
  checkSessionExpired: _.noop,
  shouldResumeDataFn: _.noop,
  resumeDataFn: _.noop,
  shouldGotoPayPalSignInFn: _.noop,
  gotoPayPalSignInFn: _.noop,
  addHistoryBackToHomeFn: _.noop,
  traceEarlybirdPaymentTypeFn: _.noop
};

storiesOf('pages/earlyBird/earlyBirdReviewPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('saved CC with cvvVerified', () => {
    return <EarlyBirdReviewPage {...defaultProps} />;
  })
  .add('saved CC without cvvVerified', () => {
    const newSavedCreditCards = new PaymentSavedCreditCardsBuilder()
      .withRequireSecurityCode(true)
      .withPrimaryCardNotCvvVerified()
      .build();
    const props = _.merge({}, defaultProps, { savedCreditCards: newSavedCreditCards });

    return <EarlyBirdReviewPage {...props} />;
  });
