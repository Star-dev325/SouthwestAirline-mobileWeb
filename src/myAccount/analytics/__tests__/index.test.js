jest.mock('src/shared/analytics/helpers/analyticsHelper', () => ({
  generateFlowActionListForAnalytics: jest.fn(() => mockActionData),
  generateUpdatedFlowStoreForAnalytics: jest.fn((selectors, state, actionType) => {
    switch (actionType) {
      case 'MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS': {
        return {
          checkInButton: true
        };
      }
    }
  })
}));

jest.mock('src/myAccount/analytics/upcomingTripsMktgSelector.js', () => ({
  upcomingTripsMktgSelector: jest.fn(() => upcomingTripsMktgData)
}));

import { generateFlowActionListForAnalytics } from 'src/shared/analytics/helpers/analyticsHelper';
import MyAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';
import * as upcomingTripsAnalytics from 'src/myAccount/analytics/index';

const { MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS } = MyAccountActionTypes;
const mockActionData = [MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS];
const upcomingTripsMktgData = 'upcoming trips mktg data';

describe('index', () => {
  describe('analyticsActionsForAirChange', () => {
    it('should return analytics actions for airChange from selectors', () => {
      expect(generateFlowActionListForAnalytics()).toStrictEqual(mockActionData);
    });
  });

  describe('generateUpcomingTripsStore', () => {
    it('should generate fields that listen to MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS action', () => {
      const updateData = upcomingTripsAnalytics.generateUpcomingTripsStore(
        'state',
        MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS
      );

      expect(updateData).toStrictEqual({
        checkInButton: true
      });
    });
  });

  describe('dataLayerSelectorsForUpcomingTrips', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(
        upcomingTripsAnalytics.dataLayerSelectorsForUpcomingTrips[MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS]()
      ).toStrictEqual(upcomingTripsMktgData);
    });
  });
});
