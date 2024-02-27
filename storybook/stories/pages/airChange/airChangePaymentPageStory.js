import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { AirChangePaymentPage } from 'src/airChange/pages/airChangePaymentPage';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

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

const defaultProps = {
  isLoggedIn: false,
  editMode: false,
  savedCreditCards: [],
  query: 'airportsCode=ABC-DEF',
  onMakePrimaryCreditCard: _.noop,
  onUpdateCreditCard: _.noop,
  onDeleteCreditCards: _.noop,
  onClickContinueButton: _.noop,
  enableOperationOnCC: true,
  shouldShowApplePay: false
};

const props = _.merge({}, defaultProps, {
  paymentInfo: {
    selectedCardId: undefined
  }
});

const propsWithSavedCC = _.merge({}, defaultProps, {
  paymentInfo: {
    selectedCardId: 'NEW_CREDIT_CARD_ID'
  },
  savedCreditCards: new PaymentSavedCreditCardsBuilder().build()
});

const propsWithApplePay = _.merge({}, defaultProps, {
  shouldShowApplePay: true
});

storiesOf('pages/airChange/airChangePaymentPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('newCreditCard', () => {
    return <AirChangePaymentPage {...props} />;
  })
  .add('savedCards', () => {
    return <AirChangePaymentPage {...propsWithSavedCC} />;
  })
  .add('applePay', () => {
    return <AirChangePaymentPage {...propsWithApplePay} />;
  });
