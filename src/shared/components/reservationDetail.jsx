// @flow
import _ from 'lodash';
import React from 'react';
import type { OptionsAndNextSteps } from 'src/myAccount/flow-typed/myAccount.types';
import AircraftTypeFooter from 'src/shared/components/aircraftTypeFooter';
import Container from 'src/shared/components/container';
import ContentLink from 'src/shared/components/contentLink';
import PassengerPrice from 'src/shared/components/flightSummary/passengerPrice';
import FlightSummaryCard from 'src/shared/components/flightSummaryCard/flightSummaryCard';
import SubHeader from 'src/shared/components/subHeader';
import SuccessBanner from 'src/shared/components/successBanner';
import UpsellDetails from 'src/shared/components/upsellDetails';
import withReservationDetailTransition from 'src/shared/enhancers/withReservationDetailTransition';
import type {
  CheckedBagsType,
  GreyBoxMessage,
  MessageType,
  ModifyBaggageDetailsType,
  SameDayBlockedMessageType,
  SameDayReservation,
  UpsellDetailsType,
  ViewBoardingPass
} from 'src/shared/flow-typed/shared.types';
import type { StandbyFlightProps } from 'src/standby/components/standbyCard';
import BoardingInfo from 'src/viewReservation/components/boardingInfo';
import BoardingInfoBanner from 'src/viewReservation/components/boardingInfoBanner';
import type { CompanionProps } from 'src/viewReservation/components/companionReservationInfo';
import CompanionReservationInfo from 'src/viewReservation/components/companionReservationInfo';
import type { Passenger } from 'src/viewReservation/components/passengerReservationInfo';
import { MESSAGE_KEY_EDIT_NAME_CONFIRMATION_VIEW_RESERVATION } from 'src/viewReservation/constants/viewReservationConstants';
import type { FlightRetrieveRequestType } from 'src/viewReservation/flow-typed/viewReservation.types';

type Props = {
  _links: {
    addCompanion: ?*,
    cancelBound: ?Link,
    change: ?Link,
    checkIn: ?Link,
    contactInformation: ?Link,
    contactTracing: ?Link,
    earlyBird: ?Link,
    optionsAndNextSteps?: OptionsAndNextSteps,
    reaccom?: ?Link,
    sameDayUpdates: ?SameDayReservation,
    trackCheckedBags?: CheckedBagsType,
    viewBoardingPass: ?ViewBoardingPass,
    viewBoardingPassIssuance: ?ViewBoardingPass,
    viewBoardingPositions: ?Link,
    viewModifyCheckedBags?: CheckedBagsType
  },
  bounds: Array<*>,
  checkInIneligibilityReason: ?string,
  companion: ?CompanionProps,
  confirmationNumber: string,
  date: string,
  dayOfTravelContactInfo: string,
  destinationAirport: string,
  destinationDescription: string,
  fareRulesWithLinks: string,
  greyBoxMessage: ?GreyBoxMessage,
  greyBoxPassengerMessage: ?GreyBoxMessage,
  hasAnyCancelledFlights: ?boolean,
  hasUnaccompaniedMinor: boolean,
  isCheckInEligible: boolean,
  isDynamicWaiver: boolean,
  isInternational: boolean,
  isNonRevPnr?: boolean,
  isUserLoggedIn: boolean,
  messages: Array<MessageType>,
  modifyBaggageDetails: ModifyBaggageDetailsType,
  onAddCompanionButtonClick: () => void,
  onCancelFlightClick: () => void,
  onChangeFlightClick: () => void,
  onCheckInButtonClick: () => void,
  onCheckBagsButtonClick: () => void,
  onClickStandbyList: ({ isNonRevPnr: boolean, link: Link }) => void,
  onContactInfoClick?: () => void,
  onContactTracingButtonClick: () => void,
  onDetailsButtonClick: ({ recordLocator: string, firstName: string, lastName: string }) => void,
  onEarlyBirdButtonClick: () => void,
  onPassengerNameClick: (string) => void,
  onSameDayButtonClick: (sameDayUpdates: SameDayReservation) => void,
  onUpgradeMyFlight?: () => void,
  onViewBoardingPassButtonClickCb: (*, *) => void,
  onViewBoardingPositionsButtonClick: () => void,
  originAirport: string,
  pageHeader: string,
  passengers: Array<Passenger>,
  sameDayBlockedMessage: ?SameDayBlockedMessageType,
  standbyFlight: ?StandbyFlightProps,
  toggles: {
    AIRCRAFT_TYPE_VIEWRES: boolean,
    ENHANCED_STANDBY_LIST: boolean
  },
  UI_ENCRYPTION: boolean,
  upsellDetails?: UpsellDetailsType,
  viewReservationSearchRequest: FlightRetrieveRequestType
};

