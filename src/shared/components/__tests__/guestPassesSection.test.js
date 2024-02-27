import React from 'react';
import GuestPassesSection from '../guestPassesSection';
import { render } from '@testing-library/react';

describe('GuestPassesSection', () => {
  const baseProps = {
    item: 'Text',
    itemSubText: 'Test',
    isConfirmationGuessPassesPage: false
  };

  describe('render', () => {
    it('should render default component correct', () => {
      const { container } = render(<GuestPassesSection {...baseProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should render component when itemSubText is null', () => {
      const guestPassesSectionProps = { ...baseProps, itemSubText: null };
      const { container } = render(<GuestPassesSection {...guestPassesSectionProps} />);

      expect(container).toMatchSnapshot();
      expect(container.querySelector('.guest-passes-review--sub-item')).toEqual(null);
    });

    it('should render default component correct when isConfirmationGuessPassesPage true', () => {
      const { container } = render(<GuestPassesSection {...baseProps} isConfirmationGuessPassesPage={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should render default component correct when itemSubText is null and isConfirmationGuessPassesPage true', () => {
      const guestPassesSectionProps = { ...baseProps, itemSubText: null };
      const { container } = render(
        <GuestPassesSection {...guestPassesSectionProps} isConfirmationGuessPassesPage={true} />
      );

      expect(container).toMatchSnapshot();
      expect(container.querySelector('.guest-passes-confirmation--sub-item_text')).toEqual(null);
    });
  });
});
