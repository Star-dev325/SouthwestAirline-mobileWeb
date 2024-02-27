import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { sameDayRefundPageMktgSelector } from 'src/sameDay/analytics/sameDayRefundPageMktgSelector';
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants';

describe('sameDayRefundPageMktgSelector', () => {
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "app.sameDay.sameDayRefundPage.sameDayRefundPage" is false', () => {
    const expectedResult = [];
    const result = sameDayRefundPageMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with refund page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.REFUND_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.REFUND_PAGE.page
      }
    ];
    const state_data = {
      app: {
        sameDay: {
          sameDayRefundPage: {
            showRefundPage: true
          }
        }
      }
    };
    const result = sameDayRefundPageMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});
