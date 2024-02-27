import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import MyAccountPanelHeader from 'src/myAccount/components/myAccountPanelHeader';

describe('MyAccountPanelHeader', () => {
  describe('congratulations', () => {
    it('should show congratulations when showCongratulations is true', () => {
      const { container } = render(<MyAccountPanelHeader showCongratulations />);

      expect(container.textContent).toContain(i18n('MY_ACCOUNT__CONGRATULATIONS'));
    });

    it('should not show congratulations when showCongratulations is false', () => {
      const { container } = render(<MyAccountPanelHeader />);

      expect(container.querySelector('.my-account-panel-header')).toBeNull();
    });
  });
});
