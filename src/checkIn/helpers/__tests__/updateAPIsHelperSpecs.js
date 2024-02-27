import { sandbox } from 'sinon';
import {
  getNextTravelPassengerTransitionInfo,
  getMissingPassportOrEmergencyContact,
  isMissingPassportOrEmergencyContact,
  isMissingAdditionalInfo
} from 'src/checkIn/helpers/updateAPIsHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';

const sinon = sandbox.create();

describe('updateAPIsHelper', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('getNextTravelPassengerTransitionInfo', () => {
    it('should return check in confirmation page when travelDocuments is empty', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');

      const result = getNextTravelPassengerTransitionInfo([], 1);

      expect(result).to.deep.equal({ nextPagePath: getNormalizedRoute({ routeName: 'checkInConfirmation' }) });
    });

    it('should return correct nextPaxNumber and nextPagePath when next pax is missing passport', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');

      const travelDocuments = [
        {
          missingDocuments: ['NATIONALITY']
        }
      ];
      const result = getNextTravelPassengerTransitionInfo(travelDocuments, 0);

      expect(result).to.deep.equal({ nextPaxNumber: '1', nextPagePath: getNormalizedRoute({ routeName: 'checkInPassportInformation' }) });
    });

    it('should return correct nextPaxNumber and nextPagePath when next pax is missing emergency contact', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');

      const travelDocuments = [
        {
          missingDocuments: ['EMERGENCY_CONTACT']
        }
      ];
      const result = getNextTravelPassengerTransitionInfo(travelDocuments, 0);

      expect(result).to.deep.equal({ nextPaxNumber: '1', nextPagePath: getNormalizedRoute({ routeName: 'checkInPassportInformation' }) });
    });

    it('should return correct nextPaxNumber and nextPagePath when next pax is missing Visa', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');

      const travelDocuments = [
        {
          missingDocuments: ['PERMANENT_RESIDENT_CARD', 'VISA']
        }
      ];
      const result = getNextTravelPassengerTransitionInfo(travelDocuments, 0);

      expect(result).to.deep.equal({ nextPaxNumber: '1', nextPagePath: getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformation' }) });
    });

    it('should return correct nextPaxNumber and nextPagePath when next pax is missing DESTINATION and green card', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');

      const travelDocuments = [
        {
          missingDocuments: ['NATIONALITY']
        },
        {
          missingDocuments: ['PERMANENT_RESIDENT_CARD', 'DESTINATION']
        }
      ];
      const result = getNextTravelPassengerTransitionInfo(travelDocuments, 1);

      expect(result).to.deep.equal({ nextPaxNumber: '2', nextPagePath: getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformation' }) });
    });

    it('should return correct nextPaxNumber and nextPagePath when next pax is not missing any documents', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');

      const travelDocuments = [];
      const result = getNextTravelPassengerTransitionInfo(travelDocuments, 0);

      expect(result).to.deep.equal({ nextPagePath: '/air/check-in/confirmation.html' });
    });

    it('should return correct nextPaxNumber and nextPagePath when next pax is not missing any relevant documents', () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('check-in');

      const travelDocuments = [
        {
          missingDocuments: ['TEST']
        }
      ];
      const result = getNextTravelPassengerTransitionInfo(travelDocuments, 0);

      expect(result).to.deep.equal({ nextPagePath: '/air/check-in/confirmation.html' });
    });
  });

  context('isMissingPassportOrEmergencyContact', () => {
    it('should return true when missingDocuments is missing passport', () => {
      const missingDocuments = ['NATIONALITY'];
      const result = isMissingPassportOrEmergencyContact(missingDocuments);

      expect(result).to.be.true;
    });

    it('should return true when missingDocuments is missing emergency contect', () => {
      const missingDocuments = ['EMERGENCY_CONTACT'];
      const result = isMissingPassportOrEmergencyContact(missingDocuments);

      expect(result).to.be.true;
    });

    it('should return false when missingDocuments is not missing passport and emergency contect', () => {
      const missingDocuments = ['PERMANENT_RESIDENT_CARD'];
      const result = isMissingPassportOrEmergencyContact(missingDocuments);

      expect(result).to.be.false;
    });

    it('should return false when missingDocuments is empty', () => {
      const missingDocuments = [];
      const result = isMissingPassportOrEmergencyContact(missingDocuments);

      expect(result).to.be.false;
    });
  });

  context('isMissingAdditionalInfo', () => {
    it('should return true when missingDocuments is missing DESTINATION and green card', () => {
      const missingDocuments = ['PERMANENT_RESIDENT_CARD', 'DESTINATION'];
      const result = isMissingAdditionalInfo(missingDocuments);

      expect(result).to.be.true;
    });

    it('should return true when missingDocuments is missing Visa', () => {
      const missingDocuments = ['VISA'];
      const result = isMissingAdditionalInfo(missingDocuments);

      expect(result).to.be.true;
    });

    it('should return false when missingDocuments is not missing passport and emergency contect', () => {
      const missingDocuments = ['EMERGENCY_CONTACT', 'NATIONALITY'];
      const result = isMissingAdditionalInfo(missingDocuments);

      expect(result).to.be.false;
    });

    it('should return false when missingDocuments is empty', () => {
      const missingDocuments = [];
      const result = isMissingAdditionalInfo(missingDocuments);

      expect(result).to.be.false;
    });
  });

  context('getMissingPassportOrEmergencyContact', () => {
    it('should return missing passport or emergency contact', () => {
      const result = getMissingPassportOrEmergencyContact(['NATIONALITY', 'VISA']);

      expect(result).to.be.deep.equal(['NATIONALITY']);
    });
  });
});
