import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import PaxSubtitle from 'src/myAccount/components/paxSubtitle';

describe('PaxSubtitle', () => {
  it('should render passenger line with correct number of passengers', () => {
    const props = {
      numberOfAdult: 50
    };
    const { container } = createComponent(props);

    expect(container.querySelector('[data-qa="passengers-only"]').textContent).toEqual(
      `50 ${i18n('MY_ACCOUNT__PAX_SUB_TITLE__PAX_TYPE_PASSENGERS')}`
    );
  });
});

function createComponent(props) {
  return render(<PaxSubtitle numberOfAdult={props.numberOfAdult} />);
}
