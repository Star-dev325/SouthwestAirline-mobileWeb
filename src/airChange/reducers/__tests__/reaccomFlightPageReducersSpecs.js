import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import reaccomFlightPageReducers from 'src/airChange/reducers/reaccomFlightPageReducers';

const { AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS, AIR_CHANGE__SAVE_REACCOM_PNR } = airChangeActionTypes;

describe('reaccomFlightPageReducers', () => {
  const initialState = {
    response: {},
    pnr: null
  };

  it('should return default state for when action is INIT', () => {
    const newState = reaccomFlightPageReducers(undefined, { type: 'INIT', response: 'response' });

    expect(newState).to.deep.equal(initialState);
  });

  context('response', () => {
    it('should populate reaccom flight page response when action is AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS', () => {
      const newState = reaccomFlightPageReducers(undefined, {
        type: AIR_CHANGE__FETCH_REACCOM_FLIGHT_PAGE_SUCCESS,
        response: {
          reaccomFlightPage: 'response'
        }
      });

      expect(newState).to.deep.equal({ response: 'response', pnr: null });
    });

    it('should return default state when action is undefined', () => {
      expect(reaccomFlightPageReducers().response).to.deep.equal({});
    });
  });

  context('pnr', () => {
    it('should populate reaccom flight page pnr when action is AIR_CHANGE__SAVE_REACCOM_PNR', () => {
      const pnr = {
        confirmationNumber: 'Q8WOX2',
        firstName: 'Ty',
        lastName: 'Ku'
      };
      const newState = reaccomFlightPageReducers(undefined, {
        type: AIR_CHANGE__SAVE_REACCOM_PNR,
        pnr
      });

      expect(newState).to.deep.equal({ response: {}, pnr });
    });

    it('should return default state when action is undefined', () => {
      expect(reaccomFlightPageReducers().pnr).to.deep.equal(null);
    });
  });
});
