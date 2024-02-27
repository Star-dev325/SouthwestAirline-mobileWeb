export default {
  personalInfo: {
    firstName: 'HX',
    middleName: 'LU',
    lastName: 'LIN',
    preferredName: 'MINDY SUE',
    suffix: 'CEO',
    dateOfBirth: '1948-01-03',
    gender: 'MALE'
  },

  personalInfoWithSpaces: {
    firstName: ' HX ',
    middleName: ' LU ',
    lastName: ' LIN ',
    preferredName: ' MINDY SUE ',
    suffix: 'CEO',
    dateOfBirth: '1948-01-03',
    gender: 'MALE'
  },

  personalInfoWithoutOptionals: {
    firstName: ' HX ',
    lastName: ' LIN ',
    dateOfBirth: '1948-01-03',
    gender: 'MALE'
  },

  contactInfo: {
    isoCountryCode: 'AZ',
    countryCode: '42',
    addressLine1: '32 River Rd',
    addressLine2: 'APT 410',
    city: 'Dallas',
    stateProvinceRegion: 'TX',
    zipOrPostalCode: '72504',
    companyName: 'SWA',
    email: 'test@test.com',
    confirmedEmail: 'test@test.com',
    phoneNumber: '222-222-2222',
    optInForEmailSubscriptions: true
  },
  contactInfoWithOutDefaults: {
    addressLine1: '32 River Rd',
    addressLine2: 'APT 410',
    city: 'Dallas',
    stateProvinceRegion: 'TX',
    zipOrPostalCode: '72504',
    companyName: 'SWA',
    email: 'test@test.com',
    confirmedEmail: 'test@test.com',
    phoneCountryCode: 'AF',
    phoneNumber: '222-222-2222'
  },
  securityInfo: {
    userName: 'HXLIN',
    password: 'ZAQ1@#4rdc',
    comfirmedPassword: 'ZAQ1@#4rdc',
    question1: 'What was the color of your first car?',
    answer1: 'answer1',
    question2: 'What is the name of your first pet?',
    answer2: 'answer2',
    promoCode: '50 Off',
    acceptRulesAndRegulations: 'true'
  },
  securityInfoWithUserNameSpace: {
    userName: ' HXLIN',
    password: 'ZAQ1@#4rdc',
    comfirmedPassword: 'ZAQ1@#4rdc',
    question1: 'What was the color of your first car?',
    answer1: 'answer1',
    question2: 'What is the name of your first pet?',
    answer2: 'answer2',
    promoCode: '50 Off',
    acceptRulesAndRegulations: 'true'
  }
};
