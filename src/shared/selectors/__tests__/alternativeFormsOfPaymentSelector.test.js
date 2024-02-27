jest.mock('src/sameDay/selectors/sameDayPriceSelectors', () => ({
  getSameDayFareSummary: jest.fn().mockReturnValue({ amountDue: { fare: { amount: 10, currencyCode: 'USD' } } })
}));
jest.mock('src/shared/helpers/alternativeFormsOfPaymentHelper', () => ({
  getAmountFromTotal: jest.fn().mockReturnValue(10),
  getMoneyTotalForAirBooking: jest.fn().mockReturnValue({ amount: 10, currencyCode: 'USD' }),
  getMoneyTotalForAirChange: jest.fn().mockReturnValue({ amount: 10, currencyCode: 'USD' })
}));
jest.mock('src/shared/selectors/upliftSelector', () => ({
  getUpliftPaymentMethodConfigParams: jest.fn()
}));
jest.mock('store2', () => ({ get: jest.fn() }));
jest.mock('src/shared/selectors/earlyBirdSelector', () => ({
  getPriceTotalWithEBForAirbooking: jest.fn(),
  getBalanceRemainingWithEBForAirbooking: jest.fn().mockReturnValue({ totals: { amout: 10, currencyCode: 'USD' } }),
  getBalanceRemainingWithEBForCompanion: jest.fn(),
  getPriceTotalWithEBForCompanion: jest.fn()
}));

