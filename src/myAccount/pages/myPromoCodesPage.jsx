// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import i18n from '@swa-ui/locale';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import Container from 'src/shared/components/container';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import PromoCodesList from 'src/shared/components/promoCodesList';
import { clearPromoCodes, getPromoCodes, getPromoCodesPagePlacements } from 'src/myAccount/actions/myAccountActions';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import { buildPathWithQuery } from 'src/shared/helpers/pathUtils';
import wcmTransitionTo from 'src/shared/helpers/wcmTransitionHelper';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';

import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';
import type { PromoCodesPageType } from 'src/myAccount/flow-typed/myAccount.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import { DOLLAR, POINTS, REDEMPTION } from 'src/shared/constants/currencyTypes';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  clearPromoCodesFn: () => void,
  promoCodesList: PromoCodesPageType,
  getPromoCodesFn: () => void,
  getPromoCodesPagePlacementsFn: () => void,
  placements?: { promoTop01?: DynamicPlacementResponse },
  isWebView: boolean,
  push: Push
};

export class MyPromoCodesPage extends Component<Props> {
  componentDidMount() {
    const { getPromoCodesFn, getPromoCodesPagePlacementsFn } = this.props;

    getPromoCodesFn();
    getPromoCodesPagePlacementsFn();
  }

  componentWillUnmount() {
    this.props.clearPromoCodesFn();
  }

  _onBookFlightClick = (promoCode: string, promoType: string) => {
    const currencyType = promoType === REDEMPTION ? POINTS : DOLLAR;
    const { push, isWebView } = this.props;

    if (isWebView) {
      const target = buildPathWithQuery('swaAppLink://airbooking', { isPoints: promoType === REDEMPTION, promoCode });

      wcmTransitionTo({ linkType: WcmLinkTypes.WEB_VIEW, target });
    } else {
      push(getNormalizedRoute({ routeName: 'airBookingIndex' }), null, { currencyType, promoCode });
    }
  };

  renderPromoCodesContent = () => {
    const { placements, isWebView, promoCodesList } = this.props;
    const { promoTop01 } = placements || {};

    return (
      <div className="placement-text-content">
        {promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" isWebView={isWebView} />}
        <PromoCodesList
          promoCodesList={promoCodesList}
          data-qa="promo-codes-list-content"
          onBookFlightClick={this._onBookFlightClick}
        />
      </div>
    );
  };

  renderNoPromoCodesMessage = () => (
    <Container>
      <p data-qa="no-promo-code-found-message" className="no-promo-code-found-message">
        {i18n('MY_ACCOUNT__NO_PROMO_CODE_FOUND_MESSAGE')}
      </p>
    </Container>
  );

  render() {
    const { isWebView, promoCodesList } = this.props;

    return (
      <div className="my-promo-codes">
        {!isWebView && <PageHeaderWithButtons showBackButton={true} title={i18n('MY_ACCOUNT__MY_PROMO_CODES')} />}
        {promoCodesList?.length ? this.renderPromoCodesContent() : this.renderNoPromoCodesMessage()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isWebView: _.get(state, 'app.webView.isWebView', false),
  placements: _.get(state, 'app.myAccountPages.promoCodesPagePlacements', {}),
  promoCodesList: _.get(state, 'app.myAccountPages.myAccountPromoCodes.promotions', [])
});

const mapDispatchToProps = {
  clearPromoCodesFn: clearPromoCodes,
  getPromoCodesFn: getPromoCodes,
  getPromoCodesPagePlacementsFn: getPromoCodesPagePlacements
};

const enhancers = _.flowRight(
  withBodyClass('bgpdkblue'),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(MyPromoCodesPage);
