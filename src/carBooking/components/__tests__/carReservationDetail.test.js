import { render } from '@testing-library/react';
import React from 'react';
import CarReservationDetail from 'src/carBooking/components/carReservationDetail';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';

describe('carReservationDetail', () => {
  const carReservation = new CarReservationBuilder().build();

  describe('render', () => {
    it('should render correct count of HorizontalLabelContainer', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.mt2')).toHaveLength(5);
    });

    it('should render Currency', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.currency')).toHaveLength(2);
    });
  });

  describe('display mileage', () => {
    it('should display mileage with `xxx Free - $xxx.xx per unit` when freeMileage is `Unlimited`', () => {
      const { container } = createComponent({
        mileage: {
          cents: 30,
          freeMileage: '300',
          per: 'Mile'
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should display mileage with `Unlimited` when freeMileage is `Unlimited`', () => {
      const { container } = createComponent({
        mileage: {
          cents: 0,
          freeMileage: 'Unlimited',
          per: 'Mile'
        }
      });

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const mergedProps = { ...carReservation.carReservationDetail, ...props };

    return render(<CarReservationDetail {...mergedProps} />);
  };
});
