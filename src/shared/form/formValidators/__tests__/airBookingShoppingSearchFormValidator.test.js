import i18n from '@swa-ui/locale';
import { SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';
import airBookingShoppingSearchFormValidator from 'src/shared/form/formValidators/airBookingShoppingSearchFormValidator';

describe('airBookingShoppingSearchFormValidator', () => {
  describe('validations', () => {
    it('should not return any error when origin and destination are different', () => {
      const result = airBookingShoppingSearchFormValidator()({
        origin: 'DAL',
        destination: 'LAX'
      });

      expect(result).toMatchObject({});
    });

    it('should return error when origin and destination are same', () => {
      const result = airBookingShoppingSearchFormValidator()({
        origin: 'DAL',
        destination: 'DAL'
      });

      expect(result).toMatchObject({
        isDepartureAndArrivalNotSame: {
          type: SIMPLE_ERROR_POPUP,
          msg: i18n('SHARED__ERROR_MESSAGES__DEPARTURE_AND_ARRIVAL_NOT_BE_SAME')
        }
      });
    });
  });
});
