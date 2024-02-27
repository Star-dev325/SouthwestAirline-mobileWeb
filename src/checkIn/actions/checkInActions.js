// @flow
import { push } from 'connected-react-router';
import checkInActionTypes, { apiActionCreator } from 'src/checkIn/actions/checkInActionTypes';
import CheckInErrorCode from 'src/checkIn/constants/checkInErrorCode';
import { browserRefreshErrorHandler } from 'src/checkIn/helpers/checkInErrorHandlerHelper';
import { getNextTravelPassengerTransitionInfo, isMissingAdditionalInfo } from 'src/checkIn/helpers/updateAPIsHelper';
import UpdateAPIsTransformers from 'src/checkIn/transformers/updateAPIsTransformer';
import { getMboxConfig, getSegments, getTargetParams } from 'src/shared/actions/adobeTargetActions';
import { showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import { updateViewBoardingPass } from 'src/shared/actions/sharedActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import * as CheckInApi from 'src/shared/api/checkInApi';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import { STATUS } from 'src/shared/constants/flowConstants';
import { RECORD_LOCATOR } from 'src/shared/constants/requestParameter';
import BrowserObject from 'src/shared/helpers/browserObject';
import { dispatchHideDialog } from 'src/shared/helpers/dialogHelper';
import { containsApiErrorCodes } from 'src/shared/helpers/errorCodesHelper';
import { goBackErrorHandler } from 'src/shared/helpers/errorHandlerHelper';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { buildLocation, buildPathWithParamAndQuery, transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getPlacements } from 'src/wcm/actions/wcmActions';
import { CHECK_IN_CONFIRMATION_PAGE_ID } from 'src/wcm/constants/wcmConstants';

import type { Dispatch as ReduxDispatch } from 'redux';
import type {
  CheckInPassengerRequestType,
  CheckInViewResDetailRequestType,
  TravelDocumentActionParametersType
} from 'src/checkIn/flow-typed/checkIn.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { Dispatch as ThunkDispatch, ViewBoardingPass } from 'src/shared/flow-typed/shared.types';

const {
  CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS,
  CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS,
  CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS,
  CHECK_IN__CLEAN_APIS_DATA,
  CHECK_IN__CLEAR_BOARDING_PASSES,
  CHECK_IN__CLEAR_CHECK_IN_SESSION_TOKEN,
  CHECK_IN__CLEAR_CONFIRMATION_PAGE,
  CHECK_IN__FETCH_BOARDING_PASS,
  CHECK_IN__FETCH_CONFIRMATION_PAGE,
  CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS,
  CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS,
  CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS,
  CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK,
  CHECK_IN__RESET_FLOW_DATA,
  CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL,
  CHECK_IN__SHOW_SHARE_LINK,
  CHECK_IN__UPDATE_APIS_DATA
} = checkInActionTypes;

const { location } = BrowserObject;

const { fetchReserveCheckInReservationDetails, fetchReserveCheckInReservationDetailsFailed } = apiActionCreator(
  CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS
);

const {
  fetchReserveCheckInReservationDetailsWithLink,
  fetchReserveCheckInReservationDetailsWithLinkSuccess,
  fetchReserveCheckInReservationDetailsWithLinkFailed
} = apiActionCreator(CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_WITH_LINK);

const fetchReserveCheckInReservationDetailsSuccess = (response, pnr) => ({
  isFetching: false,
  pnr,
  response,
  type: CHECK_IN__FETCH_RESERVE_CHECK_IN_RESERVATION_DETAILS_SUCCESS
});

const _transformPnrToUpperCase = (requestParameters: CheckInViewResDetailRequestType) => {
  const { firstName, lastName, recordLocator } = requestParameters;

  return {
    firstName,
    lastName,
    recordLocator: recordLocator.toUpperCase()
  };
};

const oneTapCheckIn = (checkInApiResponse: { checkInViewReservationPage: { _links: { travelDocuments: * } } }) => {
  const linksOfResponse = checkInApiResponse?.checkInViewReservationPage?._links;
  const travelDocuments = UpdateAPIsTransformers.transformLinksToTravelDocuments(linksOfResponse);

  const firstPaxNumber = '0';
  const { nextPagePath, nextPaxNumber } = getNextTravelPassengerTransitionInfo(travelDocuments, firstPaxNumber);
  const { searchToken } = transformSearchToQuery(location?.search);
  const queryParams = searchToken ? { searchToken } : {};

  if (nextPagePath === getNormalizedRoute({ routeName: 'checkInConfirmation' })) {
    return buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'checkInConfirmation' }), {}, queryParams);
  } else {
    return buildPathWithParamAndQuery(nextPagePath, { paxNumber: nextPaxNumber }, queryParams);
  }
};

