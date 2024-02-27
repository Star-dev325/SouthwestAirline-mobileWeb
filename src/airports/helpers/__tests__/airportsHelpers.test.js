import * as AirportHelpers from 'src/airports/helpers/airportsHelpers';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';

describe('AirportsHelpers', () => {
  let airports;

  beforeEach(() => {
    airports = [
      {
        airportName: 'Chicago (Midway)',
        airportSearchName: 'Illinois, Ilinois, Chitown, Windy City',
        cityName: 'Chicago',
        cityState: 'IL',
        code: 'MDW',
        countryCode: 'US',
        latitude: '41.786',
        longitude: '-87.7524',
        marketingCarriers: ['FL', 'WN']
      },
      {
        airportName: 'Atlanta',
        airportSearchName: 'Georgia, Giorgia',
        cityName: 'Atlanta',
        cityState: 'GA',
        code: 'ATL',
        countryCode: 'US',
        latitude: '33.6367',
        longitude: '-84.4281',
        marketingCarriers: ['FL', 'WN']
      },
      {
        airportName: 'Aruba',
        cityName: 'Aruba',
        cityState: 'AW',
        code: 'AUA',
        countryCode: 'AW',
        latitude: '12.5014',
        longitude: '-70.0152',
        marketingCarriers: ['WN']
      }
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('isLoaded should be true', () => {
    expect(AirportHelpers.isLoaded(airports)).toBe(true);
  });

  describe('isInternational', () => {
    it('should be false when give ATL', () => {
      expect(AirportHelpers.isInternational(airports, 'ATL')).toBe(false);
    });

    it('should be true when give AUA', () => {
      expect(AirportHelpers.isInternational(airports, 'AUA')).toBe(true);
    });

    it('should be undefined when give an airport which is not found in store', () => {
      expect(AirportHelpers.isInternational(airports, 'CTU')).toBeUndefined();
    });
  });

  describe('getAirportFromCode', () => {
    it('should get the correct airport object from the store', () => {
      expect(AirportHelpers.getAirportFromCode(airports, 'MDW')).toEqual(airports[0]);
    });

    it('should return EMPTY_AIRPORT object if there is no airport for the given code', () => {
      const airportFromCode = AirportHelpers.getAirportFromCode(airports, 'Bad Code');

      expect(airportFromCode).toEqual({
        airportGroupId: 'AIRPORT NOT FOUND',
        airportGroupName: 'AIRPORT NOT FOUND',
        airportGroups: [],
        airportName: 'AIRPORT NOT FOUND',
        airportSearchName: 'AIRPORT NOT FOUND',
        airportGroupShortDisplayName: 'AIRPORT NOT FOUND',
        airportGroupSubtitle: 'AIRPORT NOT FOUND',
        cityName: 'AIRPORT NOT FOUND',
        cityState: 'AIRPORT NOT FOUND',
        code: 'AIRPORT NOT FOUND',
        countryCode: 'AIRPORT NOT FOUND',
        displayName: 'AIRPORT NOT FOUND',
        latitude: 'AIRPORT NOT FOUND',
        longitude: 'AIRPORT NOT FOUND',
        marketingCarriers: [],
        multiSelectGroup: [],
        shortDisplayName: 'AIRPORT NOT FOUND'
      });
    });
  });

  describe('getAirportFromAirportGroupShortDisplayName', () => {
    const multiSelectGroup = getMultiSelectGroup()['Boston Area Airports'];

    it('should get the correct airport object from the store', () => {
      expect(AirportHelpers.getAirportFromAirportGroupShortDisplayName(multiSelectGroup, ['BOS', 'BDL'])).toEqual(multiSelectGroup[0]);
    });

    it('should return EMPTY_AIRPORT object if there is no airport for the given area', () => {
      const airportFromCode = AirportHelpers.getAirportFromAirportGroupShortDisplayName(multiSelectGroup, 'Bad Code');

      expect(airportFromCode).toEqual({
        airportGroupId: 'AIRPORT NOT FOUND',
        airportGroupName: 'AIRPORT NOT FOUND',
        airportGroups: [],
        airportName: 'AIRPORT NOT FOUND',
        airportSearchName: 'AIRPORT NOT FOUND',
        airportGroupShortDisplayName: 'AIRPORT NOT FOUND',
        airportGroupSubtitle: 'AIRPORT NOT FOUND',
        cityName: 'AIRPORT NOT FOUND',
        cityState: 'AIRPORT NOT FOUND',
        code: 'AIRPORT NOT FOUND',
        countryCode: 'AIRPORT NOT FOUND',
        displayName: 'AIRPORT NOT FOUND',
        latitude: 'AIRPORT NOT FOUND',
        longitude: 'AIRPORT NOT FOUND',
        marketingCarriers: [],
        multiSelectGroup: [],
        shortDisplayName: 'AIRPORT NOT FOUND'
      });
    });
  });

  describe('updateMultiSelectGroupIsSelected', () => {
    it('should update the isSelected to true when more than one area airport is selected', () => {
      const multiSelectGroup = {
        destination: ['A'],
        isSelected: false,
        origin: ['A', 'B', 'C']
      };

      expect(AirportHelpers.updateMultiSelectGroupIsSelected(multiSelectGroup)).toEqual({
        ...multiSelectGroup,
        isSelected: true
      });
    });

    it('should update the isSelected to false when one area airport is selected', () => {
      const multiSelectGroup = {
        destination: ['A'],
        isSelected: false,
        origin: ['A']
      };

      expect(AirportHelpers.updateMultiSelectGroupIsSelected(multiSelectGroup)).toEqual(multiSelectGroup);
    });
  });

  describe('getMultiSelectOriginDestinationShortDisplayName', () => {
    const allAirports = Object.entries(getMultiSelectGroup())
      .filter((group) => group[0] !== 'Recently Searched')
      .map((group) => group[1])
      .flatMap((airport) => airport);

    it('should contain multiSelectGroup origin and destination data', () => {
      const multiSelectGroup = { destination: ['BOS', 'BDL', 'MHT', 'PVD'], isSelected: true, origin: ['MDW', 'ORD'] };

      expect(AirportHelpers.getMultiSelectOriginDestinationShortDisplayName(allAirports, multiSelectGroup)).toEqual({
        destination: 'Boston',
        multipleDestinationAirportGroupName: 'Boston',
        multipleDestinationAirports: ['BOS', 'BDL', 'MHT', 'PVD'],
        multipleOriginationAirportGroupName: 'Chicago',
        multipleOriginationAirports: ['MDW', 'ORD'],
        multiSelectGroup,
        origin: 'Chicago'
      });
    });

    it('should contain multiSelectGroup origin data', () => {
      const multiSelectGroup = { isSelected: true, origin: ['MDW', 'ORD'] };

      expect(AirportHelpers.getMultiSelectOriginDestinationShortDisplayName(allAirports, multiSelectGroup)).toEqual({
        multipleOriginationAirportGroupName: 'Chicago',
        multipleOriginationAirports: ['MDW', 'ORD'],
        multiSelectGroup,
        origin: 'Chicago'
      });
    });

    it('should contain multiSelectGroup destination data', () => {
      const multiSelectGroup = { isSelected: true, destination: ['MDW', 'ORD'] };

      expect(AirportHelpers.getMultiSelectOriginDestinationShortDisplayName(allAirports, multiSelectGroup)).toEqual({
        destination: 'Chicago', 
        multipleDestinationAirportGroupName: 'Chicago',
        multipleDestinationAirports: ['MDW', 'ORD'],
        multiSelectGroup
      });
    });

    it('should not contain multiSelectGroup data when single airport is selected for origin and destination', () => {
      const multiSelectGroup = { isSelected: false };

      expect(AirportHelpers.getMultiSelectOriginDestinationShortDisplayName(allAirports, multiSelectGroup)).toEqual({ multiSelectGroup });
    });

    it('should not contain multiSelectGroup data when single area airport is selected for origin', () => {
      const multiSelectGroup = { isSelected: false, origin: ['MDW'] };

      expect(AirportHelpers.getMultiSelectOriginDestinationShortDisplayName(allAirports, multiSelectGroup)).toEqual({ multiSelectGroup });
    });
 
    it('should not contain multiSelectGroup data when single area airport is selected for destination', () => {
      const multiSelectGroup = { isSelected: false, destination: ['MDW'] };

      expect(AirportHelpers.getMultiSelectOriginDestinationShortDisplayName(allAirports, multiSelectGroup)).toEqual({ multiSelectGroup });
    });
  });

  describe('viewport functions', () => {
    let scrollToMock;

    beforeEach(() => {
      scrollToMock = jest.spyOn(window, 'scrollTo').mockImplementation(() => jest.fn());
    });

    describe('handleViewportResize', () => {
      it('should call the scrollTo function when the handleViewportResize function is triggered byt on focus of the to airport textfield', () => {
        jest.spyOn(document, 'querySelector').mockImplementation(() => ({
          style: {
            height: 320,
            setProperty: () => jest.fn()
          }
        }));

        const event = { target: { height: 320 } };
  
        AirportHelpers.handleViewportResize(event);
  
        expect(scrollToMock).toHaveBeenCalled();
      });
    });
  
    describe('handleViewportScroll', () => {
      it('should call the scrollTo function when the handleViewportScroll function is triggered', () => {
        AirportHelpers.handleViewportScroll();
  
        expect(scrollToMock).toHaveBeenCalled();
      });
    });
  
    describe('scrollToTopAndLeftFn', () => {
      it('should call the scrollTo function when the scrollToTopAndLeftFn function is called', () => {
        AirportHelpers.scrollToTopAndLeftFn();
  
        expect(scrollToMock).toHaveBeenCalled();
      });
    });
  });
});
