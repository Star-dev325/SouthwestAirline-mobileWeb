jest.mock('src/standby/actions/standbyActions');
jest.mock('src/airCancel/actions/airCancelActions');
jest.mock('src/shared/actions/dialogActions');
jest.mock('src/sameDay/actions/sameDayActions');

import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import * as AirCancelActions from 'src/airCancel/actions/airCancelActions';
import * as SameDayActions from 'src/sameDay/actions/sameDayActions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as analyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as StandbyActions from 'src/standby/actions/standbyActions';
import EnhancedStandbyPage from 'src/standby/pages/enhancedStandbyPage';
import StandbyResponseBuilder from 'test/builders/apiResponse/standbyBuilder';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import ConfigureMockStore from 'test/unit/helpers/configureMockStore';
import FakeClock from 'test/unit/helpers/fakeClock';

describe('enhancedStandbyPage', () => {
  const standbyListPage = new StandbyResponseBuilder().build();
  let hideDialogMock;
  let showDialogMock;

  beforeEach(() => {
    const mockAction = { type: 'test' };

    FakeClock.setTimeTo('2022-11-17');
    hideDialogMock = jest
      .spyOn(DialogActions, 'hideDialog')
      .mockImplementationOnce(() => () => Promise.resolve('done'));
    jest.spyOn(analyticsEventHelper, 'raiseSatelliteEvent');
    showDialogMock = jest.spyOn(DialogActions, 'showDialog').mockImplementationOnce(() => mockAction);
    StandbyActions.checkEnhancedStandbyNearAirport.mockImplementation(() => mockAction);
    SameDayActions.retrieveSameDayFlightDetailsInformation.mockImplementation(() => mockAction);
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  it('should render standby page', () => {
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should not render standby page with header', () => {
    const standbyListPage = new StandbyResponseBuilder().withOutHeaderDetails().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should render standby page with cancel bound', () => {
    const standbyListPage = new StandbyResponseBuilder().withCancelBound().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should not render standby page with seats available text', () => {
    const standbyListPage = new StandbyResponseBuilder().withOutSeatsAvailableText().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should call checkEnhancedStandbyNearAirport on refresh button click', () => {
    const { container } = createComponent({});

    fireEvent.click(container.querySelector('.page-header--right-button'));

    expect(StandbyActions.checkEnhancedStandbyNearAirport).toBeCalled();
  });

  it('should not render LabelText when cancel Standby Listing not available', () => {
    const standbyListPage = new StandbyResponseBuilder().withOutCancelStandbyListing().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should not render LabelText when cancelBound label text is not available', () => {
    const standbyListPage = new StandbyResponseBuilder().withOutCancelBoundLabelText().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should not render LabelText when cancel standby listing label text not available', () => {
    const standbyListPage = new StandbyResponseBuilder().withOutCancelStandbyListingLabelText().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should not render disclaimer text when it is not avaialble', () => {
    const standbyListPage = new StandbyResponseBuilder().withoutDisclaimerText().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });

  it('should not render disclaimer link when it is not avaialble', () => {
    const standbyListPage = new StandbyResponseBuilder().withoutDisclaimerLink().build();
    const { container } = createComponent({ standbyListPage });

    expect(container).toMatchSnapshot();
  });
  it('should call checkEnhancedStandbyNearAirport on refresh button click', () => {
    const { container } = createComponent({});

    fireEvent.click(container.querySelector('.page-header--right-button'));

    expect(StandbyActions.checkEnhancedStandbyNearAirport).toBeCalled();
  });

  it('should fire Satellite analytics event when cancel standby modal is displayed', () => {
    const standbyListPage = new StandbyResponseBuilder().build();
    const viewReservation = new ViewReservationBuilder().build();
    const { container } = createComponent({ isNonRevPnr: true, standbyListPage, viewReservation });

    fireEvent.click(container.querySelector('.standby-button button'));

    expect(analyticsEventHelper.raiseSatelliteEvent).toHaveBeenCalledWith('squid', { page_description: 'modal: cancel standby' });
  });

  it('should call retrieveReservationForCancelBound on cancel button click', () => {
    const standbyListPage = new StandbyResponseBuilder().withCancelBound().build();
    const viewReservation = new ViewReservationBuilder().withEnhancedStandbyPage().build();
    const { container } = createComponent({ standbyListPage, viewReservation });

    AirCancelActions.retrieveReservationForCancelBound.mockImplementationOnce(
      () => () =>
        Promise.resolve({
          viewForCancelBoundPage: {
            _links: {
              refundQuote: {
                body: {
                  refundRequested: false
                }
              }
            }
          }
        })
    );

    fireEvent.click(container.querySelector('.standby-button button'));

    expect(AirCancelActions.retrieveReservationForCancelBound).toBeCalled();
  });

  it('should call retrieveReservationForCancelBound on cancel button click without any bounds', () => {
    const standbyListPage = new StandbyResponseBuilder().withCancelBound().build();
    const viewReservation = new ViewReservationBuilder().withEnhancedStandbyPage().build();
    const { container } = createComponent({ standbyListPage, viewReservation });

    AirCancelActions.retrieveReservationForCancelBound.mockImplementationOnce(() => () => Promise.resolve({}));

    fireEvent.click(container.querySelector('.standby-button button'));

    expect(AirCancelActions.retrieveReservationForCancelBound).toBeCalled();
  });

  it('should call retrieveReservationForCancelBound on cancel button click with splitPnrDetails', () => {
    const standbyListPage = new StandbyResponseBuilder().withCancelBound().build();
    const viewReservation = new ViewReservationBuilder().withEnhancedStandbyPage().build();
    const { container } = createComponent({ standbyListPage, viewReservation });

    AirCancelActions.retrieveReservationForCancelBound.mockImplementationOnce(
      () => () =>
        Promise.resolve({
          viewForCancelBoundPage: {
            splitPnrDetails: true
          }
        })
    );

    fireEvent.click(container.querySelector('.standby-button button'));

    expect(AirCancelActions.retrieveReservationForCancelBound).toBeCalled();
  });

  it('should call retrieveReservationForCancelBound on cancel button click with showBoundSelection', () => {
    const standbyListPage = new StandbyResponseBuilder().withCancelBound().build();
    const viewReservation = new ViewReservationBuilder().withEnhancedStandbyPage().build();
    const { container } = createComponent({ standbyListPage, viewReservation });

    AirCancelActions.retrieveReservationForCancelBound.mockImplementationOnce(
      () => () =>
        Promise.resolve({
          viewForCancelBoundPage: {
            _meta: {
              showBoundSelection: true
            }
          }
        })
    );

    fireEvent.click(container.querySelector('.standby-button button'));

    expect(AirCancelActions.retrieveReservationForCancelBound).toBeCalled();
  });

  it('should call retrieveReservationForCancelBound on cancel button click without showBoundSelection', (done) => {
    const standbyListPage = new StandbyResponseBuilder().withCancelBound().build();
    const viewReservation = new ViewReservationBuilder().build();
    const { container } = createComponent({ standbyListPage, viewReservation });

    AirCancelActions.retrieveRefundQuoteForCancelBound.mockImplementationOnce(
      () => () => {
        expect(AirCancelActions.retrieveRefundQuoteForCancelBound).toHaveBeenCalled();

        done();

        return Promise.resolve({ type: 'test' });
      });
    AirCancelActions.retrieveReservationForCancelBound.mockImplementationOnce(
      () => () =>
        Promise.resolve({
          viewForCancelBoundPage: {
            _meta: {
              showBoundSelection: false
            }
          }
        })
    );

    fireEvent.click(container.querySelector('.standby-button button'));
  });

  it('should call hideDialog on cancel button click on showDialog', () => {
    const standbyListPage = new StandbyResponseBuilder().build();
    const viewReservation = new ViewReservationBuilder().build();
    const { container } = createComponent({ isNonRevPnr: true, standbyListPage, viewReservation });

    fireEvent.click(container.querySelector('.standby-button button'));

    showDialogMock.mock.calls[0][0].buttons[0].onClick();
    expect(hideDialogMock).toBeCalled();
  });

  it('should call hideDialog on ok button click on showDialog', () => {
    const standbyListPage = new StandbyResponseBuilder().build();
    const viewReservation = new ViewReservationBuilder().build();
    const { container } = createComponent({ isNonRevPnr: true, standbyListPage, viewReservation });

    fireEvent.click(container.querySelector('.standby-button button'));

    showDialogMock.mock.calls[0][0].buttons[1].onClick();
    expect(hideDialogMock).toBeCalled();
  });

  it('should not display cancel Standby Listing button if there are no links available', () => {
    const standbyListPage = new StandbyResponseBuilder().build();
    const standbyListPageWithoutLinks = { ...standbyListPage, _links: {} };
    const viewReservation = new ViewReservationBuilder().build();
    const { container } = createComponent({
      isNonRevPnr: true,
      standbyListPage: standbyListPageWithoutLinks,
      viewReservation
    });

    expect(container.querySelector('.standby-button button')).toBeNull();
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      hideDialogFn: hideDialogMock,
      location: {
        search: 'search',
        state: { hasEditedName: false, passengerSearchToken: 'some-token' },
        href: '#'
      },
      match: { params: '' },
      showDialogFn: showDialogMock
    };
    const defaultState = {
      app: {
        errorHeader: {
          errorMessage: null,
          hasError: false
        },
        standby: { standbyPage: { response: { standbyListPage: props.standbyListPage } } },
        toggles: { ENHANCED_STANDBY_LIST: true },
        viewReservation: props.viewReservation?.viewReservationViewPage
      },
      router: {
        location: {
          href: '#',
          search: 'search',
          state: { hasEditedName: false, passengerSearchToken: 'some-token' }
        }
      }
    };
    const store = ConfigureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    const history = createMemoryHistory({
      initialEntries: [{ ...defaultProps.location }]
    });

    return render(
      <Router history={history}>
        <Provider store={store}>
          <EnhancedStandbyPage {...mergedProps} />
        </Provider>
      </Router>
    );
  };
});
