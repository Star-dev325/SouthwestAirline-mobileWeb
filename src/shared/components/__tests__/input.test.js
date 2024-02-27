import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Input from 'src/shared/components/input';

describe('Input', () => {
  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('Input should rendered with correct class', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('div')[0]).toMatchSnapshot();
  });

  it('Input should render when with prop `size`', () => {
    const { container } = createComponent({ size: 'mini' });

    expect(container.querySelectorAll('div')[0]).toMatchSnapshot();
  });

  it('Input should render when with prop `fluid`', () => {
    const { container } = createComponent({ fluid: true });

    expect(container.querySelectorAll('div')[0]).toMatchSnapshot();
  });

  it('Input should render when with className `testName`', () => {
    const { container } = createComponent({ className: 'testName' });

    expect(container.querySelectorAll('div')[0]).toMatchSnapshot();
  });

  it('Input should render with value when default value is passed in', () => {
    const { container } = createComponent({ defaultValue: 'default' });

    expect(container.querySelectorAll('input')[0]).toHaveValue('default');
  });

  describe('mask prop', () => {
    describe('when given', () => {
      it('should render a MaskedInputElement', () => {
        const { container } = createComponent({ mask: '999-999-9999' });

        expect(container).toMatchSnapshot();
      });
    });

    describe('when not given', () => {
      it('should not render a MaskedInputElement', () => {
        const { container } = createComponent();

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('label clicked', () => {
    it('should call onLabelClick when click label', () => {
      const onLabelClickStub = jest.fn();
      const Label = <label>label</label>;
      const { container } = createComponent({
        label: Label,
        onLabelClick: onLabelClickStub
      });

      fireEvent.click(container.querySelector('.input--label'));

      expect(onLabelClickStub).toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => render(<Input {...props} />);
});
