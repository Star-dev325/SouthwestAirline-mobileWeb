import changeSummaryPageReducers from 'src/airChange/reducers/changeSummaryPageReducers';

describe('changeSummaryPageReducers', () => {
  it('should return initial state', () => {
    const result = changeSummaryPageReducers(undefined, { type: '@@Init' });

    expect(result.response).to.deep.equal({});
  });

  context('response', () => {
    it('should return response when FETCH_FLIGHT_PRICING_SUCCESS action be triggered', () => {
      const result = changeSummaryPageReducers(undefined, {
        type: 'AIR_CHANGE__FETCH_FLIGHT_PRICING_SUCCESS',
        response: { changePricingPage: 'response' }
      });

      expect(result.response).to.deep.equal('response');
    });

    it('should return default state when action is undefined', () => {
      expect(changeSummaryPageReducers().response).to.deep.equal({});
    });
  });

  context('resumeAfterLogin', () => {
    it('should return resumeAfterLogin when AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN action is triggered', () => {
      const result = changeSummaryPageReducers(undefined, {
        type: 'AIR_CHANGE__FLIGHT_PRICING_RESUME_AFTER_LOGIN',
        shouldResume: false
      });

      expect(result.resumeAfterLogin).to.be.false;
    });

    it('should return default state when action is undefined', () => {
      expect(changeSummaryPageReducers().resumeAfterLogin).to.be.false;
    });
  });
});
