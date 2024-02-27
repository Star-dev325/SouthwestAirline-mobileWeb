import { getPaymentInfoForUseNewCreditCard } from 'test/builders/model/paymentInfoBuilder';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { SameDayPaymentPage } from 'src/sameDay/pages/sameDayPaymentPage';
import ConfigureMockStore from 'test/unit/helpers/configureMockStore';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import React from 'react';

describe('SameDayPaymentPage', () => {
  const noop = () => {};
  const onClickContinueButton = () => {};
  const paymentInfo = { ...getPaymentInfoForUseNewCreditCard() };
  const savedCreditCards = new PaymentSavedCreditCardsBuilder().build();

  describe('render', () => {
    it('Payment Method Section', () => {
      const { container } = createPageComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render payment form with save credit card for future use field if user logged in', () => {
      const { container } = createPageComponent({ isLoggedIn: true });

      expect(container.querySelector('.same-day-payment-page')).not.toBeNull();
    });

    it('saved new credit card option should not be available', () => {
      const { container } = createPageComponent({ isLoggedIn: true });

      expect(container.querySelector('.saved-credit-cards--checkbox-field')).toBeNull();
    });
  });

  const createPageComponent = (props = {}, state = {}) => {
    const defaultProps = {
      editMode: false,
      enableOperationOnCC: true,
      isLoggedIn: false,
      onClickContinueButton,
      onDeleteCreditCards: noop,
      onMakePrimaryCreditCard: noop,
      onUpdateCreditCard: noop,
      paymentInfo,
      query: 'airportsCode=ABC-DEF',
      savedCreditCards,
      updateFormDataValueFn: noop
    };
    const defaultState = {
      app: {
        account: { isLoggedIn: false },
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        sameDay: { paymentInfo: {} },
        saveCreditCards: savedCreditCards,
        toggles: {}
      },
      router: {
        location: {
          href: '#',
          search: 'search',
          state: { enableRelogin: false, fullScreenModalId: 'sameDayCreditCardUpdate' }
        }
      }
    };
    const store = ConfigureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <SameDayPaymentPage {...mergedProps} />
      </Provider>
    );
  };
});
