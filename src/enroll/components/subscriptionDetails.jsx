// @flow
import _ from 'lodash';
import React from 'react';
import { singleEmailSubscriptionDetailsList } from 'src/enroll/constants/subscriptionDetailsList';

import type { SubscriptionItemType } from 'src/shared/flow-typed/shared.types';

type Props = {};

class SubscriptionDetails extends React.Component<Props> {
  _renderBannerPic = () => (
    <div className="subscription-details-container--banner">
      <img src="/content/mkt/images/landing_pages/ipad_hero.jpg" />
    </div>
  );

  _renderDetailList = () => (
    <div className="subscription-details-container--list">
      {_.map(singleEmailSubscriptionDetailsList, (item, idx: number) => (
        <div key={idx} className="subscription-details-container--list-item">
          {this._renderListItem(item)}
        </div>
      ))}
    </div>
  );

  _renderListItem = (item: SubscriptionItemType) => [
    <div key="title" className="subscription-details-container--list-item-title">
      {item.title}
    </div>,
    <div key="subTitle" className="subscription-details-container--list-item-subtitle">
      {item.details}
    </div>
  ];

  render() {
    return (
      <div className="subscription-details-container">
        {this._renderBannerPic()}
        {this._renderDetailList()}
      </div>
    );
  }
}

export default SubscriptionDetails;
