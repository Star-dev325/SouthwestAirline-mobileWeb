// @flow
import React from 'react';
import _ from 'lodash';
import type { RapidRewardsInfoDataType } from 'src/login/flow-typed/login.types';

type Props = {
  rapidRewardsInfo?: RapidRewardsInfoDataType
};

class RapidRewardsComponent extends React.Component<Props> {
  render() {
    const { rapidRewardsInfo } = this.props;

    const productHeading = _.get(rapidRewardsInfo, 'product_feature.product_heading');
    const productDescription = _.get(rapidRewardsInfo, 'product_feature.product_description');
    const productAttributes = _.get(rapidRewardsInfo, 'product_feature.product_attributes');
    const productTagline = _.get(rapidRewardsInfo, 'product_feature.product_tagline');

    return (
      <div className="wcm-content-container">
        {rapidRewardsInfo && (
          <div className="wcm-content">
            <div className="heading" dangerouslySetInnerHTML={{ __html: productHeading }} />
            <div dangerouslySetInnerHTML={{ __html: productDescription }} />
            <ul data-qa="rr-results" ref="results">
              {productAttributes.map((item, idx) => (
                <li key={idx}>
                  <div dangerouslySetInnerHTML={{ __html: item.attribute }} />
                </li>
              ))}
            </ul>
            <div dangerouslySetInnerHTML={{ __html: productTagline }} />
          </div>
        )}
      </div>
    );
  }
}

export default RapidRewardsComponent;
