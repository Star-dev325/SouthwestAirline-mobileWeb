# Object Transformer Pattern

## Transformer

### Context

In our project, when we want display the API response or user input on our page, most of time we transform the original data to our page object, we use the page object(same concept with page view model) can make our component reuse easier. So we introduce the transformer to help us to do it. when we write more transformer, we need make some naming conversions help us quick find the exist transformer, and find where we put the new transformer.

### Decision

- Source code folder
  If the transformer shared by different feature, we put it into `shared/transformers`, others we put it into feature’s folder `[feature name]/transformers`.
- Name of source file
  We use the original object name to be the file name, such as reservation api response to the reservation details card component object, the file name should be `reservationTransformer.js`.
- Name of transform function
  We use the destination object name to be the function name, such as reservation api response to the reservation detail card component object, the function name should be transformToAirChangeOriginalFlightInfo.
- Transform reuse
  Parent transformer can import child transformer to reuse, such as reservation transformer can import OriginationDestination transformer, to convert the originationDestination section.

```js
// src/shared/transformer/reservationTransformer.js
const {transformToPlaneChangeStops, transformToNoPlaneChangeStops, transformToFlightNumbers} = require('src/shared/transformer/originationDestinationTransformer');

const ReservationTransformer = {
  transformToAirChangeOriginalFlightInfo(reservation, direction) {
    ...
  },
  ...
};

module.exports = ReservationTransformer;
```

## Selector

For combining data from redux state, we introduce `selector` as a pure function to transform simple and rarely changed state and `reselect` to create memorial `selector` for large computation and frequently changed state.

For more information about `selector`, please refer to [Selector Pattern](./selector-pattern.md)

## Helper

For pieces of reuseable logic, we introduce helper to group those pieces of logic.

- Source code folder

  - shared helpers should be put into `src/shared/helpers/` folder.
  - other helpers should be put into `src/[Feature Name]/helpers/` folder.

- Name of the helper
  We name the helper file based on the helpers within it. For example, we name the helper of all date related helpers to `dateHelper`.
