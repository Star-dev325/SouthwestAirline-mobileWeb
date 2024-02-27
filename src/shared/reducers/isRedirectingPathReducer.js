import SharedActionTypes from 'src/shared/actions/sharedActionTypes';

export const isRedirectingPath = (state = false, action = {}) => {
  switch (action.type) {
    case SharedActionTypes.SHARED__SET_IS_REDIRECTING_PATH: {
      return action.isRedirectingPath;
    }
  }

  return state;
};
