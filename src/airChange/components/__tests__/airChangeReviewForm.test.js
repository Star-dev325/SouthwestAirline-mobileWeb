import { Provider } from 'react-redux';
import React from 'react';
import waitFor from 'test/unit/helpers/waitFor';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import AirChangeReviewForm from 'src/airChange/components/airChangeReviewForm';
import { AIR_CHANGE_REVIEW_FORM } from 'src/shared/constants/formIds';
import * as AppSelector from 'src/shared/selectors/appSelector';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';
import downGradeForRoundTripSinglePax from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayDowngradeRefundable';
import upgradeForRoundTripSinglePaxWithTravelFunds from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxRoundTripUpgradeWithTravelFunds';
import upgradeForRoundTripSinglePaxUsingPoints from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxRoundTripUpgradeTaxEvenExchange';
import pointsSinglePaxOneWayDowngradeTaxUpgrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxUpgradeRefundable';
import evenExchangeForOneWaySinglePax from 'mocks/templates/air-change/price-breakdown/dollarSinglePaxOneWayEvenExchange';
import pointsSinglePaxOneWayDowngradeTaxDowngrade from 'mocks/templates/air-change/price-breakdown/pointsSinglePaxOneWayDowngradeTaxDowngradeMixRefundable';
import i18n from '@swa-ui/locale';
import SharedConstants from 'src/shared/constants/sharedConstants';
import { fireEvent, render } from '@testing-library/react';

const { APP_FLOWS } = SharedConstants;

