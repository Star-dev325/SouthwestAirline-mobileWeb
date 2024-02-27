import { combineReducers } from 'redux';
import * as Reducers from 'src/airChange/reducers/selectFarePageReducers';
import ActionTypes from 'src/airChange/actions/airChangeActionTypes';

describe('selectFarePage reducers', () => {
  context('selectedFlight', () => {
    let reducers;

    beforeEach(() => {
      reducers = combineReducers({ ...Reducers });
    });

    it('should update the selected outbound flight if selected fight direction is outbound', () => {
      const expectedSelectedFlight = {
        outbound: {
          airportInfo: 'DAL-SEA'
        },
        inbound: {},
        currentDirection: 'outbound'
      };
      const state = reducers(
        {},
        {
          type: ActionTypes.AIR_CHANGE__SAVE_SELECTED_FLIGHT,
          selectedFlight: {
            flightDetails: {
              airportInfo: 'DAL-SEA'
            },
            currentDirection: 'outbound'
          }
        }
      );

      expect(state.selectedFlight).to.deep.equal(expectedSelectedFlight);
    });

    it('should update the selected inbound flight if selected fight direction is inbound', () => {
      const expectedSelectedFlight = {
        inbound: {
          airportInfo: 'DAL-SEA'
        },
        outbound: {},
        currentDirection: 'inbound'
      };
      const state = reducers(
        {},
        {
          type: ActionTypes.AIR_CHANGE__SAVE_SELECTED_FLIGHT,
          selectedFlight: {
            flightDetails: {
              airportInfo: 'DAL-SEA'
            },
            currentDirection: 'inbound'
          }
        }
      );

      expect(state.selectedFlight).to.deep.equal(expectedSelectedFlight);
    });
  });
});
