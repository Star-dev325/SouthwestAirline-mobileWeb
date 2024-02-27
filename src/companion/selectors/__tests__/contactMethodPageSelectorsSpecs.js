import sinonModule from 'sinon';
import _ from 'lodash';
import * as contactMethodPageHelper from 'src/shared/helpers/contactMethodPageHelper';
import { isAlreadyHasContactMethod } from 'src/companion/selectors/contactMethodPageSelectors';

const sinon = sinonModule.sandbox.create();

describe('contactMethodPageSelectors', () => {
  context('isAlreadyhasContactMethod', () => {
    it('should call hasSavedContactMethod with correct parameters', () => {
      const hasSavedContactMethodStub = sinon.stub(contactMethodPageHelper, 'hasSavedContactMethod');
      const state = {};

      _.set(state, 'app.companion.companionPassengerPage.response.companionDetailsPage.contactMethod', 'fakeMethod');
      _.set(state, 'app.companion.flightPricingPage._meta.internationalBooking', 'fakeInternationalBooking');

      isAlreadyHasContactMethod(state);

      expect(hasSavedContactMethodStub).to.be.calledWith('fakeMethod', 'fakeInternationalBooking');
    });
  });
});
