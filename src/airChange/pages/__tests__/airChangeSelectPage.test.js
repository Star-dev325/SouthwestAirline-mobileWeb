jest.mock('src/shared/helpers/dialogHelper', () => ({
  dialogHelper: jest.fn().mockReturnValue({})
}));

import { fireEvent } from '@testing-library/react';
import { AirChangeSelectPage } from 'src/airChange/pages/airChangeSelectPage';
import { sitePaths } from 'src/shared/constants/siteLinks';
import * as AppSelector from 'src/shared/selectors/appSelector';
import BoundSelectionBuilder from 'test/builders/model/boundSelectionBuilder';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('airChangeSelectPage', () => {
  let defaultProps;
  let hideDialogFnStub;
  let pushStub;
  let retrieveReservationChangeableWithSearchTokenFnStub;
  let saveSelectedBoundsFnStub;
  let searchForReaccomFlightsFnStub;
  let showDialogFnStub;

  beforeEach(() => {
    showDialogFnStub = jest.fn();
    hideDialogFnStub = jest.fn();
    pushStub = jest.fn();
    saveSelectedBoundsFnStub = jest.fn();
    searchForReaccomFlightsFnStub = jest.fn();
    retrieveReservationChangeableWithSearchTokenFnStub = jest.fn();

    defaultProps = {
      changeFlightPage: {
        _links: {
          changeShopping: 'changeShopping'
        },
        _meta: {
          hasUnaccompaniedMinor: false
        },
        boundSelections: [new BoundSelectionBuilder().build()],
        dynamicWaivers: [],
        firstbound: false,
        messages: [],
        passengerDetails: null,
        secondbound: false,
        selectionMode: 'ALL'
      },
      hideDialogFn: hideDialogFnStub,
      isOpenJaw: false,
      isReaccom: false,
      pnr: {
        confirmationNumber: 'AAAUOD',
        firstName: 'firstName',
        lastName: 'lastName'
      },
      push: pushStub,
      query: {},
      retrieveReservationChangeableWithSearchTokenFn: retrieveReservationChangeableWithSearchTokenFnStub,
      saveSelectedBoundsFn: saveSelectedBoundsFnStub,
      searchForReaccomFlightsFn: searchForReaccomFlightsFnStub,
      selectedBounds: {
        firstbound: false,
        secondbound: false
      },
      showDialogFn: showDialogFnStub
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render expected component', () => {
      const { container } = createComponent(AirChangeSelectPage, { props: defaultProps });

      expect(container).toMatchSnapshot();
    });
  });

  describe('deep link', () => {
    it('should retrieve the flight and airChange data when the page is hit directly with a searchToken', () => {
      createComponent(AirChangeSelectPage, {
        props: {
          ...defaultProps,
          changeFlightPage: {},
          query: {
            searchToken: 'abcde'
          }
        }
      });

      expect(retrieveReservationChangeableWithSearchTokenFnStub).toHaveBeenCalledWith('abcde');
    });
  });

  describe('dynamic waiver', () => {
    it('should display the select flight for dynamic waiver text', () => {
      defaultProps.changeFlightPage.messages = [
        {
          body: "Select the flight(s) you'd like to modify.",
          textColor: 'DEFAULT',
          key: 'CHANGE_FEE_DW_MESSAGE'
        }
      ];
      const { getByText } = createComponent(AirChangeSelectPage, { props: defaultProps });

      expect(getByText(defaultProps.changeFlightPage.messages[0].body)).not.toBeNull();
    });

    it('should display the dynamic waiver summary', () => {
      defaultProps.changeFlightPage.messages = [
        {
          body: 'Circumstances beyond our control (weather, etc.) are creating disruptions to our scheduled service and a flights(s) on which you are currently booked may be adversely affected. To minimize your inconvenience, we are offering the one time opportunity to change your flight date(s) and/or time(s) at no additional cost in accordance with our established reaccommodation practices.',
          textColor: 'NEGATIVE',
          header: 'You may change your travel date/time at no additional cost',
          key: 'CHANGE_DW_SUMMARY'
        }
      ];
      const { getByText } = createComponent(AirChangeSelectPage, { props: defaultProps });

      expect(getByText(defaultProps.changeFlightPage.messages[0].body)).not.toBeNull();
    });

    it('should display the dynamic waiver departing flight', () => {
      defaultProps.changeFlightPage.messages = [
        {
          body: 'Departure Airport: Hartford(BDL) . Arrival Airport: Boise(BOI) .',
          textColor: 'NEGATIVE',
          header: 'For your departing flight:',
          key: 'CHANGE_DW_DEP_STATIONS'
        },
        {
          body: 'Available Travel Dates: You can move your departing flight by up to 14 days at no additional cost.',
          textColor: 'NEGATIVE',
          header: 'None',
          key: 'CHANGE_DW_DEP_DATE'
        }
      ];
      const { getByText } = createComponent(AirChangeSelectPage, { props: defaultProps });

      expect(getByText(defaultProps.changeFlightPage.messages[0].header)).not.toBeNull();
      expect(getByText(defaultProps.changeFlightPage.messages[1].body)).not.toBeNull();
    });

    it('should display the dynamic waiver returning flight', () => {
      defaultProps.changeFlightPage.messages = [
        {
          body: 'Departure Airport: Hartford(BDL) . Arrival Airport: Boise(BOI) .',
          textColor: 'NEGATIVE',
          header: 'For your returning flight:',
          key: 'CHANGE_DW_RET_STATIONS'
        },
        {
          body: 'Available Travel Dates: You can move your returning flight by up to 14 days at no additional cost.',
          textColor: 'NEGATIVE',
          header: 'None',
          key: 'CHANGE_DW_RET_DATE'
        }
      ];
      const { getByText } = createComponent(AirChangeSelectPage, { props: defaultProps });

      expect(getByText(defaultProps.changeFlightPage.messages[0].header)).not.toBeNull();
      expect(getByText(defaultProps.changeFlightPage.messages[1].body)).not.toBeNull();
    });
  });

  describe('message', () => {
    it('should display the message when the flight is not DW', () => {
      const message = {
        body: `Select the flight(s) you'd like to modify. We never charge change fees. You'll pay only the difference in fare.`,
        header: 'none',
        icon: 'NONE',
        key: 'CHANGE_FEE_MESSAGE',
        note: 'none',
        textColor: 'DEFAULT'
      };
      const props = {
        ...defaultProps,
        changeFlightPage: {
          ...defaultProps.changeFlightPage,
          messages: [message]
        }
      };
      const { getByText } = createComponent(AirChangeSelectPage, { props });

      expect(getByText(message.body)).not.toBeNull();
    });

    it('should render change-gds-notice-message', () => {
      const message = [
        {
          key: 'CHANGE_GDS_NOTICE',
          header: null,
          body: 'Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.',
          icon: 'INFO',
          textColor: 'DEFAULT',
          primaryThemeColor: 'primary-blue',
          inverseThemeColor: 'neutral-white'
        }
      ];
      const props = {
        ...defaultProps,
        changeFlightPage: {
          ...defaultProps.changeFlightPage,
          messages: [message]
        }
      };
      const { container } = createComponent(AirChangeSelectPage, { props });

      expect(container).toMatchSnapshot();
    });

    it('should render change-gds-notice-message with header', () => {
      const message = [
        {
          key: 'CHANGE_GDS_NOTICE',
          header: 'Are you Sure??',
          body: 'Proceeding with this change may result in loss of discount applied to reservation at initial purchase, and your TMC/Travel Agency may be unable to make further changes.',
          icon: 'ERROR',
          textColor: 'DEFAULT',
          primaryThemeColor: 'primary-blue',
          inverseThemeColor: 'neutral-white'
        }
      ];
      const props = {
        ...defaultProps,
        changeFlightPage: {
          ...defaultProps.changeFlightPage,
          messages: [message]
        }
      };
      const { container } = createComponent(AirChangeSelectPage, { props });

      expect(container).toMatchSnapshot();
    });

    it('should not display the message when the flight is DW', () => {
      const messageOfDW = {
        body: 'Circumstances beyond our',
        textColor: 'NEGATIVE',
        header: 'You may change ...',
        key: 'CHANGE_DW_SUMMARY'
      };
      const props = {
        ...defaultProps,
        changeFlightPage: {
          ...defaultProps.changeFlightPage,
          messages: [messageOfDW]
        }
      };
      const { container } = createComponent(AirChangeSelectPage, { props });

      expect(container.querySelector('[data-qa="flight-change-fee-message"]')).toBeNull();
    });
  });

  describe('passenger details', () => {
    it('should render passenger details', () => {
      const passengerDetails = {
        disclaimerTextWithLinks:
          'Flight changes apply to all passengers on this reservation. If you need to make changes to one person on your itinerary, please call , <a href="tel:18004359792">1 800 I FLY SWA( 1-800-435-9792)</a>.',
        title: 'PASSENGER(S)',
        passengerList: [
          { displayName: 'Tesla Awesome' },
          { displayName: 'Tesla Smart' }
        ]
      };
      const props = {
        ...defaultProps,
        changeFlightPage: {
          ...defaultProps.changeFlightPage,
          passengerDetails
        }
      };
      const { container } = createComponent(AirChangeSelectPage, { props });

      expect(container).toMatchSnapshot();
    });
  });

  describe('continue button click', () => {
    it('should call saveSelectedBoundsFnStub when click continue button', () => {
      const { container, getByText } = createComponent(AirChangeSelectPage, { props: { ...defaultProps } });

      fireEvent.click(container.querySelector('.checkbox-button'));
      fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

      expect(saveSelectedBoundsFnStub).toHaveBeenCalledWith({ firstbound: true });
    });

    it('should transition to air change shopping page when click continue button if the flight is not openJaw', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
      const { container, getByText } = createComponent(AirChangeSelectPage, { props: { ...defaultProps } });

      fireEvent.click(container.querySelector('.checkbox-button'));
      fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

      expect(pushStub).toHaveBeenCalledWith('/air/change/find-flights.html');
    });

    describe('flight is openJaw', () => {
      it('should show dialog when click continue button if the flight is openJaw and both segments selected', () => {
        const boundSelections = [
          new BoundSelectionBuilder().withFrom('Boise, ID - BOI', 'BOI').build(),
          new BoundSelectionBuilder().withTo('Austin, TX - AUS', 'AUS').build()
        ];

        const { container, getByText } = createComponent(AirChangeSelectPage, {
          props: {
            ...defaultProps,
            changeFlightPage: { ...defaultProps.changeFlightPage, boundSelections },
            isOpenJaw: true
          }
        });

        const checkboxes = container.querySelectorAll('.checkbox-button');

        fireEvent.click(checkboxes[0]);
        fireEvent.click(checkboxes[1]);
        fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

        expect(pushStub).not.toHaveBeenCalled();
        expect(showDialogFnStub).toHaveBeenCalledWith({
          closeLabel: 'SHARED__BUTTON_TEXT__CANCEL',
          title: 'SHARED__ERROR_MESSAGES__AIR_CHANGE_OPEN_JAW_BOTH_BOUNDS',
          verticalLinks: {
            links: [
              {
                dataQa: 'goToSWLink',
                href: sitePaths.airChangeFullSite,
                isExternal: true,
                label: 'LONE_STAR__GO_TO_SW',
                onClick: hideDialogFnStub
              }
            ]
          }
        });
      });

      it('should not show dialog when click continue button if the flight is openJaw and only one segment selected', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
        const boundSelections = [
          new BoundSelectionBuilder().withFrom('Boise, ID - BOI', 'BOI').build(),
          new BoundSelectionBuilder().withTo('Austin, TX - AUS', 'AUS').build()
        ];

        const { container, getByText } = createComponent(AirChangeSelectPage, {
          props: {
            ...defaultProps,
            changeFlightPage: {
              ...defaultProps.changeFlightPage,
              boundSelections
            },
            isOpenJaw: true
          }
        });

        fireEvent.click(container.querySelector('.checkbox-button'));
        fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

        expect(pushStub).toHaveBeenCalledWith('/air/change/find-flights.html');
        expect(showDialogFnStub).not.toHaveBeenCalled();
      });
    });
  });

  describe('Reaccom scenario', () => {
    const reaccomProps = {
      hideDialogFn: hideDialogFnStub,
      isOpenJaw: false,
      isReaccom: true,
      pnr: {
        confirmationNumber: 'AAAUOD',
        firstName: 'firstName',
        lastName: 'lastName'
      },
      push: pushStub,
      query: {},
      reaccomFlightPage: {
        _links: { reaccomProducts: { body: { outbound: 'outbound' } } },
        _meta: { hasUnaccompaniedMinor: false, isBlockMultiBoundSelection: false, isSwabiz: false },
        boundSelections: [new BoundSelectionBuilder().withReaccomBound().build()],
        messages: []
      },
      saveSelectedBoundsFn: saveSelectedBoundsFnStub,
      selectedBounds: { firstbound: true, secondbound: false },
      showDialogFn: showDialogFnStub,
      searchForReaccomFlightsFn: searchForReaccomFlightsFnStub
    };

    beforeEach(() => {
      reaccomProps.hideDialogFn = hideDialogFnStub;
      reaccomProps.push = pushStub;
      reaccomProps.saveSelectedBoundsFn = saveSelectedBoundsFnStub;
      reaccomProps.searchForReaccomFlightsFn = searchForReaccomFlightsFnStub;
      reaccomProps.showDialogFn = showDialogFnStub;
    });

    describe('render', () => {
      it('should render expected component', () => {
        const { container } = createComponent(AirChangeSelectPage, { props: reaccomProps });

        expect(container).toMatchSnapshot();
      });

      it('should pass ineligibleBoundMessages to BoundSelectForm when reaccom-contact-us message is specified', () => {
        const message = {
          body: 'contact us message',
          header: null,
          icon: 'NONE',
          key: 'REACCOM_CONTACT_US_TO_CHANGE_FLIGHT',
          textColor: 'DEFAULT'
        };
        const props = {
          ...reaccomProps,
          reaccomFlightPage: {
            ...reaccomProps.reaccomFlightPage,
            boundSelections: [new BoundSelectionBuilder().withReaccomBound(false).build()],
            messages: [message]
          }
        };
        const { getByText } = createComponent(AirChangeSelectPage, { props });

        expect(getByText(message.body)).not.toBeNull();
      });

      it('should show outbound not selectable when outbound is flown', () => {
        const boundSelections = [
          new BoundSelectionBuilder().withReaccomBound(false, true).build(),
          new BoundSelectionBuilder().withReaccomBound().build()
        ];

        const props = {
          ...reaccomProps,
          reaccomFlightPage: {
            ...reaccomProps.reaccomFlightPage,
            boundSelections: boundSelections
          }
        };
        const { container } = createComponent(AirChangeSelectPage, { props });

        expect(container.querySelectorAll('.checkbox-button').length).toEqual(1);
      });

      describe('showSwappedBounds', () => {
        const swappedBoundProps = {
          ...reaccomProps,
          reaccomFlightPage: {
            ...reaccomProps.reaccomFlightPage,
            messages: [{
              key: 'REACCOM_CONTACT_US_TO_CHANGE_FLIGHT',
              header: null,
              body: 'contact us message',
              icon: 'NONE',
              textColor: 'DEFAULT'
            }]
          }
        };

        it('should swap bounds amd messages passed to BoundSelectForm when 1st bound is not eligible and 2nd bound is eligible', () => {
          const bounds1 = new BoundSelectionBuilder().withReaccomBound(false).build();
          const bounds2 = new BoundSelectionBuilder().withReaccomBound(true).build();
          const props = {
            ...swappedBoundProps,
            reaccomFlightPage: {
              ...swappedBoundProps.reaccomFlightPage,
              boundSelections: [bounds1, bounds2]
            }
          };
          const { getByText } = createComponent(AirChangeSelectPage, { props });

          expect(getByText('contact us message')).not.toBeNull();
        });

        it('should not swap bounds passed to BoundSelectForm when 1st bound is eligible and 2nd bound is not eligible', () => {
          const bounds1 = new BoundSelectionBuilder().withReaccomBound(true).build();
          const bounds2 = new BoundSelectionBuilder().withReaccomBound(false).build();
          const props = {
            ...swappedBoundProps,
            reaccomFlightPage: {
              ...swappedBoundProps.reaccomFlightPage,
              boundSelections: [bounds1, bounds2]
            }
          };
          const { getAllByText } = createComponent(AirChangeSelectPage, { props });

          expect(getAllByText('contact us message').length).toEqual(1);
        });

        it('should pass the one bound to BoundSelectForm when only bound is eligible', () => {
          const bounds1 = new BoundSelectionBuilder().withReaccomBound(true).build();
          const props = {
            ...swappedBoundProps,
            reaccomFlightPage: {
              ...swappedBoundProps.reaccomFlightPage,
              boundSelections: [bounds1]
            }
          };

          const { container } = createComponent(AirChangeSelectPage, { props });

          expect(container.querySelectorAll('.checkbox-button').length).toEqual(1);
        });
      });

      it('should render reaccom-change-message', () => {
        const messages = [{
          key: 'REACCOM_CHANGE_FLIGHT',
          header: null,
          body: 'The selected flight(s) may be modified at no additional cost.',
          icon: 'NONE',
          textColor: 'DEFAULT'
        }];
        const props = {
          ...reaccomProps,
          reaccomFlightPage: {
            ...reaccomProps.reaccomFlightPage,
            messages
          }
        };
        const { container } = createComponent(AirChangeSelectPage, { props });

        expect(container).toMatchSnapshot();
      });

      it('should render reaccom-change-message with default values', () => {
        const messages = [{
          key: 'REACCOM_CHANGE_FLIGHT',
          body: 'The selected flight(s) may be modified at no additional cost.'
        }];
        const props = {
          ...reaccomProps,
          reaccomFlightPage: {
            messages
          }
        };
        const { container } = createComponent(AirChangeSelectPage, { props });

        expect(container).toMatchSnapshot();
      });

      it('should render reaccom-gds-notice-message', () => {
        const messages = [{
          key: 'REACCOM_CHANGE_GDS_NOTICE',
          header: 'Are You Sure??',
          body: 'If you proceed, any corporate discounts may not apply and your TMC/Travel Agency may be unable to make further charges.',
          icon: 'INFO',
          textColor: 'DEFAULT',
          primaryThemeColor: 'primary-blue',
          inverseThemeColor: 'neutral-white'
        }];
        const props = {
          ...reaccomProps,
          reaccomFlightPage: {
            ...reaccomProps.reaccomFlightPage,
            messages
          }
        };
        const { container } = createComponent(AirChangeSelectPage, { props });

        expect(container).toMatchSnapshot();
      });

      it('should render reaccom-change-flight-both-eligible-message', () => {
        const messages = [{
          key: 'REACCOM_CHANGE_FLIGHT_BOTH_ELIGIBLE',
          header: 'Are You Sure??',
          body: 'If you proceed, any corporate discounts may not apply and your TMC/Travel Agency may be unable to make further charges.',
          icon: 'INFO',
          textColor: 'DEFAULT'
        }];

        const props = {
          ...reaccomProps,
          reaccomFlightPage: {
            messages
          }
        };
        const { container } = createComponent(AirChangeSelectPage, { props });

        expect(container).toMatchSnapshot();
      });

      it('should render split pnr confirmation message', () => {
        const messages = [{
          key: 'CHANGE_SPLIT_PNR_CONFIRMATION',
          header: 'Your new confirmation number # PPUWKZ',
          body: null,
          icon: 'INFO',
          textColor: 'DEFAULT',
          primaryThemeColor: 'primary-blue',
          inverseThemeColor: 'neutral-white'
        }];

        const props = {
          ...defaultProps,
          changeFlightPage: {
            ...defaultProps.changeFlightPage,
            messages
          }
        };
        const { container } = createComponent(AirChangeSelectPage, { props });

        expect(container).toMatchSnapshot();
      });
    });

    describe('click continue', () => {
      it('should call searchForReaccomFlightsFn action when continue button is pressed (single bound - outbound)', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
        const props = {
          ...reaccomProps
        };

        const { getByText } = createComponent(AirChangeSelectPage, { props });

        fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

        expect(searchForReaccomFlightsFnStub).toHaveBeenCalledWith(
          reaccomProps.reaccomFlightPage._links.reaccomProducts,
          '/air/change/outbound/results'
        );
      });

      it('should call searchForReaccomFlightsFn action when continue button is pressed (round trip - only inbound selected)', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
        const boundSelections = [
          new BoundSelectionBuilder().withReaccomBound(false).build(),
          new BoundSelectionBuilder().withReaccomBound(true).build()
        ];

        const props = {
          ...reaccomProps,
          reaccomFlightPage: {
            ...reaccomProps.reaccomFlightPage,
            _links: {
              reaccomProducts: { body: { outbound: 'outbound', inbound: 'inbound' } }
            },
            boundSelections
          }
        };

        const { getByText } = createComponent(AirChangeSelectPage, { props });

        fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

        expect(searchForReaccomFlightsFnStub).toHaveBeenCalledWith(
          { body: { inbound: 'inbound' } },
          '/air/change/inbound/results'
        );
      });

      it('should not display a pop error and call searchForReaccomFlightsFn action when continue button is pressed when openjaw', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
        const boundSelections = [
          new BoundSelectionBuilder().withReaccomBound(true).build(),
          new BoundSelectionBuilder().withReaccomBound(false).build()
        ];

        const { getByText } = createComponent(AirChangeSelectPage, {
          props: {
            ...reaccomProps,
            isOpenJaw: true,
            reaccomFlightPage: {
              ...reaccomProps.reaccomFlightPage,
              boundSelections
            }
          }
        });

        fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

        expect(searchForReaccomFlightsFnStub).toHaveBeenCalledWith(
          reaccomProps.reaccomFlightPage._links.reaccomProducts,
          '/air/change/outbound/results'
        );
      });

      describe('When reaccom flight is open jaw', () => {
        const boundSelections = [
          new BoundSelectionBuilder().withReaccomBound(true).build(),
          new BoundSelectionBuilder().withReaccomBound(true).build()
        ];

        it('should show dialog if both segments selected and allowARNKPnrs is false', () => {
          const { getByText } = createComponent(AirChangeSelectPage, {
            props: {
              ...reaccomProps,
              isOpenJaw: true,
              reaccomFlightPage: {
                ...reaccomProps.reaccomFlightPage,
                boundSelections,
                _meta: {
                  ...reaccomProps.reaccomFlightPage._meta,
                  allowARNKPnrs: false
                }
              }
            }
          });

          fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

          expect(showDialogFnStub).toHaveBeenCalledWith({
            closeLabel: 'SHARED__BUTTON_TEXT__CANCEL',
            title: 'SHARED__ERROR_MESSAGES__AIR_CHANGE_OPEN_JAW_BOTH_BOUNDS',
            verticalLinks: {
              links: [
                {
                  dataQa: 'goToSWLink',
                  href: sitePaths.airChangeFullSite,
                  isExternal: true,
                  label: 'LONE_STAR__GO_TO_SW',
                  onClick: hideDialogFnStub
                }
              ]
            }
          });
        });

        it('should not show dialog if the flight is openJaw, both segments selected and allowARNKPnrs is true', () => {
          const { getByText } = createComponent(AirChangeSelectPage, {
            props: {
              ...reaccomProps,
              isOpenJaw: true,
              reaccomFlightPage: {
                ...reaccomProps.reaccomFlightPage,
                boundSelections,
                _meta: {
                  ...reaccomProps.reaccomFlightPage._meta,
                  allowARNKPnrs: true
                }
              }
            }
          });

          fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

          expect(showDialogFnStub).not.toHaveBeenCalled();
        });
      });

      describe('reaccom co-terminal eligible', () => {
        it('should transition to air change shopping page when alternateReaccomOriginationAirportCodes exists', () => {
          jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('air/change');
          const reaccomCoTerminalEligibleBound = {
            ...reaccomProps.reaccomFlightPage.boundSelections[0],
            alternateReaccomDestinationAirportCodes: ['LGA', 'JFK'],
            alternateReaccomOriginationAirportCodes: ['HOU', 'IAH']
          };
          const props = {
            ...reaccomProps,
            reaccomFlightPage: {
              ...reaccomProps.reaccomFlightPage,
              boundSelections: [reaccomCoTerminalEligibleBound]
            }
          };

          const { getByText } = createComponent(AirChangeSelectPage, { props });

          fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

          expect(pushStub).toHaveBeenCalledWith('/air/change/find-flights.html');
        });

        it('should handle default value for reaccomFlightPage when it is falsy', () => {
          const props = {
            ...reaccomProps,
            isReaccom: true,
            reaccomFlightPage: undefined
          };

          const { getByText } = createComponent(AirChangeSelectPage, { props });

          fireEvent.click(getByText('SHARED__BUTTON_TEXT__CONTINUE'));

          expect(pushStub).toNotHaveBeenCalled;
        });
      });
    });
  });
});
