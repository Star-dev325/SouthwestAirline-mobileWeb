// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUpgradeFareReservation } from 'src/airUpgrade/actions/airUpgradeActions';
import {
  checkIn,
  clearConfirmationPage,
  getReserveCheckInReservationWithSearchToken,
  goDirectlyToBoardingPasses,
  showShareLink
} from 'src/checkIn/actions/checkInActions';
import CheckBaggageButton from 'src/checkIn/components/checkBaggageButton';
import CheckInErrorCode from 'src/checkIn/constants/checkInErrorCode';
import { getCheckInRequest } from 'src/checkIn/selectors/checkInConfirmationPageSelectors';
import { cleanUpEndOfSession } from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import Button from 'src/shared/components/button';
import ConfirmationDetails from 'src/shared/components/confirmationDetails';
import ConfirmationMessage from 'src/shared/components/confirmationMessage';
import ContentLink from 'src/shared/components/contentLink';
import EditContactMethodMessage from 'src/shared/components/editContactMethodMessage';
import InfoBanner from 'src/shared/components/infoBanner';
import SubHeader from 'src/shared/components/subHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import BrowserObject from 'src/shared/helpers/browserObject';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';
import { hasSessionExpired } from 'src/shared/helpers/loginSessionHelper';
import {
  loadHasSeenNonsequentialMessage,
  saveHasSeenNonsequentialMessage
} from 'src/shared/helpers/nonsequentialBoardingHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getUpgradedBoardingReservation } from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { CheckinFlightType, CheckInPassengerRequestType } from 'src/checkIn/flow-typed/checkIn.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';
import type {
  CheckedBagsType,
  ContactInformationMessageType,
  MessageType,
  PassengerNameRecord,
  Push,
  ViewBoardingPass
} from 'src/shared/flow-typed/shared.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

const { location } = BrowserObject;

type Props = {
  checkInConfirmationPage: *,
  checkInConfirmationPagePlacements?: {
    checkInConfirmationPromoTop01: DynamicPlacementResponse,
    topBanner01: DynamicPlacementResponse
  },
  checkInFn: (checkInRequest?: CheckInPassengerRequestType) => Promise<*>,
  checkInRequest?: CheckInPassengerRequestType,
  cleanUpEndOfSessionFn: () => void,
  clearConfirmationPageFn: () => void,
  contactInformationMessage?: ContactInformationMessageType,
  flights: Array<CheckinFlightType>,
  footerWithLinks?: string,
  getReserveCheckInReservationWithSearchTokenFn: (searchToken: string) => Promise<*>,
  getUpgradedBoardingReservationFn: (link: Link) => void,
  getUpgradeFareReservationFn: (link: Link) => void,
  goBack: (*) => void,
  goDirectlyToBoardingPassesFn: ({
    firstName?: string,
    lastName?: string,
    recordLocator: string,
    viewBoardingPassesLink: ?ViewBoardingPass
  }) => void,
  hideDialogFn: () => Promise<*>,
  isLoggedIn: boolean,
  messages?: Array<MessageType>,
  nonSequentialMessage?: string,
  push: Push,
  query: {
    searchToken?: string
  },
  recordLocator: string,
  showDialogFn: (DialogOptionsType) => void,
  showShareLinkFn: () => void,
  UPGRADED_BOARDING: boolean,
  viewAllBoardingPassesLink: ?ViewBoardingPass,
  viewModifyCheckedBags?: CheckedBagsType,
  viewPremiumProductUpgrade?: Link,
  viewUpgradedBoarding?: Link
};

