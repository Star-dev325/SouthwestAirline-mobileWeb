// @flow
import _ from 'lodash';
import type { LoyaltyPromotionsType } from 'src/wcm/flow-typed/wcm.types';
import type { ExclusivePromotionPageType, ExclusivePromotionType } from 'src/myAccount/flow-typed/myAccount.types';

type WcmLoyaltyPromotionsResponse = {
  loyalty_promotions: LoyaltyPromotionsType
};

export const getPromotionByIdWithWCM = (wcmResponse: WcmLoyaltyPromotionsResponse, promotionId: string) => {
  const promotions = wcmResponse.loyalty_promotions;

  return _.chain(promotions)
    .filter((wcmPromotion) => wcmPromotion.entry_code === promotionId)
    .head()
    .value();
};

export const transformToPromotionDetailSectionsWithWCM = (
  wcmResponse: WcmLoyaltyPromotionsResponse,
  promotionId: string
) => _.get(getPromotionByIdWithWCM(wcmResponse, promotionId), 'sections', []);

export const transformPromotionsWithId = (response: ExclusivePromotionPageType) => {
  const oldEligiblePromotions = _.get(response, 'promotionsPage.eligiblePromotions');
  const oldRegisteredPromotions = _.get(response, 'promotionsPage.registeredPromotions');

  const eligiblePromotions = _.map(oldEligiblePromotions, transformPromotion);

  const registeredPromotions = _.map(oldRegisteredPromotions, transformPromotion);

  return _.merge({}, response, {
    promotionsPage: {
      eligiblePromotions,
      registeredPromotions
    }
  });
};

const transformPromotion = (promotion: ExclusivePromotionType) => {
  const href = _.get(promotion, '_links.view.href');
  const promotionId = _.get(href.match(/\/([^\/]+)\/?$/), '1', href); // eslint-disable-line no-useless-escape

  return _.merge({}, promotion, {
    _links: {
      view: { promotionId }
    }
  });
};
