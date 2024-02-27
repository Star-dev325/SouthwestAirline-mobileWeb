import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';
import { reaccomConfirmationPage as reaccomConfirmationPageReducers } from 'src/airChange/reducers/reaccomConfirmationPageReducers';

const { AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS, AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE } = airChangeActionTypes;

describe('reaccomConfirmationPageReducers', () => {
  const initialState = { response: {} };

  it('should return default state for when action is INIT', () => {
    const newState = reaccomConfirmationPageReducers(undefined, { type: 'INIT', response: 'response' });

    expect(newState).to.deep.equal(initialState);
  });

  context('response', () => {
    it('should populate response with reaccom confirmation page response', () => {
      const newState = reaccomConfirmationPageReducers(undefined, {
        type: AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE_SUCCESS,
        response: {
          reaccomConfirmation: 'response'
        }
      });

      expect(newState).to.deep.equal({ response: 'response' });
    });

    it('should reset reaccom confirmation page data', () => {
      const newState = reaccomConfirmationPageReducers(undefined, {
        type: AIR_CHANGE__RESET_REACCOM_CONFIRMATION_PAGE
      });

      expect(newState).to.deep.equal({ response: {} });
    });

    it('should return default state when action is undefined', () => {
      expect(reaccomConfirmationPageReducers().response).to.deep.equal({});
    });
  });
});
