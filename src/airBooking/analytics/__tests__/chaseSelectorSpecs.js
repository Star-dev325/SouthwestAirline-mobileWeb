import { getChase as chaseSelector } from 'src/airBooking/analytics/chaseSelector';

describe('confirmationSelector', () => {
  context('analytics response returned from CHAPI', () => {
    const analyticsChapiResponse = {
      app: {
        airBooking: {
          flightConfirmationPage: {
            response: {
              flightConfirmationPage: {
                totals: {
                  adultFare: {
                    earlyBirdPriceDetails: [
                      {
                        total: {
                          amount: '15.00'
                        }
                      },
                      {
                        total: {
                          amount: '20.00'
                        }
                      }
                    ],
                    _meta: {
                      recordLocator: '1ADULT',
                      failedEarlyBird: false
                    }
                  }
                },
                _analytics: {
                  'Chase.accountCreationStatus': 'NEW',
                  'Chase.accountProvisioned': true,
                  'Chase.provisionedRR': '12345678901'
                }
              }
            }
          }
        }
      }
    };
    const noAnalyticsChapiResponse = {
      app: {
        airBooking: {
          flightConfirmationPage: {
            response: {
              flightConfirmationPage: {
                totals: {
                  adultFare: {
                    earlyBirdPriceDetails: [
                      {
                        total: {
                          amount: '15.00'
                        }
                      },
                      {
                        total: {
                          amount: '20.00'
                        }
                      }
                    ],
                    _meta: {
                      recordLocator: '1ADULT',
                      failedEarlyBird: false
                    }
                  }
                },
                _analytics: null
              }
            }
          }
        }
      }
    };

    it('should get the correct analytics data from CHAPIs response', () => {
      const chase = chaseSelector(analyticsChapiResponse);

      expect(chase).to.deep.equal({
        accountCreationStatus: 'NEW',
        accountProvisioned: true,
        provisionedRR: '12345678901'
      });
    });

    it('should return empty objects when CHAPI doesnt send an analytics response', () => {
      const chase = chaseSelector(noAnalyticsChapiResponse);

      expect(chase).to.deep.equal({
        accountCreationStatus: undefined,
        accountProvisioned: undefined,
        provisionedRR: undefined
      });
    });
  });
});
