import _ from 'lodash';
import { sandbox } from 'sinon';
import airUpgradeReducer from 'src/airUpgrade/reducers/airUpgradeReducer';
import airUpgradeActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';
import { AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';

const {
  AIR_UPGRADE__FETCH_RESERVATION_SUCCESS,
  AIR_UPGRADE__CHANGE_SELECTED_BOUND,
  AIR_UPGRADE__SAVE_UPGRADE_TYPE
} = airUpgradeActionTypes;

const sinon = sandbox.create();

describe('airUpgradeReducer', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('initial state', () => {
    it('should create default store structure when @@INIT action is triggered', () => {
      const defaultState = {
        viewUpgradeReservationPage: {}
      };
      const action = {
        type: '@@INIT'
      };

      expect(airUpgradeReducer(undefined, action)).to.deep.equal(defaultState);
    });
  });

  context('airUpgradeResponse', () => {
    it('should save upgraded Fare page response when the AIR_UPGRADE__FETCH_RESERVATION_SUCCESS action is triggered', () => {
      const action = {
        type: AIR_UPGRADE__FETCH_RESERVATION_SUCCESS,
        response: new AirUpgradeViewReservationApiJsonBuilder().apiResponse
      };
      const state = airUpgradeReducer(undefined, action);

      expect(state).to.deep.eql(new AirUpgradeViewReservationApiJsonBuilder().withMktg_data().build());
    });

    it('should return default state when action is undefined', () => {
      expect(airUpgradeReducer().viewUpgradeReservationPage).to.be.empty;
    });

    it('should update the isSelected property of the elementpricingDataList with the isSelected property set to true', () => {
      const state = new AirUpgradeViewReservationApiJsonBuilder().build();
      const [pricingData] = state.viewUpgradeReservationPage.pricingDataList;
      const action = {
        type: AIR_UPGRADE__CHANGE_SELECTED_BOUND,
        boundData: {
          productId: pricingData.productId,
          isSelected: true
        }
      };

      expect(pricingData.isSelected).to.be.false;

      const updatedState = airUpgradeReducer(state, action);
      const [updatedPricingData] = updatedState.viewUpgradeReservationPage.pricingDataList;

      expect(updatedPricingData.productId).to.equal(pricingData.productId);
      expect(updatedPricingData.isSelected).to.be.true;
    });

    it('should update the isSelected property of the elementpricingDataList with the isSelected property set to false', () => {
      const state = new AirUpgradeViewReservationApiJsonBuilder().build();
      const allSelectedPricingDataList = state.viewUpgradeReservationPage.pricingDataList.map((data) => ({
        ...data,
        isSelected: true
      }));

      const allSelectedState = _.merge({}, state, {
        viewUpgradeReservationPage: {
          pricingDataList: allSelectedPricingDataList
        }
      });

      const [pricingData] = allSelectedState.viewUpgradeReservationPage.pricingDataList;
      const action = {
        type: AIR_UPGRADE__CHANGE_SELECTED_BOUND,
        boundData: {
          productId: pricingData.productId,
          isSelected: false
        }
      };

      expect(pricingData.isSelected).to.be.true;

      const updatedState = airUpgradeReducer(allSelectedState, action);
      const [updatedPricingData] = updatedState.viewUpgradeReservationPage.pricingDataList;

      expect(updatedPricingData.productId).to.equal(pricingData.productId);
      expect(updatedPricingData.isSelected).to.be.false;
    });

    it('should save upgrade type when the AIR_UPGRADE__SAVE_UPGRADE_TYPE action is triggered', () => {
      const action = {
        type: AIR_UPGRADE__SAVE_UPGRADE_TYPE,
        upgradeType: AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_PLU
      };
      const state = airUpgradeReducer(undefined, action);

      expect(state.upgradeType).to.equal(AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_PLU);
    });

    it('should not save upgrade type when the AIR_UPGRADE__SAVE_UPGRADE_TYPE action is triggered but payload upgradeType is invalid', () => {
      const action = {
        type: AIR_UPGRADE__SAVE_UPGRADE_TYPE,
        upgradeType: 'invalidInput'
      };
      const state = airUpgradeReducer(undefined, action);

      expect(state.upgradeType).to.equal(AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS);
    });
  });
});
