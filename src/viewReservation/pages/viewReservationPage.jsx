// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import Container from 'src/shared/components/container';
import DetachedTabBar from 'src/shared/components/detachedTabBar';
import DetachedTabContent from 'src/shared/components/detachedTabContent';
import RecentTripSearchCardsList from 'src/shared/components/recentTripSearchCardsList';
import SubHeader from 'src/shared/components/subHeader';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';
import {
  VIEW_RESERVATIONS_RETRIEVE_CAR_RESERVATION_FORM,
  VIEW_RESERVATIONS_RETRIEVE_RESERVATION_FORM
} from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withRecentTripSearches from 'src/shared/enhancers/withRecentTripSearches';
import ReservationRetrievalForm from 'src/shared/form/components/reservationRetrievalForm';
import BrowserObject from 'src/shared/helpers/browserObject';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute, isOnOldRoute } from 'src/shared/helpers/urlHelper';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import CarReservationRetrievalForm from 'src/viewReservation/components/carReservationRetrievalForm';
import UpcomingTripsLink from 'src/viewReservation/components/upcomingTripsLink';
import {
  DEFAULT_CAR_BOOKING_MAX_DAYS_OUT, VIEW_RESERVATION_FORM_PAGE
} from 'src/viewReservation/constants/viewReservationConstants';

import type { PassengerNameRecord, Push, Replace } from 'src/shared/flow-typed/shared.types';
import type {
  CarRetrieveRequestType,
  FlightRetrieveRequestType,
  RetrieveReservationRequestType
} from 'src/viewReservation/flow-typed/viewReservation.types';

const { location } = BrowserObject;
const { FLIGHT_TAB, CAR_TAB } = VIEW_RESERVATION_FORM_PAGE;
const tabs = [FLIGHT_TAB, CAR_TAB];

type Props = {
  isLoggedIn: boolean,
  recentTripSearches: Array<PassengerNameRecord>,
  fetchRecentTripSearchesFn: () => void,
  saveRecentTripSearchFn: (*) => void,
  clearFormDataByIdFn: (string) => void,
  analyticsTrackViewTabFn: (string) => void,
  retrieveCarReservationAndTransitionToCarDetailPageFn: (RetrieveReservationRequestType) => Promise<*>,
  lastBookableDate: string,
  push: Push,
  replace: Replace,
  query: *,
  history: {
    action: string
  }
};

type State = {
  activeTab: string
};

export class ViewReservationPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeTab: props.query.tab || (location.pathname.includes('car/manage-reservation') ? CAR_TAB : FLIGHT_TAB)
    };
  }

  componentDidMount() {
    if (_.get(this.props, 'history.action') === 'PUSH' || this._isComingFromHamburgerMenu()) {
      this.props.clearFormDataByIdFn(VIEW_RESERVATIONS_RETRIEVE_CAR_RESERVATION_FORM);
      this.props.clearFormDataByIdFn(VIEW_RESERVATIONS_RETRIEVE_RESERVATION_FORM);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState({
      activeTab: nextProps.query.tab || (location.pathname.includes('car/manage-reservation') ? CAR_TAB : FLIGHT_TAB)
    });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const newActiveTab = nextState.activeTab;
    const preActiveTab = this.state.activeTab;
    const newRecentTripSearches = nextProps.recentTripSearches;
    const preRecentTripSearches = this.props.recentTripSearches;

    return newActiveTab !== preActiveTab || (_.isEmpty(preRecentTripSearches) && !_.isEmpty(newRecentTripSearches));
  }

  _onRetrieveFlightReservation = (requestModel: FlightRetrieveRequestType) => {
    const { saveRecentTripSearchFn, fetchRecentTripSearchesFn, push } = this.props;

    saveRecentTripSearchFn(requestModel);
    fetchRecentTripSearchesFn();
    let state = {
      firstName: requestModel.firstName,
      lastName: requestModel.lastName
    };

    if (!isOnOldRoute()) {
      state = { ...state, recordLocator: requestModel.recordLocator };
    }

    push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'viewReservationView' }), {
        recordLocator: requestModel.recordLocator
      }),
      null,
      null,
      state
    );
  };

  _onRetrieveCarReservation = (request: CarRetrieveRequestType) => {
    this.props.retrieveCarReservationAndTransitionToCarDetailPageFn(request);
  };

  _onTabClick = (tabIndex: number) => {
    const routeName = tabs[tabIndex] === CAR_TAB ? 'carReservationIndex' : 'index';

    this.props.replace(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName }), null, { tab: tabs[tabIndex], clearFormData: false })
    );

    this.setState({ activeTab: tabs[tabIndex] });
  };

  _isComingFromHamburgerMenu = () =>
    _.get(this.props, 'history.action') === 'REPLACE' && this.props.query.cleanFlow === 'true';

  render() {
    const { recentTripSearches, isLoggedIn, analyticsTrackViewTabFn, lastBookableDate } = this.props;
    const { activeTab } = this.state;
    const activeTabIndex = tabs.indexOf(activeTab);
    const shouldShowRecentTripSearches = activeTab === FLIGHT_TAB && !_.isEmpty(recentTripSearches);

    return (
      <div>
        <SubHeader title={i18n('VIEW_RESERVATION__VIEW_RESERVATION_PAGE__HEADER_TITLE')} />
        {isLoggedIn && <UpcomingTripsLink />}

        <Container noBottomPadding={shouldShowRecentTripSearches}>
          <DetachedTabBar
            tabs={tabs}
            active={activeTabIndex}
            onTabClick={this._onTabClick}
            className="mb5"
            analyticsTrackViewTabFn={analyticsTrackViewTabFn}
          />
          <DetachedTabContent active={activeTabIndex}>
            <ReservationRetrievalForm
              formId={VIEW_RESERVATIONS_RETRIEVE_RESERVATION_FORM}
              onSubmit={this._onRetrieveFlightReservation}
            />
            <CarReservationRetrievalForm
              formId={VIEW_RESERVATIONS_RETRIEVE_CAR_RESERVATION_FORM}
              lastBookableDate={lastBookableDate}
              onSubmit={this._onRetrieveCarReservation}
            />
          </DetachedTabContent>
        </Container>
        {shouldShowRecentTripSearches && (
          <RecentTripSearchCardsList
            recentTripSearches={recentTripSearches}
            onCardClick={this._onRetrieveFlightReservation}
          />
        )}
      </div>
    );
  }
}

export const mapStateToProps = (state: any) => ({
  lastBookableDate: dayjs()
    .add(
      state?.app?.wcmContent?.applicationProperties?.CAR_BOOKING_MAX_DAYS_OUT || DEFAULT_CAR_BOOKING_MAX_DAYS_OUT,
      'days'
    )
    .format(MEDIUM_DATE_FORMAT),
  isLoggedIn: _.get(state, 'app.account.isLoggedIn')
});

const mapDispatchToProps = {
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  analyticsTrackViewTabFn: AnalyticsActions.viewTab,
  retrieveCarReservationAndTransitionToCarDetailPageFn:
    ViewReservationActions.retrieveCarReservationAndTransitionToCarDetailPage
};

const enhancers = _.flowRight(
  withBodyClass('view-reservation-page'),
  withRecentTripSearches('viewReservation'),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(ViewReservationPage);
