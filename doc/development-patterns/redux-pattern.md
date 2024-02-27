# Redux pattern

### Reducer

#### xxxPageReducers.js

Handle the data for assigned page

```javascript
import { combineReducers } from 'redux';

//If page need api response, we will handle response node in reducer.
const response = (state = {}, action) => {
  switch (action.type) {
    case xxx:
      return xxxx;
    default:
      return state;
  }
};

const xxxPageReducers = combineReducers({
  pages,
  response
});

export default xxxPageReducers;
```

#### airBookingReducers.js

Handle the data shared in the whole flow

```javascript
const defaultRequest = {
	departureDate: 'YYYY-MM-DD',
	...
};

export const searchRequest = (state = defaultRequest, action) => {
	switch(action.type) {
		case xxx:
			return xxxx;
		default:
			return state;
	}
}
```

#### index.js

Combine all reducers for airBooking flow

```javascript
import { combineReducers } from 'redux';
import xxxPageReducers from 'src/airBooking/reducers/xxxPageReducers';
import * as AirBookingReducers from 'src/airBooking/reducers/airBookingReducers';
import airBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

const airBookingReducer = combineReducers({
  xxxPage: xxxPageReducers,
  ...AirBookingReducers
});

//use to reset airBooking flow data
const airBooking = (state, action) => {
  if (action.type === airBookingActionTypes.RESET_AIR_BOOKING_FLOW_DATA) {
    return airBookingReducer(undefined, action);
  }
  return airBookingReducer(state, action);
};

export default airBooking;
```

####Never Mutate
One of the core tenets of `Redux` is to never mutate state. Reducers should perform a deep clone of any previous state
or action data returned.

This page [Immutable Update Patterns](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns)provides some common mistakes and solutions when creating Reducers.

Our team will use Lodash functions like `cloneDeep()` to assist with solutions instead of the manual way presented in the link above.

- Primitive data types (Boolean, Number and String) do not require clone.

  ```javascript
  const isChaseFlowCompletedReducer = (state = false, action) => {
    switch (action.type) {
      case ChaseActionTypes.UPDATE_CHASE_FLOW_COMPLETED: {
        return action.isChaseFlowCompleted;
      }
      default:
        return state;
    }
  };
  ```

- Use Lodash cloneDeep() instead of Spread operator(...) for Objects with that are more than 1 level deep.

  ```javascript
  const applicationPropertiesReducer = (state = {}, action) => {
    if (action.type === SharedActionTypes.FETCH_APPLICATION_PROPERTIES_SUCCESS) {
      return _.cloneDeep(action.response);
    }

    return state;
  };
  ```

- Another option is to use Lodash merge() or assign() with the empty object as the first parameter.
  These methods can create a new object or mutate depending on the 1st parameter. For objects use {} as the
  first parameter and for arrays use [] to create new instances.

  ```javascript
  const savedCreditCardsReducer = (state = {}, action) => {
    switch (action.type) {
      case CreditCardActionTypes.FETCH_SAVED_CREDIT_CARDS_SUCCESS: {
        const { response } = action;
        return _.merge({}, state, response);
      }
      default:
        return state;
    }
  };
  ```

  ```javascript
  const togglesReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_FEATURE_TOGGLE:
        return _.assign({}, state, { [action.toggle]: action.isChecked });
      default:
        return state;
    }
  };
  ```

- Modify an object or array with Lodash set. Use clone deep to make a copy before modifying with set.

  ```javascript
  case AirBookingActionTypes.AIR_BOOKING__UPDATE_SENIOR_SHOPPING_PAGE_CARD: {
    const newState = _.cloneDeep(state);

    const seniorPageIndex = 0;
    _.set(newState, `[${seniorPageIndex}].cards[0]`, selectedFlightCard);

    return newState;
  }

  ```

