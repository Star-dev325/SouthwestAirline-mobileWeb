import store from 'store2';
import _ from 'lodash';
import FakeClock from 'test/unit/helpers/fakeClock';
import { transformToFlightSearchRequest } from 'src/flightStatus/transformers/flightStatusTransformer';
import StorageKeys from 'src/shared/helpers/storageKeys';
import FlightSearchHistoryLocalStorageHelper from 'src/flightStatus/helper/flightSearchHistoryLocalStorageHelper';

describe('flightSearchHistoryLocalStorageHelper', () => {
  beforeEach(() => {
    FlightSearchHistoryLocalStorageHelper.reset();
    FakeClock.setTimeTo('2015-03-04');
  });

  afterEach(() => {
    FakeClock.restore();
  });

  context('searchRequests are saved', () => {
    it('prepends a search request', () => {
      const oldRequest = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', '321');
      const newRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-03', '123');

      FlightSearchHistoryLocalStorageHelper.save(oldRequest);
      FlightSearchHistoryLocalStorageHelper.save(newRequest);
      expect(FlightSearchHistoryLocalStorageHelper.get()).to.deep.equal([newRequest, oldRequest]);
    });

    it('limits the number of search requests to twenty', () => {
      const MAX_SIZE = 20;
      let i;

      for (i = 0; i < MAX_SIZE; i++) {
        FlightSearchHistoryLocalStorageHelper.save(transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', i));
      }

      expect(FlightSearchHistoryLocalStorageHelper.get().length).to.be.equal(MAX_SIZE);

      const requests = _.cloneDeep(FlightSearchHistoryLocalStorageHelper.get());

      expect(FlightSearchHistoryLocalStorageHelper.get()).to.deep.equal(requests);

      const newRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-03', '000');

      FlightSearchHistoryLocalStorageHelper.save(newRequest);
      requests.unshift(newRequest);
      requests.pop();
      const expectedResult = requests;

      expect(FlightSearchHistoryLocalStorageHelper.get()).to.deep.equal(expectedResult);
    });

    it('should move duplicate requests to front of array', () => {
      const oldRequest = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', '321');
      const olderRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-03', '123');
      const duplicatedRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-03', '123');

      FlightSearchHistoryLocalStorageHelper.save(oldRequest);
      FlightSearchHistoryLocalStorageHelper.save(olderRequest);
      FlightSearchHistoryLocalStorageHelper.save(duplicatedRequest);
      expect(FlightSearchHistoryLocalStorageHelper.get()).to.deep.equal([duplicatedRequest, oldRequest]);
    });

    it('should ignore extra unmatched keys when duplicate requests present', () => {
      const oldRequest = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', '321');
      const olderRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-03', '123');
      const duplicatedRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-03', '123');

      FlightSearchHistoryLocalStorageHelper.save({ ...oldRequest, connectingAirportCode: 'DEN' });
      FlightSearchHistoryLocalStorageHelper.save({ ...olderRequest, connectingAirportCode: 'BUF' });
      FlightSearchHistoryLocalStorageHelper.save({ ...duplicatedRequest, connectingAirportCode: 'LAX' });
      expect(FlightSearchHistoryLocalStorageHelper.get()).to.deep.equal([duplicatedRequest, oldRequest]);
    });

    it('should save searchRequests to a cookie', () => {
      const request = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', '321');

      FlightSearchHistoryLocalStorageHelper.save(request);

      expect(store.get(StorageKeys.FLIGHT_STATUS_CACHE_KEY)).to.deep.equal(JSON.stringify([request]));
    });

    context('filter out by date', () => {
      beforeEach(() => {
        FakeClock.setTimeTo('2015-03-04');
      });

      afterEach(() => {
        FakeClock.restore();
      });

      it('should return filtered searches when filter function is called', () => {
        const tomorrowRequest = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-05', '305');
        const todayRequest = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', '304');
        const yesterdayRequest = transformToFlightSearchRequest('AUS', 'HOU', '2015-03-03', '303');
        const oldRequest = transformToFlightSearchRequest('DAL', 'HOU', '2015-03-02', '302');
        const olderRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-01', '301');

        FlightSearchHistoryLocalStorageHelper.save(oldRequest);
        FlightSearchHistoryLocalStorageHelper.save(olderRequest);
        FlightSearchHistoryLocalStorageHelper.save(yesterdayRequest);
        FlightSearchHistoryLocalStorageHelper.save(todayRequest);
        FlightSearchHistoryLocalStorageHelper.save(tomorrowRequest);
        expect(FlightSearchHistoryLocalStorageHelper.get()).to.deep.equal([
          tomorrowRequest,
          todayRequest,
          yesterdayRequest
        ]);
      });
    });
  });

  context('delete recent search', () => {
    let firstRequest;
    let secondRequest;

    beforeEach(() => {
      firstRequest = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', '321');
      secondRequest = transformToFlightSearchRequest('DAL', 'MDW', '2015-03-03', '123');
      FlightSearchHistoryLocalStorageHelper.save(firstRequest);
      FlightSearchHistoryLocalStorageHelper.save(secondRequest);
    });

    it('store memory state should remove this request', () => {
      FlightSearchHistoryLocalStorageHelper.delete(firstRequest);

      expect(FlightSearchHistoryLocalStorageHelper.get()).to.deep.equal([secondRequest]);
    });

    it('should remove the request in local storage', () => {
      FlightSearchHistoryLocalStorageHelper.delete(firstRequest);

      expect(FlightSearchHistoryLocalStorageHelper.get()).to.not.contain(firstRequest);
    });
  });

  context('loading from localStorage', () => {
    it('should load existing searchRequests from local storage on init', () => {
      const request = transformToFlightSearchRequest('AUS', 'BWL', '2015-03-04', '321');

      store.set(StorageKeys.FLIGHT_STATUS_CACHE_KEY, JSON.stringify([request]));

      expect(JSON.stringify(FlightSearchHistoryLocalStorageHelper.get()[0])).to.equal(JSON.stringify(request));
    });
  });
});
