import _ from 'lodash';
import FakeClock from 'test/unit/helpers/fakeClock';
import {
  isCardValid,
  getCardType,
  getCardTypeName,
  splitNameOnCard,
  generateNewCreditCardInfo,
  getCardNameByType,
  getCardShortNameByType,
  isSavedCreditCardThatRequiresCVV,
  doesCreditCardNeedCVV,
  doesNewCreditCardNeedCVV,
  needToSaveForPrimary,
  generateUatpCardInfo
} from 'src/shared/helpers/creditCardHelper';
import * as creditCardTypes from 'src/shared/constants/creditCardTypes';
import {
  getPaymentInfoForUseNewCreditCard,
  getApplePayCard,
  getUpliftCard
} from 'test/builders/model/paymentInfoBuilder';

const { VISA, MASTERCARD, AMEX, DISCOVER, DINERS, UATP } = _.mapValues(creditCardTypes, 'key');

const mockData = {
  valid: {
    [VISA]: ['4123456789012345', '4123456789012', '4123456789012345000'],
    [MASTERCARD]: ['5123456789012345', '2123456789012345', '2123456789012345000'],
    [AMEX]: ['341234567890123', '371234567890123', '3712345678901230000'],
    [DISCOVER]: ['6123456789012345', '6123456789012345000'],
    [DINERS]: [
      '3012345678901212',
      '36123456789012',
      '3812345678901212',
      '3512345678901212',
      '3912345678901212',
      '3612345678901231212'
    ],
    [UATP]: ['112345678901234', '1123456789012340000']
  },
  invalid: {
    [VISA]: ['41234567890123'],
    [MASTERCARD]: ['512345678923012345', '21234567890123452'],
    [AMEX]: ['3412345678923', '371234512367890123'],
    [DISCOVER]: ['61234567123890123451'],
    [DINERS]: ['30123456789012', '36123456789012312122', '38123456789012', '39123456789012'],
    [UATP]: ['112378901234']
  },
  not_exist: '812312412'
};

