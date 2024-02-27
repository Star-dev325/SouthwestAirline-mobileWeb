import dayjs from 'dayjs';
import _ from 'lodash';
import validator from 'src/shared/form/formValidators/validator';

describe('validator', () => {
  context('validator isNotSimplePassword', () => {
    it('password should contains numbers, uppercase letters, special characters', () => {
      expect(validator.isNotSimplePassword('A1')).to.be.true;
      expect(validator.isNotSimplePassword('@1')).to.be.true;
      expect(validator.isNotSimplePassword('1A')).to.be.true;
      expect(validator.isNotSimplePassword('Aa')).to.be.false;
      expect(validator.isNotSimplePassword('@a')).to.be.false;
      expect(validator.isNotSimplePassword('1a')).to.be.false;
      expect(validator.isNotSimplePassword('\\A')).to.be.true;
    });
  });

  context('validator isRecordLocator', () => {
    it('should be 6 digit alpha-numeric confirmation number', () => {
      expect(validator.isRecordLocator('F7KYIN')).to.be.true;
      expect(validator.isRecordLocator('test')).to.be.false;
    });
  });

  context('validator isName', () => {
    it('should not contains numbers and special characters except spaces', () => {
      expect(validator.isName('Lucy')).to.be.true;
      expect(validator.isName('Lucy-lee')).to.be.false;
      expect(validator.isName('Lucy1lee')).to.be.false;
      expect(validator.isName('Lucy Lee')).to.be.true;
      expect(validator.isName('Lucy*')).to.be.false;
    });
  });

  context('validator isDriverName', () => {
    it('should not contains special characters except spaces', () => {
      expect(validator.isDriverName('Lucy')).to.be.true;
      expect(validator.isDriverName('Lucy-lee')).to.be.false;
      expect(validator.isDriverName('Lucy Lee')).to.be.true;
      expect(validator.isDriverName('Lucy*')).to.be.false;
    });
  });

  context('validator isAlphanumericWithSpaces', () => {
    it('should be alpha-numeric and no more that 50 characters', () => {
      expect(validator.isAlphanumericWithSpaces('test test')).to.be.true;
      expect(validator.isAlphanumericWithSpaces('test^')).to.be.false;
    });
  });

  context('validator isNotContainValue', () => {
    it('should return true when not contain target value', () => {
      expect(validator.isNotContainValue('xxx', 'test')).to.be.true;

      // with special charactors
      expect(validator.isNotContainValue('world^&*(@#@&', '@#$&$*hello^&*(@#@&*!^$&@*')).to.be.true;
    });

    it('should return true when target value is empty', () => {
      expect(validator.isNotContainValue('', 'xxxx')).to.be.true;
      expect(validator.isNotContainValue(' ', 'xxx')).to.be.true;
    });

    it('should return false when contain target value', () => {
      expect(validator.isNotContainValue('es', 'test')).to.be.false;

      // with special charactors
      expect(validator.isNotContainValue('world^&*(@#@&', '@#$&$*hello%world^&*(@#@&')).to.be.false;
    });
  });

  context('validator isFormattedMobilePhone', () => {
    it('should be phone number formatter XXX-XXX-XXXX', () => {
      expect(validator.isFormattedMobilePhone('123-456-7890')).to.be.true;
      expect(validator.isFormattedMobilePhone('1234')).to.be.false;
      expect(validator.isFormattedMobilePhone('123-455-19292')).to.be.false;
    });
  });

  context('validator isValidNumericPhoneNumber', () => {
    it('should be phone number formatter XXX-XXX-XXXX', () => {
      expect(validator.isValidNumericPhoneNumber('000-000-0000')).to.be.false;
      expect(validator.isValidNumericPhoneNumber('100-000-0000')).to.be.true;
    });
  });

  context('validator isUserName', () => {
    it('should consist of least 1 alpha character and no space', () => {
      expect(validator.isUserName('Lucy')).to.be.true;
      expect(validator.isUserName('Lucy Lee')).to.be.false;
      expect(validator.isUserName('123')).to.be.false;
    });
  });

  context('validator isIrn', () => {
    it('should consist of alpha numeric character and less than 30 character', () => {
      expect(validator.isIrn('IrnName')).to.be.true;
      expect(validator.isIrn('')).to.be.true;
      expect(validator.isIrn('1234567890123456789012345678901')).to.be.false;
      expect(validator.isIrn('123 ')).to.be.false;
      expect(validator.isIrn('123&')).to.be.false;
    });
  });

  context('validator isChecked', () => {
    it('should be checked when the value is true', () => {
      expect(validator.isChecked('true')).to.be.true;
      expect(validator.isChecked(true)).to.be.true;
      expect(validator.isChecked(false)).to.be.false;
    });
  });

  context('isPassword', () => {
    it('should allow backslash', () => {
      expect(validator.isPassword('\\A')).to.be.true;
    });
  });

  context('validator isLengthEql', () => {
    it('should be true when given str length is less than or equal given number', () => {
      const validFunc = validator.isLengthEql(5);

      expect(validFunc('Peter')).to.be.true;
    });

    it('should be false when given str length is greater than given number', () => {
      const validFunc = validator.isLengthEql(4);

      expect(validFunc('Peter')).to.be.false;
    });
  });

  context('validator isLengthLessOrEqual', () => {
    it('should be true when given str length is less than or equal given number', () => {
      const validFunc = validator.isLengthLessOrEqual(5);

      expect(validFunc('Peter')).to.be.true;
    });

    it('should be false when given str length is greater than given number', () => {
      const validFunc = validator.isLengthLessOrEqual(5);

      expect(validFunc('Peter Ham')).to.be.false;
    });

    it('should return true when isOnFile is true', () => {
      const isOnFile = true;
      const validFunc = validator.isLengthLessOrEqual(3, isOnFile);

      expect(validFunc('On File')).to.be.true;
      expect(validFunc('1234')).to.be.false;
    });
  });

  context('validator isLengthLessThan', () => {
    it('should be true when given str length is less than given number', () => {
      const validFunc = validator.isLengthLessThan(6);

      expect(validFunc('Peter')).to.be.true;
    });

    it('should be false when given str length is greater than or equal given number', () => {
      const validFunc = validator.isLengthLessThan(5);

      expect(validFunc('Peter')).to.be.false;
    });
  });

  context('validator isStateProvinceRegion', () => {
    it('should be true when given str is a valid state or province', () => {
      expect(validator.isStateProvinceRegion('Houston')).to.be.true;
      expect(validator.isStateProvinceRegion('Houston.')).to.be.true;
      expect(validator.isStateProvinceRegion('San Antonio')).to.be.true;
    });

    it('should be false when given str is not a valid state or province', () => {
      expect(validator.isStateProvinceRegion('Houston?')).to.be.false;
    });
  });

  context('validator isAddress', () => {
    it('should be true when given str is a valid address', () => {
      expect(validator.isAddress('Chengdu tianfu square01-,.#&()')).to.be.true;
    });

    it('should be false when given str is not a valid address', () => {
      expect(validator.isAddress('Chengdu tianfu square01 %@')).to.be.false;
    });
  });

  context('validator isPostalCode', () => {
    it('should be true when given str is a valid postal code', () => {
      expect(validator.isPostalCode('postal-code, (00-0)')).to.be.true;
    });

    it('should be false when given str is not a valid postal code', () => {
      expect(validator.isPostalCode('postal-code&(00-0)')).to.be.false;
    });
  });

  context('validator isCity', () => {
    it('should be true when given str is a valid city name', () => {
      expect(validator.isCity('Chengdu')).to.be.true;
    });

    it('should be false when given str is not a valid city name', () => {
      expect(validator.isCity('Cheng-du')).to.be.false;
    });
  });

  context('validator isLengthBetweenOrEqual', () => {
    const isLengthBetweenOrEqual = validator.isLengthBetweenOrEqual(2, 10);

    it('should be true when length of given str is between given numbers', () => {
      expect(isLengthBetweenOrEqual('01')).to.be.true;
      expect(isLengthBetweenOrEqual('0123456')).to.be.true;
      expect(isLengthBetweenOrEqual('0123456789')).to.be.true;
    });

    it('should be false when length of given str is not between given numbers', () => {
      expect(isLengthBetweenOrEqual('0')).to.be.false;
      expect(isLengthBetweenOrEqual('0123456789x')).to.be.false;
    });

    it('should return true when isOnFile is true', () => {
      const isOnFile = true;
      const validFunc = validator.isLengthBetweenOrEqual(2, 3, isOnFile);

      expect(validFunc('On File')).to.be.true;
      expect(validFunc('1234')).to.be.false;
    });
  });

  context('validator isAlreadyTwoYearsOld', () => {
    it('should be true when passenger is already two years old when departure date', () => {
      const departureDate = '2015-06-13';
      const birthDate = '2011-06-13';
      const validFunc = validator.isAlreadyTwoYearsOld(departureDate);

      expect(validFunc(birthDate)).to.be.true;
    });

    it('should be true when passenger is just two years old when departure date', () => {
      const departureDate = '2015-06-13';
      const birthDate = '2013-06-13';
      const validFunc = validator.isAlreadyTwoYearsOld(departureDate);

      expect(validFunc(birthDate)).to.be.true;
    });

    it('should be false when passenger is below two years old when departure date', () => {
      const departureDate = '2015-06-13';
      const birthDate = '2014-06-13';
      const validFunc = validator.isAlreadyTwoYearsOld(departureDate);

      expect(validFunc(birthDate)).to.be.false;
    });
  });

  context('validator isValidAssociatedAdult', () => {
    const associatedAdultsInfo = [
      { departureDate: '2022-05-15', passengerInfo: { firstName: 'Sam', lastName: 'Joe', dateOfBirth: '1999-05-15' } },
      { departureDate: '2022-05-15', passengerInfo: { firstName: 'Mike', lastName: 'Joe', dateOfBirth: '2022-01-15' } }
    ];

    it('should return true when difference years is 12 or more', () => {
      const validFunc = validator.isValidAssociatedAdult('Sam Joe', associatedAdultsInfo);

      expect(validFunc).to.be.true;
    });

    it('should return false when difference years is less than 12', () => {
      const validFunc = validator.isValidAssociatedAdult('Mike Joe', associatedAdultsInfo);

      expect(validFunc).to.be.false;
    });

    it('should return true when difference years is more than 12', () => {
      const validFunc = validator.isValidAssociatedAdult(null, associatedAdultsInfo);

      expect(validFunc).to.be.true;
    });

    describe('isWebView', () => {
      const associatedAdultsInfo = [
        {
          departureDate: '2022-05-15',
          passengerInfo: { firstName: 'Sam', lastName: 'Joe', dateOfBirth: '05/15/1999' }
        },
        {
          departureDate: '2022-05-15',
          passengerInfo: { firstName: 'Mike', lastName: 'Joe', dateOfBirth: '01/15/2022' }
        }
      ];

      it('should return true when adult is 12 years or older', () => {
        const validFunc = validator.isValidAssociatedAdult('Sam Joe', associatedAdultsInfo);

        expect(validFunc).to.be.true;
      });

      it('should return false when adult is less than 12 years old', () => {
        const validFunc = validator.isValidAssociatedAdult('Mike Joe', associatedAdultsInfo);

        expect(validFunc).to.be.false;
      });

      it('should return true when difference is more than 12 years', () => {
        const validFunc = validator.isValidAssociatedAdult(null, associatedAdultsInfo);

        expect(validFunc).to.be.true;
      });
    });
  });

  context('validator isValidLapChildDate', () => {
    it('should return false if birthDate (YYYY-MM-DD) is less than 14 days to departureDate', () => {
      const validFunc = validator.isValidLapChildDate('2022-05-03', '2022-05-09', '2022-05-23');

      expect(validFunc).to.be.false;
    });

    it('should return false if birthDate (MM/DD/YYYY) is less than 14 days to departureDate', () => {
      const validFunc = validator.isValidLapChildDate('05/03/2022', '2022-05-09', '2022-05-23');

      expect(validFunc).to.be.false;
    });

    it('should return true if birthDate is more than 14 days to departureDate and less than 2 years to return date', () => {
      const validFunc = validator.isValidLapChildDate('2022-01-03', '2022-05-09', '2022-05-23');

      expect(validFunc).to.be.true;
    });

    it('should return false if birthDate is more than 2 years to  returnDate', () => {
      const validFunc = validator.isValidLapChildDate('2020-05-20', '2022-05-09', '2022-05-23');

      expect(validFunc).to.be.false;
    });

    it('should return true if birthDate is more than 2 years to  returnDate, should check with departureDate date when returnDate not passed', () => {
      const validFunc = validator.isValidLapChildDate('2020-05-20', '2022-05-09');

      expect(validFunc).to.be.true;
    });

    describe('isWebView validator isValidLapChildDate', () => {
      it('should return false if birthDate is less than 14 days to departureDate', () => {
        const validFunc = validator.isValidLapChildDate('05/03/2022', '2022-05-09', '2022-05-23', 'MM/DD/YYYY');

        expect(validFunc).to.be.false;
      });

      it('should return true if birthDate is more than 14 days to departureDate and less than 2 years to return date', () => {
        const validFunc = validator.isValidLapChildDate('01/03/2022', '2022-05-09', '2022-05-23', 'MM/DD/YYYY');

        expect(validFunc).to.be.true;
      });
    });
  });

  context('validator isLessThanFourteenDaysOld', () => {
    const { isLessThanFourteenDaysOld } = validator;

    it('should return true if birthDate is less than 14 days to departureDate', () => {
      expect(isLessThanFourteenDaysOld('2022-05-03', '2022-05-09')).to.be.true;
    });

    it('should return false if birthDate is more than 14 days to departureDate', () => {
      expect(isLessThanFourteenDaysOld('2022-05-03', '2022-08-09')).to.be.false;
    });

    it('should return false if birthDate is 14 days to departureDate', () => {
      expect(isLessThanFourteenDaysOld('2022-05-03', '2022-05-17')).to.be.false;
    });
  });

  context('validator isEmail', () => {
    const { isEmail } = validator;

    it('should be true when email is the right format', () => {
      expect(isEmail('dante@devilmaycry.com')).to.be.true;
      expect(isEmail('dante@devilmaycry.com.cn')).to.be.true;
    });
    it("should be false when email doesn't have extension", () => {
      expect(isEmail('dante@devilmaycry')).to.be.false;
    });
    it('should be false when domain has a invalid character', () => {
      expect(isEmail('neo@devilmaycry$$$.com')).to.be.false;
    });
  });

  context('validator isFullNameNoHyphens', () => {
    const { isFullNameNoHyphens } = validator;

    it('should be false when last name includes hyphens', () => {
      expect(isFullNameNoHyphens('Foo Bar-baz')).to.be.false;
    });

    it('should be false when first name includes hyphens', () => {
      expect(isFullNameNoHyphens('Foo-bah Baz')).to.be.false;
    });

    it('should be true when full name is 2 parts with space between them', () => {
      expect(isFullNameNoHyphens('Stephen Curry')).to.be.true;
    });

    it('should be false when special chars given', () => {
      expect(isFullNameNoHyphens('Chris Paul#$@#$')).to.be.false;
    });

    it('should be false when missing parts', () => {
      expect(isFullNameNoHyphens('James')).to.be.false;
    });

    it('should be false when it contains number', () => {
      expect(isFullNameNoHyphens('James1 Dsa1')).to.be.false;
    });
  });

  context('validator isLastNameValid', () => {
    const { isLastNameValid } = validator;

    context('with middle name', () => {
      it('should be true when last name is 2 characters', () => {
        expect(isLastNameValid('first middle la')).to.be.true;
      });

      it('should be true when last name is more than 2 characters', () => {
        expect(isLastNameValid('first middle last')).to.be.true;
      });

      it('should be false when last name is less than 2 characters', () => {
        expect(isLastNameValid('first middle l')).to.be.false;
      });
    });

    context('not with middle name', () => {
      it('should be true when last name is 2 characters', () => {
        expect(isLastNameValid('first la')).to.be.true;
      });

      it('should be true when last name is more than 2 characters', () => {
        expect(isLastNameValid('first last')).to.be.true;
      });

      it('should be false when last name is less than 2 characters', () => {
        expect(isLastNameValid('first l')).to.be.false;
      });
    });
  });

  context('isFullNameOrFirstNameNoHyphens', () => {
    const { isFullNameOrFirstNameNoHyphens } = validator;

    it('should be false when it contains number', () => {
      expect(isFullNameOrFirstNameNoHyphens('James1 Dsa1')).to.be.false;
    });

    it('should be true when it only contains first name', () => {
      expect(isFullNameOrFirstNameNoHyphens('Jiefeng')).to.be.true;
    });

    it('should be true when it first name and last name', () => {
      expect(isFullNameOrFirstNameNoHyphens('Jiefeng Liu')).to.be.true;
    });
  });

  context('isFullNameLengthValid', () => {
    const { isFullNameLengthValid } = validator;

    it('should return false when length of first name > 30 or <1', () => {
      expect(isFullNameLengthValid(' a')).to.be.false;
      expect(isFullNameLengthValid(`${_.repeat('a', 31)} a`)).to.be.false;
    });

    it('should return false when length of last name > 30 or <1', () => {
      expect(isFullNameLengthValid('a ')).to.be.false;
      expect(isFullNameLengthValid(`a ${_.repeat('a', 31)}`)).to.be.false;
    });

    it('should return true when length of first and last name all >=1 and <= 30', () => {
      expect(isFullNameLengthValid('asdf sfasdf')).to.be.true;
      expect(isFullNameLengthValid(`${_.repeat('a', 30)} ${_.repeat('a', 30)}`)).to.be.true;

      expect(isFullNameLengthValid('a a')).to.be.true;
    });
  });

  context('isCreditCardExpirationDateInFuture', () => {
    it('should return false when date is in the past', () => {
      expect(validator.isCreditCardExpirationDateInFuture('2014-02')).to.be.false;
    });

    it('should return true when date is the same as current date', () => {
      expect(validator.isCreditCardExpirationDateInFuture(dayjs().format('YYYY-MM'))).to.be.true;
    });

    it('should return true when date is in the future', () => {
      expect(validator.isCreditCardExpirationDateInFuture(dayjs().add(1, 'year').format('YYYY-MM'))).to.be.true;
    });

    it('should return false when date is in the past using the MM/YYYY format', () => {
      expect(validator.isCreditCardExpirationDateInFuture('12/2014')).to.be.false;
    });

    it('should return false when date is in invalid format', () => {
      expect(validator.isCreditCardExpirationDateInFuture('2014-13')).to.be.false;
    });
  });

  context('isCardExpirationFormat', () => {
    it('should return true when date is in correct format', () => {
      expect(validator.isCardExpirationFormat('12/2024')).to.be.true;
    });

    it('should return false when date is not in correct format', () => {
      expect(validator.isCardExpirationFormat('2024-12')).to.be.false;
    });

    it('should return false when date is not in correct format', () => {
      expect(validator.isCardExpirationFormat('13/2024')).to.be.false;
    });
  });

  context('isDateInFuture', () => {
    it('should return true when date is after today', () => {
      expect(validator.isDateInFuture(dayjs().add(1, 'year').format('YYYY-MM-DD'))).to.be.true;
    });

    it('should return true when date is today', () => {
      expect(validator.isDateInFuture(dayjs().format('YYYY-MM-DD'))).to.be.true;
    });

    it('should return false when date is in the past', () => {
      expect(validator.isDateInFuture('2014-02-14')).to.be.false;
    });
  });

  context('isValidSecurityCode', () => {
    it('should return true when 3 digit security code is valid for visa credit card', () => {
      expect(validator.isValidSecurityCode('4012999999999999', '123')).to.be.true;
    });

    it('should return true when 4 digit security code is valid for AMEX card', () => {
      expect(validator.isValidSecurityCode('373235387881007', '1234')).to.be.true;
    });

    it('should return false when security code is invalid for visa credit card', () => {
      expect(validator.isValidSecurityCode('4012999999999999', '12')).to.be.false;
    });

    it('should return true when security code is not required for UATP credit card', () => {
      expect(validator.isValidSecurityCode('123456789012345', '')).to.be.true;
    });

    it('should return true when security code is not required (and ignored) for UATP credit card', () => {
      expect(validator.isValidSecurityCode('123456789012345', '12')).to.be.true;
    });
  });

  context('isOnFile', () => {
    it('should return true if value equals "On File"', () => {
      expect(validator.isOnFile('On File')).to.be.true;
    });

    it('should return false if value does not equal "On File"', () => {
      expect(validator.isOnFile('Not On File')).to.be.false;
    });
  });

  context('isNumericOrOnFile', () => {
    const emptyInitialValue = '';

    it('should return true if value is numeric', () => {
      expect(validator.isNumericOrOnFile(emptyInitialValue)('123')).to.be.true;
    });

    it('should return true if value is equal to "On File"', () => {
      expect(validator.isNumericOrOnFile('On File')('On File')).to.be.true;
    });

    it('should return true if value is equal to "On File" and user enters new value', () => {
      expect(validator.isNumericOrOnFile('On File')('123')).to.be.true;
    });

    it('should return false if value is not numeric or equal to "On File"', () => {
      expect(validator.isNumericOrOnFile(emptyInitialValue)('Not On File')).to.be.false;
    });

    it('should return false if initial value is On File and new value is not numeric or equal to "On File"', () => {
      expect(validator.isAlphanumericOrOnFile('On File')('%')).to.be.false;
    });
  });

  context('isAlphanumericOrOnFile', () => {
    const emptyInitialValue = '';

    it('should return true if value is alphanumeric', () => {
      expect(validator.isAlphanumericOrOnFile(emptyInitialValue)('123abc')).to.be.true;
    });

    it('should return true if value is equal to "On File"', () => {
      expect(validator.isAlphanumericOrOnFile('On File')('On File')).to.be.true;
    });

    it('should return true if value is equal to "On File" and user enters new value', () => {
      expect(validator.isAlphanumericOrOnFile('On File')('newvalue')).to.be.true;
    });

    it('should return false if value is not alphanumeric or equal to "On File"', () => {
      expect(validator.isAlphanumericOrOnFile(emptyInitialValue)('Not On File')).to.be.false;
    });

    it('should return false if initial value is On File and new value is not alphanumeric or equal to "On File"', () => {
      expect(validator.isAlphanumericOrOnFile('On File')('%')).to.be.false;
    });
  });

  describe('isNotDateInFuture', () => {
    it('should return true when date is not after today', () => {
      expect(validator.isNotDateInFuture(!dayjs().add(1, 'year').format('MM/DD/YYYY'))).to.be.true;
    });

    it('should return true when date is in the past', () => {
      expect(validator.isNotDateInFuture('12/30/2021')).to.be.true;
    });

    it('should return true when date is invalid month and date', () => {
      expect(validator.isNotDateInFuture('13/33/2023')).to.be.true;
    });

    it('should return false when date is valid format and a future date', () => {
      expect(validator.isNotDateInFuture('12/30/2025')).to.be.false;
    });

    it('should return false when date is after today', () => {
      expect(validator.isNotDateInFuture(dayjs().add(1, 'year').format('MM/DD/YYYY'))).to.be.false;
    });
  });

  describe('isDateOfBirthFormat', () => {
    it('should return true when dateOfBirth input is valid', () => {
      expect(validator.isDateOfBirthFormat(dayjs().format('MM/DD/YYYY'))).to.be.true;
    });

    it('should return false when dateOfBirth input is invalid month', () => {
      expect(validator.isDateOfBirthFormat('13/30/2021')).to.be.false;
    });

    it('should return false when dateOfBirth input is invalid date', () => {
      expect(validator.isDateOfBirthFormat('12/33/2021')).to.be.false;
    });

    it('should return false when dateOfBirth input is invalid year', () => {
      expect(validator.isDateOfBirthFormat('44-44-4444')).to.be.false;
    });
  });

  describe('isIsoDateFormat', () => {
    it('should return true when dateOfBirth selected is valid', () => {
      expect(validator.isIsoDateFormat(dayjs().format('YYYY-MM-DD'))).to.be.true;
    });

    it('should return false when dateOfBirth is invalid format', () => {
      expect(validator.isIsoDateFormat('13-30-2021')).to.be.false;
    });

    it('should return false when dateOfBirth is invalid date', () => {
      expect(validator.isIsoDateFormat('2021-12-33')).to.be.false;
    });

    it('should return false when dateOfBirth is invalid month', () => {
      expect(validator.isIsoDateFormat('4444-44-04')).to.be.false;
    });
  });

  describe('isMoreThanHundredYearsAgo', () => {
    it('should return true when dateOfBirth input is not More Than Hundred Years Ago', () => {
      expect(validator.isMoreThanHundredYearsAgo('03/03/1990')).to.be.true;
    });

    it('should return false when dateOfBirth input is More Than Hundred Years Ago', () => {
      expect(validator.isMoreThanHundredYearsAgo('03/03/1920')).to.be.false;
    });

    it('should return false when dateOfBirth input is not valid format and not More Than Hundred Years Ago', () => {
      expect(validator.isMoreThanHundredYearsAgo('13/03/1990')).to.be.false;
    });

    it('should return false when dateOfBirth input is not valid format and not More Than Hundred Years Ago', () => {
      expect(validator.isMoreThanHundredYearsAgo('13/33/1990')).to.be.false;
    });

    it('should return false when dateOfBirth input is not valid format and not More Than Hundred Years Ago', () => {
      expect(validator.isMoreThanHundredYearsAgo('13/33/4444')).to.be.false;
    });
    it('should return false when dateOfBirth input is not valid format and not More Than Hundred Years Ago', () => {
      expect(validator.isMoreThanHundredYearsAgo('12-33-1990')).to.be.false;
    });
  });

  describe('isValidDepartureAndArrival', () => {
    it('should return true when departure and arrival values are different', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'BDL', destination: 'LAX' })).to.be.true;
    });

    it('should return true when there is only departure value and no arrival value', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'BDL' })).to.be.true;
    });

    it('should return true when there is only arrival value and no departure value', () => {
      expect(validator.isValidDepartureAndArrival({ destination: 'LAX' })).to.be.true;
    });

    it('should return true when departure and arrival values are not passed', () => {
      expect(validator.isValidDepartureAndArrival({})).to.be.true;
    });

    it('should return true when departure value is not in arrival value list', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'BDL', destination: 'BUR,LAX,ONT' })).to.be.true;
    });

    it('should return true when arrival value is not in departure value list', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'BDL,BOS', destination: 'LAX' })).to.be.true;
    });

    it('should return true when there are no common values in departure and arrival value lists', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'BDL,BOS', destination: 'BUR,LAX,ONT' })).to.be.true;
    });

    it('should return false when departure and arrival values are same', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'LAX', destination: 'LAX' })).to.be.false;
    });

    it('should return false when arrival value is in departure value list', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'BUR,LAX,ONT', destination: 'LAX' })).to.be.false;
    });

    it('should return false when departure value is in arrival value list', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'LAX', destination: 'BUR,LAX,ONT' })).to.be.false;
    });

    it('should return false when there is a common value in departure and arrival value lists', () => {
      expect(validator.isValidDepartureAndArrival({ origin: 'BUR,LAX,ONT', destination: 'BUR,LAX,ONT' })).to.be.false;
    });
  });

  describe('isRelationship', () => {
    it('should not contains numbers and special characters except spaces', () => {
      expect(validator.isRelationship('Mo-ther')).to.be.false;
      expect(validator.isRelationship('Mo1ther')).to.be.false;
      expect(validator.isRelationship('Mother in law')).to.be.true;
      expect(validator.isRelationship('Mother')).to.be.true;
      expect(validator.isRelationship('Mother*')).to.be.false;
    });
  });
});
