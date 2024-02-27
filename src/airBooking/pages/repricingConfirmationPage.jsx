// @flow

import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getFirstShoppingPageParams } from 'src/airBooking/helpers/flightShoppingPageHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import PageHeader from 'src/shared/components/pageHeader';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import PriceTotal from 'src/shared/components/priceTotal';
import PriceSummaryNotice from 'src/shared/components/priceSummaryNotice';
import RepricingNavigation from 'src/shared/components/repricingNavigation';
import { searchForFlights } from 'src/airBooking/actions/airBookingActions';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type { FlightPricingPage, FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';
import CompanyNameBanner from '../../shared/components/companyNameBanner';
import i18n from '@swa-ui/locale';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  flightPricingPage: {
    response: {
      flightPricingPage: FlightPricingPage
    }
  },
  searchForFlightsFn: ({ searchRequest: FlightProductSearchRequest, nextPagePath?: string }) => void,
  searchRequest: FlightProductSearchRequest,
  push: (url: string) => void,
  selectedCompanyName?: ?string
};

export class RepricingConfirmationPage extends Component<Props> {
  _transitionToSummaryPage = () => {
    this.props.push(getNormalizedRoute({ routeName: 'price' }));
  };

  _resubmitShoppingRequest = () => {
    const { searchRequest } = this.props;
    const nextPagePath = buildPathWithParamAndQuery(
      getNormalizedRoute({ routeName: 'flightShoppingDepart' }),
      getFirstShoppingPageParams()
    );

    this.props.searchForFlightsFn({ searchRequest, nextPagePath });
  };

  render() {
    const { selectedCompanyName } = this.props;
    const {
      response: {
        flightPricingPage: { header, bounds, fareRulesWithLinks, totals, acceptanceText1, acceptanceText2 }
      }
    } = this.props.flightPricingPage;

    return (
      <div className="pricing-summary">
        <PageHeader>
          <div>
            <span className="inline-block mr4">Price</span>
            <span className="normal inline-block mr2" data-qa="airPort-codes">
              {header}
            </span>
          </div>
        </PageHeader>
        {selectedCompanyName && <CompanyNameBanner selectedCompanyName={selectedCompanyName} />}
        <p className="pricing-summary--message">{i18n('SHARED__REPRICING__NOTIFICATION')}</p>

        <ReservationFlightSummary bounds={bounds} />
        <PriceSummaryNotice fareRulesWithLinks={fareRulesWithLinks} />
        <PriceTotal totals={totals} isReprice />

        <RepricingNavigation
          onClickContinue={this._transitionToSummaryPage}
          onClickCancel={this._resubmitShoppingRequest}
          acceptanceText1={acceptanceText1}
          acceptanceText2={acceptanceText2}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  flightPricingPage: state.app.airBooking.flightPricingPage,
  searchRequest: state.app.airBooking.searchRequest,
  selectedCompanyName: _.get(state, 'app.account.corporateInfo.selectedCompany.companyName')
});

const mapDispatchToProps = {
  searchForFlightsFn: searchForFlights
};

export default _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(RepricingConfirmationPage);
