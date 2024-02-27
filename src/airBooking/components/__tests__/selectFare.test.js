jest.mock('src/shared/components/fareProductList', () =>
  jest.fn((props) => (
    <button className="fare-product-list-select-button"
      onClick={() => props.onFareSelected(props.fares[0])}>
      Mock Product List
    </button>
  ))
);

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { SelectFare } from 'src/airBooking/components/selectFare';
import FakeClock from 'test/unit/helpers/fakeClock';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testingLibraryUtils';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import SearchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import * as wcmActions from 'src/wcm/actions/wcmActions.js';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as UrlHelper from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import ImagePlacementBuilder from 'test/builders/model/imagePlacementBuilder';

const response = new ProductsBuilder().withSelectedData('2018-01-01').withProductDefinitions().build();
const productDefinitions = response.flightShoppingPage.productDefinitions;
const pages = generateFlightShoppingPages(response);
const card = pages[0].cards[0];
const disclaimerWithLinks = 'All fares are rounded up to the nearest dollar';

const expectedRequest = {
  currencyType: 'USD',
  departureDate: '2015-11-10',
  destination: 'AUS',
  isRoundTrip: true,
  numberOfAdults: 1,
  numberOfSeniors: 0,
  numberOfLapInfants: 0,
  origin: 'ATL',
  returnDate: '2015-12-10',
  tripType: 'roundTrip',
  useLowFareCalendar: false,
  isInitialSearch: true
};
const expectedSelectedProducts = { adult: { outbound: { fareProductId: 'id', flightCardIndex: 0 } } };
const expectedPricePageLink = {
  body: { adultPassengers: null, chaseSessionId: null, currency: 'USD' },
  href: '/v1/mobile-air-booking/page/flights/prices',
  method: 'POST'
};
const fareDetailsLink = {
  href: '/mock-fare-details-href',
  labelText: 'Mock Fare Details Text'
};
const accountInfo = {
  customerInfo: {
    name: {
      userName: 'Mock Name Details Text'
    }
  }
};

