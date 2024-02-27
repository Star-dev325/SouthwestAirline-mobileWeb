import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorDetails from 'src/shared/components/errorDetails';

describe('error details', () => {
  it('should display nothing on initial render', () => {
    const { container } = createComponent();

    expect(container.querySelector('pre')).not.toBeInTheDocument();
  });

  it('should display error details when user presses Shift + F10', () => {
    const { container, getByTestId } = createComponent();

    fireEvent.keyUp(getByTestId('container'), { keyCode: 121, shiftKey: true });

    expect(container).toHaveTextContent('mock error');
    expect(container).toHaveTextContent('mock error info');
  });

  it('should display nothing if F10 and shift are not pressed', () => {
    const { container } = createComponent();

    expect(container.querySelector('pre')).not.toBeInTheDocument();
  });

  it('should invoke removeEventListener on unmount', () => {
    jest.spyOn(window, 'removeEventListener');
    const { unmount } = createComponent();

    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('keyup', expect.any(Function));
  });

  const createComponent = () => {
    const props = {
      error: 'mock error',
      errorInfo: { componentStack: 'mock error info' }
    };

    return render(
      <div data-testid="container">
        <ErrorDetails {...props} />
      </div>
    );
  };
});
