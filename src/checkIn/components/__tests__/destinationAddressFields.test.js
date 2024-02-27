jest.mock('src/shared/components/fullScreenModal/helpers/fullScreenModalHelper', () => ({
  hideFullScreenModal: jest.fn(),
  showFullScreenModal: jest.fn()
}));

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { DestinationAddressFields } from 'src/checkIn/components/destinationAddressFields';
import { hideFullScreenModal, showFullScreenModal } from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';

describe('Destination Address Fields', () => {
  it('should render default correctly', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  it('should render international correctly', () => {
    const component = createComponent({
      isoCountryCode: 'NZ'
    });

    expect(component).toMatchSnapshot();
  });

  it('should show country modal on country click', () => {
    const component = createComponent();

    component.props.children[0].props.onNavItemClick();

    expect(showFullScreenModal).toHaveBeenCalledWith('countryList');
  });

  it('should show country modal on country selected', () => {
    const onCountrySelectedStub = jest.fn();
    const component = createComponent({
      onCountrySelected: onCountrySelectedStub
    });

    component.props.children[5].props.children.props.onSelectedCountry('NZ');

    expect(onCountrySelectedStub).toHaveBeenCalledWith('NZ');
    expect(hideFullScreenModal).toHaveBeenCalledWith('countryList');
  });

  it('should hide country modal on cancel', () => {
    const onCountrySelectedStub = jest.fn();
    const component = createComponent({
      onCountrySelected: onCountrySelectedStub
    });

    component.props.children[5].props.children.props.onCancel();

    expect(hideFullScreenModal).toHaveBeenCalledWith('countryList');
  });

  const createComponent = (props) => {
    const defaultProps = {
      isoCountryCode: 'US'
    };
    const renderer = new ShallowRenderer();
    const combinedProps = { ...defaultProps, ...props };

    renderer.render(<DestinationAddressFields {...combinedProps} />);

    return renderer.getRenderOutput();
  };
});
