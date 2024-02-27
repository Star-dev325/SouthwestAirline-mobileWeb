import _ from 'lodash';
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import {
  REQUIRED_ERROR,
  FIELD_ERROR_MESSAGE,
  ERROR_HEADER,
  API_ERROR_POPUP
} from 'src/shared/form/constants/validationErrorTypes';
import i18n from '@swa-ui/locale';

describe('validatorHelpers', () => {
  let formRules;
  let fieldRules;

  beforeEach(() => {});

  context('execute field rules', () => {
    it('should return error messages correctly', () => {
      fieldRules = {
        firstName: [
          {
            isRequired: true
          },
          {
            validator: validator.isName,
            type: FIELD_ERROR_MESSAGE,
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID')
          },
          {
            validator: validator.isLengthBetweenOrEqual(1, 30),
            type: FIELD_ERROR_MESSAGE,
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_LENGTH')
          }
        ]
      };
      const result = executeValidators(
        {
          firstName: '349239423934539457394564564857394753345'
        },
        {},
        fieldRules
      );

      expect(result).to.deep.equal({
        firstName: {
          type: FIELD_ERROR_MESSAGE,
          msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID')
        }
      });
    });

    it('should return REQUIRED_ERROR for required field that has no inline message', () => {
      fieldRules = {
        firstName: [
          {
            isRequired: true
          }
        ]
      };
      const result = executeValidators(
        {
          firstName: ''
        },
        {},
        fieldRules
      );

      expect(result).to.deep.equal({
        firstName: {
          type: REQUIRED_ERROR
        }
      });
    });

    it('should return FIELD_ERROR_MESSAGE error for required field with an inline message', () => {
      fieldRules = {
        firstName: [
          {
            isRequired: true,
            msg: 'This is an inline error message for a required field'
          }
        ]
      };
      const result = executeValidators(
        {
          firstName: ''
        },
        {},
        fieldRules
      );

      expect(result).to.deep.equal({
        firstName: {
          type: FIELD_ERROR_MESSAGE,
          msg: 'This is an inline error message for a required field'
        }
      });
    });

    it('should not execute rest of rules for optional field with empty value', () => {
      fieldRules = {
        firstName: [
          {
            validator: validator.isName,
            type: FIELD_ERROR_MESSAGE,
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID')
          }
        ]
      };
      const result = executeValidators(
        {
          firstName: ''
        },
        {},
        fieldRules
      );

      expect(result).to.deep.equal({});
    });

    it('should execute rest of rules for optional field and with not empty value', () => {
      fieldRules = {
        firstName: [
          {
            validator: validator.isName,
            type: FIELD_ERROR_MESSAGE,
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID')
          },
          {
            validator: validator.isLengthBetweenOrEqual(1, 30),
            type: FIELD_ERROR_MESSAGE,
            msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_LENGTH')
          }
        ]
      };
      const result = executeValidators(
        {
          firstName: '349239423934539457394564564857394753345'
        },
        {},
        fieldRules
      );

      expect(result).to.deep.equal({
        firstName: {
          type: FIELD_ERROR_MESSAGE,
          msg: i18n('SHARED__ERROR_MESSAGES__PASSENGER_FIRST_NAME_VALID')
        }
      });
    });
  });

  context('execute form rules', () => {
    it('should execute form rules correctly', () => {
      fieldRules = {
        firstName: [
          {
            isRequired: true
          }
        ]
      };
      formRules = {
        hasSomeInputedValues: [
          {
            type: ERROR_HEADER,
            validator: (formData, errors) =>
              _.isEmpty(errors) || _.some(errors, (error) => error.type !== REQUIRED_ERROR),
            msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR')
          }
        ]
      };
      const result = executeValidators({ firstName: '' }, formRules, fieldRules);

      expect(result).to.deep.equal({
        firstName: {
          type: REQUIRED_ERROR
        },
        hasSomeInputedValues: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });
  });

  context('async validation', () => {
    it('should return a promise and resolve validation errors', () => {
      let resolver;
      const asyncValidator = () =>
        new Promise((resolve) => {
          resolver = resolve;
        });

      formRules = {
        someAsyncRule: [
          {
            type: API_ERROR_POPUP,
            validator: asyncValidator
          }
        ]
      };
      const result = executeValidators({ firstName: '' }, formRules, {});

      const promise = result.then((errors) => {
        expect(errors).to.deep.equal({
          someAsyncRule: {
            type: API_ERROR_POPUP,
            msg: 'Some API error msg'
          }
        });
      });

      resolver('Some API error msg');

      return promise;
    });
  });
});
