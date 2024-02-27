import { shallow } from 'enzyme';
import React from 'react';
import PriceTotalLine from 'src/shared/components/priceTotalLine';

describe('PriceTotalLine', () => {
  context('render', () => {
    it('should render title', () => {
      const priceTotalLineWrapper = createComponent();

      expect(priceTotalLineWrapper.find('.price-line--title')).to.have.text('Title');
    });

    it('should render given style', () => {
      const priceTotalLineWrapper = createComponent();

      expect(priceTotalLineWrapper.find('.className')).to.exist;
    });

    it('should render Currency', () => {
      const priceTotalLineWrapper = createComponent();

      expect(priceTotalLineWrapper.find('Currency')).to.be.present();
    });

    it('should NOT render Currency when total not exists', () => {
      const priceTotalLineWrapper = createComponent({ total: null });

      expect(priceTotalLineWrapper.find('Currency')).to.be.not.present();
    });

    it('should pass prefix and suffix to Currency when showTravelFundAppliedFormat is true', () => {
      const priceTotalLineWrapper = createComponent({ showTravelFundAppliedFormat: true });

      expect(priceTotalLineWrapper.find('Currency')).to.have.props({ prefix: '-' });
    });

    it('should not pass prefix and suffix to Currency when showTravelFundAppliedFormat is false', () => {
      const priceTotalLineWrapper = createComponent({ showTravelFundAppliedFormat: false });

      expect(priceTotalLineWrapper.find('Currency')).to.not.have.prop('prefix');
      expect(priceTotalLineWrapper.find('Currency')).to.not.have.prop('suffix');
    });

    it('should render total passengers number when passenger count is not empty', () => {
      const priceTotalLineWrapper = createComponent({ passengerCount: 1, passengerType: 'Passenger' });

      expect(priceTotalLineWrapper.find('.price-line-sub-title')).to.be.present();
    });

    it('should not render total passenger number when passenger count is undefined', () => {
      const priceTotalLineWrapper = createComponent();

      expect(priceTotalLineWrapper.find('.price-line-sub-title')).to.be.not.present();
    });
  });

  context('render points', () => {
    it('should render without pts suffix', () => {
      const props = {
        pointsTotal: {
          amount: '12,345',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      };

      const priceTotalLineWrapper = createComponent(props);

      expect(priceTotalLineWrapper.find('Currency').first()).to.have.prop('showPts', false);
    });

    it('should render pointsTotal amount line when pointsTotal is truthy (with pts suffix)', () => {
      const props = {
        pointsTotal: {
          amount: '12,345',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        showPts: true
      };

      const priceTotalLineWrapper = createComponent(props);

      expect(priceTotalLineWrapper.find('Currency').first()).to.have.prop('showPts', true);
    });

    it('should render total line in amount section when total is truthy', () => {
      const props = {
        total: {
          amount: '10,000',
          currencyCode: 'PTS',
          currencySymbol: null
        }
      };

      const priceTotalLineWrapper = createComponent(props);

      expect(priceTotalLineWrapper.find('Currency').first()).to.have.prop('amount', '10,000');
    });

    it('should render taxCreditRefund line in amount section when taxCreditRefund is truthy', () => {
      const props = {
        taxCreditRefund: {
          amount: '2,000',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        showPts: true
      };

      const priceTotalLineWrapper = createComponent(props);

      expect(priceTotalLineWrapper.find('Currency').at(1)).to.have.prop('amount', '2,000');
    });

    it('should not render a line in amount section when taxCreditRefund, total, or pointsTotal is falsey', () => {
      const props = {
        pointsTotal: null,
        total: null,
        taxCreditRefund: null
      };

      const priceTotalLineWrapper = createComponent(props);

      expect(priceTotalLineWrapper.find('Currency').first()).be.not.present();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      title: 'Title',
      total: {
        amount: '123.4',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      type: 'total',
      className: 'className'
    };

    const finalProps = { ...defaultProps, ...props };

    return shallow(<PriceTotalLine { ...finalProps } />);
  };
});
