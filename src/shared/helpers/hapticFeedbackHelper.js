// @flow
import BrowserObject from 'src/shared/helpers/browserObject';
import DeviceInfo from 'src/shared/helpers/deviceInfo';

const { window } = BrowserObject;

export const playHapticFeedback = (feedbackPattern: Array<number> | number = [200]) => {
  const isAndroid = DeviceInfo.os.name === 'Android';
  const isNotFirefox = DeviceInfo.browser.name !== 'Firefox';

  isAndroid && isNotFirefox && window.navigator.vibrate(feedbackPattern);
};
