// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import type {
  BoundPage,
  FlightBoundMultiSelectSearchRequest,
  FlightProductSearchRequest,
  FlightShoppingMultiSelectPageType,
  FlightShoppingPageResponseType,
  SearchForMultiSelectGroupFlightsArgsType,
  SelectedFlight,
  SelectedProducts
} from 'src/airBooking/flow-typed/airBooking.types';
import { getNextFlightShoppingPageParams } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { updatetMultiSelectGroupCurrentDirection } from 'src/airports/actions/airportsActions';
import { getUserInfo } from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { trackCalendarStrip } from 'src/shared/analytics/actions/analyticsActions';
import { getPageIdentifier, raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import ButtonDropDown from 'src/shared/components/buttonDropDown';
import type { OnDateSelectedCallback } from 'src/shared/components/calendar/calendarStrip';
import CalendarStrip from 'src/shared/components/calendar/calendarStrip';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import FlightBoundDrawer from 'src/shared/components/flightBoundDrawer';
import FlightProduct from 'src/shared/components/flightProduct';
import FlightProductPromoBanner from 'src/shared/components/flightProductPromoBanner';
import FlightProductSGAMessageBanner from 'src/shared/components/flightProductSGAMessageBanner';
import FlightShoppingExplain from 'src/shared/components/flightShoppingExplain';
import Footnotes from 'src/shared/components/footnotes';
import HighlightedFeatures from 'src/shared/components/highlightedFeatures';
import type { CurrencySwitchControlOption } from 'src/shared/components/moneyOrPointsSwitchButton';
import PageHeader from 'src/shared/components/pageHeader';
import ShoppingAirStationsOverview from 'src/shared/components/shoppingAirStationsOverview';
import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';
import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import SortingOptions from 'src/shared/constants/sortingOptions';
import TierTypes from 'src/shared/constants/tierTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import type { ButtonsPopupType } from 'src/shared/flow-typed/dialog.types';
import type { BoundType } from 'src/shared/flow-typed/flightBound.types';
import type { PassengerType } from 'src/shared/flow-typed/passenger.types';
import type {
  CurrencySuit,
  CustomerInfoType,
  FlightProductCard,
  Location,
  MultiSelectGroup,
  Push,
  RapidRewardsDetailsType
} from 'src/shared/flow-typed/shared.types';
import { formatCurrency } from 'src/shared/helpers/formatCurrencyHelper';
import { getCompanyIdFromIdToken } from 'src/shared/helpers/loginSessionHelper';
import { generateCalendarStrip, getCalendarReturnAndDepartureDate } from 'src/shared/helpers/shoppingPageHelper';
import { getSortingOptions } from 'src/shared/helpers/sortingOptionsHelper';
import { transformToSGAMessage } from 'src/shared/transformers/shoppingMessageTransformer';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  customerInfo: CustomerInfoType,
  fetchFlightShoppingPageSuccessFn: (response: FlightShoppingPageResponseType) => void,
  flightShoppingPage: {
    multiSelectGroup: FlightShoppingMultiSelectPageType,
    pages: Array<BoundPage>,
    response: FlightShoppingPageResponseType,
    sortBy: *
  },
  getFlightSelectPagePlacementsFn: (*) => Promise<*>,
  getProductListFn: ({ searchRequest: FlightProductSearchRequest, shouldClearMultiSelectBound?: boolean }) => Promise<*>,
  getUserInfoFn: (boolean) => void,
  hideDialogFn: () => Promise<*>,
  isCalendarStrip?: boolean,
  isLoggedIn: boolean,
  isWebView: boolean,
  lastBookableDate: string,
  location: Location,
  multiSelectGroupState: MultiSelectGroup,
  params: {
    direction: BoundType,
    paxType: PassengerType
  },
  placements: {
    bottomPromo1: DynamicPlacementResponse,
    promoTop01: DynamicPlacementResponse
  },
  push: Push,
  rapidRewardsDetails: RapidRewardsDetailsType,
  resetMultiSelectBoundSelectionFn: () => void,
  saveSearchRequestFn: (searchRequest: FlightProductSearchRequest) => void,
  searchForFlightsFn: (*) => void,
  searchForMultiSelectGroupFlightsFn: (SearchForMultiSelectGroupFlightsArgsType) => void,
  searchRequest: FlightBoundMultiSelectSearchRequest,
  selectedCompanyName: ?string,
  selectedProducts: SelectedProducts,
  selectFareFn: (selectedCard: SelectedFlight) => void,
  setCalendarStripFn: (boolean) => void,
  showDialogFn: (ButtonsPopupType) => Promise<*>,
  sortFlightProductsFn: (string, string, string) => void,
  trackCalendarStripFn: (string) => void,
  updateMultiSelectBoundFn: ({ originBoundAirport: string, destinationBoundAirport: string }) => void,
  updatetMultiSelectGroupCurrentDirectionFn: (direction: string) => void,
};

