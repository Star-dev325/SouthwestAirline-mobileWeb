import sinon from 'sinon';
import DeviceInfo from 'src/shared/helpers/deviceInfo';
import { addGetTheAppLink, getTheAppLink } from 'src/homeAndNav/helpers/menuListDataHelper';
import i18n from '@swa-ui/locale';
import NavDrawerConstants from 'src/homeAndNav/constants/navDrawerConstants';

const { ANDROID_URL, IOS_URL } = NavDrawerConstants;

describe('menuListDataHelper', () => {
  const links = { Android: ANDROID_URL, iOS: IOS_URL };
  const fakeGetTheMobileApp = {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__GET_THE_MOBILE_APP'),
    dataQa: 'get-the-mobile-app',
    className: 'menu-list--border-bottom menu-list__get-the-app-link',
    isAccordion: false,
    childList: [],
    isWcmLink: false
  };

  context('addGetTheAppLink', () => {
    const INSERT_INDEX = 8;
    const fakeNavItem = {
      key: 'value'
    };
    const fakeMenuData = [];

    for (let i = 0; i < 9; i++) {
      fakeMenuData.push(fakeNavItem);
    }

    it('should return menuData when not a supported device', () => {
      sinon.stub(DeviceInfo, 'os').get(() => ({ name: 'NotASupportedDevice' }));
      const result = addGetTheAppLink(fakeMenuData, INSERT_INDEX);

      expect(result).to.deep.equal(fakeMenuData);
    });

    it('should return menuData with getTheMobileApp when a supported device', () => {
      sinon.stub(DeviceInfo, 'os').get(() => ({ name: 'iOS' }));
      const fakeGetTheMobileAppiOS = {
        ...fakeGetTheMobileApp,
        link: links.iOS
      };

      const result = addGetTheAppLink(fakeMenuData, INSERT_INDEX);

      expect(result[8]).to.deep.equal(fakeGetTheMobileAppiOS);
    });
  });

  context('getTheAppLink', () => {
    it('should return undefined if not a supported device', () => {
      sinon.stub(DeviceInfo, 'os').get(() => ({ name: 'NotASupportedDevice' }));

      const result = getTheAppLink();

      expect(result).to.equal(undefined);
    });

    it('should return app link if a supported device', () => {
      sinon.stub(DeviceInfo, 'os').get(() => ({ name: 'Android' }));
      const fakeGetTheMobileAppAndroid = {
        ...fakeGetTheMobileApp,
        link: links.Android
      };

      const result = getTheAppLink();

      expect(result).to.deep.equal(fakeGetTheMobileAppAndroid);
    });
  });
});
