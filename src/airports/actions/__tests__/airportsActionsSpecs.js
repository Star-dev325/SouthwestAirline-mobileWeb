import _ from 'lodash';
import Q from 'q';
import { sandbox } from 'sinon';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import {
  clearMultiSelectGroup,
  clearMultiSelectGroupFormId,
  clearUnavailableMultiSelectGroup,
  getAirportInfo,
  loadAirports,
  loadMultiSelectGroup,
  resetAirports,
  resetRecentAirportSearch,
  saveDestinationAirport,
  saveMultiSelectGroup,
  updateAirportInfo,
  updateMultiSelectGroup,
  updateRecentAirportSearch,
  updatetMultiSelectGroupCurrentDirection,
  updateUnavailableMultiSelectGroup
} from 'src/airports/actions/airportsActions';
import AirportsActionTypes from 'src/airports/actions/airportsActionTypes';
import RecentAirportSearchLocalStorageHelper from 'src/airports/helpers/recentAirportSearchLocalStorageHelper';
import * as LocalStorageCache from 'src/shared/cache/localStorageCache';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import { transformToAirport } from 'src/shared/transformers/airStationTransformer';
import * as AirportHelpers from 'src/airports/helpers/airportsHelpers';
import * as SharedActions from 'src/shared/actions/sharedActions';
import * as WcmApi from 'src/shared/api/wcm/wcmApi';
import createMockStore from 'test/unit/helpers/createMockStore';

