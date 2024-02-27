import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CarCrossSell from 'src/airBooking/components/carCrossSellBanner';

describe('CarCrossSellBanner', () => {
  let onClickStub;

  beforeEach(() => {
    const noop = () => {};

    onClickStub = jest.fn(noop);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct component', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call the onClick property when car cross sell button is clicked', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.car-cross-sell--button'));

    expect(onClickStub).toHaveBeenCalled();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      ...props,
      onClick: onClickStub
    };

    return render(<CarCrossSell {...defaultProps} />);
  };
});
