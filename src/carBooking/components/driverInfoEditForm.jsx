// @flow
import React from 'react';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import { DRIVER_INFO_BUTTON } from 'src/carBooking/constants/carBookingMessages';
import DriverInfoFields from 'src/carBooking/components/driverInfoFields';
import CarBookingEditDriverInfoFormValidator from 'src/shared/form/formValidators/carBookingEditDriverInfoFormValidator';
import i18n from '@swa-ui/locale';

import type { DriverInfoType } from 'src/carBooking/flow-typed/carBooking.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  onSubmit: (formData: FormData) => void,
  initialFormData: ?DriverInfoType
};

class DriverInfoEditForm extends React.Component<Props> {
  render() {
    const { formId, onSubmit } = this.props;

    return (
      <Form
        formId={formId}
        name="car-booking-driver-info-edit"
        className="car-booking-driver-info-edit-form"
        onSubmit={onSubmit}
      >
        <PageHeaderWithButtons
          title={i18n('CAR_BOOKING__DRIVER_INFO__TITLE')}
          rightButtons={[
            {
              name: i18n('CAR_BOOKING__DRIVER_INFO__BUTTON_LABEL'),
              type: DRIVER_INFO_BUTTON.TYPE
            }
          ]}
        />
        <DriverInfoFields />
      </Form>
    );
  }
}

export default withForm({
  formValidator: CarBookingEditDriverInfoFormValidator
})(DriverInfoEditForm);
