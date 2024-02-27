import { isMultiPax } from 'src/checkIn/analytics/multiPaxSelector';

describe('checkin confirmation selector', () => {
  let expectedMultiPaxResults;
  let multiPaxFlight;
  let expectedSinglePaxResults;
  let singlePaxFlight;

  beforeEach(() => {
    multiPaxFlight = {
      app: {
        checkIn: {
          checkInConfirmationPage: {
            flights: [
              {
                passengers: [
                  {
                    name: 'Andrew Tangrila',
                    hasPrecheck: false,
                    boardingGroup: 'A',
                    boardingPosition: '17',
                    mobileBoardingPassEligible: false,
                    mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
                    greyBoxMessage: null,
                    specialAssistanceMessage: null,
                    travelerSegmentIdentifier: '2301DC720002BC31',
                    travelerID: '2301CC720000FC60',
                    checkedIn: true,
                    confirmationNumber: 'RKK2HC',
                    _links: {
                      viewPassengerBoardingPass: {
                        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/RKK2HC',
                        method: 'POST',
                        body: {
                          firstName: 'ANDREW',
                          lastName: 'TANGRILA',
                          travelerID: ['2301CC720000FC60']
                        }
                      }
                    }
                  },
                  {
                    name: 'Xianning Tangrila',
                    hasPrecheck: false,
                    boardingGroup: 'A',
                    boardingPosition: '18',
                    mobileBoardingPassEligible: false,
                    mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
                    greyBoxMessage: null,
                    specialAssistanceMessage: null,
                    travelerSegmentIdentifier: '2301DC720002BC32',
                    travelerID: '2301CC720000FC61',
                    checkedIn: true,
                    confirmationNumber: 'RKK2HC',
                    _links: {
                      viewPassengerBoardingPass: {
                        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/RKK2HC',
                        method: 'POST',
                        body: {
                          firstName: 'XIANNING',
                          lastName: 'TANGRILA',
                          travelerID: ['2301CC720000FC61']
                        }
                      }
                    }
                  },
                  {
                    name: 'Andrew Biggs',
                    hasPrecheck: false,
                    boardingGroup: 'A',
                    boardingPosition: '19',
                    mobileBoardingPassEligible: false,
                    mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
                    greyBoxMessage: null,
                    specialAssistanceMessage: null,
                    travelerSegmentIdentifier: '2301DC720002BC33',
                    travelerID: '2301CC720000FC62',
                    checkedIn: true,
                    confirmationNumber: 'RKK2HC',
                    _links: {
                      viewPassengerBoardingPass: {
                        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/RKK2HC',
                        method: 'POST',
                        body: {
                          firstName: 'ANDREW',
                          lastName: 'BIGGS',
                          travelerID: ['2301CC720000FC62']
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    };

    singlePaxFlight = {
      app: {
        checkIn: {
          checkInConfirmationPage: {
            flights: [
              {
                passengers: [
                  {
                    name: 'Andrew Tangrila',
                    hasPrecheck: false,
                    boardingGroup: 'A',
                    boardingPosition: '17',
                    mobileBoardingPassEligible: false,
                    mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
                    greyBoxMessage: null,
                    specialAssistanceMessage: null,
                    travelerSegmentIdentifier: '2301DC720002BC31',
                    travelerID: '2301CC720000FC60',
                    checkedIn: true,
                    confirmationNumber: 'RKK2HC',
                    _links: {
                      viewPassengerBoardingPass: {
                        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/RKK2HC',
                        method: 'POST',
                        body: {
                          firstName: 'ANDREW',
                          lastName: 'TANGRILA',
                          travelerID: ['2301CC720000FC60']
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    };

    expectedMultiPaxResults = { isMultiPaxPNR: true };
    expectedSinglePaxResults = { isMultiPaxPNR: false };
  });
  it('should return true if flight has multipax', () => {
    const result = isMultiPax(multiPaxFlight, []);

    expect(result).to.deep.equal(expectedMultiPaxResults);
  });

  it('should return false if flight is single pax', () => {
    const result = isMultiPax(singlePaxFlight, []);

    expect(result).to.deep.equal(expectedSinglePaxResults);
  });
});
