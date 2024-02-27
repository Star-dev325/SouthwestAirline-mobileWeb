import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import i18n from '@swa-ui/locale';
import React from 'react';
import FarePurchaseInfo from 'src/shared/components/farePurchaseInfo';
import FareProductBuilder from 'test/builders/model/fareProductForChapiBuilder';

describe('FarePurchaseInfo', () => {
  describe('render', () => {
    const priceDifference = {
      amount: '5',
      currencyCode: 'USD',
      currencySymbol: '$',
      sign: '-'
    };

    describe('dollars fare product', () => {
      it('should show available & Unselectable fare purchase info', () => {
        const props = {
          canBeSelected: false,
          fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).build()
        };
        const { container } = createComponent(props);

        expect(container.textContent).toContain('Available');
      });

      it('should show lowest indicator with lowest fare', () => {
        const props = {
          canBeSelected: true,
          fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).withLowestFare().build()
        };
        const { container } = createComponent(props);

        expect(container.textContent).toContain(i18n('AIR_BOOKING__LOW_FARE_UPPERCASE'));
      });

      it('should show available & selectable fair info', () => {
        const props = {
          canBeSelected: true,
          fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).build()
        };

        const { container } = createComponent(props);

        expect(container.textContent).toContain('-$5');
        expect(container.textContent).not.toEqual('LOW FARE');
      });

      it('should show unavailable fair info', () => {
        const props = {
          canBeSelected: true,
          fareProduct: new FareProductBuilder()
            .withPriceDifference(priceDifference)
            .withReasonIfUnavailable('UNAVAILABLE')
            .build()
        };
        const { container } = createComponent(props);

        expect(container.textContent).toContain('UNAVAILABLE');
      });

      it('should show invalid departure fair info', () => {
        const props = {
          canBeSelected: false,
          fareProduct: new FareProductBuilder()
            .withPriceDifference(priceDifference)
            .withReasonIfUnavailable('Invalid w/ return date')
            .build()
        };
        const { container } = createComponent(props);

        expect(container.textContent).toContain('Invalid w/ return date');
      });

      it('should show invalid return fair info', () => {
        const props = {
          canBeSelected: false,
          fareProduct: new FareProductBuilder()
            .withPriceDifference(priceDifference)
            .withReasonIfUnavailable('Invalid w/ depart date')
            .build()
        };
        const { container } = createComponent(props);

        expect(container.textContent).toContain('Invalid w/ depart date');
      });

      it('should show sold out fair info', () => {
        const props = {
          canBeSelected: false,
          fareProduct: new FareProductBuilder()
            .withPriceDifference(priceDifference)
            .withReasonIfUnavailable('Sold Out')
            .build()
        };
        const { container } = createComponent(props);

        expect(container.textContent).toContain('Sold Out');
      });

      it('should have the right fareType info', () => {
        const props = {
          canBeSelected: true,
          fareProduct: new FareProductBuilder()
            .withPriceDifference(priceDifference)
            .withFareDescription('Business Select')
            .build()
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.fare-purchase-info--fare-type').textContent).toContain('Business Select');
        expect(container.querySelector('.fare-purchase-info--earn-points').textContent).toContain('Earn 2,316 pts');
      });

      it('should show the number of fares left when seats is low and with lowest fare', () => {
        const props = {
          fareProduct: new FareProductBuilder()
            .withPriceDifference(priceDifference)
            .withLimitedSeats('4 left')
            .withLowestFare()
            .build(),
          canBeSelected: true
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.fare-purchase-info--limited-seats').textContent).toContain('4 left');
        expect(container).toHaveTextContent(i18n('AIR_BOOKING__LOW_FARE_UPPERCASE'));
      });

      it('should not show the number of fares left when seats is enough', () => {
        const props = {
          fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).build(),
          canBeSelected: true
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.fare-purchase-info--limited-seats')).toBeNull();
      });

      it('should not show the tax value', () => {
        const props = {
          fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).build(),
          canBeSelected: true
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.intl-points-taxes')).toBeNull();
      });
    });

    describe('points fare product', () => {
      const priceDifference = {
        amount: '1,234',
        currencyCode: 'PTS',
        sign: '+'
      };

      const priceDiffPointsTax = {
        amount: '5',
        currencyCode: 'USD',
        currencySymbol: '$',
        sign: '+'
      };

      it('should have the right fareType info and points diff should display', () => {
        const props = {
          canBeSelected: true,
          fareProduct: new FareProductBuilder()
            .withPrice({
              amount: '19,000',
              currencyCode: 'PTS'
            })
            .withPricePointTax({
              amount: '34.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            })
            .withPriceDifference(priceDifference)
            .withPriceDiffPointsTax(priceDiffPointsTax)
            .withFareDescription('Business Select')
            .withoutEarnPoints()
            .build()
        };

        const { container } = createComponent(props);

        expect(container.querySelectorAll('.currency')[0].textContent).toContain('+1,234');
        expect(container.querySelector('.fare-purchase-info--fare-type').textContent).toContain('Business Select');
        expect(container.querySelector('.fare-purchase-info--earn-points')).toBeNull();
      });

      it('should show the points tax value', () => {
        const props = {
          canBeSelected: true,
          fareProduct: new FareProductBuilder()
            .withPrice({
              amount: '19,000',
              currencyCode: 'PTS'
            })
            .withPricePointTax({
              amount: '34.06',
              currencyCode: 'USD',
              currencySymbol: '$'
            })
            .withPriceDifference(priceDifference)
            .withPriceDiffPointsTax(priceDiffPointsTax)
            .withFareDescription('Business Select')
            .withoutEarnPoints()
            .build()
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.intl-points-taxes').textContent).toContain('+$5');
      });
    });

    describe('with promoCode', () => {
      let fareProduct;

      beforeEach(() => {
        const priceDifference = {
          amount: '4,321',
          currencyCode: 'PTS',
          sign: '-'
        };

        const priceDiffPointsTax = {
          amount: '0',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: null
        };

        fareProduct = new FareProductBuilder()
          .withPrice({
            amount: '19,000',
            currencyCode: 'PTS'
          })
          .withPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withDiscountedPrice({
            amount: '18,000',
            currencyCode: 'PTS'
          })
          .withDiscountedPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withPriceDifference(priceDifference)
          .withPriceDiffPointsTax(priceDiffPointsTax)
          .withoutEarnPoints()
          .build();
      });

      it('should display the discountedFareValue', () => {
        const props = {
          canBeSelected: true,
          fareProduct,
          isPromoCodeApplied: true
        };

        const { container } = createComponent(props);

        expect(container.querySelectorAll('.currency')[0].textContent).toContain('-4,321');
        expect(container.querySelectorAll('.currency')[1].textContent).toContain('0');
      });
    });
  });

  const createComponent = (props) => {
    const updatedProps = { isPromoCodeApplied: false };
    const finalProps = { ...updatedProps, ...props };

    return render(<FarePurchaseInfo {...finalProps} />);
  };
});
