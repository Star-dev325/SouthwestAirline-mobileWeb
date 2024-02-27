jest.mock('src/shared/api/flightBookingApi');

import '@testing-library/jest-dom';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import { fetchEarlybirdPricing, saveEarlyBirdEligibility } from 'src/airBooking/actions/earlyBirdInPathActions';
import * as purchaseSummaryPageHelper from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import createMockStore from 'test/unit/helpers/createMockStore';

const flightBookingApiMock = jest.mocked(FlightBookingApi);
const mockStore = createMockStore();

describe('earlyBirdInPathActions', () => {
  let purchaseSummaryPageHelperFnMock;
  let store;

  beforeEach(() => {
    purchaseSummaryPageHelperFnMock = jest
      .spyOn(purchaseSummaryPageHelper, 'transformToEarlybirdInPathRequest')
      .mockReturnValue({
        earlyBirdRequest: 'earlyBirdRequest'
      });
    store = mockStore({});
  });

  it('should FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS when retrieve early bird pricing has been done', () => {
    flightBookingApiMock.retrieveEarlyBirdInPathInfo.mockResolvedValue({
      earlyBirdEligibility: 'earlyBirdPricingResponse'
    });

    store.dispatch(fetchEarlybirdPricing()).then(() => {
      const actions = store.getActions();

      expect(purchaseSummaryPageHelperFnMock).toHaveBeenCalled();
      expect(actions[2]).toEqual({
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
        response: {
          earlyBirdEligibility: 'earlyBirdPricingResponse'
        },
        isFetching: false
      });
    });
  });

  it('should FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED when retrieve early bird pricing has been failed', () => {
    flightBookingApiMock.retrieveEarlyBirdInPathInfo.mockRejectedValue();

    return store.dispatch(fetchEarlybirdPricing()).then(() => {
      const actions = store.getActions();

      expect(purchaseSummaryPageHelper.transformToEarlybirdInPathRequest).toHaveBeenCalled();
      expect(actions[1]).toEqual({
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_FAILED,
        isFetching: false
      });
    });
  });

  it('should saveEarlyBirdEligibility dispatches AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS', () => {
    const earlyBirdEligibility = {
      earlyBirdEligibility: {
        bound: []
      }
    };

    store.dispatch(saveEarlyBirdEligibility(earlyBirdEligibility));

    expect(store.getActions()).toEqual([
      {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
        response: { earlyBirdEligibility }
      }
    ]);
  });

  it('should dispatch AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY if toggle is ON', () => {
    flightBookingApiMock.retrieveEarlyBirdInPathInfo.mockResolvedValue({
      earlyBirdEligibility: 'earlyBirdPricingResponse'
    });

    return store.dispatch(fetchEarlybirdPricing()).then(() => {
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          isFetching: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO
        },
        {
          earlyBirdEligibility: 'earlyBirdPricingResponse',
          type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY
        },
        {
          isFetching: false,
          response: {
            earlyBirdEligibility: 'earlyBirdPricingResponse'
          },
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS
        }
      ]);
    });
  });

  it('should dispatch setEarlyBirdPricingDifference if earlyBirdPricingDifference has value', () => {
    flightBookingApiMock.retrieveEarlyBirdInPathInfo.mockResolvedValue({
      earlyBirdEligibility: 'earlyBirdPricingResponse',
      earlyBirdPricingDifference: 'increase'
    });

    return store.dispatch(fetchEarlybirdPricing()).then(() => {
      const actions = store.getActions();

      expect(actions).toEqual([
        {
          isFetching: true,
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO
        },
        {
          earlyBirdEligibility: 'earlyBirdPricingResponse',
          type: AirBookingActionTypes.AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY
        },
        {
          earlyBirdPricingDifference: 'increase',
          type: 'AIR_BOOKING__SET_EARLY_BIRD_PRICING_DIFFERENCE'
        },
        {
          isFetching: false,
          response: {
            earlyBirdEligibility: 'earlyBirdPricingResponse',
            earlyBirdPricingDifference: 'increase'
          },
          type: AirBookingActionTypes.AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS
        }
      ]);
    });
  });
});
