import { getOriginDestination } from 'src/checkIn/analytics/analyticsObjectSelector';

describe('checkin analytics object getter', () => {
  let checkInViewResPageDomestic, checkInViewResPageDomesticOW, checkInViewResPageInternational;
  let checkInConfirmationPageDomestic, checkInConfirmationPageDomesticOW, checkInConfirmationPageInternational;

  beforeEach(() => {
    checkInViewResPageDomestic = {
      app: {
        checkIn: {
          checkInViewReservationPage: {
            _analytics: {
              'checkin.odout': 'DALATL',
              'checkin.odret': 'ATLDAL'
            }
          }
        }
      }
    };

    checkInViewResPageDomesticOW = {
      app: {
        checkIn: {
          checkInViewReservationPage: {
            _analytics: {
              'checkin.odout': 'DALATL'
            }
          }
        }
      }
    };

    checkInViewResPageInternational = {
      app: {
        checkIn: {
          checkInViewReservationPage: {
            _analytics: {
              'checkin.odout': 'DALCUN',
              'checkin.odret': 'CUNDAL',
              'pnr.isinternational': '1'
            }
          }
        }
      }
    };

    checkInConfirmationPageDomestic = {
      app: {
        checkIn: {
          checkInViewReservationPage: {
            _analytics: {
              'checkin.odout': 'DALATL',
              'checkin.odret': 'ATLDAL'
            }
          }
        }
      }
    };

    checkInConfirmationPageDomesticOW = {
      app: {
        checkIn: {
          checkInViewReservationPage: {
            _analytics: {
              'checkin.odout': 'DALATL'
            }
          }
        }
      }
    };

    checkInConfirmationPageInternational = {
      app: {
        checkIn: {
          checkInViewReservationPage: {
            _analytics: {
              'checkin.odout': 'DALCUN',
              'checkin.odret': 'CUNDAL',
              'pnr.isinternational': '1'
            }
          }
        }
      }
    };
  });

  it('should return contents of the _analytics object for rt domestic checkin view res', () => {
    const result = getOriginDestination(checkInViewResPageDomestic, []);
    const expectedResults = {
      'checkin.odout': 'DALATL',
      'checkin.odret': 'ATLDAL'
    };

    expect(result).to.deep.equal(expectedResults);
  });

  it('should return contents of the _analytics object for ow domestic checkin view res', () => {
    const result = getOriginDestination(checkInViewResPageDomesticOW, []);
    const expectedResults = {
      'checkin.odout': 'DALATL'
    };

    expect(result).to.deep.equal(expectedResults);
  });

  it('should return contents of the _analytics object for rt international checkin view res', () => {
    const result = getOriginDestination(checkInViewResPageInternational, []);
    const expectedResults = {
      'checkin.odout': 'DALCUN',
      'checkin.odret': 'CUNDAL',
      'pnr.isinternational': '1'
    };

    expect(result).to.deep.equal(expectedResults);
  });

  it('should return contents of the _analytics object for rt domestic checkin confirmation', () => {
    const result = getOriginDestination(checkInConfirmationPageDomestic, []);
    const expectedResults = {
      'checkin.odout': 'DALATL',
      'checkin.odret': 'ATLDAL'
    };

    expect(result).to.deep.equal(expectedResults);
  });

  it('should return contents of the _analytics object for ow domestic checkin confirmation', () => {
    const result = getOriginDestination(checkInConfirmationPageDomesticOW, []);
    const expectedResults = {
      'checkin.odout': 'DALATL'
    };

    expect(result).to.deep.equal(expectedResults);
  });

  it('should return contents of the _analytics object for rt international checkin confirmation', () => {
    const result = getOriginDestination(checkInConfirmationPageInternational, []);
    const expectedResults = {
      'checkin.odout': 'DALCUN',
      'checkin.odret': 'CUNDAL',
      'pnr.isinternational': '1'
    };

    expect(result).to.deep.equal(expectedResults);
  });
});
