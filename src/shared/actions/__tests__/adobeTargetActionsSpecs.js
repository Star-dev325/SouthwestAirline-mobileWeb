import _ from 'lodash';
import * as i18n from '@swa-ui/locale';

import sinonModule from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import * as AdobeTargetApi from 'src/shared/api/adobeTargetApi';
import * as ChaseActions from 'src/chase/actions/chaseActions';
import * as AccountActions from 'src/shared/actions/accountActions';
import * as AdobeHelper from 'src/shared/helpers/adobeHelper';
import * as AdobeTargetTestActionMapping from 'src/shared/constants/adobeTargetTestActionMapping';
import EarlyBirdInPathPricesBuilder from 'test/builders/apiResponse/earlyBirdInPathPricesBuilder';
import waitFor from 'test/unit/helpers/waitFor';
import * as BootstrapHelper from 'src/app/helpers/bootstrapHelper';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';

const { PRICING_CHASE_MBOX_ID, PRICE_PROMO_MIDDLE1_MBOX_ID } = AdobeTargetConstants;
const sinon = sinonModule.sandbox.create();

describe('AdobeTargetActions', () => {
  let store;

  beforeEach(() => {
    store = createMockStore()({});
  });

  afterEach(() => {
    sinon.restore();
  });

  context('getTargetParams', () => {
    const params = { key: 'value' };

    let getChasePrequalOffersStub;
    let getUserInfoStub;
    let toAdobeParamsStub;

    beforeEach(() => {
      getChasePrequalOffersStub = sinon.stub(ChaseActions, 'getChasePrequalOffers').returns(() => Promise.resolve());
      getUserInfoStub = sinon.stub(AccountActions, 'getUserInfo').returns(() => Promise.resolve());
      toAdobeParamsStub = sinon.stub(AdobeHelper, 'toAdobeParams').returns(params);
    });

    it('should call getTargetParamsFromAppSettings when ENABLE_TARGET_CONFIG is true', () => {
      store = createMockStore()({ app: { toggles: { ENABLE_TARGET_CONFIG: true } } });

      return store.dispatch(AdobeTargetActions.getTargetParams({}, 'Price_Page')).then(() => {
        expect(getChasePrequalOffersStub).to.not.have.been.called;
        expect(getUserInfoStub).to.not.have.been.called;
        expect(toAdobeParamsStub).to.not.have.been.called;
      });
    });

    it('should return empty params when getUserInfo throws unhandled exception', () => {
      getUserInfoStub.returns(() => Promise.reject());

      return store.dispatch(AdobeTargetActions.getTargetParams()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.calledWith;
        expect(toAdobeParamsStub).to.not.have.been.called;
        expect(result).to.deep.equal({});
      });
    });

    it('should return empty params when getChasePrequalOffers throws unhandled exception', () => {
      getChasePrequalOffersStub.returns(() => Promise.reject());

      return store.dispatch(AdobeTargetActions.getTargetParams()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
        expect(toAdobeParamsStub).to.not.have.been.called;
        expect(result).to.deep.equal({});
      });
    });

    it('should return empty params when toAdobeParams throws unhandled exception', () => {
      toAdobeParamsStub.returns(Promise.reject());

      return store.dispatch(AdobeTargetActions.getTargetParams()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
        expect(toAdobeParamsStub).to.have.been.called;
        expect(result).to.deep.equal({});
      });
    });

    it('should return valid params on success', () =>
      store.dispatch(AdobeTargetActions.getTargetParams()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
        expect(toAdobeParamsStub).to.have.been.called;

        expect(result).to.deep.equal(params);
      }));

    it('should return valid params for early bird', () => {
      const store = createMockStore()({
        app: {
          airBooking: {
            earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility,
            earlyBirdSelected: true
          }
        }
      });

      return store.dispatch(AdobeTargetActions.getTargetParams()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
        expect(toAdobeParamsStub).to.have.been.calledWith(
          undefined,
          undefined,
          { earlyBirdEligible: true, earlyBirdSelected: true },
          false
        );

        expect(result).to.deep.equal(params);
      });
    });

    it('should return valid params for chaseVisaRrEnrolled', () => {
      const store = createMockStore()({
        app: {
          airBooking: {
            earlyBirdEligibility: new EarlyBirdInPathPricesBuilder().build().earlyBirdEligibility,
            earlyBirdSelected: true
          },
          account: {
            accountInfo: {
              rapidRewardsDetails: {
                userAlreadyHasChaseRRVisa: true
              }
            }
          }
        }
      });

      return store.dispatch(AdobeTargetActions.getTargetParams()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
        expect(toAdobeParamsStub).to.have.been.calledWith(
          undefined,
          undefined,
          { earlyBirdEligible: true, earlyBirdSelected: true },
          true
        );

        expect(result).to.deep.equal(params);
      });
    });

    it('should not call user info if its not necessary to call', (done) => {
      store.dispatch(
        AdobeTargetActions.getTargetParams({
          userInfoRequired: false
        })
      );

      waitFor.untilAssertPass(() => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.not.have.been.called;
      }, done);
    });

    it('should not call user info if ENABLE_TARGET_CONFIG is ON', (done) => {
      store = createMockStore()({ app: { toggles: { ENABLE_TARGET_CONFIG: true } } });
      store.dispatch(
        AdobeTargetActions.getTargetParams(
          {
            userInfoRequired: true
          },
          'Price_Page'
        )
      );

      waitFor.untilAssertPass(() => {
        expect(getChasePrequalOffersStub).to.not.have.been.called;
        expect(getUserInfoStub).to.not.have.been.called;
      }, done);
    });
  });

  context('getMboxConfig', () => {
    let params;
    let defaultMboxes;
    let pageId;

    beforeEach(() => {
      params = {};
      defaultMboxes = [];
      pageId = 'PAGE_ID';
    });

    it('should call fetchBootstrapData', () => {
      sinon.stub(BootstrapHelper, 'fetchBootstrapData');
      store.dispatch(AdobeTargetActions.getMboxConfig(pageId, params, defaultMboxes));

      expect(BootstrapHelper.fetchBootstrapData).to.have.been.calledWith(BootstrapConstants.APP_SETTINGS);
    });

    it('should return empty array if no default mbox provided', () => {
      expect(store.dispatch(AdobeTargetActions.getMboxConfig(pageId, params, defaultMboxes))).to.be.deep.equal([]);
    });

    it('should return default mboxes values if ENABLE_TARGET_CONFIG toggle is OFF', () => {
      const expectedMboxConfig = [
        { mbox: PRICING_CHASE_MBOX_ID, params },
        { mbox: PRICE_PROMO_MIDDLE1_MBOX_ID, params }
      ];

      defaultMboxes = [PRICING_CHASE_MBOX_ID, PRICE_PROMO_MIDDLE1_MBOX_ID];
      expect(store.dispatch(AdobeTargetActions.getMboxConfig(pageId, params, defaultMboxes))).to.be.deep.equal(
        expectedMboxConfig
      );
    });

    it('should return mboxes config values from app settings', () => {
      const store = createMockStore()({
        app: {
          toggles: {
            ENABLE_TARGET_CONFIG: true
          }
        }
      });
      const expectedMboxConfig = [{ mbox: 'mock_mbox_Id', params: {} }];

      sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns({ 'PAGE_ID.mboxes': ['mock_mbox_Id'] });

      expect(store.dispatch(AdobeTargetActions.getMboxConfig(pageId, params, defaultMboxes))).to.be.deep.equal(
        expectedMboxConfig
      );
    });
  });

  context('getTargetParamsFromAppSettings', () => {
    let getChasePrequalOffersStub;
    let getUserInfoStub;
    let fetchBootstrapDataStub;

    const bootstrapData = {
      default: {
        mboxSettings: {
          mboxParameters: {
            earlyBirdEligible: 'earlyBirdEligible',
            chaseVisaRrEnrolled: 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa',
            companionRemainingPoints:
              'app.account.userInfo.customers.UserInformation.companionPassInfo.companionRemainingPoints',
            redeemablePoints: 'app.account.userInfo.customers.UserInformation.redeemablePoints',
            offerIdentifier: 'analytics.ChaseAnalytics.offers.offerIdentifier',
            accountNumber: 'app.account.accountNumber',
            acquisitionSourceCodes: 'analytics.ChaseAnalytics.offers.acquisitionSourceCodes',
            highValueIndicator: 'analytics.ChaseAnalytics.offers.highValueIndicator',
            earlyBirdSelected: 'app.airBooking.earlyBirdSelected',
            responsivesize: 'responsivesize'
          }
        }
      }
    };

    beforeEach(() => {
      fetchBootstrapDataStub = sinon.stub(BootstrapHelper, 'fetchBootstrapData');
      getChasePrequalOffersStub = sinon.stub(ChaseActions, 'getChasePrequalOffers').returns(() => Promise.resolve());
      getUserInfoStub = sinon.stub(AccountActions, 'getUserInfo').returns(() => Promise.resolve());
    });

    it('should call getChasePrequalOffers and not call getUserInfo', () => {
      const bootstrapData = {
        default: {
          mboxSettings: {
            mboxParameters: {
              earlyBirdEligible: 'earlyBirdEligible',
              chaseVisaRrEnrolled: 'app.account.accountInfo.rapidRewardsDetails.userAlreadyHasChaseRRVisa',
              offerIdentifier: 'analytics.ChaseAnalytics.offers.offerIdentifier',
              accountNumber: 'app.account.accountNumber',
              acquisitionSourceCodes: 'analytics.ChaseAnalytics.offers.acquisitionSourceCodes',
              highValueIndicator: 'analytics.ChaseAnalytics.offers.highValueIndicator',
              earlyBirdSelected: 'app.airBooking.earlyBirdSelected'
            }
          }
        }
      };

      fetchBootstrapDataStub.returns(bootstrapData);

      return store.dispatch(AdobeTargetActions.getTargetParamsFromAppSettings('Price_Page')).then(() => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.not.have.been.called;
      });
    });

    it('should call getUserInfo and not call getChasePrequalOffers', () => {
      const bootstrapData = {
        default: {
          mboxSettings: {
            mboxParameters: {
              companionRemainingPoints: 'companionRemainingPoints'
            }
          }
        }
      };

      fetchBootstrapDataStub.returns(bootstrapData);

      return store.dispatch(AdobeTargetActions.getTargetParamsFromAppSettings('Price_Page')).then(() => {
        expect(getChasePrequalOffersStub).to.not.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
      });
    });

    it('should return existing values from state when getChasePrequalOffers from getTargetParamsFromAppSettings throws unhandled exception', () => {
      const store = createMockStore()({
        analytics: {
          ChaseAnalytics: {
            offers: {
              acquisitionSourceCodes: '123,213',
              offerIdentifier: true,
              highValueIndicator: false
            }
          }
        },
        app: {
          airBooking: {
            earlyBirdSelected: false
          },
          account: {
            accountNumber: 1331183,
            userInfo: {
              customers: {
                UserInformation: {
                  redeemablePoints: 31313,
                  companionPassInfo: {
                    companionRemainingPoints: 13231
                  }
                }
              }
            },
            accountInfo: {
              rapidRewardsDetails: {
                userAlreadyHasChaseRRVisa: true
              }
            }
          }
        }
      });

      fetchBootstrapDataStub.returns(bootstrapData);
      getChasePrequalOffersStub.returns(() => Promise.reject());

      const mboxParams = {
        earlyBirdEligible: false,
        chaseVisaRrEnrolled: true,
        companionRemainingPoints: 13231,
        redeemablePoints: 31313,
        offerIdentifier: true,
        accountNumber: 1331183,
        acquisitionSourceCodes: '123,213',
        highValueIndicator: false,
        earlyBirdSelected: false,
        responsivesize: 'na'
      };

      return store.dispatch(AdobeTargetActions.getTargetParamsFromAppSettings()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
        expect(result).to.deep.equal(mboxParams);
      });
    });

    it('should return empty user info values when getUserInfo from getTargetParamsFromAppSettings throws unhandled exception', () => {
      const store = createMockStore()({
        analytics: {
          ChaseAnalytics: {
            offers: {
              acquisitionSourceCodes: '',
              offerIdentifier: '',
              highValueIndicator: ''
            }
          }
        },
        app: {
          airBooking: {
            earlyBirdSelected: false
          },
          account: {
            accountNumber: 1331183,
            userInfo: {
              customers: {
                UserInformation: {
                  redeemablePoints: undefined,
                  companionPassInfo: {
                    companionRemainingPoints: undefined
                  }
                }
              }
            },
            accountInfo: {
              rapidRewardsDetails: {
                userAlreadyHasChaseRRVisa: true
              }
            }
          }
        }
      });

      fetchBootstrapDataStub.returns(bootstrapData);
      getUserInfoStub.returns(() => Promise.reject());

      const mboxParams = {
        earlyBirdEligible: false,
        chaseVisaRrEnrolled: true,
        companionRemainingPoints: undefined,
        redeemablePoints: undefined,
        offerIdentifier: '',
        accountNumber: 1331183,
        acquisitionSourceCodes: '',
        highValueIndicator: '',
        earlyBirdSelected: false,
        responsivesize: 'na'
      };

      return store.dispatch(AdobeTargetActions.getTargetParamsFromAppSettings()).then((result) => {
        expect(getChasePrequalOffersStub).to.have.been.called;
        expect(getUserInfoStub).to.have.been.called;
        expect(result).to.deep.equal(mboxParams);
      });
    });
  });

  context('getSegments', () => {
    let getOffersStub;

    let updateMBoxTotalCallCountStub;
    let updateMBoxFailedCallCountStub;
    let updateMBoxTargetTimeoutArtifactStub;
    let parseMboxStub;
    let setIsUpliftVisibleStub;
    let setI18nReplacementKeysStub;
    let setIsPricePageChaseAdAboveTotalStub;

    beforeEach(() => {
      getOffersStub = sinon.stub(AdobeTargetApi, 'getOffers');

      updateMBoxTotalCallCountStub = sinon.stub(AnalyticsActions, 'updateMBoxTotalCallCount');
      updateMBoxFailedCallCountStub = sinon.stub(AnalyticsActions, 'updateMBoxFailedCallCount');
      updateMBoxTargetTimeoutArtifactStub = sinon.stub(AnalyticsActions, 'updateMBoxTargetTimeoutArtifact');
      parseMboxStub = sinon.stub(AdobeHelper, 'parseMbox');
      setIsUpliftVisibleStub = sinon.stub().returns({ type: 'action' });
      setIsPricePageChaseAdAboveTotalStub = sinon.stub().returns({ type: 'action' });
      sinon.stub(AdobeTargetTestActionMapping, 'adobeTargetTestActionMapping').returns({
        mWebAirPurchasePaymentMethodUpliftDisplay: setIsUpliftVisibleStub,
        mWebPriceFullChaseAdPosition: setIsPricePageChaseAdAboveTotalStub
      });
      setI18nReplacementKeysStub = sinon.stub(i18n, 'setI18nReplacementKeys');
    });

    context('when getOffers succeeds', () => {
      it('should return the segments merged with default when response has no content', () => {
        const bootstrapData = {
          default: {
            mboxSettings: {
              mboxDefaults: { test: { mWebAirPurchasePaymentMethodUpliftDisplay: true } }
            }
          }
        };

        sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns(bootstrapData);
        const chaseCodes = {
          offerIdentifier: 'offerIdentifier',
          acquisitionSourceCodes: 'acquisitionSourceCodes'
        };
        const i18nReplacementKeys = { TEST_I18N_KEY: 'TEST_I18N_KEY_REPLACEMENT' };
        const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2', chaseCodes }, { mbox: 'mbox3' }, { mbox: 'mbox4' }];
        const segment1 = 'segment1';
        const segment2 = 'segment2';
        const content1 = {
          target: {
            segment: [segment1]
          }
        };
        const content2 = {
          target: {
            segment: [segment2]
          }
        };

        const targetedI18n = {
          test_i18n: i18nReplacementKeys
        };

        const response = {
          execute: {
            mboxes: [
              { index: 0, name: 'mbox1', options: [{ content: content1 }] },
              { index: 1, name: 'mbox2', options: [{ content: content2 }] },
              { index: 2, name: 'mbox3', options: [] },
              { index: 3, name: 'mbox4', options: [{ content: targetedI18n }] }
            ]
          }
        };

        updateMBoxTotalCallCountStub.returns(_.noop);
        getOffersStub.returns(Promise.resolve(response));
        parseMboxStub.onCall(0).returns(content1);
        parseMboxStub.onCall(1).returns(content2);
        parseMboxStub.onCall(2).returns(targetedI18n);

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(updateMBoxTotalCallCountStub).to.have.been.calledWith(1);
          expect(getOffersStub).to.have.been.calledWith(mboxes);
          expect(updateMBoxFailedCallCountStub).to.not.have.been.called;
          expect(updateMBoxTargetTimeoutArtifactStub).to.not.have.been.called;
          expect(parseMboxStub).to.be.called.exactly(4);
          expect(setIsUpliftVisibleStub).to.have.been.calledWith(true);
          expect(setI18nReplacementKeysStub).to.have.been.calledWith(i18nReplacementKeys);

          expect(result).to.deep.equal([segment1, segment2]);
        });
      });

      it('should return the segments merged with default when response has content', () => {
        const bootstrapData = {
          default: {
            mboxSettings: {
              mboxDefaults: { test: { mWebAirPurchasePaymentMethodUpliftDisplay: true } }
            }
          }
        };

        sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns(bootstrapData);
        const chaseCodes = {
          offerIdentifier: 'offerIdentifier',
          acquisitionSourceCodes: 'acquisitionSourceCodes'
        };
        const i18nReplacementKeys = { TEST_I18N_KEY: 'TEST_I18N_KEY_REPLACEMENT' };
        const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2', chaseCodes }, { mbox: 'mbox3' }, { mbox: 'mbox4' }];
        const segment1 = 'segment1';
        const segment2 = 'segment2';
        const content1 = {
          target: {
            segment: [segment1]
          }
        };
        const content2 = {
          target: {
            segment: [segment2]
          }
        };

        const upliftContent = {
          test: {
            mWebAirPurchasePaymentMethodUpliftDisplay: true
          }
        };

        const targetedI18n = {
          test_i18n: i18nReplacementKeys
        };

        const response = {
          execute: {
            mboxes: [
              { index: 0, name: 'mbox1', options: [{ content: content1 }] },
              { index: 1, name: 'mbox2', options: [{ content: content2 }] },
              { index: 2, name: 'mbox3', options: [{ content: upliftContent }] },
              { index: 3, name: 'mbox4', options: [{ content: targetedI18n }] }
            ]
          }
        };

        updateMBoxTotalCallCountStub.returns(_.noop);
        getOffersStub.returns(Promise.resolve(response));
        parseMboxStub.onCall(0).returns(content1);
        parseMboxStub.onCall(1).returns(content2);
        parseMboxStub.onCall(2).returns(upliftContent);
        parseMboxStub.onCall(3).returns(targetedI18n);

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(updateMBoxTotalCallCountStub).to.have.been.calledWith(1);
          expect(getOffersStub).to.have.been.calledWith(mboxes);
          expect(updateMBoxFailedCallCountStub).to.not.have.been.called;
          expect(updateMBoxTargetTimeoutArtifactStub).to.not.have.been.called;
          expect(parseMboxStub).to.be.called.exactly(4);
          expect(setIsUpliftVisibleStub).to.have.been.calledWith(true);
          expect(setI18nReplacementKeysStub).to.have.been.calledWith(i18nReplacementKeys);

          expect(result).to.deep.equal([segment1, segment2]);
        });
      });

      it('should return the first segment when response has content', () => {
        const chaseCodes = {
          offerIdentifier: 'offerIdentifier',
          acquisitionSourceCodes: 'acquisitionSourceCodes'
        };
        const i18nReplacementKeys = { TEST_I18N_KEY: 'TEST_I18N_KEY_REPLACEMENT' };
        const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2', chaseCodes }, { mbox: 'mbox3' }, { mbox: 'mbox4' }];
        const segment1 = 'segment1';
        const segment2 = 'segment2';
        const content1 = {
          target: {
            segment: [segment1]
          }
        };
        const content2 = {
          target: {
            segment: [segment2]
          }
        };

        const upliftContent = {
          test: {
            mWebAirPurchasePaymentMethodUpliftDisplay: 'true'
          }
        };

        const targetedI18n = {
          test_i18n: i18nReplacementKeys
        };

        const response = {
          execute: {
            mboxes: [
              { index: 0, name: 'mbox1', options: [{ content: content1 }] },
              { index: 1, name: 'mbox2', options: [{ content: content2 }] },
              { index: 2, name: 'mbox3', options: [{ content: upliftContent }] },
              { index: 3, name: 'mbox4', options: [{ content: targetedI18n }] }
            ]
          }
        };

        updateMBoxTotalCallCountStub.returns(_.noop);
        getOffersStub.returns(Promise.resolve(response));
        parseMboxStub.onCall(0).returns(content1);
        parseMboxStub.onCall(1).returns(content2);
        parseMboxStub.onCall(2).returns(upliftContent);
        parseMboxStub.onCall(3).returns(targetedI18n);

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(updateMBoxTotalCallCountStub).to.have.been.calledWith(1);
          expect(getOffersStub).to.have.been.calledWith(mboxes);
          expect(updateMBoxFailedCallCountStub).to.not.have.been.called;
          expect(updateMBoxTargetTimeoutArtifactStub).to.not.have.been.called;
          expect(parseMboxStub).to.be.called.exactly(4);
          expect(setIsUpliftVisibleStub).to.have.been.calledWith('true');
          expect(setI18nReplacementKeysStub).to.have.been.calledWith(i18nReplacementKeys);

          expect(result).to.deep.equal([segment1, segment2]);
        });
      });

      it('should return undefined whenever response does not have content', () => {
        const chaseCodes = {
          offerIdentifier: 'offerIdentifier',
          acquisitionSourceCodes: 'acquisitionSourceCodes'
        };
        const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2', chaseCodes }];

        updateMBoxTotalCallCountStub.returns(_.noop);
        getOffersStub.returns(Promise.resolve('response'));

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(updateMBoxTotalCallCountStub).to.have.been.calledWith(1);
          expect(getOffersStub).to.have.been.calledWith(mboxes);
          expect(updateMBoxFailedCallCountStub).to.not.have.been.called;
          expect(updateMBoxTargetTimeoutArtifactStub).to.not.have.been.called;

          expect(result).to.deep.equal([]);
        });
      });

      it('should set the combined AB test values from default app-settings and delivery call response', () => {
        const bootstrapData = {
          default: {
            mboxSettings: {
              mboxDefaults: {
                test: {
                  mWebAirPurchasePaymentMethodUpliftDisplay: 'false',
                  mWebPriceFullChaseAdPosition: 'bottom'
                }
              }
            }
          }
        };
        const content1 = {
          target: { segment: ['segment1'] },
          test: { mWebPriceFullChaseAdPosition: 'top' }
        };
        const content2 = {
          target: { segment: ['segment2'] },
          test: { mWebAirPurchasePaymentMethodUpliftDisplay: 'true' }
        };
        const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2' }, { mbox: 'mbox3' }];
        const response = {
          execute: {
            mboxes: [
              { index: 0, name: 'swa_mweb_airBookingPriceFullChaseAd', options: [{ content: content1 }] },
              { index: 1, name: 'mWebAirPricePromoMiddle01', options: [{ content: content2 }] },
              { index: 2, name: 'mbox3' }
            ]
          }
        };

        sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns(bootstrapData);

        updateMBoxTotalCallCountStub.returns(_.noop);
        getOffersStub.returns(Promise.resolve(response));
        parseMboxStub.onCall(0).returns(content1);
        parseMboxStub.onCall(1).returns(content2);

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(parseMboxStub).to.be.called.exactly(2);
          expect(setIsPricePageChaseAdAboveTotalStub.firstCall).to.have.been.calledWith('top');
          expect(setIsUpliftVisibleStub.firstCall).to.have.been.calledWith('false');
          expect(setIsPricePageChaseAdAboveTotalStub.secondCall).to.have.been.calledWith('top');
          expect(setIsUpliftVisibleStub.secondCall).to.have.been.calledWith('true');
          expect(setIsPricePageChaseAdAboveTotalStub.thirdCall).to.have.been.calledWith('top');
          expect(setIsUpliftVisibleStub.thirdCall).to.have.been.calledWith('true');
          expect(result).to.deep.equal(['segment1', 'segment2']);
        });
      });

      it('should set test values from chapi when no default bootsrtap data', () => {
        const bootstrapData = null;
        const content1 = {
          target: { segment: ['segment1'] },
          test: { mWebPriceFullChaseAdPosition: 'top' }
        };

        const mboxes = [{ mbox: 'mbox1' }];
        const response = {
          execute: {
            mboxes: [{ index: 0, name: 'swa_mweb_airBookingPriceFullChaseAd', options: [{ content: content1 }] }]
          }
        };

        sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns(bootstrapData);

        updateMBoxTotalCallCountStub.returns(_.noop);
        getOffersStub.returns(Promise.resolve(response));
        parseMboxStub.onCall(0).returns(content1);

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then(() => {
          expect(parseMboxStub).to.be.called.exactly(1);
          expect(setIsPricePageChaseAdAboveTotalStub.firstCall).to.have.been.calledWith('top');
        });
      });

      it('should not call offers on empty mboxes', () => {
        const mboxes = [];

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(getOffersStub).to.not.have.been.called;
          expect(result).to.deep.equal([]);
        });
      });

      it('should not call offers on no mboxes', () => {
        const mboxes = undefined;

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(getOffersStub).to.not.have.been.called;
          expect(result).to.deep.equal([]);
        });
      });

      it('should not call offers when mboxes are null', () => {
        const mboxes = null;

        return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
          expect(getOffersStub).to.not.have.been.called;
          expect(result).to.deep.equal([]);
        });
      });

      context('when getOffers fails', () => {
        it('should return undefined', () => {
          const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2' }];
          const status = 'status';
          const error = 'error';

          updateMBoxTotalCallCountStub.returns(_.noop);
          updateMBoxFailedCallCountStub.returns(_.noop);
          getOffersStub.returns(Promise.reject({ status, error }));

          return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
            expect(updateMBoxTotalCallCountStub).to.have.been.calledWith(1);
            expect(getOffersStub).to.have.been.calledWith(mboxes);
            expect(updateMBoxFailedCallCountStub).to.have.been.calledWith(1);
            expect(updateMBoxTargetTimeoutArtifactStub).to.not.have.been.called;

            expect(result).to.deep.equal([]);
          });
        });

        it('should handle error when status is timeout', () => {
          const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2' }];
          const status = 'timeout';
          const error = 'error';

          updateMBoxTotalCallCountStub.returns(_.noop);
          updateMBoxFailedCallCountStub.returns(_.noop);
          updateMBoxTargetTimeoutArtifactStub.returns(_.noop);
          getOffersStub.returns(Promise.reject({ status, error }));

          return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
            expect(updateMBoxTotalCallCountStub).to.have.been.calledWith(1);
            expect(getOffersStub).to.have.been.calledWith(mboxes);
            expect(updateMBoxFailedCallCountStub).to.have.been.calledWith(1);
            expect(updateMBoxTargetTimeoutArtifactStub).to.have.been.calledWith('Target_TimeOut');

            expect(result).to.deep.equal([]);
          });
        });

        it('should handle error when error message contains timed out', () => {
          const mboxes = [{ mbox: 'mbox1' }, { mbox: 'mbox2' }];
          const status = 'status';
          const error = new Error('contains timed out');

          updateMBoxTotalCallCountStub.returns(_.noop);
          updateMBoxFailedCallCountStub.returns(_.noop);
          updateMBoxTargetTimeoutArtifactStub.returns(_.noop);
          getOffersStub.returns(Promise.reject({ status, error }));

          return store.dispatch(AdobeTargetActions.getSegments(mboxes)).then((result) => {
            expect(updateMBoxTotalCallCountStub).to.have.been.calledWith(1);
            expect(getOffersStub).to.have.been.calledWith(mboxes);
            expect(updateMBoxFailedCallCountStub).to.have.been.calledWith(1);
            expect(updateMBoxTargetTimeoutArtifactStub).to.have.been.calledWith('Target_TimeOut');

            expect(result).to.deep.equal([]);
          });
        });
      });
    });
  });

  context('When loadMboxDefaults', () => {
    const bootstrapData = {
      default: {
        mboxSettings: {
          mboxDefaults: { test: { mWebAirPurchasePaymentMethodUpliftDisplay: 'true' } }
        }
      }
    };

    let setIsUpliftVisibleStub;

    beforeEach(() => {
      setIsUpliftVisibleStub = sinon.stub().returns({ type: 'action' });
      sinon.stub(AdobeTargetTestActionMapping, 'adobeTargetTestActionMapping').returns({
        mWebAirPurchasePaymentMethodUpliftDisplay: setIsUpliftVisibleStub
      });
      sinon.stub(BootstrapHelper, 'fetchBootstrapData').returns(bootstrapData);
    });

    it('should invoke mbox default function', () => {
      store.dispatch(AdobeTargetActions.loadMboxDefaults());
      expect(setIsUpliftVisibleStub).to.have.been.called;
    });
  });
});
