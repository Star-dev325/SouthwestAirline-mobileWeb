import { transformToPaymentInfo } from 'src/shared/transformers/accountInfoTransformer';

describe('AccountInfoTransformer', () => {
  context('#transformToPaymentInfo', () => {
    it('should return data with correct structure', () => {
      const savedCreditCards = [
        {
          cardDescription: 'test',
          creditCardType: 'VISA',
          lastFourDigitsOfCreditCard: '1112',
          isPrimary: true,
          savedCreditCardId: '1-CP98B4',
          cardHolder: {
            firstName: 'Tim',
            lastName: 'George'
          },
          billingAddress: {
            addressLine1: '554 Lane',
            addressLine2: '',
            city: 'Austin',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '75204',
            addressType: 'HOME',
            isoCountryCode: 'US',
            companyName: null
          }
        }
      ];

      expect(transformToPaymentInfo(savedCreditCards).nameOnCard).to.equal('Tim George');
    });

    it('should set selected card id to instant credit rapid rewards credit card when instant credit card exists', () => {
      const savedCreditCards = [
        {
          cardDescription: 'test',
          creditCardType: 'VISA',
          lastFourDigitsOfCreditCard: '1112',
          isInstantCreditRapidRewardsCard: true,
          savedCreditCardId: 'INSTANT_CREDIT_RAPID_REWARDS_VISA',
          billingAddress: {},
          cardHolder: {}
        },
        {
          cardDescription: 'test',
          creditCardType: 'VISA',
          lastFourDigitsOfCreditCard: '1112',
          isPrimary: true,
          savedCreditCardId: '1-CP98B4',
          cardHolder: {
            firstName: 'Tim',
            lastName: 'George'
          },
          billingAddress: {
            addressLine1: '554 Lane',
            addressLine2: '',
            city: 'Austin',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '75204',
            addressType: 'HOME',
            isoCountryCode: 'US',
            companyName: null
          }
        }
      ];

      expect(transformToPaymentInfo(savedCreditCards).selectedCardId).to.equal('INSTANT_CREDIT_RAPID_REWARDS_VISA');
    });

    it('should set selected card id to primary card when instant credit card does not exists', () => {
      const savedCreditCards = [
        {
          cardDescription: 'test',
          creditCardType: 'VISA',
          lastFourDigitsOfCreditCard: '1112',
          isInstantCreditRapidRewardsCard: false,
          savedCreditCardId: 'INSTANT_CREDIT_RAPID_REWARDS_VISA',
          billingAddress: {},
          cardHolder: {}
        },
        {
          cardDescription: 'test',
          creditCardType: 'VISA',
          lastFourDigitsOfCreditCard: '1112',
          isPrimary: true,
          savedCreditCardId: '1-CP98B4',
          cardHolder: {
            firstName: 'Tim',
            lastName: 'George'
          },
          billingAddress: {
            addressLine1: '554 Lane',
            addressLine2: '',
            city: 'Austin',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '75204',
            addressType: 'HOME',
            isoCountryCode: 'US',
            companyName: null
          }
        }
      ];

      expect(transformToPaymentInfo(savedCreditCards).selectedCardId).to.equal('1-CP98B4');
    });
  });
});
