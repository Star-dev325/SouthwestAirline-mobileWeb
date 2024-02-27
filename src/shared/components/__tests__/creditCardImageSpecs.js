import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';

import CreditCardImage from 'src/shared/components/creditCardImage';

describe('CreditCardImage', () => {
  it('should not render the component if cardType does not exist', () => {
    const component = createComponent({ cardType: null });

    expect(component.type()).to.equal(null);
  });

  it('should render the component if cardType exists', () => {
    const component = createComponent();

    expect(component.type()).to.not.equal(null);
  });

  it('use icon component to display svg', () => {
    const component = createComponent({ cardType: 'SPLIT_PAYMENT', showIcon: true });

    expect(component.find('Icon')).to.have.className('travel-fund--points-icon');
  });

  describe('getImageClass', () => {
    it('should render associated classname with cardtype if not TRAVEL_FUNDS', () => {
      const component = createComponent({ cardType: 'VISA' });

      expect(component.find('div')).to.have.className('credit-card--image_visa');
    });

    describe('cardType is TRAVEL_FUNDS', () => {
      it('should render original image if leisureFund is null', () => {
        const component = createComponent();

        expect(component.find('div')).to.have.className('travel-fund--image_rtf');
      });

      it('should render leisure fund if leisureFund is true', () => {
        const component = createComponent({ leisureFund: true });

        expect(component.find('div')).to.have.className('travel-fund--image_rtf-leisure');
      });

      it('should render leisure fund if leisureFund is false', () => {
        const component = createComponent({ leisureFund: false });

        expect(component.find('div')).to.have.className('travel-fund--image_rtf-not-leisure');
      });
    });

    describe('card type is for promo codes', () => {
      it('should render original image for revenue promo code', () => {
        const component = createComponent({ cardType: 'REVENUE' });

        expect(component.find('div')).to.have.className('promo-codes--image_dollar');
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      cardType: 'TRAVEL_FUNDS',
      leisureFund: null
    };
    const mergedProps = _.merge({}, defaultProps, props);

    return shallow(<CreditCardImage {...mergedProps} />);
  };
});