import { getSameDayFareSummary } from 'src/sameDay/selectors/sameDayPriceSelectors';
import environment from 'src/shared/api/apiRoutes';
import {
  getMoneyTotalForAirBooking,
  getMoneyTotalForAirChange
} from 'src/shared/helpers/alternativeFormsOfPaymentHelper';
import {
  getAfpAvailability,
  getCeptorConfig,
  getConfirmationPageContent,
  getPaymentMethodAvailabilities
} from 'src/shared/selectors/alternativeFormsOfPaymentSelector';
import { APPLICATION_TYPES_UPLIFT, INITIAL_AVAILABILITY, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import sharedConstants from 'src/shared/constants/sharedConstants';
import {
  getPriceTotalWithEBForAirbooking,
  getBalanceRemainingWithEBForAirbooking,
  getBalanceRemainingWithEBForCompanion,
  getPriceTotalWithEBForCompanion
} from 'src/shared/selectors/earlyBirdSelector';
import { getUpliftPaymentMethodConfigParams } from 'src/shared/selectors/upliftSelector';
import store2 from 'store2';
import * as CeptorBuilder from 'test/builders/model/ceptorBuilder';

const { APP_FLOWS } = sharedConstants;

describe('alternativeFormsOfPaymentSelector', () => {
  const moneyTotal = { amount: 10, currencyCode: 'USD' };

  describe('getPaymentMethodAvailabilities', () => {
    it('should return any availabilities in state', () => {
      const state = {
        app: {
          applePay: {
            applePayAvailability: {
              paymentMethod: 'ApplePay',
              isAvailable: true,
              isActive: true,
              hasError: false,
              amount: 1000
            }
          },
          uplift: {
            upliftAvailability: {
              paymentMethod: 'PayMonthly',
              isAvailable: true,
              isActive: true,
              hasError: false,
              amount: 1000
            }
          }
        }
      };

      const result = getPaymentMethodAvailabilities(state);

      expect(result).toEqual([
        {
          paymentMethod: 'ApplePay',
          isAvailable: true,
          isActive: true,
          hasError: false,
          amount: 1000
        },
        {
          paymentMethod: 'PayMonthly',
          isAvailable: true,
          isActive: true,
          hasError: false,
          amount: 1000
        }
      ]);
    });
  });

  describe('getAfpAvailability', () => {
    it('should return afp availability when an afp is active', () => {
      const state = {
        app: {
          applePay: {
            applePayAvailability: {
              paymentMethod: 'ApplePay',
              isAvailable: true,
              isActive: true,
              hasError: false,
              amount: 1000
            }
          }
        }
      };

      const result = getAfpAvailability(state);

      expect(result).toEqual({
        paymentMethod: 'ApplePay',
        isAvailable: true,
        isActive: true,
        hasError: false,
        amount: 1000
      });
    });

    it('should return afp availability when an afp is available', () => {
      const state = {
        app: {
          applePay: {
            applePayAvailability: {
              paymentMethod: 'ApplePay',
              isAvailable: true,
              isActive: false,
              hasError: false,
              amount: 1000
            }
          }
        }
      };

      const result = getAfpAvailability(state);

      expect(result).toEqual({
        paymentMethod: 'ApplePay',
        isAvailable: true,
        isActive: false,
        hasError: false,
        amount: 1000
      });
    });

    it('should return initial availability when no afps are active or available', () => {
      const state = {
        app: {
          applePay: {
            applePayAvailability: {
              paymentMethod: 'ApplePay',
              isAvailable: false,
              isActive: false,
              hasError: false,
              amount: 1000
            }
          }
        }
      };

      const result = getAfpAvailability(state);

      expect(result).toEqual(INITIAL_AVAILABILITY);
    });
  });

  describe('getCeptorConfig', () => {
    const defaultApplicationType = 'fake-application';

    beforeEach(() => {
      environment.ceptorSite = 'fake-site';
      environment.ceptorEnv = 'fake-env';
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should add isWebView param for single payment method in ceptor config', () => {
      const applicationType = 'air/booking';
      const ceptorConfig = CeptorBuilder.getCeptorConfig();

      store2.get.mockReturnValueOnce('Android');

      const state = {
        app: {
          webView: { isWebView: true },
          wcmContent: { applicationProperties: { ceptorConfig } }
        }
      };

      const result = getCeptorConfig(applicationType, state)(state);

      ceptorConfig.requestedAFPParams.paymentMethodConfigParams[0].config.isWebView = true;
      ceptorConfig.requestedAFPParams.channel = 'android';
      ceptorConfig.requestedAFPParams.site = 'fake-site';
      ceptorConfig.requestedAFPParams.environment = 'fake-env';
      ceptorConfig.requestedAFPParams.application = APPLICATION_TYPES_UPLIFT[applicationType];
      ceptorConfig.requestedAFPParams.amount = 10;
      ceptorConfig.requestedAFPParams.currency = 'USD';

      expect(result).toEqual(ceptorConfig);
    });

    it('should return requestedAFPParams.application as air-change when applicationType is air/change', () => {
      const applicationType = 'air/change';
      const isWebView = true;
      const ceptorConfig = CeptorBuilder.getCeptorConfig();
      const state = {
        app: {
          webView: { isWebView },
          wcmContent: { applicationProperties: { ceptorConfig } }
        }
      };
      const result = getCeptorConfig(applicationType, state)(state);

      store2.get.mockReturnValueOnce('Android');
      ceptorConfig.requestedAFPParams.application = APPLICATION_TYPES_UPLIFT[applicationType];

      expect(result.requestedAFPParams.application).toEqual('air-change');
    });

    it('should add isWebView param for multiple payment method in ceptor config', () => {
      const isWebView = true;
      const ceptorConfig = CeptorBuilder.getCeptorConfigWithMultiplePaymentMethods();

      const state = {
        app: {
          webView: { isWebView },
          wcmContent: { applicationProperties: { ceptorConfig } }
        }
      };

      const result = getCeptorConfig(defaultApplicationType, state)(state);

      expect(result.requestedAFPParams.paymentMethodConfigParams[0].config.isWebView).toEqual(isWebView);
      expect(result.requestedAFPParams.paymentMethodConfigParams[1].config.isWebView).toEqual(isWebView);
    });

    it('should add isWebView as false when not present in state', () => {
      const ceptorConfig = CeptorBuilder.getCeptorConfig();

      const state = { app: { wcmContent: { applicationProperties: { ceptorConfig } } } };

      const result = getCeptorConfig(defaultApplicationType, state)(state);

      expect(result.requestedAFPParams.paymentMethodConfigParams[0].config.isWebView).toEqual(false);
    });

    it('should return empty payment methods for null ceptor config', () => {
      const isWebView = true;
      const ceptorConfig = null;

      const state = {
        app: {
          webView: { isWebView },
          wcmContent: { applicationProperties: { ceptorConfig } }
        }
      };

      const result = getCeptorConfig(defaultApplicationType, state)(state);

      expect(result.requestedAFPParams.paymentMethodConfigParams).toEqual([]);
    });

    describe('getMoneyTotalForApplication', () => {
      describe('and application is air-booking', () => {
        const applicationType = APP_FLOWS.AIR_BOOKING;

        it('should return ceptor config with amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();

          const state = {
            app: {
              webView: { isWebView },
              wcmContent: { applicationProperties: { ceptorConfig } },
              airBooking: {
                applyTravelFundsPage: {
                  response: {
                    fundsAppliedToken: true
                  }
                }
              }
            }
          };

          getBalanceRemainingWithEBForAirbooking.mockReturnValueOnce({ totals: { moneyTotal } });
          getPriceTotalWithEBForAirbooking.mockReturnValueOnce(false);

          const result = getCeptorConfig(applicationType, state)(state);

          expect(getBalanceRemainingWithEBForAirbooking).toHaveBeenCalled();
          expect(getPriceTotalWithEBForAirbooking).toHaveBeenCalled();
          expect(getMoneyTotalForAirBooking).toHaveBeenCalledWith(true, moneyTotal, false);
          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });
      });

      describe('and application is air-change', () => {
        const applicationType = APP_FLOWS.AIR_CHANGE;

        it('should return ceptor config with amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();
          const totalDueNow = 10;
          const newAmountDue = 10;
          const purchaseWithPoints = false;

          const state = {
            app: {
              webView: { isWebView },
              wcmContent: { applicationProperties: { ceptorConfig } },
              airChange: {
                changePricingPage: {
                  response: {
                    _meta: { purchaseWithPoints },
                    fareSummary: {
                      totalDueNow,
                      newAmountDue
                    }
                  }
                }
              }
            }
          };

          const result = getCeptorConfig(applicationType, state)(state);

          expect(getMoneyTotalForAirChange).toHaveBeenCalledWith(totalDueNow, newAmountDue, purchaseWithPoints);
          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });
      });
      describe('and application is air-change', () => {
        const applicationType = APP_FLOWS.AIR_UPGRADE;

        it('should return ceptor config with amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();

          const totalDueNow = 10;
          const newAmountDue = 10;
          const purchaseWithPoints = false;

          const state = {
            app: {
              webView: { isWebView },
              wcmContent: { applicationProperties: { ceptorConfig } },
              airChange: {
                changePricingPage: {
                  response: {
                    _meta: { purchaseWithPoints },
                    fareSummary: {
                      totalDueNow,
                      newAmountDue
                    }
                  }
                }
              }
            }
          };

          const result = getCeptorConfig(applicationType, state)(state);

          expect(getMoneyTotalForAirChange).toHaveBeenCalledWith(totalDueNow, newAmountDue, purchaseWithPoints);
          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });
      });
      describe('and application is companion', () => {
        const applicationType = APP_FLOWS.COMPANION;

        it('should return ceptor config with amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();

          const state = {
            app: {
              webView: { isWebView },
              wcmContent: { applicationProperties: { ceptorConfig } },
              companion: {
                applyTravelFundsPage: {
                  response: {
                    fundsAppliedToken: true
                  }
                }
              }
            }
          };

          getBalanceRemainingWithEBForCompanion.mockReturnValueOnce({ totals: { moneyTotal } });
          getPriceTotalWithEBForCompanion.mockReturnValueOnce(false);

          const result = getCeptorConfig(applicationType, state)(state);

          expect(getMoneyTotalForAirBooking).toHaveBeenCalledWith(true, moneyTotal, false);
          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });
      });
      describe('and application is earlybird', () => {
        const applicationType = APP_FLOWS.EARLYBIRD;

        it('should return ceptor config with amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();

          const state = {
            app: {
              webView: { isWebView },
              wcmContent: { applicationProperties: { ceptorConfig } },
              earlyBird: {
                reviewPage: {
                  moneyTotalFare: moneyTotal
                }
              }
            }
          };

          const result = getCeptorConfig(applicationType, state)(state);

          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });
      });

      describe('and application is same day', () => {
        const applicationType = APP_FLOWS.SAME_DAY;

        it('should return ceptor config with fare amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();
          const state = {
            app: {
              wcmContent: { applicationProperties: { ceptorConfig } },
              webView: { isWebView }
            }
          };

          const result = getCeptorConfig(applicationType, state)(state);

          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });        
        
        it('should return ceptor config with tax amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();
          const state = {
            app: {
              wcmContent: { applicationProperties: { ceptorConfig } },
              webView: { isWebView }
            }
          };

          getSameDayFareSummary.mockReturnValueOnce({ amountDue: { tax: { amount: 10, currencyCode: 'USD' } } });

          const result = getCeptorConfig(applicationType, state)(state);

          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });
      });

      describe('and application is upgraded boarding', () => {
        const applicationType = APP_FLOWS.UPGRADED_BOARDING;

        it('should return ceptor config with amount', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();

          const state = {
            app: {
              webView: { isWebView },
              wcmContent: { applicationProperties: { ceptorConfig } },
              upgradedBoarding: {
                upgradedBoardingPage: {
                  moneyTotal
                }
              }
            }
          };

          const result = getCeptorConfig(applicationType, state)(state);

          expect(result.requestedAFPParams.amount).toEqual(10);
          expect(result.requestedAFPParams.currency).toEqual(moneyTotal.currencyCode);
        });
      });

      describe('and application doesnt match cases', () => {
        it('should return 0', () => {
          const isWebView = true;
          const ceptorConfig = CeptorBuilder.getCeptorConfig();

          const state = {
            app: {
              webView: { isWebView },
              wcmContent: { applicationProperties: { ceptorConfig } }
            }
          };

          const result = getCeptorConfig(defaultApplicationType, state)(state);

          expect(result.requestedAFPParams.amount).toEqual(0);
        });
      });
    });

    describe('when PayMonthly is included', () => {
      const ceptorConfig = CeptorBuilder.getCeptorConfigWithPaymentMethodName(PAYMENT_METHODS.UPLIFT);

      describe('when UPLIFT_INSTALLMENT_PAYMENTS is turned on', () => {
        it('should include PayMonthly in ceptor config', () => {
          const state = {
            app: {
              toggles: { UPLIFT_INSTALLMENT_PAYMENTS: true },
              wcmContent: { applicationProperties: { ceptorConfig } }
            }
          };

          const result = getCeptorConfig(defaultApplicationType, state)(state);

          expect(result.requestedAFPParams.paymentMethodConfigParams[0].paymentMethod).toEqual(PAYMENT_METHODS.UPLIFT);
        });

        it('should call getUpliftConfig', () => {
          const state = {
            app: {
              toggles: { UPLIFT_INSTALLMENT_PAYMENTS: true },
              wcmContent: { applicationProperties: { ceptorConfig } }
            }
          };

          getCeptorConfig('air-booking', state)(state);
          expect(getUpliftPaymentMethodConfigParams).toHaveBeenCalled();
        });
      });
    });

    describe('when channel is not present in local storage', () => {
      it('should return channel as mweb', () => {
        const isWebView = true;
        const ceptorConfig = CeptorBuilder.getCeptorConfig();

        store2.get.mockReturnValueOnce(undefined);

        const state = {
          app: {
            webView: { isWebView },
            wcmContent: { applicationProperties: { ceptorConfig } }
          }
        };
        const result = getCeptorConfig(defaultApplicationType, state)(state);

        expect(result.requestedAFPParams.channel).toEqual('mweb');
      });
    });

    describe('when isWebView is false', () => {
      it('should return channel as mweb', () => {
        const isWebView = false;
        const ceptorConfig = CeptorBuilder.getCeptorConfig();

        const state = {
          app: {
            webView: { isWebView },
            wcmContent: { applicationProperties: { ceptorConfig } }
          }
        };
        const result = getCeptorConfig(defaultApplicationType, state)(state);

        expect(result.requestedAFPParams.channel).toEqual('mweb');
      });
    });

    describe('when isWebView is true channel is android', () => {
      it('should return channel as lowercase device type', () => {
        const isWebView = true;
        const ceptorConfig = CeptorBuilder.getCeptorConfig();

        store2.get.mockReturnValueOnce('Android');

        const state = {
          app: {
            webView: { isWebView },
            wcmContent: { applicationProperties: { ceptorConfig } }
          }
        };
        const result = getCeptorConfig(defaultApplicationType, state)(state);

        expect(result.requestedAFPParams.channel).toEqual('android');
      });
    });

    describe('when isWebView is true and channel is ios', () => {
      it('should return channel as lowercase device type', () => {
        const isWebView = true;
        const ceptorConfig = CeptorBuilder.getCeptorConfig();

        store2.get.mockReturnValueOnce('iOS');

        const state = {
          app: {
            webView: { isWebView },
            wcmContent: { applicationProperties: { ceptorConfig } }
          }
        };

        const result = getCeptorConfig(defaultApplicationType, state)(state);

        expect(result.requestedAFPParams.channel).toEqual('ios');
      });
    });
  });

  describe('getConfirmationPageContent', () => {
    let confirmationPageContent;
    let applePayCard;

    beforeEach(() => {
      confirmationPageContent = {
        billingInfo: {
          cardType: 'AMEX',
          cardHolderName: 'Test User',
          lastFourDigits: '9999',
          amountApplied: {
            amount: '401.78',
            currencyCode: 'USD',
            currencySymbol: ''
          },
          billingAddress: {
            streetOne: '441 Main St',
            streetTwo: '442 Main St',
            location: 'Brooklyn, NY US 57508'
          }
        },
        dates: {
          first: '2017-12-13',
          second: null
        },
        destinationDescription: 'Austin'
      };

      applePayCard = {
        token: {
          lastFourDigits: '1234',
          cardType: 'Visa'
        }
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should not update the confirmationPageContent if applePayCard is undefined', () => {
      applePayCard = undefined;

      const result = getConfirmationPageContent(jest.fn()).resultFunc(confirmationPageContent, applePayCard);

      expect(result).toEqual(confirmationPageContent);

      const hasAfpCardType = !!result.billingInfo?.afpCardType;

      expect(hasAfpCardType).toEqual(false);
    });

    it('should not update the confirmationPageContent if applePayCard token is undefined', () => {
      applePayCard = {
        formData: {}
      };

      const result = getConfirmationPageContent(jest.fn()).resultFunc(confirmationPageContent, applePayCard);

      expect(result).toEqual(confirmationPageContent);

      const hasAfpCardType = !!result.billingInfo?.afpCardType;

      expect(hasAfpCardType).toEqual(false);
    });

    it('should add afpCardType and update lastFourDigits if applePayCard is available', () => {
      confirmationPageContent.billingInfo = {
        ...confirmationPageContent.billingInfo,
        cardType: 'APPLE_PAY',
        lastFourDigits: null
      };

      const result = getConfirmationPageContent(jest.fn()).resultFunc(confirmationPageContent, applePayCard);

      const expectedResultWithApplePayCard = {
        ...confirmationPageContent,
        billingInfo: {
          ...confirmationPageContent.billingInfo,
          lastFourDigits: '1234',
          afpCardType: 'Visa'
        }
      };

      expect(result).toEqual(expectedResultWithApplePayCard);
    });
  });
});