- Below are examples of removing items from an array using lodash filter() and omit(). Filter and omit
  create new instances. Lodash remove and pull can also be used, but these functions mutate the original array
  and will require the use of cloning as well.

      ```javascript
      case AirBookingActionTypes.AIR_BOOKING__UPDATE_SENIOR_SHOPPING_PAGE_CARD: {
        const newState = _.cloneDeep(state);
        const adultSelectedProducts = _.get(action, 'selectedProducts.adult', {});

        return _.chain(adultSelectedProducts)
          .keys()
          .filter((direction) => {
            return !_.isEmpty(_.find(newState, {direction, paxType: SENIOR}));
          })
          .value();
      }

      ```

      ```javascript
      case AirBookingActionTypes.AIR_BOOKING__PREFILL_PASSENGER_INFO: {
        const {passengerDetailsPage} = action;

        return _.omit(passengerDetailsPage, 'contactMethod', 'contactPhone', 'contactEmail');
      }

      ```

### Actions

#### airBookingActions.js

All actions for airBooking flow

##### Sync actions

Return object with type and other parameters.

```javascript
export const sortFlightProducts = (sortBy: string, direction: string) => ({
  type: AirBookingActionTypes.SORT_FLIGHT_SHOPPING_PAGE_BY,
  direction,
  sortBy
});
```

```javascript
export const sortFlightProducts = (sortBy: string, direction: string) => {
	// transform data here
	...
	return {
	  type: AirBookingActionTypes.SORT_FLIGHT_SHOPPING_PAGE_BY,
	  direction,
	  sortBy
	}
};
```

##### Async actions

Return function with dispatch as the parameter.

> Notice:
> We use `isFetching` to determine whether we should show spinner for async actions.
> Remember that api async action should have three action like: `xxx, xxx_SUCCESS, xxx_FAILED`
> Dispatch `xxx_SUCCESS` when succeed, dispatch `xxx_FAILED` when failed, we can use `apiActionCreator` to create this for convenience.

```javascript
const fetchFlightShoppingPage = (request) => ({
  type: AirBookingActionTypes.FETCH_FLIGHT_SHOPPING_PAGE,
  isFetching: true,
  request
});

const fetchFlightShoppingPageSuccess = (response) => ({
  type: AirBookingActionTypes.FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS,
  isFetching: false,
  response
});

const fetchFlightShoppingPageFailed = (error) => ({
  type: AirBookingActionTypes.FETCH_FLIGHT_SHOPPING_PAGE_FAILED,
  isFetching: false,
  error
});

export const searchForFlights = ({ searchRequest, nextPagePath }: { searchRequest: any, nextPagePath: string }) => {
  return (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchFlightShoppingPage(searchRequest));

    return FlightBookingApi.findFlightProducts(transformToAPIRequest(searchRequest))
      .then((response) => {
        dispatch(fetchFlightShoppingPageSuccess(response));
        if (nextPagePath) {
          dispatch(push(nextPagePath));
        }
      })
      .catch((error) => dispatch(fetchFlightShoppingPageFailed(error)));
  };
};
```

#### airBookingActionTypes.js

Used for airBooking flow actions

##### Action type

Using `actionCreator` to create `action type` and `apiActionCreator`

1. Create action type

- group types by `sync` and `async`

  ```js
  const types = {
    sync: [
      'SORT_SHOPPING_PAGE_BY',
      'SAVE_SELECTED_PRODUCTS',
      'CLEAR_SELECTED_PRODUCTS',
      'SAVE_SELECTED_BOUNDS',
      'SAVE_PNR',
      'SAVE_CONTACT_INFORMATION'
    ],
    async: [
      'FETCH_RESERVATION_CHANGEABLE',
      'FETCH_FLIGHT_SHOPPING',
      'FETCH_FLIGHT_PRICING',
      'FETCH_PASSENGER_INFO_AND_PAYMENT_OPTIONS'
    ]
  };
  ```

  - for sync, will generate with prefix

  ```js
  [AIR_CHANGE__SORT_SHOPPING_PAGE_BY];
  ```

  - for async, will generate to three actions

  ```js
  [
    AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE,
    AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_SUCCESS,
    AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE_FAILED
  ];
  ```

2. Relate/distinguish action type with flow/feature so that will add prefix for each action type automatically

