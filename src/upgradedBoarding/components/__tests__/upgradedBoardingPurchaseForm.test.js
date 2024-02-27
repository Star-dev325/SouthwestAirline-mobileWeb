jest.mock('src/shared/actions/formDataActions', () => ({
  updateFormFieldDataValue: jest.fn(() => ({ type: 'FAKE-ACTION' }))
}));

jest.mock('src/shared/form/formValidators/upgradedBoardingFormValidator', () => jest.fn().mockReturnValue(() => ({})));

jest.mock('src/shared/helpers/creditCardHelper', () => ({
  getDefaultSelectedPaymentInfo: jest.fn().mockReturnValue({ selectedCardId: 'NEW_CREDIT_CARD_ID' }),
  getCardType: jest.fn().mockReturnValue('')
}));

jest.mock('src/shared/helpers/savedCreditCardCVVHelper', () => ({
  isSavedCreditCardThatRequiresCVV: jest.fn().mockReturnValue(false)
}));

jest.mock('src/upgradedBoarding/helpers/upgradedBoardingHelper', () => ({
  getDefaultSelectedUpgradedBoardingProducts: jest.fn().mockReturnValue({ productId: true }),
  generateSegmentFormFieldName: jest.fn().mockReturnValue('eligibleFlight'),
  getPaxCountForSegment: jest.fn().mockReturnValue(2),
  getUpgradedBoardingPriceTotal: jest.fn().mockReturnValue('160.00')
}));

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, within } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { updateFormFieldDataValue } from 'src/shared/actions/formDataActions';
import { UPGRADED_BOARDING_PURCHASE_FORM } from 'src/shared/constants/formIds';
import { noop } from 'src/shared/helpers/jsUtils';
import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';
import UpgradedBoardingPurchaseFormDefaultExport from 'src/upgradedBoarding/components/upgradedBoardingPurchaseForm';
import { getUpgradedBoardingPriceTotal } from 'src/upgradedBoarding/helpers/upgradedBoardingHelper';
import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import UpgradedBoardingPurchaseFormBuilder from 'test/builders/model/upgradedBoardingPurchaseFormBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

let updateFormFieldDataValueFnStub;
let onSubmitStub;
let saveMoneyTotalFnStub;

const savedCreditCards = new PaymentSavedCreditCardsBuilder()
  .withPrimaryCard(
    new PaymentSavedCreditCardBuilder()
      .withCvvVerified(true)
      .withLastFourDigits('5454')
      .withSavedCreditCardId('1-10EV5M4')
      .withType('MASTERCARD')
      .build()
  )
  .withOtherCards([
    new PaymentSavedCreditCardBuilder()
      .withCvvVerified(false)
      .withLastFourDigits('5454')
      .withSavedCreditCardId('1-10EV5M5')
      .withType('MASTERCARD')
      .build(),
    new PaymentSavedCreditCardBuilder()
      .withCvvVerified(true)
      .withLastFourDigits('5466')
      .withSavedCreditCardId('1-10EV5M6')
      .withType('MASTERCARD')
      .build()
  ])
  .withRequireSecurityCode(true);

