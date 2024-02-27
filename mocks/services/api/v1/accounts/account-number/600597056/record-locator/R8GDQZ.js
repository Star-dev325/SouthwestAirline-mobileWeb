module.exports = {
  path: /\/api\/v1\/accounts\/(x-)?account-number\/600597056\/record-locator\/R8GDQZ/,
  method: 'GET',
  cache: false,
  delay: 100,
  render: (req, res) => {
    res.status(404).send();
  }
};