```js
import { actionCreator } from 'src/shared/redux/actionCreator';

const { createTypes, createApiActions } = actionCreator('airChange');

export default createTypes(types);
```

3. Using apiActionCreator to create api action to make sure api action be created without prefix

```js
export const apiActionCreator = createApiActions;
```

4. using action types and apiActionCreator

```js
import airChangeActionTypes, { apiActionCreator } from 'src/airChange/actions/airChangeActionTypes';

const { AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE, AIR_CHANGE__SAVE_PNR } = airChangeActionTypes;

export const { fetchReservationChangeable, fetchReservationChangeableSuccess, fetchReservationChangeableFailed } =
  apiActionCreator(AIR_CHANGE__FETCH_RESERVATION_CHANGEABLE);
```

#### airBooking.types.js

Contain the flow type for actions

### Connect

1. Use connect in the page level not in the component level
2. Use connect in global components, e.g. spinner, dialog...

#### How to use

```javascript
import { connect } from 'react-redux';
const enhancers = _.flowRight(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(xxxPage);
```

or

```javascript
import { connect } from 'react-redux';
const enhancers = _.flowRight(
  withRouter,
  connect((state) => state.app.spinner)
);

export default enhancers(xxxPage);
```

##### [Optional]How to write mapStateToProps

```javascript
// recommend using `_.get()` to retrieve the value to avoid runtime error of get property of undefined
const mapStateToProps = (state) => ({
  flightShoppingPage: _.get(state, 'app.airBooking.flightShoppingPage'),
  searchRequest: _.get(state, 'app.airBooking.searchRequest')
});
```

##### [Optional]How to write mapDispatchToProps

```javascript
const mapDispatchToProps = {
  selectFlightProductFn: AirBookingActions.selectFlightProduct,
  getProductListFn: AirBookingActions.getProductList
};
```

### Middleware

It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

#### Customized middleware

```javascript
export default function spinnerMiddleware() {
  return next => action => {
    if (action.isFetching === true) {
      ...
    } else if (action.isFetching === false) {
      ...
    }

    return next(action);
  };
}
```

#### Use middlewares

##### createStore.js

```javascript
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
const middlewares = [thunk, spinnerMiddleware];

return createReduxStore(reducerFn, compose(applyMiddleware(...middlewares)));
```

[How to write tests](https://redux.js.org/docs/recipes/WritingTests.html)

[redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store)

### connected-react-router

- We put _push_ in **page** when no api call and logic before it.
- We put _push_ in **action** when there has api call or logic before it.

#### _push_ in page

flightShoppingPage.js

```javascript
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type { Push } from 'src/shared/flow-typed/shared.types';

type Props = {
  push: Push
};

export class RepricingConfirmationPage extends React.Component<Props> {
  _transitionToSummaryPage = (hasSenior: boolean) => {
    this.props.push('/air/booking/pricing/summary');
  };
}

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(RepricingConfirmationPage);
```

#### _push_ in action

airBookingActions.js

```javascript
import { push } from 'connected-react-router';

export const searchForFlights = ({ searchRequest, nextPagePath }: { searchRequest: *, nextPagePath: string }) => {
  return (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchFlightShoppingPage(searchRequest));

    return FlightBookingApi.findFlightProducts(transformToAPIRequest(searchRequest))
      .then((response) => {
        dispatch(fetchFlightShoppingPageSuccess(response));
        if (nextPagePath) {
          dispatch(push(nextPagePath));
        }
      })
      .catch((error) => dispatch(fetchFlightShoppingPageFailed(error)));
  };
};
```

## Example structure

- airBooking
  - reducers
    - index.js
    - airBookingReducers.js
    - flightShoppingPageReducers.js
  - actions
    - airBookingActions.js
    - airBookingActionTypes.js
  - pages - container components
  - components - presentational components
  - flow-typed
    - airBooking.types.js
  - selectors
- shared
  - reducers
    - flowStatusReducers.js
  - actions
    - flowStatusActions.js
    - flowStatusActionTypes.js
  - pages
  - components
  - flow-typed
    - shared.types.js
  - redux
    - middlewares - customized middlewares
    - createStore.js
    - withRedux.js