type State = {
  boundRef: Array<{ current: null | HTMLDivElement }>
};

export class FlightShoppingPage extends React.Component<Props, State> {
  static defaultProps = {
    params: {
      paxType: PassengerTypes.ADULT
    }
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      boundRef: []
    };
  }

  componentDidMount() {
    const {
      fetchFlightShoppingPageSuccessFn,
      flightShoppingPage: { multiSelectGroup, response },
      getFlightSelectPagePlacementsFn,
      getUserInfoFn,
      isWebView,
      location,
      multiSelectGroupState: { isSelected: isMultiSelectGroup },
      params,
      updatetMultiSelectGroupCurrentDirectionFn
    } = this.props;
    const { direction } = params;
    const bounds = multiSelectGroup?.response?.outboundPage?.bounds;
    const boundRef = [];
    const pageIdentifier = getPageIdentifier(location);

    getFlightSelectPagePlacementsFn(direction).then(() => {
      if (direction !== INBOUND && isMultiSelectGroup) {
        raiseSatelliteEvent('otter', { page: 'air-booking-select-multi' });
      } else if (!isMultiSelectGroup) {
        raiseSatelliteEvent('otter', { page: pageIdentifier });
      }
    });

    isWebView && getCompanyIdFromIdToken() && getUserInfoFn(true);

    if (isMultiSelectGroup) {
      updatetMultiSelectGroupCurrentDirectionFn(direction);
      !_.isEmpty(response) && fetchFlightShoppingPageSuccessFn(response);
    }
    bounds &&
      bounds.map((ref, index) => {
        boundRef[index] = React.createRef();
      });
    this.setState({ boundRef });
  }

  componentDidUpdate(prev: any) {
    const {
      isCalendarStrip,
      searchRequest: { departureDate, returnDate }
    } = this.props;

    if (
      (!_.isEqual(prev.searchRequest.departureDate, departureDate) ||
        !_.isEqual(prev.searchRequest.returnDate, returnDate)) &&
      isCalendarStrip
    ) {
      this._raiseSatelliteEvent();
    }
  }

  _raiseSatelliteEvent = () => {
    const {
      getFlightSelectPagePlacementsFn,
      isCalendarStrip,
      multiSelectGroupState: { isSelected: isMultiSelectGroup },
      params: { direction },
      setCalendarStripFn
    } = this.props;

    let page = getPageIdentifier(location);

    getFlightSelectPagePlacementsFn(direction).then(() => {
      if (isCalendarStrip) {
        setCalendarStripFn(false);
      }

      if (isMultiSelectGroup && direction === OUTBOUND) {
        page = ANALYTICS.MULTI_SELECT_OUTBOUND_BOUNDS_PAGE.page;

        raiseSatelliteEvent('otter', { page });
      } else if (!isMultiSelectGroup) {
        raiseSatelliteEvent('otter', { page });
      }
    });
  };

  _generateCalendarStripProps = (
    isOutbound: boolean,
    response: FlightShoppingPageResponseType,
    lastBookableDate: string,
    multiSelectGroup: FlightShoppingMultiSelectPageType
  ): * => {
    const { outboundPage, inboundPage } = response.flightShoppingPage || multiSelectGroup.response || {};
    const departDate = _.get(outboundPage, 'header.selectedDate', '');
    const returnDate = _.get(inboundPage, 'header.selectedDate', '');

    return generateCalendarStrip({ isOutbound, departDate, returnDate, lastBookableDate });
  };

  _onProductSelected = (
    flightCardIndex: number,
    airportInfo: string,
    disclaimerWithLinks: ?string,
    isPromoCodeApplied: boolean,
    card: FlightProductCard
  ): void => {
    const {
      searchRequest,
      selectedProducts,
      params: { direction, paxType = PassengerTypes.ADULT },
      flightShoppingPage,
      multiSelectGroupState: { isSelected: isMultiSelectGroup }
    } = this.props;
    const {
      _links: { flightPricingPage }
    } = flightShoppingPage.response.flightShoppingPage || {};

    const nextProductPageParams = getNextFlightShoppingPageParams(
      { direction, paxType },
      flightShoppingPage.response.flightShoppingPage
    );
    const sortStrategy = _.get(flightShoppingPage, `sortBy.${paxType}.${direction}`);

    this.props.selectFareFn({
      flightDetails: {
        flightCardIndex,
        card,
        searchRequest,
        disclaimerWithLinks,
        isPromoCodeApplied,
        params: { direction, paxType },
        nextProductPageParams,
        sortStrategy,
        flightPricingPage,
        selectedProducts
      },
      currentDirection: direction,
      isMultiSelectGroup
    });
  };

  _returnCurrencyTypeFromSwitchControlOption = (selectedCurrencyType: CurrencySwitchControlOption) => {
    if (_.get(this.props, 'searchRequest.currencyType') !== selectedCurrencyType.value) {
      this._onCurrencySwitchSelect(selectedCurrencyType.value);
    }
  };

  _onCurrencySwitchSelect = (selectedCurrencyType: CurrencySuit) => {
    const {
      multiSelectGroupState,
      searchForMultiSelectGroupFlightsFn
    } = this.props;
    const searchRequest = _.merge({}, this.props.searchRequest, { currencyType: selectedCurrencyType });

    const isMultiSelectGroup = searchRequest?.multiSelectGroup?.isSelected;

    isMultiSelectGroup
      ? searchForMultiSelectGroupFlightsFn({ searchRequest, multiSelectGroup: multiSelectGroupState })
      : this.props.getProductListFn({ searchRequest });
    this._raiseSatelliteEvent();
  };

  _shouldShowInvalidDepartDateDialog = (selectedDate: string) => {
    const {
      flightShoppingPage,
      params: { direction }
    } = this.props;
    const returnDate = _.get(flightShoppingPage, 'response.flightShoppingPage.inboundPage.header.selectedDate', '');
    const isOutbound = direction === OUTBOUND;

    return isOutbound && returnDate && dayjs(selectedDate).isAfter(returnDate, 'day');
  };

  _onCancelClick = (onDateSelectedCallback: OnDateSelectedCallback) => {
    const { hideDialogFn } = this.props;

    onDateSelectedCallback(true);
    hideDialogFn && hideDialogFn();
  };

  _onContinueClick = (selectedDate: string, onDateSelectedCallback: OnDateSelectedCallback) => {
    const { hideDialogFn } = this.props;

    hideDialogFn &&
      hideDialogFn().then(() => {
        this._onSelectionConfirmed(selectedDate, true, onDateSelectedCallback);
      });
  };

  _showInvalidDepartDateDialog = (selectedDate: string, onDateSelectedCallback: OnDateSelectedCallback) => {
    const { showDialogFn } = this.props;

    showDialogFn &&
      showDialogFn({
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__CANCEL'),
            onClick: () => this._onCancelClick(onDateSelectedCallback)
          },
          {
            label: i18n('SHARED__BUTTON_TEXT__CONTINUE'),
            onClick: () => this._onContinueClick(selectedDate, onDateSelectedCallback),
            style: PRIMARY
          }
        ],
        name: 'air-booking-calendar-strip-invalid-depart-date',
        message: i18n('SHARED__CALENDAR__SELECTED_DATE_AFTER_RETURN_DATE')
      });
  };

  _onCalendarStripSelect = (newDate: string, onDateSelectedCallback: OnDateSelectedCallback) => {
    if (this._shouldShowInvalidDepartDateDialog(newDate)) {
      this._showInvalidDepartDateDialog(newDate, onDateSelectedCallback);
    } else {
      this._onSelectionConfirmed(newDate, false, onDateSelectedCallback);
    }
  };

  _onSelectionConfirmed = (
    selectedDate: string,
    isOverrideEndDate: boolean,
    onDateSelectedCallback: OnDateSelectedCallback
  ) => {
    const { setCalendarStripFn } = this.props;

    setCalendarStripFn(true);
    onDateSelectedCallback(false, selectedDate);
    this._getProductList(selectedDate, isOverrideEndDate);
  };

  _getProductList = (newDate: string, isOverrideEndDate: boolean = false) => {
    const {
      getProductListFn,
      multiSelectGroupState,
      params: { direction },
      searchForMultiSelectGroupFlightsFn
    } = this.props;
    const departureAndReturnDate = getCalendarReturnAndDepartureDate({
      direction,
      newDate,
      isOverrideEndDate,
      defaultReturnDate: this.props.searchRequest.returnDate
    });
    const searchRequest = _.merge({}, this.props.searchRequest, departureAndReturnDate);
    const multiSelectBound = Object.keys(this.props.flightShoppingPage.multiSelectGroup).length !== 0;
    const isOutbound = direction === OUTBOUND;

    if (multiSelectBound && isOutbound) {
      searchForMultiSelectGroupFlightsFn({
        multiSelectGroup: multiSelectGroupState,
        searchRequest,
        shouldSaveSearchRequest: false
      });
    } else {
      getProductListFn({ searchRequest });
    }
  };

  _onSortBySelectChange = (sortStrategy: string) => {
    const { direction, paxType = PassengerTypes.ADULT } = this.props.params;

    this.props.sortFlightProductsFn(sortStrategy, direction, paxType);
  };

  _getFlightShoppingPageAdditionalTemplateData = () => {
    const { customerInfo, rapidRewardsDetails } = this.props;

    return {
      name: `${_.get(customerInfo, 'name.firstName')} ${_.get(customerInfo, 'name.lastName')}`,
      points: formatCurrency(_.get(rapidRewardsDetails, 'redeemablePoints'), 0),
      tierStatus: rapidRewardsDetails && TierTypes[_.get(rapidRewardsDetails, 'tierInfo.tier')]
    };
  };

  _renderCompanyNameConditionally() {
    const { selectedCompanyName } = this.props;

    return selectedCompanyName ? <CompanyNameBanner selectedCompanyName={selectedCompanyName} /> : null;
  }

  _renderFlightCards = ({
    cards,
    currencyType,
    airportInfo,
    disclaimerWithLinks,
    isPromoCodeApplied
  }: {
    cards?: FlightProductCard[],
    currencyType: CurrencySuit,
    airportInfo: string,
    disclaimerWithLinks: ?string,
    isPromoCodeApplied: boolean
  }) =>
    _.map(cards, (productCard, index: number) => (
      <div
        key={productCard._meta.cardId + currencyType}
        className="flight-shopping-page--product-card"
        data-qa={`flight-${productCard.flightNumbers}`}
      >
        <FlightProduct
          flightProductCard={productCard}
          onProductSelected={this._onProductSelected.bind(
            this,
            index,
            airportInfo,
            disclaimerWithLinks,
            isPromoCodeApplied
          )}
          isPromoCodeApplied={isPromoCodeApplied}
        />
      </div>
    ));

  _searchFlightsFromBound = (originAirport: string, destinationAirport: string, isBoundDrawerOpen: boolean) => {
    const {
      multiSelectGroupState,
      searchRequest,
      saveSearchRequestFn,
      searchForFlightsFn,
      resetMultiSelectBoundSelectionFn
    } = this.props;

    if (isBoundDrawerOpen) {
      resetMultiSelectBoundSelectionFn();
    } else {
      const cloneSearchRequest = _.omit(searchRequest, [
        'multiSelectGroup',
        'multipleOriginationAirports',
        'multipleOriginationAirportGroupName',
        'multipleDestinationAirports',
        'multipleDestinationAirportGroupName'
      ]);

      cloneSearchRequest['origin'] = originAirport;
      cloneSearchRequest['destination'] = destinationAirport;
      saveSearchRequestFn(cloneSearchRequest);
      searchForFlightsFn({
        multiSelectGroup: multiSelectGroupState,
        preventFlowStatusChange: true,
        searchRequest: cloneSearchRequest,
        shouldSaveSearchRequest: false,
        shouldUpdateMultiSelectBound: true
      });
    }
  };

  _checkForUnavailableMultiSelectGroup = (originAirport: string, destinationAirport: string) => {
    const { multiSelectGroupState } = this.props;
    const unavailableMultiSelectGroup = multiSelectGroupState?.unavailableGroup;

    if (unavailableMultiSelectGroup) {
      return unavailableMultiSelectGroup.some(
        (mulitSelectGroup) =>
          mulitSelectGroup.origin === originAirport && mulitSelectGroup.destination === destinationAirport
      );
    }

    return false;
  };

  _scrollIntoMultiSelectBound = () => {
    const { boundRef } = this.state;
    const { flightShoppingPage, searchRequest } = this.props;

    const { multiSelectGroup, response } = flightShoppingPage;
    const multiSelectBoundSelected = multiSelectGroup?.selectedBound;
    const bounds = multiSelectGroup?.response.outboundPage.bounds;
    const shouldScrollToBoundIndex =
      response.flightShoppingPage &&
      multiSelectBoundSelected?.originBoundAirport &&
      multiSelectBoundSelected?.destinationBoundAirport &&
      searchRequest?.origin === multiSelectBoundSelected?.originBoundAirport &&
      searchRequest?.destination === multiSelectBoundSelected?.destinationBoundAirport;

    if (shouldScrollToBoundIndex && bounds) {
      const index = bounds.findIndex(
        (element) =>
          element.originAirport === multiSelectBoundSelected?.originBoundAirport &&
          element.destinationAirport === multiSelectBoundSelected?.destinationBoundAirport
      );

      boundRef[index] &&
        boundRef[index].current &&
        boundRef[index].current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  render() {
    const {
      flightShoppingPage,
      isWebView,
      lastBookableDate,
      placements = {},
      searchRequest: { numberOfLapInfants = 0 } = {},
      trackCalendarStripFn,
      isLoggedIn
    } = this.props;
    const { direction, paxType = PassengerTypes.ADULT } = this.props.params;
    const isOutbound = direction === OUTBOUND;
    const page = _.find(flightShoppingPage.pages, { paxType, direction });
    const { multiSelectGroup, response } = flightShoppingPage;
    const calendarStripProps = this._generateCalendarStripProps(
      isOutbound,
      response,
      lastBookableDate,
      multiSelectGroup
    );
    const {
      _meta = {},
      messages = [],
      disclaimerWithLinks,
      promoCodeNotice,
      showSgaMessage,
      productDefinitions = {}
    } = response.flightShoppingPage || multiSelectGroup.response || {};
    const { isPromoCodeApplied } = _meta;
    const { disclaimers = [], highlightedFeatures = [] } = productDefinitions;
    const sgaMessage = transformToSGAMessage(messages);
    const { currencyType } = this.props.searchRequest;
    const sortByValue = flightShoppingPage.sortBy[paxType][direction];
    const hasLapChild = numberOfLapInfants > 0;
    const shouldShowCurrencySwitch = direction !== 'inbound' && !hasLapChild;
    const airportInfo = _.get(page, 'header.airportInfo', '');
    const cards = page && page.cards;
    const sortingOptions = getSortingOptions(paxType);
    const multiSelectHeader = _.get(multiSelectGroup, 'response.outboundPage.header', '');
    const bounds = _.get(multiSelectGroup, 'response.outboundPage.bounds', '');
    const { promoTop01, bottomPromo1 } = placements;
    let multiSelectBoundSelected = _.get(multiSelectGroup, 'selectedBound', {});
    let originAirport = _.get(page, 'header.originAirport', '');
    let destinationAirport = _.get(page, 'header.destinationAirport', '');

    if (!isOutbound) {
      multiSelectBoundSelected = {};
    }

    if (isOutbound && multiSelectHeader) {
      originAirport = multiSelectHeader.originAirport;
      destinationAirport = multiSelectHeader.destinationAirport;
    }

    const shouldShowSortButton =
      !isOutbound ||
      multiSelectBoundSelected.originBoundAirport ||
      (_.isEmpty(multiSelectGroup.response) && response.flightShoppingPage);

    return (
      <div>
        {(response.flightShoppingPage || !_.isEmpty(multiSelectGroup.response)) && ( // Don't draw any of the page until the Chapi request is complete, this allows hybrid to navigate to the page without drawing an incomplete page
          <div>
            <PageHeader>
              <div className="flight-shopping-page--title">
                <span className="flight-shopping-page--bound-info">{`Select ${
                  isOutbound ? 'Departing' : 'Returning'
                } Flight`}</span>
              </div>
              {shouldShowSortButton && (
                <ButtonDropDown
                  className="shopping-dropdown"
                  options={sortingOptions}
                  value={sortByValue}
                  label={SortingOptions.SORT}
                  onChange={this._onSortBySelectChange}
                />
              )}
            </PageHeader>
            {showSgaMessage && (
              <FlightProductSGAMessageBanner
                className="flight-shopping-page--sga-message-banner"
                title={sgaMessage.title}
                message={sgaMessage.text}
              />
            )}
            {!!promoCodeNotice && (
              <FlightProductPromoBanner
                className="flight-shopping-page--promo-code-banner"
                promoCodeNotice={promoCodeNotice}
                isPromoCodeApplied={isPromoCodeApplied}
              />
            )}
            {this._renderCompanyNameConditionally()}
            <CalendarStrip
              {...calendarStripProps}
              onDateSelected={this._onCalendarStripSelect}
              disabled={false}
              trackCalendarStripFn={trackCalendarStripFn}
            />
            {originAirport && destinationAirport && (
              <ShoppingAirStationsOverview
                destinationAirport={destinationAirport}
                isOutbound={isOutbound}
                originAirport={originAirport}
              />
            )}
            <div className="flight-shopping-page--products-container">
              <FlightShoppingExplain
                currencySuit={currencyType === 'PTS' ? POINTS : DOLLAR}
                disclaimerWithLinks={disclaimerWithLinks}
                hideRestrictions
                onCurrencySwitchSelect={this._returnCurrencyTypeFromSwitchControlOption}
                showCurrencySwitch={shouldShowCurrencySwitch}
                useAlternateTheme
              />
              {promoTop01 && (
                <DynamicPlacement
                  className="mt5 mb5"
                  {...promoTop01}
                  additionalTemplateData={isLoggedIn && this._getFlightShoppingPageAdditionalTemplateData()}
                  data-qa="promoTop01"
                  isWebView={isWebView}
                />
              )}
              {highlightedFeatures && highlightedFeatures.length > 0 && (
                <HighlightedFeatures highlightedFeatures={highlightedFeatures} />
              )}
              {_.isEmpty(multiSelectBoundSelected) &&
                this._renderFlightCards({ cards, currencyType, airportInfo, disclaimerWithLinks, isPromoCodeApplied })}
              {!_.isEmpty(multiSelectGroup.response) &&
                isOutbound &&
                bounds.map((bound, index) => {
                  const isBoundDrawerOpen =
                    multiSelectBoundSelected?.originBoundAirport === bound.originAirport &&
                    multiSelectBoundSelected?.destinationBoundAirport === bound.destinationAirport;
                  const isBoundUnavailable = this._checkForUnavailableMultiSelectGroup(
                    bound.originAirport,
                    bound.destinationAirport
                  );

                  return (
                    <div
                      key={bound.originAirport + bound.destinationAirport}
                      className="flight-shopping-page--bound-card"
                      ref={this.state.boundRef[index]}
                    >
                      <FlightBoundDrawer
                        bound={bound}
                        searchFlightsFromBound={this._searchFlightsFromBound}
                        isBoundDrawerOpen={isBoundDrawerOpen}
                        isBoundUnavailable={isBoundUnavailable}
                      />
                      {isBoundDrawerOpen &&
                        this._renderFlightCards({
                          cards,
                          currencyType,
                          airportInfo,
                          disclaimerWithLinks,
                          isPromoCodeApplied
                        })}
                      {isBoundDrawerOpen && this._scrollIntoMultiSelectBound()}
                    </div>
                  );
                })}
              {bottomPromo1 && <DynamicPlacement {...bottomPromo1} data-qa="bottomPromo1" isWebView={isWebView} />}
            </div>
            <div className="flight-shopping-page--footer">
              <div className="white px4 pb5">
                <Footnotes footnotes={disclaimers} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customerInfo: _.get(state, 'app.account.accountInfo.customerInfo'),
  flightShoppingPage: _.get(state, 'app.airBooking.flightShoppingPage'),
  isCalendarStrip: state?.analytics?.AirBookingStore?.isCalendarStrip,
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  isWebView: _.get(state, 'app.webView.isWebView'),
  lastBookableDate: _.get(state, 'app.lastBookableDate'),
  multiSelectGroupState: state?.app?.airports?.multiSelectGroup,
  placements: _.get(state, 'app.airBooking.flightSelectPagePlacements'),
  rapidRewardsDetails: _.get(state, 'app.account.accountInfo.rapidRewardsDetails'),
  searchRequest: _.get(state, 'app.airBooking.searchRequest'),
  selectedCompanyName: _.get(state, 'app.account.corporateInfo.selectedCompany.companyName'),
  selectedProducts: _.get(state, 'app.airBooking.selectedProducts')
});

const mapDispatchToProps = {
  fetchFlightShoppingPageSuccessFn: AirBookingActions.fetchFlightShoppingPageSuccess,
  getFlightSelectPagePlacementsFn: AirBookingActions.getFlightSelectPagePlacements,
  getProductListFn: AirBookingActions.getProductList,
  getUserInfoFn: getUserInfo,
  hideDialogFn: hideDialog,
  resetMultiSelectBoundSelectionFn: AirBookingActions.resetMultiSelectBoundSelection,
  saveSearchRequestFn: AirBookingActions.saveSearchRequest,
  searchForFlightsFn: AirBookingActions.searchForFlights,
  searchForMultiSelectGroupFlightsFn: AirBookingActions.searchForMultiSelectGroupFlights,
  selectFareFn: AirBookingActions.selectFare,
  setCalendarStripFn: AirBookingActions.setCalendarStrip,
  showDialogFn: showDialog,
  sortFlightProductsFn: AirBookingActions.sortFlightProducts,
  trackCalendarStripFn: trackCalendarStrip,
  updatetMultiSelectGroupCurrentDirectionFn: updatetMultiSelectGroupCurrentDirection,
  updateMultiSelectBoundFn: AirBookingActions.updateMultiSelectBound
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withBodyClass('flight-shopping-page'),
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(FlightShoppingPage);
