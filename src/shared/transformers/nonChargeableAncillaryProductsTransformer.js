// @flow
import _ from 'lodash';

import type { SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';

const checkboxFields = [
  'DEAF',
  'BLIND',
  'COGNITIVE_AND_DEVELOPMENTAL_SSR',
  'ASSISTANCE_ANIMAL',
  'PEANUT_DUST_ALLERGY',
  'PORTABLE_OXYGEN_CONCENTRATOR'
];

const wheelchairAssistFields = ['AIRPORT_WHEELCHAIR', 'AISLE_CHAIR'];

const wheelchairStowageFields = ['MANUAL_WHEELCHAIR', 'WET_CELL_BATTERY_WHEELCHAIR', 'DRY_CELL_BATTERY_WHEELCHAIR'];

export const transformToNonChargeableAncillaryProducts = (specialAssistance: SpecialAssistanceType) => {
  const products = [];

  _.chain(specialAssistance)
    .pick(checkboxFields)
    .forEach((key, value) => {
      if (key) {
        products.push({ ancillaryType: value });
      }

      return;
    })
    .value();

  const wheelchairAssist = _.get(specialAssistance, 'WHEELCHAIR_ASSISTANCE');

  if (!_.isEmpty(wheelchairAssist) && wheelchairAssist !== 'NONE') {
    products.push({
      ancillaryType: wheelchairAssist
    });
  }

  const wheelchairStowage = _.get(specialAssistance, 'WHEELCHAIR_STOWAGE');

  if (!_.isEmpty(wheelchairStowage)) {
    if (wheelchairStowage === 'MANUAL_WHEELCHAIR') {
      products.push({
        ancillaryType: wheelchairStowage
      });
    } else if (wheelchairStowage !== 'NONE') {
      const spillableDetail = _.get(specialAssistance, 'WET_BATTERIES');
      const nonSpillableDetail = _.get(specialAssistance, 'DRY_BATTERIES');
      const detail = wheelchairStowage === 'WET_CELL_BATTERY_WHEELCHAIR' ? spillableDetail : nonSpillableDetail;
      const product = {
        ancillaryType: wheelchairStowage,
        details: [detail]
      };

      products.push(product);
    }
  }

  return products;
};

export const transformNonAncillaryToFormData = (nonAncillaryProducts: *) => {
  const specialAssistanceFormData = _.cloneDeep(DEFAULT_FIELD_VALUES);

  nonAncillaryProducts &&
    nonAncillaryProducts.map((product) => {
      if (_.includes(checkboxFields, product.ancillaryType)) {
        specialAssistanceFormData[product.ancillaryType] = true;
      } else if (_.includes(wheelchairAssistFields, product.ancillaryType)) {
        specialAssistanceFormData.WHEELCHAIR_ASSISTANCE = product.ancillaryType;
      } else if (_.includes(wheelchairStowageFields, product.ancillaryType)) {
        specialAssistanceFormData.WHEELCHAIR_STOWAGE = product.ancillaryType;

        if (product.ancillaryType === 'WET_CELL_BATTERY_WHEELCHAIR') {
          specialAssistanceFormData.WET_BATTERIES = product.details ? product.details[0] : null;
        } else if (product.ancillaryType === 'DRY_CELL_BATTERY_WHEELCHAIR') {
          specialAssistanceFormData.DRY_BATTERIES = product.details ? product.details[0] : null;
        }
      }
    });

  return specialAssistanceFormData;
};
