module.exports = function LoginApiJsonBuilder() {
  this.hotExpirationDateTimeUtc = '2015-12-03T22:38:01.945Z';

  this.withHotExpirationDateTimeUtc = function(hotExpirationDateTimeUtc) {
    this.hotExpirationDateTimeUtc = hotExpirationDateTimeUtc;

    return this;
  };

  this.build = function() {
    return {
      accessToken: 'Iw5pqEHqBJaHCkJk13P2Kg|UrPqRtKtlyVumtFa5j9W2lZmu9XCsQMKi95FSG461uvTWclzlZUkJud4KJ3H1kOb8wHJn1j7Dxr4z64ZjCEtAnL8wz1DAUqLQsaQlEFv9Is',
      refreshToken: 'MGlVPJsqZdBhXiuEs-9ueQ|mlFct_7B3SsaJGNYSn5jA5IcpVizwr3Uquu6j1eL5n-nPViUfoRXg9f2ZZQj-5tW',
      accessTokenDetails: {
        accountNumber: '600597056',
        hotExpirationDateTimeUtc: '2099-11-04T15:42:10.769Z',
        warmExpirationDateTimeUtc: '2099-11-11T15:12:10.769Z'
      },
      refreshTokenDetails: {
        accountNumber: '600597056',
        expirationDateTimeUtc: '2099-01-20T15:12:10.769Z'
      }
    };
  };
};
