// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import PriceSummaryNotice from 'src/shared/components/priceSummaryNotice';
import PriceTotal from 'src/shared/components/priceTotal';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { get } from 'src/shared/helpers/jsUtils';

import type { FlightPricingPage } from 'src/airBooking/flow-typed/airBooking.types';
import type { Fee, TotalsType } from 'src/shared/flow-typed/shared.types';

type Props = {
  flightPricingPage: {
    response: {
      flightPricingPage: FlightPricingPage
    }
  },
  goBack: () => void,
  taxesAndFees?: Array<Fee>,
  updatedPriceTotal: ?TotalsType
};

export const TripAndPriceDetails = (props: Props) => {
  const {
    flightPricingPage: { bounds, fareRulesWithLinks, totals }
  } = props.flightPricingPage.response;

  return (
    <div className="trip-and-price-details">
      <PageHeaderWithButtons
        title="Trip and Price Details"
        rightButtons={[
          {
            name: i18n('SHARED__BUTTON_TEXT__DONE'),
            onClick: () => {
              props.goBack();
            }
          }
        ]}
      />

      <div className="pricing-summary">
        <ReservationFlightSummary bounds={bounds} />
        <PriceSummaryNotice fareRulesWithLinks={fareRulesWithLinks} />
        <PriceTotal totals={totals} updatedPriceTotal={props.updatedPriceTotal} taxesAndFees={props.taxesAndFees} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  flightPricingPage: state.app.airBooking.flightPricingPage,
  taxesAndFees: get(state, 'app.airBooking.applyTravelFundsPage.response.taxesAndFees'),
  updatedPriceTotal: get(state, 'app.airBooking.applyTravelFundsPage.response.totals')
});

export default _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, {}),
  withBodyClass('trip-and-price-details-page')
)(TripAndPriceDetails);
