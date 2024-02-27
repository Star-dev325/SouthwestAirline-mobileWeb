// @flow
import React from 'react';
import _ from 'lodash';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import Fields from 'src/shared/components/fields';
import i18n from '@swa-ui/locale';

import type { CarExtraProductType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  carExtras: Array<CarExtraProductType>
};

class CarExtras extends React.Component<Props> {
  render() {
    const { carExtras } = this.props;

    if (_.isEmpty(carExtras)) {
      return null;
    }

    return (
      <div>
        <div data-testid="car-extra" className="bgpblue white px5 py3 xxlarge">{i18n('CAR_BOOKING__PRICING_EXTRAS__TITLE')}</div>
        <div className="p5 gray5 bgwhite large">
          <div>{i18n('CAR_BOOKING__PRICING_EXTRAS__PAY_AT_COUNTER')}</div>
          <Fields>
            {_.map(carExtras, (carExtra, index: number) => (
              <FormCheckboxField
                data-qa={`car-booking-extras-checkbox-${index}`}
                key={index}
                className="pt5"
                name={carExtra.type}
                clickableChildren
              >
                <div className="xlarge" dangerouslySetInnerHTML={{ __html: carExtra.description }} />
              </FormCheckboxField>
            ))}
          </Fields>
          <div className="pt4">{i18n('CAR_BOOKING__PRICING_EXTRAS__ADDITIONAL_CHARGES')}</div>
          <div>{i18n('CAR_BOOKING__PRICING_EXTRAS__EQUIPMENT_AVAILABILITY')}</div>
          <div>{i18n('CAR_BOOKING__PRICING_EXTRAS__CONTACT_FOR_INFORMATION')}</div>
        </div>
      </div>
    );
  }
}

module.exports = CarExtras;
