import _ from 'lodash';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import {
  getPassengerInfos,
  getMultipleAdultPassengers,
  getPassengerWithSuffix,
  getLapChildPassengerInfos
} from 'test/builders/model/passengerInfosBuilder';
import {
  getPaymentInfoForUseNewCreditCard,
  getPaymentInfoForUseSavedCreditCard,
  getPaymentInfoForGhostCard,
  getMismatchedPaymentInfoForGhostCard,
  getPaymentInfoForRapidRewardCard,
  getPaymentInfoForPayPalCard,
  getPaymentInfoForApplePayCard,
  getPaymentInfoForUpliftCard,
  getApplePayCard,
  getUpliftCard,
  getNativeApplePayCard
} from 'test/builders/model/paymentInfoBuilder';
import ContactMethodInfoBuilder from 'test/builders/model/contactMethodInfoBuilder';
import PurchaseSummaryFormDataBuilder from 'test/builders/model/purchaseSummaryFormDataBuilder';
import EarlyBirdInPathBoundBuilder from 'test/builders/apiResponse/earlyBirdInPathBoundBuilder';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';

class PurchaseFlightParamsBuilder {
  constructor() {
    this.request = {
      flightPricingPageResponse: new PricesBuilder().build(),
      passengerInfos: getPassengerInfos(),
      contactMethodInfo: new ContactMethodInfoBuilder().build(),
      paymentInfo: getPaymentInfoForUseNewCreditCard(),
      selectedProducts: {
        adult: {
          outbound: {
            fareProductId:
              'eyJwcm9kdWN0SWQiOiJXR0F8QURUfEhMQTBXTlJPLEgsREFMLFNUTCwyMDE3LTExLTA0VDA3OjEwLTA1OjAwLDIwMTctMTEtMDRUMDg6NDUtMDU6MDAsV04sV04sNjUxNiw3M1d8SExBMFdOUk8sSCxTVEwsTURXLDIwMTctMTEtMDRUMTE6MDAtMDU6MDAsMjAxNy0xMS0wNFQxMjowNS0wNTowMCxXTixXTiw1NjI2LDczVyIsInF1b3RlZFByaWNlIjoiMzE2Ljk4In0=',
            flightCardIndex: 0
          }
        }
      },
      formData: new PurchaseSummaryFormDataBuilder().build(),
      priceTotal: new PriceTotalBuilder().withMoneyTotal('233.98').build(),
      formId: 'PURCHASE_SUMMARY_FORM',
      fundsAppliedToken: null,
      travelFundsBalanceRemaining: null,
      applePayCard: null
    };
  }

  withEarlyBirdInPathRadioButtonChecked() {
    this.request.formData.isEarlyBirdInPathRadioButtonChecked = true;

    return this;
  }

  withMultiplePassengers() {
    this.request.passengerInfos = getMultipleAdultPassengers();

    return this;
  }

  withPassengerWithSuffix() {
    this.request.passengerInfos = getPassengerWithSuffix();

    return this;
  }

  withUsingSavedCreditCard() {
    this.request.paymentInfo = getPaymentInfoForUseSavedCreditCard();

    return this;
  }

  withUsingGhostCard() {
    this.request.paymentInfo = getPaymentInfoForGhostCard();

    return this;
  }

  withUsingMismatchedGhostCard() {
    this.request.paymentInfo = getMismatchedPaymentInfoForGhostCard();

    return this;
  }

  withUsingSavedCreditCardAndSecurityCode() {
    this.request.formData = new PurchaseSummaryFormDataBuilder().withSecurityCode().build();
    this.request.paymentInfo = getPaymentInfoForUseSavedCreditCard();

    return this;
  }

  withEarlyBird() {
    this.request.earlyBirdEligibility = new EarlyBirdInPathBoundBuilder().singleAdultOneWayEligibleEarlyBird().build();

    return this;
  }

  withIneligibleEarlyBird() {
    this.request.earlyBirdEligibility = new EarlyBirdInPathBoundBuilder().inEligibleEarlyBird().build();

    return this;
  }

  withPriceTotal(total) {
    this.request.priceTotal = new PriceTotalBuilder().withMoneyTotal(total).build();

    return this;
  }

  withChaseCreditCard() {
    this.request.chaseSessionId = 'fakeChaseSessionId';
    this.request.paymentInfo = getPaymentInfoForRapidRewardCard();

    return this;
  }

  withPayPalCard() {
    this.request.paymentInfo = getPaymentInfoForPayPalCard();
    _.set(this.request, 'payPal.token', 'EC-2KM06629GE7385637');

    return this;
  }

  withApplePayCard() {
    this.request.paymentInfo = getPaymentInfoForApplePayCard();
    this.request.applePayCard = getApplePayCard();

    return this;
  }

  withNativeApplePayCard() {
    this.request.paymentInfo = getPaymentInfoForApplePayCard();
    this.request.applePayCard = getNativeApplePayCard();

    return this;
  }

  withUpliftCard() {
    this.request.paymentInfo = getPaymentInfoForUpliftCard();
    this.request.upliftCard = getUpliftCard();

    return this;
  }

  withSpecialAssistance(paxInfoIndex = 0) {
    _.set(this.request.passengerInfos[paxInfoIndex], 'specialAssistance', { ASSISTANCE_ANIMAL: true });

    return this;
  }

  withTravelFunds() {
    _.set(this.request, 'fundsAppliedToken', 'funds-token');
    _.set(this.request, 'travelFundsBalanceRemaining', {
      amount: '50.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    });

    return this;
  }

  withZeroBalanceRemaining() {
    _.set(this.request, 'travelFundsBalanceRemaining', {
      amount: '0.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    });
    _.set(this.request, 'formData', new PurchaseSummaryFormDataBuilder().withTravelFundsAddress().build());

    return this;
  }

  withSelectedIrn() {
    this.request.selectedIrn = 'mockIrn';

    return this;
  }

  withLapChildInBooking() {
    this.request.passengerInfos = getLapChildPassengerInfos();

    return this.request;
  }

  withDutyOfCareContact() {
    this.withUsingSavedCreditCardAndSecurityCode();
    this.request.dutyOfCareContact = {
      contactMethod: "CALL_ME",
      contactPhone: {
        number: '345-566-4545',
        countryCode: '1'
      }
    };

    return this;
  }

  build() {
    return this.request;
  }
}

export default PurchaseFlightParamsBuilder;
