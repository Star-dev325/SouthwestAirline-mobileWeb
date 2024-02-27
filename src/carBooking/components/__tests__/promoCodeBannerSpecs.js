import React from 'react';
import { mount } from 'enzyme';
import PromoCodeBanner from 'src/carBooking/components/promoCodeBanner';

describe('promoCodeBanner', () => {
  context('displayed', () => {
    it('should not be displayed if promoCodes is undefined', () => {
      const promoBannerComponent = createComponent({ promoCodes: undefined });

      expect(promoBannerComponent.find('[data-qa="promo-code-banner"]')).to.not.be.present();
    });

    it('should be displayed if promoCodes is not undefined', () => {
      const promoBannerComponent = createComponent({
        promoCodes: { numberOfAppliedPromoCodes: 0, notAppliedPromoCodes: [] }
      });

      expect(promoBannerComponent.find('[data-qa="promo-code-banner"]')).to.be.present();
    });
  });

  context('successfulPromoBanner', () => {
    it('should be displayed if number of numberOfAppliedPromoCodes is more than zero', () => {
      const promoBannerComponent = createComponent({
        promoCodes: { numberOfAppliedPromoCodes: 1, notAppliedPromoCodes: [] }
      });

      expect(promoBannerComponent.find('SuccessfulPromoBanner')).to.be.present();
    });

    it('should not be displayed if number of numberOfAppliedPromoCodes is zero', () => {
      const promoBannerComponent = createComponent({
        promoCodes: { numberOfAppliedPromoCodes: 0, notAppliedPromoCodes: [] }
      });

      expect(promoBannerComponent.find('SuccessfulPromoBanner')).to.not.be.present();
    });
  });

  context('unsuccessfulPromoBanner', () => {
    it('should be displayed once if number of notAppliedPromoCodes is one', () => {
      const promoBannerComponent = createComponent({
        promoCodes: {
          numberOfAppliedPromoCodes: 1,
          notAppliedPromoCodes: [{ message: 'Siyang is the best', numberOfPromoCode: 1 }]
        }
      });

      expect(promoBannerComponent.find('UnsuccessfulPromoBanner')).to.be.present();
    });

    it('should be displayed twice if number of notAppliedPromoCodes is two', () => {
      const promoBannerComponent = createComponent({
        promoCodes: {
          numberOfAppliedPromoCodes: 1,
          notAppliedPromoCodes: [
            { message: 'Siyang is the best', numberOfPromoCode: 1 },
            { message: 'Bear is the best', numberOfPromoCode: 2 }
          ]
        }
      });

      expect(promoBannerComponent.find('UnsuccessfulPromoBanner')).to.have.lengthOf(2);
    });

    it('should not be displayed if number of notAppliedPromoCodes is zero', () => {
      const promoBannerComponent = createComponent({
        promoCodes: { numberOfAppliedPromoCodes: 0, notAppliedPromoCodes: [] }
      });

      expect(promoBannerComponent.find('UnsuccessfulPromoBanner')).to.not.be.present();
    });

    it('should show appropriate error message', () => {
      const promoBannerComponent = createComponent({
        promoCodes: {
          numberOfAppliedPromoCodes: 1,
          notAppliedPromoCodes: [{ message: '', numberOfPromoCode: 1 }]
        }
      });

      expect(promoBannerComponent.find('UnsuccessfulPromoBanner')).to.contain.text('Promo #1 Invalid - ');
    });
  });

  const createComponent = (props) => mount(<PromoCodeBanner {...props} />);
});
