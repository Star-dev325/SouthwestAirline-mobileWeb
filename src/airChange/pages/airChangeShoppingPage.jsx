// @flow
import i18n from '@swa-ui/locale';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import CurrentReservation from 'src/airChange/components/currentReservation';
import { FLIGHT_PRODUCT_TYPE } from 'src/airChange/constants/airChangeConstants';
import FlightChangeMessageKey from 'src/airChange/constants/flightChangeMessageKey';
import { isReaccomScenario } from 'src/airChange/selectors/airChangeSelectPageSelector';
import {
  getCalendarStrip,
  getCardsSortedBy,
  getCurrentPage,
  getDynamicWaiver,
  getSelectedProducts
} from 'src/airChange/selectors/airChangeShoppingPageSelectors';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { trackCalendarStrip } from 'src/shared/analytics/actions/analyticsActions';
import {
  calculateDateDiffs,
  calculateOverrideDateDiffs
} from 'src/shared/analytics/helpers/analyticsCalendarStripHelper';
import BasicBanner from 'src/shared/components/basicBanner';
import ButtonDropDown from 'src/shared/components/buttonDropDown';
import CalendarStrip from 'src/shared/components/calendar/calendarStrip';
import FlightProduct from 'src/shared/components/flightProduct';
import FlightProductPromoBanner from 'src/shared/components/flightProductPromoBanner';
import FlightShoppingExplain from 'src/shared/components/flightShoppingExplain';
import PageHeader from 'src/shared/components/pageHeader';
import ReaccomFlightProduct from 'src/shared/components/reaccomFlightProduct';
import ShoppingAirStationsOverview from 'src/shared/components/shoppingAirStationsOverview';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import SortingOptions from 'src/shared/constants/sortingOptions';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import BrowserObject from 'src/shared/helpers/browserObject';
import { isWithinRange } from 'src/shared/helpers/dateHelper';
import {
  addForbidUserClickBrowserForward,
  removeForbidUserClickBrowserForward
} from 'src/shared/helpers/historyHelper';
import * as ShoppingPageHelper from 'src/shared/helpers/shoppingPageHelper';
import { getSortingOptions } from 'src/shared/helpers/sortingOptionsHelper';
import ReaccomBanner from 'src/viewReservation/components/reaccomBanner';

import type {
  FareProductionSelection,
  ReaccomBoundPageCardType,
  SearchFlightOptions,
  SelectedBounds,
  SelectedFlight,
  SelectedProducts,
  ShoppingPageFromSelectorType
} from 'src/airChange/flow-typed/airChange.types';
import type { CalendarStripEvent, OnDateSelectedCallback } from 'src/shared/components/calendar/calendarStrip';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import type { FareProduct, FlightProductCard, Push } from 'src/shared/flow-typed/shared.types';

const { history, location } = BrowserObject;

type DynamicWaiver = {
  dynamicWaiverStartDate: ?string,
  dynamicWaiverEndDate: ?string,
  isDynamicWaiverEligible: boolean,
  isWithinDWAlternativeCities: boolean,
  shouldHideWarningIcon: boolean,
  isDepartureDateWithinDWDateRange: boolean,
  isReturnDateWithinDWDateRange: boolean
};

type CardProductType = Array<FlightProductCard> | Array<ReaccomBoundPageCardType>;

type Props = {
  page: ShoppingPageFromSelectorType,
  cardsSortedBy: {
    sortByValue: string,
    cards?: CardProductType
  },
  calendarStrip: *,
  selectedBounds: SelectedBounds,
  selectedProducts: SelectedProducts,
  feeDisclaimerText: ?string,
  push: Push,
  goBack: () => void,
  fareSelectedFn: (FareProductionSelection) => void,
  sortAirChangeShoppingPageFn: (string, string, boolean) => void,
  selectFareFn: (SelectedFlight) => void,
  saveSelectedProductsFn: (SelectedProducts, boolean) => void,
  searchForFlightsFn: (SearchFlightOptions, goToNextPage?: () => void) => void,
  searchForReaccomFlightsFn: (Link) => void,
  goToPricingFn: (Link, SelectedProducts, boolean, ?boolean) => void,
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: () => Promise<*>,
  dynamicWaiver: DynamicWaiver,
  shouldForbidForward: boolean,
  updateShouldForbidForwardFn: (boolean) => void,
  isReaccom: boolean,
  isLoggedIn: boolean,
  trackCalendarStripFn: (string) => void
};

