import _ from 'lodash';
import { selectedFrequentTravelerMktgSelector } from 'src/airBooking/analytics/selectedFrequentTravelerMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('selectedFrequentTravelerMktgSelector', () => {
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
  const traveler_info = {
    devicetype: 'mobile',
    frequenttraveler_selected: '1',
    page_name: 'frequent traveler',
    page_channel: 'BOOK',
    page_subchannel: 'SWA',
    responsivesize: 'na',
    user_loginstate: 'cold',
    iswebview: '0',
    page_language: 'EN',
    ...globalMktgState
  };

  it('should return an object for mktgData if "state.app.airBooking.accountInfo.mktg_data" and "app.webView.isWebView" does not exist', () => {
    const state = {};
    const [mktgData] = selectedFrequentTravelerMktgSelector(state);

    expect(mktgData).toStrictEqual(traveler_info);
  });

  it('should return page_language as "EN" for mktgData if "state.app.airBooking.accountInfo.mktg_data" does not exist but "app.webView.isWebView" is false', () => {
    const state = _.set({ 'app.webView.isWebView': false });
    const [mktgData] = selectedFrequentTravelerMktgSelector(state);

    expect(mktgData).toStrictEqual(traveler_info);
  });

  it('should return iswebview as "1" for mktgData if  "app.webView.isWebView" is true', () => {
    const state = _.set({ 'app.webView.isWebView': true });
    const [mktgData] = selectedFrequentTravelerMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...traveler_info, iswebview: '1', devicetype: '' });
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const state = _.set({ 'app.airBooking.accountInfo.mktg_data': mktg_data });
    const [mktgData] = selectedFrequentTravelerMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...traveler_info, ...mktg_data });
  });

  it('should return an array containing the contents of the mktg_data property when "state.app.airBooking.accountInfo.mktg_data" and "app.webView.isWebView" is true', () => {
    const state = _.set({ 'app.airBooking.accountInfo.mktg_data': mktg_data }, { 'app.webView.isWebView': true });
    const [mktgData] = selectedFrequentTravelerMktgSelector(state);

    expect(mktgData).toStrictEqual({ ...traveler_info, ...mktg_data });
  });
});