describe('creditCardHelper', () => {
  beforeEach(() => {
    FakeClock.setTimeTo('2018-06-04T11:19');
  });

  afterEach(() => {
    FakeClock.restore();
  });

  context('#getCardType', () => {
    it('should return correct card type', () => {
      mockDataIterator(mockData.valid, (data, key) => {
        expect(getCardType(data)).to.equal(key);
      });
    });

    it('should return null when card type is not exist', () => {
      expect(getCardType(mockData.not_exist) === null).to.be.true;
    });
  });

  context('#isCardValid', () => {
    it('should be true when card number is valid', () => {
      mockDataIterator(mockData.valid, (data) => {
        expect(isCardValid(data)).to.be.true;
      });
    });

    it('should be false when card number is invalid', () => {
      mockDataIterator(mockData.invalid, (data) => {
        expect(isCardValid(data)).to.be.false;
      });
    });
  });

  context('#getCardTypeName', () => {
    it('should return correct name of card type', () => {
      mockDataIterator(mockData.valid, (data, key) => {
        expect(getCardTypeName(data)).to.equal(creditCardTypes[key]['name']);
      });
    });

    it('should return empty string when card type is not exist', () => {
      expect(getCardTypeName(mockData.not_exist)).to.equal('');
    });
  });

  context('#splitNameOnCard', () => {
    it('should return correct first name and last name of card when name on Card has useless spaces', () => {
      const nameOnCard = '  Amber Awesome       ';

      expect(splitNameOnCard(nameOnCard)).to.deep.equal({
        firstNameOnCard: 'Amber',
        lastNameOnCard: 'Awesome'
      });
    });

    it('should return correct first name and last name of card when name on Card has multiple space inside', () => {
      const nameOnCard = 'Amber     Awesome    ';

      expect(splitNameOnCard(nameOnCard)).to.deep.equal({
        firstNameOnCard: 'Amber',
        lastNameOnCard: 'Awesome'
      });
    });
  });

  context('doesCreditCardNeedCVV', () => {
    it('should not require cvv for UATP card', () => {
      expect(doesCreditCardNeedCVV(mockData.valid.UATP[0])).to.be.false;
    });

    it('should not require cvv if card number is empty', () => {
      expect(doesCreditCardNeedCVV('')).to.be.false;
    });

    it('should not require cvv if card number is invalid', () => {
      expect(doesCreditCardNeedCVV(mockData.invalid.VISA[0])).to.be.false;
    });

    it('should require cvv if card number is valid and not UATP', () => {
      expect(doesCreditCardNeedCVV(mockData.valid.VISA[0])).to.be.true;
      expect(doesCreditCardNeedCVV(mockData.valid.AMEX[0])).to.be.true;
      expect(doesCreditCardNeedCVV(mockData.valid.MASTERCARD[0])).to.be.true;
      expect(doesCreditCardNeedCVV(mockData.valid.DINERS[0])).to.be.true;
      expect(doesCreditCardNeedCVV(mockData.valid.DISCOVER[0])).to.be.true;
    });
  });

  context('doesNewCreditCardNeedCVV', () => {
    it('should not show cvv for UATP card', () => {
      expect(doesNewCreditCardNeedCVV(mockData.valid.UATP[0])).to.be.false;
    });

    it('should show cvv if card number is empty', () => {
      expect(doesNewCreditCardNeedCVV('')).to.be.true;
    });

    it('should show cvv if card number is not UATP', () => {
      expect(doesNewCreditCardNeedCVV(mockData.valid.VISA[0])).to.be.true;
      expect(doesNewCreditCardNeedCVV(mockData.valid.AMEX[0])).to.be.true;
      expect(doesNewCreditCardNeedCVV(mockData.valid.MASTERCARD[0])).to.be.true;
      expect(doesNewCreditCardNeedCVV(mockData.valid.DINERS[0])).to.be.true;
      expect(doesNewCreditCardNeedCVV(mockData.valid.DISCOVER[0])).to.be.true;
    });
  });

  context('isSavedCreditCardThatRequiresCVV', () => {
    it('should return false when payment is empty', () => {
      const payment = {};

      expect(isSavedCreditCardThatRequiresCVV(payment, true)).to.be.false;
    });

    it('should return false when selectedCardId is empty', () => {
      const payment = { selectedCardId: null };

      expect(isSavedCreditCardThatRequiresCVV(payment, true)).to.be.false;
    });

    it('should return false when selectedCardId is NEW_CREDIT_CARD_ID', () => {
      const payment = {
        selectedCardId: 'NEW_CREDIT_CARD_ID'
      };

      expect(isSavedCreditCardThatRequiresCVV(payment, true)).to.be.false;
    });

    it('should return false when selectedCardId is Chase instant credit card', () => {
      const payment = {
        selectedCardId: 'haha',
        creditCardType: 'INSTANT_CREDIT_RAPID_REWARDS_VISA'
      };

      expect(isSavedCreditCardThatRequiresCVV(payment, true)).to.be.false;
    });

    it('should return false when selectedCardId is UATP', () => {
      const payment = {
        selectedCardId: 'haha',
        creditCardType: 'UATP'
      };

      expect(isSavedCreditCardThatRequiresCVV(payment, true)).to.be.false;
    });

    it('should return false when selectedCardId is Visa', () => {
      const payment = {
        selectedCardId: 'haha',
        creditCardType: 'Visa'
      };

      expect(isSavedCreditCardThatRequiresCVV(payment, true)).to.be.true;
    });

    it('should return false when requireSecurityCode is false', () => {
      const payment = {
        selectedCardId: 'haha',
        creditCardType: 'Visa'
      };

      expect(isSavedCreditCardThatRequiresCVV(payment, false)).to.be.false;
    });
  });

  context('needToSaveForPrimary', () => {
    it('should return false when payment is empty', () => {
      const payment = {};
      const savedCreditCards = {};

      expect(needToSaveForPrimary(payment, savedCreditCards)).to.be.false;
    });

    it('should return false when other cards exist', () => {
      const payment = {};
      const savedCreditCards = { otherCards: [{ selectedCardId: 'haha' }] };

      expect(needToSaveForPrimary(payment, savedCreditCards)).to.be.false;
    });

    it('should return false when primary card exists', () => {
      const payment = {};
      const savedCreditCards = { primaryCard: { selectedCardId: 'haha' } };

      expect(needToSaveForPrimary(payment, savedCreditCards)).to.be.false;
    });

    it('should return true when payment should store and no saved cards', () => {
      const payment = {
        intentToStore: true
      };
      const savedCreditCards = {};

      expect(needToSaveForPrimary(payment, savedCreditCards)).to.be.true;
    });
  });

  context('generateNewCreditCardInfo', () => {
    it('should generate right format of new credit card for paymentInfo', () => {
      const paymentInfo = getPaymentInfoForUseNewCreditCard();

      expect(generateNewCreditCardInfo(paymentInfo)).to.deep.equal({
        billingContactInfo: {
          address: {
            addressLine1: 'asdfafa',
            addressLine2: null,
            city: 'Brooklyn',
            isoCountryCode: 'US',
            stateProvinceRegion: 'AS',
            zipOrPostalCode: '12312'
          },
          firstName: 'adfds',
          lastName: 'gfd',
          phoneNumber: '5555555555'
        },
        cardNumber: '4123456789012',
        creditCardType: 'VISA',
        expiration: '2029-10',
        securityCode: '123',
        intentToStore: false,
        isPrimary: false
      });
    });

    it('should not return securityCode if securityCode in paymentInfo is empty', () => {
      const paymentInfo = getPaymentInfoForUseNewCreditCard();

      paymentInfo.securityCode = '';
      expect(generateNewCreditCardInfo(paymentInfo)).not.to.include({ securityCode: '' });
    });
  });

  context('generateUatpCardInfo', () => {
    it('should generate correct format for APPLE_PAY digital payment type', () => {
      const applePayCard = getApplePayCard();

      expect(generateUatpCardInfo(applePayCard, creditCardTypes.APPLE_PAY.key)).to.deep.equal({
        billingContactInfo: {
          firstName: 'First',
          lastName: 'Last',
          address: {
            addressLine1: '1234 Test Ln',
            addressLine2: '',
            city: 'Dallas',
            isoCountryCode: 'US',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '12312'
          }
        },
        cardNumber: '123456',
        creditCardType: creditCardTypes.UATP.key,
        digitalPaymentType: creditCardTypes.APPLE_PAY.key,
        digitalTransactionId: '123456',
        expiration: '2020-01'
      });
    });

    it('should generate correct format for upliftCard', () => {
      const upliftCard = getUpliftCard();

      expect(generateUatpCardInfo(upliftCard, creditCardTypes.UPLIFT.key)).to.deep.equal({
        billingContactInfo: {
          address: {
            addressLine1: '1234 Test Ln',
            addressLine2: '',
            city: 'Dallas',
            isoCountryCode: 'US',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '12312'
          },
          firstName: 'First',
          lastName: 'Last'
        },
        creditCardType: creditCardTypes.UATP.key,
        digitalPaymentType: creditCardTypes.UPLIFT.key,
        digitalTransactionId: undefined,
        cardNumber: '123456',
        expiration: '2020-01'
      });
    });
  });

  context('getCardNameByType', () => {
    it('should return the Name for the payPal payment', () => {
      const result = getCardNameByType('PAYPAL');

      expect(result).to.equal('Use PayPal');
    });

    it('should return the an empty string for a non existant type', () => {
      const result = getCardNameByType('TEST');

      expect(result).to.equal('');
    });
  });

  context('getCardShortNameByType', () => {
    it('should return the shortName for the payPal payment', () => {
      const result = getCardShortNameByType('PAYPAL');

      expect(result).to.equal('PayPal');
    });

    it('should return the an empty string for a non existant type', () => {
      const result = getCardShortNameByType('TEST');

      expect(result).to.equal('');
    });
  });

  function mockDataIterator(data, callback) {
    _.forEach(data, (value, key) => {
      value.forEach((v) => {
        callback(v, key);
      });
    });
  }
});
