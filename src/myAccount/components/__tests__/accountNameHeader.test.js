import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import AccountNameHeader from 'src/myAccount/components/accountNameHeader';

describe('AccountNameHeader', () => {
  describe('enrolled in rapid rewards', () => {
    it('should show formatted name and rapid rewards number', () => {
      const { container } = render(<AccountNameHeader fullName="Helen Wang" rapidRewardsNumber="34588157376" />);

      expect(container.querySelector('[data-qa="user-name"]').textContent).toEqual('Helen Wang');
      expect(container.querySelector('[data-qa="rapid-rewards-number"]').textContent).toEqual(
        `${i18n('MY_ACCOUNT__HEADER__RR_NUMBER')} 34588157376`
      );
    });
  });

  describe('not enrolled in rapid rewards', () => {
    it('should show formatted name and not show rapid rewards number', () => {
      const { container } = render(<AccountNameHeader fullName="Helen Wang" rapidRewardsNumber={null} />);

      expect(container.querySelector('[data-qa="user-name"]').textContent).toEqual('Helen Wang');
      expect(container.querySelector('[data-qa="rapid-rewards-number"]')).toBeNull();
    });
  });
});
