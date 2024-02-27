jest.mock('src/shared/helpers/deviceInfo');

import deviceInfo from 'src/shared/helpers/deviceInfo';
import MESSAGE_LOCATION_SERVICE from 'src/locationServices/i18n/locationServicesText';
import { getPermissionErrorMessageBasedOnPhoneType } from 'src/locationServices/helpers/messageHelper';

const originalDeviceOS = deviceInfo.os;

describe('messageHelper', () => {
  describe('getPermissionErrorMessageBasedOnPhoneType', () => {
    beforeAll(() => {
      jest.clearAllMocks();
    });
    afterEach(() => {
      deviceInfo.os = originalDeviceOS;
    });

    describe('iOS device', () => {
      it('should return iOS specific message', () => {
        deviceInfo.os = { name: 'iOS' };

        const iosMessage = getPermissionErrorMessageBasedOnPhoneType();

        expect(MESSAGE_LOCATION_SERVICE[iosMessage]).toEqual(
          'To enable Location Services, go to phone Settings > Privacy > Location Services. Enable both the device and browser location services settings.'
        );
      });
    });

    describe('Android device', () => {
      it('should return Android specific message', () => {
        deviceInfo.os = { name: 'Android' };

        const androidMessage = getPermissionErrorMessageBasedOnPhoneType();

        expect(MESSAGE_LOCATION_SERVICE[androidMessage]).toEqual(
          'To enable Location Services, go to Chrome Settings > Site Settings > Location. Turn on Location Services, clear the previously blocked websites and refresh.'
        );
      });
    });

    describe('Other devices', () => {
      it('should return Android specific message', () => {
        deviceInfo.os = {};

        const message = getPermissionErrorMessageBasedOnPhoneType();

        expect(message).toBeUndefined();
      });
    });
  });
});
