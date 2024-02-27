import _ from 'lodash';
import RecentAirportSearchLocalStorageHelper from 'src/airports/helpers/recentAirportSearchLocalStorageHelper';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

describe('Recent Airport Search Local Storage Helper', () => {
  let airports;
  let container;

  beforeEach(() => {
    airports = [
      {
        code: 'MDW',
        airportName: 'Chicago (Midway)',
        cityName: 'Chicago',
        cityState: 'IL',
        marketingCarriers: ['FL', 'WN'],
        countryCode: 'US',
        longitude: '-87.7524',
        latitude: '41.786',
        airportSearchName: 'Illinois, Ilinois, Chitown, Windy City'
      },
      {
        code: 'ATL',
        airportName: 'Atlanta',
        cityName: 'Atlanta',
        cityState: 'GA',
        marketingCarriers: ['FL', 'WN'],
        countryCode: 'US',
        longitude: '-84.4281',
        latitude: '33.6367',
        airportSearchName: 'Georgia, Giorgia'
      },
      {
        code: 'AUA',
        airportName: 'Aruba',
        cityName: 'Aruba',
        cityState: 'AW',
        marketingCarriers: ['WN'],
        countryCode: 'AW',
        longitude: '-70.0152',
        latitude: '12.5014'
      }
    ];
    container = RecentAirportSearchLocalStorageHelper;
    container.clearRecentSearches();
  });

  afterEach(() => {
    container.clearRecentSearches();
  });

  describe('clearRecentSearches', () => {
    it('should set recent searches to []', () => {
      container.save(airports[0]);
      expect(container.recentAirportSearches.length).toEqual(1);

      container.clearRecentSearches();
      expect(container.recentAirportSearches).toEqual([]);
    });
  });

  describe('recentAirportSearches', () => {
    it('should return [] when no recent searches are available', () => {
      expect(container.recentAirportSearches).toEqual([]);
    });

    it('should return all recent searches if available', () => {
      airports.forEach((airport) => container.save(airport));
      const recentSearches = _.sortBy(
        container.recentAirportSearches.map((search) => search.value),
        'code'
      );
      const sortedAirports = _.sortBy(airports, 'code');

      expect(recentSearches).toEqual(sortedAirports);
    });
  });

  describe('save', () => {
    it('should save airport search with airport value and a timestamp', () => {
      container.save(airports[0]);
      const recentSearch = container.recentAirportSearches[0];

      expect(recentSearch.value).toEqual(airports[0]);
    });

    it('should save new airport in recent search airport with single airportGroupSelected', () => {
      const airport = { ...airports[2], airportGroupSelected: ['PVD'], airportGroupId: 'ILL' };

      container.save(airport);
      const recentSearch = container.recentAirportSearches[0];

      expect(recentSearch.value).toEqual(airport);
    });

    it('should save new airport in recent search with multiselectgroupGroupSelected', () => {
      container.save(getMultiSelectGroup()['Recently Searched'][0]);
      const airport = { ...airports[2], airportGroupSelected: ['PVD', 'BDL'], airportGroupId: 'ILL' };

      container.save(airport);
      const recentSearch = container.recentAirportSearches[0];

      expect(recentSearch.value).toEqual(airport);
    });

    it('should update airport in recent search with multiselectgroupGroupSelected', () => {
      container.save(getMultiSelectGroup()['Recently Searched'][0]);
      const airport = { ...airports[2], airportGroupSelected: ['PVD', 'BDL'], airportGroupId: 'BOT' };

      container.save(airport);
      const recentSearch = container.recentAirportSearches[0];

      expect(recentSearch.value).toEqual(airport);
    });
  });

  describe('delete', () => {
    it('should delete airport search', () => {
      container.save(airports[0]);
      expect(container.recentAirportSearches.length).toEqual(1);

      container.delete(airports[0]);
      expect(container.recentAirportSearches.length).toEqual(0);
    });
  });
});
