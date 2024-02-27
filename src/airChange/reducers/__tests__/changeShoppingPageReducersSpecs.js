import changeShoppingPageReducers from 'src/airChange/reducers/changeShoppingPageReducers';

describe('changeShoppingPageReducers', () => {
  it('should return initial state', () => {
    const result = changeShoppingPageReducers(undefined, { type: '@@Init' });

    expect(result.response).to.deep.equal({});
    expect(result.sortBy).to.deep.equal({
      inbound: 'departureTime',
      outbound: 'departureTime'
    });
  });

  context('response', () => {
    it('should return response when AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS action be triggered', () => {
      const result = changeShoppingPageReducers(undefined, {
        type: 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS',
        response: { changeShoppingPage: 'response' }
      });

      expect(result.response).to.deep.equal('response');
    });

    it('should return default state when action is undefined', () => {
      expect(changeShoppingPageReducers().response).to.deep.equal({});
    });
  });

  context('sortBy', () => {
    let state;

    before(() => {
      state = {
        sortBy: {
          inbound: 'inbound',
          outbound: 'outbound'
        }
      };
    });

    it('should update the sortBy when AIR_CHANGE__SORT_SHOPPING_PAGE_BY action be triggered', () => {
      const result = changeShoppingPageReducers(state, {
        type: 'AIR_CHANGE__SORT_SHOPPING_PAGE_BY',
        direction: 'inbound',
        sortStrategy: 'update'
      });

      expect(result.sortBy).to.deep.equal({
        outbound: 'outbound',
        inbound: 'update'
      });
    });

    it('should return default state when action is undefined', () => {
      expect(changeShoppingPageReducers().response).to.deep.equal({});
    });

    it('should reset the sortBy to the initial state when AIR_CHANGE__FETCH_FLIGHT_SHOPPING action be triggered', () => {
      const result = changeShoppingPageReducers(state, {
        type: 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING',
        request: 'request'
      });

      expect(result.sortBy).to.deep.equal({
        inbound: 'departureTime',
        outbound: 'departureTime'
      });
    });
  });

  context('searchRequest', () => {
    it('should return the default state when AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST action is not triggered', () => {
      const result = changeShoppingPageReducers(undefined, { type: '@@INIT' });

      expect(result.searchRequest).to.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(changeShoppingPageReducers().searchRequest).to.deep.equal({});
    });

    it('should save the search request when AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST action is triggered', () => {
      const result = changeShoppingPageReducers(
        {},
        {
          type: 'AIR_CHANGE__SAVE_SHOPPING_SEARCH_REQUEST',
          searchRequest: 'searchRequest'
        }
      );

      expect(result.searchRequest).to.deep.equal('searchRequest');
    });
  });

  context('selectedProducts', () => {
    it('should return the default state when AIR_CHANGE__SAVE_SELECTED_PRODUCTS is not triggered', () => {
      const result = changeShoppingPageReducers(undefined, { type: '@@INIT' });

      expect(result.selectedProducts).to.deep.equal({});
    });

    it('should return default state when action is undefined', () => {
      expect(changeShoppingPageReducers().selectedProducts).to.deep.equal({});
    });

    it('should return selectedProducts when AIR_CHANGE__SAVE_SELECTED_PRODUCTS is triggered', () => {
      const state = {
        selectedProducts: {
          outbound: {
            fareProductId: 'fare product id outbound',
            flightCardIndex: 0
          }
        }
      };

      const selectedProducts = {
        inbound: {
          fareProductId: 'fare product id inbound',
          flightCardIndex: 1
        }
      };

      const result = changeShoppingPageReducers(state, {
        type: 'AIR_CHANGE__SAVE_SELECTED_PRODUCTS',
        selectedProducts
      });

      expect(result.selectedProducts).to.deep.equal(selectedProducts);
    });

    it('should clear selectedProducts when AIR_CHANGE__CLEAR_SELECTED_PRODUCTS is triggered', () => {
      const state = {
        selectedProducts: {
          outbound: {
            fareProductId: 'fare product id outbound',
            flightCardIndex: 0
          }
        }
      };
      const result = changeShoppingPageReducers(state, { type: 'AIR_CHANGE__CLEAR_SELECTED_PRODUCTS' });

      expect(result.selectedProducts).to.deep.equal({});
    });
  });
});
