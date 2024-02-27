jest.mock('src/airports/components/airportList', () => (props) => (
  <>
    <div className="test-airport-list-cancel" onClick={() => props.onCancel()}></div>
    <div className="test-airport-list" onClick={() => props.onAirportSelect(props.allAirports?.[0], true)}>
      AirportList
    </div>
  </>
));
jest.mock('src/shared/components/fullScreenModal/fullScreenModal', () => (props) => <div>{props.children}</div>);
jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper');

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import * as AirportInfoActions from 'src/airports/actions/airportInfoActions';
import * as AirportsHelpers from 'src/airports/helpers/airportsHelpers';
import * as FullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import AirportSelectorField from 'src/shared/form/fields/airportSelectorField';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('airportSelectorField', () => {
  const mockAirport = {
    code: 'AUS',
    cityState: 'TX',
    airportName: 'Austin'
  };
  const washingtonAreaAirport = 'Washington, D.C. Area Airports';

  let onSubmitMock, showModalMock, updateSelectedAirportInfoFnMock;

  beforeEach(() => {
    onSubmitMock = jest.fn();
    showModalMock = jest.fn();
    updateSelectedAirportInfoFnMock = jest.spyOn(AirportInfoActions, 'updateSelectedAirportInfo');
    jest.spyOn(AirportsHelpers, 'getAirportFromCode').mockReturnValue(mockAirport);
    jest
      .spyOn(AirportsHelpers, 'getMultiSelectOriginDestinationShortDisplayName')
      .mockReturnValue(getMultiSelectGroup()['Boston Area Airports'][0]);

    jest.spyOn(FullScreenModalHelper, 'showFullScreenModal').mockImplementation(showModalMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display AirportList', () => {
    const { container } = createComponent({});

    expect(container).toMatchSnapshot();
  });

  it('should not display airport not found label', () => {
    const { container } = createComponent({ allAirports: null });

    expect(container).toMatchSnapshot();
  });

  it('should trigger selectAirport action when user select airport and should call the updateSelectedAirportInfo redux action', () => {
    const { container } = createComponent({ allAirports: [{}] });

    const elem = container.querySelector('.test-airport-list');

    fireEvent.click(elem);

    expect(updateSelectedAirportInfoFnMock).toBeCalledWith({
      from: {
        isCurrentLocation: true
      }
    });
  });

  it('should trigger selectAirport action when user select airport and should call the cancel redux action', () => {
    const { container } = createComponent({ allAirports: [{}] });

    const elem = container.querySelector('.test-airport-list-cancel');

    fireEvent.click(elem);

    expect(updateSelectedAirportInfoFnMock).not.toBeCalled();
  });

  it('should pass the correct data to form when user submit', () => {
    const airport = {
      code: 'DAL',
      cityState: 'TX',
      airportName: 'Dallas (Love Field)'
    };

    const { container } = createComponent({ allAirports: [airport] });

    const elem = container.querySelector('.test-airport-list');

    fireEvent.click(elem);

    container.querySelector('form').submit();

    expect(onSubmitMock).toHaveBeenCalledWith({ from: 'DAL' });
  });

  it('should display description when description exists and not have value', () => {
    const { container } = createComponent({ description: 'hello world', value: undefined });

    expect(container).toMatchSnapshot();
  });

  it('should display description when description not exist and not have value', () => {
    const { container } = createComponent({ value: undefined });

    expect(container).toMatchSnapshot();
  });

  it('should render with native style', () => {
    const { container } = createComponent({ usingNativeStyle: true });

    expect(container).toMatchSnapshot();
  });

  it('should not render error icon with native style and horizontal layout', () => {
    const { container } = createComponent({ usingNativeStyle: true, horizontalLayout: true });

    expect(container).toMatchSnapshot();
  });

  it('should display icon when using native style and passed iconType', () => {
    const { container } = createComponent({ usingNativeStyle: true, iconType: 'pin' });

    expect(container).toMatchSnapshot();
  });

  it('should display icon when using native style and without iconType', () => {
    const { container } = createComponent({ usingNativeStyle: true, iconType: null });

    expect(container).toMatchSnapshot();
  });

  it('should display description when using native style and passed description', () => {
    const { container } = createComponent({ usingNativeStyle: true, description: 'description' });

    expect(container).toMatchSnapshot();
  });

  it('should display airport as disabled when pass disabled property', () => {
    const { container } = createComponent({ disabled: true });

    expect(container).toMatchSnapshot();
  });

  it('should do nothing on click when disabled property is true', () => {
    const onClickMock = jest.fn();
    const { container } = createComponent({ disabled: true, onClick: onClickMock });

    fireEvent.click(container.querySelector('.clickable-div.input'));
    expect(showModalMock).not.toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should call showFullScreenModal on click when disabled property is false', () => {
    const onClickMock = jest.fn();
    const { container } = createComponent({ disabled: false, onClick: onClickMock });

    fireEvent.click(container.querySelector('.clickable-div.input'));
    expect(showModalMock).toHaveBeenCalled();
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should call showFullScreenModal on click when disabled property is false', () => {
    const { container } = createComponent({ disabled: false });

    fireEvent.click(container.querySelector('.clickable-div.input'));
    expect(showModalMock).toHaveBeenCalled();
  });

  it('should render icon with native style when MWEB_HOMEPAGE_REDESIGN is true', () => {
    const { container } = createComponent({
      description: 'description',
      MWEB_HOMEPAGE_REDESIGN: true,
      usingNativeStyle: true,
      value: undefined
    });

    expect(container.querySelector('.icon')).toMatchSnapshot();
  });

  describe('multiSelectGroup', () => {
    it('should use airportGroupShortDisplayName, airportGroupSubtitle when multiselectgroups are selected', () => {
      const { container } = createComponent({
        isMultiSelectGroupEnabled: true,
        multiSelectGroup: {
          origin: ['BOS', 'BDL', 'MHT', 'PVD']
        },
        name: 'origin',
        value: 'Boston Area Airports'
      });

      expect(container).toMatchSnapshot();
    });

    it('should use small font size when select a multi word co-terminal like Washington DC that has a word in the name with more characters than the Magic Number', () => {
      const { container } = createComponent({
        allAirports: getMultiSelectGroup()[washingtonAreaAirport],
        horizontalLayout: true,
        isMultiSelectGroupEnabled: true,
        multiSelectGroup: {
          origin: ['BWI', 'DCA', 'IAD']
        },
        name: 'origin',
        usingNativeStyle: true,
        value: washingtonAreaAirport
      });

      expect(container).toMatchSnapshot();
    });
  });

  function createComponent(props = {}) {
    const MockedForm = createMockedForm(createMockedFormStore());

    const defaultProps = {
      allAirports: [],
      closeModal: jest.fn(),
      disabled: false,
      iconType: 'airplane-depart',
      isMultiSelectGroupEnabled: false,
      isReaccomCoTerminalEligible: false,
      modalId: 'from',
      placeholder: 'From',
      recentlySearched: [],
      showModal: jest.fn(),
      updateSelectedAirportInfoFn: updateSelectedAirportInfoFnMock
    };

    const component = (
      <MockedForm initialFormData={{ from: 'AUS' }} onSubmit={onSubmitMock}>
        <AirportSelectorField name="from" {...defaultProps} {...props} />
      </MockedForm>
    );

    return render(component);
  }
});
