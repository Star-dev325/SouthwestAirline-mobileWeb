jest.mock('connected-react-router', () => ({
  ...jest.requireActual('connected-react-router'),
  push: jest.fn().mockReturnValue({ type: 'connected-react-router-push' })
}));
jest.mock('src/airChange/actions/airChangeActions', () => ({
  getPaymentOptions: jest.fn().mockReturnValue({ type: 'getPaymentOptions' })
}));
jest.mock('src/login/actions/reLoginModalActions', () => ({
  setReLoginCallbackFunctions: jest.fn().mockReturnValue({ type: 'setReLoginCallbackFunctions' })
}));
jest.mock('src/sameDay/actions/sameDayActions', () => ({
  ...jest.requireActual('src/sameDay/actions/sameDayActions'),
  cancelStandbyListingAndBackToPreviousPage: jest.fn().mockReturnValue(jest.fn().mockResolvedValue({ type: 'cancel' })),
  initiateSameDayVoidTransactionForGuest: jest.fn().mockReturnValue({ type: 'initiateSameDayVoidTransactionForGuest' }),
  updateSameDayConfirmationMethod: jest.fn().mockReturnValue(jest.fn().mockResolvedValue({ type: 'retrieve' }))
}));
jest.mock('src/shared/actions/alternativeFormsOfPaymentActions', () => ({
  ...jest.requireActual('src/shared/actions/alternativeFormsOfPaymentActions'),
  initiateVoidTransaction: jest.fn().mockReturnValue({ type: 'initiateVoidTransaction' })
}));
jest.mock('src/shared/actions/accountActions', () => ({
  getAccountInfo: jest.fn().mockReturnValue({ type: 'ACCOUNT_INFO' })
}));

jest.mock('src/shared/actions/dialogActions');
jest.mock('src/shared/actions/formDataActions');
jest.mock('src/shared/actions/globalHeaderActions');
jest.mock('src/shared/actions/sharedActions');
jest.mock('src/shared/helpers/applePayHelper');
jest.mock('src/shared/helpers/browserObject', () => ({
  document: { cookie: 'mockCookie' },
  location: {
    pathname: '/same-day/refund-method'
  }
}));

