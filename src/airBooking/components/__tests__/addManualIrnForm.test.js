import { fireEvent, render } from '@testing-library/react';
import AddManualIrnForm from 'src/airBooking/components/addManualIrnForm';
import React from 'react';
import { AIR_BOOKING_ADD_MANUAL_IRN } from 'src/shared/constants/formIds';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { Provider } from 'react-redux';

describe('AddManualIrn', () => {
  let onCancelStub;
  let onSubmitStub;

  describe('when callbacks are called', () => {
    beforeEach(() => {
      onCancelStub = jest.fn();
      onSubmitStub = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call onCancel if cancel button is clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.action-bar-buttons--item button'));

      expect(onCancelStub).toHaveBeenCalled();
    });

    it('should default to previously entered IRN', () => {
      const { container } = createComponent({ selectedIrn: { name: 'manualIrn', manuallyEntered: true } });

      expect(container).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      onCancel: onCancelStub,
      formId: AIR_BOOKING_ADD_MANUAL_IRN,
      irnRequired: true,
      onSubmit: onSubmitStub
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore()}>
        <AddManualIrnForm {...newProps} />
      </Provider>
    );
  };
});
