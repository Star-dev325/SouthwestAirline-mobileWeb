// @flow
import dayjs from 'dayjs';
import _ from 'lodash';
import { getIsReaccomCoTerminalEligible } from 'src/airChange/helpers/airChangeHelper';
import {
  getReaccomBoundSelections,
  isReaccomScenario as getIsReaccomScenario
} from 'src/airChange/selectors/airChangeSelectPageSelector';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

import type { SelectedBounds } from 'src/airChange/flow-typed/airChange.types';
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';
import type { AirportType } from 'src/shared/flow-typed/shared.types';

const getAllAirports = (state) => state?.app?.airports?.allAirports;
const getChangeBoundSelections = (state) => _.get(state, 'app.airChange.changeFlightPage.response.boundSelections');
const getSelectedBounds = (state) => _.get(state, 'app.airChange.selectedBounds');

export const getInitFormData = createSelector(
  [getChangeBoundSelections, getSelectedBounds, getIsReaccomScenario, getReaccomBoundSelections],
  (
    changeBoundSelections: Array<BoundSelection>,
    selectedBounds: SelectedBounds,
    isReaccomScenario: boolean,
    reaccomBoundSelections: Array<BoundSelection>
  ) => {
    const [firstBound, secondBound] = isReaccomScenario ? reaccomBoundSelections : changeBoundSelections;

    const bound = !selectedBounds.firstbound && selectedBounds.secondbound ? secondBound : firstBound;

    return {
      from: _.get(bound, 'fromAirportCode'),
      to: _.get(bound, 'toAirportCode'),
      departureAndReturnDate: {
        departureDate: _.get(firstBound, 'originalDate'),
        returnDate: _.get(secondBound, 'originalDate')
      }
    };
  }
);

