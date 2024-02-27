import { render } from '@testing-library/react';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { MOBILE_HERO } from 'src/wcm/constants/wcmConstants';
import { Provider } from 'react-redux';
import HomeHero from 'src/homeAndNav/components/homeHero';
import React from 'react';

describe('HomeHero', () => {
  const onHomeHeroItemClickMock = jest.fn();
  const handleFirmOfferOfCreditFnMock = jest.fn();

  const heroContents = [
    {
      displayType: MOBILE_HERO,
      promoImageForeground: '/content/mkt/images/hero_shots/750kayakDudeFG.png',
      imageForegroundAltText: 'Book Air Travel',
      promoImageBackground: '/content/mkt/images/hero_shots/750NativeAppsBG_couple.jpg',
      linkType: 'app',
      target: 'airbooking',
      isChaseCombo: false,
      isChasePrequal: true,
      isChasePlacement: false,
      shouldObserveViewPort: true,
      viewPortThreshold: 0.75,
      contentBlockId: '3885095'
    },
    {
      displayType: MOBILE_HERO,
      promoImageForeground: '/content/mkt/images/hero_shots/750MWHero_iphone6PlusFG.png',
      imageForegroundAltText: 'Book a Car',
      promoImageBackground: '/content/mkt/images/hero_shots/750NativeAppsBG_kayakdude.jpg',
      linkType: 'app',
      target: 'carbooking',
      isChaseCombo: false,
      isChasePrequal: false,
      isChasePlacement: false,
      shouldObserveViewPort: false,
      viewPortThreshold: 0.1,
      contentBlockId: '3885096'
    },
    {
      displayType: MOBILE_HERO,
      promoImageForeground: '/content/mkt/images/hero_shots/chase-promo-foreground.png',
      imageForegroundAltText: 'Chase Promo',
      promoImageBackground: '/content/mkt/images/hero_shots/chase-promo-background.jpg',
      linkType: 'browser',
      target: 'airbooking',
      isChaseCombo: true,
      isChasePrequal: false,
      isChasePlacement: false,
      shouldObserveViewPort: false,
      viewPortThreshold: 0.1,
      contentBlockId: '3885097'
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = createComponent({ heroContents });

    expect(container).toMatchSnapshot();
  });

  describe('chase prequal', () => {
    it('should call foc if logged in and prequal', () => {
      const { container } = createComponent({ heroContents });

      expect(container.querySelector('.image-placement')).not.toBeNull();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      onHomeHeroItemClick: onHomeHeroItemClickMock,
      handleFirmOfferOfCreditFn: handleFirmOfferOfCreditFnMock
    };

    const finalProps = { ...defaultProps, ...props };

    const store = createMockStoreWithRouterMiddleware()();

    return render(
      <Provider store={store}>
        <HomeHero {...finalProps} />
      </Provider>
    );
  };
});
