// @flow
import { push } from 'connected-react-router';
import CarCancelActionTypes, { apiActionCreator } from 'src/carCancel/actions/carCancelActionTypes';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as CarCancelApi from 'src/shared/api/carCancelApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { transformCarReservationToCancelRequest } from 'src/shared/transformers/carCancelTransformer';
import { retrieveCarReservationWithSearchToken } from 'src/viewReservation/actions/viewReservationActions';

import type { CarReservationType } from 'src/viewReservation/flow-typed/viewReservation.types';

const flowName = 'carCancel';

const { fetchCarCancelReservation, fetchCarCancelReservationSuccess, fetchCarCancelReservationFailed } =
  apiActionCreator(CarCancelActionTypes.CAR_CANCEL__FETCH_CAR_CANCEL_RESERVATION);

export const manageCarReservationCancel = (dispatch: *, cancellationRequest: *) => {
  dispatch(FlowStatusActions.clearFlowStatus(flowName));
  dispatch(FlowStatusActions.setFlowStatus(flowName, STATUS.IN_PROGRESS));
  dispatch(fetchCarCancelReservation());

  return CarCancelApi.cancelCarReservation(cancellationRequest)
    .then(() => {
      dispatch(FlowStatusActions.setFlowStatus(flowName, STATUS.COMPLETED));
      dispatch(fetchCarCancelReservationSuccess());
      playHapticFeedback();
    })
    .catch((error) => {
      dispatch(fetchCarCancelReservationFailed(error));
    });
};
  
export const cancelCarReservationAndTransitionToConfirmationPage =
  (carReservation: CarReservationType, searchToken?: string) => (dispatch: *) => {
    manageCarReservationCancel(dispatch, transformCarReservationToCancelRequest(carReservation))
      .then(() => {
        if (searchToken) {
          const carCancelConfirmation = buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'carCancelConfirmation' }), null, { searchToken });

          dispatch(push(carCancelConfirmation));
        } else {
          dispatch(push(getNormalizedRoute({ routeName: 'carCancelConfirmation' })));
        }
      });
  };

export const retrieveAndCancelCarReservationWithSearchToken = (searchToken: string) => (dispatch: *) => {
  dispatch(retrieveCarReservationWithSearchToken(searchToken))
    .then(() => dispatch(manageCarReservationCancel(dispatch, { searchToken })));
};
