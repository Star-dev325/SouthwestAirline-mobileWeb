import { sandbox } from 'sinon';
import dayjs from 'dayjs';
import _ from 'lodash';
import { createComponent } from 'test/unit/helpers/testUtils';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import { getCarLocations } from 'test/builders/model/carLocationsBuilder';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';
import { CAR_BOOKING_PICKUP_CITY_MODAL_ID, CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT } from 'src/carBooking/constants/carBookingConstants';
import CarBookingSearchForm from 'src/carBooking/components/carBookingSearchForm';

const sinon = sandbox.create();

describe('CarBookingSearchForm', () => {
  let onSubmitStub;
  let component;

  beforeEach(() => {
    onSubmitStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  const createFormComponent = (props = {}, state = {}, modalId = CAR_BOOKING_PICKUP_CITY_MODAL_ID) => {
    const selectedSearchRequest = {
      dropOff: 'ABI',
      dropOffDate: '2020-03-15',
      dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
      pickUp: 'ABR',
      pickUpDate: '2020-03-12',
      pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
      vehicleType: 'Mid-size'
    };
    const defaultProps = {
      formId: 'formId',
      lastBookableDate: dayjs().add(90, 'days'),
      carLocations: getCarLocations(),
      carVendors: CarVendorsBuilder.build(),
      onSubmit: onSubmitStub,
      selectedSearchRequest
    };
    const mergedProps = _.merge({}, defaultProps, props);
    const defaultState = {
      app: {},
      router: {
        location: {
          search: `_modal=${modalId}`
        }
      }
    };

    const mergedState = _.merge({}, defaultState, state);

    const wrapper = createComponent(CarBookingSearchForm, { state: mergedState, props: mergedProps });

    return wrapper;
  };

  context('display', () => {
    it('should show pickup and dropoff stations field', () => {
      component = createFormComponent();

      expect(component.find('CarBookingCitySelectorField')).to.exist;
    });

    it('should show pickup and dropoff dates field', () => {
      component = createFormComponent();

      expect(component.find('CarBookingDateSelectorField')).to.exist;
    });

    it('should show pickup and dropoff times fields', () => {
      component = createFormComponent();

      expect(component.find('CarBookingTimeSelector').length).to.be.equal(2);
      expect(component.find('.icon_car-booking-time')).to.exist;
    });

    it('should show vehicle type field', () => {
      component = createFormComponent();

      expect(component.find('CarBookingVehicleSelector').length).exist;
    });

    it('should show car companies field', () => {
      component = createFormComponent();

      expect(component.find('CarBookingCompanySelectorField').length).exist;
    });

    it('should show promo/discount field', () => {
      component = createFormComponent();

      expect(component.find('CarBookingPromoCodeSelectorField').length).exist;
    });

    it('should show find cars button', () => {
      component = createFormComponent();

      expect(component.find('Button[role="submit"]')).to.have.text('Find cars');
    });

    it('should show selected search request in form when a search request is selected', () => {
      const selectedSearchRequest = {
        dropOff: 'ABI',
        dropOffDate: '2020-03-15',
        dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        pickUp: 'DAL',
        pickUpDate: '2020-03-12',
        pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        vehicleType: 'Mid-size',
        carCompany: 'Shop all',
        discount: [],
        dropOffAirport: {
          airPort: { code: 'ABI', airportName: 'Abilene, TX - ABI' },
          city: 'Abilene',
          state: 'TX'
        },
        pickUpAirPort: {
          airPort: { code: 'DAL', airportName: 'Dallas, TX - Luv Field' },
          city: 'Dallas',
          state: 'TX'
        }
      };

      component = createFormComponent({ selectedSearchRequest });

      expect(component.find('[data-qa="car-pick-up"]')).to.contain.text('DAL');
    });

    it('should favour the formData over vendors from selected search request for car company field.', () => {
      const selectedSearchRequest = {
        discount: [],
        dropOff: 'ABI',
        dropOffAirport: {
          airPort: { code: 'ABI', airportName: 'Abilene, TX - ABI' },
          city: 'Abilene',
          state: 'TX'
        },
        dropOffDate: '2020-03-15',
        dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        pickUp: 'DAL',
        pickUpAirPort: {
          airPort: { code: 'DAL', airportName: 'Dallas, TX - Luv Field' },
          city: 'Dallas',
          state: 'TX'
        },
        pickUpDate: '2020-03-12',
        pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        vehicleType: 'Mid-size',
        vendors: [{ vendorId: 'FX' }]
      };
      const state = {
        app: {
          formData: {
            formId: {
              data: {
                carCompany: [{ vendorId: 'AVIS' }]
              }
            }
          }
        }
      };

      component = createFormComponent({ selectedSearchRequest }, state);

      expect(component.find('[data-qa="car-booking-company"]')).to.contain.text('Avis');
    });

    it('should use vendors from selected search request when the formData carCompany state is empty ', () => {
      const selectedSearchRequest = {
        discount: [],
        dropOff: 'ABI',
        dropOffDate: '2020-03-15',
        dropOffTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        pickUp: 'DAL',
        dropOffAirport: {
          airPort: { code: 'ABI', airportName: 'Abilene, TX - ABI' },
          city: 'Abilene',
          state: 'TX'
        },
        pickUpDate: '2020-03-12',
        pickUpAirPort: {
          airPort: { code: 'DAL', airportName: 'Dallas, TX - Luv Field' },
          city: 'Dallas',
          state: 'TX'
        },
        pickUpTime: CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
        vehicleType: 'Mid-size',
        vendors: [{ vendorId: 'FX' }]
      };

      component = createFormComponent({ selectedSearchRequest });

      expect(component.find('[data-qa="car-booking-company"]')).to.contain.text('Fox');
    });
  });

  context('submit', () => {
    it('should call onsubmit function when form is submitted with all required data', () => {
      component = createFormComponent();

      component.find('CarBookingCitySelectorField').prop('onChange')({
        pickUp: 'FAKE',
        dropOff: 'CITIES'
      });
      submitForm(component.find('Form'));

      expect(onSubmitStub).to.be.called;
      expect(onSubmitStub.args[0][0]).to.deep.contain({
        departureAndReturnCities: {
          pickUp: 'FAKE',
          dropOff: 'CITIES'
        }
      });
    });
  });

  context('styles', () => {
    it('should not have clean class on time selectors when search request is present', () => {
      component = createFormComponent();

      expect(component.find('CarBookingTimeSelector[name="pickUpTime"] div.select-input')).to.not.have.className(
        'clean'
      );
      expect(component.find('CarBookingTimeSelector[name="dropOffTime"] div.select-input')).to.not.have.className(
        'clean'
      );
    });

    it('should have clean class on time selectors when search request is empty', () => {
      component = createFormComponent({
        selectedSearchRequest: null,
        isSubmitted: false
      });

      expect(component.find('CarBookingTimeSelector[name="pickUpTime"] div.select-input')).to.have.className('clean');
      expect(component.find('CarBookingTimeSelector[name="dropOffTime"] div.select-input')).to.have.className('clean');
    });

    it('should remove clean class from time selectors when form is submitted', () => {
      component = createFormComponent({
        selectedSearchRequest: null,
        isSubmitted: true
      });

      expect(component.find('select[name="pickUpTime"]')).to.not.have.className('clean');
      expect(component.find('select[name="dropOffTime"]')).to.not.have.className('clean');
    });

    it('should remove clean class when pickUp time selector is clicked', () => {
      component = createFormComponent({
        selectedSearchRequest: null
      });
      const pickUpTimeWrapper = component.find('.car-time-selector').at(0);

      click(pickUpTimeWrapper.find('select.dropdown'));

      expect(pickUpTimeWrapper.find('div.select-input')).to.not.have.className('clean');
    });

    it('should remove clean class when dropOff time selector is clicked', () => {
      component = createFormComponent({
        selectedSearchRequest: null
      });
      const dropOffTimeWrapper = component.find('.car-time-selector').at(1);

      click(dropOffTimeWrapper.find('select.dropdown'));

      expect(dropOffTimeWrapper.find('div.select-input')).to.not.have.className('clean');
    });
  });
});
