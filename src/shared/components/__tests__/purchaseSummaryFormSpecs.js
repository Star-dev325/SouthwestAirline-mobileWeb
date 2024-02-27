import i18n from '@swa-ui/locale';
import { mount } from 'enzyme';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import sinonModule from 'sinon';
import PurchaseSummaryForm from 'src/shared/components/purchaseSummaryForm';
import { MOBILE_HERO } from 'src/wcm/constants/wcmConstants';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';
import EarlyBirdPlacementBuilder from 'test/builders/model/earlyBirdPlacementBuilder';
import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { noop } from 'src/shared/helpers/jsUtils';

const sinon = sinonModule.sandbox.create();

jest.mock('@swa-ui/locale', () => ({
  __esModule: true,
  default: {
    // Mocked implementation of i18n
  }
}));

describe('PurchaseSummaryForm', () => {
  let purchaseSummaryForm;
  let onTripAndPriceClickStub;
  let onPaymentEditClickStub;
  let onParentOrGuardianItemClickStub;
  let onPassengerItemClickStub;
  let onUnmountStub;
  let onSubmitStub;
  let purchaseFlightsStub;
  let onIrnInfoClickStub;
  let clickContactMethodFnStub;
  let onClickBillingAddressStub;
  let handleFirmOfferOfCreditFnStub;

  beforeEach(() => {
    onTripAndPriceClickStub = jest.fn();
    onPaymentEditClickStub = jest.fn();
    onParentOrGuardianItemClickStub = jest.fn();
    onPassengerItemClickStub = jest.fn();
    onIrnInfoClickStub = jest.fn();
    onUnmountStub = jest.fn();
    onSubmitStub = jest.fn();
    purchaseFlightsStub = jest.fn();
    clickContactMethodFnStub = jest.fn();
    onClickBillingAddressStub = jest.fn();
    handleFirmOfferOfCreditFnStub = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  context('When rendered', () => {
    beforeEach(() => {
      purchaseSummaryForm = createComponent();
    });

    it(`should contain all required sections' titles`, () => {
      expect(purchaseSummaryForm.find('[data-qa="your-trip-section-title"]')).toHaveLength(1);
      expect(purchaseSummaryForm.find('[data-qa="passengers-section-title"]')).toHaveLength(1);
      expect(purchaseSummaryForm.find('[data-qa="payment-section-title"]')).toHaveLength(1);
      expect(purchaseSummaryForm.find('[data-qa="purpose-of-travel-section-title"]')).toHaveLength(1);
    });

    it('should contain all required components', () => {
      expect(purchaseSummaryForm.find('TripSummary')).toHaveLength(1);
      expect(purchaseSummaryForm.find('PassengerInfoSummary')).toHaveLength(1);
      expect(purchaseSummaryForm.find('FormNavItemField')).toHaveLength(1);
      expect(purchaseSummaryForm.find('NavItemLink')).toHaveLength(1);
      expect(purchaseSummaryForm.find('FormSelectField')).toHaveLength(1);
    });

    describe('internal reference number', () => {
      it('should not contain irn field when it has irn info but no company name', () => {
        const irnInfo = {
          alternateIrnAllowed: false,
          companyInternalReferenceNumbers: [{ name: '253376' }],
          irnRequired: true
        };

        purchaseSummaryForm = createComponent({ companyName: null, irnInfo });

        expect(purchaseSummaryForm.find('InternalReferenceNumberField')).toHaveLength(0);
      });

      it('should not contain irn field if it has company name but no irn info', () => {
        const irnInfo = null;

        purchaseSummaryForm = createComponent({ companyName: 'Dunder Mifflin Paper Company', irnInfo });

        expect(purchaseSummaryForm.find('InternalReferenceNumberField')).toHaveLength(0);
      });

      it('should contain irn field if it has irn info and company name', () => {
        const irnInfo = {
          alternateIrnAllowed: false,
          companyInternalReferenceNumbers: [{ name: '253376' }],
          irnRequired: true
        };

        purchaseSummaryForm = createComponent({ companyName: 'Dunder Mifflin Paper Company', irnInfo });
        expect(purchaseSummaryForm.find('InternalReferenceNumberField')).toHaveLength(1);
      });

      it('should not contain irn field if it has no value', () => {
        purchaseSummaryForm = createComponent({ onIrnInfoClick: onIrnInfoClickStub });
        expect(purchaseSummaryForm.find('InternalReferenceNumberField')).toHaveLength(1);
      });
    });

    context('securityCode header message', () => {
      it('should provide isContactMethodMissing as true to PurchaseSummarySecurityCodeHeader if contactMethodContent missing', () => {
        purchaseSummaryForm = createComponent();
        expect(purchaseSummaryForm.find('PurchaseSummarySecurityCodeHeader').props().missingContactMethod).toBe(true);
      });

      it('should provide missingContactMethod as false to PurchaseSummarySecurityCodeHeader if contactMethod is not missing', () => {
        purchaseSummaryForm = createComponent({
          initialFormData: {
            contactMethodContent: `${i18n(
                'SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL'
            )}, aterris@example.com`
          }
        });

        expect(purchaseSummaryForm.find('PurchaseSummarySecurityCodeHeader').props().missingContactMethod).toBe(false);
      });

      it('should provide missingContactMethod as false when declineNotifications is true and contactMethodContent missing', () => {
        purchaseSummaryForm = createComponent({ declineNotifications: true });
        expect(purchaseSummaryForm.find('PurchaseSummarySecurityCodeHeader').props().missingContactMethod).toBe(false);
      });

      it('should provide missingPaymentMethod as true to PurchaseSummarySecurityCodeHeader if no saved credit card', () => {
        purchaseSummaryForm = createComponent({
          savedCreditCards: {
            primaryCard: null,
            otherCards: []
          }
        });

        expect(purchaseSummaryForm.find('PurchaseSummarySecurityCodeHeader').props().missingContactMethod).toBe(false);
      });

      it('should provide missingPaymentMethod as false to PurchaseSummarySecurityCodeHeader if card selected', () => {
        purchaseSummaryForm = createComponent({ paymentInfo: { selectedCardId: '1-4BGFWY' } });
        expect(purchaseSummaryForm.find('PurchaseSummarySecurityCodeHeader').props().missingPaymentMethod).toBe(false);
      });

      it('should provide missingBillingAddress as true to PurchaseSummarySecurityCodeHeader if billing address is incomplete and required', () => {
        purchaseSummaryForm = createComponent({
          travelFundsBalanceRemaining: { amount: '0.00', currencyCode: 'USD' },
          billingAddressFormData: { fake: 'data' }
        });

        expect(purchaseSummaryForm.find('PurchaseSummarySecurityCodeHeader').props().missingBillingAddress).toBe(true);
      });

      it('should provide missingBillingAddress as false to PurchaseSummarySecurityCodeHeader if billing address is complete and required', () => {
        purchaseSummaryForm = createComponent({
          travelFundsBalanceRemaining: { amount: '0.00', currencyCode: 'USD' },
          billingAddressFormData: {
            addressLine1: '554 Lane',
            addressLine2: '',
            city: 'Austin',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '75204',
            isoCountryCode: 'US',
            phoneNumber: '215-546-5465',
            phoneCountryCode: 'US'
          }
        });

        expect(purchaseSummaryForm.find('PurchaseSummarySecurityCodeHeader').props().missingBillingAddress).toBe(false);
      });
    });

    context('billing address nav item', () => {
      it('should not render billing address nav item when not needed', () => {
        expect(purchaseSummaryForm.find('BillingAddressNavItemField').exists()).toBe(false);
      });

      it('should render billing address nav item when remaining credit card balance is zero', () => {
        purchaseSummaryForm = createComponent({
          travelFundsBalanceRemaining: { amount: '0.00', currencyCode: 'USD' },
          billingAddressFormData: { fake: 'data' }
        });

        expect(purchaseSummaryForm.find('BillingAddressNavItemField').exists()).toBe(true);
      });

      it('should not render payment method nav item when remaining credit card balance is zero', () => {
        purchaseSummaryForm = createComponent({ travelFundsBalanceRemaining: { amount: '0.00', currencyCode: 'USD' } });
        expect(purchaseSummaryForm.find('PaymentNavItemField').exists()).toBe(false);
      });

      it('should prop billingAddressComplete: false to billing address nav item if billing address is incomplete and required', () => {
        purchaseSummaryForm = createComponent({
          travelFundsBalanceRemaining: { amount: '0.00', currencyCode: 'USD' },
          billingAddressFormData: { fake: 'data' }
        });

        expect(purchaseSummaryForm.find('BillingAddressNavItemField').props().billingAddressComplete).toBe(false);
      });

      it('should prop billingAddressComplete: true to billing address nav item if billing address is complete and required', () => {
        purchaseSummaryForm = createComponent({
          travelFundsBalanceRemaining: { amount: '0.00', currencyCode: 'USD' },
          billingAddressFormData: {
            addressLine1: '554 Lane',
            addressLine2: '',
            city: 'Austin',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '75204',
            isoCountryCode: 'US',
            phoneNumber: '215-546-5465',
            phoneCountryCode: 'US'
          }
        });
        expect(purchaseSummaryForm.find('BillingAddressNavItemField').props().billingAddressComplete).toBe(true);
      });

      it('should call onClick stub when billing address nav item clicked', () => {
        purchaseSummaryForm = createComponent({
          travelFundsBalanceRemaining: { amount: '0.00', currencyCode: 'USD' },
          billingAddressFormData: { fake: 'data' }
        });

        purchaseSummaryForm.find('BillingAddressNavItemField').find('NavItemLink').simulate('click');

        expect(onClickBillingAddressStub).toHaveBeenCalled();
      });
    });

    context('when render early bird', () => {
      it('should render wcm placement', () => {
        const purchaseSummaryForm = createComponent({
          EARLY_BIRD_AB_TESTING: true,
          earlyBirdUpsell: new EarlyBirdPlacementBuilder().build()
        });

        expect(purchaseSummaryForm.find('DynamicPlacement').exists()).toBe(true);
        expect(purchaseSummaryForm.find('EarlyBirdInPathBreakdown').exists()).toBe(false);
      });
    });
  });

  context('contact method', () => {
    context('declineNotifications', () => {
      context('declineNotifications is true', () => {
        beforeEach(() => {
          purchaseSummaryForm = createComponent({
            declineNotifications: true
          });
        });

        it('should call onSubmit when not filled in contact method', () => {
          submitForm(purchaseSummaryForm.find('form'));

          expect(onSubmitStub).toBeCalled();
        });

        it('should not validate contact method field', () => {
          const contactMethodContentField = purchaseSummaryForm.find('FormNavItemField');

          expect(contactMethodContentField.prop('required')).toBeUndefined();
        });

        it('should provide missingContactMethod as false if contact method missing', () => {
          expect(purchaseSummaryForm.find('ContactMethodFields').prop('missingContactMethod')).toBe(false);
        });
      });

      context('declineNotifications is false', () => {
        it('should go to contact method page when click new contact method', () => {
          purchaseSummaryForm = createComponent();

          click(purchaseSummaryForm.find('FormNavItemField').find('NavItemLink'));

          expect(clickContactMethodFnStub).toBeCalled();
        });

        it('should not call onSubmit when declineNotifications is false and not filled in contact method', () => {
          purchaseSummaryForm = createComponent({ declineNotifications: false });

          submitForm(purchaseSummaryForm);

          expect(purchaseSummaryForm.find('FormNavItemField').prop('error')).toEqual({
            type: 'REQUIRED_ERROR'
          });
          expect(onSubmitStub).not.toBeCalled();
        });

        it('should provide missingContactMethod as true if contact method missing', () => {
          purchaseSummaryForm = createComponent({
            initialFormData: {
              contactMethodContent: ''
            }
          });
          const contactMethodContentField = purchaseSummaryForm.find('ContactMethodFields');

          expect(contactMethodContentField.prop('missingContactMethod')).toBe(true);
        });

        it('should provide missingContactMethod as false if contact method not missing', () => {
          purchaseSummaryForm = createComponent({
            initialFormData: {
              contactMethodContent: '123'
            }
          });
          const contactMethodContentField = purchaseSummaryForm.find('ContactMethodFields');

          expect(contactMethodContentField.prop('missingContactMethod')).toBe(false);
        });
      });

      context('declineNotifications is false for international', () => {
        it('should go to contact method page when click new contact method', () => {
          purchaseSummaryForm = createComponent({
            declineNotifications: true,
            isInternationalBooking: true
          });

          click(purchaseSummaryForm.find('FormNavItemField').find('NavItemLink'));

          expect(clickContactMethodFnStub).toBeCalled();
        });

        it('should call onSubmit when declineNotifications is true and not filled in contact method', () => {
          purchaseSummaryForm = createComponent({ declineNotifications: true, isInternationalBooking: true });

          submitForm(purchaseSummaryForm);

          expect(onSubmitStub).toBeCalled();
        });
      });
    });
  });

  describe('contact travel manager info', () => {
    describe('when companyName exists', () => {
      beforeEach(() => {
        purchaseSummaryForm = createComponent({
          companyName: 'Dunder Mifflin Paper Company',
          dutyOfCareContact: {
            contactEmail: null,
            contactMethod: 'CALL_ME',
            contactPhone: { countryCode: '1', number: '2145551234' }
          },
          initialFormData: {
            contactTravelManagerInfo: {
              contactEmail: null,
              contactMethod: 'CALL_ME',
              contactPhone: { countryCode: '1', number: '2145551234' }
            }
          }
        });
      });

      it('should not validate contact info travel method field', () => {
        const contactMethodContentField = purchaseSummaryForm
            .find('ContactInfoTravelManagerFields')
            .find('FormNavItemField');

        expect(contactMethodContentField.prop('required')).toBeUndefined();
      });

      it('should contain contact info travel method field', () => {
        const contactMethodContentField = purchaseSummaryForm.find('ContactInfoTravelManagerFields');

        expect(contactMethodContentField).toMatchSnapshot();
      });
    });

    describe('when companyName does not exists', () => {
      it('should not contain contact info travel method field', () => {
        const contactMethodContentField = createComponent().find('ContactInfoTravelManagerFields');

        expect(contactMethodContentField).toMatchSnapshot();
      });
    });
  });

  context('when selectedCardId is RAPID_REWARDS_VISA_ID', () => {
    beforeEach(() => {
      purchaseSummaryForm = createComponent({
        initialFormData: {
          paymentInfo: {
            selectedCardId: 'RAPID_REWARDS_VISA_ID'
          }
        }
      });
    });

    it('should show instant rapid rewards card pre-selected', () => {
      expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Rapid Rewards® Visa');
      expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Just added!');
    });
  });

  context('when instant rapid rewards card selected', () => {
    beforeEach(() => {
      purchaseSummaryForm = createComponent({
        initialFormData: {
          paymentInfo: {
            selectedCardId: 'RAPID_REWARDS_VISA_ID'
          }
        }
      });
    });

    it('should show phone number form', () => {
      expect(purchaseSummaryForm.find('PhoneNumberFields')).to.exist;
    });

    it('should have correct title in nav item', () => {
      expect(purchaseSummaryForm.find('SavedCreditCardRadioInput')).to.contain.text('Rapid Rewards® Visa');
    });
  });

  context('when receive new form data', () => {
    beforeEach(() => {
      purchaseSummaryForm = createComponent({
        initialFormData: {
          paymentInfo: {
            selectedCardId: '1-ENKS5K'
          }
        }
      });
    });

    it('should update the form model value', () => {
      expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Last 4 digits: 9999');
    });

    it('should not display "Just added!" text when payment method is not instant rapid rewards card', () => {
      expect(purchaseSummaryForm.find('PaymentNavItemField')).to.not.contain.text('Just added!');
    });
  });

  context('user click', () => {
    beforeEach(() => {
      purchaseSummaryForm = createComponent();
    });

    it('should trigger onTripAndPriceClick when user click the trip and price item', () => {
      click(purchaseSummaryForm.find('TripSummary').find('NavItemLink'));

      expect(onTripAndPriceClickStub).to.have.been.called;
    });

    it('should trigger onPaymentEditClick when user click the passenger name item', () => {
      click(purchaseSummaryForm.find('PassengerInfoSummary').find('NavItemLink').first());

      expect(onPassengerItemClickStub).to.have.been.calledWith(0);
    });

    it('should trigger onPaymentEditClick when user click the payment info', () => {
      click(purchaseSummaryForm.find('PaymentNavItemField').find('NavItemLink'));

      expect(onPaymentEditClickStub).to.have.been.called;
    });

    it('should trigger onSwitchEarlyBirdInPathButton when user click early bird in path button', () => {
      const onSwitchEarlyBirdInPathButtonStub = jest.fn();

      purchaseSummaryForm = createComponent({ onSwitchEarlyBirdInPathButton: onSwitchEarlyBirdInPathButtonStub });

      click(purchaseSummaryForm.find('.early-bird-check-in--radio-button'));
      expect(onSwitchEarlyBirdInPathButtonStub).to.have.been.calledWith(true);

      click(purchaseSummaryForm.find('.early-bird-check-in--radio-button'));
      expect(onSwitchEarlyBirdInPathButtonStub).to.have.been.calledWith(false);
    });

    it('should pass showEarlyBirdInFareBreakdown to  PriceTotal', () => {
      purchaseSummaryForm = createComponent();

      click(purchaseSummaryForm.find('.early-bird-check-in--radio-button'));
      expect(purchaseSummaryForm.find('PriceTotal')).to.have.props({ showEarlyBirdInFareBreakdown: true });
    });
  });

  context('CVV', () => {
    it('should show security code field when user select a VISA card', () => {
      const savedCreditCards = new PaymentSavedCreditCardsBuilder()
          .withRequireSecurityCode(true)
          .withPrimaryCardNotCvvVerified()
          .build();

      purchaseSummaryForm = createComponent({ savedCreditCards });

      expect(purchaseSummaryForm.find('SecurityCodeInputField')).to.exist;
      expect(purchaseSummaryForm.find('SecurityCodeInputField').props().shouldShowSecurityInputField).to.be.true;
    });

    it('should not show security code field when user selected a UATP card', () => {
      const primaryCard = new PaymentSavedCreditCardBuilder().withType('UATP').build();
      const savedCreditCards = new PaymentSavedCreditCardsBuilder().withPrimaryCard(primaryCard).build();

      purchaseSummaryForm = createComponent({ savedCreditCards });

      expect(purchaseSummaryForm.find('SecurityCodeInputField').props().shouldShowSecurityInputField).to.be.false;
    });

    it('should not show security code field when do not need cvv for saved credit card', () => {
      const savedCreditCards = new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build();

      purchaseSummaryForm = createComponent({ savedCreditCards });

      expect(purchaseSummaryForm.find('input[name="securityCode"]')).to.not.exist;
    });
  });

  context('Spend Travel Funds', () => {
    it('should render the Apply Travel Funds nav item if onApplyTravelFundsClick exists and user is not booking a mixpax PNR', () => {
      purchaseSummaryForm = createComponent({
        travelFundsApplied: false,
        onApplyTravelFundsClick: () => {}
      });
      expect(purchaseSummaryForm.find('.apply-travel-funds-nav-item')).to.exist;
    });
    it('should not render the Apply Travel Funds nav item if onApplyTravelFundsClick does not exist', () => {
      purchaseSummaryForm = createComponent({
        travelFundsApplied: false,
        onApplyTravelFundsClick: null
      });
      expect(purchaseSummaryForm.find('.apply-travel-funds-nav-item')).to.not.exist;
    });
    it('should render the travel funds ledger items if balance remaining and total applied travel funds props exist', () => {
      purchaseSummaryForm = createComponent({
        totalAppliedTravelFunds: new PriceTotalBuilder().build().totals.moneyTotal,
        travelFundsBalanceRemaining: new PriceTotalBuilder().build().totals.moneyTotal,
        priceTotal: new PriceTotalBuilder().build(),
        onApplyTravelFundsClick: () => {}
      });
      expect(purchaseSummaryForm.find('PriceLedgerLine')).to.exist;
    });
    it('should not render the travel funds ledger items if balance remaining and total applied travel funds props do not exist', () => {
      purchaseSummaryForm = createComponent({
        totalAppliedTravelFunds: null,
        travelFundsBalanceRemaining: null,
        priceTotal: new PriceTotalBuilder().build(),
        onApplyTravelFundsClick: () => {}
      });
      expect(purchaseSummaryForm.find('PriceLedgerLine')).to.not.exist;
    });
  });

  context('split pay', () => {
    it('should not render ApplyRapidRewardsNavItemField if onApplyRapidRewardsClick does not exist', () => {
      const wrapper = createComponent({
        onApplyRapidRewardsClick: null,
        rapidRewardsApplied: false,
        shouldShowApplyRapidRewards: false
      });

      expect(wrapper).toMatchSnapshot();
    });
    it('should not show ApplyRapidRewardsNavItemField when shouldShowApplyRapidRewards is false even if onApplyRapidRewardsClick exists', () => {
      const wrapper = createComponent({
        onApplyRapidRewardsClick: () => {},
        rapidRewardsApplied: false,
        shouldShowApplyRapidRewards: false
      });

      expect(wrapper).toMatchSnapshot();
    });
    it('should not show ApplyRapidRewardsNavItemField when shouldShowApplyRapidRewards is false and when isCurrencyInPoints flag is true, even if onApplyRapidRewardsClick exists', () => {
      const wrapper = createComponent({
        isCurrencyInPoints: true,
        onApplyRapidRewardsClick: () => {},
        rapidRewardsApplied: false,
        shouldShowApplyRapidRewards: false
      });

      expect(wrapper).toMatchSnapshot();
    });
    it('should show ApplyRapidRewardsNavItemField when shouldShowApplyRapidRewards is true and when isCurrencyInPoints flag is false and onApplyRapidRewardsClick exists', () => {
      const wrapper = createComponent({
        isCurrencyInPoints: false,
        onApplyRapidRewardsClick: () => {},
        rapidRewardsApplied: false,
        shouldShowApplyRapidRewards: true
      });

      expect(wrapper).toMatchSnapshot();
    });
    it('should show ApplyRapidRewardsNavItemField when shouldShowApplyRapidRewards is true and onApplyRapidRewardsClick exists', () => {
      const wrapper = createComponent({
        onApplyRapidRewardsClick: () => {},
        rapidRewardsApplied: false,
        shouldShowApplyRapidRewards: true
      });

      expect(wrapper).toMatchSnapshot();
    });
    it('should show cash+points applied text when selectedSplitPay exists and rapidRewardsApplied flag is true', () => {
      const wrapper = createComponent({
        onApplyRapidRewardsClick: () => {},
        rapidRewardsApplied: true,
        selectedSplitPay: 420,
        shouldShowApplyRapidRewards: true
      });

      expect(wrapper).toMatchSnapshot();
    });

    it('should not show cash+points applied text when rapidRewardsApplied flag is false', () => {
      const wrapper = createComponent({
        onApplyRapidRewardsClick: () => {},
        rapidRewardsApplied: false,
        shouldShowApplyRapidRewards: true
      });

      expect(wrapper).toMatchSnapshot();
    });
  });

  context('when ENABLE_BOOKING_PLACEMENT is true', () => {
    it('should render DynamicPlacement when promoBottom01 contains data', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: true, promoBannerConfig: {}, promoBottom01: { content: 'promoBottom01' } });

      expect(container.find('[data-qa="promoBottom01"]')).to.be.present();
    });

    it('should not render DynamicPlacement when promoBottom01 is empty', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: true, promoBannerConfig: {}, promoBottom01: undefined });

      expect(container.find('[data-qa="promoBottom01"]')).to.not.be.present();
    });

    it('should render DynamicPlacement when promoTop01 contains data', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: true, promoBannerConfig: {}, promoTop01: { content: 'promoTop01' } });

      expect(container.find('[data-qa="promoTop01"]')).to.be.present();
    });

    it('should not render DynamicPlacement when promoTop01 is undefined', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: true, promoBannerConfig: {}, promoTop01: undefined });

      expect(container.find('[data-qa="promoTop01"]')).to.not.be.present();
    });
  });

  context('when ENABLE_BOOKING_PLACEMENT is false', () => {
    it('should not render DynamicPlacement when promoBottom01 contains data', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: false, promoBannerConfig: {}, promoBottom01: { content: 'promoBottom01' } });

      expect(container.find('[data-qa="promoBottom01"]')).to.not.be.present();
    });

    it('should not render DynamicPlacement when promoBottom01 is empty', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: false, promoBannerConfig: {}, promoBottom01: undefined });

      expect(container.find('[data-qa="promoBottom01"]')).to.not.be.present();
    });

    it('should not render DynamicPlacement when promoTop01 contains data', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: false, promoBannerConfig: {}, promoTop01: { content: 'promoTop01' } });

      expect(container.find('[data-qa="promoTop01"]')).to.not.be.present();
    });

    it('should not render DynamicPlacement when promoTop01 is undefined', () => {
      const container = createComponent({ ENABLE_BOOKING_PLACEMENT: false, promoBannerConfig: {}, promoTop01: undefined });

      expect(container.find('[data-qa="promoTop01"]')).to.not.be.present();
    });
  });

  context('chase acq banner ad', () => {
    const bottomPromo1 = {
      contentBlockId: '',
      displayType: MOBILE_HERO,
      imageForegroundAltText: 'backgroundImageAltText',
      isChaseCombo: false,
      isChasePlacement: false,
      isChasePrequal: false,
      linkType: 'app',
      promoImageBackground: 'backgroundImage',
      promoImageForeground: '',
      shouldObserveViewPort: false,
      target: 'target',
      viewPortThreshold: 0.1
    };

    it('should not show shouldShowChasePlacement is false', () => {
      const wrapper = createComponent({
        bottomPromo1,
        isPurchasePageChaseAdAboveTotal: true,
        shouldShowChasePlacement: false
      });

      expect(wrapper.find('DynamicPlacement')).to.not.be.present();
      expect(handleFirmOfferOfCreditFnStub).to.not.have.been.called;
    });

    it('should call handleFirmOfferOfCreditFn when the observerCallback is invoked', () => {
      const shouldShallow = true;
      const purchaseSummaryForm = createComponent(
          { bottomPromo1, isPurchasePageChaseAdAboveTotal: true, shouldShowChasePlacement: true },
          shouldShallow
      );

      const observerCallback = purchaseSummaryForm.find(`[data-qa="purchase-page-placement"]`).prop('observerCallback');

      observerCallback();

      expect(handleFirmOfferOfCreditFnStub).to.have.been.called;
    });
  });

  context('default values', () => {
    it('should have default values', () => {
      purchaseSummaryForm = createComponent();

      expect(purchaseSummaryForm.find('PurchaseSummaryForm')).to.have.prop('formData').include({
        isEarlyBirdInPathRadioButtonChecked: false,
        securityCode: '',
        purposeOfTravel: ''
      });
    });

    it('should have selectedCardId as default value when user has primary card selected', () => {
      purchaseSummaryForm = createComponent();

      expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Last 4 digits: 4444');
    });

    it('should not have selectedCardId as default value when user does not have primary card selected', () => {
      purchaseSummaryForm = createComponent({
        savedCreditCards: {
          primaryCard: null
        }
      });
      expect(purchaseSummaryForm.find('PaymentNavItemField')).to.have.text('Select payment method');
    });

    context('when corporate', () => {
      it('should have ghost card id if it has value', () => {
        purchaseSummaryForm = createComponent({
          savedCreditCards: {
            primaryCard: {
              savedCreditCardId: 'primary card ID'
            },
            ghostCards: [
              {
                isExpired: false,
                name: 'First Ghost Card',
                savedCreditCardId: 'First Ghost Card',
                type: 'OTHERS'
              }
            ]
          }
        });
        expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('First Ghost Card');
      });

      it('should return primary card id if ghost cards are empty', () => {
        purchaseSummaryForm = createComponent({
          savedCreditCards: {
            primaryCard: {
              savedCreditCardId: 'primary card ID'
            },
            ghostCards: []
          }
        });
        expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Last 4 digits');
      });

      it('should return primary card id if ghost cards are null', () => {
        purchaseSummaryForm = createComponent({
          savedCreditCards: {
            primaryCard: {
              savedCreditCardId: 'primary card ID'
            },
            ghostCards: null
          }
        });
        expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Last 4 digits');
      });

      it('should return primary card if multiple ghost cards are available', () => {
        purchaseSummaryForm = createComponent({
          savedCreditCards: {
            primaryCard: {
              savedCreditCardId: 'primary card ID'
            },
            ghostCards: [
              {
                savedCreditCardId: 'First Ghost Card',
                type: 'OTHERS',
                name: 'First Ghost Card',
                isExpired: false
              },
              {
                savedCreditCardId: 'Second Ghost Card',
                type: 'OTHERS',
                name: 'Second Ghost Card',
                isExpired: false
              }
            ]
          }
        });
        expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Last 4 digits: 4444');
      });

      it('should review message exists', () => {
        purchaseSummaryForm = createComponent({
          reviewMessages: [
            {
              body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on it's way to your next destination.",
              header: '',
              icon: 'WARNING',
              key: 'BOOKING_PURCHASE_OVERNIGHT',
              textColor: 'DEFAULT'
            }
          ]
        });

        expect(purchaseSummaryForm.find('.review-message')).to.exist;
      });

      it('should not render review message header', () => {
        purchaseSummaryForm = createComponent({
          reviewMessages: [
            {
              body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on it's way to your next destination.",
              header: '',
              icon: 'WARNING',
              key: 'BOOKING_PURCHASE_OVERNIGHT',
              textColor: 'DEFAULT'
            }
          ]
        });

        expect(purchaseSummaryForm.find('.review-message--station-header')).to.not.exist;
      });

      it('should render review message header', () => {
        purchaseSummaryForm = createComponent({
          reviewMessages: [
            {
              body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on it's way to your next destination.",
              header: 'HEADER',
              icon: 'WARNING',
              key: 'BOOKING_PURCHASE_OVERNIGHT',
              textColor: 'DEFAULT'
            }
          ]
        });

        expect(purchaseSummaryForm.find('.review-message--station-header')).to.exist;
      });

      it('should return Select payment method if multiple ghost cards are available and ghost card is required', () => {
        purchaseSummaryForm = createComponent({
          savedCreditCards: {
            primaryCard: {
              savedCreditCardId: 'primary card ID'
            },
            ghostCards: [
              {
                savedCreditCardId: 'First Ghost Card',
                type: 'OTHERS',
                name: 'First Ghost Card',
                isExpired: false
              },
              {
                savedCreditCardId: 'Second Ghost Card',
                type: 'OTHERS',
                name: 'Second Ghost Card',
                isExpired: false
              }
            ],
            ghostCardRequired: true
          }
        });
        expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Select payment method');
      });

      context('when ghost card required', () => {
        it('should have ghost card id if it has value', () => {
          purchaseSummaryForm = createComponent({
            savedCreditCards: {
              primaryCard: {
                savedCreditCardId: 'primary card ID'
              },
              ghostCards: [
                {
                  savedCreditCardId: 'First Ghost Card',
                  type: 'OTHERS',
                  name: 'First Ghost Card',
                  isExpired: false
                }
              ],
              ghostCardRequired: true
            }
          });
          expect(purchaseSummaryForm.find('PaymentNavItemField')).to.contain.text('Payment information on file');
        });
      });

      context('parent or guardian', () => {
        it('should not show parent or guardian div if no parentOrGuardianFormDataInfo exists', () => {
          purchaseSummaryForm = createComponent({ parentOrGuardianFormDataInfo: null });

          expect(purchaseSummaryForm).toMatchSnapshot();
        });

        it('should show parent or guardian div if parentOrGuardianFormDataInfo exists', () => {
          purchaseSummaryForm = createComponent({
            parentOrGuardianFormDataInfo: [
              {
                name: 'firstName lastName'
              }
            ]
          });

          expect(purchaseSummaryForm).toMatchSnapshot();
        });
      });
    });
  });

  const createComponent = (props, state) => {
    const outbound = new BriefBoundBuilder().build();
    const inbound = new BriefBoundBuilder()
        .withDepartureAirportCode('OAK')
        .withArrivalAirportCode('LAS')
        .withDepartureDate('2017-11-28')
        .withDepartureDayOfWeek('Tuesday')
        .build();
    const defaultProps = {
      tripSummary: {
        bounds: [outbound, inbound],
        passengerCountDescription: '2 Passenger Total',
        currency: {
          amount: '234.30',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      passengers: [
        {
          name: 'Amber Awesome',
          rapidRewards: '8349157375'
        },
        {
          name: 'Michael Lacy'
        }
      ],
      formId: 'A',
      initialFormData: { paymentInfo: {} },
      priceTotal: new PriceTotalBuilder().build(),
      onTripAndPriceClick: onTripAndPriceClickStub,
      onPaymentEditClick: onPaymentEditClickStub,
      onParentOrGuardianItemClick: onParentOrGuardianItemClickStub,
      onPassengerItemClick: onPassengerItemClickStub,
      onUnmount: onUnmountStub,
      purchaseFlights: purchaseFlightsStub,
      requireSecurityCodeForSavedCreditCard: true,
      onIrnInfoClick: onIrnInfoClickStub,
      selectedIrn: '',
      clickContactMethodFn: clickContactMethodFnStub,
      handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnStub,
      onSubmit: onSubmitStub,
      showEarlyBirdInPath: true,
      isEarlyBirdOnPurchaseVisible: false,
      earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility,
      onEarlyBirdCheckInClick: noop,
      onSwitchEarlyBirdInPathButton: noop,
      savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build(),
      billingAddressFormData: null,
      companyName: '',
      onClickBillingAddress: onClickBillingAddressStub,
      EARLY_BIRD_AB_TESTING: false,
      isInternationalBooking: false,
      dutyOfCareContact: {
        contactEmail: null,
        contactMethod: null,
        contactPhone: null,
        disclaimerText: 'This is a disclaimer',
        legalVerbiage: 'Dunder Mifflin Paper Company'
      }
    };
    const defaultState = {
      app: {
        airBooking: {
          earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility
        }
      }
    };
    const mergedProps = _.merge({}, defaultProps, props);
    const store = createMockStoreWithRouterMiddleware()(_.merge({}, defaultState, state));

    return mount(
        <Provider store={store}>
          <PurchaseSummaryForm {...mergedProps} />
        </Provider>
    );
  };
});
