module.exports.command = function() {
  // eslint-disable-next-line prefer-arrow-callback
  this.execute(function() {
    const loginStatus = JSON.parse(localStorage.getItem('OAUTH_LOGIN_STATUS'));

    loginStatus.expirationDate = '';
    localStorage.setItem('OAUTH_LOGIN_STATUS', JSON.stringify(loginStatus));
  });
};
