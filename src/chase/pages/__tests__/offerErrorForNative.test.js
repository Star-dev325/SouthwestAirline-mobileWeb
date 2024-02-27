import i18n from '@swa-ui/locale';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { OfferErrorForNative } from 'src/chase/pages/offerErrorForNative';

describe('Offer Apply Error For Native Page', () => {
  it('should render Offer Apply Error For Native Page correctly', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render MessageInstructions with correct message', () => {
    createComponent();

    expect(screen.queryByText(i18n('CHASE_NATIVE_ERROR_INSTRUCTION_MAIN'))).toBeInTheDocument();
  });

  function createComponent() {
    return render(<OfferErrorForNative />);
  }
});
