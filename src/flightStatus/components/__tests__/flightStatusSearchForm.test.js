import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FlightStatusSearchForm from 'src/flightStatus/components/flightStatusSearchForm';
import FakeClock from 'test/unit/helpers/fakeClock';

describe('FlightStatusSearchForm', () => {
  let submitMock;
  let updateSelectedAirportInfoFnMock;

  beforeEach(() => {
    submitMock = jest.fn();
    updateSelectedAirportInfoFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields', () => {
    const { container } = createComponent();

    expect(container.querySelector('.search-flights--form')).not.toBeNull();
    expect(container.querySelector('[data-qa="flight-status-search"]')).not.toBeNull();
    expect(container.querySelectorAll('.search-flights--form-input')[0]).not.toBeNull();
    expect(container.querySelectorAll('.search-flights--form-input')[1]).not.toBeNull();
    expect(container.querySelectorAll('.search-flights--form-input')[2]).not.toBeNull();
    expect(container.querySelectorAll('.search-flights--form-input')[3]).not.toBeNull();
    expect(container.querySelector('.button--yellow')).not.toBeNull();
  });

  it('should call onSubmit when form is submitted', () => {
    const props = {
      initialFormData: {
        originAirport: 'DAL',
        destinationAirport: 'AUS',
        flightNumber: '100',
        selectedDate: '2018-03-23'
      }
    };

    const { container } = createComponent(props);

    fireEvent.submit(container.querySelector('Form'));

    expect(submitMock).toHaveBeenCalledWith(props.initialFormData);
  });

  describe('Date selector field', () => {
    const expectedOptions = [
      { label: 'Yesterday, Oct 01', value: '2018-10-01' },
      { label: 'Today, Oct 02', value: '2018-10-02' },
      { label: 'Tomorrow, Oct 03', value: '2018-10-03' }
    ];

    beforeEach(() => {
      FakeClock.setTimeTo('2018-10-02T13:15');
      expectedOptions;
    });

    afterEach(() => {
      FakeClock.restore();
    });

    it('should render date options in the correct format', () => {
      const { container } = createComponent();

      expect(container.querySelector('select[name="selectedDate"]')).toMatchSnapshot();
    });
  });

  const createComponent = (props) => {
    const mockStore = createMockedFormStore();

    const defaultProps = {
      formId: 'SEARCH-FORM',
      onSubmit: submitMock,
      allAirports: [],
      recentlySearched: [],
      updateSelectedAirportInfoFn: updateSelectedAirportInfoFnMock
    };
    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={mockStore}>
        <FlightStatusSearchForm {...finalProps} />
      </Provider>
    );
  };
});
