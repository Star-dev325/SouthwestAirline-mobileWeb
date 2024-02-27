import React from 'react';
import { mount } from 'enzyme';

import ConfirmationNumber from 'src/shared/components/confirmationNumber';

describe('Confirmation number', () => {
  it('should render correct confirmation number', () => {
    const wrapper = createComponent({ confirmationNumber: 'HN2L3R' });

    expect(wrapper).to.contain.text('CONFIRMATION #');
    expect(wrapper).to.contain.text('HN2L3R');
  });

  const createComponent = (props) => mount(<ConfirmationNumber {...props} />);
});
