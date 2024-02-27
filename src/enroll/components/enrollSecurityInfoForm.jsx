// @flow

import React from 'react';
import _ from 'lodash';
import Fields from 'src/shared/components/fields';
import Form from 'src/shared/form/components/form';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import withForm from 'src/shared/form/enhancers/withForm';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import EnrollSecurityQuestionList from 'src/enroll/components/enrollSecurityQuestionList';
import FormNavItemFieldWithOptions from 'src/shared/form/fields/formNavItemField';
import AcceptRapidRewardsRulesMessage from 'src/enroll/components/acceptRapidRewardsRulesMessage';
import FullScreenModal from 'src/shared/components/fullScreenModal/fullScreenModal';
import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import EnrollSecurityInfoFormValidator from 'src/shared/form/formValidators/enrollSecurityInfoFormValidator';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';
import { sitePaths } from 'src/shared/constants/siteLinks';

type Props = {
  securityQuestions: Array<string>,
  dateOfBirth: string,
  formId: string,
  formData: FormData,
  onSubmit: () => void,
  onValidationFailed: () => void,
  onChange: (fieldName: string, fieldValue: *) => void,
  minorAgeThreshold: number
};

const SECURITY_QUESTION1_LIST_MODAL_ID = 'SECURITY_QUESTION1_LIST_MODAL_ID';
const SECURITY_QUESTION2_LIST_MODAL_ID = 'SECURITY_QUESTION2_LIST_MODAL_ID';

export class EnrollSecurityInfoForm extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.currentField = 'userName';
  }

  currentField: *;

  _showFullScreenModal = (currentField: *, modalId: string) => {
    this.currentField = currentField;
    this._clearLinkedAnswer(this.currentField);
    showFullScreenModal(modalId);
  };

  _clearLinkedAnswer = (questionFieldName: string) => {
    const { onChange } = this.props;

    if (questionFieldName === 'question1') {
      onChange('answer1', '');
    } else if (questionFieldName === 'question2') {
      onChange('answer2', '');
    }
  };

  _getSelectedSecurityQuestion = () => _.get(this.props, `formData.${this.currentField}`) || '';

  _onQuestionSelected = (fieldData: *) => {
    const { onChange } = this.props;

    hideFullScreenModal(SECURITY_QUESTION1_LIST_MODAL_ID);
    hideFullScreenModal(SECURITY_QUESTION2_LIST_MODAL_ID);
    onChange(this.currentField, fieldData);
  };

  _convertSecurityQuestionsToOptions = () => {
    const { securityQuestions } = this.props;

    return _.map(securityQuestions, (value) => ({
      label: `${value}`,
      value
    }));
  };

  _renderPasswordHelperText() {
    return (
      <div className="helper-text">
        <p className="helper-text--title">{i18n('ENROLL_HELPER_TEXT_PASSWORD_TITLE')}</p>
        <p className="helper-text--uppercase-letter">{i18n('ENROLL_HELPER_TEXT_PASSWORD_RULE_UPPERCASE_LETTER')}</p>
        <p className="helper-text--number">{i18n('ENROLL_HELPER_TEXT_PASSWORD_RULE_NUMBER')}</p>
        <div>
          {i18n('ENROLL_HELPER_TEXT_PASSWORD_RULE_SPECIAL_CHARACTER')}
          <div className="helper-text--special-character-specification">
            <span className="helper-text--special-character_include">
              {i18n('ENROLL_HELPER_TEXT_PASSWORD_SPECIAL_CHARACTERS')}
            </span>
            <span className="helper-text--special-character_not-include">
              {i18n('ENROLL_HELPER_TEXT_PASSWORD_SPECIAL_CHARACTERS_NOT_INCLUDE')}
            </span>
            <p className="helper-text--special-character_hint">
              {i18n('ENROLL_HELPER_TEXT_PASSWORD_SPECIAL_CHARACTERS_HINT')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { formId, formData, onSubmit, onValidationFailed, dateOfBirth, minorAgeThreshold } = this.props;

    return (
      <div>
        <Form
          formId={formId}
          className="enroll-security-info-form"
          onSubmit={onSubmit}
          onValidationFailed={onValidationFailed}
        >
          <Segments>
            <Segment ordinality="secondary">
              <Fields type="grouped" divided label="ACCOUNT ACCESS">
                <FormInputField name="userName" placeholder="Username" />
                <FormInputField name="password" placeholder="Password" type="password" autocomplete="off" />
                <FormInputField
                  name="confirmedPassword"
                  placeholder="Confirm password"
                  type="password"
                  autocomplete="off"
                />
                {this._renderPasswordHelperText()}
              </Fields>
            </Segment>

            <Segment ordinality="secondary">
              <Fields type="grouped" divided label="SECURITY QUESTIONS">
                <FormNavItemFieldWithOptions
                  className="security-question-nav-field"
                  name={'question1'}
                  onNavItemClick={() => this._showFullScreenModal('question1', SECURITY_QUESTION1_LIST_MODAL_ID)}
                  placeholder={'Choose your security question'}
                />
                <FormInputField name="answer1" placeholder="Answer" autocomplete="off" />
                <FormNavItemFieldWithOptions
                  className="security-question-nav-field"
                  name={'question2'}
                  onNavItemClick={() => this._showFullScreenModal('question2', SECURITY_QUESTION2_LIST_MODAL_ID)}
                  placeholder={'Choose your security question'}
                />
                <FormInputField name="answer2" placeholder="Answer" autocomplete="off" />
                <FormInputField name="promoCode" placeholder="Enrollment promo code (optional)" />
              </Fields>
              <FormCheckboxField
                name="acceptRulesAndRegulations"
                data-qa="acceptRulesCheckbox"
                className="checkbox-button"
                size="large"
                alignTop
              >
                <AcceptRapidRewardsRulesMessage dateOfBirth={dateOfBirth} minorAgeThreshold={minorAgeThreshold} />
              </FormCheckboxField>
            </Segment>

            <Segment color="blue" inverted>
              <Button className="continue" data-qa="continue-button" type="submit" color="yellow" size="huge" fluid>
                {i18n('ENROLL_CREATE_ACCOUNT')}
              </Button>
            </Segment>
            <Segment>
              <a href={sitePaths.termsAndConditions} target="_blank" className="pblue">
                {i18n('SHARED__FOOTER__TERMS_AND_CONDITIONS')}
              </a>
            </Segment>
          </Segments>
        </Form>

        <FullScreenModal id={SECURITY_QUESTION1_LIST_MODAL_ID}>
          <EnrollSecurityQuestionList
            securityQuestions={this._convertSecurityQuestionsToOptions()}
            selectedSecurityQuestion={this._getSelectedSecurityQuestion}
            excludeFieldValue={formData.question2}
            onSelectedQuestion={this._onQuestionSelected}
          />
        </FullScreenModal>
        <FullScreenModal id={SECURITY_QUESTION2_LIST_MODAL_ID}>
          <EnrollSecurityQuestionList
            securityQuestions={this._convertSecurityQuestionsToOptions()}
            selectedSecurityQuestion={this._getSelectedSecurityQuestion}
            excludeFieldValue={formData.question1}
            onSelectedQuestion={this._onQuestionSelected}
          />
        </FullScreenModal>
      </div>
    );
  }
}

export default withForm({
  autoClearFormData: true,
  formValidator: EnrollSecurityInfoFormValidator,
  defaultValues: () => ({
    acceptRulesAndRegulations: false
  })
})(EnrollSecurityInfoForm);
