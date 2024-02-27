import _ from 'lodash';
import { checkInConfirmationMktgSelector } from 'src/checkIn/analytics/checkInConfirmationMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('checkInConfirmationMktgSelector', () => {
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "state.app.checkIn.checkInConfirmationPage.mktg_data" does not exist', () => {
    const result = checkInConfirmationMktgSelector({});
    const expectedResult = [{
      page_name: 'air-check-in-confirmation',
      page_channel: 'swa',
      page_subchannel: 'check-in',
      ...globalMktgState
    },
    satelliteTrack
    ];

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockMktgDataFromCHAPI = 'mock mktg_data';
    const state = _.set({}, 'app.checkIn.checkInConfirmationPage.mktg_data', mockMktgDataFromCHAPI);
    const result = checkInConfirmationMktgSelector(state);
    const expectedResult = [{
      page_name: 'air-check-in-confirmation',
      page_channel: 'swa',
      page_subchannel: 'check-in',
      ...mockMktgDataFromCHAPI,
      ...globalMktgState
    },
    satelliteTrack
    ];

    expect(result).toStrictEqual(expectedResult);
  });
});
