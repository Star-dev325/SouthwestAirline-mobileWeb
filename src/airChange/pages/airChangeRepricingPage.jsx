// @flow

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import PageHeader from 'src/shared/components/pageHeader';
import PriceSummaryNotice from 'src/shared/components/priceSummaryNotice';
import PriceTotal from 'src/shared/components/priceTotal';
import PricingBannerList from 'src/shared/components/pricingBannerList';
import RepricingNavigation from 'src/shared/components/repricingNavigation';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import PassengerTypes from 'src/shared/constants/passengerTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type {
  ChangePricingPage,
  SearchFlightOptions,
  SearchRequest,
  SelectedBounds
} from 'src/airChange/flow-typed/airChange.types';
import type { BoundSelection } from 'src/shared/flow-typed/boundSelect.types';
import type { Push } from 'src/shared/flow-typed/shared.types';

const { ADULT } = PassengerTypes;

type Props = {
  isWebView: boolean,
  changePricingPage: ChangePricingPage,
  searchForFlightsFn: (options: SearchFlightOptions, goToNextPage?: () => void) => void,
  searchRequest: SearchRequest,
  selectedBounds: SelectedBounds,
  changeShoppingLink: Link,
  isUpgrade: boolean,
  boundSelections: Array<BoundSelection>,
  goBack: () => void,
  push: Push
};

export class AirChangeRepricingPage extends Component<Props> {
  _handleContinue = () => {
    const { push, isUpgrade } = this.props;

    isUpgrade ? push(getNormalizedRoute({ routeName: 'reconcile' })) : push(getNormalizedRoute({ routeName: 'price' }));
  };

  _handleCancel = () => {
    const {
      searchRequest,
      selectedBounds,
      changeShoppingLink,
      boundSelections,
      push,
      isUpgrade,
      goBack,
      searchForFlightsFn
    } = this.props;
    const direction = selectedBounds.firstbound ? OUTBOUND : INBOUND;
    const nextPath = buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'flightShopping' }), {
      direction,
      paxType: ADULT
    });
    const options = { searchRequest, selectedBounds, changeShoppingLink, boundSelections };

    isUpgrade ? goBack() : searchForFlightsFn(options, () => push(nextPath));
  };

  render() {
    const {
      changePricingPage: {
        header,
        bounds,
        fareRulesWithLinks,
        totals,
        priceMessages,
        acceptanceText1,
        acceptanceText2
      },
      isWebView
    } = this.props;

    return (
      <div className="pricing-summary">
        <PageHeader hidden={isWebView}>
          <div>
            <span className="inline-block mr4">{i18n('AIR_CHANGE__CURRENT_RESERVATION__PRICE')}</span>
            <span className="normal inline-block mr2" data-qa="airPort-codes">
              {header}
            </span>
          </div>
        </PageHeader>
        <p className="pricing-summary--message">{i18n('SHARED__REPRICING__NOTIFICATION')}</p>
        {priceMessages && <PricingBannerList messages={priceMessages} />}
        <ReservationFlightSummary bounds={bounds} />
        <PriceSummaryNotice fareRulesWithLinks={fareRulesWithLinks} />
        <PriceTotal totals={totals} isReprice shouldHidePriceBreakdown />
        <RepricingNavigation
          onClickContinue={this._handleContinue}
          onClickCancel={this._handleCancel}
          acceptanceText1={acceptanceText1}
          acceptanceText2={acceptanceText2}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  changePricingPage: _.get(state, 'app.airChange.changePricingPage.response'),
  searchRequest: _.get(state, 'app.airChange.changeShoppingPage.searchRequest'),
  selectedBounds: _.get(state, 'app.airChange.selectedBounds'),
  changeShoppingLink: _.get(state, 'app.airChange.changeFlightPage.response._links.changeShopping'),
  boundSelections: _.get(state, 'app.airChange.changeFlightPage.response.boundSelections'),
  isUpgrade: _.get(state, 'app.airChange.changePricingPage.response._meta.isUpgrade', false),
  isWebView: _.get(state, 'app.webView.isWebView')
});

const mapDispatchToProps = {
  searchForFlightsFn: AirChangeActions.searchForFlights
};

export default _.flowRight(
  withConnectedReactRouter,
  withShowOnlyLoginButton,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('pricing-summary-container')
)(AirChangeRepricingPage);
