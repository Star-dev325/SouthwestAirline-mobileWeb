import { hasSelectedBound } from 'src/shared/form/formValidators/airUpgradeSelectValidator';

describe('airUpgradeSelectValidator', () => {
  let validator;

  beforeEach(() => {
    ({ validator } = hasSelectedBound[0]);
  });

  describe('hasSelectedBound', () => {
    it('should return true if selected in bound', () => {
      const formData = {
        firstbound: true,
        secondbound: false
      };
      const validatorResult = validator(formData);

      expect(validatorResult).toBeTruthy();
    });

    it('should return true if selected out bound', () => {
      const formData = {
        firstbound: false,
        secondbound: true
      };
      const validatorResult = validator(formData);

      expect(validatorResult).toBeTruthy();
    });

    it('should return false if no flight selected', () => {
      const formData = {
        firstbound: false,
        secondbound: false
      };
      const validatorResult = validator(formData);

      expect(validatorResult).toBeFalsy();
    });

    it('should return true if both of bound are selected', () => {
      const formData = {
        firstbound: true,
        secondbound: true
      };
      const validatorResult = validator(formData);

      expect(validatorResult).toBeTruthy();
    });
  });
});
