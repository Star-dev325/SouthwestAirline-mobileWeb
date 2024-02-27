import { sandbox } from 'sinon';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import * as AirUpgradeActions from 'src/airUpgrade/actions/airUpgradeActions';
import airUpgradeActionTypes from 'src/airUpgrade/actions/airUpgradeActionTypes';
import { AIR_UPGRADE_FLOW_NAME, AIR_UPGRADE_FARE_OPTIONS } from 'src/airUpgrade/constants/airUpgradeConstants';
import { airUpgradeOldRoutes, airUpgradeRoutes } from 'src/airUpgrade/constants/airUpgradeRoutes';
import * as UpgradeFareHelper from 'src/airUpgrade/helpers/upgradeFareHelper';
import * as ApplyTravelFunds from 'src/shared/actions/applyTravelFundsActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as AirUpgradeApi from 'src/shared/api/airUpgradeApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import BrowserObject from 'src/shared/helpers/browserObject';
import { buildPathWithQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import { AIR_UPGRADE_INDEX_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import AirUpgradeViewReservationApiJsonBuilder from 'test/builders/apiResponse/airUpgradeViewReservationApiJsonBuilder';
import createMockStore from 'test/unit/helpers/createMockStore';

const sinon = sandbox.create();
const mockStore = createMockStore();
const {
  AIR_UPGRADE__FETCH_RESERVATION,
  AIR_UPGRADE__FETCH_RESERVATION_SUCCESS,
  AIR_UPGRADE__FETCH_RESERVATION_FAILED,
  AIR_UPGRADE__CHANGE_SELECTED_BOUND,
  AIR_UPGRADE__SEARCH_REQUEST,
  AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN,
  AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS,
  AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_SUCCESS,
  AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_FAILED,
  AIR_UPGRADE__UPGRADE_INDEX
} = airUpgradeActionTypes;

describe('AirUpgradeActions', () => {
  const mockFareSegment = 'mockFareSegment';
  const setFlowStatusFakeActionType = { type: 'SET_FLOW_STATUS_FAKE_TYPE' };
  const mockFetchReservationSuccessAction = {
    isFetching: false,
    response: { upgradeFarePage: { upgradedFareSegment: [mockFareSegment] } },
    type: AIR_UPGRADE__FETCH_RESERVATION_SUCCESS
  };
  const { SHARED__RESET_CALCULATE_FLOW_DATA } = SharedActionTypes;
  const MockResetCalculateFlowData = { type: SHARED__RESET_CALCULATE_FLOW_DATA };
  const mockError = new Error();
  const mockErrorHandlerObject = { fakeDispatch: 'fakeDispatch' };
  const mockErrorHandler = () => mockErrorHandlerObject;
  const mockEmptyLink = {
    link: {}
  };
  const mockResetAirChangeDataAction = { type: 'resetAirChangeDataAction' };
  const { boundSelectionDataList } = new AirUpgradeViewReservationApiJsonBuilder().build().viewUpgradeReservationPage;
  let buildUpgradeFareReservationRequestStub;
  let retrieveReservationStub;
  let setFlowStatusStub;
  let store;

  beforeEach(() => {
    sinon.stub(ApplyTravelFunds, 'resetCalculateFlowData').returns(MockResetCalculateFlowData);
    sinon.stub(AirChangeActions, 'resetAirChangeData').returns(mockResetAirChangeDataAction);
    sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/upgrade');
    buildUpgradeFareReservationRequestStub = sinon.stub(UpgradeFareHelper, 'buildUpgradeFareReservationRequestStub');
    retrieveReservationStub = sinon.stub(AirUpgradeApi, 'retrieveReservation');
    setFlowStatusStub = sinon.stub(FlowStatusActions, 'setFlowStatus').returns(setFlowStatusFakeActionType);
    store = mockStore({
      app: {
        airUpgrade: {
          airUpgradeReducer: {
            upgradeType: AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS,
            viewUpgradeReservationPage: {
              boundSelectionDataList: boundSelectionDataList
            }
          }
        }
      }
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('goToAirChangePricingReview', () => {
    const changeRequests = [
      {
        arrivalAirportCode: 'ATL',
        boundReference: 'mock bound reference 1',
        boundType: 'DEPARTING',
        departureAirportCode: 'ORD',
        productId: 'mock product id 1'
      },
      {
        arrivalAirportCode: undefined,
        boundReference: 'mock bound reference 2',
        boundType: 'RETURNING',
        departureAirportCode: undefined,
        productId: null
      }
    ];
    const selectedProducts = [
      {
        boundType: 'DEPARTING',
        productId: 'mock product id 1',
        arrivalAirportCode: 'ATL',
        departureAirportCode: 'ORD'
      },
      {
        boundType: 'RETURNING',
        productId: null
      }
    ];
    const changePricingLink = {
      href: '/v1/mobile-air-booking/page/flights/change/pricing-breakdown',
      method: 'POST',
      body: { changeRequests }
    };

    it('should complete the airUpgrade flow and make the gotToPricingReview call in airChangeActions', async () => {
      const mockGoToPricingReviewActionType = { type: 'MOCK_GO_TO_PRICING_REVIEW' };
      const isLoggedIn = true;
      const shouldResetCalculateFundsFlow = true;
      const ignoreNavigationLogic = true;
      const expectedResult = [
        setFlowStatusFakeActionType,
        {
          type: AIR_UPGRADE__SEARCH_REQUEST,
          searchRequest: {
            to: 'ATL',
            boundType: 'DEPARTING',
            from: 'ORD'
          }
        },
        MockResetCalculateFlowData,
        mockGoToPricingReviewActionType
      ];

      changePricingLink.body.fundsAppliedToken = undefined;
      sinon.stub(AirChangeActions, 'goToPricingReview').returns(mockGoToPricingReviewActionType);

      await store.dispatch(
        AirUpgradeActions.goToAirChangePricingReview(
          changePricingLink,
          selectedProducts,
          isLoggedIn,
          shouldResetCalculateFundsFlow,
          ignoreNavigationLogic
        )
      );

      expect(AirChangeActions.goToPricingReview).to.have.been.calledWith(
        changePricingLink,
        isLoggedIn,
        shouldResetCalculateFundsFlow,
        ignoreNavigationLogic
      );
      expect(store.getActions()).to.eql(expectedResult);
    });

    it('should call gotToPricingReview with required prop values', async () => {
      const mockGoToPricingReviewActionType = { type: 'MOCK_GO_TO_PRICING_REVIEW' };
      const isLoggedIn = true;
      const shouldResetCalculateFundsFlow = false;
      const ignoreNavigationLogic = false;

      changePricingLink.body.fundsAppliedToken = undefined;
      const selectedProducts = [
        {
          boundType: 'DEPARTING',
          productId: null,
          arrivalAirportCode: 'ATL',
          departureAirportCode: 'ORD'
        },
        {
          boundType: 'RETURNING',
          productId: null
        }
      ];

      sinon.stub(AirChangeActions, 'goToPricingReview').returns(mockGoToPricingReviewActionType);
      changePricingLink.body.changeRequests = [
        {
          boundReference: 'mock bound reference 1',
          productId: null
        },
        {
          boundReference: 'mock bound reference 2',
          boundType: 'RETURNING',
          productId: null
        }
      ];
      await store.dispatch(
        AirUpgradeActions.goToAirChangePricingReview(
          changePricingLink,
          selectedProducts,
          isLoggedIn,
          shouldResetCalculateFundsFlow,
          ignoreNavigationLogic
        )
      );

      expect(AirChangeActions.goToPricingReview).to.have.been.calledWith(
        changePricingLink,
        isLoggedIn,
        shouldResetCalculateFundsFlow,
        ignoreNavigationLogic
      );
    });
  });

  context('loadUpgradeFarePagePlacements', () => {
    const mockUpgradeType = 'mockUpgradeType';

    it('should trigger fetchAirUpgradePlacementsSuccess when actions succeed', async () => {
      const getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve('placements'));
      const expectedResult = [
        {
          isFetching: true,
          type: AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS
        },
        {
          isFetching: false,
          type: AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_SUCCESS,
          response: 'placements'
        }
      ];

      await store.dispatch(AirUpgradeActions.loadUpgradeFarePagePlacements(mockUpgradeType, AIR_UPGRADE_INDEX_PAGE_ID));
      const result = store.getActions();

      expect(getPlacementsStub).to.have.been.calledWith(AIR_UPGRADE_INDEX_PAGE_ID, [mockUpgradeType]);
      expect(result).to.eql(expectedResult);
    });

    it('should trigger fetchAirUpgradePlacementsFailed when getPlacements fails', async () => {
      sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.reject('error'));
      const expectedResult = [
        {
          type: AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS,
          isFetching: true
        },
        {
          type: AIR_UPGRADE__FETCH_AIR_UPGRADE_PLACEMENTS_FAILED,
          isFetching: false
        }
      ];

      await store.dispatch(AirUpgradeActions.loadUpgradeFarePagePlacements(mockUpgradeType));
      const result = await store.getActions();

      expect(result).to.deep.equal(expectedResult);
    });
  });

  context('getUpgradeFareReservation', () => {
    const mockFirstName = 'mockFirstName';
    const mockSecondName = 'mockSecondName';
    const mockRecordLocator = '123456';
    const mockPassengerSearchToken = 'abc123';
    const mockPassengerNameRecordToken = {
      firstName: mockFirstName,
      lastName: mockSecondName,
      recordLocator: mockRecordLocator
    };

    context('when isWebView is false', () => {
      context('when valid data with record locator', () => {
        it('should dispatch the correct flow status and actions', () => {
          BrowserObject.location = { pathname: '/air/upgrade' };
          const mockRequestData = {
            href: 'mockHref',
            body: {
              mockPassengerNameRecordToken
            },
            method: 'POST'
          };

          buildUpgradeFareReservationRequestStub.returns(mockRequestData);
          retrieveReservationStub.resolves({ upgradeFarePage: { upgradedFareSegment: [mockFareSegment] } });

          return store.dispatch(AirUpgradeActions.getUpgradeFareReservation(mockPassengerNameRecordToken)).then(() => {
            expect(store.getActions()).to.deep.equal([
              mockResetAirChangeDataAction,
              {
                isFetching: true,
                type: AIR_UPGRADE__FETCH_RESERVATION
              },
              mockFetchReservationSuccessAction,
              setFlowStatusFakeActionType,
              {
                payload: {
                  args: [
                    buildPathWithQuery(getNormalizedRoute({ routeName: 'airUpgradeSelectBound' }), {
                      upgradeType: 'upgradeToBUS'
                    })
                  ],
                  method: 'push'
                },
                type: '@@router/CALL_HISTORY_METHOD'
              }
            ]);
            expect(setFlowStatusStub).to.have.been.calledWith(AIR_UPGRADE_FLOW_NAME, STATUS.IN_PROGRESS);
          });
        });
      });

      context('when valid data with passengerSearchToken', () => {
        it('should dispatch the correct flow status and actions', () => {
          BrowserObject.location = { pathname: '/air/upgrade' };
          const mockUpgradeFareReservationData = {
            mockFirstName,
            mockSecondName,
            mockPassengerSearchToken
          };
          const mockRequestData = {
            href: 'mockHref',
            body: {
              mockUpgradeFareReservationData
            },
            method: 'POST'
          };

          buildUpgradeFareReservationRequestStub.returns(mockRequestData);
          retrieveReservationStub.resolves({ upgradeFarePage: { upgradedFareSegment: [mockFareSegment] } });

          return store
            .dispatch(AirUpgradeActions.getUpgradeFareReservation(mockUpgradeFareReservationData))
            .then(() => {
              expect(store.getActions()).to.deep.equal([
                mockResetAirChangeDataAction,
                {
                  isFetching: true,
                  type: AIR_UPGRADE__FETCH_RESERVATION
                },
                mockFetchReservationSuccessAction,
                setFlowStatusFakeActionType,
                {
                  payload: {
                    args: [
                      buildPathWithQuery(getNormalizedRoute({ routeName: 'airUpgradeSelectBound' }), {
                        upgradeType: 'upgradeToBUS'
                      })
                    ],
                    method: 'push'
                  },
                  type: '@@router/CALL_HISTORY_METHOD'
                }
              ]);
              expect(setFlowStatusStub).to.have.been.calledWith(AIR_UPGRADE_FLOW_NAME, STATUS.IN_PROGRESS);
            });
        });
      });

      context('when valid data with link', () => {
        it('should dispatch the correct flow status and actions', () => {
          BrowserObject.location = { pathname: '/air/upgrade' };
          const mockLinkWithData = {
            link: {
              href: 'mockHref',
              body: {
                firstName: mockFirstName,
                lastName: mockSecondName,
                passengerSearchToken: mockPassengerSearchToken
              },
              method: 'POST'
            }
          };

          buildUpgradeFareReservationRequestStub.returns(mockLinkWithData);
          retrieveReservationStub.resolves({ upgradeFarePage: { upgradedFareSegment: [mockFareSegment] } });

          return store.dispatch(AirUpgradeActions.getUpgradeFareReservation(mockLinkWithData)).then(() => {
            expect(store.getActions()).to.deep.equal([
              mockResetAirChangeDataAction,
              {
                isFetching: true,
                type: AIR_UPGRADE__FETCH_RESERVATION
              },
              mockFetchReservationSuccessAction,
              setFlowStatusFakeActionType,
              {
                payload: {
                  args: [
                    buildPathWithQuery(getNormalizedRoute({ routeName: 'airUpgradeSelectBound' }), {
                      upgradeType: 'upgradeToBUS'
                    })
                  ],
                  method: 'push'
                },
                type: '@@router/CALL_HISTORY_METHOD'
              }
            ]);
            expect(setFlowStatusStub).to.have.been.calledWith(AIR_UPGRADE_FLOW_NAME, STATUS.IN_PROGRESS);
          });
        });
      });

      context('when error', () => {
        it('should dispatch the correct actions', () => {
          retrieveReservationStub.rejects(mockError);

          return store
            .dispatch(AirUpgradeActions.getUpgradeFareReservation(mockEmptyLink, true, mockErrorHandler))
            .then(() => {
              expect(store.getActions()).to.deep.equal([
                mockResetAirChangeDataAction,
                {
                  isFetching: true,
                  type: AIR_UPGRADE__FETCH_RESERVATION
                },
                {
                  error: {
                    errorHandler: mockErrorHandler
                  },
                  isFetching: false,
                  type: AIR_UPGRADE__FETCH_RESERVATION_FAILED
                }
              ]);
            });
        });
      });
    });

    context('when isWebView is true', () => {
      context('when valid data with record locator', () => {
        it('should dispatch the correct flow status and actions', () => {
          const webViewStore = mockStore({
            app: {
              webView: {
                isWebView: true
              },
              airUpgrade: {
                airUpgradeReducer: {
                  upgradeType: ''
                }
              }
            }
          });
          const mockLinkWithData = {
            link: {
              href: 'mockHref',
              body: {
                firstName: mockFirstName,
                lastName: mockSecondName,
                passengerSearchToken: mockPassengerSearchToken
              },
              method: 'POST'
            }
          };

          buildUpgradeFareReservationRequestStub.returns(mockLinkWithData);
          retrieveReservationStub.resolves({ upgradeFarePage: { upgradedFareSegment: [mockFareSegment] } });

          return webViewStore
            .dispatch(AirUpgradeActions.getUpgradeFareReservation(mockLinkWithData, false))
            .then(() => {
              expect(webViewStore.getActions()).to.deep.equal([
                mockResetAirChangeDataAction,
                {
                  isFetching: true,
                  type: AIR_UPGRADE__FETCH_RESERVATION
                },
                mockFetchReservationSuccessAction,
                setFlowStatusFakeActionType
              ]);
              expect(setFlowStatusStub).to.have.been.calledWith(AIR_UPGRADE_FLOW_NAME, STATUS.IN_PROGRESS);
            });
        });
      });

      context('when error', () => {
        it('should dispatch the correct actions', () => {
          const webViewStore = mockStore({
            app: {
              webView: {
                isWebView: true
              },
              airUpgrade: {
                airUpgradeReducer: {
                  upgradeType: ''
                }
              }
            }
          });

          retrieveReservationStub.rejects(mockError);

          return webViewStore
            .dispatch(AirUpgradeActions.getUpgradeFareReservation(mockEmptyLink, false, mockErrorHandler))
            .then(() => {
              const mockActions = webViewStore.getActions();

              expect(mockActions).to.deep.equal([
                mockResetAirChangeDataAction,
                {
                  isFetching: true,
                  type: AIR_UPGRADE__FETCH_RESERVATION
                },
                {
                  error: {
                    errorHandler: mockErrorHandler
                  },
                  isFetching: false,
                  type: AIR_UPGRADE__FETCH_RESERVATION_FAILED
                }
              ]);
            });
        });
      });
    });

    context('ENABLE_URL_NORMALIZATION', () => {
      it('if ENABLE_URL_NORMALIZATION toggle is false', () => {
        store = mockStore({
          app: {
            airUpgrade: {
              airUpgradeReducer: {
                upgradeType: AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS,
                viewUpgradeReservationPage: {
                  boundSelectionDataList: boundSelectionDataList
                }
              }
            },
            toggles: {
              ENABLE_URL_NORMALIZATION: false
            }
          }
        });

        BrowserObject.location = { pathname: '/air/upgrade' };
        const mockRequestData = {
          href: 'mockHref',
          body: {
            mockPassengerNameRecordToken
          },
          method: 'POST'
        };

        buildUpgradeFareReservationRequestStub.returns(mockRequestData);
        retrieveReservationStub.resolves({ upgradeFarePage: { upgradedFareSegment: [mockFareSegment] } });

        return store.dispatch(AirUpgradeActions.getUpgradeFareReservation(mockPassengerNameRecordToken)).then(() => {
          expect(store.getActions()).to.deep.equal([
            mockResetAirChangeDataAction,
            {
              isFetching: true,
              type: AIR_UPGRADE__FETCH_RESERVATION
            },
            mockFetchReservationSuccessAction,
            setFlowStatusFakeActionType,
            {
              payload: {
                args: [
                  buildPathWithQuery(airUpgradeOldRoutes['airUpgradeSelectBound'], { upgradeType: 'upgradeToBUS' })
                ],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            }
          ]);
          expect(setFlowStatusStub).to.have.been.calledWith(AIR_UPGRADE_FLOW_NAME, STATUS.IN_PROGRESS);
        });
      });

      it('if ENABLE_URL_NORMALIZATION toggle is true', () => {
        store = mockStore({
          app: {
            airUpgrade: {
              airUpgradeReducer: {
                upgradeType: AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS,
                viewUpgradeReservationPage: {
                  boundSelectionDataList: boundSelectionDataList
                }
              }
            },
            toggles: {
              ENABLE_URL_NORMALIZATION: true
            }
          }
        });

        BrowserObject.location = { pathname: '/air/upgrade' };
        const mockRequestData = {
          href: 'mockHref',
          body: {
            mockPassengerNameRecordToken
          },
          method: 'POST'
        };

        buildUpgradeFareReservationRequestStub.returns(mockRequestData);
        retrieveReservationStub.resolves({ upgradeFarePage: { upgradedFareSegment: [mockFareSegment] } });

        return store.dispatch(AirUpgradeActions.getUpgradeFareReservation(mockPassengerNameRecordToken)).then(() => {
          expect(store.getActions()).to.deep.equal([
            mockResetAirChangeDataAction,
            {
              isFetching: true,
              type: AIR_UPGRADE__FETCH_RESERVATION
            },
            mockFetchReservationSuccessAction,
            setFlowStatusFakeActionType,
            {
              payload: {
                args: [buildPathWithQuery(airUpgradeRoutes['airUpgradeSelectBound'], { upgradeType: 'upgradeToBUS' })],
                method: 'push'
              },
              type: '@@router/CALL_HISTORY_METHOD'
            }
          ]);
          expect(setFlowStatusStub).to.have.been.calledWith(AIR_UPGRADE_FLOW_NAME, STATUS.IN_PROGRESS);
        });
      });
    });
  });

  context('resumeAfterLogin', () => {
    it('should dispatch proper action', () => {
      const expectedResult = {
        type: AIR_UPGRADE__SELECT_BOUND_RESUME_AFTER_LOGIN,
        shouldResume: true
      };
      const actualResult = store.dispatch(AirUpgradeActions.resumeAfterLogin(true));

      expect(actualResult).to.be.deep.equal(expectedResult);
    });
  });

  context('selectedRequest', () => {
    it('should dispatch proper action', () => {
      const expectedResult = {
        type: AIR_UPGRADE__SEARCH_REQUEST,
        searchRequest: {
          arrivalAirportCode: 'ATL',
          boundType: 'RETURNING',
          departureAirportCode: 'ORD'
        }
      };
      const actualResult = store.dispatch(
        AirUpgradeActions.saveSearchRequest({
          arrivalAirportCode: 'ATL',
          departureAirportCode: 'ORD',
          boundType: 'RETURNING'
        })
      );

      expect(actualResult).to.be.deep.equal(expectedResult);
    });
  });

  context('changeSelectedBound', () => {
    it('dispatch an action containing bound data for the payload', () => {
      const expectedResult = {
        type: AIR_UPGRADE__CHANGE_SELECTED_BOUND,
        boundData: { productId: 'mockProductId', isSelected: true }
      };
      const actualResult = store.dispatch(
        AirUpgradeActions.changeSelectedBound({
          productId: 'mockProductId',
          isSelected: true
        })
      );

      expect(actualResult).to.eql(expectedResult);
    });
  });

  context('loadUpgradeIndex', () => {
    it('dispatch an upgrade action containing index data for the payload', () => {
      const expectedResult = {
        type: AIR_UPGRADE__UPGRADE_INDEX
      };
      const actualResult = store.dispatch(AirUpgradeActions.loadUpgradeIndex());

      expect(actualResult).to.eql(expectedResult);
    });
  });
});
