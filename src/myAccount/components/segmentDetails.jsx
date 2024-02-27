// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import CheckBaggageButton from 'src/checkIn/components/checkBaggageButton';
import MobileBoardingPassMessage from 'src/checkIn/components/mobileBoardingPassMessage';
import { flightStatusCssClassMapping } from 'src/flightStatus/constants/flightStatusCssClassMapping';
import BoardingInformation from 'src/shared/components/boardingInformation';
import Button from 'src/shared/components/button';
import CheckInButton from 'src/shared/components/checkInButton';
import FlightSegmentDetails from 'src/shared/components/flightSegmentDetails';
import YellowButton from 'src/shared/components/yellowButton';
import { TRACK_CHECKED_BAGS } from 'src/shared/constants/checkedBagsFeatureNames';
import FlightInfo from 'src/shared/constants/flightInfo';
import withFeatureToggles from 'src/shared/enhancers/withFeatureToggles';
import { getCheckedBagsQueryParams } from 'src/shared/helpers/checkedBagsQueryParams';
import { get, isEmpty, noop } from 'src/shared/helpers/jsUtils';
import StandbyCard from 'src/standby/components/standbyCard';

import type { OptionsAndNextSteps, Segment } from 'src/myAccount/flow-typed/myAccount.types';
import type { CheckedBagsType } from 'src/shared/flow-typed/shared.types';

const { GATE } = FlightInfo;

type Props = {
  confirmationNumber: string,
  isOvernight: boolean,
  links: {
    changeFlightPage: ?Link,
    checkInViewReservationPage: ?Link,
    optionsAndNextSteps: OptionsAndNextSteps,
    trackCheckedBags: ?CheckedBagsType,
    viewBoardingPass: ?Link,
    viewBoardingPassIssuance: ?Link,
    viewBoardingPositions: ?Link,
    viewReservationViewPage: Link,
    viewUpgradedBoarding: ?Link
  },
  onCheckInButtonClick: (string) => void,
  onClickDetailsButton: () => void,
  onClickStandbyList: ({ isNonRevPnr: boolean, link: Link }) => void,
  onSelectNewFlightForCancelledFlight: (string) => void,
  onUpgradedBoardingButtonClick?: (link: Link) => void,
  onViewBoardingPassButtonClickCb: (string) => void,
  onViewBoardingPositionsButtonClick: (Link) => void,
  segment: Segment,
  toggles: {
    AIRCRAFT_TYPE_TRIPCARD: boolean,
    ENHANCED_STANDBY_LIST: boolean
  },
  UPGRADED_BOARDING: boolean
};

export class SegmentDetails extends React.Component<Props> {
  _checkInButtonClick = () => {
    this.props.onCheckInButtonClick(this.props.confirmationNumber);
  };

  _viewBoardingPositionsButtonClick = () => {
    this.props.links.viewBoardingPositions &&
      this.props.onViewBoardingPositionsButtonClick(this.props.links.viewBoardingPositions);
  };

  _viewBoardingPassButtonClick = () => {
    this.props.onViewBoardingPassButtonClickCb(this.props.confirmationNumber);
  };

  _isFlightInternational(segment: *) {
    return segment?.isInternational ?? false;
  }

  _onSelectNewFlightForCancelledFlight = () => {
    this.props.onSelectNewFlightForCancelledFlight(this.props.confirmationNumber);
  };

  _getAircraftType = (segment: Segment) => {
    if (segment.aircraftInfo && segment.aircraftInfo.aircraftType) {
      return segment.aircraftInfo.aircraftType;
    }

    return undefined;
  };

  _getCheckInRequestObject = () => {
    const { trackCheckedBags } = this.props.links;

    if (trackCheckedBags && trackCheckedBags.query) {
      return {
        body: {
          firstName: trackCheckedBags.query.first_name,
          lastName: trackCheckedBags.query.last_name,
          recordLocator: trackCheckedBags.query.record_locator
        }
      };
    }
  };

  renderFlightSegmentDetails() {
    const {
      isOvernight,
      segment,
      toggles: { AIRCRAFT_TYPE_TRIPCARD }
    } = this.props;
    const flightStatus = segment?.flightStatus ?? {};

    return (
      <FlightSegmentDetails
        AIRCRAFT_TYPE_TRIPCARD={AIRCRAFT_TYPE_TRIPCARD}
        aircraftType={this._getAircraftType(segment)}
        arrivalAirport={segment.arrivalAirportDisplayName}
        arrivalTime={flightStatus.actualArrivalTime || segment.arrivalTime}
        departureAirport={segment.departureAirportDisplayName}
        departureTime={flightStatus.actualDepartureTime || segment.departureTime}
        flightNumber={segment.flightNumber}
        isOvernight={isOvernight}
        originalArrivalTime={segment.arrivalTime}
        originalDepartureTime={segment.departureTime}
        outdated={flightStatus.isCancelled}
      />
    );
  }

