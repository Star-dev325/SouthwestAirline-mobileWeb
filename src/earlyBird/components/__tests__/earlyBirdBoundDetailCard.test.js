import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EarlyBirdBoundDetailCard from 'src/earlyBird/components/earlyBirdBoundDetailCard';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('EarlyBirdBoundDetailCard', () => {
  it('should display bounds card title when is a outbound', () => {
    const { container } = createComponent();

    expect(container.querySelector('.early-bird-origin-destination-card--title').textContent).toEqual('DEPARTING');
  });

  it('should display bounds card title when is a inbound', () => {
    const { container } = createComponent({ boundType: 'RETURNING' });

    expect(container.querySelector('.early-bird-origin-destination-card--title').textContent).toEqual('RETURNING');
  });

  it('should display bound summary', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should display each passenger', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('.early-bird-passenger-checkbox')).toHaveLength(2);
  });

  const createComponent = (bound = {}) => {
    const passengers = [
      {
        name: 'Fred Flintstone',
        canPurchaseEarlyBird: true
      },
      {
        name: 'Barney Rubble',
        canPurchaseEarlyBird: false
      }
    ];

    const boundDetail = {
      boundType: 'DEPARTING',
      boundBrief: {
        departureAirportCode: 'DAL',
        departureDate: '2018-05-19',
        departureDayOfWeek: 'Saturday',
        departureTime: '06:20',
        arrivalAirportCode: 'MSP',
        arrivalTime: '11:25'
      },
      passengers
    };

    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store);
    const boundDetails = { ...boundDetail, ...bound };

    return render(
      <MockedForm>
        <EarlyBirdBoundDetailCard
          boundDetail={boundDetails}
          onClickIneligibleLabel={() => {}}
          onChangeEBCheckbox={() => {}}
          boundOrder="bound_0"
        />
      </MockedForm>
    );
  };
});
