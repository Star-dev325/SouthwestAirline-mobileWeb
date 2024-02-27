import { sandbox } from 'sinon';
import upgradeFarePagePlacement from 'src/airUpgrade/reducers/upgradeFarePagePlacement';
import upgradedFareActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';
import * as WcmTransformer from 'src/wcm/transformers/wcmTransformer';

const { AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_SUCCESS } = upgradedFareActionTypes;

const sinon = sandbox.create();

describe('upgradeFarePagePlacement', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('initial state', () => {
    it('should create default store structure when @@INIT action is triggered', () => {
      const expectedResult = {};
      const action = {
        type: '@@INIT'
      };

      expect(upgradeFarePagePlacement(undefined, action)).to.eql(expectedResult);
    });
  });

  context('default state', () => {
    it('should return an empty object by default', () => {
      const action = { type: 'UKNOWN_ACTION' };
      const expectedResult = {};
      const result = upgradeFarePagePlacement(undefined, action);

      expect(result).to.eql(expectedResult);
    });
  });

  context('purchasePagePlacements', () => {
    it('should save purchase page placements content', () => {
      const toDynamicPlacementStub = sinon.stub(WcmTransformer, 'toDynamicPlacement');
      const mockResponse = {
        promoTop01: { key: 'dynamicPlacement1' }
      };
      const action = {
        type: AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_SUCCESS,
        response: mockResponse
      };

      toDynamicPlacementStub.returns({ key: mockResponse.promoTop01.key });

      const result = upgradeFarePagePlacement(undefined, action);

      expect(toDynamicPlacementStub).to.have.been.calledWith(mockResponse);
      expect(result.promoTop01).to.deep.equal(mockResponse.promoTop01);

      sinon.restore();
    });
  });
});
