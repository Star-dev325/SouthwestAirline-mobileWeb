import searchForFlightsRequestBuilder from 'test/builders/model/searchForFlightsRequestBuilder';
import proxyquire from 'proxyquire';
import sinonModule from 'sinon';
import StorageKeys from 'src/shared/helpers/storageKeys';

const { SHOPPING_SEARCH_HISTORY_STORE_KEY } = StorageKeys;

const sinon = sinonModule.sandbox.create();

describe('search selector', () => {
  let mockLocalStorage;
  let searchSelector;
  let search;
  let state;
  let satelliteTrackStub;
  let setTimeoutStub;

  const expectTrackingCalled = () => {
    expect(setTimeoutStub.callCount).to.be.equal(1);
    setTimeoutStub.getCall(0).args[0]();
    expect(satelliteTrackStub).to.be.calledWith('select flight calendar strip');
  };

  beforeEach(() => {
    satelliteTrackStub = sinon.stub(window._satellite, 'track');
    setTimeoutStub = sinon.stub(window, 'setTimeout');

    state = {
      app: {
        account: {
          corporateInfo: {
            selectedCompany: {
              companyName: ''
            }
          }
        },
        airBooking: {
          searchRequest: new searchForFlightsRequestBuilder().withPromoCode().build(),
          flightShoppingPage: {
            response: {
              flightShoppingPage: {
                _meta: {
                  isPromoCodeApplied: true
                }
              }
            }
          }
        },
        airportInfo: {
          originAirport: {
            isCurrentLocation: true
          },
          destinationAirport: {
            isCurrentLocation: false
          }
        }
      }
    };
    search = new searchForFlightsRequestBuilder().build();
    mockLocalStorage = {
      set: sinon.stub(),
      get: sinon.stub(),
      remove: sinon.stub()
    };
    mockLocalStorage.get.withArgs(SHOPPING_SEARCH_HISTORY_STORE_KEY).returns([search]);

    searchSelector = proxyquire('src/airBooking/analytics/searchSelector.js', {
      store2: mockLocalStorage
    }).getSearch;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should generate a search request', () => {
    const search = searchSelector(state);

    expect(search).to.deep.equal({
      origin: 'ATL',
      destination: 'AUS',
      tripType: 'roundTrip',
      departureDate: '2015-11-10',
      returnDate: '2015-12-10',
      adults: 1,
      currencyCode: 'USD',
      promoCode: 'SuperPromoCode',
      promoCodeIsValid: true,
      currentLocationUsed: true,
      dateChange: 'initial search',
      source: 'mobile_sales',
      companyId: '',
      swabizUserRole: 'default'
    });
    expectTrackingCalled();
  });

  it('should return initial search when booking from the main shopping page', () => {
    state.app.airBooking.searchRequest = new searchForFlightsRequestBuilder().build();
    const searchReq = searchSelector(state);

    expect(searchReq.dateChange).to.equal('initial search');
    expectTrackingCalled();
  });

  it('should return date change for one way', () => {
    state.app.airBooking.searchRequest = new searchForFlightsRequestBuilder().withOneWay().build();
    const searchReq = searchSelector(state);

    expect(searchReq.dateChange).to.equal('OUT 0');
    expectTrackingCalled();
  });

  it('should return date change for two way', () => {
    state.app.airBooking.searchRequest.isInitialSearch = false;
    const searchReq = searchSelector(state);

    expect(searchReq.dateChange).to.equal('OUT 0,RTN 0');
    expectTrackingCalled();
  });

  it('should return corporate sales when corporate name is available', () => {
    state.app.account.corporateInfo.selectedCompany.companyName = 'Southwest Company Account';
    const searchReq = searchSelector(state);

    expect(searchReq.source).to.equal('corporate_sales');
  });

  it('should return companyId when corporate id is available', () => {
    state.app.account.corporateInfo.selectedCompany.companyId = '99587574';
    const searchReq = searchSelector(state);

    expect(searchReq.companyId).to.equal('99587574');
  });

  it('should return swabizUserRole when company name is available', () => {
    state.app.account.corporateInfo.selectedCompany.companyName = 'Southwest Company Account';
    const searchReq = searchSelector(state);

    expect(searchReq.swabizUserRole).to.equal('TRAVELER');
  });

  it('should return swabizUserRole default when company name is not available', () => {
    const searchReq = searchSelector(state);

    expect(searchReq.swabizUserRole).to.equal('default');
  });
});
