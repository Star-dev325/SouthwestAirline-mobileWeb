const sinon = require('sinon');
const dayjs = require('dayjs');

let fakeTimer;

module.exports = {
  setTimeTo(timeString) {
    const millisSinceUnixEpoch = dayjs(timeString).unix() * 1000;

    fakeTimer = sinon.useFakeTimers(millisSinceUnixEpoch, 'Date');
  },
  restore() {
    if (fakeTimer) {
      fakeTimer.restore();
    }
  },
  tick() {
    if (fakeTimer) {
      fakeTimer.tick();
    }
  }
};
