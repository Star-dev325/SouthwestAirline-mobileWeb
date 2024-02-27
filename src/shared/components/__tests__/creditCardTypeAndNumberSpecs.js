import React from 'react';
import { shallow } from 'enzyme';
import CreditCardTypeAndNumber from 'src/shared/components/creditCardTypeAndNumber';

describe('creditCardTypeAndNumber', () => {
  context('render', () => {
    let component;

    beforeEach(() => {
      const props = {
        creditCardType: 'VISA',
        lastFourDigitsOfCreditCard: '1111'
      };

      component = shallow(<CreditCardTypeAndNumber {...props} />);
    });

    it('should render card type use display name', () => {
      const cardType = component.find('span').first();

      expect(cardType).to.have.text('Visa');
    });

    it('should render card number with mask', () => {
      const cardNumber = component.find('span').at(1);

      expect(cardNumber).to.have.text('**** **** **** 1111');
    });
  });
});
