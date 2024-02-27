import _ from 'lodash';
import { getNewApplePayCard, getIsApplePayCardValid } from 'src/shared/helpers/applePayHelper';
import { getApplePayCard, getNativeApplePayCard } from 'test/builders/model/paymentInfoBuilder';

describe('ApplePayHelper', () => {
  context('getNewApplePayCard', () => {
    context('if mWeb Apple Pay Card', () => {
      let prevCard;
      let newCard;

      beforeEach(() => {
        prevCard = getApplePayCard();
        newCard = getApplePayCard();
      });

      it('should return new card if new card is valid and new token is different than previous token', () => {
        _.set(newCard, 'token.number', '654321');

        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(newCard);
      });

      it('should return new card if previous card is null and new card is valid', () => {
        const result = getNewApplePayCard(null, newCard);

        expect(result).to.eql(newCard);
      });

      it('should return null if new card is not valid', () => {
        newCard = _.omit(newCard, ['token']);

        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(null);
      });

      it('should return null if new token is the same as previous token', () => {
        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(null);
      });

      it('should return null if new card is not valid and new token is the same as previous token', () => {
        newCard = {
          formData: '',
          token: prevCard.token
        };

        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(null);
      });
    });

    context('if Native Apple Pay Card', () => {
      let prevCard;
      let newCard;

      beforeEach(() => {
        prevCard = getNativeApplePayCard();
        newCard = getNativeApplePayCard();
      });

      it('should return new card if new card is valid and new purchase request is different than previous purchase request', () => {
        _.set(newCard, 'purchaseRequest.differentField', '12345');

        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(newCard);
      });

      it('should return new card if previous card is null and new card is valid', () => {
        const result = getNewApplePayCard(null, newCard);

        expect(result).to.eql(newCard);
      });

      it('should return null if new card is not valid', () => {
        newCard = _.omit(newCard, ['purchaseRequest']);

        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(null);
      });

      it('should return null if new token is the same as previous token', () => {
        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(null);
      });

      it('should return null if new card is not valid and new purchase request is the same as previous purchase request', () => {
        newCard = {
          purchaseRequest: prevCard.purchaseRequest
        };

        const result = getNewApplePayCard(prevCard, newCard);

        expect(result).to.eql(null);
      });
    });

    it('should return null if the new and previous cards are null', () => {
      const result = getNewApplePayCard(null, null);

      expect(result).to.eql(null);
    });
  });

  context('getIsApplePayCardValid', () => {
    it('should return true if apple pay card is valid', () => {
      const validApplyPayCard = getApplePayCard();

      expect(getIsApplePayCardValid(validApplyPayCard)).to.be.true;
    });

    it('should return false if apple pay card is missing fields', () => {
      const invalidApplyPayCard = getApplePayCard();

      _.unset(invalidApplyPayCard, 'token');

      expect(getIsApplePayCardValid(invalidApplyPayCard)).to.be.false;
    });

    it('should return false if apple pay card is null', () => {
      expect(getIsApplePayCardValid(null)).to.be.false;
    });

    it('should return false if apple pay card is undefined', () => {
      expect(getIsApplePayCardValid(undefined)).to.be.false;
    });

    context('if native apple pay card', () => {
      it('should return true if apple pay card is valid', () => {
        const validApplyPayCard = getNativeApplePayCard();

        expect(getIsApplePayCardValid(validApplyPayCard)).to.be.true;
      });

      it('should return false if apple pay card is missing fields', () => {
        const invalidApplyPayCard = getNativeApplePayCard();

        _.unset(invalidApplyPayCard, 'purchaseRequest');

        expect(getIsApplePayCardValid(invalidApplyPayCard)).to.be.false;
      });
    });
  });
});
