import React from 'react';
import { shallow } from 'enzyme';

import PriceLedgerLine from 'src/shared/components/priceLedgerLine';

describe('PriceLedgerLine', () => {
  const currencyAmount = {
    amount: '123.45',
    currencyCode: 'USD',
    currencySymbol: '$'
  };
  const title = 'Title';

  it('should render title that is passed in props', () => {
    const wrapper = shallow(<PriceLedgerLine currencyAmount={currencyAmount} title={title} />);

    expect(wrapper.find('div.flex-item-center.large').find('p')).to.have.text('Title');
  });

  it('should render Currency', () => {
    const wrapper = shallow(<PriceLedgerLine currencyAmount={currencyAmount} title={title} />);

    expect(wrapper.find('Currency')).to.be.present();
  });
});
