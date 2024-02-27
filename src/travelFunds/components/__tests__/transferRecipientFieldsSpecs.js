import React from 'react';
import { shallow } from 'enzyme';

import TransferRecipientFields from 'src/travelFunds/components/transferRecipientFields';

describe('TransferRecipientFields', () => {
  it('should render the component', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  const createComponent = () =>
    shallow(
      <TransferRecipientFields recipientInfoText="mock First name, mock last name, and mock Rapid Rewards® number must match Rapid Rewards account information on file." />
    );
});
