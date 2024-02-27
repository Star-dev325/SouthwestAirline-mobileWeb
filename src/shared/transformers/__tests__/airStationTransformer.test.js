import { transformToAirport } from 'src/shared/transformers/airStationTransformer';

describe('transformToAirport', () => {
  it('should transform airStation to airport', () => {
    const airStation = {
      ezRez: true,
      latitude: '32.8471',
      longitude: '-96.8518',
      timeZone: 'America/Chicago',
      mobileBoarding: true,
      id: 'DAL',
      stateFederalUnit: 'TX',
      countryCode: 'US',
      displayName: 'Dallas (Love Field), TX - DAL',
      stationName: 'Dallas (Love Field)',
      shortDisplayName: 'Dallas',
      airportGroupId: 'DAL',
      airportGroupName: 'Dallas',
      airportGroups: ['DAL', 'AUS'],
      multiSelectGroup: ['DAL', 'AUS'],
      airportGroupSubtitle: 'Area Airports',
      airportGroupShortDisplayName: 'Dallas'
    };

    expect(transformToAirport(airStation)).toEqual({
      airportName: 'Dallas (Love Field)',
      airportSearchName: 'Dallas (Love Field), TX - DAL',
      cityName: 'Dallas',
      cityState: 'TX',
      code: 'DAL',
      countryCode: 'US',
      displayName: 'Dallas (Love Field)',
      latitude: '32.8471',
      longitude: '-96.8518',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Dallas',
      airportGroupId: 'DAL',
      airportGroupName: 'Dallas',
      airportGroups: ['DAL', 'AUS'],
      multiSelectGroup: ['DAL', 'AUS'],
      airportGroupSubtitle: 'Area Airports',
      airportGroupShortDisplayName: 'Dallas'
    });
  });
});
