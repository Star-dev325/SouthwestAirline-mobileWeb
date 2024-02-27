import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightChangeSelectedBoundsMktgSelector } from 'src/airChange/analytics/flightChangeSelectedBoundsMktgSelector';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightChangeSelectedBoundsMktgSelector', () => {
  const changeMktgData = { data: 'change mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "state.app.airChange.changeFlightPage.response.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.SHOPPING_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.SHOPPING_PAGE.page
      }
    ];
    const result = flightChangeSelectedBoundsMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with shopping page data elements', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...changeMktgData,
        ...ANALYTICS.SHOPPING_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.SHOPPING_PAGE.page
      }
    ];
    const state_data = {
      app: {
        airChange: {
          changeFlightPage: {
            response: {
              mktg_data: changeMktgData
            }
          }
        }
      }
    };
    const result = flightChangeSelectedBoundsMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });

  describe('Reaccom scenario', () => {
    const reaccomMktgData = { data: 'reaccom mock mktg_data' };

    it('should return an array containing the contents of the reaccom mktg_data property with shopping page data elements when isReaccomCoTerminalEligible is true', () => {
      const expectedResult = [
        {
          ...globalMktgState,
          ...reaccomMktgData,
          ...ANALYTICS.SHOPPING_PAGE
        },
        satelliteTrack,
        {
          page: ANALYTICS.SHOPPING_PAGE.page
        }
      ];
      const state_data = {
        app: {
          airChange: {
            reaccomFlightPage: {
              response: {
                boundSelections: [{ alternateReaccomOriginationAirportCodes: 'test' }],
                mktg_data: reaccomMktgData
              }
            }
          }
        }
      };
      const result = flightChangeSelectedBoundsMktgSelector(state_data);

      expect(result).toStrictEqual(expectedResult);
    });

    it('should return an empty array when isReaccomCoTerminalEligible is false', () => {
      const state_data = {
        app: {
          airChange: {
            reaccomFlightPage: {
              response: {
                boundSelections: [{ test: 'test' }]
              }
            }
          }
        }
      };
      const result = flightChangeSelectedBoundsMktgSelector(state_data);

      expect(result).toStrictEqual([]);
    });
  });
});
