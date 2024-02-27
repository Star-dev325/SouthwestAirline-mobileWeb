// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import PriceTotal from 'src/shared/components/priceTotal';

import type { FlightPricingPage } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  goBack: () => void,
  flightPricingPage: FlightPricingPage
};

export const CompanionTripAndPriceDetailsPage = ({ flightPricingPage, goBack }: Props) => {
  const { totals, bounds } = flightPricingPage;

  return (
    <div className="trip-and-price-details">
      <PageHeaderWithButtons
        title="Trip and Price Details"
        rightButtons={[
          {
            name: 'Done',
            onClick: goBack
          }
        ]}
      />

      <div className="pricing-summary">
        <ReservationFlightSummary bounds={bounds} />
        <PriceTotal totals={totals} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  flightPricingPage: state.app.companion.flightPricingPage
});

export default _.flowRight(withConnectedReactRouter, connect(mapStateToProps, {}))(CompanionTripAndPriceDetailsPage);
