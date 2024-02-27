import * as CheckInAdditionalPassportInfoPageSelector from 'src/checkIn/selectors/checkInAdditionalPassportInfoPageSelector';

describe('checkInAdditionalPassportInfoPageSelector', () => {
  context('shouldShowSkipButton', () => {
    it('should return false when the length of passengers is not more than 1', () => {
      const actualResult = CheckInAdditionalPassportInfoPageSelector.shouldShowSkipButton.resultFunc(['Li Chen']);

      expect(actualResult).to.equal(false);
    });

    it('should return true when the length of passengers is more than 1', () => {
      const actualResult = CheckInAdditionalPassportInfoPageSelector.shouldShowSkipButton.resultFunc([
        'Li Chen',
        'Li Ling'
      ]);

      expect(actualResult).to.equal(true);
    });
  });

  context('isLastPAX', () => {
    it('should return true when paxNumber equal the length of travelDocuments', () => {
      const actualResult = CheckInAdditionalPassportInfoPageSelector.isLastPAX.resultFunc(
        [
          {
            requestData: {},
            travelerName: 'Li Chen',
            passportPageFormData: { passport: 'passport' },
            missingDocuments: ['doc1', 'doc2', 'doc3']
          }
        ],
        1
      );

      expect(actualResult).to.equal(true);
    });

    it('should return false when paxNumber does not equal the length of travelDocuments', () => {
      const actualResult = CheckInAdditionalPassportInfoPageSelector.isLastPAX.resultFunc(
        [
          {
            requestData: {},
            travelerName: 'Li Chen',
            passportPageFormData: { passport: 'passport' },
            missingDocuments: ['doc1', 'doc2', 'doc3']
          }
        ],
        2
      );

      expect(actualResult).to.equal(false);
    });
  });

  context('getDocumentTitles', () => {
    it('should extract titles from destinationConfig', () => {
      const destinationConfig = {
        title: 'Travel Destination'
      };

      const actualResult = CheckInAdditionalPassportInfoPageSelector.getDocumentTitles.resultFunc(
        [
          {
            destinationConfig
          }
        ],
        1
      );

      expect(actualResult).to.deep.equal({
        destination: 'Travel Destination'
      });
    });

    it('should return empty object when destinationConfig missing', () => {
      const actualResult = CheckInAdditionalPassportInfoPageSelector.getDocumentTitles.resultFunc([{}], 1);

      expect(actualResult).to.deep.equal({});
    });
  });

  it('should return correct request data when call getFormData', () => {
    const actualResult = CheckInAdditionalPassportInfoPageSelector.getFormData.resultFunc(
      [
        {
          requestData: {},
          travelerName: 'Li Chen',
          passportPageFormData: { passport: 'passport' },
          additionalPassportPageFormData: {
            destination: 'destination',
            permanentResidentCard: 'permanentResidentCard',
            visa: 'visa'
          },
          missingDocuments: ['PERMANENT_RESIDENT_CARD', 'VISA', 'DESTINATION']
        }
      ],
      1
    );

    expect(actualResult).to.deep.equal({
      destination: 'destination',
      permanentResidentCard: 'permanentResidentCard',
      visa: 'visa'
    });
  });
});
