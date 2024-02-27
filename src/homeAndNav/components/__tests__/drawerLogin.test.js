import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import DrawerLogin from 'src/homeAndNav/components/drawerLogin';
import i18n from '@swa-ui/locale';

describe('#drawerLogin', () => {
  let props;
  const onDrawerLoginClickedMock = jest.fn();
  const toggleDrawerMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#before login', () => {
    beforeEach(() => {
      props = {
        isLoggedIn: false
      };
    });

    it('should hide login info before logined', () => {
      const { container } = createComponent(props);

      expect(container.querySelector('.drawer-login--info')).toBeNull();
    });

    it('should transition to login page when click reminder', () => {
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.drawer-login'));

      expect(onDrawerLoginClickedMock).toHaveBeenCalledWith('/login?clk=GNAVLOGIN2', null, { to: '/my-account' });
    });
  });

  describe('#after login', () => {
    beforeEach(() => {
      props = {
        isLoggedIn: true,
        userInfo: {
          accountInfo: {
            customerInfo: {
              name: {
                userName: 'test'
              }
            },
            isTierStatusPending: false,
            rapidRewardsDetails: {
              isEnrolledInRapidRewards: true,
              redeemablePoints: 33476,
              tierInfo: {
                tier: 'A_LIST_PREFERRED'
              }
            }
          }
        }
      };
    });

    it('should hide the reminder', () => {
      const { container } = createComponent(props);

      expect(container.querySelector('.drawer-login--placeholder')).toHaveClass('hide');
    });

    it('should display the current tier if End-of-Year Tier is not processing', () => {
      const { container } = createComponent(props);

      expect(container.querySelectorAll('.flex-main-between p')[0].textContent).toEqual('A-List Preferred');
      expect(container.querySelectorAll('.flex-main-between p')[1].textContent).toEqual(i18n('HOME_AND_NAV__PTS'));
    });

    it('should not display the current tier if End-of-Year Tier is processing', () => {
      props = {
        ...props,
        userInfo: {
          accountInfo: {
            customerInfo: {
              name: {
                userName: 'test'
              }
            },
            isTierStatusPending: true,
            rapidRewardsDetails: {
              isEnrolledInRapidRewards: true,
              redeemablePoints: 33476,
              tierInfo: {
                tier: 'A_LIST_PREFERRED'
              }
            }
          }
        }
      };
      const { getByText } = createComponent(props);

      expect(getByText(i18n('HOME_AND_NAV__PTS'))).toBeInTheDocument();
    });

    it('transition to rapidrewards page when click the user info', () => {
      const { container } = createComponent(props);

      fireEvent.click(container.querySelector('.drawer-login'));

      expect(onDrawerLoginClickedMock).toHaveBeenCalledWith('/my-account?clk=GNAVMYACCT2');
    });
  });

  const createComponent = (props) => {
    const componentProps = { onDrawerLoginClicked: onDrawerLoginClickedMock, toggleDrawer: toggleDrawerMock, ...props };

    return render(<DrawerLogin {...componentProps} />);
  };
});
