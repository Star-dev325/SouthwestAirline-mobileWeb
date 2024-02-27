import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AirportListGroups from 'src/airports/components/airportListGroups';
import * as AlphabetSelectorHelper from 'src/shared/helpers/alphabetSelectorHelper';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import waitFor from 'test/unit/helpers/waitFor';

describe('airport list groups component', () => {
  const mockScrollToHeader = jest.spyOn(AlphabetSelectorHelper, 'scrollToHeader');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display multiSelectGroup ListGroup component', () => {
    const { container } = createComponent();

    expect(container.querySelector('.airport-group-container')).not.toBeNull();
  });

  it('should sort and group the airport list', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('.airport-group-header')[0].textContent).toContain('A');
    expect(container.querySelectorAll('.airport-group-header')[1].textContent).toContain('D');
  });

  describe('when airport card is clicked', (done) => {
    it('should invoke callback function', () => {
      const onAirportSelect = jest.fn();
      const { container } = createComponent({ onAirportSelect });

      fireEvent.click(container.querySelectorAll('.flex-auto')[0]);
      waitFor.untilAssertPass(() => {
        expect(onAirportSelect).toHaveBeenCalledWith(AIRPORT_LIST);
      }, done);
    });
  });

  describe('recentAirportSearches', () => {
    it('should filter recentAirports List when multiSelectGroup is false', () => {
      const handleMultiSelectRecentSearch = jest.fn();
      const { container } = createComponent({
        recentAirportSearches: AIRPORT_LIST,
        isMultiSelectGroupEnabled: false,
        handleMultiSelectRecentSearch
      });

      expect({ container }).toMatchSnapshot();
    });

    it('should render full recentAirports List when isMultiSelectGroup is true', () => {
      const handleMultiSelectRecentSearch = jest.fn();
      const { container } = createComponent({
        handleMultiSelectRecentSearch,
        recentAirportSearches: AIRPORT_LIST
      });

      expect({ container }).toMatchSnapshot();
    });

    describe('when remove icon on airport card is clicked', (done) => {
      it('should invoke onDeleteRecentAirportSearch function', () => {
        const onDeleteRecentAirportSearch = jest.fn();
        const { container } = createComponent({
          recentAirportSearches: AIRPORT_LIST.slice(0, 1),
          onDeleteRecentAirportSearch
        });

        fireEvent.click(container.querySelector('.recent-search-remove-icon'));

        waitFor.untilAssertPass(() => {
          expect(onDeleteRecentAirportSearch).toHaveBeenCalledWith(AIRPORT_LIST);
        }, done);
      });
    });
  });

  it('should sort into groups', () => {
    const { container } = createComponent({ airports: AIRPORT_LIST_WITH_GROUPS, sortByGroups: true });

    expect(container.querySelectorAll('.airport-group-header')[0].textContent).toContain('TestGroup');
    expect(container.querySelectorAll('.airport-group-header')[1].textContent).toContain('D');
  });

  it.skip('should show airports even when some are undefined', () => {
    const { container } = createComponent({
      airports: [
        undefined,
        {
          airportGroupId: 'TEST',
          airportGroupName: 'TestGroup',
          airportGroups: ['CAK', 'ALB'],
          airportName: 'Akron-Canton',
          airportSearchName: 'Ohio',
          cityName: 'Akron',
          cityState: 'OH',
          code: 'CAK',
          countryCode: 'US',
          displayName: 'Akron-Canton',
          latitude: '40.9161',
          longitude: '-81.4422',
          marketingCarriers: ['WN'],
          shortDisplayName: 'Akron'
        }
      ]
    });

    expect(container.querySelector('.airport-group-container')).toBeInTheDocument();
  });

  describe('Alphabet Selector', () => {
    it('should invoke scrollTo prop', () => {
      const { container } = createComponent({ showAlphabetSelector: true });
      const airportGroups = container.querySelectorAll('.airport-group-container');
      const airportGroupsRefs = mockScrollToHeader.mock.calls[0][0];

      expect(mockScrollToHeader).toHaveBeenCalled();
      expect(airportGroups[0].textContent).toEqual(airportGroupsRefs['A'].textContent);
      expect(airportGroups[1].textContent).toEqual(airportGroupsRefs['D'].textContent);
    });

    it('should display alphabet', () => {
      const { container } = createComponent({ showAlphabetSelector: true });

      expect(container).toMatchSnapshot();
    });

    it('should not display', () => {
      const { container } = createComponent({ showAlphabetSelector: false });

      const alphabetLetters = container.querySelector('div[data-qa="alpha-select-letter"]');

      expect(alphabetLetters).toBeNull();
    });
  });

  describe('multiSelectGroups', () => {
    it('should render airport list with group id', () => {
      const { container } = createComponent({ airports: AIRPORT_LIST_WITH_GROUPS, sortByGroups: true });

      expect(container).toMatchSnapshot();
    });
  });

  function createComponent(props = {}) {
    const defaultProps = {
      airportGroupData: AIRPORT_LIST_WITH_GROUPS,
      airports: AIRPORT_LIST,
      clearFormDataByIdFn: jest.fn(),
      disableInternationals: false,
      formId: 'MOCK_FORM_ID',
      handleMultiSelectRecentSearch: jest.fn(),
      isMultiSelectGroupEnabled: true,
      isReaccomCoTerminalEligible: false,
      onAirportSelect: () => undefined,
      onDeleteRecentAirportSearch: () => undefined,
      recentAirportSearches: [],
      setAirportGroupData: jest.fn(),
      showAlphabetSelector: false,
      sortByGroups: false,
      updateFormDataValueFn: jest.fn()
    };

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <AirportListGroups {...mergedProps} />
      </Provider>
    );
  }

  const AIRPORT_LIST_WITH_GROUPS = [
    {
      airportName: 'Denver',
      airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing',
      cityName: 'Denver',
      cityState: 'CO',
      code: 'DEN',
      countryCode: 'US',
      displayName: 'Denver',
      latitude: '39.8617',
      longitude: '-104.673',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Denver'
    },
    {
      airportGroupId: 'TEST',
      airportGroupName: 'TestGroup',
      airportGroups: ['CAK', 'ALB'],
      airportName: 'Akron-Canton',
      airportSearchName: 'Ohio',
      cityName: 'Akron',
      cityState: 'OH',
      code: 'CAK',
      countryCode: 'US',
      displayName: 'Akron-Canton',
      latitude: '40.9161',
      longitude: '-81.4422',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Akron'
    },
    {
      airportGroupId: 'TEST',
      airportGroupName: 'TestGroup',
      airportGroups: ['CAK', 'ALB'],
      airportName: 'Albany',
      airportSearchName: 'New York',
      cityName: 'Albany',
      cityState: 'NY',
      code: 'ALB',
      countryCode: 'US',
      displayName: 'Albany',
      latitude: '42.7483',
      longitude: '-73.8017',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Albany'
    }
  ];

  const AIRPORT_LIST = [
    {
      airportName: 'Denver',
      airportSearchName: 'Colorado, Boulder, Aspen, Vail, Colorado Springs, Mile High City, Skiing',
      cityName: 'Denver',
      cityState: 'CO',
      code: 'DEN',
      countryCode: 'US',
      displayName: 'Denver',
      latitude: '39.8617',
      longitude: '-104.673',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Denver'
    },
    {
      airportName: 'Akron-Canton',
      airportSearchName: 'Ohio',
      cityName: 'Akron',
      cityState: 'OH',
      code: 'CAK',
      countryCode: 'US',
      displayName: 'Akron-Canton',
      latitude: '40.9161',
      longitude: '-81.4422',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Akron'
    },
    {
      airportName: 'Albany',
      airportSearchName: 'New York',
      cityName: 'Albany',
      cityState: 'NY',
      code: 'ALB',
      countryCode: 'US',
      displayName: 'Albany',
      latitude: '42.7483',
      longitude: '-73.8017',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Albany'
    },
    {
      airportName: 'Albany',
      airportSearchName: 'New York',
      airportGroupName: 'New York',
      airportGroupSelected: ['AL', 'NY'],
      cityName: 'Albany',
      cityState: 'NY',
      code: 'ALB',
      countryCode: 'US',
      displayName: 'Albany',
      latitude: '42.7483',
      longitude: '-73.8017',
      marketingCarriers: ['WN'],
      shortDisplayName: 'Albany'
    }
  ];
});
