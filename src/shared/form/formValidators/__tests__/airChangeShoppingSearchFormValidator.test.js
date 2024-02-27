import {
  isAirportsNotEqual,
  isInvalidDates
} from 'src/shared/form/formValidators/airChangeShoppingSearchFormValidator';

describe('shopping search form validation', () => {
  const { validator } = isAirportsNotEqual[0];

  describe('isAirportsNotEqual', () => {
    it('should return true when airports are not the same', () => {
      const formData = {
        from: 'AUS',
        to: 'DAL'
      };

      expect(validator(formData)).toEqual(true);
    });

    it('should return false when airports are the same', () => {
      const formData = {
        from: 'AUS',
        to: 'AUS'
      };

      expect(validator(formData)).toEqual(false);
    });
  });

  describe('isInvalidDates', () => {
    describe('departureDateValidator', () => {
      const { validator: departureDateValidator } = isInvalidDates[0];

      it('should return true when isInvalidDepartureDate is false', () => {
        const formData = {
          departureAndReturnDate: {
            isInvalidDepartureDate: false
          }
        };

        expect(departureDateValidator(formData)).toEqual(true);
      });

      it('should return false when isInvalidDepartureDate is true', () => {
        const formData = {
          departureAndReturnDate: {
            isInvalidDepartureDate: true
          }
        };

        expect(departureDateValidator(formData)).toEqual(false);
      });
    });

    describe('returnDateValidator', () => {
      const { validator: returnDateValidator } = isInvalidDates[1];

      it('should return true when isInvalidReturnDate is false', () => {
        const formData = {
          departureAndReturnDate: {
            isInvalidReturnDate: false
          }
        };

        expect(returnDateValidator(formData)).toEqual(true);
      });

      it('should return false when isInvalidReturnDate is true', () => {
        const formData = {
          departureAndReturnDate: {
            isInvalidReturnDate: true
          }
        };

        expect(returnDateValidator(formData)).toEqual(false);
      });
    });
  });
});
