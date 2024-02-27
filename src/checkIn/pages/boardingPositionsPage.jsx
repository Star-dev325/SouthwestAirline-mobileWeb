// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUpgradeFareReservation } from 'src/airUpgrade/actions/airUpgradeActions';
import * as CheckInActions from 'src/checkIn/actions/checkInActions';
import CheckBaggageButton from 'src/checkIn/components/checkBaggageButton';
import * as DialogActions from 'src/shared/actions/dialogActions';
import Button from 'src/shared/components/button';
import ConfirmationDetails from 'src/shared/components/confirmationDetails';
import ContentLink from 'src/shared/components/contentLink';
import EditContactMethodMessage from 'src/shared/components/editContactMethodMessage';
import InfoBanner from 'src/shared/components/infoBanner';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { TRACK_CHECKED_BAGS, VIEW_MODIFY_CHECKED_BAGS } from 'src/shared/constants/checkedBagsFeatureNames';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { getCheckedBagsQueryParams } from 'src/shared/helpers/checkedBagsQueryParams';
import {
  loadHasSeenNonsequentialMessage,
  saveHasSeenNonsequentialMessage
} from 'src/shared/helpers/nonsequentialBoardingHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import { getUpgradedBoardingReservation } from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { CheckinFlightType } from 'src/checkIn/flow-typed/checkIn.types';
import type { DialogOptionsType } from 'src/shared/flow-typed/dialog.types';
import type {
  CheckedBagsType,
  ContactInformationMessageType,
  MessageType,
  PassengerNameRecord,
  Push,
  ViewBoardingPass
} from 'src/shared/flow-typed/shared.types';
import type { FlightRetrieveRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  checkInConfirmationPage?: *,
  checkInConfirmationPagePlacements?: {
    checkInConfirmationPromoTop01: DynamicPlacementResponse
  },
  contactInformationMessage?: ContactInformationMessageType,
  flights: Array<CheckinFlightType>,
  footerWithLinks?: string,
  getUpgradedBoardingReservationFn: (link: Link) => void,
  getUpgradeFareReservationFn: (link: Link) => void,
  goDirectlyToBoardingPassesFn: ({
    viewBoardingPassesLink: ?ViewBoardingPass,
    recordLocator: string,
    firstName?: string,
    lastName?: string
  }) => void,
  hideDialogFn: () => Promise<*>,
  messages?: Array<MessageType>,
  nonSequentialMessage?: string,
  push: Push,
  recordLocator: string,
  showDialogFn: (DialogOptionsType) => void,
  showShareLinkFn: () => void,
  trackCheckedBags: CheckedBagsType,
  upgradedBoardingFormData: FlightRetrieveRequestType,
  viewAllBoardingPassesLink: ?ViewBoardingPass,
  viewModifyCheckedBags: CheckedBagsType,
  viewPremiumProductUpgrade?: Link,
  viewReservationSearchRequest: FlightRetrieveRequestType,
  viewUpgradedBoarding?: Link
};

export class BoardingPositionsPage extends Component<Props> {
  _navigateToBoardingPassPage = (pnr: PassengerNameRecord, viewPassengerBoardingPass: ?ViewBoardingPass) => {
    const { checkInConfirmationPage, goDirectlyToBoardingPassesFn, showShareLinkFn } = this.props;
    const viewBoardingPassIssuance =
      checkInConfirmationPage && checkInConfirmationPage._links
        ? checkInConfirmationPage._links.viewBoardingPassIssuance
        : null;

    const viewBoardingPassesLink = viewPassengerBoardingPass || viewBoardingPassIssuance;
    const labelText = _.get(viewBoardingPassesLink, 'labelText');
    const queryParams =
      labelText && labelText.toLowerCase() === 'security document' ? { clk: 'secdoc_boardingdetails' } : null;

    showShareLinkFn();
    goDirectlyToBoardingPassesFn({
      ...pnr,
      queryParams,
      viewBoardingPassesLink
    });
  };

  _renderMessages = () => {
    const { messages } = this.props;

    return _.map(messages, (message) => (
      <InfoBanner key={message.key} header={message.header} body={message.body} learnMoreUrl={message.learnMoreUrl} />
    ));
  };

  _navigateForTwoPaxNonstop = () => {
    const { goDirectlyToBoardingPassesFn, recordLocator, viewAllBoardingPassesLink } = this.props;
    const labelText = _.get(viewAllBoardingPassesLink, 'labelText');
    const queryParams =
      labelText && labelText.toLowerCase() === 'view all security documents' ? { clk: 'secdoc_boardingdetails' } : null;

    goDirectlyToBoardingPassesFn({
      queryParams,
      recordLocator,
      viewBoardingPassesLink: viewAllBoardingPassesLink
    });
  };

