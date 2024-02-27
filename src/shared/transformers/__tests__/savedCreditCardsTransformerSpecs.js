import { INSTANT_CREDIT_RAPID_REWARDS_VISA } from 'src/shared/constants/creditCardTypes';

describe('savedCreditCardsTransformer', () => {
  let groupedSavedCreditCards, savedCreditCards, SavedCreditCardsTransformer;

  beforeEach(() => {
    SavedCreditCardsTransformer = require('src/shared/transformers/savedCreditCardsTransformer');
  });

  context('groupedSavedCreditCards', () => {
    context('when we have api response with at least one primary card', () => {
      beforeEach(() => {
        savedCreditCards = [
          {
            cardDescription: 'hehe',
            creditCardType: 'VISA',
            isPrimary: true
          }
        ];

        groupedSavedCreditCards = SavedCreditCardsTransformer.groupCreditCards(savedCreditCards);
      });

      it('should set the credit card with isPrimary=true as primary card', () => {
        expect(groupedSavedCreditCards.primaryCard).to.not.be.null;
      });

      it('should not have other credit cards if there is only one credit card', () => {
        expect(groupedSavedCreditCards.cardsWithoutPrimary.length).to.deep.equal(0);
      });

      it('should set the cards that have isPrimary=false to cardsWithoutPrimary', () => {
        const primaryCard = {
          cardDescription: 'hehe',
          creditCardType: 'VISA',
          isPrimary: true
        };
        const notPrimaryCard = {
          cardDescription: 'hehe',
          creditCardType: 'MASTER',
          isPrimary: false
        };

        savedCreditCards = [primaryCard, notPrimaryCard];

        groupedSavedCreditCards = SavedCreditCardsTransformer.groupCreditCards(savedCreditCards);

        expect(groupedSavedCreditCards.cardsWithoutPrimary).to.have.lengthOf(1);
        expect(groupedSavedCreditCards.cardsWithoutPrimary).to.be.deep.equal([notPrimaryCard]);
      });
    });

    context('when we have api response without a primary card', () => {
      const firstNonPrimaryCard = {
        cardDescription: 'hehe',
        creditCardType: 'VISA',
        isPrimary: false
      };
      const secondNonPrimaryCard = {
        cardDescription: 'hehe',
        creditCardType: 'MASTER',
        isPrimary: false
      };

      it('shoud set the primary card to the first of the cards with isPrimary=false', () => {
        const savedCreditCards = [firstNonPrimaryCard, secondNonPrimaryCard];

        groupedSavedCreditCards = SavedCreditCardsTransformer.groupCreditCards(savedCreditCards);

        expect(groupedSavedCreditCards.primaryCard).to.be.equal(firstNonPrimaryCard);
      });

      it('should not show the first non-primary card as cardsWithoutPrimary because we used it to be primary card', () => {
        const savedCreditCards = [firstNonPrimaryCard, secondNonPrimaryCard];

        groupedSavedCreditCards = SavedCreditCardsTransformer.groupCreditCards(savedCreditCards);

        expect(groupedSavedCreditCards.cardsWithoutPrimary).to.have.lengthOf(1);
        expect(groupedSavedCreditCards.cardsWithoutPrimary).to.be.deep.equal([secondNonPrimaryCard]);
      });

      it('should set primaryCard and cardsWithoutPrimary to undefined when rapidRewardsCard is the only savedCreditCards', () => {
        const rapidRewardsCard = {
          cardDescription: INSTANT_CREDIT_RAPID_REWARDS_VISA.name,
          creditCardType: INSTANT_CREDIT_RAPID_REWARDS_VISA.key,
          savedCreditCardId: INSTANT_CREDIT_RAPID_REWARDS_VISA.key,
          lastFourDigitsOfCreditCard: '',
          isInstantCreditRapidRewardsCard: true,
          billingAddress: {},
          cardHolder: {
            firstName: '',
            lastName: ''
          }
        };

        savedCreditCards = [rapidRewardsCard];

        groupedSavedCreditCards = SavedCreditCardsTransformer.groupCreditCards(savedCreditCards);

        expect(groupedSavedCreditCards.rapidRewardsCard).to.deep.equal(rapidRewardsCard);
        expect(groupedSavedCreditCards.primaryCard).to.be.undefined;
        expect(groupedSavedCreditCards.cardsWithoutPrimary).to.deep.equal([]);
      });
    });

    context('chase instant credit rapid rewards scenarios', () => {
      beforeEach(() => {
        const primaryCard = {
          cardDescription: 'hehe',
          creditCardType: 'VISA',
          isPrimary: true
        };
        const notPrimaryCard = {
          cardDescription: 'hehe',
          creditCardType: 'MASTER',
          isPrimary: false
        };

        savedCreditCards = [primaryCard, notPrimaryCard];
      });

      it('should set rapidRewardsCard when the rapid rewards card is in the list', () => {
        const rapidRewardsCard = {
          cardDescription: INSTANT_CREDIT_RAPID_REWARDS_VISA.name,
          creditCardType: INSTANT_CREDIT_RAPID_REWARDS_VISA.key,
          savedCreditCardId: INSTANT_CREDIT_RAPID_REWARDS_VISA.key,
          lastFourDigitsOfCreditCard: '',
          isInstantCreditRapidRewardsCard: true,
          billingAddress: {},
          cardHolder: {
            firstName: '',
            lastName: ''
          }
        };

        savedCreditCards.unshift(rapidRewardsCard);

        groupedSavedCreditCards = SavedCreditCardsTransformer.groupCreditCards(savedCreditCards);

        expect(groupedSavedCreditCards.rapidRewardsCard).to.deep.equal(rapidRewardsCard);
      });

      it('should set rapidRewardsCard to undefined if card is not in the list', () => {
        groupedSavedCreditCards = SavedCreditCardsTransformer.groupCreditCards(savedCreditCards);

        expect(groupedSavedCreditCards.rapidRewardsCard).to.be.undefined;
      });
    });
  });
});
