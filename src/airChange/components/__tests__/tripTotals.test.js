import { render } from '@testing-library/react';
import React from 'react';
import TripTotalsTable from 'src/airChange/components/tripTotals';

describe('Trip Totals Table', () => {
  describe('change money reservation', () => {
    it('should render correct new trip total detail', () => {
      const { container: tripTotalsTable } = createComponent();

      const newTripTotalDetail = tripTotalsTable.querySelectorAll('[data-qa="total-amount"]')[0].textContent;
      const newTripTotalLabel = tripTotalsTable.querySelectorAll('.price-line--title')[0].textContent;

      expect(newTripTotalDetail).toEqual('66.80');
      expect(newTripTotalLabel).toEqual('New trip cost');
    });

    it('should render correct original trip total detail', () => {
      const { container: tripTotalsTable } = createComponent();

      const originalTripTotalDetail = tripTotalsTable.querySelectorAll('[data-qa="total-amount"]')[1].textContent;
      const originalTripTotalLabel = tripTotalsTable.querySelectorAll('.price-line--title')[1].textContent;

      expect(originalTripTotalDetail).toEqual('577.68');
      expect(originalTripTotalLabel).toEqual('Original trip cost');
    });
  });

  describe('change points reservation', () => {
    let props;

    beforeEach(() => {
      props = {
        originalTripCost: {
          item: 'Original trip cost',
          fare: {
            amount: '14,598',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          tax: {
            amount: '5.60',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        newTripCost: {
          item: 'New trip cost',
          fare: {
            amount: '12,398',
            currencyCode: 'PTS',
            currencySymbol: null
          },
          tax: {
            amount: '8.40',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      };
    });

    it('should render correct new trip total detail', () => {
      const { container: tripTotalsTable } = createComponent(props);

      const newTripTotalDetailPoints = tripTotalsTable.querySelectorAll('[data-qa="total-amount"]')[0].textContent;
      const newTripTotalDetailPrice = tripTotalsTable.querySelectorAll('[data-qa="total-amount"]')[1].textContent;
      const newTripTotalLabel = tripTotalsTable.querySelectorAll('.price-line--title')[0].textContent;

      expect(newTripTotalDetailPoints).toEqual('12,398');
      expect(newTripTotalDetailPrice).toEqual('8.40');
      expect(newTripTotalLabel).toEqual('New trip cost');
    });

    it('should render correct original trip total detail', () => {
      const { container: tripTotalsTable } = createComponent(props);

      const originalTripTotalDetailPoints = tripTotalsTable.querySelectorAll('[data-qa="total-amount"]')[2].textContent;
      const originalTripTotalDetailPrice = tripTotalsTable.querySelectorAll('[data-qa="total-amount"]')[3].textContent;
      const originalTripTotalLabel = tripTotalsTable.querySelectorAll('.price-line--title')[1].textContent;

      expect(originalTripTotalDetailPoints).toEqual('14,598');
      expect(originalTripTotalDetailPrice).toEqual('5.60');
      expect(originalTripTotalLabel).toEqual('Original trip cost');
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '577.68',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '66.80',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      travelFunds: {
        item: 'Travel Funds applied',
        fare: {
          amount: '3.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      }
    };

    const combinedProps = { ...defaultProps, ...props };

    return render(<TripTotalsTable {...combinedProps} />);
  };
});
