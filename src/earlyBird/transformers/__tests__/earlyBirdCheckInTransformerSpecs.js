import mockResponse from 'src/earlyBird/transformers/__tests__/earlyBirdRetrieveReservationMock';
import {
  getEarlyBirdCheckInFailed,
  getViewEarlyBirdReservationLink,
  isFlightEligibleForCheckIn,
  isFlightAlreadyPurchased
} from 'src/earlyBird/transformers/earlyBirdCheckInTransformer';
import i18n from '@swa-ui/locale';

describe('earlyBirdCheckInTransformer', () => {
  context('getEarlyBirdCheckInFailed', () => {
    it('should Popup when Invalid reservation information and response with message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.inValidReservation);

      expect(errorResponse.responseJSON.message).to.equal(mockResponse.inValidReservation.responseJSON.message);
    });

    it('should Popup when Invalid reservation information and response without message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.inValidReservationWithoutMessage);

      expect(errorResponse.responseJSON.message).to.equal(i18n('EARLY_BIRD_INVALID_RESERVATION_INFO'));
    });

    it('should Popup when flight in progress and response with message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.flightInProgress);

      expect(errorResponse.responseJSON.message).to.equal(mockResponse.flightInProgress.responseJSON.message);
    });

    it('should Popup when flight in progress and response without message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.flightInProgressWithoutMessage);

      expect(errorResponse.responseJSON.message).to.equal(i18n('EARLY_BIRD_FLIGHT_IN_PROGRESS'));
    });

    it('should Popup when flight in past and response with message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.flightInPast);

      expect(errorResponse.responseJSON.message).to.equal(mockResponse.flightInPast.responseJSON.message);
    });

    it('should Popup when flight in past and response without message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.flightInPastWithoutMessage);

      expect(errorResponse.responseJSON.message).to.equal(i18n('EARLY_BIRD_FLIGHT_IN_PAST'));
    });

    it('should Popup when flight is international and response with message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.flightIsInternational);

      expect(errorResponse.responseJSON.message).to.equal(mockResponse.flightIsInternational.responseJSON.message);
    });

    it('should Popup when flight is international and response without message', () => {
      const errorResponse = getEarlyBirdCheckInFailed(mockResponse.flightIsInternationalWithoutMessage);

      expect(errorResponse.responseJSON.message).to.equal(i18n('EARLY_BIRD_INTERNATIONAL'));
    });

    it('should return error response with message contained in the Error class', () => {
      const errorResponse = getEarlyBirdCheckInFailed(new Error('message'));

      expect(errorResponse.responseJSON.message).to.equal('message');
    });

    it('should return empty object when the device is offline', () => {
      const errorResponseWhenDeviceIsOffline = { responseJSON: undefined };

      const errorResponse = getEarlyBirdCheckInFailed(errorResponseWhenDeviceIsOffline);

      expect(errorResponse).to.deep.equal({});
    });
  });

  context('isFlightEligibleForCheckIn', () => {
    it("should return false when flight doesn't have earlyBirdEligibilities", () => {
      const flightEligibleForCheckIn = isFlightEligibleForCheckIn(mockResponse.flightWithoutEarlyBirdEligibilities);

      expect(flightEligibleForCheckIn).to.be.false;
    });

    it('should return true when flight has earlyBirdEligibilities', () => {
      const flightEligibleForCheckIn = isFlightEligibleForCheckIn(mockResponse.flightWithEarlyBirdEligibilities);

      expect(flightEligibleForCheckIn).to.be.true;
    });
  });

  context('isFlightAlreadyPurchased', () => {
    it("should return true when flight already purchased all of it's earlyBirdEligibilities", () => {
      const flightEligibleForCheckIn = isFlightAlreadyPurchased(
        mockResponse.flightWithAllEarlyBirdEligibilitiesAlreadyPurchased
      );

      expect(flightEligibleForCheckIn).to.be.true;
    });

    it("should return false when flight has not already purchased all of it's earlyBirdEligibilities", () => {
      const flightEligibleForCheckIn = isFlightAlreadyPurchased(
        mockResponse.flightWithSomeEarlyBirdEligibilitiesAlreadyPurchased
      );

      expect(flightEligibleForCheckIn).to.be.false;
    });
  });

  context('getViewEarlyBirdReservationLink', () => {
    it('should transform pnr to a link object', () => {
      const pnr = {
        firstName: 'Mike',
        lastName: 'Tangrila',
        recordLocator: 'NAAHHN'
      };

      const expectedLink = {
        href: '/v1/mobile-air-booking/page/early-bird/NAAHHN',
        method: 'GET',
        query: {
          ['first-name']: 'Mike',
          ['last-name']: 'Tangrila'
        }
      };

      expect(getViewEarlyBirdReservationLink(pnr)).to.deep.equal(expectedLink);
    });
  });
});
