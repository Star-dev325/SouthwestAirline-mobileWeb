const dayjs = require('dayjs');

class LoginApiResponseBuilder {
  constructor() {
    this.accessToken = 'd4EBp7Ay0xjT6M3MiabgAQ|5ds5-4JHym5nVKNZ06pxTM0yQTu_5A4RUYTqw07nQ3xo10ale-lL8qPi5YnrdNfEHUlUJvNp5QuvOtWBOBFEB195ZkNp9NSr_VRFKFbSy80';
    this.refreshToken = '-L4GcXupYmZ_WNIFA65nTg|Umo_RFbFZmnBmFdH_UFt7HsX9IqZXGElq4HU6imQie5b81Er_2ysA1flgbJIhkTM';
    this.accessTokenDetails = {
      accountNumber: '8349157375',
      hotExpirationDateTimeUtc: dayjs().add(30, 'minutes').format(),
      warmExpirationDateTimeUtc: dayjs().add(7, 'days').format()
    };
    this.refreshTokenDetails = {
      accountNumber: '8349157375',
      expirationDateTimeUtc: dayjs().add(2, 'months').format()
    };
  }

  withAccessToken(accessToken) {
    this.accessToken = accessToken;

    return this;
  }

  withAccessTokenExpired() {
    this.accessTokenDetails = {
      accountNumber: '8349157375',
      hotExpirationDateTimeUtc: dayjs().subtract(5, 'minutes').format(),
      warmExpirationDateTimeUtc: dayjs().add(7, 'days').format()
    };
    this.refreshTokenDetails = {
      accountNumber: '8349157375',
      expirationDateTimeUtc: dayjs().add(2, 'months').format()
    };

    return this;
  }

  withUserLoginExpired() {
    this.accessTokenDetails = {
      accountNumber: '8349157375',
      hotExpirationDateTimeUtc: dayjs().subtract(5, 'minutes').format(),
      warmExpirationDateTimeUtc: dayjs().add(7, 'days').format()
    };
    this.refreshTokenDetails = {
      accountNumber: '8349157375',
      expirationDateTimeUtc: dayjs().add(2, 'months').format()
    };

    return this;
  }

  build() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      accessTokenDetails: this.accessTokenDetails,
      refreshTokenDetails: this.refreshTokenDetails
    };
  }
}

module.exports = LoginApiResponseBuilder;
