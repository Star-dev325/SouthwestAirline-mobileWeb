import _ from 'lodash';
import { frequentTravelerMktgSelector } from 'src/airBooking/analytics/frequentTravelerMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('frequentTravelerMktgSelector', () => {
  const mktg_data = {
    frequenttraveler_available: '1',
    global_channelid: 'mweb',
    global_experienceid: '464acb94-894b-4643-a8e6-7a3968ac0a72',
    global_requestid: 'qn3bf92cSuO-QsxTuIGiqw',
    member_number: '601903385',
    member_pointsbalance: '45071',
    member_status: 'A_LIST_PREFERRED',
    swabiz_companyid: ''
  };
  const frequentTraveler = {
    page_name: 'frequent traveler',
    page_channel: 'BOOK',
    page_subchannel: 'SWA',
    ...globalMktgState
  };

  it('should return an object for mktgData if "state.app.airBooking.accountInfo.mktg_data" and "app.webView.isWebView" does not exist', () => {
    const state = {};
    const [mktgData] = frequentTravelerMktgSelector(state);

    expect(mktgData).toStrictEqual(frequentTraveler);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const state = _.set({ 'app.airBooking.accountInfo.mktg_data': mktg_data });
    const [mktgData] = frequentTravelerMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...frequentTraveler,  ...mktg_data });
  });
});
