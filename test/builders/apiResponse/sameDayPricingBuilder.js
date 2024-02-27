// @flow
import type { SameDayPricingPage } from 'src/sameDay/flow-typed/sameDay.types';

class SameDayPricingResponseBuilder {
  sameDayPricingPage: SameDayPricingPage;

  constructor() {
    this.sameDayPricingPage = {
      message: {
        key: 'SAME_DAY_PRICING_STANDBY_MESSAGE',
        header: 'You must add your bags again',
        body: 'We will keep your current flight and boarding positions until you board the new standby flight. All passengers will be listed on the new standby flight.',
        icon: 'INFO',
        textColor: 'DEFAULT'
      },
      currentFlight: {
        arrivesTime: '18:30',
        date: '2022-10-27',
        departsTime: '15:30',
        flightNumbers: '439',
        fromAirportCode: 'PHX',
        isNextDayArrival: false,
        isOvernight: false,
        labelDescription: 'CURRENT FLIGHT',
        toAirportCode: 'DEN',
        passengers: [
          {
            name: 'Tesla Awesome',
            accountNumber: '601655902'
          },
          {
            name: 'Tesla Great',
            accountNumber: '601755209'
          }
        ]
      },
      selectedFlight: {
        arrivesTime: '14:00',
        date: '2022-10-27',
        departsTime: '11:00',
        fromAirportCode: 'PHX',
        flightNumbers: '150',
        isNextDayArrival: false,
        isOvernight: false,
        labelDescription: 'STANDBY FLIGHT',
        toAirportCode: 'DEN',
        passengers: [
          {
            name: 'Tesla Awesome',
            accountNumber: '601655902'
          }
        ]
      },
      recipientEmail: '',
      fareSummary: {
        amountDue: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          fare: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          item: 'Amount Due'
        },
        contactMethodInfo: {},
        creditDue: undefined,
        creditInfoMessage: null,
        isPointsBooking: false,
        isPaymentRequired: false,
        taxesAndFeesWithLinks: null
      },
      showEmailReceiptTo: true,
      _links: {
        sameDayConfirmation: {
          href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
          xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation',
          method: 'PUT',
          body: {
            sameDayToken: 'token',
            boundSelection: 'bound2',
            productId: 'productId2'
          },
          labelText: 'Confirm standby listing'
        }
      }
    };
  }

  withStandbyUsingRefundLink() {
    this.sameDayPricingPage._links = {
      sameDayConfirmationRefund: { ...this.sameDayPricingPage._links.sameDayConfirmation }
    };

    return this;
  }

  withAmountDue() {
    this.sameDayPricingPage._links.sameDayConfirmation = {
      href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
      xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation',
      method: 'PUT',
      body: {
        sameDayToken: 'token',
        boundSelection: 'bound2',
        productId: 'productId2'
      },
      labelText: 'Make these changes'
    };
    this.sameDayPricingPage.fareSummary.amountDue = {
      amount: '20.00',
      currencyCode: 'USD',
      currencySymbol: '$',
      fare: {
        amount: '20.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      item: 'Amount Due'
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees.  By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withAmountDueFare() {
    this.sameDayPricingPage._links.sameDayConfirmation = {
      href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
      xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation',
      method: 'PUT',
      body: {
        sameDayToken: 'token',
        boundSelection: 'bound2',
        productId: 'productId2'
      },
      labelText: 'Confirm standby listing'
    };
    this.sameDayPricingPage.fareSummary.amountDue = {
      item: 'Amount Due',
      amount: '20.00',
      currencyCode: 'USD',
      currencySymbol: '$',
      fare: {
        amount: '20.00',
        currencyCode: 'USD',
        currencySymbol: '$',
        item: 'Amount Due'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees.  By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withEmailRecipient() {
    this.sameDayPricingPage.recipientEmail = 'teslaawesome@gmail.com';

    return this;
  }

  withInvalidEmailRecipient() {
    this.sameDayPricingPage.recipientEmail = 'teslaawesomegmail.com';

    return this;
  }

  withNoFareSummary() {
    this.sameDayPricingPage._links.sameDayConfirmation = {
      body: {
        boundSelection: 'bound2',
        productId: 'productId2',
        sameDayToken: 'token'
      },
      href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
      labelText: 'Make these changes',
      method: 'PUT',
      xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
    };
    this.sameDayPricingPage.fareSummary = { isPaymentRequired: false, isPointsBooking: false, taxesAndFeesWithLinks: null };

    return this;
  }

  withRefundScenario() {
    this.sameDayPricingPage.fareSummary = {
      amountDue: undefined,
      contactMethodInfo: {},
      creditDue: {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$',
        fare: {
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        item: 'Credit'
      },
      creditInfoMessage: 'You can view your refund method(s) after tapping "Make these changes"',
      isPaymentRequired: false,
      isPointsBooking: false,
      taxesAndFeesWithLinks: 'You will be able to view your refund method(s) after tapping "Make these changes".'
    };
    this.sameDayPricingPage._links = {
      sameDayConfirmationRefund: {
        href: '/v1/mobile-air-operations/page/same-day/2E5J6G/confirmation-refund',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2E5J6G/x-confirmation-refund',
        body: {
          sameDayToken: 'token',
          boundReference: 'boundRef123',
          productId: 'productId3'
        },
        labelText: 'Make these changes'
      }
    };

    return this;
  }

  withPtsUpgradeScenario() {
    this.sameDayPricingPage._links.sameDayConfirmation = {
      body: {
        boundSelection: 'bound2',
        productId: 'productId2',
        sameDayToken: 'token'
      },
      href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
      method: 'PUT',
      labelText: 'Make these changes',
      xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
    };
    this.sameDayPricingPage.fareSummary.amountDue = {
      amount: '5,820',
      currencyCode: 'PTS',
      currencySymbol: null,
      fare: {
        amount: '5,820',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Amount Due',
      tax: {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = true;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees. By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withPtsEvenExchangeScenario() {
    this.sameDayPricingPage._links.sameDayConfirmation = {
      body: {
        boundSelection: 'bound2',
        productId: 'productId2',
        sameDayToken: 'token'
      },
      href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
      labelText: 'Make these changes',
      method: 'PUT',
      xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
    };
    this.sameDayPricingPage.fareSummary.amountDue = {
      fare: {
        amount: '0',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Amount Due',
      tax: {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = true;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees. By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withPtsEvenExchangeAndTaxCreditScenario() {
    this.sameDayPricingPage._links.sameDayConfirmation = {
      body: {
        boundSelection: 'bound2',
        productId: 'productId2',
        sameDayToken: 'token'
      },
      href: '/v1/mobile-air-operations/page/same-day/2Z72ZS/confirmation',
      labelText: 'Make these changes',
      method: 'PUT',
      xhref: '/v1/mobile-air-operations/page/same-day/2Z72ZS/x-confirmation'
    };
    this.sameDayPricingPage.fareSummary.amountDue = {
      fare: {
        amount: '0',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Amount Due',
      itemTotalLabel: 'Amount due'
    };
    this.sameDayPricingPage.fareSummary.creditDue = {
      item: 'Credit',
      itemTotalLabel: 'Credit',
      tax: {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = true;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees. By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withPtsDowngradeScenario() {
    this.sameDayPricingPage._links = {
      sameDayConfirmationRefund: {
        body: {
          sameDayToken: 'token',
          boundReference: 'boundRef123',
          productId: 'productId3'
        },
        href: '/v1/mobile-air-operations/page/same-day/2E5J6G/confirmation-refund',
        method: 'PUT',
        labelText: 'Make these changes',
        xhref: '/v1/mobile-air-operations/page/same-day/2E5J6G/x-confirmation-refund'
      }
    };
    this.sameDayPricingPage.fareSummary.amountDue = undefined;
    this.sameDayPricingPage.fareSummary.creditDue = {
      fare: {
        amount: '5,820',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Credit',
      tax: {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = false;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees. By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withPtsDowngradeCreditFareAndAmountDueTaxScenario() {
    this.sameDayPricingPage._links = {
      sameDayConfirmationRefund: {
        body: {
          sameDayToken: 'token',
          boundReference: 'boundRef123',
          productId: 'productId3'
        },
        href: '/v1/mobile-air-operations/page/same-day/2E5J6G/confirmation-refund',
        method: 'PUT',
        labelText: 'Make these changes',
        xhref: '/v1/mobile-air-operations/page/same-day/2E5J6G/x-confirmation-refund'
      }
    };
    this.sameDayPricingPage.fareSummary.amountDue = {
      item: 'Amount Due',
      tax: {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    this.sameDayPricingPage.fareSummary.creditDue = {
      amount: '5,820',
      currencyCode: 'PTS',
      currencySymbol: null,
      fare: {
        amount: '5,820',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Credit'
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = false;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees. By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withPtsUpgradeAmountDueFareAndCreditTaxScenario() {
    this.sameDayPricingPage._links = {
      sameDayConfirmationRefund: {
        body: {
          sameDayToken: 'token',
          boundReference: 'boundRef123',
          productId: 'productId3'
        },
        href: '/v1/mobile-air-operations/page/same-day/2E5J6G/confirmation-refund',
        method: 'PUT',
        labelText: 'Make these changes',
        xhref: '/v1/mobile-air-operations/page/same-day/2E5J6G/x-confirmation-refund'
      }
    };
    this.sameDayPricingPage.fareSummary.amountDue = {
      fare: {
        amount: '5,820',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Amount Due'
    };
    this.sameDayPricingPage.fareSummary.creditDue = {
      item: 'Credit',
      tax: {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = false;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;
    this.sameDayPricingPage.fareSummary.taxesAndFeesWithLinks =
      'Includes taxes and fees. By tapping "Make these changes", you agree to the Terms & Conditions, Privacy Policy, and Contract of Carriage below.';

    return this;
  }

  withAmountDueAndTax() {
    this.sameDayPricingPage.fareSummary.amountDue = {
      amount: '20.00',
      currencyCode: 'USD',
      currencySymbol: '$',
      fare: {
        amount: '20.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      item: 'Amount Due',
      tax: {
        amount: '5.06',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = true;
    this.sameDayPricingPage.fareSummary.isPointsBooking = false;

    return this;
  }

  withAmountDueFarePtsAndNoTax() {
    this.sameDayPricingPage.fareSummary.amountDue = {
      amount: '20,000',
      currencyCode: 'PTS',
      currencySymbol: null,
      fare: {
        amount: '20,000',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Amount Due'
    };
    this.sameDayPricingPage._links = {
      sameDayConfirmationRefund: {
        body: {
          boundReference: 'boundRef123',
          productId: 'productId3',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2E5J6G/confirmation-refund',
        labelText: 'Make these changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2E5J6G/x-confirmation-refund'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = false;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;

    return this;
  }

  withAmountDueFarePtsAndNoTaxSameDayConfirmation() {
    this.sameDayPricingPage.fareSummary.amountDue = {
      amount: '20,000',
      currencyCode: 'PTS',
      currencySymbol: null,
      fare: {
        amount: '20,000',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Amount Due'
    };
    this.sameDayPricingPage._links = {
      sameDayConfirmation: {
        body: {
          boundReference: 'boundRef123',
          productId: 'productId3',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2E5J6G/confirmation-refund',
        labelText: 'Make these changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2E5J6G/x-confirmation-refund'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = false;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;

    return this;
  }

  withCreditDueFarePtsAndNoTax() {
    this.sameDayPricingPage.fareSummary.amountDue = undefined;
    this.sameDayPricingPage.fareSummary.creditDue = {
      amount: '20,000',
      currencyCode: 'PTS',
      currencySymbol: null,
      fare: {
        amount: '20,000',
        currencyCode: 'PTS',
        currencySymbol: null
      },
      item: 'Credit'
    };
    this.sameDayPricingPage._links = {
      sameDayConfirmationRefund: {
        body: {
          boundReference: 'boundRef123',
          productId: 'productId3',
          sameDayToken: 'token'
        },
        href: '/v1/mobile-air-operations/page/same-day/2E5J6G/confirmation-refund',
        labelText: 'Make these changes',
        method: 'PUT',
        xhref: '/v1/mobile-air-operations/page/same-day/2E5J6G/x-confirmation-refund'
      }
    };
    this.sameDayPricingPage.fareSummary.isPaymentRequired = false;
    this.sameDayPricingPage.fareSummary.isPointsBooking = true;

    return this;
  }

  withMultidayIndicators() {
    this.sameDayPricingPage.currentFlight.isNextDayArrival = true;
    this.sameDayPricingPage.currentFlight.isOvernight = true;
    this.sameDayPricingPage.selectedFlight.isNextDayArrival = true;
    this.sameDayPricingPage.selectedFlight.isOvernight = false;
    
    return this;
  }

  withoutEmailField() {
    this.sameDayPricingPage.showEmailReceiptTo = false;

    return this;
  }

  build() {
    return { sameDayPricingPage: this.sameDayPricingPage };
  }
}
export default SameDayPricingResponseBuilder;