  render = () => {
    const {
      links,
      onClickDetailsButton,
      onClickStandbyList,
      onUpgradedBoardingButtonClick = noop,
      segment,
      UPGRADED_BOARDING
    } = this.props;
    const {
      checkInViewReservationPage,
      optionsAndNextSteps,
      trackCheckedBags,
      viewBoardingPassIssuance,
      viewBoardingPositions,
      viewReservationViewPage
    } = links;
    const {
      boardingGroup,
      boardingPosition,
      flightStatus,
      greyBoxMessage,
      informationalMessaging,
      informationalMessagingType,
      isCheckedIn,
      isCheckInEligible,
      isNonRevPnr,
      showOptionsAndNextSteps,
      standbyFlight
    } = segment;
    const shouldShowBoardingPassInformation = 
      isCheckedIn && (!isEmpty(viewBoardingPassIssuance) || !isEmpty(viewBoardingPositions));
    const shouldShowOptionsAndNextSteps =
      !!flightStatus?.isCancelled && showOptionsAndNextSteps && !(isEmpty(optionsAndNextSteps));

    const permutationsOfCheckInInfo = [
      {
        // FLIGHT CANCELLED
        when: shouldShowOptionsAndNextSteps,
        render: () => (
          <div>
            {greyBoxMessage && <MobileBoardingPassMessage greyBoxMessage={greyBoxMessage} />}
          </div>
        )
      },
      {
        // CHECK-IN ELIGIBLE
        when: isCheckInEligible && !isEmpty(checkInViewReservationPage),
        render: () => (
          <div className="mt3">
            <CheckInButton onClick={this._checkInButtonClick} />
            {greyBoxMessage && <MobileBoardingPassMessage greyBoxMessage={greyBoxMessage} />}
          </div>
        )
      },
      {
        when: shouldShowBoardingPassInformation,
        render: () => (
          <div>
            <div className="mt3">
              {viewBoardingPassIssuance && (
                <YellowButton
                  title={viewBoardingPassIssuance?.labelText ?? i18n('SHARED__BUTTON_TEXT__BOARDING_PASS')}
                  onClick={this._viewBoardingPassButtonClick}
                />
              )}
              {viewBoardingPositions && (
                <YellowButton
                  title={
                    viewBoardingPositions?.labelText ??
                    (this._isFlightInternational(segment)
                      ? i18n('SHARED__BUTTON_TEXT__BOARDING_DETAILS')
                      : i18n('SHARED__BUTTON_TEXT__BOARDING_PASSES'))
                  }
                  onClick={this._viewBoardingPositionsButtonClick}
                />
              )}
            </div>
            {greyBoxMessage && <MobileBoardingPassMessage greyBoxMessage={greyBoxMessage} />}
          </div>
        )
      },
      {
        // CHAPI GREY BOX MESSAGE
        when: !isEmpty(greyBoxMessage),
        render: () => <MobileBoardingPassMessage greyBoxMessage={greyBoxMessage} />
      }
    ];

    const checkInfoForDisplay = _.find(permutationsOfCheckInInfo, { when: true });
    const checkInState = checkInfoForDisplay ? checkInfoForDisplay.render() : null;
    const cardInformationTypeInStyle = flightStatusCssClassMapping[informationalMessagingType];
    const detailsLabelText = viewReservationViewPage?.labelText;
    const viewUpgradedBoardingLink = get(links, 'viewUpgradedBoarding');
    const shouldShowUpgradedBoardingButton = !isEmpty(viewUpgradedBoardingLink) && get(segment, 'showUpgradedBoarding', true);
    const upgradedBoardingLabelText = shouldShowUpgradedBoardingButton && viewUpgradedBoardingLink?.labelText;

    return (
      <div>
        {informationalMessaging && (
          <div
            className={`detailed-trip-card--information detailed-trip-card--information_${cardInformationTypeInStyle}`}
          >
            {informationalMessaging}
          </div>
        )}
        {this.renderFlightSegmentDetails()}
        {shouldShowBoardingPassInformation && boardingGroup && boardingPosition && (
          <BoardingInformation
            boardingGate={flightStatus?.gate || GATE.DEFAULT}
            boardingGroup={boardingGroup}
            boardingPosition={boardingPosition}
          />
        )}
        {UPGRADED_BOARDING && shouldShowUpgradedBoardingButton && (
          <Button
            className="detailed-trip-card--upgraded-boarding-btn"
            color="blue"
            fluid
            onClick={() => onUpgradedBoardingButtonClick(viewUpgradedBoardingLink)}
          >
            {upgradedBoardingLabelText}
          </Button>
        )}
        {shouldShowOptionsAndNextSteps && (
          <div>
            <div className="mt3">
              <YellowButton
                className="detailed-trip-card--options-btn"
                href={optionsAndNextSteps?.url}
                title={optionsAndNextSteps?.labelText}
              />
            </div>
          </div>
        )}
        {viewReservationViewPage && (
          <div className="mt3">
            <Button
              onClick={onClickDetailsButton}
              className="detailed-trip-card--detail-button"
            >
              {detailsLabelText}
            </Button>
          </div>
        )}
        {trackCheckedBags && (
          <div className="mt3">
            <CheckBaggageButton
              checkedBagsData={trackCheckedBags}
              checkInRequest={this._getCheckInRequestObject()}
              component="<SegmentDetails>"
              feature={TRACK_CHECKED_BAGS}
              queryParams={getCheckedBagsQueryParams(trackCheckedBags)}
            />
          </div>
        )}
        {checkInState}
        {standbyFlight && (
          <StandbyCard
            useEnhancedStandbyList={this.props?.toggles?.ENHANCED_STANDBY_LIST}
            standbyFlight={standbyFlight}
            isNonRevPnr={isNonRevPnr}
            onClickStandbyList={onClickStandbyList}
          />
        )}
      </div>
    );
  };
}

export default withFeatureToggles(SegmentDetails);
