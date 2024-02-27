jest.mock('src/shared/actions/formDataActions', () => ({
  ...jest.requireActual('src/shared/actions/formDataActions'),
  clearFormDataById: jest.fn().mockReturnValue({ type: 'clear form' }),
  updateFormDataValue: jest.fn().mockReturnValue({ type: 'FORM_UPDATE' })
}));

import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import React from 'react';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { NEW_CREDIT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { AIR_BOOKING_PAYMENT_FORM } from 'src/shared/constants/formIds';
import PaymentForm from 'src/shared/form/components/paymentForm';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import {
  getPaymentInfoForUseNewCreditCard,
  getBillingAddressInfoForUseNewCreditCard,
  getPaymentFormDataBlank,
  getPaymentFormTouched
} from 'test/builders/model/paymentInfoBuilder';
import fakeClock from 'test/unit/helpers/fakeClock';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('PaymentForm', () => {
  let wrapper;
  let savedCreditCards;
  let paymentInfoWithUseNewCreditCard;
  let onSelectedCreditCardChangedMock;
  let onClickPayPalButtonMock;
  let onClickApplePayButtonMock;
  let onClickUpliftButtonMock;
  let onUpdateGlobalHeaderMock;
  let onMakePrimaryCreditCardMock;
  let onDeleteCreditCardsMock;
  let onUpdateCreditCardMock;
  let goBackMock;
  let clickCancelButtonFnMock;
  let clickEditButtonFnMock;
  let onSubmitMock;
  let updateFormDataValueFnMock;
  let userAddressInfo;
  let formData;

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      initialFormData: {},
      onSubmit: onSubmitMock,
      disableContactInfo: false,
      departureDate: '2018-01-01',
      passengerType: 'adult',
      formId: AIR_BOOKING_PAYMENT_FORM,
      onUpdateGlobalHeader: onUpdateGlobalHeaderMock,
      savedCreditCards: savedCreditCards,
      onSelectedCreditCardChanged: onSelectedCreditCardChangedMock,
      onMakePrimaryCreditCard: onMakePrimaryCreditCardMock,
      onDeleteCreditCards: onDeleteCreditCardsMock,
      onUpdateCreditCard: onUpdateCreditCardMock,
      goBack: goBackMock,
      clickCancelButtonFn: clickCancelButtonFnMock,
      clickEditButtonFn: clickEditButtonFnMock,
      shouldShowChaseInstantCreditCard: false,
      shouldShowApplePay: false,
      shouldShowUplift: false,
      shouldDisableUplift: false,
      updateFormDataValueFn: updateFormDataValueFnMock,
      userAddressInfo: userAddressInfo,
      formData: formData
    };
    const mergedProps = { ...defaultProps, ...props };

    return integrationRender()(state, PaymentForm, { ...mergedProps });
  };

  beforeEach(() => {
    onUpdateGlobalHeaderMock = jest.fn();
    onSelectedCreditCardChangedMock = jest.fn();
    onClickPayPalButtonMock = jest.fn();
    onClickApplePayButtonMock = jest.fn();
    onClickUpliftButtonMock = jest.fn();
    onMakePrimaryCreditCardMock = jest.fn();
    onDeleteCreditCardsMock = jest.fn();
    onUpdateCreditCardMock = jest.fn();
    goBackMock = jest.fn();
    clickCancelButtonFnMock = jest.fn();
    clickEditButtonFnMock = jest.fn();
    savedCreditCards = new PaymentSavedCreditCardsBuilder().build();
    fakeClock.setTimeTo('2018-10-01 09:30-05:00');
    paymentInfoWithUseNewCreditCard = { ...getPaymentInfoForUseNewCreditCard(), ...{ saveCreditCard: '' } };
    onSubmitMock = jest.fn();
    updateFormDataValueFnMock = jest.fn();
  });

  afterEach(() => {
    fakeClock.restore();
    jest.restoreAllMocks();
  });
  describe('When user selects add new card', () => {
    describe('and has contact info', () => {
      it('should call updateFormDataValueFn', () => {
        wrapper = createComponent({
          userAddressInfo: getBillingAddressInfoForUseNewCreditCard(),
          formData: getPaymentFormDataBlank()
        });
        const { container } = wrapper;

        fireEvent.click(container.querySelectorAll('[name="intentToStore"]')[2]);

        expect(updateFormDataValueFnMock).toHaveBeenCalledWith('AIR_BOOKING_PAYMENT_FORM', {
          isoCountryCode: 'US',
          stateProvinceRegion: 'AS',
          zipOrPostalCode: '12312',
          addressLine1: 'asdfafa',
          addressLine2: '',
          city: 'Brooklyn',
          phoneCountryCode: 'US',
          phoneNumber: '123-123-1234'
        });
      });

      it('should call updateFormDataValueFn when there is an expiration field', () => {
        const formData = getPaymentFormDataBlank();

        formData.expiration = undefined;

        wrapper = createComponent({
          userAddressInfo: getBillingAddressInfoForUseNewCreditCard(),
          formData
        });
        const { container } = wrapper;

        fireEvent.click(container.querySelectorAll('[name="intentToStore"]')[2]);

        expect(updateFormDataValueFnMock).toHaveBeenCalledWith('AIR_BOOKING_PAYMENT_FORM', {
          isoCountryCode: 'US',
          stateProvinceRegion: 'AS',
          zipOrPostalCode: '12312',
          addressLine1: 'asdfafa',
          addressLine2: '',
          city: 'Brooklyn',
          phoneCountryCode: 'US',
          phoneNumber: '123-123-1234'
        });
      });
    });
    describe('has contact info and form has been touched', () => {
      it('should not call updateFormDataValueFn or clearFormDataByIdFn', () => {
        const { container } = createComponent({
          userAddressInfo: getBillingAddressInfoForUseNewCreditCard(),
          formData: getPaymentFormTouched()
        });

        fireEvent.click(container.querySelectorAll('[name="intentToStore"]')[2]);

        expect(FormDataActions.clearFormDataById).not.toHaveBeenCalled();
        expect(FormDataActions.updateFormDataValue).not.toHaveBeenCalled();
      });
    });
    describe('and does not have contact info', () => {
      beforeEach(() => {
        wrapper = createComponent({
          userAddressInfo: null,
          formData: getPaymentFormDataBlank()
        });
      });
      it('should not call updateFormDataValueFnMock', () => {
        const { container } = wrapper;

        fireEvent.click(container.querySelectorAll('[name="intentToStore"]')[2]);

        expect(updateFormDataValueFnMock).not.toHaveBeenCalled();
      });
    });
    describe('should not show save new credit card option', () => {
      beforeEach(() => {
        wrapper = createComponent({
          shouldEnableSaveCC: false,
          userAddressInfo: null,
          formData: getPaymentFormDataBlank()
        });
      });

      it('should not show save option', () => {
        const { container } = wrapper;

        fireEvent.click(container.querySelectorAll('[name="intentToStore"]')[2]);

        expect(container.querySelector('.saved-credit-cards--checkbox-field')).toBeNull();
      });
    });
  });

  describe('When there is no saved credit card', () => {
    beforeEach(() => {
      savedCreditCards = {
        primaryCard: null,
        otherCards: []
      };
      wrapper = createComponent({
        savedCreditCards,
        initialFormData: paymentInfoWithUseNewCreditCard,
        showEditHeader: true
      });
    });

    it('should render paymentForm without saved credit cards but paymentInputForm', () => {
      const { container } = wrapper;

      expect(container.querySelector('.primary-saved-credit-cards')).toBeNull();
      expect(container.querySelector('.payment-form--accept-forms')).not.toBeNull();
      expect(container.querySelectorAll('.segments .fields--label')[0].textContent).toEqual(
        i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__CREDIT_CARD_INFO_TITLE')
      );
    });

    it('should render Cancel button on the left of header', () => {
      const { container } = wrapper;

      expect(container.querySelectorAll('.action-bar-buttons--item')[0].textContent).toEqual(
        i18n('SHARED__BUTTON_TEXT__CANCEL')
      );
    });

    it('should go back to previous page when click cancel button', () => {
      const { queryByText } = wrapper;

      fireEvent.click(queryByText(i18n('SHARED__BUTTON_TEXT__CANCEL')));

      expect(goBackMock).toHaveBeenCalled();
    });
  });

  describe('When there is one saved credit card', () => {
    const ghostCards = [
      {
        savedCreditCardId: 'First Ghost Card',
        type: 'GHOST_CARD',
        name: 'First Ghost Card',
        isExpired: false
      }
    ];

    beforeEach(() => {
      wrapper = createComponent({
        savedCreditCards: { ...new PaymentSavedCreditCardsBuilder().withOtherCards([]).build(), ...ghostCards },
        editMode: true,
        showEditHeader: true,
        enableOperationOnCC: true
      });
    });

    it('should default select the primary saved credit card', () => {
      const { container } = wrapper;

      expect(container.querySelectorAll('.credit-card-radio-input_selected')[0].textContent).toContain('VISA 4444');
    });

    it('should call onUpdateGlobalHeader when component did mount', () => {
      expect(onUpdateGlobalHeaderMock).toHaveBeenCalledWith('1-ENKS4K');
    });

    it('should render CreditCardFields, and Cancel button on the right of header', () => {
      const { container } = wrapper;

      expect(container).toMatchSnapshot();
    });

    it('should call clickCancelButtonFn when click cancel button', () => {
      const { queryByText } = wrapper;
      const cancelButton = queryByText(i18n('SHARED__BUTTON_TEXT__CANCEL'));

      fireEvent.click(cancelButton);

      expect(clickCancelButtonFnMock).toHaveBeenCalled();
    });

    describe('paypal', () => {
      it('should render paypal card and new credit card and by default select the primary saved credit card', () => {
        const { container } = createComponent({
          savedCreditCards: new PaymentSavedCreditCardsBuilder().withOtherCards([]).build(),
          editMode: true,
          showEditHeader: true,
          enableOperationOnCC: true
        });

        expect(container).toMatchSnapshot();
        expect(container.querySelectorAll('.credit-card-radio-input_selected')[0].textContent).toContain('VISA 4444');
      });
    });
  });

  describe('When there are more than one saved credit card', () => {
    describe('use saved credit card', () => {
      beforeEach(() => {
        wrapper = createComponent({
          savedCreditCards,
          showEditHeader: true,
          enableOperationOnCC: true
        });
      });

      it('should render paymentForm with one saved credit card and no paymentInputForm', () => {
        const { container } = wrapper;

        expect(container).toMatchSnapshot();
      });

      it('show edit button on the left of header when selected one card by default', () => {
        const { queryByText } = wrapper;

        expect(queryByText(i18n('SHARED__BUTTON_TEXT__EDIT'))).not.toBeNull();
      });

      it('should call clickEditButtonFn when click edit button', () => {
        const { queryByText } = wrapper;

        fireEvent.click(queryByText(i18n('SHARED__BUTTON_TEXT__EDIT')));

        expect(clickEditButtonFnMock).toHaveBeenCalled();
      });

      it('should call onSubmit when user submits the form', () => {
        const { container } = wrapper;

        fireEvent.submit(container.querySelector('form'));

        const expectedResult = {
          selectedCardId: '1-ENKS4K'
        };

        expect(onSubmitMock).toHaveBeenCalledWith(expectedResult);
      });

      it('should call hideErrorHeaderMsgFn when choose another credit card after there has error msg', () => {
        const { container } = createComponent(
          {
            savedCreditCards,
            showEditHeader: true,
            enableOperationOnCC: true
          },
          {
            app: {
              errorHeader: {
                errorMessage: 'error message',
                hasError: true
              }
            }
          }
        );

        expect(container.querySelector('.error-header')).not.toBeNull();

        fireEvent.submit(container.querySelector('form'));
        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[2]);

        expect(container.querySelector('.error-header')).toBeNull();
      });

      it('should call onSelectedCreditCardChanged with card id when click the CreditCardRadioInput', () => {
        const { container } = wrapper;

        fireEvent.click(container.querySelector('[value="1-ENKS5K"]'));

        expect(onSelectedCreditCardChangedMock).toHaveBeenCalledWith('1-ENKS5K');
      });

      it('should call onSelectedCreditCardChanged with new credit card id and show cancel button on the left of header when click use new credit card', () => {
        const { container } = wrapper;

        fireEvent.click(container.querySelector('[value="NEW_CREDIT_CARD_ID"]'));

        expect(onSelectedCreditCardChangedMock).toHaveBeenCalledWith(NEW_CREDIT_CARD_ID);
        expect(container.querySelectorAll('.action-bar-buttons--item')[0].textContent).toEqual(
          i18n('SHARED__BUTTON_TEXT__CANCEL')
        );
      });

      it('should call onClickPayPalButton with card id when paypal card is clicked', () => {
        const { container } = createComponent({
          onClickPayPalButton: onClickPayPalButtonMock
        });

        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[1]);

        expect(onClickPayPalButtonMock).toHaveBeenCalledWith({ selectedCardId: 'PAY_PAL_CARD_ID' });
      });

      it('should call onClickApplePayButton with card id when apple pay card is clicked', () => {
        const { container } = createComponent({
          editMode: false,
          shouldShowApplePay: true,
          onClickApplePayButton: onClickApplePayButtonMock
        });

        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[2]);

        expect(onClickApplePayButtonMock).toHaveBeenCalledWith({ selectedCardId: 'APPLE_PAY_CARD_ID' });
      });

      it('should not call onClickApplePayButton when editMode is true', () => {
        const { container } = createComponent({
          editMode: true,
          showEditHeader: true,
          shouldShowApplePay: true,
          onClickApplePayButton: onClickApplePayButtonMock
        });

        const applePayCard = container.querySelectorAll('.credit-card-radio-input')[2];

        expect(applePayCard.textContent).toContain('Use Apple Pay');

        fireEvent.click(applePayCard);

        expect(onClickApplePayButtonMock).not.toHaveBeenCalled();
      });

      it('should call onClickUpliftButton with card id when uplift card is clicked', () => {
        const { container } = createComponent({
          shouldShowUplift: true,
          onClickUpliftButton: onClickUpliftButtonMock
        });

        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[1]);

        expect(onClickUpliftButtonMock).toHaveBeenCalledWith({ selectedCardId: 'UPLIFT_CARD_ID' });
      });

      it('should not call onClickUpliftButton when editMode is true', () => {
        const { container } = createComponent({
          editMode: true,
          showEditHeader: true,
          shouldShowUplift: true,
          onClickUpliftButton: onClickUpliftButtonMock
        });

        const upliftCard = container.querySelectorAll('.credit-card-radio-input')[1];

        expect(upliftCard.textContent).toContain('Pay Monthly');

        fireEvent.click(upliftCard);

        expect(onClickUpliftButtonMock).not.toHaveBeenCalled();
      });

      it('should call clearFormDataByIdFn with form id when click use new credit card and updateFormDataValueFn to have not been called', () => {
        const { container } = createComponent(
          {
            savedCreditCards,
            showEditHeader: true,
            enableOperationOnCC: true,
            userAddressInfo: null
          },
          {
            app: {
              formData: {
                AIR_BOOKING_PAYMENT_FORM: {
                  url: '/air/booking/payment/edit?airportsCode=ATL-AUS',
                  data: {
                    selectedCardId: '1-ENKS5K',
                    nameOnCard: 'siyang li'
                  }
                }
              }
            }
          }
        );

        fireEvent.click(container.querySelector('[value="NEW_CREDIT_CARD_ID"]'));

        expect(FormDataActions.clearFormDataById).toHaveBeenCalled();
        expect(updateFormDataValueFnMock).not.toHaveBeenCalled();
      });

      it('should call clearFormDataByIdFn with form id and call updateFormDataValueFn', () => {
        const { container } = createComponent(
          {
            savedCreditCards,
            showEditHeader: true,
            enableOperationOnCC: true
          },
          {
            app: {
              formData: {
                AIR_BOOKING_PAYMENT_FORM: {
                  url: '/air/booking/payment/edit?airportsCode=ATL-AUS',
                  data: {
                    selectedCardId: '1-ENKS5K',
                    nameOnCard: 'siyang li'
                  }
                }
              }
            }
          }
        );

        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[3]);

        expect(FormDataActions.clearFormDataById).toHaveBeenCalled();
        expect(updateFormDataValueFnMock).not.toHaveBeenCalled();
      });
    });

    describe('use new credit card', () => {
      describe('with valid data', () => {
        beforeEach(() => {
          paymentInfoWithUseNewCreditCard.isoCountryCode = 'CN';
          paymentInfoWithUseNewCreditCard.securityCode = '123';
          wrapper = createComponent({
            savedCreditCards,
            initialFormData: paymentInfoWithUseNewCreditCard
          });
        });

        it('should render properly when country is not US', () => {
          const { container } = wrapper;

          expect(container.querySelector('.province-field_international')).not.toBeNull();
        });

        it('should call onSubmit when submit by new credit card', () => {
          const { container } = wrapper;

          fireEvent.submit(container.querySelector('form'));

          const expectResult = {
            selectedCardId: 'NEW_CREDIT_CARD_ID',
            cardNumber: '4123456789012',
            securityCode: '123',
            nameOnCard: 'adfds gfd',
            expiration: '2029-10',
            isoCountryCode: 'CN',
            addressLine1: 'asdfafa',
            addressLine2: '',
            zipOrPostalCode: '12312',
            city: 'Brooklyn',
            stateProvinceRegion: 'AS',
            phoneCountryCode: 'AS',
            phoneNumber: '555-555-5555'
          };

          expect(onSubmitMock).toHaveBeenCalledWith(expectResult);
        });
      });

      describe('with invalid data', () => {
        beforeEach(() => {
          paymentInfoWithUseNewCreditCard.cardNumber = '';
          wrapper = createComponent({
            savedCreditCards,
            initialFormData: paymentInfoWithUseNewCreditCard
          });
        });

        it('should not call onSubmit when data is not valid', () => {
          const { container } = wrapper;

          fireEvent.submit(container.querySelector('form'));

          expect(onSubmitMock).not.toHaveBeenCalled();
        });
      });

      describe('with a UATP card', () => {
        beforeEach(() => {
          paymentInfoWithUseNewCreditCard.cardNumber = '1';
          wrapper = createComponent({
            savedCreditCards,
            initialFormData: paymentInfoWithUseNewCreditCard
          });
        });
        it('should hide the CVV field', () => {
          const { container } = wrapper;

          expect(container.querySelector('input.purchase-summary-security-code--input-field')).toBeNull();
        });
      });
    });
  });

  describe('render', () => {
    it('should render pageHeaderWithButtons when showEditHeader is true', () => {
      const { container } = createComponent({
        showEditHeader: true
      });

      expect(container).toMatchSnapshot();
    });

    it('should render pageHeaderWithButtons with left cancel button when showEditHeader is true and edit mode is false and selectedCard is empty', () => {
      const { container } = createComponent({
        showEditHeader: true,
        editMode: false
      });

      expect(container).toMatchSnapshot();
    });

    it('should hide submit segment when hideSubmitSegment is true', () => {
      const { container } = createComponent({
        hideSubmitSegment: true
      });

      expect(container).toMatchSnapshot();
    });

    it('should not render pageHeaderWithButtons and submit segment when showEditHeader and hideSubmitSegment is false', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should not render payment footer when in edit mode', () => {
      const { container } = createComponent({ editMode: true });

      expect(container).toMatchSnapshot();
    });

    it('should not render credit cards bottom bar when not in edit mode', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should not render the security code, until implemented by CHAPI', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render CreditCardFields when shouldShowChaseInstantCreditCard is true', () => {
      const { container } = createComponent({
        shouldShowChaseInstantCreditCard: true
      });

      expect(container).toMatchSnapshot();
    });

    it('should not render apple pay option when shouldShowApplePay is not present', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should not render apple pay option when shouldShowApplePay is false', () => {
      const { container } = createComponent({ shouldShowApplePay: false });

      expect(container).toMatchSnapshot();
    });

    it('should render apple pay option when shouldShowApplePay is true', () => {
      const { container } = createComponent({ shouldShowApplePay: true });

      expect(container).toMatchSnapshot();
    });

    it('should not render uplift option when shouldShowUplift is not present', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should not render uplift option when shouldShowUplift is false', () => {
      const { container } = createComponent({ shouldShowUplift: false });

      expect(container).toMatchSnapshot();
    });

    it('should render uplift option when shouldShowUplift is true', () => {
      const { container } = createComponent({ shouldShowUplift: true });

      expect(container).toMatchSnapshot();
    });

    it('should render paypal option', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('in editMode', () => {
    beforeEach(() => {
      wrapper = createComponent({
        editMode: true,
        showEditHeader: true
      });
    });

    describe('credit card check status', () => {
      it('should set credit cards checked status empty when in edit mode', () => {
        const { container } = wrapper;

        expect(container.querySelector('.checkbox-button_checked')).toBeNull();
      });

      it('should update credit card checked status when click one credit card', () => {
        const instance = React.createRef();
        const { container } = createComponent({ editMode: true, showEditHeader: true, ref: instance });

        expect(container.querySelector('.checkbox-button_checked')).toBeNull();

        fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);

        expect(container.querySelector('.checkbox-button_checked')).not.toBeNull();
      });
    });

    describe('credit cards bottom bar', () => {
      it('should render credit cards bottom bar when in edit mode', () => {
        const { container } = wrapper;

        expect(container.querySelector('.credit-cards-bottom-bar')).not.toBeNull();
      });

      it('should disable all the button when not select credit card', () => {
        const { container } = wrapper;

        expect(container.querySelector('.credit-cards-bottom-bar--button_active')).toBeNull();
      });

      describe('primary button', () => {
        it('should disable primary button when just one primary card is chosen', () => {
          const { container } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);

          expect(container).toMatchSnapshot();
        });

        it('should disable primary button when more than one card is chosen', () => {
          const { container } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
          fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

          expect(container).toMatchSnapshot();
        });

        it('should enable primary button when just one non-primary card is chosen', () => {
          const { container } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

          expect(container).toMatchSnapshot();
        });

        it('should call onMakePrimaryCreditCard when click primary button', () => {
          const { container, queryByText } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);
          fireEvent.click(queryByText('Primary'));

          expect(onMakePrimaryCreditCardMock).toHaveBeenCalledWith('1-ENKS5K');
        });

        it('should call onDeleteCreditCards when click delete button', () => {
          const { container, queryByText } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

          fireEvent.click(queryByText('Delete'));

          expect(onDeleteCreditCardsMock).toHaveBeenCalledWith(['1-ENKS5K']);
        });
      });

      describe('update button', () => {
        it('should disable update button when more than one card is chosen', () => {
          const { container } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
          fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

          expect(container).toMatchSnapshot();
        });

        it('should enable update button when just one card is chosen', () => {
          const { container } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

          expect(container).toMatchSnapshot();
        });

        it('should call onUpdateCreditCard when click update button', () => {
          const { container, queryByText } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);

          fireEvent.click(queryByText('Update'));

          expect(onUpdateCreditCardMock).toHaveBeenCalledWith('1-ENKS4K');
        });
      });

      describe('delete button', () => {
        it('should enable delete button when more than one card is chosen', () => {
          const { container } = wrapper;

          fireEvent.click(container.querySelectorAll('.checkbox-button')[0]);
          fireEvent.click(container.querySelectorAll('.checkbox-button')[1]);

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('paypal', () => {
      it('paypal card onClick function should not be called when editMode is true', () => {
        const { container, queryAllByText } = createComponent({
          editMode: true,
          showEditHeader: true
        });

        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[1]);

        expect(queryAllByText('Use PayPal')[0]).not.toBeNull();
        expect(onClickPayPalButtonMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('Fill form', () => {
    describe('when already selected new credit card option', () => {
      describe('with saved credit card in account', () => {
        beforeEach(() => {
          paymentInfoWithUseNewCreditCard.securityCode = '123';
          wrapper = createComponent({
            savedCreditCards,
            initialFormData: paymentInfoWithUseNewCreditCard
          });
        });

        it('should fill payment info into form, when reselect use new credit card', () => {
          const { container } = wrapper;

          fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[0]);
          fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[3]);
          fireEvent.submit(container.querySelector('form'));

          expect(onSubmitMock).toHaveBeenCalledWith({
            selectedCardId: 'NEW_CREDIT_CARD_ID',
            cardNumber: '4123456789012',
            securityCode: '123',
            nameOnCard: 'adfds gfd',
            expiration: '2029-10',
            isoCountryCode: 'US',
            addressLine1: 'asdfafa',
            addressLine2: '',
            zipOrPostalCode: '12312',
            city: 'Brooklyn',
            stateProvinceRegion: 'AS',
            phoneCountryCode: 'AS',
            phoneNumber: '555-555-5555'
          });
        });
      });

      describe('without saved credit card in account', () => {
        beforeEach(() => {
          paymentInfoWithUseNewCreditCard.securityCode = '123';
          wrapper = createComponent({
            savedCreditCards: { primaryCard: null, otherCards: [] },
            initialFormData: paymentInfoWithUseNewCreditCard
          });
        });

        it('should fill payment info into form, when use a new credit card', () => {
          const { container } = wrapper;

          fireEvent.submit(container.querySelector('form'));

          expect(onSubmitMock).toHaveBeenCalledWith({
            selectedCardId: 'NEW_CREDIT_CARD_ID',
            cardNumber: '4123456789012',
            securityCode: '123',
            nameOnCard: 'adfds gfd',
            expiration: '2029-10',
            isoCountryCode: 'US',
            addressLine1: 'asdfafa',
            addressLine2: '',
            zipOrPostalCode: '12312',
            city: 'Brooklyn',
            stateProvinceRegion: 'AS',
            phoneCountryCode: 'AS',
            phoneNumber: '555-555-5555'
          });
        });
      });
    });

    describe('when selected exist credit card', () => {
      beforeEach(() => {
        wrapper = createComponent({
          savedCreditCards,
          initialFormData: {
            nameOnCard: 'Fisher King'
          }
        });
      });

      it('should reset form data to default value when reselect use new credit card', () => {
        const { container } = wrapper;

        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[3]);
        fireEvent.change(container.querySelector('input[name="nameOnCard'), 'Siyang Li');
        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[0]);
        fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[3]);

        expect(container.querySelector('input[name="nameOnCard"]').value).toContain('Fisher King');
      });
    });
  });

  describe('when corporate', () => {
    const singleGhostCards = {
      ghostCards: [
        {
          savedCreditCardId: 'First Ghost Card',
          type: 'GHOST_CARD',
          name: 'First Ghost Card',
          isExpired: false
        }
      ]
    };
    const multipleGhostCards = {
      ghostCards: [
        {
          savedCreditCardId: 'First Ghost Card',
          type: 'GHOST_CARD',
          name: 'First Ghost Card',
          isExpired: false
        },
        {
          savedCreditCardId: 'Second Ghost Card',
          type: 'GHOST_CARD',
          name: 'Second Ghost Card',
          isExpired: false
        }
      ]
    };

    it('should default select the ghost card if there is only 1 ghost card available', () => {
      jest.spyOn(LoginSessionHelper, 'hasCorporateToken').mockReturnValue(true);
      const { container } = createComponent({
        savedCreditCards: { ...new PaymentSavedCreditCardsBuilder().withOtherCards([]).build(), ...singleGhostCards }
      });

      expect(container.querySelector('.credit-card-radio-input_selected').textContent).toEqual('First Ghost Card');
    });

    it('should default select the primary card if multiple ghost cards are available', () => {
      savedCreditCards = {
        primaryCard: {
          savedCreditCardId: '1-ENKS4K',
          type: '',
          name: '1-ENKS4K'
        },
        otherCards: [],
        ...multipleGhostCards
      };
      const { container } = createComponent({ savedCreditCards });

      expect(container.querySelector('.credit-card-radio-input_selected input[value="1-ENKS4K"]')).not.toBeNull();
    });

    it('should not default to any card if multiple ghost cards are available and ghost card is required', () => {
      savedCreditCards = {
        primaryCard: {
          savedCreditCardId: '1-ENKS4K',
          type: '',
          name: '1-ENKS4K'
        },
        otherCards: [],
        ghostCardRequired: true,
        ...multipleGhostCards
      };
      jest.spyOn(LoginSessionHelper, 'hasCorporateToken').mockReturnValue(true);
      const { container } = createComponent({ savedCreditCards });

      expect(container.querySelector('.credit-card-radio-input_selected input[value="1-ENKS4K"]')).toBeNull();
    });

    it('should fill payment info into form, when select use new credit card', () => {
      paymentInfoWithUseNewCreditCard.securityCode = '123';
      const { container } = createComponent({
        savedCreditCards: {
          ...new PaymentSavedCreditCardsBuilder().withOtherCards([]).build(),
          ...singleGhostCards
        },
        initialFormData: paymentInfoWithUseNewCreditCard
      });

      fireEvent.click(container.querySelectorAll('.credit-card-radio-input')[0]);
      fireEvent.click(container.querySelector('[value="NEW_CREDIT_CARD_ID"]'));
      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitMock).toHaveBeenCalledWith({
        selectedCardId: 'NEW_CREDIT_CARD_ID',
        selectedGhostCardId: '',
        cardNumber: '4123456789012',
        securityCode: '123',
        nameOnCard: 'adfds gfd',
        expiration: '2029-10',
        isoCountryCode: 'US',
        addressLine1: 'asdfafa',
        addressLine2: '',
        zipOrPostalCode: '12312',
        city: 'Brooklyn',
        stateProvinceRegion: 'AS',
        phoneCountryCode: 'AS',
        phoneNumber: '555-555-5555'
      });
    });
  });
});
