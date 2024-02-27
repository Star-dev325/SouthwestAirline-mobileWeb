import React from 'react';
import { mount } from 'enzyme';
import FlightProductPromoBanner from 'src/shared/components/flightProductPromoBanner';

describe('FlightProductPromoBanner', () => {
  let promoBannerWrapper;

  context('when isPromoCodeApplied is true', () => {
    it('renders the Promo Code Applied message', () => {
      const props = { promoCodeNotice: 'Promo code PBOTHCAT applied', isPromoCodeApplied: true };

      promoBannerWrapper = mount(<FlightProductPromoBanner {...props} />);

      expect(promoBannerWrapper.find('i.icon_check-circle')).to.exist;
      expect(promoBannerWrapper).to.have.text('Promo code PBOTHCAT applied');
    });
  });

  context('when isPromoCodeApplied is false', () => {
    it('renders the Oops message', () => {
      const props = {
        promoCodeNotice: 'Oops! The promotion code entered was not recognized.',
        isPromoCodeApplied: false
      };

      promoBannerWrapper = mount(<FlightProductPromoBanner {...props} />);

      expect(promoBannerWrapper.find('i.icon_exclamation-circle')).to.exist;
      expect(promoBannerWrapper).to.have.text('Oops! The promotion code entered was not recognized.');
    });
  });

  context('when className is set it should be applied to the container', () => {
    it('should have className', () => {
      const props = {
        promoCodeNotice: 'Oops! The promotion code entered was not recognized.',
        isPromoCodeApplied: false,
        className: 'some-test-class'
      };

      promoBannerWrapper = mount(<FlightProductPromoBanner {...props} />);

      expect(promoBannerWrapper.find('.flight-product-promo-code-banner')).to.have.className('some-test-class');
    });
  });

  context("when className isn't set it should not be applied to the container", () => {
    it('should have className', () => {
      const props = {
        promoCodeNotice: 'Oops! The promotion code entered was not recognized.',
        isPromoCodeApplied: false
      };

      promoBannerWrapper = mount(<FlightProductPromoBanner {...props} />);

      expect(promoBannerWrapper.find('.flight-product-promo-code-banner')).to.not.have.className('some-test-class');
    });
  });
});
