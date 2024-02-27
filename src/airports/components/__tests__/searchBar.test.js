import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import SearchBar from 'src/airports/components/searchBar';
import waitFor from 'test/unit/helpers/waitFor';

describe('SearchBar', () => {
  let onCancelStub;
  let onChangeStub;

  beforeEach(() => {
    onCancelStub = jest.fn();
    onChangeStub = jest.fn();
  });

  it('should not show cancel button when init', () => {
    const { container } = createComponent();

    expect(container.querySelector('.airport-search-bar--cancel')).toBeNull();
  });

  it('should show cancel button when text field get focus', () => {
    const { container } = createComponent();

    container.querySelector('input').focus();

    expect(container.querySelector('.airport-search-bar--cancel')).toBeInTheDocument();
  });

  it('should not show cancel button when not required', () => {
    const { container } = createComponent({ showCancel: false });

    container.querySelector('input').blur();

    expect(container).toMatchSnapshot();
  });

  it('should call onCancel upon clicking on remove button when cancel is not required', () => {
    const { container } = createComponent({ showCancel: false });

    fireEvent.change(container.querySelector('input'), { target: { value: 'ca' } });
    fireEvent.click(container.querySelector('i.airport-search-bar--remove'));

    expect(onCancelStub).toHaveBeenCalled();
  });

  describe('when text field lose focus', () => {
    it('should hide cancel button when no value in text field', () => {
      const { container } = createComponent();

      container.querySelector('input').blur();

      const cancelButton = container.querySelector('.airport-search-bar--cancel');

      expect(cancelButton).not.toBeInTheDocument();
    });

    it('should show cancel button when has value in text field', () => {
      const { container } = createComponent();
      const input = container.querySelector('input');

      input.focus();
      fireEvent.change(input, { target: { value: 'lax' } });
      input.blur();

      const cancelButton = container.querySelector('.airport-search-bar--cancel');

      expect(cancelButton).toBeInTheDocument();
    });
  });

  describe('when click cancel button', () => {
    it('should clean value and hide cancel button when click cancel', () => {
      const { container } = createComponent();
      const input = container.querySelector('input');

      input.focus();
      fireEvent.change(input, { target: { value: 'lax' } });
      fireEvent.click(container.querySelector('.airport-search-bar--cancel'));

      expect(input.value).toEqual('');
      expect(container.querySelector('.airport-search-bar--cancel')).not.toBeInTheDocument();
    });
  });

  describe('remove text button', () => {
    it('should hide remove when text field empty', () => {
      const { container } = createComponent();

      expect(container.querySelector('i.airport-search-bar--remove')).toHaveClass('hide');
    });

    it('should show remove when text field has text', (done) => {
      const { container } = createComponent();

      fireEvent.change(container.querySelector('input'), { target: { value: 'ca' } });

      waitFor.untilAssertPass(() => {
        expect(container.querySelector('i.airport-search-bar--remove')).not.toHaveClass('hide');
      }, done);
    });

    it('should clear all text field and trigger change when click remove button', () => {
      const { container } = createComponent();
      const input = container.querySelector('input');

      fireEvent.change(container.querySelector('input'), { target: { value: 'ca' } });
      fireEvent.click(container.querySelector('i.airport-search-bar--remove'));

      expect(input.value).toEqual('');
      expect(onChangeStub).toHaveBeenCalledTimes(2);
    });
  });

  function createComponent(props = {}) {
    const defaultProps = {
      onBlur: jest.fn(),
      onCancel: onCancelStub,
      onChange: onChangeStub,
      onFocus: jest.fn()
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    return render(<SearchBar {...newProps} />);
  }
});
