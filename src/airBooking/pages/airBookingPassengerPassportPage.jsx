// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PassportForm from 'src/shared/form/components/passportForm';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import withHideGlobalHeader from 'src/shared/enhancers/withHideGlobalHeader';
import { showDialog, hideDialog } from 'src/shared/actions/dialogActions';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import i18n from '@swa-ui/locale';
import { AIRBOOKING__PASSPORT_FORM } from 'src/shared/constants/formIds';
import { DESTRUCTIVE } from 'src/shared/constants/buttonPopupStyleTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

import type { Passenger, PassportFormData } from 'src/shared/flow-typed/shared.types';

type Props = {
  savePassportInformationFn: (number, PassportFormData) => void,
  passengerInfos: Array<{
    type: string,
    departureDate: string,
    passengerInfo?: Passenger,
    passportAndEmergencyContact?: PassportFormData
  }>,
  params: { paxNumber: string },
  goBack: (*) => void,
  query: {
    passengerName: string,
    isLapChild: string
  },
  showDialogFn: (*) => Promise<*>,
  hideDialogFn: (*) => Promise<*>
};

export class AirBookingPassengerPassportPage extends React.Component<Props> {
  _onPassportSubmit = (formData: PassportFormData) => {
    const { paxNumber } = this.props.params;

    this.props.savePassportInformationFn(+paxNumber, formData);
    this.props.goBack();
  };

  _onClickCancel = () => {
    const { showDialogFn, hideDialogFn, goBack } = this.props;
    const buttons = [
      {
        label: i18n('SHARED__BUTTON_TEXT__NO'),
        onClick: hideDialogFn
      },
      {
        label: i18n('SHARED__BUTTON_TEXT__YES'),
        onClick: () => {
          hideDialogFn().then(goBack);
        },
        style: DESTRUCTIVE
      }
    ];

    showDialogFn({
      name: 'passport-page-confirm-lost-info-before-cancel',
      title: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_TITLE'),
      message: i18n('SHARED__PASSPORT_PAGE__CANCEL_DIALOG_MESSAGE_FOR_AIR_BOOKING'),
      buttons
    });
  };

  render() {
    const {
      passengerInfos,
      params: { paxNumber },
      query: { passengerName, isLapChild }
    } = this.props;
    const { passportAndEmergencyContact } = passengerInfos[+paxNumber];

    return (
      <div>
        <PageHeaderWithButtons
          title={i18n('SHARED__PASSPORT_PAGE__PASSPORT_PAGE_TITLE')}
          rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), onClick: this._onClickCancel }]}
        />
        <PassportForm
          formId={`${AIRBOOKING__PASSPORT_FORM}_${paxNumber}`}
          passengerName={passengerName ? decodeURI(passengerName) : ''}
          initialFormData={passportAndEmergencyContact}
          onSubmit={this._onPassportSubmit}
          isLapChild={isLapChild === 'true'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  passengerInfos: state.app.airBooking.passengerInfos
});

const mapDispatchToProps = {
  savePassportInformationFn: AirBookingActions.savePassengerPassport,
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

export default _.flowRight(
  withHideGlobalHeader,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('air-booking-passenger-passport-page')
)(AirBookingPassengerPassportPage);
