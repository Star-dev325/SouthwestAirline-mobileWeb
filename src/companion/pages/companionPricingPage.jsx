// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import * as CompanionActions from 'src/companion/actions/companionActions';
import PricingDetail from 'src/shared/components/pricingDetail';
import type { FlightPricingPage } from 'src/airBooking/flow-typed/airBooking.types';

type Props = {
  isInternationalBooking: boolean,
  flightPricingPage: FlightPricingPage,
  goToCompanionPassengerPageFn: (boolean) => void
};

export class CompanionPricingPage extends React.Component<Props> {
  _onContinue = () => {
    const { isInternationalBooking, goToCompanionPassengerPageFn } = this.props;

    goToCompanionPassengerPageFn(isInternationalBooking);
  };

  render() {
    const { flightPricingPage } = this.props;

    return (
      <PricingDetail
        totalStep={3}
        flightPricingPage={flightPricingPage}
        onContinueClick={this._onContinue}
        earlyBirdSelected={false}
        EARLY_BIRD_AB_TESTING={false}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  flightPricingPage: state.app.companion.flightPricingPage,
  isInternationalBooking: state.app.companion.isInternationalBooking
});

const mapDispatchToProps = {
  goToCompanionPassengerPageFn: CompanionActions.goToCompanionPassengerPage
};

export default _.flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CompanionPricingPage);
