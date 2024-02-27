import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import reaccomShoppingPageReducers from 'src/airChange/reducers/reaccomShoppingPageReducers';

const {
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE,
  AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS,
  AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS,
  AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS,
  AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY,
  AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS
} = airChangeActionTypes;

describe('reaccomFlightPageReducers', () => {
  const initialState = {
    reaccomCoTerminalProducts: {},
    response: {},
    selectedProducts: {},
    sortBy: {
      inbound: 'departureTime',
      outbound: 'departureTime'
    }
  };

  it('should return default state for when action is INIT', () => {
    const newState = reaccomShoppingPageReducers(undefined, { type: 'INIT', response: 'response' });

    expect(newState).to.deep.equal(initialState);
  });

  context('response', () => {
    it('should populate response with reaccom flight page response', () => {
      const newState = reaccomShoppingPageReducers(undefined, {
        type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_SHOPPING_SUCCESS,
        response: {
          reaccomShoppingPage: 'response'
        }
      });

      expect(newState.response).to.deep.equal('response');
    });

    it('should return default state when action is undefined', () => {
      expect(reaccomShoppingPageReducers().response).to.be.empty;
    });
  });

  context('sortBy', () => {
    it('should populate sortBy with direction and sortStrategy when AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY action is triggered', () => {
      const action = {
        type: AIR_CHANGE__REACCOM_SORT_SHOPPING_PAGE_BY,
        direction: 'outbound',
        sortStrategy: 'duration'
      };
      const newState = reaccomShoppingPageReducers(undefined, action);

      expect(newState.sortBy).to.deep.equal({
        inbound: 'departureTime',
        outbound: 'duration'
      });
    });

    it('should reset sortBy to the initialState when AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE action is triggered', () => {
      const action = {
        type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE,
        request: 'request'
      };
      const newState = reaccomShoppingPageReducers(undefined, action);

      expect(newState).to.deep.equal(initialState);
    });
  });

  context('selectedProducts', () => {
    it('should populate selectedProducts when AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS is triggered', () => {
      const selectedProducts = {
        inbound: 'inbound',
        outbound: 'outbound'
      };
      const newState = reaccomShoppingPageReducers(undefined, {
        type: AIR_CHANGE__REACCOM_SAVE_SELECTED_PRODUCTS,
        selectedProducts
      });

      expect(newState.selectedProducts).to.deep.equal(selectedProducts);
    });

    it('should reset selectedProducts to its initial state when AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS is triggered', () => {
      const newState = reaccomShoppingPageReducers(undefined, {
        type: AIR_CHANGE__REACCOM_CLEAR_SELECTED_PRODUCTS,
        selectedProducts: 'selectedProducts'
      });

      expect(newState).to.deep.equal(initialState);
    });
  });

  describe('reaccomCoTerminalProducts', () => {
    it('should populate reaccomCoTerminalProducts when AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS is triggered', () => {
      const reaccomCoTerminalProducts = {
        test: 'reaccomCoTerminalProducts test'
      };
      const newState = reaccomShoppingPageReducers(undefined, {
        type: AIR_CHANGE__SAVE_REACCOM_COTERMINAL_PRODUCTS,
        reaccomCoTerminalProducts
      });

      expect(newState.reaccomCoTerminalProducts).to.deep.equal(reaccomCoTerminalProducts);
    });

    it('should return default state when action is undefined', () => {
      expect(reaccomShoppingPageReducers().reaccomCoTerminalProducts).to.be.empty;
    });
  });
});
