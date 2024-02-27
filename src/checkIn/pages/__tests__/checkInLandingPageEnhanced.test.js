jest.mock('src/shared/actions/sharedActions', () => ({
  ...jest.requireActual('src/shared/actions/sharedActions'),
  hideErrorHeaderMsg: () => ({
    type: 'FAKE_HIDE_ERROR_ACTION'
  }),
  showErrorHeaderMsg: jest.fn().mockImplementation(() => ({
    type: 'FAKE_SHOW_ERROR_ACTION'
  })),
  fetchRecentTripSearches: jest.fn().mockImplementation(() => ({
    type: 'FAKE_SHOW_ERROR_ACTION'
  }))
}));

import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sandbox } from 'sinon';
import CheckInLandingPage from 'src/checkIn/pages/checkInLandingPage';
import * as SharedActions from 'src/shared/actions/sharedActions';
import * as CheckInAPI from 'src/shared/api/checkInApi';
import checkInReservationBuilder from 'test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInReservationBuilder';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

const sinon = sandbox.create();

describe('CheckInLandingPage', () => {
  afterEach(() => {
    sinon.restore();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(SharedActions, 'fetchRecentTripSearches').mockImplementationOnce(() => ({ type: 'FAKE_CALL' }));
  });

  describe('transition', () => {
    it('should transition to check in confirmation', async () => {
      const fetchReservationDetailMock = jest
        .spyOn(CheckInAPI, 'retrieveReservationDetail')
        .mockResolvedValue(new checkInReservationBuilder().build());
      const { getByText, getByPlaceholderText } = createComponent();

      await userEvent.type(getByPlaceholderText('SHARED__PLACEHOLDER__CONFIRMATION_NUMBER'), 'abcdef');
      await userEvent.type(getByPlaceholderText('SHARED__PLACEHOLDER__FIRST_NAME'), 'bobo');
      await userEvent.type(getByPlaceholderText('SHARED__PLACEHOLDER__LAST_NAME'), 'xu');

      userEvent.click(getByText('VIEW_RESERVATION__RETRIEVE_RESERVATION'));

      await waitFor(() => expect(fetchReservationDetailMock).toBeCalled());
    });
  });

  const createComponent = (state = {}, props = {}) =>
    integrationRender({ location: '/check-in', initialIndex: 0, path: '/check-in' })(state, CheckInLandingPage, {
      ...props
    });
});
