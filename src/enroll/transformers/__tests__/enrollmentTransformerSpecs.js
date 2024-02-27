import _ from 'lodash';
import { transformToEnrollRequest } from 'src/enroll/transformers/enrollmentTransformer';
import enrollFormDataMock from 'src/enroll/transformers/__tests__/enrollFormDataMock';

describe('enrollmentTransformer', () => {
  context('transformToEnrollRequest', () => {
    let expectedResults;

    beforeEach(() => {
      expectedResults = {
        userName: 'HXLIN',
        password: 'ZAQ1@#4rdc',
        customerInfo: {
          name: {
            firstName: 'HX',
            lastName: 'LIN',
            middleName: 'LU',
            preferredName: 'MINDY SUE',
            suffix: 'CEO'
          },
          gender: 'MALE',
          birthDate: '1948-01-03'
        },
        contactInfo: {
          address: {
            isoCountryCode: 'AZ',
            addressLine1: '32 River Rd',
            addressLine2: 'APT 410',
            city: 'Dallas',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '72504',
            addressType: 'HOME'
          },
          phone: {
            countryCode: '1',
            number: '2222222222',
            phoneType: 'HOME'
          },
          emailAddress: 'test@test.com'
        },
        optInForEmailSubscriptions: true,
        securityQuestions: [
          {
            question: 'What was the color of your first car?',
            answer: 'answer1'
          },
          {
            question: 'What is the name of your first pet?',
            answer: 'answer2'
          }
        ],
        promoCode: '50 Off'
      };
    });

    it('should transform the form data to correct enroll request', () => {
      const enrollRequest = transformToEnrollRequest({
        personalInfoData: enrollFormDataMock.personalInfo,
        contactInfoData: enrollFormDataMock.contactInfo,
        securityInfoData: enrollFormDataMock.securityInfo
      });

      expect(enrollRequest).to.deep.equal(expectedResults);
    });

    it('should transform the form data with omitted defaulted fields to correct enroll request', () => {
      const enrollRequest = transformToEnrollRequest({
        personalInfoData: _.omit(enrollFormDataMock.personalInfo, 'suffix'),
        contactInfoData: enrollFormDataMock.contactInfoWithOutDefaults,
        securityInfoData: enrollFormDataMock.securityInfo
      });

      expect(enrollRequest).to.deep.equal({
        userName: 'HXLIN',
        password: 'ZAQ1@#4rdc',
        customerInfo: {
          name: {
            firstName: 'HX',
            lastName: 'LIN',
            middleName: 'LU',
            preferredName: 'MINDY SUE',
            suffix: undefined
          },
          gender: 'MALE',
          birthDate: '1948-01-03'
        },
        contactInfo: {
          address: {
            isoCountryCode: 'US',
            addressLine1: '32 River Rd',
            addressLine2: 'APT 410',
            city: 'Dallas',
            stateProvinceRegion: 'TX',
            zipOrPostalCode: '72504',
            addressType: 'HOME'
          },
          phone: {
            countryCode: '93',
            number: '2222222222',
            phoneType: 'HOME'
          },
          emailAddress: 'test@test.com'
        },
        optInForEmailSubscriptions: true,
        securityQuestions: [
          {
            question: 'What was the color of your first car?',
            answer: 'answer1'
          },
          {
            question: 'What is the name of your first pet?',
            answer: 'answer2'
          }
        ],
        promoCode: '50 Off'
      });
    });

    it('should trim leading and trailing whitespace from personalInfo name fields', () => {
      const enrollRequest = transformToEnrollRequest({
        personalInfoData: enrollFormDataMock.personalInfoWithSpaces,
        contactInfoData: enrollFormDataMock.contactInfo,
        securityInfoData: enrollFormDataMock.securityInfo
      });

      expect(enrollRequest).to.deep.equal(expectedResults);
    });

    it('should transform when optional fields are not populated', () => {
      const enrollRequest = transformToEnrollRequest({
        personalInfoData: enrollFormDataMock.personalInfoWithoutOptionals,
        contactInfoData: enrollFormDataMock.contactInfo,
        securityInfoData: enrollFormDataMock.securityInfo
      });

      _.set(expectedResults, 'customerInfo.name', {
        firstName: 'HX',
        lastName: 'LIN',
        middleName: '',
        preferredName: '',
        suffix: undefined
      });
      expect(enrollRequest).to.deep.equal(expectedResults);
    });

    it('should remove the space when a space is given to the userName', () => {
      const enrollRequest = transformToEnrollRequest({
        personalInfoData: enrollFormDataMock.personalInfoWithoutOptionals,
        contactInfoData: enrollFormDataMock.contactInfo,
        securityInfoData: enrollFormDataMock.securityInfoWithUserNameSpace
      });
      const expected = enrollRequest.userName;

      expect(expected).to.equal('HXLIN');
    });

    it('should remove the space when a space is given to the userName', () => {
      const enrollRequest = transformToEnrollRequest({
        personalInfoData: enrollFormDataMock.personalInfoWithoutOptionals,
        contactInfoData: enrollFormDataMock.contactInfo,
        securityInfoData: enrollFormDataMock.securityInfo
      });
      const expected = enrollRequest.userName;

      expect(expected).to.equal('HXLIN');
    });
  });
});
