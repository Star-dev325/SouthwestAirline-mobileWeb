import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import {SameDayPaymentPage} from 'src/sameDay/pages/sameDayPaymentPage';
import configureMockStore from 'redux-mock-store';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import React from 'react';
import StoryRouter from 'storybook-router';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

const defaultProps = {
  editMode: false,
  enableOperationOnCC: true,
  isLoggedIn: false,
  onClickContinueButton: _.noop,
  onDeleteCreditCards: _.noop,
  onMakePrimaryCreditCard: _.noop,
  onUpdateCreditCard: _.noop,
  paymentInfo: {},
  query: 'airportsCode=ABC-DEF',
  savedCreditCards: [],
  shouldShowApplePay: false,
};
const defaultState = {
  app: {
    errorHeader: {
      errorMessage: null,
      hasError: false
    },
  },
  router: {
    location: {
      search: 'search'
    }
  },
};
const props = {
  ...defaultProps, 
  paymentInfo: {
    selectedCardId: 'NEW_CREDIT_CARD_ID'
  }
};
const propsWithApplePay = {
  ...defaultProps,
  shouldShowApplePay: true
};
const propsWithSavedCC = {
  ...defaultProps,
  paymentInfo: {
    selectedCardId: 'NEW_CREDIT_CARD_ID'
  },
  savedCreditCards: new PaymentSavedCreditCardsBuilder().build()
};

const store = configureMockStore()(defaultState);

storiesOf('pages/sameDay/SameDayPaymentPage', module)
.addDecorator(StoryRouter())
.addDecorator(StoryReduxProvider(store))
  .add('newCreditCard', () => {
    return <SameDayPaymentPage {...props} />;
  })
  .add('savedCards', () => {
    return <SameDayPaymentPage {...propsWithSavedCC} />;
  })
  .add('applePay', () => {
    return <SameDayPaymentPage {...propsWithApplePay} />;
  });