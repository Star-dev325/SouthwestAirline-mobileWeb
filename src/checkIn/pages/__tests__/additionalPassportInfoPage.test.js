jest.mock('src/shared/helpers/browserObject', () => ({ location: { pathname: '/check-in', reload: jest.fn() } }));

import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import { AdditionalPassportInfoPage } from 'src/checkIn/pages/additionalPassportInfoPage';
import * as DialogActions from 'src/shared/actions/dialogActions';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';

describe('AdditionalPassportInfoPage', () => {
  let addAdditionalPassportInfoDocumentsStub;
  let cleanUpEndOfSessionFnStub;
  let goBackStub;
  let hideDialogStub;
  let prefillNextPaxInfoStub;
  let prepareTravelDocumentStub;
  let pushStub;
  let saveDestinationForAllStub;
  let showDialogStub;

  beforeEach(() => {
    addAdditionalPassportInfoDocumentsStub = jest.spyOn(CheckInActions, 'addAdditionalPassportInfoDocuments')
      .mockResolvedValue('done');
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('check-in');
    cleanUpEndOfSessionFnStub = jest.fn();
    goBackStub = jest.fn();
    hideDialogStub = jest.fn(DialogActions, 'hideDialog').mockResolvedValue('done');
    prefillNextPaxInfoStub = jest.fn();
    prepareTravelDocumentStub = jest.fn();
    pushStub = jest.fn();
    saveDestinationForAllStub = jest.fn();
    showDialogStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render SubHeader with title Passport', () => {
      const { getByText } = createPageComponent();

      expect(getByText('Travel Document')).toBeInTheDocument();
    });

    it('should pass documentTitles to AdditionalPassportInfoForm when provided', () => {
      const documentTitles = { destination: 'Travel Destination' };
      const { container } = createPageComponent({ documentTitles });

      expect(container).toMatchSnapshot();
    });

    describe('submit button text', () => {
      it('should be Confirm and Continue when isLastPage is false', () => {
        const { getByText } = createPageComponent({});

        expect(getByText('CHECK_IN__CONFIRM_AND_CONTINUE_BUTTON')).toBeInTheDocument();
      });

      it('should be Continue when isLastPage is true', () => {
        const { getByText } = createPageComponent({ isLastPAX: true });

        expect(getByText('SHARED__BUTTON_TEXT__CONTINUE')).toBeInTheDocument();
      });
    });

    describe('missing all additional info', () => {
      it('should init additional passport page with green card, visa and destination', () => {
        const { getByText } = createPageComponent({
          initialFormData: {
            destination: null,
            permanentResidentCard: null,
            visa: null
          }
        });

        expect(getByText('Destination Address')).toBeInTheDocument();
        expect(getByText('Green Card')).toBeInTheDocument();
        expect(getByText('Visa')).toBeInTheDocument();
      });
    });

    describe('Cancel button', () => {
      it('should render the Cancel button at left side in the form', () => {
        const { getAllByText } = createPageComponent({
          recordLocator: 'PNR123'
        });
        const cancelButton = getAllByText('Cancel')[0];

        expect(cancelButton).toBeDefined();
      });

      describe('Confirmation dialog been showed', () => {
        it('should render dialog correctly', () => {
          const { getAllByText } = createPageComponent({
            recordLocator: 'PNR123'
          });
          const cancelButton = getAllByText('Cancel')[0];

          fireEvent.click(cancelButton);

          expect(showDialogStub).toHaveBeenCalled();
          expect(showDialogStub.mock.calls[0][0]).toMatchSnapshot();
        });

        it('should transition to previous page when click Yes button', async () => {
          const { getAllByText } = createPageComponent({
            recordLocator: 'PNR123'
          });
          const cancelButton = getAllByText('Cancel')[0];

          fireEvent.click(cancelButton);

          await waitFor(() => {
            expect(showDialogStub.mock.calls[0][0].buttons).toHaveLength(2);
            showDialogStub.mock.calls[0][0].buttons[1].onClick();

            expect(hideDialogStub).toHaveBeenCalled();
            expect(goBackStub).toHaveBeenCalled();
          });
        });

        it('should not call transition to checkin detail when click No button', () => {
          const { getAllByText } = createPageComponent({
            recordLocator: 'PNR123'
          });
          const cancelButton = getAllByText('Cancel')[0];

          fireEvent.click(cancelButton);

          expect(showDialogStub.mock.calls[0][0].buttons).toHaveLength(2);
          showDialogStub.mock.calls[0][0].buttons[0].onClick();

          expect(hideDialogStub).toHaveBeenCalled();
        });
      });
    });

    describe('Skip button', () => {
      it('should render the Skip button at right side in the form when there is more than one passenger', () => {
        const { getByText } = createPageComponent({
          shouldShowSkipButton: true
        });

        expect(getByText('Skip')).toBeInTheDocument();
      });

      it('should not render the Skip button at right side in the form when there is only one passenger', () => {
        const { queryByText } = createPageComponent();

        expect(queryByText('Skip')).not.toBeInTheDocument();
      });

      it('should go to the passport page for the 2nd passenger when current pax is not checkInConfirmation', () => {
        const { container } = createPageComponent({
          nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInPassportInformation' }), nextPaxNumber: '2' },
          shouldShowSkipButton: true
        });
        const skipButton = container.querySelector('.action-bar--right-buttons button');

        fireEvent.click(skipButton);

        expect(pushStub).toHaveBeenCalledWith('/check-in/2/passportPage');
      });

      it('should transition to confirmation when current pax is the last one who need to update apis', () => {
        const { container } = createPageComponent({
          shouldShowSkipButton: true,
          travelDocuments: [
            {
              missingDocuments: ['VISA']
            }
          ]
        });
        const skipButton = container.querySelector('.action-bar--right-buttons button');

        fireEvent.click(skipButton);

        expect(pushStub).toHaveBeenCalledWith('/check-in/confirmation');
      });
    });

    describe('passenger name', () => {
      it('should re-render passenger name', () => {
        const givenPassengerName = 'Hello world';
        const { getByText } = createPageComponent({ passengerName: givenPassengerName });

        expect(getByText(givenPassengerName)).toBeInTheDocument();
      });
    });
  });

  describe('submit', () => {
    describe('form data is not empty', () => {
      let checkInSessionToken;
      let initialFormData;
      let requestData;

      beforeEach(() => {
        checkInSessionToken = 'checkInSessionToken';
        initialFormData = { visa: true };
        requestData = { href: 'url', body: {} };
      });

      it('should call addAdditionalPassportInfoDocuments action with correct params', () => {
        const { container } = createPageComponent({
          checkInSessionToken,
          initialFormData,
          nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformation' }), nextPaxNumber: '2' },
          requestData
        });
        const form = container.querySelector('form');

        fireEvent.submit(form);

        expect(addAdditionalPassportInfoDocumentsStub).toHaveBeenCalledWith(
          requestData,
          initialFormData,
          checkInSessionToken
        );
      });

      it('should call transition to when current pax is not checkInConfirmation', async () => {
        const { container } = createPageComponent({
          checkInSessionToken,
          initialFormData,
          nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInPassportInformation' }), nextPaxNumber: '2' },
          requestData
        });
        const form = container.querySelector('form');

        fireEvent.submit(form);

        await waitFor(() => {
          expect(pushStub).toHaveBeenCalledWith('/check-in/2/passportPage');
        });
      });

      describe('check in session token expired when save travel documents', () => {
        const error = {
          $customized: true,
          responseJSON: { code: 400511157 }
        };

        beforeEach(() => {
          addAdditionalPassportInfoDocumentsStub.mockReturnValueOnce(Promise.reject(error));
        });

        it('should show error pop with session token expired message', async () => {
          const { container } = createPageComponent({
            checkInSessionToken,
            initialFormData,
            nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformation' }), nextPaxNumber: '2' },
            requestData
          });
          const form = container.querySelector('form');

          fireEvent.submit(form);

          await waitFor(() => {
            expect(showDialogStub).toHaveBeenCalled();
            expect(showDialogStub.mock.calls[0][0].name).toBe('check-in-travel-documents-session-token-expired');
            expect(showDialogStub.mock.calls[0][0].title).toBe('CHECK_IN__ERRORS__SESSION_TOKEN_EXPIRED');
            expect(showDialogStub.mock.calls[0][0].buttons[0].label).toBe('SHARED__BUTTON_TEXT__OK');
          });
        });

        it('should refresh app when user click ok button on error popup', async () => {
          const { container } = createPageComponent({
            checkInSessionToken,
            initialFormData,
            nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformation' }), nextPaxNumber: '2' },
            requestData
          });

          fireEvent.submit(container.querySelector('form'));

          await waitFor(() => {
            showDialogStub.mock.calls[0][0].buttons[0].onClick();

            expect(showDialogStub.mock.calls[0][0].buttons).toHaveLength(1);
            expect(hideDialogStub).toHaveBeenCalled();
            expect(BrowserObject.location.reload).toHaveBeenCalled();
          });
        });

        it('should logout user when user click ok button on error popup and login session also expired', async () => {
          jest.spyOn(LoginSessionHelper, 'hasSessionExpired').mockReturnValue(true);
          const state = { app: { account: { isLoggedIn: true } } };
          
          const { container } = createPageComponent({}, state);
          const form = container.querySelector('form');

          fireEvent.submit(form);

          await waitFor(() => {
            expect(showDialogStub.mock.calls[0][0].buttons).toHaveLength(1);
            showDialogStub.mock.calls[0][0].buttons[0].onClick();

            expect(cleanUpEndOfSessionFnStub).toHaveBeenCalled();
            expect(hideDialogStub).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('onClick', () => {
    it('should transition to permanentResidentCard page when click the permanent resident card nav item', () => {
      const { container } = createPageComponent({
        initialFormData: { permanentResidentCard: null }
      });
      const permanentResidentCardNavItem = container.querySelector(`a[name='permanentResidentCard']`);

      fireEvent.click(permanentResidentCardNavItem);

      expect(pushStub).toHaveBeenCalledWith('/check-in/1/additional-passport-info/green-card');
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      addAdditionalPassportInfoDocumentsFn: addAdditionalPassportInfoDocumentsStub,
      checkInSessionToken: '',
      cleanUpEndOfSessionFn: cleanUpEndOfSessionFnStub,
      goBack: goBackStub,
      hideDialogFn: hideDialogStub,
      initialFormData: {},
      isLastPAX: false,
      isLoggedIn: true,
      location: { search: 'search' },
      nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInConfirmation' }), nextPaxNumber: '1' },
      params: { paxNumber: 1 },
      passengerName: '',
      prefillNextPaxInfoFn: prefillNextPaxInfoStub,
      prepareTravelDocumentFn: prepareTravelDocumentStub,
      push: pushStub,
      recordLocator: '',
      requestData: {},
      saveDestinationForAllFn: saveDestinationForAllStub,
      shouldShowSkipButton: false,
      showDialogFn: showDialogStub
    };
    const updatedProps = { ...defaultProps, ...props };

    return integrationRender({ withDialog: true })({}, AdditionalPassportInfoPage, updatedProps);
  };
});
