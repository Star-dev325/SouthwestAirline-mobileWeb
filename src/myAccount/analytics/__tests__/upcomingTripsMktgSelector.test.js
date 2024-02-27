import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { upcomingTripsMktgSelector } from 'src/myAccount/analytics/upcomingTripsMktgSelector';

describe('upcomingTripsMktgSelector', () => {
  it('should return an empty object for mktgData if marketing data in upcoming does not exist', () => {
    const [mktgData] = upcomingTripsMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the marketing data property', () => {
    const mockData = {
      app: {
        upcomingTrips: {
          mktg_data: 'mock mktg data'
        }
      }
    };

    const state_data = Object.assign({}, 'app.upcomingTrips.mktg_data', mockData);
    const [mktgData] = upcomingTripsMktgSelector(state_data); //

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mktgData });
  });
});
