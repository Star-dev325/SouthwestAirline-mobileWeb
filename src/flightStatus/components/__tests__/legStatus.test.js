import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import LegStatus from 'src/flightStatus/components/legStatus';

describe('legStatus', () => {
  it('should render flight times if the flight is not cancelled', () => {
    const leg = {
      aircraftInfo: {
        aircraftType: 'Boeing 747-700'
      },
      arrival: {
        actualTime: '15:00',
        airport: 'HOU',
        gate: 'N/A',
        isNextDay: true,
        originalTime: '15:00',
        status: 'ON TIME',
        statusType: 'POSITIVE'
      },
      departure: {
        actualTime: '12:00',
        airport: 'ATL',
        gate: 'G21',
        originalTime: '12:00',
        status: 'ON TIME',
        statusType: 'POSITIVE'
      },
      flightNumber: '4604',
      isNowBoarding: false
    };
    const { container } = createComponent(leg);

    expect(container.querySelector('.segment-status')).toBeInTheDocument();
    expect(container.querySelector('.cancel-row')).toBeNull();
  });

  it('should render canceled flight display when flight status is cancelled', () => {
    const leg = {
      aircraftInfo: {
        aircraftType: 'Boeing 747-700'
      },
      arrival: {
        actualTime: '15:00',
        airport: 'HOU',
        gate: 'N/A',
        isNextDay: true,
        originalTime: '15:00',
        status: 'ON TIME',
        statusType: 'POSITIVE'
      },
      departure: {
        actualTime: '12:00',
        airport: 'ATL',
        gate: 'G21',
        originalTime: '12:00',
        status: 'CANCELLED',
        statusType: 'POSITIVE'
      },
      flightNumber: '4604',
      isNowBoarding: false
    };

    const { container } = createComponent(leg);

    expect(container.querySelector('.cancel-row')).toBeInTheDocument();
    expect(container.querySelector('.segment-status')).toBeNull();
  });

  const createComponent = (leg) => render(<LegStatus leg={leg} />);
});
