import _ from 'lodash';

const MOBILE_RR_PROMO_BANNER_DISPLAY_TYPE = 'mobile_rr_promo_banner';

export const transformPromoBannerContentToPromotion = (promotionResponse) =>
  _.chain(promotionResponse)
    .get('results', {})
    .keys()
    .sortBy()
    .map((promotionKey) => _.get(promotionResponse, `results.${promotionKey}.content`, {}))
    .filter((content) => content.displayType === MOBILE_RR_PROMO_BANNER_DISPLAY_TYPE)
    .map((promotion) => ({
      title: promotion['title'],
      image: promotion['promotionImage'] || '',
      description: promotion['description'],
      alt: promotion['altText'],
      target: promotion['target'],
      link_type: promotion['linkType']
    }))
    .value();
