import _ from 'lodash';
import sinonModule from 'sinon';
import {
  getPriceTotalWithEB,
  shouldShowEarlyBirdInPath,
  getBalanceRemainingWithEB,
  getPriceTotalWithEBForAirbooking
} from 'src/shared/selectors/earlyBirdSelector';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';

const sinon = sinonModule.sandbox.create();

describe('priceTotalSelector', () => {
  let earlyBirdEligibility;
  const getIsEarlyBirdInPathRadioButtonCheckedStub = sinon.stub();
  const getPriceTotalWithEBStub = sinon.stub();
  const getEarlyBirdEligibilityStub = sinon.stub();
  const getAirbookingBalanceRemainingWithFundsStub = sinon.stub();
  const getAirbookingFundsAppliedStub = sinon.stub();
  const getCompanionIsEarlyBirdInPathRadioButtonChecked = sinon.stub();
  const getCompanionBalanceRemainingWithFundsStub = sinon.stub();
  const getCompanionFundsAppliedStub = sinon.stub();
  const getCompanionEarlyBirdEligibilityStub = sinon.stub();

  beforeEach(() => {
    ({ earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().build());
  });

  afterEach(() => {
    sinon.restore();
  });

  context('show earlybird in path', () => {
    it('should show early bird in path when some of the bound is eligible', () => {
      _.set(earlyBirdEligibility, 'bounds', [{ isEligible: true }, { isEligible: false }]);
      getEarlyBirdEligibilityStub.returns(earlyBirdEligibility);

      expect(shouldShowEarlyBirdInPath(getEarlyBirdEligibilityStub)()).to.be.true;
    });

    it('should not show early bird in path when none of the bound is eligible', () => {
      _.set(earlyBirdEligibility, 'bounds', [{ isEligible: false }, { isEligible: false }]);
      getEarlyBirdEligibilityStub.returns(earlyBirdEligibility);

      expect(shouldShowEarlyBirdInPath(getEarlyBirdEligibilityStub)()).to.be.false;
    });

    context('when loading earlybird from wcm placement', () => {
      it('should add up early bird fee to total price', () => {
        const state = {
          app: {
            toggles: {
              EARLY_BIRD_AB_TESTING: true
            },
            airBooking: {
              earlyBirdSelected: true
            }
          }
        };

        expect(getPriceTotalWithEBForAirbooking(state)).to.be.deep.equal({ totals: undefined });
      });
    });
  });

  context('price total', () => {
    const originalTotal = new PriceTotalBuilder()
      .withoutEarlyBirdPrice()
      .withMoneyTotal('233.98')
      .withPointsTotal()
      .build().totals;

    const fundsApplied = {
      amount: '100.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    beforeEach(() => {
      getPriceTotalWithEBStub.returns(originalTotal);
      getIsEarlyBirdInPathRadioButtonCheckedStub.returns(true);
      getEarlyBirdEligibilityStub.returns(earlyBirdEligibility);
      getAirbookingBalanceRemainingWithFundsStub.returns(originalTotal);
      getAirbookingFundsAppliedStub.returns(fundsApplied);
      getCompanionIsEarlyBirdInPathRadioButtonChecked.returns(true);
      getCompanionBalanceRemainingWithFundsStub.returns(originalTotal);
      getCompanionFundsAppliedStub.returns(fundsApplied);
    });

    it('should merge eb price and original price when select eb', () => {
      const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().withMultipleAdultRoundTrip().build();

      getEarlyBirdEligibilityStub.returns(earlyBirdEligibility);

      const priceTotal = getPriceTotalWithEB(
        getIsEarlyBirdInPathRadioButtonCheckedStub,
        getPriceTotalWithEBStub,
        getEarlyBirdEligibilityStub
      )();

      expect(priceTotal.totals.moneyTotal.amount).to.equal('313.98');
      expect(priceTotal.totals.pointsTotal.amount).to.equal('51,235');
      expect(priceTotal.totals.adultFare.earlyBirdPrice).to.deep.equal({
        purchasedCount: 1,
        total: {
          amount: '80.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        unitPrice: {
          amount: '40.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      });
    });

    it('should calculate remaining air-booking balance in travel funds when EB is selected', () => {
      const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().withMultipleAdultRoundTrip().build();

      getEarlyBirdEligibilityStub.returns(earlyBirdEligibility);

      const priceTotal = getBalanceRemainingWithEB(
        getIsEarlyBirdInPathRadioButtonCheckedStub,
        getAirbookingBalanceRemainingWithFundsStub,
        getEarlyBirdEligibilityStub,
        getAirbookingFundsAppliedStub
      )();

      expect(priceTotal.totals.moneyTotal.amount).to.equal('213.98');
      expect(priceTotal.totals.pointsTotal.amount).to.equal('51,235');
      expect(priceTotal.totals.adultFare.earlyBirdPrice).to.deep.equal({
        purchasedCount: 1,
        total: {
          amount: '80.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        unitPrice: {
          amount: '40.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      });
    });

    it('should calculate remaining companion balance in travel funds when EB is selected', () => {
      const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().withMultipleAdultRoundTrip().build();

      getCompanionEarlyBirdEligibilityStub.returns(earlyBirdEligibility);

      const priceTotal = getBalanceRemainingWithEB(
        getCompanionIsEarlyBirdInPathRadioButtonChecked,
        getCompanionBalanceRemainingWithFundsStub,
        getCompanionEarlyBirdEligibilityStub,
        getCompanionFundsAppliedStub
      )();

      expect(priceTotal.totals.moneyTotal.amount).to.equal('213.98');
      expect(priceTotal.totals.pointsTotal.amount).to.equal('51,235');
      expect(priceTotal.totals.adultFare.earlyBirdPrice).to.deep.equal({
        purchasedCount: 1,
        total: {
          amount: '80.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        unitPrice: {
          amount: '40.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      });
    });

    it('should have original fields when not merging eb price', () => {
      getIsEarlyBirdInPathRadioButtonCheckedStub.returns(false);

      const priceTotal = getPriceTotalWithEB(
        getIsEarlyBirdInPathRadioButtonCheckedStub,
        getPriceTotalWithEBStub,
        getEarlyBirdEligibilityStub
      )();

      expect(priceTotal.totals).to.be.equal(originalTotal);
    });

    describe('withLapChild', () => {
      const originalTotal = new PriceTotalBuilder()
        .withoutEarlyBirdPrice()
        .withMoneyTotal('233.98')
        .withLapChild()
        .withPointsTotal()
        .build().totals;

      const { earlyBirdEligibility } = new EarlyBirdInPathPricesBuilder().withMultipleAdultRoundTrip().build();
      const adultWithEarlyBird = {
        purchasedCount: 1,
        total: {
          amount: '80.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        unitPrice: {
          amount: '40.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };

      beforeEach(() => {
        getPriceTotalWithEBStub.returns(originalTotal);
        getIsEarlyBirdInPathRadioButtonCheckedStub.returns(true);
        getEarlyBirdEligibilityStub.returns(earlyBirdEligibility);
        getAirbookingBalanceRemainingWithFundsStub.returns(originalTotal);
        getAirbookingFundsAppliedStub.returns(fundsApplied);
      });

      it('should merge eb price and original price when select eb', () => {
        const priceTotal = getPriceTotalWithEB(
          getIsEarlyBirdInPathRadioButtonCheckedStub,
          getPriceTotalWithEBStub,
          getEarlyBirdEligibilityStub
        )();

        expect(priceTotal.totals.moneyTotal.amount).to.equal('447.96');
        expect(priceTotal.totals.adultFare.earlyBirdPrice).to.deep.equal(adultWithEarlyBird);
      });

      it('should calculate remaining air-booking balance in travel funds when EB is selected', () => {
        const priceTotal = getBalanceRemainingWithEB(
          getIsEarlyBirdInPathRadioButtonCheckedStub,
          getAirbookingBalanceRemainingWithFundsStub,
          getEarlyBirdEligibilityStub,
          getAirbookingFundsAppliedStub
        )();

        expect(priceTotal.totals.moneyTotal.amount).to.equal('347.96');
        expect(priceTotal.totals.adultFare.earlyBirdPrice).to.deep.equal(adultWithEarlyBird);
      });
    });
  });
});
