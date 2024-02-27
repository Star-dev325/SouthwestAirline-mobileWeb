// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import type { Push } from 'src/shared/flow-typed/shared.types';
import { flowRight, isEmpty } from 'src/shared/helpers/jsUtils';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import DayOfTravelContactMethodPage from 'src/shared/pages/dayOfTravelContactMethodPage';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';

type Props = {
  goBack: () => void,
  location: HistoryLocationWithState<*>,
  query: {
    searchToken?: string
  },
  push: Push,
  retrieveDayOfTravelContactInformationWithSearchTokenFn: (searchToken: string) => void,
  updateContactInfoAndNavigateFn: (request: Link, searchToken: string) => void,
  viewReservationViewPage: *
};

export const ViewReservationDayOfTravelContactMethodPage = (props: Props) => {
  const {
    goBack,
    location = {},
    query: {
      searchToken
    } = {},
    push,
    retrieveDayOfTravelContactInformationWithSearchTokenFn,
    updateContactInfoAndNavigateFn,
    viewReservationViewPage
  } = props;

  useEffect(() => {
    if (searchToken && isEmpty(viewReservationViewPage)) {
      retrieveDayOfTravelContactInformationWithSearchTokenFn(searchToken);
    }
  }, []);

  const customBackNavigation = () => {
    const { isInternalNav = false } = location?.state || {};

    if (searchToken && !isInternalNav) {
      push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'viewReservationView' }), {}, { searchToken }));
    } else {
      goBack();
    }
  };

  return (
    <DayOfTravelContactMethodPage 
      customBackNavigation={customBackNavigation}
      updateDayOfTravelContactInfoAndNavigateFn={updateContactInfoAndNavigateFn}
      {...props}
    />
  );
};

const mapDispatchToProps = {
  retrieveDayOfTravelContactInformationWithSearchTokenFn: ViewReservationActions.retrieveDayOfTravelContactInformationWithSearchToken,
  updateContactInfoAndNavigateFn: ViewReservationActions.updateDayOfTravelContactInformationAndTransitionToViewReservationDetailPage
};

const mapStateToProps = (state) => ({
  viewReservationViewPage: state?.app?.viewReservation?.flightReservation
});

const enhancers = flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(ViewReservationDayOfTravelContactMethodPage);
