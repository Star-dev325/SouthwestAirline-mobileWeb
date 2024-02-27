# Selector Pattern in mWeb

## Overview

> In many places we need selector to compose data by existed data, so we introduced selector to compose them.

## Approach

We introduced [reselect](https://github.com/reactjs/reselect) to help us create selectors

## Usage

1. Used for analytics
2. Used for mapStateToProps in pages

## Import Reselect

For now, there is a helper to help us wrapper the `createSelector` function, because the `Connect` HOC of react-redux will swallow the error of selectors. So this helper is used to report the error message in the console of browser before it swallowed. And in order to keep the constant of code, the selectors used in analytics should also use it.
Here is the code:

```js
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
```

## Naming

- If the selector return an object: `getXXX` _(e.g. getPaymentInfo)_
- If the selector return a boolean: `isXXX` or `shouldXXX` or `hasXXX` _(e.g. isSeniorPassenger, shouldShowEBInPath, hasEarlyBird)_

## References to the code

- Just get data directly:
  In this case we don't need `createSelector` from reselect.

```js
// searchSelector.js
const getSearchRequest = (state) => _.get(state, 'app.airBooking.searchRequest');
```

- Get data need compute, combine or compose:

```js
// searchSelector.js
const getSearch = createSelector(
  [getSearchRequest, isPromoCodeApplied, getAirportInfo],
  (searchRequest, isPromoCodeApplied, airportInfo) => {
    const isSelectedOriginAirportCurrentLocation = !!_.get(airportInfo, 'originAirport.isCurrentLocation');
    const isSelectedDestinationAirportCurrentLocation = !!_.get(airportInfo, 'destinationAirport.isCurrentLocation');

    return {
      origin: searchRequest.origin,
      destination: searchRequest.destination,
      tripType: searchRequest.tripType,
      departureDate: searchRequest.departureDate,
      returnDate: searchRequest.returnDate,
      adults: searchRequest.numberOfAdults,
      seniors: searchRequest.numberOfSeniors,
      currencyCode: searchRequest.currencyType,
      promoCode: searchRequest.promoCode,
      promoCodeIsValid: isPromoCodeApplied,
      currentLocationUsed: isSelectedOriginAirportCurrentLocation || isSelectedDestinationAirportCurrentLocation
    };
  }
);
```

## Notice

It's better to test each selector separately using `xxxSelector.resultFunc`.
like:

```javascript
it('should return downgrade as true when it is downgrade', () => {
  const actualResult = getChangeType.resultFunc(fareSummary);

  expect(actualResult).to.be.deep.equal(expectResult);
});
```
