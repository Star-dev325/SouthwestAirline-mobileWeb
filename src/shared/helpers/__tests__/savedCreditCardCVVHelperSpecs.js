import { isSavedCreditCardThatRequiresCVV } from 'src/shared/helpers/savedCreditCardCVVHelper';
import paymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

describe('isSavedCreditCardThatRequiresCVV', () => {
  context('user has saved CC', () => {
    context('and requireSecurityCode is true', () => {
      context('and is not UATP', () => {
        it('should return return true when saved CC has cvvVerified false', () => {
          const mockSavedCreditCards = new paymentSavedCreditCardsBuilder().withPrimaryCardNotCvvVerified().build();

          expect(isSavedCreditCardThatRequiresCVV(mockSavedCreditCards, '1-ENKS4K')).to.be.true;
        });

        it('should return false when saved credit card not reuqire CVV', () => {
          const mockSavedCreditCards = new paymentSavedCreditCardsBuilder().build();

          expect(isSavedCreditCardThatRequiresCVV(mockSavedCreditCards), 'NEW_CREDIT_CARD_ID').to.be.false;
        });
      });

      context('and is UATP', () => {
        it('should return return true when CC cvvVerified false', () => {
          const mockSavedCreditCards = new paymentSavedCreditCardsBuilder().build();

          mockSavedCreditCards.primaryCard.type = 'UATP';
          mockSavedCreditCards.primaryCard.name = 'UATP 9999';
          mockSavedCreditCards.primaryCard.savedCreditCardId = '1-UATPCCID';
          expect(isSavedCreditCardThatRequiresCVV(mockSavedCreditCards), '1-UATPCCID').to.be.false;
        });
      });
    });
  });

  context('user has no saved CCs', () => {
    let savedCreditCards;

    beforeEach(() => {
      savedCreditCards = {
        primaryCard: undefined,
        otherCards: [],
        requireSecurityCode: true
      };
    });

    it('should return false', () => {
      expect(isSavedCreditCardThatRequiresCVV(savedCreditCards)).to.be.false;
    });
  });
});
