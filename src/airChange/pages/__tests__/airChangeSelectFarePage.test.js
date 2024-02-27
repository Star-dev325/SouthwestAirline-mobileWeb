jest.mock('src/wcm/actions/wcmActions', () => ({
  fetchFareDetailsJson: jest.fn()
}));
jest.mock('src/shared/analytics/helpers/analyticsEventHelper', () => ({
  raiseSatelliteEvent: jest.fn()
}));

import { fireEvent } from '@testing-library/react';
import productDefinitions from 'mocks/templates/productDefinitions';
import { generateFlightShoppingPages } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { AirChangeSelectFarePage, mapStateToProps } from 'src/airChange/pages/airChangeSelectFarePage';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as wcmActions from 'src/wcm/actions/wcmActions.js';
import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import FakeClock from 'test/unit/helpers/fakeClock';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils.js';

const response = new ProductsBuilder().withSelectedData('2018-01-01').withProductDefinitions().build();
const pages = generateFlightShoppingPages(response);
const card = pages[0].cards[0];

describe('AirChangeSelectFarePage', () => {
  let cancelStub;
  let fareSelectedStub;
  let page;
  const flightCardIndex = 42;
  const selectedProducts = {
    outbound: {
      fareProductId: 'outboundFareProduct',
      flightProductType: 'NORMAL',
      flightCardIndex
    }
  };
  const fareDetailsLink = {
    href: '/mock-fare-details-href',
    labelText: 'Mock Fare Details Text'
  };

  beforeEach(() => {
    FakeClock.setTimeTo('2017-01-01');
    cancelStub = jest.fn();
    fareSelectedStub = jest.fn();
    page = {
      _meta: {
        isPromoCodeApplied: false
      },
      isOutbound: false,
      params: { direction: 'inbound' }
    };
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  describe('Fare Details Link', () => {
    it('should render a link that transitions to the WCM fareDetails page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container } = createComponent();

      fireEvent.click(container.querySelector('[data-qa="fare-details-link"]'));

      expect(wcmActions.fetchFareDetailsJson).toHaveBeenCalledWith(
        fareDetailsLink.href, `/air/change/fare-details`
      );
      expect(AnalyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalled();
    });
  });

  describe('Page Header', () => {
    it('should match the snapshot', () => {
      const pageWithDisclaimer = {
        ...page,
        disclaimerWithLinks: 'All fares are rounded up to the nearest dollar'
      };
      const { container } = createComponent({ page: pageWithDisclaimer });

      expect(container).toMatchSnapshot();
    });

    it('should omit disclaimer when not provided', () => {
      const { container } = createComponent({ disclaimerWithLinks: null });

      expect(container).toMatchSnapshot();
    });

    it('should call cancel when cancel button clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.cancel'));

      expect(cancelStub).toHaveBeenCalled();
    });
  });

  it('should call onFareSelected with the selected fareProduct a fare is clicked', () => {
    const selectedFareIndex = 0;
    const selectedFareProduct = card.fares[selectedFareIndex];
    const { container } = createComponent({
      nextProductPageParams: {}
    });

    fireEvent.click(container.querySelector('.flight-product-section'));

    expect(fareSelectedStub).toHaveBeenCalledWith({
      fareProduct: selectedFareProduct,
      page,
      flightCardIndex: 42,
      isDynamicWaiver: false,
      isLoggedIn: false,
      isReaccom: false,
      selectedBounds: {
        firstbound: true,
        secondbound: false
      },
      selectedProducts,
      sortByValue: 'departureTime'
    });
  });

  it('should do nothing when fare is clicked and fare was not available', () => {
    const { container } = createComponent({
      card: {
        ...card,
        fares: []
      }
    });

    fireEvent.click(container.querySelector('.flight-product-section'));

    expect(fareSelectedStub).not.toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const pageProps = {
      airportInfo: 'DAL-HOU',
      card,
      fareDetailsLink,
      fareSelectedFn: fareSelectedStub,
      fetchFareDetailsJsonFn: wcmActions.fetchFareDetailsJson,
      flightCardIndex,
      goBack: cancelStub,
      isPromoCodeApplied: false,
      isLoggedIn: false,
      isReaccom: false,
      page,
      params: {
        paxType: 'adult',
        direction: 'inbound'
      },
      productDefinitions,
      selectedBounds: {
        firstbound: true,
        secondbound: false
      },
      selectedProducts,
      sortByValue: 'departureTime',
      ...props
    };

    return integrationRender()({}, AirChangeSelectFarePage, pageProps);
  };
});

describe('Redux Store Properties inside component props', () => {
  let fareDetails, inbound, initialState, outbound;

  beforeEach(() => {
    inbound = {
      sortByValue: 'departureTime',
      isLoggedIn: false,
      isReaccom: false,
      selectedBounds: {
        firstbound: true,
        secondbound: false
      },
      params: {
        paxType: 'adult',
        direction: 'inbound'
      },
      card
    };
    outbound = {
      ...inbound,
      params: {
        paxType: 'adult',
        direction: 'outbound'
      }
    };

    fareDetails = {
      href: '/mock-fare-details-href',
      labelText: 'Mock Fare Details Text'
    };

    initialState = {
      app: {
        airChange: {
          changeShoppingPage: {
            response: {
              _links: {
                fareDetailsJson: fareDetails
              },
              productDefinitions
            }
          },
          selectFarePage: {
            selectedFlight: {
              inbound,
              outbound,
              currentDirection: 'inbound'
            }
          }
        }
      }
    };
  });

  it('should receive selected flight as inbound state flight when direction is inbound from mapStatetoProps', () => {
    const expectedProps = {
      fareDetailsLink: fareDetails,
      productDefinitions,
      ...inbound
    };

    const params = {
      direction: 'inbound'
    };

    expect(mapStateToProps(initialState, { params })).toEqual(expectedProps);
  });

  it('should receive selected flight as outbound state flight when direction is outbound from mapStatetoProps', () => {
    const expectedProps = {
      fareDetailsLink: fareDetails,
      productDefinitions,
      ...outbound
    };

    const params = {
      direction: 'outbound'
    };

    expect(mapStateToProps(initialState, { params })).toEqual(expectedProps);
  });
});
