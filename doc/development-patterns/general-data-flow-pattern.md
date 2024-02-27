# General data flow pattern

## Redux Version

### Redux data flow

As the doc of redux tell us. we use unidirectional data flow as below:

```
╔═════════╗    ╔═════════════╗     ╔══════════════════╗       ╔═════════════════╗
║ Actions ║───>║ Middlewares ║────>║Reducers -> Store ║──────>║  Page Component ║
╚═════════╝    ╚═════════════╝     ╚══════════════════╝       ╚═════════════════╝
     ^                                                                 │
     └─────────────────────────────────────────────────────────────────┘
```

#### Store

The Store is the object that hold our app's state, we only have one store and we split the data from different logic by using Reducer composition instead of many stores.

##### App

We put all feature and app shared state below this node,

- Feature state
  `AirBooking` feature state is mounted below `app.airBooking` node.
- Shared app state
  `lastBookableDate` is mounted to `app` node directly.

##### Other state

We also got `analytics`, `router` and `persistentHistory`, those state is mounted to the root of the redux store.

- `router` is the most recent location history synced from `react-router`
- `analytics` is used to generate analytics store.
- `persistentHistory` is one self maintained stack of route state to help `interceptor` do some `back/redriect` behaviors.

We can also use `store.dispatch()` directly, like:

```javascript
import {store} from 'src/shared/redux/createStore';

store.dispatch({type: '@@DATA', payload: data});
```

#### Action

Actions are payloads of information that send data to our store, they are the only source of information for the store. We use it by connecting the actions to page component props, for more information on how to use actions, refer to [redux pattern](./redux-pattern.md).

#### Middlewares

We got a series of middlewares in our app to provide a third-party extension point between dispatching an action, and the moment it reaches the reducer, like:

- Spinner middleware
  We use this middleware to control whether we should show a spinner when the action's payload contains `isFetching` property.

- Analytics middleware
  For new solution of analytics on redux, we introduce analytics middleware to genearte analytics stores and save it to `window.data_a`, more information refer to [Analytics Pattern](./analytics-pattern.md)

- APIErrorPopup Middleware
  We using this middleware to handle API error globally, more information refer to [Handle Error Pattern](./error-handler-pattern.md)

- Interceptor Middleware
  We use interceptor to intercept back/forward/refresh behavior in special scenarios, more information refer to [Interceptor Pattern](./interceptor.md)

#### Reducers

Reducers specify how our app's state changes in response to actions sent to the store. For more information about reducers, refer to [redux pattern](./redux-pattern.md).

#### Selectors

We using selector to transform the state to page component props, for how to use it, refer to [selector pattern](./selector-pattern.md).
