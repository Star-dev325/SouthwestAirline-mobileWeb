import createMockStore from 'test/unit/helpers/createMockStore';
import { SelectCompanyPage } from 'src/airBooking/pages/selectCompanyPage';
import { storiesOf } from '@storybook/react';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import React from 'react';

const mockStore = createMockStore();
const store = mockStore({
  app: {
    toggles: {}
  }
});

const props = {
  activeCompanyIdAssociations: [
    { companyId: '99777777', companyName: 'Hamlin, Hamlin & McGill' },
    { companyId: '99666666', companyName: 'Los Pollos Hermanos' },
    { companyId: '99555555', companyName: 'Madrigal Electromotive' },
    { companyId: '99444444', companyName: 'Mesa Verde Bank' },
    { companyId: '99333333', companyName: 'Saul Goodman & Associates' },
    {
      companyId: '99222222',
      companyName: 'The Mary Poppins School of Super Long Supercalifragilisticexpialidocious Musicals'
    }
  ],
  saveSelectedCompanyFn: () => {}
};

storiesOf('pages/airBooking/selectCompanyPage', module)
  .addDecorator(StoryReduxProvider(store))
  .add('default', () => <SelectCompanyPage {...props} />);
