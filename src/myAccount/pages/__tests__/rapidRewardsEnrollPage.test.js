import i18n from '@swa-ui/locale';
import { fireEvent } from '@testing-library/react';
import { RapidRewardsEnrollPage } from 'src/myAccount/pages/rapidRewardsEnrollPage';
import { createComponent } from 'test/unit/helpers/testingLibraryUtils';

describe('RapidRewardsEnrollPage', () => {
  let analyticsTrackSubmitFormFnMock;
  let enrollCustomerAccountForRRFnMock;
  let hideDialogFnMock;
  let replaceMock;
  let showDialogFnMock;

  beforeEach(() => {
    analyticsTrackSubmitFormFnMock = jest.fn();
    enrollCustomerAccountForRRFnMock = jest.fn().mockResolvedValue();
    hideDialogFnMock = jest.fn().mockResolvedValue('');
    replaceMock = jest.fn();
    showDialogFnMock = jest.fn().mockResolvedValue('');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mount', () => {
    it('should render appropriate components', () => {
      const { container } = createPageComponent();

      expect(container.querySelector('.page-header')).not.toBeNull();
      expect(container.querySelector('.page-header').textContent).toEqual(i18n('MY_ACCOUNT__ENROLL_IN_RAPID_REWARDS'));
      expect(container.querySelector('.rapid-rewards-enroll-form')).not.toBeNull();
    });
  });

  describe('submit form', () => {
    it('should call analyticsTrackSubmitFormFn and enrollCustomerAccountForRRFn if user checks regulations checkbox and clicks Enroll', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('div.checkbox-button[name="rulesAndRegulationsCheckbox"]'));
      fireEvent.submit(container.querySelector('.rapid-rewards-enroll-form'));

      expect(analyticsTrackSubmitFormFnMock).toHaveBeenCalledWith('my-account-enroll-for-rapid-rewards');
      expect(enrollCustomerAccountForRRFnMock).toHaveBeenCalledWith({ optInForEmailSubscriptions: true });
    });

    it('should call enrollCustomerAccountForRRFn with optInForEmailSubscriptions false if user unchecks email subscriptions and clicks Enroll', () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('span.checkbox-button--mark'));
      fireEvent.click(container.querySelector('div.checkbox-button[name="rulesAndRegulationsCheckbox"]'));
      fireEvent.submit(container.querySelector('.rapid-rewards-enroll-form'));

      expect(enrollCustomerAccountForRRFnMock).toHaveBeenCalledWith({ optInForEmailSubscriptions: false });
    });

    it('should replace the user to my account page if they are not logged in and click Enroll', () => {
      const { container } = createPageComponent({ isLoggedIn: false });

      fireEvent.click(container.querySelector('div.checkbox-button[name="rulesAndRegulationsCheckbox"]'));
      fireEvent.submit(container.querySelector('.rapid-rewards-enroll-form'));

      expect(replaceMock).toHaveBeenCalledWith('/my-account');
    });

    it('should play congratulations popup when CHAPI request resolves', async () => {
      const { container } = createPageComponent();

      fireEvent.click(container.querySelector('div.checkbox-button[name="rulesAndRegulationsCheckbox"]'));
      fireEvent.submit(container.querySelector('.rapid-rewards-enroll-form'));

      await enrollCustomerAccountForRRFnMock;

      expect(showDialogFnMock).toHaveBeenCalled();
    });

    it('should fail if user does not check the regulations checkbox', () => {
      const { container } = createPageComponent();

      fireEvent.submit(container.querySelector('.rapid-rewards-enroll-form'));

      expect(analyticsTrackSubmitFormFnMock).not.toHaveBeenCalled();
      expect(enrollCustomerAccountForRRFnMock).not.toHaveBeenCalled();
      expect(container.querySelector('div.error-header')).not.toBeNull();
      expect(container.querySelector('.field--error-msg').textContent).toContain(
        i18n('SHARED__ERROR_MESSAGES__ENROLL_ACCEPT_RULES_AND_REGULATIONS')
      );
    });
  });

  const createPageComponent = (props = {}) => {
    const defaultProps = {
      analyticsTrackSubmitFormFn: analyticsTrackSubmitFormFnMock,
      dateOfBirth: '2020-01-01',
      enrollCustomerAccountForRRFn: enrollCustomerAccountForRRFnMock,
      hideDialogFn: hideDialogFnMock,
      isLoggedIn: true,
      minorAcknowledge: 'minor acknowledgement',
      minorAgeThreshold: 13,
      replace: replaceMock,
      rulesAcknowledge: 'rules acknowledgement',
      showDialogFn: showDialogFnMock
    };

    const mergedProps = { ...defaultProps, ...props };
    const state = {};

    return createComponent(RapidRewardsEnrollPage, { state, props: mergedProps });
  };
});
