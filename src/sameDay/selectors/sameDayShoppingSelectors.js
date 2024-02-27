import SortingOptions from 'src/shared/constants/sortingOptions';

const { DEPARTURE_TIME, DURATION_MINUTES, NUMBER_OF_STOPS, STARTING_FROM_AMOUNT } = SortingOptions;

export const getAppliedSortAndFilterData = (state) => state?.app?.sameDay?.sameDayShoppingPage?.sameDayShoppingInformation?.appliedSortAndFilterData ?? {}; 

export const getShoppingInformationWithSortedAndFilteredCards = (state) => {
  const cards = state?.app?.sameDay?.sameDayShoppingPage?.sameDayShoppingInformation?.cards ?? [];
   
  const {
    confirmed,
    nonStop,
    sortBy,
    standby
  } = getAppliedSortAndFilterData(state);
  
  const filteredCards = filterCards(cards, sortBy, nonStop, standby, confirmed);
  
  return sortCards(sortBy, filteredCards);
};

const filterCards = (cards, sortBy, filterByNonstop, filterByStandby, filterByConfirmed) => [...cards].filter(({ _meta: card }) =>
  (card.isNonStop || !filterByNonstop) &&
  (card.hasStandby || !filterByStandby) &&
  (card.hasChange || !filterByConfirmed) 
);

export const sortCards = (sortBy, cards) =>
  [...cards].sort(({ _meta: flightA }, { _meta: flightB }) => {
    const departureTimeA = Number(flightA[DEPARTURE_TIME]);
    const departureTimeB = Number(flightB[DEPARTURE_TIME]);
    const durationMinA = flightA[DURATION_MINUTES];
    const durationMinB = flightB[DURATION_MINUTES];
    const numOfStopsA = flightA[NUMBER_OF_STOPS];
    const numOfStopsB = flightB[NUMBER_OF_STOPS];
    const startAmountA = flightA[STARTING_FROM_AMOUNT];
    const startAmountB = flightB[STARTING_FROM_AMOUNT];

    switch (sortBy) {
      case DEPARTURE_TIME:
        if (departureTimeA === departureTimeB) {
          return durationMinA < durationMinB ? -1 : 1;
        } else {
          return departureTimeA < departureTimeB ? -1 : 1;
        }
      case DURATION_MINUTES:
        return durationMinA < durationMinB ? -1 : 1;
      case NUMBER_OF_STOPS:
        return numOfStopsA < numOfStopsB ? -1 : 1;
      case STARTING_FROM_AMOUNT:
        return startAmountA < startAmountB ? -1 : 1;
      default:
        return;
    }
  });