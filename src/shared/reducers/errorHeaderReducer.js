import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

const initialErrorHeader = {
  hasError: false,
  errorMessage: null
};

export default function errorHeaderReducer(state = initialErrorHeader, action = {}) {
  switch (action.type) {
    case SharedActionTypes.SHARED__SHOW_ERROR_HEADER_MSG: {
      return action.errorHeader;
    }
    case SharedActionTypes.SHARED__ROUTE_CHANGED:
    case SharedActionTypes.SHARED__HIDE_ERROR_HEADER_MSG: {
      return initialErrorHeader;
    }
    default:
      return state;
  }
}