export const getReserveCheckInReservationWithLink =
  (checkInLink: Link) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(resetFlowData());
      dispatch(fetchReserveCheckInReservationDetailsWithLink(checkInLink));

      return CheckInApi.retrieveReservationDetailWithLink(checkInLink)
        .then((response) => {
          dispatch(fetchReserveCheckInReservationDetailsWithLinkSuccess(response));
          dispatch(setCheckInFlowStatus(STATUS.IN_PROGRESS));
          dispatch(push(oneTapCheckIn(response)));

          return response;
        })
        .catch((error) => {
          dispatch(push(getNormalizedRoute({ routeName: 'checkInIndex' })));
          dispatch(fetchReserveCheckInReservationDetailsWithLinkFailed(error));
          throw error;
        });
    };

export const getReserveCheckInReservation =
  (requestParameters: CheckInViewResDetailRequestType, isOnDetailsPage: boolean = false) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(resetFlowData());
      dispatch(fetchReserveCheckInReservationDetails());
      const pnr = _transformPnrToUpperCase(requestParameters);

      return CheckInApi.retrieveReservationDetail(pnr)
        .then((response) => {
          dispatch(fetchReserveCheckInReservationDetailsSuccess(response, pnr));
          dispatch(setCheckInFlowStatus(STATUS.IN_PROGRESS));
          dispatch(push(oneTapCheckIn(response)));
        })
        .catch((error) => {
          isOnDetailsPage && dispatch(push(getNormalizedRoute({ routeName: 'checkInIndex' })));
          dispatch(fetchReserveCheckInReservationDetailsFailed(error));
          throw error;
        });
    };

export const getReserveCheckInReservationWithSearchToken =
  (searchToken: string) =>
    (dispatch: ReduxDispatch<*>): Promise<*> => {
      dispatch(resetFlowData());
      dispatch(fetchReserveCheckInReservationDetails());
      const pnr = {
        firstName: '',
        lastName: '',
        passengerSearchToken: searchToken,
        recordLocator: RECORD_LOCATOR
      };

      return CheckInApi.retrieveReservationDetail(pnr)
        .then((response) => {
          dispatch(fetchReserveCheckInReservationDetailsSuccess(response, pnr));
          dispatch(setCheckInFlowStatus(STATUS.IN_PROGRESS));
          dispatch(push(oneTapCheckIn(response)));
        })
        .catch((error) => {
          dispatch(fetchReserveCheckInReservationDetailsFailed(error));
          throw error;
        });
    };

export const setCheckInFlowStatus = (status: string) => FlowStatusActions.setFlowStatus('checkIn', status);

const { fetchConfirmationPage, fetchConfirmationPageSuccess, fetchConfirmationPageFailed } = apiActionCreator(
  CHECK_IN__FETCH_CONFIRMATION_PAGE
);

export const checkIn =
  (request: CheckInPassengerRequestType) =>
    (dispatch: ThunkDispatch): Promise<*> => {
      dispatch(fetchConfirmationPage());

      return CheckInApi.checkInPassenger(request)
        .then((response) => {
          dispatch(fetchConfirmationPageSuccess(response));
          dispatch(loadConfirmationPagePlacements(response));
          playHapticFeedback();
        })
        .catch((error) => {
          if (
            containsApiErrorCodes(
              error,
              CheckInErrorCode.CHECKIN_SESSION_TOKEN_EXPIRED,
              CheckInErrorCode.NO_PAX_ELIGIBLE_FOR_CHECKIN
            )
          ) {
            error.$customized = true;
          } else {
            error.errorHandler = browserRefreshErrorHandler;
          }

          dispatch(fetchConfirmationPageFailed(error));
          throw error;
        });
    };

const {
  fetchConfirmationPagePlacements,
  fetchConfirmationPagePlacementsSuccess,
  fetchConfirmationPagePlacementsFailed
} = apiActionCreator(CHECK_IN__FETCH_CONFIRMATION_PAGE_PLACEMENTS, { isSpinnerNeeded: false });

