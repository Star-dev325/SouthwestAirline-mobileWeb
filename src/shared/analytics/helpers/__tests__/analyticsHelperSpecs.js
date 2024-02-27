import sinonModule from 'sinon';
import {
  generateUpdatedStoresForAnalytics,
  generateUpdatedFlowStoreForAnalytics,
  generateFlowActionListForAnalytics
} from 'src/shared/analytics/helpers/analyticsHelper';

const sinon = sinonModule.sandbox.create();

describe('analyticsHelper', () => {
  let mockFlowSelectors;

  beforeEach(() => {
    mockFlowSelectors = {
      search: {
        actions: ['FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS', 'SAVE_SHOPPING_SEARCH_FORM'],
        selector: sinon.stub().returns('search data')
      },
      results: {
        actions: ['FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS', 'SORT_FLIGHT_SHOPPING_PAGE_BY'],
        selector: sinon.stub().returns('result data')
      }
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  context('generateUpdatedFlowStoreForAnalytics', () => {
    it('should generate one field in flow store when only one selector listen that action', () => {
      const triggerActionType = 'SORT_FLIGHT_SHOPPING_PAGE_BY';

      const flowStore = generateUpdatedFlowStoreForAnalytics(mockFlowSelectors, 'state', triggerActionType);

      expect(flowStore).to.deep.equal({
        results: 'result data'
      });
    });

    it('should generate multiple fields in flow store when multiple selector listen that action', () => {
      const triggerActionType = 'FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS';

      const flowStore = generateUpdatedFlowStoreForAnalytics(mockFlowSelectors, 'state', triggerActionType);

      expect(flowStore).to.deep.equal({
        search: 'search data',
        results: 'result data'
      });
    });

    it('should generate empty in flow store when no selector listen that action', () => {
      const triggerActionType = 'NOT_LISTENING_ACTION';

      const flowStore = generateUpdatedFlowStoreForAnalytics(mockFlowSelectors, 'state', triggerActionType);

      expect(flowStore).to.be.empty;
    });
  });

  context('generateFlowActionListForAnalytics', () => {
    it('should generate all flow analytics actions in selectors without duplication', () => {
      const analyticsActions = generateFlowActionListForAnalytics(mockFlowSelectors);

      expect(analyticsActions).to.deep.equal([
        'FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS',
        'SAVE_SHOPPING_SEARCH_FORM',
        'SORT_FLIGHT_SHOPPING_PAGE_BY'
      ]);
    });
  });

  context('generateUpdatedStoresForAnalytics', () => {
    let mockGenerators;
    let mockOtherFlowSelectors;

    beforeEach(() => {
      mockOtherFlowSelectors = {
        earlyBird: {
          actions: ['NOT_TRIGGERED_ACTION_TYPE'],
          selector: sinon.stub().returns('not triggered action type')
        },
        shared: {
          actions: ['SORT_FLIGHT_SHOPPING_PAGE_BY'],
          selector: sinon.stub().returns('triggered action type')
        }
      };

      mockGenerators = {
        FlowStore: (state, actionType) => generateUpdatedFlowStoreForAnalytics(mockFlowSelectors, state, actionType),
        FlowOtherStore: (state, actionType) =>
          generateUpdatedFlowStoreForAnalytics(mockOtherFlowSelectors, state, actionType)
      };
    });

    it('should generate only one analytics store when triggered action be listened by one store selector', () => {
      const triggerActionType = 'FETCH_FLIGHT_SHOPPING_PAGE_SUCCESS';

      const updatedStores = generateUpdatedStoresForAnalytics(mockGenerators, 'state', triggerActionType);

      expect(updatedStores).to.deep.equal({
        'FlowStore.search': 'search data',
        'FlowStore.results': 'result data'
      });
    });

    it('should generate multiple analytics store when triggered action be listened by multiple store selectors', () => {
      const triggerActionType = 'SORT_FLIGHT_SHOPPING_PAGE_BY';

      const updatedStores = generateUpdatedStoresForAnalytics(mockGenerators, 'state', triggerActionType);

      expect(updatedStores).to.deep.equal({
        'FlowStore.results': 'result data',
        'FlowOtherStore.shared': 'triggered action type'
      });
    });
  });
});
