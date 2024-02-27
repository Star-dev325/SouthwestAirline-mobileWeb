import _ from 'lodash';

export function transformToDiscountValue(formData) {
  const promoOne = {
    code: formData.code1,
    type: formData.type1,
    vendor: formData.vendor1
  };
  const promoTwo = {
    code: formData.code2,
    type: formData.type2,
    vendor: formData.vendor2
  };

  return formData.code1 ? [promoOne, promoTwo] : [promoTwo, promoOne];
}

export function transformVendorsIdsToVendorNameList(vendors, carVendorsResponse) {
  const idToNameMap = {};

  carVendorsResponse.map((vendor) => {
    idToNameMap[vendor.vendorId] = vendor.name;
  });

  return vendors.map((vendor) => ({ ...vendor, vendorName: idToNameMap[vendor.vendorId] }));
}

export function transformSelectedSearchRequestToDiscountValue(selectedSearchRequest) {
  const promoOne = {
    code: selectedSearchRequest?.carCode1 || '',
    type: selectedSearchRequest?.carCodeType1 || '',
    vendor: selectedSearchRequest?.carCodeVendor1 || ''
  };
  const promoTwo = {
    code: selectedSearchRequest?.carCode2 || '',
    type: selectedSearchRequest?.carCodeType2 || '',
    vendor: selectedSearchRequest?.carCodeVendor2 || ''
  };

  return selectedSearchRequest?.carCode1 || selectedSearchRequest?.carCodeType1 || selectedSearchRequest?.carCodeVendor1
    ? [promoOne, promoTwo]
    : [promoTwo, promoOne];
}

export function transformToFormData(promos) {
  return {
    vendor1: _.get(promos, '0.vendor', ''),
    type1: _.get(promos, '0.type', ''),
    code1: _.get(promos, '0.code', ''),
    vendor2: _.get(promos, '1.vendor', ''),
    type2: _.get(promos, '1.type', ''),
    code2: _.get(promos, '1.code', '')
  };
}
