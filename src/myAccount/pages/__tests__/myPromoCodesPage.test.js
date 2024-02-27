jest.mock('src/wcm/components/dynamicPlacement', () => () => <div>Mocked Placement</div>);
jest.mock('src/shared/helpers/wcmTransitionHelper', () => ({
  __esModule: true,
  default: jest.fn()
}));

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import i18n from '@swa-ui/locale';
import { MyPromoCodesPage } from 'src/myAccount/pages/myPromoCodesPage';
import createMockStore from 'test/unit/helpers/configureMockStore';
import PromoCodesBuilder from 'test/builders/model/promoCodesBuilder';
import * as UrlHelper from 'src/shared/helpers/urlHelper';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

const mockStore = createMockStore();

describe('My Promo Codes Page Component', () => {
  const promoCodesList = new PromoCodesBuilder().build();
  let clearPromoCodesFnMock;
  let pushFnMock;
  let getPromoCodesFnMock;
  let getPromoCodesPagePlacementsFnMock;
  let page;

  beforeEach(() => {
    clearPromoCodesFnMock = jest.fn();
    pushFnMock = jest.fn();
    getPromoCodesPagePlacementsFnMock = jest.fn();
    getPromoCodesFnMock = jest.fn();
    page = createComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct component', () => {
    const myPromoCodePageComponent = createComponent();

    expect(myPromoCodePageComponent.baseElement).toMatchSnapshot();
  });

  it('should show page header', () => {
    const pageHeader = page.container.querySelector('.action-bar--container');

    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader.textContent).toEqual(i18n('MY_ACCOUNT__MY_PROMO_CODES'));
  });

  it('should show showback button', () => {
    const pageHeaderBtn = page.container.querySelector('.goback-link');

    expect(pageHeaderBtn).toBeInTheDocument();
    expect(pageHeaderBtn.querySelector('.icon_keyboard-arrow-left')).not.toBeNull();
  });

  it('should display wcm placement content when flag is true', () => {
    const placements = {
      promoTop01: {
        placement: { childContent: 'mock children' },
        placementData: { response: 'mock response' }
      }
    };

    const pageWrapperComponent = createComponent({ promoCodesList, placements });

    expect(pageWrapperComponent.container.textContent).toContain('Mocked Placement');
  });

  it('should not display placement when wcm response does not contain promoTop1', () => {
    const placements = null;
    const pageWrapperComponent = createComponent({ placements, promoCodesList });
    const wrapper = pageWrapperComponent.container.querySelector(`[data-qa="promoTop01"]`);

    expect(wrapper).toBeNull();
  });

  it('should not display promo codes when promoCodesList is empty', () => {
    const pageWrapperComponent = createComponent({});

    const promoCodesListWrapper = pageWrapperComponent.container.querySelector('[data-qa="promo-codes-list-content"]');

    expect(promoCodesListWrapper).toBeNull();
  });

  it('should display promo codes when promoCodesList is present', () => {
    const pageWrapperComponent = createComponent({ promoCodesList });

    const promoCodesListWrapper = pageWrapperComponent.container.querySelector('[data-qa="promo-codes-list-content"]');

    expect(promoCodesListWrapper).toBeDefined();
  });

  it('should display no promo code found message when flag is false', () => {
    const pageComponent = createComponent();
    const noPromoCodeMessage = pageComponent.container.querySelector('[data-qa="no-promo-code-found-message"]');

    expect(noPromoCodeMessage.textContent).toEqual(i18n('MY_ACCOUNT__NO_PROMO_CODE_FOUND_MESSAGE'));
  });

  it('should display no promo code found  message', () => {
    const noPromoCodeMessage = page.container.querySelector('[data-qa="no-promo-code-found-message"]');

    expect(noPromoCodeMessage).toBeInTheDocument();
    expect(noPromoCodeMessage.textContent).toEqual(i18n('MY_ACCOUNT__NO_PROMO_CODE_FOUND_MESSAGE'));
  });

  it('should navigate to mweb shopping page when book flight button is clicked', () => {
    jest.spyOn(AppSelector, 'getCurrentAppFlow')
      .mockReturnValueOnce('my-account');
    jest.spyOn(UrlHelper, 'getNormalizedRoute')
      .mockReturnValueOnce('/air/booking');
      
    const pageComponent = createComponent({ promoCodesList });

    fireEvent.click(pageComponent.container.querySelector('.promo-codes--book-flight-button'));

    expect(pushFnMock).toHaveBeenCalledWith('/air/booking', null, {
      currencyType: 'USD',
      promoCode: 'ABCDEFGHI'
    });
  });

  it('should navigate to native shopping page when book flight button is clicked', () => {
    const pageComponent = createComponent({ isWebView: true, promoCodesList });

    fireEvent.click(pageComponent.container.querySelector('.promo-codes--book-flight-button'));

    expect(wcmTransitionTo.mock.calls[0][0]).toEqual({
      linkType: 'webview',
      target: 'swaAppLink://airbooking?isPoints=false&promoCode=ABCDEFGHI'
    });
  });

  const createComponent = (props = {}) => {
    const state = {
      app: {
        toggles: {
          PROMO_CODE_IN_MY_ACCOUNT: false
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const defaultProps = {
      clearPromoCodesFn: clearPromoCodesFnMock,
      getPromoCodesFn: getPromoCodesFnMock,
      getPromoCodesPagePlacementsFn: getPromoCodesPagePlacementsFnMock,
      isWebView: false,
      promoCodesList: [],
      push: pushFnMock
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={mockStore(state)}>
        <MyPromoCodesPage {...finalProps} />
      </Provider>
    );
  };
});
