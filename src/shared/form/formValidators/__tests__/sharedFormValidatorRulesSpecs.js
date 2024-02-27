import {
  hasSomeInputedValues,
  hasSomeFieldsNeedToCorrect
} from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { REQUIRED_ERROR, FIELD_ERROR_MESSAGE } from 'src/shared/form/constants/validationErrorTypes';

context('sharedFormValidatorRules', () => {
  let validator;

  context('hasSomeInputedValues', () => {
    beforeEach(() => {
      ({ validator } = hasSomeInputedValues[0]);
    });

    it('should pass if there are no errors', () => {
      const errors = {};

      expect(validator({}, errors)).to.be.true;
    });

    it('should pass if there are not only REQUIRED_ERROR', () => {
      const errors = {
        someField: {
          type: REQUIRED_ERROR
        },
        anotherField: {
          type: FIELD_ERROR_MESSAGE,
          msg: 'some error message'
        }
      };

      expect(validator({}, errors)).to.be.true;
    });

    it('should failed if all the errors are REQUIRED_ERROR', () => {
      const errors = {
        someField: {
          type: REQUIRED_ERROR
        }
      };

      expect(validator({}, errors)).to.be.false;
    });
  });

  context('hasSomeFieldsNeedToCorrect', () => {
    beforeEach(() => {
      ({ validator } = hasSomeFieldsNeedToCorrect[0]);
    });

    it('should pass if there are no errors', () => {
      const errors = {};

      expect(validator({}, errors)).to.be.true;
    });

    it('should pass if there are only REQUIRED_ERROR', () => {
      const errors = {
        someField: {
          type: REQUIRED_ERROR
        }
      };

      expect(validator({}, errors)).to.be.true;
    });

    it('should failed if there are not only REQUIRED_ERROR', () => {
      const errors = {
        someField: {
          type: REQUIRED_ERROR
        },
        anotherField: {
          type: FIELD_ERROR_MESSAGE,
          msg: 'some error message'
        }
      };

      expect(validator({}, errors)).to.be.false;
    });
  });
});
