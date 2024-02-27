import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { FlightShoppingPage } from 'src/airBooking/pages/flightShoppingPage';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import MultiSelectGroupBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/multiSelectGroupBuilder.js';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import FlexPlacementBuilder from 'test/builders/model/flexPlacementBuilder';
import ImagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';
import FakeClock from 'test/unit/helpers/fakeClock';

const multiSelectGroupState = { isSelected: true, origin: ['MDW', 'ORD'], destination: ['BOS', 'BDL', 'MHT', 'PVD'] };

describe('flightShoppingPage', () => {
  let fetchFlightShoppingPageSuccessFnStub;
  let getFlightSelectPagePlacementsFnStub;
  let getProductListFnStub;
  let getUserInfoFnStub;
  let hideDialogStub;
  let resetMultiSelectBoundSelectionStub;
  let saveSearchRequestFnStub;
  let searchForFlightsFnStub;
  let searchForMultiSelectGroupFlightsFnStub;
  let selectFareFnStub;
  let setCalendarStripFnStub;
  let showDialogStub;
  let sortFlightProductsFnStub;
  let trackCalendarStripFnStub;
  let updateMultiSelectBoundFnStub;
  let updatetMultiSelectGroupCurrentDirectionFnStub;

  beforeEach(() => {
    FakeClock.setTimeTo('2017-01-01');
    fetchFlightShoppingPageSuccessFnStub = jest.fn();
    getFlightSelectPagePlacementsFnStub = jest.fn(() => Promise.resolve());
    getProductListFnStub = jest.fn();
    getUserInfoFnStub = jest.fn();
    hideDialogStub = jest.fn(() => Promise.resolve());
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    resetMultiSelectBoundSelectionStub = jest.fn();
    saveSearchRequestFnStub = jest.fn();
    searchForFlightsFnStub = jest.fn();
    searchForMultiSelectGroupFlightsFnStub = jest.fn();
    setCalendarStripFnStub = jest.fn();
    selectFareFnStub = jest.fn();
    showDialogStub = jest.fn();
    sortFlightProductsFnStub = jest.fn();
    trackCalendarStripFnStub = jest.fn();
    updateMultiSelectBoundFnStub = jest.fn();
    updatetMultiSelectGroupCurrentDirectionFnStub = jest.fn();
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  describe('componentDidMount', () => {
    it('should call getUserInfoFn if in webView and has companyId', async () => {
      const instance = React.createRef();

      jest.spyOn(LoginSessionHelper, 'getCompanyIdFromIdToken').mockReturnValue('1234567');

      createComponent({ isWebView: true, ref: instance });

      instance.current.componentDidMount();

      expect(getUserInfoFnStub).toHaveBeenCalled();
    });

    it('should not call getUserInfoFn if not in webView', () => {
      jest.spyOn(LoginSessionHelper, 'getCompanyIdFromIdToken').mockReturnValue('1234567');
      const instance = React.createRef();

      createComponent({ isWebView: false, ref: instance });

      instance.current.componentDidMount();

      expect(getUserInfoFnStub).not.toHaveBeenCalled();
    });

    it('should not call getUserInfoFn if there is no companyId in id_token', () => {
      const instance = React.createRef();

      createComponent({ isWebView: false, ref: instance });

      instance.current.componentDidMount();

      expect(getUserInfoFnStub).not.toHaveBeenCalled();
    });

    it('should fire Satellite analytics event on mount', () => {
      getFlightSelectPagePlacementsFnStub.mockReturnValue(Promise.resolve());
      createComponent({ isWebView: true });

      waitFor(() => {
        expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('otter', {
          page: 'air-booking-search-results'
        });
      });
    });

    it('should fire multiselectgroup Satellite analytics event on mount', () => {
      getFlightSelectPagePlacementsFnStub.mockReturnValue(Promise.resolve());
      createComponent({ isWebView: true, multiSelectGroupState });

      waitFor(() => {
        expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('otter', {
          page: 'air-booking-select-multi'
        });
      });
    });

    it('should call setCalendarStripFn when isCalendarStrip is true', () => {
      getFlightSelectPagePlacementsFnStub.mockReturnValue(Promise.resolve());
      createComponent({
        isWebView: true,
        multiSelectGroupState,
        isCalendarStrip: true
      });

      waitFor(() => {
        expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalled();
        expect(setCalendarStripFnStub).toHaveBeenCalled();
      });
    });

    it('should call setCalendarStripFn when isCalendarStrip is false and not a multi select', () => {
      getFlightSelectPagePlacementsFnStub.mockReturnValue(Promise.resolve());
      createComponent({
        isWebView: true
      });

      waitFor(() => {
        expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalled();
      });
    });
  });

  describe('componentDidUpdate', () => {
    it('should call raiseSatelliteEvent when previous departureDate or returnDate changes', () => {
      const instance = React.createRef();

      getFlightSelectPagePlacementsFnStub.mockReturnValue(Promise.resolve());
      createComponent({
        isWebView: true,
        props: {
          searchRequest: { departureDate: '2012-01-07', returnDate: '2017-13-11' }
        },
        isCalendarStrip: true,
        multiSelectGroupState: { isSelected: true },
        params: { direction: 'OUTBOUND' },
        ref: instance
      });
      instance.current.componentDidUpdate({ searchRequest: { departureDate: '2010-03-10', returnDate: '2027-13-01' } });
      waitFor(() => {
        expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalled();
      });
    });
  });

  describe('pageHeader', () => {
    describe('select departing flight', () => {
      it("should contain 'Select Departing Flight' in page header", () => {
        const { getByText } = createComponent({});

        expect(getByText('Select Departing Flight')).toBeInTheDocument();
      });

      it('should contain airport info in new page header piece', () => {
        const { container } = createComponent({});

        expect(container.querySelector('.shopping-air-stations-overview')).toHaveTextContent('Depart:DALAUS');
      });
    });

    describe('select returning flight', () => {
      it("should contain 'Select Returning' when select return flight", () => {
        const { getByText } = createComponent({
          response: new ProductsBuilder().withProductDefinitions().withInboundPage().build(),
          direction: 'inbound'
        });

        expect(getByText('Select Returning Flight')).toBeInTheDocument();
      });

      it('should contain airport info in page header', () => {
        const { container } = createComponent({
          response: new ProductsBuilder().withProductDefinitions().withInboundPage().build(),
          direction: 'inbound'
        });

        expect(container.querySelector('.shopping-air-stations-overview')).toHaveTextContent('Return:AUSDAL');
      });
    });
  });

  describe('calendarStrip', () => {
    it('should select default depart date when on the outbound product page', () => {
      const { container } = createComponent({});

      expect(container.querySelector('.calendar-strip--item_active')).toHaveTextContent('Sun, Jan 08');
    });

    it('should select default return date when on the inbound product page', () => {
      const { container } = createComponent({
        response: new ProductsBuilder().withProductDefinitions().withInboundPage().build(),
        direction: 'inbound'
      });

      expect(container.querySelector('.calendar-strip--item_active')).toHaveTextContent('Thu, Jan 12');
    });

    it('should trigger searchForMultiSelectGroupFlights when user click the calendarStrip for multi select group', () => {
      const { container } = createComponent({
        multiGroupData: new MultiSelectGroupBuilder().build().multipleAirportsData,
        multiSelectGroupState
      });

      const request = {
        searchRequest: {
          currencyType: 'USD',
          departureDate: '2017-01-07',
          destination: 'CLT',
          isRoundTrip: true,
          numberOfAdults: 1,
          origin: 'AUS',
          promoCode: '',
          returnDate: '2017-11-13',
          tripType: 'roundTrip'
        },
        multiSelectGroup: multiSelectGroupState,
        shouldSaveSearchRequest: false
      };

      fireEvent.click(container.querySelector('.calendar-strip--item'));

      expect(searchForMultiSelectGroupFlightsFnStub).toHaveBeenCalledWith(request);
    });

    it('should trigger searchForMultiSelectGroupFlights when user click the calendarStrip for multi select group with no drawer open', () => {
      const { container } = createComponent({
        response: { flightShoppingPage: null },
        multiGroupData: new MultiSelectGroupBuilder().build().multipleAirportsData,
        multiSelectGroupState
      });

      const request = {
        multiSelectGroup: multiSelectGroupState,
        searchRequest: {
          currencyType: 'USD',
          departureDate: '2017-01-07',
          destination: 'CLT',
          isRoundTrip: true,
          numberOfAdults: 1,
          origin: 'AUS',
          promoCode: '',
          returnDate: '2017-11-13',
          tripType: 'roundTrip'
        },
        shouldSaveSearchRequest: false
      };

      fireEvent.click(container.querySelector('.calendar-strip--item'));

      expect(searchForMultiSelectGroupFlightsFnStub).toHaveBeenCalledWith(request);
    });

    it('should trigger analytics action with selected date when click the calendar strip', () => {
      const { container } = createComponent({});

      fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

      expect(trackCalendarStripFnStub).toHaveBeenCalledWith('2017-01-09');
    });

    describe('invalid departure date dialog', () => {
      it('should show invalid depart date dialog when the selected depart date past the returning date', async () => {
        const { container } = createComponent({
          response: new ProductsBuilder().withProductDefinitions().withInboundPage(dayjs().add(7, 'day')).build()
        });

        fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
        expect(showDialogStub).toHaveBeenCalled();
      });

      it('should hide dialog and initialize to default selected date when click the cancel button', () => {
        const { container } = createComponent({
          response: new ProductsBuilder().withProductDefinitions().withInboundPage(dayjs().add(7, 'day')).build()
        });

        fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
        showDialogStub.mock.calls[0][0].buttons[0].onClick();

        const currentSelectedDate = container.querySelectorAll('.calendar-strip--item')[1];

        expect(hideDialogStub).toHaveBeenCalled();
        expect(currentSelectedDate).toHaveTextContent('Sun, Jan 08');
      });

      it('should trigger findFlightProducts and analytics action when click the continue button', () => {
        const { container } = createComponent({
          response: new ProductsBuilder().withProductDefinitions().withInboundPage(dayjs().add(7, 'day')).build()
        });

        fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
        showDialogStub.mock.calls[0][0].buttons[1].onClick();

        expect(hideDialogStub).toHaveBeenCalled();
      });
    });
  });

  describe('flightShoppingExplain', () => {
    it('should show flightShoppingExplain', () => {
      const { getByText } = createComponent({});

      expect(getByText('First 2 Bags Fly Free')).toBeInTheDocument();
    });

    it('should retrieve flight product list when user switch the currency', () => {
      const { container } = createComponent({});

      fireEvent.click(container.querySelector('.money-or-points--points'));

      expect(getProductListFnStub).toHaveBeenCalledWith({
        searchRequest: {
          origin: 'AUS',
          destination: 'CLT',
          departureDate: '2017-11-10',
          returnDate: '2017-11-13',
          currencyType: 'PTS',
          numberOfAdults: 1,
          tripType: 'roundTrip',
          isRoundTrip: true,
          promoCode: ''
        }
      });
    });

    it('should call searchForMultiSelectGroupFlights upon user switch the currency in case of multi select ', () => {
      const { container } = createComponent({
        multiGroupData: new MultiSelectGroupBuilder().build().multipleAirportsData,
        multiSelectGroupState,
        request: {
          currencyType: 'USD',
          departureDate: '2017-11-10',
          destination: 'CLT',
          isRoundTrip: true,
          multiSelectGroup: multiSelectGroupState,
          numberOfAdults: 1,
          origin: 'AUS',
          returnDate: '2017-11-13',
          tripType: 'roundTrip',
          promoCode: ''
        }
      });

      const request = {
        multiSelectGroup: multiSelectGroupState,
        searchRequest: {
          currencyType: 'PTS',
          departureDate: '2017-11-10',
          destination: 'CLT',
          isRoundTrip: true,
          multiSelectGroup: multiSelectGroupState,
          numberOfAdults: 1,
          origin: 'AUS',
          promoCode: '',
          returnDate: '2017-11-13',
          tripType: 'roundTrip'
        }
      };

      fireEvent.click(container.querySelector('.money-or-points--points'));

      expect(searchForMultiSelectGroupFlightsFnStub).toHaveBeenCalledWith(request);
    });

    it('should have showCurrencySwitch false when hasLapChild is true', () => {
      const searchFlightRequestWithLapChild = { ...searchFlightRequest, numberOfLapInfants: 1 };

      const { getByText } = createComponent({ request: searchFlightRequestWithLapChild });

      expect(getByText('First 2 Bags Fly Free')).toBeInTheDocument();
    });

    it('should have showCurrencySwitch true when searchRequest is undefined', () => {
      const { getByText } = createComponent({ request: undefined });

      expect(getByText('First 2 Bags Fly Free')).toBeInTheDocument();
    });
  });

  describe('highlightedFeatures', () => {
    it('should display two highlighted features', () => {
      const { getByText } = createComponent({});

      expect(getByText('First 2 Bags Fly Free')).toBeInTheDocument();
      expect(getByText('No Change Fees')).toBeInTheDocument();
    });
  });

  describe('footnotes', () => {
    it('should have received the footnote data', () => {
      const { getByText } = createComponent({});

      expect(getByText('* First and second checked bags. Weight and size limits apply.')).toBeInTheDocument();
    });
  });

  describe('flight products list', () => {
    describe('only adult', () => {
      it('should render a list for flight products', () => {
        const { container } = createComponent({});

        expect(container.querySelectorAll('.flight-shopping-page--product-card').length).toEqual(7);
      });
    });
  });

  describe('sort Select', () => {
    it('should have 4 options and placeholder', () => {
      const { container } = createComponent({});
      const dropdownItem = container.querySelectorAll('[data-qa="dqa-enabled-option"]');

      expect(dropdownItem[0]).toHaveTextContent('Depart Time');
      expect(dropdownItem[1]).toHaveTextContent('Price');
      expect(dropdownItem[2]).toHaveTextContent('Number of Stops');
      expect(dropdownItem[3]).toHaveTextContent('Duration');
    });

    it('should trigger sortFlightProductsFn callback when user select the product sort by', () => {
      const { container } = createComponent({});
      const dropdownItem = container.querySelectorAll('[data-qa="dqa-enabled-option"]');

      fireEvent.click(dropdownItem[0]);
      waitFor(() => {
        expect(sortFlightProductsFnStub).toHaveBeenCalled();
      });
    });
  });

  describe('promo code', () => {
    describe('user inputted the promo code', () => {
      it('should render the promo code applied if it is valid', () => {
        const { getByText } = createComponent({
          response: new ProductsBuilder().withProductDefinitions().withValidPromoCode().build()
        });

        expect(getByText('Promo code MWEBTESTPR applied!')).toBeInTheDocument();
      });

      it('should not render the promo code applied if it is invalid', () => {
        const { getByText } = createComponent({
          response: new ProductsBuilder().withProductDefinitions().withInvalidPromoCode().build()
        });

        expect(getByText('Oops! The promotion code entered was not recognized.')).toBeInTheDocument();
      });
    });
  });

  describe('sga message', () => {
    it('should render the sga message banner when you have a sga message', () => {
      const { getByText } = createComponent({
        response: new ProductsBuilder().withProductDefinitions().withSGAMessage().build()
      });

      expect(getByText('Subject to Government Approval')).toBeInTheDocument();
    });

    it('should not render the sga message banner when you do not have a sga message', () => {
      const { container } = createComponent({
        response: new ProductsBuilder().withProductDefinitions().build()
      });

      expect(container.querySelectorAll('.flight-shopping-page--sga-message-banner').length).toEqual(0);
    });
  });

  describe('flight selection', () => {
    it('should trigger getProductPricesFn callback', () => {
      const response = new ProductsBuilder().withProductDefinitions().build();

      response.flightShoppingPage.disclaimerWithLinks = 'All fares are rounded up to the nearest dollar';

      const { container } = createComponent({
        response
      });

      fireEvent.click(container.querySelectorAll('.flight-product--container')[0]);
      const params = selectFareFnStub.mock.calls[0][0].flightDetails;

      expect(params.flightCardIndex).toEqual(0);
      expect(params.params).toEqual({ direction: 'outbound', paxType: 'adult' });
      expect(params.card.flightNumbers).toEqual('4827');
      expect(params.disclaimerWithLinks).toEqual('All fares are rounded up to the nearest dollar');
    });

    it('should trigger onProductSelected with paxType default value', () => {
      const response = new ProductsBuilder().withProductDefinitions().build();

      const { container } = createComponent({
        response,
        paxType: undefined
      });

      fireEvent.click(container.querySelectorAll('.flight-product--container')[0]);
      const params = selectFareFnStub.mock.calls[0][0].flightDetails;

      expect(params.params).toEqual({ direction: 'outbound', paxType: 'adult' });
    });

    it('should trigger round-trip getProductPricesFn callback', () => {
      const response = new ProductsBuilder().withProductDefinitions().withInboundPage().build();

      const { container } = createComponent({
        multiSelectGroupState,
        response
      });

      fireEvent.click(container.querySelectorAll('.flight-product--container')[0]);

      const { flightDetails, isMultiSelectGroup } = selectFareFnStub.mock.calls[0][0];

      expect(flightDetails.card.flightNumbers).toEqual('4827');
      expect(flightDetails.disclaimerWithLinks).toEqual(null);
      expect(flightDetails.flightCardIndex).toEqual(0);
      expect(flightDetails.params).toEqual({ direction: 'outbound', paxType: 'adult' });
      expect(isMultiSelectGroup).toEqual(true);
    });
  });

  describe('when corporate', () => {
    it('should not show company header section if there is no associated company', () => {
      const { container } = createComponent({});

      expect(container.querySelectorAll('.company-name-banner').length).toEqual(0);
    });

    it('should show company header section if there is an associated company', () => {
      const { container } = createComponent({
        selectedCompanyName: 'Dunder Mifflin Paper Company'
      });

      expect(container.querySelectorAll('.company-name-banner').length).toEqual(1);
    });
  });

  describe('with flightShoppingPage response empty', () => {
    it('should not show anything if response.flightShoppingPage is null', () => {
      const { container } = createComponent({ response: { flightShoppingPage: null } });

      expect(container.querySelectorAll('.flight-shopping-page--title').length).toEqual(0);
      expect(container.querySelectorAll('.calendar-strip').length).toEqual(0);
      expect(container.querySelectorAll('.flight-shopping-explain').length).toEqual(0);
      expect(container.querySelectorAll('.flight-shopping-page--product-card').length).toEqual(0);
    });
  });

  describe('with sortFlightProductsFn', () => {
    it('should trigger sortFlightProductsFn, when _onSortBySelectChange is called', () => {
      const instance = React.createRef();

      createComponent({ ref: instance });

      instance.current._onSortBySelectChange();

      expect(sortFlightProductsFnStub).toHaveBeenCalled();
    });

    it('should trigger sortFlightProductsFn, when _onSortBySelectChange is called - with paxType default value', () => {
      const instance = React.createRef();

      createComponent({ ref: instance, paxType: undefined });

      instance.current._onSortBySelectChange();

      expect(sortFlightProductsFnStub).toHaveBeenCalledWith(undefined, 'outbound', 'adult');
    });
  });

  describe('multiSelectGroup', () => {
    it('should render flight shopping page with multiSelectGroup data', () => {
      const { container } = createComponent({
        response: { flightShoppingPage: null },
        multiGroupData: new MultiSelectGroupBuilder().build().multipleAirportsData
      });

      expect(container).toMatchSnapshot();
    });

    it('should dispatch searchForFlightsFnStub when FlightBoundDrawer is clicked', () => {
      const { container } = createComponent({
        response: { flightShoppingPage: null },
        multiGroupData: new MultiSelectGroupBuilder().build().multipleAirportsData
      });
      const getFirstBound = container.getElementsByClassName('flight-bound--container')[0];

      fireEvent.click(getFirstBound);

      expect(saveSearchRequestFnStub).toHaveBeenCalled();
      expect(searchForFlightsFnStub).toHaveBeenCalled();
    });

    it('should dispatch resetMultiSelectBoundSelectionStub when FlightBoundDrawer is closed', () => {
      const multipleAirportsData = new MultiSelectGroupBuilder().build().multipleAirportsData;
      const { container } = createComponent({
        multiGroupData: {
          ...multipleAirportsData,
          selectedBound: {
            originBoundAirport: 'MDW',
            destinationBoundAirport: 'BOS'
          }
        }
      });
      const getFirstBound = container.getElementsByClassName('flight-bound--container')[0];

      fireEvent.click(getFirstBound);

      expect(resetMultiSelectBoundSelectionStub).toHaveBeenCalled();
    });

    it('should open FlightBoundDrawer when bound is clicked', () => {
      const getMultiGroupResponse = new MultiSelectGroupBuilder().build().multipleAirportsData;
      const { container } = createComponent({
        multiGroupData: {
          ...getMultiGroupResponse,
          selectedBound: {
            originBoundAirport: 'MDW',
            destinationBoundAirport: 'BOS'
          }
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should dispatch fetchFlightShoppingPageSuccessFn on return page for multiSelect group', () => {
      const getMultiGroupResponse = new MultiSelectGroupBuilder().build().multipleAirportsData;

      createComponent({
        multiGroupData: {
          ...getMultiGroupResponse,
          selectedBound: {
            originBoundAirport: 'MDW',
            destinationBoundAirport: 'BOS'
          }
        },
        direction: 'inbound',
        multiSelectGroupState
      });

      expect(fetchFlightShoppingPageSuccessFnStub).toHaveBeenCalled();
    });

    it('should not dispatch fetchFlightShoppingPageSuccessFn for multiSelect group when there is no response', () => {
      const getMultiGroupResponse = new MultiSelectGroupBuilder().build().multipleAirportsData;

      createComponent({
        response: {},
        multiGroupData: {
          ...getMultiGroupResponse,
          selectedBound: {
            originBoundAirport: 'MDW',
            destinationBoundAirport: 'BOS'
          }
        },
        direction: 'outbound',
        multiSelectGroupState
      });

      expect(fetchFlightShoppingPageSuccessFnStub).not.toHaveBeenCalled();
    });

    it('should not dispatch fetchFlightShoppingPageSuccessFn on depart page', () => {
      createComponent({
        direction: 'outbound'
      });

      expect(fetchFlightShoppingPageSuccessFnStub).not.toHaveBeenCalled();
    });

    it('should not dispatch fetchFlightShoppingPageSuccessFn on return page', () => {
      createComponent({
        direction: 'inbound'
      });

      expect(fetchFlightShoppingPageSuccessFnStub).not.toHaveBeenCalled();
    });

    it('should dispatch updatetMultiSelectGroupCurrentDirection for multiselect group', () => {
      createComponent({
        multiSelectGroupState
      });

      expect(updatetMultiSelectGroupCurrentDirectionFnStub).toHaveBeenCalled();
    });

    it('should show unavailable for multiselect group', () => {
      const { container } = createComponent({
        multiSelectGroupState: { ...multiSelectGroupState, unavailableGroup: [{ origin: 'MDW', destination: 'BOS' }] }
      });

      expect(container.getElementsByClassName('flight-shopping-page--products-container')).toMatchSnapshot();
    });

    it('should return true if any bound is unavailable', () => {
      const instance = React.createRef();

      createComponent({
        multiSelectGroupState: { ...multiSelectGroupState, unavailableGroup: [{ destination: 'BOS',  origin: 'MDW' }] },
        ref: instance
      });

      expect(instance.current._checkForUnavailableMultiSelectGroup('MDW', 'BOS')).toBeTruthy();
    });

    it('should call scrollIntoView on selection flight bound', () => {
      const instance = React.createRef();
      const getMultiGroupResponse = new MultiSelectGroupBuilder().build().multipleAirportsData;

      Element.prototype.scrollIntoView = jest.fn();

      createComponent({
        direction: 'outbound',
        request: { ...searchFlightRequest, origin: 'MDW', destination: 'BOS' },
        multiGroupData: {
          ...getMultiGroupResponse,
          selectedBound: {
            originBoundAirport: 'MDW',
            destinationBoundAirport: 'BOS'
          }
        },
        multiSelectGroupState,
        ref: instance
      });

      instance.current._scrollIntoMultiSelectBound();

      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('should display top and bottom placements when response contain promoTop01 and bottomPromo1', () => {
      const imagePlacement = new ImagePlacementBuilder().build();

      const { container } = createComponent({
        placements: {
          promoTop01: imagePlacement,
          bottomPromo1: imagePlacement
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should display top and bottom placements when response contain promoTop01 - with displayType flex-placement', () => {
      const flexPlacement = new FlexPlacementBuilder().build();

      const { container } = createComponent({
        isLoggedIn: true,
        customerInfo: {
          name: {
            userName: 'Testedtoday',
            firstName: 'Tesla',
            lastName: 'Awesome'
          }
        },
        rapidRewardsDetails: {
          tierInfo: {
            tier: 'A_LIST_PREFERRED'
          },
          redeemablePoints: 293931
        },
        placements: {
          promoTop01: flexPlacement
        }
      });

      expect(container).toMatchSnapshot();
    });
  });

  const searchFlightRequest = {
    currencyType: 'USD',
    departureDate: '2017-11-10',
    destination: 'CLT',
    isRoundTrip: true,
    numberOfAdults: 1,
    origin: 'AUS',
    returnDate: '2017-11-13',
    tripType: 'roundTrip',
    promoCode: ''
  };

  const createComponent = ({
    request = searchFlightRequest,
    response = new ProductsBuilder().withProductDefinitions().build(),
    multiGroupData = {},
    direction = 'outbound',
    paxType,
    isCalendarStrip = true,
    isWebView = false,
    isLoggedIn = false,
    selectedCompanyName = '',
    customerInfo,
    rapidRewardsDetails,
    ref = React.createRef(),
    placements,
    multiSelectGroupState = {
      isSelected: false
    }
  }) => {
    const pages = response.flightShoppingPage ? generateFlightShoppingPages(response) : [];
    const params = {
      direction
    };

    if (paxType !== undefined) {
      params.paxType = 'adult';
    }
    const pageProps = {
      params,
      flightShoppingPage: {
        pages,
        response,
        sortBy: {
          adult: {
            outbound: 'departureTime',
            inbound: 'departureTime'
          }
        },
        multiSelectGroup: multiGroupData
      },
      searchRequest: request,
      selectedProducts: {
        adult: {
          outbound: {
            fareProductId: 'id',
            flightCardIndex: 0
          }
        }
      },
      customerInfo,
      rapidRewardsDetails,
      getFlightSelectPagePlacementsFn: getFlightSelectPagePlacementsFnStub,
      sortFlightProductsFn: sortFlightProductsFnStub,
      getProductListFn: getProductListFnStub,
      selectFareFn: selectFareFnStub,
      lastBookableDate: '2017-03-01',
      push: _.noop,
      isCalendarStrip,
      isWebView,
      isLoggedIn,
      placements,
      showDialogFn: showDialogStub,
      hideDialogFn: hideDialogStub,
      getUserInfoFn: getUserInfoFnStub,
      selectedCompanyName,
      trackCalendarStripFn: trackCalendarStripFnStub,
      saveSearchRequestFn: saveSearchRequestFnStub,
      searchForFlightsFn: searchForFlightsFnStub,
      setCalendarStripFn: setCalendarStripFnStub,
      updateMultiSelectBoundFn: updateMultiSelectBoundFnStub,
      resetMultiSelectBoundSelectionFn: resetMultiSelectBoundSelectionStub,
      searchForMultiSelectGroupFlightsFn: searchForMultiSelectGroupFlightsFnStub,
      fetchFlightShoppingPageSuccessFn: fetchFlightShoppingPageSuccessFnStub,
      updatetMultiSelectGroupCurrentDirectionFn: updatetMultiSelectGroupCurrentDirectionFnStub,
      ref,
      multiSelectGroupState
    };

    const store = configureMockStore()({
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return render(
      <Provider store={store}>
        <FlightShoppingPage {...pageProps} />
      </Provider>
    );
  };
});
