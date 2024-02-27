// @flow
import React from 'react';
import i18n from '@swa-ui/locale';

import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import Segment from 'src/shared/components/segment';
import Fields from 'src/shared/components/fields';
import rapidRewardsEnrollFormValidator from 'src/shared/form/formValidators/rapidRewardsEnrollFormValidator';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import AcceptRapidRewardsRulesMessage from 'src/enroll/components/acceptRapidRewardsRulesMessage';
import Button from 'src/shared/components/button';
import ContentLink from 'src/shared/components/contentLink';
import { sitePaths } from 'src/shared/constants/siteLinks';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  onSubmit: (formData: FormData) => void,
  dateOfBirth: string,
  minorAgeThreshold: number
};

class RapidRewardsEnrollForm extends React.Component<Props> {
  _renderDetailsLink = (className) => (
    <ContentLink className={className} href={sitePaths.subscriptionDetails}>
      {i18n('MY_ACCOUNT__ENROLL_FOR_RAPID_REWARDS__SUBSCRIPTION_DETAILS')}
    </ContentLink>
  );

  _renderEmailSubscription = () => (
    <FormCheckboxField
      name="optInForEmailSubscriptions"
      className="checkbox-button-ses"
      size="large"
      childrenClassName="children-ses"
      alignTop
      hideCheckboxButtonClass
    >
      {i18n('MY_ACCOUNT__ENROLL_FOR_RAPID_REWARDS__EMAIL_OPT_IN')}
      <sup>®</sup>
      {this._renderDetailsLink('details-link-ses')}
    </FormCheckboxField>
  );

  render() {
    const { formId, onSubmit, dateOfBirth, minorAgeThreshold } = this.props;

    return (
      <Form formId={formId} onSubmit={onSubmit} className="rapid-rewards-enroll-form">
        <Fields className="email-subscription-fields mb2" type="grouped" divided label={i18n('STAY_CONNECTED')}>
          {this._renderEmailSubscription()}
        </Fields>
        <Segment>
          <FormCheckboxField
            name="rulesAndRegulationsCheckbox"
            className="checkbox-button"
            size="large"
            clickableChildren
          >
            <AcceptRapidRewardsRulesMessage dateOfBirth={dateOfBirth} minorAgeThreshold={minorAgeThreshold} />
          </FormCheckboxField>
        </Segment>
        <Segment color="blue" inverted>
          <Button type="submit" color="yellow" size="huge" fluid>
            Enroll
          </Button>
        </Segment>
        <div className="py3 px5">
          <a href={sitePaths.termsAndConditions} target="_blank" className="pblue">
            {i18n('SHARED__FOOTER__TERMS_AND_CONDITIONS')}
          </a>
        </div>
      </Form>
    );
  }
}

export default withForm({
  formValidator: rapidRewardsEnrollFormValidator,
  defaultValues: () => ({
    rulesAndRegulationsCheckbox: false,
    optInForEmailSubscriptions: true
  })
})(RapidRewardsEnrollForm);
