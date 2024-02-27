import { getConfirmation as confirmationSelector } from 'src/airBooking/analytics/confirmationSelector';
import _ from 'lodash';

describe('confirmationSelector', () => {
  context('single passenger', () => {
    const _analytics = {
      'air.fareClassb1': 'R',
      'air.fareProductIdb1': 'WGA',
      'air.fareTypeb1': 'WGA'
    };

    let state;

    beforeEach(() => {
      state = {
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
                  }
                }
              }
            },
            paymentInfo: {
              selectedCardId: 'NEW_CREDIT_CARD_ID'
            }
          }
        }
      };
    });

    it('should generate analytics review data', () => {
      const confirmation = confirmationSelector(state);

      expect(confirmation.reservationGroups).to.deep.equal([
        {
          earlyBirdFailureDueToChase: false,
          earlyBirdSucceeded: true,
          earlyBirdTotalCostCents: '35.00',
          pnr: '1ADULT'
        }
      ]);
    });
    it('should have earlyBirdFailureDueToChase as true if it uses chase credit card and EB purchase failed', () => {
      const confirmation = confirmationSelector(
        _.merge({}, state, {
          app: {
            airBooking: {
              flightConfirmationPage: {
                response: {
                  flightConfirmationPage: {
                    totals: {
                      adultFare: {
                        _meta: {
                          failedEarlyBird: true
                        }
                      }
                    }
                  }
                }
              },
              paymentInfo: {
                selectedCardId: 'RAPID_REWARDS_VISA_ID'
              }
            }
          }
        })
      );

      expect(confirmation.reservationGroups).to.deep.equal([
        {
          earlyBirdFailureDueToChase: true,
          earlyBirdSucceeded: false,
          earlyBirdTotalCostCents: null,
          pnr: '1ADULT'
        }
      ]);
    });
    it('should have earlyBirdFailureDueToChase as false if it uses non-chase credit card and EB purchase failed', () => {
      const confirmation = confirmationSelector(
        _.merge({}, state, {
          app: {
            airBooking: {
              flightConfirmationPage: {
                response: {
                  flightConfirmationPage: {
                    totals: {
                      adultFare: {
                        _meta: {
                          failedEarlyBird: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        })
      );

      expect(confirmation.reservationGroups).to.deep.equal([
        {
          earlyBirdFailureDueToChase: false,
          earlyBirdSucceeded: false,
          earlyBirdTotalCostCents: null,
          pnr: '1ADULT'
        }
      ]);
    });

    it('should return null for all EB related fields when earlyBirdInPathRadioButton is not checked', () => {
      const confirmation = confirmationSelector(
        _.merge({}, state, {
          app: {
            airBooking: {
              flightConfirmationPage: {
                response: {
                  flightConfirmationPage: {
                    failedEarlyBird: null,
                    totals: {
                      adultFare: {
                        earlyBirdPriceDetails: null
                      }
                    }
                  }
                }
              }
            }
          }
        })
      );

      expect(confirmation.reservationGroups).to.deep.equal([
        {
          earlyBirdFailureDueToChase: null,
          earlyBirdSucceeded: null,
          earlyBirdTotalCostCents: null,
          pnr: '1ADULT'
        }
      ]);
    });

    it('should include `_analytics` data', () => {
      const confirmation = confirmationSelector(
        _.merge({}, state, {
          app: {
            airBooking: {
              flightConfirmationPage: {
                response: {
                  flightConfirmationPage: {
                    _analytics
                  }
                }
              }
            }
          }
        })
      );

      expect(confirmation).to.deep.equal({
        reservationGroups: [
          {
            earlyBirdFailureDueToChase: false,
            earlyBirdSucceeded: true,
            earlyBirdTotalCostCents: '35.00',
            pnr: '1ADULT'
          }
        ],
        ..._analytics
      });
    });

    it('should not include `_analytics` data if `_analytics` is not defined', () => {
      const confirmation = confirmationSelector(state);

      expect(confirmation).to.deep.equal({
        reservationGroups: [
          {
            earlyBirdFailureDueToChase: false,
            earlyBirdSucceeded: true,
            earlyBirdTotalCostCents: '35.00',
            pnr: '1ADULT'
          }
        ]
      });
    });
  });
});
