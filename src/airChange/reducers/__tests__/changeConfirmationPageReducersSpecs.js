import changeConfirmationPageReducers from 'src/airChange/reducers/changeConfirmationPageReducers';
import AirChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

const { AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS } = AirChangeActionTypes;

describe('changeSummaryPageReducers', () => {
  it('should return initial state', () => {
    const result = changeConfirmationPageReducers(undefined, { type: '@@Init' });

    expect(result.response).to.deep.equal({});
  });

  context('response', () => {
    it('should return response when FETCH_FLIGHT_PRICING_SUCCESS action be triggered', () => {
      const result = changeConfirmationPageReducers(undefined, {
        type: AIR_CHANGE__FETCH_CHANGE_FLIGHT_CONFIRMATION_SUCCESS,
        response: 'response'
      });

      expect(result.response).to.deep.equal('response');
    });

    it('should return default state when action is undefined', () => {
      expect(changeConfirmationPageReducers().response).to.deep.equal({});
    });
  });
});
