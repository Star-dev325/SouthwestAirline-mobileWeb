// @flow
import _ from 'lodash';
import { connect } from 'react-redux';
import { getCompanionConfirmationPage } from 'src/companion/selectors/companionConfirmationPageSelector';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import CarCrossSellBanner from 'src/airBooking/components/carCrossSellBanner';
import ConfirmationTripHeader from 'src/shared/components/confirmationTripHeader';
import Container from 'src/shared/components/container';
import FundResultsList from 'src/shared/components/fundResultsList';
import i18n from '@swa-ui/locale';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import NavGroupItemLinks from 'src/shared/components/navGroupItemLinks';
import PriceTotal from 'src/shared/components/priceTotal';
import React from 'react';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import SubHeader from 'src/shared/components/subHeader';
import type { BillingInformation, ConfirmationDates, ConfirmationPassengers, FlightPricingBound, Push, TotalsType } from 'src/shared/flow-typed/shared.types';
import type { GetCarBookingLinkQueryType } from 'src/carBooking/flow-typed/carBooking.types';
import type { RetrievedFundType } from 'src/travelFunds/flow-typed/travelFunds.types';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';

type Props = {
  _links: { carBooking?: Link },
  billingInfo: BillingInformation,
  bounds: Array<FlightPricingBound>,
  dates: ConfirmationDates,
  destinationDescription: string,
  fundsApplied?: Array<RetrievedFundType>,
  headerMessage?: { body: string, header: string, key: string },
  prepareCarCrossSellFromQueryAndTransitionToCarBookingFn: (carBookingLinkQuery: GetCarBookingLinkQueryType) => void,
  pnrs: Array<ConfirmationPassengers>,
  push: Push,
  totals: TotalsType
};

export class CompanionConfirmationPage extends React.Component<Props> {
  _onCarCrossSellClick = () => {
    const { prepareCarCrossSellFromQueryAndTransitionToCarBookingFn, _links } = this.props;

    prepareCarCrossSellFromQueryAndTransitionToCarBookingFn(_.get(_links, 'carBooking.query'));
  };

  render() {
    const { dates, destinationDescription, pnrs, bounds, totals, billingInfo, fundsApplied, headerMessage } =
      this.props;

    return (
      <div className="companion-confirmation">
        <SubHeader title="Confirmation" />

        <MessageWithInstructions
          className="purchase-confirmation--trip-booked"
          title={headerMessage ? headerMessage.header : i18n('COMPANION_MESSAGE_WITH_INSTRUCTIONS_TITLE')}
          subInstruction={
            headerMessage
              ? headerMessage.body
              : _.isEmpty(bounds)
                ? i18n('SHARED__TRIP_BOOKED__EMAIL_CONFIRMATION_SUB_DETAILS')
                : i18n('COMPANION_MESSAGE_WITH_INSTRUCTIONS_SUB_INSTRUCTION')
          }
        />
        <ConfirmationTripHeader
          dates={dates}
          destinationDescription={destinationDescription}
          pnrs={pnrs}
          bounds={bounds}
        />
        <ReservationFlightSummary bounds={bounds} />
        <PriceTotal totals={totals} />
        <FundResultsList
          listTitle={i18n('SHARED__TRIP_BOOKED__AMOUNT_APPLIED')}
          billingInfo={billingInfo}
          retrievedFunds={fundsApplied}
        />
        <Container noBottomPadding>
          <CarCrossSellBanner onClick={this._onCarCrossSellClick} />
          <NavGroupItemLinks />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...getCompanionConfirmationPage(state)
});

const mapDispatchToProps = {
  saveSelectedRecentSearchRequestFn: CarBookingActions.saveSelectedRecentSearchRequest,
  prepareCarCrossSellFromQueryAndTransitionToCarBookingFn:
    CarBookingActions.prepareCarCrossSellFromQueryAndTransitionToCarBooking
};

const enhancers = _.flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(CompanionConfirmationPage);
