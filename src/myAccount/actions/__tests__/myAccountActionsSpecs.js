import { sandbox } from 'sinon';

import loyaltyPromotionsMobileResponse from 'mocks/wcm/wcm/content/generated/data/loyalty/promotions/loyalty_promotions_mobile';
import * as MyAccountActions from 'src/myAccount/actions/myAccountActions';
import myAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';
import * as AccountActions from 'src/shared/actions/accountActions';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as WcmApi from 'src/shared/api/wcmApi';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import wcmActionTypes from 'src/wcm/actions/wcmActionsTypes';
import {
  LOYALTY_MY_ACCOUNT_INDEX,
  PROMO_CODES_PAGE_ID,
  RAPID_REWARDS_SNAPSHOT_PAGE_ID
} from 'src/wcm/constants/wcmConstants';
import createMockStore from 'test/unit/helpers/createMockStore';

const { WCM__FETCH_EXCLUSIVE_PROMOTION_INFO, WCM__FETCH_EXCLUSIVE_PROMOTION_INFO_SUCCESS } = wcmActionTypes;

const {
  MY_ACCOUNT__CLEAR_PAST_FLIGHTS,
  MY_ACCOUNT__CLEAR_PROMO_CODES,
  MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO,
  MY_ACCOUNT__CLEAR_SAVED_FLIGHTS,
  MY_ACCOUNT__CLEAR_UPCOMING_TRIPS,
  MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT_FAILED,
  MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT_SUCCESS,
  MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT,
  MY_ACCOUNT__FETCH_ACCOUNT_INFO_FAILED,
  MY_ACCOUNT__FETCH_ACCOUNT_INFO_SUCCESS,
  MY_ACCOUNT__FETCH_ACCOUNT_INFO,
  MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_FAILED,
  MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
  MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_FAILED,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_SUCCESS,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS,
  MY_ACCOUNT__FETCH_PAST_FLIGHTS_FAILED,
  MY_ACCOUNT__FETCH_PAST_FLIGHTS_SUCCESS,
  MY_ACCOUNT__FETCH_PAST_FLIGHTS,
  MY_ACCOUNT__FETCH_PROMO_CODES_FAILED,
  MY_ACCOUNT__FETCH_PROMO_CODES_SUCCESS,
  MY_ACCOUNT__FETCH_PROMO_CODES,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS_FAILED,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS_SUCCESS,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_FAILED,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_SUCCESS,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO,
  MY_ACCOUNT__FETCH_SAVED_FLIGHTS_FAILED,
  MY_ACCOUNT__FETCH_SAVED_FLIGHTS_SUCCESS,
  MY_ACCOUNT__FETCH_SAVED_FLIGHTS,
  MY_ACCOUNT__FETCH_UPCOMING_TRIPS_FAILED,
  MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS,
  MY_ACCOUNT__FETCH_UPCOMING_TRIPS,
  MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION_FAILED,
  MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION_SUCCESS,
  MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION,
  MY_ACCOUNT__RESET_FLOW_DATA,
  MY_ACCOUNT__SET_TRIP_TYPE
} = myAccountActionTypes;

const sinon = sandbox.create();
const mockStore = createMockStore();

