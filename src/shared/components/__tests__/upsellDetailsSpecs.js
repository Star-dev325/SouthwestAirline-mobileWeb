import React from 'react';
import { shallow } from 'enzyme';
import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';
import UpsellDetails from 'src/shared/components/upsellDetails';

context('UpsellDetails', () => {
  it('should render correctly', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  it('should not show header if shouldRenderHeader is false', () => {
    const component = createComponent({ shouldRenderHeader: false });

    expect(component).toMatchSnapshot();
  });

  it('should not show button if shouldRenderUpgradeButton is false', () => {
    const component = createComponent({ shouldRenderUpgradeButton: false });

    expect(component).toMatchSnapshot();
  });

  it('should render correctly if labelText is provided', () => {
    const component = createComponent({ labelText: 'Test selection text' });

    expect(component).toMatchSnapshot();
  });

  it('should render correctly if offerIcon is not provided', () => {
    const component = createComponent({ offerIcon: undefined });

    expect(component).toMatchSnapshot();
  });

  it('should render correctly if stylizedOfferTitle exists', () => {
    const component = createComponent({
      stylizedOfferTitle: [
        {
          inverseLabelColor: 'neutral-white',
          label: 'Upgrade to Wanna Get Away',
          primaryLabelColor: 'primary-dark-blue'
        },
        {
          font: 'Fairwater Script',
          inverseLabelColor: 'neutral-white',
          label: ' plus',
          primaryLabelColor: 'primary-red'
        }
      ] });

    expect(component).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = new ViewReservationBuilder().withUpsellDetails().build().viewReservationViewPage.upsellDetails;

    return shallow(<UpsellDetails {...{ ...defaultProps, ...props }} />);
  };
});
