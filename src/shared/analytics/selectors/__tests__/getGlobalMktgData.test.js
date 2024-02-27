jest.mock('src/shared/helpers/createSelectorWithErrorReporter', () => ({
  createSelector: (selectorsFn, dataFn) => (state) => {
    const { accountNumber, accountRedeemablePoints, accountTier, deviceType = 'mobile', isLoggedIn, isWebView } = state;

    selectorsFn[1]({ app: { account: { isLoggedIn } } });
    selectorsFn[2]({ app: { webView: { isWebView } } });

    return dataFn(isLoggedIn, isWebView, deviceType, accountNumber, accountTier, accountRedeemablePoints);
  }
}));
jest.mock('src/shared/helpers/loginSessionHelper');
jest.mock('src/shared/helpers/webViewHelper');

import * as getGlobalMktgData from 'src/shared/analytics/selectors/getGlobalMktgData';
import * as loginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import * as webViewHelper from 'src/shared/helpers/webViewHelper';

const globalMktgParams = {
  devicetype: 'mobile',
  global_channelid: 'MWEB',
  global_experienceid: '',
  iswebview: '0',
  page_language: 'EN',
  responsivesize: 'na',
  user_loginstate: 'cold'
};

describe('globalMktgData', () => {
  beforeEach(() => {
    loginSessionHelper.hasCorporateToken.mockReturnValue(false);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an object for mktgData if isWebview does not exist', () => {
    const mktgData = getGlobalMktgData.getGlobalMktgData({ isLoggedIn: true });

    expect(mktgData).toStrictEqual({ ...globalMktgParams, user_loginstate: 'hot', member_number: null,  member_pointsbalance: null, member_status: null });
  });

  it('should return device type as empty for mktgData if isWebview is true', () => {
    const mktgData = getGlobalMktgData.getGlobalMktgData({ isWebView: '1', deviceType: '' });

    expect(mktgData).toStrictEqual({ ...globalMktgParams, iswebview: '1', devicetype: '' });
  });

  it('should return device type as ANDROID for mktgData if isWebview is true and device type is IOS with corporate channel id with default webViewChannel', () => {
    loginSessionHelper.hasCorporateToken.mockResolvedValue(true);

    const mktgData = getGlobalMktgData.getGlobalMktgData({ isWebView: '1', deviceType: 'IOS' });

    expect(mktgData).toStrictEqual({ ...globalMktgParams, iswebview: '1', devicetype: 'IOS', global_channelid: 'MWEB_CORP' });
  }); 

  it('should return device type as ANDROID for mktgData if isWebview is true and device type is ANDROID', () => {
    webViewHelper.getWebViewChannel.mockReturnValue('ANDROID');

    const mktgData = getGlobalMktgData.getGlobalMktgData({ isWebView: '1', deviceType: 'ANDROID' });

    expect(mktgData).toStrictEqual({ ...globalMktgParams, iswebview: '1', devicetype: 'ANDROID', global_channelid: 'ANDROID' });
  }); 

  it('should return device type as ANDROID for mktgData if isWebview is true and device type is IOS', () => {
    webViewHelper.getWebViewChannel.mockReturnValue('IOS');

    const mktgData = getGlobalMktgData.getGlobalMktgData({ isWebView: '1', deviceType: 'IOS' });

    expect(mktgData).toStrictEqual({ ...globalMktgParams, iswebview: '1', devicetype: 'IOS', global_channelid: 'IOS' });
  }); 

  it('should return devicetype as ANDROID for mktgData if iswebview is true and devicetype is IOS with leisure channel id', () => {
    webViewHelper.getWebViewChannel.mockReturnValue('IOS');

    const mktgData = getGlobalMktgData.getGlobalMktgData({ deviceType: 'IOS',  isWebView: '1' });

    expect(mktgData).toStrictEqual({ ...globalMktgParams, iswebview: '1', devicetype: 'IOS', global_channelid: 'IOS' });
  });
  
  it('should return devicetype as ANDROID for mktgData if iswebview is true and devicetype is IOS with corporate channel id', () => {
    webViewHelper.getWebViewChannel.mockReturnValue('MWEB_CORP');
    loginSessionHelper.hasCorporateToken.mockResolvedValue(true);

    const mktgData = getGlobalMktgData.getGlobalMktgData({ deviceType: 'IOS', isWebView: '1' });

    expect(mktgData).toStrictEqual({ ...globalMktgParams, iswebview: '1', devicetype: 'IOS', global_channelid: 'MWEB_CORP' });
  });
});
