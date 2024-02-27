import React from 'react';
import { render } from '@testing-library/react';
import EarlyBirdConfirmationNumber from 'src/earlyBird/components/earlyBirdConfirmationNumber';
import i18n from '@swa-ui/locale';

describe('earlyBirdConfirmationNumber', () => {
  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render earlyBirdConfirmationNumber', () => {
    const expectRecordLocator = 'ABC123';
    const { container } = createComponent(expectRecordLocator);

    expect(container.querySelector('.early-bird-receipt-info--title').textContent).toEqual(
      i18n('EARLY_BIRD_CONFIRMATION_TITLE')
    );
    expect(container.querySelector('.early-bird-receipt-info--number').textContent).toEqual(expectRecordLocator);
  });

  function createComponent(expectRecordLocator) {
    return render(<EarlyBirdConfirmationNumber recordLocator={expectRecordLocator} />);
  }
});
