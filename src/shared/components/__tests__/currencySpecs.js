import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import Currency from 'src/shared/components/currency';

describe('Currency', () => {
  const createComponent = (props) => {
    const defaultProps = {
      amount: '100.00',
      currencyCode: 'PTS',
      currencySymbol: null
    };

    return mount(<Currency {..._.merge(defaultProps, props)} />);
  };

  context('rendering currency in dollars', () => {
    it('should return zero dollar currency by default', () => {
      const currencyComponent = mount(<Currency />);

      expect(currencyComponent).to.have.text('$0.00');
    });

    it('should return formatted currency in dollars with the currency symbol', () => {
      const currencyComponent = createComponent({
        amount: '1000.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });

      expect(currencyComponent).to.have.text('$1000.00');
    });

    it('should ceil the amount when need ceil and not use points', () => {
      const currencyComponent = createComponent({
        amount: '409.48',
        currencyCode: 'USD',
        currencySymbol: '$',
        ceil: true
      });

      expect(currencyComponent).to.have.text('$410');
    });

    it('should not ceil the amount when need ceil but use points', () => {
      const currencyComponent = createComponent({
        amount: '40,948',
        currencyCode: 'PTS',
        ceil: true
      });

      expect(currencyComponent).to.have.text('40,948');
    });
  });

  context('rendering currency in points', () => {
    it('should return formatted currency in points without PTS suffix', () => {
      const currencyComponent = createComponent();

      expect(currencyComponent).to.have.text('100.00');
    });

    it('should return formatted currency in points with PTS suffix', () => {
      const currencyComponent = createComponent({ showPts: true });

      expect(currencyComponent).to.have.text('100.00PTS');
    });
  });

  context('prefix, suffix, and sign', () => {
    it('should display prefix and suffix when pass prefix or suffix', () => {
      const currencyComponent = createComponent({
        prefix: '(+',
        suffix: ')'
      });

      expect(currencyComponent).to.have.text('(+100.00)');
    });

    it('should display a negative sign when passed in', () => {
      const currencyComponent = createComponent({
        prefix: '-',
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });

      expect(currencyComponent).to.have.text('-$100.00');
    });

    it('should display a %%% sign when passed in', () => {
      const currencyComponent = createComponent({
        sign: '%%%',
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });

      expect(currencyComponent).to.have.text('%%%$100.00');
    });
  });
});
