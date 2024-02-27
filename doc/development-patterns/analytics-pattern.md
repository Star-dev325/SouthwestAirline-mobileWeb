# Analytics Pattern in mWeb

## Overview

> SWA want to get the user data, like purchaseFlight, sortFlight, submitForm and so on

## Approach

We have 3 types of data: Page, Stores, Events.

- Page -> when there is router change, we track page change by the pageIdentifier
- Store -> save the data that need to sync to analytics team.
- Events -> store some user behavior. sortFlight, submitForm

## Analytics with Redux

### Usage

1. Page Data:
   We listen `SHARED__ROUTE_CHANGED` action in `analyticsEvents`, what you need to do is add the page path to the `pageIdentifierTransformer` in `analyticsEventHelper`.

2. Store data:

- we use `analyticsMiddleware` to dispatch action to different flow's analytics part .
- generate the updated data that triggered by action.
- update the analytics data from the generated data.

3. Events data:

- we use `analyticsEvents` to handle the event data.
- add the listened action type and `raiseEvent` to sync the event data

### Reference to code

1. Store data:

- How to add analytics for new flow
  1. add listened action into `analyticsActions`
  ```js
  const analyticsActions = [...analyticsActionsForAirBooking, ...analyticsActionsForCompanionBooking];
  ```
  2. add a generator into `analyticsStoreGenerators`
  ```js
  const analyticsStoreGenerators = {
    AirBookingStore: generateUpdatedAirBookingStore,
    CompanionBookingStore: generateUpdatedCompanionBookingStore
  };
  ```
- How to add generator for flow

  1. add folder named `analytics` into related flow.
  2. add `index.js` to combine selectors.
  3. add selectors to assign which field updated by which actions and using which selector to handle

  ```js
  const airBookingSelectors = {
    flightSelections: {
      actions: [AIR_BOOKING__FETCH_FLIGHT_PRICING_PAGE],
      selector: getFlightSelections
    }
  };
  ```

  4. implement selector by using `reselect` or `transform`
  5. using `generateUpdatedFlowStoreForAnalytics` to generate analytics data and `generateFlowActionListForAnalytics` to generate listening action types for current flow. All these coming from `analyticsHelper`

  ```js
  import {
    generateUpdatedFlowStoreForAnalytics,
    generateFlowActionListForAnalytics
  } from 'src/shared/analytics/helpers/analyticsHelper';

  export const generateUpdatedAirBookingStore = (state, actionType) =>
    generateUpdatedFlowStoreForAnalytics(airBookingSelectors, state, actionType);
  export const analyticsActionsForAirBooking = generateFlowActionListForAnalytics(airBookingSelectors);
  ```

2. Event data:

- How does event data sync to analytics store

  1. `fireAnalyticsEvents` will be triggered in `analyticsMiddleware`.

  ```js
  fireAnalyticsEvents(store)(action);
  ```

  2. add any action that you want to listen to inside fireAnalyticsEvents and `raiseEvent` to trigger event.

  ```js
  const fireAnalyticsEvents = (store) => (action) => {
    switch (action.type) {
      case AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY: {
        const {router: {location: {pathname}}} = store.getState();
        const pageIdentifier = transformPath(pathname);
        const sortEvent = `${pageIdentifier}_sort_by_${sortByToEventNameMap[action.sortBy]}`;

        _.set(window, 'data_a.events.sort', sortEvent);
        raiseEvent('sort');
        break;
      }
  };
  ```

### Adobe Satellite

Adobe Satellite is a separate method of analytics tracking than those described above.

We have an existing helper function that can be imported and used, so its implementation is simple:

  1. import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper' in the component where it will be used.
  2. call the imported "raiseSatelliteEvent" with arguments eventName (required; string type), and details (optional; any type, but objects are preferred) if needed.

The finished implementation can then be verified in the browser by the following steps:
  
  1. run the following command in the browser console to enable Adobe Satellite debugging mode: _satellite.setDebug(true)
  2. refresh the app
  3. trigger the action necessary to fire the analytics event
  4. find the analytics log event in the browser console via eventName and details (Satellite logs are prefaced by a "rocket" emoji)
  5. turn off debugging mode if logs are as expected: _satellite.setDebug(false)