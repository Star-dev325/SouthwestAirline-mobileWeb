const _ = require('lodash');

module.exports = function AccountInfoApiResponseBuilder() {
  this.accountInfo = {
    customerInfo: {
      name: {
        firstName: 'Ron',
        lastName: 'Hackmann'
      },
      gender: 'Male',
      birthDate: '1967-01-12',
      accountNumber: '600597056'
    },
    contactInfo: {
      address: {
        addressLine1: 'SWA',
        addressLine2: 'LOVE',
        city: 'Dallas',
        stateProvinceRegion: 'IL',
        zipOrPostalCode: '60068',
        addressType: 'HOME',
        isoCountryCode: 'US',
        companyName: null
      },
      phone: {
        number: '1231231234',
        countryCode: '',
        phoneType: 'Home'
      },
      emailAddress: 'test@test.com'
    },
    isTierStatusPending: false,
    rapidRewardsDetails: {
      redeemablePoints: 33476,
      tierInfo: {
        tier: 'A_LIST_PREFERRED',
        tierAchievedDate: '2014-11-09',
        tierQualifyingPoints: 15000,
        tierQualifyingFlights: 15
      },
      companionPassInfo: {
        companionPassAchieved: true,
        companionDeclared: true,
        companionPassExpirationDate: '2017-12-31',
        companionQualifyingPoints: 120000,
        companionQualifyingFlights: 0
      },
      isEnrolledInRapidRewards: true
    },
    companionInfo: {
      name: {
        firstName: 'Tom',
        middleName: 'Robert',
        lastName: 'Wu'
      },
      gender: 'Male',
      birthDate: '1945-01-02',
      accountNumber: '00024671157372'
    }
  };

  this.withFirstName = function(firstName) {
    this.accountInfo.customerInfo.name.firstName = firstName;

    return this;
  };

  this.withPreferredTypeOfCommunication = function(preferredTypeOfCommunication) {
    this.accountInfo.contactInfo.preferredTypeOfCommunication = preferredTypeOfCommunication;

    return this;
  };

  this.withRedeemablePoints = function(redeemablePoints) {
    this.accountInfo.rapidRewardsDetails.redeemablePoints = redeemablePoints;

    return this;
  };

  this.withCompanionPassAchieved = function(companionPassAchieved) {
    _.set(this.accountInfo, 'rapidRewardsDetails.companionPassInfo.companionPassAchieved', companionPassAchieved);

    return this;
  };

  this.withIsTierStatusPending = function(isTierStatusPending) {
    _.set(this.accountInfo, 'isTierStatusPending', isTierStatusPending);

    return this;
  };

  this.withTier = function(tier) {
    this.accountInfo.rapidRewardsDetails.tierInfo = {
      tier
    };

    return this;
  };

  this.withIsEnrolledInRapidRewards = function(isEnrolled) {
    _.set(this.accountInfo, 'rapidRewardsDetails.isEnrolledInRapidRewards', isEnrolled);

    return this;
  };

  this.withAccountNumber = function(accountNumber) {
    _.set(this.accountInfo, 'customerInfo.accountNumber', accountNumber);

    return this;
  };

  this.build = function() {
    return this.accountInfo;
  };
};
