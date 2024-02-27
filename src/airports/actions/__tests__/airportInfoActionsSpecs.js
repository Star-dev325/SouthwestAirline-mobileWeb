import { sandbox } from 'sinon';

import createMockStore from 'test/unit/helpers/createMockStore';
import { updateSelectedAirportInfo, resetSelectedAirportInfo } from 'src/airports/actions/airportInfoActions';
import AirportInfoActionTypes from 'src/airports/actions/airportInfoActionTypes';

describe('Airport info, is the selected airport in the airports list from using the geolocation featurel.', () => {
  const sinon = sandbox.create();
  const mockStore = createMockStore();

  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('airportInfoActions', () => {
    it('should set selected airport', () => {
      store.dispatch(updateSelectedAirportInfo('DAL'));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportInfoActionTypes.AIRPORT_INFO__UPDATE_SELECTED_AIRPORT_INFO,
          airportInfo: 'DAL'
        }
      ]);
    });

    it('should reset selected airport', () => {
      store.dispatch(resetSelectedAirportInfo());

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportInfoActionTypes.AIRPORT_INFO__RESET_SELECTED_AIRPORT_INFO
        }
      ]);
    });
  });
});
