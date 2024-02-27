jest.mock('src/airCancel/actions/airCancelActions');
jest.mock('src/shared/enhancers/withConnectedReactRouter', () => jest.fn((comp) => comp));

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import AirCancelSelectPassengersPage from 'src/airCancel/pages/airCancelSelectPassengersPage';
import { getRefundQuoteRequestData } from 'src/shared/helpers/selectPassengersHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import {
  getStateWithFormDataForAirCancel,
  refundQuoteLinkObject,
  splitPnrLinkObjWithSelectedIdsAndEmailForAirCancel,
  stateWithValidEmailFormDataForAirCancel
} from 'test/builders/model/selectPassengersPageBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';
import configureMockStore from 'redux-mock-store';

describe('AirCancelSelectPassengersPage', () => {
  const AirCancelActionsMock = jest.mocked(AirCancelActions);

  let getSplitPnrReservationForCancelFnMock;
  let pushMock;
  let retrieveFlightAndCancelBoundWithSearchTokenFnMock;
  let retrieveRefundQuoteForCancelBoundFnMock;

  beforeEach(() => {
    pushMock = jest.fn();
    retrieveRefundQuoteForCancelBoundFnMock = AirCancelActionsMock.retrieveRefundQuoteForCancelBound.mockImplementation(() => () => Promise.resolve({
      type: 'FAKE-ACTION'
    }));
  });

  describe('render', () => {
    it('should render the page correctly', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render correctly when splitPnrDetails value is null', () => {
      const state = {
        app: {
          airCancel: {
            cancelBoundPage: {
              response: {
                splitPnrDetails: null,
                _links: {
                  splitPnr: null
                }
              }
            }
          }
        }
      };
      const { container } = createComponent({}, state);

      expect(container).toMatchSnapshot();
    });
  });

  describe('searchToken', () => {
    it('should call retrieveRefundQuoteForCancelBound if the is only one passenger and the flight is one way', async () => {
      retrieveFlightAndCancelBoundWithSearchTokenFnMock = AirCancelActionsMock.retrieveFlightAndCancelBoundWithSearchToken.mockImplementation(() => () => Promise.resolve(
        {
          viewForCancelBoundPage: {
            _meta: {
              showBoundSelection: false
            }
          }
        }));

      const props = {
        query: { searchToken: 'rtuyjhd' },
        retrieveFlightAndCancelBoundWithSearchTokenFn: retrieveFlightAndCancelBoundWithSearchTokenFnMock
      };

      const state = {
        app: {
          airCancel: {
            cancelBoundPage: {
              response: {
                _links: {
                  refundQuote: {}
                }
              }
            }
          }
        }
      };
      
      await createComponent({ ...props }, { ...state });

      expect(retrieveFlightAndCancelBoundWithSearchTokenFnMock).toHaveBeenCalled();
      expect(retrieveRefundQuoteForCancelBoundFnMock).toHaveBeenCalled();
    });

    it('should call retrieveRefundQuoteForCancelBound if the is only one passenger and the flight has multiple bounds', async () => {
      retrieveFlightAndCancelBoundWithSearchTokenFnMock = AirCancelActionsMock.retrieveFlightAndCancelBoundWithSearchToken.mockImplementation(() => () => Promise.resolve({}));
  
      const props = {
        query: { searchToken: 'rtuyjhd' },
        retrieveFlightAndCancelBoundWithSearchTokenFn: retrieveFlightAndCancelBoundWithSearchTokenFnMock
      };
  
      const state = {
        app: {
          airCancel: {
            cancelBoundPage: {
              response: {
                _links: {
                  refundQuote: {}
                },
                _meta: {
                  showBoundSelection: true
                }
              }
            }
          }
        }
      };
      
      await createComponent({ ...props }, { ...state });
  
      expect(retrieveFlightAndCancelBoundWithSearchTokenFnMock).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalled();
    });
  });

  describe('On submit', () => {
    it('should call getSplitPnrReservationForCancelFn with link object when passengers selected and email entered', () => {
      getSplitPnrReservationForCancelFnMock = AirCancelActionsMock.getSplitPnrReservationForCancel.mockImplementation(() => ({
        type: 'FAKE-ACTION'
      }));

      const { container } = createProviderComponent();
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(getSplitPnrReservationForCancelFnMock).toHaveBeenCalledWith(
        splitPnrLinkObjWithSelectedIdsAndEmailForAirCancel
      );
      expect(pushMock).not.toHaveBeenCalled();
    });

    it('should call push with "/air/cancel/${recordLocator}/select-bound" when all passengers selected and showBoundSelection are true', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
      const { container } = createComponent({}, getStateWithFormDataForAirCancel({ id1: true, id2: true }, true));
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(pushMock).toHaveBeenCalledWith('/air/cancel/PPUWKZ/select-bound');
    });

    it('should call retrieveRefundQuoteForCancelBoundFn when all passengers selected and showBoundSelection are false', () => {
      const { container } = createComponent({}, getStateWithFormDataForAirCancel({ id1: true, id2: true }, false));
      const refundQuoteRequestData = getRefundQuoteRequestData(refundQuoteLinkObject);
      const submitButton = container.querySelector('.button--yellow');

      fireEvent.click(submitButton);

      expect(retrieveRefundQuoteForCancelBoundFnMock).toHaveBeenCalledWith(refundQuoteRequestData, true, true);
    });
  });

  const createComponent = (props = {}, state = stateWithValidEmailFormDataForAirCancel) => {
    const defaultProps = {
      history: {
        push: pushMock
      },
      query: {},
      showBoundSelection: false
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    const store = createMockStoreWithRouterMiddleware()(state);

    return render(
      <BrowserRouter>
        <Provider store={store}>
          <AirCancelSelectPassengersPage {...finalProps} />
        </Provider>
      </BrowserRouter>
    );
  };

  const createProviderComponent = (props = {}, state = stateWithValidEmailFormDataForAirCancel) => {
    const defaultProps = {
      history: {
        push: pushMock
      },
      query: {},
      showBoundSelection: false
    };
    const finalProps = {
      ...defaultProps,
      ...props
    };

    return render(
      <Provider store={configureMockStore()(state)}>
        <AirCancelSelectPassengersPage {...finalProps} />
      </Provider>
    );
  };
});
