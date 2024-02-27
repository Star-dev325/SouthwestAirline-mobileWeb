import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FlightCard from 'src/flightStatus/components/flightCard';
import FlightSchedulesPageBuilder from 'test/builders/apiResponse/flightSchedulesPageBuilder';

describe('FlightCard', () => {
  let onFlightCardClickedMock;

  beforeEach(() => {
    onFlightCardClickedMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call onFlightCardClicked when user click the FlightCard', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.flight-card'));

    expect(onFlightCardClickedMock).toBeCalled();
  });

  const createComponent = (props) => {
    const defaultProps = {
      flight: new FlightSchedulesPageBuilder().build().flightSchedulesPage.flights[0],
      onFlightCardClicked: onFlightCardClickedMock
    };
    const finalProps = { ...defaultProps, ...props };

    return render(<FlightCard {...finalProps} />);
  };
});
