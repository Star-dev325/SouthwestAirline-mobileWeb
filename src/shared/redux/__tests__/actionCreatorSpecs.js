import apiActionCreator, { actionCreator } from 'src/shared/redux/actionCreator';

describe('actionCreator', () => {
  let createApiActions, createTypes;

  beforeEach(() => {
    const _actionCreator = actionCreator('airChange');

    ({ createTypes, createApiActions } = _actionCreator);
  });

  context('createTypes', () => {
    it('should return types with AIR_CHANGE__ as the prefix', () => {
      const syncActions = {
        sync: ['SAVE_PNR', 'SAVE_SELECTED_BOUNDS'],
        async: ['FETCH_FLIGHT_SHOPPING']
      };

      const types = createTypes(syncActions);

      expect(types).to.deep.equal({
        AIR_CHANGE__SAVE_PNR: 'AIR_CHANGE__SAVE_PNR',
        AIR_CHANGE__SAVE_SELECTED_BOUNDS: 'AIR_CHANGE__SAVE_SELECTED_BOUNDS',
        AIR_CHANGE__FETCH_FLIGHT_SHOPPING: 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING',
        AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS: 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING_SUCCESS',
        AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED: 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING_FAILED'
      });
    });
  });

  context('createApiActions', () => {
    it('should return three action without prefix', () => {
      const FETCH_FLIGHT_SHOPPING = 'AIR_CHANGE__FETCH_FLIGHT_SHOPPING';

      const { fetchFlightShopping, fetchFlightShoppingSuccess, fetchFlightShoppingFailed } =
        createApiActions(FETCH_FLIGHT_SHOPPING);

      expect(fetchFlightShopping).to.not.be.null;
      expect(fetchFlightShoppingSuccess).to.not.be.null;
      expect(fetchFlightShoppingFailed).to.not.be.null;
    });
  });

  context('apiActionCreator', () => {
    it(`should return actions success even we don't pass prefix`, () => {
      const FETCH_FLIGHT_SHOPPING = 'FETCH_FLIGHT_SHOPPING';

      const { fetchFlightShopping, fetchFlightShoppingSuccess, fetchFlightShoppingFailed } =
        apiActionCreator(FETCH_FLIGHT_SHOPPING);

      expect(fetchFlightShopping).to.not.be.null;
      expect(fetchFlightShoppingSuccess).to.not.be.null;
      expect(fetchFlightShoppingFailed).to.not.be.null;
    });
  });
});
