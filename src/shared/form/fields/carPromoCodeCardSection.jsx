// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import FormInputField from 'src/shared/form/fields/formInputField';
import PromoCodeSelectField from 'src/shared/form/fields/promoCodeSelectField';
import { PROMO_CODE } from 'src/carBooking/constants/carBookingMessages';
import i18n from '@swa-ui/locale';

import type { PromoType } from 'src/carBooking/flow-typed/carBooking.types';
import type { OptionType } from 'src/shared/flow-typed/shared.types';
import { ContentLink } from 'src/shared/components/contentLink';

type Props = {
  value?: PromoType,
  promoVendorOptions: Array<OptionType>,
  promoTypeOptions: Array<OptionType>,
  promoCodeIndex: number,
  onCarCompanyChangedFn: (*) => void,
  onClearLinkClickedFn: (*) => void,
  onPromoTypeChangedFn: (*) => void
};

class CarPromoCodeCardSection extends Component<Props> {
  render() {
    const {
      value,
      promoVendorOptions,
      promoTypeOptions,
      promoCodeIndex,
      onCarCompanyChangedFn,
      onClearLinkClickedFn,
      onPromoTypeChangedFn
    } = this.props;
    const promoVendorFieldName = `vendor${promoCodeIndex}`;
    const promoTypeFieldName = `type${promoCodeIndex}`;
    const promoCodeFieldName = `code${promoCodeIndex}`;

    const promoVendorValue = _.get(value, 'vendor', '');
    const promoTypeValue = _.get(value, 'type', '');
    const promoCodeValue = _.get(value, 'code', '');
    const promoTypePlaceHolder = i18n(
      _.get(PROMO_CODE.PROMO_TYPE_HOLDER_MAP_TO_I18N_KEY, promoVendorValue, 'CAR_BOOKING__PROMO_TYPE_HOLDER_MAP__ZL')
    );

    return (
      <div className="car-promo-code-card">
        <div className="subheader">
          {`PROMO/DISCOUNT CODE #${promoCodeIndex}`}
          <ContentLink className="clear-button" onClick={onClearLinkClickedFn}>
            Clear
          </ContentLink>
        </div>
        <PromoCodeSelectField
          name={promoVendorFieldName}
          value={promoVendorValue}
          placeholder={'Select Car Company'}
          options={promoVendorOptions}
          onValueChange={onCarCompanyChangedFn}
        />
        <PromoCodeSelectField
          name={promoTypeFieldName}
          value={promoTypeValue}
          disabledSelect={!promoVendorValue}
          placeholder={promoTypePlaceHolder}
          options={promoTypeOptions}
          onValueChange={onPromoTypeChangedFn}
          disablePlaceholder
        />
        <div className="bgwhite car-promo-code-card--code-input">
          <FormInputField
            name={promoCodeFieldName}
            value={promoCodeValue}
            disabled={_.isEmpty(promoTypeValue)}
            placeholder={'Promo Code'}
          />
        </div>
      </div>
    );
  }
}

export default CarPromoCodeCardSection;
