import React from 'react';
import Icon from 'src/shared/components/icon';

const EarlyBirdCheckInPricingBanner = () => (
  <div className="early-bird-confirmation--pricing-banner flex flex-main-between">
    <div className="early-bird-confirmation--pricing-context">
      <p>
        EarlyBird Check-In<sup>&reg;</sup>
        <br />
        Pricing
      </p>
    </div>
    <Icon type="early-bird" color="white" />
  </div>
);

export default EarlyBirdCheckInPricingBanner;
