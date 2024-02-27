jest.mock('src/shared/helpers/historyHelper', () => ({
  addForbidUserClickBrowserForward: jest.fn(),
  removeForbidUserClickBrowserForward: jest.fn()
}));

import { fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { AirChangeShoppingPage } from 'src/airChange/pages/airChangeShoppingPage';
import BrowserObject from 'src/shared/helpers/browserObject';
import { today } from 'src/shared/helpers/dateHelper';
import * as historyHelper from 'src/shared/helpers/historyHelper';
import * as shoppingPageHelper from 'src/shared/helpers/shoppingPageHelper';
import CurrentReservationBuilder from 'test/builders/model/currentReservationBuilder';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';
import ReaccomFlightProductBuilder from 'test/builders/model/reaccomFlightProductBuilder';
import FakeClock from 'test/unit/helpers/fakeClock';
import { mountWithMemoryRouterAndState } from 'test/unit/helpers/testingLibraryUtils';
import waitFor from 'test/unit/helpers/waitFor';

describe('airChangeShoppingPage', () => {
  let changeDefaultProps;
  let fareSelectedStub;
  let goBackStub;
  let goToPricingFnStub;
  let hideDialogStub;
  let historyReplaceSteStub;
  let pushStub;
  let reaccomDefaultProps;
  let saveSelectedProductsFnStub;
  let searchForFlightsFnStub;
  let searchForReaccomFlightsFnStub;
  let selectFareStub;
  let showDialogStub;
  let sortAirChangeShoppingPageFnStub;
  let trackCalendarStripFnStub;
  let updateShouldForbidForwardFnStub;

  describe('airChangeShoppingPageSpecs', () => {
    beforeEach(() => {
      FakeClock.setTimeTo('2018-05-01T01:00:00.000-05:00');
      showDialogStub = jest.fn();
      hideDialogStub = jest.fn();
      historyReplaceSteStub = jest.spyOn(BrowserObject.history, 'replaceState');
      goBackStub = jest.fn();
      sortAirChangeShoppingPageFnStub = jest.fn();
      saveSelectedProductsFnStub = jest.fn();
      searchForFlightsFnStub = jest.fn();
      searchForReaccomFlightsFnStub = jest.fn();
      selectFareStub = jest.fn();
      fareSelectedStub = jest.fn();
      pushStub = jest.fn();
      goToPricingFnStub = jest.fn();
      updateShouldForbidForwardFnStub = jest.fn();
      trackCalendarStripFnStub = jest.fn();

      changeDefaultProps = {
        calendarStrip: {
          defaultSelectedDate: '2018-05-10',
          endDate: today().add(30, 'day'),
          popupDate: undefined,
          startDate: today()
        },
        cardsSortedBy: {
          cards: [new FlightProductBuilder(0).build()],
          sortByValue: 'departureTime'
        },
        dynamicWaiver: {
          dynamicWaiverEndDate: '2018-06-01',
          dynamicWaiverStartDate: '2018-05-01',
          isDepartureDateWithinDWDateRange: true,
          isDynamicWaiverEligible: true,
          isReturnDateWithinDWDateRange: true,
          isWithinDWAlternativeCities: true,
          shouldHideWarningIcon: true
        },
        feeDisclaimerText: 'test feeDisclaimerText',
        fareSelectedFn: fareSelectedStub,
        goBack: goBackStub,
        goToPricingFn: goToPricingFnStub,
        hideDialogFn: hideDialogStub.mockResolvedValue(),
        isLoggedIn: false,
        isReaccom: false,
        page: {
          _links: {
            changePricingPage: {
              body: {
                boundReference: ['boundReferenceA', 'boundReferenceB']
              },
              href: 'url',
              method: 'POST'
            },
            searchRequest: {
              departureAndReturnDate: {
                departureDate: '2018-05-11',
                returnDate: '2018-05-12'
              },
              from: 'DAL',
              to: 'AUS'
            }
          },
          _meta: {
            isPromoCodeApplied: false,
            isCheckedIn: false
          },
          airportInfo: 'DAL - AUS',
          boundInfo: 'Select Departing',
          boundSelections: [],
          checkedInNotice: {},
          currencyType: 'USD',
          currentReservation: new CurrentReservationBuilder().build(),
          destinationAirport: 'AUS',
          disclaimerWithLinks: 'Disclaimer text with <a href="google.com">a link</a>',
          isChangingFirstBound: true,
          isChangingTwoBounds: true,
          isOutbound: true,
          originAirport: 'DAL',
          params: { direction: 'outbound', paxType: 'adult' },
          promoCodeNotice: '',
          returnDate: '',
          selectedOutboundProductType: 'NORMAL',
          shoppingMessages: [],
          showSgaMessage: false
        },
        push: pushStub,
        saveSelectedProductsFn: saveSelectedProductsFnStub,
        searchForFlightsFn: searchForFlightsFnStub,
        searchForReaccomFlightsFn: searchForReaccomFlightsFnStub,
        selectFareFn: selectFareStub,
        selectedBounds: {
          firstbound: true,
          secondbound: false
        },
        selectedProducts: {
          outbound: {
            fareProductId: 'outboundFareProduct',
            flightCardIndex: 0,
            flightProductType: 'NORMAL'
          }
        },
        shouldForbidForward: false,
        showDialogFn: showDialogStub,
        sortAirChangeShoppingPageFn: sortAirChangeShoppingPageFnStub,
        trackCalendarStripFn: trackCalendarStripFnStub,
        updateShouldForbidForwardFn: updateShouldForbidForwardFnStub
      };

      reaccomDefaultProps = {
        calendarStrip: {
          defaultSelectedDate: '2018-05-10',
          endDate: today().add(30, 'day'),
          popupDate: undefined,
          startDate: today()
        },
        cardsSortedBy: {
          cards: [new ReaccomFlightProductBuilder().build()],
          sortByValue: 'departureTime'
        },
        dynamicWaiver: {
          dynamicWaiverEndDate: undefined,
          dynamicWaiverStartDate: undefined,
          isDepartureDateWithinDWDateRange: false,
          isDynamicWaiverEligible: false,
          isReturnDateWithinDWDateRange: false,
          isWithinDWAlternativeCities: false,
          shouldHideWarningIcon: true
        },
        fareSelectedFn: fareSelectedStub,
        goBack: goBackStub,
        goToPricingFn: goToPricingFnStub,
        hideDialogFn: hideDialogStub.mockResolvedValue(),
        isLoggedIn: false,
        isReaccom: true,
        page: {
          _links: {
            reaccomProducts: {
              body: {
                inbound: {
                  date: '2018-05-08',
                  'destination-airport': 'DAL',
                  'origin-airport': 'AUS',
                  isChangeBound: true
                },
                outbound: {
                  date: '2018-05-04',
                  'destination-airport': 'AUS',
                  'origin-airport': 'DAL',
                  isChangeBound: true
                },
                shareDataToken: 'sharedDataToken1'
              },
              href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
              method: 'POST'
            }
          },
          _meta: {},
          airportInfo: 'DAL - AUS',
          boundInfo: 'Select Departing',
          boundSelections: [],
          checkedInNotice: {},
          currencyType: 'USD',
          currentReservation: new CurrentReservationBuilder().build(),
          destinationAirport: 'AUS',
          disclaimerWithLinks: undefined,
          isChangingFirstBound: true,
          isChangingTwoBounds: true,
          isOutbound: true,
          originAirport: 'DAL',
          params: { direction: 'outbound', paxType: 'adult' },
          promoCodeNotice: '',
          returnDate: '',
          selectedOutboundProductType: 'NORMAL',
          shoppingMessages: [],
          showSgaMessage: false
        },
        push: pushStub,
        saveSelectedProductsFn: saveSelectedProductsFnStub,
        searchForFlightsFn: searchForFlightsFnStub,
        searchForReaccomFlightsFn: searchForReaccomFlightsFnStub,
        selectedBounds: {
          firstbound: true,
          secondbound: false
        },
        selectedProducts: {
          outbound: {
            fareProductId: 'outboundFareProduct',
            flightCardIndex: 0,
            flightProductType: 'NORMAL'
          }
        },
        selectFareFn: selectFareStub,
        shouldForbidForward: false,
        showDialogFn: showDialogStub,
        sortAirChangeShoppingPageFn: sortAirChangeShoppingPageFnStub,
        updateShouldForbidForwardFn: updateShouldForbidForwardFnStub,
        trackCalendarStripFn: trackCalendarStripFnStub
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
      FakeClock.restore();
    });

    describe('render', () => {
      describe('Query Params for air change', () => {
        it('should update url with query params for outbound oneway trip', () => {
          createComponent({
            page: {
              ...changeDefaultProps.page,
              boundSelections: [
                {
                  fromAirportCode: 'AUL',
                  originalDate: '2023-05-15'
                }
              ],
              departDate: '2023-05-15',
              params: { direction: 'outbound', paxType: undefined },
              returnDate: '2023-05-21'
            }
          });

          expect(historyReplaceSteStub.mock.calls[0][2].toString()).toEqual(
            'http://localhost/?changeBound0=true&changeBound1=true&tripType=oneway&originationAirportCode=DAL&destinationAirportCode=AUS&adultPassengerCount=0&departureDate=2023-05-15'
          );
        });

        it('should update url with query params for inbound trip with one adult passenger', () => {
          createComponent({
            page: {
              ...changeDefaultProps.page,
              adultPassengerCount: 1,
              boundSelections: [
                {
                  fromAirportCode: 'AUL'
                },
                {
                  toAirportCode: 'ABX'
                }
              ],
              departDate: '2023-05-15',
              params: { direction: 'inbound', paxType: undefined },
              returnDate: '2023-05-21'
            }
          });

          expect(historyReplaceSteStub.mock.calls[0][2].toString()).toEqual(
            'http://localhost/?changeBound0=true&changeBound1=true&tripType=twoway&originationAirportCode=DAL&destinationAirportCode=AUS&adultPassengerCount=1&departureDate=2023-05-15&returnDate=2023-05-21'
          );
        });

        it('should render correctly Query Params for air change', () => {
          const { container } = createComponent({
            page: {
              ...changeDefaultProps.page,
              adultPassengerCount: 1,
              boundSelections: [{}, {}],
              departDate: '2023-05-15',
              params: { direction: 'inbound', paxType: undefined },
              returnDate: '2023-05-21'
            }
          });

          expect(container).toMatchSnapshot();
        });
      });

      describe('Page Header', () => {
        it('should render correctly', () => {
          const { container } = createComponent();

          expect(container).toMatchSnapshot();
        });

        it('should sort options with default value paxType adult', () => {
          const { container } = createComponent({
            page: {
              ...changeDefaultProps.page,
              params: { direction: 'outbound', paxType: undefined }
            } });

          expect(container).toMatchSnapshot();
        });

        it('should have 4 options and placeholder in sort select', () => {
          const { getAllByRole } = createComponent({
            dynamicWaiver: {
              dynamicWaiverEndDate: undefined,
              dynamicWaiverStartDate: undefined,
              isDepartureDateWithinDWDateRange: false,
              isDynamicWaiverEligible: false,
              isReturnDateWithinDWDateRange: false,
              isWithinDWAlternativeCities: false,
              shouldHideWarningIcon: true
            }
          });

          expect(getAllByRole('option').length).toBe(4);
        });

        it('should have 3 options in sort select for dynamic waiver', () => {
          const { getAllByRole } = createComponent({
            dynamicWaiver: {
              dynamicWaiverStartDate: '2018-01-01',
              dynamicWaiverEndDate: '2018-02-01',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: true,
              shouldHideWarningIcon: false
            }
          });

          expect(getAllByRole('option').length).toBe(3);
        });
      });

      describe('reaccom scenario - isReaccom true', () => {
        const isReaccom = true;

        it('should render page header', () => {
          const { container } = createComponent({}, isReaccom);

          expect(container).toMatchSnapshot();
        });

        it('should have 3 options and placeholder in sort select', () => {
          const { getAllByRole } = createComponent({}, isReaccom);

          expect(getAllByRole('option').length).toBe(3);
        });

        it('should show reaccom message above current bounds', () => {
          const { container } = createComponent({}, isReaccom);

          expect(container.querySelector('[data-qa="reaccom-current-bounds-message"]').textContent).toEqual(
            'AIR_CHANGE__REACCOM_SHOPPING__REACCOM_CURRENT_BOUNDS_MESSAGE'
          );
        });
      });

      it('should make FlightProductPromoBanner exist when isPromoCodeApplied is true', () => {
        const { container } = createComponent({
          page: {
            ...changeDefaultProps.page,
            _meta: { isPromoCodeApplied: true },
            promoCodeNotice: 'promoCodeNotice'
          }
        });

        expect(container.querySelector('.flight-shopping-page--promo-code-banner')).not.toBeNull();
      });

      describe('FlightProduct', () => {
        it('should render a list for flight products', () => {
          const { container } = createComponent({
            cardsSortedBy: {
              cards: [new FlightProductBuilder(0).build(), new FlightProductBuilder(1).build()]
            }
          });

          expect(container.querySelectorAll('.flight-shopping-page--product-card').length).toBe(2);
        });
      });

      describe('Reaccom Flights - isReaccom true', () => {
        const isReaccom = true;
        const reaccomCardsSortedBy = {
          cards: [new ReaccomFlightProductBuilder().build(), new ReaccomFlightProductBuilder().withNonStop().build()]
        };

        it('should render a list of reaccom flight products', () => {
          const { container } = createComponent({ cardsSortedBy: reaccomCardsSortedBy }, isReaccom);

          expect(container).toMatchSnapshot();
        });

        it('should call fareSelected when reaccom flight selected', () => {
          const { getAllByTestId } = createComponent({ cardsSortedBy: reaccomCardsSortedBy }, isReaccom);

          fireEvent.click(getAllByTestId('reaccom-flight-product')[0]);

          expect(fareSelectedStub).toHaveBeenCalled();
        });
      });

      describe('SGA message', () => {
        it('should show SGA message in BasicBanner when the flight need to show SGA message', () => {
          const { container } = createComponent({
            page: {
              ...changeDefaultProps.page,
              shoppingMessages: [
                {
                  body: 'Southwest is currently awaiting government approval for this route. We anticipate approval to be granted shortly with no impact to your travel plans.',
                  header: 'Subject to Government Approval',
                  key: 'MESSAGE_GOVERNMENT_APPROVAL'
                }
              ],
              showSgaMessage: true
            }
          });

          expect(container).toMatchSnapshot();
        });
      });

      it('should show dynamic waiver message in BasicBanner when business select is not available', () => {
        const { container } = createComponent({
          page: {
            ...changeDefaultProps.page,
            shoppingMessages: [
              {
                body: 'You will loose your business select benefits.',
                header: 'Please select a flight.',
                key: 'FORFEIT_PREMIUM_FARE_BENEFITS'
              }
            ]
          }
        });

        expect(container).toMatchSnapshot();
      });

      describe('calendar strip warning icon', () => {
        it('should not show warning icon when date is not within dynamic waiver date range', () => {
          const { container } = createComponent({
            dynamicWaiver: {
              dynamicWaiverStartDate: '2018-05-02',
              dynamicWaiverEndDate: '2018-05-08',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: true,
              shouldHideWarningIcon: false
            }
          });

          expect(container).toMatchSnapshot();
        });

        it('should show warning icon when shouldHideWarningIcon is false and date is within dynamic waiver date range', () => {
          const { container } = createComponent({
            dynamicWaiver: {
              dynamicWaiverStartDate: '2018-05-02',
              dynamicWaiverEndDate: '2018-05-15',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: true,
              shouldHideWarningIcon: false
            }
          });

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('click', () => {
      describe('sortBy', () => {
        it('should trigger sortAirChangeShoppingPageFn callback when user selects a sort strategy', () => {
          const instance = createRef();

          createComponent({ instance });

          instance.current._onSortBySelectChange('numberOfStops');

          expect(sortAirChangeShoppingPageFnStub).toHaveBeenCalledWith('numberOfStops', 'outbound', false);
        });

        it('should trigger sortAirChangeShoppingPageFn callback when user select a sort strategy', () => {
          const instance = createRef();

          createComponent({ instance }, true);

          instance.current._onSortBySelectChange('numberOfStops');

          expect(sortAirChangeShoppingPageFnStub).toHaveBeenCalledWith('numberOfStops', 'outbound', true);
        });
      });

      describe('calendarStrip', () => {
        describe('invalid depart date', () => {
          let invalidDepartDateProps;

          beforeEach(() => {
            invalidDepartDateProps = {
              ...changeDefaultProps,
              calendarStrip: {
                ...changeDefaultProps.calendarStrip,
                defaultSelectedDate: '2018-05-10'
              },
              page: {
                ...changeDefaultProps.page,
                _meta: {},
                returnDate: '2018-05-10'
              },
              selectedBounds: {
                firstbound: true,
                secondbound: true
              }
            };
          });

          describe('change scenario', () => {
            it('should show invalid depart date dialog when the selected depart date past the returning date', () => {
              const { container } = createComponent(invalidDepartDateProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

              expect(showDialogStub.mock.calls[0][0].message).toEqual(
                'SHARED__CALENDAR__SELECTED_DATE_AFTER_RETURN_DATE'
              );
            });

            it('should hide dialog and reset to default selected date when click the cancel button', () => {
              const { container } = createComponent(invalidDepartDateProps);

              fireEvent.click(container.querySelector('[data-qa="calendar-strip-next-dates"]'));
              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

              showDialogStub.mock.calls[0][0].buttons[0].onClick();

              expect(hideDialogStub).toHaveBeenCalled();
            });

            it('should trigger searchForFlightsFn and analytics action when click the continue button', (done) => {
              const { container } = createComponent(invalidDepartDateProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

              showDialogStub.mock.calls[0][0].buttons[1].onClick();

              waitFor.untilAssertPass(() => {
                expect(trackCalendarStripFnStub).toHaveBeenCalledWith('2018-05-11');
                expect(searchForFlightsFnStub).toHaveBeenCalledWith({
                  boundSelections: [],
                  changeShoppingLink: undefined,
                  searchRequest: {
                    departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-11' },
                    from: 'DAL',
                    to: 'AUS',
                    diffs: {
                      outbound: '+1',
                      inbound: '-1'
                    }
                  },
                  selectedBounds: { firstbound: true, secondbound: true }
                });
              }, done);
            });

            describe('out of dynamic waiver range', () => {
              let outOfDynamicRangeProps;

              beforeEach(() => {
                outOfDynamicRangeProps = {
                  ...changeDefaultProps,
                  calendarStrip: {
                    ...changeDefaultProps.calendarStrip,
                    defaultSelectedDate: '2018-05-10'
                  },
                  selectedBounds: {
                    firstbound: true,
                    secondbound: true
                  },
                  dynamicWaiver: {
                    ...changeDefaultProps.dynamicWaiver,
                    dynamicWaiverStartDate: '2018-05-04',
                    dynamicWaiverEndDate: '2018-05-10',
                    isDynamicWaiverEligible: true,
                    isWithinDWAlternativeCities: true,
                    shouldHideWarningIcon: false
                  },
                  page: {
                    ...changeDefaultProps.page,
                    returnDate: '2018-05-10',
                    _meta: {}
                  }
                };
              });

              it('should show out of dynamic waiver dialog when click the invalid depart dialog continue button', (done) => {
                const { container } = createComponent(outOfDynamicRangeProps);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
                showDialogStub.mock.calls[0][0].buttons[1].onClick();

                waitFor.untilAssertPass(() => {
                  expect(showDialogStub.mock.calls.length).toBe(2);
                  expect(showDialogStub.mock.calls[1][0].message).toEqual(
                    'AIR_CHANGE__SODA_FLIGHT_INFO__INELIGIBLE_MESSAGE'
                  );
                }, done);
              });

              it('should hide out of dynamic waiver dialog when click the cancel button', (done) => {
                const { container } = createComponent(outOfDynamicRangeProps);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
                showDialogStub.mock.calls[0][0].buttons[1].onClick();

                waitFor.untilAssertPass(() => {
                  showDialogStub.mock.calls[1][0].buttons[0].onClick();

                  expect(hideDialogStub.mock.calls.length).toBe(2);
                }, done);
              });

              it('should trigger searchForFlightsFn when click the ok button', (done) => {
                const { container } = createComponent(outOfDynamicRangeProps);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
                showDialogStub.mock.calls[0][0].buttons[1].onClick();

                waitFor.untilAssertPass(() => {
                  showDialogStub.mock.calls[1][0].buttons[1].onClick();

                  expect(searchForFlightsFnStub).toHaveBeenCalledWith({
                    boundSelections: [],
                    changeShoppingLink: undefined,
                    searchRequest: {
                      departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-11' },
                      from: 'DAL',
                      to: 'AUS',
                      diffs: {
                        outbound: '+1',
                        inbound: '-1'
                      }
                    },
                    selectedBounds: { firstbound: true, secondbound: true }
                  });
                }, done);
              });
            });
          });

          describe('reaccom scenario', () => {
            let invalidReaccomDepartDateProps;

            beforeEach(() => {
              invalidReaccomDepartDateProps = {
                ...reaccomDefaultProps,
                calendarStrip: {
                  ...reaccomDefaultProps.calendarStrip,
                  defaultSelectedDate: '2018-05-10'
                },
                selectedBounds: {
                  firstbound: true,
                  secondbound: true
                },
                page: {
                  ...reaccomDefaultProps.page,
                  returnDate: '2018-05-10',
                  _meta: {}
                }
              };
            });

            describe('change both bounds', () => {
              it('should show invalid depart date dialog when the selected depart date past the returning date', () => {
                const { container } = createComponent(invalidReaccomDepartDateProps, true);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

                expect(showDialogStub.mock.calls[0][0].message).toEqual(
                  'SHARED__CALENDAR__SELECTED_DATE_AFTER_RETURN_DATE'
                );
              });

              it('should hide dialog and reset to default selected date when click the cancel button', () => {
                const { container } = createComponent(invalidReaccomDepartDateProps, true);

                fireEvent.click(container.querySelector('[data-qa="calendar-strip-next-dates"]'));
                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

                showDialogStub.mock.calls[0][0].buttons[0].onClick();

                expect(hideDialogStub).toHaveBeenCalled();
              });

              it('should trigger searchForFlightsFn and analytics action when click the continue button', (done) => {
                const { container } = createComponent(invalidReaccomDepartDateProps, true);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
                showDialogStub.mock.calls[0][0].buttons[1].onClick();

                waitFor.untilAssertPass(() => {
                  expect(trackCalendarStripFnStub).toHaveBeenCalledWith('2018-05-11');
                  expect(searchForReaccomFlightsFnStub).toHaveBeenCalledWith({
                    body: {
                      inbound: {
                        date: '2018-05-11',
                        'destination-airport': 'DAL',
                        isChangeBound: true,
                        'origin-airport': 'AUS'
                      },
                      outbound: {
                        date: '2018-05-11',
                        'destination-airport': 'AUS',
                        isChangeBound: true,
                        'origin-airport': 'DAL'
                      },
                      shareDataToken: 'sharedDataToken1'
                    },
                    href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
                    method: 'POST'
                  });
                }, done);
              });
            });

            describe('change outbound only when both bounds are reaccom eligible', () => {
              let outboundOnlyReaccomProps;

              beforeEach(() => {
                outboundOnlyReaccomProps = {
                  ...invalidReaccomDepartDateProps,
                  page: {
                    ...invalidReaccomDepartDateProps.page,
                    isChangingTwoBounds: false,
                    isOutbound: true
                  }
                };
              });

              it('should show invalid depart date dialog when the selected depart date past the returning date', () => {
                const { container } = createComponent(outboundOnlyReaccomProps, true);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

                expect(showDialogStub.mock.calls[0][0].message).toEqual(
                  'SHARED__CALENDAR__REACCOM_SELECTED_DATE_AFTER_RETURN_DATE'
                );
              });

              it('should hide dialog and reset to default selected date when click the ok button', () => {
                const { container } = createComponent(outboundOnlyReaccomProps, true);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

                showDialogStub.mock.calls[0][0].buttons[0].onClick();

                expect(hideDialogStub).toHaveBeenCalled();
              });
            });
          });
        });

        describe('invalid return date', () => {
          describe('reaccom scenario', () => {
            let invalidReturnDateReaccomProps;

            beforeEach(() => {
              invalidReturnDateReaccomProps = {
                ...reaccomDefaultProps,
                calendarStrip: {
                  ...reaccomDefaultProps.calendarStrip,
                  defaultSelectedDate: '2018-05-10'
                },
                selectedBounds: {
                  firstbound: true,
                  secondbound: true
                },
                page: {
                  ...reaccomDefaultProps.page,
                  departDate: '2018-05-10',
                  isChangingTwoBounds: false,
                  isOutbound: false,
                  returnDate: '2018-05-11'
                }
              };
            });

            describe('change inbound only when both bounds are reaccom eligible', () => {
              it('should show invalid return date dialog when the selected return date before the departing date', () => {
                const { container } = createComponent(invalidReturnDateReaccomProps, true);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);

                expect(showDialogStub.mock.calls[0][0].message).toEqual(
                  'SHARED__CALENDAR__REACCOM_SELECTED_DATE_BEFORE_DEPART_DATE'
                );
              });

              it('should hide dialog and reset to default selected date when click the ok button', () => {
                const { container } = createComponent(invalidReturnDateReaccomProps, true);

                fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);

                showDialogStub.mock.calls[0][0].buttons[0].onClick();

                expect(hideDialogStub).toHaveBeenCalled();
              });
            });
          });
        });

        describe('out of dynamic waiver range', () => {
          let outOfDynamicRangeProps;

          beforeEach(() => {
            outOfDynamicRangeProps = {
              ...changeDefaultProps,
              calendarStrip: {
                ...changeDefaultProps.calendarStrip,
                defaultSelectedDate: '2018-05-6'
              },
              dynamicWaiver: {
                ...changeDefaultProps.dynamicWaiver,
                dynamicWaiverStartDate: '2018-05-04',
                dynamicWaiverEndDate: '2018-05-6',
                isDynamicWaiverEligible: true,
                isWithinDWAlternativeCities: true,
                shouldHideWarningIcon: false
              },
              selectedBounds: {
                firstbound: true,
                secondbound: true
              }
            };
          });

          it('should show out of dynamic waiver dialog when the selected date is out of dynamic waiver date range', () => {
            const { container } = createComponent(outOfDynamicRangeProps);

            fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

            expect(showDialogStub.mock.calls[0][0].message).toEqual('AIR_CHANGE__SODA_FLIGHT_INFO__INELIGIBLE_MESSAGE');
          });

          it('should hide out of DW dialog and reset to defalut selected date when click the cancel button', () => {
            const { container } = createComponent(outOfDynamicRangeProps);

            fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

            showDialogStub.mock.calls[0][0].buttons[0].onClick();

            expect(hideDialogStub).toHaveBeenCalled();
          });

          it('should trigger searchForFlightsFn and analytics action when click the OK button', (done) => {
            const { container } = createComponent(outOfDynamicRangeProps);

            fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

            showDialogStub.mock.calls[0][0].buttons[1].onClick();

            waitFor.untilAssertPass(() => {
              expect(trackCalendarStripFnStub).toHaveBeenCalledWith('2018-05-07');
              expect(searchForFlightsFnStub).toHaveBeenCalledWith({
                boundSelections: [],
                changeShoppingLink: undefined,
                searchRequest: {
                  departureAndReturnDate: { departureDate: '2018-05-07', returnDate: '2018-05-12' },
                  diffs: { outbound: '+1' },
                  from: 'DAL',
                  to: 'AUS'
                },
                selectedBounds: { firstbound: true, secondbound: true }
              });
            }, done);
          });

          it('should not show out of dynamic waiver dialog again when changing two bounds and dialog already shown', () => {
            const { container } = createComponent({
              ...changeDefaultProps,
              calendarStrip: {
                ...changeDefaultProps.calendarStrip,
                defaultSelectedDate: '2018-05-7'
              },
              dynamicWaiver: {
                ...changeDefaultProps.dynamicWaiver,
                dynamicWaiverStartDate: '2018-05-04',
                dynamicWaiverEndDate: '2018-05-6',
                isDynamicWaiverEligible: true,
                isWithinDWAlternativeCities: true,
                shouldHideWarningIcon: false
              },
              selectedBounds: {
                firstbound: true,
                secondbound: true
              }
            });

            fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

            expect(showDialogStub).not.toHaveBeenCalled();
          });

          it('should show out of dynamic waiver dialog again when changing one bounds and dialog already shown', () => {
            const { container } = createComponent({
              ...changeDefaultProps,
              calendarStrip: {
                ...changeDefaultProps.calendarStrip,
                defaultSelectedDate: '2018-05-7'
              },
              dynamicWaiver: {
                ...changeDefaultProps.dynamicWaiver,
                dynamicWaiverStartDate: '2018-05-04',
                dynamicWaiverEndDate: '2018-05-6',
                isDynamicWaiverEligible: true,
                isWithinDWAlternativeCities: true,
                shouldHideWarningIcon: false
              },
              page: {
                ...changeDefaultProps.page,
                isChangingTwoBounds: false
              },
              selectedBounds: {
                firstbound: true,
                secondbound: false
              }
            });

            fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

            expect(showDialogStub).toHaveBeenCalled();
          });

          it('should not show out of dynamic waiver dialog when the return date is adjusted out of DW range', () => {
            const { container } = createComponent({
              ...changeDefaultProps,
              calendarStrip: {
                ...changeDefaultProps.calendarStrip,
                defaultSelectedDate: '2018-05-6'
              },
              dynamicWaiver: {
                ...changeDefaultProps.dynamicWaiver,
                dynamicWaiverEndDate: '2018-05-6',
                dynamicWaiverStartDate: '2018-05-04',
                isDepartureDateWithinDWDateRange: true,
                isDynamicWaiverEligible: true,
                isReturnDateWithinDWDateRange: false,
                isWithinDWAlternativeCities: true,
                shouldHideWarningIcon: false
              },
              page: {
                ...changeDefaultProps.page,
                isChangingTwoBounds: true
              },
              selectedBounds: {
                firstbound: true,
                secondbound: true
              }
            });

            fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

            expect(showDialogStub).not.toHaveBeenCalled();
          });
        });

        describe('back to dynamic waiver range again', () => {
          describe('changing inbound', () => {
            let changingInboundProps;

            beforeEach(() => {
              changingInboundProps = {
                ...changeDefaultProps,
                calendarStrip: {
                  ...changeDefaultProps.calendarStrip,
                  defaultSelectedDate: '2018-05-19'
                },
                dynamicWaiver: {
                  ...changeDefaultProps.dynamicWaiver,
                  dynamicWaiverStartDate: '2018-05-12',
                  dynamicWaiverEndDate: '2018-05-18',
                  isDynamicWaiverEligible: true,
                  isWithinDWAlternativeCities: true,
                  shouldHideWarningIcon: false
                },
                page: {
                  ...changeDefaultProps.page,
                  params: { direction: 'inbound', paxType: 'adult' },
                  isChangingFirstBound: false,
                  isChangingTwoBounds: true,
                  isOutbound: false
                },
                selectedBounds: {
                  firstbound: true,
                  secondbound: true
                }
              };
            });

            it('should show back to dynamic wavier range dialog when the selcted date is within DW range again', () => {
              const { container } = createComponent(changingInboundProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);

              expect(showDialogStub.mock.calls[0][0].message).toEqual('AIR_CHANGE__SODA_FLIGHT_INFO__ELIGIBLE_MESSAGE');
            });

            it('should hide back to DW range dialog and reset to default selected date when click the cancel button', () => {
              const { container } = createComponent(changingInboundProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);
              showDialogStub.mock.calls[0][0].buttons[0].onClick();

              expect(hideDialogStub).toHaveBeenCalled();
            });

            it('should trigger searchForFlightsFn and analytics action for flight when click the OK button', (done) => {
              const { container } = createComponent(changingInboundProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);
              showDialogStub.mock.calls[0][0].buttons[1].onClick();

              waitFor.untilAssertPass(() => {
                expect(trackCalendarStripFnStub).toHaveBeenCalledWith('2018-05-18');
                expect(searchForFlightsFnStub.mock.calls[0][0]).toEqual({
                  boundSelections: [],
                  changeShoppingLink: undefined,
                  searchRequest: {
                    departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-18' },
                    diffs: { inbound: '-1' },
                    from: 'DAL',
                    to: 'AUS'
                  },
                  selectedBounds: { firstbound: true, secondbound: true }
                });
              }, done);
            });

            it('should not show back to dW range dialog when the departure date is not with DW date range', () => {
              const { container } = createComponent({
                ...changingInboundProps,
                calendarStrip: {
                  ...changingInboundProps.calendarStrip,
                  defaultSelectedDate: '2018-05-19'
                },
                dynamicWaiver: {
                  ...changingInboundProps.dynamicWaiver,
                  dynamicWaiverStartDate: '2018-05-12',
                  dynamicWaiverEndDate: '2018-05-18',
                  isDepartureDateWithinDWDateRange: false,
                  isDynamicWaiverEligible: true,
                  isWithinDWAlternativeCities: true,
                  shouldHideWarningIcon: false
                },
                page: {
                  ...changingInboundProps.page,
                  isOutbound: false,
                  params: { direction: 'inbound', paxType: 'adult' },
                  isChangingTwoBounds: true,
                  isChangingFirstBound: false
                },
                selectedBounds: {
                  firstbound: true,
                  secondbound: true
                }
              });

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);

              expect(showDialogStub).not.toHaveBeenCalled();
            });
          });

          describe('changing outbound', () => {
            let changingOutboundProps;

            beforeEach(() => {
              changingOutboundProps = {
                ...changeDefaultProps,
                calendarStrip: {
                  ...changeDefaultProps.calendarStrip,
                  defaultSelectedDate: '2018-05-7'
                },
                dynamicWaiver: {
                  ...changeDefaultProps.dynamicWaiver,
                  dynamicWaiverStartDate: '2018-05-04',
                  dynamicWaiverEndDate: '2018-05-6',
                  isDynamicWaiverEligible: true,
                  isWithinDWAlternativeCities: true,
                  shouldHideWarningIcon: false
                },
                page: {
                  ...changeDefaultProps.page,
                  isOutbound: false,
                  params: { direction: 'outbound', paxType: 'adult' },
                  returnDate: '2018-05-19'
                },
                selectedBounds: {
                  firstbound: true,
                  secondbound: true
                }
              };
            });

            it('should show back to dynamic wavier range dialog when the selcted date is within DW range again', () => {
              const { container } = createComponent(changingOutboundProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);

              expect(showDialogStub.mock.calls[0][0].message).toEqual('AIR_CHANGE__SODA_FLIGHT_INFO__ELIGIBLE_MESSAGE');
            });

            it('should hide back to DW range dialog and reset to default selected date when click the cancel button', () => {
              const { container } = createComponent(changingOutboundProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);
              showDialogStub.mock.calls[0][0].buttons[0].onClick();

              expect(hideDialogStub).toHaveBeenCalled();
            });

            it('should trigger searchForFlightsFn analytics action for flight when click the OK button', (done) => {
              const { container } = createComponent(changingOutboundProps);

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);
              showDialogStub.mock.calls[0][0].buttons[1].onClick();

              waitFor.untilAssertPass(() => {
                expect(trackCalendarStripFnStub).toHaveBeenCalledWith('2018-05-06');
                expect(searchForFlightsFnStub).toHaveBeenCalledWith({
                  boundSelections: [],
                  changeShoppingLink: undefined,
                  searchRequest: {
                    departureAndReturnDate: { departureDate: '2018-05-06', returnDate: '2018-05-12' },
                    diffs: { outbound: '-1' },
                    from: 'DAL',
                    to: 'AUS'
                  },
                  selectedBounds: { firstbound: true, secondbound: true }
                });
              }, done);
            });

            it('should not show back to DW range dialog when the return date is adjust out of DW range', () => {
              const { container } = createComponent({
                ...changingOutboundProps,
                calendarStrip: {
                  ...changingOutboundProps.calendarStrip,
                  defaultSelectedDate: '2018-05-7'
                },
                dynamicWaiver: {
                  ...changingOutboundProps.dynamicWaiver,
                  dynamicWaiverStartDate: '2018-05-04',
                  dynamicWaiverEndDate: '2018-05-6',
                  isDynamicWaiverEligible: true,
                  isWithinDWAlternativeCities: true,
                  shouldHideWarningIcon: false,
                  isReturnDateWithinDWDateRange: false
                },
                page: {
                  ...changingOutboundProps.page,
                  isOutbound: false,
                  params: { direction: 'outbound', paxType: 'adult' },
                  returnDate: '2018-05-19'
                },
                selectedBounds: {
                  firstbound: true,
                  secondbound: true
                }
              });

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);

              expect(showDialogStub).not.toHaveBeenCalled();
            });
          });
        });

        describe('user selects a date', () => {
          let departureDateAndReturnDate;

          beforeEach(() => {
            departureDateAndReturnDate = {
              departureDate: '2018-05-11',
              returnDate: '2018-05-12'
            };

            jest
              .spyOn(shoppingPageHelper, 'getCalendarReturnAndDepartureDate')
              .mockReturnValueOnce(departureDateAndReturnDate);
          });

          it('should trigger searchForFlightsFn when user selects a date', () => {
            const { container } = createComponent(changeDefaultProps);

            fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

            expect(searchForFlightsFnStub).toHaveBeenCalledWith({
              boundSelections: [],
              changeShoppingLink: undefined,
              searchRequest: {
                departureAndReturnDate: {
                  departureDate: '2018-05-11',
                  returnDate: '2018-05-12'
                },
                diffs: { outbound: '+1' },
                from: 'DAL',
                to: 'AUS'
              },
              selectedBounds: {
                firstbound: true,
                secondbound: false
              }
            });
          });

          describe('reaccom scenario - isReaccom true', () => {
            it('should trigger searchForReaccomFlightsFn with both bounds when user selects a date and both bounds were selected', () => {
              const { container } = createComponent(
                {
                  page: {
                    ...reaccomDefaultProps.page,
                    params: { direction: 'outbound', paxType: 'adult' }
                  },
                  selectedBounds: {
                    firstbound: true,
                    secondbound: true
                  },
                  selectedProducts: {
                    ...reaccomDefaultProps.selectedProducts,
                    inbound: {
                      fareProductId: 'inboundFareProduct',
                      flightCardIndex: 0,
                      flightProductType: 'NORMAL'
                    },
                    outbound: {
                      fareProductId: 'outboundFareProduct',
                      flightCardIndex: 0,
                      flightProductType: 'NORMAL'
                    }
                  }
                },
                true
              );

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

              expect(searchForReaccomFlightsFnStub).toHaveBeenCalledWith({
                body: {
                  inbound: {
                    date: '2018-05-08',
                    'destination-airport': 'DAL',
                    isChangeBound: true,
                    'origin-airport': 'AUS'
                  },
                  outbound: {
                    date: '2018-05-11',
                    'destination-airport': 'AUS',
                    isChangeBound: true,
                    'origin-airport': 'DAL'
                  },
                  shareDataToken: 'sharedDataToken1'
                },
                href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
                method: 'POST'
              });
            });

            it('should trigger searchForReaccomFlightsFn with outbound when user selects a date and only outbound was selected', () => {
              const { container } = createComponent(
                {
                  page: {
                    ...reaccomDefaultProps.page,
                    params: { direction: 'outbound', paxType: 'adult' }
                  },
                  selectedBounds: {
                    firstbound: true,
                    secondbound: false
                  },
                  selectedProducts: {
                    ...reaccomDefaultProps.selectedProducts,
                    outbound: {
                      fareProductId: 'outboundFareProduct',
                      flightCardIndex: 0,
                      flightProductType: 'NORMAL'
                    }
                  }
                },
                true
              );

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

              expect(searchForReaccomFlightsFnStub).toHaveBeenCalledWith({
                body: {
                  outbound: {
                    date: '2018-05-11',
                    'destination-airport': 'AUS',
                    isChangeBound: true,
                    'origin-airport': 'DAL'
                  },
                  shareDataToken: 'sharedDataToken1'
                },
                href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
                method: 'POST'
              });
            });

            it('should trigger searchForReaccomFlightsFn with inbound when user selects a date and only inbound was selected', () => {
              const { container } = createComponent(
                {
                  page: {
                    ...reaccomDefaultProps.page,
                    params: { direction: 'inbound', paxType: 'adult' }
                  },
                  selectedBounds: {
                    firstbound: false,
                    secondbound: true
                  },
                  selectedProducts: {
                    ...reaccomDefaultProps.selectedProducts,
                    inbound: {
                      fareProductId: 'inboundFareProduct',
                      flightCardIndex: 0,
                      flightProductType: 'NORMAL'
                    }
                  }
                },
                true
              );

              fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

              expect(searchForReaccomFlightsFnStub).toHaveBeenCalledWith({
                body: {
                  inbound: {
                    date: '2018-05-11',
                    'destination-airport': 'DAL',
                    isChangeBound: true,
                    'origin-airport': 'AUS'
                  },
                  shareDataToken: 'sharedDataToken1'
                },
                href: '/v1/mobile-air-booking/page/flights/reaccom/shopping',
                method: 'POST'
              });
            });
          });
        });

        it('should trigger analytics action when user select a date', () => {
          const { container } = createComponent();

          fireEvent.click(container.querySelector('[data-qa="calendar-strip-next-dates"]'));
          fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

          expect(container.querySelectorAll('.calendar-strip--item')[1].textContent).toEqual('Sun, May 13');
        });

        it('should trigger searchForFlightsFn without goBack when it is not dynamic waiver flight', (done) => {
          const { container } = createComponent();

          fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

          waitFor.untilAssertPass(() => {
            expect(searchForFlightsFnStub).toHaveBeenCalledWith({
              boundSelections: [],
              changeShoppingLink: undefined,
              searchRequest: {
                diffs: { outbound: '+1' },
                departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-12' },
                from: 'DAL',
                to: 'AUS'
              },
              selectedBounds: { firstbound: true, secondbound: false }
            });
          }, done);
        });

        it('should trigger searchForFlightFn without goBack when is not within dynamic waiver alternative cities', (done) => {
          const { container } = createComponent({
            dynamicWaiver: {
              ...changeDefaultProps.dynamicWaiver,
              dynamicWaiverEndDate: '2018-05-10',
              dynamicWaiverStartDate: '2018-05-01',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: false,
              shouldHideWarningIcon: false
            }
          });

          fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);

          waitFor.untilAssertPass(() => {
            expect(searchForFlightsFnStub).toHaveBeenCalledWith({
              boundSelections: [],
              changeShoppingLink: undefined,
              searchRequest: {
                diffs: { outbound: '+1' },
                departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-12' },
                from: 'DAL',
                to: 'AUS'
              },
              selectedBounds: { firstbound: true, secondbound: false }
            });
          }, done);
        });

        it('should trigger searchForFlightFn without goBack when it is not changing two bounds', (done) => {
          const { container } = createComponent({
            dynamicWaiver: {
              ...changeDefaultProps.dynamicWaiver,
              dynamicWaiverStartDate: '2018-05-01',
              dynamicWaiverEndDate: '2018-05-10',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: true,
              shouldHideWarningIcon: false
            },
            isChangingTwoBounds: true
          });

          fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
          showDialogStub.mock.calls[0][0].buttons[1].onClick();

          waitFor.untilAssertPass(() => {
            expect(searchForFlightsFnStub).toHaveBeenCalledWith({
              boundSelections: [],
              changeShoppingLink: undefined,
              searchRequest: {
                diffs: { outbound: '+1' },
                departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-12' },
                from: 'DAL',
                to: 'AUS'
              },
              selectedBounds: { firstbound: true, secondbound: false }
            });
          }, done);
        });

        it('should trigger searchForFlightFn without goBack when it is not changing inbound', (done) => {
          const { container } = createComponent({
            dynamicWaiver: {
              ...changeDefaultProps.dynamicWaiver,
              dynamicWaiverEndDate: '2018-05-10',
              dynamicWaiverStartDate: '2018-05-01',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: true,
              shouldHideWarningIcon: false
            }
          });

          fireEvent.click(container.querySelectorAll('.calendar-strip--item')[2]);
          showDialogStub.mock.calls[0][0].buttons[1].onClick();

          waitFor.untilAssertPass(() => {
            expect(searchForFlightsFnStub).toHaveBeenCalledWith({
              boundSelections: [],
              changeShoppingLink: undefined,
              searchRequest: {
                departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-12' },
                from: 'DAL',
                to: 'AUS',
                diffs: { outbound: '+1' }
              },
              selectedBounds: { firstbound: true, secondbound: false }
            });
          }, done);
        });

        it('should trigger searchForFlightFn with goBack when will selected inbound product type not equal to outbound type', async () => {
          const { container } = createComponent({
            page: {
              ...changeDefaultProps.page,
              isChangingFirstBound: false,
              params: { direction: 'inbound', paxType: 'adult' }
            },
            calendarStrip: {
              ...changeDefaultProps.calendarStrip,
              defaultSelectedDate: '2018-05-21'
            },
            dynamicWaiver: {
              ...changeDefaultProps.dynamicWaiver,
              dynamicWaiverEndDate: '2018-05-20',
              dynamicWaiverStartDate: '2018-05-01',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: true,
              shouldHideWarningIcon: false
            }
          });

          shoppingPageHelper.getCalendarReturnAndDepartureDate.mockReturnValueOnce({
            departureDate: '2018-05-11',
            returnDate: '2018-05-20'
          });
          fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);
          await showDialogStub.mock.calls[0][0].buttons[1].onClick();
          await searchForFlightsFnStub.mock.calls[0][1]();

          expect(searchForFlightsFnStub.mock.calls[0][0]).toEqual({
            boundSelections: [],
            changeShoppingLink: undefined,
            searchRequest: {
              diffs: { inbound: '-1' },
              departureAndReturnDate: { departureDate: '2018-05-11', returnDate: '2018-05-20' },
              from: 'DAL',
              to: 'AUS'
            },
            selectedBounds: { firstbound: true, secondbound: false }
          });
          expect(goBackStub).toHaveBeenCalled();
        });

        it('should forbid browser forward when selected products will be mixed', async () => {
          const { container } = createComponent({
            page: {
              ...changeDefaultProps.page,
              params: { direction: 'inbound', paxType: 'adult' },
              isChangingFirstBound: false
            },
            calendarStrip: {
              ...changeDefaultProps.calendarStrip,
              defaultSelectedDate: '2018-05-21'
            },
            dynamicWaiver: {
              ...changeDefaultProps.dynamicWaiver,
              dynamicWaiverEndDate: '2018-05-20',
              dynamicWaiverStartDate: '2018-05-01',
              isDynamicWaiverEligible: true,
              isWithinDWAlternativeCities: true,
              shouldHideWarningIcon: false
            }
          });

          fireEvent.click(container.querySelectorAll('.calendar-strip--item')[0]);
          await showDialogStub.mock.calls[0][0].buttons[1].onClick();
          await searchForFlightsFnStub.mock.calls[0][1]();

          expect(historyHelper.addForbidUserClickBrowserForward).toHaveBeenCalled();
          expect(updateShouldForbidForwardFnStub).toHaveBeenCalledWith(true);
        });
      });

      describe('product select', () => {
        it('should trigger selectFareStub when product is selected', () => {
          const { getAllByTestId } = createComponent();
          const expectedSelectFareParams = {
            flightNumbers: '4827',
            airportInfo: 'DAL - AUS'
          };

          fireEvent.click(getAllByTestId('flightProducts')[0]);

          const {
            flightDetails: {
              card: { flightNumbers },
              page: { airportInfo }
            }
          } = selectFareStub.mock.calls[0][0];

          expect({ airportInfo, flightNumbers }).toEqual(expectedSelectFareParams);
        });

        it('should trigger saveSelectedProductsFn with dynamic waiver flight card type when select dynamic waiver outbound product', () => {
          const { getAllByTestId } = createComponent({
            cardsSortedBy: {
              cards: [
                new FlightProductBuilder(0).withDynamicWaiver().build(),
                new FlightProductBuilder(1).withDynamicWaiver().build()
              ]
            },
            flightCardIndex: 0,
            isLoggedIn: false,
            isReaccom: false,
            selectedBounds: {
              firstbound: true,
              secondbound: false
            },
            selectedProducts: {},
            sortByValue: 'departureTime'
          });

          fireEvent.click(getAllByTestId('flightProducts')[0]);

          expect(selectFareStub).not.toHaveBeenCalled();
          expect(fareSelectedStub.mock.calls[0][0].fareProduct._meta.productId).toEqual(
            'WGA|ADT|LLN3PNR,L,AUS,BOS,2017-10-26T12:40-05:00,2017-10-26T17:40-04:00,WN,WN,198,73H'
          );
        });
      });
    });
  });

  const createComponent = (props = {}, isReaccom = false) => {
    const defaultProps = isReaccom ? reaccomDefaultProps : changeDefaultProps;
    const finalProps = { ...defaultProps, ...props };

    return mountWithMemoryRouterAndState(AirChangeShoppingPage, {}, null, finalProps);
  };
});