describe('AirChangeReviewForm', () => {
  const defaultProps = {
    AIR_UPGRADE: false,
    changePricingPage: downGradeForRoundTripSinglePax.changePricingPage,
    clickContactMethodFn: () => {},
    formData: {
      contactMethodContent: {},
      paymentInfo: {},
      refundMethod: jest.fn(),
      securityCode: ''
    },
    formId: AIR_CHANGE_REVIEW_FORM,
    initialFormData: {
      contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (469) 764-5818`,
      paymentInfo: {
        cardNumber: '4012999999999999',
        selectedCardId: 'NEW_CREDIT_CARD_ID'
      }
    },
    onApplyTravelFundsClick: () => {},
    onPaymentEditClick: () => {},
    onSubmit: () => {},
    savedCreditCards: new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build(),
    travelFundsApplied: false
  };

  describe('when the change is downgrade', () => {
    it('should not show payment and TripTotals', () => {
      const { container } = createComponent({
        changePricingPage: downGradeForRoundTripSinglePax.changePricingPage
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('when the change is upgrade', () => {
    it('should show payment and TripTotals', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage
      });

      expect(container).toMatchSnapshot();
    });

    it('should show Travel Funds details', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage
      });

      expect(container).toMatchSnapshot();
    });

    it('should not render upgrade benefits if not upgrade flow', () => {
      const { container } = createComponent({ AIR_UPGRADE: true }, true);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when in upgrade flow', () => {
    beforeEach(() => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce(APP_FLOWS.AIR_UPGRADE);
    });

    it('should render upgrade benefits view', () => {
      const changePricingPageInUpgradeFlow = downGradeForRoundTripSinglePax.changePricingPage;

      changePricingPageInUpgradeFlow._meta.isUpgrade = true;

      const component = createComponent(
        {
          AIR_UPGRADE: true,
          changePricingPage: changePricingPageInUpgradeFlow
        },
        true
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('when the change is even exchange', () => {
    it('should show payment and TripTotals', () => {
      const { container } = createComponent({
        changePricingPage: evenExchangeForOneWaySinglePax.changePricingPage
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('when the change involves points', () => {
    it('should not display payment method', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxUsingPoints.changePricingPage
      });

      expect(container).toMatchSnapshot();
    });
    it('should show empty string as the default refund method for points', () => {
      const { container } = createComponent({
        changePricingPage: pointsSinglePaxOneWayDowngradeTaxDowngrade.changePricingPage
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('display', () => {
    it('should show default fields', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
    it('should display Apply Travel Fund nav item when upgrade and paymentRequired', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage
      });

      expect(container).toMatchSnapshot();
    });
    it('should display Apply Travel Fund nav item when funds are applied even if paymentRequired is false', () => {
      const { container } = createComponent({
        changePricingPage: evenExchangeForOneWaySinglePax.changePricingPage,
        travelFundsApplied: true
      });

      expect(container).toMatchSnapshot();
    });

    describe('submitted', () => {
      it('should highlight payment field when it is empty', (done) => {
        const { container } = createComponent({
          changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
          initialFormData: {
            contactMethodContent: ''
          },
          savedCreditCards: {
            otherCards: [],
            primaryCard: null
          }
        });

        const form = container.querySelector('form');

        fireEvent.submit(form);

        waitFor.untilAssertPass(() => {
          expect(container.querySelector('.error')).not.toBeNull();
        }, done);
      });
    });

    describe('missingContactMethod', () => {
      it('should show exclamation mark when contact method not entered for domestic trip', () => {
        const { container } = createComponent({
          initialFormData: {
            contactMethodContent: ''
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should not show exclamation mark when contact method entered for domestic trip or international trip', () => {
        const { container } = createComponent({
          initialFormData: {
            contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (469) 764-5818`
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should not show exclamation mark when user does NOT wish to receive notifications', () => {
        const { container } = createComponent({
          declineNotifications: true,
          initialFormData: {
            contactMethodContent: ''
          },
          savedCreditCards: {}
        });

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('CVV', () => {
    it('should show security code field when user select a VISA card', () => {
      const savedCreditCards = new PaymentSavedCreditCardsBuilder()
        .withRequireSecurityCode(true)
        .withPrimaryCardNotCvvVerified()
        .build();

      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        initialFormData: {
          paymentInfo: { selectedCardId: '1-ENKS4K' }
        },
        savedCreditCards
      });

      expect(container).toMatchSnapshot();
    });

    it('should not show security code field when user selected a UATP card', () => {
      const primaryCard = new PaymentSavedCreditCardBuilder().withType('UATP').build();
      const savedCreditCards = new PaymentSavedCreditCardsBuilder().withPrimaryCard(primaryCard).build();

      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        savedCreditCards
      });

      expect(container).toMatchSnapshot();
    });

    it('should not show security code field when do not need cvv for saved credit card', () => {
      const savedCreditCards = new PaymentSavedCreditCardsBuilder().withRequireSecurityCode(false).build();

      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        savedCreditCards
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('securityCode header message', () => {
    it('should provide isContactMethodMissing as true to PurchaseSummarySecurityCodeHeader if contactMethodContent missing', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        initialFormData: {
          contactMethodContent: null
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should provide missingContactMethod as false to PurchaseSummarySecurityCodeHeader if contactMethod is not missing', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        initialFormData: {
          contactMethodContent: `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL')}, aterris@example.com`
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should provide missingContactMethod as false when declineNotifications is true and contactMethodContent missing', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        declineNotifications: true
      });

      expect(container).toMatchSnapshot();
    });

    it('should provide missingPaymentMethod as false to PurchaseSummarySecurityCodeHeader if credit card selected', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        paymentInfo: { selectedCardId: '1-4BGFWY' }
      });

      expect(container).toMatchSnapshot();
    });

    it('should provide missingPaymentMethod as true to PurchaseSummarySecurityCodeHeader if no selected credit card', () => {
      const { container } = createComponent({
        changePricingPage: upgradeForRoundTripSinglePaxWithTravelFunds.changePricingPage,
        initialFormData: {
          paymentInfo: {}
        },
        savedCreditCards: {
          otherCards: [],
          primaryCard: null
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should provide security header message with saved credit card when points with tax upgrade', () => {
      const { container } = createComponent({
        changePricingPage: pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage,
        paymentInfo: { selectedCardId: '1-4BGFWY' }
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('Review Message', () => {
    it('should display review messages when received reviewMessages with purchase data', () => {
      const { container } = createComponent({
        changePricingPage: pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage,
        paymentInfo: { selectedCardId: '1-4BGFWY' },
        reviewMessages: [
          {
            body: "Your flight has an overnight connection. During this time, you will not have access to your checked baggage as it will be on it's way to your next destination.",
            header: 'Header',
            icon: 'WARNING',
            key: 'BOOKING_PURCHASE_OVERNIGHT',
            textColor: 'DEFAULT'
          }
        ]
      });

      expect(container).toMatchSnapshot();
    });

    it('should not display review messages when received reviewMessages as null with purchase data', () => {
      const { container } = createComponent({
        changePricingPage: pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage,
        paymentInfo: { selectedCardId: '1-4BGFWY' },
        reviewMessages: null
      });

      expect(container.querySelector('.review-message')).toBeNull();
    });
  });

  describe('Overnight', () => {
    it('should show overnight icon and label when overnight flag is true', () => {
      const { container } = createComponent({
        changePricingPage: {
          ...pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage,
          bounds: [
            { ...pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage.bounds[0], stops: [{ isOvernight: true }] }
          ]
        },
        paymentInfo: { selectedCardId: '1-4BGFWY' }
      });

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should not show overnight icon and label when overnight flag is false', () => {
      const { container } = createComponent({
        changePricingPage: {
          ...pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage,
          bounds: [
            { ...pointsSinglePaxOneWayDowngradeTaxUpgrade.changePricingPage.bounds[0], stops: [{ isOvernight: false }] }
          ]
        },
        paymentInfo: { selectedCardId: '1-4BGFWY' }
      });

      expect(container.querySelector('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const combinedProps = { ...Object.assign({}, defaultProps, props) };

    return render(
      <Provider store={createMockedFormStore()}>
        <AirChangeReviewForm {...combinedProps} />
      </Provider>
    );
  };
});
