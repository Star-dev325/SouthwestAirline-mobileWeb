import { render } from '@testing-library/react';
import React from 'react';
import FlightStatusDetailCard from 'src/flightStatus/components/flightStatusDetailCard';

describe('FlightStatusDetailCard', () => {
  it('should render', () => {
    const flightLeg = {
      flightNumber: '6020',
      departure: {
        airport: 'DAL',
        status: 'ON TIME',
        statusType: 'POSITIVE',
        actualTime: '06:00',
        originalTime: '06:00',
        gate: 'N/A'
      },
      arrival: {
        airport: 'HOU',
        status: 'ON TIME',
        statusType: 'POSITIVE',
        actualTime: '07:00',
        originalTime: '07:00',
        gate: 'N/A',
        isNextDay: false
      },
      isNowBoarding: false,
      aircraftInfo: {
        aircraftType: 'Boeing 747-700'
      }
    };
    const { container } = createComponent({
      AIRCRAFT_TYPE_FLIGHTSTATUS: false,
      flightCard: {
        legs: [flightLeg]
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('should render without aircraft type when toggle true', () => {
    const flightLeg = {
      flightNumber: '6020',
      departure: {
        airport: 'DAL',
        status: 'ON TIME',
        statusType: 'POSITIVE',
        actualTime: '06:00',
        originalTime: '06:00',
        gate: 'N/A'
      },
      arrival: {
        airport: 'HOU',
        status: 'ON TIME',
        statusType: 'POSITIVE',
        actualTime: '07:00',
        originalTime: '07:00',
        gate: 'N/A',
        isNextDay: false
      },
      isNowBoarding: false,
      aircraftInfo: {
        aircraftType: 'Boeing 747-700'
      }
    };
    const { container } = createComponent({
      AIRCRAFT_TYPE_FLIGHTSTATUS: true,
      flightCard: {
        legs: [flightLeg]
      }
    });

    expect(container.querySelector('.formatted-time').textContent).toEqual('6:00AM');
  });

  const createComponent = (props) => {
    const defaultProps = {
      _links: []
    };
    const finalProps = { ...defaultProps, ...props };

    return render(<FlightStatusDetailCard {...finalProps} />);
  };
});