export const ReservationDetail = ({
  _links: {
    addCompanion,
    cancelBound,
    change,
    checkIn,
    contactInformation,
    contactTracing,
    earlyBird,
    optionsAndNextSteps,
    reaccom,
    sameDayUpdates,
    trackCheckedBags,
    viewBoardingPass,
    viewBoardingPassIssuance,
    viewBoardingPositions,
    viewModifyCheckedBags
  },
  bounds,
  checkInIneligibilityReason,
  companion,
  confirmationNumber,
  date,
  dayOfTravelContactInfo,
  destinationAirport,
  destinationDescription,
  fareRulesWithLinks,
  greyBoxMessage,
  greyBoxPassengerMessage,
  hasAnyCancelledFlights,
  hasUnaccompaniedMinor,
  isCheckInEligible,
  isDynamicWaiver,
  isInternational,
  isNonRevPnr,
  isUserLoggedIn,
  messages,
  modifyBaggageDetails,
  onAddCompanionButtonClick,
  onCheckBagsButtonClick,
  onCancelFlightClick,
  onChangeFlightClick,
  onCheckInButtonClick,
  onClickStandbyList,
  onContactInfoClick,
  onContactTracingButtonClick,
  onDetailsButtonClick,
  onEarlyBirdButtonClick,
  onPassengerNameClick,
  onSameDayButtonClick,
  onUpgradeMyFlight,
  onViewBoardingPassButtonClickCb,
  onViewBoardingPositionsButtonClick,
  originAirport,
  pageHeader,
  passengers,
  sameDayBlockedMessage,
  toggles: { AIRCRAFT_TYPE_VIEWRES, ENHANCED_STANDBY_LIST },
  UI_ENCRYPTION,
  upsellDetails,
  viewReservationSearchRequest
}: Props) => {
  const boardingInfoProps = {
    checkIn,
    checkInIneligibilityReason,
    confirmationNumber,
    contactInformation,
    contactTracing,
    date,
    dayOfTravelContactInfo,
    destinationAirport,
    destinationDescription,
    greyBoxMessage,
    greyBoxPassengerMessage,
    hasUnaccompaniedMinor,
    isCheckInEligible,
    isInternational,
    isNonRevPnr,
    modifyBaggageDetails,
    onAddCompanionButtonClick,
    onCancelFlightClick,
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
    optionsAndNextSteps,
    originAirport,
    passengers,
    sameDayBlockedMessage,
    sameDayUpdates,
    shouldShowAddCompanionButton: !_.isEmpty(addCompanion),
    shouldShowAddEarlyBirdButton: !_.isEmpty(earlyBird),
    shouldShowContactTracingButton: !_.isEmpty(contactTracing),
    shouldSuppressUnmodifiablePnr: _.isEmpty(change) && _.isEmpty(cancelBound) && _.isEmpty(reaccom),
    trackCheckedBags,
    UI_ENCRYPTION,
    viewBoardingPass,
    viewBoardingPassIssuance,
    viewBoardingPositions,
    viewModifyCheckedBags,
    viewReservationSearchRequest
  };
  const boardingInfoBannerProps = {
    isDynamicWaiver,
    messages,
    hasAnyCancelledFlights: !!hasAnyCancelledFlights,
    isChangeLinkEmpty: _.isEmpty(change),
    isCancelLinkEmpty: _.isEmpty(cancelBound),
    onClick: onChangeFlightClick,
    important: true
  };
  const nameEditSuccessMessage =
    messages && messages.find((message) => message.key === MESSAGE_KEY_EDIT_NAME_CONFIRMATION_VIEW_RESERVATION);

  return (
    <div className="trip-details-page" data-qa="trip details page">
      <SubHeader title={pageHeader} />
      <Container>
        <BoardingInfoBanner {...boardingInfoBannerProps} />
        {nameEditSuccessMessage && <SuccessBanner message={nameEditSuccessMessage.body} />}
        <BoardingInfo {...boardingInfoProps} />

        {companion && (
          <CompanionReservationInfo
            companion={companion}
            isUserLoggedIn={isUserLoggedIn}
            onDetailsButtonClick={onDetailsButtonClick}
          />
        )}
        {upsellDetails && (
          <div className="trip-details-page--upgrade-benefits">
            <UpsellDetails {...upsellDetails} onUpgradeMyFlight={onUpgradeMyFlight} />
            <ContentLink
              className="trip-details-page--fare-rules"
              raw={fareRulesWithLinks}
              shouldOpenLinkInSelf={true}
            />
          </div>
        )}
        <div className="trip-details--flight-status">
          {_.map(bounds, (bound, index: number) => {
            const { fareProductDetails: { fareRulesUrl } = {}, passengers: boundPassengers, ...boundDetail } = bound;
            const [
              { count: adultCount, type: adultType, fareType: adultFareType } = {},
              { count: lapChildCount, type: lapChildType } = {}
            ] = boundPassengers || [];
            const passengerCountFullString = lapChildCount && lapChildType && `${lapChildCount} ${lapChildType}`;

            return (
              <FlightSummaryCard
                key={index}
                boundDetail={boundDetail}
                isNonRevPnr={isNonRevPnr}
                onClickStandbyList={onClickStandbyList}
                AIRCRAFT_TYPE_VIEWRES={AIRCRAFT_TYPE_VIEWRES}
                useEnhancedStandbyList={ENHANCED_STANDBY_LIST}
              >
                <PassengerPrice
                  passengerType={adultType}
                  passengerCount={adultCount}
                  fareLabel={adultFareType}
                  fareRulesUrl={fareRulesUrl}
                />
                {passengerCountFullString && <PassengerPrice passengerCountFullString={passengerCountFullString} />}
              </FlightSummaryCard>
            );
          })}
        </div>
      </Container>
      {AIRCRAFT_TYPE_VIEWRES && <AircraftTypeFooter />}
    </div>
  );
};

export default withReservationDetailTransition(ReservationDetail);
