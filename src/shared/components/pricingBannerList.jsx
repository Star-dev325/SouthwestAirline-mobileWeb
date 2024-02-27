// @flow

import React from 'react';
import BasicBanner from 'src/shared/components/basicBanner';

import type { MessageType } from 'src/shared/flow-typed/shared.types';

type Props = {
  messages: Array<MessageType>
};

const PricingBannerList = ({ messages }: Props) => (
  <div className="pricing-banner-list">
    {messages.map(({ header: title, body, icon, key }) => (
      <BasicBanner key={key} className="pricing-banner-list--basic-banner" title={title} message={body} icon={icon} />
    ))}
  </div>
);

export default PricingBannerList;