describe('Airports list and detail view actions file', () => {
  const testAirportName = { airportName: 'TEST AIRPORT NAME' };
  const sinon = sandbox.create();
  const mockStore = createMockStore();
  const airport = {
    revision: '20150504141503054',
    airport_info: {
      id: 'DAL',
      display_name: 'Dallas (Love Field)&#44; TX - DAL',
      airport_city_image: '/content/mkt/images/airport_info/DAL2_aiport_info.jpg',
      airport_city_alt_text: 'Picture representing DAL',
      alert: {
        active: false,
        icon: '/content/mkt/images/airport_info/travel_advisory.png',
        title: 'Airport Alert',
        text: ''
      },
      body: []
    }
  };
  let store;
  let airStations, expectedAirports;

  beforeEach(() => {
    airStations = [
      {
        id: 'ALB',
        stateFederalUnit: 'NY',
        countryCode: 'US',
        displayName: 'Albany, NY - ALB',
        stationName: 'Albany',
        shortDisplayName: 'Albany',
        latitude: '42.7483',
        longitude: '-73.8017',
        ezRez: true,
        timeZone: 'America/New_York',
        mobileBoarding: true
      },
      {
        id: 'ABQ',
        stateFederalUnit: 'NM',
        countryCode: 'US',
        displayName: 'Albuquerque, NM - ABQ',
        stationName: 'Albuquerque',
        shortDisplayName: 'Albuquerque',
        latitude: '35.0402',
        longitude: '-106.609',
        ezRez: true,
        timeZone: 'America/Denver',
        mobileBoarding: true
      }
    ];
    expectedAirports = _.map(airStations, transformToAirport);

    store = mockStore({});
    sinon.stub(RecentAirportSearchLocalStorageHelper, 'save');
    sinon.stub(FlightBookingApi, 'fetchShoppingDetails').resolves({
      airStations,
      lastBookableDate: '2019-01-01',
      productDefinitions: { product: 'definitions' },
      corporateBookingSwitch: { label: 'SWABIZ' },
      calendarScheduleMessage: 'Calendar schedule message'
    });
    sinon.stub(AirportHelpers, 'getAirportFromCode').returns(testAirportName);
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getAirportInfo', () => {
    it('should fetch json file for airport', async () => {
      sinon.stub(WcmApi, 'getJsonFile').returns(Q(airport));
      await store.dispatch(getAirportInfo('DAL'));

      expect(store.getActions()).to.deep.equal([
        { type: AirportsActionTypes.AIRPORTS__FETCH_AIRPORT_INFO, isFetching: true },
        { type: AirportsActionTypes.AIRPORTS__FETCH_AIRPORT_INFO_SUCCESS, isFetching: false },
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_AIRPORT_INFO,
          airportInfo: {
            id: 'DAL',
            display_name: 'Dallas (Love Field)&#44; TX - DAL',
            airport_city_image: '/content/mkt/images/airport_info/DAL2_aiport_info.jpg',
            airport_city_alt_text: 'Picture representing DAL',
            alert: {
              active: false,
              icon: '/content/mkt/images/airport_info/travel_advisory.png',
              title: 'Airport Alert',
              text: ''
            },
            body: []
          }
        }
      ]);
    });

    it('should fail to fetch json file', async () => {
      sinon.stub(WcmApi, 'getJsonFile').rejects('No ducks here.');
      await store.dispatch(getAirportInfo('WUT'));
      expect(store.getActions()[0]).to.deep.equal({
        isFetching: true,
        type: AirportsActionTypes.AIRPORTS__FETCH_AIRPORT_INFO
      });
      expect(store.getActions()[1]).to.deep.equal({
        isFetching: false,
        type: AirportsActionTypes.AIRPORTS__FETCH_AIRPORT_INFO_FAILED
      });
      expect(store.getActions()[2]).to.contains({
        isShowDialog: true,
        type: 'TOGGLE_DIALOG'
      });
    });

    it('should update the value of the selected airport', () => {
      store.dispatch(updateAirportInfo(airport));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_AIRPORT_INFO,
          airportInfo: airport
        }
      ]);
    });
  });

  context('loadAirports', () => {
    beforeEach(() => {
      sinon.stub(LocalStorageCache, 'saveAirports');
      sinon.stub(LocalStorageCache, 'saveLastBookableDate');
      sinon.stub(LocalStorageCache, 'saveProductDefinitions');
      sinon.stub(LocalStorageCache, 'saveCorporateBookingSwitchInfo');
      sinon.stub(LocalStorageCache, 'saveCalendarScheduleMessage');
    });

    it('should load airports from localStorage when have data in cache', async () => {
      const updateCalendarScheduleMessageFakeActionType = { type: 'CALENDAR_SCHEDULE_MESSAGE_FAKE_TYPE' };
      const updateCalendarScheduleMessageStub = sinon
        .stub(SharedActions, 'updateCalendarScheduleMessage')
        .returns(updateCalendarScheduleMessageFakeActionType);

      sinon.stub(LocalStorageCache, 'loadAirports').returns(['DAL', 'HOU']);
      sinon.stub(LocalStorageCache, 'loadLastBookableDate').returns('2020-08-12');
      sinon.stub(LocalStorageCache, 'loadProductDefinitions').returns({ product: 'definitions' });
      sinon.stub(LocalStorageCache, 'loadCorporateBookingSwitchInfo').returns({ label: 'SWABIZ' });
      sinon.stub(LocalStorageCache, 'loadCalendarScheduleMessage').returns('Calendar schedule message');
      await store.dispatch(loadAirports());

      expect(FlightBookingApi.fetchShoppingDetails).to.not.be.called;
      expect(updateCalendarScheduleMessageStub).to.have.been.called;
      expect(store.getActions()).to.deep.equal([
        { type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS, isFetching: true },
        {
          type: 'SHARED__UPDATE_LAST_BOOKABLE_DATE',
          lastBookableDate: '2020-08-12'
        },
        updateCalendarScheduleMessageFakeActionType,
        {
          type: 'SHARED__UPDATE_PRODUCT_DEFINITIONS',
          productDefinitions: {
            product: 'definitions'
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
          corporateBookingSwitchInfo: {
            label: 'SWABIZ'
          }
        },
        {
          type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS,
          response: ['DAL', 'HOU'],
          isFetching: false
        }
      ]);
    });

    it('should fetch airports from api and save data to local storage when no data in LocalStorageCache::airportList cache', async () => {
      sinon.stub(LocalStorageCache, 'loadAirports').returns([]);
      await store.dispatch(loadAirports());

      expect(FlightBookingApi.fetchShoppingDetails).to.be.calledWith();
      expect(LocalStorageCache.saveAirports).to.be.calledTwice;
      expect(LocalStorageCache.saveAirports.args[0][0]).to.be.deep.equal([]);
      expect(LocalStorageCache.saveAirports.args[1][0]).to.be.deep.equal(expectedAirports);
      expect(LocalStorageCache.saveLastBookableDate).to.be.calledWith('2019-01-01');
      expect(LocalStorageCache.saveProductDefinitions).to.be.calledWith({ product: 'definitions' });
      expect(LocalStorageCache.saveCorporateBookingSwitchInfo).to.be.called;
      expect(LocalStorageCache.saveCalendarScheduleMessage).to.be.calledWith('Calendar schedule message');

      expect(store.getActions()).to.deep.equal([
        { type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS, isFetching: true },
        { type: 'AIRPORTS__RESET_AIRPORTS' },
        {
          type: 'SHARED__UPDATE_LAST_BOOKABLE_DATE',
          lastBookableDate: '2019-01-01'
        },
        {
          type: 'SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE',
          calendarScheduleMessage: 'Calendar schedule message'
        },
        {
          type: 'SHARED__UPDATE_PRODUCT_DEFINITIONS',
          productDefinitions: {
            product: 'definitions'
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
          corporateBookingSwitchInfo: {
            label: 'SWABIZ'
          }
        },
        {
          type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS,
          response: expectedAirports,
          isFetching: false
        }
      ]);
    });

    it('should fetch airports from api and save data to local storage when no data in LocalStorageCache::lastBookableDate cache', async () => {
      sinon.stub(LocalStorageCache, 'loadLastBookableDate').returns(null);
      await store.dispatch(loadAirports());

      expect(FlightBookingApi.fetchShoppingDetails).to.be.calledWith();
      expect(LocalStorageCache.saveAirports).to.be.calledTwice;
      expect(LocalStorageCache.saveAirports.args[0][0]).to.be.deep.equal([]);
      expect(LocalStorageCache.saveAirports.args[1][0]).to.be.deep.equal(expectedAirports);
      expect(LocalStorageCache.saveLastBookableDate).to.be.calledWith('2019-01-01');
      expect(LocalStorageCache.saveProductDefinitions).to.be.calledWith({ product: 'definitions' });
      expect(LocalStorageCache.saveCalendarScheduleMessage).to.be.calledWith('Calendar schedule message');

      expect(store.getActions()).to.deep.equal([
        { type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS, isFetching: true },
        { type: 'AIRPORTS__RESET_AIRPORTS' },
        {
          type: 'SHARED__UPDATE_LAST_BOOKABLE_DATE',
          lastBookableDate: '2019-01-01'
        },
        {
          type: 'SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE',
          calendarScheduleMessage: 'Calendar schedule message'
        },
        {
          type: 'SHARED__UPDATE_PRODUCT_DEFINITIONS',
          productDefinitions: {
            product: 'definitions'
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
          corporateBookingSwitchInfo: {
            label: 'SWABIZ'
          }
        },
        {
          type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS,
          response: expectedAirports,
          isFetching: false
        }
      ]);
    });

    it('should fetch airports from api and save data to local storage when no data in LocalStorageCache::productDefinitions cache', async () => {
      sinon.stub(LocalStorageCache, 'loadProductDefinitions').returns({});
      await store.dispatch(loadAirports());

      expect(FlightBookingApi.fetchShoppingDetails).to.be.calledWith();
      expect(LocalStorageCache.saveAirports).to.be.calledTwice;
      expect(LocalStorageCache.saveAirports.args[0][0]).to.be.deep.equal([]);
      expect(LocalStorageCache.saveAirports.args[1][0]).to.be.deep.equal(expectedAirports);
      expect(LocalStorageCache.saveLastBookableDate).to.be.calledWith('2019-01-01');
      expect(LocalStorageCache.saveProductDefinitions).to.be.calledWith({ product: 'definitions' });
      expect(LocalStorageCache.saveCalendarScheduleMessage).to.be.calledWith('Calendar schedule message');

      expect(store.getActions()).to.deep.equal([
        { type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS, isFetching: true },
        { type: 'AIRPORTS__RESET_AIRPORTS' },
        {
          type: 'SHARED__UPDATE_LAST_BOOKABLE_DATE',
          lastBookableDate: '2019-01-01'
        },
        {
          type: 'SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE',
          calendarScheduleMessage: 'Calendar schedule message'
        },
        {
          type: 'SHARED__UPDATE_PRODUCT_DEFINITIONS',
          productDefinitions: {
            product: 'definitions'
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
          corporateBookingSwitchInfo: {
            label: 'SWABIZ'
          }
        },
        {
          type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS,
          response: expectedAirports,
          isFetching: false
        }
      ]);
    });

    it('should fetch airports from api and save data to local storage when no data in LocalStorageCache::calendarScheduleMessage cache', async () => {
      sinon.stub(LocalStorageCache, 'calendarScheduleMessage').returns(null);
      await store.dispatch(loadAirports());

      expect(FlightBookingApi.fetchShoppingDetails).to.be.calledWith();
      expect(LocalStorageCache.saveAirports).to.be.calledTwice;
      expect(LocalStorageCache.saveAirports.args[0][0]).to.be.deep.equal([]);
      expect(LocalStorageCache.saveAirports.args[1][0]).to.be.deep.equal(expectedAirports);
      expect(LocalStorageCache.saveLastBookableDate).to.be.calledWith('2019-01-01');
      expect(LocalStorageCache.saveProductDefinitions).to.be.calledWith({ product: 'definitions' });
      expect(LocalStorageCache.saveCalendarScheduleMessage).to.be.calledWith('Calendar schedule message');

      expect(store.getActions()).to.deep.equal([
        { type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS, isFetching: true },
        { type: 'AIRPORTS__RESET_AIRPORTS' },
        {
          type: 'SHARED__UPDATE_LAST_BOOKABLE_DATE',
          lastBookableDate: '2019-01-01'
        },
        {
          type: 'SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE',
          calendarScheduleMessage: 'Calendar schedule message'
        },
        {
          type: 'SHARED__UPDATE_PRODUCT_DEFINITIONS',
          productDefinitions: {
            product: 'definitions'
          }
        },
        {
          type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
          corporateBookingSwitchInfo: {
            label: 'SWABIZ'
          }
        },
        {
          type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS,
          response: expectedAirports,
          isFetching: false
        }
      ]);
    });

    it('should create action to reset airports', () => {
      store.dispatch(resetAirports());

      expect(store.getActions()).to.deep.equal([{ type: AirportsActionTypes.AIRPORTS__RESET_AIRPORTS }]);
    });

    context('CorporateBookingSwitchInfo', () => {
      it('should fetch airports from api and save data to local storage when no data in LocalStorageCache::CorporateBookingSwitchInfo cache', async () => {
        sinon.stub(LocalStorageCache, 'loadProductDefinitions').returns({});
        sinon.stub(LocalStorageCache, 'loadCorporateBookingSwitchInfo').returns({ label: 'SWABIZ' });
        await store.dispatch(loadAirports());

        expect(FlightBookingApi.fetchShoppingDetails).to.be.calledWith();
        expect(LocalStorageCache.saveAirports).to.be.calledTwice;
        expect(LocalStorageCache.saveAirports.args[0][0]).to.be.deep.equal([]);
        expect(LocalStorageCache.saveAirports.args[1][0]).to.be.deep.equal(expectedAirports);
        expect(LocalStorageCache.saveLastBookableDate).to.be.calledWith('2019-01-01');
        expect(LocalStorageCache.saveProductDefinitions).to.be.calledWith({ product: 'definitions' });
        expect(LocalStorageCache.saveCalendarScheduleMessage).to.be.calledWith('Calendar schedule message');

        expect(store.getActions()).to.deep.equal([
          { type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS, isFetching: true },
          { type: 'AIRPORTS__RESET_AIRPORTS' },
          {
            type: 'SHARED__UPDATE_LAST_BOOKABLE_DATE',
            lastBookableDate: '2019-01-01'
          },
          {
            type: 'SHARED__UPDATE_CALENDAR_SCHEDULE_MESSAGE',
            calendarScheduleMessage: 'Calendar schedule message'
          },
          {
            type: 'SHARED__UPDATE_PRODUCT_DEFINITIONS',
            productDefinitions: {
              product: 'definitions'
            }
          },
          {
            type: AirBookingActionTypes.AIR_BOOKING__UPDATE_CORPORATE_BOOKING_SWITCH_INFO,
            corporateBookingSwitchInfo: {
              label: 'SWABIZ'
            }
          },
          {
            type: AirportsActionTypes.AIRPORTS__FETCH_ALL_AIRPORTS_SUCCESS,
            response: expectedAirports,
            isFetching: false
          }
        ]);
      });
    });
  });

  context('recentSearch', () => {
    const recentSearches = [
      {
        timestamp: 1561069950,
        value: 'MSY - Louis Armstrong New Orleans International Airport'
      },
      {
        timestamp: 1561069955,
        value: 'DAL - Dallas Love Field Airport'
      }
    ];

    beforeEach(() => {
      RecentAirportSearchLocalStorageHelper.save.returns(recentSearches);
    });

    it('should update the value of the selected airport', () => {
      store.dispatch(updateRecentAirportSearch('DAL - Dallas Love Field Airport'));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_RECENT_AIRPORT_SEARCH,
          recentSearches: ['MSY - Louis Armstrong New Orleans International Airport', 'DAL - Dallas Love Field Airport']
        }
      ]);
    });

    it('should reset the value after it is set on reset', () => {
      store.dispatch(updateRecentAirportSearch('DAL - Dallas Love Field Airport'));

      store.dispatch(resetRecentAirportSearch());

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_RECENT_AIRPORT_SEARCH,
          recentSearches: ['MSY - Louis Armstrong New Orleans International Airport', 'DAL - Dallas Love Field Airport']
        },
        { type: AirportsActionTypes.AIRPORTS__RESET_RECENT_AIRPORT_SEARCH }
      ]);
    });
  });

  context('saveDestinationAirport', () => {
    it('should dispatch save recent flight action with aiport name', async () => {
      await store.dispatch(saveDestinationAirport('TEST'));

      expect(store.getActions()).to.deep.equal([
        {
          airportName: 'TEST AIRPORT NAME',
          type: 'ACCOUNT__SAVE_RECENT_FLIGHT_DESTINATION'
        }
      ]);
    });
  });

  describe('multiSelectGroup', () => {
    it('should dispatch save multi select group action with airport group data', () => {
      const multiSelectGroup = { isSelected: true, origin: ['TEST', 'TEST1'] };

      store.dispatch(saveMultiSelectGroup(multiSelectGroup));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__SAVE_MULTI_SELECT_GROUP,
          response: multiSelectGroup
        }
      ]);
    });

    it('should dispatch update multiselectgroups action with airport group data', () => {
      store.dispatch(updateMultiSelectGroup(airport, 'origin'));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP,
          response: airport,
          formId: 'origin'
        }
      ]);
    });

    it('should dispatch clearMultiSelectGroupFormId action with formId', () => {
      store.dispatch(clearMultiSelectGroupFormId('origin'));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP_FORM_ID,
          formId: 'origin'
        }
      ]);
    });

    it('should dispatch loadMultiSelectGroup action with multiselectgroup data', () => {
      const multiSelectGroup = {
        isSelected: false,
        origin: ['A'],
        destination: ['A']
      };

      store.dispatch(loadMultiSelectGroup(multiSelectGroup));

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__LOAD_MULTI_SELECT_GROUP,
          response: multiSelectGroup
        }
      ]);
    });

    it('should dispatch clearMultiSelectGroup action', () => {
      store.dispatch(clearMultiSelectGroup());

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_MULTI_SELECT_GROUP
        }
      ]);
    });

    it('should dispatch updatetMultiSelectGroupCurrentDirection action', () => {
      store.dispatch(updatetMultiSelectGroupCurrentDirection('inbound'));

      expect(store.getActions()).to.deep.equal([
        {
          response: 'inbound',
          type: AirportsActionTypes.AIRPORTS__UPDATE_MULTI_SELECT_GROUP_CURRENT_DIRECTION
        }
      ]);
    });

    it('should dispatch updateUnavailableMultiSelectGroup action', () => {
      store.dispatch(updateUnavailableMultiSelectGroup({ origin: 'ABC', destination: 'CDE' }));

      expect(store.getActions()).to.deep.equal([
        {
          response: { origin: 'ABC', destination: 'CDE' },
          type: AirportsActionTypes.AIRPORTS__UPDATE_UNAVAILABLE_MULTI_SELECT_GROUP
        }
      ]);
    });

    it('should dispatch clearUnavailableMultiSelectGroup action', () => {
      store.dispatch(clearUnavailableMultiSelectGroup());

      expect(store.getActions()).to.deep.equal([
        {
          type: AirportsActionTypes.AIRPORTS__CLEAR_UNAVAILABLE_MULTI_SELECT_GROUP
        }
      ]);
    });
  });
});
