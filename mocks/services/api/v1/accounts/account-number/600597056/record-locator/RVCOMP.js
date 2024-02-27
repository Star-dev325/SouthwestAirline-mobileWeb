module.exports = {
  path: /\/api\/v1\/accounts\/(x-)?account-number\/600597056\/record-locator\/RVCOMP/,
  method: 'GET',
  cache: false,
  template: () => ({
    companionFirstName: 'JAMES',
    companionLastName: 'MERSON',
    sponsorRecordLocator: 'RVCOMP',
    companionRecordLocator: 'COMPIN'
  })
};
