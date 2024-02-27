import { storiesOf } from '@storybook/react';
import React from 'react';
import EarlyBirdBound from 'src/shared/components/earlyBirdBound';
import EarlyBirdInPathApiResponseBuilder from 'test/builders/apiResponse/earlyBirdInPathBoundBuilder';

const { bounds } = new EarlyBirdInPathApiResponseBuilder().singleAdultOneWayEligibleEarlyBird().build();

storiesOf('components/earlyBirdBound', module).add('default', () => {
  return <EarlyBirdBound bound={bounds[0]} />;
});
