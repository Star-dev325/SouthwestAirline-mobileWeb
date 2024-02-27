// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';
import BoardingPassBarcode from 'src/checkIn/components/boardingPassBarcode';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import TierTypes from 'src/shared/constants/tierTypes';
import { convertBrandColor } from 'src/shared/helpers/productDefinitionsHelper';

import type { BoardingPassStyleObjectType } from 'src/shared/flow-typed/shared.types';

type Props = {
  mobileBoardingPass: {
    associatedPaxLabel?: string,
    associatedPaxName?: string,
    adaptiveLink?: string,
    airportLanesText?: string,
    barcodeString?: string,
    boardingGroup: string,
    boardingPassSSRs?: string,
    boardingPosition: string,
    boardingTime: string,
    boardingTimeString: string,
    confirmationNumber: string,
    departureDate: string,
    departureGate?: string,
    departureTime: string,
    departureTimeString: string,
    destinationAirportCode: string,
    destinationAirportDescription?: string,
    documentType: string,
    drinkCouponText?: string,
    earlyBirdText?: string,
    eligibleForDrinkCoupon: boolean,
    fareType: string,
    familyBoardingText: string,
    flightNumber: string,
    hasAList?: boolean,
    hasAListPreferred?: boolean,
    hasTsaPreCheck: boolean,
    isInfant: boolean,
    numberOfDrinkCouponsHeader: string,
    numberOfDrinkCouponsText: string,
    originAirportCode: string,
    originAirportDescription?: string,
    passenger: {
      accountNumber?: string,
      tier?: string,
      travelerId: string,
      name: {
        firstName: string,
        middleName?: string,
        lastName: string
      }
    },
    priorityBoardingText?: string,
    showAirportLanes?: boolean,
    style: BoardingPassStyleObjectType,
    travelerSegmentIdentifier: string
  },
  isIOSDevice: boolean,
  isAndroidDevice: boolean
};

