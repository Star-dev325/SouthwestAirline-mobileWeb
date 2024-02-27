// @flow
import React from 'react';
import _ from 'lodash';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import CarExtras from 'src/carBooking/components/carExtras';
import CarPricingFooter from 'src/carBooking/components/carPricingFooter';
import CarBookingTotalPrice from 'src/carBooking/components/carBookingTotalPrice';
import Button from 'src/shared/components/button';
import i18n from '@swa-ui/locale';

import type { Push } from 'src/shared/flow-typed/shared.types';
import type { CarReservationType, CarExtraProductType } from 'src/carBooking/flow-typed/carBooking.types';

type Props = {
  formId: string,
  carExtras: Array<CarExtraProductType>,
  productId: string,
  carReservation: CarReservationType,
  onSubmit: (*) => void,
  className: string,
  isWebView?: boolean,
  push: Push
};

class CarExtrasForm extends React.Component<Props> {
  render() {
    const { formId, carExtras, productId, carReservation, onSubmit, className, isWebView, push } = this.props;

    return (
      <Form name={'car-extras-form'} formId={formId} onSubmit={onSubmit} className="car-extras-form">
        <div className={className}>
          {!_.isEmpty(carExtras) && <CarExtras carExtras={carExtras} />}
          <CarPricingFooter productId={productId} isWebView={isWebView} push={push} />
        </div>
        <CarBookingTotalPrice carReservation={carReservation} />
        <div className="bgpblue p4">
          <Button size="larger" color="yellow" type="submit" role="submit" fluid>
            {i18n('CAR_BOOKING__CONTINUE')}
          </Button>
        </div>
      </Form>
    );
  }
}

export default withForm({})(CarExtrasForm);
