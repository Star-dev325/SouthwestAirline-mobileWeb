import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import DriverInfoFields from 'src/carBooking/components/driverInfoFields';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('DriverInfoFields', () => {
  const noop = () => {};
  let satelliteTrackStub;

  beforeEach(() => {
    satelliteTrackStub = jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('track', () => {
    it('should _satellite track when first name is focused', () => {
      const { container } = createComponent();

      fireEvent.focus(container.querySelector('input[name="firstName"]'));

      expect(satelliteTrackStub).toBeCalledWith('form:namedetail');
    });

    it('should _satellite track when email is focused', () => {
      const { container } = createComponent();

      fireEvent.focus(container.querySelector('input[name="accountNumber"]'));

      expect(satelliteTrackStub).toBeCalledWith('form:membernumber');
    });
  });

  const createComponent = () => {
    const MockedForm = createMockedForm(createMockedFormStore(), {});

    return render(
      <MockedForm initialFormData={{}} onSubmit={noop}>
        <DriverInfoFields />
      </MockedForm>
    );
  };
});
