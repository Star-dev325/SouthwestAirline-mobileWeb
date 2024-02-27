jest.mock('src/shared/helpers/browserObject', () => ({ location: { pathname: '/check-in', reload: jest.fn() } }));

import i18n from '@swa-ui/locale';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import { PassportPage } from 'src/checkIn/pages/checkInPassportPage';
import * as AnalyticsEventHelper from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as LoginSessionHelper from 'src/shared/helpers/loginSessionHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import { createComponentRender, mockErrorHeaderContainerWithJest } from 'test/unit/helpers/testUtils';

mockErrorHeaderContainerWithJest(jest);

describe('CheckInPassportPage', () => {
  let addNationalityAndEmergencyDocumentsFnMock;
  let cleanAPISDataFnMock;
  let goBackMock;
  let hideDialogFnMock;
  let logoutFnMock;
  let prefillNextPaxInfoFnMock;
  let prepareTravelDocumentFnMock;
  let pushMock;
  let saveEmergencyContactForAllFnMock;
  let showDialogFnMock;

  beforeEach(() => {
    addNationalityAndEmergencyDocumentsFnMock = jest.spyOn(CheckInActions, 'addNationalityAndEmergencyDocuments');
    jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValueOnce('check-in');
    cleanAPISDataFnMock = jest.fn();
    goBackMock = jest.fn();
    hideDialogFnMock = jest.fn(() => Promise.resolve());
    jest.spyOn(AnalyticsEventHelper, 'raiseSatelliteEvent');
    logoutFnMock = jest.fn();
    prefillNextPaxInfoFnMock = jest.fn();
    prepareTravelDocumentFnMock = jest.fn();
    pushMock = jest.fn();
    saveEmergencyContactForAllFnMock = jest.fn();
    showDialogFnMock = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('PageHeader', () => {
    it(`should have title ${i18n('SHARED__PASSPORT_PAGE__PASSPORT_PAGE_TITLE')}`, () => {
      const { getByText } = createComponentWrapper();

      expect(getByText('SHARED__PASSPORT_PAGE__PASSPORT_PAGE_TITLE')).not.toBeNull();
    });

    it('should send on load event for analytics', () => {
      createComponentWrapper();

      expect(AnalyticsEventHelper.raiseSatelliteEvent).toBeCalledWith('TOOL:CHCK:passport details');
    });

    describe('cancel button', () => {
      it('should have `Cancel` button', () => {
        const { getByText } = createComponentWrapper();

        expect(getByText('Cancel')).not.toBeNull();
      });

      it('should show dialog when `Cancel` button is clicked', async () => {
        const { getByText } = createComponentWrapper();

        await userEvent.click(getByText('Cancel'));

        expect(showDialogFnMock).toBeCalled();

        await clickDialogButton(1);
    
        expect(hideDialogFnMock).toHaveBeenCalled();
      });
    });

    describe('skip button', () => {
      it('should not display `Skip` button if shouldShowSkipButton false', () => {
        const { getAllByText } = createComponentWrapper();

        expect(getAllByText('Cancel').length).toBe(1);
      });

      it('should have `Skip` button when there is more one passenger', () => {
        const { getByText } = createComponentWrapper({ shouldShowSkipButton: true });

        expect(getByText('Skip')).not.toBeNull();
      });

      it('should go to next passenger passport page when current pax is not `checkInConfirmation`', async () => {
        const { getByText } = createComponentWrapper({
          nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInPassportInformation' }), nextPaxNumber: '2' },
          shouldShowSkipButton: true
        });

        await userEvent.click(getByText('Skip'));

        expect(pushMock).toBeCalledWith('/check-in/2/passportPage');
      });
    });
  });

  describe('normal state', () => {
    it('should render PassportForm after page is initialized', () => {
      const { container } = createComponentWrapper();

      expect(container.querySelector('.passport-form')).not.toBeNull();
    });

    describe('submit button text', () => {
      it('should be `Confirm and Continue` when isLastPage is false', () => {
        const { getByText } = createComponentWrapper({ isLastPage: false });

        expect(getByText('CHECK_IN__CONFIRM_AND_CONTINUE_BUTTON')).not.toBeNull();
      });

      it('should be `Continue` when isLastPage is true', () => {
        const { getByText } = createComponentWrapper({ isLastPage: true });

        expect(getByText('SHARED__BUTTON_TEXT__CONTINUE')).not.toBeNull();
      });
    });

    it('should not render PassportForm if requestData empty', () => {
      const { container } = createComponentWrapper({ requestData: null });

      expect(container.querySelector('.passport-form')).toBeNull();
    });

    it('should display correct travelerName', () => {
      const { getByText } = createComponentWrapper({ travelerName: 'Qi Qi' });

      expect(getByText('Qi Qi')).not.toBeNull();
    });
  });

  describe('submit form', () => {
    let passportFormData1;

    beforeEach(() => {
      passportFormData1 = {
        countryOfResidence: 'US',
        doNotWishToProvideAnEmergencyContact: '',
        emergencyContactCountryCode: 'US',
        emergencyContactName: 'wang wang',
        emergencyContactPhoneNumber: '923-456-7810',
        emergencyContactSaveForAllPassengers: '',
        nationality: 'US',
        passportExpirationDate: '2034-06-07',
        passportIssuedBy: 'US',
        passportNumber: 'E123456'
      };
    });

    describe('missing document', () => {
      it('should call addNationalityAndEmergencyDocuments to save passport info', async () => {
        const { container } = createComponentWrapper({ formData: passportFormData1 });

        await userEvent.click(container.querySelector('.passport-form--save-button button'));

        /* eslint-disable no-unused-vars */
        const { passportNumber, ...expectedFormDataWithoutPassportNumber } = passportFormData1;

        expect(addNationalityAndEmergencyDocumentsFnMock).toBeCalled();

        const showArgs = addNationalityAndEmergencyDocumentsFnMock.mock.calls[0][0];

        expect(showArgs.paxNumber).toBe(1);
        expect(showArgs.requestData).toMatchObject({
          body: {
            accountNumber: '601005646',
            firstName: 'AGE',
            fullName: 'Older Adult',
            lastName: 'OLDER',
            recordLocator: 'PKEPEV',
            travelerIdentifier: '2401DB8D0000B616'
          },
          href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
          method: 'POST'
        });
        expect(showArgs.formData).toMatchObject(expectedFormDataWithoutPassportNumber);
        expect(showArgs.checkInSessionToken).toBe('someToken');
      });
    });

    describe('methods', () => {
      describe('_backToHome', () => {
        it('should call logoutFn', async () => {
          jest.spyOn(LoginSessionHelper, 'hasSessionExpired').mockReturnValue(true);

          const instance = React.createRef();
    
          createComponentWrapper({ ref: instance });
    
          instance.current._backToHome();
    
          expect(logoutFnMock).toHaveBeenCalled();
        });

        it('should call not logoutFn', async () => {
          const instance = React.createRef();
    
          createComponentWrapper({ ref: instance, isUserLoggedIn: false });
    
          instance.current._backToHome();
    
          expect(logoutFnMock).not.toHaveBeenCalled();
        });
        
        it('should call not logoutFn', async () => {
          jest.spyOn(LoginSessionHelper, 'hasSessionExpired').mockReturnValue(false);

          const instance = React.createRef();
    
          createComponentWrapper({ ref: instance });
    
          instance.current._backToHome();
    
          expect(logoutFnMock).not.toHaveBeenCalled();
        });
      });

      describe('_showSessionExpiredPopup', () => {
        it('should call showDialog popup', async () => {
          const instance = React.createRef();
    
          createComponentWrapper({ ref: instance });
    
          instance.current._showSessionExpiredPopup();

          await clickDialogButton(0);
    
          expect(hideDialogFnMock).toHaveBeenCalled();
        });
      });

      describe('_transitionToNextPax', () => {
        it('should go to the checkIn Confirmation page when the nextPagePath is the checkInConfirmation page', async () => {
          const instance = React.createRef();

          createComponentWrapper({
            nextPageOptions: { nextPagePath: getNormalizedRoute({ routeName: 'checkInConfirmation' }), nextPaxNumber: '2' },
            ref: instance 
          });
    
          instance.current._transitionToNextPax();

          expect(pushMock).toHaveBeenCalledWith('/check-in/confirmation');
        });

        it('should go to the nextPagePath page when the nextPagePath is not the checkInConfirmation page', async () => {
          const instance = React.createRef();

          createComponentWrapper({ ref: instance });
    
          instance.current._transitionToNextPax();

          expect(pushMock).toHaveBeenCalledWith('/check-in/2/passportPage');
        });
      });
    });
  });

  const createComponentWrapper = (props = {}) => {
    const defaultProps = {
      addNationalityAndEmergencyDocumentsFn: addNationalityAndEmergencyDocumentsFnMock,
      checkInSessionToken: 'someToken',
      cleanAPISDataFn: cleanAPISDataFnMock,
      formData: {},
      goBack: goBackMock,
      hideDialogFn: hideDialogFnMock,
      isLastPage: true,
      isUserLoggedIn: true,
      location: {},
      logoutFn: logoutFnMock,
      nextPageOptions: {
        nextPagePath: getNormalizedRoute({ routeName: 'checkInPassportInformation' }),
        nextPaxNumber: '2'
      },
      params: {
        paxNumber: 1
      },
      prefillNextPaxInfoFn: prefillNextPaxInfoFnMock,
      prepareTravelDocumentFn: prepareTravelDocumentFnMock,
      push: pushMock,
      recordLocator: 'ZRTY56',
      requestData: {
        body: {
          accountNumber: '601005646',
          firstName: 'AGE',
          fullName: 'Older Adult',
          lastName: 'OLDER',
          recordLocator: 'PKEPEV',
          travelerIdentifier: '2401DB8D0000B616'
        },
        href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
        method: 'POST'
      },
      saveEmergencyContactForAllFn: saveEmergencyContactForAllFnMock,
      shouldShowSaveEmergencyContactForAll: false,
      shouldShowSkipButton: false,
      showDialogFn: showDialogFnMock,
      travelerName: 'Older Adult'
    };

    return createComponentRender(PassportPage, {
      props: { ...defaultProps, ...props }
    });
  };

  const clickDialogButton = async (buttonIndex) => {
    await showDialogFnMock.mock.calls[0][0].buttons[buttonIndex].onClick();
  };
});
