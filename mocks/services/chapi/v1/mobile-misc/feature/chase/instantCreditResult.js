module.exports = {
  path: '/chapi/v1/mobile-misc/feature/chase/sessions/:chaseSessionId/instant-credits',
  method: 'GET',
  cache: false,
  template: {
    creditStatus: 'APPROVED',
    creditLimit: '2000',
    expirationDate: '2024-02',
    customer: {
      firstName: 'Shak',
      middleName: 'T',
      lastName: 'Bhamani',
      customerNumber: '8751234567890',
      dateOfBirthFormatted: null,
      emailAddress: 'test@test.com',
      primaryAddress: {
        line1: '1234 Address',
        line2: '',
        city: 'Chicago',
        state: 'IL',
        zipOrPostalCode: '60601',
        countryCode: 'US'
      },
      phone: { homePhoneNumber: null, mobilePhoneNumber: null, businessPhoneNumber: null }
    }
  }
};
