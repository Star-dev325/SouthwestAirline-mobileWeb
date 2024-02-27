import { isInformationCompletedForExpressCheckout } from 'src/airBooking/helpers/expressCheckoutHelper';
import GenderTypes from 'src/shared/form/constants/genderTypes';

describe('expressCheckoutHelper', () => {
  context('isInformationCompletedForExpressCheckout', () => {
    it('should return true when has all information for express checkout', () => {
      const info = { dateOfBirth: '1990-02-03', firstName: 'firstName', lastName: 'lastName', gender: GenderTypes.MALE };

      expect(isInformationCompletedForExpressCheckout(info)).to.be.true;
    });

    it('should return false when missing date of birth', () => {
      const info = { firstName: 'firstName', lastName: 'lastName', gender: 'gender' };

      expect(isInformationCompletedForExpressCheckout(info)).to.be.false;
    });

    it('should return false when missing first name', () => {
      const info = { dateOfBirth: '1990-02-03', lastName: 'lastName', gender: 'gender' };

      expect(isInformationCompletedForExpressCheckout(info)).to.be.false;
    });

    it('should return false when missing last name', () => {
      const info = { dateOfBirth: '1990-02-03', firstName: 'firstName', gender: 'gender' };

      expect(isInformationCompletedForExpressCheckout(info)).to.be.false;
    });

    it('should return false when missing gender', () => {
      const info = { dateOfBirth: '1990-02-03', firstName: 'firstName', lastName: 'lastName' };

      expect(isInformationCompletedForExpressCheckout(info)).to.be.false;
    });

    it('should return false when gender is UNAVAILABLE', () => {
      const info = { dateOfBirth: '1990-02-03', firstName: 'firstName', lastName: 'lastName', gender: GenderTypes.UNAVAILABLE };

      expect(isInformationCompletedForExpressCheckout(info)).to.be.false;
    });

    it('should return false when parameter undefined', () => {
      const info = undefined;

      expect(isInformationCompletedForExpressCheckout(info)).to.be.false;
    });
  });
});
