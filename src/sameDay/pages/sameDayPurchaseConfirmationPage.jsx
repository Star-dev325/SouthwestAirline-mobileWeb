// @flow
import i18n from '@swa-ui/locale';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as checkInActions from 'src/checkIn/actions/checkInActions';
import { retrieveSameDayPurchaseConfirmationPlacement } from 'src/sameDay/actions/sameDayActions';
import StandByListFooter from 'src/sameDay/components/standByListFooter.jsx';
import Container from 'src/shared/components/container';
import InfoBanner from 'src/shared/components/infoBanner';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import PageHeader from 'src/shared/components/pageHeader';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import { POINTS } from 'src/shared/constants/currencyTypes';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';
import * as standbyActions from 'src/standby/actions/standbyActions';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';

import type { CheckInPassengerRequestType } from 'src/checkIn/flow-typed/checkIn.types';
import type { PassengerRequestDetailsType, SameDayConfirmationResponse } from 'src/sameDay/flow-typed/sameDay.types';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  checkEnhancedStandbyNearAirportFn: (*, boolean, boolean, *) => void,
  checkInFn: (CheckInPassengerRequestType) => Promise<*>,
  checkStandbyNearAirportFn: (*, boolean, boolean, *) => void,
  headerMessage?: { key: string, header: string, body: string, icon?: string },
  isEnhancedStandbyList: boolean,
  isNonRevPnr: boolean,
  isUserLoggedIn: boolean,
  passengerRequestDetails: PassengerRequestDetailsType,
  resetFlowDataFn: () => void,
  retrieveSameDayPurchaseConfirmationPlacementFn: (method: string) => void,
  sameDayConfirmationInformation: SameDayConfirmationResponse,
  sameDayConfirmationPagePlacement: DynamicPlacementResponse,
  transitToBoardingPositionFn: () => void
};

