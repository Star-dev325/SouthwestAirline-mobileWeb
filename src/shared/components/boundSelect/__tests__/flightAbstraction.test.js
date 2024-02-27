import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import * as airChangeSelectFormTransformer from 'src/airChange/transformers/airChangeSelectFormTransformer';
import FlightAbstraction from 'src/shared/components/boundSelect/flightAbstraction';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('flightAbstraction', () => {
  let getSelectedBoundsKeyStub;

  beforeEach(() => {
    getSelectedBoundsKeyStub = jest.spyOn(airChangeSelectFormTransformer, 'getSelectedBoundsKey').mockReturnValue('firstbound');
  });
  it('should render expected component', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render bounds without checkbox and with ineligibleBoundMessage when ineligibleBoundMessage is populated', () => {
    const ineligibleBoundMessages = ['', 'message2'];
    const { container } = createComponent({ ineligibleBoundMessages });

    expect(container).toMatchSnapshot();
  });

  it('should render bounds with checkbox and without eligibleBoundMessage when eligibleBoundMessage is empty string for a segment', () => {
    const ineligibleBoundMessages = ['', 'message2'];
    const { container } = createComponent({ ineligibleBoundMessages });

    expect(container).toMatchSnapshot();
  });

  it('should render bounds with cancel form names', () => {
    const { container } = createComponent({ boundCancel: true });

    expect(container).toMatchSnapshot();
  });

  describe('dynamic waiver', () => {
    it('should show warning icon for dynamic waiver', () => {
      const { container } = createComponent({
        boundSelections: [new BoundSelectionBuilder().withDynamicWaiver().build()]
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('partial flown', () => {
    it('should have checkbox for both outbound and inbound when selectionMode is ALL', () => {
      const { container } = createComponent({ selectionMode: 'ALL' });

      expect(container).toMatchSnapshot();
    });

    it('should have checkbox for inbound flight when selectionMode is SINGLE', () => {
      const { container } = createComponent({ selectionMode: 'SINGLE' });
      
      expect(container).toMatchSnapshot();
    });

    it('should not have checkbox for flight when selectionMode is NONE', () => {
      const { container } = createComponent({ selectionMode: 'NONE' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('showSwappedBounds', () => {
    it('should call getSelectedBoundsKeyStub', () => {
      createComponent({ showSwappedBounds: true });

      expect(getSelectedBoundsKeyStub).toHaveBeenCalledWith[0];
      expect(getSelectedBoundsKeyStub).toHaveBeenCalledWith[1];
    });

    it('should have the correct data-qa flight type string', () => {
      const { container } = createComponent({ showSwappedBounds: true });

      expect(container).toMatchSnapshot();
    });
  });

  describe('onBoundsSelectedFn', () => {
    it('should call onBoundsSelectedFn when bounds is clicked', () => {
      const onBoundsSelectedFnStub = jest.fn();
      const { container } = createComponent({ selectionMode: 'SINGLE', onBoundsSelectedFn: onBoundsSelectedFnStub });

      fireEvent.click(container.querySelector('.flight-abstraction--table .checkbox-button'));
      expect(onBoundsSelectedFnStub).toBeCalledWith('firstbound', true);
    });
  });

  describe('Select type radio', () => {
    let onBoundsSelectedFnMock;
    let updateFieldStub;

    beforeEach(() => {
      onBoundsSelectedFnMock = jest.fn();
      updateFieldStub = jest.fn();
    });

    it('should render radio options if select type is radio', () => {
      const { container } = createComponent({
        onBoundsSelectedFn: onBoundsSelectedFnMock,
        selectedBound: undefined,
        selectType: 'radio',
        updateField: updateFieldStub
      });

      expect(container).toMatchSnapshot();
      
      fireEvent.click(container.querySelector('.flex-main-center'));

      expect(onBoundsSelectedFnMock).toBeCalledWith('firstbound', true);
    });

    it('should call updateField when selectedBound does not exist and selectType is radio', () => {
      createComponent({
        onBoundsSelectedFn: onBoundsSelectedFnMock,
        selectedBound: undefined,
        selectType: 'radio',
        updateField: updateFieldStub
      });

      expect(updateFieldStub).toBeCalled();
    });

    it('should not call updateField when selectedBound exist', () => {
      createComponent({
        onBoundsSelectedFn: onBoundsSelectedFnMock,
        selectedBound: { firstbound: false, secondbound: true },
        selectType: 'radio',
        updateField: updateFieldStub
      });

      expect(updateFieldStub).not.toBeCalled();
    });
  });

  const createComponent = (props, formOptions = {}) => {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);
    const defaultProps = {
      boundSelections: [
        new BoundSelectionBuilder().build(),
        new BoundSelectionBuilder()
          .withFlight('1234')
          .withFlightType('RETURN')
          .withOriginalDate('2018-04-22')
          .withFrom('Dallas', 'DAX')
          .build()
      ],
      selectionMode: 'ALL',
      selectType: 'checkbox',
      name: 'air-change'
    };

    return render(
      <MockedForm onSubmit={() => {}}>
        <FlightAbstraction {...defaultProps} {...props} />
      </MockedForm>
    );
  };
});
