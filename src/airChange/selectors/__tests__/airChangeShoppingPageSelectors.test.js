jest.mock('@swa-ui/locale');

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import {
  getCalendarStrip,
  getCardsSortedBy,
  getCurrentPage,
  getDynamicWaiver,
  getSelectedProducts,
  transformToCurrentReservationType
} from 'src/airChange/selectors/airChangeShoppingPageSelectors';
import * as shoppingPageHelper from 'src/shared/helpers/shoppingPageHelper';
import ChangeShoppingPageResponseBuilder from 'test/builders/apiResponse/changeShoppingPageResponseBuilder';
import ChangeShoppingPageReaccomResponseBuilder from 'test/builders/apiResponse/changeShoppingPageReaccomResponseBuilder';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import CurrentReservationBuilder from 'test/builders/model/currentReservationBuilder';
import FakeClock from 'test/unit/helpers/fakeClock';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';

describe('airChangeShoppingPageSelectors', () => {
  let props, response, state;
  let reaccomFlightPageResponse, reaccomShoppingPageResponse, reaccomState;
  const searchRequest = {
    to: 'DAL',
    from: 'AUS',
    departureAndReturnDate: {
      departureDate: '2018-05-11',
      returnDate: '2018-05-13'
    }
  };

  beforeEach(() => {
    response = new ChangeShoppingPageResponseBuilder().build();
    props = createProps();
    state = createState({ response, searchRequest });

    reaccomShoppingPageResponse = new ChangeShoppingPageReaccomResponseBuilder().withRoundTrip().build();
    reaccomFlightPageResponse = {
      messages: [],
      boundSelections: [
        new BoundSelectionBuilder().withReaccomBound().build(),
        new BoundSelectionBuilder().withReaccomBound().withFlightType('RETURN').build()
      ],
      _links: { reaccomProducts: 'reaccomProducts' },
      _meta: {}
    };
    reaccomState = createState({ reaccomShoppingPageResponse, reaccomFlightPageResponse, searchRequest });

    FakeClock.setTimeTo('2018-08-23');
  });

  afterEach(() => {
    jest.clearAllMocks();
    FakeClock.restore();
  });

  describe('getCurrentPage', () => {
    describe('air change scenario', () => {
      it('should return isChangingTwoBounds to true when the trip is round trip', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];
        const state = createState({ response, searchRequest, boundSelections });
        const page = getCurrentPage(state, props);

        expect(page.isChangingTwoBounds).toEqual(true);
      });

      it('should match adultPassengerCount', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];
        const state = createState({
          boundSelections,
          passengerList: [
            {
              name: 'Minnie'
            },
            {
              name: 'Jhon'
            }
          ],
          response,
          searchRequest
        });
        const page = getCurrentPage(state, props);

        expect(page.adultPassengerCount).toEqual(2);
        expect(page.departDate).toEqual('2018-05-24');
      });

      it('should return isChangingTwoBounds to false when the trip is not round trip', () => {
        const boundSelections = [new BoundSelectionBuilder().build()];
        const state = createState({ response, searchRequest, boundSelections });

        _.set(state, 'app.airChange.selectedBounds', {
          firstbound: true,
          secondbound: false
        });

        const page = getCurrentPage(state, props);

        expect(page.isChangingTwoBounds).toEqual(false);
      });

      it('should return inbound currentReservation when direction is inbound', () => {
        props = createProps({ direction: 'inbound' });

        const page = getCurrentPage(state, props);

        expect(page.currentReservation).toEqual(new CurrentReservationBuilder().withDate('2018-05-25').build());
      });

      it('should re-order the cards by sortCardsBy method', () => {
        const givenCards = ['card0', 'card1'];

        jest.spyOn(shoppingPageHelper, 'sortCardsBy').mockReturnValue(givenCards);

        const cardsSortedBy = getCardsSortedBy(state, props);

        const { cards } = response.flights.outboundPage;

        expect(shoppingPageHelper.sortCardsBy).toHaveBeenCalledWith(cards, 'departureTime');
        expect(cardsSortedBy).toEqual({
          cards: givenCards,
          sortByValue: 'departureTime'
        });
      });

      it('should return isChangingFirstBound to true when is not changing two bounds', () => {
        const boundSelections = [new BoundSelectionBuilder().build()];
        const state = createState({ response, searchRequest, boundSelections });
        const page = getCurrentPage(state, props);

        expect(page.isChangingFirstBound).toEqual(true);
      });

      it('should return isChangingFirstBound to true when is changing two bounds and is changing outbound', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];
        const state = createState({ response, searchRequest, boundSelections });

        props = createProps({ direction: 'outbound' });
        const page = getCurrentPage(state, props);

        expect(page.isChangingFirstBound).toEqual(true);
      });

      it('should return isChangingFirstBound to false when is changing two bounds and is changing inbound', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];
        const state = createState({ response, searchRequest, boundSelections });

        props = createProps({ direction: 'inbound' });
        const page = getCurrentPage(state, props);

        expect(page.isChangingFirstBound).toEqual(false);
      });
    });

    describe('reaccom scenario', () => {
      it('should return isChangingTwoBounds to true when the trip is round trip', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];

        reaccomState = createState({
          boundSelections,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });
        const page = getCurrentPage(reaccomState, props);

        expect(page.isChangingTwoBounds).toEqual(true);
      });

      it('should return isChangingTwoBounds to false when trip is round trip and changing one bounds', () => {
        const selectedBounds = {
          firstbound: true,
          secondbound: false
        };

        reaccomState = createState({
          selectedBounds,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });

        const page = getCurrentPage(reaccomState, props);

        expect(page.isChangingTwoBounds).toEqual(false);
      });

      it('should return returnData and departDate when trip is onewway trip', () => {
        const selectedBounds = {
          firstbound: true,
          secondbound: false
        };

        reaccomShoppingPageResponse = new ChangeShoppingPageReaccomResponseBuilder().build();
        reaccomFlightPageResponse = {
          messages: [],
          boundSelections: [new BoundSelectionBuilder().withReaccomBound().build()],
          _links: { reaccomProducts: 'reaccomProducts' },
          _meta: {}
        };
        reaccomState = createState({
          selectedBounds,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });

        const page = getCurrentPage(reaccomState, props);

        expect(page.departDate).toEqual('2020-09-24');
        expect(page.returnDate).toEqual(undefined);
      });

      it('should return inbound currentReservation when direction is inbound', () => {
        const boundSelections = [new BoundSelectionBuilder().build()];

        reaccomState = createState({
          boundSelections,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });
        props = createProps({ direction: 'inbound' });
        const page = getCurrentPage(state, props);

        expect(page.currentReservation).toEqual(new CurrentReservationBuilder().withDate('2018-05-25').build());
      });

      it('should re-order the cards by sortCardsBy method', () => {
        const givenCards = ['card0', 'card1'];

        jest.spyOn(shoppingPageHelper, 'sortCardsBy').mockReturnValue(givenCards);

        reaccomState = createState({ reaccomShoppingPageResponse, reaccomFlightPageResponse, searchRequest });
        const cardsSortedBy = getCardsSortedBy(reaccomState, props);

        const { cards } = reaccomShoppingPageResponse.flights.outboundPage;

        expect(shoppingPageHelper.sortCardsBy).toHaveBeenCalledWith(cards, 'departureTime');
        expect(cardsSortedBy).toEqual({
          cards: givenCards,
          sortByValue: 'departureTime'
        });
      });

      it('should return isChangingFirstBound to true when is not changing two bounds', () => {
        const boundSelections = [new BoundSelectionBuilder().build()];

        reaccomState = createState({
          boundSelections,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });
        const page = getCurrentPage(reaccomState, props);

        expect(page.isChangingFirstBound).toEqual(true);
      });

      it('should return isChangingFirstBound to true when is changing two bounds and is changing outbound', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];

        reaccomState = createState({
          boundSelections,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });
        props = createProps({ direction: 'outbound' });
        const page = getCurrentPage(reaccomState, props);

        expect(page.isChangingFirstBound).toEqual(true);
      });

      it('should return isChangingFirstBound to false when is changing two bounds and is changing inbound', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];

        reaccomState = createState({
          boundSelections,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });
        props = createProps({ direction: 'inbound' });
        const page = getCurrentPage(reaccomState, props);

        expect(page.isChangingFirstBound).toEqual(false);
      });

      it('should return messages from the current inbound page and from trip messages', () => {
        props = createProps({ direction: 'inbound' });
        const boundSelections = [
          new BoundSelectionBuilder().withReaccomBound().build(),
          new BoundSelectionBuilder().build()
        ];

        reaccomState = createState({
          boundSelections,
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest
        });

        const boundMessages = ['bounds message'];
        const tripMessages = ['tripe message1', 'trip message2'];

        _.set(reaccomState, 'app.airChange.reaccomShoppingPage.response.flights.inboundPage.messages', boundMessages);
        _.set(reaccomState, 'app.airChange.reaccomShoppingPage.response.tripSummaryMessage', tripMessages);

        const page = getCurrentPage(reaccomState, props);

        expect(page.messages).toEqual(_.concat(tripMessages, boundMessages));
      });

      it('should return flightBoundPageInfo with outboundPage values for outbound direction', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];
        const { outboundPage } = reaccomShoppingPageResponse.flights;

        reaccomState = createState({
          boundSelections,
          reaccomFlightPageResponse,
          reaccomShoppingPageResponse,
          searchRequest
        });
        props = createProps({ direction: 'outbound' });
        const page = getCurrentPage(reaccomState, props);

        expect(page.flightBoundPageInfo).toEqual(outboundPage);
      });

      it('should return flightBoundPageInfo with inboundPage values for inbound direction', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];
        const { inboundPage } = reaccomShoppingPageResponse.flights;

        reaccomState = createState({
          boundSelections,
          reaccomFlightPageResponse,
          reaccomShoppingPageResponse,
          searchRequest
        });
        props = createProps({ direction: 'inbound' });
        const page = getCurrentPage(reaccomState, props);

        expect(page.flightBoundPageInfo).toEqual(inboundPage);
      });

      it('should handle flightBoundPageInfo value correctly when response is falsy', () => {
        const boundSelections = [new BoundSelectionBuilder().build(), new BoundSelectionBuilder().build()];

        reaccomState = createState({
          boundSelections,
          reaccomFlightPageResponse,
          searchRequest
        });
        props = createProps({ direction: 'inbound' });
        const page = getCurrentPage(reaccomState, props);

        expect(page.flightBoundPageInfo).toEqual(undefined);
      });

      describe('reaccom co-terminal scenario', () => {
        const boundSelectionsWithReaccomCoTerm = [
          new BoundSelectionBuilder().withReaccomCoTerm().build(),
          new BoundSelectionBuilder().withReaccomCoTerm().build()
        ];
        const reaccomCoTerminalProducts = {
          test: 'test reaccomCoTerminalProducts'
        };

        it('should return reaccomProducts with reaccomCoTerminalProducts values when isReaccomCoTerminalEligible is true', () => {
          reaccomFlightPageResponse.boundSelections = boundSelectionsWithReaccomCoTerm;
          reaccomState = createState({
            reaccomFlightPageResponse,
            reaccomShoppingPageResponse,
            searchRequest
          });
          reaccomState.app.airChange.reaccomShoppingPage.reaccomCoTerminalProducts = reaccomCoTerminalProducts;

          const page = getCurrentPage(reaccomState, createProps());

          expect(page._links.reaccomProducts).toEqual(reaccomCoTerminalProducts);
        });

        it('should handle reaccomProducts value correctly when reaccomShoppingPage is falsy', () => {
          reaccomFlightPageResponse.boundSelections = boundSelectionsWithReaccomCoTerm;
          reaccomState = createState({
            reaccomFlightPageResponse,
            reaccomShoppingPageResponse,
            searchRequest
          });
          reaccomState.app.airChange.reaccomShoppingPage = undefined;

          const page = getCurrentPage(reaccomState, createProps());

          expect(page._links.reaccomProducts).toEqual(undefined);
        });
      });

      it('should handle reaccomProducts value correctly when reaccomFlightPageResponse._links is falsy', () => {
        reaccomFlightPageResponse._links = undefined;
        reaccomState = createState({
          reaccomFlightPageResponse,
          reaccomShoppingPageResponse,
          searchRequest
        });

        const page = getCurrentPage(reaccomState, createProps());

        expect(page._links.reaccomProducts).toEqual(undefined);
      });
    });
  });

  describe('get calendar strip', () => {
    describe('change scenario', () => {
      it('should return correct calendarStrip for outbound', () => {
        const calendarStrip = getCalendarStrip(state, props);

        expect(calendarStrip.defaultSelectedDate).toEqual('2018-05-24');
        expect(calendarStrip.startDate.isSame('2018-08-23', 'day')).toEqual(true);
        expect(calendarStrip.endDate.isSame('2018-11-05', 'day')).toEqual(true);
      });

      it('should return correct calendarStrip for inbound', () => {
        props = createProps({ direction: 'inbound' });
        const calendarStrip = getCalendarStrip(state, props);

        expect(calendarStrip.defaultSelectedDate).toEqual('2018-05-28');
        expect(calendarStrip.startDate.isSame('2018-05-24', 'day')).toEqual(true);
        expect(calendarStrip.endDate.isSame('2018-11-05', 'day')).toEqual(true);
      });
    });

    describe('reaccom scenario', () => {
      it('should return correct calendarStrip for outbound when changing both bounds', () => {
        const calendarStrip = getCalendarStrip(reaccomState, props);

        expect(calendarStrip.defaultSelectedDate).toEqual('2020-09-24');
        expect(calendarStrip.startDate.isSame('2018-08-23', 'day')).toEqual(true);
        expect(calendarStrip.endDate.isSame('2020-10-10', 'day')).toEqual(true);
      });

      it('should return correct calendarStrip for inbound when changing both bounds', () => {
        props = createProps({ direction: 'inbound' });
        const calendarStrip = getCalendarStrip(reaccomState, props);

        expect(calendarStrip.defaultSelectedDate).toEqual('2020-09-27');
        expect(calendarStrip.startDate.isSame('2020-09-24', 'day')).toEqual(true);
        expect(calendarStrip.endDate.isSame('2020-10-10', 'day')).toEqual(true);
      });

      it('should return correct calendarStrip for inbound when changing inbound only', () => {
        const selectedBounds = {
          firstbound: false,
          secondbound: true
        };

        reaccomState = createState({
          reaccomShoppingPageResponse,
          reaccomFlightPageResponse,
          searchRequest,
          selectedBounds
        });
        props = createProps({ direction: 'inbound' });
        const calendarStrip = getCalendarStrip(reaccomState, props);

        expect(calendarStrip.defaultSelectedDate).toEqual('2020-09-27');
        expect(calendarStrip.startDate.isSame('2018-08-23', 'day')).toEqual(true);
        expect(calendarStrip.endDate.isSame('2020-10-10', 'day')).toEqual(true);
      });
    });
  });

  describe('get dynamic waiver', () => {
    beforeEach(() => {
      i18n.mockImplementation((key) => (
        (key === 'AIR_CHANGE__FLIGHT_TYPE__DEPARTURE') ? 'DEPARTURE' : (key === 'AIR_CHANGE__FLIGHT_TYPE__RETURN') ? 'RETURN' : key
      ));
    });

    it('should return correct dynamicWaiver', () => {
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver).toEqual({
        dynamicWaiverStartDate: '2018-07-24',
        dynamicWaiverEndDate: '2018-10-09',
        shouldHideWarningIcon: true,
        isDynamicWaiverEligible: false,
        isWithinDWAlternativeCities: false,
        isDepartureDateWithinDWDateRange: false,
        isReturnDateWithinDWDateRange: false
      });
    });

    it('should pick up correct dynamicWaiver bound if outbound already flown', () => {
      _.set(
        state,
        'app.airChange.changeFlightPage.response.dynamicWaivers',
        _.drop(_.get(state, 'app.airChange.changeFlightPage.response.dynamicWaivers'))
      );
      props = createProps({ direction: 'inbound' });

      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver).toEqual({
        dynamicWaiverStartDate: '2018-07-24',
        dynamicWaiverEndDate: '2018-10-12',
        shouldHideWarningIcon: true,
        isDynamicWaiverEligible: false,
        isWithinDWAlternativeCities: false,
        isDepartureDateWithinDWDateRange: false,
        isReturnDateWithinDWDateRange: false
      });
    });

    it('should pick up firstTravelDate and lastTravelDate dates if calculated dates are empty', () => {
      _.set(state, 'app.airChange.changeFlightPage.response.dynamicWaivers[0].calculatedStartDate', null);
      _.set(state, 'app.airChange.changeFlightPage.response.dynamicWaivers[0].calculatedEndDate', null);
      _.set(state, 'app.airChange.changeFlightPage.response.dynamicWaivers[0].firstTravelDate', '2018-08-25');
      _.set(state, 'app.airChange.changeFlightPage.response.dynamicWaivers[0].lastTravelDate', '2018-09-10');

      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver).toEqual({
        dynamicWaiverStartDate: '2018-08-25',
        dynamicWaiverEndDate: '2018-09-10',
        shouldHideWarningIcon: true,
        isDynamicWaiverEligible: false,
        isWithinDWAlternativeCities: false,
        isDepartureDateWithinDWDateRange: false,
        isReturnDateWithinDWDateRange: false
      });
    });

    it('should return isDynamicWaiverEligible to true when is under dynamic waiver protection', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-07-25',
          returnDate: '2018-07-30'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isDynamicWaiverEligible).toEqual(true);
    });

    it('should return isDynamicWaiverEligible to false when is not under dynamic waiver protection', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-07-10',
          returnDate: '2018-07-30'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isDynamicWaiverEligible).toEqual(false);
    });

    it('should return shouldHideWarningIcon to true when the station is not under dynamic waiver protection', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'DAL',
        departureAndReturnDate: {
          departureDate: '2018-07-28',
          returnDate: '2018-07-30'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.shouldHideWarningIcon).toEqual(true);
    });

    it('should return shouldHideWarningIcon to true when the selected date is not under dynamic waiver protection and is round trip', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-07-18',
          returnDate: '2018-07-30'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.shouldHideWarningIcon).toEqual(true);
    });

    it('should return shouldHideWarningIcon to false when is selected one bound and the selected date is not under dynamic waiver protection', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-07-14',
          returnDate: '2018-07-30'
        }
      });
      response = new ChangeShoppingPageResponseBuilder().withOneWay().build();
      _.set(state, 'app.airChange.changeShoppingPage.response', response);
      _.set(state, 'app.airChange.selectedBounds', {
        firstbound: true,
        secondbound: false
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.shouldHideWarningIcon).toEqual(false);
    });

    it('should return shouldHideWarningIcon to false when is under dynamic waiver protection', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-07-25',
          returnDate: '2018-07-30'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.shouldHideWarningIcon).toEqual(false);
    });

    it('should return isWithinDWAlternativeCities to true when is within alternative cities', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-08-30',
          returnDate: '2018-09-20'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isWithinDWAlternativeCities).toEqual(true);
    });

    it('should return isWithinDWAlternativeCities to false when is without alternative cities', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'DAL',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-08-30',
          returnDate: '2018-09-20'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isWithinDWAlternativeCities).toEqual(false);
    });

    it('should return isDepartureDateWithinDWDateRange to false when the departure date is not within DW date range', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'DAL',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-07-01',
          returnDate: '2018-09-20'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isDepartureDateWithinDWDateRange).toEqual(false);
    });

    it('should return isDepartureDateWithinDWDateRange to true when the departure date is within DW date range', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'DAL',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-08-23',
          returnDate: '2018-09-20'
        }
      });
      props = createProps({ direction: 'outbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isDepartureDateWithinDWDateRange).toEqual(true);
    });

    it('should return isReturnDateWithinDWDateRange to false when the return date is not within DW date range', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-08-01',
          returnDate: '2018-07-01'
        }
      });
      props = createProps({ direction: 'inbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isReturnDateWithinDWDateRange).toEqual(false);
    });

    it('should return isReturnDateWithinDWDateRange to true when the return date is within DW date range', () => {
      _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
        to: 'AUS',
        from: 'BDL',
        departureAndReturnDate: {
          departureDate: '2018-08-23',
          returnDate: '2018-09-20'
        }
      });
      props = createProps({ direction: 'inbound' });
      const dynamicWaiver = getDynamicWaiver(state, props);

      expect(dynamicWaiver.isReturnDateWithinDWDateRange).toEqual(true);
    });

    describe('one way', () => {
      beforeEach(() => {
        _.set(state, 'app.airChange.changeFlightPage.response.dynamicWaivers', [
          {
            alternativeDepartureCities: ['BDL'],
            alternativeArrivalCities: ['AUS'],
            eligibleStartDate: '2018-08-23',
            eligibleEndDate: '2018-09-09',
            rangeType: 'PLUS_MINUS',
            rangeValue: '30',
            flightType: 'DEPARTURE',
            firstTravelDate: null,
            lastTravelDate: null,
            calculatedStartDate: '2018-07-24',
            calculatedEndDate: '2018-10-09'
          }
        ]);
        _.set(state, 'app.airChange.selectedBounds', {
          firstbound: true
        });
      });

      it('should return true for isDynamicWaiverEligible property when departure date is under dynamic waiver protection', () => {
        _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
          to: 'AUS',
          from: 'BDL',
          departureAndReturnDate: {
            departureDate: '2018-09-01'
          }
        });
        const dynamicWaiver = getDynamicWaiver(state, props);

        expect(dynamicWaiver.isDynamicWaiverEligible).toEqual(true);
      });

      it('should return false for isDynamicWaiverEligible property when departure date is not under dynamic waiver protection', () => {
        _.set(state, 'app.airChange.changeShoppingPage.searchRequest', {
          to: 'AUS',
          from: 'BDL',
          departureAndReturnDate: {
            departureDate: '2018-10-30'
          }
        });
        const dynamicWaiver = getDynamicWaiver(state, props);

        expect(dynamicWaiver.isDynamicWaiverEligible).toEqual(false);
      });
    });
  });

  describe('getSelectedProducts', () => {
    let reaccomSelectedProducts, selectedProducts;

    beforeEach(() => {
      reaccomSelectedProducts = {
        outbound: null,
        inbound: {
          fareProductId: 'inboundProductId',
          flightCardIndex: 0
        }
      };
      selectedProducts = {
        outbound: {
          fareProductId: 'outboundProductId',
          flightCardIndex: 0
        },
        inbound: null
      };
    });

    describe('change scenario', () => {
      it('should return the air change selected products', () => {
        state = createState({ selectedProducts, reaccomSelectedProducts });
        const products = getSelectedProducts(state, props);

        expect(products).toEqual(selectedProducts);
      });
    });

    describe('reaccom scenario', () => {
      it('should return the reaccom selected products', () => {
        state = createState({ selectedProducts, reaccomSelectedProducts, reaccomFlightPageResponse });
        const products = getSelectedProducts(state, props);

        expect(products).toEqual(reaccomSelectedProducts);
      });
    });

    describe('upgrade flow', () => {
      let selectedUpgradeProducts;

      beforeEach(() => {
        selectedUpgradeProducts = new AirUpgradeViewReservationApiJsonBuilder().withFirstBoundSelected().build()
          .viewUpgradeReservationPage.pricingDataList;
      });

      it('should return correct upgrade products', () => {
        state = createState({ selectedUpgradeProducts, isUpgrade: true });
        const products = getSelectedProducts(state, props);
        const expectedResult = [
          {
            arrivalAirportCode: 'HOU',
            boundType: 'DEPARTING',
            canUpgrade: true,
            departureAirportCode: 'DAL',
            flight: '539/1467',
            isSelected: true,
            numberOfPassengers: 2,
            productId: 'mockId1',
            upgradePrice: {
              amount: '30.11',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            upgradeTotalPrice: {
              amount: '60.22',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ];

        expect(products).toEqual(expectedResult);
      });
    });

    describe('transformToCurrentReservationType', () => {
      it('should render the correct object', () => {
        const reaccomShoppingPageResponse = new ChangeShoppingPageReaccomResponseBuilder().withDoubleConnect().build();

        const reaccomReturnObj = transformToCurrentReservationType(reaccomShoppingPageResponse.currentReservation.outbound);

        expect(reaccomReturnObj).toEqual({
          arrivesTime: '18:45',
          date: '2020-09-24',
          departsTime: '12:35',
          flight: '1876/2288/2202',
          flightTime: '5h 10m',
          isNextDayArrival: false,
          isOvernight: undefined,
          shortStopDescription: '1 Stop',
          stopCity: 'STL',
          stopDescription: '1 Stop, STL'
        });
      });
    });
  });

  const createState = (options) => {
    const defaultSortBy = {
      outbound: 'departureTime',
      inbound: 'numberOfStops'
    };
    const defaultSelectedProducts = {
      outbound: {
        fareProductId: 'outboundProductId',
        flightCardIndex: 0
      },
      inbound: null
    };
    const {
      lastBookableDate,
      response,
      sortBy = defaultSortBy,
      searchRequest,
      changeShoppingLink,
      changePricingLink,
      passengerList,
      selectedProducts = defaultSelectedProducts,
      reaccomShoppingPageResponse,
      reaccomFlightPageResponse,
      reaccomSelectedProducts = selectedProducts,
      selectedBounds,
      selectedUpgradeProducts,
      isUpgrade
    } = options;
    const state = {};

    _.set(state, 'app.airChange.changeFlightPage.response.boundSelections', []);
    _.set(state, 'app.airChange.changeFlightPage.response.passengerDetails.passengerList', passengerList || []);

    _.set(state, 'app.lastBookableDate', lastBookableDate || '2018-11-05');
    _.set(state, 'app.airChange.changeShoppingPage.response', response);
    _.set(state, 'app.airChange.changeShoppingPage.sortBy', sortBy);
    _.set(state, 'app.airChange.changeShoppingPage.searchRequest', searchRequest);
    _.set(
      state,
      'app.airChange.changeFlightPage.response._links.changeShopping',
      changeShoppingLink || {
        href: 'url',
        method: 'POST',
        body: [{ boundReference: 'boundReferenceA' }]
      }
    );
    _.set(state, 'app.airChange.changeFlightPage.response.dynamicWaivers', [
      {
        alternativeDepartureCities: ['BDL'],
        alternativeArrivalCities: ['AUS'],
        eligibleStartDate: '2018-08-23',
        eligibleEndDate: '2018-09-09',
        rangeType: 'PLUS_MINUS',
        rangeValue: '30',
        flightType: 'DEPARTURE',
        firstTravelDate: null,
        lastTravelDate: null,
        calculatedStartDate: '2018-07-24',
        calculatedEndDate: '2018-10-09'
      },
      {
        alternativeDepartureCities: ['AUS'],
        alternativeArrivalCities: ['BDL'],
        eligibleStartDate: '2018-08-23',
        eligibleEndDate: '2018-09-12',
        rangeType: 'PLUS_MINUS',
        rangeValue: '30',
        flightType: 'RETURN',
        firstTravelDate: null,
        lastTravelDate: null,
        calculatedStartDate: '2018-07-24',
        calculatedEndDate: '2018-10-12'
      }
    ]);
    _.set(
      state,
      'app.airChange.changeShoppingPage.response._links.changePricingPage',
      changePricingLink || {
        href: 'url',
        method: 'POST',
        body: {
          boundReference: ['boundReferenceA']
        }
      }
    );
    _.set(
      state,
      'app.airChange.selectedBounds',
      selectedBounds || {
        firstbound: true,
        secondbound: true
      }
    );
    _.set(state, 'app.airChange.changeShoppingPage.selectedProducts', selectedProducts);
    _.set(state, 'app.airChange.changeShoppingPage.selectedProducts.outbound', {
      flightCardIndex: 0,
      flightProductType: 'NORMAL',
      fareProductId: 'productId'
    });
    _.set(state, 'app.airChange.changeShoppingPage.response.disclaimerWithLinks', 'This is a disclaimer');
    _.set(state, 'app.airChange.reaccomShoppingPage.response', reaccomShoppingPageResponse);
    _.set(state, 'app.airChange.reaccomShoppingPage.sortBy', sortBy);
    _.set(state, 'app.airChange.reaccomShoppingPage.selectedProducts', reaccomSelectedProducts);
    _.set(state, 'app.airChange.reaccomFlightPage.response', reaccomFlightPageResponse);
    _.set(
      state,
      'app.airUpgrade.airUpgradeReducer.viewUpgradeReservationPage.pricingDataList',
      selectedUpgradeProducts
    );
    _.set(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', isUpgrade);

    return state;
  };

  const createProps = ({ direction = 'outbound', paxType = 'adult' } = {}) => ({
    params: {
      direction,
      paxType
    }
  });
});