describe('MyAccountActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('sync actions', () => {
    it('resetFlowData', () => {
      expect(MyAccountActions.resetFlowData()).to.deep.equal({
        type: MY_ACCOUNT__RESET_FLOW_DATA
      });
    });

    it('clearPastFlights', () => {
      expect(MyAccountActions.clearPastFlights()).to.deep.equal({
        type: MY_ACCOUNT__CLEAR_PAST_FLIGHTS
      });
    });

    it('clearSavedFlights', () => {
      expect(MyAccountActions.clearSavedFlights()).to.deep.equal({
        type: MY_ACCOUNT__CLEAR_SAVED_FLIGHTS
      });
    });

    it('setTripTypeForDetailsPage', () => {
      expect(MyAccountActions.setTripTypeForDetailsPage('FLIGHT')).to.deep.equal({
        type: MY_ACCOUNT__SET_TRIP_TYPE,
        tripType: 'FLIGHT'
      });
    });

    it('clearUpcomingTrips', () => {
      expect(MyAccountActions.clearUpcomingTrips()).to.deep.equal({
        type: MY_ACCOUNT__CLEAR_UPCOMING_TRIPS
      });
    });

    it('clearRapidRewardsInfo', () => {
      expect(MyAccountActions.clearRapidRewardsInfo()).to.deep.equal({
        type: MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO
      });
    });

    it('clearPromoCodes', () => {
      expect(MyAccountActions.clearPromoCodes()).to.deep.equal({
        type: MY_ACCOUNT__CLEAR_PROMO_CODES
      });
    });
  });

  describe('async actions', () => {
    describe('getUpcomingTrips', () => {
      it('should trigger actions when MyAccountActions.getUpcomingTrips API resolves', async () => {
        sinon.stub(AccountsApi, 'getUpcomingTrips').resolves('response');
        await store.dispatch(MyAccountActions.getUpcomingTrips());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_UPCOMING_TRIPS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS,
            isFetching: false,
            response: 'response'
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getUpcomingTrips API fails', async () => {
        sinon.stub(AccountsApi, 'getUpcomingTrips').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.getUpcomingTrips());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_UPCOMING_TRIPS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_UPCOMING_TRIPS_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('getPastFlights', () => {
      it('should trigger actions when MyAccountActions.getPastFlights API resolves', async () => {
        sinon.stub(AccountsApi, 'fetchPastFlights').resolves('response');
        await store.dispatch(MyAccountActions.getPastFlights());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_PAST_FLIGHTS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_PAST_FLIGHTS_SUCCESS,
            isFetching: false,
            response: 'response'
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getPastFlights API fails', async () => {
        sinon.stub(AccountsApi, 'fetchPastFlights').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.getPastFlights());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_PAST_FLIGHTS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_PAST_FLIGHTS_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('getPromoCodes', () => {
      it('should trigger actions when MyAccountActions.getPromoCodes API resolves', async () => {
        sinon.stub(AccountsApi, 'fetchPromoCodes').resolves('response');
        await store.dispatch(MyAccountActions.getPromoCodes());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_PROMO_CODES,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_PROMO_CODES_SUCCESS,
            isFetching: false,
            response: 'response'
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getPromoCodes API fails', async () => {
        sinon.stub(AccountsApi, 'fetchPromoCodes').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.getPromoCodes());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_PROMO_CODES,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_PROMO_CODES_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('getSavedFlights', () => {
      it('should trigger actions when MyAccountActions.getSavedFlights API resolves', async () => {
        sinon.stub(AccountsApi, 'fetchSavedFlights').resolves('response');
        await store.dispatch(MyAccountActions.getSavedFlights());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_SAVED_FLIGHTS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_SAVED_FLIGHTS_SUCCESS,
            isFetching: false,
            response: 'response'
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getSavedFlights API fails', async () => {
        sinon.stub(AccountsApi, 'fetchSavedFlights').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.getSavedFlights());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_SAVED_FLIGHTS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_SAVED_FLIGHTS_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('getRapidRewardsInfo', () => {
      it('should trigger actions when MyAccountActions.getRapidRewardsInfo API resolves', async () => {
        sinon.stub(AccountsApi, 'fetchRapidRewardsInfo').resolves({
          rapidRewardsPage: {
            fullName: 'Ben Lacy',
            rapidRewardsNumber: '1234567890',
            tier: {
              spendablePoints: '0',
              tierEncouragement: 'CLIMBING',
              showViewBenefitsLink: false,
              currentTier: 'NON_ELITE',
              nextTier: 'A_LIST',
              pointsDonutProgressBar: {
                percentageComplete: 0,
                pointsRequired: '35,000',
                pointsEarned: '0'
              },
              flightsDonutProgressBar: {
                percentageComplete: 0,
                flightsRequired: '25',
                flightsFlown: '0'
              }
            },
            companionPass: {
              achieved: false,
              companionPassEncouragement: 'CLIMBING',
              pointsDonutProgressBar: {
                percentageComplete: 0,
                pointsRequired: '125,000',
                pointsEarned: '0'
              },
              flightsDonutProgressBar: {
                percentageComplete: 0,
                flightsRequired: '100',
                flightsFlown: '0'
              }
            }
          }
        });
        await store.dispatch(MyAccountActions.getRapidRewardsInfo());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_SUCCESS,
            isFetching: false,
            response: {
              fullName: 'Ben Lacy',
              rapidRewardsNumber: '1234567890',
              ptsGroup: {
                label: 'Rapid Rewards Member',
                showViewBenefitsLink: false,
                spendablePoints: '0'
              },
              tier: {
                showCongratulations: false,
                title: {
                  preString: 'Climbing towards',
                  status: 'A-List',
                  sufString: '.'
                },
                pointsDonutProgressBar: {
                  percentageComplete: 0,
                  pointsRequired: '35,000',
                  pointsEarned: '0'
                },
                flightsDonutProgressBar: {
                  percentageComplete: 0,
                  flightsRequired: '25',
                  flightsFlown: '0'
                }
              },
              companionPass: {
                shouldCallToAddOrChangeCompanion: false,
                showCongratulations: false,
                title: {
                  preString: 'Climbing towards',
                  status: 'Companion Pass',
                  sufString: '.'
                },
                pointsDonutProgressBar: {
                  percentageComplete: 0,
                  pointsRequired: '125,000',
                  pointsEarned: '0'
                },
                flightsDonutProgressBar: {
                  percentageComplete: 0,
                  flightsRequired: '100',
                  flightsFlown: '0'
                }
              }
            }
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getRapidRewardsInfo API fails', async () => {
        sinon.stub(AccountsApi, 'fetchRapidRewardsInfo').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.getRapidRewardsInfo());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('enrollCustomerAccountForRR', () => {
      it('should trigger actions when MyAccountActions.getRapidRewardsInfo API resolves', async () => {
        sinon.stub(AccountsApi, 'updateRapidRewards').resolves();
        await store.dispatch(MyAccountActions.enrollCustomerAccountForRR({ optInForEmailSubscriptions: true }));

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT_SUCCESS,
            isFetching: false
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getRapidRewardsInfo API fails', async () => {
        sinon.stub(AccountsApi, 'updateRapidRewards').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.enrollCustomerAccountForRR({ optInForEmailSubscriptions: true }));

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__ENROLL_CUSTOMER_ACCOUNT_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('getAccountInfoForLandingPage', () => {
      const mockApiResponse = {
        results: {
          banner01: {
            content: {
              placement: 'response'
            }
          },
          unusedFundsContentModule: {
            content: {
              placement: 'response'
            }
          },
          promoCodeContentModule: {
            content: {
              placement: 'response'
            }
          }
        }
      };
      const mockUserInfoResponse = {
        customers: {
          UserInformation: {
            accountType: 'MEMBER'
          }
        }
      };
      const segment = 'segment';

      let fetchAccountInfoStub;
      let getMboxConfigStub;
      let getPlacementsStub;
      let getSegmentsStub;
      let getTargetParamsStub;

      beforeEach(() => {
        fetchAccountInfoStub = sinon.stub(AccountsApi, 'fetchAccountInfo').resolves();
        getMboxConfigStub = sinon.stub(AdobeTargetActions, 'getMboxConfig').returns(() => Promise.resolve(segment));
        getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve(mockApiResponse));
        getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
        getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(segment));
        sinon.stub(AccountsApi, 'fetchPromotions').resolves();
        sinon.stub(AccountsApi, 'getUpcomingTrips').resolves();
        store = mockStore();
      });

      it('should trigger actions when MyAccountActions.getAccountInfoForLandingPage API resolves', async () => {
        await store.dispatch(MyAccountActions.getAccountInfoForLandingPage());
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const actions = store.getActions();

        expect(actions).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_ACCOUNT_INFO,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_ACCOUNT_INFO_SUCCESS,
            isFetching: false
          },
          {
            type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_SUCCESS,
            isFetching: false,
            response: { eligiblePromotions: [], registeredPromotions: [] }
          },
          { type: 'MY_ACCOUNT__FETCH_UPCOMING_TRIPS', isFetching: true },
          {
            type: 'MY_ACCOUNT__FETCH_UPCOMING_TRIPS_SUCCESS',
            isFetching: false
          },
          {
            type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
            isFetching: false,
            response: mockApiResponse
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getAccountInfoForLandingPage API fails', async () => {
        fetchAccountInfoStub.rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.getAccountInfoForLandingPage());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_ACCOUNT_INFO,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_ACCOUNT_INFO_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });

      describe('loadAccountPagePlacements', () => {
        it('should trigger actions when MyAccountActions.loadAccountPagePlacements API resolves', async () => {
          await store.dispatch(MyAccountActions.loadAccountPagePlacements());

          expect(store.getActions()).to.deep.equal([
            {
              type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS,
              isFetching: true
            },
            {
              type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
              isFetching: false,
              response: mockApiResponse
            }
          ]);
        });

        it('should trigger actions when MyAccountActions.loadAccountPagePlacements API fails', async () => {
          getPlacementsStub.returns(() => Promise.reject({ error: 'error' }));
          await store.dispatch(MyAccountActions.loadAccountPagePlacements());

          expect(store.getActions()).to.deep.equal([
            {
              type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS,
              isFetching: true
            },
            {
              type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_FAILED,
              error: { error: 'error' },
              isFetching: false
            }
          ]);
        });

        it('should trigger mbox param functions with accountType when resolves', async () => {
          sinon.stub(AccountActions, 'getUserInfo').returns(() => Promise.resolve(mockUserInfoResponse));
          await store.dispatch(MyAccountActions.loadAccountPagePlacements());

          expect(getTargetParamsStub).to.be.calledWith({}, LOYALTY_MY_ACCOUNT_INDEX);
          expect(getMboxConfigStub).to.be.calledWith(LOYALTY_MY_ACCOUNT_INDEX, segment, []);
          expect(getSegmentsStub).to.be.calledWith(segment);
          expect(getPlacementsStub).to.be.calledWith(LOYALTY_MY_ACCOUNT_INDEX, ['MEMBER']);
        });

        it('should trigger mbox param functions when accountType undefined when resolves', async () => {
          sinon.stub(AccountActions, 'getUserInfo').returns(() => Promise.resolve(undefined));
          await store.dispatch(MyAccountActions.loadAccountPagePlacements());

          expect(getTargetParamsStub).to.be.calledWith({}, LOYALTY_MY_ACCOUNT_INDEX);
          expect(getMboxConfigStub).to.be.calledWith(LOYALTY_MY_ACCOUNT_INDEX, segment, []);
          expect(getSegmentsStub).to.be.calledWith(segment);
          expect(getPlacementsStub).to.be.calledWith(LOYALTY_MY_ACCOUNT_INDEX, []);
        });

        it('should not trigger mbox param functions when fails', async () => {
          getPlacementsStub.returns(() => Promise.reject({ error: 'error' }));
          getTargetParamsStub.returns(() => Promise.reject(segment));

          await store.dispatch(MyAccountActions.loadAccountPagePlacements());

          expect(getTargetParamsStub).to.be.calledWith({}, LOYALTY_MY_ACCOUNT_INDEX);
          expect(getMboxConfigStub).not.to.be.called;
          expect(getSegmentsStub).not.to.be.called;
          expect(getPlacementsStub).not.to.be.called;
        });
      });
    });

    describe('getExclusivePromotions', () => {
      it('should trigger actions when MyAccountActions.getExclusivePromotions API resolves', async () => {
        sinon.stub(AccountsApi, 'fetchPromotions').resolves();
        await store.dispatch(MyAccountActions.getExclusivePromotions());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_SUCCESS,
            isFetching: false,
            response: { eligiblePromotions: [], registeredPromotions: [] }
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getExclusivePromotions API fails', async () => {
        sinon.stub(AccountsApi, 'fetchPromotions').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.getExclusivePromotions());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('getPromotionDetails', () => {
      it('should trigger actions when MyAccountActions.getPromotionDetails API resolves', async () => {
        sinon.stub(AccountsApi, 'fetchPromotionDetails').resolves({
          promotionDetailsPage: {
            isRegistered: false,
            promotionId: '1-GQICD6',
            _links: {
              register: {
                href: '/v1/mobile-misc/feature/my-account/register-promotion',
                method: 'POST',
                body: {
                  promotionId: '1-GQICD6'
                }
              }
            }
          }
        });
        sinon.stub(WcmApi, 'getJsonFile').resolves(loyaltyPromotionsMobileResponse);
        await store.dispatch(
          MyAccountActions.getPromotionDetails({
            href: '/v1/mobile-misc/page/my-account/promotion-details/1-GQICD6',
            method: 'GET',
            promotionId: '1-GQICD6'
          })
        );

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_PROMOTION_DETAILS,
            isFetching: true
          },
          {
            type: WCM__FETCH_EXCLUSIVE_PROMOTION_INFO,
            isFetching: true
          },
          {
            type: WCM__FETCH_EXCLUSIVE_PROMOTION_INFO_SUCCESS,
            isFetching: false,
            response: loyaltyPromotionsMobileResponse
          },
          {
            type: MY_ACCOUNT__FETCH_PROMOTION_DETAILS_SUCCESS,
            isFetching: false,
            response: {
              isRegistered: false,
              promotionId: '1-GQICD6',
              _links: {
                register: {
                  href: '/v1/mobile-misc/feature/my-account/register-promotion',
                  method: 'POST',
                  body: {
                    promotionId: '1-GQICD6'
                  }
                }
              },
              sections: [
                {
                  name: 'Description',
                  content:
                    '<p>You&rsquo;re flying with us, and we like that. Now that things between us are really taking off, we feel it&rsquo;s the right time to offer you this exclusive opportunity. Are you ready? Get <strong>10,000 bonus points </strong>when you complete <strong>4 one-way</strong> or <strong>2 roundtrip </strong>flights. Just register and book by December 15. Travel between November 19 and December 15, 2015.</p>\n<p>Let&rsquo;s see where an extra 10,000 bonus points will take you.</p>\n<p>&nbsp;</p>'
                },
                {
                  name: 'Terms and Conditions',
                  content:
                    '<p><strong>Terms and Conditions: </strong>Only the Rapid Rewards&reg; Member who received this email/offer from Southwest Airlines&reg; is eligible for this promotion. Offer is nontransferrable. Member must register for this promotion between November 9, 2015 and December 15, 2015, and registration must be completed prior to commencement of travel. Valid on new reservations booked within the promotional time period. Member&rsquo;s flight must be booked through Southwest Airlines between November 9, 2015 and December 15, 2015 for travel between November 19, 2015 and December 15, 2015. Member&rsquo;s four one-way or two roundtrip flights must be completed between November 19, 2015 and December 15, 2015 A qualifying flight for Rapid Rewards is a flight booked through Southwest Airlines from an origin city to a destination city (and for a roundtrip, back to the origin city within the same reservation), including any intermediate stops and/or connections. Rapid Rewards earned points are calculated using base fare. Member will receive a one-time bonus of 10,000 bonus points for completion of four one-way flights during the promotional time period.&nbsp; Bonus points are in addition to the standard flight points earned through Rapid Rewards. Bonus points will not count toward A-List, A-List Preferred, or Companion Pass qualification. Member will receive bonus points within four to six weeks after completion of entire ticket. Award, Companion Pass, Southwest Vacations&reg; packages, and reward travel do not qualify for this promotion. Changes made to this itinerary after purchase may eliminate qualification for promotion.</p>'
                }
              ]
            }
          }
        ]);
      });

      it('should trigger actions when MyAccountActions.getPromotionDetails API fails', async () => {
        sinon.stub(AccountsApi, 'fetchPromotionDetails').rejects({ error: 'error' });
        await store.dispatch(
          MyAccountActions.getPromotionDetails({
            href: '/v1/mobile-misc/page/my-account/promotion-details/1-GQICD6',
            method: 'GET',
            promotionId: '1-GQICD6'
          })
        );

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__FETCH_PROMOTION_DETAILS,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__FETCH_PROMOTION_DETAILS_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('registerUserExclusivePromotion', () => {
      it('should trigger actions when MyAccountActions.registerUserExclusivePromotion API resolves', async () => {
        sinon.stub(AccountsApi, 'registerPromotion').resolves();
        await store.dispatch(MyAccountActions.registerUserExclusivePromotion());

        expect(store.getActions()[0]).to.deep.equal({
          type: MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION,
          isFetching: true
        });
        expect(store.getActions()[1]).to.deep.equal({
          type: MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION_SUCCESS,
          isFetching: false
        });
        expect(store.getActions()[2]).to.contain({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });

      it('should trigger actions when MyAccountActions.registerUserExclusivePromotion API fails', async () => {
        sinon.stub(AccountsApi, 'registerPromotion').rejects({ error: 'error' });
        await store.dispatch(MyAccountActions.registerUserExclusivePromotion());

        expect(store.getActions()).to.deep.equal([
          {
            type: MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION,
            isFetching: true
          },
          {
            type: MY_ACCOUNT__REGISTER_EXCLUSIVE_PROMOTION_FAILED,
            error: { error: 'error' },
            isFetching: false
          }
        ]);
      });
    });

    describe('getPromoCodesPagePlacements', () => {
      const mockApiResponse = {
        results: {
          banner01: {
            content: {
              placement: 'response'
            }
          },
          promoTop01: {
            content: {
              placement: 'response'
            }
          }
        }
      };
      const segment = 'segment';

      let getMboxConfigStub;
      let getPlacementsStub;
      let getSegmentsStub;
      let getTargetParamsStub;

      beforeEach(() => {
        getMboxConfigStub = sinon.stub(AdobeTargetActions, 'getMboxConfig').returns(() => Promise.resolve(segment));
        getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve(mockApiResponse));
        getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
        getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(segment));
        store = mockStore();
      });

      it('should trigger placement call', async () => {
        await store.dispatch(MyAccountActions.getPromoCodesPagePlacements());

        expect(getTargetParamsStub).to.be.calledWith({}, PROMO_CODES_PAGE_ID);
        expect(getMboxConfigStub).to.be.calledWith(PROMO_CODES_PAGE_ID, segment, []);
        expect(getSegmentsStub).to.be.calledWith(segment);
        expect(getPlacementsStub).to.be.calledWith(PROMO_CODES_PAGE_ID);
      });

      it('should not trigger placement call when fails', async () => {
        getPlacementsStub.returns(() => Promise.reject({ error: 'error' }));
        getTargetParamsStub.returns(() => Promise.reject(segment));
        await store.dispatch(MyAccountActions.getPromoCodesPagePlacements());

        expect(getTargetParamsStub).to.be.calledWith({}, PROMO_CODES_PAGE_ID);
        expect(getMboxConfigStub).not.to.be.called;
        expect(getSegmentsStub).not.to.be.called;
        expect(getPlacementsStub).not.to.be.called;
      });
    });

    describe('getMyAccountRapidRewardsPagePlacements', () => {
      const mockApiResponse = {
        results: {
          rrSummaryChaseCompanionQualifyingPointsInfo: {
            content: {
              placement: 'response'
            }
          }
        }
      };
      const segment = 'segment';
      let getMboxConfigStub;
      let getPlacementsStub;
      let getSegmentsStub;
      let getTargetParamsStub;

      beforeEach(() => {
        getMboxConfigStub = sinon.stub(AdobeTargetActions, 'getMboxConfig').returns(() => Promise.resolve(segment));
        getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve(mockApiResponse));
        getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve(segment));
        getTargetParamsStub = sinon.stub(AdobeTargetActions, 'getTargetParams').returns(() => Promise.resolve(segment));
        store = mockStore();
      });

      it('should trigger placement call', async () => {
        await store.dispatch(MyAccountActions.getMyAccountRapidRewardsPagePlacements());

        expect(getTargetParamsStub).to.be.calledWith({}, RAPID_REWARDS_SNAPSHOT_PAGE_ID);
        expect(getMboxConfigStub).to.be.calledWith(RAPID_REWARDS_SNAPSHOT_PAGE_ID, segment, []);
        expect(getSegmentsStub).to.be.calledWith(segment);
        expect(getPlacementsStub).to.be.calledWith(RAPID_REWARDS_SNAPSHOT_PAGE_ID);
      });

      it('should not trigger placement call when fails', async () => {
        getPlacementsStub.returns(() => Promise.reject({ error: 'error' }));
        getTargetParamsStub.returns(() => Promise.reject(segment));

        await store.dispatch(MyAccountActions.getMyAccountRapidRewardsPagePlacements());

        expect(getTargetParamsStub).to.be.calledWith({}, RAPID_REWARDS_SNAPSHOT_PAGE_ID);
        expect(getMboxConfigStub).not.to.be.called;
        expect(getSegmentsStub).not.to.be.called;
        expect(getPlacementsStub).not.to.be.called;
      });
    });
  });
});
