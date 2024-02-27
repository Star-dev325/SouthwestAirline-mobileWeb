// @flow

import _ from 'lodash';
import { matchPath } from 'react-router';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';
import {
  getFlightDepartureAirportsAndDates,
  getHazmatDeclarationKeysFromConfirmationPage,
  getHazmatDeclarationKeysFromMobileBoardingPass
} from 'src/checkIn/transformers/hazmatFlightsTransfomer';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getCurrentRouteState, getPrevRouteState } from 'src/shared/routeUtils/routeStateHelper';

const checkInBoardingPassInterceptor = (boardingPassPagePath: string) => (interceptorContext: InterceptorContext) => {
  const { history, store } = interceptorContext;
  const { persistentHistory } = store.getState();
  const currentState = getCurrentRouteState(persistentHistory);
  const currentPathName = _.get(currentState, 'pathname');
  const isBoardingPassPagePath = matchPath(currentPathName, { path: boardingPassPagePath, exact: true });
  const { firstName, lastName, recordLocator } = _.get(currentState, 'state') || {};
  const prevState = getPrevRouteState(persistentHistory);
  const prevPathname = _.get(prevState, 'pathname') || '';
  const isFromUpcomingTrips = prevPathname === '/my-account/upcoming-trips';
  const isFromUpcomingtripDetails = prevPathname && prevPathname.startsWith('/my-account/upcoming-trip-details/');
  const isFromViewReservationTripDetails = prevPathname && prevPathname.startsWith('/view-reservation/trip-details/');
  const isFromCheckInConfirmationPage = prevPathname === getNormalizedRoute({ routeName: 'checkInConfirmation' });
  const isFromBoardingPositionsPage = prevPathname === getNormalizedRoute({ routeName: 'checkInBoardingPosition' });
  const isFromChooseBoardingPassesPage = prevPathname === getNormalizedRoute({ routeName: 'checkInChooseBoardingPass' });
  const state = store.getState();

  if (isBoardingPassPagePath && firstName && lastName && recordLocator) {
    let requiresHazmatAck = false;
    let flights = [];
    const pnr = { firstName, lastName, recordLocator };

    if (
      isFromUpcomingTrips ||
      isFromUpcomingtripDetails ||
      isFromCheckInConfirmationPage ||
      isFromBoardingPositionsPage ||
      isFromChooseBoardingPassesPage ||
      isFromViewReservationTripDetails
    ) {
      const mobileBoardingPassView = _.get(
        state,
        'app.checkIn.checkInViewBoardingPassPage.mobileBoardingPassViewPage.mobileBoardingPassView',
        []
      );
      const checkInConfirmationPageFlights = _.get(state, 'app.checkIn.checkInConfirmationPage.flights', []);

      if (!_.isEmpty(checkInConfirmationPageFlights)) {
        const flightDepartureAirportsAndDates = getFlightDepartureAirportsAndDates(mobileBoardingPassView);

        flights = getHazmatDeclarationKeysFromConfirmationPage(
          checkInConfirmationPageFlights,
          flightDepartureAirportsAndDates
        );
      } else {
        flights = getHazmatDeclarationKeysFromMobileBoardingPass(mobileBoardingPassView);
      }

      requiresHazmatAck = !CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations(flights);
    }

    if (requiresHazmatAck) {
      return {
        interceptor() {
          history.replace(getNormalizedRoute({ routeName: 'hazmatDeclaration' }), { pnr, flights });
        },
        ...interceptorContext
      };
    } else {
      return {
        interceptor() {},
        ...interceptorContext
      };
    }
  }
};

export default checkInBoardingPassInterceptor;
