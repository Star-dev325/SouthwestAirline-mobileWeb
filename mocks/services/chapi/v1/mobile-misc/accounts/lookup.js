module.exports = {
  path: '/chapi/v1/mobile-misc/feature/accounts/lookup',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    const { accountNumber } = body;

    return {
      accountNumber
    };
  },
  status(req, res) {
    if (req.body.firstName === 'nomatch') {
      return res.status(404).send({
        code: 400618205,
        httpStatusCode: 'NOT_FOUND',
        infoList: [],
        message: 'The passenger name does not match the name on file for the Rapid Rewards account # entered',
        messageKey: 'ERROR__ACCOUNTS__INPUT__NOT_MATCH',
        requestId: '0462c3a2-cb8f-49b0-952b-8481e5f1c65e:5qJlLZ9zTCCCQZJZ090ylg:mweb'
      });
    }
  }
};
