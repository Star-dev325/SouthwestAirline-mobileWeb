// @flow
import i18n from '@swa-ui/locale';
import cx from 'classnames';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as CarBookingActions from 'src/carBooking/actions/carBookingActions';
import CarResult from 'src/carBooking/components/carResult';
import CarTypeStrip from 'src/carBooking/components/carTypeStrip';
import PromoCodeBanner from 'src/carBooking/components/promoCodeBanner';
import {
  CAR_BOOKING_DATE_FORMAT,
  CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT
} from 'src/carBooking/constants/carBookingConstants';
import withQueryOverrideSearchRequest from 'src/carBooking/enhancers/withQueryOverrideSearchRequest';
import * as VehicleTypesHelper from 'src/carBooking/helpers/vehicleTypesHelper';
import {
  transformCarResults,
  filterOutNonSelectedVendors
} from 'src/carBooking/transformers/carShoppingResultsTransformer';
import { transformToCarShoppingResultObject } from 'src/carBooking/transformers/carVendorTransformer';
import PromoCodeTransformer from 'src/carBooking/transformers/promoCodeTransformer';
import PageHeader from 'src/shared/components/pageHeader';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withConnectedReactRouter from 'src/shared/enhancers/withConnectedReactRouter';
import WithShowOnlyLoginButton from 'src/shared/enhancers/withShowOnlyLoginButton';
import { daysAfter, tomorrow } from 'src/shared/helpers/dateHelper';
import { flowRight, get, isEmpty } from 'src/shared/helpers/jsUtils';

import type {
  CarLocationResponseType,
  CarProductsType,
  CarResultVehicleType,
  CarVendorImageType,
  CarVendorType,
  FindCarsQueryRequestType,
  FindCarsRequestType,
  GroupedCarResultMapType,
  PromoResponseType
} from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carLocations: Array<CarLocationResponseType>,
  carResults: ?GroupedCarResultMapType,
  carVendorImages: Array<CarVendorImageType>,
  carVendors: Array<CarVendorType>,
  findCarResponse: Array<CarProductsType>,
  findCarsFn: (FindCarsRequestType, boolean) => Promise<*>,
  isWebView?: boolean,
  promoCodesResponse: ?Array<PromoResponseType>,
  query: FindCarsQueryRequestType,
  retrieveCarPricingFn: (CarResultVehicleType, FindCarsRequestType) => void,
  saveCarResultsFn: (GroupedCarResultMapType) => void,
  saveFindCarSearchRequestFn: (FindCarsRequestType) => void,
  searchRequest: FindCarsRequestType,
  startNewSessionFlowFn: () => void
};

