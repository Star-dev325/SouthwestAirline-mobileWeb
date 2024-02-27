import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import ErrorHeaderReducer from 'src/shared/reducers/errorHeaderReducer';

describe('errorHeaderReducer', () => {
  it('should init status', () => {
    const state = ErrorHeaderReducer(undefined, {});

    expect(state).to.be.deep.equal({
      errorMessage: null,
      hasError: false
    });
  });

  it('should set the errorHeader msg when show action trigger', () => {
    const state = ErrorHeaderReducer(undefined, {
      type: SharedActionTypes.SHARED__SHOW_ERROR_HEADER_MSG,
      errorHeader: {
        errorMessage: 'ERROR_MSG',
        hasError: true
      }
    });

    expect(state).to.be.deep.equal({
      errorMessage: 'ERROR_MSG',
      hasError: true
    });
  });

  it('should clear the errorHeader msg when hide action trigger', () => {
    const state = ErrorHeaderReducer(
      {
        errorMessage: 'ERROR_MSG',
        hasError: true
      },
      {
        type: SharedActionTypes.SHARED__HIDE_ERROR_HEADER_MSG
      }
    );

    expect(state).to.be.deep.equals({
      errorMessage: null,
      hasError: false
    });
  });

  it('should clear the errorHeader msg when route change action trigger', () => {
    const state = ErrorHeaderReducer(
      {
        errorMessage: 'ERROR_MSG',
        hasError: true
      },
      {
        type: SharedActionTypes.SHARED__ROUTE_CHANGED
      }
    );

    expect(state).to.be.deep.equal({
      errorMessage: null,
      hasError: false
    });
  });

  it('should return default state when action is undefined', () => {
    expect(ErrorHeaderReducer()).to.deep.equal({
      errorMessage: null,
      hasError: false
    });
  });
});
