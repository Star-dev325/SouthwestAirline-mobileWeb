import { getNeededAppState } from 'src/shared/selectors/appSelector';
import proxyquire from 'proxyquire';

describe('appSelector', () => {
  it('should return omitted properties of app', () => {
    const fakeAppState = {
      spinner: 'spinner',
      toggles: 'toggles',
      errorHeader: 'errorHeader',
      dialog: 'dialog',
      wcmContent: 'wcmContent',
      airBooking: 'airBooking',
      appReady: true,
      uplift: {
        upliftAvailability: {}
      },
      applePay: {
        applePayAvailability: {}
      }
    };

    const result = getNeededAppState.resultFunc(fakeAppState);

    expect(result).to.be.deep.equal({ airBooking: 'airBooking', uplift: {}, applePay: {} });
  });

  it('should return correct app flow based on the path name', () => {
    const pathname = 'air/booking';
    const appSelectorProxy = proxyquire('src/shared/selectors/appSelector', {
      'src/shared/helpers/browserObject': {
        default: { location: { pathname } }
      }
    });

    expect(appSelectorProxy.getCurrentAppFlow()).to.be.deep.equal(pathname);
  });

  it('should return correct app flow based on the path name', () => {
    const pathname = 'air/change';
    const state = { app: { airChange: { changePricingPage: { response: { _meta: { isUpgrade: true } } } } } };
    const appSelectorProxy = proxyquire('src/shared/selectors/appSelector', {
      'src/shared/helpers/browserObject': {
        default: { location: { pathname } }
      }
    });
    const expectedFlow = 'air/upgrade';

    expect(appSelectorProxy.getCurrentAppFlow(state)).to.be.deep.equal(expectedFlow);
  });
});
