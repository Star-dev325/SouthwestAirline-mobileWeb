module.exports = {
  path: /\/api\/v1\/accounts\/(x-)?account-number\/600597056\/record-locator\/FQMSOQ/,
  method: 'GET',
  cache: false,
  status(req, res) {
    res.status(404).send();
  }
};
