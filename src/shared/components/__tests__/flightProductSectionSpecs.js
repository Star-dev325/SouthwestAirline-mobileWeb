import React from 'react';
import { mount, shallow } from 'enzyme';
import sinonModule from 'sinon';
import FareProductBuilder from 'test/builders/model/fareProductForChapiBuilder';
import productDefinitions from 'mocks/templates/productDefinitions';
import FlightProductSection from 'src/shared/components/flightProductSection';

const sinon = sinonModule.sandbox.create();

describe('FlightProductSection', () => {
  let onFareSelectedStub;

  beforeEach(() => {
    onFareSelectedStub = sinon.stub();
  });

  const render = (options, shouldShallow = false) => {
    const props = {
      showPriceDifference: false,
      isPromoCodeApplied: false,
      canBeSelected: true,
      unavailableDefault: 'Available',
      productDefinition: productDefinitions.products[3],
      onFareSelected: onFareSelectedStub,
      ...options
    };
    const component = <FlightProductSection {...props} />;

    return shouldShallow ? shallow(component) : mount(component);
  };

  context('render with showPriceDifference set to false', () => {
    context('dollars fare product', () => {
      it('should show available & Unselectable fare purchase info', () => {
        const wrapper = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder().build()
          },
          true
        );

        expect(wrapper).toMatchSnapshot();
      });

      it('should show alternative default unavailable & Unselectable with fare purchase info', () => {
        const wrapper = render(
          {
            canBeSelected: false,
            unavailableDefault: 'No longer available',
            fareProduct: new FareProductBuilder().build()
          },
          true
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.find('.flight-product-section').simulate('click');

        expect(onFareSelectedStub).not.to.be.called;
      });

      it('should show unavailable & Unselectable with no fare purchase info', () => {
        const wrapper = render(
          {
            canBeSelected: false,
            unavailableDefault: 'Unavailable',
            fareProduct: null
          },
          true
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.find('.flight-product-section').simulate('click');

        expect(onFareSelectedStub).not.to.be.called;
      });

      it('should show available & selectable fair info', () => {
        const fareProduct = new FareProductBuilder().build();
        const wrapper = render(
          {
            canBeSelected: true,
            fareProduct: new FareProductBuilder().build()
          },
          true
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.find('.flight-product-section').simulate('click');

        expect(onFareSelectedStub).to.be.calledWith(fareProduct);
      });

      it('should show unavailable fair info', () => {
        const unavailableFairInfo = render(
          {
            canBeSelected: true,
            fareProduct: new FareProductBuilder().withReasonIfUnavailable('UNAVAILABLE').build()
          },
          true
        );

        expect(unavailableFairInfo).toMatchSnapshot();
      });

      it('should show invalid departure fair info', () => {
        const invalidDepartureFairInfo = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder().withReasonIfUnavailable('Invalid w/ return date').build()
          },
          true
        );

        expect(invalidDepartureFairInfo).toMatchSnapshot();
      });

      it('should show invalid return fair info', () => {
        const invalidReturnFairInfo = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder().withReasonIfUnavailable('Invalid w/ depart date').build()
          },
          true
        );

        expect(invalidReturnFairInfo).toMatchSnapshot();
      });

      it('should show sold out fair info', () => {
        const soldoutFairInfo = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder().withReasonIfUnavailable('Sold Out').build()
          },
          true
        );

        expect(soldoutFairInfo).toMatchSnapshot();
      });

      it('should have the right fareType info', () => {
        const availableSelectableFairInfo = render(
          {
            canBeSelected: true,
            fareProduct: new FareProductBuilder().withFareDescription('Business Select').build()
          },
          true
        );

        expect(availableSelectableFairInfo).toMatchSnapshot();
      });

      it('should show the number of fares left when seats is low and with lowest fare', () => {
        const lowSeats = render(
          {
            fareProduct: new FareProductBuilder().withLimitedSeats('4 left').withLowestFare().build(),
            canBeSelected: true
          },
          true
        );

        expect(lowSeats).toMatchSnapshot();
      });

      it('should not show the number of fares left when seats is enough', () => {
        const enoughSeats = render(
          {
            fareProduct: new FareProductBuilder().build(),
            canBeSelected: true
          },
          true
        );

        expect(enoughSeats.find('.flight-product-section--header')).not.to.contain.text('left');
      });

      it('should not show the tax value', () => {
        const wrapper = render(
          {
            fareProduct: new FareProductBuilder().build(),
            canBeSelected: true
          },
          true
        );

        expect(wrapper).toMatchSnapshot();
      });
    });

    context('points fare product', () => {
      it('should have the right fareType info and points cost should display', () => {
        const availableSelectableFareInfo = render(
          {
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
              .withFareDescription('Business Select')
              .withoutEarnPoints()
              .build()
          },
          true
        );

        expect(availableSelectableFareInfo).toMatchSnapshot();
      });
    });

    context('with promoCode', () => {
      let fareProduct;

      beforeEach(() => {
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
          .withoutEarnPoints()
          .build();
      });

      it('should display the discountedFareValue and should strike-through the totalFareCents', () => {
        const component = render(
          {
            fareProduct,
            canBeSelected: true,
            isPromoCodeApplied: true
          },
          true
        );

        expect(component).toMatchSnapshot();
      });

      it('should not display discounted price when promo code applied but the price of flight is not discounted', () => {
        const notDiscountedFareProduct = new FareProductBuilder()
          .withPrice({
            amount: '19,000',
            currencyCode: 'PTS'
          })
          .withPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withoutEarnPoints()
          .build();

        const component = render(
          {
            fareProduct: notDiscountedFareProduct,
            canBeSelected: true,
            isPromoCodeApplied: true
          },
          true
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  context('render with showPriceDifference set to true', () => {
    const priceDifference = {
      amount: '5',
      currencyCode: 'USD',
      currencySymbol: '$',
      sign: '-'
    };

    context('dollars fare product', () => {
      it('should show available & Unselectable fare purchase info', () => {
        const availableUnselectableFairInfo = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).build(),
            showPriceDifference: true
          },
          true
        );

        expect(availableUnselectableFairInfo).toMatchSnapshot();
      });

      it('should show available & selectable fair info', () => {
        const fareProduct = new FareProductBuilder().withPriceDifference(priceDifference).build();
        const wrapper = render(
          {
            canBeSelected: true,
            fareProduct,
            showPriceDifference: true
          },
          true
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.find('.flight-product-section').simulate('click');

        expect(onFareSelectedStub).to.be.calledWith(fareProduct);
      });

      it('should show unavailable fair info', () => {
        const unavailableFairInfo = render(
          {
            canBeSelected: true,
            fareProduct: new FareProductBuilder()
              .withPriceDifference(priceDifference)
              .withReasonIfUnavailable('UNAVAILABLE')
              .build(),
            showPriceDifference: true
          },
          true
        );

        expect(unavailableFairInfo).toMatchSnapshot();
      });

      it('should show invalid departure fair info', () => {
        const invalidDepartureFairInfo = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder()
              .withPriceDifference(priceDifference)
              .withReasonIfUnavailable('Invalid w/ return date')
              .build(),
            showPriceDifference: true
          },
          true
        );

        expect(invalidDepartureFairInfo).toMatchSnapshot();
      });

      it('should show invalid return fair info', () => {
        const invalidReturnFairInfo = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder()
              .withPriceDifference(priceDifference)
              .withReasonIfUnavailable('Invalid w/ depart date')
              .build(),
            showPriceDifference: true
          },
          true
        );

        expect(invalidReturnFairInfo).toMatchSnapshot();
      });

      it('should show sold out fair info', () => {
        const soldoutFairInfo = render(
          {
            canBeSelected: false,
            fareProduct: new FareProductBuilder()
              .withPriceDifference(priceDifference)
              .withReasonIfUnavailable('Sold Out')
              .build(),
            showPriceDifference: true
          },
          true
        );

        expect(soldoutFairInfo).toMatchSnapshot();
      });

      it('should have the right fareType info', () => {
        const availableSelectableFairInfo = render(
          {
            canBeSelected: true,
            fareProduct: new FareProductBuilder()
              .withPriceDifference(priceDifference)
              .withFareDescription('Business Select')
              .build(),
            showPriceDifference: true
          },
          true
        );

        expect(availableSelectableFairInfo).toMatchSnapshot();
      });

      it('should show the number of fares left when seats is low and with lowest fare', () => {
        const lowSeats = render(
          {
            fareProduct: new FareProductBuilder()
              .withPriceDifference(priceDifference)
              .withLimitedSeats('4 left')
              .withLowestFare()
              .build(),
            canBeSelected: true,
            showPriceDifference: true
          },
          true
        );

        expect(lowSeats).toMatchSnapshot();
      });

      it('should not show the number of fares left when seats is enough', () => {
        const enoughSeats = render(
          {
            fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).build(),
            canBeSelected: true,
            showPriceDifference: true
          },
          true
        );

        expect(enoughSeats).toMatchSnapshot();
      });

      it('should not show the tax value', () => {
        const wrapper = render(
          {
            fareProduct: new FareProductBuilder().withPriceDifference(priceDifference).build(),
            canBeSelected: true,
            showPriceDifference: true
          },
          true
        );

        expect(wrapper).toMatchSnapshot();
      });
    });

    context('points fare product', () => {
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
        const availableSelectableFareInfo = render(
          {
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
              .build(),
            showPriceDifference: true
          },
          true
        );

        expect(availableSelectableFareInfo).toMatchSnapshot();
      });

      it('should show the points tax value', () => {
        const availableSelectableFareInfo = render(
          {
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
              .build(),
            showPriceDifference: true
          },
          true
        );

        expect(availableSelectableFareInfo).toMatchSnapshot();
      });
    });

    context('with promoCode', () => {
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
        const component = render(
          {
            fareProduct,
            canBeSelected: true,
            isPromoCodeApplied: true,
            showPriceDifference: true
          },
          true
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  it('should render stylized label', () => {
    const wrapper = render({ productDefinition: productDefinitions.products[1] }, true);

    expect(wrapper.find('.flight-product-section--header')).toMatchSnapshot();
  });
});
