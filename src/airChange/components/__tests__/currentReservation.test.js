import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import CurrentReservation from 'src/airChange/components/currentReservation';

describe('currentReservation', () => {
  const defaultProps = {
    date: '2018-05-04',
    departsTime: '06:00',
    arrivesTime: '09:10',
    flightTime: '3h 10m',
    flight: '1628/436',
    stopDescription: 'Nonstop',
    isNextDayArrival: false,
    shortStopDescription: '1 Stop',
    stopCity: 'DAL'
  };

  describe('render', () => {
    let container, wrapper;

    beforeEach(() => {
      wrapper = createComponent();
      container = wrapper.container;
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render original flight info', () => {
      expect(container.querySelectorAll('.label-container--content')[0].textContent).toEqual('6:00AM');
      expect(container.querySelectorAll('.label-container--content')[1].textContent).toEqual('9:10AM');
      expect(container.querySelector('.icon_airplane')).not.toBeNull();
      expect(container.querySelector('[data-qa="flight-info"]').textContent).toEqual(defaultProps.flight);
    });

    it('should render current reservation text', () => {
      expect(container.querySelector('.current-reservation-info > div').textContent).toEqual('Current ReservationFri, May 4, 2018');
    });

    it('should render flight duration in hours and minutes', () => {
      expect(container.querySelector('[data-qa="flight-duration-minutes"]').textContent).toEqual('3h 10m');
    });

    it('should render stop description and cty', () => {
      expect(container.querySelector('[data-qa="stop-description"]').textContent).toEqual(expect.stringContaining('1 Stop'));
      expect(container.querySelector('[data-qa="stop-city"]').textContent).toEqual(expect.stringContaining(', DAL'));
    });

    it('should not render stop city if not set', () => {
      const { container: currentReservation } = createComponent({ stopCity: null });

      expect(currentReservation.querySelector('[data-qa="stop-description"]').textContent).toEqual(expect.stringContaining('1 Stop'));
      expect(currentReservation.querySelector('[data-qa="stop-city"]')).toBeNull();
    });

    it('should render next day indicator when isNextDayArrival is true', () => {
      const { container: currentReservation } =  createComponent({ isNextDayArrival: true });

      expect(currentReservation.querySelector('[data-qa="next-day-indicator"]').textContent).toEqual(expect.stringContaining(i18n('AIR_BOOKING__SHOPPING__NEXT_DAY')));
    });

    it('should not render next day indicator when isNextDayArrival is false', () => {
      const { container: currentReservation } =  createComponent({ isNextDayArrival: false });

      expect(currentReservation.querySelector('[data-qa="next-day-indicator"]')).toBeNull();
    });

    it('should render overnight indicator when isOvernight is true', () => {
      const { container: currentReservation } =  createComponent({ isOvernight: true });

      expect(currentReservation.querySelector('[data-qa="overnight-indicator"]').textContent).toEqual(expect.stringContaining(i18n('AIR_BOOKING__SHOPPING__OVERNIGHT')));
    });

    it('should not render overnight indicator when isOvernight is false', () => {
      const { container: currentReservation } =  createComponent({ isOvernight: false });

      expect(currentReservation.querySelector('[data-qa="overnight-indicator"]')).toBeNull();
    });

    it('should not render stops component if shortStopDescription lacks value', () => {
      const { container: currentReservation } =  createComponent({ shortStopDescription: null });

      expect(currentReservation.querySelector('[data-qa="stop-description"]')).toBeNull();
    });
  });

  const createComponent = (props = {}) => {
    const currentReservationProps = { currentReservation: { ...defaultProps, ...props } };

    return render(<CurrentReservation {...currentReservationProps} />);
  };
});
