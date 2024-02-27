import { sandbox } from 'sinon';
import upgradedBoardingReducers from 'src/upgradedBoarding/reducers/upgradedBoardingReducer';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import * as WcmTransformer from 'src/wcm/transformers/wcmTransformer';

const {
  UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
  UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS,
  UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS,
  UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_SUCCESS,
  UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__RESET_PAYMENT_INFO,
  UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__SAVE_MONEY_TOTAL,
  UPGRADED_BOARDING__SAVE_PAYMENT_INFO
} = upgradedBoardingActionTypes;

const sinon = sandbox.create();

describe('upgradedBoardingReducers', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('initial state', () => {
    it('should create default store structure when @@INIT action is triggered', () => {
      const defaultState = {
        upgradedBoardingPagePlacements: {},
        purchasePagePlacements: {},
        upgradedBoardingResponse: {},
        paymentInfo: {},
        upgradedBoardingCountdownTimeStamp: null,
        upgradedBoardingPurchaseResponse: {},
        moneyTotal: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }
      };
      const action = {
        type: '@@INIT'
      };

      expect(upgradedBoardingReducers(undefined, action)).to.deep.equal(defaultState);
    });
  });

  context('Upgraded Boarding Page Placements', () => {
    it('should save upgraded boarding page placements content', () => {
      const toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement');

      toDynamicPlacementStub.onFirstCall().returns({ key: 'dynamicPlacement1' });
      toDynamicPlacementStub.onSecondCall().returns({ key: 'dynamicPlacement2' });
      toDynamicPlacementStub.onThirdCall().returns({ key: 'dynamicPlacement3' });

      const action = { type: UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_SUCCESS, response };
      const state = upgradedBoardingReducers(undefined, action);
      const response = {
        promoTop01: { key: 'dynamicPlacement1' },
        contentModule1: { key: 'dynamicPlacement2' },
        promoBottom01: { key: 'dynamicPlacement3' }
      };

      expect(toDynamicPlacementStub).to.be.called.exactly(3);
      expect(state.upgradedBoardingPagePlacements.promoTop01).to.deep.equal({ key: 'dynamicPlacement1' });
      expect(state.upgradedBoardingPagePlacements.contentModule1).to.deep.equal({ key: 'dynamicPlacement2' });
      expect(state.upgradedBoardingPagePlacements.promoBottom01).to.deep.equal({ key: 'dynamicPlacement3' });
    });

    it('should return default state when action is undefined', () => {
      expect(upgradedBoardingReducers().upgradedBoardingPagePlacements).to.deep.equal({});
    });
  });

  context('purchasePagePlacements', () => {
    it('should save purchase page placements content', () => {
      const toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement');

      toDynamicPlacementStub.returns({ key: 'dynamicPlacement1' });
      const response = {
        promoTop01: { key: 'dynamicPlacement1' }
      };

      const action = { type: UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS, response };
      const state = upgradedBoardingReducers(undefined, action);

      expect(toDynamicPlacementStub).to.have.been.calledOnce;
      expect(state.purchasePagePlacements.promoTop01).to.deep.equal({ key: 'dynamicPlacement1' });
    });

    it('should return default state when action is undefined', () => {
      expect(upgradedBoardingReducers().purchasePagePlacements).to.deep.equal({});
    });
  });

  context('UpgradedBoardingResponse', () => {
    it('should save upgraded boarding response when the UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS action is triggered', () => {
      const action = { type: UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS, response: { data: 'testResponse' } };
      const state = upgradedBoardingReducers(undefined, action);

      expect(state.upgradedBoardingResponse).to.deep.eql({ data: 'testResponse' });
    });

    it('should return default state when action is undefined', () => {
      expect(upgradedBoardingReducers().upgradedBoardingResponse).to.be.empty;
    });
  });

  context('Payment Info', () => {
    const paymentInfo = {
      savedCreditCardId: 'SAVED_CREDIT_CARD_ID'
    };

    it('should return payment info object when UPGRADED_BOARDING__SAVE_PAYMENT_INFO action', () => {
      const action = { type: UPGRADED_BOARDING__SAVE_PAYMENT_INFO, paymentInfo };
      const state = upgradedBoardingReducers(undefined, action);

      expect(state.paymentInfo).to.deep.eql(paymentInfo);
    });

    it('should return default payment info object when UPGRADED_BOARDING__RESET_PAYMENT_INFO action', () => {
      const existingState = {
        upgradedBoardingPagePlacements: {},
        purchasePagePlacements: {},
        upgradedBoardingResponse: {},
        paymentInfo: { selectedCardId: 'PAY_PAL_CARD_ID' },
        upgradedBoardingPurchaseResponse: {},
        moneyTotal: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }
      };
      const action = { type: UPGRADED_BOARDING__RESET_PAYMENT_INFO };
      const state = upgradedBoardingReducers(existingState, action);

      expect(state.paymentInfo).to.be.empty;
    });

    it('should return default state when action is undefined', () => {
      expect(upgradedBoardingReducers().paymentInfo).to.be.empty;
    });
  });

  context('UpgradedBoardingPurchaseResponse', () => {
    it('should save upgraded boarding purchase response when the UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS action is triggered', () => {
      const action = { type: UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS, response: { data: 'testResponse' } };
      const state = upgradedBoardingReducers(undefined, action);

      expect(state.upgradedBoardingPurchaseResponse).to.deep.eql({ data: 'testResponse' });
    });

    it('should return default state when action is undefined', () => {
      expect(upgradedBoardingReducers().upgradedBoardingPurchaseResponse).to.be.empty;
    });
  });

  context('moneyTotal', () => {
    it('should save money total when the UPGRADED_BOARDING__SAVE_MONEY_TOTAL action is triggered', () => {
      const moneyTotal = { amount: '10', currencyCode: 'USD', currencySymbol: '$' };
      const action = { type: UPGRADED_BOARDING__SAVE_MONEY_TOTAL, moneyTotal };
      const state = upgradedBoardingReducers(undefined, action);

      expect(state.moneyTotal).to.deep.eql(moneyTotal);
    });

    it('should return default state when action is undefined', () => {
      expect(upgradedBoardingReducers().moneyTotal).to.deep.eq({
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });
  });

  describe('upgradedBoardingCountdownTimeStamp', () => {
    it('should save countdown timestamp when the UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP action is triggered', () => {
      const action = { type: UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP, timeStamp: '2023-01-08T03:01:18.325Z' };
      const state = upgradedBoardingReducers(undefined, action);

      expect(state.upgradedBoardingCountdownTimeStamp).to.deep.equal('2023-01-08T03:01:18.325Z');
    });

    it('should reset countdown timestamp when the UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP action is triggered', () => {
      const action = { type: UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP };
      const state = upgradedBoardingReducers(undefined, action);

      expect(state.upgradedBoardingCountdownTimeStamp).to.be.null;
    });

    it('should return default state when action is undefined', () => {
      expect(upgradedBoardingReducers().upgradedBoardingCountdownTimeStamp).to.deep.equal(null);
    });
  });
});
