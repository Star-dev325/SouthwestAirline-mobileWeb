// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import { getIsReaccomCoTerminalEligible } from 'src/airChange/helpers/airChangeHelper';
import { isWithinDynamicWaiverAlternativeCities } from 'src/airChange/helpers/dynamicWaiverHelper';
import {
  isOpenJawReservation,
  isReaccomScenario,
  isUpgradeScenario
} from 'src/airChange/selectors/airChangeSelectPageSelector';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import FlightInfoDescription from 'src/shared/constants/flightBoundDescription';
import { OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { isWithinRange, today } from 'src/shared/helpers/dateHelper';
import { sortCardsBy } from 'src/shared/helpers/shoppingPageHelper';

import type {
  ChangeShoppingPage,
  ChangeFlightPage,
  CurrentReservationType,
  Params,
  ReaccomFlightPage,
  ReaccomReservationType,
  SearchRequest,
  SelectedBounds,
  SelectedProducts,
  ShoppingPageFromSelectorType
} from 'src/airChange/flow-typed/airChange.types';
import type { PricingDataType } from 'src/airUpgrade/flow-typed/airUpgrade.types';
import type { BoundType } from 'src/shared/flow-typed/flightBound.types';

const { DEPARTING, RETURNING } = FlightInfoDescription;

type SortBy = {
  [BoundType]: string
};

const getChangeResponse = (state: *) => _.get(state, 'app.airChange.changeShoppingPage.response');
const getParams = (state: *, props: *) => _.get(props, 'params');
const getLastBookableDate = (state: *) => _.get(state, 'app.lastBookableDate');
const getChangeSortBy = (state: *) => _.get(state, 'app.airChange.changeShoppingPage.sortBy');
const getChangeSearchRequest = (state: *) => _.get(state, 'app.airChange.changeShoppingPage.searchRequest');
const getSelectedChangeProducts = (state: *) => _.get(state, 'app.airChange.changeShoppingPage.selectedProducts');
const getChangeFlightPageResponse = (state: *) => _.get(state, 'app.airChange.changeFlightPage.response');
const getSelectedBounds = (state: *) => _.get(state, 'app.airChange.selectedBounds');
const getReaccomResponse = (state: *) => _.get(state, 'app.airChange.reaccomShoppingPage.response');
const getReaccomeSortBy = (state: *) => _.get(state, 'app.airChange.reaccomShoppingPage.sortBy');
const getSelectedReaccomProducts = (state: *) => _.get(state, 'app.airChange.reaccomShoppingPage.selectedProducts');
const getReaccomCoTerminalProducts = (state: *) =>
  state?.app?.airChange?.reaccomShoppingPage?.reaccomCoTerminalProducts;
const getSelectedUpgradeProducts = (state: *) => {
  const pricingDataList = _.get(
    state,
    'app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage.pricingDataList',
    []
  );

  return pricingDataList.filter(({ isSelected }) => isSelected);
};

export const getReaccomFlightPageResponse = (state: *) => _.get(state, 'app.airChange.reaccomFlightPage.response');

export const getSelectedProducts = createSelector(
  [
    isReaccomScenario,
    getSelectedChangeProducts,
    getSelectedReaccomProducts,
    getSelectedUpgradeProducts,
    isUpgradeScenario
  ],
  (
    isReaccom: boolean,
    selectedChangeProducts: SelectedProducts,
    selectedReaccomProducts: SelectedProducts,
    selectedUpgradeProducts: Array<PricingDataType>,
    isUpgrade: boolean
  ) => (isUpgrade ? selectedUpgradeProducts : isReaccom ? selectedReaccomProducts : selectedChangeProducts)
);

const getCurrentChangePage = createSelector(
  [
    getChangeResponse,
    getParams,
    getChangeSearchRequest,
    getChangeFlightPageResponse,
    isOpenJawReservation,
    getSelectedChangeProducts,
    getSelectedBounds
  ],
  (
    response: ChangeShoppingPage,
    params: Params,
    searchRequest: SearchRequest,
    changeFlightPageResponse: ChangeFlightPage,
    isOpenJaw,
    selectedProducts: SelectedProducts,
    selectedBounds: SelectedBounds
  ): ShoppingPageFromSelectorType => {
    const { direction } = params;
    const isOutbound = direction === OUTBOUND;
    const isChangingTwoBounds =
      _.get(selectedBounds, 'firstbound', false) && _.get(selectedBounds, 'secondbound', false);
    const tripDescription = isOpenJaw || isOutbound ? DEPARTING : RETURNING;
    const isChangingFirstBound = (isChangingTwoBounds && direction === OUTBOUND) || !isChangingTwoBounds;

    return {
      _meta: _.get(response, '_meta', {}),
      adultPassengerCount: _.get(changeFlightPageResponse, 'passengerDetails.passengerList', []).length,
      airportInfo: _.get(response, `flights.${direction}Page.header.airportInfo`, ''),
      boundInfo: `${i18n('SHARED__TRIP_BOOKED__PRODUCT_LIST_SELECT')} ${tripDescription}${' Flight'}`,
      boundSelections: _.get(changeFlightPageResponse, 'boundSelections'),
      checkedInNotice: _.get(response, 'checkedInNotice', {}),
      currencyType: _.get(response, '_meta.purchaseWithPoints', false) ? POINTS : DOLLAR,
      currentReservation: _.get(response, `currentReservation.${direction}`),
      departDate: _.get(response, 'flights.outboundPage.header.selectedDate'),
      destinationAirport: _.get(response, `flights.${direction}Page.header.destinationAirport`, ''),
      disclaimerWithLinks: _.get(response, 'disclaimerWithLinks', ''),
      isChangingFirstBound,
      isChangingTwoBounds,
      isOutbound,
      _links: {
        changeShoppingPage: _.get(changeFlightPageResponse, '_links.changeShopping'),
        changePricingPage: _.get(response, '_links.changePricingPage'),
        searchRequest
      },
      originAirport: _.get(response, `flights.${direction}Page.header.originAirport`, ''),
      params,
      promoCodeNotice: _.get(response, 'promoCodeNotice', ''),
      returnDate: _.get(response, 'flights.inboundPage.header.selectedDate'),
      selectedOutboundProductType: _.get(selectedProducts, 'outbound.flightProductType'),
      shoppingMessages: _.get(response, 'shoppingMessages'),
      showSgaMessage: _.get(response, 'showSgaMessage')
    };
  }
);

export const transformToCurrentReservationType = (reaccom: ReaccomReservationType): CurrentReservationType => {
  const flightArray = reaccom?.flights;
  const flightNumber = Array.isArray(flightArray) ? flightArray.map(flight => flight.number).join('/') : flightArray;

  return {
    date: _.get(reaccom, 'departureDate'),
    departsTime: _.get(reaccom, 'departureTime'),
    arrivesTime: _.get(reaccom, 'arrivalTime'),
    flightTime: _.get(reaccom, 'travelTime'),
    stopDescription: _.get(reaccom, 'stopDescription'),
    shortStopDescription: _.get(reaccom, `shortStopDescription`),
    stopCity: _.get(reaccom, `stopCity`),
    flight: flightNumber,
    isNextDayArrival: _.get(reaccom, 'isNextDayArrival'),
    isOvernight: _.get(reaccom, 'isOvernight')
  };
};

const getCurrentReaccomPage = createSelector(
  [
    getReaccomResponse,
    getParams,
    getReaccomFlightPageResponse,
    isOpenJawReservation,
    getSelectedReaccomProducts,
    getSelectedBounds,
    getReaccomCoTerminalProducts
  ],
  (
    response: *,
    params: Params,
    reaccomFlightPageResponse: ReaccomFlightPage,
    isOpenJaw,
    selectedProducts: SelectedProducts,
    selectedBounds: SelectedBounds,
    reaccomCoTerminalProducts: Link
  ): ShoppingPageFromSelectorType => {
    const { direction } = params;
    const isChangingTwoBounds =
    _.get(selectedBounds, 'firstbound', false) && _.get(selectedBounds, 'secondbound', false);
    const boundsPageMessages = _.get(response, `flights.${direction}Page.messages`);
    const inboundDepartureDate = _.get(response, 'currentReservation.inbound.departureDate');
    const isChangingFirstBound = (isChangingTwoBounds && direction === OUTBOUND) || !isChangingTwoBounds;
    const isOutbound = direction === OUTBOUND;
    const outboundDepartureDate = _.get(response, 'currentReservation.outbound.departureDate');
    const reaccomBoundSelections = reaccomFlightPageResponse.boundSelections;
    const { reaccomProducts } = reaccomFlightPageResponse._links ?? {};
    const isReaccomCoTerminalEligible =
      reaccomBoundSelections && getIsReaccomCoTerminalEligible(reaccomBoundSelections);
    const tripDescription = isOpenJaw || isOutbound ? DEPARTING : RETURNING;

    return {
      _links: {
        reaccomConfirmationPage: _.get(response, 'flights._links.reaccomConfirmationPage'),
        reaccomProducts: isReaccomCoTerminalEligible ? reaccomCoTerminalProducts : reaccomProducts
      },
      _meta: _.get(response, 'flights._meta', {}),
      airportInfo: _.get(response, `flights.${direction}Page.header.airportInfo`, ''),
      boundInfo: `${i18n('SHARED__TRIP_BOOKED__PRODUCT_LIST_SELECT')} ${tripDescription}${' Flight'}`,
      boundSelections: _.get(reaccomFlightPageResponse, 'boundSelections'),
      checkedInNotice: {},
      currencyType: DOLLAR,
      currentReservation: transformToCurrentReservationType(_.get(response, `currentReservation.${direction}`)),
      departDate: _.get(response, 'flights.outboundPage.header.selectedDate', outboundDepartureDate),
      destinationAirport: _.get(response, `flights.${direction}Page.header.destinationAirport`, ''),
      flightBoundPageInfo: response?.flights?.[`${direction}Page`],
      isChangingFirstBound,
      isChangingTwoBounds,
      isOutbound,
      messages: _.concat(_.get(response, 'tripSummaryMessage'), boundsPageMessages),
      originAirport: _.get(response, `flights.${direction}Page.header.originAirport`, ''),
      params,
      promoCodeNotice: '',
      returnDate: _.get(response, 'flights.inboundPage.header.selectedDate', inboundDepartureDate),
      selectedOutboundProductType: _.get(selectedProducts, 'outbound.flightProductType'),
      shoppingMessages: _.get(response, 'shoppingMessages'),
      showSgaMessage: false
    };
  }
);

export const getCurrentPage = (state: *, props: *) =>
  (isReaccomScenario(state) ? getCurrentReaccomPage(state, props) : getCurrentChangePage(state, props));

const getChangeCalendarStrip = createSelector(
  [getChangeResponse, getParams, getLastBookableDate, getSelectedBounds],
  (response: ChangeShoppingPage, params: Params, lastBookableDate: string, selectedBounds: SelectedBounds) => {
    const { direction } = params;

    const departDate = _.get(response, 'flights.outboundPage.header.selectedDate', '');
    const returnDate = _.get(response, 'flights.inboundPage.header.selectedDate', '');
    const isChangingTwoBounds = selectedBounds.firstbound && selectedBounds.secondbound;
    const defaultSelectedDate = direction === OUTBOUND ? departDate : returnDate;

    const lastBookableDateAsDayjs = dayjs(lastBookableDate);
    const departDateAsDayjs = dayjs(departDate);

    return direction === OUTBOUND
      ? {
        defaultSelectedDate,
        startDate: today(),
        endDate: lastBookableDateAsDayjs
      }
      : {
        defaultSelectedDate,
        startDate: isChangingTwoBounds ? departDateAsDayjs : today(),
        endDate: lastBookableDateAsDayjs
      };
  }
);

const getReaccomCalendarStrip = createSelector(
  [getReaccomResponse, getParams, getLastBookableDate, getSelectedBounds],
  (response: ChangeShoppingPage, params: Params, lastBookableDate: string, selectedBounds: SelectedBounds) => {
    const { direction } = params;

    const outboundDepartureDate = _.get(response, 'currentReservation.outbound.departureDate');
    const departDate = _.get(response, 'flights.outboundPage.header.selectedDate', outboundDepartureDate);
    const returnDate = _.get(response, 'flights.inboundPage.header.selectedDate', '');
    const isChangingTwoBounds = selectedBounds.firstbound && selectedBounds.secondbound;
    const defaultSelectedDate = direction === OUTBOUND ? departDate : returnDate;

    const lastBookableDateAsDayjs = dayjs(lastBookableDate);
    const departDateAsDayjs = dayjs(departDate);

    const lastDate = _.get(response, `flights.${direction}Page.shoppingDates.endShoppingDate`);
    const endDate = lastDate ? dayjs(lastDate) : lastBookableDateAsDayjs;

    return direction === OUTBOUND
      ? {
        defaultSelectedDate,
        startDate: today(),
        endDate
      }
      : {
        defaultSelectedDate,
        startDate: isChangingTwoBounds ? departDateAsDayjs : today(),
        endDate
      };
  }
);

export const getCalendarStrip = (state: *, props: *) =>
  (isReaccomScenario(state) ? getReaccomCalendarStrip(state, props) : getChangeCalendarStrip(state, props));

export const getCardsSortedBy = createSelector(
  [getChangeResponse, getParams, getChangeSortBy, isReaccomScenario, getReaccomResponse, getReaccomeSortBy],
  (
    changeResponse: ChangeShoppingPage,
    params: Params,
    changeSortBy: SortBy,
    isReaccom: boolean,
    reaccomResponse: *,
    reaccomeSortBy: SortBy
  ) => {
    const response = isReaccom ? reaccomResponse : changeResponse;
    const sortBy = isReaccom ? reaccomeSortBy : changeSortBy;
    const { direction } = params;
    const sortStrategy = sortBy[direction];
    const cards = _.get(response, `flights.${direction === OUTBOUND ? 'outboundPage' : 'inboundPage'}.cards`);

    return {
      sortByValue: sortStrategy,
      cards: sortCardsBy(cards, sortStrategy)
    };
  }
);

const _getOrFallback = (object, key, fallBackKey) => {
  const value = _.get(object, key);

  return _.isEmpty(value) ? _.get(object, fallBackKey) : value;
};

export const getDynamicWaiver = createSelector(
  [getChangeFlightPageResponse, getSelectedBounds, getParams, getChangeSearchRequest],
  (
    changeFlightPageResponse: ChangeFlightPage,
    selectedBounds: SelectedBounds,
    params: Params,
    searchRequest: SearchRequest
  ) => {
    const { direction } = params;

    const dynamicWaivers = _.get(changeFlightPageResponse, 'dynamicWaivers') || [];
    const dynamicWaiverOutbound = _.find(dynamicWaivers, { flightType: i18n('AIR_CHANGE__FLIGHT_TYPE__DEPARTURE') });
    const dynamicWaiverInbound = _.find(dynamicWaivers, { flightType: i18n('AIR_CHANGE__FLIGHT_TYPE__RETURN') });

    const dynamicWaiverBound = direction === OUTBOUND ? dynamicWaiverOutbound : dynamicWaiverInbound;
    const dynamicWaiverStartDate = _getOrFallback(dynamicWaiverBound, 'calculatedStartDate', 'firstTravelDate');
    const dynamicWaiverEndDate = _getOrFallback(dynamicWaiverBound, 'calculatedEndDate', 'lastTravelDate');

    const isDynamicWaiver = !_.isEmpty(dynamicWaivers);

    const isWithinDWAlternativeCities =
      isDynamicWaiver && isWithinDynamicWaiverAlternativeCities(dynamicWaivers, searchRequest, selectedBounds);

    const isDepartureDateWithinDWDateRange =
      isDynamicWaiver &&
      isWithinRange(
        _getOrFallback(dynamicWaiverOutbound, 'calculatedStartDate', 'firstTravelDate'),
        _getOrFallback(dynamicWaiverOutbound, 'calculatedEndDate', 'lastTravelDate'),
        _.get(searchRequest, 'departureAndReturnDate.departureDate')
      );

    const isReturnDateWithinDWDateRange =
      isDynamicWaiver &&
      isWithinRange(
        _getOrFallback(dynamicWaiverInbound, 'calculatedStartDate', 'firstTravelDate'),
        _getOrFallback(dynamicWaiverInbound, 'calculatedEndDate', 'lastTravelDate'),
        _.get(searchRequest, 'departureAndReturnDate.returnDate')
      );

    const isOneWayTrip = !dynamicWaiverInbound;
    const isWithinDWDateRange = isOneWayTrip
      ? isDepartureDateWithinDWDateRange
      : isDepartureDateWithinDWDateRange && isReturnDateWithinDWDateRange;
    const isDynamicWaiverEligible = isWithinDWAlternativeCities && isWithinDWDateRange;

    const isChangingTwoBounds = selectedBounds.firstbound && selectedBounds.secondbound;
    const shouldHideWarningIcon = !isWithinDWAlternativeCities || (isChangingTwoBounds && !isWithinDWDateRange);

    return {
      dynamicWaiverStartDate,
      dynamicWaiverEndDate,
      isDynamicWaiverEligible,
      isWithinDWAlternativeCities,
      isDepartureDateWithinDWDateRange,
      isReturnDateWithinDWDateRange,
      shouldHideWarningIcon
    };
  }
);
