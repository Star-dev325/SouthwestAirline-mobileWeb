// @flow

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import CheckInEligibleTripsLink from 'src/checkIn/components/checkInEligibleTripsLink';
import { getTripsThatNeedToCheckIn } from 'src/checkIn/selectors/checkInLandingPageSelector';
import * as SharedActions from 'src/shared/actions/sharedActions';
import RecentTripSearchCardsList from 'src/shared/components/recentTripSearchCardsList';
import SubHeader from 'src/shared/components/subHeader';
import { CHECK_IN_RETRIEVE_RESERVATION_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withRecentTripSearches from 'src/shared/enhancers/withRecentTripSearches';
import ReservationRetrievalForm from 'src/shared/form/components/reservationRetrievalForm';
import { hasActiveSessionCookies } from 'src/shared/helpers/loginSessionHelper';

import type { CheckInViewResDetailRequestType } from 'src/checkIn/flow-typed/checkIn.types';
import type { PassengerNameRecord, Push, UpcomingTripPage } from 'src/shared/flow-typed/shared.types';

type Props = {
  fetchRecentTripSearchesFn: () => Promise<*>,
  fetchUpcomingTripsNonBlockingFn: () => Promise<*>,
  isLoggedIn: boolean,
  push: Push,
  recentTripSearches: Array<PassengerNameRecord>,
  retrieveCheckInReservationDetailsFn: (CheckInViewResDetailRequestType) => Promise<*>,
  saveRecentTripSearchFn: (passengerNameRecord?: PassengerNameRecord) => *,
  tripsThatNeedToCheckIn: Array<UpcomingTripPage>
};

export class CheckInLandingPage extends React.Component<Props> {
  componentDidMount() {
    const { fetchUpcomingTripsNonBlockingFn } = this.props;

    hasActiveSessionCookies() && fetchUpcomingTripsNonBlockingFn();
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const userJustLoggedIn = !this.props.isLoggedIn && nextProps.isLoggedIn;

    if (userJustLoggedIn) {
      this.props.fetchUpcomingTripsNonBlockingFn();
    }
  }

  _onSubmit = (requestModel: CheckInViewResDetailRequestType) => {
    const { saveRecentTripSearchFn, fetchRecentTripSearchesFn } = this.props;

    saveRecentTripSearchFn(requestModel);
    fetchRecentTripSearchesFn();

    this.props.retrieveCheckInReservationDetailsFn(requestModel);
  };

  _isLoggedInAndHasCheckInEligibleTrips = (isLoggedIn: boolean, tripsThatNeedToCheckIn: Array<*>) =>
    isLoggedIn && tripsThatNeedToCheckIn.length > 0;

  _transitionToUpcomingTripsOrViewReservationDetailsPage = () => {
    const { tripsThatNeedToCheckIn, retrieveCheckInReservationDetailsFn, push } = this.props;

    if (tripsThatNeedToCheckIn.length === 1) {
      const trip = tripsThatNeedToCheckIn[0];

      const requestData = {
        recordLocator: trip.confirmationNumber,
        firstName: _.get(trip, '_links.checkInViewReservationPage.query.first-name'),
        lastName: _.get(trip, '_links.checkInViewReservationPage.query.last-name')
      };

      retrieveCheckInReservationDetailsFn(requestData);
    } else if (tripsThatNeedToCheckIn.length > 1) {
      push('/my-account/upcoming-trips');
    }
  };

  render() {
    const { recentTripSearches, tripsThatNeedToCheckIn, isLoggedIn } = this.props;

    return (
      <div>
        <SubHeader title="Check In" />

        {this._isLoggedInAndHasCheckInEligibleTrips(isLoggedIn, tripsThatNeedToCheckIn) && (
          <CheckInEligibleTripsLink
            numberOfCheckInEligibleTrips={tripsThatNeedToCheckIn.length}
            onClick={this._transitionToUpcomingTripsOrViewReservationDetailsPage}
          />
        )}

        <ReservationRetrievalForm formId={CHECK_IN_RETRIEVE_RESERVATION_FORM} onSubmit={this._onSubmit} />

        <p className="check-in--eligible-time-range-notice">{i18n('CHECK_IN__CHECK_IN_ELIGIBLE_TIME_RANGE_NOTICE')}</p>

        {!_.isEmpty(recentTripSearches) && (
          <RecentTripSearchCardsList recentTripSearches={recentTripSearches} onCardClick={this._onSubmit} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: _.get(state, 'app.account.isLoggedIn'),
  tripsThatNeedToCheckIn: getTripsThatNeedToCheckIn(state)
});

const mapDispatchToProps = {
  fetchUpcomingTripsNonBlockingFn: SharedActions.fetchUpcomingTripsNonBlocking,
  retrieveCheckInReservationDetailsFn: CheckInActions.getReserveCheckInReservation
};

const enhancers = _.flowRight(
  withBodyClass('check-in-landing-page'),
  withConnectedReactRouter,
  withRecentTripSearches('checkIn'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CheckInLandingPage);
