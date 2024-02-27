import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayPaymentPageMktgSelector } from 'src/sameDay/analytics/sameDayPaymentPageMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDayPaymentPageMktgSelector', () => {
  const mockData = { data: 'mock same day pricing analytics data', requestid: 'request-id' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.sameDay.sameDayPricingPage._analytics" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        global_requestid: '',
        ...ANALYTICS.PAYMENT_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.PAYMENT_PAGE.page
      }
    ];
    const result = sameDayPaymentPageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the analytics property with pricing page elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        global_requestid: mockData.requestid,
        ...ANALYTICS.PAYMENT_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.PAYMENT_PAGE.page
      }
    ];
    const state_data = {
      app: {
        sameDay: {
          sameDayPricingPage: {
            mktg_data: mockData
          }
        }
      }
    };
    const result = sameDayPaymentPageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});
