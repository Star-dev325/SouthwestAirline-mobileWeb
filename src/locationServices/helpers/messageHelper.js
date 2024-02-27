import DeviceInfo from 'src/shared/helpers/deviceInfo';
import i18n from '@swa-ui/locale';

const REENGAGEMENT_MAPPING = {
  iOS: i18n('LOCATION_SERVICES__IOS_REENGAGE_MESSAGE'),
  Android: i18n('LOCATION_SERVICES__ANDROID_REENGAGE_MESSAGE')
};

export const getPermissionErrorMessageBasedOnPhoneType = () => REENGAGEMENT_MAPPING[DeviceInfo.os.name];
