// @flow
import React from 'react';
import dayjs from 'dayjs';

import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import reservationCarRetrievalFormValidator from 'src/shared/form/formValidators/reservationCarRetrievalFormValidator';
import Fields from 'src/shared/components/fields';
import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import Container from 'src/shared/components/container';
import i18n from '@swa-ui/locale';

type Props = {
  formId: string,
  onSubmit: (*) => void,
  lastBookableDate: string
};

class CarReservationRetrievalForm extends React.Component<Props> {
  getDateOptions = () => {
    const lastBookableDate = dayjs(this.props.lastBookableDate);
    const start = dayjs().subtract(6, 'months').startOf('day');
    const end = lastBookableDate.startOf('day');
    const options = [];

    while (start.isSameOrBefore(end)) {
      options.push({ label: start.format('MMMM D, YYYY'), value: start.format('YYYY-MM-DD') });
      start.add(1, 'day');
    }

    return options;
  };

  render() {
    const { onSubmit, formId } = this.props;

    return (
      <div className="reservation-retrieval-form">
        <Container>
          <Form isWidget onSubmit={onSubmit} formId={formId}>
            <Fields type="grouped" divided>
              <FormInputField
                size="huge"
                name="confirmationNumber"
                data-qa="confirmation-number"
                className="reservation-retrieval-form--record-locator"
                placeholder={i18n('SHARED__PLACEHOLDER__CONFIRMATION_NUMBER')}
              />
              <FormInputField
                size="huge"
                name="firstName"
                placeholder={i18n('SHARED__PLACEHOLDER__DRIVERS_FIRST_NAME')}
              />
              <FormInputField
                size="huge"
                name="lastName"
                placeholder={i18n('SHARED__PLACEHOLDER__DRIVERS_LAST_NAME')}
              />
              <FormSelectField
                name="pickupDate"
                placeholder={i18n('SHARED__PLACEHOLDER__PICKUP_DATE')}
                options={this.getDateOptions()}
                caretIcon={false}
              />
              <Segment>
                <Button type="submit" role="submit" size="large" color="yellow" fluid>
                  {i18n('VIEW_RESERVATION__RETRIEVE_RESERVATION')}
                </Button>
              </Segment>
            </Fields>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withForm({
  autoClearFormData: false,
  formValidator: reservationCarRetrievalFormValidator
})(CarReservationRetrievalForm);
