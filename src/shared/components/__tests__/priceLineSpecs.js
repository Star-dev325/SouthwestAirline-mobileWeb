import React from 'react';
import PriceLine from 'src/shared/components/priceLine';
import { shallow } from 'enzyme';

describe('PriceLine', () => {
  const total = {
    amount: '123.4',
    currencyCode: 'USD',
    currencySymbol: '$'
  };
  const title = 'Title';

  it('should not render sign when there is no prop sign', () => {
    const priceLineWrapper = shallow(<PriceLine total={total} title={title} />);

    expect(priceLineWrapper.find('.price-line').find('span')).to.have.text('Title');
  });

  it('should render sign + when prop sign is `+`', () => {
    const priceLineWrapper = shallow(<PriceLine sign="+" total={total} title={title} />);

    expect(priceLineWrapper.find('.price-line').find('span')).to.have.text('+ Title');
  });

  it('should have classname negative when prop sign is `-`', () => {
    const priceLineWrapper = shallow(<PriceLine sign="-" total={total} title={title} />);

    expect(priceLineWrapper.find('.negative')).to.have.length(1);
  });

  it('should render Currency', () => {
    const priceLineWrapper = shallow(<PriceLine sign="+" total={total} title={title} />);

    expect(priceLineWrapper.find('Currency')).to.be.present();
  });
});
