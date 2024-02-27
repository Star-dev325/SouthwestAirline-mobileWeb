import { combineReducers, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import appReducer from 'src/app/reducers/appReducers';

const middlewares = [thunk];

export default () => configureMockStore(middlewares);

const history = {
  location: {
    search: 'search'
  }
};

const initialState = {
  app: {},
  router: history
};

const reducers = {
  app: appReducer
};

const reducerFn = combineReducers({
  ...reducers,
  router: connectRouter(history)
});

export const createMockStoreWithRouterMiddleware = (memoryHistory) => (state) => applyMiddleware(...[...middlewares, routerMiddleware(memoryHistory)])(createStore)(reducerFn, { ...initialState, ...state });
