import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import TitleAndPrice from 'src/shared/components/flightSummary/titleAndPrice';

describe('titleAndPrice Component', () => {
  it(`should display message when we passing the message prop`, () => {
    const component = createComponent({ message: '2 Passenger Total' });

    expect(component.find('.title-and-price > span')).to.have.text('2 Passenger Total');
  });

  it('should display point amount when we passing currency have point information', () => {
    const component = createComponent({ currency: { amount: '36,192', currencyCode: 'PTS' } });

    expect(component.find('Currency')).to.have.text('36,192');
  });

  it('should display dollars amount and symbol when we passing currency have money information', () => {
    const component = createComponent({ currency: { amount: '189.30', currencyCode: 'USD', currencySymbol: '$' } });

    expect(component.find('Currency')).to.have.text('$189.30');
  });

  const createComponent = (props) => {
    const defaultProps = {
      message: '1 Passenger Total',
      currency: {
        amount: '21.20',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };

    return mount(<TitleAndPrice {..._.merge({}, defaultProps, props)} />);
  };
});
