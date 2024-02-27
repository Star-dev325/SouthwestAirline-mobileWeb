import CompanyNameBanner from 'src/shared/components/companyNameBanner';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('components/companyNameBanner', module).add('default', () => (
  <CompanyNameBanner selectedCompanyName="Dunder Mifflin Paper Company" />
));
