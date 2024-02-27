// @flow

import type { AirportType, AirStationType } from 'src/shared/flow-typed/shared.types';

export const transformToAirport = (airStation: AirStationType): AirportType => ({
  airportName: airStation.stationName,
  airportSearchName: airStation.displayName,
  cityName: airStation.shortDisplayName,
  cityState: airStation.stateFederalUnit,
  code: airStation.id,
  countryCode: airStation.countryCode,
  displayName: airStation.stationName,
  latitude: airStation.latitude,
  longitude: airStation.longitude,
  marketingCarriers: ['WN'],
  shortDisplayName: airStation.shortDisplayName,
  airportGroupId: airStation.airportGroupId,
  airportGroupName: airStation.airportGroupName,
  airportGroups: airStation.airportGroups,
  multiSelectGroup: airStation.multiSelectGroup,
  airportGroupSubtitle: airStation.airportGroupSubtitle,
  airportGroupShortDisplayName: airStation.airportGroupShortDisplayName
});
