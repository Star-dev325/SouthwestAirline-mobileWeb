import airChangeReaccomConfirmFormValidator from 'src/shared/form/formValidators/airChangeReaccomConfirmFormValidator';

describe('shopping search form validation', () => {
  describe('airChangeReaccomConfirmFormValidator', () => {
    it('should return no error', () => {
      expect(airChangeReaccomConfirmFormValidator({})()).toMatchObject({});
    });

    it('should return error when invalid email', () => {
      expect(
        airChangeReaccomConfirmFormValidator({ needsEmailAddress: true })({ fulfillmentEmail: 'test' }).fulfillmentEmail
          .msg
      ).toEqual('SHARED__ERROR_MESSAGES__INVALID_EMAIL');
    });
  });
});
