import React from 'react';
import { render } from '@testing-library/react';
import GenerateErrorPage from 'src/shared/featureToggle/generateErrorPage';

describe('GenerateErrorPage', () => {
  it('should generate error', () => {
    let errorMessage;

    try {
      render(<GenerateErrorPage />);
    } catch (error) {
      errorMessage = error?.message;
    }

    expect(errorMessage).toEqual('generated error');
  });
});
