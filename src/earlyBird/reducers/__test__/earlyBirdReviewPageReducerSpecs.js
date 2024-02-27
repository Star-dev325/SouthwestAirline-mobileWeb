import reviewPageReducer from 'src/earlyBird/reducers/earlyBirdReviewPageReducers';
import earlyBirdActionTypes from 'src/earlyBird/actions/earlyBirdActionTypes';

const { EARLY_BIRD__SAVE_REVIEW_PAGE_DATA } = earlyBirdActionTypes;

describe('earlyBirdReviewPageReducer', () => {
  context('paymentInfo', () => {
    it('should initialize paymentInfo', () => {
      const state = reviewPageReducer(undefined, {
        type: EARLY_BIRD__SAVE_REVIEW_PAGE_DATA,
        reviewPage: {
          moneyTotalFare: 'moneyTotalFare',
          productIds: 'productIds',
          recordLocator: 'recordLocator',
          earlyBirdBounds: 'earlyBirdBounds'
        }
      });

      expect(state).to.deep.equal({
        moneyTotalFare: 'moneyTotalFare',
        productIds: 'productIds',
        recordLocator: 'recordLocator',
        earlyBirdBounds: 'earlyBirdBounds'
      });
    });
  });

  it('should return default state when action is undefined', () => {
    expect(reviewPageReducer().response).to.deep.equal(undefined);
  });
});
