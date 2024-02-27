// @flow
import travelAdvisoryActionTypes, { apiActionCreator } from 'src/travelAdvisory/actions/travelAdvisoryActionTypes';
import * as TravelAdvisoryApi from 'src/shared/api/wcm/travelAdvisoryApi';

import type { Dispatch as ReduxDispatch } from 'redux';

const { TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES } = travelAdvisoryActionTypes;

const { fetchTravelAdvisories, fetchTravelAdvisoriesSuccess, fetchTravelAdvisoriesFailed } = apiActionCreator(
  TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES
);

export const getTravelAdvisories =
  () =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(fetchTravelAdvisories());

      return TravelAdvisoryApi.getTravelAdvisories()
        .then((response) => {
          dispatch(fetchTravelAdvisoriesSuccess(response));

          return response;
        })
        .catch((error) => {
          dispatch(fetchTravelAdvisoriesFailed(error));

          return error;
        });
    };
