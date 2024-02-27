import _ from 'lodash';
import { INITIAL_AVAILABILITY, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import {
  getAmountFromTotal,
  getTotalFromAmount,
  getMoneyTotalForAirBooking,
  getMoneyTotalForAirChange,
  getValidationErrors,
  validatePaymentMethodIsAvailable,
  getQueryParamsForExternalPaymentPage,
  getAvailabilityForPaymentMethod
} from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import { getCeptorValidationResponse, getCeptorConfigWithEmptyUpliftConfig } from 'test/builders/model/ceptorBuilder';

describe('AlternativeFormsOfPaymentHelper', () => {
  context('getAmountFromTotal', () => {
    it('should return moneyTotal amount as a number in cents', () => {
      const moneyTotal = {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      };

      const result = getAmountFromTotal(moneyTotal);

      expect(result).to.equal(10000);
    });

    it('should return 0 if moneyTotal is empty', () => {
      const moneyTotal = {};
      const result = getAmountFromTotal(moneyTotal);

      expect(result).to.equal(0);
    });

    it('should return 0 if moneyTotal is undefined', () => {
      const result = getAmountFromTotal(undefined);

      expect(result).to.equal(0);
    });

    it('should return 0 if moneyTotal does not have an amount key', () => {
      const moneyTotal = {
        currencyCode: 'USD',
        currencySymbol: '$'
      };

      const result = getAmountFromTotal(moneyTotal);

      expect(result).to.equal(0);
    });

    it('should return 0 if moneyTotal amount is a bad value', () => {
      const moneyTotal = {
        amount: 'bad-value',
        currencyCode: 'USD'
      };

      const result = getAmountFromTotal(moneyTotal);

      expect(result).to.equal(0);
    });

    it('should handle floating point precision', () => {
      const moneyTotal = {
        amount: '624.70',
        currencyCode: 'USD'
      };

      const result = getAmountFromTotal(moneyTotal);

      expect(result).to.equal(62470);
    });

    it('should handle commas in amount', () => {
      const moneyTotal = {
        amount: '1,234,567.89',
        currencyCode: 'USD'
      };

      const result = getAmountFromTotal(moneyTotal);

      expect(result).to.equal(123456789);
    });
  });

  context('getTotalFromAmount', () => {
    it('should return amount as a moneyTotal', () => {
      const result = getTotalFromAmount(10000);

      expect(result).to.deep.equal({
        amount: '100.00',
        currencyCode: 'USD'
      });
    });

    it('should return amount as a moneyTotal with 0 when amount is 0', () => {
      const result = getTotalFromAmount(0);

      expect(result).to.deep.equal({
        amount: '0.00',
        currencyCode: 'USD'
      });
    });

    it('should return amount as a moneyTotal with 0 when amount is 0', () => {
      const result = getTotalFromAmount(undefined);

      expect(result).to.deep.equal({
        amount: '0.00',
        currencyCode: 'USD'
      });
    });

    it('should convert from amount to moneyTotal back to amount', () => {
      const amount = 12345;

      const moneyTotal = getTotalFromAmount(amount);
      const result = getAmountFromTotal(moneyTotal);

      expect(result).to.deep.equal(amount);
    });
  });

  context('getMoneyTotalForAirBooking', () => {
    let moneyTotal;
    let priceTotal;
    let travelFundsBalanceRemaining;

    beforeEach(() => {
      moneyTotal = {
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      };

      priceTotal = {
        totals: {
          moneyTotal
        }
      };

      travelFundsBalanceRemaining = {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      };
    });

    it('should return priceTotal.totals.moneyTotal if fundsAppliedToken is undefined', () => {
      const fundsAppliedToken = undefined;

      const result = getMoneyTotalForAirBooking(fundsAppliedToken, travelFundsBalanceRemaining, priceTotal);

      expect(result).to.eql(moneyTotal);
    });

    it('should return travelFundsBalanceRemaining if fundsAppliedToken is defined', () => {
      travelFundsBalanceRemaining.amount = '50.00';
      const fundsAppliedToken = 'fundsAppliedToken';

      const result = getMoneyTotalForAirBooking(fundsAppliedToken, travelFundsBalanceRemaining, priceTotal);

      expect(result).to.eql(travelFundsBalanceRemaining);
    });
  });

  context('getMoneyTotalForAirChange', () => {
    let purchaseWithPoints;
    let totalDueNow;
    let newAmountDue;

    beforeEach(() => {
      purchaseWithPoints = false;

      totalDueNow = {
        item: 'Total Due Now',
        fare: {
          amount: '100.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };

      newAmountDue = {
        item: 'Amount Due',
        fare: {
          amount: '200.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: {
          amount: '20.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
    });

    it('should return newAmountDue.tax if totalDueNow is null and flight is purchased with points', () => {
      purchaseWithPoints = true;
      totalDueNow = null;

      const result = getMoneyTotalForAirChange(totalDueNow, newAmountDue, purchaseWithPoints);

      expect(result).to.deep.eql({
        amount: '20.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });

    it('should return newAmountDue.fare if totalDueNow is null and flight is not purchased with points', () => {
      totalDueNow = null;

      const result = getMoneyTotalForAirChange(totalDueNow, newAmountDue, purchaseWithPoints);

      expect(result).to.deep.eql({
        amount: '200.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });

    it('should return totalDueNow.tax if totalDueNow is not null and flight is purchased with points', () => {
      purchaseWithPoints = true;

      const result = getMoneyTotalForAirChange(totalDueNow, newAmountDue, purchaseWithPoints);

      expect(result).to.deep.eql({
        amount: '10.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });

    it('should return totalDueNow.fare if totalDueNow is not null and flight is not purchased with points', () => {
      const result = getMoneyTotalForAirChange(totalDueNow, newAmountDue, purchaseWithPoints);

      expect(result).to.deep.eql({
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });
  });

  context('getValidationErrors', () => {
    let paymentParameters;

    beforeEach(() => {
      ({ paymentParameters } = getCeptorValidationResponse());
    });

    context('isStateValid', () => {
      it('should not return invalid state error if country is not US', () => {
        paymentParameters.countryCode = 'notUS';
        const result = getValidationErrors(paymentParameters);

        expect(result).to.have.length(0);
      });

      it('should return invalid state error if country is US and invalid state', () => {
        paymentParameters.administrativeArea = 'notState';
        const result = getValidationErrors(paymentParameters);

        expect(result).to.deep.eql([
          {
            error: 'Enter a valid State/Province/Region with no special characters or numbers (spaces allowed).',
            parameter: 'administrativeArea'
          }
        ]);
      });

      it('should not return invalid state error if country is US and valid state name', () => {
        paymentParameters.administrativeArea = 'TX';
        const result = getValidationErrors(paymentParameters);

        expect(result).to.have.length(0);
      });
    });

    context('personal and billing validation', () => {
      it('should not return errors if all fields are valid', () => {
        const result = getValidationErrors(paymentParameters);

        expect(result).to.have.length(0);
      });

      it('should return errors if the six required fields are not present', () => {
        paymentParameters = {
          paymentParameters: 'invalid',
          countryCode: 'us'
        };

        const result = getValidationErrors(paymentParameters);

        expect(result).to.have.length(6);
      });

      it('should return errors for invalid fields', () => {
        paymentParameters = {
          addressLines: ['Too Many Characters Too Many Characters Too Many Characters'],
          administrativeArea: 'notState',
          postalCode: 'notPostalCode',
          locality: 'notCity!',
          givenName: 'notName!',
          familyName: 'O',
          countryCode: 'US',
          country: 'united states'
        };

        const result = getValidationErrors(paymentParameters);

        expect(result).to.have.length(6);
      });

      context('remove state and zip requirement for international countries', () => {
        it('should keep state and zip requirements if country is US', () => {
          paymentParameters.administrativeArea = '';
          paymentParameters.postalCode = '';

          const result = getValidationErrors(paymentParameters);

          expect(result).to.have.length(2);
        });

        it('should remove state and zip requirements if country is international', () => {
          paymentParameters.administrativeArea = '';
          paymentParameters.postalCode = '';
          paymentParameters.countryCode = 'notUS';

          const result = getValidationErrors(paymentParameters);

          expect(result).to.have.length(0);
        });

        it('should maintain state and zip validation checks even if country is international', () => {
          paymentParameters.postalCode = '****';
          paymentParameters.countryCode = 'notUS';

          const result = getValidationErrors(paymentParameters);

          expect(result).to.have.length(1);
        });
      });
    });
  });

  context('validatePaymentMethodIsAvailable', () => {
    context('when uplift', () => {
      it('should return true when available and shouldShowUplift is true and shouldDisableUplift is false', () => {
        const availability = _.merge({}, INITIAL_AVAILABILITY, { isAvailable: true });
        const result = validatePaymentMethodIsAvailable(PAYMENT_METHODS.UPLIFT, availability, true, false);

        expect(result).to.be.true;
      });

      it('should return false when not available', () => {
        const result = validatePaymentMethodIsAvailable(PAYMENT_METHODS.UPLIFT, INITIAL_AVAILABILITY, true, false);

        expect(result).to.be.false;
      });

      it('should return false when availability undefined', () => {
        const result = validatePaymentMethodIsAvailable(PAYMENT_METHODS.UPLIFT, undefined, true, false);

        expect(result).to.be.false;
      });

      it('should return false when available and shouldShowUplift is false and shouldDisableUplift is false', () => {
        const availability = _.merge({}, INITIAL_AVAILABILITY, { isAvailable: true });
        const result = validatePaymentMethodIsAvailable(PAYMENT_METHODS.UPLIFT, availability, false, false);

        expect(result).to.be.false;
      });

      it('should return false when available and shouldShowUplift is true and shouldDisableUplift is true', () => {
        const availability = _.merge({}, INITIAL_AVAILABILITY, { isAvailable: true });
        const result = validatePaymentMethodIsAvailable(PAYMENT_METHODS.UPLIFT, availability, true, true);

        expect(result).to.be.false;
      });
    });

    context('when apple pay', () => {
      it('should return true when available and shouldShowUplift is true and shouldDisableUplift is false', () => {
        const availability = _.merge({}, INITIAL_AVAILABILITY, { isAvailable: true });
        const result = validatePaymentMethodIsAvailable(PAYMENT_METHODS.APPLE_PAY, availability, true, false);

        expect(result).to.be.true;
      });

      it('should return false when not available', () => {
        const result = validatePaymentMethodIsAvailable(PAYMENT_METHODS.APPLE_PAY, INITIAL_AVAILABILITY, true, false);

        expect(result).to.be.false;
      });
    });

    it('should return false when payment method unmatched', () => {
      const result = validatePaymentMethodIsAvailable('fake-payment-method', INITIAL_AVAILABILITY, true, false);

      expect(result).to.be.false;
    });
  });

  context('getQueryParamsForExternalPaymentPage', () => {
    const location = {
      pathname: '/'
    };
    const isWebView = false;

    context('when uplift', () => {
      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      it('should return queryParams', () => {
        const result = getQueryParamsForExternalPaymentPage(PAYMENT_METHODS.UPLIFT, ceptorConfig, location, isWebView);

        expect(result).to.deep.eq({
          persistenceIdentifier: 'uuid',
          provider: 'UPLIFT',
          paymentMethod: PAYMENT_METHODS.UPLIFT,
          redirectUrl: '/',
          webView: isWebView
        });
      });

      it('should undefined location if pathname missing', () => {
        const result = getQueryParamsForExternalPaymentPage(PAYMENT_METHODS.UPLIFT, ceptorConfig, {});

        expect(result.redirectUrl).to.be.undefined;
      });

      it('should return persistenceIdentifier when present', () => {
        const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();
        const result = getQueryParamsForExternalPaymentPage(PAYMENT_METHODS.UPLIFT, ceptorConfig, location);

        expect(result.persistenceIdentifier).to.deep.eq('uuid');
      });

      it('should return empty string persistenceIdentifier when key missing', () => {
        const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

        _.unset(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams[0].config.persistenceIdentifier');
        const result = getQueryParamsForExternalPaymentPage(PAYMENT_METHODS.UPLIFT, ceptorConfig, location);

        expect(result.persistenceIdentifier).to.deep.eq('');
      });
    });

    context('when payment method is unmatched', () => {
      it('should return empty string for persistenceIdentifier', () => {
        const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();
        const result = getQueryParamsForExternalPaymentPage('randomPaymentMethod', ceptorConfig, location);

        expect(result.persistenceIdentifier).to.deep.eq('');
      });
    });

    it('should return provider for payment method when present', () => {
      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();
      const result = getQueryParamsForExternalPaymentPage(PAYMENT_METHODS.UPLIFT, ceptorConfig, location);

      expect(result.provider).to.deep.eq('UPLIFT');
    });

    it('should return provider as undefined when paymentMethod not in paymentMethodConfigParams', () => {
      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();
      const result = getQueryParamsForExternalPaymentPage('randomPaymentMethod', ceptorConfig, location);

      expect(result.provider).to.be.undefined;
    });

    it('should return provider as undefined when paymentMethodConfigParams is missing', () => {
      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      _.unset(ceptorConfig, 'requestedAFPParams.paymentMethodConfigParams');
      const result = getQueryParamsForExternalPaymentPage(PAYMENT_METHODS.UPLIFT, ceptorConfig, location);

      expect(result.provider).to.be.undefined;
    });
  });

  context('getAvailabilityForPaymentMethod', () => {
    it('should return availability for uplift payment method', () => {
      const state = {
        app: {
          uplift: {
            upliftAvailability: INITIAL_AVAILABILITY
          }
        }
      };
      const result = getAvailabilityForPaymentMethod(state, PAYMENT_METHODS.UPLIFT);

      expect(result).to.deep.eq(INITIAL_AVAILABILITY);
    });

    it('should return empty object for uplift payment method when not in state', () => {
      const result = getAvailabilityForPaymentMethod({}, PAYMENT_METHODS.UPLIFT);

      expect(result).to.deep.eq({});
    });

    it('should return availability for apple pay payment method', () => {
      const state = {
        app: {
          applePay: {
            applePayAvailability: INITIAL_AVAILABILITY
          }
        }
      };
      const result = getAvailabilityForPaymentMethod(state, PAYMENT_METHODS.APPLE_PAY);

      expect(result).to.deep.eq(INITIAL_AVAILABILITY);
    });

    it('should return empty object for apple pay payment method when not in state', () => {
      const result = getAvailabilityForPaymentMethod({}, PAYMENT_METHODS.APPLE_PAY);

      expect(result).to.deep.eq({});
    });

    it('should return empty object for unmatched payment method', () => {
      const state = {
        app: {
          applePay: {
            applePayAvailability: INITIAL_AVAILABILITY
          }
        }
      };
      const result = getAvailabilityForPaymentMethod(state, 'random-payment-method');

      expect(result).to.deep.eq({});
    });
  });
});
