import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PromotionCard from 'src/myAccount/components/promotionCard';

describe('PromotionCard', () => {
  describe('component rendered', () => {
    const onPromotionDetailClick = jest.fn();
    const onRegisterClick = jest.fn();
    const promotion = {
      title: 'i am title',
      subtitle: 'i am description',
      promotionId: '1234567',
      isRegistered: false,
      _links: {
        view: {
          promotionId: '1234567'
        },
        register: {
          href: 'url',
          body: { promotionId: 'id' }
        }
      }
    };

    it('show display the promotion values in correct position', () => {
      const props = {
        onPromotionDetailClick,
        onRegisterClick,
        promotion
      };
      const { container } = createComponent(props);

      expect(container.querySelectorAll('.promotion-card--title')[0].textContent).toContain(promotion.title);
      expect(container.querySelectorAll('.promotion-card--desc')[0].textContent).toContain(promotion.subtitle);
    });

    it('when isRegistered set, the register button should removed', () => {
      const updatedPromotion = { ...promotion };

      updatedPromotion.isRegistered = true;

      const props = {
        onPromotionDetailClick,
        onRegisterClick,
        promotion: updatedPromotion
      };
      const { container } = createComponent(props);

      expect(container.querySelector('[data-qa="registerButton"]')).toBeNull();
    });

    it('when onPromotionDetailClick set, the function should be called when click the promotionCardInfo', () => {
      const props = {
        onPromotionDetailClick,
        onRegisterClick,
        promotion
      };
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('div[data-qa="promotionCardInfo"]'));

      expect(onPromotionDetailClick).toBeCalledWith(promotion._links.view);
    });

    it('when onRegisterClick set, the function should be called when click the registerButton', () => {
      const props = {
        onPromotionDetailClick,
        onRegisterClick,
        promotion
      };
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('button[data-qa="registerButton"]'));

      expect(onRegisterClick).toHaveBeenCalledWith(promotion._links.register);
    });
  });
});

function createComponent(props) {
  return render(
    <PromotionCard
      promotion={props.promotion}
      onPromotionDetailClick={props.onPromotionDetailClick}
      onRegisterClick={props.onRegisterClick}
    />
  );
}
