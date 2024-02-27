module.exports = {
  path: '/chapi/v1/mobile-misc/feature/my-account/enroll-customer',
  method: 'PUT',
  cache: false,
  status(req, res) {
    res.status(204).send();
  }
};