  _viewAllBoardingPassesButtonClick = () => {
    const { hideDialogFn, flights, nonSequentialMessage, push, recordLocator, showDialogFn } = this.props;
    const twoPaxNonStopFlight = flights.length === 1 && flights[0].passengers.length === 2;
    const showNonSequentialMessage = nonSequentialMessage && !loadHasSeenNonsequentialMessage(recordLocator);

    if (showNonSequentialMessage) {
      showDialogFn({
        buttons: [
          {
            label: i18n('SHARED__BUTTON_TEXT__OK'),
            onClick: () => {
              hideDialogFn().then(() => {
                twoPaxNonStopFlight ? this._navigateForTwoPaxNonstop() : push(getNormalizedRoute({ routeName: 'checkInChooseBoardingPass' }));
              });
            }
          }
        ],
        name: 'check-in-non-sequential-seats',
        title: nonSequentialMessage
      });
      saveHasSeenNonsequentialMessage(recordLocator);
    } else if (twoPaxNonStopFlight) {
      this._navigateForTwoPaxNonstop();
    } else {
      this.props.push(getNormalizedRoute({ routeName: 'checkInChooseBoardingPass' }));
    }
  };

  _renderViewAllBoardingPassesButton = () => {
    const { viewAllBoardingPassesLink } = this.props;
    const labelText =
      (viewAllBoardingPassesLink && viewAllBoardingPassesLink.labelText) ||
      i18n('SHARED__BUTTON_TEXT__VIEW_ALL_BOARDING_PASSES');

    return (
      <div className="view-all-boarding-passes-button">
        <Button
          color="blue"
          data-qa="view-all-boarding-passes"
          fluid
          onClick={this._viewAllBoardingPassesButtonClick}
          size="larger"
        >
          {labelText}
        </Button>
      </div>
    );
  };

  _onClickEditContactInfo = () => {
    const { checkInConfirmationPage, push, recordLocator } = this.props;
    const contactInformationLinks = _.get(checkInConfirmationPage, '_links.contactInformation');

    push(buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'checkInContactMethod' }), { pnr: recordLocator }), null, null, {
      ...contactInformationLinks,
      firstName: '',
      lastName: ''
    });
  };

  _getActionToDispatch = () => {
    const {
      getUpgradedBoardingReservationFn,
      getUpgradeFareReservationFn,
      viewPremiumProductUpgrade,
      viewUpgradedBoarding
    } = this.props;

    return viewUpgradedBoarding
      ? getUpgradedBoardingReservationFn
      : viewPremiumProductUpgrade
        ? getUpgradeFareReservationFn
        : null;
  };

  _getActionParams = () => {
    const { viewPremiumProductUpgrade, viewUpgradedBoarding } = this.props;

    return viewPremiumProductUpgrade ? [{ link: viewPremiumProductUpgrade }] : [viewUpgradedBoarding];
  };

  _checkObjectHasData = (object: FlightRetrieveRequestType) => Object.keys(object).length !== 0;

  _getCheckInRequestObject = () => {
    const { flights, trackCheckedBags, upgradedBoardingFormData = {}, viewReservationSearchRequest = {} } = this.props;
    const checkUpgradedBoardingFormData = this._checkObjectHasData(upgradedBoardingFormData);
    const checkViewReservationSearchRequestData = this._checkObjectHasData(viewReservationSearchRequest);
    let requestData;

    if (checkUpgradedBoardingFormData || checkViewReservationSearchRequestData) {
      requestData =
        Object.keys(viewReservationSearchRequest).length === 0
          ? upgradedBoardingFormData
          : viewReservationSearchRequest;
    } else {
      const { confirmationNumber, name } = flights?.[0]?.passengers?.[0];
      const splitPassengerName = name && name.split(' ');
      const firstName = splitPassengerName && splitPassengerName[0];
      const lastName = splitPassengerName && splitPassengerName.slice(-1)[0];

      requestData = {
        firstName,
        lastName,
        recordLocator: confirmationNumber
      };
    }
    const { firstName = '', lastName = '', recordLocator = '' } = requestData;

    const { query: { first_name = firstName, last_name = lastName, record_locator = recordLocator } = {} } =
      trackCheckedBags || {};

    return {
      body: {
        firstName: first_name,
        lastName: last_name,
        recordLocator: record_locator
      }
    };
  };

  render() {
    const {
      checkInConfirmationPagePlacements,
      contactInformationMessage,
      flights,
      footerWithLinks,
      trackCheckedBags,
      viewAllBoardingPassesLink,
      viewModifyCheckedBags,
      viewUpgradedBoarding
    } = this.props;

    return (
      <div className="attach-top check-in-confirmation">
        <PageHeaderWithButtons
          backButtonUrl="viewReservationDetailsPage"
          showBackButton
          title={i18n('CHECK_IN__BOARDING_DETAILS__TITLE')}
        />
        {this._renderMessages()}
        {contactInformationMessage && (
          <div className="my6">
            <EditContactMethodMessage
              body={contactInformationMessage.body}
              linkText={contactInformationMessage.linkText}
              onClick={this._onClickEditContactInfo}
            />
          </div>
        )}
        {(viewAllBoardingPassesLink || viewModifyCheckedBags || trackCheckedBags) && (
          <div className="checkin-buttons-group">
            {viewAllBoardingPassesLink && this._renderViewAllBoardingPassesButton()}
            {(viewModifyCheckedBags || trackCheckedBags) && (
              <CheckBaggageButton
                checkedBagsData={trackCheckedBags ? trackCheckedBags : viewModifyCheckedBags}
                checkInRequest={this._getCheckInRequestObject()}
                classNames={cx({ pt5: viewAllBoardingPassesLink })}
                component="<BoardingPositionsPage>"
                feature={trackCheckedBags ? TRACK_CHECKED_BAGS : VIEW_MODIFY_CHECKED_BAGS}
                icon={trackCheckedBags ? 'ic-external-link' : null}
                queryParams={getCheckedBagsQueryParams(trackCheckedBags)}
              />
            )}
          </div>
        )}
        {viewUpgradedBoarding && checkInConfirmationPagePlacements && (
          <DynamicPlacement
            {...checkInConfirmationPagePlacements?.checkInConfirmationPromoTop01}
            actionParams={this._getActionParams()}
            actionToDispatch={this._getActionToDispatch()}
            placementKey="checkInConfirmationPromoTop01"
            shouldCheckBootstrapData
          />
        )}
        <div className="mx4 mb6">
          <div className="checkin-documents">
            <ConfirmationDetails
              flights={flights}
              onViewBoardingPassButtonClickCb={this._navigateToBoardingPassPage}
              UPGRADED_BOARDING={false}
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
  }
}

