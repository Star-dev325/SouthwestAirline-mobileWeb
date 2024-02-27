const gutil = require('gulp-util');
const os = require('os');

export const getMockServerDomain = () =>
  (gutil.env.docker && os.platform() === 'darwin' ? 'host.docker.internal' : 'localhost');

export const getApplePayMockServerPort = () => process.env.APPLE_PAY_PORT || 6824;
export const getChaseMockServerPort = () => process.env.CHASE_PORT || 6808;
export const getPayPalMockServerPort = () => process.env.PAYPAL_PORT || 6816;
