import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PassengerInfoSummary from 'src/carBooking/components/passengerInfoSummary';

describe('passengerInfoSummary', () => {
  let passengerInfos;
  let stubOnClick;

  beforeEach(() => {
    passengerInfos = [
      {
        accountNumber: '8349157375',
        firstName: 'Tim',
        lastName: 'George',
        type: 'adult'
      }
    ];
    stubOnClick = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onClick', () => {
    it('should call onClick with paxNumber params & type query', () => {
      const { container } = createComponent({
        hasParams: true,
        onClick: stubOnClick,
        passengerInfos
      });

      fireEvent.click(container.querySelector('.nav-item-link'));

      expect(stubOnClick.mock.calls[0][1]).toEqual({ paxNumber: 1 });
      expect(stubOnClick.mock.calls[0][2]).toEqual({ type: 'adult' });
    });

    it('should call onClick without paxNumber params when hasParams is false', () => {
      const { container } = createComponent({
        hasParams: false,
        onClick: stubOnClick,
        passengerInfos
      });

      fireEvent.click(container.querySelector('.nav-item-link'));

      expect(stubOnClick.mock.calls[0][1]).toBeNull();
    });
  });

  describe('render', () => {
    it('should render accountNumber or rapidRewardNumber', () => {
      const { container } = createComponent({
        hasParams: false,
        passengerInfos
      });

      expect(container.querySelector('.passenger-info-summary--item-rapid-rewards')).toHaveTextContent('8349157375');
    });

    it('should not render accountNumber and rapidRewardNumber', () => {
      passengerInfos = [
        {
          accountNumber: undefined,
          firstName: 'Tim',
          lastName: 'George',
          type: 'adult'
        }
      ];

      const { container } = createComponent({
        hasParams: false,
        passengerInfos
      });

      expect(container.querySelector('.passenger-info-summary--item-rapid-rewards')).toBeNull();
    });
  });

  const createComponent = (props) => render(<PassengerInfoSummary {...props} />);
});
