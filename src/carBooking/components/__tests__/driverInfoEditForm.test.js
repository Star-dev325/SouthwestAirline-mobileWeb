import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import DriverInfoEditForm from 'src/carBooking/components/driverInfoEditForm';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('DriverInfoEditForm', () => {
  let driverInfo;
  let onSubmitStub;

  beforeEach(() => {
    driverInfo = {
      accountNumber: '10000',
      firstName: 'Amber',
      lastName: 'Awesome'
    };
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createFormComponent = (props = {}) => {
    const defaultProps = {
      formId: 'formId',
      initialFormData: { ...driverInfo },
      onSubmit: onSubmitStub
    };
    const mergedProps = { ...defaultProps, ...props };
    const state = {
      app: {},
      router: {
        location: {
          search: ''
        }
      }
    };
    const { container } = createComponent(DriverInfoEditForm, { state, props: mergedProps });

    return container.querySelector('.car-booking-driver-info-edit-form');
  };

  describe('render', () => {
    it('should render name and accountNumber fields with default values', () => {
      const component = createFormComponent();

      expect(component.querySelector('input[name="firstName"]')).toHaveAttribute('value', driverInfo.firstName);
      expect(component.querySelector('input[name="lastName"]')).toHaveAttribute('value', driverInfo.lastName);
      expect(component.querySelector('input[name="accountNumber"]')).toHaveAttribute('value', driverInfo.accountNumber);
    });
  });

  describe('submit', () => {
    it('should call onSubmit when form is submitted', () => {
      const component = createFormComponent();

      fireEvent.submit(component);

      expect(onSubmitStub).toHaveBeenCalledWith({
        accountNumber: '10000',
        firstName: 'Amber',
        lastName: 'Awesome',
        middleName: ''
      });
    });
  });
});
