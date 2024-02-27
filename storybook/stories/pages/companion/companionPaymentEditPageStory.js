import { storiesOf } from '@storybook/react';
import _ from 'lodash';
import React from 'react';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { CompanionPaymentEditPage } from 'src/companion/pages/companionPaymentEditPage';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';

const store = configureMockStore()({
  app: {},
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
  onClickSavedCreditCard: _.noop,
  onMakePrimaryCreditCard: _.noop,
  onUpdateCreditCard: _.noop,
  onDeleteCreditCards: _.noop,
  onClickContinueButton: _.noop,
  fetchSavedCreditCards: _.noop,
  enableOperationOnCC: true,
  shouldShowApplePay: false
};

const props = _.merge({}, defaultProps, {
  paymentInfo: {
    selectedCardId: undefined
  },
  intentToStore: false,
  savedCreditCards: {}
});

const propsWithSavedCC = _.merge({}, defaultProps, {
  paymentInfo: _.merge({}, getPaymentInfoForUseNewCreditCard(), { intentToStore: true }),
  savedCreditCards: new PaymentSavedCreditCardsBuilder().build()
});

const propsWithApplePay = _.merge({}, props, {
  shouldShowApplePay: true
});

storiesOf('pages/companion/companionPaymentEditPage', module)
  .addDecorator(StoryRouter())
  .addDecorator(StoryReduxProvider(store))
  .add('newCreditCard', () => {
    return <CompanionPaymentEditPage {...props} />;
  })
  .add('savedCards', () => {
    return <CompanionPaymentEditPage {...propsWithSavedCC} />;
  })
  .add('withApplePay', () => {
    return <CompanionPaymentEditPage {...propsWithApplePay} />;
  });
