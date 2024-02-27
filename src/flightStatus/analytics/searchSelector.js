import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { FLIGHT_STATUS_SEARCH_FORM } from 'src/shared/constants/formIds';

const getAirportInfo = (state) => _.get(state, 'app.airportInfo');
const getSearchRequest = (state) => _.get(state, `app.formData.${FLIGHT_STATUS_SEARCH_FORM}.data`);
const getSelectedRecentSearchRequest = (state) => _.get(state, 'app.flightStatus.selectedRecentSearchRequest');
const getPathName = (state) => _.get(state, 'router.location.pathname');

export const getSearch = createSelector(
  [getAirportInfo, getSearchRequest, getPathName, getSelectedRecentSearchRequest],
  (airportInfo, searchRequest, pathName, selectedRecentSearchRequest) => {
    let origin;
    let destination;

    if (searchRequest) {
      origin = searchRequest.originAirport;
      destination = searchRequest.destinationAirport;
    } else if (selectedRecentSearchRequest) {
      origin = selectedRecentSearchRequest.from;
      destination = selectedRecentSearchRequest.to;
    } else {
      const urlSegments = pathName.split('/');

      origin = urlSegments[2];
      destination = urlSegments[3];
    }

    return {
      origin,
      destination,
      currentLocationUsed: _.some(airportInfo, 'isCurrentLocation')
    };
  }
);
