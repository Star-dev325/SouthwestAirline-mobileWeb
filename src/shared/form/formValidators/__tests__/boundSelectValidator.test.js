import boundSelectValidator from 'src/shared/form/formValidators/boundSelectValidator';

describe('boundSelectValidator', () => {
  describe('hasSelectedFlightCancel', () => {
    it('should return no error when fields selected', () => {
      const returnValue = boundSelectValidator({ boundCancel: true })({
        firstbound: true
      });

      expect(returnValue).toMatchObject({});
    });

    it('should return error when no fields selected', () => {
      const returnvalue = boundSelectValidator({ boundCancel: true })({
        firstbound: false
      });

      expect(returnvalue).toMatchObject({
        hasSelectedFlight: {
          type: 'ERROR_HEADER',
          msg: 'SHARED__ERROR_MESSAGES__AIR_CANCEL_BOUND_SELECT_BLANK'
        }
      });
    });
  });

  describe('hasSelectedFlightChange', () => {
    it('should return no error when fields selected', () => {
      const returnValue = boundSelectValidator({ boundCancel: false })({
        firstbound: true
      });

      expect(returnValue).toMatchObject({});
    });

    it('should return error when no fields selected', () => {
      const returnvalue = boundSelectValidator({ boundCancel: false })({
        firstbound: false
      });

      expect(returnvalue).toMatchObject({
        hasSelectedFlight: {
          type: 'ERROR_HEADER',
          msg: 'SHARED__ERROR_MESSAGES__AIR_CHANGE_SELECT_BLANK'
        }
      });
    });
  });
});
