import { DOLLAR, POINTS } from 'src/shared/constants/currencyTypes';

export const unselectedMoneyTotal = {
  currencyCode: DOLLAR,
  amount: '0.00',
  currencySymbol: '$'
};

export const unselectedPointsTotal = {
  currencyCode: POINTS,
  amount: '0',
  currencySymbol: ''
};

export const UPGRADE_TYPE_QUERY_PARAM = 'upgradeType';
export const AIR_UPGRADE_FLOW_NAME = 'airUpgrade';
export const AIR_UPGRADE_FARE_OPTIONS = {
  UPGRADE_TO_PLU: 'upgradeToPLU',
  UPGRADE_TO_BUS: 'upgradeToBUS'
};

export const CHAPI_UPGRADE_TYPE_VALUES = {
  'BUS': AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_BUS,
  'PLU': AIR_UPGRADE_FARE_OPTIONS.UPGRADE_TO_PLU
};

export const getUpgradeQueryParams = (key) => CHAPI_UPGRADE_TYPE_VALUES[key];

export const ANALYTICS = {
  UPGRADE_FARE_PAGE: {
    page: 'air-upgrade',
    page_name: 'air-upgrade-index',
    page_channel: 'UPGRADE',
    page_subchannel: 'AIR'
  },
  UPGRADE_SELECT_BOUNDS_PAGE: {
    page_channel: 'UPGRADE',
    page_subchannel: 'AIR',
    page: 'air-upgrade-select-bounds',
    page_name: 'air-upgrade-select',
    formstart: '1',
    formname: 'upgrade'
  }
};
