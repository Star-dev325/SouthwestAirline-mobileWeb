import { sandbox } from 'sinon';
import store2 from 'store2';
import FakeClock from 'test/unit/helpers/fakeClock';
import StorageKeys from 'src/shared/helpers/storageKeys';
import CheckInLocalStorageHelper from 'src/checkIn/helpers/checkInLocalStorageHelper';

const { CHECKIN_HAZMAT_ACK_KEY } = StorageKeys;

const sinon = sandbox.create();

describe('CheckInLocalStorageHelper', () => {
  let expiredFlight, flight1, flight2, flight3, flights, yesterdaysFlight;
  let today, tomorrow, twoDaysBeforeToday, yesterday;

  beforeEach(() => {
    today = '2020-01-15';
    tomorrow = '2020-01-16';
    yesterday = '2020-01-14';
    twoDaysBeforeToday = '2020-01-13';
    FakeClock.setTimeTo(today);
    sinon.spy(store2, 'get');
    sinon.spy(store2, 'set');

    flight1 = {
      flightDate: tomorrow,
      travelerId: 'travelerId-01',
      travelerSegmentIdentifier: 'travelerSegmentIdentifier-01-01'
    };
    flight2 = {
      flightDate: tomorrow,
      travelerId: 'travelerId-02',
      travelerSegmentIdentifier: 'travelerSegmentIdentifier-02-01'
    };
    flight3 = {
      flightDate: today,
      travelerId: 'travelerId-03',
      travelerSegmentIdentifier: 'travelerSegmentIdentifier-03-01'
    };
    yesterdaysFlight = {
      flightDate: yesterday,
      travelerId: 'travelerId-01',
      travelerSegmentIdentifier: 'travelerSegmentIdentifier-01-01'
    };
    expiredFlight = {
      flightDate: twoDaysBeforeToday,
      travelerId: 'travelerId-01',
      travelerSegmentIdentifier: 'travelerSegmentIdentifier-01-01'
    };
    flights = [flight1, flight2];
  });

  afterEach(() => {
    sinon.restore();
    store2.set(CHECKIN_HAZMAT_ACK_KEY, []);
    FakeClock.restore();
  });

  context('saveAcceptedHazmatDeclarations', () => {
    it('should save flights', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
      expect(store2.set).to.be.called;
      expect(store2.set.args[0][1]).to.deep.equal(flights);
      expect(store2.get(CHECKIN_HAZMAT_ACK_KEY)).to.deep.equal(flights);
    });

    it('should save flights', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations([flight3]);
      expect(store2.set).to.be.called;
      const allFlights = [flight1, flight2, flight3];

      expect(store2.set.args[0][1]).to.deep.equal(flights);
      expect(store2.set.args[1][1]).to.deep.equal(allFlights);
      expect(store2.get(CHECKIN_HAZMAT_ACK_KEY)).to.deep.equal(allFlights);
    });

    it('should save to cache without duplicates', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations([flight1]);
      expect(CheckInLocalStorageHelper._getAcceptedHazmatDeclarations().length).to.equal(flights.length);
    });
  });

  context('hasAcceptedHazmatDeclaration', () => {
    it('should return true when declarations contains the flight', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight1])).to.be.true;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight2])).to.be.true;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations(flights)).to.be.true;
    });

    it('should return true when declarations match based on correct travelerSegmentIdentifier', () => {
      flights[0].flightDate = undefined;
      flights[1].flightDate = undefined;
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight1])).to.be.true;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight2])).to.be.true;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations(flights)).to.be.true;
    });

    it('should return false when no declarations', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations([]);
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight3])).to.be.false;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations(flights)).to.be.false;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([])).to.be.false;
    });

    it('should return false when declarations do not contain the flight', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight3])).to.be.false;
    });

    it('should return false when declarations do not contain the flight(s)', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations([flight1]);
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight2])).to.be.false;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight3])).to.be.false;
      expect(CheckInLocalStorageHelper.hasAcceptedHazmatDeclarations([flight3, flight2])).to.be.false;
    });
  });

  context('clearAcceptedHazmatDeclarations', () => {
    it('should clear saved declarations', () => {
      CheckInLocalStorageHelper.saveAcceptedHazmatDeclarations(flights);
      expect(store2.get(CHECKIN_HAZMAT_ACK_KEY)).to.deep.equal(flights);

      CheckInLocalStorageHelper.clearAcceptedHazmatDeclarations();
      expect(store2.get(CHECKIN_HAZMAT_ACK_KEY)).to.deep.equal([]);
    });
  });

  context('_getAcceptedHazmatDeclarations', () => {
    it('should get empty array when no declarations exist', () => {
      const flightAcks = CheckInLocalStorageHelper._getAcceptedHazmatDeclarations();

      expect(store2.get).to.be.called;
      expect(flightAcks).to.deep.equal([]);
    });

    it('should get array of flights', () => {
      store2.set(CHECKIN_HAZMAT_ACK_KEY, flights);

      const flightAcks = CheckInLocalStorageHelper._getAcceptedHazmatDeclarations();

      expect(store2.get).to.be.called;
      expect(flightAcks).to.deep.equal(flights);
    });
  });

  context('_removeExpiredHazmatDeclarations', () => {
    it('should return all declarations when none are expired', () => {
      expect(CheckInLocalStorageHelper._removeExpiredHazmatDeclarations(flights)).to.deep.equal(flights);
    });

    it('should return unexpired declarations when some are expired', () => {
      const withExpired = flights.concat([expiredFlight, yesterdaysFlight]);

      expect(CheckInLocalStorageHelper._removeExpiredHazmatDeclarations(withExpired)).to.deep.equal(flights);
    });
  });
});
