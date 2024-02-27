import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import BoundDetailBuilder from 'test/builders/model/boundDetailBuilder';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();

describe('ReservationFlightSummary', () => {
  describe('price summary for change', () => {
    it('should render one bound of flight summary card', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.flight-summary-card .passenger-price').length).toBe(1);
    });

    it('should render two bounds of flight summary card', () => {
      const { container } = createComponent({
        bounds: [new BoundDetailBuilder().build(), new BoundDetailBuilder().build()]
      });

      expect(container.querySelectorAll('.flight-summary-card').length).toBe(2);
    });

    it('should not render flight info if bounds are empty', () => {
      const { container } = createComponent({
        bounds: []
      });

      expect(container.querySelector('.flight-summary-card')).toBeNull();
    });

    it('should user passengerCount instead of passengers array if it exists', () => {
      const boundsWithPassengerCount = [new BoundDetailBuilder().withPassengerCountStringInsteadOfArray().build()];

      const { getByText } = createComponent({ bounds: boundsWithPassengerCount });

      expect(getByText('1 Passenger')).not.toBeNull();
    });
  });

  const createComponent = (props = {}) => {
    const state = {
      app: {
        webView: {
          isWebView: false
        }
      },
      router: {
        location: '?_modal=PROMO_CODES_MODAL_ID'
      }
    };

    const defaultProps = {
      bounds: [new BoundDetailBuilder().build()]
    };

    return render(
      <Provider store={mockStore(state)}>
        <ReservationFlightSummary {...defaultProps} {...props} />
      </Provider>
    );
  };
});
