import React from 'react';
import { storiesOf } from '@storybook/react';
import AirportListGroups from 'src/airports/components/airportListGroups';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

const AIRPORT_LIST = [
  {
    code: 'DEN',
    airportName: 'Denver',
    displayName: 'Denver',
    cityName: 'Denver',
    shortDisplayName: 'Denver',
    cityState: 'CO',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '39.8617',
    longitude: '-104.673',
    airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing'
  },
  {
    code: 'CAK',
    airportName: 'Akron-Canton',
    displayName: 'Akron-Canton',
    cityName: 'Akron',
    shortDisplayName: 'Akron',
    cityState: 'OH',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '40.9161',
    longitude: '-81.4422',
    airportSearchName: 'Ohio'
  },
  {
    code: 'ALB',
    airportName: 'Albany',
    displayName: 'Albany',
    cityName: 'Albany',
    shortDisplayName: 'Albany',
    cityState: 'NY',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '42.7483',
    longitude: '-73.8017',
    airportSearchName: 'New York'
  }
];

const AIRPORT_GROUPS = [
  {
    code: 'BOT',
    airportName: 'Bawston',
    displayName: 'Bawston',
    cityName: 'Windy City',
    shortDisplayName: 'Bawston',
    cityState: 'MA',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '42.3643',
    longitude: '-71.0052',
    airportSearchName: 'Massachussets',
    airportGroupId: 'BOT',
    airportGroupName: 'Boston',
    airportGroups: ['BOS', 'MHT']
  },
  {
    code: 'MHT',
    airportName: 'Mancheester',
    displayName: 'Mancheester',
    cityName: 'Manchester',
    shortDisplayName: 'Mancheester',
    cityState: 'NH',
    marketingCarriers: ['WN'],
    countryCode: 'US',
    latitude: '42.9326',
    longitude: '-71.4357',
    airportSearchName: 'New Hampshire',
    airportGroupId: 'BOT',
    airportGroupName: 'Boston',
    airportGroups: ['BOS', 'MHT']
  }
];
const store = createMockedFormStore();
const multiSelectGroup = Object.entries(getMultiSelectGroup())
  .filter((group) => group[0] !== 'Recently Searched')
  .map(group => group[1])
  .flatMap((airport) => airport);

storiesOf('components/airportListGroups', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => {
    return <AirportListGroups airports={AIRPORT_LIST} onAirportSelect={() => {}} />;
  })
  .add('recentSearches', () => {
    return (
      <AirportListGroups
        airports={AIRPORT_LIST}
        recentAirportSearches={AIRPORT_LIST.slice(0, 2)}
        onAirportSelect={() => {}}
        onDeleteRecentAirportSearches={() => {}}
      />
    );
  })
  .add('recentSearchesWithMultiSelectGroup', () => {
    return (
      <AirportListGroups
        airports={multiSelectGroup}
        recentAirportSearches={[...AIRPORT_LIST.slice(0, 1), ...getMultiSelectGroup()['Recently Searched']]}
        isMultiSelectGroupEnabled
        sortByGroups
        onAirportSelect={() => {}}
        handleMultiSelectRecentSearch={() => {}}
        onDeleteRecentAirportSearches={() => {}}
      />
    );
  })
  .add('groupAirports', () => {
    return (
      <AirportListGroups
        airports={_.concat(AIRPORT_LIST, AIRPORT_GROUPS)}
        onAirportSelect={() => {}}
        onDeleteRecentAirportSearches={() => {}}
        sortByGroups
      />
    );
  })
  .add('groupAirportsWithRecentSearches', () => {
    return (
      <AirportListGroups
        airports={_.concat(AIRPORT_LIST, AIRPORT_GROUPS)}
        recentAirportSearches={AIRPORT_LIST.slice(0, 2)}
        onAirportSelect={() => {}}
        onDeleteRecentAirportSearches={() => {}}
        sortByGroups
      />
    );
  })
  .add('multiSelectGroupWithCheckboxes', () => {
    return <AirportListGroups airports={multiSelectGroup} sortByGroups isMultiSelectGroupEnabled />;
  });
