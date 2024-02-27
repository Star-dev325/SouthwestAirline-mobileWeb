export default class sameDayRefundMethodBuilder {
  constructor() {
    this.sameDayRefundMethod = {
      _links: {
        sameDayConfirmation: {
          body: {
            boundReference: 'WN1170HNLITO20230717',
            changeJourneyConfirmToken:
              'eyJwYXltZW50SWQiOiJXRlZDSEQyUUdTMjRSR0VHMFFLVTRYVkdWRzdTNEMxSyIsInRyYXZlbGVycyI6W3sidHJhdmVsZXJJZGVudGlmaWVyIjoiNjEwNUYyMzcwMDAwNDg4NCIsInNwZWNpYWxTZWF0IjpudWxsLCJ0cmF2ZWxlclN0cnVjdHVyZWROYW1lIjp7ImZpcnN0TmFtZSI6IlRFU0xBIiwibGFzdE5hbWUiOiJBV0VTT01FIiwibWlkZGxlTmFtZSI6bnVsbCwic3VmZml4IjpudWxsfSwiY2hhbmdlUHJvZHVjdHMiOlt7ImN1c3RvbWVyUHJvZHVjdElkZW50aWZpZXIiOiI2MDA2MjIzODAwMDA2OTIyIiwiZmxpZ2h0SWRlbnRpZmllciI6IldOMjkwMEhOTElUTzIwMjMwNzE3IiwiZGVwYXJ0dXJlRGF0ZVRpbWUiOm51bGwsImFycml2YWxEYXRlVGltZSI6bnVsbH1dLCJleGNoYW5nZVByaWNlIjp7ImJhbGFuY2UiOm51bGwsImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjYwLjAwLCJjdXJyZW5jeSI6IlVTRCJ9LCJsb3lhbHR5QW1vdW50cyI6bnVsbH19fV19',
            productId:
              'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjI5MDBITkxJVE8yMDIzMDcxNyIsImRlcGFydHNUaW1lIjoiMTU6NDUiLCJhcnJpdmVzVGltZSI6IjE2OjQ1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIyOTAwIiwiZmFyZUZhbWlseSI6IldHQSIsImFtb3VudER1ZSI6Ii02MC4wMCIsImN1cnJlbmN5IjoiVVNEIiwiY3JlZGl0Ijp0cnVlLCJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJmbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMjkwMEhOTElUTzIwMjMwNzE3IiwiZmxpZ2h0TnVtYmVyIjoiMjkwMCIsIm1hcmtldGluZ0NhcnJpZXIiOiJXTiIsIm9wZXJhdGluZ0NhcnJpZXIiOiJXTiIsIm51bWJlck9mU3RvcHMiOjAsImRlcGFydHVyZSI6eyJhaXJwb3J0Q29kZSI6IkhOTCIsImxvY2FsRGF0ZVRpbWUiOiIyMDIzLTA3LTE3VDE1OjQ1OjAwLTEwOjAwIn0sImFycml2YWwiOnsiYWlycG9ydENvZGUiOiJJVE8iLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0wNy0xN1QxNjo0NTowMC0xMDowMCJ9fV0sImZsaWdodE9mZmVyIjp7Im9mZmVySWQiOiIxIiwib2ZmZXJUeXBlIjoiQ09ORklSTUVEIiwib2ZmZXJQcmljZSI6eyJiYWxhbmNlIjpudWxsLCJhZGRDb2xsZWN0IjpudWxsLCJyZWZ1bmQiOnsibW9uZXRhcnlBbW91bnRzIjp7ImJhc2VGYXJlIjotNTUuODEsInRvdGFsVGF4ZXMiOi00LjE5LCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjotNjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjpudWxsfX0sImZhcmVGYW1pbHkiOiJXR0EiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTA1RjIzNzAwMDA0ODg0Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6bnVsbCwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6LTU1LjgxLCJ0b3RhbFRheGVzIjotNC4xOSwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6LTYwLjAwLCJjdXJyZW5jeSI6IlVTRCJ9LCJsb3lhbHR5QW1vdW50cyI6bnVsbH0sImZhcmVEZXRhaWxzQnlTZWdtZW50IjpbeyJmbGlnaHRJZGVudGlmaWVyIjoiV04yOTAwSE5MSVRPMjAyMzA3MTciLCJib29raW5nQ2xhc3MiOiJWIiwiZmFyZUJhc2lzIjoiVllOMEsySCJ9XX1dfX0=',
            receiptEmail: null,
            sameDayToken:
              'eyJyZWNvcmRMb2NhdG9yIjoiNEJNUU01IiwicmVjaXBpZW50RW1haWwiOiJSQUpFU0guVkVMREFORElAV05DTy5DT00iLCJzYW1lRGF5Qm91bmRTZWxlY3Rpb25zIjpbeyJmbGlnaHRUeXBlIjoiRGVwYXJ0dXJlIiwib3JpZ2luYWxEYXRlIjoiMjAyMy0wNy0xNyIsImZyb21BaXJwb3J0IjoiSG9ub2x1bHUgKE9haHUpLCBISSAoSE5MKSIsImZyb21BaXJwb3J0Q29kZSI6IkhOTCIsInRvQWlycG9ydCI6IkhpbG8gKEhhd2FpaSBJc2xhbmQpLCBISSAoSVRPKSIsInRvQWlycG9ydENvZGUiOiJJVE8iLCJmbGlnaHQiOiIxMTcwIiwidGltZURlcGFydHMiOiIxODoyNSIsInRpbWVBcnJpdmVzIjoiMTk6MjUiLCJib3VuZFJlZmVyZW5jZSI6IldOMTE3MEhOTElUTzIwMjMwNzE3IiwiaXNTZWxlY3RhYmxlIjp0cnVlfV0sInNhbWVEYXlUb2tlbkZsaWdodHMiOlt7ImJvdW5kUmVmZXJlbmNlIjoiV04xMTcwSE5MSVRPMjAyMzA3MTciLCJmbGlnaHRUaW1lIjoiMjAyMy0wNy0xN1QxODoyNTowMC0xMDowMCIsInN0b3BEZXNjcmlwdGlvbiI6Ik5vbnN0b3AiLCJzdG9wQ2l0eSI6bnVsbCwibmV4dERheUFycml2YWwiOmZhbHNlLCJzYW1lRGF5VG9rZW5GbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTE3MEhOTElUTzIwMjMwNzE3IiwiZGVwYXJ0dXJlRGF0ZVRpbWUiOiIyMDIzLTA3LTE3VDE4OjI1OjAwLTEwOjAwIiwiYXJyaXZhbERhdGVUaW1lIjoiMjAyMy0wNy0xN1QxOToyNTowMC0xMDowMCJ9XX1dLCJzYW1lRGF5VG9rZW5UcmF2ZWxlcnMiOlt7InRyYXZlbGVySWRlbnRpZmllciI6IjYxMDVGMjM3MDAwMDQ4ODQiLCJwYXNzZW5nZXJUeXBlIjoiQSIsInNhbWVEYXlUb2tlblRyYXZlbGVyTmFtZSI6eyJzdHJ1Y3R1cmVkTmFtZSI6eyJmaXJzdE5hbWUiOiJURVNMQSIsImxhc3ROYW1lIjoiQVdFU09NRSJ9fSwiYWNjb3VudE51bWJlciI6IjYwMTY1NTkwMiIsInNhbWVEYXlUb2tlbkJvYXJkaW5nQm91bmRzIjpbeyJib3VuZFJlZmVyZW5jZSI6IldOMTE3MEhOTElUTzIwMjMwNzE3Iiwic2FtZURheVRva2VuQm9hcmRpbmdTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTE3MEhOTElUTzIwMjMwNzE3IiwidHJhdmVsZXJTZWdtZW50SWRlbnRpZmllciI6IjYwMDYyMjM4MDAwMDY3ODIifV0sImhhc0FCYWciOmZhbHNlfV19XSwidHJpcFR5cGUiOiJPVyJ9'
          },
          href: '/v1/mobile-air-operations/page/same-day/4BMQM5/confirmation',
          labelText: 'Confirm',
          method: 'PUT',
          xhref: '/v1/mobile-air-operations/page/same-day/4BMQM5/x-confirmation'
        }
      },
      fareSummary: {
        creditDue: {
          fare: {
            amount: '60.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          item: 'Credit',
          itemTotalLabel: 'CREDIT'
        },
        creditInfoMessage: "We never charge change fees. You'll pay only the difference in fare.",
        taxesAndFeesWithLinks: 'Includes taxes and fees'
      },
      showRefundableSelection: true,
      showRefundPage: true
    };
  }

  withShowRefundPage() {
    this.sameDayRefundMethod.showRefundableSelection = false;
    this.sameDayRefundMethod.showRefundPage = true;

    return this;
  }

  withAmountDue() {
    this.sameDayRefundMethod.fareSummary = {
      amountDue: {
        fare: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        item: 'Amount Due',
        itemTotalLabel: 'Total Due',
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      creditDue: null,
      isPaymentRequired: true,
      taxesAndFeesWithLinks: 'Includes taxes and fees'
    };
    this.sameDayRefundMethod.selectedFlight = {
      arrivesTime: '14:00',
      date: '2022-10-27',
      departsTime: '11:00',
      flightNumbers: '150',
      fromAirportCode: 'PHX',
      labelDescription: 'STANDBY FLIGHT',
      passengers: [
        {
          accountNumber: '601655902',
          name: 'Tesla Awesome'
        }
      ],
      toAirportCode: 'DEN'
    };
    this.sameDayRefundMethod.showRefundableSelection = false;
    this.sameDayRefundMethod.showRefundPage = true;

    return this;
  }

  withDollarAmountDueFareAndNoAmountDueTax() {
    this.sameDayRefundMethod.fareSummary = {
      amountDue: {
        fare: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        item: 'Amount due',
        itemTotalLabel: 'Amount due'
      },
      creditDue: null,
      creditInfoMessage:
        'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      isPaymentRequired: true,
      taxesAndFeesWithLinks: 'Includes taxes and fees'
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withAmountDueForAlternativePayment() {
    this.sameDayRefundMethod.fareSummary = {
      amountDue: {
        fare: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        item: 'Amount Due',
        itemTotalLabel: 'Total Due',
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      creditDue: null,
      isPaymentRequired: true,
      taxesAndFeesWithLinks: 'Includes taxes and fees'
    };
    this.sameDayRefundMethod.selectedFlight = {
      arrivesTime: '14:00',
      date: '2022-10-27',
      departsTime: '11:00',
      flightNumbers: '150',
      fromAirportCode: 'PHX',
      labelDescription: 'STANDBY FLIGHT',
      passengers: [
        {
          accountNumber: '601655902',
          name: 'Tesla Awesome'
        }
      ],
      toAirportCode: 'DEN'
    };
    this.sameDayRefundMethod.showRefundableSelection = false;
    this.sameDayRefundMethod.showRefundPage = true;

    return this;
  }

  withNoSelectedFlights() {
    this.sameDayRefundMethod.fareSummary = {
      amountDue: {
        fare: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        item: 'Amount Due',
        itemTotalLabel: 'Total Due',
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      creditDue: null,
      isPaymentRequired: true,
      taxesAndFeesWithLinks: 'Includes taxes and fees'
    };
    this.sameDayRefundMethod.showRefundableSelection = false;
    this.sameDayRefundMethod.showRefundPage = true;

    return this;
  }

  withNoFareSummary() {
    this.sameDayRefundMethod.fareSummary = undefined;
    this.sameDayRefundMethod.showRefundableSelection = false;

    return this;
  }

  withPointsEvenExchangeAndTaxCredit() {
    this.sameDayRefundMethod.fareSummary = {
      amountDue: {
        fare: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        item: 'Amount due',
        itemTotalLabel: 'Amount due'
      },
      creditDue: {
        item: 'Credit',
        itemTotalLabel: 'Credit',
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      creditInfoMessage:
        'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      isPaymentRequired: false,
      taxesAndFeesWithLinks: null
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsEvenExchangeAndAmountDueTax() {
    this.sameDayRefundMethod.fareSummary = {
      amountDue: {
        fare: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        item: 'Amount due',
        itemTotalLabel: 'Amount due'
      },
      creditDue: null,
      creditInfoMessage:
        'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      isPaymentRequired: true,
      taxesAndFeesWithLinks: null
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = false;

    return this;
  }

  withPointsAmountDueAndCreditDueTax() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: {
        item: 'Credit',
        tax: {
          amount: '100.75',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Credit'
      },
      amountDue: {
        item: 'Amount due',
        fare: {
          amount: '4632',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        itemTotalLabel: 'Amount due'
      },
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: false
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsCreditDueAndCreditDueTax() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: {
        item: 'Credit',
        fare: {
          amount: '6783',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Credit'
      },
      amountDue: null,
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: false
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsAmountDueAndAmountDueTax() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: null,
      amountDue: {
        item: 'Amount Due',
        fare: {
          amount: '6783',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '39.70',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Total Due'
      },
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: true
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsCreditDueAndAmountDueTax() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: {
        item: 'Credit',
        fare: {
          amount: '6723',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        itemTotalLabel: 'Credit'
      },
      amountDue: {
        item: 'Amount due',
        tax: {
          amount: '39.70',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Amount due'
      },
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: true
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsAmountDueAndCreditDueTaxNoTitle() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: {
        tax: {
          amount: '100.75',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Credit'
      },
      amountDue: {
        fare: {
          amount: '4632',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        itemTotalLabel: 'Amount due'
      },
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: false
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsEvenExchangeAndAmountDueTaxNoTitle() {
    this.sameDayRefundMethod.fareSummary = {
      amountDue: {
        fare: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Amount due'
      },
      creditDue: null,
      creditInfoMessage:
        'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      isPaymentRequired: true,
      taxesAndFeesWithLinks: null
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = false;

    return this;
  }

  withPointsCreditDueAndCreditDueTaxNoTitle() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: {
        fare: {
          amount: '6783',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '5.60',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Credit'
      },
      amountDue: null,
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: false
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsAmountDueAndAmountDueTaxNoTitle() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: null,
      amountDue: {
        fare: {
          amount: '6783',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        tax: {
          amount: '39.70',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Total Due'
      },
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: true
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withPointsCreditDueAndAmountDueTaxNoTitle() {
    this.sameDayRefundMethod.fareSummary = {
      creditDue: {
        fare: {
          amount: '6723',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        itemTotalLabel: 'Credit'
      },
      amountDue: {
        tax: {
          amount: '39.70',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        itemTotalLabel: 'Amount due'
      },
      creditInfoMessage: 'Hooray! Your Standby flight is priced lower than your original. Once you are cleared, you will be credited to the selected refund method.',
      taxesAndFeesWithLinks: 'Includes taxes and fees',
      isPaymentRequired: true
    };
    this.sameDayRefundMethod.showRefundPage = true;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withNoLinks() {
    this.sameDayRefundMethod._links = undefined;
    this.sameDayRefundMethod.showRefundableSelection = true;

    return this;
  }

  withCancelStandbyListing() {
    this.sameDayRefundMethod._links.cancelStandbyListing = {
      body: {
        sameDayToken: 'b9QEIPa_TRN31EWdqA6gYDyB9pu3ktdW89IUhvYnIxFoWCiKrOU3R-RSjDggfPr0N2p'
      },
      href: '/v1/mobile-air-operations/page/standby/3WJKXX',
      labelText: 'Cancel standby listing',
      method: 'PUT'
    };

    return this;
  }

  build() {
    return {
      sameDayRefundMethod: this.sameDayRefundMethod
    };
  }
}
