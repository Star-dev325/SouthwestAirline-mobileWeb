import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import FakeClock from 'test/unit/helpers/fakeClock';
import { render, fireEvent } from '@testing-library/react';
import LowFareBound from 'src/airBooking/components/lowFareBound';

const YESTERDAY = '2020-01-16';
const TODAY = '2020-01-17';
const TOMORROW = '2020-01-18';
const UNSELECTABLE_MESSAGE = 'This date is invalid for selection.';

describe('LowFareBound', () => {
  let onClickGetNextCalendarStub, onClickGetPrevCalendarStub, onSelectDateStub;

  beforeEach(() => {
    const noop = () => {};

    FakeClock.setTimeTo(TODAY);
    onClickGetPrevCalendarStub = jest.fn(noop);
    onClickGetNextCalendarStub = jest.fn(noop);
    onSelectDateStub = jest.fn(noop);
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  describe('when low fare bound', () => {
    it('should render month', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="calendar-month-indicator"]')).toHaveTextContent('JAN');
    });

    it('should render low fare pointer', () => {
      const { container } = createComponent();
      const LowFarePointer = container.querySelector('.low-fare-pointer');

      expect(LowFarePointer).toMatchSnapshot();
    });

    it('should set boundClassName property to lfc-outbound', () => {
      const { container } = createComponent();

      expect(container.querySelector('.lfc-outbound')).toBeInTheDocument();
    });

    it('should render 2 low fare price bars', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll('.calendar-day').length).toEqual(2);
    });

    describe('N/A price bar (isDisabled)', () => {
      it('when lowestFare is null should disable price bar', () => {
        const props = {
          lowFareCalendarDays: [
            {
              date: TODAY,
              lowestPrice: null
            }
          ]
        };
        const { container }  = createComponent(props);

        expect(container.querySelector('.calendar-day')).toMatchSnapshot();
      });

      it('should set isDisabled prop to true when lowestFare is pastDate', () => {
        const props = {
          lowFareCalendarDays: [
            {
              date: YESTERDAY,
              lowestPrice: {
                price: {
                  amount: '29,356',
                  currencyCode: 'PTS',
                  currencySymbol: null
                },
                pricePointsTax: {
                  amount: '10.39',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }
            }
          ]
        };
        const { container } = createComponent(props);

        expect(container.querySelector('.calendar-day')).toMatchSnapshot();
      });
    });

    describe('shouldShowUnselectableBars', () => {
      describe('outbound of round trip', () => {
        it('should show price bars after other bound selected bar as unselectable when outbound and shouldShowUnselectableBars is true', () => {
          const { container } = createComponent({
            isInbound: false,
            shouldShowUnselectableBars: true,
            selectedDate: TODAY,
            otherBoundSelectedDate: TODAY
          });

          const lowFarePriceBar = container.querySelectorAll('.calendar-day');

          expect(lowFarePriceBar[1].querySelector('.unselectable')).toBeInTheDocument();
        });
      });

      describe('inbound of round trip', () => {
        it('should show price bars before selected bar as unselectable when inbound and shouldShowUnselectableBars is true', () => {
          const { container } = createComponent({
            isInbound: true,
            shouldShowUnselectableBars: true,
            selectedDate: TOMORROW,
            otherBoundSelectedDate: TOMORROW
          });

          const lowFarePriceBar = container.querySelectorAll('.calendar-day');

          expect(lowFarePriceBar[0].querySelector('.unselectable')).toBeInTheDocument();
        });
      });

      describe('one way', () => {
        it('should not show price bars as unselectable when shouldShowUnselectableBars is false outbound (oneway)', () => {
          const { container } = createComponent({
            isInbound: false,
            shouldShowUnselectableBars: false,
            selectedDate: TODAY
          });

          const lowFarePriceBar = container.querySelectorAll('.calendar-day');

          expect(lowFarePriceBar[0].querySelector('.unselectable')).not.toBeInTheDocument();
          expect(lowFarePriceBar[1].querySelector('.unselectable')).not.toBeInTheDocument();
        });
      });
    });

    describe('toaster dialog', () => {
      it('should not show toaster dialog when LowFareBound is rendered', () => {
        const { baseElement } = createComponent({ isInbound: false, shouldShowUnselectableBars: true, selectedDate: TODAY });
        
        expect(baseElement).toMatchSnapshot();
      });
    });
  });

  describe('display more fares', () => {
    describe('prev fares', () => {
      it('should display next LowFareDisplayMore component when showFetchPrev is true', () => {
        const { container } = createComponent({ showFetchPrev: true });

        expect(container.querySelector('.low-fare-calendar--fetch-prev-next')).toBeInTheDocument();
      });

      it('should not display next LowFareDisplayMore component when showFetchPrev is false', () => {
        const { container } = createComponent({ showFetchPrev: false });

        expect(container.querySelector('.low-fare-calendar--fetch-prev-next')).not.toBeInTheDocument();
      });

      it('should call onClickGetPrevCalendarStub when prev display more is clicked', () => {
        const { container } = createComponent({ showFetchPrev: true });

        fireEvent.click(container.querySelector('.low-fare-calendar--fetch-prev-next'));

        expect(onClickGetPrevCalendarStub).toHaveBeenCalled();
      });

      it('should pass showFetchPrev to prev LowFareDisplayMore component', () => {
        const { container } = createComponent({ showFetchPrev: true, showLoadingPrev: true });

        expect(container.querySelector('.low-fare-calendar--fetch-prev-next')).toMatchSnapshot();
      });
    });

    describe('next fares', () => {
      it('should display next LowFareDisplayMore component when showFetchNext is true', () => {
        const { container } = createComponent({ showFetchNext: true });

        expect(container.querySelector('.low-fare-calendar--fetch-prev-next')).toBeInTheDocument();
      });

      it('should not display next LowFareDisplayMore component when showFetchNext is false', () => {
        const { container } = createComponent({ showFetchNext: false });

        expect(container.querySelector('.low-fare-calendar--fetch-prev-next')).not.toBeInTheDocument();
      });

      it('should call onClickGetPrevCalendarStub when next display more is clicked', () => {
        const { container } = createComponent({ showFetchNext: true });

        fireEvent.click(container.querySelector('.low-fare-calendar--fetch-prev-next'));

        expect(onClickGetNextCalendarStub).toHaveBeenCalled();
      });
    });
    describe('selectedScrollDate', () => {
      it('should use the inboundCenterDate prop', () => {
        const instance = React.createRef();
        const { container } = createComponent({
          isInbound: true,
          shouldShowUnselectableBars: true,
          selectedDate: null,
          otherBoundSelectedDate: '',
          ref: instance
        });

        instance.current.setState({ inboundCenterDate: TOMORROW });
        const flightDate = container.querySelector('.low-fare-date');

        expect(flightDate).toMatchSnapshot();
      });

      it('should use the outboundCenterDate prop', () => {
        const instance = React.createRef();
        const { container } = createComponent({
          isInbound: false,
          shouldShowUnselectableBars: true,
          selectedDate: null,
          otherBoundSelectedDate: '',
          ref: instance
        });

        instance.current.setState({ outboundCenterDate: TOMORROW });
        const flightDate = container.querySelector('.low-fare-date');

        expect(flightDate).toMatchSnapshot();
      });

      it('should use the selectedDate prop for inbound', () => {
        const { container } = createComponent({
          isInbound: true,
          shouldShowUnselectableBars: true,
          selectedDate: TOMORROW,
          otherBoundSelectedDate: ''
        });
        const flightDate = container.querySelector('.low-fare-date');

        expect(flightDate).toMatchSnapshot();
      });

      it('should use the selectedDate prop for outbound', () => {
        const { container } = createComponent({
          isInbound: false,
          shouldShowUnselectableBars: true,
          selectedDate: TOMORROW,
          otherBoundSelectedDate: ''
        });
        const flightDate = container.querySelector('.low-fare-date');

        expect(flightDate).toMatchSnapshot();
      });
    });

    describe('Get Centered Dated', () => {
      it('should iterate a list and find the center date', () => {
        const instance = React.createRef();

        createComponent({ isInbound: false, ref: instance });
        const stub = {
          getElementsByClassName: () => ({
            0: {
              getBoundingClientRect: () => ({
                bottom: 0,
                height: 0,
                left: 237,
                right: 312,
                top: 0,
                width: 0
              }),
              dataset: { date: '2020-3-13' }
            },
            1: {
              getBoundingClientRect: () => ({
                bottom: 0,
                height: 0,
                left: 315,
                right: 390,
                top: 0,
                width: 0
              }),
              dataset: { date: '2020-3-14' }
            },
            2: {
              getBoundingClientRect: () => ({
                bottom: 0,
                height: 0,
                left: 393,
                right: 468,
                top: 0,
                width: 0
              }),
              dataset: { date: '2020-3-15' }
            },
            3: {
              getBoundingClientRect: () => ({
                bottom: 0,
                height: 0,
                left: 471,
                right: 546,
                top: 0,
                width: 0
              }),
              dataset: { date: '2020-3-16' }
            }
          })
        };
        const getCenteredDate = instance.current._getCenteredDate;

        expect(getCenteredDate(stub, false)).toEqual('2020-3-16');
      });
    });

    it('should display both prev and next LowFareDisplayMore component when showFetchPrev and showFetchNext are true', () => {
      const { container } = createComponent({ showFetchPrev: true, showFetchNext: true });

      expect(container.querySelectorAll('.low-fare-calendar--fetch-prev-next').length).toEqual(2);
    });

    it('should pass showFetchNext to next LowFareDisplayMore component', () => {
      const { container } = createComponent({ showFetchNext: true, showLoadingNext: true });

      expect(container.querySelector('.low-fare-calendar--fetch-prev-next')).toMatchSnapshot();
    });
  });

  describe('toaster dialog', () => {
    it('should show toaster dialog when unselectable price bar is clicked (roundtrip scenario)', () => {
      const { container } = createComponent({
        isInbound: false,
        shouldShowUnselectableBars: true,
        selectedDate: TODAY,
        otherBoundSelectedDate: TODAY
      });
      const unselectablePriceBar = container.querySelectorAll('.calendar-day')[1].querySelector('.unselectable');

      fireEvent.click(unselectablePriceBar);

      expect(unselectablePriceBar).toMatchSnapshot();
    });

    it('should not show toaster dialog when selectable price bar is clicked (roundtrip scenario)', () => {
      const { container } = createComponent({
        isInbound: false,
        shouldShowUnselectableBars: true,
        selectedDate: TOMORROW,
        otherBoundSelectedDate: TOMORROW
      });
      const selectablePriceBar = container.querySelectorAll('.calendar-day')[1].querySelector('.calendar-day--fare-price');

      fireEvent.click(selectablePriceBar);

      expect(selectablePriceBar).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      boundClassName: 'lfc-outbound',
      boundRef: jest.fn(),
      showFetchPrev: false,
      showFetchNext: false,
      showLoadingPrev: false,
      showLoadingNext: false,
      onClickGetPrevCalendar: onClickGetPrevCalendarStub,
      onClickGetNextCalendar: onClickGetNextCalendarStub,
      onSelectDate: onSelectDateStub,
      onClickCalendarIconFn: () => {},
      lowFareCalendarDays: [
        {
          date: TODAY,
          lowestPrice: {
            price: {
              amount: '29,356',
              currencyCode: 'PTS',
              currencySymbol: null
            },
            pricePointsTax: {
              amount: '10.39',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        },
        {
          date: TOMORROW,
          lowestPrice: {
            price: {
              amount: '22,017',
              currencyCode: 'PTS',
              currencySymbol: null
            },
            pricePointsTax: {
              amount: '10.39',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        }
      ],
      shouldShowUnselectableBars: false,
      unselectableBarClickedMessage: UNSELECTABLE_MESSAGE
    };

    return render(
      <LowFareBound {...defaultProps} {...props} />
    );
  };
});