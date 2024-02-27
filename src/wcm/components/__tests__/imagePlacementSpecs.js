import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ImagePlacement from 'src/wcm/components/imagePlacement';

import { MOBILE_HERO } from 'src/wcm/constants/wcmConstants';

const sinon = sandbox.create();

context('ImagePlacement', () => {
  let handlePlacementLinkFnStub;
  let onClickStub;

  beforeEach(() => {
    handlePlacementLinkFnStub = sinon.stub();
    onClickStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('when no image is provided', () => {
    it('should not display an image', () => {
      const props = {
        linkType: 'none',
        imageForegroundAltText: '',
        promoImageBackground: '',
        target: ''
      };

      const wrapper = createComponent(props);

      expect(wrapper.find('.image-placement > img')).to.not.exist;
    });
  });

  context('when promoImageBackground is provided', () => {
    it('should render with props', () => {
      const wrapper = createComponent();
      const imagePlacement = wrapper.find('.image-placement');
      const imagePlacementBackgroundImage = wrapper.find('.image-placement--background-image');

      expect(imagePlacement).to.exist;
      expect(imagePlacementBackgroundImage).to.exist;
      expect(wrapper.find('img').hasClass('image-placement--background-image')).to.equal(true);

      expect(imagePlacementBackgroundImage.prop('src')).to.equal('image.jpg');
      expect(imagePlacementBackgroundImage.prop('alt')).to.equal('alt_text');
    });

    it('should render with PlacementLink', () => {
      const wrapper = createComponent();
      const placementLinkWrapper = wrapper.find('PlacementLink');

      expect(placementLinkWrapper).to.be.present();
      expect(_.omit(placementLinkWrapper.props(), 'children', 'onClick', 'handlePlacementLinkFn')).to.deep.equal({
        target: 'www.test.com',
        linkType: 'browser',
        referrer: '',
        isChaseCombo: false,
        isChasePlacement: false,
        contentBlockId: '',
        shouldRaiseSatelliteEvent: false,
        pageId: ''
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      displayType: MOBILE_HERO,
      linkType: 'browser',
      imageForegroundAltText: 'alt_text',
      promoImageBackground: 'image.jpg',
      target: 'www.test.com',
      isChasePrequal: false,
      isChaseCombo: false,
      isChasePlacement: false,
      viewPortThreshold: 0.1,
      shouldObserveViewPort: false,
      contentBlockId: '',
      onClick: onClickStub,
      handlePlacementLinkFn: handlePlacementLinkFnStub,
      shouldRaiseSatelliteEvent: false
    };

    const store = configureMockStore()({});

    const finalProps = _.merge({}, defaultProps, props);

    return mount(
      <Provider store={store}>
        <ImagePlacement {...finalProps} />
      </Provider>
    );
  };
});
