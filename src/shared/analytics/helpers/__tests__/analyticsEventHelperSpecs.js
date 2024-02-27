import _ from 'lodash';
import sinonModule from 'sinon';
import {
  customerMessageAnalytics,
  raiseEvent,
  raiseSatelliteEvent,
  transformPath
} from 'src/shared/analytics/helpers/analyticsEventHelper';

const sinon = sinonModule.sandbox.create();

describe('analyticsEventHelper', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('transformPath', () => {
    it(`should transform a url path replacing '/' with '-'`, () => {
      const path = '/air/booking/shopping/adult/outbound/results';
      const expected = 'air-booking-shopping-adult-outbound-results';

      expect(transformPath(path)).to.equal(expected);
    });

    it(`should transform null and undefined to empty string`, () => {
      expect(transformPath(null)).to.equal('');
      expect(transformPath(undefined)).to.equal('');
    });

    it(`should return flight-status-results for flight-status flow`, () => {
      const path = '/flight-status/AUS/BUR/2023-08-07';
      const expected = 'flight-status-results';

      expect(transformPath(path)).to.equal(expected);
    });

    it(`should transform flight-status path by replacing '/' with '-'`, () => {
      const path = '/air/flight-status/results.html';
      const expected = 'air-flight-status-results.html';

      expect(transformPath(path)).to.equal(expected);
    });

    it('should transform analytics path relates to full screen modal', () => {
      expect(transformPath('/')).to.equal('home');
      expect(transformPath('/?clk=clk&src=src')).to.equal('home');

      expect(transformPath('/air/booking/shopping?int=GNAVBKFLT&cleanFlow=true&_modal=from')).to.equal(
        'air-booking-shopping-from'
      );
      expect(transformPath('/air/booking/shopping?int=GNAVBKFLT&cleanFlow=true&_modal=to')).to.equal(
        'air-booking-shopping-to'
      );
      expect(transformPath('/air/booking/shopping?_modal=airBookingCalendar')).to.equal('air-booking-shopping-dates');

      expect(transformPath('/air/change/shopping?&_modal=from')).to.equal('air-change-shopping-from');
      expect(transformPath('/air/change/shopping?&_modal=to')).to.equal('air-change-shopping-to');
      expect(transformPath('/air/change/shopping?&_modal=airBookingCalendar')).to.equal('air-change-shopping-dates');

      expect(transformPath('/flight-status?_modal=originAirport')).to.equal('flight-status-from');
      expect(transformPath('/flight-status?_modal=destinationAirport')).to.equal('flight-status-to');

      expect(transformPath('/car/booking?&_modal=pickUpModal')).to.equal('car-booking-pick-up');
      expect(transformPath('/car/booking?&_modal=dropOffModal')).to.equal('car-booking-drop-off');
      expect(transformPath('/car/booking?&_modal=carBookingCalendar')).to.equal('car-booking-dates');
    });
  });

  context('raiseEvent', () => {
    it('should call dispatchEvent', () => {
      const dispatchEventStub = sinon.stub(document.body, 'dispatchEvent');

      raiseEvent('myTestEvent');
      expect(dispatchEventStub).to.be.called;
    });
  });

  context('raiseSatelliteEvent', () => {
    let satelliteTrackStub;

    beforeEach(() => {
      satelliteTrackStub = sinon.stub(window._satellite, 'track');
    });

    it('should call _satellite.track', () => {
      raiseSatelliteEvent('myTestEvent');
      expect(satelliteTrackStub).to.be.calledWith('myTestEvent');
    });

    it('should call _satellite.track with details if provided', () => {
      raiseSatelliteEvent('myTestEvent', { key: 'value' });
      expect(satelliteTrackStub).to.be.calledWith('myTestEvent', { key: 'value' });
    });
  });

  context('customerMessageAnalytics', () => {
    it('should store message keys in data_a', () => {
      customerMessageAnalytics([{ key: 'FAKE_KEY' }]);
      expect(_.get(window, 'data_a.message.customer')).to.equal('FAKE_KEY');
      expect(_.get(window, 'data_a.message.customerdisplay')).to.equal('1');
    });

    it('should omit undefined message keys in data_a', () => {
      customerMessageAnalytics([{ key: 'FAKE_KEY' }, { key: undefined }]);
      expect(_.get(window, 'data_a.message.customer')).to.equal('FAKE_KEY');
      expect(_.get(window, 'data_a.message.customerdisplay')).to.equal('1');
    });

    it('should omit missing message keys in data_a', () => {
      customerMessageAnalytics([{ key: 'FAKE_KEY' }, {}]);
      expect(_.get(window, 'data_a.message.customer')).to.equal('FAKE_KEY');
      expect(_.get(window, 'data_a.message.customerdisplay')).to.equal('1');
    });
  });
});
