// @flow

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import * as RapidRewardsActions from 'src/rapidRewards/actions/rapidRewardsActions';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import Button from 'src/shared/components/button';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import RichNavItem from 'src/shared/components/richNavItem';
import { addMvcidToChaseUrl } from 'src/airBooking/helpers/amcvCookieHelper';

import type { Push, WcmFooterType } from 'src/shared/flow-typed/shared.types';

type Props = {
  footerLinkRows: Array<WcmFooterType>,
  MWEB_ADOBE_TARGET_TIMEOUT_MS: number,
  promotions: ?Array<{
    title: string,
    image: string,
    description: string,
    alt: string,
    target: string,
    link_type: string
  }>,
  push: Push,
  retrievePromotionsFn: (number) => void,
  isWebView: boolean
};

export class RapidRewardsLandingPage extends React.Component<Props> {
  componentDidMount() {
    const { MWEB_ADOBE_TARGET_TIMEOUT_MS, retrievePromotionsFn } = this.props;

    retrievePromotionsFn(MWEB_ADOBE_TARGET_TIMEOUT_MS);
  }

  _goToEnrollNow = () => {
    this.props.push('/enroll');
  };

  _onNavItemClick = (navData: { link_type: string, target: string }) => {
    const updatedUrl = addMvcidToChaseUrl(navData.target, false);

    wcmTransitionTo({
      link_type: navData.link_type,
      target: updatedUrl
    });
  };

  _renderPromotions = () => {
    const { promotions } = this.props;

    // $FlowFixMe - .map<React.Node> Type - Need Babel Update
    return promotions && promotions.map((promotion, index: number) => (
      <RichNavItem
        key={index}
        className="rr-page-promotions--item"
        onClick={this._onNavItemClick}
        {...promotion}
      />)
    );
  };

  render() {
    const { footerLinkRows, isWebView } = this.props;

    return (
      <div className="rr-page">
        <div className="rr-page-banner">
          <Button className="rr-enroll-now" color="yellow" size="larger" fluid onClick={this._goToEnrollNow}>
            Enroll Now
          </Button>
        </div>
        <div className="rr-page-promotions">{this._renderPromotions()}</div>
        {!isWebView && <PageFooterWcmSourced className="rr-page-footer" footerLinkRows={footerLinkRows} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  toggles: _.get(state, 'app.toggles'),
  promotions: _.get(state, 'app.wcmContent.rapidRewardsPromotions'),
  MWEB_ADOBE_TARGET_TIMEOUT_MS: _.get(state, 'app.wcmContent.applicationProperties.MWEB_ADOBE_TARGET_TIMEOUT_MS'),
  footerLinkRows: _.get(state, 'app.wcmContent.footer.results.footer.content.placement.linkRows', []),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  retrievePromotionsFn: RapidRewardsActions.retrievePromotions
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(RapidRewardsLandingPage);
