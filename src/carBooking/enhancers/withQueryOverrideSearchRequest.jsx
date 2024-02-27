// @flow

import i18n from '@swa-ui/locale';
import _ from 'lodash';
import type { ComponentType } from 'react';
import React from 'react';
import { VALID_VENDORS } from 'src/carBooking/constants/carBookingConstants';
import { PROMO_CODE } from 'src/carBooking/constants/carBookingMessages';
import type {
  CarBookingSearchPageQueryType,
  CarVendorType,
  SearchRequestType
} from 'src/carBooking/flow-typed/carBooking.types';
import { getPromoTypeListOfSelectedVendor } from 'src/carBooking/helpers/carBookingSearchRequestHelper';
import { typeToLabel } from 'src/carBooking/helpers/vehicleTypesHelper';
import { transformToCarPromotionSelectOption } from 'src/carBooking/transformers/carVendorTransformer';

const { PROMO_TYPE_HOLDER_MAP_TO_I18N_KEY } = PROMO_CODE;

type Props = {
  carVendors: Array<CarVendorType>,
  query: CarBookingSearchPageQueryType,
  selectedSearchRequest: SearchRequestType
};

const withQueryOverrideSearchRequest = (Comp: ComponentType<*>) => (props: Props) => {
  const _generateSearchRequest = (selectedSearchRequest: SearchRequestType, query: CarBookingSearchPageQueryType) => {
    let result = selectedSearchRequest;
    const selectedSearchRequestChangedByUser = !_.isEmpty(selectedSearchRequest);

    if (!selectedSearchRequestChangedByUser && !_.isEmpty(query) && _hasRelevantQuery(query)) {
      result = _.merge({}, selectedSearchRequest, _getSearchRequestFromQuery(query));
    }

    return result;
  };

  const _hasRelevantQuery = (queries) => {
    const relevantQueries = [
      'carCode-0',
      'carCode-1',
      'carCodeType-0',
      'carCodeType-1',
      'carCodeVendor-0',
      'carCodeVendor-1',
      'carType',
      'pickUpLocation',
      'pickUpDate',
      'pickUpTime',
      'returnLocation',
      'returnDate',
      'returnTime',
      'vehicleType',
      'vendors'
    ];

    return Object.keys(queries).some((query) => relevantQueries.includes(query));
  };

  const _formatTime = (timeString: ?string) => {
    const [hourString, minute] = (timeString || '').split(':');
    const hour = parseInt(hourString || 0) % 24;

    return `${hour % 12 || 12}:${minute || '00'}${hour < 12 ? 'AM' : 'PM'}`;
  };

  const carPromoVendors = transformToCarPromotionSelectOption(props.carVendors);

  const _getCarCodeType = (vendor, carCodeType) => {
    const promoTypeList = getPromoTypeListOfSelectedVendor(carPromoVendors, vendor);

    return (promoTypeList.filter((promo) => promo.value === carCodeType).length && carCodeType) || null;
  };

  const _getCarVendor = (query, key) => PROMO_TYPE_HOLDER_MAP_TO_I18N_KEY[query[key]] && query[key];

  const _getCarType = (carType) => typeToLabel(carType);

  const _getVendorsFromQuery = (vendors) => {
    const _getVendorIds = (vendor) => ({ vendorId: vendor });
    const _isValidVendorId = ({ vendorId }) => VALID_VENDORS.includes((vendorId || '').toLowerCase());
    const vendorIds = vendors
      ? typeof vendors === 'string'
        ? vendors.split(',').map(_getVendorIds)
        : vendors.map(_getVendorIds)
      : [];
    const validVendors = vendorIds.filter(_isValidVendorId);

    return validVendors.length > 0 ? validVendors : i18n('CAR_BOOKING__CAR_VENDOR__SHOP_ALL_HINT');
  };

  const _getSearchRequestFromQuery = (query: CarBookingSearchPageQueryType) => ({
    carCode1: query['carCode-0'],
    carCode2: query['carCode-1'],
    carCodeType1: _getCarCodeType(query['carCodeVendor-0'], query['carCodeType-0']),
    carCodeType2: _getCarCodeType(query['carCodeVendor-1'], query['carCodeType-1']),
    carCodeVendor1: _getCarVendor(query, 'carCodeVendor-0'),
    carCodeVendor2: _getCarVendor(query, 'carCodeVendor-1'),
    dropOff: query.returnLocation,
    dropOffDate: query.returnDate,
    dropOffTime: _formatTime(query.returnTime),
    pickUp: query.pickUpLocation,
    pickUpDate: query.pickUpDate,
    pickUpTime: _formatTime(query.pickUpTime),
    vehicleType: _getCarType(query.carType),
    vendors: _getVendorsFromQuery(query.vendors)
  });

  const updatedSearchRequest = _generateSearchRequest(props.selectedSearchRequest, props.query);
  const restProps = _.omit(props, 'selectedSearchRequest');

  return <Comp {...restProps} selectedSearchRequest={updatedSearchRequest} />;
};

export default withQueryOverrideSearchRequest;
