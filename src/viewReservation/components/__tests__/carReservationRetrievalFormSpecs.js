import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FakeClock from 'test/unit/helpers/fakeClock';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { submitForm } from 'test/unit/helpers/enzymeFormTestUtils';
import CarReservationRetrievalForm from 'src/viewReservation/components/carReservationRetrievalForm';

describe('carReservationRetrievalForm', () => {
  let carReservationRetrievalFormWrapper;

  context('confirmation number validation', () => {
    it('should only contain alphanumeric characters', () => {
      carReservationRetrievalFormWrapper = createComponent({
        initialFormData: {
          confirmationNumber: '^*&(*&(U34123'
        }
      });

      submitForm(carReservationRetrievalFormWrapper);

      expect(carReservationRetrievalFormWrapper.find('.field--error-msg')).to.have.text(
        'Enter a valid 1 to 20 digit alphanumeric confirmation number.'
      );
    });

    it('should be between 1 and 20 characters', () => {
      carReservationRetrievalFormWrapper = createComponent({
        initialFormData: {
          confirmationNumber: '123456789012345678901'
        }
      });

      submitForm(carReservationRetrievalFormWrapper);

      expect(carReservationRetrievalFormWrapper.find('.field--error-msg')).to.have.text(
        'Enter a valid 1 to 20 digit alphanumeric confirmation number.'
      );
    });
  });

  it('should contain a select field for entering pickup date', () => {
    carReservationRetrievalFormWrapper = createComponent();
    expect(carReservationRetrievalFormWrapper.find('FormSelectField')).to.be.present();
  });

  context('when pickup date field is rendered', () => {
    let pickupDate;

    beforeEach(() => {
      FakeClock.setTimeTo('2016-01-01T01:00:00.000');

      carReservationRetrievalFormWrapper = createComponent({ lastBookableDate: '2016-03-01' });
      pickupDate = carReservationRetrievalFormWrapper.find('FormSelectField');

      FakeClock.tick();
    });

    afterEach(() => {
      FakeClock.restore();
    });

    it('should have starting pickup date as 6 months before today', () => {
      const firstOption = pickupDate.find('option').at(1);

      expect(firstOption).to.have.text('July 1, 2015');
      expect(firstOption).to.have.attr('value', '2015-07-01');
    });

    it('should have ending pickup date as last air bookable date', () => {
      const lastOption = pickupDate.find('option').last();

      expect(lastOption).to.have.text('March 1, 2016');
      expect(lastOption).to.have.attr('value', '2016-03-01');
    });

    it('should display Pickup date as placeholder', () => {
      const pickupDataPlaceholder = carReservationRetrievalFormWrapper.find('FormSelectField');

      expect(pickupDataPlaceholder).to.contain.text('Pickup date');
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      lastBookableDate: '2018-11-11',
      formId: 'formId',
      onSubmit: () => {},
      initialFormData: {
        confirmationNumber: '',
        firstName: '',
        lastName: '',
        pickupDate: ''
      }
    };

    return mount(
      <Provider store={createMockedFormStore()}>
        <CarReservationRetrievalForm {..._.merge(defaultProps, props)} />
      </Provider>
    );
  };
});