export const loadConfirmationPagePlacements =
  (response: *): * =>
    (dispatch: ThunkDispatch) => {
      const defaultMboxes = [AdobeTargetConstants.CHECK_IN_CONFIRMATION_UPGRADE_BUTTON];
      const appContext = response?.checkInConfirmationPage?.mktg_data?.appContext || '';
      const delimitedAppContexts = response?.checkInConfirmationPage?.mktg_data?.delimitedAppContexts;
      const delim = response?.checkInConfirmationPage?.delim;
      const appContextsContent = delimitedAppContexts && delimitedAppContexts.split(delim);

      dispatch(fetchConfirmationPagePlacements());
      const appContexts = appContextsContent ? appContextsContent : [appContext];

      return dispatch(getTargetParams({}, CHECK_IN_CONFIRMATION_PAGE_ID))
        .then((params) => dispatch(getMboxConfig(CHECK_IN_CONFIRMATION_PAGE_ID, params, defaultMboxes)))
        .then((config) => dispatch(getSegments(config)))
        .then((segments) => dispatch(getPlacements(CHECK_IN_CONFIRMATION_PAGE_ID, appContexts, segments)))
        .then((content) => dispatch(fetchConfirmationPagePlacementsSuccess(content)))
        .catch(() => dispatch(fetchConfirmationPagePlacementsFailed()));
    };

export const transitToBoardingPosition = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(setCheckInFlowStatus(STATUS.IN_PROGRESS));
  dispatch(push(getNormalizedRoute({ routeName: 'checkInBoardingPosition' })));
};

const clearCheckInSessionToken = () => ({
  type: CHECK_IN__CLEAR_CHECK_IN_SESSION_TOKEN
});

export const goDirectlyToBoardingPasses = ({
  firstName,
  lastName,
  queryParams,
  recordLocator,
  viewBoardingPassesLink
}: {
  firstName?: string,
  lastName?: string,
  queryParams?: string,
  recordLocator: string,
  viewBoardingPassesLink: ?ViewBoardingPass
}) => {
  const pnr = {
    firstName: firstName ? firstName : viewBoardingPassesLink?.body?.firstName,
    lastName: lastName ? lastName : viewBoardingPassesLink?.body?.lastName,
    recordLocator
  };

  return (dispatch: *) => {
    viewBoardingPassesLink &&
      dispatch(retrieveBoardingPass(viewBoardingPassesLink, false)).then(() => {
        dispatch(updateViewBoardingPass(viewBoardingPassesLink));
        dispatch(push(buildLocation(getNormalizedRoute({ routeName: 'checkInBoardingPass' }), null, queryParams, pnr)));
      });
  };
};

const { fetchBoardingPass, fetchBoardingPassSuccess, fetchBoardingPassFailed } =
  apiActionCreator(CHECK_IN__FETCH_BOARDING_PASS);

export const retrieveBoardingPass =
  (viewBoardingPassIssuance: ViewBoardingPass, shouldSetFlowStatus: boolean) =>
    (dispatch: *): Promise<*> => {
      dispatch(fetchBoardingPass());
      shouldSetFlowStatus && dispatch(setCheckInFlowStatus(STATUS.IN_PROGRESS));

      return CheckInApi.retrieveBoardingPass(viewBoardingPassIssuance)
        .then((response) => {
          const {
            mobileBoardingPassViewPage: { messages }
          } = response.checkInRetrieveBoardingPassPage;

          if (messages) {
            const unableToIssueBoardingPassMessage = messages.find(
              (msg) => msg.code === CheckInErrorCode.UNABLE_ISSUE_MBP
            );

            if (unableToIssueBoardingPassMessage) {
              dispatch(
                showDialog({
                  active: true,
                  closeLabel: 'OK',
                  message: unableToIssueBoardingPassMessage.body,
                  name: unableToIssueBoardingPassMessage.key,
                  onClose: dispatchHideDialog,
                  title: unableToIssueBoardingPassMessage.header
                })
              );
            }
          }
          dispatch(fetchBoardingPassSuccess(response));
          const mobileBoardingPasses =
          response?.checkInRetrieveBoardingPassPage?.mobileBoardingPassViewPage?.mobileBoardingPassView ?? [];

          if (mobileBoardingPasses.length > 0 && mobileBoardingPasses[0].documentType === 'SECURITY_DOCUMENT') {
            raiseSatelliteEvent('security document pass');
          }
        })
        .catch((error) => {
          let customizedError = error;

          if (containsApiErrorCodes(error, CheckInErrorCode.CHECKIN_SESSION_TOKEN_EXPIRED)) {
            customizedError = {
              ...error,
              ...{ $customized: true }
            };
            dispatch(clearCheckInSessionToken());
            retrieveBoardingPass(viewBoardingPassIssuance, shouldSetFlowStatus);
          } else {
            error.errorHandler = goBackErrorHandler;
          }

          dispatch(fetchBoardingPassFailed(customizedError));
          throw error;
        });
    };

