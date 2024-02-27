import { render } from '@testing-library/react';
import React from 'react';
import LegDetail from 'src/flightStatus/components/legDetail';
import i18n from '@swa-ui/locale';

describe('LegDetail', () => {
  const createComponent = (props) => {
    const defaultProps = {
      AIRCRAFT_TYPE_FLIGHTSTATUS: false,
      leg: {
        departure: {
          airport: 'ATL',
          status: 'CANCELLED',
          actualTime: '12:00',
          originalTime: '12:00',
          gate: 'N/A',
          statusType: 'POSITIVE'
        },
        arrival: {
          airport: 'HOU',
          status: 'ON TIME',
          actualTime: '15:00',
          originalTime: '15:00',
          gate: 'N/A',
          isNextDay: true,
          statusType: 'POSITIVE'
        },
        isNowBoarding: false,
        flightNumber: '4604',
        aircraftInfo: {
          aircraftType: 'Boeing 747-700'
        }
      }
    };

    const finalProps = { ...defaultProps, ...props };

    return render(<LegDetail {...finalProps} />);
  };

  it('should display aircraft type when toggle on', () => {
    const { container } = createComponent({
      AIRCRAFT_TYPE_FLIGHTSTATUS: true
    });

    expect(container.querySelector('[data-qa="flight-status-aircraft-type"]').textContent).toContain('Boeing 747-700');
  });

  it('should display gate use gate value', () => {
    const { container } = createComponent({
      leg: {
        departure: {
          airport: 'ATL',
          status: 'CANCELLED',
          actualTime: '12:00',
          originalTime: '12:00',
          gate: 'arrival',
          statusType: 'POSITIVE'
        },
        arrival: {
          airport: 'HOU',
          status: 'ON TIME',
          actualTime: '15:00',
          originalTime: '15:00',
          gate: 'N/A',
          isNextDay: true,
          statusType: 'POSITIVE'
        },
        isNowBoarding: false,
        flightNumber: '4604',
        aircraftInfo: {
          aircraftType: 'Boeing 747-700'
        }
      }
    });

    expect(container.querySelectorAll('.flight-info--gate')[0].textContent).toContain('arrival');
  });

  describe('BoardingHeader', () => {
    it('should show the on the boarding header when isNowBoarding is true', () => {
      const { container } = createComponent({
        leg: {
          departure: {
            airport: 'ATL',
            status: 'CANCELLED',
            actualTime: '12:00',
            originalTime: '12:00',
            gate: 'N/A',
            statusType: 'POSITIVE'
          },
          arrival: {
            airport: 'HOU',
            status: 'ON TIME',
            actualTime: '15:00',
            originalTime: '15:00',
            gate: 'N/A',
            isNextDay: true,
            statusType: 'POSITIVE'
          },
          isNowBoarding: true,
          flightNumber: '4604',
          aircraftInfo: {
            aircraftType: 'Boeing 747-700'
          }
        }
      });

      expect(container.querySelector('.boarding-header')).not.toBeNull();
      expect(container.querySelector('.banner-name').textContent).toEqual(i18n('FLIGHT_STATUS__NOW_BOARDING'));
    });

    it('should not show the on boarding header when isNowBoarding is false', () => {
      const { container } = createComponent();

      expect(container.querySelector('.boarding-header')).toBeNull();
    });
  });
});
