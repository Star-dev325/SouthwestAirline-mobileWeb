import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import WhereWeFlyConstants from 'src/whereWeFly/constants/whereWeFlyConstants';
import { WhereWeFlyPage } from 'src/whereWeFly/pages/whereWeFlyPage';

describe('WhereWeFlyPage', () => {
  let loadAirportsStub;
  let loadRecentlySearchedStub;
  let analyticsTrackViewTabStub;
  let whereWeFlyPage;
  let pushStub;

  beforeEach(() => {
    const noop = () => {};

    loadAirportsStub = jest.fn(noop);
    loadRecentlySearchedStub = jest.fn(noop);
    analyticsTrackViewTabStub = jest.fn(noop);
    pushStub = jest.fn(noop);
  });

  describe('rendering', () => {
    beforeEach(() => {
      whereWeFlyPage = createPageComponent({ allAirports: AIRPORT_LIST, recentlySearched: [] });
    });

    it('should display the airport list as the default view of the page', () => {
      const airportList = whereWeFlyPage.container.querySelector('.airport-list');

      expect(airportList).toBeInTheDocument();
      expect(screen.getByText(WhereWeFlyConstants.TITLE)).toBeInTheDocument();
    });

    it('should display the airport list when content is loaded into it', () => {
      const airportCards = screen.getAllByText(/DEN|CAK|ALB/);

      expect(airportCards).toHaveLength(3);
    });
  });

  describe('list with no recent airports', () => {
    beforeEach(() => {
      whereWeFlyPage = createPageComponent({
        allAirports: AIRPORT_LIST,
        recentlySearched: [],
        location: { search: '?defaultTab=LIST' }
      });
    });

    it('should start load airports action when page has mounted', () => {
      expect(loadAirportsStub).toHaveBeenCalled;
    });

    it('should render airport list when page contain defaultTab in query param', () => {
      const airportList = whereWeFlyPage.container.querySelector('.airport-list');

      expect(airportList).toBeInTheDocument();
    });

    it('should go to the airport info page when click the airport in the list', () => {
      fireEvent.click(screen.getByText(/CAK/));

      expect(pushStub).toHaveBeenCalledWith('/airport-info/CAK');
    });
  });

  describe('list with recent airports', () => {
    beforeEach(() => {
      whereWeFlyPage = createPageComponent({
        allAirports: AIRPORT_LIST,
        recentlySearched: RECENT_AIRPORT_LIST,
        location: { search: '?defaultTab=LIST' }
      });
    });

    it('should render airport list when page contain defaultTab in query param', () => {
      const airportList = whereWeFlyPage.container.querySelector('.airport-list');

      expect(airportList).toBeInTheDocument();
    });

    it('should go to the recent history item because it is first in the list', () => {
      fireEvent.click(screen.getAllByText(/DEN/)[0]);

      expect(pushStub).toHaveBeenCalledWith('/airport-info/DEN');
    });
  });

  const createPageComponent = (props = {}) => {
    const state = {
      app: {},
      router: {
        location: {
          search: ''
        }
      }
    };
    const defaultProps = {
      allAirports: [],
      recentlySearched: [],
      location: { search: '' },
      loadAirportsFn: loadAirportsStub,
      loadRecentlySearchedFn: loadRecentlySearchedStub,
      analyticsTrackViewTabFn: analyticsTrackViewTabStub,
      push: pushStub
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render((
      <Provider store={createMockedFormStore(state)}>
        <WhereWeFlyPage {...finalProps} />
      </Provider>
    ));
  };

  const RECENT_AIRPORT_LIST = [
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
    }
  ];

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
});
