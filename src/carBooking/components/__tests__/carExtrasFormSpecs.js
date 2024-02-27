import { sandbox } from 'sinon';
import { createComponent } from 'test/unit/helpers/testUtils';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import CarReservationBuilder from 'test/builders/model/carReservationBuilder';
import CarExtrasForm from 'src/carBooking/components/carExtrasForm';

const sinon = sandbox.create();

describe('carExtrasForm', () => {
  let wrapper;
  let onSubmitStub;
  let pushStub;
  let props;
  let carExtras;

  beforeEach(() => {
    onSubmitStub = sinon.stub();
    pushStub = sinon.stub();
    const state = {
      app: {},
      router: {
        location: {
          search: ''
        }
      }
    };

    carExtras = [
      { type: 'SKI_RACK', description: 'Ski Rack' },
      { type: 'GPS', description: 'GPS' }
    ];

    props = {
      formId: 'formid',
      carExtras,
      productId: 'product-id',
      carReservation: new CarReservationBuilder().build(),
      onSubmit: onSubmitStub,
      className: '',
      push: pushStub
    };

    wrapper = createComponent(CarExtrasForm, { state, props });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('submit form', () => {
    it('should call onSubmit with the selected extras', () => {
      const firstCheckBox = wrapper.find('[data-qa="car-booking-extras-checkbox-0"]').find('.checkbox-button--mark');

      click(firstCheckBox);
      submitForm(wrapper.find(CarExtrasForm));

      expect(onSubmitStub).to.have.been.calledWith({ SKI_RACK: true, GPS: '' });
    });
  });
});