export const SameDayPurchaseConfirmationPage = ({
  checkEnhancedStandbyNearAirportFn,
  checkInFn,
  checkStandbyNearAirportFn,
  isEnhancedStandbyList,
  isNonRevPnr,
  isUserLoggedIn,
  passengerRequestDetails,
  resetFlowDataFn,
  retrieveSameDayPurchaseConfirmationPlacementFn,
  sameDayConfirmationInformation,
  sameDayConfirmationPagePlacement,
  transitToBoardingPositionFn
}: Props) => {
  const { _links, bounds, fareSummary, headerMessage, sameDayLabelDescription } = sameDayConfirmationInformation;
  const { firstName, lastName, recordLocator } = passengerRequestDetails;
  const { details: contactEmailOrPhone, method } = sameDayConfirmationInformation?.contactInfo || {};
  const { creditInfoMessage, refundMessage, taxesAndFeesWithLinks, total, totalCredit, totalCreditPointsTax, totalPointsTax } = fareSummary || {};
  const { recordLocator: standbyRecordLocator, standbyToken } = _links?.enhancedStandbyList?.body ?? {};
  const {
    firstName: boardingFirstName,
    lastName: boardingLastName,
    passengerSearchToken: boardingPassengerSearchToken,
    recordLocator: boardingRecordLocator
  } = _links?.viewBoardingPositions?.body ?? {};
  const isShowPoints = total?.currencyCode === POINTS  || totalCredit?.currencyCode === POINTS;
  const pointsCreditDue = totalPointsTax && totalCredit;
  const pointsTotal = totalPointsTax ? (total || totalCredit) : null;
  const standbyLabelText = _links?.enhancedStandbyList?.labelText;
  const taxCreditRefund = totalPointsTax ? null : totalCreditPointsTax;
  const taxTitle = totalPointsTax?.item ?? totalCreditPointsTax?.item ?? i18n('SAME_DAY_PURCHASE_CONFIRMATION_TOTAL_CREDIT');
  const title = total?.item ?? totalCredit?.item ?? i18n('SAME_DAY_PURCHASE_CONFIRMATION_TOTAL_CREDIT');
  const totalAmountDue =  totalPointsTax 
    ? totalPointsTax 
    : total 
      ? total 
      : totalCredit;
  const viewBoardingPositionsLabelText = _links?.viewBoardingPositions?.labelText;

  useEffect(() => {
    method && retrieveSameDayPurchaseConfirmationPlacementFn(method);
  }, []);

  const _onSeeStandbyListButtonClick = () => {
    isEnhancedStandbyList
      ? checkEnhancedStandbyNearAirportFn(_links.enhancedStandbyList, true, !isNonRevPnr, {
        firstName: firstName,
        lastName: lastName,
        recordLocator: recordLocator
      })
      : checkStandbyNearAirportFn(
        {
          'arrival-time': bounds[0].arrivalTime,
          'destination-airport': bounds[0].arrivalAirport.code,
          'departure-date': bounds[0].departureDate,
          'departure-time': bounds[0].departureTime,
          'record-locator': recordLocator,
          'first-name': firstName,
          'flight-number': bounds[0].flights[0].number,
          'last-name': lastName,
          'origin-airport': bounds[0].departureAirport.code
        },
        true,
        !isNonRevPnr
      );
  };

  const _onViewBoardingPositionsButtonClick = () => {
    resetFlowDataFn();
    checkInFn({ ..._links.viewBoardingPositions, isLoggedIn: isUserLoggedIn }).then(transitToBoardingPositionFn);
  };

  const headerMessageBody = headerMessage
    ? headerMessage.body
    : isEmpty(bounds)
      ? i18n('SHARED__TRIP_BOOKED__EMAIL_CONFIRMATION_SUB_DETAILS')
      : i18n('SHARED__TRIP_BOOKED__CHECKIN_VERBIAGE_SUB_INSTRUCTION');
  const headerMessageTitle = headerMessage ? headerMessage.header : i18n('SHARED__TRIP_BOOKED__TITLE');
  const isWarningMessage = headerMessage && headerMessage.icon === i18n('SAME_DAY_HEADER_WARNING');

  return (
    <Router>
      <div className="same-day-purchase-confirmation">
        <PageHeader>
          <div className="flight-shopping-page--title">
            <span className="flight-shopping-page--bound-info">{i18n('SAME_DAY_PURCHASE_CONFIRMATION_TITLE')}</span>
          </div>
        </PageHeader>
        {sameDayConfirmationPagePlacement && standbyLabelText && (
          <Container>
            <DynamicPlacement
              {...sameDayConfirmationPagePlacement}
              additionalTemplateData={!!method && { contentMethodValue: contactEmailOrPhone }}
              data-qa="contentModule1"
            />
          </Container>
        )}
        {!standbyLabelText && (
          <Container>
            <div className="purchase-confirmation--message">
              {isWarningMessage ? (
                <InfoBanner header={headerMessageTitle} body={headerMessageBody} />
              ) : (
                <MessageWithInstructions
                  className="purchase-confirmation--trip-booked"
                  title={headerMessageTitle}
                  subInstruction={headerMessageBody}
                />
              )}
            </div>
          </Container>
        )}
        <Container>
          {sameDayLabelDescription && (<div className="same-day-purchase-confirmation--sub-title">{sameDayLabelDescription}</div>)}
          {bounds && <ReservationFlightSummary bounds={bounds} isStandBy />}
        </Container>
        {(totalCredit || pointsTotal || totalAmountDue || taxCreditRefund) && (
          <StandByListFooter
            creditInfoMessage={creditInfoMessage}
            firstName={boardingFirstName}
            isRefund={totalCredit || pointsCreditDue}
            isShowPoints={isShowPoints}
            lastName={boardingLastName}
            onBoardingDetailsButtonClick={() => _onViewBoardingPositionsButtonClick()}
            onSeeStandbyListButtonClick={() => _onSeeStandbyListButtonClick()}
            passengerSearchToken={boardingPassengerSearchToken}
            pointsTotal={pointsCreditDue ?? pointsTotal}
            recordLocator={standbyRecordLocator ?? boardingRecordLocator}
            refundMessage={refundMessage}
            standbyLabel={standbyLabelText}
            standbyToken={standbyToken}
            taxCreditRefund={taxCreditRefund}
            taxesAndFeesWithLinks={taxesAndFeesWithLinks}
            taxTitle={taxTitle}
            title={title}
            total={totalAmountDue}
            totalCredit={totalCredit}
            totalPointsTax={totalPointsTax}
            viewBoardingPositionsLabel={viewBoardingPositionsLabelText}
          />
        )}
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isEnhancedStandbyList: get(state, 'app.toggles.ENHANCED_STANDBY_LIST'),
  isNonRevPnr: get(state, 'app.viewReservation.flightReservation.isNonRevPnr'),
  isUserLoggedIn: get(state, 'app.account.isLoggedIn'),
  passengerRequestDetails: get(state, 'app.viewReservation.searchRequest', {}),
  sameDayConfirmationInformation: get(state, 'app.sameDay.sameDayConfirmationPage.response', {}),
  sameDayConfirmationPagePlacement: get(state, 'app.sameDay.sameDayConfirmationPage.placement.sameDayConfirmationContentModule1', {})
});

const mapDispatchToProps = {
  checkEnhancedStandbyNearAirportFn: standbyActions.checkEnhancedStandbyNearAirport,
  checkInFn: checkInActions.checkIn,
  checkStandbyNearAirportFn: standbyActions.checkStandbyNearAirport,
  resetFlowDataFn: checkInActions.resetFlowData,
  retrieveSameDayPurchaseConfirmationPlacementFn: retrieveSameDayPurchaseConfirmationPlacement,
  transitToBoardingPositionFn: checkInActions.transitToBoardingPosition
};

const enhancers = flowRight(
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('same-day-purchase-confirmation-page')
);

export default enhancers(SameDayPurchaseConfirmationPage);
