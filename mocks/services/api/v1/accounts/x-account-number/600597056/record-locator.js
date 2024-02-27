module.exports = {
  path: '/api/v1/accounts/x-account-number/:accountNumber/record-locator/:PNR',
  method: 'GET',
  cache: false,
  template() {
    return {
      companionFirstName: 'COMPANION',
      companionLastName: 'WANG',
      sponsorRecordLocator: 'JAXNZG',
      companionRecordLocator: 'JAYHZQ'
    };
  }
};
