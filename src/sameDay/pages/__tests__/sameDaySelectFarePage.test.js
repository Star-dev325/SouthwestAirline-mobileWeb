jest.mock('src/sameDay/actions/sameDayActions');

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as SameDayActions from 'src/sameDay/actions/sameDayActions';
import SameDaySelectFarePage, { SameDaySelectFarePage as SameDaySelectFarePageComponent } from 'src/sameDay/pages/sameDaySelectFarePage';
import * as wcmActions from 'src/wcm/actions/wcmActions.js';
import sameDayBuilder from 'test/builders/apiResponse/sameDayBuilder';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import FakeClock from 'test/unit/helpers/fakeClock';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testingLibraryUtils';

const { sameDayShoppingInformation } = new sameDayBuilder().build();
const card = sameDayShoppingInformation.cards[0];
const disclaimerWithLinks = sameDayShoppingInformation.expandedDetails.disclaimerWithLinks;
const productDefinitions = sameDayShoppingInformation.productDefinitions;
const fareDetailsLink = {
  href: '/mock-fare-details-href',
  labelText: 'Mock Fare Details Text'
};

describe('SameDaySelectFarePage', () => {
  let cancelMock;
  let fetchFareDetailsJsonFnMock;

  beforeEach(() => {
    cancelMock = jest.fn();
    FakeClock.setTimeTo('2017-01-01');
    fetchFareDetailsJsonFnMock = jest.spyOn(wcmActions, 'fetchFareDetailsJson');
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
      const { baseElement } = createComponent({}, { disclaimerWithLinks });

      expect(baseElement).toMatchSnapshot();
    });

    it('should omit disclaimer when not provided', () => {
      const { baseElement } = createComponent({}, { disclaimerWithLinks: null });

      expect(baseElement).toMatchSnapshot();
    });

    it('should use default values if no fare details link is provided', () => {
      const { baseElement } = createComponent({}, { fareDetailsJson: null });

      expect(baseElement).toMatchSnapshot();
    });

    it('should call cancel when cancel button clicked', () => {
      const { container } = createComponentAsNamed();

      fireEvent.click(container.querySelector('.cancel'));

      expect(cancelMock).toHaveBeenCalled();
    });
  });

  describe('onFareSelected', () => {
    it('should push fare details href when clicked', () => {
      const { getByText } = createComponentAsNamed();

      fireEvent.click(getByText(fareDetailsLink.labelText));

      expect(fetchFareDetailsJsonFnMock).toHaveBeenCalledWith(fareDetailsLink.href, '/same-day/shopping/fare-details');
    });

    it('should render with fare selected onClick ', () => {
      const retrieveSameDayPricingDetailsInformationMock = jest.spyOn(SameDayActions, 'retrieveSameDayPricingDetailsInformation').mockReturnValueOnce({
        type: 'test'
      });
      const { container } = createComponent({});

      fireEvent.click(container.querySelector('.flight-product-section'));

      expect(retrieveSameDayPricingDetailsInformationMock).toHaveBeenCalled();
    });

    it('should render with fare selected onClick with empty', () => {
      const retrieveSameDayPricingDetailsInformationMock = jest.spyOn(SameDayActions, 'retrieveSameDayPricingDetailsInformation').mockReturnValueOnce({
        type: 'test'
      });
      const { sameDayShoppingInformation } = new sameDayBuilder().withCardsWithoutFareMetaProductId().build();
      const cardWithoutProductId = sameDayShoppingInformation.cards[0];
      const { container } = createComponent({}, { sameDaySelectFarePage: cardWithoutProductId });

      fireEvent.click(container.querySelector('.flight-product-section'));

      expect(retrieveSameDayPricingDetailsInformationMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const pageProps = {
      fetchFareDetailsJsonFn: fetchFareDetailsJsonFnMock,
      ...props
    };
    const _links = { fareDetailsJson: { ...fareDetailsLink }, ...state };
    const defaultState = {
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        sameDay: {
          ...{ sameDaySelectFarePage: card, ...state },
          sameDayShoppingPage: {
            sameDayShoppingInformation: {
              _links,
              expandedDetails: {
                disclaimerWithLinks,
                ...state
              },
              productDefinitions
            }
          }
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SameDaySelectFarePage {...pageProps} />
        </BrowserRouter>
      </Provider>
    );
  };

  const createComponentAsNamed = (props = {}) => {
    const pageProps = {
      card,
      disclaimerWithLinks,
      fareDetailsLink,
      fetchFareDetailsJsonFn: fetchFareDetailsJsonFnMock,
      goBack: cancelMock,
      productDefinitions,
      sameDayShoppingInformation,
      ...props
    };

    return mountWithMemoryRouterAndState(SameDaySelectFarePageComponent, {}, null, pageProps);
  };
});
