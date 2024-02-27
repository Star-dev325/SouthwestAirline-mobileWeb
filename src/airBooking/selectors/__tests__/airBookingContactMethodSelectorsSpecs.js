import _ from 'lodash';
import sinonModule from 'sinon';
import {
  getAirBookingContactMethodContent,
  getAirBookingContactMethodInfo,
  isDeclineNotifications
} from 'src/airBooking/selectors/airBookingContactMethodSelectors';
import * as ContactMethodHelper from 'src/shared/helpers/contactMethodHelper';

const sinon = sinonModule.sandbox.create();

describe('airBookingContactMethodSelectors', () => {
  beforeEach(() => {
    sinon.stub(ContactMethodHelper, 'generateContactNavigatorLabel').returns('Converted Contact Method Info');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should generate contact method content from contact method info for air booking', () => {
    const state = {};
    const contactMethodInfo = { contactMethod: 'EMAIL', email: 'test@test.com', phoneNumber: '', phoneCountryCode: '' };

    _.set(state, 'app.airBooking.contactMethodInfo', contactMethodInfo);

    const result = getAirBookingContactMethodContent(state);

    expect(ContactMethodHelper.generateContactNavigatorLabel).have.been.calledWith(contactMethodInfo);
    expect(result).to.be.equal('Converted Contact Method Info');
  });

  it('should generate contact method content from contact method info for international air booking', () => {
    const state = {};
    const contactMethodInfo = { contactMethod: 'EMAIL', email: 'test@test.com', phoneNumber: '', phoneCountryCode: '' };

    _.set(state, 'app.airBooking.contactMethodInfo', contactMethodInfo);
    _.set(state, 'app.airBooking.isInternationalBooking', true);

    const result = getAirBookingContactMethodInfo(state);

    expect(result).to.be.deep.equal(contactMethodInfo);
  });

  it('should decline notifications from contact method info for international air booking', () => {
    const state = {};
    const contactMethodInfo = {};

    _.set(state, 'app.airBooking.contactMethodInfo', contactMethodInfo);
    _.set(state, 'app.airBooking.isInternationalBooking', true);

    const result = getAirBookingContactMethodInfo(state);

    expect(result).to.be.deep.equal({
      ...contactMethodInfo,
      declineNotifications: true
    });
  });

  it('should decline notifications for domestic air booking with existing declineNotifications', () => {
    const state = {};
    const contactMethodInfo = { declineNotifications: false };

    _.set(state, 'app.airBooking.contactMethodInfo', contactMethodInfo);

    expect(isDeclineNotifications(state)).to.equal(false);
  });

  it('should decline notifications for international air booking with already declineNotifications', () => {
    const state = {};
    const contactMethodInfo = { declineNotifications: false };

    _.set(state, 'app.airBooking.contactMethodInfo', contactMethodInfo);
    _.set(state, 'app.airBooking.isInternationalBooking', true);

    expect(isDeclineNotifications(state)).to.equal(true);
  });

  it('should decline notifications for international air booking', () => {
    const state = {};
    const contactMethodInfo = { declineNotifications: false };

    _.set(state, 'app.airBooking.contactMethodInfo', contactMethodInfo);
    _.set(state, 'app.airBooking.isInternationalBooking', true);

    expect(isDeclineNotifications(state)).to.equal(true);
  });

  it('should decline notifications for international air booking with empty contact', () => {
    const state = {};
    const contactMethodInfo = {};

    _.set(state, 'app.airBooking.contactMethodInfo', contactMethodInfo);
    _.set(state, 'app.airBooking.isInternationalBooking', true);

    expect(isDeclineNotifications(state)).to.equal(true);
  });
});
