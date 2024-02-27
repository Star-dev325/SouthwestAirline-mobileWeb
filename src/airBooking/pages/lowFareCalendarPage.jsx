// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { DOLLAR } from 'src/shared/constants/currencyTypes';
import { calendarScrollFunctions } from 'src/airBooking/helpers/lowFareHelper';
import PageHeader from 'src/shared/components/pageHeader';
import MoneyOrPointsSwitchButton from 'src/shared/components/moneyOrPointsSwitchButton';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import LowFareBound from 'src/airBooking/components/lowFareBound';
import LowFareSelection from 'src/airBooking/components/lowFareSelection';
import Button from 'src/shared/components/button';
import ErrorHeader from 'src/shared/components/errorHeader/errorHeader';
import { showDialog } from 'src/shared/actions/dialogActions';
import i18n from '@swa-ui/locale';

import { PRIMARY } from 'src/shared/constants/buttonPopupStyleTypes';

import type { CurrencySwitchControlOption } from 'src/shared/components/moneyOrPointsSwitchButton';

import {
  getNextLowFareCalendarOutboundPage,
  getPrevLowFareCalendarOutboundPage,
  getNextLowFareCalendarInboundPage,
  getPrevLowFareCalendarInboundPage,
  selectLowFareCalendarOutboundDate,
  selectLowFareCalendarInboundDate,
  getLowFareCalendar,
  searchForFlights
} from 'src/airBooking/actions/airBookingActions';
import { getFirstShoppingPageParams } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';
import type { LowFareBoundType, LowFareMessage } from 'src/airBooking/flow-typed/lowFare.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { ButtonsPopupType } from 'src/shared/flow-typed/dialog.types';

type Props = {
  push: Push,
  outboundPage: LowFareBoundType,
  inboundPage?: LowFareBoundType,
  searchRequest: FlightProductSearchRequest,
  lowFareCalendarSelectedDates?: { inboundDate?: string, outboundDate?: string },
  showLoadingOutboundPrev: boolean,
  showLoadingOutboundNext: boolean,
  showLoadingInboundPrev: boolean,
  showLoadingInboundNext: boolean,
  getPrevLowFareCalendarOutboundPageFn: (FlightProductSearchRequest, LowFareBoundType) => void,
  getNextLowFareCalendarOutboundPageFn: (FlightProductSearchRequest, LowFareBoundType) => void,
  getPrevLowFareCalendarInboundPageFn: (FlightProductSearchRequest, ?LowFareBoundType) => void,
  getNextLowFareCalendarInboundPageFn: (FlightProductSearchRequest, ?LowFareBoundType) => void,
  selectLowFareCalendarInboundDateFn: (date: string) => void,
  selectLowFareCalendarOutboundDateFn: (date: string) => void,
  getLowFareCalendarFn: (searchRequest: FlightProductSearchRequest, path: ?string, isInitialSearch: boolean) => void,
  disclaimerWithLinks: ?string,
  searchForFlightsFn: ({
    searchRequest: FlightProductSearchRequest,
    nextPagePath?: string,
    preventFlowStatusChange?: boolean
  }) => void,
  lowFareCalendarMessages?: LowFareMessage[],
  showDialogFn: (dialogOptions: ButtonsPopupType) => void
};