export const getSearchOptions = createSelector(
  [getChangeBoundSelections, getSelectedBounds, getIsReaccomScenario, getReaccomBoundSelections, getAllAirports],
  (
    changeBoundSelections: Array<BoundSelection>,
    selectedBounds: SelectedBounds,
    isReaccomScenario: boolean,
    reaccomBoundSelections: Array<BoundSelection>,
    allAirports: Array<AirportType>
  ) => {
    const boundSelections = isReaccomScenario ? reaccomBoundSelections : changeBoundSelections;
    const isRoundTrip = boundSelections?.length > 1;
    const departureDate = dayjs(_.get(boundSelections, '0.originalDate'));
    const getReaccomCoTerminalAirports = (reaccomCoTerminalAirportCodes) =>
      allAirports &&
      allAirports.filter((airport) =>
        reaccomCoTerminalAirportCodes.find(
          (reaccomCoTerminalAirportCode) => airport.code === reaccomCoTerminalAirportCode
        )
      );
    const getReaccomCoTerminalEarliestBookableDate = (bounds, boundIndex, boundDates) =>
      dayjs(bounds[boundIndex]?.[boundDates]?.beginShoppingDate);
    const getReaccomCoTerminalLastBookableDate = (bounds, boundIndex, boundDates) =>
      dayjs(bounds[boundIndex]?.[boundDates]?.endShoppingDate);
    const isReaccomCoTerminalEligible = isReaccomScenario && getIsReaccomCoTerminalEligible(boundSelections);
    const searchOptions = {
      departureBoundDisabled: false,
      earliestBookableDate: undefined,
      lastBookableDate: undefined,
      reaccomCoTerminalDates: {
        departureEarliestBookableDate: undefined,
        departureLastBookableDate: undefined,
        returnEarliestBookableDate: undefined,
        returnLastBookableDate: undefined
      },
      reaccomCoTerminalDepartureAirports: undefined,
      reaccomCoTerminalReturnAirports: undefined,
      returnBoundDisabled: false,
      tripType: 'oneWay'
    };
    const today = dayjs();

    if (_.get(selectedBounds, 'firstbound') && _.get(selectedBounds, 'secondbound')) {
      searchOptions.tripType = 'roundTrip';

      if (isReaccomCoTerminalEligible) {
        const reaccomCoTerminalDestinationAirportCodes = boundSelections[0]?.alternateReaccomDestinationAirportCodes;
        const reaccomCoTerminalOriginationAirportCodes = boundSelections[0]?.alternateReaccomOriginationAirportCodes;

        searchOptions.reaccomCoTerminalDates.departureEarliestBookableDate = getReaccomCoTerminalEarliestBookableDate(
          boundSelections,
          0,
          'multiSelectShoppingDates'
        );
        searchOptions.reaccomCoTerminalDates.departureLastBookableDate = getReaccomCoTerminalLastBookableDate(
          boundSelections,
          0,
          'multiSelectShoppingDates'
        );
        searchOptions.reaccomCoTerminalDates.returnEarliestBookableDate = getReaccomCoTerminalEarliestBookableDate(
          boundSelections,
          1,
          'multiSelectShoppingDates'
        );
        searchOptions.reaccomCoTerminalDates.returnLastBookableDate = getReaccomCoTerminalLastBookableDate(
          boundSelections,
          1,
          'multiSelectShoppingDates'
        );

        searchOptions.reaccomCoTerminalDepartureAirports =
          reaccomCoTerminalOriginationAirportCodes &&
          reaccomCoTerminalOriginationAirportCodes.length > 0 &&
          getReaccomCoTerminalAirports(reaccomCoTerminalOriginationAirportCodes);
        searchOptions.reaccomCoTerminalReturnAirports =
          reaccomCoTerminalDestinationAirportCodes &&
          reaccomCoTerminalDestinationAirportCodes.length > 0 &&
          getReaccomCoTerminalAirports(reaccomCoTerminalDestinationAirportCodes);
      }
    } else if (_.get(selectedBounds, 'firstbound')) {
      searchOptions.returnBoundDisabled = isRoundTrip;
      searchOptions.lastBookableDate = isRoundTrip ? _.get(boundSelections, '1.originalDate') : undefined;

      if (isReaccomCoTerminalEligible) {
        const reaccomCoTerminalDestinationAirportCodes = boundSelections[0]?.alternateReaccomDestinationAirportCodes;
        const reaccomCoTerminalOriginationAirportCodes = boundSelections[0]?.alternateReaccomOriginationAirportCodes;

        searchOptions.reaccomCoTerminalDates.departureEarliestBookableDate = getReaccomCoTerminalEarliestBookableDate(
          boundSelections,
          0,
          'shoppingDates'
        );
        searchOptions.reaccomCoTerminalDates.departureLastBookableDate = getReaccomCoTerminalLastBookableDate(
          boundSelections,
          0,
          'shoppingDates'
        );
        searchOptions.reaccomCoTerminalDepartureAirports =
          reaccomCoTerminalOriginationAirportCodes &&
          reaccomCoTerminalOriginationAirportCodes.length > 0 &&
          getReaccomCoTerminalAirports(reaccomCoTerminalOriginationAirportCodes);
        searchOptions.reaccomCoTerminalReturnAirports =
          reaccomCoTerminalDestinationAirportCodes &&
          reaccomCoTerminalDestinationAirportCodes.length > 0 &&
          getReaccomCoTerminalAirports(reaccomCoTerminalDestinationAirportCodes);
      }
    } else if (_.get(selectedBounds, 'secondbound')) {
      searchOptions.departureBoundDisabled = isRoundTrip;
      searchOptions.earliestBookableDate = departureDate.isAfter(today)
        ? departureDate.format('YYYY-MM-DD')
        : undefined;

      if (isReaccomCoTerminalEligible) {
        const reaccomCoTerminalDestinationAirportCodes = boundSelections[1]?.alternateReaccomDestinationAirportCodes;

        searchOptions.reaccomCoTerminalDates.returnEarliestBookableDate = getReaccomCoTerminalEarliestBookableDate(
          boundSelections,
          1,
          'shoppingDates'
        );
        searchOptions.reaccomCoTerminalDates.returnLastBookableDate = getReaccomCoTerminalLastBookableDate(
          boundSelections,
          1,
          'shoppingDates'
        );
        searchOptions.reaccomCoTerminalReturnAirports =
          reaccomCoTerminalDestinationAirportCodes &&
          reaccomCoTerminalDestinationAirportCodes.length > 0 &&
          getReaccomCoTerminalAirports(reaccomCoTerminalDestinationAirportCodes);
      }
    }

    return searchOptions;
  }
);
