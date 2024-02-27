// @flow
import React from 'react';
import _ from 'lodash';

import CompanionPersonalInfo from 'src/companion/components/companionPersonalInfo';
import CompanionMissingInfo from 'src/shared/form/fields/companionMissingInfo';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import ShareItineraryEmailFields from 'src/shared/form/fields/shareItineraryEmailFields';
import RedressAndKnownTravelerFields from 'src/shared/form/fields/redressAndKnownTravelerFields';
import ContactMethodFields from 'src/shared/form/fields/contactMethodFields';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import i18n from '@swa-ui/locale';
import { SUBMIT } from 'src/shared/constants/buttonText';
import Button from 'src/shared/components/button';
import companionPassengerFormValidator from 'src/shared/form/formValidators/companionPassengerFormValidator';
import SpecialAssistanceNavItem from 'src/shared/components/specialAssistanceNavItem';

import type { CompanionInfoProps } from 'src/companion/components/companionPersonalInfo';
import type { CompanionPassengerFormData } from 'src/companion/flow-typed/companion.types';
import type { SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';

type Props = {
  formData: CompanionPassengerFormData,
  onSubmit: () => void,
  clickContactMethodFn: () => void,
  contactMethodContent?: ?string,
  declineNotifications: boolean,
  isInternationalBooking: boolean,
  formId: string,
  showContinueButton?: boolean,
  showHeaderButton?: boolean,
  clickSpecialAssistanceFn: () => void,
  specialAssistanceSelections?: SpecialAssistanceType
} & CompanionInfoProps;

export class CompanionPassengerForm extends React.Component<Props, *> {
  static defaultProps = {
    specialAssistanceSelections: {}
  };

  render() {
    const {
      companionInfo,
      onSubmit,
      clickContactMethodFn,
      showHeaderButton,
      formId,
      showContinueButton,
      specialAssistanceSelections,
      clickSpecialAssistanceFn
    } = this.props;

    return (
      <Form formId={formId} className="companion-personal-form" onSubmit={onSubmit}>
        {showHeaderButton && (
          <PageHeaderWithButtons
            title={i18n('COMPANION_PASSENGER_TITLE')}
            subTitle={i18n('COMPANION_PASSENGER_SUB_TITLE')}
            rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__DONE'), type: SUBMIT }]}
          />
        )}
        <div className="px5 pt5">
          <CompanionPersonalInfo companionInfo={companionInfo} />
          <CompanionMissingInfo names={['dateOfBirth', 'gender']} companionInfo={companionInfo} />
          <div>
            <ContactMethodFields clickContactMethodFn={clickContactMethodFn} names={['contactMethodContent']} />
            <Fields type="grouped" label={i18n('COMPANION_EMAIL_RECEIPT_TO')} className="form-fields--receipt-email">
              <FormInputField name="emailReceiptTo" placeholder="Email address" type="email" />
            </Fields>

            <ShareItineraryEmailFields names={['shareItineraryEmail']} />
            <div className="mb6">
              <RedressAndKnownTravelerFields names={['redressNumber', 'knownTravelerNumber']} />
            </div>
            <div className="mb6">
              <SpecialAssistanceNavItem
                onClick={clickSpecialAssistanceFn}
                specialAssistanceSelections={specialAssistanceSelections ? specialAssistanceSelections : {}}
              />
            </div>
          </div>
        </div>
        {showContinueButton && (
          <div className=" mb6 p5 bgpblue bdt bdsdkblue companion-personal-form--footer">
            <Button className="continue" type="submit" color="yellow" size="larger" fluid>
              {i18n('SHARED__BUTTON_TEXT__CONTINUE')}
            </Button>
          </div>
        )}
      </Form>
    );
  }
}

const enhancers = _.flowRight(
  withForm({
    formValidator: companionPassengerFormValidator
  })
);

export default enhancers(CompanionPassengerForm);
