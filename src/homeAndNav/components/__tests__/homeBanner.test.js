import '@testing-library/jest-dom/extend-expect';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { MOBILE_HERO } from 'src/wcm/constants/wcmConstants';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import HomeBanner from 'src/homeAndNav/components/homeBanner';
import React from 'react';

describe('HomeBanner', () => {
  const handleFirmOfferOfCreditFnMock = jest.fn();
  const onHomeBannerClickMock = jest.fn();

  const homeBanners = [
    {
      displayType: MOBILE_HERO,
      imageForegroundAltText: 'Book Air Travel',
      isChaseCombo: false,
      isChasePlacement: false,
      isChasePrequal: true,
      linkType: 'app',
      promoImageBackground: '/content/mkt/images/hero_shots/750NativeAppsBG_couple.jpg',
      promoImageForeground: '/content/mkt/images/hero_shots/750kayakDudeFG.png',
      placementData: {
        isChasePrequal: true,
        contentBlockId: '3885095'
      },
      shouldObserveViewPort: true,
      target: 'airbooking',
      viewPortThreshold: 0.1,
      contentBlockId: '3885095'
    },
    {
      contentBlockId: '3885096',
      displayType: MOBILE_HERO,
      imageForegroundAltText: 'Book a Car',
      isChaseCombo: false,
      isChasePlacement: false,
      isChasePrequal: false,
      linkType: 'app',
      placementData: {
        contentBlockId: '3885096'
      },
      promoImageBackground: '/content/mkt/images/hero_shots/750NativeAppsBG_kayakdude.jpg',
      promoImageForeground: '/content/mkt/images/hero_shots/750MWHero_iphone6PlusFG.png',
      shouldObserveViewPort: false,
      target: 'carbooking',
      viewPortThreshold: 0.1
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = createComponent({ homeBanners });

    expect(container).toMatchSnapshot();
  });

  describe('chase prequal', () => {
    it('should call foc if prequal', () => {
      const { container } = createComponent({ homeBanners });

      expect(container.querySelector('.image-placement')).not.toBeNull();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      onHomeBannerClick: onHomeBannerClickMock,
      handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnMock
    };
    const finalProps = { ...defaultProps, ...props };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <HomeBanner {...finalProps} />
      </Provider>
    );
  };
});
