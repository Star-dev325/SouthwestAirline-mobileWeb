import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ReaccomFlightProduct from 'src/shared/components/reaccomFlightProduct';
import ReaccomFlightProductBuilder from 'test/builders/model/reaccomFlightProductBuilder';

describe('ReaccomFlightProduct', () => {
  let onProductSelectedMock;
  let reaccomFlightProduct;

  beforeEach(() => {
    onProductSelectedMock = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render original flight info', () => {
      reaccomFlightProduct = new ReaccomFlightProductBuilder().build();
      const { container } = createComponent(reaccomFlightProduct);
      
      const flightTime = container.querySelectorAll('.flight-time--time');
      const flightInfo = container.querySelector('[data-qa="flight-info"]');

      expect(flightTime[0].textContent).toBe('10:40AM');
      expect(flightTime[1].textContent).toBe('11:40AM');
      expect(flightInfo.textContent).toBe('519/1134');
    });

    it('should render flight duration in hours and minutes', () => {
      reaccomFlightProduct = new ReaccomFlightProductBuilder().build();
     
      const { container } = createComponent(reaccomFlightProduct);

      const flightDuration = container.querySelector('[data-qa="flight-duration-minutes"]');

      expect(flightDuration.textContent).toBe('1h 0m');
    });

    it('should render stop description and cty', () => {
      reaccomFlightProduct = new ReaccomFlightProductBuilder().build();
      
      const { container } = createComponent(reaccomFlightProduct);

      const flightDescription = container.querySelector('[data-qa="stop-description"]');
      const stopCity = container.querySelector('[data-qa="stop-city"]');

      expect(flightDescription.textContent).toBe('1 Stop');
      expect(stopCity.textContent).toBe(', DAL');
    });

    it('should not render stop city if not set', () => {
      const { container } = createComponent(new ReaccomFlightProductBuilder().withNonStop().build());

      const flightDescription = container.querySelector('[data-qa="stop-description"]');
      const stopCity = container.querySelector('[data-qa="stop-city"]');

      expect(flightDescription.textContent).toBe('Nontop');
      expect(stopCity).toBeNull();
    });

    it('should render next day when isNextDayArrival is true', () => {
      const { container } = createComponent(new ReaccomFlightProductBuilder().withNextDay().build());

      const flightDescription = container.querySelector('[data-qa="reaccom-is-next-day-or-overnight"]');

      expect(flightDescription.textContent).toBe('AIR_BOOKING__SHOPPING__NEXT_DAY');
    });

    it('should not render next day when isNextDayArrival is false', () => {
      const { container } = createComponent(new ReaccomFlightProductBuilder().build());
      
      const flightDescription = container.querySelector('[data-qa="reaccom-is-next-day-or-overnight"]');

      expect(flightDescription.textContent).not.toBe('AIR_BOOKING__SHOPPING__NEXT_DAY');
    });

    it('should render next day when isOvernight is true', () => {
      const { container } = createComponent(new ReaccomFlightProductBuilder().withOvernight().build());

      const flightDescription = container.querySelector('[data-qa="reaccom-is-next-day-or-overnight"]');

      expect(flightDescription.textContent).toBe('AIR_BOOKING__SHOPPING__OVERNIGHT');
    });

    it('should not render next day when isOvernight is false', () => {
      const { container } = createComponent(new ReaccomFlightProductBuilder().build());

      const flightDescription = container.querySelector('[data-qa="reaccom-is-next-day-or-overnight"]');

      expect(flightDescription.textContent).not.toBe('AIR_BOOKING__SHOPPING__OVERNIGHT');
    });
  });

  describe('onProductSelected', () => {
    it('should call onProductSelected when card is clicked', () => {
      reaccomFlightProduct = new ReaccomFlightProductBuilder().build();
      
      const { container } = createComponent(reaccomFlightProduct);
      
      fireEvent.click(container.querySelector('[data-testid="reaccom-flight-product"]'));

      const labelContainer = container.querySelectorAll('.label-container--label');
      const flightTime = container.querySelectorAll('.flight-time--time');
      const stops = container.querySelector('.stops');
      const flightInfo = container.querySelector('[data-qa="flight-info"]');
      
      expect(labelContainer[0].textContent).toBe('Departs');
      expect(flightTime[0].textContent).toBe('10:40AM');
      expect(labelContainer[1].textContent).toBe('Arrives');
      expect(flightTime[1].textContent).toBe('11:40AM');
      expect(stops.textContent).toBe('1 Stop');
      expect(flightInfo.textContent).toBe('519/1134');
    });
  });

  const createComponent = (flightProduct) => {
    const props = {
      onProductSelected: onProductSelectedMock,
      flightProductCard: flightProduct
    };

    return render(<ReaccomFlightProduct {...props} />);
  };
});
