import React from 'react';
import _ from 'lodash';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import FakeClock from 'test/unit/helpers/fakeClock';
import { calendarScrollFunctions } from 'src/airBooking/helpers/lowFareHelper';
import { LowFareCalendarPage } from 'src/airBooking/pages/lowFareCalendarPage';
import responseOneWayPoints from 'mocks/templates/airReservation/lowFareCalendarPageOneWayPoints';
import responseRoundTripBothPrevNextLinks from 'mocks/templates/airReservation/lowFareCalendarPageRoundTripWithPrevNextData';
import lowFareCalendarPageNullSelectionData from 'mocks/templates/airReservation/lowFareCalendarPageNullSelectionData';
import lowFareCalendarPageRoundTrip from 'mocks/templates/airReservation/lowFareCalendarPageRoundTrip';
import i18n from '@swa-ui/locale';
import { airBookingRoutes } from "src/airBooking/constants/airBookingRoutes";
import BrowserObject from 'src/shared/helpers/browserObject';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { Provider } from 'react-redux';

describe('lowFareCalendarPage', () => {
  let getPrevLowFareCalendarOutboundPageFnStub;
  let getNextLowFareCalendarOutboundPageFnStub;
  let getPrevLowFareCalendarInboundPageFnStub;
  let getNextLowFareCalendarInboundPageFnStub;
  let selectLowFareCalendarInboundDateFnStub;
  let selectLowFareCalendarOutboundDateFnStub;
  let getLowFareCalendarFnStub;
  let searchForFlightsFnStub;
  let showDialogStub;
  let pushStub;

  beforeEach(() => {
    BrowserObject.location = { pathname: airBookingRoutes.lowFareCalendar.canonicalPath };

    FakeClock.setTimeTo('2019-01-15T11:19');
    getPrevLowFareCalendarOutboundPageFnStub = jest.fn();
    getNextLowFareCalendarOutboundPageFnStub = jest.fn();
    getPrevLowFareCalendarInboundPageFnStub = jest.fn();
    getNextLowFareCalendarInboundPageFnStub = jest.fn();
    selectLowFareCalendarInboundDateFnStub = jest.fn();
    selectLowFareCalendarOutboundDateFnStub = jest.fn();
    getLowFareCalendarFnStub = jest.fn();
    searchForFlightsFnStub = jest.fn();
    pushStub = jest.fn();
    showDialogStub = jest.fn();
  });

  afterEach(() => {
    FakeClock.restore();
  });

  describe('render', () => {
    it('should render', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should have the right airport info populated in the header', () => {
      const { getByText } = createComponent();

      expect(getByText('AIR_BOOKING__LOW_FARE_CALENDAR__HEADER AUS - ATL')).toBeInTheDocument();
    });

    it('should have the outbound fare calendar', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.low-fare-outbound').length).toEqual(1);
    });

    it('should have the inbound fare calendar when a round trip', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.low-fare-inbound').length).toEqual(1);
    });

    it('should not have the inbound fare calendar when a one way trip', () => {
      const { container } = createComponent(responseOneWayPoints.lowFareCalendarPage, {
        searchRequest: {
          currencyType: 'PTS',
          tripType: 'oneWay',
          isRoundTrip: false,
          numberOfAdults: 1
        }
      });

      expect(container.querySelectorAll('.low-fare-inbound').length).toEqual(0);
    });

    it('should have DOT messaging container with prop text', () => {
      const { container } = createComponent(undefined, { disclaimerWithLinks: 'This is some WCM-controlled text' });

      expect(container.querySelectorAll('[data-qa="dot-message-block"]').length).toEqual(1);
      expect(container.querySelector('[data-qa="dot-message-block"]')).toHaveTextContent(
        'This is some WCM-controlled text'
      );
    });
    it('should have DOT messaging container with default text', () => {
      const { container } = createComponent(undefined, { disclaimerWithLinks: '' });

      expect(container.querySelectorAll('[data-qa="dot-message-block"]').length).toEqual(0);
    });

    describe('show loading props', () => {
      describe('outbound', () => {
        it('should pass showLoadingPrev as true to outbound LowFareBound when showLoadingOutboundPrev is true', () => {
          const { container } = createComponent(undefined, { showLoadingOutboundPrev: true });
          const fetchPrevNext = container
            .querySelectorAll('.low-fare-calendar')[0]
            .querySelectorAll('.low-fare-calendar--fetch-prev-next');

          expect(fetchPrevNext.length).toEqual(2);
          expect(fetchPrevNext[0].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/loadingEllipses.gif'
          );
          expect(fetchPrevNext[1].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/ic-load-more.png'
          );
        });

        it('should pass showLoadingNext as true to outbound LowFareBound when showLoadingOutboundNext is true', () => {
          const { container } = createComponent(undefined, { showLoadingOutboundNext: true });
          const fetchPrevNext = container
            .querySelectorAll('.low-fare-calendar')[0]
            .querySelectorAll('.low-fare-calendar--fetch-prev-next');

          expect(fetchPrevNext.length).toEqual(2);
          expect(fetchPrevNext[0].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/ic-load-more.png'
          );
          expect(fetchPrevNext[1].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/loadingEllipses.gif'
          );
        });
      });

      describe('in', () => {
        it('should pass showLoadingPrev as true to outbound LowFareBound when showLoadingInboundPrev is true', () => {
          const { container } = createComponent(undefined, { showLoadingInboundPrev: true });
          const fetchPrevNext = container
            .querySelectorAll('.low-fare-calendar')[1]
            .querySelectorAll('.low-fare-calendar--fetch-prev-next');

          expect(fetchPrevNext.length).toEqual(2);
          expect(fetchPrevNext[0].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/loadingEllipses.gif'
          );
          expect(fetchPrevNext[1].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/ic-load-more.png'
          );
        });

        it('should pass showLoadingNext as true to outbound LowFareBound when showLoadingInboundNext is true', () => {
          const { container } = createComponent(undefined, { showLoadingInboundNext: true });
          const fetchPrevNext = container
            .querySelectorAll('.low-fare-calendar')[1]
            .querySelectorAll('.low-fare-calendar--fetch-prev-next');

          expect(fetchPrevNext.length).toEqual(2);
          expect(fetchPrevNext[0].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/ic-load-more.png'
          );
          expect(fetchPrevNext[1].querySelector('.lfc-ic-load-more')).toHaveAttribute(
            'src',
            '/content/mkt/images/landing_pages/loadingEllipses.gif'
          );
        });
      });
    });

    describe('dollars points switch', () => {
      it('should have the dollar/points switch with dollar selected when shopping response is in dollars', () => {
        const { container } = createComponent();

        expect(container.querySelectorAll('.money-or-points').length).toEqual(1);
      });

      it('should have the dollar/points switch with dollar selected when shopping response is in points', () => {
        const { getByText } = createComponent(responseOneWayPoints.lowFareCalendarPage, {
          searchRequest: {
            currencyType: 'PTS',
            tripType: 'oneWay',
            isRoundTrip: false,
            numberOfAdults: 1
          }
        });

        expect(getByText('Pts')).toBeInTheDocument();
      });

      it('should have dollar/points switch when hasLapChild is false', () => {
        const { baseElement } = createComponent(undefined, { searchRequest: { numberOfLapInfants: 0 } });

        expect(baseElement).toMatchSnapshot();
      });

      it('should not have dollar/points switch when hasLapChild is true', () => {
        const { baseElement } = createComponent(undefined, { searchRequest: { numberOfLapInfants: 1 } });

        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('unselectable pricebars', () => {
      it('should set shouldShowUnselectableBars to false when one way trip', () => {
        const { container } = createComponent(responseOneWayPoints.lowFareCalendarPage);

        expect(container.querySelectorAll('.low-fare-outbound').length).toEqual(1);
        expect(container.querySelectorAll('.low-fare-inbound').length).toEqual(0);
      });

      it('should set shouldShowUnselectableBars to true when round trip', () => {
        const { container } = createComponent();

        expect(container.querySelectorAll('.low-fare-outbound').length).toEqual(1);
        expect(container.querySelectorAll('.low-fare-inbound').length).toEqual(1);
      });
    });
  });

  describe('onclick', () => {
    it('should open calendar date select page when clicking calendar icon', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.calendar-select')[1]);

      waitFor(() => {
        expect(pushStub).toHaveBeenCalledWith('/air/booking/shopping/low-fare-calendar/date-select');
      });
    });

    describe('outbound', () => {
      it('should call getPrevLowFareCalendarOutboundPageFnStub when fetch prev is clicked', () => {
        const { container } = createComponent();
        const outbound = container.querySelector('.low-fare-outbound');

        expect(outbound.querySelectorAll('.low-fare-calendar--fetch-prev-next').length).toEqual(2);

        const prev = outbound.querySelectorAll('.low-fare-calendar--fetch-prev-next')[0];

        fireEvent.click(prev);

        expect(getPrevLowFareCalendarOutboundPageFnStub).toHaveBeenCalledWith(
          {
            currencyType: 'USD',
            departureDate: '2020-01-05',
            destination: 'ATL',
            isRoundTrip: false,
            numberOfAdults: 1,
            origin: 'AUS',
            promoCode: '',
            returnDate: '',
            tripType: 'oneWay',
            useLowFareCalendar: true
          },
          responseRoundTripBothPrevNextLinks.lowFareCalendarPage.outboundPage
        );
      });

      it('should call getNextLowFareCalendarOutboundPageFnStub when fetch next is clicked', () => {
        const { container } = createComponent();
        const outbound = container.querySelector('.low-fare-outbound');

        expect(outbound.querySelectorAll('.low-fare-calendar--fetch-prev-next').length).toEqual(2);

        const next = container.querySelectorAll('.low-fare-calendar--fetch-prev-next')[1];

        fireEvent.click(next);

        expect(getNextLowFareCalendarOutboundPageFnStub).toHaveBeenCalledWith(
          {
            currencyType: 'USD',
            departureDate: '2020-02-19',
            destination: 'ATL',
            isRoundTrip: false,
            numberOfAdults: 1,
            origin: 'AUS',
            promoCode: '',
            returnDate: '',
            tripType: 'oneWay',
            useLowFareCalendar: true
          },
          responseRoundTripBothPrevNextLinks.lowFareCalendarPage.outboundPage
        );
      });
    });

    describe('inbound', () => {
      it('should call getPrevLowFareCalendarInboundPageFnStub when fetch prev is clicked', () => {
        const { container } = createComponent();
        const inbound = container.querySelector('.low-fare-inbound');

        expect(inbound.querySelectorAll('.low-fare-calendar--fetch-prev-next').length).toEqual(2);

        const prev = inbound.querySelectorAll('.low-fare-calendar--fetch-prev-next')[0];

        fireEvent.click(prev);

        expect(getPrevLowFareCalendarInboundPageFnStub).toHaveBeenCalledWith(
          {
            currencyType: 'USD',
            departureDate: '2020-01-15',
            destination: 'AUS',
            isRoundTrip: false,
            numberOfAdults: 1,
            origin: 'ATL',
            promoCode: '',
            returnDate: '',
            tripType: 'oneWay',
            useLowFareCalendar: true
          },
          responseRoundTripBothPrevNextLinks.lowFareCalendarPage.inboundPage
        );
      });

      it('should call getNextLowFareCalendarInboundPageFnStub when fetch next is clicked', () => {
        const { container } = createComponent();
        const inbound = container.querySelector('.low-fare-inbound');

        expect(inbound.querySelectorAll('.low-fare-calendar--fetch-prev-next').length).toEqual(2);

        const next = inbound.querySelectorAll('.low-fare-calendar--fetch-prev-next')[1];

        fireEvent.click(next);

        expect(getNextLowFareCalendarInboundPageFnStub).toHaveBeenCalledWith(
          {
            currencyType: 'USD',
            departureDate: '2020-02-21',
            destination: 'AUS',
            isRoundTrip: false,
            numberOfAdults: 1,
            origin: 'ATL',
            promoCode: '',
            returnDate: '',
            tripType: 'oneWay',
            useLowFareCalendar: true
          },
          responseRoundTripBothPrevNextLinks.lowFareCalendarPage.inboundPage
        );
      });
    });

    describe('selection', () => {
      beforeEach(() => {
        jest.spyOn(calendarScrollFunctions, 'focusOnPriceBar');
        jest.fn().mockImplementation(() => [
          {
            getBoundingClientRect: () => ({ width: 40, height: 10, top: 0, left: 150, bottom: 0, right: 0 })
          }
        ]);
      });

      it('should show price bars as selected for default dates', () => {
        const outboundDate = '2020-01-15';
        const inboundDate = '2020-01-17';
        const { container } = createComponent(lowFareCalendarPageNullSelectionData.lowFareCalendarPage, {
          lowFareCalendarSelectedDates: { outboundDate, inboundDate }
        });
        const selectedDays = container.querySelectorAll('.calendar-day--fare-price.selected');

        expect(selectedDays.length).toEqual(2);
        expect(selectedDays[0]).toHaveAttribute('data-date', outboundDate);
        expect(selectedDays[1]).toHaveAttribute('data-date', inboundDate);
      });
      it('should show price bars as selected for a roundtrip of the same date', () => {
        const outboundDate = '2020-01-17';
        const inboundDate = '2020-01-17';
        const { container } = createComponent(lowFareCalendarPageNullSelectionData.lowFareCalendarPage, {
          lowFareCalendarSelectedDates: { outboundDate, inboundDate }
        });

        const selectedDays = container.querySelectorAll('.calendar-day--fare-price.selected');

        expect(selectedDays.length).toEqual(2);
        expect(selectedDays[0]).toHaveAttribute('data-date', outboundDate);
        expect(selectedDays[1]).toHaveAttribute('data-date', inboundDate);
      });
      it('should not show price bars as selected for default dates that are not applicable', () => {
        const outboundDate = '2020-01-18';
        const inboundDate = '2020-01-20';
        const { container } = createComponent(lowFareCalendarPageNullSelectionData.lowFareCalendarPage, {
          lowFareCalendarSelectedDates: { outboundDate, inboundDate }
        });

        expect(container.querySelectorAll('.calendar-day--fare-price.selected').length).toEqual(0);
      });
      it('should focus on N/A price bars', () => {
        const { container } = createComponent(lowFareCalendarPageNullSelectionData.lowFareCalendarPage);

        expect(container.querySelectorAll('.calendar-day--fare-price.selected').length).toEqual(0);
        expect(calendarScrollFunctions.focusOnPriceBar).toHaveBeenCalled();
      });
      it('should call selectLowFareCalendarInboundDateFnStub when the price bar is clicked', () => {
        const { container } = createComponent();
        const calDays = container.querySelector('.calendar-days-container');

        fireEvent.click(calDays.querySelector('.calendar-day--fare-price'));

        waitFor(() => {
          expect(selectLowFareCalendarInboundDateFnStub).toHaveBeenCalledWith('2020-01-17');
        });
      });
      it('should call selectLowFareCalendarOutboundDateFnStub when the price bar is clicked', () => {
        const { container } = createComponent();
        const calMonth = container.querySelector('.low-fare-outbound .low-fare-calendar .calendar-month');
        const calDays = calMonth.querySelector('.calendar-days-container');

        fireEvent.click(calDays.querySelector('.calendar-day--fare-price'));
        waitFor(() => {
          expect(selectLowFareCalendarOutboundDateFnStub).toHaveBeenCalledWith('2020-01-15');
        });
      });
      it('should only show departure selection for one-way trips', () => {
        const { container } = createComponent({
          ...responseRoundTripBothPrevNextLinks.lowFareCalendarPage,
          inboundPage: null
        });

        expect(container.querySelectorAll('.low-fare-calendar-page--selections.one-way').length).toEqual(1);
        expect(
          container.querySelectorAll('.low-fare-calendar-page--selections .low-fare-calendar-page--selection.inbound')
            .length
        ).toEqual(0);
      });
    });
  });

  describe('click dollar/points switcher', () => {
    let searchRequest = {
      departureDate: '2020-01-15',
      returnDate: '2020-01-26',
      tripType: 'roundTrip',
      currencyType: 'USD',
      isRoundTrip: true,
      numberOfAdults: 1,
      promoCode: '',
      origin: 'AUS',
      destination: 'ATL'
    };

    describe('with no selected dates for fares', () => {
      it('should call getLowFareCalendarFn when currency switcher changes from dollars to points', () => {
        const { container } = createComponent(undefined, { searchRequest });
        const switcher = container.querySelectorAll('span.switch-button--item.money-or-points--points');

        expect(switcher.length).toEqual(1);

        fireEvent.click(switcher[0]);

        const expectedSearchRequest = _.merge({}, searchRequest, {
          currencyType: 'PTS'
        });

        expect(getLowFareCalendarFnStub).toHaveBeenCalledWith(expectedSearchRequest, undefined, false);
      });

      it('should call getLowFareCalendarFn when currency switcher changes from points to dollars', () => {
        _.set(searchRequest, 'currencyType', 'PTS');
        const { container } = createComponent(undefined, { searchRequest });
        const switcher = container.querySelectorAll('span.switch-button--item.money-or-points--money');

        expect(switcher.length).toEqual(1);
        fireEvent.click(switcher[0]);

        const expectedSearchRequest = _.merge({}, searchRequest, {
          currencyType: 'USD'
        });

        expect(getLowFareCalendarFnStub).toHaveBeenCalledWith(expectedSearchRequest, undefined, false);
      });

      it('should not call getLowFareCalendarFn when all available bounds for RT are not selected', () => {
        searchRequest = {
          departureDate: undefined,
          returnDate: undefined,
          tripType: 'roundTrip',
          currencyType: 'USD',
          isRoundTrip: true,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        };

        const { container } = createComponent(undefined, { searchRequest });
        const switcher = container.querySelectorAll('span.switch-button--item.money-or-points--points');

        expect(switcher.length).toEqual(1);
        fireEvent.click(switcher[0]);

        expect(getLowFareCalendarFnStub).not.toHaveBeenCalled();
        expect(showDialogStub).toHaveBeenCalled();
      });

      it('should not call getLowFareCalendarFn when all available bounds for OW are not selected', () => {
        searchRequest = {
          departureDate: undefined,
          returnDate: undefined,
          tripType: 'oneWay',
          currencyType: 'USD',
          isRoundTrip: false,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        };

        const { container } = createComponent(undefined, { searchRequest });
        const switcher = container.querySelectorAll('span.switch-button--item.money-or-points--points');

        expect(switcher.length).toEqual(1);
        fireEvent.click(switcher[0]);

        expect(getLowFareCalendarFnStub).not.toHaveBeenCalled();
        expect(showDialogStub).toHaveBeenCalled();
      });
    });

    describe('with selected dates for fares', () => {
      let inboundDate, outboundDate;
      let lowFareCalendarSelectedDates;

      beforeEach(() => {
        outboundDate = '2020-01-16';
        inboundDate = '2020-01-18';
        lowFareCalendarSelectedDates = {
          outboundDate,
          inboundDate
        };
      });

      it('should call getLowFareCalendarFn when currency switcher changes from dollars to points', () => {
        const { container } = createComponent(undefined, { lowFareCalendarSelectedDates, searchRequest });
        const switcher = container.querySelectorAll('span.switch-button--item.money-or-points--points');

        expect(switcher.length).toEqual(1);
        fireEvent.click(switcher[0]);

        const expectedSearchRequest = _.merge({}, searchRequest, {
          departureDate: outboundDate,
          returnDate: inboundDate,
          currencyType: 'PTS'
        });

        expect(getLowFareCalendarFnStub).toHaveBeenCalledWith(expectedSearchRequest, undefined, false);
      });

      it('should call getLowFareCalendarFn when currency switcher changes from points to dollars', () => {
        _.set(searchRequest, 'currencyType', 'PTS');
        const { container } = createComponent(undefined, { lowFareCalendarSelectedDates, searchRequest });
        const switcher = container.querySelectorAll('span.switch-button--item.money-or-points--money');

        expect(switcher.length).toEqual(1);
        fireEvent.click(switcher[0]);

        const expectedSearchRequest = _.merge({}, searchRequest, {
          departureDate: outboundDate,
          returnDate: inboundDate,
          currencyType: 'USD'
        });

        expect(getLowFareCalendarFnStub).toHaveBeenCalledWith(expectedSearchRequest, undefined, false);
      });
    });

    it('should not call getLowFareCalendarFn when currency switcher does not value but is clicked', () => {
      const { container } = createComponent(undefined, { searchRequest });
      const switcher = container.querySelectorAll('span.switch-button--item.money-or-points--money');

      expect(switcher.length).toEqual(1);
      fireEvent.click(switcher[0]);

      expect(getLowFareCalendarFnStub).not.toHaveBeenCalled();
    });
  });

  describe('click select flights button', () => {
    describe('one way', () => {
      let searchRequest;

      beforeEach(() => {
        searchRequest = {
          departureDate: '2020-01-15',
          returnDate: undefined,
          tripType: 'oneWay',
          currencyType: 'USD',
          isRoundTrip: false,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        };
      });

      it('should call searchForFlightsFn with original search request data when user does not select diff dates', () => {
        const { container } = createComponent(responseOneWayPoints.lowFareCalendarPage, { searchRequest });
        const button = container.querySelector('button.continue');

        fireEvent.click(button);

        expect(searchForFlightsFnStub).toHaveBeenCalledWith({
          searchRequest,
          nextPagePath: '/air/booking/select-depart.html',
          preventFlowStatusChange: true
        });
      });

      it('should call searchForFlightsFn when user selects new outbound date', () => {
        const lowFareCalendarSelectedDates = { outboundDate: '2020-01-16' };
        const { container } = createComponent(responseOneWayPoints.lowFareCalendarPage, {
          searchRequest,
          lowFareCalendarSelectedDates
        });
        const button = container.querySelector('button.continue');

        fireEvent.click(button);

        const expectedSearchRequest = { ...searchRequest, departureDate: lowFareCalendarSelectedDates.outboundDate };

        expect(searchForFlightsFnStub).toHaveBeenCalledWith({
          searchRequest: expectedSearchRequest,
          nextPagePath: '/air/booking/select-depart.html',
          preventFlowStatusChange: true
        });
      });
    });

    describe('round trip', () => {
      let searchRequest;

      beforeEach(() => {
        searchRequest = {
          departureDate: '2020-01-15',
          returnDate: '2020-01-26',
          tripType: 'roundTrip',
          currencyType: 'USD',
          isRoundTrip: true,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        };
      });

      it('should call searchForFlightsFn with original search request data when user does not select diff dates', () => {
        const { container } = createComponent(responseRoundTripBothPrevNextLinks.lowFareCalendarPage, {
          searchRequest
        });
        const button = container.querySelector('button.continue');

        fireEvent.click(button);

        expect(searchForFlightsFnStub).toHaveBeenCalledWith({
          searchRequest,
          nextPagePath: '/air/booking/select-depart.html',
          preventFlowStatusChange: true
        });
      });

      it('should call searchForFlightsFn when user selects new outbound and inbound dates', () => {
        const lowFareCalendarSelectedDates = { outboundDate: '2020-01-16', inboundDate: '2020-01-25' };
        const { container } = createComponent(responseRoundTripBothPrevNextLinks.lowFareCalendarPage, {
          searchRequest,
          lowFareCalendarSelectedDates
        });
        const button = container.querySelector('button.continue');

        fireEvent.click(button);

        const expectedSearchRequest = {
          ...searchRequest,
          departureDate: lowFareCalendarSelectedDates.outboundDate,
          returnDate: lowFareCalendarSelectedDates.inboundDate
        };

        expect(searchForFlightsFnStub).toHaveBeenCalledWith({
          searchRequest: expectedSearchRequest,
          nextPagePath: '/air/booking/select-depart.html',
          preventFlowStatusChange: true
        });
      });

      it('should display dialog when missing a selected date', () => {
        const lowFareCalendarSelectedDates = { outboundDate: '2020-01-16', inboundDate: '' };
        const newSearchRequest = { ...searchRequest, returnDate: '' };
        const { container } = createComponent(responseRoundTripBothPrevNextLinks.lowFareCalendarPage, {
          searchRequest: newSearchRequest,
          lowFareCalendarSelectedDates
        });

        const button = container.querySelector('button.continue');

        fireEvent.click(button);

        expect(showDialogStub).toHaveBeenCalled();
      });

      it('should display dialog when missing a selected date', () => {
        const lowFareCalendarSelectedDates = { outboundDate: '2020-01-16', inboundDate: '' };
        const newSearchRequest = { ...searchRequest, returnDate: '' };
        const { container } = createComponent(responseRoundTripBothPrevNextLinks.lowFareCalendarPage, {
          searchRequest: newSearchRequest,
          lowFareCalendarSelectedDates
        });

        const button = container.querySelector('button.continue');

        fireEvent.click(button);

        expect(showDialogStub).toHaveBeenCalled();
      });
    });
  });

  describe('inverted bounds in round trip', () => {
    it('should display the correct toast popup message when user attempts to select outbound inverted price bar date', () => {
      const lowFareCalendarSelectedDates = { outboundDate: '2020-01-16', inboundDate: '2020-01-19' };
      const { container } = createComponent(lowFareCalendarPageRoundTrip.lowFareCalendarPage, {
        lowFareCalendarSelectedDates
      });
      const unselectableOutboundDay = container
        .querySelector('div.low-fare-outbound')
        .querySelectorAll('div.unselectable');

      expect(unselectableOutboundDay.length).toEqual(19);

      fireEvent.click(unselectableOutboundDay[0]);

      const toastDialog = container.querySelectorAll('.toast-dialog.visible');

      expect(toastDialog.length).toEqual(1);
      expect(toastDialog[0]).toHaveTextContent(i18n('AIR_BOOKING__ERROR__LFC__INVERTED_BOUNDS_DEPART'));
    });

    it('should display the correct toast popup message when user attempts to select inbound inverted price bar date', () => {
      const lowFareCalendarSelectedDates = { outboundDate: '2020-01-19', inboundDate: '2020-01-19' };
      const { container } = createComponent(lowFareCalendarPageRoundTrip.lowFareCalendarPage, {
        lowFareCalendarSelectedDates
      });
      const unselectableInboundDay = container
        .querySelector('div.low-fare-inbound')
        .querySelectorAll('div.unselectable');

      expect(unselectableInboundDay.length).toEqual(2);

      fireEvent.click(unselectableInboundDay[0]);
      const toastDialog = container.querySelectorAll('.toast-dialog.visible');

      expect(toastDialog.length).toEqual(1);
      expect(toastDialog[0]).toHaveTextContent(i18n('AIR_BOOKING__ERROR__LFC__INVERTED_BOUNDS_RETURN'));
    });
  });

  it('should use the selected dates on mount when they exist', () => {
    const lowFareCalendarSelectedDates = { outboundDate: '2020-01-19', inboundDate: '2020-01-19' };
    const { container } = createComponent(lowFareCalendarPageRoundTrip.lowFareCalendarPage, {
      lowFareCalendarSelectedDates
    });
    const priceBar = container.querySelectorAll('[data-date="2020-01-19"]');

    expect(priceBar.length).toEqual(4);
  });

  const createComponent = (
    lowFareCalendarPage = responseRoundTripBothPrevNextLinks.lowFareCalendarPage,
    otherProps = {}
  ) => {
    const defaultProps = {
      push: pushStub,
      outboundPage: lowFareCalendarPage.outboundPage,
      inboundPage: _.get(lowFareCalendarPage, 'inboundPage', null),
      showLoadingOutboundPrev: false,
      showLoadingOutboundNext: false,
      showLoadingInboundPrev: false,
      showLoadingInboundNext: false,
      getPrevLowFareCalendarOutboundPageFn: getPrevLowFareCalendarOutboundPageFnStub,
      getNextLowFareCalendarOutboundPageFn: getNextLowFareCalendarOutboundPageFnStub,
      getPrevLowFareCalendarInboundPageFn: getPrevLowFareCalendarInboundPageFnStub,
      getNextLowFareCalendarInboundPageFn: getNextLowFareCalendarInboundPageFnStub,
      selectLowFareCalendarInboundDateFn: selectLowFareCalendarInboundDateFnStub,
      selectLowFareCalendarOutboundDateFn: selectLowFareCalendarOutboundDateFnStub,
      getLowFareCalendarFn: getLowFareCalendarFnStub,
      disclaimerWithLinks: lowFareCalendarPage.disclaimerWithLinks,
      searchForFlightsFn: searchForFlightsFnStub,
      searchRequest: {
        departureDate: '2020-01-15',
        returnDate: '2020-01-26',
        tripType: 'roundTrip',
        currencyType: 'USD',
        isRoundTrip: true,
        numberOfAdults: 1,
        promoCode: '',
        origin: 'AUS',
        destination: 'ATL'
      },
      showDialogFn: showDialogStub
    };
    const combinedProps = { ...defaultProps, ...otherProps };

    return render(
      <Provider store={createMockedFormStore()}>
        <LowFareCalendarPage {...combinedProps} />
      </Provider>
    );
  };
});
