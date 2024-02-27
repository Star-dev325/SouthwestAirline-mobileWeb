// @flow
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';
import ParentOrGuardianForm from 'src/airBooking/components/parentOrGuardianForm';
import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import Fields from 'src/shared/components/fields';
import BriefBound from 'src/shared/components/flightSummary/briefBound';
import ProgressionBar from 'src/shared/components/progressionBar';
import { AIR_BOOKING_PARENT_OR_GUARDIAN_FORM } from 'src/shared/constants/formIds';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import { flowRight } from 'src/shared/helpers/jsUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { YoungTravelerPageInfoType } from 'src/airBooking/flow-typed/airBooking.types';
import type { FlightPricingBound } from 'src/shared/flow-typed/shared.types';

type Props = {
  flightPricingPageBounds: Array<FlightPricingBound>,
  history: {
    push: (string) => void
  },
  selectedCompanyName?: string,
  youngTravelerPageInfo: YoungTravelerPageInfoType
};

export const YoungTravelerPage = ({
  flightPricingPageBounds,
  selectedCompanyName,
  youngTravelerPageInfo: { body, disclaimerText, linkText },
  history
}: Props) => {
  const onClickYoungTravelerParentConsent = (e) => {
    e.preventDefault();
    history.push(getNormalizedRoute({ routeName: 'youngTravelerParentConsent' }));
  };
  const _onSubmit = () => history.push(getNormalizedRoute({ routeName: 'purchase' }));

  return (
    <>
      <ProgressionBar
        currentIconType="airplane"
        step={2}
        title={i18n('AIR_BOOKING__YOUNG_TRAVELER__PAGE_TITLE')}
        totalStep={3}
      />
      {selectedCompanyName && <CompanyNameBanner selectedCompanyName={selectedCompanyName} />}
      <div className="young-traveler-page--flight-information">
        <Fields
          className="pb5"
          label={i18n('AIR_BOOKING__PARENT_OR_GUARDIAN_FORM__FLIGHT_INFORMATION_LABEL')}
          type="grouped"
        />
        {flightPricingPageBounds &&
          flightPricingPageBounds.map((bound, index) => {
            const {
              arrivalAirport,
              arrivalTime,
              boundType,
              departureAirport,
              departureDate,
              departureTime,
              isNextDayArrival,
              stops
            } = bound;

            return (
              <BriefBound
                arrivalAirportCode={arrivalAirport?.code}
                arrivalTime={arrivalTime}
                departureAirportCode={departureAirport?.code}
                departureDate={departureDate}
                departureDayOfWeek={dayjs(departureDate).format('dddd')}
                departureTime={departureTime}
                isNextDayArrival={isNextDayArrival}
                key={`${index}-${boundType}`}
                stops={stops}
              />
            );
          })}
      </div>
      <ParentOrGuardianForm
        disclaimerText={disclaimerText}
        formId={AIR_BOOKING_PARENT_OR_GUARDIAN_FORM}
        infoText={body}
        linkText={linkText}
        onClickYoungTravelerParentConsent={onClickYoungTravelerParentConsent}
        onSubmit={_onSubmit}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  flightPricingPageBounds: state?.app?.airBooking?.flightPricingPage?.response?.flightPricingPage?.bounds,
  selectedCompanyName: state?.app?.account?.corporateInfo?.selectedCompany?.companyName,
  youngTravelerPageInfo: state?.app?.airBooking?.passengerValidationDetails?.youngTraveler?.youngTravelerPageInfo
});

const enhancers = flowRight(withConnectedReactRouter, connect(mapStateToProps, {}));

export default enhancers(YoungTravelerPage);
