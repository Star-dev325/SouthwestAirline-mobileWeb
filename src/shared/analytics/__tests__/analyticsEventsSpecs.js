import sinonModule from 'sinon';
import BrowserObject from 'src/shared/helpers/browserObject';
import _ from 'lodash';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import { fireAnalyticsEvents } from 'src/shared/analytics/analyticsEvents';
import CheckInActionTypes from 'src/checkIn/actions/checkInActionTypes';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import ViewReservationActionTypes from 'src/viewReservation/actions/viewReservationActionTypes';
import travelFundActionTypes from 'src/travelFunds/actions/travelFundsActionTypes';
import AirCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import EarlyBirdEligibilityBuilder from 'test/builders/model/earlyBirdEligibilityBuilder';

const { window } = BrowserObject;
const { FUND_TYPES_FORMATTED } = TravelFundsConstants;
const {
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
  AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
  AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
  AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
  AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
  AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY,
  AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS
} = AirBookingActionTypes;
const { CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS } = CheckInActionTypes;
const { SHARED__ROUTE_CHANGED, SHARED__CALC_FUNDS_SUCCESS, SHARED__CALC_FUNDS_FAILED } = SharedActionTypes;
const { VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS } = ViewReservationActionTypes;
const { TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS, TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED } = travelFundActionTypes;
const { AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS } = AirCancelActionTypes;
const {
  SWITCH_EARLYBIRD_IN_PATH_BUTTON,
  VIEW_MODAL,
  VIEW_TAB,
  PAGE_LOAD_COMPLETED,
  TRACK_SUBMIT_FORM,
  APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
  UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
  TRACK_CALENDAR_STRIP
} = AnalyticsActionTypes;

const sinon = sinonModule.sandbox.create();

