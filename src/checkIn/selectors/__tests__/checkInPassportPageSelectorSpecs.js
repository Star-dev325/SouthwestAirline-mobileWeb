import * as CheckInPassportPageSelector from 'src/checkIn/selectors/checkInPassportPageSelector';

describe('checkInFlowDataSelectorSelectors', () => {
  context('shouldShowSkipButton', () => {
    it('should return false when the length of passengers is not more than 1', () => {
      expect(CheckInPassportPageSelector.shouldShowSkipButton.resultFunc(['Li Chen'])).to.equal(false);
    });

    it('should return true when the length of passengers is more than 1', () => {
      expect(CheckInPassportPageSelector.shouldShowSkipButton.resultFunc(['Li Chen', 'Li Ling'])).to.equal(true);
    });
  });

  context('isLastPage', () => {
    it('should return true when paxNumber equal the length of travelDocuments and not missing additionalPassportInfo', () => {
      expect(
        CheckInPassportPageSelector.isLastPage.resultFunc(
          [
            {
              requestData: {},
              travelerName: 'Li Chen',
              passportPageFormData: { passport: 'passport' },
              missingDocuments: null
            }
          ],
          1
        )
      ).to.be.true;
    });

    it('should return false when paxNumber does not equal the length of travelDocuments', () => {
      expect(
        CheckInPassportPageSelector.isLastPage.resultFunc(
          [
            {
              requestData: {},
              travelerName: 'Li Chen',
              passportPageFormData: { passport: 'passport' },
              missingDocuments: null
            }
          ],
          2
        )
      ).to.be.false;
    });

    it('should return false when the travelDocument of the PAX has additionalPassPortInfo', () => {
      expect(
        CheckInPassportPageSelector.isLastPage.resultFunc(
          [
            {
              requestData: {},
              travelerName: 'Li Chen',
              passportPageFormData: { passport: 'passport' },
              missingDocuments: ['DESTINATION']
            }
          ],
          1
        )
      ).to.be.false;
    });
  });

  it('should return correct passportPageFormData when call getPassportPageFormData', () => {
    expect(
      CheckInPassportPageSelector.getPassportPageFormData.resultFunc(
        [
          {
            requestData: {},
            travelerName: 'Li Chen',
            passportPageFormData: { passport: 'passport' },
            missingDocuments: ['doc1', 'doc2', 'doc3']
          }
        ],
        1
      )
    ).to.deep.equal({ passport: 'passport' });
  });

  context('getShouldShowSaveEmergencyContactForAll', () => {
    it('should get `shouldShowSaveEmergencyContactForAll`as false for the first passenger who is not the first one missing emergency contact or nationality', () => {
      const travelDocuments = [
        {
          requestData: {},
          missingDocuments: ['VISA'],
          passportPageFormData: ''
        },
        {
          requestData: {},
          missingDocuments: ['NATIONALITY'],
          passportPageFormData: ''
        },
        {
          requestData: {},
          missingDocuments: ['EMERGENCY_CONTACT'],
          passportPageFormData: ''
        }
      ];

      expect(CheckInPassportPageSelector.getShouldShowSaveEmergencyContactForAll.resultFunc(travelDocuments, 1)).to.be
        .false;
    });

    it('should get `shouldShowSaveEmergencyContactForAll` to be true for the first passenger when there contains more than two paxs missing emergency contact or nationality', () => {
      const travelDocuments = [
        {
          requestData: {},
          missingDocuments: ['VISA'],
          passportPageFormData: ''
        },
        {
          requestData: {},
          missingDocuments: ['NATIONALITY'],
          passportPageFormData: ''
        },
        {
          requestData: {},
          missingDocuments: ['EMERGENCY_CONTACT'],
          passportPageFormData: ''
        }
      ];

      expect(CheckInPassportPageSelector.getShouldShowSaveEmergencyContactForAll.resultFunc(travelDocuments, 2)).to.be
        .true;
    });
  });

  context('getPassportPageFormData', () => {
    it('should return the passportPageFormData without emergency contact method when the shouldUseForAll of saveEmergencyContactForAll is false', () => {
      const travelDocuments = [
        {
          requestData: {},
          missingDocuments: ['VISA'],
          passportPageFormData: {
            passportNumber: '2141341234'
          }
        },
        {
          requestData: {},
          missingDocuments: ['NATIONALITY'],
          passportPageFormData: {
            passportNumber: '2141341234'
          }
        }
      ];
      const saveEmergencyContactForAll = {
        shouldUseForAll: false,
        emergencyContactName: 'Shelton Suen',
        emergencyContactCountryCode: 'US',
        emergencyContactPhoneNumber: '412-341-2341'
      };

      const passportPageFormData = CheckInPassportPageSelector.getPassportPageFormData.resultFunc(
        travelDocuments,
        1,
        saveEmergencyContactForAll
      );

      expect(passportPageFormData).to.be.deep.equals({ passportNumber: '2141341234' });
    });

    it('should return the passportPageFormData with emergency contact method when the shouldUseForAll of saveEmergencyContactForAll is true', () => {
      const travelDocuments = [
        {
          requestData: {},
          missingDocuments: ['VISA'],
          passportPageFormData: {
            passportNumber: '2141341234'
          }
        },
        {
          requestData: {},
          missingDocuments: ['NATIONALITY'],
          passportPageFormData: {
            passportNumber: '2141341234'
          }
        }
      ];
      const saveEmergencyContactForAll = {
        shouldUseForAll: true,
        emergencyContactName: 'Shelton Suen',
        emergencyContactCountryCode: 'US',
        emergencyContactPhoneNumber: '412-341-2341'
      };

      const passportPageFormData = CheckInPassportPageSelector.getPassportPageFormData.resultFunc(
        travelDocuments,
        1,
        saveEmergencyContactForAll
      );

      expect(passportPageFormData).to.be.deep.equals({
        passportNumber: '2141341234',
        emergencyContactName: 'Shelton Suen',
        emergencyContactCountryCode: 'US',
        emergencyContactPhoneNumber: '412-341-2341'
      });
    });
  });
});
