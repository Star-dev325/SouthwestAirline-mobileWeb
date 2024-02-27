import _ from 'lodash';
import NavDrawerConstants from 'src/homeAndNav/constants/navDrawerConstants';
import DeviceInfo from 'src/shared/helpers/deviceInfo';
import MenuListConstants from 'src/homeAndNav/constants/menuListConstants';
import i18n from '@swa-ui/locale';

const { ANDROID, IOS } = MenuListConstants;
const { ANDROID_URL, IOS_URL } = NavDrawerConstants;
const links = { Android: ANDROID_URL, iOS: IOS_URL };

const isSupportedDevice = (deviceOS) => deviceOS === ANDROID || deviceOS === IOS;

export const getTheAppLink = () => {
  const deviceOS = _.get(DeviceInfo, 'os.name');
  const getTheMobileApp = {
    menuTitle: i18n('HOME_AND_NAV__MENU_LIST__GET_THE_MOBILE_APP'),
    dataQa: 'get-the-mobile-app',
    className: 'menu-list--border-bottom menu-list__get-the-app-link',
    isAccordion: false,
    link: links[deviceOS],
    childList: [],
    isWcmLink: false
  };

  if (isSupportedDevice(deviceOS)) {
    return getTheMobileApp;
  }
};

export const addGetTheAppLink = (menuData, indexToInsert) =>
  _.compact([...menuData.slice(0, indexToInsert), getTheAppLink(), ...menuData.slice(indexToInsert)]);
