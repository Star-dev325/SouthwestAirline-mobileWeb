import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EnrollSecurityQuestionsBuilder from 'test/builders/model/enrollSecurityQuestionsBuilder';
import EnrollSecurityInfoForm from 'src/enroll/components/enrollSecurityInfoForm';

const securityQuestions = new EnrollSecurityQuestionsBuilder().build();
const minorAcknowledge =
  'I acknowledge that this enrollment is for a Customer who is under 13 years old. I also ' +
  'acknowledge that I am the parent or legal guardian of this child and consent to their participation in the Rapid ' +
  'Rewards® program and / or to receive promotional e - mails.';
const rulesAcknowledge =
  'I acknowledge I have read and accept the ' +
  '<a href="https://www.southwest.com/html/customer-service/faqs.html?topic=rapid_rewards_program_terms_and_conditions">' +
  'Rules and Regulations.</a>';
const minorAgeThreshold = 13;

const defaultProps = {
  formId: 'formId',
  onSubmit: _.noop,
  onValidationFailed: _.noop,
  securityQuestions,
  dateOfBirth: '2000-03-23',
  rulesAcknowledge,
  minorAcknowledge,
  minorAgeThreshold
};

storiesOf('components/enrollSecurityInfoForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollSecurityInfoForm {...defaultProps} />;
  })
  .add('younger than 13', () => {
    const dateOfBirth = dayjs().subtract(10, 'years').format('YYYY-MM-DD');
    return <EnrollSecurityInfoForm {...defaultProps} {...{ dateOfBirth }} />;
  });
