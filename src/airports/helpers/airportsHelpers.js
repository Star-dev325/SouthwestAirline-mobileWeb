// @flow
import _ from 'lodash';
import type { AirportType, MultiSelectGroup, AirportGroupData } from 'src/shared/flow-typed/shared.types.js';

const EMPTY_AIRPORT = {
  airportName: 'AIRPORT NOT FOUND',
  airportSearchName: 'AIRPORT NOT FOUND',
  cityName: 'AIRPORT NOT FOUND',
  cityState: 'AIRPORT NOT FOUND',
  code: 'AIRPORT NOT FOUND',
  countryCode: 'AIRPORT NOT FOUND',
  displayName: 'AIRPORT NOT FOUND',
  latitude: 'AIRPORT NOT FOUND',
  longitude: 'AIRPORT NOT FOUND',
  marketingCarriers: [],
  shortDisplayName: 'AIRPORT NOT FOUND',
  airportGroupId: 'AIRPORT NOT FOUND',
  airportGroupName: 'AIRPORT NOT FOUND',
  airportGroups: [],
  multiSelectGroup: [],
  airportGroupSubtitle: 'AIRPORT NOT FOUND',
  airportGroupShortDisplayName: 'AIRPORT NOT FOUND'
};

export const isLoaded = (airports: AirportType[]) => _.some(airports);

export const isInternational = (airports: AirportType[], airportCode: string) => {
  const matchingAirport = _.find(airports, { code: airportCode });

  return matchingAirport && matchingAirport.countryCode !== 'US';
};

export const getAirportFromCode = (airports: AirportType[], airportCode: string) => {
  const matchingAirport = _.find(airports, { code: airportCode });

  return matchingAirport || EMPTY_AIRPORT;
};

export const getAirportFromAirportGroupShortDisplayName = (airports: AirportType[], multiSelectGroup: MultiSelectGroup) => {
  const matchingAirport = getAirportFromMultiSelectGroup(airports, multiSelectGroup);

  return matchingAirport || EMPTY_AIRPORT;
};

export const updateMultiSelectGroupIsSelected = (multiSelectGroup: MultiSelectGroup) => {
  multiSelectGroup.isSelected = !!Object.values(multiSelectGroup).filter(
    (value) => Array.isArray(value) && value.length > 1
  ).length;

  return multiSelectGroup;
};

export const getMultiSelectOriginDestinationShortDisplayName = (
  airports: AirportType[],
  multiSelectGroup: MultiSelectGroup
) => {
  const { origin, destination } = multiSelectGroup;
  const multiSelectOriginDestinationData = {};
  const multipleOriginationAirportGroup =
  origin && origin.length > 1 && getAirportFromMultiSelectGroup(airports, origin);
  const multipleDestinationAirportGroup =
  destination && destination.length > 1 && getAirportFromMultiSelectGroup(airports, destination);

  if (multipleOriginationAirportGroup && multipleOriginationAirportGroup.airportGroupShortDisplayName) {
    multiSelectOriginDestinationData['multipleOriginationAirportGroupName'] =
      multipleOriginationAirportGroup.airportGroupShortDisplayName;
    multiSelectOriginDestinationData['multipleOriginationAirports'] = origin;
    multiSelectOriginDestinationData['origin'] = multipleOriginationAirportGroup.airportGroupShortDisplayName;
  }

  if (multipleDestinationAirportGroup && multipleDestinationAirportGroup.airportGroupShortDisplayName) {
    multiSelectOriginDestinationData['destination'] = multipleDestinationAirportGroup.airportGroupShortDisplayName;
    multiSelectOriginDestinationData['multipleDestinationAirportGroupName'] =
      multipleDestinationAirportGroup.airportGroupShortDisplayName;
    multiSelectOriginDestinationData['multipleDestinationAirports'] = destination;
  }

  return { ...multiSelectOriginDestinationData, multiSelectGroup };
};

export const getAirportFromMultiSelectGroup = (airports: AirportType[], originDestinationGroup: MultiSelectGroup | AirportGroupData) =>
  airports.find(
    // NOTE: Do not refactor below to use optional chaining operator until Flow updates with support
    // ("Flow does not yet support method or property calls in optional chains.")
    (airport) => airport.multiSelectGroup && airport.multiSelectGroup.includes(originDestinationGroup[0])
  );

export const handleViewportResize = (event: *) => {
  const containerHeight = event.target.height;
  const modalElement = document.querySelector('.ReactModal__Overlay--after-open');

  modalElement && modalElement.style.setProperty('height', `${containerHeight}px`);
  
  scrollToTopAndLeftFn();
};

export const handleViewportScroll = () => {
  scrollToTopAndLeftFn();
};

export const scrollToTopAndLeftFn = () => {
  window.scrollTo(0, 0);
};
