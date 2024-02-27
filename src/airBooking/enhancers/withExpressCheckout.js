// @flow

import type { ComponentType } from 'react';
import React from 'react';
import { shouldRemoveFrequentTravelerAtIndex } from 'src/shared/helpers/passengerInfoHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { isWebViewLogin } from 'src/shared/helpers/webViewHelper';

import type { FlightProductSearchRequest } from 'src/airBooking/flow-typed/airBooking.types';
import type { SelectedFrequentTravelerType } from 'src/shared/flow-typed/shared.types';

type Props = {
  searchRequest: FlightProductSearchRequest,
  isInternationalBooking: boolean,
  isEligibleForExpressCheckout: boolean,
  isExpressCheckoutFromPassengerPage: boolean,
  isLoggedIn: boolean,
  isWebView: boolean,
  webViewLoginStatus: string,
  params: { paxNumber: number },
  fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn: (
    isInternationalBooking: boolean,
    passengerPageUrl?: string,
    passengerNumber: number,
    isExpressCheckoutFromPassengerPage: boolean,
    shouldShowChaseInstantCreditCard: boolean
  ) => void,
  shouldShowChaseInstantCreditCard: boolean,
  selectedFrequentTravelers: Array<SelectedFrequentTravelerType>,
  removeFrequentTravelerSelectedByPaxNumberFn: (number) => void
};

type State = { shouldRenderComponent: boolean };

const withExpressCheckout = (Component: ComponentType<*>) =>
  class WithExpressCheckout extends React.Component<Props, State> {
    constructor() {
      super();
      this.state = { shouldRenderComponent: false };
    }

    componentDidMount() {
      const { isEligibleForExpressCheckout, isLoggedIn } = this.props;

      if (isEligibleForExpressCheckout && isLoggedIn) {
        this._fetchSavedCCsAndPassengerInfoWithExpressCheckOut();
      } else {
        this.setState({ shouldRenderComponent: true });
      }
    }

    UNSAFE_componentWillReceiveProps(props: Props) {
      if (!props.isEligibleForExpressCheckout) {
        this.setState({ shouldRenderComponent: true });
      }
    }

    componentDidUpdate(prevProps: Props) {
      isWebViewLogin(this.props, prevProps) &&
        this.props.isEligibleForExpressCheckout &&
        this._fetchSavedCCsAndPassengerInfoWithExpressCheckOut();
    }

    _fetchSavedCCsAndPassengerInfoWithExpressCheckOut = () => {
      const {
        searchRequest: { numberOfAdults, numberOfLapInfants = 0 },
        isInternationalBooking,
        params,
        fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn,
        isExpressCheckoutFromPassengerPage,
        shouldShowChaseInstantCreditCard,
        selectedFrequentTravelers,
        removeFrequentTravelerSelectedByPaxNumberFn
      } = this.props;

      const passengerAmount = parseInt(numberOfAdults + numberOfLapInfants);
      const passengerPageUrl = buildPathWithParamAndQuery(`${getNormalizedRoute({ routeName: 'passengers' })}/:paxNumber`, {
        paxNumber: params.paxNumber
      });

      shouldRemoveFrequentTravelerAtIndex(selectedFrequentTravelers, 0) && removeFrequentTravelerSelectedByPaxNumberFn(0);

      fetchSavedCCsAndPassengerInfoWithExpressCheckOutFn(
        isInternationalBooking,
        passengerPageUrl,
        passengerAmount,
        isExpressCheckoutFromPassengerPage,
        shouldShowChaseInstantCreditCard
      );
    };

    render() {
      return this.state.shouldRenderComponent && <Component {...this.props} />;
    }
  };

export default withExpressCheckout;
