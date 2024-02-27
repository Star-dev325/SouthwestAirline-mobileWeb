import { toEditModeButtonStatus } from 'src/airBooking/transformers/savedCreditCardsTransformer';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';
import PaymentSavedCreditCardBuilder from 'test/builders/model/paymentSavedCreditCardBuilder';

describe('SavedCreditCardsTransformer', () => {
  context('toEditModeButtonStatus', () => {
    const savedCreditCards = new PaymentSavedCreditCardsBuilder()
      .withPrimaryCard(new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-IOE15A').build())
      .withOtherCards([
        new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-IZW0CM').build(),
        new PaymentSavedCreditCardBuilder().withSavedCreditCardId('1-QWERTY').withExpired().build()
      ])
      .build();

    it('should enable primary, update and delete when select non-primary card', () => {
      const selectPrimaryCard = ['1-IZW0CM'];

      const buttons = toEditModeButtonStatus(savedCreditCards, selectPrimaryCard);

      expect(buttons).to.deep.equal({
        ['PRIMARY']: true,
        ['UPDATE']: true,
        ['DELETE']: true
      });
    });

    it('should only enable update and delete when select primary card', () => {
      const selectPrimaryCard = ['1-IOE15A'];

      const buttons = toEditModeButtonStatus(savedCreditCards, selectPrimaryCard);

      expect(buttons).to.deep.equal({
        ['PRIMARY']: false,
        ['UPDATE']: true,
        ['DELETE']: true
      });
    });

    it('should only enable update and delete when select expired card', () => {
      const selectPrimaryCard = ['1-QWERTY'];

      const buttons = toEditModeButtonStatus(savedCreditCards, selectPrimaryCard);

      expect(buttons).to.deep.equal({
        ['PRIMARY']: false,
        ['UPDATE']: true,
        ['DELETE']: true
      });
    });

    it('should only enable delete when select multiple cards', () => {
      const multipleCards = ['1-IOE15A', '1-IZW0CM'];

      const buttons = toEditModeButtonStatus(savedCreditCards, multipleCards);

      expect(buttons).to.deep.equal({
        ['PRIMARY']: false,
        ['UPDATE']: false,
        ['DELETE']: true
      });
    });
  });
});
