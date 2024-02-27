import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';

export default class PaymentSavedCreditCardsBuilder {
  constructor() {
    this.primaryCard = new PaymentSavedCreditCardBuilder().withLastFourDigits('4444').build();
    this.otherCards = [
      new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-ENKS5K').withType('DISCOVER').build()
    ];
    this.requireSecurityCode = true;
    this.savedCreditCards = {
      otherCards: new PaymentSavedCreditCardBuilder()
        .withSavedCreditCardId('1-10EV5M5')
        .withLastFourDigits('5455')

        .build(),
      primaryCard: new PaymentSavedCreditCardBuilder()
        .withSavedCreditCardId('1-10EV5M4')
        .withLastFourDigits('5454')

        .build(),
      requireSecurityCode: true
    };
  }

  withPrimaryCard(paymentOption) {
    this.primaryCard = paymentOption;

    return this;
  }

  withNoPrimaryCard() {
    this.primaryCard = {};

    return this;
  }

  withPrimaryCardNotCvvVerified() {
    this.primaryCard = new PaymentSavedCreditCardBuilder().withLastFourDigits('4444').withCvvVerified(false).build();

    return this;
  }

  withOtherCards(paymentOptions) {
    this.otherCards = paymentOptions;

    return this;
  }

  withRequireSecurityCode(requireSecurityCode) {
    this.requireSecurityCode = requireSecurityCode;

    return this;
  }

  build() {
    return {
      primaryCard: this.primaryCard,
      otherCards: this.otherCards,
      requireSecurityCode: this.requireSecurityCode
    };
  }
}