describe('analyticsEventMiddleware', () => {
  beforeEach(() => {
    sinon.stub(analyticsEventHelper, 'raiseEvent');
    sinon.stub(analyticsEventHelper, 'raiseSatelliteEvent');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should fire sort event when action type SORT_FLIGHT_SHOPPING_PAGE_BY is processed', () => {
    window.data_a = {};
    const action = { type: AirBookingActionTypes.AIR_BOOKING__SORT_FLIGHT_SHOPPING_PAGE_BY, sortBy: 'numberOfStops' };
    const state = {
      router: {
        location: {
          pathname: '/air/booking/shopping/adult/outbound/results'
        }
      }
    };

    const store = {
      getState: () => state
    };

    fireAnalyticsEvents(store)(action);

    expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('sort');
    expect(window.data_a.events.sort).to.equal('air-booking-shopping-adult-outbound-results_sort_by_number_of_stops');
  });

  it('should fire chaseBannerDisplayComplete event when action type FETCH_CHASE_BANNER_CONFIG_SUCCESS is processed', () => {
    const action = {
      type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
      isChaseBannerShown: true
    };

    fireAnalyticsEvents({})(action);

    expect(analyticsEventHelper.raiseEvent).to.be.calledWith('chaseBannerDisplayComplete');
  });

  it('should fire chaseBannerDisplayComplete event when action type FETCH_CHASE_BANNER_CONFIG_FAILED is processed', () => {
    const action = {
      type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_FAILED,
      isChaseBannerShown: true
    };

    fireAnalyticsEvents({})(action);

    expect(analyticsEventHelper.raiseEvent).to.be.calledWith('chaseBannerDisplayComplete');
  });

  it('should fire travelInformationSaved event when action type VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS is processed', () => {
    const action = {
      type: VIEW_RESERVATION__TRAVEL_INFORMATION_ANALYTICS
    };

    fireAnalyticsEvents({})(action);

    expect(analyticsEventHelper.raiseEvent).to.be.calledWith('travelInformationSaved');
  });

  it('should fire addedEarlyBird event when user added earlybird in path', () => {
    const action = { type: SWITCH_EARLYBIRD_IN_PATH_BUTTON, isEarlyBirdInPathButtonChecked: true };

    fireAnalyticsEvents({})(action);

    expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('addedEarlyBird');
  });

  it('should fire removedEarlyBird event when user removed earlybird in path', () => {
    const action = { type: SWITCH_EARLYBIRD_IN_PATH_BUTTON, isEarlyBirdInPathButtonChecked: false };

    fireAnalyticsEvents({})(action);

    expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('removedEarlyBird');
  });

  it('should fire viewModal event when user causes a dialog to be displayed', () => {
    const action = { type: VIEW_MODAL, name: 'dialog test name' };

    fireAnalyticsEvents({})(action);

    expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('modalLoad');
  });

  it('should fire trackViewForm event when user causes a tracked submitForm action', () => {
    const store = {};
    const formName = 'test-tracked-form';
    const action = { type: TRACK_SUBMIT_FORM, formName };

    fireAnalyticsEvents(store)(action);

    expect(window.data_a.events.formSubmitted).to.equal(formName);
    expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('formSubmit');
  });

  it('should fire panelLoad event when tab changed on view reservation page', () => {
    const state = {
      router: {
        location: {
          pathname: '/view-reservation'
        }
      }
    };
    const store = {
      getState: () => state
    };
    const name = 'test-view-tab';
    const action = { type: VIEW_TAB, name };

    fireAnalyticsEvents(store)(action);

    expect(window.data_a.events.panelLoaded).to.equal('view-reservation_test-view-tab');
    expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('panelLoad');
  });

  it('should fire the update concatenated content block ids event', () => {
    const state = {
      router: {
        location: {
          pathname: '/view-reservation'
        }
      }
    };
    const action = {
      type: UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
      payload: 'block1:block2'
    };
    const store = {
      getState: () => state
    };

    fireAnalyticsEvents(store)(action);

    expect(window.data_a.pageLoaded.contentBlockIds).to.equal(action.payload);
  });

  it('should fire the fetch cancel bound confirmation success action', () => {
    const response = {
      cancelBoundConfirmationPage: {
        remainingBounds: [
          {
            checkInEligible: false
          }
        ]
      }
    };

    const action = {
      type: AIR_CANCEL__FETCH_CANCEL_BOUND_CONFIRMATION_SUCCESS,
      response
    };

    fireAnalyticsEvents({})(action);

    expect(window.data_a.stores.AirViewReservationStore.details.checkInButton).to.equal(false);
  });

  it('should fire calendarStripClicked event when action type TRACK_CALENDAR_STRIP is processed', () => {
    const action = {
      type: TRACK_CALENDAR_STRIP,
      selectedDate: '2020-11-30'
    };

    fireAnalyticsEvents({})(action);

    expect(analyticsEventHelper.raiseEvent).to.be.calledWith('calendarStripClicked');
  });

  context('UPDATE_CONCATENATED_CONTENT_BLOCK_IDS', () => {
    let store;

    beforeEach(() => {
      window.data_a = {};
      store = {};
    });

    it('should append when CBIDs already exist in store', () => {
      const actionUpdate = {
        type: UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: 'block1:block2'
      };

      fireAnalyticsEvents(store)(actionUpdate);

      const actionAppend = {
        type: APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: 'block3:block4'
      };

      fireAnalyticsEvents(store)(actionAppend);

      expect(window.data_a.pageLoaded.contentBlockIds).to.equal('block3:block4:block1:block2');
    });

    it('should not append when CBIDs already exist in store but no payload', () => {
      const actionUpdate = {
        type: UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: 'block1:block2'
      };

      fireAnalyticsEvents(store)(actionUpdate);

      const actionAppend = {
        type: APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: ''
      };

      fireAnalyticsEvents(store)(actionAppend);

      expect(window.data_a.pageLoaded.contentBlockIds).to.equal('block1:block2');
    });

    it('should not append again when CBIDs are already appended', () => {
      const actionUpdate = {
        type: UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: 'block1:block2'
      };

      fireAnalyticsEvents(store)(actionUpdate);

      const actionAppend = {
        type: APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: 'block3:block4'
      };

      fireAnalyticsEvents(store)(actionAppend);
      fireAnalyticsEvents(store)(actionAppend);

      expect(window.data_a.pageLoaded.contentBlockIds).to.equal('block3:block4:block1:block2');
    });

    it('should update when no CBIDs exist in store', () => {
      const actionAppend = {
        type: APPEND_CONCATENATED_CONTENT_BLOCK_IDS,
        payload: 'block3:block4'
      };

      fireAnalyticsEvents(store)(actionAppend);

      expect(window.data_a.pageLoaded.contentBlockIds).to.equal(actionAppend.payload);
    });
  });

  context('page load event', () => {
    let store;
    let action;
    let state;

    beforeEach(() => {
      window.data_a = {};
      state = {};
      store = {
        getState: () => state
      };
      action = {
        type: SHARED__ROUTE_CHANGED,
        location: {
          action: 'PUSH',
          path: '/air/booking/shopping',
          pathname: '/air/booking/shopping'
        }
      };
    });

    context('action is SHARED__ROUTE_CHANGED', () => {
      it('should fire page load event when location changed and url is not in the blackout list', () => {
        fireAnalyticsEvents(store)(action);

        expect(window.data_a.events.pageView).to.equal('air-booking-shopping');
        expect(window.data_a.page).to.equal('air-booking-shopping');
        expect(window.data_a.pageLoaded).to.be.undefined;
        expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
      });

      it('should delete data_a.pageLoaded content on SHARED_ROUTE_CHANGED', () => {
        const updateAction = {
          type: UPDATE_CONCATENATED_CONTENT_BLOCK_IDS,
          payload: 'block1:block2'
        };

        fireAnalyticsEvents(store)(updateAction);
        expect(window.data_a.pageLoaded.contentBlockIds).to.equal(updateAction.payload);

        fireAnalyticsEvents(store)(action);
        expect(window.data_a.pageLoaded).to.be.undefined;
      });

      context('Popup is shown', () => {
        it('should not fire pageLoad event when popup is displayed', () => {
          const actionForPopup = _.set(action, 'location.state.popup', 'open');

          fireAnalyticsEvents(store)(actionForPopup);

          expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
        });
      });

      context('Redirected from redirectFlowInterceptor', () => {
        it('should not fire page load event and dispatch setIsRedirectingPath action with false', () => {
          const dispatchStub = sinon.stub();

          store = {
            ...store,
            dispatch: dispatchStub
          };

          _.set(state, 'app.isRedirectingPath', true);

          fireAnalyticsEvents(store)(action);

          expect(analyticsEventHelper.raiseEvent).to.not.have.been.called;
          expect(dispatchStub).to.have.been.calledWith({
            type: 'SHARED__SET_IS_REDIRECTING_PATH',
            isRedirectingPath: false
          });
        });
      });

      context('webview black list', () => {
        let sharedRouteChangedAction;
        let getPrevRouteStateStub;

        beforeEach(() => {
          sharedRouteChangedAction = {
            type: SHARED__ROUTE_CHANGED,
            location: {
              pathname: '/air/booking/shopping/adult/outbound/results',
              search: ''
            }
          };
          getPrevRouteStateStub = sinon.stub(RouteStateHelper, 'getPrevRouteState');
        });

        context('isWebView false', () => {
          beforeEach(() => {
            state = {
              app: {
                webView: {
                  isWebView: false
                }
              }
            };
          });

          it('should fire page load event if previous path is /', () => {
            getPrevRouteStateStub.returns({
              pathname: '/'
            });
            fireAnalyticsEvents(store)(sharedRouteChangedAction);

            expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
          });

          it('should fire page load event if previous path is /blank and url is in webview black list', () => {
            getPrevRouteStateStub.returns({
              pathname: '/blank'
            });
            fireAnalyticsEvents(store)(sharedRouteChangedAction);

            expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
          });
        });

        context('isWebView true', () => {
          beforeEach(() => {
            state = {
              app: {
                webView: {
                  isWebView: true
                }
              }
            };
          });

          context('url is in webview black list', () => {
            it('should fire page load event if previous path is not /blank', () => {
              getPrevRouteStateStub.returns({
                pathname: '/not-blank'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
            });

            it('should not fire page load event if previous path is /blank', () => {
              getPrevRouteStateStub.returns({
                pathname: '/blank'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.not.have.been.called;
              expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
            });

            it('should not fire page load event if previous path is /', () => {
              getPrevRouteStateStub.returns({
                pathname: '/'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
            });
          });

          context('url is not in webview black list', () => {
            it('should fire page load event even if previous path is /blank', () => {
              sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  pathname: '/not/webview/blacklist',
                  search: ''
                }
              };
              getPrevRouteStateStub.returns({
                pathname: '/blank'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
            });

            it('should not fire page load event if previous path is /', () => {
              sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  pathname: '/not/webview/blacklist',
                  search: ''
                }
              };
              getPrevRouteStateStub.returns({
                pathname: '/'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
            });
          });

          context('previous and current path are the same', () => {
            it('should fire page load event if route change method is not replace', () => {
              sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  pathname: '/same/route',
                  search: ''
                },
                method: 'NOT_REPLACE'
              };
              getPrevRouteStateStub.returns({
                pathname: '/same/route'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
            });

            it('should not fire page load event if route change method is replace', () => {
              sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  pathname: '/same/route',
                  search: ''
                },
                method: 'REPLACE'
              };
              getPrevRouteStateStub.returns({
                pathname: '/same/route'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
            });
          });

          context('previous and current path are different', () => {
            it('should fire page load event even if route change method is replace', () => {
              sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  pathname: '/new/route',
                  search: ''
                },
                method: 'REPLACE'
              };
              getPrevRouteStateStub.returns({
                pathname: '/previous/route'
              });
              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
            });
          });
        });
      });

      context('blackout list', () => {
        context('url is in blackout list', () => {
          it('should not fire page load event when url matches "/view-reservation/trip-details/PNR123"', () => {
            const sharedRouteChangedAction = {
              type: SHARED__ROUTE_CHANGED,
              location: {
                action: 'PUSH',
                pathname: '/view-reservation/trip-details/PNR123',
                state: {
                  firstName: 'fred',
                  lastName: 'new'
                },
                search: ''
              }
            };

            fireAnalyticsEvents(store)(sharedRouteChangedAction);

            expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
          });

          it('should not fire page load event when url matches "/my-account/upcoming-trip-details/6?..."', () => {
            const sharedRouteChangedAction = {
              type: SHARED__ROUTE_CHANGED,
              location: {
                action: 'PUSH',
                pathname: '/my-account/upcoming-trip-details/6',
                search: '?recordLocator=SIH274',
                state: {
                  firstName: 'KY',
                  lastName: 'TEST'
                }
              }
            };

            fireAnalyticsEvents(store)(sharedRouteChangedAction);

            expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
          });

          it('should not fire page load event when url matches "/blank"', () => {
            const sharedRouteChangedAction = {
              type: SHARED__ROUTE_CHANGED,
              location: {
                action: 'PUSH',
                pathname: '/blank',
                search: '',
                state: {
                  firstName: 'KY',
                  lastName: 'TEST'
                }
              }
            };

            fireAnalyticsEvents(store)(sharedRouteChangedAction);

            expect(analyticsEventHelper.raiseEvent).to.not.have.been.calledWith('pageLoad');
          });
        });

        context('url is not in blackout list and url similar to blackout list', () => {
          context('pathname starts with /view-reservation', () => {
            it('should fire page load event when action is SHARED__ROUTE_CHANGED and url matches "/view-reservation/trip-details"', () => {
              const sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  action: 'PUSH',
                  pathname: '/view-reservation/trip-details'
                }
              };

              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
              expect(window.data_a.events.pageView).to.equal('view-reservation-trip-details');
              expect(window.data_a.page).to.equal('view-reservation-trip-details');
            });

            it('should fire page load event when url matches "/view-reservation/trip-details/travel-info-page/:passengerReference"', () => {
              const sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  action: 'PUSH',
                  pathname: '/view-reservation/trip-details/travel-info-page/8',
                  state: {
                    firstName: 'fred',
                    lastName: 'new',
                    recordLocator: 'PH7EUJ'
                  },
                  search: ''
                }
              };

              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
              expect(window.data_a.events.pageView).to.equal('view-reservation-trip-details-travel-info-page-8');
              expect(window.data_a.page).to.equal('view-reservation-trip-details-travel-info-page-8');
            });

            it('should fire page load event when url matches "/view-reservation/trip-details/travel-info-page/3?firstName=K&lastName=Hello&recordLocator=PH7EUJ"', () => {
              const sharedRouteChangedAction = {
                type: SHARED__ROUTE_CHANGED,
                location: {
                  action: 'PUSH',
                  pathname: '/view-reservation/trip-details/travel-info-page/3',
                  search: 'firstName=K&lastName=Hello&recordLocator=PH7EUJ'
                }
              };

              fireAnalyticsEvents(store)(sharedRouteChangedAction);

              expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
            });
          });
        });
      });
    });

    context('action is PAGE_LOAD_COMPLETED', () => {
      it('should fire page load event when action is PAGE_LOAD_COMPLETED and url matches "/view-reservation/trip-details/:recordLocator"', () => {
        const pageLoadCompletedAction = {
          type: PAGE_LOAD_COMPLETED,
          location: {
            action: 'PUSH',
            pathname: '/view-reservation/trip-details/PNR123'
          }
        };

        fireAnalyticsEvents(store)(pageLoadCompletedAction);

        expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
        expect(window.data_a.events.pageView).to.equal('view-reservation-trip-details-PNR123');
        expect(window.data_a.page).to.equal('view-reservation-trip-details-PNR123');
      });

      it('should fire page load event when action is PAGE_LOAD_COMPLETED and url matches "/view-reservation/trip-details/:recordLocator with state"', () => {
        const pageLoadCompletedAction = {
          type: PAGE_LOAD_COMPLETED,
          location: {
            action: 'PUSH',
            pathname: '/view-reservation/trip-details/PNR123',
            state: {
              firstName: 'xxx',
              lastName: 'xxx'
            },
            search: ''
          }
        };

        fireAnalyticsEvents(store)(pageLoadCompletedAction);

        expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
      });

      it('should fire page load event when action is PAGE_LOAD_COMPLETED and url matches "/my-account/upcoming-trip-details/6?...', () => {
        const pageLoadCompletedAction = {
          type: PAGE_LOAD_COMPLETED,
          location: {
            action: 'PUSH',
            pathname: '/my-account/upcoming-trip-details/6',
            search: '?recordLocator=SIH274',
            state: {
              firstName: 'KY',
              lastName: 'TEST'
            }
          }
        };

        fireAnalyticsEvents(store)(pageLoadCompletedAction);

        expect(analyticsEventHelper.raiseEvent).to.have.been.calledWith('pageLoad');
      });
    });

    context('EarlyBird on Price', () => {
      context('when landing on price page', () => {
        it('should return 1 if eb is presented on the price page', () => {
          const pricePlacementSuccessAction = {
            type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
            response: {
              results: {
                earlyBirdUpsell: { someData: '' }
              }
            }
          };

          fireAnalyticsEvents(store)(pricePlacementSuccessAction);

          expect(window.data_a.eboffered).to.equal('1');
        });

        it('should return 0 if eb is not presented on the price page', () => {
          const pricePlacementSuccessAction = {
            type: AIR_BOOKING__FETCH_PRICE_PAGE_PLACEMENTS_SUCCESS,
            response: {
              results: {
                chaseBanner: {}
              }
            }
          };

          fireAnalyticsEvents(store)(pricePlacementSuccessAction);

          expect(window.data_a.eboffered).to.equal('0');
        });
      });

      context('when landing on purchase page', () => {
        it('should return 1 if eb is presented on the purchase page', () => {
          const purchasePlacementSuccessAction = {
            type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
            response: {
              results: {
                earlyBirdUpsell: { someData: '' }
              }
            }
          };

          fireAnalyticsEvents(store)(purchasePlacementSuccessAction);

          expect(window.data_a.eboffered).to.equal('1');
        });

        it('should return 0 if eb is not presented on the purchase page', () => {
          const purchasePlacementSuccessAction = {
            type: AIR_BOOKING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
            response: {
              results: {
                chaseBanner: {}
              }
            }
          };

          fireAnalyticsEvents(store)(purchasePlacementSuccessAction);

          expect(window.data_a.eboffered).to.equal('0');
        });
      });

      it('should trigger satellite event if eb successfully purchased (AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS)', () => {
        const bookingConfirmationAction = {
          type: AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
          response: {
            flightConfirmationPage: {
              headerMessage: {
                key: 'BOOKING_EARLYBIRD_CONFIRMATION'
              }
            }
          }
        };

        fireAnalyticsEvents(store)(bookingConfirmationAction);

        expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('event:eb-confirmed');
      });

      it('should not trigger satellite event if eb was not successfully purchased (AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS)', () => {
        const bookingConfirmationAction = {
          type: AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
          response: {
            flightConfirmationPage: {
              headerMessage: {
                key: 'BOOKING_CONFIRMATION'
              }
            }
          }
        };

        fireAnalyticsEvents(store)(bookingConfirmationAction);
        expect(analyticsEventHelper.raiseSatelliteEvent).not.to.have.been.called;
      });

      it('should trigger satellite event if eb selected (AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED)', () => {
        const saveEbAction = {
          type: AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
          earlyBirdSelected: true
        };

        fireAnalyticsEvents(store)(saveEbAction);
        expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('toggle|eb selected');
      });

      it('should not trigger satellite event if eb is not selected (AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED)', () => {
        const saveEbAction = {
          type: AIR_BOOKING__SAVE_EARLY_BIRD_SELECTED,
          earlyBirdSelected: false
        };

        fireAnalyticsEvents(store)(saveEbAction);
        expect(analyticsEventHelper.raiseSatelliteEvent).not.to.have.been.called;
      });

      it('should set correct params on data_a (AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY)', () => {
        const setEbEligibilityAction = {
          type: AIR_BOOKING__SET_EARLY_BIRD_ELIGIBILITY,
          earlyBirdEligibility: new EarlyBirdEligibilityBuilder().build()
        };

        fireAnalyticsEvents(store)(setEbEligibilityAction);

        expect(window.data_a.ebeligible).to.equal('1');
        expect(window.data_a.ebbound1_price).to.equal('15.00');
        expect(window.data_a.ebbound2_price).to.equal(undefined);
        expect(window.data_a.ebeligiblebounds).to.equal('1');
      });

      it('should set ebaddedonprice for data_a (AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS)', () => {
        const setEbEligibilityAction = {
          type: AIR_BOOKING__FETCH_EARLY_BIRD_IN_PATH_INFO_SUCCESS,
          earlyBirdEligibility: new EarlyBirdEligibilityBuilder().build()
        };
        const state = {
          app: {
            airBooking: {
              earlyBirdSelected: true
            }
          }
        };
        const store = {
          getState: () => state
        };

        fireAnalyticsEvents(store)(setEbEligibilityAction);

        expect(window.data_a.ebaddedonprice).to.equal('1');
      });
    });

    context('Travel Funds', () => {
      context('action is TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS', () => {
        it('should fire lookUpFundsSearchSuccess event for funds available', () => {
          const fetchTravelFundsAction = {
            type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS,
            response: {
              viewTravelFund: [
                {
                  currentAmount: {
                    amount: '10.00'
                  }
                }
              ]
            }
          };

          fireAnalyticsEvents(store)(fetchTravelFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('funds search:funds available');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('funds search:funds available');
        });

        it('should fire lookUpFundsSearchSuccess event for funds unavailable and currentAmount is ZERO', () => {
          const fetchTravelFundsAction = {
            type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS,
            response: {
              viewTravelFund: [
                {
                  currentAmount: {
                    amount: '0.00'
                  }
                }
              ]
            }
          };

          fireAnalyticsEvents(store)(fetchTravelFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('funds search:funds unavailable');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('funds search:funds unavailable');
        });

        it('should fire lookUpFundsSearchSuccess event if viewTravelFund undefined', () => {
          const fetchTravelFundsAction = {
            type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_SUCCESS,
            response: {
              viewTravelFund: undefined
            }
          };

          fireAnalyticsEvents(store)(fetchTravelFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('funds search:funds available');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('funds search:funds available');
        });
      });

      context('Check in Page', () => {
        it('should fire raiseSatelliteEvent event after check in page loaded', () => {
          const fetchTravelFundsAction = {
            type: CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS_SUCCESS,
            response: null
          };

          fireAnalyticsEvents(store)(fetchTravelFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('BoardingPass Details');
        });
      });
      context('action is SHARED__CALC_FUNDS_SUCCESS', () => {
        it('should fire lookUpFundsSearchSuccess event for funds available when both applied amount and remaining amount are not zero', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[0]);
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFundData', { confirmationNumber: 'ABC123' });
          const calcFundsAction = {
            type: SHARED__CALC_FUNDS_SUCCESS,
            response: {
              travelFunds: [
                {
                  fundIdentifier: 'ABC123',
                  appliedAmount: {
                    amount: '10.00'
                  },
                  remainingAmount: {
                    amount: '10.00'
                  }
                }
              ]
            }
          };

          fireAnalyticsEvents(store)(calcFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('funds search:funds available');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('funds search:funds available');
        });

        it('should fire lookUpFundsSearchSuccess event for funds available when applied amount is not zero', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[1]);
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFundData', { voucherNumber: '1234567890123456' });
          const calcFundsAction = {
            type: SHARED__CALC_FUNDS_SUCCESS,
            response: {
              travelFunds: [
                {
                  fundIdentifier: 'XXXXXXXXXXXX-3456',
                  appliedAmount: {
                    amount: '10.00'
                  },
                  remainingAmount: {
                    amount: '0.00'
                  }
                }
              ]
            }
          };

          fireAnalyticsEvents(store)(calcFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('funds search:funds available');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('funds search:funds available');
        });

        it('should fire lookUpFundsSearchSuccess event for funds available when remaining amount is not zero', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[2]);
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFundData', { cardNumber: '1234567890123456' });
          const calcFundsAction = {
            type: SHARED__CALC_FUNDS_SUCCESS,
            response: {
              travelFunds: [
                {
                  fundIdentifier: 'XXXXXXXXXXXX-3456',
                  appliedAmount: {
                    amount: '10.00'
                  },
                  remainingAmount: {
                    amount: '0.00'
                  }
                }
              ]
            }
          };

          fireAnalyticsEvents(store)(calcFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('funds search:funds available');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('funds search:funds available');
        });

        it('should fire lookUpFundsSearchSuccess event for funds unavailable and both remainingAmount and appliedAmount are ZERO', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[0]);
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFundData', { confirmationNumber: 'ABC123' });
          const calcFundsAction = {
            type: SHARED__CALC_FUNDS_SUCCESS,
            response: {
              travelFunds: [
                {
                  fundIdentifier: 'ABC123',
                  appliedAmount: {
                    amount: '0.00'
                  },
                  remainingAmount: {
                    amount: '0.00'
                  }
                }
              ]
            }
          };

          fireAnalyticsEvents(store)(calcFundsAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('funds search:funds unavailable');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('funds search:funds unavailable');
        });
      });

      context('action is TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED', () => {
        let lookUpTravelFundsFailedAction;

        beforeEach(() => {
          lookUpTravelFundsFailedAction = {
            type: TRAVEL_FUNDS__LOOK_UP_TRAVEL_FUNDS_FAILED
          };
        });
        it('should fire lookUpFundsSearchSuccess event for failed travel-funds lookup', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[0]);
          fireAnalyticsEvents(store)(lookUpTravelFundsFailedAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('failed search:travel funds');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('failed search:travel funds');
        });

        it('should fire lookUpFundsSearchSuccess event for failed luv-voucher lookup', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[1]);
          fireAnalyticsEvents(store)(lookUpTravelFundsFailedAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('failed search:luv voucher');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('failed search:luv voucher');
        });

        it('should fire lookUpFundsSearchSuccess event for failed gift-card lookup', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[2]);
          fireAnalyticsEvents(store)(lookUpTravelFundsFailedAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('failed search:gift card');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('failed search:gift card');
        });
      });

      context('action is SHARED__CALC_FUNDS_FAILED', () => {
        let calcFundsFailedAction;

        beforeEach(() => {
          calcFundsFailedAction = {
            type: SHARED__CALC_FUNDS_FAILED
          };
        });
        it('should fire lookUpFundsSearchSuccess event for travel-funds', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[0]);
          fireAnalyticsEvents(store)(calcFundsFailedAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('failed search:travel funds');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('failed search:travel funds');
        });

        it('should fire lookUpFundsSearchSuccess event for luv-voucher', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[1]);
          fireAnalyticsEvents(store)(calcFundsFailedAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('failed search:luv voucher');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('failed search:luv voucher');
        });

        it('should fire lookUpFundsSearchSuccess event for gift-card', () => {
          _.set(window, 'data_a.stores.TravelFundsStore.lastSearchedFund', FUND_TYPES_FORMATTED[2]);
          fireAnalyticsEvents(store)(calcFundsFailedAction);

          expect(analyticsEventHelper.raiseSatelliteEvent).to.have.been.calledWith('failed search:gift card');
          expect(window.data_a.events.lookUpFundsSearchSuccess).to.equal('failed search:gift card');
        });
      });

      context('action is AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS', () => {
        it('should set upliftpurchase to false when not Uplift', () => {
          const fetchBookingSuccessAction = {
            type: AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
            response: {
              flightConfirmationPage: {
                billingInfo: {
                  cardType: 'CARD_TYPE'
                }
              }
            }
          };

          fireAnalyticsEvents(store)(fetchBookingSuccessAction);

          expect(window.data_a.upliftpurchase).to.equal('0');
        });

        it('should set upliftpurchase to true when Uplift', () => {
          const fetchBookingSuccessAction = {
            type: AIR_BOOKING__FETCH_BOOKING_CONFIRMATION_PAGE_SUCCESS,
            response: {
              flightConfirmationPage: {
                billingInfo: {
                  cardType: 'UPLIFT'
                }
              }
            }
          };

          fireAnalyticsEvents(store)(fetchBookingSuccessAction);

          expect(window.data_a.upliftpurchase).to.equal('1');
        });
      });
    });
  });
});
