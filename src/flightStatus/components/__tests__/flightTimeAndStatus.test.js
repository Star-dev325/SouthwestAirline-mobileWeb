import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import FlightTimeAndStatus from 'src/flightStatus/components/flightTimeAndStatus';

describe('flightTimeAndStatus', () => {
  const defaultProps = {
    flightStatus: 'ON TIME',
    statusType: 'POSITIVE',
    timeString: '2015-04-28T19:15:00',
    isNextDay: false,
    statusIconPosition: 'UPPER'
  };

  describe('when initialize', () => {
    it('should render properly', () => {
      const { container } = createComponent(defaultProps);

      expect(container).toMatchSnapshot();
    });

    it('should render with correct class name', () => {
      const { container } = createComponent(defaultProps);

      expect(container.querySelector('.flight-time-status')).not.toBeNull();
      expect(container.querySelector('.flight-time-status--on-time')).not.toBeNull();
    });
  });

  describe('when flightStatus is given', () => {
    it('should render correctly when the flight is delayed', () => {
      const { container } = createComponent({
        flightStatus: 'DELAYED',
        statusType: 'NEGATIVE',
        timeString: '2015-04-28T19:15:00',
        isNextDay: false,
        statusIconPosition: 'UNDER',
        originalTime: '19:00'
      });

      expect(container.querySelector('.segment-status-col')).toMatchSnapshot();
    });
  });

  describe('when flightStatus is not given', () => {
    it('should render FlightTime but no FlightStatusIcon', () => {
      const { container } = createComponent({
        timeString: '2015-04-28T19:15:00',
        isNextDay: false
      });

      const flightTime = container.querySelector('.flight-time--time');
      const flightStatusIcon = container.querySelector('.segment-status-col');

      expect(flightTime).not.toBeNull();
      expect(flightStatusIcon).toBeNull();
    });
  });

  describe('isNextDay & isOvernight', () => {
    it('should render FlightTime with nextDay icon when isNextDay is true', () => {
      const { container } = createComponent({
        timeString: '2015-04-28T19:15:00',
        isNextDay: true
      });

      expect(container.querySelector('.flight-time-status').textContent).toContain(`7:15PM${i18n('AIR_BOOKING__SHOPPING__NEXT_DAY')}`);
    });

    it('should render FlightTime without children when isNextDay is false', () => {
      const { container } = createComponent({
        timeString: '2015-04-28T19:15:00',
        isNextDay: false
      });

      expect(container.querySelector('[da-qa="next-day-indicator"]')).toBeNull();
    });

    it('should render FlightTime with Overnight icon when isOvernight is true', () => {
      const { container } = createComponent({
        timeString: '2015-04-28T19:15:00',
        isOvernight: true
      });

      expect(container.querySelector('.flight-time-status').textContent).toContain(`7:15PM${i18n('AIR_BOOKING__SHOPPING__OVERNIGHT')}`);
    });

    it('should render FlightTime without children when isOvernight is false', () => {
      const { container } = createComponent({
        timeString: '2015-04-28T19:15:00',
        isOvernight: false
      });

      expect(container.querySelector('[da-qa="overnight-indicator"]')).toBeNull();
    });

    it('should render FlightTime with only Overnight icon when isOvernight and isNextDay are both true', () => {
      const { container } = createComponent({
        timeString: '2015-04-28T19:15:00',
        isOvernight: true,
        isNextDay: true
      });

      expect(container.querySelector('.flight-time-status').textContent).toContain(`7:15PM${i18n('AIR_BOOKING__SHOPPING__OVERNIGHT')}`);
    });
  });

  const createComponent = (props) => render(<FlightTimeAndStatus {...props} />);
});
