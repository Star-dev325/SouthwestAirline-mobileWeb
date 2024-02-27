jest.mock('src/shared/form/components/passportForm', () => jest.fn().mockReturnValue(null));

import React from 'react';
import { AirBookingPassengerPassportPage } from 'src/airBooking/pages/airBookingPassengerPassportPage';
import i18n from '@swa-ui/locale';
import { integrationRender } from 'test/unit/helpers/testingLibraryUtils';
import fakeClock from 'test/unit/helpers/fakeClock';
import PassportForm from 'src/shared/form/components/passportForm';

const mockPassengerInfos = [{
  type: 'adult',
  departureDate: '2015-02-01',
  passportAndEmergencyContact: {
    passportNumber: '12121212',
    passportIssuedBy: 'AS',
    nationality: 'AO',
    passportExpirationDate: '2018-12-11',
    countryOfResidence: 'AG',
    emergencyContactName: 'wang yaqing',
    emergencyContactPhoneNumber: '121-341-2212',
    emergencyContactCountryCode: 'US'
  }
}];

describe('airBookingPassengerPassportPage', () => {
  let goBackMock;
  let hideDialogMock;
  let showDialogMock;
  let savePassportInformationFnMock;

  beforeEach(() => {
    fakeClock.setTimeTo('2018-12-10 09:30');

    goBackMock = jest.fn();
    showDialogMock = jest.fn();
    hideDialogMock = jest.fn();
    savePassportInformationFnMock = jest.fn();
  });

  afterEach(() => {
    fakeClock.restore();
    jest.clearAllMocks();
  });

  it('should go back after user save the passport information', () => {
    const instance = React.createRef();
    const mockFormData = { test: 'test' };

    createComponent({ instance });

    instance.current._onPassportSubmit(mockFormData);

    expect(savePassportInformationFnMock).toHaveBeenCalledWith(0, mockFormData);
    expect(goBackMock).toHaveBeenCalled();
  });

  it('should pass expected props to the passport form', () => {
    createComponent();

    expect(PassportForm.mock.calls[0][0]).toEqual({
      formId: 'AIRBOOKING_PASSPORT_FORM_0',
      initialFormData: mockPassengerInfos[0].passportAndEmergencyContact,
      isLapChild: false,
      passengerName: 'Kobe bryant',
      onSubmit: expect.any(Function)
    });
  });

  it('should show popup when Cancel button is pressed', () => {
    const instance = React.createRef();

    createComponent({ instance });

    instance.current._onClickCancel();

    const expectedArgs = {
      buttons: [{
        label: i18n('SHARED__BUTTON_TEXT__NO'),
        onClick: hideDialogMock
      }, {
        label: i18n('SHARED__BUTTON_TEXT__YES'),
        onClick: expect.any(Function),
        style: 'destructive'
      }],
      message: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_MESSAGE_FOR_AIR_BOOKING'),
      name: 'passport-page-confirm-lost-info-before-cancel',
      title: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_TITLE')
    };

    expect(showDialogMock.mock.calls[0][0]).toEqual(expectedArgs);
  });

  const createComponent = (props = {}, search = '') => {
    const defaultProps = {
      passengerInfos: mockPassengerInfos,
      savePassportInformationFn: savePassportInformationFnMock,
      goBack: goBackMock,
      showDialogFn: showDialogMock,
      hideDialogFn: hideDialogMock
    };
    const params = { paxNumber: '0' };
    const query = {
      passengerName: 'Kobe%20bryant'
    };
    const pageProps = { ...defaultProps, ...props, ...{ params, query } };

    const initState = {
      router: {
        location: {
          search
        }
      }
    };

    return integrationRender()(initState, AirBookingPassengerPassportPage, pageProps);
  };
});
