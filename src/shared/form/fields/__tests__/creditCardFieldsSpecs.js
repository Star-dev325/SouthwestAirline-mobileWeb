import React from 'react';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import proxyquire from 'proxyquire';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { DEFAULT_PAYMENT_OPTION_ORDER } from 'src/shared/constants/paymentOptionTypes';
import imagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import i18n from '@swa-ui/locale';

const sinon = sinonModule.sandbox.create();

describe('CreditCardFields', () => {
  let wrapper;
  let savedCreditCardPrimary;
  let savedCreditCardOther;
  let onSelectCreditCardCheckBoxStub;
  let onUseNewCreditCardChangeStub;
  let onClickPayPalButtonStub;
  let onClickApplePayButtonStub;
  let onClickUpliftButtonStub;

  beforeEach(() => {
    onSelectCreditCardCheckBoxStub = sinon.stub();
    onUseNewCreditCardChangeStub = sinon.stub();
    onClickPayPalButtonStub = sinon.stub();
    onClickApplePayButtonStub = sinon.stub();
    onClickUpliftButtonStub = sinon.stub();
    savedCreditCardPrimary = new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-ENKS4K').build();
    savedCreditCardOther = new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-ENKS5K').build();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    context('with saved credit cards or chase instant card', () => {
      it('should render payment options title by default', () => {
        wrapper = createComponent();

        expect(wrapper.find('.other-saved-credit-cards .saved-credit-cards--title')).to.have.text(
          i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__PAYMENT_OPTIONS')
        );
      });

      it('should render chase instant credit card when shouldShowChaseInstantCreditCard is true', () => {
        wrapper = createComponent({
          shouldShowChaseInstantCreditCard: true
        });

        expect(wrapper.find('ChaseInstantCreditCardFields')).to.exist;
      });

      it('should not render chase instant credit card when shouldShowChaseInstantCreditCard is false', () => {
        wrapper = createComponent({
          shouldShowChaseInstantCreditCard: false
        });

        expect(wrapper.find('ChaseInstantCreditCardRadioInput')).to.not.be.present();
      });

      it('should render apple pay card when shouldShowApplePay is true and PAYMENT_OPTION_ORDER includes Apple Pay', () => {
        wrapper = createComponent({ shouldShowApplePay: true });

        expect(wrapper.find('.credit-card--image_apple-pay')).to.be.present();
      });

      it('should not render apple pay card when shouldShowApplePay is false', () => {
        wrapper = createComponent({ shouldShowApplePay: false });

        expect(wrapper.find('.credit-card--image_apple-pay')).to.not.be.present();
      });

      it('should render uplift when shouldShowUplift is true and PAYMENT_OPTION_ORDER includes Uplift', () => {
        wrapper = createComponent({ shouldShowUplift: true });

        expect(wrapper.find('.credit-card--image_uplift')).to.be.present();
      });

      it('should not render uplift when shouldShowUplift is false', () => {
        wrapper = createComponent({ shouldShowUplift: false });

        expect(wrapper.find('.credit-card--image_uplift')).to.not.be.present();
      });

      it('should render disabled text when shouldShowUplift is true and shouldDisableUplift is true', () => {
        const upliftDisabledPlacement = new imagePlacementBuilder().build();

        wrapper = createComponent({
          shouldShowUplift: true,
          shouldDisableUplift: true,
          upliftDisabledPlacement
        });

        expect(wrapper.find('DynamicPlacement')).to.be.present();
      });

      it('should not render disabled text when shouldShowUplift is false and shouldDisableUplift is false', () => {
        wrapper = createComponent({ shouldShowUplift: false, shouldDisableUplift: false });

        expect(wrapper.find('DynamicPlacement')).to.not.be.present();
      });

      it('should pass additionalInfoMessage when shouldDisableUplift is false', () => {
        wrapper = createComponent({
          shouldShowUplift: true,
          shouldDisableUplift: false,
          upliftAdditionalMessaging: 'upliftAdditionalMessaging'
        });

        expect(wrapper.find('SavedCreditCardRadioInput').at(1)).to.have.prop(
          'additionalInfoMessage',
          'upliftAdditionalMessaging'
        );
      });

      it('should not pass additionalInfoMessage when shouldDisableUplift is true', () => {
        wrapper = createComponent({
          shouldShowUplift: true,
          shouldDisableUplift: true,
          upliftAdditionalMessaging: 'upliftAdditionalMessaging'
        });

        expect(wrapper.find('SavedCreditCardRadioInput').at(1)).to.not.have.prop('additionalInfoMessage');
      });

      it('should pass additionalInfoLink when shouldDisableUplift is false', () => {
        wrapper = createComponent({
          shouldShowUplift: true,
          shouldDisableUplift: false,
          upliftAdditionalInfoLink: 'upliftAdditionalInfoLink'
        });

        expect(wrapper.find('SavedCreditCardRadioInput').at(1)).to.have.prop(
          'additionalInfoLink',
          'upliftAdditionalInfoLink'
        );
      });

      it('should not pass additionalInfoLink when shouldDisableUplift is true', () => {
        wrapper = createComponent({
          shouldShowUplift: true,
          shouldDisableUplift: true,
          upliftAdditionalInfoLink: 'upliftAdditionalInfoLink'
        });

        expect(wrapper.find('SavedCreditCardRadioInput').at(1)).to.not.have.prop('additionalInfoLink');
      });

      it('should render primary card when there is primary saved credit card', () => {
        wrapper = createComponent();

        expect(wrapper.find('.primary-saved-credit-cards')).to.exist;
        const primaryRadioInput = wrapper.find('.primary-saved-credit-cards').find('SavedCreditCardRadioInput');

        expect(primaryRadioInput.prop('creditCardInfo')).to.deep.equal(savedCreditCardPrimary);
      });

      it('should not render primary card when there is not primary saved credit card', () => {
        wrapper = createComponent({
          savedCreditCards: undefined
        });

        expect(wrapper.find('.primary-saved-credit-cards')).to.not.exist;
      });

      it('should render normal cards when where are multiple normal saved credit cards', () => {
        wrapper = createComponent({
          savedCreditCards: {
            primaryCard: new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-ENKS5K').build(),
            otherCards: [new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-ENKS6K').build()]
          }
        });

        expect(wrapper.find('SavedCreditCardRadioInput')).to.have.lengthOf(4);
      });

      it('should render new credit/debit card when saved credit cards exist', () => {
        wrapper = createComponent({
          savedCreditCards: {
            primaryCard: new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-ENKS5K').build(),
            otherCards: []
          }
        });

        expect(wrapper.find('CreditCardRadioField').last()).to.have.prop('creditCard').to.deep.equal({
          name: 'Use new credit/debit card',
          savedCreditCardId: 'NEW_CREDIT_CARD_ID',
          type: 'NEW'
        });
      });

      context('when in edit mode', () => {
        beforeEach(() => {
          wrapper = createComponent({
            editMode: true
          });
        });

        it('should render checkbox when in edit mode', () => {
          expect(wrapper.find('.saved-credit-cards--item_edit-mode')).to.exist;
          expect(wrapper.find('CheckboxButton')).to.exist;
        });

        it('should not show radio button for saved credit cards', () => {
          expect(wrapper.find('SavedCreditCardRadioInput').at(0)).to.have.prop('showRadioButton', false);
          expect(wrapper.find('SavedCreditCardRadioInput').at(1)).to.have.prop('showRadioButton', false);
        });

        it('should disabled new credit card field', () => {
          expect(wrapper.find('CreditCardRadioField').at(2)).to.have.prop('disabled', true);
        });
      });

      context('when not in edit mode', () => {
        beforeEach(() => {
          wrapper = createComponent({
            editMode: false
          });
        });

        it('should showRadioButton for all credit card', () => {
          expect(wrapper.find('SavedCreditCardRadioInput').at(0)).to.have.prop('showRadioButton', true);
        });

        it('should not render checkbox when not in edit mode', () => {
          expect(wrapper.find('.saved-credit-cards--item_edit-mode')).to.not.exist;
          expect(wrapper.find('CheckboxButton')).to.not.exist;
        });
      });

      context('paypal', () => {
        it('should render paypal card', () => {
          wrapper = createComponent();

          expect(wrapper.find('.credit-card--image_paypal')).to.be.present();
        });
      });
    });

    context('without any saved credit card', () => {
      beforeEach(() => {
        wrapper = createComponent({
          savedCreditCards: { primaryCard: null, otherCards: [] },
          shouldShowChaseInstantCreditCard: false
        });
      });
      it('should render payment options title there is not a saved credit card', () => {
        expect(wrapper.find('.other-saved-credit-cards .saved-credit-cards--title')).to.have.text(
          i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__PAYMENT_OPTIONS')
        );
      });

      it('should render paypal card', () => {
        expect(wrapper.find('.credit-card--image_paypal')).to.be.present();
      });

      it('should show new credit card', () => {
        expect(wrapper.find('CreditCardRadioField').last()).to.have.prop('creditCard').to.deep.equal({
          name: 'Use new credit/debit card',
          savedCreditCardId: 'NEW_CREDIT_CARD_ID',
          type: 'NEW'
        });
      });
    });
  });

  context('behaviour', () => {
    it('should switch to another when click on each saved credit cards', () => {
      wrapper = createComponent();

      wrapper.find('CreditCardRadioInput').at(0).find('input').simulate('click');
      wrapper.update();
      expect(wrapper.find('CreditCardRadioInput').at(0)).to.have.prop('selected', true);

      wrapper.find('CreditCardRadioInput').at(2).simulate('click');
      wrapper.update();
      expect(wrapper.find('CreditCardRadioInput').at(0)).to.have.prop('selected', false);
      expect(wrapper.find('CreditCardRadioInput').at(2)).to.have.prop('selected', true);
    });

    it('should call onUseNewCreditCardChange when click on new credit card', () => {
      wrapper = createComponent();

      const usingNewCreditCardRadioInput = wrapper.find('.new-credit-card').find('CreditCardRadioInput');

      click(usingNewCreditCardRadioInput);

      expect(onUseNewCreditCardChangeStub).to.have.been.called;
    });

    it('should call onClickPayPalButton when click on paypal card', () => {
      wrapper = createComponent({
        onClickPayPalButton: onClickPayPalButtonStub
      });

      const payPalCard = wrapper.find('.credit-card--image_paypal');

      click(payPalCard);

      expect(onClickPayPalButtonStub).to.have.been.called;
    });

    it('should call onClickApplePayButton when click on apple pay card', () => {
      wrapper = createComponent({
        shouldShowApplePay: true,
        onClickApplePayButton: onClickApplePayButtonStub
      });

      click(wrapper.find('.credit-card--image_apple-pay'));

      expect(onClickApplePayButtonStub).to.have.been.called;
    });

    it('should call onClickUpliftButton when click on uplift card', () => {
      wrapper = createComponent({
        shouldShowUplift: true,
        onClickUpliftButton: onClickUpliftButtonStub
      });

      click(wrapper.find('.credit-card--image_uplift'));

      expect(onClickUpliftButtonStub).to.have.been.called;
    });

    it('should not call onClickUpliftButton when click on uplift card if shouldDisableUplift is true', () => {
      wrapper = createComponent({
        shouldShowUplift: true,
        shouldDisableUplift: true,
        onClickUpliftButton: onClickUpliftButtonStub
      });

      click(wrapper.find('.credit-card--image_uplift'));

      expect(onClickUpliftButtonStub).to.not.have.been.called;
    });

    context('in editMode', () => {
      beforeEach(() => {
        wrapper = createComponent({ editMode: true });
      });

      it('should update credit card checked status when click one credit card', () => {
        const checkBoxWrapper = wrapper.find('CheckboxButton').at(0);

        expect(checkBoxWrapper).to.have.prop('defaultChecked', false);

        click(checkBoxWrapper);

        expect(onSelectCreditCardCheckBoxStub).to.have.been.calledWith('1-ENKS4K');
      });

      it('should switch to another when click on each saved credit cards', () => {
        const radioInput = wrapper.find('CreditCardRadioInput').at(0);

        click(radioInput);

        expect(onSelectCreditCardCheckBoxStub).to.have.been.calledWith('1-ENKS4K');
      });

      it('should not in edit mode for new credit card', () => {
        const newCreditCard = wrapper.find('CreditCardRadioField').last();

        expect(newCreditCard).to.have.prop('editMode', false);
      });
    });
  });

  context('payment option ordering', () => {
    it('should use default ordering for PAYMENT_OPTION_ORDER', () => {
      wrapper = createComponent({
        shouldShowChaseInstantCreditCard: true,
        shouldShowApplePay: true,
        shouldShowUplift: true
      });

      expect(wrapper.find('CreditCardRadioInput').length).to.equal(7);

      const firstPaymentOption = wrapper.find('CreditCardRadioInput').at(0);
      const secondPaymentOption = wrapper.find('CreditCardRadioInput').at(1);
      const thirdPaymentOption = wrapper.find('CreditCardRadioInput').at(2);
      const fourthPaymentOption = wrapper.find('CreditCardRadioInput').at(3);
      const fifthPaymentOption = wrapper.find('CreditCardRadioInput').at(4);
      const sixthPaymentOption = wrapper.find('CreditCardRadioInput').at(5);
      const seventhPaymentOption = wrapper.find('CreditCardRadioInput').at(6);

      expect(firstPaymentOption).prop('type').to.equal('INSTANT_CREDIT_RAPID_REWARDS_VISA');
      expect(secondPaymentOption).prop('savedCreditCardId').to.equal('1-ENKS4K');
      expect(secondPaymentOption).prop('type').to.equal('VISA');
      expect(thirdPaymentOption).prop('type').to.equal('UPLIFT');
      expect(fourthPaymentOption).prop('type').to.equal('PAYPAL');
      expect(fifthPaymentOption).prop('type').to.equal('APPLE_PAY');
      expect(sixthPaymentOption).prop('savedCreditCardId').to.equal('1-ENKS5K');
      expect(sixthPaymentOption).prop('type').to.equal('VISA');
      expect(seventhPaymentOption).prop('type').to.equal('NEW');
    });

    it('should use WCM PAYMENT_OPTION_ORDER but keep Chase Instant Visa as the first option', () => {
      wrapper = createComponent(
        {
          shouldShowChaseInstantCreditCard: true,
          shouldShowApplePay: true,
          shouldShowUplift: true
        },
        {},
        {},
        ['SAVED_CREDIT_CARD', 'CHASE_INSTANT_RR_VISA', 'UPLIFT', 'PAYPAL', 'APPLE_PAY']
      );

      expect(wrapper.find('CreditCardRadioInput').length).to.equal(7);

      const firstPaymentOption = wrapper.find('CreditCardRadioInput').at(0);
      const secondPaymentOption = wrapper.find('CreditCardRadioInput').at(1);
      const thirdPaymentOption = wrapper.find('CreditCardRadioInput').at(2);
      const fourthPaymentOption = wrapper.find('CreditCardRadioInput').at(3);
      const fifthPaymentOption = wrapper.find('CreditCardRadioInput').at(4);
      const sixthPaymentOption = wrapper.find('CreditCardRadioInput').at(5);
      const seventhPaymentOption = wrapper.find('CreditCardRadioInput').at(6);

      expect(firstPaymentOption).prop('type').to.equal('INSTANT_CREDIT_RAPID_REWARDS_VISA');
      expect(secondPaymentOption).prop('savedCreditCardId').to.equal('1-ENKS4K');
      expect(secondPaymentOption).prop('type').to.equal('VISA');
      expect(thirdPaymentOption).prop('savedCreditCardId').to.equal('1-ENKS5K');
      expect(thirdPaymentOption).prop('type').to.equal('VISA');
      expect(fourthPaymentOption).prop('type').to.equal('UPLIFT');
      expect(fifthPaymentOption).prop('type').to.equal('PAYPAL');
      expect(sixthPaymentOption).prop('type').to.equal('APPLE_PAY');
      expect(seventhPaymentOption).prop('type').to.equal('NEW');
    });

    it('should not show a payment option type if not in PAYMENT_OPTION_ORDER list', () => {
      wrapper = createComponent(
        {
          shouldShowChaseInstantCreditCard: true
        },
        {},
        {},
        ['SAVED_CREDIT_CARD', 'CHASE_INSTANT_RR_VISA']
      );
      expect(wrapper.find('CreditCardRadioInput').length).to.equal(4);

      const firstPaymentOption = wrapper.find('CreditCardRadioInput').at(0);
      const secondPaymentOption = wrapper.find('CreditCardRadioInput').at(1);
      const thirdPaymentOption = wrapper.find('CreditCardRadioInput').at(2);
      const fourthPaymentOption = wrapper.find('CreditCardRadioInput').at(3);

      expect(firstPaymentOption).prop('type').to.equal('INSTANT_CREDIT_RAPID_REWARDS_VISA');
      expect(secondPaymentOption).prop('savedCreditCardId').to.equal('1-ENKS4K');
      expect(secondPaymentOption).prop('type').to.equal('VISA');
      expect(thirdPaymentOption).prop('savedCreditCardId').to.equal('1-ENKS5K');
      expect(thirdPaymentOption).prop('type').to.equal('VISA');
      expect(fourthPaymentOption).prop('type').to.equal('NEW');

      expect(wrapper.find('.credit-card--image_paypal')).to.not.be.present();
      expect(wrapper.find('.credit-card--image_apple-pay')).to.not.be.present();
    });
  });

  context('when corporate', () => {
    it('should show ghost cards if traveler has ghost cards', () => {
      wrapper = createComponent({
        onSelectGhostCard: sinon.stub(),
        savedCreditCards: {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'GHOST_CARD',
              name: 'First Ghost Card',
              isExpired: false
            }
          ]
        }
      });

      expect(wrapper.find('.ghost-cards .saved-credit-cards--title')).to.present('CORPORATE CARD');
    });

    it('should show radio button checkbox icon if only 1 ghost card available', () => {
      wrapper = createComponent({
        onSelectGhostCard: sinon.stub(),
        savedCreditCards: {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'GHOST_CARD',
              name: 'First Ghost Card',
              isExpired: false
            }
          ]
        }
      });
      expect(wrapper.find('.ghost-cards .check')).to.present();
    });

    it('should show other forms of payments along with ghost cards if ghost cards are not required', () => {
      wrapper = createComponent({
        onSelectGhostCard: sinon.stub(),
        savedCreditCards: {
          primaryCard: savedCreditCardPrimary,
          otherCards: [savedCreditCardOther],
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'GHOST_CARD',
              name: 'First Ghost Card',
              isExpired: false
            }
          ],
          ghostCardRequired: false
        }
      });

      expect(wrapper.find('.other-saved-credit-cards .saved-credit-cards--title')).to.present(
        i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__PAYMENT_OPTIONS')
      );
    });

    it('should select primary as default if there is no ghost card', () => {
      expect(wrapper.find('.primary-saved-credit-cards .check')).to.present();
    });

    it('should select ghost card as default if there is 1 ghost card and ghost card is not required', () => {
      wrapper = createComponent({
        onSelectGhostCard: sinon.stub(),
        savedCreditCards: {
          ghostCards: [
            {
              savedCreditCardId: 'First Ghost Card',
              type: 'GHOST_CARD',
              name: 'First Ghost Card',
              isExpired: false
            }
          ]
        }
      });
      expect(wrapper.find('.ghost-cards .check')).to.present();
    });

    context('when multiple ghost card', () => {
      it('should show arrow icon if multiple ghost card available', () => {
        wrapper = createComponent({
          onSelectGhostCard: sinon.stub(),
          savedCreditCards: {
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
          }
        });

        expect(wrapper.find('.ghost-cards .check')).not.to.present();
      });

      it('should set the default selected as primary card if multiple ghost cards and ghost cards not required', () => {
        wrapper = createComponent({
          onSelectGhostCard: sinon.stub(),
          savedCreditCards: {
            primaryCard: savedCreditCardPrimary,
            otherCards: [savedCreditCardOther],
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
          }
        });

        expect(wrapper.find('.primary-saved-credit-cards .check')).to.present();
      });
    });

    context('when ghost card required', () => {
      it('should not show other forms of payments', () => {
        wrapper = createComponent({
          onSelectGhostCard: sinon.stub(),
          savedCreditCards: {
            primaryCard: savedCreditCardPrimary,
            otherCards: [savedCreditCardOther],
            ghostCards: [
              {
                savedCreditCardId: 'First Ghost Card',
                type: 'GHOST_CARD',
                name: 'First Ghost Card',
                isExpired: false
              }
            ],
            ghostCardRequired: true
          }
        });

        expect(wrapper.find('.other-saved-credit-cards .saved-credit-cards--title')).not.to.present(
          i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__PAYMENT_OPTIONS')
        );
      });
    });
  });

  function createComponent(
    props = {},
    initialValue = {},
    formOptions = {},
    paymentOptionOrder = DEFAULT_PAYMENT_OPTION_ORDER
  ) {
    const savedCreditCards = {
      primaryCard: savedCreditCardPrimary,
      otherCards: [savedCreditCardOther]
    };

    const onSubmitStub = () => null;
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);
    const CreditCardFields = proxyquire('src/shared/form/fields/creditCardFields', {
      'src/shared/constants/paymentOptionTypes': {
        PAYMENT_OPTION_ORDER: paymentOptionOrder
      }
    }).default;

    return mount(
      <MockedForm formData={initialValue} onSubmit={onSubmitStub}>
        <CreditCardFields
          names={['selectedCardId', 'chasePhoneNumber', 'chasePhoneCountryCode']}
          onSelectCreditCardCheckBox={onSelectCreditCardCheckBoxStub}
          selectedCreditCardStatuses={[]}
          savedCreditCards={savedCreditCards}
          onUseNewCreditCardChange={onUseNewCreditCardChangeStub}
          {...props}
        />
      </MockedForm>
    );
  }
});
