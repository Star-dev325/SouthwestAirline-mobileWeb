import { act, render } from '@testing-library/react';
import React from 'react';
import CountdownTimer from 'src/shared/components/countdownTimer';

describe('CountdownTimer', () => {
  let onCountdownFinishCallbackFnMock;

  beforeEach(() => {
    jest.useFakeTimers();
    const noop = () => {};

    onCountdownFinishCallbackFnMock = jest.fn(noop);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should render the component correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render component with new time', () => {
    const { container } = createComponent({ time: 9, text: 'test information text' });

    expect(container).toMatchSnapshot();
  });

  it('should render component with time null', () => {
    const { container } = createComponent({ time: null, text: 'test information text' });

    expect(container).toMatchSnapshot();
  });

  it('should call onCountdownFinishCallback when timed out', () => {
    const { container } = createComponent({
      time: 3,
      text: 'test information text',
      onCountdownFinishCallback: onCountdownFinishCallbackFnMock
    });

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(onCountdownFinishCallbackFnMock).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      time: 300,
      text: 'remaining to secure your A1-A15 spot.*',
      ...props
    };

    return render(<CountdownTimer {...defaultProps} />);
  };
});
