import myAccountReducers from 'src/myAccount/reducers/index';
import MyAccountActionTypes from 'src/myAccount/actions/myAccountActionTypes';

const {
  MY_ACCOUNT__FETCH_PAST_FLIGHTS_SUCCESS,
  MY_ACCOUNT__CLEAR_PAST_FLIGHTS,
  MY_ACCOUNT__RESET_FLOW_DATA,
  MY_ACCOUNT__FETCH_SAVED_FLIGHTS_SUCCESS,
  MY_ACCOUNT__CLEAR_SAVED_FLIGHTS,
  MY_ACCOUNT__SET_TRIP_TYPE,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_SUCCESS,
  MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO,
  MY_ACCOUNT__FETCH_ACCOUNT_INFO_SUCCESS,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS,
  MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_SUCCESS,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS,
  MY_ACCOUNT__FETCH_PROMOTION_DETAILS_SUCCESS,
  MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
  MY_ACCOUNT__FETCH_PROMO_CODES_SUCCESS,
  MY_ACCOUNT__FETCH_PROMO_CODES_PAGE_PLACEMENTS_SUCCESS,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS_SUCCESS,
  MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS,
  MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS,
  MY_ACCOUNT__CLEAR_PROMO_CODES
} = MyAccountActionTypes;

describe('MyAccount Reducers', () => {
  describe('MY_ACCOUNT__RESET_FLOW_DATA', () => {
    it('should reset my account flow data when MY_ACCOUNT__RESET_FLOW_DATA action triggered', () => {
      const previousState = { pastFlightsPage: ['some', 'past', 'flights'] };
      const initialState = myAccountReducers(undefined, { type: '@@INIT' });

      expect(myAccountReducers(previousState, { type: MY_ACCOUNT__RESET_FLOW_DATA })).to.deep.equal(initialState);
    });

    it('should return default state when action is undefined', () => {
      expect(myAccountReducers()).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('SavedFlightsPage', () => {
    it('should reduce savedFlightsPage', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_SAVED_FLIGHTS_SUCCESS,
        response: { savedFlightsPage: ['some', 'saved', 'flights'] }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: ['some', 'saved', 'flights'],
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('should clear savedFlightsPage', () => {
      const initialState = { savedFlightsPage: ['some', 'saved', 'flights'] };
      const newState = myAccountReducers(initialState, {
        type: MY_ACCOUNT__CLEAR_SAVED_FLIGHTS
      });

      expect(newState).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('promo codes page', () => {
    it('should reduce promo codes', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_PROMO_CODES_SUCCESS,
        response: { promotions: ['some', 'promo', 'codes'] }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null,
        myAccountPromoCodes: { promotions: ['some', 'promo', 'codes'] }
      });
    });
  });

  describe('PastFlightsPage', () => {
    it('should reduce pastFlightsPage', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_PAST_FLIGHTS_SUCCESS,
        response: { pastFlightsPage: ['some', 'past', 'flights'] }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: ['some', 'past', 'flights'],
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('should clear pastFlightsPage', () => {
      const initialState = { pastFlightsPage: ['some', 'past', 'flights'] };
      const newState = myAccountReducers(initialState, {
        type: MY_ACCOUNT__CLEAR_PAST_FLIGHTS
      });

      expect(newState).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('tripType', () => {
    it('should reduce tripType', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__SET_TRIP_TYPE,
        tripType: 'FLIGHT'
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: 'FLIGHT',
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('RapidRewardsInfo', () => {
    it('should reduce rapidRewardsInfo', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_RAPID_REWARDS_INFO_SUCCESS,
        response: 'response'
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: 'response',
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('should clear rapidRewardsInfo', () => {
      const initialState = { rapidRewardsPage: ['some', 'rapid', 'rewards', 'info'] };
      const newState = myAccountReducers(initialState, {
        type: MY_ACCOUNT__CLEAR_RAPID_REWARDS_INFO
      });

      expect(newState).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('customerAccountInfo', () => {
    it('should reduce customerAccountInfo', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_ACCOUNT_INFO_SUCCESS,
        response: ['some', 'account', 'info']
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: ['some', 'account', 'info'],
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('exclusivePromotions', () => {
    it('should restore null state when fetch begins', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('should reduce exclusivePromotions', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_EXCLUSIVE_PROMOTIONS_SUCCESS,
        response: ['some', 'exclusive', 'promos']
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: ['some', 'exclusive', 'promos'],
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('exclusivePromotionDetailsPage', () => {
    it('should restore null state when fetch begins', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_PROMOTION_DETAILS
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('should reduce exclusivePromotionDetailsPage', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_PROMOTION_DETAILS_SUCCESS,
        response: ['exclusive', 'promo', 'details']
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: ['exclusive', 'promo', 'details'],
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('accountPagePlacements', () => {
    it('should reduce accountPagePlacements', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
        response: {
          results: {
            banner01: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            unusedFundsContentModule: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            promoCodeContentModule: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            }
          }
        }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: {
          banner01: {
            placement: { childContent: 'response' },
            displayType: '',
            viewPortThreshold: 0.5,
            shouldObserveViewPort: false,
            contentBlockId: '',
            isChasePrequal: false,
            isChaseCombo: false,
            isChasePlacement: false
          },
          unusedFundsContentModule: 'response',
          promoCodeContentModule: 'response'
        },
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('when promoCodeContentModule children content is null', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
        response: {
          results: {
            banner01: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            unusedFundsContentModule: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            promoCodeContentModule: {
              content: null
            }
          }
        }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: {
          banner01: {
            placement: { childContent: 'response' },
            displayType: '',
            viewPortThreshold: 0.5,
            shouldObserveViewPort: false,
            contentBlockId: '',
            isChasePrequal: false,
            isChaseCombo: false,
            isChasePlacement: false
          },
          unusedFundsContentModule: 'response',
          promoCodeContentModule: undefined
        },
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('when promoCodeContentModule content placement is null', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
        response: {
          results: {
            banner01: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            unusedFundsContentModule: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            promoCodeContentModule: {
              content: {
                placement: null
              }
            }
          }
        }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: {
          banner01: {
            placement: { childContent: 'response' },
            displayType: '',
            viewPortThreshold: 0.5,
            shouldObserveViewPort: false,
            contentBlockId: '',
            isChasePrequal: false,
            isChaseCombo: false,
            isChasePlacement: false
          },
          unusedFundsContentModule: 'response',
          promoCodeContentModule: undefined
        },
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('when promoCodeContentModule childContent is null', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS_SUCCESS,
        response: {
          results: {
            banner01: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            unusedFundsContentModule: {
              content: {
                placement: {
                  childContent: 'response'
                }
              }
            },
            promoCodeContentModule: {
              content: {
                placement: {
                  childContent: null
                }
              }
            }
          }
        }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: {
          banner01: {
            placement: { childContent: 'response' },
            displayType: '',
            viewPortThreshold: 0.5,
            shouldObserveViewPort: false,
            contentBlockId: '',
            isChasePrequal: false,
            isChaseCombo: false,
            isChasePlacement: false
          },
          unusedFundsContentModule: 'response',
          promoCodeContentModule: null
        },
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });

    it('should restore null state when fetch begins', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_ACCOUNT_PAGE_PLACEMENTS
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('promoCodesPage', () => {
    it('should reduce promoCodesPagePlacements', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_PROMO_CODES_PAGE_PLACEMENTS_SUCCESS,
        response: {
          results: {
            promoTop01: {
              content: {
                placement: {
                  childContent: 'test'
                }
              }
            }
          }
        }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null,
        promoCodesPagePlacements: {
          promoTop01: {
            placement: { childContent: 'test' },
            displayType: '',
            viewPortThreshold: 0.5,
            shouldObserveViewPort: false,
            contentBlockId: '',
            isChasePrequal: false,
            isChaseCombo: false,
            isChasePlacement: false
          }
        }
      });
    });

    it('should clear promoCodes', () => {
      const initialState = { myAccountPromoCodes: ['some', 'promo', 'codes'] };
      const newState = myAccountReducers(initialState, {
        type: MY_ACCOUNT__CLEAR_PROMO_CODES
      });

      expect(newState).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });

  describe('rapid rewards snapshot page', () => {
    it('should reduce RapidRewardsPagePlacements', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS_SUCCESS,
        response: {
          results: {
            rrSummaryChaseCompanionQualifyingPointsInfo: {
              content: {
                placement: {
                  childContent: 'test'
                }
              }
            }
          }
        }
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: {
          rrSummaryChaseCompanionQualifyingPointsInfo: {
            placement: { childContent: 'test' },
            displayType: '',
            viewPortThreshold: 0.5,
            shouldObserveViewPort: false,
            contentBlockId: '',
            isChasePrequal: false,
            isChaseCombo: false,
            isChasePlacement: false
          }
        }
      });
    });

    it('should restore null state when fetch begins', () => {
      const state = myAccountReducers(undefined, {
        type: MY_ACCOUNT__FETCH_RAPID_REWARDS_PAGE_PLACEMENTS
      });

      expect(state).to.deep.equal({
        pastFlightsPage: null,
        savedFlightsPage: null,
        tripType: null,
        rapidRewardsInfo: null,
        customerAccountInfo: null,
        exclusivePromotions: null,
        exclusivePromotionDetailsPage: null,
        myAccountPromoCodes: null,
        accountPagePlacements: null,
        promoCodesPagePlacements: null,
        myAccountRapidRewardsPagePlacements: null
      });
    });
  });
});
