import React from 'react';
import { mount } from 'enzyme';
import SuccessBanner from 'src/shared/components/successBanner';

describe('successBanner', () => {
  context('displayed', () => {
    it('should not be displayed if message is undefined', () => {
      const promoBannerComponent = createComponent({ message: undefined });

      expect(promoBannerComponent.find('[data-qa="success-banner"]')).to.not.be.present();
    });

    it('should not be displayed if message is null', () => {
      const promoBannerComponent = createComponent({ message: null });

      expect(promoBannerComponent.find('[data-qa="success-banner"]')).to.not.be.present();
    });

    it('should be displayed if message has a value', () => {
      const message = 'The message';
      const promoBannerComponent = createComponent({ message });

      expect(promoBannerComponent.find('[data-qa="success-banner"]')).to.be.present();
      expect(promoBannerComponent.find('[data-qa="success-banner--message"]')).to.be.present();
      expect(promoBannerComponent.find('[data-qa="success-banner--message"]')).to.have.text(message);
      expect(promoBannerComponent.find('Icon').find('.icon_check-circle')).to.be.present();
    });
  });

  const createComponent = (props) => mount(<SuccessBanner {...props} />);
});
