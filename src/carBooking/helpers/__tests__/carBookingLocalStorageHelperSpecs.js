import store2 from 'store2';
import { sandbox } from 'sinon';
import CacheConfig from 'src/shared/cache/cacheConfig';
import StorageKeys from 'src/shared/helpers/storageKeys';
import CarBookingLocalStorageHelper from 'src/carBooking/helpers/carBookingLocalStorageHelper';

const { CAR_LOCATION_CACHE_KEY, CAR_VENDORS_CACHE_KEY, CAR_SEARCH_HISTORY_STORE_KEY } = StorageKeys;

const sinon = sandbox.create();

describe('carBookingLocalStorageHelper', () => {
  const StoreWithExpiration = require('src/shared/helpers/storeWithExpiration').default;

  afterEach(() => {
    sinon.restore();
  });

  context('Car Locations', () => {
    beforeEach(() => {
      sinon.stub(StoreWithExpiration, 'load');
      sinon.stub(StoreWithExpiration.save, 'apply');
    });

    it('should call store.get when getCarLocations is called', () => {
      CarBookingLocalStorageHelper.getCarLocations();

      expect(StoreWithExpiration.load).to.have.been.calledWith(CAR_LOCATION_CACHE_KEY);
    });

    it('should call store.get when saveCarLocations is called', () => {
      const carLocations = {};

      CarBookingLocalStorageHelper.saveCarLocations(carLocations);

      expect(StoreWithExpiration.save.apply).to.have.been.calledWith(null, [
        CAR_LOCATION_CACHE_KEY,
        carLocations,
        CacheConfig.CAR_EXPIRED_MINUTES
      ]);
    });
  });

  context('Car Vendors', () => {
    beforeEach(() => {
      sinon.stub(StoreWithExpiration, 'load');
      sinon.stub(StoreWithExpiration.save, 'apply');
    });

    it('should call store.get when getCarVendors is called', () => {
      CarBookingLocalStorageHelper.getCarVendors();

      expect(StoreWithExpiration.load).to.have.been.calledWith(CAR_VENDORS_CACHE_KEY);
    });

    it('should call store.get when saveCarVendors is called', () => {
      const carVendors = {};

      CarBookingLocalStorageHelper.saveCarVendors(carVendors);

      expect(StoreWithExpiration.save.apply).to.have.been.calledWith(null, [
        CAR_VENDORS_CACHE_KEY,
        carVendors,
        CacheConfig.CAR_EXPIRED_MINUTES
      ]);
    });
  });

  context('RecentSearches', () => {
    let searchRequest1, searchRequest2, searchRequests;

    beforeEach(() => {
      searchRequest1 = {
        dropOff: 'ABI',
        dropOffDate: '2020-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'ABR',
        pickUpDate: '2020-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      searchRequest2 = {
        dropOff: 'DAL',
        dropOffDate: '2020-03-15',
        dropOffTime: '11:30AM',
        pickUp: 'HOU',
        pickUpDate: '2020-03-12',
        pickUpTime: '11:30AM',
        vehicleType: 'Mid-size'
      };

      searchRequests = [searchRequest1, searchRequest2];
    });

    context('load and delete', () => {
      beforeEach(() => {
        sinon.stub(store2, 'get');
        sinon.stub(store2, 'set');
      });

      it('should call store2.get when loadCarRecentSearches is called', () => {
        CarBookingLocalStorageHelper.loadCarRecentSearches();

        expect(store2.get).to.have.been.calledWith(CAR_SEARCH_HISTORY_STORE_KEY);
      });

      it('should call store2.set when deleteCarRecentSearch is called', () => {
        CarBookingLocalStorageHelper.deleteCarRecentSearch(searchRequests, 0);

        expect(store2.set).to.have.been.calledWith(CAR_SEARCH_HISTORY_STORE_KEY, [searchRequest2]);
      });
    });

    context('saveCarRecentSearch', () => {
      it('should call store2.set when saveCarRecentSearch is called', () => {
        sinon.stub(store2, 'set');
        CarBookingLocalStorageHelper.saveCarRecentSearch(searchRequest1);

        expect(store2.set).to.have.been.calledWith(CAR_SEARCH_HISTORY_STORE_KEY, [searchRequest1]);
      });

      it('should call store2.set when saveCarRecentSearch is called', () => {
        const arrayOf20Requests = Array(20).fill(searchRequest1);

        sinon.stub(store2, 'set');
        sinon.stub(store2, 'get').returns(arrayOf20Requests);

        CarBookingLocalStorageHelper.saveCarRecentSearch(searchRequest1);

        expect(store2.set).to.have.been.calledWith(CAR_SEARCH_HISTORY_STORE_KEY, arrayOf20Requests);
      });
    });
  });
});
