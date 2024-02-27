import _ from 'lodash';
import { getSearch } from 'src/carBooking/analytics/searchSelector';

describe('getSearch selector', () => {
  context('', () => {
    let expectedSearch;
    let emptyDiscount;
    let searchRequestDiscounts;
    let promoCodesWithDiscounts;

    beforeEach(() => {
      emptyDiscount = { vendor: '', type: '', code: '', isValid: null };
      promoCodesWithDiscounts = [
        {
          vendor: 'HERTZ',
          type: 'CORPORATE_RATE',
          code: '65688',
          promoCodeApplied: true
        },
        {
          vendor: 'ALAMO',
          type: 'FREQUENT_RENTER',
          code: '76021',
          promoCodeApplied: false
        }
      ];

      searchRequestDiscounts = [
        {
          vendor: 'ALAMO',
          type: 'FREQUENT_RENTER',
          code: '76021',
          vendorName: 'Alamo'
        },
        {
          vendor: 'HERTZ',
          type: 'CORPORATE_RATE',
          code: '65688',
          vendorName: 'Hertz'
        }
      ];

      expectedSearch = {
        carCompany: 'Shop all',
        discount1: { vendor: 'HERTZ', type: 'CORPORATE_RATE', code: '65688', isValid: true },
        discount2: { vendor: 'ALAMO', type: 'FREQUENT_RENTER', code: '76021', isValid: false },
        dropoffDate: '2019-05-20',
        dropoffLocation: 'ABI',
        dropoffTime: '11:30AM',
        pickupDate: '2019-05-17',
        pickupLocation: 'ABI',
        pickupTime: '11:30AM',
        vehicleType: 'Mid-size'
      };
    });

    const createInitialState = () => {
      const state = {
        app: {
          carBooking: {
            carShoppingResultsPage: {
              searchRequest: null,
              carResults: null,
              response: {}
            }
          }
        }
      };

      return state;
    };

    const createState = (discount = searchRequestDiscounts, promoCodes = []) => {
      const state = {
        app: {
          carBooking: {
            carShoppingResultsPage: {
              searchRequest: {
                pickUp: 'ABI',
                dropOff: 'ABI',
                pickUpDate: '2019-05-17',
                dropOffDate: '2019-05-20',
                pickUpTime: '11:30AM',
                dropOffTime: '11:30AM',
                carCompany: 'Shop all',
                discount,
                vehicleType: 'Mid-size',
                pickUpAirport: {
                  airport: {
                    code: 'ABI',
                    airportName: 'Abilene, TX - ABI'
                  },
                  city: 'Abilene',
                  state: 'TX'
                },
                dropOffAirport: {
                  airport: {
                    code: 'ABI',
                    airportName: 'Abilene, TX - ABI'
                  },
                  city: 'Abilene',
                  state: 'TX'
                }
              },
              response: {
                promoCodes
              }
            }
          }
        }
      };

      return state;
    };

    it('should generate a search request when search page is initially loaded and before the Find Cars button is pressed', () => {
      const state = createInitialState();
      const search = getSearch(state);

      expect(search).to.deep.equal({
        carCompany: undefined,
        dropoffDate: undefined,
        dropoffLocation: undefined,
        dropoffTime: undefined,
        pickupDate: undefined,
        pickupLocation: undefined,
        pickupTime: undefined,
        vehicleType: undefined
      });
    });

    it('should generate a search request without discount codes', () => {
      const expectedSearchWithoutDiscounts = _.merge({}, expectedSearch, {
        discount1: emptyDiscount,
        discount2: emptyDiscount
      });
      const state = createState();

      const search = getSearch(state);

      expect(search).to.deep.equal(expectedSearchWithoutDiscounts);
    });

    it('should generate a search request with discount codes', () => {
      const state = createState(searchRequestDiscounts, promoCodesWithDiscounts);
      const search = getSearch(state);

      expect(search).to.deep.equal(expectedSearch);
    });
  });
});
