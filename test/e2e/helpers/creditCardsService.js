const request = require('request');
const Q = require('q');

const creditCardsResetPath = '/credit-cards-service-for-e2e/credit-cards/reset';

function resetUserCreditCards(dysonPort) {
  const mockServerHost = `http://localhost:${dysonPort}`;
  const defer = Q.defer();

  request.post({ url: mockServerHost + creditCardsResetPath }, (err) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
      defer.reject('some thing wrong when reset mock credit cards');
    }
    defer.resolve();
  });

  return defer.promise;
}

module.exports = {
  resetUserCreditCards
};
