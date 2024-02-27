import _ from 'lodash';
import { getCarResult } from 'src/carBooking/analytics/carResultSelector';
import * as CarResultsBuilder from 'test/builders/model/carResultsBuilder';

describe('getCarResult selector', () => {
  let state;
  let carResults;

  beforeEach(() => {
    carResults = CarResultsBuilder.build();

    state = {
      app: {
        carBooking: {
          carShoppingResultsPage: {
            searchRequest: {
              vehicleType: 'Mid-size'
            },
            carResults
          }
        }
      }
    };
  });

  it('should generate results', () => {
    const results = getCarResult(state);
    const vehicles = filterOutKeys(carResults.MIDSIZE.allVehicles);

    expect(results).to.deep.equal({
      vehicleType: 'Mid-size',
      vehicles
    });
  });

  const KEYS_TO_KEEP = [
    'appliedDiscount',
    'incentiveText',
    'isRapidRewardsPartner',
    'isUnavailable',
    'pricePerDayCents',
    'promoCodeApplied',
    'totalCentsWithTaxes',
    'vendorName'
  ];

  const filterOutKeys = (allVehicles) => allVehicles.map((value) => _.pick(value, KEYS_TO_KEEP));
});
