// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { changeReaccomFlight } from 'src/airChange/actions/airChangeActions';
import { getSelectedBounds } from 'src/airChange/analytics/flightReaccomShoppingMktgSelector';
import AirChangeReaccomConfirmForm from 'src/airChange/components/airChangeReaccomConfirmForm';
import PageHeader from 'src/shared/components/pageHeader';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import ReviewFooter from 'src/shared/components/reviewFooter';
import { INBOUND, OUTBOUND } from 'src/shared/constants/flightBoundTypes';
import { AIR_CHANGE_REACCOM_CONFIRM_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type {
  ReaccomSelectedProductsType,
  ReaccomShoppingPageType,
  SelectedBounds
} from 'src/airChange/flow-typed/airChange.types';
import type { FlightPricingBound } from 'src/shared/flow-typed/shared.types';

type Props = {
  allSelectedProducts: ReaccomSelectedProductsType,
  changeReaccomFlightFn: (Link, boolean) => void,
  isLoggedIn: boolean,
  reaccomShoppingPage: ReaccomShoppingPageType,
  selectedBounds: SelectedBounds
};

export class AirReaccomTripSummaryPage extends React.Component<Props> {
  _confirmFlightChange = (formData: FormData) => {
    const { allSelectedProducts, changeReaccomFlightFn, isLoggedIn, reaccomShoppingPage, selectedBounds } = this.props;
    const reaccomConfirmationPage = _.cloneDeep(
      _.get(reaccomShoppingPage, 'flights._links.reaccomConfirmationPage', {})
    );
    let reaccomProductIds = {
      outbound: _.get(allSelectedProducts, 'outbound.fareProductId', null),
      inbound: _.get(allSelectedProducts, 'inbound.fareProductId', null)
    };

    const isBothBoundSelected = selectedBounds?.firstbound && selectedBounds?.secondbound;

    if (!isBothBoundSelected) {
      const unselectedDirection = selectedBounds?.secondbound ? OUTBOUND : INBOUND;

      reaccomProductIds = _.omit(reaccomProductIds, `${unselectedDirection}`);
    }

    _.set(reaccomConfirmationPage, 'body.reaccomProductIds', reaccomProductIds);

    if (reaccomShoppingPage?.needsEmailAddress && reaccomConfirmationPage?.body) {
      reaccomConfirmationPage.body.fulfillmentEmail = formData.fulfillmentEmail;
    }
    changeReaccomFlightFn(reaccomConfirmationPage, isLoggedIn);
  };

  _updateCurrentReservationWithNewProducts = (): Array<FlightPricingBound> => {
    const {
      allSelectedProducts: { newProducts },
      reaccomShoppingPage
    } = this.props;
    const originalRes = _.cloneDeep(_.get(reaccomShoppingPage, 'currentReservation'));

    Object.keys(originalRes).forEach((key) => originalRes[key] === null && delete originalRes[key]);
    _.forEach(newProducts, (product: FlightPricingBound, key: string) => {
      if (product) {
        _.set(originalRes, `${key}`, product);
      }
    });

    return _.values(originalRes);
  };

  render() {
    const { reaccomShoppingPage } = this.props;
    const tripSummaryMessage = _.get(reaccomShoppingPage, 'tripSummaryMessage.0', null);
    const needsEmailAddress = reaccomShoppingPage?.needsEmailAddress || null;
    const tripSummaryHeader = _.get(tripSummaryMessage, 'header', '');
    const tripSummaryBody = _.get(tripSummaryMessage, 'body', '');

    const updatedReservationFlights = this._updateCurrentReservationWithNewProducts();

    return (
      <div className="reaccom-trip-summary-container">
        <PageHeader>
          <div>
            <span className="inline-block mr4">{i18n('AIR_CHANGE__REACCOM_SHOPPING__TRIP_SUMMARY')}</span>
            <span className="normal inline-block mr2">{tripSummaryHeader}</span>
          </div>
        </PageHeader>
        <div className="reaccom-message" dangerouslySetInnerHTML={{ __html: tripSummaryBody }} />
        <div className="reaccom-flight-cards">
          <ReservationFlightSummary bounds={updatedReservationFlights} />
        </div>
        <AirChangeReaccomConfirmForm
          formId={AIR_CHANGE_REACCOM_CONFIRM_FORM}
          needsEmailAddress={needsEmailAddress}
          onSubmit={this._confirmFlightChange}
        />
        <ReviewFooter className="large" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allSelectedProducts: _.get(state, 'app.airChange.reaccomShoppingPage.selectedProducts', {}),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  reaccomShoppingPage: _.get(state, 'app.airChange.reaccomShoppingPage.response', {}),
  selectedBounds: getSelectedBounds(state)
});

const mapDispatchToProps = {
  changeReaccomFlightFn: changeReaccomFlight
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(AirReaccomTripSummaryPage);
