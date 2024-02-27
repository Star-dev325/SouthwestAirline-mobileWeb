// @flow
import React from 'react';
import { getCardNameByType } from 'src/shared/helpers/creditCardHelper';

type Props = {
  creditCardType: string,
  lastFourDigitsOfCreditCard: string
};

const CreditCardTypeAndNumber = (props: Props) => {
  const { creditCardType, lastFourDigitsOfCreditCard } = props;

  return (
    <div className="credit-card-type-and-number">
      <span>{getCardNameByType(creditCardType)}</span>
      <span className="right">{`**** **** **** ${lastFourDigitsOfCreditCard}`}</span>
    </div>
  );
};

export default CreditCardTypeAndNumber;