const MobileBoardingPass = (props: Props) => {
  const {
    associatedPaxLabel,
    associatedPaxName,
    adaptiveLink,
    airportLanesText,
    barcodeString,
    boardingGroup,
    boardingPassSSRs,
    boardingPosition,
    boardingTimeString,
    confirmationNumber,
    departureDate,
    departureGate,
    departureTimeString,
    destinationAirportCode,
    destinationAirportDescription,
    documentType,
    drinkCouponText,
    earlyBirdText,
    eligibleForDrinkCoupon,
    fareType,
    familyBoardingText,
    flightNumber,
    hasAList,
    hasAListPreferred,
    hasTsaPreCheck,
    isInfant,
    numberOfDrinkCouponsHeader,
    numberOfDrinkCouponsText,
    originAirportCode,
    originAirportDescription,
    passenger,
    priorityBoardingText,
    showAirportLanes,
    style
  } = props.mobileBoardingPass;

  const { accountNumber, tier, name } = passenger;
  const { firstName, lastName, middleName } = name;
  const { isIOSDevice, isAndroidDevice } = props;
  const { bottomLabels, bottomValues, headerLabel, headerText, topLabels, topValues } = style;
  const bottomLabelTextColor = convertBrandColor(bottomLabels, isInfant ? 'gray5' : 'sltblue');
  const bottomValueTextColor = convertBrandColor(bottomValues, isInfant ? 'black' : 'white');
  const headerLabelColor = convertBrandColor(headerLabel, 'yellow');
  const headerTextColor = convertBrandColor(headerText, 'white');
  const topLabelTextColor = convertBrandColor(topLabels, isInfant ? 'gray5' : 'white');
  const topValueTextColor = convertBrandColor(topValues, isInfant ? 'pdkblue' : 'yellow');

  const tierFormatted = _.get(TierTypes, tier, '');
  const defaultDrinkCouponText = eligibleForDrinkCoupon ? 'Yes' : 'No';

  const _renderSubInfoWithSmallLabel = (label: string, info: *, infoCode?: string) => (
    <div className="mbp-subinfo">
      <div>
        <p className={`mbp-label-small ${bottomLabelTextColor}`}>{label}</p>
        {infoCode && (
          <p className={`mbp-info-white ${bottomValueTextColor} align-left left bold`}>
            {infoCode}
            <span className="regular">&nbsp;-&nbsp;</span>
          </p>
        )}
        <p
          className={`mbp-info-white ${bottomValueTextColor} align-left left`}
          id={label.replace(' ', '-').toLowerCase()}
        >
          {info || '- -'}
        </p>
      </div>
    </div>
  );

  const _renderDeviceWallet = () => {
    if (isIOSDevice) {
      return (
        <a href={adaptiveLink} data-qa="apple-wallet" onClick={() => raiseSatelliteEvent('add to digital wallet')}>
          <div className="add-to-apple-wallet">
            <img className="add-to-apple-wallet-img" src="/content/mkt/images/landing_pages/add-to-apple-wallet.svg" />
          </div>
        </a>
      );
    }

    if (isAndroidDevice) {
      return (
        <a href={adaptiveLink} data-qa="google-pay" onClick={() => raiseSatelliteEvent('add to digital wallet')}>
          <div className="add-to-google-pay">
            <img
              className="add-to-google-pay-img"
              src="/content/mkt/images/landing_pages/add-to-google-wallet.png"
              srcSet="/content/mkt/images/landing_pages/add-to-google-pay@2x.png 2x, /content/mkt/images/landing_pages/add-to-google-pay@3x.png 3x"
            />
          </div>
        </a>
      );
    }
  };

  return (
    <div className="mbp">
      {documentType === 'SECURITY_DOCUMENT' && (
        <div className="mbp-security-header">
          <p className={`mbp-security-title ${headerLabelColor}`}>
            {i18n('CHECK_IN__MOBILE_BOARDING_PASS__SECURITY_DOCUMENT')}
          </p>
          <p className={`${headerTextColor}`}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__PROCEED_TO_GATE')}</p>
        </div>
      )}
      <div className="mbp-maininfo">
        <div className="mbp-flex-col">
          <div className="left">
            <p className={`mbp-label ${topLabelTextColor}`}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__GATE_NO_LABEL')}</p>
            <p id="gate" className={`mbp-info ${topValueTextColor} large-font ${cx({ 'no-info': !departureGate })}`}>
              {departureGate || '--'}
            </p>
          </div>
        </div>
        <div className="mbp-flex-col">
          <div>
            <p className={`mbp-label ${topLabelTextColor}`}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__GROUP_NO_LABEL')}</p>
            <p id="group" className={`mbp-info ${topValueTextColor} large-font ${cx({ 'no-info': !boardingGroup })}`}>
              {boardingGroup || '--'}
            </p>
          </div>
        </div>
        <div className="mbp-flex-col">
          <div className="right">
            <p className={`mbp-label ${topLabelTextColor}`}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__POSITION')}</p>
            <p
              id="position"
              className={`mbp-info ${topValueTextColor}  large-font ${cx({ 'no-info': !boardingPosition })}`}
            >
              {boardingPosition || '--'}
            </p>
          </div>
        </div>
      </div>
      <BoardingPassBarcode
        barcodeString={barcodeString}
        hasAList={hasAList}
        hasAListPreferred={hasAListPreferred}
        hasTsaPreCheck={hasTsaPreCheck}
        isInfant={isInfant}
        showAirportLanes={showAirportLanes}
        tier={tierFormatted}
      />
      {numberOfDrinkCouponsHeader && (
        <div className="mbp-drinkcoupon">
          <img className="mbp-drinkcoupon--logo" src="/content/mkt/images/landing_pages/boardingPass/drinkcoupon.svg" />
          <div className="mbp-drinkcoupon--header">{numberOfDrinkCouponsHeader}</div>
          <div className="mbp-drinkcoupon--text">{numberOfDrinkCouponsText}</div>
        </div>
      )}
      <div className="mbp-subinfo">
        <div>
          <p className={`mbp-label ${topLabelTextColor}`}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__BOARDING_TIME')}</p>
          <p id="boardingTime" className={`mbp-info ${topValueTextColor} left`}>
            {boardingTimeString || '- -'}
          </p>
        </div>
        <div>
          <p className={`mbp-label ${topLabelTextColor}`}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__CONFIRMATION')}</p>
          <p id="confirmation" className={`mbp-info ${topValueTextColor} right`}>
            {confirmationNumber || '- -'}
          </p>
        </div>
      </div>

      <div className="mbp-subinfo">
        <div>
          <p className={`mbp-label ${topLabelTextColor}`}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__FLIGHT')}</p>
          <p id="flight" className={`mbp-info ${topValueTextColor} left`}>
            {flightNumber || '- -'}
          </p>
        </div>
        {adaptiveLink && _renderDeviceWallet()}
      </div>

      {_renderSubInfoWithSmallLabel(
        i18n('CHECK_IN__MOBILE_BOARDING_PASS__PASSENGER'),
        `${firstName} ${middleName ? `${middleName} ` : ''}${lastName}`
      )}
      {associatedPaxLabel && _renderSubInfoWithSmallLabel(associatedPaxLabel, associatedPaxName)}
      {_renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__DEPARTURE_TIME'), departureTimeString)}
      {_renderSubInfoWithSmallLabel(
        i18n('CHECK_IN__MOBILE_BOARDING_PASS__DEPARTS'),
        `${originAirportDescription ? `${originAirportDescription}` : ''}`,
        `${originAirportCode}`
      )}
      {_renderSubInfoWithSmallLabel(
        i18n('CHECK_IN__MOBILE_BOARDING_PASS__ARRIVES'),
        `${destinationAirportDescription ? `${destinationAirportDescription}` : ''}`,
        `${destinationAirportCode}`
      )}
      {_renderSubInfoWithSmallLabel(
        i18n('CHECK_IN__MOBILE_BOARDING_PASS__FLIGHT_DATE'),
        dayjs(departureDate).format('ddd, ll')
      )}
      {!isInfant && (
        <>
          {_renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__FARE_TYPE'), fareType)}
          {documentType !== 'SECURITY_DOCUMENT' &&
            _renderSubInfoWithSmallLabel(
              i18n('CHECK_IN__MOBILE_BOARDING_PASS__DRINK_COUPON'),
              drinkCouponText || defaultDrinkCouponText
            )}
          {_renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__RAPID_REWARDS'), accountNumber)}
          {_renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__STATUS'), tierFormatted)}
        </>
      )}
      {_renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__SPECIAL_ASSISTANCE'), boardingPassSSRs)}
      {earlyBirdText &&
        !isInfant &&
        _renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__EARLYBIRD_CHECK_IN'), earlyBirdText)}
      {airportLanesText &&
        !isInfant &&
        _renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__PRIORITY_EXPRESS_LANES'), airportLanesText)}
      {priorityBoardingText &&
        _renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__PRIORITY_BOARDING'), priorityBoardingText)}
      {familyBoardingText &&
        _renderSubInfoWithSmallLabel(i18n('CHECK_IN__MOBILE_BOARDING_PASS__FAMILY_BOARDING'), familyBoardingText)}
      <div className={bottomValueTextColor}>{i18n('CHECK_IN__MOBILE_BOARDING_PASS__CHECK_MONITORS')}</div>
    </div>
  );
};

export default MobileBoardingPass;
