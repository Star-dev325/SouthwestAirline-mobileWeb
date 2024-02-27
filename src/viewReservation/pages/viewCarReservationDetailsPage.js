// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import { connect } from 'react-redux';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import * as CarCancelActions from 'src/carCancel/actions/carCancelActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import ManageCarReservationWithDetails from 'src/shared/components/manageCarReservationWithDetails';
import SubHeader from 'src/shared/components/subHeader';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';
import * as ViewReservationActions from 'src/viewReservation/actions/viewReservationActions';

import type { SearchRequestType } from 'src/carBooking/flow-typed/carBooking.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';
import type { Push } from 'src/shared/flow-typed/shared.types';
import type { CarReservationType } from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  cancelCarReservationAndTransitionToConfirmationPageFn: (CarReservationType, ?string) => void,
  carReservation: CarReservationType,
  hideDialogFn: () => void,
  prepareCarCrossSellAndTransitionToCarBookingFn: (SearchRequestType) => void,
  push: Push,
  query: {
    searchToken?: string
  },
  retrieveCarReservationWithSearchTokenFn: (string) => Promise<*>,
  setFlowStatusFn: (string, string) => void,
  showDialogFn: (options: DialogOptionsType) => void
};

export class ViewCarReservationDetailsPage extends React.Component<Props> {
  componentDidMount() {
    const { carReservation, query: { searchToken } = {} } = this.props;

    if (searchToken && isEmpty(carReservation)) {
      this.props.retrieveCarReservationWithSearchTokenFn(searchToken);
    }
  }

  _onCancelCarReservationClick = (carReservation: CarReservationType) => {
    const { cancelCarReservationAndTransitionToConfirmationPageFn, query: { searchToken } = {} } = this.props;

    cancelCarReservationAndTransitionToConfirmationPageFn(carReservation, searchToken);
  };

  _onAddOtherCarClick = (request: SearchRequestType) => {
    const { prepareCarCrossSellAndTransitionToCarBookingFn } = this.props;

    prepareCarCrossSellAndTransitionToCarBookingFn(request);
  };

  render() {
    const { carReservation, hideDialogFn, showDialogFn } = this.props;

    return (
      !isEmpty(carReservation) && (
        <div>
          <SubHeader title={i18n('CAR_BOOKING__CAR_RESERVATION__TITLE_PLURAL')} />
          <ManageCarReservationWithDetails
            carReservation={carReservation}
            onCancelCarReservationClick={this._onCancelCarReservationClick}
            onAddOtherCarClick={this._onAddOtherCarClick}
            showDialogFn={showDialogFn}
            hideDialogFn={hideDialogFn}
          />
        </div>
      ));
  }
}

const mapStateToProps = (state) => ({
  carReservation: get(state, 'app.viewReservation.carReservation')
});

const mapDispatchToProps = {
  cancelCarReservationAndTransitionToConfirmationPageFn: CarCancelActions.cancelCarReservationAndTransitionToConfirmationPage,
  hideDialogFn: hideDialog,
  prepareCarCrossSellAndTransitionToCarBookingFn: CarBookingActions.prepareCarCrossSellAndTransitionToCarBooking,
  retrieveCarReservationWithSearchTokenFn: ViewReservationActions.retrieveCarReservationWithSearchToken,
  setFlowStatusFn: FlowStatusActions.setFlowStatus,
  showDialogFn: showDialog
};

const enhancers = flowRight(withConnectedReactRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhancers(ViewCarReservationDetailsPage);
