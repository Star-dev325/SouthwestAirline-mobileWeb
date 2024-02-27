// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import type { GetCarBookingLinkQueryType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carBookingLinkQuery: GetCarBookingLinkQueryType,
  children: *,
  isWebView: boolean,
  prepareCarCrossSellFromQueryAndTransitionToCarBookingFn: (
    carBookingLinkQuery: GetCarBookingLinkQueryType,
    isWebView: boolean
  ) => void,
};

export class CrossSellCarLink extends React.Component<Props> {
  _onClick = (event: SyntheticEvent<HTMLElement>) => {
    const { carBookingLinkQuery, prepareCarCrossSellFromQueryAndTransitionToCarBookingFn, isWebView } = this.props;

    event.preventDefault();
    prepareCarCrossSellFromQueryAndTransitionToCarBookingFn(carBookingLinkQuery, isWebView);
  };

  render() {
    const { children } = this.props;

    return (
      <div data-qa="cross-sell-car-link" onClick={this._onClick}>
        {children}
      </div>
    );
  }
}

const mapDispatchToProps = {
  prepareCarCrossSellFromQueryAndTransitionToCarBookingFn:
    CarBookingActions.prepareCarCrossSellFromQueryAndTransitionToCarBooking
};

const enhancers = _.flowRight(connect(() => ({}), mapDispatchToProps));

export default enhancers(CrossSellCarLink);