module.exports = {
  path: '/api/v1/accounts/lookup',
  method: 'POST',
  cache: false,
  template: () => ({
    accountNumber: '123456'
  })
};
