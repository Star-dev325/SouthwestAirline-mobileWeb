import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import FakeClock from 'test/unit/helpers/fakeClock';
import { render, fireEvent } from '@testing-library/react';
import LowFareDate from 'src/airBooking/components/lowFareDate';

describe('LowFareDate', () => {
  let onClickCalendarIconFnStub;

  beforeEach(() => {
    const noop = () => {};

    onClickCalendarIconFnStub = jest.fn(noop);
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  it('should mount the low fare date props', () => {
    const { baseElement } = createComponent();

    expect(baseElement).toMatchSnapshot();
  });

  it('should show a pretty dayjs styled date', () => {
    const { container } = createComponent();

    expect(container).toHaveTextContent('Depart Sun, Apr 5, 2020');
  });

  it('should show returning instead of departs', () => {
    const { container } = createComponent({ isInbound: true });

    expect(container).toHaveTextContent('Return Sun, Apr 5, 2020');
  });

  it('should show returning icon', () => {
    const { baseElement } = createComponent({ isInbound: true });

    expect(baseElement).toMatchSnapshot();
  });

  it('should call onClickCalendarIconFnStub when clicking calendar icon', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.icon_calender'));
    expect(onClickCalendarIconFnStub).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      flightDate: '2020-04-05',
      isInbound: false,
      onClickCalendarIconFn: onClickCalendarIconFnStub
    };

    return render(<LowFareDate {...defaultProps} {...props} />);
  };
});
