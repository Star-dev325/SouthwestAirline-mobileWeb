import _ from 'lodash';

const _mapOfTypesToLabels = {
  ECONOMY: 'Economy',
  COMPACT: 'Compact',
  MIDSIZE: 'Mid-size',
  FULLSIZE: 'Full-size',
  PREMIUM: 'Premium',
  LUXURY: 'Luxury',
  CONVERTIBLE: 'Convertible',
  PICKUP_TRUCK: 'Pick-up Truck',
  JEEP: 'Jeep/All Terrain',
  COMPACT_SUV: 'Compact SUV',
  MIDSIZE_SUV: 'Mid-size SUV',
  STANDARD_SUV: 'Standard SUV',
  FULLSIZE_SUV: 'Full-size SUV',
  MINIVAN: 'Minivan',
  PREMIUM_SUV: 'Premium SUV',
  STANDARD_ELITE_SUV: 'Std. Elite SUV',
  FULLSIZE_VAN: 'Full-size Van'
};

const _mapOfTypes = {
  MID_SIZE_SUV: 'MIDSIZE_SUV',
  FULL_SIZE_SUV: 'FULLSIZE_SUV',
  VAN: 'FULLSIZE_VAN'
};

export const typeToLabel = (type) => _mapOfTypesToLabels[mapType(type)];

export const labelToType = (label) => _.invert(_mapOfTypesToLabels)[label];

export const allLabels = () => _.values(_mapOfTypesToLabels);

export const allTypes = () => _.keys(_mapOfTypesToLabels);

export const mapType = (type) => _mapOfTypes[type] || type;
