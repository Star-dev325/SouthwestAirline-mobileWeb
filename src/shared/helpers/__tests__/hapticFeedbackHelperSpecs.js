import _ from 'lodash';
import { sandbox } from 'sinon';

import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import BrowserObject from 'src/shared/helpers/browserObject';
import DeviceInfo from 'src/shared/helpers/deviceInfo';

const { window } = BrowserObject;

const sinon = sandbox.create();

_.set(window, 'navigator.vibrate', _.noop);

describe('HapticFeedbackHelper', () => {
  let navigatorVibrateStub;

  beforeEach(() => {
    navigatorVibrateStub = sinon.stub(window.navigator, 'vibrate');
    sinon.stub(DeviceInfo, 'os').get(() => ({ name: 'Android' }));
    sinon.stub(DeviceInfo, 'browser').get(() => ({ name: 'Chrome' }));
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call navigator vibrate with default vibration pattern when no value is given', () => {
    playHapticFeedback();
    expect(navigatorVibrateStub).to.be.calledWith([200]);
  });

  it('should call navigator vibrate with given vibration pattern value', () => {
    playHapticFeedback([100, 100, 100]);
    expect(navigatorVibrateStub).to.be.calledWith([100, 100, 100]);
  });

  it('should not call navigator if iOS device', () => {
    sinon.stub(DeviceInfo, 'os').get(() => ({ name: 'iOS' }));
    playHapticFeedback();
    expect(navigatorVibrateStub).to.not.be.called;
  });

  it('should not call navigator if Firefox', () => {
    sinon.stub(DeviceInfo, 'browser').get(() => ({ name: 'Firefox' }));
    playHapticFeedback();
    expect(navigatorVibrateStub).to.not.be.called;
  });
});