const { addNationalityAndEmergencyDocs, addNationalityAndEmergencyDocsFailed } = apiActionCreator(
  CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS
);

const addNationalityAndEmergencyDocsSuccess = (response, paxNumber, formData) => ({
  formData,
  isFetching: false,
  paxNumber,
  response,
  type: CHECK_IN__ADD_NATIONALITY_AND_EMERGENCY_DOCS_SUCCESS
});

const _isMissingAdditional = (response) => {
  const missingDocuments = response?.travelDocumentsNeeded?._links?.travelDocuments?.meta?.missingDocuments;

  return isMissingAdditionalInfo(missingDocuments);
};

export const addNationalityAndEmergencyDocuments = ({
  checkInSessionToken,
  formData,
  paxNumber,
  requestData,
  shouldShowSaveEmergencyContactForAll,
  showSessionExpiredPopup,
  suppressEmergencyContact,
  transitToNextPax
}: TravelDocumentActionParametersType) => {
  const requestParameters = UpdateAPIsTransformers.transformToPassportInfoRequest(
    requestData,
    formData,
    checkInSessionToken,
    suppressEmergencyContact
  );

  return (dispatch: ReduxDispatch<*>): Promise<*> => {
    dispatch(addNationalityAndEmergencyDocs());

    return CheckInApi.addTravelDocuments(requestParameters)
      .then((response) => {
        dispatch(addNationalityAndEmergencyDocsSuccess(response, paxNumber, formData));

        return _isMissingAdditional(response);
      })
      .then((isMissingAdditional) => {
        if (shouldShowSaveEmergencyContactForAll) {
          dispatch(saveEmergencyContactForAll(formData));
        }
        dispatch(cleanAPISData(paxNumber));

        return isMissingAdditional;
      })
      .then((isMissingAdditional) => {
        if (isMissingAdditional) {
          dispatch(
            push(
              buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'checkInAdditionalPassportInformation' }), {
                paxNumber
              })
            )
          );
        } else {
          transitToNextPax();
        }
      })
      .catch((error) => {
        let customizedError = error;

        if (containsApiErrorCodes(error, CheckInErrorCode.CHECKIN_SESSION_TOKEN_EXPIRED)) {
          customizedError = {
            ...error,
            ...{ $customized: true }
          };
          showSessionExpiredPopup();
        }
        dispatch(addNationalityAndEmergencyDocsFailed(customizedError));
      });
  };
};

export const cleanAPISData = (paxNumber: number) => ({
  paxNumber,
  type: CHECK_IN__CLEAN_APIS_DATA
});

// FIXME: flow type
export const saveEmergencyContactForAll = (formData: *) => ({
  formData,
  type: CHECK_IN__SAVE_EMERGENCY_CONTACT_FOR_ALL
});

export const showShareLink = () => ({
  type: CHECK_IN__SHOW_SHARE_LINK
});

export const clearBoardingPass = () => ({
  type: CHECK_IN__CLEAR_BOARDING_PASSES
});

export const clearConfirmationPage = () => ({
  type: CHECK_IN__CLEAR_CONFIRMATION_PAGE
});

const { addAdditionalPassportInfoDocs, addAdditionalPassportInfoDocsSuccess, addAdditionalPassportInfoDocsFailed } =
  apiActionCreator(CHECK_IN__ADD_ADDITIONAL_PASSPORT_INFO_DOCS);

export const addAdditionalPassportInfoDocuments = (
  requestData: Link,
  formData: FormData,
  checkInSessionToken: string
) => {
  const requestParameters = UpdateAPIsTransformers.transformToAdditionalInfoRequest(
    requestData,
    formData,
    checkInSessionToken
  );

  return (dispatch: ReduxDispatch<*>): Promise<*> => {
    dispatch(addAdditionalPassportInfoDocs());

    return CheckInApi.addTravelDocuments(requestParameters)
      .then((response) => {
        dispatch(addAdditionalPassportInfoDocsSuccess(response));
      })
      .catch((error) => {
        let customizedError = error;

        if (containsApiErrorCodes(error, CheckInErrorCode.CHECKIN_SESSION_TOKEN_EXPIRED)) {
          customizedError = {
            ...error,
            ...{ $customized: true }
          };
        }
        dispatch(addAdditionalPassportInfoDocsFailed(customizedError));
        throw error;
      });
  };
};

export const updateAPISData = (formData: FormData, nodeName: string, paxNumber: string) => ({
  formData,
  nodeName,
  paxNumber,
  type: CHECK_IN__UPDATE_APIS_DATA
});

export const resetFlowData = () => ({
  type: CHECK_IN__RESET_FLOW_DATA
});
