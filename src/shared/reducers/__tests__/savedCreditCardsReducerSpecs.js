import savedCreditCardsReducer from 'src/shared/reducers/savedCreditCardsReducer';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import PaymentSavedCreditCardsBuilder from 'test/builders/model/paymentSavedCreditCardsBuilder';

describe('savedCreditCardsReducer', () => {
  const paymentSavedCreditCardsPage = new PaymentSavedCreditCardsBuilder().build();

  it('should return saved credit cards when set saved credit cards', () => {
    expect(
      savedCreditCardsReducer(undefined, {
        type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
        paymentSavedCreditCardsPage
      })
    ).to.be.deep.equal(paymentSavedCreditCardsPage);
  });

  it('should return saved credit cards when fetch saved credit cards and passenger info success', () => {
    expect(
      savedCreditCardsReducer(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
        paymentSavedCreditCardsPage
      })
    ).to.be.deep.equal(paymentSavedCreditCardsPage);
  });

  it('should return saved credit cards when fetch saved credit cards success', () => {
    expect(
      savedCreditCardsReducer(undefined, {
        type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS,
        response: paymentSavedCreditCardsPage
      })
    ).to.be.deep.equal(paymentSavedCreditCardsPage);
  });

  it('should clear saved credit cards when reset payment info', () => {
    expect(
      savedCreditCardsReducer(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__RESET_PAYMENT_INFO,
        paymentSavedCreditCardsPage
      })
    ).to.be.deep.equal({
      otherCards: [],
      primaryCard: null
    });
  });

  it('should clear saved credit cards when reset saved credit cards', () => {
    expect(
      savedCreditCardsReducer(undefined, {
        type: CreditCardActionTypes.CREDIT_CARD__RESET_SAVED_CREDIT_CARDS,
        paymentSavedCreditCardsPage
      })
    ).to.be.deep.equal({
      otherCards: [],
      primaryCard: null
    });
  });

  it('should return initial saved credit cards data when user does not have any saved credit cards', () => {
    expect(
      savedCreditCardsReducer(undefined, {
        type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS,
        response: null
      })
    ).to.be.deep.equal({
      otherCards: [],
      primaryCard: null
    });

    expect(
      savedCreditCardsReducer(undefined, {
        type: AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS,
        paymentSavedCreditCardsPage: null
      })
    ).to.be.deep.equal({
      otherCards: [],
      primaryCard: null
    });
  });

  it('should return default state when action is undefined', () => {
    expect(savedCreditCardsReducer()).to.deep.equal({
      otherCards: [],
      primaryCard: null
    });
  });
});
