import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ImagePlacement from 'src/wcm/components/imagePlacement';
import { MOBILE_HERO } from 'src/wcm/constants/wcmConstants';

describe('ImagePlacement', () => {
  let handlePlacementLinkFnMock;
  let onClickMock;

  beforeEach(() => {
    handlePlacementLinkFnMock = jest.fn();
    onClickMock = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when no image is provided', () => {
    it('should not display an image', () => {
      const props = {
        imageForegroundAltText: '',
        linkType: 'none',
        promoImageBackground: '',
        target: ''
      };

      const { container } = createComponent(props);

      expect(container.querySelector('.image-placement > img')).toBeFalsy();
    });
  });

  describe('when promoImageBackground is provided', () => {
    it('should render with props', () => {
      const { container } = createComponent();
      const imagePlacement = container.querySelector('.image-placement');
      const imagePlacementBackgroundImage = container.querySelector('.image-placement--background-image');

      expect(container.querySelector('img').classList.contains('image-placement--background-image')).toBe(true);
      expect(imagePlacement).toBeTruthy();
      expect(imagePlacementBackgroundImage.getAttribute('alt')).toBe('alt_text');
      expect(imagePlacementBackgroundImage.getAttribute('src')).toBe('image.jpg');
      expect(imagePlacementBackgroundImage).toBeTruthy();
    });

    it('should render with PlacementLink', () => {
      const { container } = createComponent();
      const placementLinkWrapper = container.querySelector('[data-qa="placement-link"]');

      expect(placementLinkWrapper).toBeTruthy();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      contentBlockId: '',
      displayType: MOBILE_HERO,
      handlePlacementLinkFn: handlePlacementLinkFnMock,
      imageForegroundAltText: 'alt_text',
      isChaseCombo: false,
      isChasePlacement: false,
      isChasePrequal: false,
      linkType: 'browser',
      onClick: onClickMock,
      promoImageBackground: 'image.jpg',
      shouldObserveViewPort: false,
      shouldRaiseSatelliteEvent: false,
      target: 'www.test.com',
      viewPortThreshold: 0.1
    };

    const store = configureMockStore()({});

    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={store}>
        <ImagePlacement {...finalProps} />
      </Provider>
    );
  };
});
