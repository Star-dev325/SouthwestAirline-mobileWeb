import {
  createNewObjectReplacingNullValues,
  getBooleanValue
} from 'src/shared/helpers/formDataHelper';

describe('formDataHelper', () => {
  describe('getBooleanValue', () => {
    it('should translate a falsy value into a boolean', () => {
      expect(getBooleanValue(undefined)).toBe(false);
    });

    it('should translate the string "true" into a boolean', () => {
      expect(getBooleanValue('true')).toBe(true);
    });

    it('should translate the string "TRUE" into a boolean', () => {
      expect(getBooleanValue('true')).toBe(true);
    });

    it('should translate the string "false" into a boolean', () => {
      expect(getBooleanValue('false')).toBe(false);
    });
  });

  describe('createNewObjectReplacingNullValues', () => {
    it('should replace null values in an object with an empty string', () => {
      const mockFormData = {
        firstName: null,
        lastName: 'lastName'
      };

      expect(createNewObjectReplacingNullValues(mockFormData)).toEqual({
        firstName: '',
        lastName: 'lastName'
      });
    });

    it('should return an empty object if called without parameters', () => {
      expect(createNewObjectReplacingNullValues()).toEqual({});
    });
  });
});
