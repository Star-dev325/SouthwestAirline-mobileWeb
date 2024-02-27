import EnrollReducers from 'src/enroll/reducers/index';

describe('EnrollReducer', () => {
  it('should set securityQuestions when action type is ENROLL__FETCH_SECURITY_QUESTIONS_SUCCESS', () => {
    const state = EnrollReducers(false, {
      type: 'ENROLL__FETCH_SECURITY_QUESTIONS_SUCCESS',
      response: ['What is your favorite color?']
    });

    expect(state.securityQuestions).to.deep.equal(['What is your favorite color?']);
  });

  it('should return default state when action is undefined', () => {
    expect(EnrollReducers().securityQuestions).to.deep.equal(null);
  });
});
