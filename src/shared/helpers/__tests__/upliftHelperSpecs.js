import _ from 'lodash';
import { getUpliftCard } from 'test/builders/model/paymentInfoBuilder';
import { getNewUpliftCard } from 'src/shared/helpers/upliftHelper';

describe('UpliftHelper', () => {
  context('getNewUpliftCard', () => {
    let prevCard;
    let newCard;

    beforeEach(() => {
      prevCard = getUpliftCard();
      newCard = getUpliftCard();
    });

    it('should return new card if new card is valid and new token is different than previous token', () => {
      _.set(newCard, 'token.number', '654321');

      const result = getNewUpliftCard(prevCard, newCard);

      expect(result).to.eql(newCard);
    });

    it('should return new card if previous card is null and new card is valid', () => {
      const result = getNewUpliftCard(null, newCard);

      expect(result).to.eql(newCard);
    });

    it('should return null if new card is not valid', () => {
      newCard = _.omit(newCard, ['token']);

      const result = getNewUpliftCard(prevCard, newCard);

      expect(result).to.eql(null);
    });

    it('should return null if new token is the same as previous token', () => {
      const result = getNewUpliftCard(prevCard, newCard);

      expect(result).to.eql(null);
    });

    it('should return null if new card is not valid and new token is the same as previous token', () => {
      newCard = {
        formData: '',
        token: prevCard.token
      };

      const result = getNewUpliftCard(prevCard, newCard);

      expect(result).to.eql(null);
    });
  });

  it('should return null if the new and previous cards are null', () => {
    const result = getNewUpliftCard(null, null);

    expect(result).to.eql(null);
  });
});
