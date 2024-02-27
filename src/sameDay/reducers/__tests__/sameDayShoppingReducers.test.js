import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import sameDayShopping from 'src/sameDay/reducers/sameDayShoppingReducers';
import { sortCards } from 'src/sameDay/selectors/sameDayShoppingSelectors';
import SortingOptions from 'src/shared/constants/sortingOptions';
import SameDayShoppingPageResponseBuilder from 'test/builders/apiResponse/sameDayBuilder';

const {
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
  SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER
} = SameDayActionTypes;

const actionSameDayShoppingInfo = { type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO };
const actionSameDayShoppingInfoSuccess = {
  type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
  response: { val: 'response' }
};

describe('sameDayShopping', () => {
  describe('when action is undefined', () => {
    it('should return true', () => {
      expect(sameDayShopping(true, undefined)).toEqual(true);
    });

    it('should return false', () => {
      expect(sameDayShopping(false, undefined)).toEqual(false);
    });
  });

  describe('when action type is undefined', () => {
    const action = { type: undefined };

    it('should return true', () => {
      expect(sameDayShopping(true, action)).toEqual(true);
    });

    it('should return false', () => {
      expect(sameDayShopping(false, action)).toEqual(false);
    });
  });

  describe('when action is empty', () => {
    it('should return true', () => {
      expect(sameDayShopping(true, {})).toEqual(true);
    });

    it('should return false', () => {
      expect(sameDayShopping(false, {})).toEqual(false);
    });
  });

  describe('when state is false', () => {
    it('should return {}  with action', () => {
      expect(sameDayShopping(false, actionSameDayShoppingInfo)).toEqual({});
    });

    it('should return response with action', () => {
      expect(sameDayShopping(false, actionSameDayShoppingInfoSuccess)).toEqual(
        actionSameDayShoppingInfoSuccess.response
      );
    });

    describe('when action is undefined', () => {
      it('should return false', () => {
        expect(sameDayShopping(false, undefined)).toEqual(false);
      });
    });

    describe('when action type is undefined', () => {
      const action = { type: undefined };

      it('should return false', () => {
        expect(sameDayShopping(false, action)).toEqual(false);
      });
    });

    describe('when action is empty', () => {
      it(' should return false ', () => {
        expect(sameDayShopping(false, {})).toEqual(false);
      });
    });

    describe('when both state and action are empty', () => {
      it('should return empty object', () => {
        expect(sameDayShopping({}, {})).toEqual({});
      });
    });

    describe('when state is empty with correct action', () => {
      it('should return {}', () => {
        expect(sameDayShopping({}, actionSameDayShoppingInfo)).toEqual({});
      });

      it('should return response', () => {
        expect(sameDayShopping({}, actionSameDayShoppingInfoSuccess)).toEqual(
          actionSameDayShoppingInfoSuccess.response
        );
      });
    });
  });

  describe('when same day shopping info is successful', () => {
    it('should update the state', () => {
      expect(
        sameDayShopping(
          {},
          {
            type: SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
            response: {
              cards: new SameDayShoppingPageResponseBuilder().withCards().sameDayShoppingPage.sameDayShoppingInformation
                .cards
            }
          }
        )
      ).toEqual({
        cards: sortCards(
          SortingOptions.DEPARTURE_TIME,
          new SameDayShoppingPageResponseBuilder().withCards().sameDayShoppingPage.sameDayShoppingInformation.cards
        )
      });
    });
  });

  describe('when appliedSortAndFilterData is updated', () => {
    const createMockStateWithsortBy = (sortBy) => ({
      sortby: sortBy 
    });
    
    it('should update appliedSortAndFilterData with sortBy: durationMinutes', () => {
      expect(
        sameDayShopping(
          {
            appliedSortAndFilterData: new SameDayShoppingPageResponseBuilder().sameDayShoppingPage.sameDayShoppingInformation.appliedSortAndFilterData
          },
          {
            formData: createMockStateWithsortBy(SortingOptions.DURATION_MINUTES),
            type: SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER
          }
        )
      ).toEqual({
        appliedSortAndFilterData: new SameDayShoppingPageResponseBuilder().withAppliedSortAndFilterData(SortingOptions.DURATION_MINUTES).sameDayShoppingPage.sameDayShoppingInformation.appliedSortAndFilterData

      });
    });

    it('should update appliedSortAndFilterData with sortBy: numberStops', () => {
      expect(
        sameDayShopping(
          {
            appliedSortAndFilterData: new SameDayShoppingPageResponseBuilder().sameDayShoppingPage.sameDayShoppingInformation.appliedSortAndFilterData
          },
          {
            formData: createMockStateWithsortBy(SortingOptions.NUMBER_OF_STOPS),
            type: SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER
          }
        )
      ).toEqual({
        appliedSortAndFilterData: new SameDayShoppingPageResponseBuilder().withAppliedSortAndFilterData(SortingOptions.NUMBER_OF_STOPS).sameDayShoppingPage.sameDayShoppingInformation.appliedSortAndFilterData

      });
    });

    it('should update appliedSortAndFilterData with sortBy: departureTime', () => {
      expect(
        sameDayShopping(
          {
            appliedSortAndFilterData: new SameDayShoppingPageResponseBuilder().sameDayShoppingPage.sameDayShoppingInformation.appliedSortAndFilterData
          },
          {
            formData: createMockStateWithsortBy(SortingOptions.DEPARTURE_TIME),
            type: SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER
          }
        )
      ).toEqual({
        appliedSortAndFilterData: new SameDayShoppingPageResponseBuilder().withAppliedSortAndFilterData(SortingOptions.DEPARTURE_TIME).sameDayShoppingPage.sameDayShoppingInformation.appliedSortAndFilterData

      });
    });
  });
});
