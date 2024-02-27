import React from 'react';
import EarlyBirdSwitch from 'src/airBooking/components/earlyBirdSwitch';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';

describe('EarlyBirdSwitch', () => {
  let saveEarlyBirdSelectedFnMock;

  beforeEach(() => {
    saveEarlyBirdSelectedFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call saveEarlyBirdSelectedFn with check value', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('.toggle-switch'));

    waitFor(() => {
      expect(saveEarlyBirdSelectedFnMock).toHaveBeenCalled();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      earlyBirdSelected: false,
      saveEarlyBirdSelectedFn: saveEarlyBirdSelectedFnMock
    };

    const store = createMockStoreWithRouterMiddleware()();
    const finalProps= { ...defaultProps, ...props };
  
    return render(
      <Provider store={store}>
        <EarlyBirdSwitch {...finalProps} />
      </Provider>
    );
  };
});
