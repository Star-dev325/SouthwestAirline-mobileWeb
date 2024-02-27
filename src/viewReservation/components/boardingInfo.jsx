// @flow
import { useHref } from '@swa-ui/encryption';
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import CheckBaggageButton from 'src/checkIn/components/checkBaggageButton';
import MobileBoardingPassMessage from 'src/checkIn/components/mobileBoardingPassMessage';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import Button from 'src/shared/components/button';
import ButtonWithPlusIconAndText from 'src/shared/components/buttonWithPlusIconAndText';
import CheckInButton from 'src/shared/components/checkInButton';
import ConfirmationNumber from 'src/shared/components/confirmationNumber';
import Icon from 'src/shared/components/icon';
import TripDateAndDestCity from 'src/shared/components/tripDateAndDestCity';
import YellowButton from 'src/shared/components/yellowButton';
import { TRACK_CHECKED_BAGS, VIEW_MODIFY_CHECKED_BAGS } from 'src/shared/constants/checkedBagsFeatureNames';
import { getCheckedBagsQueryParams } from 'src/shared/helpers/checkedBagsQueryParams';
import DayOfTravelContactSelect from 'src/viewReservation/components/dayOfTravelContactSelect';
import DayOfTravelPassengerGroup from 'src/viewReservation/components/dayOfTravelPassengerGroup';
import { getShowDialogOptions } from 'src/viewReservation/helpers/viewReservationHelper';
import type { Node } from 'react';

import type { OptionsAndNextSteps } from 'src/myAccount/flow-typed/myAccount.types';
import type {
  CheckedBagsType,
  GreyBoxMessage,
  ModifyBaggageDetailsType,
  SameDayBlockedMessageType,
  SameDayReservation,
  ViewBoardingPass
} from 'src/shared/flow-typed/shared.types';
import type { Passenger } from 'src/viewReservation/components/passengerReservationInfo';
import type { FlightRetrieveRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  checkIn: ?Link,
  checkInIneligibilityReason: ?string,
  confirmationNumber: string,
  contactInformation: ?Link,
  contactTracing: ?Link,
  date: string,
  dayOfTravelContactInfo: string,
  destinationAirport: string,
  destinationDescription: string,
  greyBoxMessage: ?GreyBoxMessage,
  greyBoxPassengerMessage: ?GreyBoxMessage,
  hasUnaccompaniedMinor: boolean,
  hideDialogFn: (*) => Promise<*>,
  isCheckInEligible: boolean,
  isInternational: boolean,
  modifyBaggageDetails: ModifyBaggageDetailsType,
  onAddCompanionButtonClick: () => void,
  onCancelFlightClick: () => void,
  onChangeFlightClick: () => void,
  onCheckBagsButtonClick: (string) => void,
  onCheckInButtonClick: (*) => void,
  onContactInfoClick: () => void,
  onContactTracingButtonClick: () => void,
  onEarlyBirdButtonClick: () => void,
  onPassengerNameClick: (string) => void,
  onSameDayButtonClick: (sameDayUpdates: ?SameDayReservation) => void,
  onViewBoardingPassButtonClickCb: (*, *) => void,
  onViewBoardingPositionsButtonClick: (*) => void,
  optionsAndNextSteps?: OptionsAndNextSteps,
  originAirport: string,
  passengers: Array<Passenger>,
  sameDayBlockedMessage: ?SameDayBlockedMessageType,
  sameDayUpdates: ?SameDayReservation,
  shouldShowAddCompanionButton: boolean,
  shouldShowAddEarlyBirdButton: boolean,
  shouldShowContactTracingButton: boolean,
  shouldSuppressUnmodifiablePnr: boolean,
  showDialogFn: (*) => Promise<*>,
  trackCheckedBags: CheckedBagsType,
  UI_ENCRYPTION: boolean,
  viewBoardingPass: ?ViewBoardingPass,
  viewBoardingPassIssuance: ?ViewBoardingPass,
  viewBoardingPositions: ?Link,
  viewModifyCheckedBags: CheckedBagsType,
  viewReservationSearchRequest: FlightRetrieveRequestType
};

