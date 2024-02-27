import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CarResult from 'src/carBooking/components/carResult';

describe('CarResult', () => {
  let carResult;
  let onClickStub;

  beforeEach(() => {
    carResult = {
      appliedDiscount: undefined,
      dailyRateWithCurrencyCode: {
        amount: '135.66',
        currencyCode: 'USD'
      },
      imageUrl: '/some/image.png',
      incentiveText: '',
      isRapidRewardsPartner: true,
      isUnavailable: false,
      pricePerDayCents: 13566,
      productId: 'PRODUCT-ID',
      promoCodeApplied: false,
      totalCentsWithTaxes: 15572,
      totalWithTaxesAndCurrencyCode: {
        amount: '155.72',
        currencyCode: 'USD'
      },
      vendorName: 'Avis'
    };
    onClickStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('special rate', () => {
    it('should be displayed when the car result has promo code applied', () => {
      carResult.promoCodeApplied = true;
      const { container } = createComponent({
        carResult,
        onClickFn: onClickStub
      });

      expect(container.querySelector('.special-rate')).toBeInTheDocument();
    });

    it('should not be displayed when the car result does not have promo code applied', () => {
      const { container } = createComponent({
        carResult,
        onClickFn: onClickStub
      });

      expect(container.querySelector('.special-rate')).not.toBeInTheDocument();
    });
  });

  describe('clicking on the component', () => {
    it('should execute the onClick function', () => {
      const { container } = createComponent({
        carResult,
        onClickFn: onClickStub
      });

      fireEvent.click(container.querySelector('.car-result'));
      expect(onClickStub).toHaveBeenCalledWith(carResult);
    });

    it('should not execute the onClick function if the carResult is unavailable', () => {
      carResult.isUnavailable = true;
      const { container } = createComponent({
        carResult,
        onClickFn: onClickStub
      });

      fireEvent.click(container.querySelector('.car-result'));
      expect(onClickStub).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props) => render(<CarResult {...props} />);
});
