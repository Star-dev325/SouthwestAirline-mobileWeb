// @flow

import AirportInfoActionTypes from 'src/airports/actions/airportInfoActionTypes';

export const updateSelectedAirportInfo = (airportInfo: *) => ({
  type: AirportInfoActionTypes.AIRPORT_INFO__UPDATE_SELECTED_AIRPORT_INFO,
  airportInfo
});

export const resetSelectedAirportInfo = () => ({
  type: AirportInfoActionTypes.AIRPORT_INFO__RESET_SELECTED_AIRPORT_INFO
});
