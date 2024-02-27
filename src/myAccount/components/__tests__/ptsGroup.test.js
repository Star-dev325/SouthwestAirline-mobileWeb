import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import PtsGroup from 'src/myAccount/components/ptsGroup';

describe('PtsGroup', () => {
  const onBenefitsClickMock = jest.fn();
  const ptsGroupProps = {
    label: 'label',
    spendablePoints: '33,000',
    onBenefitsClick: onBenefitsClickMock
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createComponent(ptsGroupProps);

    expect(container).toMatchSnapshot();
  });

  it('should call onBenefitsClick when click the view benefits', () => {
    const { container } = createComponent(ptsGroupProps);
    const viewBenefits = container.querySelector('[data-qa="view-benefits"]');

    fireEvent.click(viewBenefits);

    expect(onBenefitsClickMock).toHaveBeenCalled();
  });
});

function createComponent(props) {
  return render(<PtsGroup {...props} />);
}
