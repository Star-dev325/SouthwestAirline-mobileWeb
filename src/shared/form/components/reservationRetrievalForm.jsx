// @flow
import React from 'react';
import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import FormInputField from 'src/shared/form/fields/formInputField';
import reservationRetrievalFormValidator from 'src/shared/form/formValidators/reservationRetrievalFormValidator';
import Fields from 'src/shared/components/fields';
import Button from 'src/shared/components/button';
import Segment from 'src/shared/components/segment';
import Container from 'src/shared/components/container';
import i18n from '@swa-ui/locale';

type Props = {
  formId: string,
  onSubmit: (*) => void
};

class ReservationRetrievalForm extends React.Component<Props> {
  render() {
    const { onSubmit, formId } = this.props;

    return (
      <div className="reservation-retrieval-form">
        <Container>
          <Form isWidget onSubmit={onSubmit} formId={formId}>
            <Fields type="grouped" divided>
              <FormInputField
                size="huge"
                name="recordLocator"
                className="reservation-retrieval-form--record-locator"
                placeholder={i18n('SHARED__PLACEHOLDER__CONFIRMATION_NUMBER')}
              />
              <FormInputField size="huge" name="firstName" placeholder={i18n('SHARED__PLACEHOLDER__FIRST_NAME')} />
              <FormInputField size="huge" name="lastName" placeholder={i18n('SHARED__PLACEHOLDER__LAST_NAME')} />
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
  formValidator: reservationRetrievalFormValidator
})(ReservationRetrievalForm);
