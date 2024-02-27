import React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from 'src/shared/components/spinner';

describe('Spinner', () => {
  const createComponent = (props) => {
    const defaultProps = {
      showSpinner: true,
      isWebView: false,
      appReady: true
    };

    return render(<Spinner {...defaultProps} {...props} />);
  };

  it('should be hidden when showSpinner is false', () => {
    const { container } = createComponent({
      showSpinner: false
    });

    expect(container).toMatchSnapshot();
  });

  it('should be shown when showSpinner is true', () => {
    const { container } = createComponent({
      showSpinner: true
    });

    expect(container).toMatchSnapshot();
  });

  it('should be shown when showSpinner, appReady, and isWebView are true', () => {
    const { container } = createComponent({
      showSpinner: true,
      appReady: true,
      isWebView: true
    });

    expect(container).toMatchSnapshot();
  });

  it('should be hidden when isWebView is true and appReady is false', () => {
    const { container } = createComponent({
      showSpinner: true,
      appReady: false,
      isWebView: true
    });

    expect(container).toMatchSnapshot();
  });

  it('should use a darker opacity when there is a spinner message', () => {
    const { container } = createComponent({
      appReady: true,
      isWebView: false,
      showSpinner: true,
      spinnerMessage: 'Test'
    });

    expect(container.querySelector('.dimmer-with-message')).not.toBe(null);
  });

  it('should update when the spinner message updates', () => {
    const { container, rerender } = createComponent({
      appReady: true,
      isWebView: false,
      showSpinner: true,
      spinnerMessage: 'Test'
    });

    rerender(<Spinner appReady showSpinner spinnerMessage="Updated message" />);

    expect(container).toMatchSnapshot();
  });
});