import '@testing-library/jest-dom/extend-expect';
import i18n from '@swa-ui/locale';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { push } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as airChangeActions from 'src/airChange/actions/airChangeActions';
import * as sameDayActions from 'src/sameDay/actions/sameDayActions';
import SameDayRefundMethod, { SameDayRefundMethodPage } from 'src/sameDay/pages/sameDayRefundMethodPage';
import * as dialogActions from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { hideGlobalHeader, resetGlobalHeader } from 'src/shared/actions/globalHeaderActions';
import { setReLoginCallbackFunctions } from 'src/login/actions/reLoginModalActions';
import * as sharedActions from 'src/shared/actions/sharedActions.js';
import { APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { STATUS } from 'src/shared/constants/flowConstants';
import { REFUND_METHOD } from 'src/shared/constants/refundMethods.js';
import { getIsApplePayCardValid } from 'src/shared/helpers/applePayHelper';
import * as fromCreditCardHelper from 'src/shared/helpers/creditCardHelper';
import SameDayRefundMethodBuilder from 'test/builders/apiResponse/sameDayRefundMethodBuilder';
import ConfigureMockStore from 'test/unit/helpers/configureMockStore';
import SameDayPaymentBuilder from 'test/builders/apiResponse/sameDayPaymentBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('SameDayRefundMethod', () => {
  const CEPTOR_VOID_API = false;
  const { BACK_TO_ORIGINAL_PAYMENT, HOLD_FUTURE_USE } = REFUND_METHOD;
  const defaultSameDayPaymentPage = new SameDayPaymentBuilder().build();
  const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
  const mockCard = { primaryCard: {} };
  const getStateWithSameDayRefundPage = (sameDayRefundPageState, mockCard, sameDayPaymentPage, applePayCard) => ({
    account: { isLoggedIn: true },
    applePay: { applePayCard },
    sameDay: {
      ...(sameDayPaymentPage || defaultSameDayPaymentPage),
      sameDayConfirmationPage: { response: null },
      sameDayRefundPage: { ...sameDayRefundPageState }
    },
    savedCreditCards: mockCard,
    toggles: { CEPTOR_VOID_API: true }
  });

  let clearFormDataByIdFnMock;
  let gotoPayPalSignInFnMock;
  let hasSelectedAlternativeFormOfPaymentMock;
  let onSubmitStub;
  let saveFormDataFnMock;
  let setReLoginCallbackFunctionsFnMock;
  let shouldGotoPayPalSignInFnMock;
  let shouldResumeDataFnMock;
  let updateFormFieldDataValueMock;
  let updateSameDayConfirmationMethodFnMock;

  beforeEach(() => {
    clearFormDataByIdFnMock = jest.fn();
    dialogActions.hideDialog.mockImplementationOnce(() => ({ type: 'test' }));
    dialogActions.showDialog.mockImplementationOnce(() => ({ type: 'test' }));
    gotoPayPalSignInFnMock = jest.fn();
    hasSelectedAlternativeFormOfPaymentMock = jest.fn().mockReturnValue(true);
    onSubmitStub = jest.fn();
    hideGlobalHeader.mockReset().mockReturnValue({ type: 'HIDE_GLOBAL_HEADER' });
    resetGlobalHeader.mockReset().mockReturnValue({ type: 'RESET_GLOBAL_HEADER' });
    saveFormDataFnMock = jest.fn().mockResolvedValue({ type: 'FAKE-ACTION' });
    setReLoginCallbackFunctionsFnMock = jest.fn();
    sharedActions.hideErrorHeaderMsg.mockReturnValue({ type: 'hide' });
    sharedActions.showErrorHeaderMsg.mockImplementationOnce(() => ({ type: 'show' }));
    shouldGotoPayPalSignInFnMock = jest.fn();
    shouldResumeDataFnMock = jest.fn();
    updateFormFieldDataValueMock = jest
      .spyOn(FormDataActions, 'updateFormDataValue')
      .mockImplementationOnce(() => ({ type: 'FORM_UPDATE' }));
    updateSameDayConfirmationMethodFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('payment section', () => {
    it('should render page with dollar amount due and No amount due tax', () => {
      const sameDayRefundPageWithPointsEvenExchangeAndTax = new SameDayRefundMethodBuilder()
        .withDollarAmountDueFareAndNoAmountDueTax()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithPointsEvenExchangeAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with points even exchange and amount due tax when present', () => {
      const sameDayRefundPageWithPointsEvenExchangeAndTax = new SameDayRefundMethodBuilder()
        .withPointsEvenExchangeAndAmountDueTax()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithPointsEvenExchangeAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with points even exchange and amount due tax when present with i18n title', () => {
      const sameDayRefundPageWithPointsEvenExchangeAndTax = new SameDayRefundMethodBuilder()
        .withPointsEvenExchangeAndAmountDueTaxNoTitle()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithPointsEvenExchangeAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with amount due points and amount due tax when present with i18n title', () => {
      const sameDayRefundPageWithAmountDuePointsAndTax = new SameDayRefundMethodBuilder()
        .withPointsAmountDueAndAmountDueTaxNoTitle()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithAmountDuePointsAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with credit due points and amount due tax when present with i18n title', () => {
      const sameDayRefundPageWithCreditDuePointsAndTax = new SameDayRefundMethodBuilder()
        .withPointsCreditDueAndAmountDueTaxNoTitle()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithCreditDuePointsAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with points even exchange and amount due tax when present', () => {
      const sameDayRefundPageWithPointsEvenExchangeAndTax = new SameDayRefundMethodBuilder()
        .withPointsEvenExchangeAndAmountDueTax()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithPointsEvenExchangeAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with amount due points and amount due tax when present', () => {
      const sameDayRefundPageWithAmountDuePointsAndTax = new SameDayRefundMethodBuilder()
        .withPointsAmountDueAndAmountDueTax()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithAmountDuePointsAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with credit due points and amount due tax when present', () => {
      const sameDayRefundPageWithCreditDuePointsAndTax = new SameDayRefundMethodBuilder()
        .withPointsCreditDueAndAmountDueTax()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithCreditDuePointsAndTax, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render Payment Method section on the isPaymentRequired is true', () => {
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: {
            defaultSameDayPaymentPage,
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: { ...new SameDayRefundMethodBuilder().withAmountDue().build().sameDayRefundMethod }
          },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: true }
        }
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should call gotoPaymentEditPage', async () => {
      const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().build();
      const sameDayPricingPageWithAmountDue = new SameDayRefundMethodBuilder()
        .withAmountDue()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayPricingPageWithAmountDue, savedCreditCardsWithNoPrimaryCard)
      };

      const { container } = createPageComponent({}, state);

      await userEvent.click(container.querySelector('.payment-nav-item-field .nav-item-link'));

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith({
          pathname: '/same-day/refund-method/payment',
          search: '?airportsCode=PHX-DEN',
          state: undefined
        });
      });
    });

    it('should render payment section when primary card empty', () => {
      const sameDayRefundPageWithAmountDue = new SameDayRefundMethodBuilder()
        .withAmountDue()
        .build().sameDayRefundMethod;
      const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().withNoPrimaryCard().build();
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithAmountDue, savedCreditCardsWithNoPrimaryCard)
      };
      const { container } = createPageComponent({ isLoggedIn: true }, state);

      expect(container).toMatchSnapshot();
    });

    it('should not fetch payment options if the call has already been made', () => {
      const savedCreditCardsWithPrimaryCard = new PaymentSavedCreditCardsBuilder().build();
      const sameDayRefundPageWithAmountDue = new SameDayRefundMethodBuilder()
        .withAmountDue()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithAmountDue, savedCreditCardsWithPrimaryCard)
      };

      createPageComponent({}, state);

      expect(airChangeActions.getPaymentOptions).not.toHaveBeenCalled();
    });

    it('should fetch payment options when saved cards empty', () => {
      const sameDayRefundPageWithAmountDue = new SameDayRefundMethodBuilder()
        .withAmountDue()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithAmountDue, mockCard)
      };

      createPageComponent({}, state);

      expect(airChangeActions.getPaymentOptions).toHaveBeenCalled();
    });

    it('should call gotoPaymentEditPage even when there is no selectedFlights', async () => {
      const sameDayPricingPageWithAmountDue = new SameDayRefundMethodBuilder().withNoSelectedFlights().build();
      const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().build();
      const state = {
        app: {
          account: { isLoggedIn: true },
          sameDay: {
            ...defaultSameDayPaymentPage,
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: { ...sameDayPricingPageWithAmountDue.sameDayRefundMethod }
          },
          savedCreditCards: savedCreditCardsWithNoPrimaryCard,
          toggles: { CEPTOR_VOID_API: true }
        }
      };
      const { container } = createPageComponent({}, state);

      await userEvent.click(container.querySelector('.payment-nav-item-field .nav-item-link'));

      await waitFor(() => {
        expect(push).toHaveBeenCalledWith({
          pathname: '/same-day/refund-method/payment',
          search: '?airportsCode=undefined-undefined',
          state: undefined
        });
      });
    });

    it('should call onSubmit when clicked on confirm button', async () => {
      const savedCreditCardsWithNoPrimaryCard = new PaymentSavedCreditCardsBuilder().build();

      const state = {
        app: {
          account: { isLoggedIn: false },
          sameDay: {
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: {
              ...new SameDayRefundMethodBuilder().withShowRefundPage().build().sameDayRefundMethod
            }
          },
          savedCreditCards: savedCreditCardsWithNoPrimaryCard,
          toggles: { CEPTOR_VOID_API: true }
        }
      };

      const { container } = createPageComponent({}, state);

      await userEvent.click(container.querySelector('.continue'));

      await waitFor(() => {
        expect(sameDayActions.updateSameDayConfirmationMethod).toHaveBeenCalled();
      });
    });
  });

  describe('when rendering', () => {
    it('should hide global header when showRefundPage is true', () => {
      createPageComponent();

      cleanup();
      expect(hideGlobalHeader).toHaveBeenCalledTimes(1);
    });

    it('should call reset global header when component unmounts', () => {
      createPageComponent();

      cleanup();
      expect(resetGlobalHeader).toHaveBeenCalledTimes(1);
    });

    it('should render without the refundable selection', () => {
      const state = {
        app: {
          account: { isLoggedIn: false },
          sameDay: {
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: {
              ...new SameDayRefundMethodBuilder().withShowRefundPage().build().sameDayRefundMethod
            }
          },
          toggles: { CEPTOR_VOID_API: true }
        }
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with Amount due points and credit due tax when present', () => {
      const sameDayRefundPageWithAmountDuePointsAndTaxRefund = new SameDayRefundMethodBuilder()
        .withPointsAmountDueAndCreditDueTax()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithAmountDuePointsAndTaxRefund, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page with credit due points and credit due tax when present', () => {
      const sameDayRefundPageWithCreditDuePointsAndTaxRefund = new SameDayRefundMethodBuilder()
        .withPointsCreditDueAndCreditDueTax()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithCreditDuePointsAndTaxRefund, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page even though faresummary is undefined', () => {
      const sameDayRefundPageWithNoFareSummary = new SameDayRefundMethodBuilder()
        .withNoFareSummary()
        .build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithNoFareSummary, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page even though _links is undefined', () => {
      const sameDayRefundPageWithNoLinks = new SameDayRefundMethodBuilder().withNoLinks().build().sameDayRefundMethod;
      const state = {
        app: getStateWithSameDayRefundPage(sameDayRefundPageWithNoLinks, mockCard)
      };

      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page even though sameDayConfirmationPage response is null', () => {
      const state = {
        app: {
          account: { isLoggedIn: false },
          sameDay: { sameDayConfirmationPage: { response: null } },
          toggles: { CEPTOR_VOID_API: true }
        }
      };
      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should render page even if sameDayRefundPage and sameDayConfirmationPage response are both null', () => {
      const state = {
        app: {
          account: { isLoggedIn: false },
          sameDay: { sameDayConfirmationPage: { response: null }, sameDayRefundPage: null },
          toggles: { CEPTOR_VOID_API: true }
        }
      };
      const { container } = createPageComponent({}, state);

      expect(container).toMatchSnapshot();
    });

    it('should show the dialog', async () => {
      const { container } = createPageComponent();

      await userEvent.click(container.querySelector('.same-day-refund-method-list-section'));
      expect(dialogActions.showDialog).toBeCalled();
    });

    it('should close the dialog when clicked outside of the popup', async () => {
      const { container } = createPageComponent();

      await userEvent.click(container.querySelector('.same-day-refund-method-list-section'));

      await userEvent.click(container.querySelector('.backdrop'));

      dialogActions.showDialog.mock.calls[0][0].onDimmerClick();

      expect(dialogActions.hideDialog).toBeCalled();
    });

    it('should render the selection when user selected refund to credit card option', async () => {
      const { container, queryByText } = createPageComponent();

      await userEvent.click(container.querySelector('.same-day-refund-method-list-section'));

      act(() => dialogActions.showDialog.mock.calls[0][0].message.props.children[0].props.onClick(BACK_TO_ORIGINAL_PAYMENT));

      expect(queryByText(i18n('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD'))).not.toBeNull();
    });

    it('should render the selection when user select hold for future use', async () => {
      const { container, queryByText } = createPageComponent();

      await userEvent.click(container.querySelector('.same-day-refund-method-list-section'));
      act(() => dialogActions.showDialog.mock.calls[0][0].message.props.children[1].props.onClick(HOLD_FUTURE_USE));

      expect(queryByText(i18n('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE'))).not.toBeNull();
    });

    it('should hide the dialog', async () => {
      const { container } = createPageComponent();

      await userEvent.click(container.querySelector('.same-day-refund-method-list-section'));
      act(() => dialogActions.showDialog.mock.calls[0][0].message.props.children[0].props.onClick(BACK_TO_ORIGINAL_PAYMENT));

      expect(dialogActions.hideDialog).toBeCalled();
      expect(updateFormFieldDataValueMock).toBeCalled();
    });

    describe('when form submit', () => {
      it('should call onSubmit when showRefundableSelection is false', async () => {
        const sameDayRefundPageWithShowRefundPage = new SameDayRefundMethodBuilder()
          .withShowRefundPage()
          .build().sameDayRefundMethod;
        const state = {
          app: getStateWithSameDayRefundPage(sameDayRefundPageWithShowRefundPage, mockCard)
        };

        const { container } = createPageComponent({}, state);

        await userEvent.click(container.querySelector('.continue'));

        expect(sameDayActions.updateSameDayConfirmationMethod).toHaveBeenCalled();
      });

      it('should call onSubmit when showRefundableSelection is true', async () => {
        const sameDayRefundMethod = new SameDayRefundMethodBuilder().build().sameDayRefundMethod;
        const state = {
          app: getStateWithSameDayRefundPage(sameDayRefundMethod, mockCard)
        };

        const { container } = createPageComponent({}, state);

        await userEvent.click(container.querySelector('.continue'));

        expect(sharedActions.showErrorHeaderMsg).toHaveBeenCalled();
      });

      it('should display correct price data on continue even when sameDayConfirmationPage state is empty', async () => {
        const sameDayRefundMethod = new SameDayRefundMethodBuilder().build().sameDayRefundMethod;
        const state = {
          app: getStateWithSameDayRefundPage(sameDayRefundMethod, mockCard)
        };

        const { container } = createPageComponent({}, state);

        await userEvent.click(container.querySelector('.continue'));

        expect(container).toMatchSnapshot();
      });

      it('should initiate a void transaction when user continues as guest', () => {
        const sameDayRefundMethod = new SameDayRefundMethodBuilder().withAmountDue().build().sameDayRefundMethod;
        const state = {
          app: getStateWithSameDayRefundPage(sameDayRefundMethod, mockCard, { paymentInfo: APPLE_PAY_CARD_ID }, { applePayCard: true })
        };
        const creditCardHelperSpy = jest.spyOn(fromCreditCardHelper, 'getDefaultSelectedPaymentInfo').mockReturnValue({ selectedCardId: 'APPLE_PAY_CARD_ID' });
        const { container } = createPageComponent({}, state);

        fireEvent.submit(container.querySelector('form'));

        setReLoginCallbackFunctions.mock.calls[0][0].continueAsGuestFn({ paymentInfo: APPLE_PAY_CARD_ID });

        expect(sameDayActions.initiateSameDayVoidTransactionForGuest).toHaveBeenCalled();

        creditCardHelperSpy.mockRestore();
      });

      it('should make a regular confirmation call when afp is not applicable', () => {
        const updateSameDayConfirmationMethodMock = jest.fn().mockResolvedValue({});
        const mockSameDayRefundMethodPage = new SameDayRefundMethodBuilder().withAmountDue().build();

        const notAfpProps = {
          gotoPayPalSignInFn: jest.fn(),
          hasSelectedAlternativeFormOfPaymentFn: jest.fn().mockReturnValue(false),
          hideGlobalHeaderFn: jest.fn(),
          isChangeFlow: true,
          resetGlobalHeaderFn: jest.fn(),
          resumeDataFn: jest.fn(),
          sameDayRefundPage: mockSameDayRefundMethodPage.sameDayRefundMethod,
          savedCreditCards: { primaryCard: {} },
          setReLoginCallbackFunctionsFn: jest.fn(),
          shouldGotoPayPalSignInFn: jest.fn().mockReturnValue(false),
          shouldResumeDataFn: jest.fn(() => false),
          showDialogFn: jest.fn(),
          updateSameDayConfirmationMethodFn: updateSameDayConfirmationMethodMock
        };
        const creditCardHelperSpy = jest.spyOn(fromCreditCardHelper, 'getDefaultSelectedPaymentInfo').mockReturnValue({ selectedCardId: 'NOT_AN_AFP_CARD_ID' });
        const { container } = integrationRender()({}, SameDayRefundMethodPage, { ...notAfpProps });

        fireEvent.submit(container.querySelector('form'));

        expect(updateSameDayConfirmationMethodMock).toHaveBeenCalled();

        creditCardHelperSpy.mockRestore();
      });

      it('should initiate a paypal transaction', () => {
        const localGotoPayPalSignInFnMock = jest.fn();
        const mockSameDayRefundMethodPage = new SameDayRefundMethodBuilder().withAmountDue().build();

        const payPalProps = {
          gotoPayPalSignInFn: localGotoPayPalSignInFnMock,
          hasSelectedAlternativeFormOfPaymentFn: jest.fn(),
          hideGlobalHeaderFn: jest.fn(),
          isChangeFlow: true,
          resetGlobalHeaderFn: jest.fn(),
          resumeDataFn: jest.fn(),
          sameDayRefundPage: mockSameDayRefundMethodPage.sameDayRefundMethod,
          savedCreditCards: { primaryCard: {} },
          setReLoginCallbackFunctionsFn: jest.fn(),
          shouldGotoPayPalSignInFn: jest.fn().mockReturnValue(true),
          shouldResumeDataFn: jest.fn(() => false),
          showDialogFn: jest.fn(),
          updateSameDayConfirmationMethodFn: jest.fn()
        };
        const creditCardHelperSpy = jest.spyOn(fromCreditCardHelper, 'getDefaultSelectedPaymentInfo').mockReturnValue({ selectedCardId: 'PAY_PAL_CARD_ID' });
        const { container } = integrationRender()({}, SameDayRefundMethodPage, { ...payPalProps });

        fireEvent.submit(container.querySelector('form'));

        expect(localGotoPayPalSignInFnMock).toHaveBeenCalled();

        creditCardHelperSpy.mockRestore();
      });
    });
  });

  describe('when unmounting', () => {
    let state;

    beforeEach(() => {
      state = {
        app: {
          account: { isLoggedIn: false },
          flowStatus: { sameDay: STATUS.IN_PROGRESS },
          sameDay: {
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: {
              ...new SameDayRefundMethodBuilder().withCancelStandbyListing().build().sameDayRefundMethod
            }
          },
          toggles: { CEPTOR_VOID_API: true }
        }
      };
    });

    it('should call cancelStandbyListingAndBackToPreviousPageFn on unmount if cancelStandbyListing exists and shouldCancelPartialStandbyRef is true', () => {
      const { unmount } = createPageComponent({}, state);

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).toHaveBeenCalledWith(
        state.app.sameDay.sameDayRefundPage._links.cancelStandbyListing
      );
    });

    it('should not call cancelStandbyListingAndBackToPreviousPageFn on unmount if user proceeds to next page', async () => {
      state.app.sameDay.sameDayRefundPage.showRefundableSelection = false;
      const { container, unmount } = createPageComponent({}, state);

      await fireEvent.submit(container.querySelector('form'));

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).not.toHaveBeenCalled();
    });

    it('should not call cancelStandbyListingAndBackToPreviousPageFn on unmount if cancelStandbyListing is null', () => {
      state.app.sameDay.sameDayRefundPage._links.cancelStandbyListing = null;
      const { unmount } = createPageComponent({}, state);

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).not.toHaveBeenCalled();
    });

    it('should not call cancelStandbyListingAndBackToPreviousPageFn on unmount if cancelStandbyListing is null', () => {
      state.app.flowStatus.sameDay = STATUS.COMPLETE;
      const { unmount } = createPageComponent({}, state);

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).not.toHaveBeenCalled();
    });

    it('should not call cancelStandbyListingAndBackToPreviousPageFn on unmount if gotoPaymentEditPage had been called', async () => {
      const state = {
        app: {
          account: { isLoggedIn: false },
          sameDay: {
            ...defaultSameDayPaymentPage,
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: {
              ...new SameDayRefundMethodBuilder().withAmountDue().withCancelStandbyListing().build().sameDayRefundMethod
            }
          },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: true }
        }
      };

      const { container, unmount } = createPageComponent({}, state);

      await userEvent.click(container.querySelector('.payment-nav-item-field .nav-item-link'));

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).not.toHaveBeenCalled();
    });

    it('should not attempt to cancel a partial standby listing after a successful confirmation call', () => {
      state.app.sameDay.sameDayRefundPage.showRefundableSelection = false;

      const { container, unmount } = createPageComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).not.toHaveBeenCalled();
    });

    it('should not attempt to cancel a partial standby listing after a successful confirmation call for payment', () => {
      const state = {
        app: {
          account: { isLoggedIn: false },
          flowStatus: { sameDay: STATUS.IN_PROGRESS },
          sameDay: {
            ...defaultSameDayPaymentPage,
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: {
              ...new SameDayRefundMethodBuilder().withAmountDue().withCancelStandbyListing().build().sameDayRefundMethod
            }
          },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: true },
          webView: { isWebView: false }
        }
      };

      const { container, unmount } = createPageComponent({}, state);

      fireEvent.submit(container.querySelector('form'));

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).not.toHaveBeenCalled();
    });

    it('should cancel a partial standby listing after a failed confirmation payment call', () => {
      const state = {
        app: {
          account: { isLoggedIn: false },
          flowStatus: { sameDay: STATUS.IN_PROGRESS },
          sameDay: {
            ...defaultSameDayPaymentPage,
            sameDayConfirmationPage: { response: null },
            sameDayRefundPage: {
              ...new SameDayRefundMethodBuilder().withAmountDue().withCancelStandbyListing().build().sameDayRefundMethod
            }
          },
          savedCreditCards,
          toggles: { CEPTOR_VOID_API: true },
          webView: { isWebView: false }
        }
      };

      const { container, unmount } = createPageComponent({}, state);

      sameDayActions.updateSameDayConfirmationMethod.mockImplementationOnce(
        (loggedIn, formData, sameDayConfirmation, cancelStandbyListing, amountDue, asyncChain, errorHandler) => {
          errorHandler();
          
          return { type: 'updateSameDayConfirmationMethod' };
        });
      hasSelectedAlternativeFormOfPaymentMock.mockReturnValueOnce(false);

      fireEvent.submit(container.querySelector('form'));

      unmount();

      expect(sameDayActions.cancelStandbyListingAndBackToPreviousPage).toHaveBeenCalled();
    });
  });

  describe('page header', () => {
    const app = {
      account: { isLoggedIn: false },
      sameDay: {
        sameDayConfirmationPage: { response: null },
        sameDayRefundPage: {
          ...new SameDayRefundMethodBuilder().build().sameDayRefundMethod
        }
      },
      toggles: { CEPTOR_VOID_API: true }
    };

    it('should hide back button when in hybrid flow ', () => {
      const state = {
        app: {
          ...app,
          webView: {
            isWebView: true
          }
        }
      };
      const { container } = createPageComponent({}, state);

      expect(container.querySelector('.goback-link')).toBeNull();
    });

    it('should show back button when in web flow ', () => {
      const state = {
        app: {
          ...app,
          webView: {
            isWebView: false
          }
        }
      };
      const { container } = createPageComponent({}, state);

      expect(container.querySelector('.goback-link')).not.toBeNull();
    });

    it('should show back button when in web flow and webview object is undefined ', () => {
      const state = {
        app
      };
      const { container } = createPageComponent({}, state);

      expect(container.querySelector('.goback-link')).not.toBeNull();
    });
  });

  describe('alternative forms of payment', () => {
    it('should confirm a same day change when apple pay data becomes available', () => {
      const mockFormData = { recipientEmail: 'test@wnco.com' };
      const mockApplePayCard = { formData: mockFormData };
      const mockSameDayRefundMethodPage = new SameDayRefundMethodBuilder().withAmountDue().build();
      const updateSameDayConfirmationMethodMock = jest.fn();

      const { sameDayRefundMethod } = mockSameDayRefundMethodPage;

      const applePayProps = {
        applePayCard: mockApplePayCard,
        hideGlobalHeaderFn: jest.fn(),
        isChangeFlow: true,
        isLoggedIn: false,
        resetGlobalHeaderFn: jest.fn(),
        resumeDataFn: jest.fn().mockResolvedValue({}),
        sameDayRefundPage: mockSameDayRefundMethodPage.sameDayRefundMethod,
        savedCreditCards: {},
        shouldResumeDataFn: jest.fn(() => false),
        showDialogFn: jest.fn(),
        updateSameDayConfirmationMethodFn: updateSameDayConfirmationMethodMock
      };

      getIsApplePayCardValid.mockReturnValueOnce(true);

      integrationRender()({}, SameDayRefundMethodPage, { ...applePayProps });

      expect(updateSameDayConfirmationMethodMock).toHaveBeenCalledWith(
        false,
        { ...mockFormData, applePayCard: mockApplePayCard },
        { ...sameDayRefundMethod._links.sameDayConfirmation },
        undefined,
        { ...sameDayRefundMethod.fareSummary.amountDue }
      );
    });

    it('should confirm a same day change when paypal data is available', async () => {
      const updateSameDayConfirmationMethodMock = jest.fn();
      const mockFormData = { recipientEmail: 'test@wnco.com' };
      const mockPayPal = { token: '123.abc.xyz' };
      const mockSameDayRefundMethodPage = new SameDayRefundMethodBuilder().withAmountDue().build();

      const payPalProps = {
        hideGlobalHeaderFn: jest.fn(),
        isChangeFlow: true,
        resetGlobalHeaderFn: jest.fn(),
        resumeDataFn: jest
          .fn()
          .mockResolvedValue({ formData: mockFormData, payPal: mockPayPal, isFromPayPalAuthorized: true }),
        sameDayRefundPage: mockSameDayRefundMethodPage.sameDayRefundMethod,
        savedCreditCards: {},
        shouldResumeDataFn: jest.fn(() => true),
        showDialogFn: jest.fn(),
        updateSameDayConfirmationMethodFn: updateSameDayConfirmationMethodMock
      };

      integrationRender()({}, SameDayRefundMethodPage, { ...payPalProps });

      await waitFor(() => {
        expect(updateSameDayConfirmationMethodMock).toHaveBeenCalledWith(
          undefined,
          { ...mockFormData, payPal: mockPayPal },
          { ...mockSameDayRefundMethodPage.sameDayRefundMethod._links.sameDayConfirmation },
          undefined,
          { ...mockSameDayRefundMethodPage.sameDayRefundMethod.fareSummary.amountDue }
        );
      });
    });
  });

  const createPageComponent = (props = {}, state = {}) => {
    const defaultProps = {
      CEPTOR_VOID_API,
      clearFormDataByIdFn: clearFormDataByIdFnMock,
      gotoPayPalSignInFn: gotoPayPalSignInFnMock,
      hasSelectedAlternativeFormOfPaymentFn: hasSelectedAlternativeFormOfPaymentMock,
      isLoggedIn: true,
      location: {
        href: '#',
        search: 'search',
        state: { enableRelogin: false, fullScreenModalId: 'sameDayRefundMethod' }
      },
      match: { params: '' },
      onSubmit: onSubmitStub,
      saveFormDataFn: saveFormDataFnMock,
      setReLoginCallbackFunctionsFn: setReLoginCallbackFunctionsFnMock,
      shouldGotoPayPalSignInFn: shouldGotoPayPalSignInFnMock,
      shouldResumeDataFn: shouldResumeDataFnMock,
      updateSameDayConfirmationMethodFn: updateSameDayConfirmationMethodFnMock
    };
    const defaultState = {
      app: {
        account: { isLoggedIn: false },
        sameDay: {
          sameDayConfirmationPage: {
            response: { ...new SameDayRefundMethodBuilder().build().sameDayRefundMethod }
          },
          sameDayRefundPage: { ...new SameDayRefundMethodBuilder().build().sameDayRefundMethod }
        },
        dialog: {
          active: true
        },
        toggles: {
          CEPTOR_VOID_API: true
        }
      },
      router: {
        location: {
          href: '#',
          search: 'search',
          state: { enableRelogin: false, fullScreenModalId: 'sameDayRefundMethod' }
        }
      }
    };

    const store = ConfigureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SameDayRefundMethod {...mergedProps} />
        </BrowserRouter>
      </Provider>
    );
  };
});
