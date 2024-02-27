jest.mock('src/viewReservation/actions/viewReservationActions');

import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import CancelStandbyListConfirmationPage from 'src/standby/pages/cancelStandbyListConfirmationPage';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';
import StandbyCancelConfirmationBuilder from 'test/builders/apiResponse/standbyCancelConfirmationBuilder';
import ConfigureMockStore from 'test/unit/helpers/configureMockStore';
import FakeClock from 'test/unit/helpers/fakeClock';

describe('cancelStandbyListingPagePage', () => {
  const cancelStandbyListingPage = new StandbyCancelConfirmationBuilder().build();
  let hideDialogMock;
  let showDialogMock;

  beforeEach(() => {
    const mockAction = { type: 'test' };

    ViewReservationActions.retrieveSameDayBoundInformation.mockImplementation(() => mockAction);
  });

  afterEach(() => {
    FakeClock.restore();
    jest.clearAllMocks();
  });

  it('should render standby confirmation page', () => {
    const { container } = createComponent({ cancelStandbyListingPage });

    expect(container).toMatchSnapshot();
  });

  it('should not render same day update label text on standby confirmation page', () => {
    const cancelStandbyListingPageWithOutLabelText = new StandbyCancelConfirmationBuilder().withOutSameDayUpdateLabelText().build();
    const { container } = createComponent({ cancelStandbyListingPage: cancelStandbyListingPageWithOutLabelText });

    expect(container).toMatchSnapshot();
  });

  it('should call list standby action', () => {
    const { container } = createComponent({ cancelStandbyListingPage });

    const element = container.querySelector('.cancel-standby-page--body-button button');

    fireEvent.click(element);

    expect(ViewReservationActions.retrieveSameDayBoundInformation).toBeCalled();
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      hideDialogFn: hideDialogMock,
      location: {
        href: '#',
        search: 'search'
      },
      match: { params: '' },
      showDialogFn: showDialogMock
    };
    const defaultState = {
      app: {
        standby: { cancelStandbyListConfirmationPage: props.cancelStandbyListingPage }
      },
      router: {
        location: {
          href: '#',
          search: 'search'
        }
      }
    };
    const store = ConfigureMockStore()({ ...defaultState, ...state });
    const mergedProps = { ...defaultProps, ...props };

    const history = createMemoryHistory({
      initialEntries: [ { ...defaultProps.location }]
    });

    return render(
      <Router history={history}>
        <Provider store={store}>
          <CancelStandbyListConfirmationPage {...mergedProps} />
        </Provider>
      </Router>
    );
  };
});
