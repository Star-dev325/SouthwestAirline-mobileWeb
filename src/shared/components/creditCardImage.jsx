// @flow
import React from 'react';
import cx from 'classnames';
import _ from 'lodash';
import Icon from 'src/shared/components/icon';

type Props = {
  cardType: ?string,
  leisureFund?: boolean,
  showIcon?: boolean
};

const _getImageClass = (cardType, leisureFund) => {
  // TODO: Delete the old rtf icon in MOB-116576
  if (cardType === 'TRAVEL_FUNDS' && !_.isNil(leisureFund)) {
    cardType = leisureFund ? 'TRAVEL_FUNDS_LEISURE' : 'TRAVEL_FUNDS_NOT_LEISURE';
  }

  const imageClassMap = {
    AMEX: 'credit-card--image_amex',
    APPLE_PAY: 'credit-card--image_apple-pay',
    BOTH_INACTIVE: 'promo-codes--image_dollar-points-inactive',
    BOTH: 'promo-codes--image_dollar-points',
    DINERS: 'credit-card--image_diners',
    DISCOVER: 'credit-card--image_discover',
    GHOST_CARD: 'credit-card--image_ghost-card',
    GIFT_CARD: 'travel-fund--image_gift-card',
    INSTANT_CREDIT_RAPID_REWARDS_VISA: 'credit-card--image_rapid-rewards-visa',
    LUV_VOUCHER: 'travel-fund--image_luv-voucher',
    MASTERCARD: 'credit-card--image_mastercard',
    NEW_DISABLED: 'credit-card--image_new-disabled icon_add',
    NEW: 'credit-card--image_new icon_add',
    PAYPAL: 'credit-card--image_paypal',
    RAPID_REWARDS_VISA: 'credit-card--image_rapid-rewards-visa',
    REDEMPTION_INACTIVE: 'promo-codes--image_points-inactive',
    REDEMPTION: 'promo-codes--image_points',
    REVENUE_INACTIVE: 'promo-codes--image_dollar-inactive',
    REVENUE: 'promo-codes--image_dollar',
    TRAVEL_FUNDS_CONFIRMATION: 'travel-fund--confirmation-image_rtf',
    TRAVEL_FUNDS_LEISURE: 'travel-fund--image_rtf-leisure',
    TRAVEL_FUNDS_NOT_LEISURE: 'travel-fund--image_rtf-not-leisure',
    TRAVEL_FUNDS: 'travel-fund--image_rtf',
    UATP: 'credit-card--image_uatp',
    UPLIFT: 'credit-card--image_uplift',
    VISA: 'credit-card--image_visa'
  };

  return imageClassMap[cardType];
};

const _getIconClass = (cardType) => {
  const iconClassMap = {
    SPLIT_PAYMENT: {
      className: 'travel-fund--points-icon',
      type: 'points'
    }
  };

  return iconClassMap[cardType];
};  

const CreditCardImage = (props: Props) => {
  const { cardType, leisureFund, showIcon } = props;

  if (!cardType) {
    return null;
  }

  if (showIcon) {
    const { className, type } = _getIconClass(cardType);
    
    return <Icon className={className} type={type} />;
  }

  return <div className={cx(_getImageClass(cardType, leisureFund), 'credit-card--image', 'left', 'mr2')} />;
};

export default CreditCardImage;
