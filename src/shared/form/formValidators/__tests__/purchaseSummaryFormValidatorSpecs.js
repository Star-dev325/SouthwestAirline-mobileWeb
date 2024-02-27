import purchseSummaryFormValidator from 'src/shared/form/formValidators/purchaseSummaryFormValidator';
import i18n from '@swa-ui/locale';

describe('purchaseSummaryFormValidator', () => {
  const fundsRemaining = { amount: '123.45', currencyCode: 'USD' };
  const noFundsRemaining = { amount: '0.00', currencyCode: 'USD' };

  context('travelFundsAddress', () => {
    it('should pass form validation when data is correct and credit card balance remaining', () => {
      const formData = {
        contactMethodContent: 'sfdsfd',
        paymentInfo: 'sdfdsf',
        securityCode: '1234',
        travelFundsAddress: null,
        chasePhoneNumber: '123-456-7890'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: fundsRemaining })(
          formData
        )
      ).to.deep.equal({});
    });

    it('should pass form validation when data is correct and no credit card balance remaining', () => {
      const formData = {
        contactMethodContent: 'sfdsfd',
        paymentInfo: null,
        securityCode: null,
        travelFundsAddress: 'sdfsdfsd',
        chasePhoneNumber: '123-456-7890'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: noFundsRemaining })(
          formData
        )
      ).to.deep.equal({});
    });
  });

  context('contactMethodContent', () => {
    it('should not pass form validation when contact method invalid', () => {
      const formData = {
        contactMethodContent: null,
        paymentInfo: null,
        securityCode: null,
        travelFundsAddress: 'sdfsdfsd',
        chasePhoneNumber: '123-456-7890'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: noFundsRemaining })(
          formData
        )
      ).to.deep.equal({
        contactMethodContent: {
          type: 'REQUIRED_ERROR'
        },
        hasSomeInputedValues: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });

    it('should pass form validation when contact method null but user declined notifications', () => {
      const formData = {
        contactMethodContent: null,
        paymentInfo: null,
        securityCode: null,
        travelFundsAddress: 'sdfsdfsd',
        chasePhoneNumber: '123-456-7890'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: true, travelFundsBalanceRemaining: noFundsRemaining })(
          formData
        )
      ).to.deep.equal({});
    });
  });

  context('internalReferenceNumber', () => {
    it('should not pass form validation when irn is required but empty', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: null,
        securityCode: null,
        travelFundsAddress: 'sdfsdfsd',
        chasePhoneNumber: '123-456-7890',
        internalReferenceNumber: ''
      };
      const irnInfo = { irnRequired: true };

      expect(
        purchseSummaryFormValidator({
          declineNotifications: false,
          travelFundsBalanceRemaining: noFundsRemaining,
          irnInfo
        })(formData)
      ).to.deep.equal({
        internalReferenceNumber: {
          type: 'REQUIRED_ERROR'
        },
        hasSomeInputedValues: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });

    it('should pass form validation when irn is not required', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: null,
        securityCode: null,
        travelFundsAddress: 'sdfsdfsd',
        chasePhoneNumber: '123-456-7890',
        internalReferenceNumber: ''
      };
      const irnInfo = { irnRequired: false };

      expect(
        purchseSummaryFormValidator({
          declineNotifications: false,
          travelFundsBalanceRemaining: noFundsRemaining,
          irnInfo
        })(formData)
      ).to.deep.equal({});
    });
  });

  context('paymentInfo', () => {
    it('should not pass form validation when payment info invalid', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: null,
        securityCode: '1234',
        travelFundsAddress: null,
        chasePhoneNumber: '123-456-7890'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: fundsRemaining })(
          formData
        )
      ).to.deep.equal({
        paymentInfo: {
          type: 'REQUIRED_ERROR'
        },
        hasSomeInputedValues: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });
  });

  context('securityCode', () => {
    it('should not pass form validation when security code is wrong format', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: '12312',
        securityCode: '12345',
        travelFundsAddress: null,
        chasePhoneNumber: '123-456-7890'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: fundsRemaining })(
          formData
        )
      ).to.deep.equal({
        securityCode: {
          msg: 'Please double check your security code (CVV) details',
          type: 'FIELD_ERROR_MESSAGE'
        },
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });

    it('should not pass form validation when security code is missing', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: '12312',
        securityCode: null,
        travelFundsAddress: null,
        chasePhoneNumber: '123-456-7890'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: fundsRemaining })(
          formData
        )
      ).to.deep.equal({
        securityCode: {
          type: 'REQUIRED_ERROR'
        },
        hasSomeInputedValues: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });
  });

  context('chasePhoneNumber', () => {
    it('should not pass form validation when chase phone number is wrong format', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: '12312',
        securityCode: '1234',
        travelFundsAddress: null,
        chasePhoneNumber: '123'
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: fundsRemaining })(
          formData
        )
      ).to.deep.equal({
        chasePhoneNumber: {
          msg: 'Phone number must be 10 digits.',
          type: 'FIELD_ERROR_MESSAGE'
        },
        hasSomeFieldsNeedToCorrect: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });

    it('should not pass form validation when chase phone number is missing', () => {
      const formData = {
        contactMethodContent: 'asdfasdf',
        paymentInfo: '12312',
        securityCode: '1234',
        travelFundsAddress: null,
        chasePhoneNumber: null
      };

      expect(
        purchseSummaryFormValidator({ declineNotifications: false, travelFundsBalanceRemaining: fundsRemaining })(
          formData
        )
      ).to.deep.equal({
        chasePhoneNumber: {
          type: 'REQUIRED_ERROR'
        },
        hasSomeInputedValues: {
          msg: i18n('SHARED__ERROR_MESSAGES__FIELD_IS_BLANK_ERROR'),
          type: 'ERROR_HEADER'
        }
      });
    });
  });
});
