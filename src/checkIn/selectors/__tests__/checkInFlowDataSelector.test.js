jest.mock('src/shared/selectors/appSelector', () => ({
  getCurrentAppFlow: jest.fn().mockReturnValue('check-in')
}));

import * as CheckInFlowDataSelector from 'src/checkIn/selectors/checkInFlowDataSelector';

describe('checkInFlowDataSelectorSelectors', () => {
  describe('getNextPageOptions', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return correct nextPagePath when missing travelDocuments', () => {
      const nextPageOptions = CheckInFlowDataSelector.getNextPageOptions.resultFunc([], 1);

      expect(nextPageOptions).toEqual({ nextPagePath: '/air/check-in/confirmation.html' });
    });

    it('should return correct nextPagePath and nextPageNumber when there has travelDocuments', () => {
      const nextPageOptions = CheckInFlowDataSelector.getNextPageOptions.resultFunc(
        [{ missingDocuments: ['NATIONALITY'] }, { missingDocuments: ['NATIONALITY'] }],
        1
      );

      expect(nextPageOptions).toEqual({
        nextPagePath: '/air/check-in/:paxNumber/required-info.html',
        nextPaxNumber: '2'
      });
    });
  });

  it('should return correct passenger name when call getPassengerName', () => {
    expect(
      CheckInFlowDataSelector.getPassengerName.resultFunc(
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
    ).toEqual('Li Chen');
  });

  it('should return correct request data when call getRequestData', () => {
    expect(
      CheckInFlowDataSelector.getRequestData.resultFunc(
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
    ).toEqual({});
  });

  it('should return suppressEmergencyContact value from reducer when calling getSuppressEmergencyContact ', () => {
    expect(
      CheckInFlowDataSelector.getSuppressEmergencyContact.resultFunc(
        [
          {
            travelerIdentifier: 'travelerIdentifier1',
            suppressEmergencyContact: true
          }
        ],
        {
          body: {
            travelerIdentifier: 'travelerIdentifier1'
          }
        }
      )
    ).toEqual(true);
  });
  it('should return undefined value from reducer when body of requestedData is empty', () => {
    expect(
      CheckInFlowDataSelector.getSuppressEmergencyContact.resultFunc(
        [
          {
            travelerIdentifier: 'travelerIdentifier1',
            suppressEmergencyContact: true
          }
        ],
        {
          body: {}
        }
      )
    ).toEqual(undefined);
  });
  it('should return undefined value from reducer when requestedData is empty', () => {
    expect(
      CheckInFlowDataSelector.getSuppressEmergencyContact.resultFunc(
        [
          {
            travelerIdentifier: 'travelerIdentifier1',
            suppressEmergencyContact: true
          }
        ],
        {}
      )
    ).toEqual(undefined);
  });
});
