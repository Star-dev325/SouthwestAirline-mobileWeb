import React from 'react';
import _ from 'lodash';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import LowFarePriceBar from 'src/airBooking/components/lowFarePriceBar';

describe('LowFarePriceBar', () => {
  let onSelectStub;

  beforeEach(() => {
    const noop = () => {};

    onSelectStub = jest.fn(noop);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('dollar', () => {
    it('should render lowFareComponent', () => {
      const { container } = createComponent();
      const calendarDay = container.querySelector('.calendar-day');

      expect(calendarDay).toHaveClass('calendar-day');
      expect(calendarDay).toHaveAttribute('data-date', '2020-03-23');
    });

    it('should render day of week in menu bar', () => {
      const { container } = createComponent();
      const dayMenu = container.querySelector('.calendar-day--menu');

      expect(dayMenu).toHaveTextContent('MON');
    });

    it('should render rounded dollar amount with currency code', () => {
      const { container } = createComponent();
      const currency = container.querySelector('.currency');

      expect(currency).toMatchSnapshot();
    });
  });

  describe('points', () => {
    it('should render points amount with currency code and tax', () => {
      const lowestPrice = {
        price: {
          amount: '29,356',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        pricePointsTax: {
          amount: '5.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };

      const { container } = createComponent({ lowestPrice });
      const currency = container.querySelector('.currency');

      expect(currency).toMatchSnapshot();
    });

    it('should render day of week in menu bar', () => {
      const lowestPrice = {
        price: {
          amount: '29,356',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        pricePointsTax: {
          amount: '5.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };

      const { container } = createComponent({ lowestPrice });
      const dayMenu = container.querySelector('.calendar-day--menu');

      expect(dayMenu).toHaveTextContent('MON');
    });

    it('should render points amount when pricePointsTax is null and not render tax', () => {
      const lowestPrice = {
        price: {
          amount: '29,356',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        pricePointsTax: null
      };

      const { container } = createComponent({ lowestPrice });
      const currency = container.querySelector('.currency');

      expect(currency).toMatchSnapshot();
    });
  });

  describe('disabled', () => {
    it('should display N/A price bar when isDisabled is true and lowestPrice is not null', () => {
      const { container } = createComponent({ isDisabled: true });

      expect(container).toMatchSnapshot();
    });

    it('should display N/A price bar when isDisabled is true and lowestPrice is null', () => {
      const { container } = createComponent({ isDisabled: true, lowestPrice: null });

      expect(container).toMatchSnapshot();
    });

    it('should display N/A price bar when isDisabled is false and lowestPrice is null', () => {
      const { container } = createComponent({ isDisabled: false, lowestPrice: null });

      expect(container).toMatchSnapshot();
    });
  });

  describe('selection', () => {
    it('should trigger onSelect when clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.calendar-day--fare-price'));

      expect(onSelectStub).toHaveBeenCalled();
    });
    it('should not trigger onSelect when disabled', () => {
      const { container } = createComponent({ isDisabled: true });
      const disabledComponent = container.querySelector('.calendar-day--fare-price-disabled');

      fireEvent.click(disabledComponent);

      expect(onSelectStub).not.toHaveBeenCalled();
    });
    it('should show as selected when selected', () => {
      const { container } = createComponent({ isSelected: true });

      expect(container.querySelector('.calendar-day--fare-price.selected')).toBeInTheDocument();
    });
    it('should not show as selected when disabled', () => {
      const { container } = createComponent({ isSelected: true, isDisabled: true });

      expect(container.querySelector('.calendar-day--fare-price.selected')).not.toBeInTheDocument();
    });
  });

  describe('showAsUnselectableBar', () => {
    it('should render price bar as as unselectable when showAsUnselectableBar is true', () => {
      const { container } = createComponent({ showAsUnselectableBar: true });

      expect(container.querySelector('.unselectable')).toBeInTheDocument();
    });

    it('should render price bar as as selectable when showAsUnselectableBar is false', () => {
      const { container } = createComponent();

      expect(container.querySelector('.unselectable')).not.toBeInTheDocument();
      expect(container.querySelector('.calendar-day--fare-price')).toBeInTheDocument();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      date: '2020-03-23',
      lowestPrice: {
        price: {
          amount: '418.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pricePointsTax: null
      },
      barHeight: '100',
      isDisabled: false,
      isSelected: false,
      onSelect: onSelectStub,
      showAsUnselectableBar: false
    };
    const mergedProps = _.merge({}, defaultProps, props);

    return render(<LowFarePriceBar {...mergedProps} />);
  };
});
