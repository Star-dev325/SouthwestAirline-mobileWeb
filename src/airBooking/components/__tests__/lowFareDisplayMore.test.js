import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import LowFareDisplayMore from 'src/airBooking/components/lowFareDisplayMore';
import FakeClock from 'test/unit/helpers/fakeClock';

describe('LowFareDisplayMore', () => {
  let onClickStub;

  beforeEach(() => {
    const noop = () => {};

    onClickStub = jest.fn(noop);
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  describe('showLoading false', () => {
    it('should render image loadingEllipses.gif', () => {
      const { baseElement } = createComponent();

      expect(baseElement).toMatchSnapshot();
    });

    it('should call onClick when clicked', () => {
      const { container } = createComponent();
      const lowFareDisplayMore = container.querySelector('.low-fare-calendar--fetch-prev-next');

      fireEvent.click(lowFareDisplayMore);

      expect(onClickStub).toHaveBeenCalled();
    });
  });

  describe('showLoading true', () => {
    it('should render image loadingEllipses.gif', () => {
      const { baseElement } = createComponent({ showLoading: true });

      expect(baseElement).toMatchSnapshot();
    });

    it('should not call onClick when clicked', () => {
      const { container } = createComponent({ showLoading: true });
      const lowFareDisplayMore = container.querySelector('.low-fare-calendar--fetch-prev-next');

      fireEvent.click(lowFareDisplayMore);

      expect(onClickStub).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      onClick: onClickStub,
      showLoading: false
    };

    return render(<LowFareDisplayMore {...defaultProps} {...props} />);
  };
});
