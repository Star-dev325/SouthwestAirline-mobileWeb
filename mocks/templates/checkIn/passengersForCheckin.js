module.exports = [
  {
    firstName: 'Amber',
    lastName: 'Awesome',
    travelerIdentifier: 'IDENTIFIER1',
    missingDocuments: ['NATIONALITY']
  },
  {
    firstName: 'Ron',
    lastName: 'Hackman',
    travelerIdentifier: 'IDENTIFIER2',
    emergencyContact: {
      doNotWishToProvideAnEmergencyContact: false,
      name: 'Amber Awesome',
      contactPhone: {
        countryCode: 'AF',
        number: '259985555511'
      }
    },
    missingDocuments: ['PASSPORT']
  },
  {
    firstName: 'Hao',
    lastName: 'Li',
    travelerIdentifier: 'IDENTIFIER3',
    passport: {
      lastFourPassportNumber: '1234',
      passportIssuedBy: 'US',
      nationality: 'CN',
      passportExpirationDate: '2035-11-10',
      countryOfResidence: 'US'
    },
    missingDocuments: ['EMERGENCY_CONTACT', 'PERMANENT_RESIDENT_CARD']
  }
];
