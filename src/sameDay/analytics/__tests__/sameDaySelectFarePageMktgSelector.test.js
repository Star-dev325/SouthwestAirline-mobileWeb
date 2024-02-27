import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDaySelectFarePageMktgSelector } from 'src/sameDay/analytics/sameDaySelectFarePageMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';
import SameDayShoppingPageResponseBuilder from 'test/builders/apiResponse/sameDayBuilder';

describe('sameDaySelectFarePageMktgSelector', () => {
  const { sameDayShoppingInformation } = new SameDayShoppingPageResponseBuilder().build();
  const mockSelectFarePageMktgData = { data: 'mock same day select fare page mktg_data' };
  const mockShoppingPageMktgData = { data: 'mock same day shopping page mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if state does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.SELECT_FARE_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.SELECT_FARE_PAGE.page
      }
    ];
    const result = sameDaySelectFarePageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with select fare page data elements', () => {
    const expectedResult = [
      {
        air_bound1_viewfarecurrency: '90|50|30|20',
        air_bound1_viewfarecurrency1: '90',
        air_bound1_viewfarecurrency2: '50',
        air_bound1_viewfarecurrency3: '30',
        air_bound1_viewfarecurrency4: '20',
        air_bound1_viewfarepoints: 'none|none|none|none',
        air_bound1_viewfarepoints1: 'none',
        air_bound1_viewfarepoints2: 'none',
        air_bound1_viewfarepoints3: 'none',
        air_bound1_viewfarepoints4: 'none',
        air_bound1_viewfareproductid1: 'BUS',
        air_bound1_viewfareproductid2: 'ANY',
        air_bound1_viewfareproductid3: 'PLU',
        air_bound1_viewfareproductid4: 'WGA',
        air_bound1_viewfareproductids: 'BUS|ANY|PLU|WGA',
        air_bound1_viewfaretype1: 'BUS',
        air_bound1_viewfaretype2: 'ANY',
        air_bound1_viewfaretype3: 'PLU',
        air_bound1_viewfaretype4: 'WGA',
        air_bound1_viewfaretypes: 'BUS|ANY|PLU|WGA',
        ...globalMktgState,
        ...mockShoppingPageMktgData,
        ...mockSelectFarePageMktgData,
        ...ANALYTICS.SELECT_FARE_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.SELECT_FARE_PAGE.page
      }
    ];
    const state_data = {
      app: {
        sameDay: {
          sameDaySelectFarePage: {
            ...sameDayShoppingInformation.cards[0],
            mktg_data: mockSelectFarePageMktgData
          },
          sameDayShoppingPage: {
            sameDayShoppingInformation: {
              ...sameDayShoppingInformation,
              mktg_data: mockShoppingPageMktgData
            }
          }
        }
      }
    };
    const result = sameDaySelectFarePageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});