let forbidBrowserForwardListener;

export class AirChangeShoppingPage extends React.Component<Props> {
  componentDidMount() {
    const { shouldForbidForward } = this.props;

    this._updateUrlWithParams();
    !shouldForbidForward &&
      forbidBrowserForwardListener &&
      removeForbidUserClickBrowserForward(forbidBrowserForwardListener);
  }

  _updateUrlWithParams = () => {
    const url = new URL(BrowserObject.location);
    const {
      page: { adultPassengerCount, boundSelections, departDate, destinationAirport, originAirport, params, returnDate }
    } = this.props;

    const queryParams = [];

    departDate && queryParams.push({ key: 'changeBound0', value: 'true' });
    returnDate && queryParams.push({ key: 'changeBound1', value: 'true' });
    boundSelections.length === 1 && queryParams.push({ key: 'tripType', value: 'oneway' });
    boundSelections.length === 2 && queryParams.push({ key: 'tripType', value: 'twoway' });

    queryParams.push(
      { key: 'originationAirportCode', value: originAirport },
      { key: 'destinationAirportCode', value: destinationAirport },
      {
        key: 'adultPassengerCount',
        value: (adultPassengerCount && adultPassengerCount.toString()) || '0'
      }
    );

    if (params.direction === 'outbound') {
      queryParams.push({ key: 'departureDate', value: departDate });
    }

    if (params.direction === 'inbound') {
      queryParams.push({ key: 'returnDate', value: returnDate });
    }

    queryParams.forEach(({ key, value }) => {
      value && url.searchParams.set(key, value);
    });

    history.replaceState({}, '', url);
  };

  _onSortBySelectChange = (strategy: string) => {
    const {
      page: {
        params: { direction }
      },
      sortAirChangeShoppingPageFn,
      isReaccom
    } = this.props;

    sortAirChangeShoppingPageFn(strategy, direction, isReaccom);
  };

  _goBackAndForbidBrowserForward = () => {
    const { goBack, updateShouldForbidForwardFn } = this.props;

    goBack();
    forbidBrowserForwardListener = addForbidUserClickBrowserForward(() =>
      location.pathname.match(/\/air\/change\/shopping\/[a-zA-Z]+\/inbound\/results/)
    );
    updateShouldForbidForwardFn(true);
  };

  _shouldShowInvalidDepartDateDialog = (selectedDate: string) => {
    const {
      page: { isChangingTwoBounds, isOutbound, returnDate }
    } = this.props;

    return isChangingTwoBounds && isOutbound && returnDate && dayjs(selectedDate).isAfter(returnDate, 'day');
  };

  _shouldShowInvalidDepartDateDialogForReaccom = (selectedDate: string) => {
    const {
      page: { isOutbound, returnDate }
    } = this.props;

    return isOutbound && returnDate && dayjs(selectedDate).isAfter(returnDate, 'day');
  };

  _shouldShowInvalidReturnDateDialogForReaccom = (selectedDate: string) => {
    const {
      page: { isOutbound, departDate }
    } = this.props;

    return !isOutbound && departDate && dayjs(selectedDate).isBefore(departDate, 'day');
  };

  _shouldShowOutOfDynamicWaiverRangeDialog = (selectedDate: string) => {
    const {
      dynamicWaiver: { isWithinDWAlternativeCities, isReturnDateWithinDWDateRange },
      page: { isChangingTwoBounds, isChangingFirstBound },
      calendarStrip: { defaultSelectedDate }
    } = this.props;

    const isSelectedDateWithinDWDateRange = this._isWithinDynamicWavierRange(selectedDate);

    const isPreviousSelectedDateWithinDWDateRange =
      isChangingFirstBound &&
      (!isChangingTwoBounds ||
        (this._isWithinDynamicWavierRange(defaultSelectedDate) && isReturnDateWithinDWDateRange));

    const isChangingToOutOfDWDateRange =
      !isSelectedDateWithinDWDateRange &&
      (isPreviousSelectedDateWithinDWDateRange ||
        this._isSelectedProductsWillBecomeMixed(isSelectedDateWithinDWDateRange));

    return isWithinDWAlternativeCities && isChangingToOutOfDWDateRange;
  };

