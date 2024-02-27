import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import AirChangeShoppingSearchForm from 'src/airChange/components/airChangeShoppingSearchForm';
import TripTypes from 'src/shared/constants/tripTypes';
import { getMultiSelectGroup } from 'test/builders/model/multiSelectGroupBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

let updateSelectedAirportInfoFnMock;

describe('AirChangeShoppingSearchForm', () => {
  const defaultInitialFormData = {
    departureAndReturnDate: {
      departureDate: '2018-04-04',
      returnDate: '2018-04-09'
    },
    from: 'AUS',
    to: 'BOI'
  };

  beforeEach(() => {
    updateSelectedAirportInfoFnMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render page properly when allowARNKPnrs is true and both bounds are selected', () => {
      const { container } = createComponent({
        allowARNKPnrs: true,
        selectedBounds: { firstbound: true, secondbound: true }
      });

      expect(container).toMatchSnapshot();
    });

    it('should pass originDisabled to origin airport selector', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should grey out from and to fields when hasUnaccompaniedMinor is true', () => {
      const { container } = createComponent({ hasUnaccompaniedMinor: true });

      expect(container).toMatchSnapshot();
    });

    it('should grey out from and to fields when trip type is one way and both bounds are enabled', () => {
      const { container } = createComponent({
        searchOptions: {
          departureBoundDisabled: false,
          returnBoundDisabled: false,
          tripType: TripTypes.ONE_WAY.value
        }
      });

      expect(container).toMatchSnapshot();
    });

    it('should grey out from and to fields when trip type is one way and departure bound is disabled', () => {
      const { container } = createComponent({
        searchOptions: {
          departureBoundDisabled: true,
          returnBoundDisabled: false,
          tripType: TripTypes.ONE_WAY.value
        }
      });

      expect(container).toMatchSnapshot();
    });

    describe('when isReaccomCoTerminalEligible is true', () => {
      it('should render correctly', () => {
        const { container } = createComponent({
          isReaccomCoTerminalEligible: true,
          isRoundTrip: true,
          searchOptions: {
            departureBoundDisabled: false,
            returnBoundDisabled: false,
            tripType: TripTypes.ROUND_TRIP.value
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should render correctly with reaccomCoTerminalDepartureAirports and reaccomCoTerminalReturnAirports', () => {
        const { container } = createComponent({
          isReaccomCoTerminalEligible: true,
          isRoundTrip: true,
          searchOptions: {
            departureBoundDisabled: false,
            reaccomCoTerminalDepartureAirports: getMultiSelectGroup()['New York Area Airports'],
            reaccomCoTerminalReturnAirports: getMultiSelectGroup()['Boston Area Airports'],
            returnBoundDisabled: false,
            tripType: TripTypes.ROUND_TRIP.value
          }
        });

        expect(container).toMatchSnapshot();
      });

      it('should render correctly when isInvalidDepartureDate is true', () => {
        const state = {
          ...defaultInitialFormData,
          departureAndReturnDate: {
            ...defaultInitialFormData.departureAndReturnDate,
            isInvalidDepartureDate: true,
            isInvalidReturnDate: false
          }
        };
        const { container } = createComponent({
          isReaccomCoTerminalEligible: true,
          isRoundTrip: true,
          searchOptions: {
            departureBoundDisabled: false,
            returnBoundDisabled: false,
            tripType: TripTypes.ROUND_TRIP.value
          }
        }, state);

        expect(container).toMatchSnapshot();
      });
    });
  });

  describe('submit', () => {
    it('should not call onSubmit when flight is the same', () => {
      const onSubmitMock = jest.fn();
      const { container } = createComponent({ onSubmit: onSubmitMock });
      const form = container.querySelector('form');

      fireEvent.submit(form);

      expect(onSubmitMock).toBeCalled();
    });
  });

  const createComponent = (props = {}, initialFormData = defaultInitialFormData) => {
    const defaultProps = {
      allAirports: [],
      allowARNKPnrs: false,
      earliestBookableDate: dayjs('2018-04-04'),
      formData: {
        departureAndReturnDate: {
          isInvalidDepartureDate: false,
          isInvalidReturnDate: false
        }
      },
      formId: 'airChangeShoppingSearchForm',
      hasUnaccompaniedMinor: false,
      isReaccomCoTerminalEligible: false,
      isRoundTrip: false,
      lastBookableDate: dayjs('2018-07-09'),
      onSubmit: () => {},
      recentlySearched: [],
      searchOptions: {
        departureBoundDisabled: false,
        reaccomCoTerminalDates: {
          departureEarliestBookableDate: undefined,
          departureLastBookableDate: undefined,
          returnEarliestBookableDate: undefined,
          returnLastBookableDate: undefined
        },
        returnBoundDisabled: false,
        tripType: 'roundTrip'
      },
      selectedBounds: { firstbound: true, secondbound: false },
      updateSelectedAirportInfoFn: updateSelectedAirportInfoFnMock
    };
    const mergedProps = _.merge({}, defaultProps, props);

    return render(
      <Provider store={createMockedFormStore()}>
        <AirChangeShoppingSearchForm initialFormData={initialFormData} {...mergedProps} />
      </Provider>
    );
  };
});
