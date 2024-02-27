import _ from 'lodash';

export const mockStore = ({ action, pathname, search, dispatch, state }) => ({
  getState: () => ({ persistentHistory: [{ action, pathname, search, state }], ...state }),
  dispatch: dispatch || _.noop
});

export const mockFlowConfig = ({ entry, exit, flowUrlRange = [], flowCleaner, flowStatusGetter }) => ({
  entry: entry || '/entry',
  exit: exit || '/exit',
  flowStatusGetter: flowStatusGetter || _.noop,
  flowCleaner,
  flowUrlRange
});
