import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import FakeClock from 'test/unit/helpers/fakeClock';
import { LowFareCalendarDateSelectPage } from 'src/airBooking/pages/lowFareCalendarDateSelectPage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { Provider } from 'react-redux';

describe('lowFareCalendarPage', () => {
  let goBackStub;
  let getLowFareCalendarFnStub;

  beforeEach(() => {
    FakeClock.setTimeTo('2019-01-15T11:19');
    getLowFareCalendarFnStub = jest.fn().mockImplementation(() => Promise.resolve());
    goBackStub = jest.fn();
  });

  afterEach(() => {
    FakeClock.restore();
  });

  describe('render', () => {
    it('should render calendar component', () => {
      const { getByText } = createComponent();

      expect(getByText('Select Dates')).toBeInTheDocument();
    });
    it('should render the roundtrip calendar style for roundtrip bookings', () => {
      const { getByText } = createComponent();

      expect(getByText('DEPART')).toBeInTheDocument();
      expect(getByText('1/15/20')).toBeInTheDocument();
      expect(getByText('RETURN')).toBeInTheDocument();
      expect(getByText('1/17/20')).toBeInTheDocument();
    });

    it('should render the one-way calendar style for one-way bookings', () => {
      const { getByText } = createComponent({
        searchRequest: {
          departureDate: '2020-01-15',
          returnDate: null,
          tripType: 'oneWay',
          currencyType: 'USD',
          isRoundTrip: true,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        }
      });

      expect(getByText('DEPART')).toBeInTheDocument();
      expect(getByText('1/15/20')).toBeInTheDocument();
    });
    it('should render with only the departure date selected when inbound selected date is null', () => {
      const { getByText } = createComponent({
        lowFareCalendarSelectedDates: {
          outboundDate: '2020-01-15',
          inboundDate: null
        }
      });

      expect(getByText('RETURN')).toBeInTheDocument();
      expect(getByText('Select Date')).toBeInTheDocument();
    });
    it('should render with no dates selected when outbound and inbound selected dates are null', () => {
      const { getByText } = createComponent({
        lowFareCalendarSelectedDates: {
          outboundDate: null,
          inboundDate: null
        }
      });

      expect(getByText('DEPART')).toBeInTheDocument();
      expect(getByText('Select Date')).toBeInTheDocument();
      expect(getByText('RETURN')).toBeInTheDocument();
      expect(getByText('- / - / -')).toBeInTheDocument();
    });
    it('should render with no dates selected when only inbound is selected', () => {
      const { getByText } = createComponent({
        lowFareCalendarSelectedDates: {
          outboundDate: null,
          inboundDate: '2020-01-17'
        }
      });

      expect(getByText('DEPART')).toBeInTheDocument();
      expect(getByText('Select Date')).toBeInTheDocument();
      expect(getByText('RETURN')).toBeInTheDocument();
      expect(getByText('- / - / -')).toBeInTheDocument();
    });
  });

  describe('submit', () => {
    it('should call LFC endpoint with selected dates for roundtrip bookings', () => {
      const { container } = createComponent({});

      fireEvent.click(container.querySelector('.done'));

      expect(getLowFareCalendarFnStub).toHaveBeenCalledWith(
        {
          departureDate: '2020-01-15',
          returnDate: '2020-01-17',
          tripType: 'roundTrip',
          currencyType: 'USD',
          isRoundTrip: true,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        },
        undefined,
        false
      );
    });

    it('should call LFC endpoint with selected dates for one-way bookings', () => {
      const { container } = createComponent({
        searchRequest: {
          departureDate: '2020-01-15',
          returnDate: null,
          tripType: 'oneWay',
          currencyType: 'USD',
          isRoundTrip: true,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        },
        lowFareCalendarSelectedDates: {
          outboundDate: '2020-01-15',
          inboundDate: null
        }
      });

      fireEvent.click(container.querySelector('.done'));

      expect(getLowFareCalendarFnStub).toHaveBeenCalledWith(
        {
          departureDate: '2020-01-15',
          returnDate: null,
          tripType: 'oneWay',
          currencyType: 'USD',
          isRoundTrip: true,
          numberOfAdults: 1,
          promoCode: '',
          origin: 'AUS',
          destination: 'ATL'
        },
        undefined,
        false
      );
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      goBack: goBackStub,
      searchRequest: {
        departureDate: '2020-01-15',
        returnDate: '2020-01-26',
        tripType: 'roundTrip',
        currencyType: 'USD',
        isRoundTrip: true,
        numberOfAdults: 1,
        promoCode: '',
        origin: 'AUS',
        destination: 'ATL'
      },
      lowFareCalendarSelectedDates: {
        outboundDate: '2020-01-15',
        inboundDate: '2020-01-17'
      },
      getLowFareCalendarFn: getLowFareCalendarFnStub,
      lastBookableDate: '2020-05-17',
      title: 'Select Dates'
    };

    const pageProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <LowFareCalendarDateSelectPage {...pageProps} />
      </Provider>
    );
  };
});