describe('Upgraded Boarding Purchase Form', () => {
  beforeEach(() => {
    onSubmitStub = jest.fn();
    saveMoneyTotalFnStub = jest.fn().mockReturnValue({ type: 'FAKE-ACTION' });
    updateFormFieldDataValueFnStub = updateFormFieldDataValue.mockImplementation(() => ({ type: 'FAKE-ACTION' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('UpgradedBoardingPurchaseForm', () => {
    const { container } = createComponent({});

    expect(container).toMatchSnapshot();
  });

  it('should have selectedCardId as default value when user has primary card selected', () => {
    const { container } = createComponent();

    const { getByText } = within(container.querySelector('.payment-nav-item-field'));

    expect(getByText('AIR_CHANGE__PRICE_DIFFERENCE__ADD_CREDIT_CARD')).toBeInTheDocument();
  });

  it('should not have default selected card value when user does not have primary card selected', () => {
    const { container } = createComponent({
      savedCreditCards: {
        primaryCard: null
      }
    });

    expect(container.querySelector('.nav-item-link--bang-icon')).toBeInTheDocument();
  });

  describe('when cvv verification is needed', () => {
    it('should not display cvv field', () => {
      const { container } = createComponent({
        formData: null,
        savedCreditCards
      });

      expect(container.querySelector(`input[name="securityCode"]`)).not.toBeInTheDocument();
    });

    it('should display cvv field', () => {
      isSavedCreditCardThatRequiresCVV.mockReturnValueOnce(true);

      const { container } = createComponent({
        savedCreditCards,
        formData: { paymentInfo: null }
      });

      expect(container.querySelector(`input[name="securityCode"]`)).toBeInTheDocument();
    });
  });

  describe('componentDidMount', () => {
    it('should call saveMoneyTotalFn', () => {
      createComponent({});

      expect(saveMoneyTotalFnStub).toHaveBeenCalledWith({
        amount: '160.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });
  });

  describe('componentDidUpdate', () => {
    it('should call saveMoneyTotalFn when the total is different from previous total', () => {
      createComponent({});

      const newMoneyTotal = {
        amount: '120.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      };

      getUpgradedBoardingPriceTotal.mockReturnValueOnce('120.00');

      createComponent({});

      expect(saveMoneyTotalFnStub).toHaveBeenCalledWith(newMoneyTotal);
    });
  });

  describe('should render', () => {
    it('UpgradedBoardingPurchaseForm', () => {
      const { container } = createComponent({});

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchaseForm when UPGRADED_BOARDING_BY_SEGMENT is true', () => {
      const { container } = createComponent({ UPGRADED_BOARDING_BY_SEGMENT: true });

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchaseForm when dates object is empty should not throw JS error', () => {
      const { upgradedBoardingPurchasePage } = new UpgradedBoardingPurchaseFormBuilder().withEmptyDates();

      const { container } = createComponent({ upgradedBoardingPurchasePage });

      expect(container).toMatchSnapshot();
    });

    it('UpgradedBoardingPurchaseForm when isCountdownFinished is true', () => {
      const { upgradedBoardingPurchasePage } = new UpgradedBoardingPurchaseFormBuilder().build();

      const { container } = createComponent({ isCountdownFinished: true, upgradedBoardingPurchasePage });

      expect(container).toMatchSnapshot();
    });
  });

  describe('checkboxes', () => {
    it('should dispatch updateFromFieldDataValue when UPGRADED_BOARDING_BY_SEGMENT is true and checkbox clicked', () => {
      const { container } = createComponent({ UPGRADED_BOARDING_BY_SEGMENT: true });

      const checkboxes = container.querySelectorAll('div.checkbox-button[name="eligibleFlight"]');

      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[0].querySelector('span.checkbox-button--mark'));

      expect(updateFormFieldDataValueFnStub).toHaveBeenCalled();
    });
  });

  describe('submit form', () => {
    it('should call onSubmit when formData has default selected products', () => {
      const { container } = createComponent({
        isCountdownFinished: false
      });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalled();
    });
  });

  const createComponent = (props) => {
    const defaultProps = new UpgradedBoardingPurchaseFormBuilder().build();

    const combinedProps = {
      formId: UPGRADED_BOARDING_PURCHASE_FORM,
      UPGRADED_BOARDING_BY_SEGMENT: false,
      isCountdownFinished: false,
      updateFormFieldDataValueFn: updateFormFieldDataValueFnStub,
      formData: { paymentInfo: {} },
      ...defaultProps,
      ...props,
      onPaymentEditClick: noop,
      onSubmit: onSubmitStub,
      saveMoneyTotalFn: saveMoneyTotalFnStub
    };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <UpgradedBoardingPurchaseFormDefaultExport {...combinedProps} />
      </Provider>
    );
  };
});
