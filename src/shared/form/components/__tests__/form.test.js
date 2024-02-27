import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Form from 'src/shared/form/components/form';
import waitFor from 'test/unit/helpers/waitFor';

describe('Form', () => {
  let onSubmitMock;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when submit the form', () => {
    it('should blur the active element', (done) => {
      const blurSpy = jest.spyOn(document.activeElement, 'blur');

      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      waitFor.untilAssertPass(() => {
        expect(blurSpy).toHaveBeenCalled();
      }, done);
    });

    it('should only submit once when click submit button multiple times', () => {
      const { container } = createComponent();

      for (let i = 0; i < 10; i++) {
        fireEvent.submit(container.querySelector('form'));
      }

      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });

    it('should trigger the onSubmit function', (done) => {
      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      waitFor.untilAssertPass(() => {
        expect(onSubmitMock).toHaveBeenCalled();
      }, done);
    });
  });

  describe('render', () => {
    it('should render fieldset', () => {
      const { container } = createComponent();

      expect(container.querySelector('fieldset')).not.toBeNull();
    });
  });

  describe('disabled form', () => {
    it('should have disabled fieldset when pass prop disabled is true', () => {
      const { container } = createComponent({
        disabled: true
      });

      expect(container).toMatchSnapshot();
    });

    it('should not have disabled fieldset when not pass disabled prop', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    onSubmitMock = jest.fn();
    const defaultProps = { formId: 'form', name: 'form', onSubmit: onSubmitMock };
    const MockedChildren = () => null;
    const combinedProps = { ...defaultProps, ...props };

    return render(
      <Form {...combinedProps}>
        <MockedChildren />
      </Form>
    );
  };
});
