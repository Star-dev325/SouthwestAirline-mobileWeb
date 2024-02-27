import { fireEvent } from '@testing-library/react';
import ReservationRetrievalForm from 'src/shared/form/components/reservationRetrievalForm';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('Reservation Retrieval Form', () => {
  it('should mark the record locator invalid when field value empty', () => {
    const { container } = createPageComponent({
      initialFormData: {
        recordLocator: '',
        firstName: '',
        lastName: ''
      }
    });

    fireEvent.submit(container.querySelector('form'));

    expect(container.querySelectorAll('.icon')).toHaveLength(3);
  });

  it('should mark field as invalid when field value not correct', () => {
    const { container } = createPageComponent({
      initialFormData: {
        recordLocator: '*23',
        firstName: '23',
        lastName: 'a'
      }
    });

    fireEvent.submit(container.querySelector('form'));

    expect(container.querySelectorAll('.icon')).toHaveLength(3);
  });

  it('should not mark field as invalid when field values are correct', () => {
    const { container } = createPageComponent({
      initialFormData: {
        recordLocator: 'ADJKSD',
        firstName: 'Bob',
        lastName: 'Jackson'
      }
    });

    fireEvent.submit(container.querySelector('form'));

    expect(container.querySelector('.icon')).toBeNull();
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      formId: 'formId',
      onSubmit: () => {}
    };
    const mergedProps = { ...defaultProps, ...props };
    const state = {
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    };

    return createComponent(ReservationRetrievalForm, { state, props: mergedProps });
  };
});
