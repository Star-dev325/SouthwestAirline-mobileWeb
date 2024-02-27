// @flow
import i18n from '@swa-ui/locale';
import _ from 'lodash';
import React, { Component } from 'react';
import { getPromoTypeListOfSelectedVendor } from 'src/carBooking/helpers/carBookingSearchRequestHelper';
import { transformToCarPromotionSelectOption } from 'src/carBooking/transformers/carVendorTransformer';
import { transformToFormData } from 'src/carBooking/transformers/promoCodesFormTransformer';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import CarPromoCodeCardSection from 'src/shared/form/fields/carPromoCodeCardSection';
import carBookingEnterCodesFormValidator from 'src/shared/form/formValidators/carBookingEnterCodesFormValidator';

import type { CarVendorType, PromoType } from 'src/carBooking/flow-typed/carBooking.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  promos?: Array<PromoType>,
  carVendors: Array<CarVendorType>,
  onChange: (fieldName: string, fieldValue: *) => void,
  onSubmit: (*) => void,
  formData: FormData,
  isWebView?: boolean
};

const VENDOR_FIELD_NAME = 'vendor';
const TYPE_FIELD_NAME = 'type';
const CODE_FIELD_NAME = 'code';

class CarBookingEnterCodesForm extends Component<Props> {
  _onClearLinkClicked = (index: number) => {
    this.props.onChange(`${VENDOR_FIELD_NAME}${index}`, '');
    this.props.onChange(`${TYPE_FIELD_NAME}${index}`, '');
    this.props.onChange(`${CODE_FIELD_NAME}${index}`, '');
  };

  _onCarCompanyChanged = (index: number, fieldValue: string) => {
    this.props.onChange(`${TYPE_FIELD_NAME}${index}`, '');
    this.props.onChange(`${CODE_FIELD_NAME}${index}`, '');
    this.props.onChange(`${VENDOR_FIELD_NAME}${index}`, fieldValue);
  };

  _onPromoTypeChanged = (index: number, fieldValue: string) => {
    this.props.onChange(`${TYPE_FIELD_NAME}${index}`, fieldValue);
  };

  _getCarVendorOptions(carVendors: Array<CarVendorType>) {
    return _.map(carVendors, (vendor) => ({
      value: _.get(vendor, 'carCompany.value'),
      label: _.get(vendor, 'carCompany.label')
    }));
  }

  _transformFormDataToPromoFields(formData: FormData) {
    const promoOne = {
      vendor: formData.vendor1,
      type: formData.type1,
      code: formData.code1
    };
    const promoTwo = {
      vendor: formData.vendor2,
      type: formData.type2,
      code: formData.code2
    };

    return [promoOne, promoTwo];
  }

  render() {
    const { formId, carVendors, formData, onSubmit, isWebView } = this.props;
    const carPromoVendors = transformToCarPromotionSelectOption(carVendors);
    const promoVendorOptions = this._getCarVendorOptions(carPromoVendors);
    const [promo1, promo2] = this._transformFormDataToPromoFields(formData);
    const promoTypeOptions1 = getPromoTypeListOfSelectedVendor(carPromoVendors, promo1.vendor);
    const promoTypeOptions2 = getPromoTypeListOfSelectedVendor(carPromoVendors, promo2.vendor);

    return (
      <Form formId={formId} name="car-promo-codes-form" className="car-promo-codes-form" onSubmit={onSubmit}>
        <PageHeaderWithButtons
          showBackButton={!isWebView}
          title={i18n('CAR_BOOKING__PROMO_CODE__BANNER_TITLE')}
          rightButtons={[
            {
              name: 'Done',
              onClick: onSubmit
            }
          ]}
        />
        <div className="car-promo-code-container">
          <CarPromoCodeCardSection
            value={promo1}
            promoVendorOptions={promoVendorOptions}
            promoTypeOptions={promoTypeOptions1}
            promoCodeIndex={1}
            onCarCompanyChangedFn={(value) => this._onCarCompanyChanged(1, value)}
            onPromoTypeChangedFn={(value) => this._onPromoTypeChanged(1, value)}
            onClearLinkClickedFn={() => this._onClearLinkClicked(1)}
          />
          <CarPromoCodeCardSection
            value={promo2}
            promoVendorOptions={promoVendorOptions}
            promoTypeOptions={promoTypeOptions2}
            promoCodeIndex={2}
            onCarCompanyChangedFn={(value) => this._onCarCompanyChanged(2, value)}
            onPromoTypeChangedFn={(value) => this._onPromoTypeChanged(2, value)}
            onClearLinkClickedFn={() => this._onClearLinkClicked(2)}
          />
        </div>
      </Form>
    );
  }
}

export default withForm({
  defaultValues: ({ promos }: Props) => transformToFormData(promos),
  formValidator: carBookingEnterCodesFormValidator
})(CarBookingEnterCodesForm);
