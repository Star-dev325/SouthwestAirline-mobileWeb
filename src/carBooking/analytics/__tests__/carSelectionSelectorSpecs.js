import _ from 'lodash';
import { getCarSelection as carSelection } from 'src/carBooking/analytics/carSelectionSelector';

describe('carSelection Selector', () => {
  let state;
  let selectedExtras;
  let selectedCar;
  let carReservationDetail;
  let expectedResult;

  beforeEach(() => {
    selectedExtras = ['SKI_RACK'];

    selectedCar = {
      vendorName: 'Hertz',
      pricePerDayCents: 5550,
      totalCentsWithTaxes: 16650,
      productId: 'eyIwIjoiMjAxOS0wNS0xOFQxZUFQzMjQ1NC0yNTAzIiw',
      imageUrl: '/content/mkt/images/car_vendors/Hertz_Logo_results.png',
      incentiveText: 'Earn up to 600 points',
      isUnavailable: false,
      isRapidRewardsPartner: true,
      promoCodeApplied: true,
      appliedDiscount: { code: '12345' }
    };

    carReservationDetail = {
      carType: 'Mid-size',
      promoCodeApplied: true,
      selectedCarExtras: [],
      dailyRate: {
        perQuantity: '3 Days',
        cents: 4028
      },
      baseRate: 12083,
      totalPrice: 16650,
      taxes: [
        {
          type: 'Tax',
          cents: 1513
        },
        {
          type: 'AIRPORT CONCESSION RECOVERY:',
          cents: 1423
        },
        {
          type: 'CUSTOMER FACILITY CHARGE:',
          cents: 900
        },
        {
          type: 'PROPERTY TAX, TITLE/LICENSE REIMBURSEMENT:',
          cents: 582
        },
        {
          type: 'ENERGY SURCHARGE:',
          cents: 149
        }
      ],
      vendorImage: '/content/mkt/images/car_vendors/Hertz_Logo_results.png',
      mileage: {
        cents: 0,
        freeMileage: 'Unlimited',
        per: 'Mile'
      },
      rrIncentiveText: 'Earn up to 600 points',
      rentalDeskLocation: 'We are unable to provide the rental car location.'
    };

    state = {};
    _.set(state, 'app.carBooking.carPricingPage.carReservation.carReservationDetail', carReservationDetail);
    _.set(state, 'app.carBooking.carPricingPage.selectedCar', selectedCar);
    _.set(state, 'app.carBooking.carPricingPage.selectedExtras', selectedExtras);

    expectedResult = {
      selectedCarProduct: {
        baseRate: 12083,
        carPromo: '12345',
        carType: 'Mid-size',
        isRapidRewardsPartner: true,
        isUnavailable: false,
        mileage: { cents: 0, freeMileage: 'Unlimited', per: 'Mile' },
        pricePerDayCents: 5550,
        promoCodeApplied: true,
        rrIncentiveText: 'Earn up to 600 points',
        taxes: [
          { type: 'Tax', cents: 1513 },
          { type: 'AIRPORT CONCESSION RECOVERY:', cents: 1423 },
          { type: 'CUSTOMER FACILITY CHARGE:', cents: 900 },
          { type: 'PROPERTY TAX, TITLE/LICENSE REIMBURSEMENT:', cents: 582 },
          { type: 'ENERGY SURCHARGE:', cents: 149 }
        ],
        totalCentsWithTaxes: 16650,
        vendorName: 'Hertz'
      },
      selectedExtras
    };
  });

  it('should generate carSelection', () => {
    const result = carSelection(state);

    expect(result).to.deep.equal(expectedResult);
  });

  it('should generate carSelection result when redux state is INIT', () => {
    state = {};
    _.set(state, 'app.carBooking.carPricingPage.carReservation', {});
    _.set(state, 'app.carBooking.carPricingPage.selectedCar', {});
    _.set(state, 'app.carBooking.carPricingPage.selectedExtras', []);

    const result = carSelection(state);

    expect(result).to.deep.equal({
      selectedCarProduct: {},
      selectedExtras: []
    });
  });
});
