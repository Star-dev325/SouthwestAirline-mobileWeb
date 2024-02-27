jest.mock('src/shared/actions/adobeTargetActions', () => ({
  getMboxConfig: jest.fn((pageId, params) => () => (Promise.resolve([{ params }]))),
  getSegments: jest.fn(),
  getTargetParams: jest.fn(() => () => Promise.resolve({ key: 'value' }))
}));
jest.mock('src/app/helpers/bootstrapHelper', () => ({
  fetchBootstrapData: jest.fn(() => ({
    default: {},
    'rapid-rewards-mobile-index': {
      contentParameters: {},
      mboxParameters: {},
      mboxes: ['swa_mweb_rapidRewardsIndexpromoBannerTest']
    }
  }))
}));
jest.mock('src/wcm/actions/wcmActions', () => ({
  getFormattedActions: jest.fn(() => ({
    fetchFailed: jest.fn(() => ({ type: 'failed' })),
    fetchSuccess: jest.fn(() => ({ type: 'success' }))
  })),
  getPlacements: jest.fn()
}));
jest.mock('src/rapidRewards/transformers/promoBannersTransformer', () => ({
  transformPromoBannerContentToPromotion: jest.fn()
}));

import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import * as RapidRewardsActions from 'src/rapidRewards/actions/rapidRewardsActions';
import * as PromoBannersTransformer from 'src/rapidRewards/transformers/promoBannersTransformer';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import { untilAssertPass } from 'test/unit/helpers/waitFor';
import { RAPID_REWARDS_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import createMockStore from 'test/unit/helpers/createMockStore';

describe('rapidRewardsActions', () => {
  describe('AdobeTarget', () => {
    const mockContent = { test: 'content' };
    const segments = ['segment1', 'segment2'];
    let store;

    beforeEach(() => {
      store = createMockStore()({
        app: {
          toggles: {
            ENABLE_TARGET_CONFIG: true
          }
        }
      });

      AdobeTargetActions.getSegments.mockImplementation(() => () => Promise.resolve(segments));
      WcmActions.getPlacements.mockImplementation(() => () => Promise.resolve(mockContent));

      jest.clearAllMocks();
    });

    it('should get mbox from appsettings and make placement call with segments', (done) => {
      store.dispatch(RapidRewardsActions.retrievePromotions());

      untilAssertPass(() => {
        expect(AdobeTargetActions.getTargetParams).toHaveBeenCalledWith({}, RAPID_REWARDS_PAGE_ID);
        expect(AdobeTargetActions.getSegments).toHaveBeenCalledWith([
          { params: { key: 'value' } }
        ]);
        expect(WcmActions.getPlacements).toHaveBeenCalledWith(RAPID_REWARDS_PAGE_ID, [], segments);
        expect(PromoBannersTransformer.transformPromoBannerContentToPromotion)
          .toHaveBeenCalledWith(mockContent);
        expect(store.getActions()).toEqual([{ type: 'success' }]);
      }, done);
    });

    it('should dispatch failed action when getPlacements throws exception', (done) => {
      WcmActions.getPlacements.mockImplementationOnce(() => () => Promise.reject(new Error()));

      store.dispatch(RapidRewardsActions.retrievePromotions());

      untilAssertPass(() => {
        expect(WcmActions.getPlacements).toHaveBeenCalledWith(RAPID_REWARDS_PAGE_ID, [], segments);
        expect(PromoBannersTransformer.transformPromoBannerContentToPromotion)
          .not.toHaveBeenCalled;
        expect(store.getActions()).toEqual([{ type: 'failed' }]);
      }, done);
    });
  });
});