export class LowFareCalendarPage extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this._setOutboundCalRef = (element: *) => {
      this.outboundCalRef = element;
    };
    this._setInboundCalRef = (element: *) => {
      this.inboundCalRef = element;
    };
  }

  componentDidMount() {
    this._setDefaultSelections();
  }

  _setOutboundCalRef: (element: *) => void;
  _setInboundCalRef: (element: *) => void;
  outboundCalRef: *;
  inboundCalRef: *;

  _setDefaultSelections = () => {
    const {
      searchRequest: { departureDate, returnDate },
      lowFareCalendarSelectedDates
    } = this.props;
    const departureDay =
      lowFareCalendarSelectedDates && lowFareCalendarSelectedDates.outboundDate
        ? lowFareCalendarSelectedDates.outboundDate
        : departureDate;
    const returnDay =
      lowFareCalendarSelectedDates && lowFareCalendarSelectedDates.inboundDate
        ? lowFareCalendarSelectedDates.inboundDate
        : returnDate;

    const departurePriceBarEl = departureDay
      ? document.querySelectorAll(`.low-fare-outbound [data-date="${departureDay}"]`)
      : null;
    const returnPriceBarEl = returnDay
      ? document.querySelectorAll(`.low-fare-inbound [data-date="${returnDay}"]`)
      : null;

    if (departurePriceBarEl && departurePriceBarEl[0]) {
      calendarScrollFunctions.focusOnPriceBar(this.outboundCalRef, departurePriceBarEl[0], true);
    }

    if (returnPriceBarEl && returnPriceBarEl[0]) {
      calendarScrollFunctions.focusOnPriceBar(this.inboundCalRef, returnPriceBarEl[0], true);
    }
  };

  _buildSearchRequest = ({
    departureDate,
    origin,
    destination
  }: {
    departureDate: string,
    origin: ?string,
    destination: ?string
  }): FlightProductSearchRequest => {
    const {
      searchRequest: { numberOfAdults, promoCode, currencyType }
    } = this.props;

    return {
      origin,
      destination,
      numberOfAdults,
      useLowFareCalendar: true,
      promoCode,
      currencyType,
      isRoundTrip: false,
      tripType: 'oneWay',
      departureDate,
      returnDate: ''
    };
  };

  _getPrevOutboundLowFareCalendarPage = (departureDate: string, origin: ?string, destination: ?string) => {
    const { outboundPage, getPrevLowFareCalendarOutboundPageFn } = this.props;
    const searchRequest = this._buildSearchRequest({ origin, destination, departureDate });

    getPrevLowFareCalendarOutboundPageFn(searchRequest, outboundPage);
  };

  _getNextOutboundLowFareCalendarPage = (departureDate: string, origin: ?string, destination: ?string) => {
    const { outboundPage, getNextLowFareCalendarOutboundPageFn } = this.props;
    const searchRequest = this._buildSearchRequest({ origin, destination, departureDate });

    getNextLowFareCalendarOutboundPageFn(searchRequest, outboundPage);
  };

  _getPrevInboundLowFareCalendarPage = (departureDate: string, origin: ?string, destination: ?string) => {
    const { inboundPage, getPrevLowFareCalendarInboundPageFn } = this.props;
    const nextSearchRequest = this._buildSearchRequest({ origin, destination, departureDate });

    getPrevLowFareCalendarInboundPageFn(nextSearchRequest, inboundPage);
  };

  _getNextInboundLowFareCalendarPage = (departureDate: string, origin: ?string, destination: ?string) => {
    const { inboundPage, getNextLowFareCalendarInboundPageFn } = this.props;
    const searchRequest = this._buildSearchRequest({ origin, destination, departureDate });

    getNextLowFareCalendarInboundPageFn(searchRequest, inboundPage);
  };

  _onSelectOutBoundDate = (date: string, el: HTMLElement) => {
    this.props.selectLowFareCalendarOutboundDateFn(date);
    calendarScrollFunctions.focusOnPriceBar(this.outboundCalRef, el);
  };

  _onSelectInBoundDate = (date: string, el: HTMLElement) => {
    this.props.selectLowFareCalendarInboundDateFn(date);
    calendarScrollFunctions.focusOnPriceBar(this.inboundCalRef, el);
  };

  _generateNewSearchRequestWithSelected = (): FlightProductSearchRequest => {
    const { searchRequest, lowFareCalendarSelectedDates } = this.props;
    const departureDate = _.get(lowFareCalendarSelectedDates, 'outboundDate', searchRequest.departureDate);
    const returnDate = _.get(lowFareCalendarSelectedDates, 'inboundDate', searchRequest.returnDate);

    return _.merge({}, searchRequest, {
      departureDate,
      returnDate
    });
  };

  _onCurrencySwitchSelect = (selectedCurrencyOption: CurrencySwitchControlOption) => {
    const { getLowFareCalendarFn, showDialogFn, searchRequest } = this.props;

    if (searchRequest.currencyType !== selectedCurrencyOption.value) {
      const newSearchRequest = this._generateNewSearchRequestWithSelected();
      const hasSelectedDates = this._hasSelectedDates(newSearchRequest);

      if (hasSelectedDates) {
        _.set(newSearchRequest, 'currencyType', selectedCurrencyOption.value);
        getLowFareCalendarFn(newSearchRequest, undefined, false);
      } else {
        showDialogFn({
          message: i18n('AIR_BOOKING__ERROR__LFC__MISSING_BOUNDS'),
          closeLabel: i18n('SHARED__BUTTON_TEXT__OK'),
          closeLabelStyle: PRIMARY
        });
      }
    }
  };

  _goToDateSelectCalendar = () => {
    this.props.push(getNormalizedRoute({ routeName: 'lowFareCalendarDate' }));
  };

  _onClickSelectFlights = () => {
    const { searchForFlightsFn, showDialogFn } = this.props;
    const newSearchRequest = this._generateNewSearchRequestWithSelected();
    const hasSelectedDates = this._hasSelectedDates(newSearchRequest);
    const nextPagePath = buildPathWithParamAndQuery(
      getNormalizedRoute({ routeName: 'flightShoppingDepart' }),
      getFirstShoppingPageParams()
    );

    hasSelectedDates
      ? searchForFlightsFn({
        searchRequest: newSearchRequest,
        nextPagePath,
        preventFlowStatusChange: true
      })
      : showDialogFn({
        message: i18n('AIR_BOOKING__ERROR__LFC__MISSING_BOUNDS'),
        closeLabel: i18n('SHARED__BUTTON_TEXT__OK'),
        closeLabelStyle: PRIMARY
      });
  };

  _hasSelectedDates = (newSearchRequest: FlightProductSearchRequest) => {
    const { lowFareCalendarSelectedDates } = this.props;
    const { isRoundTrip, departureDate, returnDate } = newSearchRequest;

    if (lowFareCalendarSelectedDates) {
      const { inboundDate, outboundDate } = lowFareCalendarSelectedDates;

      return isRoundTrip ? !!(outboundDate && inboundDate) : !!outboundDate;
    }

    return isRoundTrip ? departureDate && returnDate : !!departureDate;
  };

  render() {
    const {
      outboundPage,
      searchRequest,
      lowFareCalendarSelectedDates,
      inboundPage,
      showLoadingOutboundPrev,
      showLoadingOutboundNext,
      showLoadingInboundPrev,
      showLoadingInboundNext,
      disclaimerWithLinks,
      lowFareCalendarMessages
    } = this.props;
    const { currencyType = DOLLAR, origin, destination, numberOfLapInfants = 0 } = searchRequest;
    const outboundLowFareCalendarDays = _.get(outboundPage, 'lowFareCalendarDays');
    const inboundLowFareCalendarDays = _.get(inboundPage, 'lowFareCalendarDays');
    const outboundPrevDepartureDate = _.get(outboundPage, '_links.previousLowFareCalendarPage.query.departure-date');
    const outboundNextDepartureDate = _.get(outboundPage, '_links.nextLowFareCalendarPage.query.departure-date');
    const inboundPrevDepartureDate = _.get(inboundPage, '_links.previousLowFareCalendarPage.query.departure-date');
    const inboundNextDepartureDate = _.get(inboundPage, '_links.nextLowFareCalendarPage.query.departure-date');
    const headerAirportInfo = _.get(outboundPage, 'header.airportInfo', '');
    const selectedOutboundDate = _.get(lowFareCalendarSelectedDates, 'outboundDate');
    const selectedInboundDate = _.get(lowFareCalendarSelectedDates, 'inboundDate');
    const shouldShowUnselectableBars =
      !_.isEmpty(outboundLowFareCalendarDays) && !_.isEmpty(inboundLowFareCalendarDays);
    const outboundInvertedBoundErrorMessage = i18n('AIR_BOOKING__ERROR__LFC__INVERTED_BOUNDS_DEPART');
    const inboundInvertedBoundErrorMessage = i18n('AIR_BOOKING__ERROR__LFC__INVERTED_BOUNDS_RETURN');
    const noFlightsMessage =
      lowFareCalendarMessages &&
      lowFareCalendarMessages.find((message) => message.key === 'ERROR__LFC__NO_FLIGHTS_AVAILABLE');
    const hasLapChild = numberOfLapInfants > 0;

    return (
      <div className="low-fare-calendar-page">
        <PageHeader className="low-fare-calendar-page--header py4">
          <span>
            {i18n('AIR_BOOKING__LOW_FARE_CALENDAR__HEADER')} {headerAirportInfo}
          </span>
          {!hasLapChild && (
            <MoneyOrPointsSwitchButton onSelect={this._onCurrencySwitchSelect} value={currencyType} darkTheme />
          )}
        </PageHeader>
        {noFlightsMessage && <ErrorHeader errorMessage={noFlightsMessage.body} />}
        {disclaimerWithLinks && (
          <div data-qa="dot-message-block" className="bgpdkblue white p5">
            <p dangerouslySetInnerHTML={{ __html: disclaimerWithLinks }} />
          </div>
        )}
        {outboundLowFareCalendarDays && (
          <LowFareBound
            boundRef={this._setOutboundCalRef}
            boundClassName={'low-fare-outbound'}
            selectedDate={selectedOutboundDate}
            otherBoundSelectedDate={selectedInboundDate}
            onSelectDate={this._onSelectOutBoundDate}
            lowFareCalendarDays={outboundLowFareCalendarDays}
            showFetchPrev={!!outboundPrevDepartureDate}
            showFetchNext={!!outboundNextDepartureDate}
            showLoadingPrev={showLoadingOutboundPrev}
            showLoadingNext={showLoadingOutboundNext}
            onClickGetPrevCalendar={() => {
              this._getPrevOutboundLowFareCalendarPage(outboundPrevDepartureDate, origin, destination);
            }}
            onClickGetNextCalendar={() => {
              this._getNextOutboundLowFareCalendarPage(outboundNextDepartureDate, origin, destination);
            }}
            onClickCalendarIconFn={this._goToDateSelectCalendar}
            shouldShowUnselectableBars={shouldShowUnselectableBars}
            unselectableBarClickedMessage={outboundInvertedBoundErrorMessage}
          />
        )}
        {inboundLowFareCalendarDays && (
          <LowFareBound
            boundRef={this._setInboundCalRef}
            boundClassName={'low-fare-inbound'}
            isInbound
            selectedDate={selectedInboundDate}
            otherBoundSelectedDate={selectedOutboundDate}
            onSelectDate={this._onSelectInBoundDate}
            lowFareCalendarDays={inboundLowFareCalendarDays}
            showFetchPrev={!!inboundPrevDepartureDate}
            showFetchNext={!!inboundNextDepartureDate}
            showLoadingPrev={showLoadingInboundPrev}
            showLoadingNext={showLoadingInboundNext}
            onClickGetPrevCalendar={() => {
              this._getPrevInboundLowFareCalendarPage(inboundPrevDepartureDate, destination, origin);
            }}
            onClickGetNextCalendar={() => {
              this._getNextInboundLowFareCalendarPage(inboundNextDepartureDate, destination, origin);
            }}
            onClickCalendarIconFn={this._goToDateSelectCalendar}
            shouldShowUnselectableBars={shouldShowUnselectableBars}
            unselectableBarClickedMessage={inboundInvertedBoundErrorMessage}
          />
        )}
        <div className={`low-fare-calendar-page--selections ${!inboundPage ? 'one-way' : ''}`}>
          {outboundPage && (
            <LowFareSelection
              selectionDate={selectedOutboundDate}
              selectionClass="outbound"
              header="Selected Depart"
              origin={origin}
              destination={destination}
            />
          )}
          {inboundPage && (
            <LowFareSelection
              selectionDate={selectedInboundDate}
              selectionClass="inbound"
              header="Selected Return"
              origin={destination}
              destination={origin}
            />
          )}
        </div>
        <div className="p4 bgpblue">
          <Button className="continue" onClick={this._onClickSelectFlights} color="yellow" size="larger" fluid>
            {i18n('AIR_BOOKING__SELECT_FLIGHTS')}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lowFareCalendarSelectedDates: _.get(state, 'app.airBooking.lowFareCalendar.selectedDates'),
  outboundPage: _.get(state, 'app.airBooking.lowFareCalendar.outboundPage'),
  inboundPage: _.get(state, 'app.airBooking.lowFareCalendar.inboundPage'),
  searchRequest: _.get(state, 'app.airBooking.searchRequest'),
  showLoadingOutboundPrev: _.get(state, 'app.airBooking.lowFareCalendar.showLoadingPrevNext.outboundPrev'),
  showLoadingOutboundNext: _.get(state, 'app.airBooking.lowFareCalendar.showLoadingPrevNext.outboundNext'),
  showLoadingInboundPrev: _.get(state, 'app.airBooking.lowFareCalendar.showLoadingPrevNext.inboundPrev'),
  showLoadingInboundNext: _.get(state, 'app.airBooking.lowFareCalendar.showLoadingPrevNext.inboundNext'),
  disclaimerWithLinks: _.get(state, 'app.airBooking.lowFareCalendar.response.lowFareCalendarPage.disclaimerWithLinks'),
  lowFareCalendarMessages: _.get(state, 'app.airBooking.lowFareCalendar.response.lowFareCalendarPage.messages')
});

const mapDispatchToProps = {
  selectLowFareCalendarOutboundDateFn: selectLowFareCalendarOutboundDate,
  selectLowFareCalendarInboundDateFn: selectLowFareCalendarInboundDate,
  getPrevLowFareCalendarOutboundPageFn: getPrevLowFareCalendarOutboundPage,
  getNextLowFareCalendarOutboundPageFn: getNextLowFareCalendarOutboundPage,
  getPrevLowFareCalendarInboundPageFn: getPrevLowFareCalendarInboundPage,
  getNextLowFareCalendarInboundPageFn: getNextLowFareCalendarInboundPage,
  getLowFareCalendarFn: getLowFareCalendar,
  searchForFlightsFn: searchForFlights,
  showDialogFn: showDialog
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(LowFareCalendarPage);