export const CarShoppingResultsPage = ({
  carLocations,
  carResults,
  carVendorImages,
  carVendors,
  findCarResponse,
  findCarsFn,
  isWebView,
  promoCodesResponse,
  query,
  retrieveCarPricingFn,
  saveCarResultsFn,
  saveFindCarSearchRequestFn,
  searchRequest,
  startNewSessionFlowFn
}: Props) => {
  const [carResultAllVehicles, setCarResultAllVehicles] = useState([]);
  const [isDeepLink, setIsDeepLink] = useState(false);
  const [vehicleType, setVehicleType] = useState('');
  const [airportText, setAirportText] = useState('');

  useEffect(() => {
    if (!isEmpty(query)) {
      setIsDeepLink(true);

      if (isEmpty(searchRequest) || isEmpty(findCarResponse)) {
        startNewSessionFlowFn();
      }
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(carLocations) && !isEmpty(carVendors) && isDeepLink) {
      const searchRequestQuery = _normalizeQueryParameters();

      findCarsFn(searchRequestQuery, true);
    }
  }, [carLocations, carVendors, isDeepLink]);

  useEffect(() => {
    if (!isEmpty(findCarResponse) && !isEmpty(searchRequest) && !isEmpty(carResults)) {
      const airportCode = get(searchRequest, 'pickUpAirport.airport.code');
      const airportCity = get(searchRequest, 'pickUpAirport.city');
      const searchResultVehicleType = searchRequest.vehicleType ?? i18n('CAR_BOOKING__MID_SIZE');
      const selectedVehicleType = isDeepLink ? searchResultVehicleType : VehicleTypesHelper.labelToType(searchResultVehicleType);

      setAirportText(`${airportCity} - ${airportCode}`);
      setCarResultAllVehicles(carResults?.[selectedVehicleType]?.allVehicles);
      setVehicleType(selectedVehicleType);
    }

    if (!isEmpty(findCarResponse) && !isEmpty(searchRequest) && !isEmpty(carVendors) && isEmpty(carResults)) {
      const selectedCarVendors = filterOutNonSelectedVendors(searchRequest.carCompany, carVendors);
      const carVendorsShopping = transformToCarShoppingResultObject(selectedCarVendors);
      const transformedCarResults = transformCarResults({ carProducts: findCarResponse }, carVendorImages, carVendorsShopping);

      saveCarResultsFn(transformedCarResults);
    }
  }, [carResults, carVendors, findCarResponse, isDeepLink, searchRequest]);

  const _getVendorIdAndName = (vendors) => (
    vendors.map(vendor => {
      const index = carVendors.findIndex(carVendor => carVendor.vendorId === vendor);

      return {
        vendorId: carVendors?.[index]?.vendorId,
        vendorName: carVendors?.[index]?.name
      };
    })
  );

  const _getCarCodeDetails = (carCode, carCodeType, carCodeVendor) => (Array.isArray(carCode)
    ? carCode.map((code, index) => ({ code, type: carCodeType?.[index], vendor: carCodeVendor?.[index] }))
    : [{ code: carCode, type: carCodeType, vendor: carCodeVendor }]);

  const _getCarLocationFromCode = (carLocationCode: string) => carLocations.find(location => location.airport.code === carLocationCode);

  const _getPromoCodes = () => PromoCodeTransformer.transformToResultsPromoCodes(searchRequest?.discount, promoCodesResponse, carVendors);

  const _getFormattedDates = (pickUpDate: string, dropOffDate: string) => {
    const headerDateFormat = 'ddd, MMM D';

    return `${dayjs(pickUpDate).format(headerDateFormat)} to ${dayjs(dropOffDate).format(headerDateFormat)}`;
  };

  const _normalizeQueryParameters = () => {
    const {
      carCode,
      carCodeType,
      carCodeVendor,
      carType,
      pickUpDate,
      pickUpLocation,
      pickUpTime = '',
      returnDate,
      returnTime = '',
      returnLocation,
      vendors
    } = query;

    const carBookingDiscount = carCode ? _getCarCodeDetails(carCode, carCodeType, carCodeVendor): [];
    const pickUpAirport = _getCarLocationFromCode(pickUpLocation);
    const dropOffAirport = _getCarLocationFromCode(returnLocation);

    let vendorsRequest = Array.isArray(vendors) ? _getVendorIdAndName(vendors) : vendors;
    
    if (Array.isArray(vendorsRequest)) {
      vendorsRequest = [...new Set(vendorsRequest)]; // remove duplicates
      vendorsRequest = vendorsRequest.length === carVendors.length ? i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT') : vendorsRequest;
    }

    return {
      carCompany: vendorsRequest ?? i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT'),
      discount: carBookingDiscount,
      dropOff: returnLocation,
      dropOffAirport,
      dropOffDate: returnDate ?? daysAfter(3, tomorrow()).format(CAR_BOOKING_DATE_FORMAT),
      dropOffTime: returnTime !== '' ? dayjs(`1/1/1 ${returnTime}`).format('hh:mm a') : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
      pickUp: pickUpLocation,
      pickUpAirport,
      pickUpDate: pickUpDate ?? tomorrow().format(CAR_BOOKING_DATE_FORMAT),
      pickUpTime: pickUpTime !== '' ? dayjs(`1/1/1 ${pickUpTime}`).format('hh:mm a') : CAR_BOOKING_PICKUP_DROPPOFF_TIME_DEFAULT,
      vehicleType: carType ?? VehicleTypesHelper.labelToType(i18n('CAR_BOOKING__MID_SIZE'))
    };
  };

  const _getFormattedWebViewDates = (pickUpDate: string, dropOffDate: string) => {
    const headerDateFormat = 'ddd, MMM D';

    return (
      <div className="car-shopping-results-dates">
        {dayjs(pickUpDate).format(headerDateFormat)}
        <i> to </i>
        {dayjs(dropOffDate).format(headerDateFormat)}
      </div>
    );
  };

  const _onCarResultClick = (carResult: CarResultVehicleType) => {
    retrieveCarPricingFn(carResult, searchRequest);
  };

  const _onCarTypeChanged = (carType: string) => {
    const newSearchRequest = _.clone(searchRequest);

    newSearchRequest.vehicleType = VehicleTypesHelper.typeToLabel(carType);
    saveFindCarSearchRequestFn(newSearchRequest);
  };

  return (
    <div data-qa="car-shopping-result">
      <PageHeader>
        <div className="flex">
          <div className="flex-grow1">
            <b>{i18n('CAR_BOOKING__RESULTS__HEADER')}</b>
            {!isWebView && (
              <em className="car-shopping-results-date-range-container">
                {_getFormattedDates(searchRequest?.pickUpDate, searchRequest?.dropOffDate)}
              </em>
            )}
          </div>
          {isWebView && <div className="flex-shrink1 normal italics">{airportText}</div>}
        </div>
      </PageHeader>
      <div className="car-shopping-results-container">
        {isWebView && _getFormattedWebViewDates(searchRequest?.pickUpDate, searchRequest?.dropOffDate)}
        {carResults && vehicleType && (
          <CarTypeStrip
            carResults={carResults}
            className={cx({ mt6: !isWebView }, { mt5: isWebView })}
            onCarTypeChangedFn={_onCarTypeChanged}
            selectedCarType={vehicleType}
          />
        )}
        <PromoCodeBanner promoCodes={_getPromoCodes()} />
        <div className="px4 pb6">
          <div className="car-shopping-results-message">
            {i18n('CAR_BOOKING__RESULTS__TOTAL_MESSAGE')}
            {i18n('CAR_BOOKING__RESULTS__TAXES_FEES_MESSAGE')}
          </div>
          <div>
            {carResultAllVehicles && carResultAllVehicles.map((vehicle: CarResultVehicleType, index: number) => (
              <CarResult carResult={vehicle} key={index} onClickFn={_onCarResultClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  carLocations: get(state, 'app.carBooking.carLocations'),
  carResults: get(state, 'app.carBooking.carShoppingResultsPage.carResults'),
  carVendorImages: get(state, 'app.wcmContent.carVendorImages.car_vendors'),
  carVendors: get(state, 'app.carBooking.carVendors'),
  findCarResponse: get(state, 'app.carBooking.carShoppingResultsPage.response.carProducts'),
  isWebView: get(state, 'app.webView.isWebView'),
  promoCodesResponse: get(state, 'app.carBooking.carShoppingResultsPage.response.promoCodes'),
  searchRequest: get(state, 'app.carBooking.carShoppingResultsPage.searchRequest')
});

const mapDispatchToProps = {
  findCarsFn: CarBookingActions.findCars,
  retrieveCarPricingFn: CarBookingActions.retrieveCarPricing,
  saveCarResultsFn: CarBookingActions.saveCarResults,
  saveFindCarSearchRequestFn: CarBookingActions.saveFindCarSearchRequest,
  startNewSessionFlowFn: CarBookingActions.startNewSessionFlow
};

const enhancers = flowRight(
  withBodyClass('car-shopping--results'),
  WithShowOnlyLoginButton,
  withConnectedReactRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withQueryOverrideSearchRequest
);

export default enhancers(CarShoppingResultsPage);
