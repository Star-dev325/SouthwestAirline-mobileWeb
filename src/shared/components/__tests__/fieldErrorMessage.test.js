import { render } from '@testing-library/react';
import React from 'react';
import { FIELD_ERROR_MESSAGE, REQUIRED_ERROR } from 'src/shared/form/constants/validationErrorTypes';
import FieldErrorMessage from 'src/shared/components/fieldErrorMessage';

describe('FieldErrorMessage', () => {
  it('should show error message', () => {
    const { container } = createComponent({
      msg: 'some error message',
      type: FIELD_ERROR_MESSAGE
    });

    expect(container.querySelector('.field--error-msg').textContent).toContain('some error message');
  });

  it('should not show anything when it is not a FIELD_ERROR_MESSAGE type', () => {
    const { container } = createComponent({
      msg: 'some error message',
      type: REQUIRED_ERROR
    });

    expect(container.querySelector('.field--error-msg')).toBeNull();
  });

  const createComponent = (error) => render(<FieldErrorMessage error={error} />);
});
