import SameDayActionTypes from 'src/sameDay/actions/sameDayActionTypes';
import SortingOptions from 'src/shared/constants/sortingOptions';
import { sortCards } from 'src/sameDay/selectors/sameDayShoppingSelectors';

const {
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO,
  SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS,
  SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER
} = SameDayActionTypes;
const { DEPARTURE_TIME } = SortingOptions;

const sameDayShopping = (state = {}, action = {}) => {
  switch (action.type) {
    case SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO:
      return {};

    case SAME_DAY__FETCH_SAME_DAY_SHOPPING_INFO_SUCCESS:
      return action.response?.cards
        ? { ...action.response, cards: sortCards(DEPARTURE_TIME, [...action.response.cards]) }
        : { ...action.response };

    case SAME_DAY__SHOPPING_PAGE_APPLY_SORT_FILTER: 
      return {
        ...state,
        appliedSortAndFilterData: { ...action.formData }
      };

    default:
      return state;
  }
};

export default sameDayShopping;