export const CheckInConfirmationPage = ({
  checkInConfirmationPage,
  checkInConfirmationPagePlacements: { checkInConfirmationPromoTop01, topBanner01 } = {},
  checkInFn,
  checkInRequest,
  cleanUpEndOfSessionFn,
  clearConfirmationPageFn,
  contactInformationMessage,
  flights,
  footerWithLinks,
  getReserveCheckInReservationWithSearchTokenFn,
  getUpgradedBoardingReservationFn,
  getUpgradeFareReservationFn,
  goBack,
  goDirectlyToBoardingPassesFn,
  hideDialogFn,
  isLoggedIn,
  messages,
  nonSequentialMessage,
  push,
  query: { searchToken } = {},
  recordLocator,
  showDialogFn,
  showShareLinkFn,
  UPGRADED_BOARDING,
  viewAllBoardingPassesLink,
  viewModifyCheckedBags,
  viewPremiumProductUpgrade,
  viewUpgradedBoarding
}: Props) => {
  const [isCompletedGetCheckInReservation, setIsCompletedGetCheckInReservation] = useState(false);

  useEffect(() => {
    clearConfirmationPageFn();
    searchToken && isEmpty(checkInRequest) && getReserveCheckInReservationWithSearchTokenFn(searchToken).then(() => {
      setIsCompletedGetCheckInReservation(true);
    });

    !searchToken && _performCheckIn();
  }, []);

  useEffect(() => {
    isCompletedGetCheckInReservation && searchToken && _performCheckIn();
  }, [checkInRequest, isCompletedGetCheckInReservation]);

  const _performCheckIn = () => {
    !isEmpty(checkInRequest) && checkInFn(checkInRequest).catch((error) => {
      const {
        responseJSON: { message, requestId, code }
      } = error;

      if (code === CheckInErrorCode.NO_PAX_ELIGIBLE_FOR_CHECKIN) {
        _showNoPaxEligibleCheckInPopup(message, code, requestId);
      } else if (code === CheckInErrorCode.CHECKIN_SESSION_TOKEN_EXPIRED) {
        showDialogFn({
          buttons: [
            {
              label: i18n('SHARED__BUTTON_TEXT__OK'),
              onClick: _backToHome
            }
          ],
          name: 'check-in-reservation-details-session-token-expired',
          title: i18n('CHECK_IN__ERRORS__SESSION_TOKEN_EXPIRED')
        });
      }
    });
  };

  const _backToHome = () => {
    if (isLoggedIn && hasSessionExpired()) {
      cleanUpEndOfSessionFn();
    }

    hideDialogFn().then(() => location.reload());
  };

  const _showNoPaxEligibleCheckInPopup = (message: string, code: number, requestId: string) => {
    showDialogFn({
      buttons: [
        {
          label: i18n('SHARED__BUTTON_TEXT__OK'),
          onClick: () => {
            hideDialogFn().then(goBack);
          }
        }
      ],
      contentView: `( ${requestId} )`,
      message: `Error ${code}`,
      name: 'no-pax-eligible-check-in',
      title: message
    });
  };

  const _navigateToBoardingPassPage = (pnr: PassengerNameRecord, viewPassengerBoardingPass: ?ViewBoardingPass) => {
    const viewBoardingPassIssuance =
      checkInConfirmationPage && checkInConfirmationPage._links
        ? checkInConfirmationPage._links.viewBoardingPassIssuance
        : null;
    const viewBoardingPassesLink = viewPassengerBoardingPass || viewBoardingPassIssuance;
    const labelText = get(viewBoardingPassesLink, 'labelText');
    const queryParams = labelText && labelText.toLowerCase() === 'security document' ? { clk: 'secdoc_confirm' } : null;

    showShareLinkFn();
    goDirectlyToBoardingPassesFn({
      queryParams,
      viewBoardingPassesLink,
      ...pnr
    });
  };

  const _renderMessages = () =>
    messages && messages.map(message => (
      <InfoBanner key={message.key} header={message.header} body={message.body} learnMoreUrl={message.learnMoreUrl} />
    ));

  const _onClickEditContactInfo = () => {
    push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'checkInContactMethod' }), { pnr: recordLocator }),
      null,
      { clk: 'AOMcheck' },
      {
        firstName: '',
        lastName: '',
        ...checkInConfirmationPage._links.contactInformation
      }
    );
  };

  const _navigateForTwoPaxNonstop = () => {
    const labelText = get(viewAllBoardingPassesLink, 'labelText');
    const queryParams =
      labelText && labelText.toLowerCase() === 'view all security documents' ? { clk: 'secdoc_confirm' } : null;

    goDirectlyToBoardingPassesFn({ viewBoardingPassesLink: viewAllBoardingPassesLink, queryParams, recordLocator });
  };

  const _viewAllBoardingPassesButtonClick = () => {
    const twoPaxNonStopFlight = flights.length === 1 && flights[0].passengers.length === 2;
    const showNonSequentialMessage = nonSequentialMessage && !loadHasSeenNonsequentialMessage(recordLocator);

    if (showNonSequentialMessage) {
      showDialogFn({
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn().then(() => {
                twoPaxNonStopFlight ? _navigateForTwoPaxNonstop() : push(getNormalizedRoute({ routeName: 'checkInChooseBoardingPass' }));
              });
            }
          }
        ],
        name: 'check-in-non-sequential-seats',
        title: nonSequentialMessage
      });
      saveHasSeenNonsequentialMessage(recordLocator);
    } else if (twoPaxNonStopFlight) {
      _navigateForTwoPaxNonstop();
    } else {
      push(getNormalizedRoute({ routeName: 'checkInChooseBoardingPass' }));
    }
  };

  const _renderViewAllBoardingPassesButton = () => {
    const labelText =
      (viewAllBoardingPassesLink && viewAllBoardingPassesLink.labelText) ||
      i18n('SHARED__BUTTON_TEXT__VIEW_ALL_BOARDING_PASSES');

    return (
      <div className="view-all-boarding-passes-button">
        <Button
          color="blue"
          data-qa="view-all-boarding-passes"
          fluid
          onClick={_viewAllBoardingPassesButtonClick}
          size="larger"
        >
          {labelText}
        </Button>
      </div>
    );
  };

  const _getActionToDispatch = () =>
    (viewUpgradedBoarding
      ? getUpgradedBoardingReservationFn
      : viewPremiumProductUpgrade
        ? getUpgradeFareReservationFn
        : null);

  const _getActionParams = () =>
    (viewPremiumProductUpgrade ? [{ link: viewPremiumProductUpgrade }] : [viewUpgradedBoarding]);

  return (
    <div className="check-in-confirmation">
      {_renderMessages()}
      <SubHeader title="Confirmation" />
      {checkInConfirmationPage && topBanner01 && (
        <DynamicPlacement
          {...topBanner01}
          actionParams={_getActionParams()}
          actionToDispatch={_getActionToDispatch()}
          placementKey="topBanner01"
          shouldCheckBootstrapData
        />            
      )}
      {checkInConfirmationPage && (
        <ConfirmationMessage body={checkInConfirmationPage.title.body} icon={checkInConfirmationPage.title.icon} />
      )}
      {contactInformationMessage && (
        <EditContactMethodMessage
          body={contactInformationMessage.body}
          linkText={contactInformationMessage.linkText}
          onClick={_onClickEditContactInfo}
        />
      )}
      {(viewAllBoardingPassesLink || viewModifyCheckedBags) && (
        <div className="checkin-buttons-group">
          {viewAllBoardingPassesLink && _renderViewAllBoardingPassesButton()}
          {viewModifyCheckedBags && (
            <CheckBaggageButton
              checkedBagsData={viewModifyCheckedBags}
              checkInRequest={checkInRequest}
              classNames={cx({ pt5: viewAllBoardingPassesLink })}
              component="<CheckInConfirmationPage>"
              feature="viewModifyCheckedBags"
            />
          )}
        </div>
      )}
      <div className="page content mx4">
        {checkInConfirmationPage && (
          <DynamicPlacement
            {...checkInConfirmationPromoTop01}
            actionParams={_getActionParams()}
            actionToDispatch={_getActionToDispatch()}
            placementKey="checkInConfirmationPromoTop01"
            shouldCheckBootstrapData
          />
        )}
        <div className="checkin-documents">
          <ConfirmationDetails
            flights={flights}
            onViewBoardingPassButtonClickCb={_navigateToBoardingPassPage}
            onUpgradedBoardingButtonClick={getUpgradedBoardingReservationFn}
            UPGRADED_BOARDING={UPGRADED_BOARDING}
          />
        </div>
        {footerWithLinks && (
          <div className="link-details">
            <ContentLink className="footerlink-with-text" raw={footerWithLinks} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkInConfirmationPage: get(state, 'app.checkIn.checkInConfirmationPage'),
  checkInConfirmationPagePlacements: get(state, 'app.checkIn.checkInConfirmationPagePlacements'),
  checkInRequest: getCheckInRequest(state),
  contactInformationMessage: get(state, 'app.checkIn.checkInConfirmationPage.contactInformationMessage'),
  flights: get(state, 'app.checkIn.checkInConfirmationPage.flights'),
  footerWithLinks: get(state, 'app.checkIn.checkInConfirmationPage.footerWithLinks'),
  isLoggedIn: get(state, 'app.account.isLoggedIn'),
  messages: get(state, 'app.checkIn.checkInConfirmationPage.messages'),
  nonSequentialMessage: get(
    state,
    'app.checkIn.checkInConfirmationPage._links.viewAllBoardingPasses.nonSequentialPositionsMessage'
  ),
  recordLocator: get(state, 'app.checkIn.checkInFlowData.recordLocator'),
  UPGRADED_BOARDING: get(state, 'app.toggles.UPGRADED_BOARDING', false),
  viewAllBoardingPassesLink: get(state, 'app.checkIn.checkInConfirmationPage._links.viewAllBoardingPasses'),
  viewModifyCheckedBags: get(state, 'app.checkIn.checkInConfirmationPage._links.viewModifyCheckedBags'),
  viewPremiumProductUpgrade: get(state, 'app.checkIn.checkInConfirmationPage._links.viewPremiumProductUpgrade'),
  viewUpgradedBoarding: get(state, 'app.checkIn.checkInConfirmationPage._links.viewUpgradedBoarding')
});

const mapDispatchToProps = {
  checkInFn: checkIn,
  cleanUpEndOfSessionFn: cleanUpEndOfSession,
  clearConfirmationPageFn: clearConfirmationPage,
  getReserveCheckInReservationWithSearchTokenFn: getReserveCheckInReservationWithSearchToken,
  getUpgradedBoardingReservationFn: getUpgradedBoardingReservation,
  getUpgradeFareReservationFn: getUpgradeFareReservation,
  goDirectlyToBoardingPassesFn: goDirectlyToBoardingPasses,
  hideDialogFn: hideDialog,
  showDialogFn: showDialog,
  showShareLinkFn: showShareLink
};

const enhancers = flowRight(
  withConnectedReactRouter,
  withBodyClass('checkin-confirmation-bg'),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CheckInConfirmationPage);
