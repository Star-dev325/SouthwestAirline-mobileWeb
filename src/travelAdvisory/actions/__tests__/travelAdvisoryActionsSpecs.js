import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as TravelAdvisoryActions from 'src/travelAdvisory/actions/travelAdvisoryActions';
import travelAdvisoryActionTypes from 'src/travelAdvisory/actions/travelAdvisoryActionTypes';
import * as TravelAdvisoryApi from 'src/shared/api/wcm/travelAdvisoryApi';

const {
  TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES,
  TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES_SUCCESS,
  TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES_FAILED
} = travelAdvisoryActionTypes;

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('TravelAdvisoryActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('async actions', () => {
    let travelAdvisoryResponse;

    beforeEach(() => {
      travelAdvisoryResponse = [
        {
          advisoryTitle: 'Fake Advisory Title 1',
          advisoryInfo: 'Fake Advisory Info 1'
        },
        {
          advisoryTitle: 'Fake Advisory Title 2',
          advisoryInfo: 'Fake Advisory Info 2'
        }
      ];
    });

    context('fetchTravelAdvisories', () => {
      it('should return TravelAdvisory array when travel advisory API succeeds', async () => {
        sinon.stub(TravelAdvisoryApi, 'getTravelAdvisories').returns(Promise.resolve(travelAdvisoryResponse));

        await store.dispatch(TravelAdvisoryActions.getTravelAdvisories());

        expect(store.getActions()).to.deep.equal([
          {
            type: TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES,
            isFetching: true
          },
          {
            type: TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES_SUCCESS,
            isFetching: false,
            response: travelAdvisoryResponse
          }
        ]);
      });
      it('should return an error when the travel advisory API fails', async () => {
        sinon.stub(TravelAdvisoryApi, 'getTravelAdvisories').returns(Promise.reject('error'));

        await store.dispatch(TravelAdvisoryActions.getTravelAdvisories());
        expect(store.getActions()).to.deep.equal([
          {
            type: TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES,
            isFetching: true
          },
          {
            type: TRAVEL_ADVISORY__FETCH_TRAVEL_ADVISORIES_FAILED,
            isFetching: false,
            error: 'error'
          }
        ]);
      });
    });
  });
});
