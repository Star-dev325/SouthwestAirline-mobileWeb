module.exports = {
  path: '/chapi/v1/mobile-misc/page/my-account/promotions',
  method: 'GET',
  cache: false,
  template: {
    promotionsPage: {
      numberOfEligiblePromotions: 2,
      eligiblePromotions: [
        {
          title: 'Fly 4, get 10,000 bonus points! TEST4',
          subtitle: null,
          isRegistered: false,
          _links: {
            view: {
              href: '/v1/mobile-misc/page/my-account/promotion-details/1-GQICD6',
              method: 'GET'
            },
            register: {
              href: '/v1/mobile-misc/feature/my-account/register-promotion',
              method: 'POST',
              body: {
                promotionId: '1-GQICD6'
              }
            }
          }
        },
        {
          title: 'Here is a Friendly Promo Name',
          subtitle: 'Get 5,000 bonus points for each friend who gets the card.',
          isRegistered: false,
          _links: {
            view: {
              href: '/v1/mobile-misc/page/my-account/promotion-details/1-EQ3H2J',
              method: 'GET'
            },
            register: {
              href: '/v1/mobile-misc/feature/my-account/register-promotion',
              method: 'POST',
              body: {
                promotionId: '1-GQICD6'
              }
            }
          }
        }
      ],
      numberOfRegisteredPromotions: 2,
      registeredPromotions: [
        {
          title: 'Test Internal Promo with View Details',
          subtitle: 'A-List Tier Challenge',
          isRegistered: true,
          _links: {
            view: {
              href: '/v1/mobile-misc/page/my-account/promotion-details/REGISTEREDID',
              method: 'GET'
            },
            register: null
          }
        },
        {
          title: 'Test External - open the external site',
          subtitle: null,
          isRegistered: true,
          _links: {
            view: {
              href: '/v1/mobile-misc/page/my-account/promotion-details/REGISTERED',
              method: 'GET'
            },
            register: null
          }
        }
      ]
    }
  }
};