describe('selectFare', () => {
  let cancelMock;
  let selectFlightProductMock;
  let fetchFareDetailsJsonFnMock;
  let raiseSatelliteEventMock;
  let getFlightSelectFarePagePlacementsFnMock;
  let sortFlightProductsFnMock;

  beforeEach(() => {
    FakeClock.setTimeTo('2017-01-01');
    cancelMock = jest.fn();
    selectFlightProductMock = jest.fn();
    getFlightSelectFarePagePlacementsFnMock = jest.fn();
    fetchFareDetailsJsonFnMock = jest.spyOn(wcmActions, 'fetchFareDetailsJson');
    raiseSatelliteEventMock = jest.spyOn(AnalyticsEventHelper, 'raiseSatelliteEvent');
    sortFlightProductsFnMock = jest.fn();
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  describe('Page Header', () => {
    it('should render', () => {
      const { baseElement } = createComponent();

      expect(baseElement).toMatchSnapshot();
    });

    it('should render with Returning destination', () => {
      const { baseElement } = createComponent({ disclaimerWithLinks });

      expect(baseElement).toMatchSnapshot();
    });

    it('should omit disclaimer when not provided', () => {
      const { baseElement } = createComponent({ disclaimerWithLinks: null });

      expect(baseElement).toMatchSnapshot();
    });

    it('should call cancel when cancel button clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.cancel'));

      expect(cancelMock).toHaveBeenCalled();
    });
  });

  it('should display top and bottom placements when response contain promoTop01, bottomPromo1 and accountinfo', () => {
    const imagePlacement = new ImagePlacementBuilder().build();

    const { container } = createComponent({
      placements: {
        promoTop01: imagePlacement,
        bottomPromo1: imagePlacement
      },
      accountInfo: accountInfo
    });

    expect(container).toMatchSnapshot();
  });

  it('should display top and bottom placements when response contain promoTop01, bottomPromo1 and when accountinfo undefined', () => {
    const imagePlacement = new ImagePlacementBuilder().build();

    const { container } = createComponent({
      placements: {
        promoTop01: imagePlacement,
        bottomPromo1: imagePlacement
      },
      accountInfo: undefined
    });

    expect(container).toMatchSnapshot();
  });

  it('should call selectFlightProduct with the selected productId', () => {
    const selectedFareIndex = 0;
    const productId = card.fares[selectedFareIndex]._meta.productId;

    const { container } = createComponent({
      fares: card.fares,
      nextProductPageParams: {}
    });

    fireEvent.click(container.querySelector('.fare-product-list-select-button'));

    expect(selectFlightProductMock).toHaveBeenCalledWith({
      direction: 'outbound',
      fareProductId: productId,
      flightCardIndex: 0,
      flightPricingPage: expectedPricePageLink,
      nextProductPagePath: null,
      paxType: 'adult',
      searchRequest: expectedRequest,
      selectedProducts: expectedSelectedProducts,
      tier: undefined
    });
  });

  it('should call selectFlightProduct called with default paxType with the selected productId', () => {
    const selectedFareIndex = 0;
    const productId = card.fares[selectedFareIndex]._meta.productId;

    const { container } = createComponent({
      fares: card.fares,
      nextProductPageParams: {},
      paxType: undefined
    });

    fireEvent.click(container.querySelector('.fare-product-list-select-button'));

    expect(selectFlightProductMock).toHaveBeenCalledWith({
      direction: 'outbound',
      fareProductId: productId,
      flightCardIndex: 0,
      flightPricingPage: expectedPricePageLink,
      nextProductPagePath: null,
      paxType: 'adult',
      searchRequest: expectedRequest,
      selectedProducts: expectedSelectedProducts,
      tier: undefined
    });
  });

  it('should call selectFlightProduct with selected productId and the provided tier when fare is clicked and tier has a string value', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/booking');
    const mockTierValue = 'mock tier value';
    const productId = card.fares[0]._meta.productId;
    const { container } = createComponent({ tier: mockTierValue });

    fireEvent.click(container.querySelector('.fare-product-list-select-button'));

    expect(selectFlightProductMock).toHaveBeenCalledWith({
      direction: 'outbound',
      fareProductId: productId,
      flightCardIndex: 0,
      flightPricingPage: expectedPricePageLink,
      nextProductPagePath: '/air/booking/select-return.html',
      paxType: 'adult',
      searchRequest: expectedRequest,
      selectedProducts: expectedSelectedProducts,
      tier: mockTierValue
    });
  });

  it('should call selectFlightProduct with selected productId and the provided tier when fare is clicked and tier has a string value', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/booking');
    const mockTierValue = 'mock tier value';
    const productId = card.fares[0]._meta.productId;
    const { container } = createComponent({ tier: mockTierValue });

    fireEvent.click(container.querySelector('.fare-product-list-select-button'));

    expect(selectFlightProductMock).toHaveBeenCalledWith({
      direction: 'outbound',
      fareProductId: productId,
      flightCardIndex: 0,
      flightPricingPage: expectedPricePageLink,
      nextProductPagePath: '/air/booking/select-return.html',
      paxType: 'adult',
      searchRequest: expectedRequest,
      selectedProducts: expectedSelectedProducts,
      tier: mockTierValue
    });
  });

  it('should push fare details href when clicked', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('air/booking');
    const { getByText } = createComponent();

    fireEvent.click(getByText(fareDetailsLink.labelText));

    expect(fetchFareDetailsJsonFnMock).toHaveBeenCalledWith(fareDetailsLink.href, `/air/booking/fare-details`);
    expect(raiseSatelliteEventMock).toHaveBeenCalled();
  });

  it('should call the sortFlightProducts function if the direction is inbound', () => {
    const { container } = createComponent({ params: { direction: 'inbound' } });

    fireEvent.click(container.querySelector('.fare-product-list-select-button'));

    expect(sortFlightProductsFnMock).toHaveBeenCalled();
  });

  describe('next direction', () => {
    beforeEach(() => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow')
        .mockReturnValueOnce('air/booking');
    });

    const expectedObject = {
      direction: 'outbound',
      fareProductId: card.fares[0]._meta.productId,
      flightCardIndex: 0,
      flightPricingPage: expectedPricePageLink,
      paxType: 'adult',
      searchRequest: expectedRequest,
      selectedProducts: expectedSelectedProducts,
      tier: undefined
    };

    it('should return the same value as the nextProductPageParams direction if the user is on a non-normalized url', () => {
      jest.spyOn(UrlHelper, 'isOnOldRoute')
        .mockReturnValueOnce(true);

      const { container } = createComponent({ nextProductPageParams: { direction: 'inbound', paxType: 'adult' } });

      fireEvent.click(container.querySelector('.fare-product-list-select-button'));

      expect(selectFlightProductMock).toHaveBeenCalledWith({
        ...expectedObject,
        nextProductPagePath: `/air/booking/select-return.html`
      });
    });

    it(`should return 'depart' if the user is on a normalized url and the nextProductPageParams direction is outbound`, () => {
      jest.spyOn(UrlHelper, 'isOnOldRoute')
        .mockReturnValueOnce(false);

      const { container } = createComponent({ nextProductPageParams: { direction: 'outbound', paxType: 'adult' } });

      fireEvent.click(container.querySelector('.fare-product-list-select-button'));

      expect(selectFlightProductMock).toHaveBeenCalledWith({
        ...expectedObject,
        nextProductPagePath: `/air/booking/select-depart.html`
      });
    });

    it(`should return 'return' if the user is on a normalized url and the nextProductPageParams direction is inbound`, () => {
      jest.spyOn(UrlHelper, 'isOnOldRoute')
        .mockReturnValueOnce(false);

      const { container } = createComponent({ nextProductPageParams: { direction: 'inbound', paxType: 'adult' } });

      fireEvent.click(container.querySelector('.fare-product-list-select-button'));

      expect(selectFlightProductMock).toHaveBeenCalledWith({
        ...expectedObject,
        nextProductPagePath: `/air/booking/select-return.html`
      });
    });
  });

  it('should not render the fare details footer if the footer text or link data is missing', () => {
    const { container } = createComponent({ fareDetailsLink: undefined });

    expect(container.querySelector('.fare-details-link')).toBeNull();
  });

  describe('when corporate', () => {
    it('should show company header section if there is an associated company', () => {
      const { baseElement } = createComponent({ selectedCompanyName: 'Dunder Mifflin Paper Company' });

      expect(baseElement).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const selectedProducts = {
      adult: {
        outbound: {
          fareProductId: 'id',
          flightCardIndex: 0
        }
      }
    };
    const flightPricingPage = {
      href: '/v1/mobile-air-booking/page/flights/prices',
      method: 'POST',
      body: {
        adultPassengers: null,
        currency: 'USD',
        chaseSessionId: null
      }
    };
    const searchRequest = new SearchForFlightsRequestBuilder().build();

    const params = {
      direction: 'outbound'
    };

    if (props.paxType !== undefined) {
      params.paxType = 'adult';
    }

    const pageProps = {
      isPromoCodeApplied: false,
      flightCardIndex: 0,
      airportInfo: 'DAL-HOU',
      params,
      nextProductPageParams: { direction: 'inbound', paxType: 'adult' },
      card,
      selectedProducts,
      productDefinitions,
      searchRequest,
      sortStrategy: 'departureTime',
      flightPricingPage,
      selectFlightProductFn: selectFlightProductMock,
      getFlightSelectFarePagePlacementsFn: getFlightSelectFarePagePlacementsFnMock,
      sortFlightProductsFn: sortFlightProductsFnMock,
      fetchFareDetailsJsonFn: fetchFareDetailsJsonFnMock,
      goBack: cancelMock,
      selectedCompanyName: '',
      fareDetailsLink,
      tier: undefined,
      ...props
    };

    return mountWithMemoryRouterAndState(SelectFare, state, null, pageProps);
  };
});
