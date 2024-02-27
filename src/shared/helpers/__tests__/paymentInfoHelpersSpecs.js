import {
  getShouldSaveCreditCard,
  shouldShowBackToTopButton,
  shouldShowBackToTopButtonForWAPI
} from 'src/shared/helpers/paymentInfoHelplers';

describe('getShouldSaveCreditCard', () => {
  context('getShouldSaveCreditCard', () => {
    it('should return true when paymentinfo intentToStore is `true`', () => {
      expect(getShouldSaveCreditCard({ intentToStore: 'true' })).to.be.true;
    });

    it('should return false when paymentinfo intentToStore is `false`', () => {
      expect(getShouldSaveCreditCard({ intentToStore: 'false' })).to.be.false;
    });
  });

  context('shouldShowBackToTopButtonForWAPI', () => {
    it('should return false when user is not logged in', () => {
      expect(shouldShowBackToTopButtonForWAPI({}, [{}, {}], false)).to.be.false;
    });

    it('should return false when savedCreditCards is empty', () => {
      expect(shouldShowBackToTopButtonForWAPI({}, [], false)).to.be.false;
    });

    it('should return false when paymentInfo contain selected credit card', () => {
      expect(shouldShowBackToTopButtonForWAPI({ selectedCardId: '1-WHO1S1' }, [{}, {}], true)).to.be.false;
    });

    it('should return true when user is logged in and have saved credit cards and there is no selected card', () => {
      expect(shouldShowBackToTopButtonForWAPI({ selectedCardId: '' }, [{}, {}], true)).to.be.true;
      expect(shouldShowBackToTopButtonForWAPI({}, [{}, {}], true)).to.be.true;
    });

    it('should return false if paymentInfo is undefined, such as after user delete tht last credit card', () => {
      expect(shouldShowBackToTopButtonForWAPI(undefined, [], true)).to.be.false;
    });
  });

  context('shouldShowBackToTopButton', () => {
    it('should return false when user is not logged in', () => {
      expect(shouldShowBackToTopButton('NEW_CREDIT_CARD_ID', { primaryCard: { cardId: 'a' } }, false)).to.be.false;
    });

    it('should return false when savedCreditCards is empty', () => {
      expect(shouldShowBackToTopButton('', {}, false)).to.be.false;
    });

    it('should return false when selected saved credit card', () => {
      expect(shouldShowBackToTopButton('1-WHO1S1', { primaryCard: { cardId: 'a' } }, true)).to.be.false;
    });

    it('should return true when user is logged in and have saved credit cards and use new credigt card', () => {
      expect(shouldShowBackToTopButton('NEW_CREDIT_CARD_ID', { primaryCard: { cardId: 'a' } }, true)).to.be.true;
    });

    it('should return false if selected is undefined, such as after user delete tht last credit card', () => {
      expect(shouldShowBackToTopButton(undefined, { primaryCard: { cardId: 'a' } }, true)).to.be.false;
    });
  });
});
