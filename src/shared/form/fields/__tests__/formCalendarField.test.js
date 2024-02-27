jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper', () => ({
  showFullScreenModal: jest.fn(),
  hideFullScreenModal: jest.fn()
}));

import { fireEvent, render } from '@testing-library/react';
import dayjs from 'dayjs';
import React from 'react';
import { BOTH, DEPART, RETURN } from 'src/shared/components/calendar/constants/calendarType';
import * as fullScreenModalHelper from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import CalendarField, { FormCalendarField } from 'src/shared/form/fields/formCalendarField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('calendarField', () => {
  let onSubmitStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display departure and return date', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should display return date and disable departure date when departureDate is disabled', () => {
    const { container } = createComponent({ departureDateDisabled: true });

    expect(container).toMatchSnapshot();
  });

  it('should display departure date and disable return date when returnDate is disabled and both flights are changing', () => {
    const { container } = createComponent({ returnDateDisabled: true });

    expect(container).toMatchSnapshot();
  });

  it('should display departure date and disable return date when returnDate is disabled and only return flight is changing', () => {
    const { getByText } = createComponent({ returnDateDisabled: true, type: RETURN });

    expect(getByText('5/31/18')).not.toBeNull();
  });

  it('should pass the correct data to form when user submit', () => {
    const { container } = createComponent();

    fireEvent.submit(container.querySelector('form'));

    expect(onSubmitStub).toHaveBeenCalledWith({
      departureAndReturnDate: { departureDate: '2018-05-04', returnDate: '2018-05-31', isDateChanged: undefined }
    });
  });

  it('should call showFullScreenModalSpy when user clicks date fields', () => {
    const { container } = createComponent(undefined, { isDateChanged: false });

    fireEvent.click(container.querySelector('.clickable-div'));

    expect(fullScreenModalHelper.showFullScreenModal).toHaveBeenCalled();
  });

  describe('usingNativeStyle', () => {
    it('should render correct with new style', () => {
      const { container } = createComponent({ usingNativeStyle: true });

      expect(container).toMatchSnapshot();
    });

    it('should only display departure date when it is one way trip', () => {
      const { container } = createComponent({ type: DEPART, usingNativeStyle: true });

      expect(container).toMatchSnapshot();
    });

    it('should render date description with italic day when date changed', () => {
      const { container } = createComponent({ usingNativeStyle: true }, { isDateChanged: true });

      expect(container).toMatchSnapshot();
    });

    it('should call showFullScreenModal when user clicks on calendar container', () => {
      const { container } = createComponent({ usingNativeStyle: true });

      fireEvent.click(container.querySelector('.form-calendar-field'));

      expect(fullScreenModalHelper.showFullScreenModal).toHaveBeenCalled();
    });

    describe('when isReaccomCoTerminalEligible is true', () => {
      const isReaccomCoTerminalEligibleProps = {
        isReaccomCoTerminalEligible: true,
        reaccomCoTerminalDates: {
          departureEarliestBookableDate: '2018-04-15',
          departureLastBookableDate: '2018-05-01',
          returnEarliestBookableDate: '2018-04-27',
          returnLastBookableDate: '2018-05-15'
        },
        usingNativeStyle: true
      };

      describe('componentDidMount', () => {
        it('should set shouldSelectNewReaccomDepartureDate to true when isInvalidDepartureDate is true', () => {
          const instance = React.createRef();

          createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            isInvalidDepartureDate: true
          });

          expect(instance.current.state.shouldSelectNewReaccomDepartureDate).toBe(true);
        });

        it('should set shouldSelectNewReaccomReturnDate to true when isInvalidReturnDate is true', () => {
          const instance = React.createRef();

          createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            isInvalidReturnDate: true
          });

          expect(instance.current.state.shouldSelectNewReaccomReturnDate).toBe(true);
        });
      });

      it('should render correctly for one way flight', () => {
        const { container } = createComponent({
          ...isReaccomCoTerminalEligibleProps,
          isRoundTrip: false,
          type: DEPART
        });

        expect(container).toMatchSnapshot();
      });

      it('should render correctly for round trip flights', () => {
        const { container } = createComponent({
          ...isReaccomCoTerminalEligibleProps,
          isRoundTrip: true
        });

        expect(container).toMatchSnapshot();
      });

      it('should render correctly when shouldSelectNewReaccomDepartureDate is true', (done) => {
        const instance = React.createRef();

        const { container } = createCoreComponent({
          ...isReaccomCoTerminalEligibleProps,
          instance,
          isRoundTrip: true
        });

        instance.current.setState(
          {
            shouldSelectNewReaccomDepartureDate: true
          },
          () => {
            expect(container).toMatchSnapshot();

            done();
          }
        );
      });

      it('should render correctly when shouldSelectNewReaccomReturnDate is true', (done) => {
        const instance = React.createRef();
        const { container } = createCoreComponent({
          ...isReaccomCoTerminalEligibleProps,
          instance,
          isRoundTrip: true
        });

        instance.current.setState(
          {
            shouldSelectNewReaccomReturnDate: true
          },
          () => {
            expect(container).toMatchSnapshot();

            done();
          }
        );
      });

      it('should not call showFullScreenModal when user clicks on calendar container', () => {
        const { container } = createComponent(isReaccomCoTerminalEligibleProps);

        fireEvent.click(container.querySelector('.form-calendar-field'));

        expect(fullScreenModalHelper.showFullScreenModal).not.toBeCalled();
      });

      it('should update isReaccomDepartureDateClicked to true and isReaccomReturnDateClicked to false when user clicks on departure date', () => {
        const instance = React.createRef();
        const { container } = createCoreComponent({ ...isReaccomCoTerminalEligibleProps, instance });

        fireEvent.click(container.querySelector('.form-calendar-field--departure-date'));

        expect(instance.current.state).toEqual(
          expect.objectContaining({
            isReaccomDepartureDateClicked: true,
            isReaccomReturnDateClicked: false
          })
        );
      });

      it('should update isReaccomReturnDateClicked to true and isReaccomDepartureDateClicked to false when user clicks on return date', () => {
        const instance = React.createRef();
        const { container } = createCoreComponent({ ...isReaccomCoTerminalEligibleProps, instance });

        fireEvent.click(container.querySelector('.form-calendar-field--return-date'));

        expect(instance.current.state).toEqual(
          expect.objectContaining({
            isReaccomDepartureDateClicked: false,
            isReaccomReturnDateClicked: true
          })
        );
      });

      describe('onSelectionComplete', () => {
        const defaultDepartureAndReturnDate = {
          departureDate: '2018-05-04',
          isDateChanged: true,
          isInvalidDepartureDate: false,
          isInvalidReturnDate: false,
          returnDate: '2018-05-31'
        };
        const onChangeStub = jest.fn();

        it('should call onChange with correct dates by default', () => {
          const instance = React.createRef();

          createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            onChange: onChangeStub
          });

          instance.current._onSelection({
            newOutboundDate: dayjs('2018-05-04'),
            newInboundDate: dayjs('2018-05-31')
          });

          expect(onChangeStub).toHaveBeenCalledWith(defaultDepartureAndReturnDate);
          expect(fullScreenModalHelper.hideFullScreenModal).toHaveBeenCalled();
        });

        it('should call onChange with correct dates when departureDateDisabled is true', () => {
          const instance = React.createRef();

          createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            departureDateDisabled: true,
            instance,
            onChange: onChangeStub
          });

          instance.current._onSelection({
            newOutboundDate: dayjs('2018-05-10'),
            newInboundDate: ''
          });

          expect(onChangeStub).toHaveBeenCalledWith({
            ...defaultDepartureAndReturnDate,
            returnDate: '2018-05-10'
          });
        });

        it('should call onChange with correct dates when isReaccomReturnDateClicked is true', () => {
          const instance = React.createRef();
          const { container } = createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            onChange: onChangeStub
          });

          fireEvent.click(container.querySelector('.form-calendar-field--return-date'));

          instance.current._onSelection({
            newOutboundDate: dayjs('2018-05-10'),
            newInboundDate: ''
          });

          expect(onChangeStub).toHaveBeenCalledWith({
            ...defaultDepartureAndReturnDate,
            returnDate: '2018-05-10'
          });
        });

        it('should call onChange with correct dates when returnDateDisabled is true', () => {
          const instance = React.createRef();

          createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            onChange: onChangeStub,
            returnDateDisabled: true
          });

          instance.current._onSelection({
            newOutboundDate: dayjs('2018-05-10'),
            newInboundDate: ''
          });

          expect(onChangeStub).toHaveBeenCalledWith({
            ...defaultDepartureAndReturnDate,
            departureDate: '2018-05-10'
          });
        });

        it('should call onChange with correct dates when isReaccomDepartureDateClicked is true', () => {
          const instance = React.createRef();
          const { container } = createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            onChange: onChangeStub
          });

          fireEvent.click(container.querySelector('.form-calendar-field--departure-date'));

          instance.current._onSelection({
            newOutboundDate: dayjs('2018-05-10'),
            newInboundDate: ''
          });

          expect(onChangeStub).toHaveBeenCalledWith({
            ...defaultDepartureAndReturnDate,
            departureDate: '2018-05-10'
          });
        });

        it('should call onChange with correct departureAndReturnDate values when isDepartureAfterReturnDate is true', () => {
          const instance = React.createRef();
          const { container } = createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            onChange: onChangeStub
          });

          fireEvent.click(container.querySelector('.form-calendar-field--departure-date'));

          instance.current._onSelection({ newOutboundDate: dayjs('2018-06-10') });

          expect(onChangeStub).toHaveBeenCalledWith({
            ...defaultDepartureAndReturnDate,
            departureDate: '2018-06-10',
            isInvalidReturnDate: true
          });
        });

        it('should call onChange with correct departureAndReturnDate values when isReturnBeforeDepartureDate is true', () => {
          const instance = React.createRef();
          const { container } = createCoreComponent({
            ...isReaccomCoTerminalEligibleProps,
            instance,
            onChange: onChangeStub
          });

          fireEvent.click(container.querySelector('.form-calendar-field--return-date'));

          instance.current._onSelection({
            newOutboundDate: dayjs('2018-05-02')
          });

          expect(onChangeStub).toHaveBeenCalledWith({
            ...defaultDepartureAndReturnDate,
            isInvalidDepartureDate: true,
            returnDate: '2018-05-02'
          });
        });

        describe('when isReaccomDepartureDateClicked is true', () => {
          describe('when isDepartureAfterReturnDate is true', () => {
            it('should set shouldSelectNewReaccomDepartureDate to false and shouldSelectNewReaccomReturnDate to true', () => {
              const instance = React.createRef();

              createCoreComponent({
                ...isReaccomCoTerminalEligibleProps,
                instance
              });

              instance.current.setState({
                isReaccomDepartureDateClicked: true
              });

              instance.current._onSelection({
                newInboundDate: '',
                newOutboundDate: dayjs('2018-06-10')
              });

              expect(instance.current.state).toEqual(
                expect.objectContaining({
                  shouldSelectNewReaccomDepartureDate: false,
                  shouldSelectNewReaccomReturnDate: true
                })
              );
            });
          });

          describe('when isDepartureAfterReturnDate is false', () => {
            it('should set shouldSelectNewReaccomDepartureDate and shouldSelectNewReaccomReturnDate to false when shouldSelectNewReaccomDepartureDate is true', () => {
              const instance = React.createRef();

              createCoreComponent({
                ...isReaccomCoTerminalEligibleProps,
                instance
              });

              instance.current.setState({
                isReaccomDepartureDateClicked: true,
                shouldSelectNewReaccomDepartureDate: true
              });

              instance.current._onSelection({
                newInboundDate: '',
                newOutboundDate: dayjs('2018-05-10')
              });

              expect(instance.current.state).toEqual(
                expect.objectContaining({
                  shouldSelectNewReaccomDepartureDate: false,
                  shouldSelectNewReaccomReturnDate: false
                })
              );
            });

            it('should set shouldSelectNewReaccomDepartureDate and shouldSelectNewReaccomReturnDate to false when shouldSelectNewReaccomReturnDate is true', () => {
              const instance = React.createRef();

              createCoreComponent({
                ...isReaccomCoTerminalEligibleProps,
                instance
              });

              instance.current.setState({
                isReaccomDepartureDateClicked: true,
                shouldSelectNewReaccomReturnDate: true
              });

              instance.current._onSelection({
                newInboundDate: '',
                newOutboundDate: dayjs('2018-05-10')
              });

              expect(instance.current.state).toEqual(
                expect.objectContaining({
                  shouldSelectNewReaccomDepartureDate: false,
                  shouldSelectNewReaccomReturnDate: false
                })
              );
            });
          });
        });

        describe('when isReaccomReturnDateClicked is true', () => {
          describe('when isReturnBeforeDepartureDate is true', () => {
            it('should set shouldSelectNewReaccomDepartureDate to true and shouldSelectNewReaccomReturnDate to false', () => {
              const instance = React.createRef();

              const { container } = createCoreComponent({
                ...isReaccomCoTerminalEligibleProps,
                instance
              });

              fireEvent.click(container.querySelector('.form-calendar-field--return-date'));

              instance.current._onSelection({
                newInboundDate: '',
                newOutboundDate: dayjs('2018-05-01')
              });

              expect(instance.current.state).toEqual(
                expect.objectContaining({
                  shouldSelectNewReaccomDepartureDate: true,
                  shouldSelectNewReaccomReturnDate: false
                })
              );
            });
          });

          describe('when isReturnBeforeDepartureDate is false', () => {
            it('should set shouldSelectNewReaccomDepartureDate and shouldSelectNewReaccomReturnDate to false when shouldSelectNewReaccomDepartureDate is true', () => {
              const instance = React.createRef();

              createCoreComponent({
                ...isReaccomCoTerminalEligibleProps,
                instance
              });

              instance.current.setState({
                isReaccomReturnDateClicked: true,
                shouldSelectNewReaccomDepartureDate: true
              });

              instance.current._onSelection({
                newInboundDate: '',
                newOutboundDate: dayjs('2018-05-10')
              });

              expect(instance.current.state).toEqual(
                expect.objectContaining({
                  shouldSelectNewReaccomDepartureDate: false,
                  shouldSelectNewReaccomReturnDate: false
                })
              );
            });

            it('should set shouldSelectNewReaccomDepartureDate and shouldSelectNewReaccomReturnDate to false when shouldSelectNewReaccomReturnDate is true', () => {
              const instance = React.createRef();

              createCoreComponent({
                ...isReaccomCoTerminalEligibleProps,
                instance
              });

              instance.current.setState({
                isReaccomReturnDateClicked: true,
                shouldSelectNewReaccomReturnDate: true
              });

              instance.current._onSelection({
                newInboundDate: '',
                newOutboundDate: dayjs('2018-05-10')
              });

              expect(instance.current.state).toEqual(
                expect.objectContaining({
                  shouldSelectNewReaccomDepartureDate: false,
                  shouldSelectNewReaccomReturnDate: false
                })
              );
            });
          });
        });
      });

      it('should set initDepartureDate to undefined when isReaccomDepartureDateClicked and isInvalidDepartureDate are true', (done) => {
        const instance = React.createRef();
        const { container } = createCoreComponent({
          ...isReaccomCoTerminalEligibleProps,
          instance,
          isInvalidDepartureDate: true
        });

        instance.current.setState(
          {
            isReaccomDepartureDateClicked: true
          },
          () => {
            expect(container).toMatchSnapshot();

            done();
          }
        );
      });

      it('should set initDepartureDate to undefined when isReaccomReturnDateClicked and isInvalidReturnDate are true', (done) => {
        const instance = React.createRef();
        const { container } = createCoreComponent({
          ...isReaccomCoTerminalEligibleProps,
          instance,
          isInvalidDepartureDate: true
        });

        instance.current.setState(
          {
            isReaccomReturnDateClicked: true
          },
          () => {
            expect(container).toMatchSnapshot();

            done();
          }
        );
      });
    });
  });

  describe('when MWEB_HOMEPAGE_REDESIGN is true', () => {
    it('should render correct with new style', () => {
      const { container } = createComponent({ usingNativeStyle: true, MWEB_HOMEPAGE_REDESIGN: true });

      expect(container).toMatchSnapshot();
    });
  });

  const defaultProps = {
    type: BOTH,
    earliestBookableDate: dayjs('2018-05-03'),
    lastBookableDate: dayjs('2018-11-03'),
    onChange: () => ({}),
    onFocus: () => ({}),
    departureDateDisabled: false,
    returnDateDisabled: false,
    calendarScheduleMessage: '',
    MWEB_HOMEPAGE_REDESIGN: false
  };

  function createComponent(props = {}, { isDateChanged } = {}) {
    const MockedForm = createMockedForm(createMockedFormStore(), {});

    return render(
      <MockedForm
        initialFormData={{
          departureAndReturnDate: { departureDate: '2018-05-04', returnDate: '2018-05-31', isDateChanged }
        }}
        onSubmit={onSubmitStub}
      >
        <CalendarField name="departureAndReturnDate" {...defaultProps} {...props} />
      </MockedForm>
    );
  }

  function createCoreComponent(props = {}) {
    const fieldProps = {
      value: {
        departureDate: '2018-05-04',
        returnDate: '2018-05-31'
      }
    };

    return integrationRender()({}, FormCalendarField, {
      name: 'departureAndReturnDate',
      ...defaultProps,
      ...fieldProps,
      ...props
    });
  }
});
