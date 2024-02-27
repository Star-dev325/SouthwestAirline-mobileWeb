import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import { ExclusivePromotionsPage } from 'src/myAccount/pages/exclusivePromotionsPage';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('ExclusivePromotionsPage', () => {
  let getExclusivePromotionsFnMock;
  let getPromotionDetailsFnMock;
  let pushMock;
  let registerUserExclusivePromotionFnMock;

  beforeEach(() => {
    getExclusivePromotionsFnMock = jest.fn();
    getPromotionDetailsFnMock = jest.fn().mockResolvedValue('');
    pushMock = jest.fn();
    registerUserExclusivePromotionFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on mount', () => {
    it('should fetch promotions', () => {
      createPageComponent();

      expect(getExclusivePromotionsFnMock).toHaveBeenCalled();
    });

    it('should render appropriate components if no promotions available', () => {
      const { container } = createPageComponent({
        exclusivePromotions: {
          eligiblePromotions: [],
          numberOfEligiblePromotions: 0,
          numberOfRegisteredPromotions: 0,
          registeredPromotions: []
        }
      });

      expect(container.querySelector('.promotions-page--group').textContent).toContain(
        i18n('MY_ACCOUNT__PROMOTIONS_PAGE__NO_PROMOTIONS_AVAILABLE')
      );
    });

    it('should render appropriate components if promotions are available', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('.page-header').textContent).toContain('My Rapid Rewards');
      expect(container.querySelectorAll('.promotion-card')[0].textContent).toContain('Fake eligible promotion');
      expect(container.querySelectorAll('.promotion-card')[1].textContent).toContain('Fake registered promotion');
    });
  });

  describe('on click', () => {
    it('details link should fetch promotion details then navigate to promotion details page', async () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('.promotion-card--info'));

      expect(getPromotionDetailsFnMock).toHaveBeenCalledWith({
        href: '/v1/mobile-misc/page/my-account/promotion-details/1-GQICD6',
        method: 'GET',
        promotionId: '1-GQICD6'
      });

      await getPromotionDetailsFnMock;

      expect(pushMock).toHaveBeenCalledWith('/my-account/promotion-detail');
    });

    it('register button should call registerUserExclusivePromotionFnStub', async () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('.button--fluid'));

      expect(registerUserExclusivePromotionFnMock).toHaveBeenCalledWith({
        body: {
          promotionId: '1-GQICD6'
        },
        href: '/v1/mobile-misc/feature/my-account/register-promotion',
        method: 'POST'
      });
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      exclusivePromotions: {
        eligiblePromotions: [
          {
            _links: {
              register: {
                body: {
                  promotionId: '1-GQICD6'
                },
                href: '/v1/mobile-misc/feature/my-account/register-promotion',
                method: 'POST'
              },
              view: {
                href: '/v1/mobile-misc/page/my-account/promotion-details/1-GQICD6',
                method: 'GET',
                promotionId: '1-GQICD6'
              }
            },
            isRegistered: false,
            promotionId: '1-GQICD6',
            subtitle: null,
            title: 'Fake eligible promotion'
          }
        ],
        numberOfEligiblePromotions: 1,
        numberOfRegisteredPromotions: 1,
        registeredPromotions: [
          {
            _links: {
              register: null,
              view: {
                href: '/v1/mobile-misc/page/my-account/promotion-details/REGISTEREDID',
                method: 'GET',
                promotionId: 'REGISTEREDID'
              }
            },
            isRegistered: true,
            promotionId: 'REGISTEREDID',
            subtitle: 'A-List Tier Challenge',
            title: 'Fake registered promotion'
          }
        ]
      },
      getExclusivePromotionsFn: getExclusivePromotionsFnMock,
      getPromotionDetailsFn: getPromotionDetailsFnMock,
      push: pushMock,
      registerUserExclusivePromotionFn: registerUserExclusivePromotionFnMock
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {};

    return createComponent(ExclusivePromotionsPage, { state, props: mergedProps });
  };
});
