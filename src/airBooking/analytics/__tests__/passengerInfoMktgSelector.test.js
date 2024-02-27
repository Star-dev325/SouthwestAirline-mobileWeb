import _ from 'lodash';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { passengerInfoMktgSelector } from 'src/airBooking/analytics/passengerInfoMktgSelector';

describe('passengerInfoMktgSelector', () => {
  it('should return an empty object for mktgData if "state.app.airBooking.accountInfo.mktg_data" does not exist', () => {
    const state = {};
    const [mktgData] = passengerInfoMktgSelector(state);

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const state = _.set({ 'app.airBooking.accountInfo.mktg_data': { data: 'mock mktg_data' } });
    const [mktgData] = passengerInfoMktgSelector(state);

    expect(mktgData.data).toBe('mock mktg_data');
  });
});
