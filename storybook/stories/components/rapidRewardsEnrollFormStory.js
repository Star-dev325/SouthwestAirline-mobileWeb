import { storiesOf } from '@storybook/react';
import React from 'react';
import _ from 'lodash';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import RapidRewardsEnrollForm from 'src/myAccount/components/rapidRewardsEnrollForm';
import SharedConstants from 'src/shared/constants/sharedConstants';

const { minorAcknowledge, minorAgeThreshold, rulesAcknowledge } = SharedConstants;

const defaultProps = {
  formId: 'formId',
  onSubmit: _.noop,
  dateOfBirth: '2000-03-23',
  rulesAcknowledge,
  minorAcknowledge,
  minorAgeThreshold
};

storiesOf('components/rapidRewardsEnrollForm', module)
  .addDecorator(StoryReduxProvider(createMockedFormStore()))
  .add('default', () => {
    return <RapidRewardsEnrollForm {...defaultProps} />;
  });
