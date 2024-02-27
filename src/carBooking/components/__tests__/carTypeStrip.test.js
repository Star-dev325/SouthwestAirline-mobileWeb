import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CarTypeStrip from 'src/carBooking/components/carTypeStrip';

describe('CarTypeStrip', () => {
  describe('when render item in different status', () => {
    let carResults;
    let onCarTypeChangedFnStub;

    beforeEach(() => {
      carResults = {
        COMPACT: {
          lowestPrice: 0,
          isAllVendorUnavailable: true,
          lowestPriceWithCurrencyCode: {
            amount: '0.00',
            currencyCode: 'USD'
          }
        },
        MIDSIZE: {
          lowestPrice: 6500,
          isAllVendorUnavailable: false,
          lowestPriceWithCurrencyCode: {
            amount: '65.00',
            currencyCode: 'USD'
          }
        },
        FULLSIZE: {
          lowestPrice: 8700,
          isAllVendorUnavailable: false,
          lowestPriceWithCurrencyCode: {
            amount: '87.00',
            currencyCode: 'USD'
          }
        }
      };
      onCarTypeChangedFnStub = () => {};
    });

    it('should render 3 items', () => {
      const { container } = createComponent({
        carResults,
        selectedCarType: 'MIDSIZE',
        onCarTypeChangedFn: onCarTypeChangedFnStub
      });
      const items = container.querySelectorAll('li');

      expect(items).toHaveLength(3);
    });

    it('should render unavailable car type correctly', () => {
      const { container } = createComponent({
        carResults,
        selectedCarType: 'MIDSIZE',
        onCarTypeChangedFn: onCarTypeChangedFnStub
      });
      const unavailableCarType = container.querySelector('li');

      expect(unavailableCarType).toHaveClass('disabled');
      expect(unavailableCarType.textContent).toEqual('CompactUnavailable');
    });

    it('should render active car type correctly', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'MIDSIZE'
      });
      const unavailableCarType = container.querySelectorAll('li')[1];

      expect(unavailableCarType).toHaveClass('active');
      expect(unavailableCarType.textContent).toEqual('Mid-sizefrom $65');
    });

    it('should render available but non-active car type correctly', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'MIDSIZE'
      });
      const unavailableCarType = container.querySelectorAll('li')[2];

      expect(unavailableCarType).not.toHaveClass('active');
      expect(unavailableCarType.textContent).toEqual('Full-sizefrom $87');
    });
  });

  describe('arrow on left and right', () => {
    let carResults;
    let onCarTypeChangedFnStub;

    beforeEach(() => {
      carResults = {
        COMPACT: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        },
        MIDSIZE: {
          isAllVendorUnavailable: false,
          lowestPrice: 6500
        },
        FULLSIZE: {
          isAllVendorUnavailable: false,
          lowestPrice: 8700
        },
        PREMIUM: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        },
        SUV: {
          isAllVendorUnavailable: false,
          lowestPrice: 9600
        }
      };
      onCarTypeChangedFnStub = () => {};
    });

    describe('should hide left arrow', () => {
      it('when left item is empty', () => {
        const { container } = createComponent({
          carResults,
          onCarTypeChangedFn: onCarTypeChangedFnStub,
          selectedCarType: 'COMPACT'
        });
        const leftArrow = container.querySelector('.icon_keyboard-arrow-left');
        const rightArrow = container.querySelector('.icon_keyboard-arrow-right');

        expect(leftArrow).not.toBeInTheDocument();
        expect(rightArrow).toBeInTheDocument();
      });

      it('when left item is the first item', () => {
        const { container } = createComponent({
          carResults,
          onCarTypeChangedFn: onCarTypeChangedFnStub,
          selectedCarType: 'MIDSIZE'
        });
        const leftArrow = container.querySelector('.icon_keyboard-arrow-left');
        const rightArrow = container.querySelector('.icon_keyboard-arrow-right');

        expect(leftArrow).not.toBeInTheDocument();
        expect(rightArrow).toBeInTheDocument();
      });
    });

    describe('should hide right arrow', () => {
      it('when right item is empty', () => {
        const { container } = createComponent({
          carResults,
          onCarTypeChangedFn: onCarTypeChangedFnStub,
          selectedCarType: 'SUV'
        });
        const leftArrow = container.querySelector('.icon_keyboard-arrow-left');
        const rightArrow = container.querySelector('.icon_keyboard-arrow-right');

        expect(leftArrow).toBeInTheDocument();
        expect(rightArrow).not.toBeInTheDocument();
      });

      it('when right item is the last item', () => {
        const { container } = createComponent({
          carResults,
          onCarTypeChangedFn: onCarTypeChangedFnStub,
          selectedCarType: 'PREMIUM'
        });
        const leftArrow = container.querySelector('.icon_keyboard-arrow-left');
        const rightArrow = container.querySelector('.icon_keyboard-arrow-right');

        expect(leftArrow).toBeInTheDocument();
        expect(rightArrow).not.toBeInTheDocument();
      });
    });

    it('should show both left and right arrow when right and left item is existed', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'FULLSIZE'
      });
      const leftArrow = container.querySelector('.icon_keyboard-arrow-left');
      const rightArrow = container.querySelector('.icon_keyboard-arrow-right');

      expect(leftArrow).toBeInTheDocument();
      expect(rightArrow).toBeInTheDocument();
    });
  });

  describe('click item', () => {
    let carResults;
    let onCarTypeChangedFnStub;

    beforeEach(() => {
      carResults = {
        COMPACT: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        },
        MIDSIZE: {
          isAllVendorUnavailable: false,
          lowestPrice: 6500
        },
        FULLSIZE: {
          isAllVendorUnavailable: false,
          lowestPrice: 8700
        }
      };
      onCarTypeChangedFnStub = () => {};
    });

    it('should select previous item when click left item', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'MIDSIZE'
      });

      fireEvent.click(container.querySelector('li'));

      const items = container.querySelectorAll('li');

      expect(items[0].textContent).toEqual('');
      expect(items[1].textContent).toContain('Compact');
      expect(items[2].textContent).toContain('Mid-size');
    });

    it('should select next item when click right item', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'MIDSIZE'
      });

      fireEvent.click(container.querySelectorAll('li')[2]);
      const newItems = container.querySelectorAll('li');

      expect(newItems[0].textContent).toContain('Mid-size');
      expect(newItems[1].textContent).toContain('Full-size');
      expect(newItems[2].textContent).toEqual('');
    });

    it('should keep select current item when click center item', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'MIDSIZE'
      });

      fireEvent.click(container.querySelectorAll('li')[1]);
      const newItems = container.querySelectorAll('li');

      expect(newItems[0].textContent).toContain('Compact');
      expect(newItems[1].textContent).toContain('Mid-size');
      expect(newItems[2].textContent).toContain('Full-size');
    });

    it('should keep select current item when click empty item', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'COMPACT'
      });

      fireEvent.click(container.querySelector('li'));

      const newItems = container.querySelectorAll('li');

      expect(newItems[0].textContent).toEqual('');
      expect(newItems[1].textContent).toContain('Compact');
      expect(newItems[2].textContent).toContain('Mid-size');
    });

    it('should invoke callback with car type', () => {
      const onCarTypeChanged = jest.fn();
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChanged,
        selectedCarType: 'MIDSIZE'
      });

      fireEvent.click(container.querySelectorAll('li')[2]);

      expect(onCarTypeChanged).toHaveBeenCalledWith('FULLSIZE');
    });
  });

  describe('click arrow', () => {
    let carResults;
    let onCarTypeChangedFnStub;

    beforeEach(() => {
      carResults = {
        ECONOMY: {
          isAllVendorUnavailable: false,
          lowestPrice: 2000
        },
        COMPACT: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        },
        MIDSIZE: {
          isAllVendorUnavailable: false,
          lowestPrice: 6500
        },
        FULLSIZE: {
          isAllVendorUnavailable: false,
          lowestPrice: 8700
        },
        PREMIUM: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        },
        SUV: {
          isAllVendorUnavailable: false,
          lowestPrice: 9600
        },
        LUXURY: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        },
        MINIVAN: {
          isAllVendorUnavailable: false,
          lowestPrice: 7800
        },
        CONVERTIBLE: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        },
        VAN: {
          isAllVendorUnavailable: true,
          lowestPrice: 0
        }
      };
      onCarTypeChangedFnStub = () => {};
    });

    it('should show previous 3 items when click left arrow', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'PREMIUM'
      });

      fireEvent.click(container.querySelector('.icon_keyboard-arrow-left'));

      const items = container.querySelectorAll('li');

      expect(items[0].textContent).toContain('Economy');
      expect(items[1].textContent).toContain('Compact');
      expect(items[2].textContent).toContain('Mid-size');
    });

    it('should show next 3 items when click right arrow', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'PREMIUM'
      });

      fireEvent.click(container.querySelector('.icon_keyboard-arrow-right'));

      const items = container.querySelectorAll('li');

      expect(items[0].textContent).toContain('Luxury');
      expect(items[1].textContent).toContain('Minivan');
      expect(items[2].textContent).toContain('Convertible');
    });

    it('should show no empty items if the previous page only contains 1 item', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'MIDSIZE'
      });
      const leftArrow = container.querySelector('.icon_keyboard-arrow-left');

      fireEvent.click(leftArrow);

      const items = container.querySelectorAll('li');

      expect(items[0].textContent).toContain('Economy');
      expect(items[1].textContent).toContain('Compact');
      expect(items[2].textContent).toContain('Mid-size');
    });

    it('should show no empty items if the next page only contains 1 item', () => {
      const { container } = createComponent({
        carResults,
        onCarTypeChangedFn: onCarTypeChangedFnStub,
        selectedCarType: 'MINIVAN'
      });
      const rightArrow = container.querySelector('.icon_keyboard-arrow-right');

      fireEvent.click(rightArrow);

      const items = container.querySelectorAll('li');

      expect(items[0].textContent).toContain('Minivan');
      expect(items[1].textContent).toContain('Convertible');
      expect(items[2].textContent).toContain('Full-size Van');
    });
  });

  const createComponent = (props) => render(<CarTypeStrip {...props} />);
});
