import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import SelectPassengersForm from 'src/shared/components/selectPassengersForm';
import { AIR_CHANGE_SELECT_PASSENGERS_FORM } from 'src/shared/constants/formIds';
import {
  getSplitPnrDetails,
  getSplitPnrDetailsWithChildrenPassengers,
  getStateWithFormData,
  stateWithAllSelectedIdsFormData,
  stateWithAllUnSelectedIdsFormData,
  stateWithInvalidEmailFormData,
  stateWithValidEmailFormData
} from 'test/builders/model/selectPassengersPageBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('SelectPassengersForm', () => {
  describe('render', () => {
    it('should render the component correctly', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render the email field with texts when showEmailFieldWithTexts is true', () => {
      const { container } = createComponent({ showEmailFieldWithTexts: true });

      expect(container).toMatchSnapshot();
    });

    it('should render with continue to review button text when showBoundSelection is false', () => {
      const { container } = createComponent({ showEmailFieldWithTexts: true, showBoundSelection: false });

      expect(container).toMatchSnapshot();
    });
  });

  describe('disable passenger toggle', () => {
    it('should disable child passenger type toggles when all passengers are selected', () => {
      const { container } = createComponent(
        { splitPnrDetails: getSplitPnrDetailsWithChildrenPassengers() },
        getStateWithFormData({ id1: true, id2: true, id3: true, id4: true })
      );

      expect(container.querySelectorAll('.toggle-switch_disabled').length).toEqual(2);
    });

    it('should disable child passenger type toggles when all passengers are unselected', () => {
      const { container } = createComponent(
        { splitPnrDetails: getSplitPnrDetailsWithChildrenPassengers() },
        getStateWithFormData({ id1: false, id2: false, id3: false, id4: false })
      );

      expect(container.querySelectorAll('.toggle-switch_disabled').length).toEqual(2);
    });

    it('should disable adult passenger type toggle when single passenger with children is selected', () => {
      const { container } = createComponent(
        { splitPnrDetails: getSplitPnrDetailsWithChildrenPassengers() },
        getStateWithFormData({ id1: false, id2: true, id3: true, id4: true })
      );

      expect(container.querySelectorAll('.toggle-switch_disabled').length).toEqual(1);
    });

    it('should should call onPassengerSelectedFn with passengerId and false arguments when all adult passengers are selected with unselected children', () => {
      const onPassengerSelectedFnStub = jest.fn();

      createComponent(
        { onPassengerSelectedFn: onPassengerSelectedFnStub, splitPnrDetails: getSplitPnrDetailsWithChildrenPassengers() },
        getStateWithFormData({ id1: true, id2: false, id3: true, id4: true })
      );

      expect(onPassengerSelectedFnStub).toHaveBeenCalledWith('id2', false);
    });
  });

  describe('submit form', () => {
    let onSubmitStub;

    beforeEach(() => {
      onSubmitStub = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call onSubmit when formData has selected passengers', () => {
      const { container } = createComponent({ onSubmit: onSubmitStub }, stateWithAllSelectedIdsFormData);
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should call onSubmit when formData has selected passengers and valid email', () => {
      const { container } = createComponent({ onSubmit: onSubmitStub, showEmailFieldWithTexts: true }, stateWithValidEmailFormData);
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should not call onSubmit when formData has no selected passengers', () => {
      const { container } = createComponent({ onSubmit: onSubmitStub }, stateWithAllUnSelectedIdsFormData);
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(onSubmitStub).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when formData has selected passengers, but email is not valid', () => {
      const { container } = createComponent({ onSubmit: onSubmitStub, showEmailFieldWithTexts: true }, stateWithInvalidEmailFormData);
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(onSubmitStub).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      formId: AIR_CHANGE_SELECT_PASSENGERS_FORM,
      onPassengerSelectedFn: () => {},
      onSubmit: () => {},
      showBoundSelection: true,
      showEmailFieldWithTexts: false,
      splitPnrDetails: getSplitPnrDetails()
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <SelectPassengersForm {...finalProps} />
      </Provider>
    );
  };
});
