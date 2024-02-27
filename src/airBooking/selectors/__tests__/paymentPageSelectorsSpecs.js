import _ from 'lodash';
import * as CurrencyValueHelper from 'src/shared/helpers/currencyValueHelper';
import { sandbox } from 'sinon';
import { shouldShowChaseInstantCreditCard } from 'src/airBooking/selectors/paymentPageSelectors';

const sinon = sandbox.create();

describe('PaymentPageSelectors', () => {
  let toNumberFromFormattedStringStub;

  const createState = (applicationInfo, amount) => {
    const state = {};

    _.set(state, 'app.chase.applicationInfo', applicationInfo);
    _.set(state, 'app.airBooking.flightPricingPage.response.flightPricingPage.totals.moneyTotal.amount', amount);

    return state;
  };

  beforeEach(() => {
    toNumberFromFormattedStringStub = sinon.stub(CurrencyValueHelper, 'toNumberFromFormattedString');
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when there is no application or amount info', () => {
    it('should return false', () => {
      const state = createState();

      expect(shouldShowChaseInstantCreditCard(state)).to.be.false;
    });
  });

  context('when not approved', () => {
    it('should return false', () => {
      const state = createState({
        isApproved: false
      });

      expect(shouldShowChaseInstantCreditCard(state)).to.be.false;
    });
  });

  context('when approved', () => {
    context('when non-valid chase session id', () => {
      it('should return false', () => {
        const state = createState({
          isApproved: true,
          isValidChaseSessionId: false
        });

        expect(shouldShowChaseInstantCreditCard(state)).to.be.false;
      });
    });

    context('when valid chase session id', () => {
      context('when the credit is higher than amount', () => {
        it('should return true', () => {
          const mockAmount = 250;
          const mockCredit = 500;
          const state = createState(
            {
              isApproved: true,
              isValidChaseSessionId: true,
              credit: mockCredit
            },
            mockAmount
          );

          toNumberFromFormattedStringStub.onFirstCall().returns(mockAmount);
          toNumberFromFormattedStringStub.onSecondCall().returns(mockCredit);

          expect(shouldShowChaseInstantCreditCard(state)).to.be.true;
        });
      });

      context('when the amount is higher than the credit', () => {
        it('should return false', () => {
          const mockAmount = 500;
          const mockCredit = 250;
          const state = createState(
            {
              isApproved: true,
              isValidChaseSessionId: true,
              credit: mockCredit
            },
            mockAmount
          );

          toNumberFromFormattedStringStub.onFirstCall().returns(mockAmount);
          toNumberFromFormattedStringStub.onSecondCall().returns(mockCredit);

          expect(shouldShowChaseInstantCreditCard(state)).to.be.false;
        });
      });

      context('when the amount and credit are the same', () => {
        it('should return true', () => {
          const mockAmount = 250;
          const mockCredit = 250;
          const state = createState(
            {
              isApproved: true,
              isValidChaseSessionId: true,
              credit: mockCredit
            },
            mockAmount
          );

          toNumberFromFormattedStringStub.onFirstCall().returns(mockAmount);
          toNumberFromFormattedStringStub.onSecondCall().returns(mockCredit);

          expect(shouldShowChaseInstantCreditCard(state)).to.be.true;
        });
      });

      context('when the credit is null', () => {
        it('should return false', () => {
          const mockAmount = 250;
          const mockCredit = null;
          const state = createState(
            {
              isApproved: true,
              isValidChaseSessionId: true,
              credit: mockCredit
            },
            mockAmount
          );

          toNumberFromFormattedStringStub.onFirstCall().returns(mockAmount);
          toNumberFromFormattedStringStub.onSecondCall().returns(mockCredit);

          expect(shouldShowChaseInstantCreditCard(state)).to.be.false;
        });
      });

      context('when the amount is null', () => {
        it('should return true', () => {
          const mockAmount = null;
          const mockCredit = 250;
          const state = createState(
            {
              isApproved: true,
              isValidChaseSessionId: true,
              credit: mockCredit
            },
            mockAmount
          );

          toNumberFromFormattedStringStub.onFirstCall().returns(mockAmount);
          toNumberFromFormattedStringStub.onSecondCall().returns(mockCredit);

          expect(shouldShowChaseInstantCreditCard(state)).to.be.true;
        });
      });

      context('when the amount and credit are both null', () => {
        it('should return false', () => {
          const mockAmount = null;
          const mockCredit = null;
          const state = createState(
            {
              isApproved: true,
              isValidChaseSessionId: true,
              credit: mockCredit
            },
            mockAmount
          );

          toNumberFromFormattedStringStub.onFirstCall().returns(mockAmount);
          toNumberFromFormattedStringStub.onSecondCall().returns(mockCredit);

          expect(shouldShowChaseInstantCreditCard(state)).to.be.false;
        });
      });

      context('when the amount and credit are both 0', () => {
        it('should return false', () => {
          const mockAmount = 0;
          const mockCredit = 0;
          const state = createState(
            {
              isApproved: true,
              isValidChaseSessionId: true,
              credit: mockCredit
            },
            mockAmount
          );

          toNumberFromFormattedStringStub.onFirstCall().returns(mockAmount);
          toNumberFromFormattedStringStub.onSecondCall().returns(mockCredit);

          expect(shouldShowChaseInstantCreditCard(state)).to.be.false;
        });
      });
    });
  });
});
