import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EnrollSecurityQuestionsBuilder from 'test/builders/model/enrollSecurityQuestionsBuilder';
import { EnrollSecurityInfoPage } from 'src/enroll/pages/enrollSecurityInfoPage';

const minorAcknowledge = 'I acknowledge that this enrollment is for a Customer who is under 13 years old.';
const rulesAcknowledge =
  'I acknowledge I have read and accept the <a href="https://www.southwest.com/html/customer' +
  '-service/faqs.html?topic=rapid_rewards_program_terms_and_conditions">Rules and Regulations.</a>';
const enrollSecurityQuestions = new EnrollSecurityQuestionsBuilder().build();

const defaultProps = {
  minorAcknowledge,
  rulesAcknowledge,
  dateOfBirth: '2000-01-23',
  enrollSecurityQuestions,
  getEnrollSecurityQuestionsFn: _.noop,
  createUserAccountFn: _.noop,
  analyticsTrackSubmitFormFn: _.noop,
  updateFormDataValueFn: _.noop
};

storiesOf('pages/enroll/enrollSecurityInfoPage', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollSecurityInfoPage {...defaultProps} />;
  });
