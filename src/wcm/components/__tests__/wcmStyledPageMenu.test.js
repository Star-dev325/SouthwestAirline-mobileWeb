import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import WcmStyledPageMenu from 'src/wcm/components/wcmStyledPageMenu';

describe('WcmStyledPageMenu component', () => {
  let onClickStub;

  beforeEach(() => {
    onClickStub = jest.fn();
  });

  it('should render an img component', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should trigger onClick callback after user click the component', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('a'));

    expect(onClickStub).toHaveBeenCalledWith({
      link_type: 'app',
      target: 'airbooking'
    });
  });

  const createComponent = () => render(
    <WcmStyledPageMenu
      altText="test"
      image="test.png"
      linkType="app"
      onClick={onClickStub}
      target="airbooking"
      type="menu"
    />
  );
});
