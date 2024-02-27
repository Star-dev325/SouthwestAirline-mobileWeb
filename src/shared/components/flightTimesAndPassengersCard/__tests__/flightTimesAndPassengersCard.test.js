import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'test/unit/helpers/configureMockStore';
import SameDayPricingResponseBuilder from 'test/builders/apiResponse/sameDayPricingBuilder';
import { FlightTimesAndPassengersCard } from 'src/shared/components/flightTimesAndPassengersCard/flightTimesAndPassengersCard';

describe('flightTimesAndPassengersCard', () => {
  it('should render flight time card component', () => {
    const sameDayPricingPage = new SameDayPricingResponseBuilder().build();
    const { container } = createComponent({ card: sameDayPricingPage.sameDayPricingPage.currentFlight }, {});

    expect(container).toMatchSnapshot();
  });

  it('should not render enhanced-flight-time-passengers--detail-number text if RR number missing', () => {
    const noRRFlight = {
      arrivesTime: '18:30',
      date: '2023-01-01',
      departsTime: '15:30',
      flightNumbers: '439',
      fromAirportCode: 'PHX',
      labelDescription: 'CURRENT FLIGHT',    
      passengers: [
        {
          name: 'Test Tester',
          accountNumber: null
        },
        {
          name: 'Test McTestier',
          accountNumber: null
        }
      ]
    };

    const { container } = createComponent({ card: noRRFlight }, {});

    expect(container.querySelector('.enhanced-flight-time-passengers--detail-number')).toBeNull();
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      match: { params: '' },
      location: {}
    };
    const defaultState = {
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        },
        sameDay: {}
      },
      router: {
        location: {
          search: 'search'
        }
      }
    };
    const store = configureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    return render(
      <div>
        <Provider store={store}>
          <FlightTimesAndPassengersCard {...mergedProps} />
        </Provider>
      </div>
    );
  };
});
