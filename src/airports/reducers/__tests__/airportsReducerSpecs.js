import AirportsReducer from 'src/airports/reducers/airportsReducer';
import AirportsActionTypes from 'src/airports/actions/airportsActionTypes';

describe('AirportsReducer', () => {
  const defaultAirport1 = {
    id: 'DAL',
    display_name: 'Dallas Love Field',
    airport_city_image: 'dal.jpg',
    airport_city_alt_text: 'Dallas Love Field Img',
    alert: { active: false },
    body: []
  };

  const defaultAirport2 = {
    id: 'MSY',
    display_name: 'Louis Armstrong New Orleans International Airport',
    airport_city_image: 'msy.jpg',
    airport_city_alt_text: 'Louis Armstrong New Orleans International Airport Img',
    alert: { active: false },
    body: []
  };

  const recentSearches = [
    {
      timestamp: 1561069955,
      value: 'DAL - Dallas Love Field Airport'
    }
  ];

  const multiSelectGroup = {
    isSelected: true,
    origin: ['ABC', 'CDE']
  };

  context('airportInfo', () => {
    it('returns selectedAirpot state on success', () => {
      const state = AirportsReducer(undefined, {
        type: AirportsActionTypes.AIRPORTS__UPDATE_AIRPORT_INFO,
        airportInfo: defaultAirport1
      });

      expect(state.airportInfo).to.be.deep.equal(defaultAirport1);
    });

    it('should return default state when action is undefined', () => {
      expect(AirportsReducer().airportInfo).to.deep.equal({});
    });

    it('resets selectedAirport state', () => {
      const state = AirportsReducer(undefined, {
        type: AirportsActionTypes.AIRPORTS__FETCH_AIRPORT_INFO
      });

      expect(state.airportInfo).to.be.deep.equal({});
    });
  });

  context('allAirports', () => {
    it('returns allAirports state on success', () => {
      const state = AirportsReducer(undefined, {
        type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS,
        response: [defaultAirport1, defaultAirport2]
      });

      expect(state.allAirports).to.be.deep.equal([defaultAirport1, defaultAirport2]);
    });

    it('should return default state when action is undefined', () => {
      expect(AirportsReducer().allAirports).to.deep.equal([]);
    });

    it('resets allAirports state', () => {
      const state = AirportsReducer(undefined, {
        type: AirportsActionTypes.AIRPORTS__RESET_AIRPORTS
      });

      expect(state.allAirports).to.be.deep.equal([]);
    });
  });

  context('recentlySearched', () => {
    it('updates recentlySearched state', () => {
      const state = AirportsReducer(undefined, {
        type: AirportsActionTypes.AIRPORTS__UPDATE_RECENT_AIRPORT_SEARCH,
        recentSearches
      });

      expect(state.recentlySearched).to.be.deep.equal(recentSearches);
    });

    it('resets recentlySearched state', () => {
      const state = AirportsReducer(undefined, {
        type: AirportsActionTypes.AIRPORTS__RESET_RECENT_AIRPORT_SEARCH
      });

      expect(state.recentlySearched).to.be.deep.equal([]);
    });

    it('should return default state when action is undefined', () => {
      expect(AirportsReducer().recentlySearched).to.deep.equal([]);
    });
  });

  describe('multiSelectGroup', () => {
    it('updates multiselectgroups state', () => {
      const state = AirportsReducer(
        {},
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP,
          response: defaultAirport2,
          formId: 'origin'
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({
        currentDirection: null,
        isSelected: false,
        origin: defaultAirport2,
        unavailableGroup: null
      });
    });

    it('should not clear multiselectgroups state when form data is not present', () => {
      const state = AirportsReducer(
        {
          multiSelectGroup
        },
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
          formId: 'destination'
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({ isSelected: true, ...multiSelectGroup });
    });

    it('should clear multiselectgroups form data state by formId when form data is present', () => {
      const state = AirportsReducer(
        {
          multiSelectGroup
        },
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
          formId: 'origin'
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({ isSelected: false });
    });

    it('should load multiselectgroups state when with the data passed', () => {
      const state = AirportsReducer(
        {},
        {
          type: AirportsActionTypes.AIRPORTS__LOAD_MULTI_SELECT_GROUP,
          response: multiSelectGroup
        }
      );

      expect(state.multiSelectGroup).to.deep.equal(multiSelectGroup);
    });

    it('should clear multiselectgroups state', () => {
      const state = AirportsReducer(
        {
          multiSelectGroup
        },
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({
        currentDirection: null,
        isSelected: false,
        unavailableGroup: null
      });
    });

    it('should update multi select group current direction', () => {
      const state = AirportsReducer(
        {
          currentDirection: null,
          isSelected: false
        },
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP_CURRENT_DIRECTION,
          response: 'inbound'
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({
        currentDirection: 'inbound',
        isSelected: false,
        unavailableGroup: null
      });
    });

    it('should save multi select group state', () => {
      const state = AirportsReducer(
        {
          currentDirection: null,
          isSelected: false
        },
        {
          type: AirportsActionTypes.AIRPORTS__SAVE_MULTI_SELECT_GROUP,
          response: multiSelectGroup
        }
      );

      expect(state.multiSelectGroup).to.deep.equal(multiSelectGroup);
    });

    it('should save unavailable multiselect group', () => {
      const state = AirportsReducer(
        {
          multiSelectGroup
        },
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_UNAVAILABLE_MULTI_SELECT_GROUP,
          response: { origin: 'ABC', destination: 'CDE' }
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({
        isSelected: true,
        origin: multiSelectGroup.origin,
        unavailableGroup: [{ destination: 'CDE', origin: 'ABC' }]
      });
    });

    it('should update unavailable multiselect group', () => {
      const state = AirportsReducer(
        {
          multiSelectGroup: { ...multiSelectGroup, unavailableGroup: [{ destination: 'CDE', origin: 'ABC' }] }
        },
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_UNAVAILABLE_MULTI_SELECT_GROUP,
          response: { destination: 'CTA', origin: 'BOS' }
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({
        isSelected: true,
        origin: multiSelectGroup.origin,
        unavailableGroup: [
          { destination: 'CDE', origin: 'ABC' },
          { destination: 'CTA', origin: 'BOS' }
        ]
      });
    });

    it('should clear unavailable multiselect group', () => {
      const state = AirportsReducer(
        {
          multiSelectGroup,
          unavailableGroup: [{ destination: 'CDE', origin: 'ABC' }]
        },
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_UNAVAILABLE_MULTI_SELECT_GROUP
        }
      );

      expect(state.multiSelectGroup).to.deep.equal({
        isSelected: true,
        origin: ['ABC', 'CDE'],
        unavailableGroup: null
      });
    });
  });
});