  _shouldShowBackToDynamicWaiverRangePopup = (selectedDate: string) => {
    const {
      page: { isChangingTwoBounds, isChangingFirstBound },
      calendarStrip: { defaultSelectedDate },
      dynamicWaiver: { isWithinDWAlternativeCities, isReturnDateWithinDWDateRange }
    } = this.props;
    const isSelectedDateWithinDWDateRange = this._isWithinDynamicWavierRange(selectedDate);

    const isPreviousSelectedDateOutOfDWDateRange =
      isChangingTwoBounds &&
      isChangingFirstBound &&
      !this._isWithinDynamicWavierRange(defaultSelectedDate) &&
      isReturnDateWithinDWDateRange;

    const isChangingBackToDWDateRange =
      isSelectedDateWithinDWDateRange &&
      (isPreviousSelectedDateOutOfDWDateRange ||
        this._isSelectedProductsWillBecomeMixed(isSelectedDateWithinDWDateRange));

    return isWithinDWAlternativeCities && isChangingBackToDWDateRange;
  };

  _showOutOfDynamicWaiverRangeDialog = (
    selectedDate: string,
    isOverrideEndDate: boolean,
    onDateSelectedCallback: OnDateSelectedCallback,
    event: CalendarStripEvent
  ) => {
    const { showDialogFn } = this.props;

    showDialogFn &&
      showDialogFn({
        name: 'air-change-calendar-strip-out-of-dynamic-waiver-range',
        message: i18n('AIR_CHANGE__SODA_FLIGHT_INFO__INELIGIBLE_MESSAGE'),
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: () => this._onCancelClick(onDateSelectedCallback)
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () =>
              this._onDynamicWaiverDialogOKClick(selectedDate, isOverrideEndDate, onDateSelectedCallback, event)
          }
        ]
      });
  };

  _showBackToDynamicWavierRangePopup = (
    selectedDate: string,
    onDateSelectedCallback: OnDateSelectedCallback,
    event: CalendarStripEvent
  ) => {
    const { showDialogFn } = this.props;

    showDialogFn &&
      showDialogFn({
        name: 'calendar-strip-back-to-dynamic-wavier-ragne',
        message: i18n('AIR_CHANGE__SODA_FLIGHT_INFO__ELIGIBLE_MESSAGE'),
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: () => this._onCancelClick(onDateSelectedCallback)
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => this._onDynamicWaiverDialogOKClick(selectedDate, false, onDateSelectedCallback, event)
          }
        ]
      });
  };

  _showInvalidDepartDateDialog = (
    selectedDate: string,
    onDateSelectedCallback: OnDateSelectedCallback,
    event: CalendarStripEvent
  ) => {
    const { showDialogFn } = this.props;

    showDialogFn &&
      showDialogFn({
        name: 'air-change-calendar-strip-invalid-depart-date',
        message: i18n('SHARED__CALENDAR__SELECTED_DATE_AFTER_RETURN_DATE'),
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: () => this._onCancelClick(onDateSelectedCallback)
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__CONTINUE'),
            onClick: () => this._onInvalidDepartDateDialogContinueClick(selectedDate, onDateSelectedCallback, event)
          }
        ]
      });
  };

  _showInvalidDateDialog = (message: string, className: string, onDateSelectedCallback: OnDateSelectedCallback) => {
    const { showDialogFn } = this.props;

    showDialogFn &&
      showDialogFn({
        name: className,
        message,
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => this._onCancelClick(onDateSelectedCallback)
          }
        ]
      });
  };

  _onInvalidDepartDateDialogContinueClick = (
    selectedDate: string,
    onDateSelectedCallback: OnDateSelectedCallback,
    event: CalendarStripEvent
  ) => {
    const { hideDialogFn } = this.props;

    hideDialogFn &&
      hideDialogFn().then(() => {
        if (this._shouldShowOutOfDynamicWaiverRangeDialog(selectedDate)) {
          this._showOutOfDynamicWaiverRangeDialog(selectedDate, true, onDateSelectedCallback, event);
        } else {
          this._onSelectionConfirmed(selectedDate, true, onDateSelectedCallback, event);
        }
      });
  };

  _onDynamicWaiverDialogOKClick = (
    selectedDate: string,
    isOverrideEndDate: boolean,
    onDateSelectedCallback: OnDateSelectedCallback,
    event: CalendarStripEvent
  ) => {
    const { hideDialogFn } = this.props;

    hideDialogFn &&
      hideDialogFn().then(() => {
        this._onSelectionConfirmed(selectedDate, isOverrideEndDate, onDateSelectedCallback, event);
      });
  };

  _onCancelClick = (onDateSelectedCallback: OnDateSelectedCallback) => {
    const { hideDialogFn } = this.props;

    onDateSelectedCallback(true);
    hideDialogFn && hideDialogFn();
  };

  _onCalendarStripSelect = (
    newDate: string,
    onDateSelectedCallback: OnDateSelectedCallback,
    event: CalendarStripEvent
  ) => {
    const {
      isReaccom,
      page: { isChangingTwoBounds }
    } = this.props;

    if (isReaccom) {
      if (isChangingTwoBounds && this._shouldShowInvalidDepartDateDialog(newDate)) {
        this._showInvalidDepartDateDialog(newDate, onDateSelectedCallback, event);
      } else if (!isChangingTwoBounds && this._shouldShowInvalidDepartDateDialogForReaccom(newDate)) {
        this._showInvalidDateDialog(
          i18n('SHARED__CALENDAR__REACCOM_SELECTED_DATE_AFTER_RETURN_DATE'),
          'air-change-calendar-strip-invalid-depart-date',
          onDateSelectedCallback
        );
      } else if (!isChangingTwoBounds && this._shouldShowInvalidReturnDateDialogForReaccom(newDate)) {
        this._showInvalidDateDialog(
          i18n('SHARED__CALENDAR__REACCOM_SELECTED_DATE_BEFORE_DEPART_DATE'),
          'air-change-calendar-strip-invalid-return-date',
          onDateSelectedCallback
        );
      } else {
        this._onSelectionConfirmed(newDate, false, onDateSelectedCallback, event);
      }
    } else {
      if (this._shouldShowInvalidDepartDateDialog(newDate)) {
        this._showInvalidDepartDateDialog(newDate, onDateSelectedCallback, event);
      } else if (this._shouldShowOutOfDynamicWaiverRangeDialog(newDate)) {
        this._showOutOfDynamicWaiverRangeDialog(newDate, false, onDateSelectedCallback, event);
      } else if (this._shouldShowBackToDynamicWaiverRangePopup(newDate)) {
        this._showBackToDynamicWavierRangePopup(newDate, onDateSelectedCallback, event);
      } else {
        this._onSelectionConfirmed(newDate, false, onDateSelectedCallback, event);
      }
    }
  };

  _onSelectionConfirmed = (
    selectedDate: string,
    isOverrideEndDate: boolean,
    onDateSelectedCallback: OnDateSelectedCallback,
    event: CalendarStripEvent
  ) => {
    const { previousDate } = event;

    onDateSelectedCallback(false, selectedDate);
    this._searchForFlights(selectedDate, isOverrideEndDate, previousDate);
  };

  _searchForFlights = (newDate: string, isOverrideEndDate: boolean = false, previousDate: string = '') => {
    const {
      page: {
        params: { direction },
        boundSelections
      },
      selectedBounds,
      searchForFlightsFn,
      dynamicWaiver: { dynamicWaiverStartDate, dynamicWaiverEndDate },
      isReaccom,
      searchForReaccomFlightsFn
    } = this.props;

    if (isReaccom) {
      let reaccomProducts = _.get(this.props, 'page._links.reaccomProducts');
      const isBothBoundSelected = selectedBounds.firstbound && selectedBounds.secondbound;

      if (!isBothBoundSelected) {
        const unselectedDirection = direction === OUTBOUND ? INBOUND : OUTBOUND;

        reaccomProducts = _.omit(reaccomProducts, `body.${unselectedDirection}`);
      }

      const newReaccomProductsDates = ShoppingPageHelper.getCalendarReturnAndDepartureDateForReaccom({
        direction,
        newDate,
        isOverrideEndDate,
        defaultReturnDate: _.get(reaccomProducts, 'body.inbound.date')
      });
      const updatedReaccomSearchRequest = _.merge({}, reaccomProducts, newReaccomProductsDates);

      searchForReaccomFlightsFn(updatedReaccomSearchRequest);
    } else {
      const searchRequest = _.get(this.props, 'page._links.searchRequest');
      const defaultReturnDate = _.get(searchRequest, 'departureAndReturnDate.returnDate');
      const departureAndReturnDate = ShoppingPageHelper.getCalendarReturnAndDepartureDate({
        direction,
        newDate,
        isOverrideEndDate,
        defaultReturnDate
      });
      const previousDiffs = calculateOverrideDateDiffs(
        newDate,
        defaultReturnDate,
        direction,
        isOverrideEndDate,
        searchRequest.diffs
      );
      const diffs = calculateDateDiffs(newDate, previousDate, direction, previousDiffs);
      const isSelectedDateWithinDWDateRange = isWithinRange(dynamicWaiverStartDate, dynamicWaiverEndDate, newDate);
      const shouldGoBack = this._isSelectedProductsWillBecomeMixed(isSelectedDateWithinDWDateRange);
      const updatedSearchRequest = _.merge({}, _.omit(searchRequest, 'diffs'), { departureAndReturnDate, diffs });
      const searchFlightOptions = {
        changeShoppingLink: _.get(this.props, 'page._links.changeShoppingPage'),
        searchRequest: updatedSearchRequest,
        selectedBounds,
        boundSelections
      };

      if (shouldGoBack) {
        searchForFlightsFn(searchFlightOptions, this._goBackAndForbidBrowserForward);
      } else {
        searchForFlightsFn(searchFlightOptions);
      }
    }
  };

  _onProductSelected = (flightCardIndex: number, flightProductCard: FlightProductCard) => {
    const {
      selectedBounds,
      selectedProducts,
      isLoggedIn,
      isReaccom,
      page,
      cardsSortedBy: { sortByValue },
      selectFareFn
    } = this.props;
    const { dynamicWaiverAvailabilityText, fares } = flightProductCard;

    if (dynamicWaiverAvailabilityText) {
      const fareProduct = _.find(fares, (fare) => !!_.get(fare, '_meta.productId'));

      fareProduct && this._onFareSelected(flightCardIndex, true, fareProduct);
    } else {
      selectFareFn({
        flightDetails: {
          flightCardIndex,
          params: page.params,
          isReaccom,
          isLoggedIn,
          selectedBounds,
          selectedProducts,
          sortByValue,
          page,
          card: flightProductCard
        },
        currentDirection: page.params.direction
      });
    }
  };

  _onFareSelected = (
    flightCardIndex: number,
    isDynamicWaiver: boolean,
    fareProduct: FareProduct | ReaccomBoundPageCardType
  ) => {
    const {
      selectedBounds,
      selectedProducts,
      page,
      cardsSortedBy: { sortByValue },
      isReaccom,
      isLoggedIn,
      fareSelectedFn
    } = this.props;

    fareSelectedFn({
      flightCardIndex,
      sortByValue,
      fareProduct,
      selectedBounds,
      selectedProducts,
      isDynamicWaiver,
      isLoggedIn,
      isReaccom,
      page
    });
  };

  _isFlightProductCardExpended = (cards?: CardProductType) => {
    if (cards && cards.length === 1) {
      const isDynamicWaiver = !!_.get(cards, '0.dynamicWaiverAvailabilityText');

      return !isDynamicWaiver && !_.get(cards, '0.reasonIfUnavailable');
    }

    return false;
  };

  _isSelectedProductsWillBecomeMixed = (isSelectedDateWithinDWDateRange: boolean) => {
    const {
      page: {
        params: { direction },
        isChangingTwoBounds,
        selectedOutboundProductType
      },
      dynamicWaiver: { isWithinDWAlternativeCities, isDepartureDateWithinDWDateRange }
    } = this.props;

    const willSelectedInboundProductType =
      isDepartureDateWithinDWDateRange && isSelectedDateWithinDWDateRange
        ? FLIGHT_PRODUCT_TYPE.DYNAMIC_WAIVER
        : FLIGHT_PRODUCT_TYPE.NORMAL;

    return (
      isWithinDWAlternativeCities &&
      isChangingTwoBounds &&
      direction === INBOUND &&
      selectedOutboundProductType !== willSelectedInboundProductType
    );
  };

  _isWithinDynamicWavierRange = (date: string): boolean => {
    const {
      dynamicWaiver: { dynamicWaiverStartDate, dynamicWaiverEndDate }
    } = this.props;

    return isWithinRange(dynamicWaiverStartDate, dynamicWaiverEndDate, date);
  };

  _verifyShouldHideWarningIcon = (date: Dayjs) => {
    const { dynamicWaiver } = this.props;
    const dateFormatted = date.format('YYYY-MM-DD');

    return _.get(dynamicWaiver, 'shouldHideWarningIcon') || !this._isWithinDynamicWavierRange(dateFormatted);
  };

  _renderChangeFlightProducts = () => {
    const {
      page: {
        _meta: { isPromoCodeApplied },
        currencyType,
        disclaimerWithLinks
      },
      cardsSortedBy
    } = this.props;
    const cards: Array<FlightProductCard> = _.get(cardsSortedBy, 'cards');

    return (
      <div className="flight-shopping-page--products-container">
        <div className="px4">
          <FlightShoppingExplain
            currencySuit={currencyType}
            showCurrencySwitch={false}
            disclaimerWithLinks={disclaimerWithLinks}
            hideRestrictions
            useAlternateTheme
          />
        </div>
        <div className="large bold px4 pt6 white" data-qa="please-choose">
          {i18n('AIR_CHANGE__PLEASE_CHOOSE')}
        </div>
        {_.map(cards, (productCard: FlightProductCard, index: number) => (
          <div key={productCard._meta.cardId + index} className="flight-shopping-page--product-card">
            <FlightProduct
              flightProductCard={productCard}
              onProductSelected={this._onProductSelected.bind(this, index, productCard)}
              isPromoCodeApplied={isPromoCodeApplied}
              isAirChangeOrReaccom
            />
          </div>
        ))}
      </div>
    );
  };

  _renderReaccomFlightProducts = () => {
    const { cardsSortedBy } = this.props;
    const cards: Array<ReaccomBoundPageCardType> = _.get(cardsSortedBy, 'cards');

    return (
      <div className="flight-shopping-page--products-container">
        {cards.length > 0 && (
          <div className="large bold px4 pt6 white" data-qa="please-choose-reaccom">
            {i18n('AIR_CHANGE__REACCOM_SHOPPING__REACCOM_SELECT_FLIGHT_MESSAGE')}
          </div>
        )}
        {_.map(cards, (productCard: ReaccomBoundPageCardType, index: number) => (
          <div key={productCard._meta.cardId + index} className="flight-shopping-page--product-card">
            <ReaccomFlightProduct
              flightProductCard={productCard}
              onProductSelected={this._onFareSelected.bind(this, index, false)}
            />
          </div>
        ))}
      </div>
    );
  };

  render() {
    const {
      page: {
        boundInfo,
        originAirport,
        destinationAirport,
        isOutbound,
        params: { paxType = PassengerTypes.ADULT },
        _meta: { isPromoCodeApplied },
        promoCodeNotice,
        currentReservation,
        messages,
        shoppingMessages
      },
      cardsSortedBy: { sortByValue },
      calendarStrip,
      dynamicWaiver,
      isReaccom,
      trackCalendarStripFn
    } = this.props;

    const reaccomErrorMessage = _.find(messages, { key: FlightChangeMessageKey.REACCOM_ERROR_NO_FLIGHTS_AVAILABLE });
    const sortingOptions = getSortingOptions(
      paxType,
      (dynamicWaiver && dynamicWaiver.isDynamicWaiverEligible) || isReaccom
    );

    // TODO: Add css for air-change-shopping-page instead of using flight-shopping-page style
    return (
      <div className="air-change-shopping-page">
        <PageHeader>
          <div className="flight-shopping-page--title">
            <span className="flight-shopping-page--bound-info">{boundInfo}</span>
          </div>
          <ButtonDropDown
            className="shopping-dropdown"
            options={sortingOptions}
            value={sortByValue}
            label={SortingOptions.SORT}
            onChange={this._onSortBySelectChange}
          />
        </PageHeader>
        {!_.isEmpty(shoppingMessages) &&
          shoppingMessages.map((message, index) => (
            <div key={index}>
              <BasicBanner
                className="flight-shopping-page--basic-banner"
                title={message.header}
                message={message.body}
                icon={message.icon}
              />
            </div>
          ))}
        {!!isPromoCodeApplied && (
          <FlightProductPromoBanner
            className="flight-shopping-page--promo-code-banner"
            promoCodeNotice={promoCodeNotice}
            isPromoCodeApplied={isPromoCodeApplied}
          />
        )}
        <CalendarStrip
          {...calendarStrip}
          disabled={false}
          onDateSelected={this._onCalendarStripSelect}
          verifyShouldHideWarningIcon={this._verifyShouldHideWarningIcon}
          trackCalendarStripFn={trackCalendarStripFn}
        />
        {isReaccom && reaccomErrorMessage && (
          <ReaccomBanner
            showBodyAsHtml
            body={_.get(reaccomErrorMessage, 'body', '')}
            header={_.get(reaccomErrorMessage, 'header', '')}
          />
        )}
        {isReaccom && !reaccomErrorMessage && (
          <div className="bold white p4 px6" data-qa="reaccom-current-bounds-message">
            {i18n('AIR_CHANGE__REACCOM_SHOPPING__REACCOM_CURRENT_BOUNDS_MESSAGE')}
          </div>
        )}
        {originAirport && destinationAirport && (
          <ShoppingAirStationsOverview
            destinationAirport={destinationAirport}
            isOutbound={isOutbound}
            originAirport={originAirport}
          />
        )}
        <div className="px4">
          <CurrentReservation currentReservation={currentReservation} />
        </div>
        {!isReaccom && this._renderChangeFlightProducts()}
        {isReaccom && this._renderReaccomFlightProducts()}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  page: getCurrentPage(state, props),
  cardsSortedBy: getCardsSortedBy(state, props),
  calendarStrip: getCalendarStrip(state, props),
  dynamicWaiver: getDynamicWaiver(state, props),
  selectedBounds: _.get(state, 'app.airChange.selectedBounds'),
  selectedProducts: getSelectedProducts(state),
  shouldForbidForward: _.get(state, 'app.airChange.shouldForbidForward'),
  isReaccom: isReaccomScenario(state),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn')
});

const mapDispatchToProps = {
  selectFareFn: AirChangeActions.selectFare,
  fareSelectedFn: AirChangeActions.fareSelected,
  sortAirChangeShoppingPageFn: AirChangeActions.sortAirChangeShoppingPage,
  updateShouldForbidForwardFn: AirChangeActions.updateShouldForbidForward,
  saveSelectedProductsFn: AirChangeActions.saveSelectedProducts,
  searchForFlightsFn: AirChangeActions.searchForFlights,
  searchForReaccomFlightsFn: AirChangeActions.searchForReaccomFlights,
  goToPricingFn: AirChangeActions.goToPricing,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog,
  trackCalendarStripFn: trackCalendarStrip
};

const enhancer = _.flowRight(
  withConnectedReactRouter,
  withBodyClass('flight-shopping-page'),
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancer(AirChangeShoppingPage);