const mapStateToProps = (state) => ({
  checkInConfirmationPage: _.get(state, 'app.checkIn.checkInConfirmationPage'),
  checkInConfirmationPagePlacements: _.get(state, 'app.checkIn.checkInConfirmationPagePlacements'),
  contactInformationMessage: _.get(state, 'app.checkIn.checkInConfirmationPage.contactInformationMessage'),
  flights: _.get(state, 'app.checkIn.checkInConfirmationPage.flights'),
  footerWithLinks: _.get(state, 'app.checkIn.checkInConfirmationPage.footerWithLinks'),
  messages: _.get(state, 'app.checkIn.checkInConfirmationPage.messages'),
  nonSequentialMessage: _.get(
    state,
    'app.checkIn.checkInConfirmationPage._links.viewAllBoardingPasses.nonSequentialPositionsMessage'
  ),
  recordLocator: _.get(state, 'app.checkIn.checkInConfirmationPage.flights[0].passengers[0].confirmationNumber'),
  trackCheckedBags: _.get(state, 'app.checkIn.checkInConfirmationPage._links.trackCheckedBags'),
  upgradedBoardingFormData: _.get(state, 'app.formData.UPGRADED_BOARDING_FORM.data'),
  viewAllBoardingPassesLink: _.get(state, 'app.checkIn.checkInConfirmationPage._links.viewAllBoardingPasses'),
  viewModifyCheckedBags: _.get(state, 'app.checkIn.checkInConfirmationPage._links.viewModifyCheckedBags'),
  viewPremiumProductUpgrade: _.get(state, 'app.checkIn.checkInConfirmationPage._links.viewPremiumProductUpgrade'),
  viewReservationSearchRequest: _.get(state, 'app.viewReservation.searchRequest'),
  viewUpgradedBoarding: _.get(state, 'app.checkIn.checkInConfirmationPage._links.viewUpgradedBoarding')
});

const mapDispatchToProps = {
  getUpgradedBoardingReservationFn: getUpgradedBoardingReservation,
  getUpgradeFareReservationFn: getUpgradeFareReservation,
  goDirectlyToBoardingPassesFn: CheckInActions.goDirectlyToBoardingPasses,
  hideDialogFn: DialogActions.hideDialog,
  showDialogFn: DialogActions.showDialog,
  showShareLinkFn: CheckInActions.showShareLink
};

const enhancers = _.flowRight(
  withBodyClass(['hide-header', 'checkin-confirmation-bg']),
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(BoardingPositionsPage);
