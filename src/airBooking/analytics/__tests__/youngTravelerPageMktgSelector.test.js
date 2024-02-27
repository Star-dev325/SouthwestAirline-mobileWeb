import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { youngTravelerPageMktgSelector } from 'src/airBooking/analytics/youngTravelerPageMktgSelector';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

describe('youngTravelerPageMktgSelector', () => {
  const page_data = ANALYTICS.YOUNG_TRAVELER_PAGE;

  it('should return a mktgData', () => {
    const result = youngTravelerPageMktgSelector({});

    expect(result).toStrictEqual([
      { ...globalMktgState, ...page_data },
      'otter',
      { page: ANALYTICS.YOUNG_TRAVELER_PAGE.page }
    ]);
  });
});
