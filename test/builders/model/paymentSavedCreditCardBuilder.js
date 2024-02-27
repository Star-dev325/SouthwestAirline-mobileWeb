// @flow
import type { PaymentSavedCreditCard } from 'src/shared/flow-typed/shared.types';

export default class PaymentSavedCreditCardBuilder {
  savedCreditCardId: string;
  isExpired: boolean;
  lastFourDigits: string;
  type: string;
  cvvVerified: boolean;
  constructor() {
    this.savedCreditCardId = '1-ENKS4K';
    this.isExpired = false;
    this.lastFourDigits = '9999';
    this.type = 'VISA';
    this.cvvVerified = true;
  }

  withSavedCreditCardId(id: string): PaymentSavedCreditCardBuilder {
    this.savedCreditCardId = id;

    return this;
  }

  withLastFourDigits(lastFourDigits: string): PaymentSavedCreditCardBuilder {
    this.lastFourDigits = lastFourDigits;

    return this;
  }

  withExpired(): PaymentSavedCreditCardBuilder {
    this.isExpired = true;

    return this;
  }

  withType(type: string): PaymentSavedCreditCardBuilder {
    this.type = type;

    return this;
  }

  withCvvVerified(verified: boolean): PaymentSavedCreditCardBuilder {
    this.cvvVerified = verified;

    return this;
  }

  build(): PaymentSavedCreditCard {
    return {
      savedCreditCardId: this.savedCreditCardId,
      type: this.type,
      name: `VISA ${this.lastFourDigits}`,
      lastFourDigits: this.lastFourDigits,
      isExpired: this.isExpired,
      cvvVerified: this.cvvVerified,
      _links: {
        view: {
          href: `/v1/mobile-misc/page/air-booking/payment-options/${this.savedCreditCardId}`,
          method: 'GET'
        }
      }
    };
  }
}