export const BoardingInfo = (props: Props) => {
  const {
    checkIn,
    confirmationNumber,
    contactInformation,
    contactTracing = {},
    date,
    dayOfTravelContactInfo,
    destinationAirport,
    destinationDescription,
    greyBoxMessage,
    greyBoxPassengerMessage,
    hideDialogFn,
    isInternational,
    modifyBaggageDetails,
    onAddCompanionButtonClick,
    onCancelFlightClick,
    optionsAndNextSteps,
    onChangeFlightClick,
    onCheckBagsButtonClick,
    onCheckInButtonClick,
    onContactInfoClick,
    onContactTracingButtonClick,
    onEarlyBirdButtonClick,
    onPassengerNameClick,
    onSameDayButtonClick,
    onViewBoardingPassButtonClickCb,
    onViewBoardingPositionsButtonClick,
    originAirport,
    passengers,
    sameDayBlockedMessage,
    sameDayUpdates,
    shouldShowAddEarlyBirdButton,
    shouldShowContactTracingButton,
    shouldSuppressUnmodifiablePnr,
    showDialogFn,
    trackCheckedBags,
    UI_ENCRYPTION,
    viewBoardingPass,
    viewBoardingPassIssuance,
    viewBoardingPositions,
    viewModifyCheckedBags,
    viewReservationSearchRequest
  } = props;

  const {
    body,
    labelText: sameDayBlockedMessageLabelText,
    shouldShowCheckInButton,
    shouldShowModifyBagsButton
  } = sameDayBlockedMessage || {};
  const { firstName = '', lastName = '', recordLocator = '' } = viewReservationSearchRequest || {};

  const _renderAddEarlyBird = (): Node =>
    shouldShowAddEarlyBirdButton && (
      <Button
        className="boarding-info--early-bird-button"
        size="large"
        color="yellow"
        onClick={onEarlyBirdButtonClick}
        fluid
      >
        <Icon type="early-bird" color="yellow" />
        {i18n('SHARED__EARLY_BIRD__CHECK_IN_TITLE')}
      </Button>
    );

  const _sameDayUpdateAndBlockedClickFn = (checkBagsHref) => {
    if (sameDayBlockedMessage) {
      const label =
        shouldShowModifyBagsButton || shouldShowCheckInButton
          ? i18n('SHARED__BUTTON_TEXT__CANCEL')
          : i18n('SHARED__BUTTON_TEXT__OK');
      const buttons = [{ label, onClick: hideDialogFn }];

      if (shouldShowCheckInButton) {
        raiseSatelliteEvent('squid', { page_description: 'modal: sdc/sb not checked in' });
        buttons.push({
          label: i18n('VIEW_RESERVATION__BOARDING_INFO__CHECK_IN_BUTTON_TEXT'),
          onClick: () => {
            hideDialogFn().then(() => {
              onCheckInButtonClick(checkIn);
            });
          }
        });
      } else if (shouldShowModifyBagsButton) {
        buttons.push({
          label: i18n('VIEW_RESERVATION__BOARDING_INFO__REMOVE_BAGS_BUTTON_TEXT'),
          onClick: () => {
            hideDialogFn().then(() => {
              onCheckBagsButtonClick(checkBagsHref);
            });
          }
        });
      }

      showDialogFn({ name: 'sameDayBlockedMessage', message: body, buttons });
    } else {
      onSameDayButtonClick(sameDayUpdates);
    }
  };

  const _renderSameDayChangeButtons = () => {
    const { url } = viewModifyCheckedBags ?? {};
    let checkBagsHref = url;

    if (!sameDayUpdates && !sameDayBlockedMessage) return null;

    if (UI_ENCRYPTION) {
      const dataToEncrypt = {
        first_name: firstName,
        last_name: lastName,
        record_locator: recordLocator
      };
      const { href } = useHref(dataToEncrypt, url, '<BoardingInfo>', 'viewModifyCheckedBags');

      checkBagsHref = href;
    }

    return (
      <div className="boarding-info--change-cancel-container" data-qa="boarding-info-manage-buttons">
        <Button
          className="boarding-info--same-day-change-buttons"
          color="blue"
          fluid
          onClick={() => _sameDayUpdateAndBlockedClickFn(checkBagsHref)}
          size="large"
        >
          {sameDayUpdates?.labelText ?? sameDayBlockedMessageLabelText}
        </Button>
      </div>
    );
  };

  const _renderChangeOrCancelButtons = () => {
    if (shouldSuppressUnmodifiablePnr) {
      return null;
    }

    return (
      <div className="boarding-info--change-cancel-container" data-qa="boarding-info-manage-buttons">
        <Button
          className="manage-button-change boarding-info--change-cancel-buttons"
          color="blue"
          size="large"
          onClick={onChangeFlightClick}
          fluid
        >
          {i18n('VIEW_RESERVATION__BOARDING_INFO__CHANGE_BUTTON_TEXT')}
        </Button>
        <Button
          className="manage-button-cancel boarding-info--change-cancel-buttons"
          color="blue"
          size="large"
          onClick={onCancelFlightClick}
          fluid
        >
          {i18n('VIEW_RESERVATION__BOARDING_INFO__CANCEL_BUTTON_TEXT')}
        </Button>
      </div>
    );
  };

  const _renderCheckBagsNowButton = () => {
    const { query: { first_name = firstName, last_name = lastName, record_locator = recordLocator } = {} } =
      trackCheckedBags || {};

    const checkInRequest = {
      body: {
        firstName: first_name,
        lastName: last_name,
        recordLocator: record_locator
      }
    };

    return (
      <CheckBaggageButton
        buttonClassName="check-baggage-button-boarding"
        buttonSize="large"
        checkedBagsData={trackCheckedBags ? trackCheckedBags : viewModifyCheckedBags}
        checkInRequest={checkInRequest}
        component="<BoardingInfo>"
        feature={trackCheckedBags ? TRACK_CHECKED_BAGS : VIEW_MODIFY_CHECKED_BAGS}
        icon={trackCheckedBags ? 'ic-external-link' : null}
        queryParams={getCheckedBagsQueryParams(trackCheckedBags)}
      />
    );
  };

  const _renderBaggageDetails = () => {
    const { linkIcon, linkPrefixText, linkSuffixClickableText } = modifyBaggageDetails;

    const _handleOnSuffixTextClick = () => {
      showDialogFn(getShowDialogOptions(modifyBaggageDetails, hideDialogFn));
    };

    return (
      <div className="baggage-details">
        <Icon className="baggage-details--icon" type={linkIcon} />
        <div>
          <p>{linkPrefixText} </p>
          <p className="baggage-details--suffix-text" onClick={_handleOnSuffixTextClick}>
            {linkSuffixClickableText}
          </p>
        </div>
      </div>
    );
  };

  const _renderGreyBoxPnrMessage = (): Node => <MobileBoardingPassMessage greyBoxMessage={greyBoxMessage} />;

  const _renderGreyBoxPassengerMessage = (): Node => (
    <MobileBoardingPassMessage greyBoxMessage={greyBoxPassengerMessage} />
  );

  const _renderAddCompanionButton = (): Node => {
    let button = null;

    if (props.shouldShowAddCompanionButton) {
      button = (
        <ButtonWithPlusIconAndText onClick={onAddCompanionButtonClick} data-qa="add-companion">
          {i18n('VIEW_RESERVATION__BOARDING_INFO__ADD_COMPANION')}
        </ButtonWithPlusIconAndText>
      );
    }

    return button;
  };

  const passengerGroupsByCheckInStatus = _.groupBy(passengers, 'isCheckedIn');
  const passengersNotCheckedInGroupedByEligibility = _.groupBy(
    passengerGroupsByCheckInStatus['false'],
    'isCheckInEligible'
  );

  const _renderOptionsAndNextSteps= () => (
    <div>
      <div className="mt3">
        <YellowButton
          className="detailed-trip-card--options-btn"
          href={optionsAndNextSteps?.url}
          title={optionsAndNextSteps?.labelText}
        />
      </div>
    </div>
  );

  const _renderViewBoardingPassSection = () =>
    (!_.isEmpty(viewBoardingPass) || !_.isEmpty(viewBoardingPassIssuance)) && (
      <DayOfTravelPassengerGroup
        passengers={passengers}
        showPassengerHeader
        isInternational={isInternational}
        onPassengerNameClick={onPassengerNameClick}
      >
        <YellowButton
          title={_.get(viewBoardingPassIssuance, 'labelText', i18n('SHARED__BUTTON_TEXT__VIEW_BOARDING_PASS'))}
          className="mt4"
          onClick={() => onViewBoardingPassButtonClickCb(confirmationNumber)}
        />
      </DayOfTravelPassengerGroup>
    );

  const _renderDayOfTravelContactSelect = () => (
    <DayOfTravelContactSelect
      dayOfTravelContactInfo={dayOfTravelContactInfo}
      contactInformation={contactInformation}
      onContactInfoClick={onContactInfoClick}
    />
  );

  const _renderViewBoardingDetailsSection = () =>
    passengerGroupsByCheckInStatus[true] &&
    !_.isEmpty(viewBoardingPositions) && (
      <DayOfTravelPassengerGroup
        passengers={passengerGroupsByCheckInStatus[true]}
        showPassengerHeader
        isInternational={isInternational}
        onPassengerNameClick={onPassengerNameClick}
      >
        <YellowButton
          title={_.get(
            viewBoardingPositions,
            'labelText',
            !isInternational
              ? i18n('SHARED__BUTTON_TEXT__BOARDING_PASSES')
              : i18n('SHARED__BUTTON_TEXT__VIEW_BOARDING_DETAILS')
          )}
          className="mt4"
          onClick={() => onViewBoardingPositionsButtonClick(viewBoardingPositions)}
        />
      </DayOfTravelPassengerGroup>
    );

  const _renderCheckInButtonSection = () =>
    passengersNotCheckedInGroupedByEligibility[true] &&
    !_.isEmpty(checkIn) && (
      <DayOfTravelPassengerGroup
        passengers={passengersNotCheckedInGroupedByEligibility[true]}
        showPassengerHeader={
          _.isEmpty(viewBoardingPositions) && _.isEmpty(viewBoardingPass) && _.isEmpty(viewBoardingPassIssuance)
        }
        isInternational={isInternational}
        onPassengerNameClick={onPassengerNameClick}
      >
        <CheckInButton className="boarding-info--checkin-button" onClick={() => onCheckInButtonClick(checkIn)} />
      </DayOfTravelPassengerGroup>
    );

  const _renderNotEligibleForCheckInSection = () => {
    const ineligiblePax = _.isEmpty(checkIn)
      ? passengerGroupsByCheckInStatus['false']
      : passengersNotCheckedInGroupedByEligibility['false'];

    return (
      ineligiblePax && (
        <DayOfTravelPassengerGroup
          passengers={ineligiblePax}
          showPassengerHeader={
            _.isEmpty(checkIn) &&
            _.isEmpty(viewBoardingPositions) &&
            _.isEmpty(viewBoardingPass) &&
            _.isEmpty(viewBoardingPassIssuance)
          }
          isInternational={isInternational}
          onPassengerNameClick={onPassengerNameClick}
        />
      )
    );
  };

  return (
    <div className="trip-details-boarding-info">
      <div className="boarding-info">
        <div className="boarding-info_time reservation-details--card boarding-info--divider">
          <div className="flex flex-main-between">
            <TripDateAndDestCity date={date} cityName={destinationDescription} className="pblue" />
            <ConfirmationNumber confirmationNumber={confirmationNumber} />
          </div>
          <div className="airport-info--detail">
            {originAirport} to
            <br />
            {destinationAirport}
          </div>
          {_renderAddEarlyBird()}
          {_renderSameDayChangeButtons()}
          {optionsAndNextSteps && _renderOptionsAndNextSteps()}
          {_renderChangeOrCancelButtons()}
          {(viewModifyCheckedBags || trackCheckedBags) && _renderCheckBagsNowButton()}
          {modifyBaggageDetails && _renderBaggageDetails()}
          {greyBoxMessage && _renderGreyBoxPnrMessage()}
          {_renderAddCompanionButton()}
          {contactInformation && _renderDayOfTravelContactSelect()}
        </div>
        {_renderViewBoardingPassSection()}
        {_renderViewBoardingDetailsSection()}
        {_renderCheckInButtonSection()}
        {_renderNotEligibleForCheckInSection()}
        {greyBoxPassengerMessage && _renderGreyBoxPassengerMessage()}
        {shouldShowContactTracingButton && (
          <Button
            color="blue"
            size="larger"
            className="boarding-info--contact-tracing-button mt2"
            onClick={onContactTracingButtonClick}
            fluid
          >
            {_.get(contactTracing, 'labelText')}
          </Button>
        )}
      </div>
    </div>
  );
};

BoardingInfo.defaultProps = {
  onPassengerNameClick: _.noop,
  onEarlyBirdButtonClick: _.noop,
  cancelFlight: _.noop,
  onCheckInButtonClick: _.noop
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  showDialogFn: showDialog,
  hideDialogFn: hideDialog
};

export default _.flowRight(connect(mapStateToProps, mapDispatchToProps))(BoardingInfo);
