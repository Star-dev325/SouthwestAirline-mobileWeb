import _ from 'lodash';
import {
  shouldCheckPrequal,
  shouldShowChasePlacements,
  getAudienceWcmAppContext,
  getChaseWcmAppContext,
  getUserAlreadyHasChaseRRVisa
} from 'src/shared/selectors/chaseSelector';
import { CHASE_CREDIT_STATUS } from 'src/chase/constants/chaseConstants';

const { APPROVED } = CHASE_CREDIT_STATUS;

describe('chaseSelector', () => {
  const defaultState = {
    app: {
      toggles: { CHASE_PREQUAL: true, CHASE_PREQUAL_WITHOUT_LOGIN: false },
      account: {
        accountInfo: {
          customerInfo: { countryCode: 'US' },
          rapidRewardsDetails: { userAlreadyHasChaseRRVisa: false }
        },
        corporateInfo: {
          selectedCompany: null
        },
        isLoggedIn: true
      },
      airBooking: {
        flightPricingPage: {
          response: {
            flightPricingPage: {
              _meta: {
                internationalBooking: false
              }
            }
          }
        }
      },
      chase: {
        applicationInfo: {
          isApproved: true,
          isValidChaseSessionId: true,
          newCardHasSufficientFunds: true,
          chaseApplicationCompleted: false,
          chaseCreditStatus: APPROVED,
          customer: {
            accountNumber: '12345678',
            firstName: 'Michael',
            lastName: 'Scott'
          }
        }
      }
    }
  };

  context('shouldCheckPrequal', () => {
    it('should return false when user has completed chase application', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.chase.applicationInfo.chaseApplicationCompleted', true);

      const result = shouldCheckPrequal(state);

      expect(result).to.equal(false);
    });

    context('when isLoggedIn is true', () => {
      context('when CHASE_PREQUAL is true', () => {
        context('when CHASE_PREQUAL_WITHOUT_LOGIN is true', () => {
          it('should return true', () => {
            const state = _.cloneDeep(defaultState);

            _.set(state, 'app.toggles.CHASE_PREQUAL_WITHOUT_LOGIN', true);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(true);
          });
        });

        context('when CHASE_PREQUAL_WITHOUT_LOGIN is false', () => {
          it('should return true', () => {
            const state = _.cloneDeep(defaultState);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(true);
          });
        });
      });

      context('when CHASE_PREQUAL is false', () => {
        context('when CHASE_PREQUAL_WITHOUT_LOGIN is true', () => {
          it('should return false', () => {
            const state = _.cloneDeep(defaultState);

            _.set(state, 'app.toggles.CHASE_PREQUAL', false);
            _.set(state, 'app.toggles.CHASE_PREQUAL_WITHOUT_LOGIN', true);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(false);
          });
        });

        context('when CHASE_PREQUAL_WITHOUT_LOGIN is false', () => {
          it('should return false', () => {
            const state = _.cloneDeep(defaultState);

            _.set(state, 'app.toggles.CHASE_PREQUAL', false);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(false);
          });
        });
      });
    });

    context('when isLoggedIn is false', () => {
      context('when CHASE_PREQUAL is true', () => {
        context('when CHASE_PREQUAL_WITHOUT_LOGIN is true', () => {
          it('should return true', () => {
            const state = _.cloneDeep(defaultState);

            _.set(state, 'app.account.isLoggedIn', false);
            _.set(state, 'app.toggles.CHASE_PREQUAL_WITHOUT_LOGIN', true);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(true);
          });
        });

        context('when CHASE_PREQUAL_WITHOUT_LOGIN is false', () => {
          it('should return false', () => {
            const state = _.cloneDeep(defaultState);

            _.set(state, 'app.account.isLoggedIn', false);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(false);
          });
        });
      });

      context('when CHASE_PREQUAL is false', () => {
        context('when CHASE_PREQUAL_WITHOUT_LOGIN is true', () => {
          it('should return true', () => {
            const state = _.cloneDeep(defaultState);

            _.set(state, 'app.account.isLoggedIn', false);
            _.set(state, 'app.toggles.CHASE_PREQUAL', false);
            _.set(state, 'app.toggles.CHASE_PREQUAL_WITHOUT_LOGIN', true);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(true);
          });
        });

        context('when CHASE_PREQUAL_WITHOUT_LOGIN is false', () => {
          it('should return false', () => {
            const state = _.cloneDeep(defaultState);

            _.set(state, 'app.account.isLoggedIn', false);
            _.set(state, 'app.toggles.CHASE_PREQUAL', false);

            const result = shouldCheckPrequal(state);

            expect(result).to.equal(false);
          });
        });
      });
    });
  });

  context('shouldShowChasePlacements', () => {
    it('should return true when should show chase placements', () => {
      const result = shouldShowChasePlacements(defaultState);

      expect(result).to.equal(true);
    });

    it('should return false when user has completed chase application', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.chase.applicationInfo.chaseApplicationCompleted', true);

      const result = shouldShowChasePlacements(state);

      expect(result).to.equal(false);
    });
  });

  context('getUserAlreadyHasChaseRRVisa', () => {
    it('should return true when present in state', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa', true);

      const result = getUserAlreadyHasChaseRRVisa(state);

      expect(result).to.be.true;
    });

    it('should return false when undefined in state', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa', undefined);

      const result = getUserAlreadyHasChaseRRVisa(state);

      expect(result).to.be.false;
    });
  });

  context('getChaseWcmAppContext', () => {
    it('should return default chase wcm appContext', () => {
      expect(getChaseWcmAppContext(defaultState)).to.equal('aud-acq_eb-false_intl-false');
    });

    it('should return audience acquisition earlybird false and international true', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.account.accountInfo.customerInfo.countryCode', 'international');

      expect(getChaseWcmAppContext(state)).to.equal('aud-acq_eb-false_intl-true');
    });

    it('should return audience acquisition earlybird true and international false', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.airBooking.earlyBirdSelected', true);

      expect(getChaseWcmAppContext(state)).to.equal('aud-acq_eb-true_intl-false');
    });

    it('should return audience acquisition earlybird true and international true', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.airBooking.earlyBirdSelected', true);
      _.set(state, 'app.account.accountInfo.customerInfo.countryCode', 'international');

      expect(getChaseWcmAppContext(state)).to.equal('aud-acq_eb-true_intl-true');
    });

    it('should return audience ecm earlybird false and international false', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa', true);

      expect(getChaseWcmAppContext(state)).to.equal('aud-ecm_eb-false_intl-false');
    });

    it('should return audience ecm earlybird false and international true', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa', true);
      _.set(state, 'app.account.accountInfo.customerInfo.countryCode', 'international');

      expect(getChaseWcmAppContext(state)).to.equal('aud-ecm_eb-false_intl-true');
    });

    it('should return audience ecm earlybird true and international true', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa', true);
      _.set(state, 'app.airBooking.earlyBirdSelected', true);
      _.set(state, 'app.account.accountInfo.customerInfo.countryCode', 'international');

      expect(getChaseWcmAppContext(state)).to.equal('aud-ecm_eb-true_intl-true');
    });

    it('should return cold state audience ecm earlybird true and international true', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.chase.isChaseExistingCardMember', true);
      _.set(state, 'app.airBooking.earlyBirdSelected', true);
      _.set(state, 'app.account.accountInfo.customerInfo.countryCode', 'international');

      expect(getChaseWcmAppContext(state)).to.equal('aud-ecm_eb-true_intl-true');
    });
  });

  context('getAudienceWcmAppContext', () => {
    it('should return default chase wcm appContext', () => {
      expect(getAudienceWcmAppContext(defaultState)).to.equal('aud-acq');
    });

    it('should return audience ecm if user has chase RR visa', () => {
      const state = _.cloneDeep(defaultState);

      _.set(state, 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa', true);

      expect(getAudienceWcmAppContext(state)).to.equal('aud-ecm');
    });
  });
});
