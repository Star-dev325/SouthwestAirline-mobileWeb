import dayjs from 'dayjs';
import { DAYJS_TIMESTAMP_FORMAT } from 'src/shared/constants/dayjsConstants';
import transformToAccountInfo from 'src/myAccount/transformers/accountInfoTransformer';
import userInfoResponseMock from 'src/myAccount/transformers/__tests__/userInfoApiResponseMock';

describe('accountInfoTransformer', () => {
  it('should transform the api response of userInfo to accountInfo', () => {
    const mockExpiration = dayjs().add('1', 'minutes').format(DAYJS_TIMESTAMP_FORMAT);

    expect(transformToAccountInfo(userInfoResponseMock)).to.deep.equal({
      companionFullName: 'Tikitikitembonosarembocharibar Ibariruchipipperipembolkjasldk',
      companionName: { firstName: 'Tikitikitembonosarembocharibar', lastName: 'Ibariruchipipperipembolkjasldk' },
      companionAccountNumber: '00018016157375',
      customerInfo: {
        accountNumber: '00008349157375',
        emailAddress: 'd8b36dd4318de118e58e99e090e63eb54344c97894157d16fe6b7a965c99d6c4',
        name: {
          firstName: 'Tim',
          lastName: 'George',
          userName: 'Tim George'
        },
        birthDate: '1966-06-05',
        countryCode: 'US'
      },
      contactInfo: {
        address: {
          addressLine1: '554 Lane',
          addressLine2: null,
          city: 'Austin',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75204',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        },
        phone: {
          number: '2155465465',
          countryCode: '1',
          phoneType: 'Home'
        },
        emailAddress: 'test@wnco.com',
        preferredTypeOfCommunication: {
          type: 'TEXT_ME',
          value: '1234567890'
        }
      },
      isTierStatusPending: true,
      rapidRewardsDetails: {
        userAlreadyHasChaseRRVisa: true,
        tierInfo: {
          tier: 'A_LIST_PREFERRED'
        },
        isEnrolledInRapidRewards: true,
        redeemablePoints: 13441,
        companionPassInfo: {
          companionDeclared: true,
          companionPassAchieved: true,
          companionPassExpirationDate: '2017-12-31',
          companionQualifyingFlights: 4,
          companionQualifyingPoints: 3788192
        }
      },
      expirationDate: mockExpiration
    });
  });

  it('should transform the api response of userInfo to accountInfo without companion full name if the user do not have it', () => {
    const mockExpiration = dayjs().add('5', 'minutes').format(DAYJS_TIMESTAMP_FORMAT);

    userInfoResponseMock.companionInfo = null;

    expect(transformToAccountInfo(userInfoResponseMock, '5')).to.deep.equal({
      customerInfo: {
        accountNumber: '00008349157375',
        emailAddress: 'd8b36dd4318de118e58e99e090e63eb54344c97894157d16fe6b7a965c99d6c4',
        name: {
          firstName: 'Tim',
          lastName: 'George',
          userName: 'Tim George'
        },
        birthDate: '1966-06-05',
        countryCode: 'US'
      },
      contactInfo: {
        address: {
          addressLine1: '554 Lane',
          addressLine2: null,
          city: 'Austin',
          stateProvinceRegion: 'TX',
          zipOrPostalCode: '75204',
          addressType: 'HOME',
          isoCountryCode: 'US',
          companyName: null
        },
        phone: {
          number: '2155465465',
          countryCode: '1',
          phoneType: 'Home'
        },
        emailAddress: 'test@wnco.com',
        preferredTypeOfCommunication: {
          type: 'TEXT_ME',
          value: '1234567890'
        }
      },
      isTierStatusPending: true,
      rapidRewardsDetails: {
        userAlreadyHasChaseRRVisa: true,
        tierInfo: {
          tier: 'A_LIST_PREFERRED'
        },
        isEnrolledInRapidRewards: true,
        redeemablePoints: 13441,
        companionPassInfo: {
          companionDeclared: true,
          companionPassAchieved: true,
          companionPassExpirationDate: '2017-12-31',
          companionQualifyingFlights: 4,
          companionQualifyingPoints: 3788192
        }
      },
      expirationDate: mockExpiration
    });
  });
});
