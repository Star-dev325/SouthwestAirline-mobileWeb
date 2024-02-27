import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import EnrollSecurityQuestionsBuilder from 'test/builders/model/enrollSecurityQuestionsBuilder';
import EnrollSecurityQuestionList from 'src/enroll/components/enrollSecurityQuestionList';

const questions = new EnrollSecurityQuestionsBuilder().build();

const securityQuestions = _.map(questions, (value) => ({
  label: `${value}`,
  value
}));

const defaultProps = {
  securityQuestions
};

storiesOf('components/enrollSecurityQuestionList', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <EnrollSecurityQuestionList {...defaultProps} />;
  })
  .add('selected question', () => {
    const selectedSecurityQuestion = questions[2];
    return <EnrollSecurityQuestionList {...defaultProps} {...{ selectedSecurityQuestion }} />;
  });
