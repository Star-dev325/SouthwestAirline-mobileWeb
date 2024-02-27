import { getCheckInRequest } from 'src/checkIn/selectors/checkInConfirmationPageSelectors';
import CheckInViewReservationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInReservationBuilder';

describe('CheckInConfirmationPageSelectors', () => {
  context('checkInRequest', () => {
    it('should return correct checkInRequest', () => {
      const { checkInViewReservationPage } = new CheckInViewReservationBuilder().withLinks().build();

      const checkInPassengerRequest = getCheckInRequest.resultFunc(checkInViewReservationPage, 'token', false);

      expect(checkInPassengerRequest).to.deep.equals({
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          recordLocator: 'OHBKZZ',
          firstName: 'helen',
          lastName: 'wang',
          travelerIdentifier: 'TRAVELERID1',
          checkInSessionToken: 'token'
        },
        isLoggedIn: false
      });
    });

    it('should return null checkInRequest when _links data is empty', () => {
      const { checkInViewReservationPage } = new CheckInViewReservationBuilder().build();

      const checkInPassengerRequest = getCheckInRequest.resultFunc(checkInViewReservationPage, 'token', false);

      expect(checkInPassengerRequest).to.deep.equals(null);
    });

    it('should merge the checkInSessionToken to request body', () => {
      const { checkInViewReservationPage } = new CheckInViewReservationBuilder()
        .withLinks({
          checkIn: {
            href: '/v1/mobile-air-operations/page/check-in',
            method: 'POST',
            body: {
              recordLocator: 'OHBKZZ',
              firstName: 'helen',
              lastName: 'wang',
              travelerIdentifier: 'TRAVELERID1'
            }
          }
        })
        .build();

      const checkInPassengerRequest = getCheckInRequest.resultFunc(checkInViewReservationPage, 'token', false);

      expect(checkInPassengerRequest).to.deep.equals({
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          recordLocator: 'OHBKZZ',
          firstName: 'helen',
          lastName: 'wang',
          travelerIdentifier: 'TRAVELERID1',
          checkInSessionToken: 'token'
        },
        isLoggedIn: false
      });
    });
  });
});
