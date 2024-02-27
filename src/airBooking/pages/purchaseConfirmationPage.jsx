// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import ChaseAutoProvisioning from 'src/airBooking/components/chase/chaseAutoProvisioning';
import PartialBooking from 'src/airBooking/components/partialBooking';
import { getFlightConfirmationPageSelector } from 'src/airBooking/selectors/flightConfirmationPageSelector';
import * as AccountActions from 'src/shared/actions/accountActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import ConfirmationTripHeader from 'src/shared/components/confirmationTripHeader';
import ConfirmationYoungTravelerSection from 'src/shared/components/confirmationYoungTravelerSection';
import FundResultsList from 'src/shared/components/fundResultsList';
import InfoBanner from 'src/shared/components/infoBanner';
import MessageWithInstructions from 'src/shared/components/messageWithInstructions';
import NavGroupItemLinks from 'src/shared/components/navGroupItemLinks';
import PageHeader from 'src/shared/components/pageHeader';
import PriceTotal from 'src/shared/components/priceTotal';
import ReservationFlightSummary from 'src/shared/components/reservationFlightSummary';
import { AIRBOOKING_PASSENGER_INFO_EDIT, AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import withHideLoginButton from 'src/shared/enhancers/withHideLoginButton';
import type {
  BillingInformation,
  ConfirmationDates,
  ConfirmationPassengers,
  FlightPricingBound,
  MessageType,
  PassengerInfos,
  Push,
  TotalsType
} from 'src/shared/flow-typed/shared.types';
import { daysAfter } from 'src/shared/helpers/dateHelper';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import type { RetrievedFundType } from 'src/travelFunds/flow-typed/travelFunds.types';
import DynamicPlacement from 'src/wcm/components/dynamicPlacement';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';

type Props = {
  _links: { carBooking?: Link, earlyBird?: Link },
  autoProvisioningMessage?: MessageType,
  billingInfo?: BillingInformation,
  bounds: Array<FlightPricingBound>,
  confirmationPagePlacements: {
    bottomPromo1?: DynamicPlacementResponse,
    promoTop01?: DynamicPlacementResponse,
    promoBottom01?: DynamicPlacementResponse,
    promoBottom02?: DynamicPlacementResponse,
    promoBottom03?: DynamicPlacementResponse,
    promoBottom04?: DynamicPlacementResponse
  },
  cleanUpFrequentTravelerSelectedFn: () => void,
  clearFormDataByIdFn: (formId: string, exactMatch?: boolean) => void,
  dates: ConfirmationDates,
  destinationDescription: string,
  displayAppReviewFn: () => void,
  enableNavigationControlsFn: (boolean) => void,
  exitWebViewFn: () => void,
  failedPassengers: ?Array<string>,
  fundsApplied?: Array<RetrievedFundType>,
  getConfirmationPagePlacementsFn: () => void,
  headerMessage?: { key: string, header: string, body: string, icon?: string },
  hideDialogFn: (*) => Promise<*>,
  isWebView: boolean,
  messages?: Array<MessageType>,
  passengerInfos: PassengerInfos,
  pnrs: Array<ConfirmationPassengers>,
  push: Push,
  removeSelectedCompanyFn: () => void,
  selectedCompanyName: ?string,
  selectedIrn: ?string,
  showDialogFn: (*) => Promise<*>,
  totals: TotalsType
};

type State = {
  selectedCompanyName?: ?string
};
export class PurchaseConfirmationPage extends React.Component<Props, State> {
  static defaultProps = {
    push: _.noop
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCompanyName: props.selectedCompanyName
    };
  }

  componentDidMount() {
    const {
      isWebView,
      enableNavigationControlsFn,
      displayAppReviewFn,
      getConfirmationPagePlacementsFn,
      removeSelectedCompanyFn,
      clearFormDataByIdFn,
      cleanUpFrequentTravelerSelectedFn,
      selectedCompanyName
    } = this.props;

    getConfirmationPagePlacementsFn();
    clearFormDataByIdFn(AIRBOOKING_PASSENGER_PERSONAL_INFO_FORM, false);
    clearFormDataByIdFn(AIRBOOKING_PASSENGER_INFO_EDIT);
    cleanUpFrequentTravelerSelectedFn();

    if (isWebView) {
      enableNavigationControlsFn(false);
      displayAppReviewFn();
    } else {
      selectedCompanyName && removeSelectedCompanyFn();
    }
  }

  _onSearchFlightsClick = () => {
    const { push, exitWebViewFn, isWebView } = this.props;

    !isWebView && push(getNormalizedRoute({ routeName: 'index' }));
    isWebView && exitWebViewFn();
  };

  _onCompletePassportClick = () => {
    const { passengerInfos, push, pnrs } = this.props;
    const { firstName, lastName } = passengerInfos[0].passengerInfo;
    const recordLocator = pnrs?.[0]?.recordLocator;

    push(
      buildPathWithParamAndQuery(getNormalizedRoute({ routeName: 'viewReservationView' }), {
        recordLocator
      }),
      null,
      null,
      {
        firstName: firstName,
        lastName: lastName
      }
    );
  };

  getHotelUpsellTemplateData = () => {
    const { bounds } = this.props;

    const IATA = _.get(bounds, '[0].arrivalAirport.code', '');
    const checkinDate = _.get(bounds, '[0].departureDate', '');
    const checkoutDate =
      _.get(bounds, '[1].departureDate') || (checkinDate && daysAfter(2, checkinDate).format('YYYY-MM-DD'));

    return { IATA, checkinDate, checkoutDate };
  };

  render() {
    const {
      _links,
      autoProvisioningMessage,
      billingInfo,
      bounds,
      confirmationPagePlacements,
      dates,
      destinationDescription,
      failedPassengers,
      fundsApplied,
      headerMessage,
      hideDialogFn,
      isWebView,
      messages,
      pnrs,
      selectedIrn,
      showDialogFn,
      totals
    } = this.props;
    const { selectedCompanyName } = this.state;
    const HEADER_TITLE = headerMessage?.header ?? i18n('SHARED__TRIP_BOOKED__TITLE');
    const HEADER_BODY =
      headerMessage?.body ??
      (_.isEmpty(bounds)
        ? i18n('SHARED__TRIP_BOOKED__EMAIL_CONFIRMATION_SUB_DETAILS')
        : i18n('SHARED__TRIP_BOOKED__CHECKIN_VERBIAGE_SUB_INSTRUCTION'));
    const isWarningMessage = headerMessage?.icon === 'WARNING';

    const passportRequiredMessage =
      messages && messages.find((obj) => obj.key === 'BOOKING_CONFIRMATION_PASSPORT_REQUIRED');

    const passportBody = (
      <a
        className="purchase-confirmation--passport-link"
        onClick={(event) => {
          event.stopPropagation && event.stopPropagation();
          this._onCompletePassportClick();
        }}
      >
        {passportRequiredMessage?.body}
      </a>
    );

    const { bottomPromo1, promoTop01, promoBottom01, promoBottom02, promoBottom03, promoBottom04 } =
      confirmationPagePlacements;
    const { parentGuardianDetails, youngTravelersDetails } = pnrs?.[0] ?? {};

    return (
      <div className="purchase-confirmation">
        <PageHeader>
          <span className="header">{i18n('AIR_BOOKING__PURCHASE_CONFIRMATION_MESSAGES__HEADER')}</span>
        </PageHeader>
        {selectedCompanyName && <CompanyNameBanner selectedCompanyName={selectedCompanyName} />}
        {failedPassengers && (
          <PartialBooking onSearchFlightClick={this._onSearchFlightsClick} failedPassengers={failedPassengers} />
        )}
        <div className="purchase-confirmation--message">
          {passportRequiredMessage && <InfoBanner header={passportRequiredMessage.header} body={passportBody} />}
          {isWarningMessage ? (
            <InfoBanner header={HEADER_TITLE} body={HEADER_BODY} />
          ) : (
            <MessageWithInstructions
              className="purchase-confirmation--trip-booked"
              title={HEADER_TITLE}
              subInstruction={HEADER_BODY}
            />
          )}
        </div>
        <div className="purchase-confirmation--content">
          {promoTop01 && <DynamicPlacement {...promoTop01} data-qa="promoTop01" isWebView={isWebView} />}
          <ConfirmationTripHeader
            dates={dates}
            destinationDescription={destinationDescription}
            pnrs={pnrs}
            bounds={bounds}
            _links={_links}
            confirmationNumber={pnrs?.[0]?.recordLocator}
            shouldShowAddEarlyBirdButton={!isWebView && !_.isEmpty(_links?.earlyBird)}
          />
          {parentGuardianDetails && youngTravelersDetails && (
            <ConfirmationYoungTravelerSection
              hideDialogFn={hideDialogFn}
              parentGuardianDetails={parentGuardianDetails}
              showDialogFn={showDialogFn}
              youngTravelersDetails={youngTravelersDetails}
            />
          )}
          <ReservationFlightSummary bounds={bounds} />
          <PriceTotal totals={totals} />
          <FundResultsList
            listTitle={i18n('SHARED__TRIP_BOOKED__AMOUNT_APPLIED')}
            billingInfo={billingInfo}
            retrievedFunds={fundsApplied}
          />
          {selectedIrn && (
            <div className="purchase-confirmation--irn-container">
              <span className="purchase-confirmation--irn-title">
                {i18n('AIR_BOOKING__CORPORATE_BOOKING__IRN_ABBREVIATED').toUpperCase()}
              </span>
              <span className="purchase-confirmation--irn">{selectedIrn}</span>
            </div>
          )}
          <dd className="purchase-confirmation--divider" />
          {autoProvisioningMessage && (
            <ChaseAutoProvisioning
              cardOrEmail={_.get(autoProvisioningMessage, 'key')}
              header={_.get(autoProvisioningMessage, 'header')}
              body={_.get(autoProvisioningMessage, 'body')}
            />
          )}
          <div className="purchase-confirmation--footer">
            {bottomPromo1 && (
              <DynamicPlacement
                {...bottomPromo1}
                data-qa="bottomPromo1"
                isWebView={isWebView}
                additionalTemplateData={this.getHotelUpsellTemplateData()}
              />
            )}
            {promoBottom01 && (
              <DynamicPlacement {...promoBottom01} placementName="promoBottom01" isWebView={isWebView} />
            )}
            {_.get(_links, 'carBooking') && promoBottom02 && (
              <DynamicPlacement
                {...promoBottom02}
                carBookingLinkQuery={_.get(_links, 'carBooking.query')}
                placementName="promoBottom02"
                isWebView={isWebView}
              />
            )}
            {promoBottom03 && (
              <DynamicPlacement {...promoBottom03} placementName="promoBottom03" isWebView={isWebView} />
            )}
            {promoBottom04 && (
              <DynamicPlacement {...promoBottom04} placementName="promoBottom04" isWebView={isWebView} />
            )}
            <NavGroupItemLinks />
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state: any) => ({
  ...getFlightConfirmationPageSelector(state),
  passengerInfos: state?.app?.airBooking?.passengerInfos,
  selectedCompanyName: state?.app?.account?.corporateInfo?.selectedCompany?.companyName,
  selectedIrn: state?.app?.airBooking?.selectedIrn?.name,
  confirmationPagePlacements: state?.app?.airBooking?.confirmationPagePlacements ?? {},
  isWebView: state?.app?.webView?.isWebView ?? false
});

const mapDispatchToProps = {
  cleanUpFrequentTravelerSelectedFn: AirBookingActions.cleanUpFrequentTravelerSelected,
  clearFormDataByIdFn: FormDataActions.clearFormDataById,
  displayAppReviewFn: WebViewActions.displayAppReview,
  enableNavigationControlsFn: WebViewActions.enableNavigationControls,
  exitWebViewFn: WebViewActions.exitWebView,
  getConfirmationPagePlacementsFn: AirBookingActions.getConfirmationPagePlacements,
  hideDialogFn: hideDialog,
  removeSelectedCompanyFn: AccountActions.removeSelectedCompany,
  showDialogFn: showDialog
};

const enhancers = _.flowRight(
  withConnectedReactRouter,
  withHideLoginButton,
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('purchase-confirmation-page')
);

export default enhancers(PurchaseConfirmationPage);
