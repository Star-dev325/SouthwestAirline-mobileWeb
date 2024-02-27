import FakeClock from 'test/unit/helpers/fakeClock';
import SavedCreditCardsBuilderForWAPI from 'test/builders/model/savedCreditCardsBuilderForWAPI';
import CreditCardUpdateInfoBuilder from 'test/builders/model/creditCardUpdateInfoBuilder';
import {
  transformToUpdateCreditCardApiRequestForChapi,
  transformToUpdateCreditCardFormDataForChapi
} from 'src/shared/transformers/savedCreditCardTransformer';

describe('savedCreditCardTransformer', () => {
  context('transformToUpdateCreditCardFormDataForChapi', () => {
    afterEach(() => {
      FakeClock.restore();
    });

    it('should convert single credit card to update credit card form data', () => {
      FakeClock.setTimeTo('2018-01-04T11:19');
      const creditCardToUpdate = new CreditCardUpdateInfoBuilder().build();

      const result = transformToUpdateCreditCardFormDataForChapi(creditCardToUpdate);

      expect(result).to.deep.equal({
        addressLine1: '956 Main St',
        addressLine2: '',
        city: 'Brooklyn',
        creditCardType: 'VISA',
        expiration: '2021-05',
        isoCountryCode: 'US',
        lastFourDigitsOfCreditCard: '9999',
        nameOnCard: 'Li Rui',
        stateProvinceRegion: 'NY',
        zipOrPostalCode: '37693'
      });
    });
  });

  context('transformToUpdateCreditCardApiRequestForChapi', () => {
    it('should transform update credit card form data to request data', () => {
      const updateCreditCardFormData = SavedCreditCardsBuilderForWAPI.getUpdateCreditCardFormData();

      expect(transformToUpdateCreditCardApiRequestForChapi(updateCreditCardFormData)).to.deep.equal({
        creditCardPayment: {
          creditCardType: 'VISA',
          expiration: '2020-10',
          savedCreditCardId: '1-ENKS4K',
          cardDescription: 'VISA 1111'
        },
        billingContactInfo: {
          firstName: 'Ron',
          lastName: 'Hackmann',
          address: {
            addressLine1: 'this is address line one',
            addressLine2: 'this is address line two',
            city: 'Dallas',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '54321',
            isoCountryCode: 'US'
          }
        }
      });
    });
  });
});
