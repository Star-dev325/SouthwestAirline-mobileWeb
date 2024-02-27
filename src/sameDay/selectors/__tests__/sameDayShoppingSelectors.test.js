import { getShoppingInformationWithSortedAndFilteredCards } from 'src/sameDay/selectors/sameDayShoppingSelectors';
import SortingOptions from 'src/shared/constants/sortingOptions';
import SameDayShoppingPageResponseBuilder from 'test/builders/apiResponse/sameDayBuilder';

const { DEPARTURE_TIME, DURATION_MINUTES, NUMBER_OF_STOPS, STARTING_FROM_AMOUNT } = SortingOptions;

const cards = new SameDayShoppingPageResponseBuilder().withCards().sameDayShoppingPage.sameDayShoppingInformation.cards;

describe('sameDayPriceSelectors', () => {
  const createMockStateWithsortBy = (sortBy) => ({
    app: {
      sameDay: {
        sameDayShoppingPage: {
          sameDayShoppingInformation: { 
            cards,
            appliedSortAndFilterData: { sortBy } 
          }
        }
      }
    }
  });

  describe('when same day shopping info is successful', () => {
    it('should update the state', () => {
      expect(cards).toEqual(getShoppingInformationWithSortedAndFilteredCards(createMockStateWithsortBy()));
    });
  });

  describe('when cards are sorted', () => {
    it('should sort all cards by departureTime', () => {
      const departureCards = new SameDayShoppingPageResponseBuilder().withSortedCards(SortingOptions.DEPARTURE_TIME).sameDayShoppingPage.sameDayShoppingInformation.cards;

      expect(departureCards).toEqual(getShoppingInformationWithSortedAndFilteredCards(createMockStateWithsortBy(DEPARTURE_TIME)));
    });

    it('should sort all cards by DURATION_MINUTES', () => {
      const durationCards = new SameDayShoppingPageResponseBuilder().withSortedCards(SortingOptions.DURATION_MINUTES).sameDayShoppingPage.sameDayShoppingInformation.cards;

      expect(durationCards).toEqual(getShoppingInformationWithSortedAndFilteredCards(createMockStateWithsortBy(DURATION_MINUTES)));
    });

    it('should sort all cards by NUMBER_OF_STOPS', () => {
      const numberOfStopsCards = new SameDayShoppingPageResponseBuilder().withSortedCards(SortingOptions.NUMBER_OF_STOPS).sameDayShoppingPage.sameDayShoppingInformation.cards;

      expect(numberOfStopsCards).toEqual(getShoppingInformationWithSortedAndFilteredCards(createMockStateWithsortBy(NUMBER_OF_STOPS)));
    });

    it('should sort all cards by STARTING_FROM_AMOUNT', () => {
      const startingFromAmountCards = new SameDayShoppingPageResponseBuilder().withSortedCards(SortingOptions.STARTING_FROM_AMOUNT).sameDayShoppingPage.sameDayShoppingInformation.cards;
      
      expect(startingFromAmountCards).toEqual(getShoppingInformationWithSortedAndFilteredCards(createMockStateWithsortBy(STARTING_FROM_AMOUNT)));
    });
  });
});
