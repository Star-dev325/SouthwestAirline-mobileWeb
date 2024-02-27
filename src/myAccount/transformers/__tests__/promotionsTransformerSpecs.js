import {
  transformToPromotionDetailSectionsWithWCM,
  getPromotionByIdWithWCM,
  transformPromotionsWithId
} from 'src/myAccount/transformers/promotionsTransformer';

describe('promotionsTransformer', () => {
  let wcmResponse;

  beforeEach(() => {
    wcmResponse = {
      loyalty_promotions: [
        {
          entry_code: '1-EQ3HJI',
          sections: [
            {
              name: 'Description one',
              content: '<p>123</p>'
            }
          ]
        },
        {
          entry_code: '171231x',
          sections: [
            {
              name: 'Description two',
              content: '<p>456</p>'
            }
          ]
        }
      ]
    };
  });

  context('getPromotionByIdWithWCM', () => {
    it('should get to promotion with WCM response', () => {
      const promotion = getPromotionByIdWithWCM(wcmResponse, '1-EQ3HJI');

      expect(promotion).to.deep.equal({
        entry_code: '1-EQ3HJI',
        sections: [
          {
            name: 'Description one',
            content: '<p>123</p>'
          }
        ]
      });
    });
  });

  context('transformToPromotionDetailSectionsWithWCM', () => {
    it('should transform to Promotion detail with WCM response', () => {
      const sections = transformToPromotionDetailSectionsWithWCM(wcmResponse, '171231x');

      expect(sections).to.deep.equal([
        {
          name: 'Description two',
          content: '<p>456</p>'
        }
      ]);
    });
  });

  context('transformPromotionsWithId', () => {
    it('should transform CHAPI response with promotion id', () => {
      const chapiResponse = {
        promotionsPage: {
          eligiblePromotions: [],
          registeredPromotions: [
            {
              _links: {
                view: {
                  href: '/v1/mobile-misc/accounts/account-number/123456789/promotion-details/x123wdf'
                },
                register: null
              }
            }
          ]
        }
      };
      const chapiResponseWithId = transformPromotionsWithId(chapiResponse);

      expect(chapiResponseWithId).to.deep.equal({
        promotionsPage: {
          eligiblePromotions: [],
          registeredPromotions: [
            {
              _links: {
                view: {
                  promotionId: 'x123wdf',
                  href: '/v1/mobile-misc/accounts/account-number/123456789/promotion-details/x123wdf'
                },
                register: null
              }
            }
          ]
        }
      });
    });
  });
});
