import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import EarlyBirdPassengerCheckbox from 'src/shared/form/fields/earlyBirdPassengerCheckbox';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('EarlyBirdPassengerCheckbox', () => {
  const passenger = {
    name: 'Iverson Li',
    accountNumber: '1234-ABC',
    canPurchaseEarlyBird: true
  };

  it('should render for passenger that can purchase EB', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call onClickIneligibleLabel when A List user click ineligible label', () => {
    const onClickIneligibleLabelMock = jest.fn();
    const { container } = createComponent({
      passenger: {
        name: 'Iverson Li',
        accountNumber: '1234-ABC',
        canPurchaseEarlyBird: false,
        decisionDescription: 'A-List'
      },
      onClickIneligibleLabel: onClickIneligibleLabelMock
    });

    fireEvent.click(container.querySelector('.early-bird-passenger-checkbox--ineligible-label'));

    expect(onClickIneligibleLabelMock).toHaveBeenCalledWith(i18n('EARLY_BIRD_INELIGIBLE_FOR_A_LIST'));
  });

  it('should call onClickIneligibleLabel when user who purchased earlyBird click ineligible label', () => {
    const onClickIneligibleLabelMock = jest.fn();
    const { container } = createComponent({
      passenger: {
        name: 'Iverson Li',
        accountNumber: '1234-ABC',
        canPurchaseEarlyBird: false,
        decisionDescription: 'Purchased'
      },
      onClickIneligibleLabel: onClickIneligibleLabelMock
    });

    fireEvent.click(container.querySelector('.icon_early-bird'));

    expect(onClickIneligibleLabelMock).toHaveBeenCalledWith(i18n('EARLY_BIRD_INELIGIBLE_FOR_ALREADY_PURCHASE'));
  });

  it('should call onChangeEBCheckbox when user click the EB checkbox', () => {
    const onChangeEBCheckboxStub = jest.fn();
    const { container } = createComponent({
      onChangeEBCheckbox: onChangeEBCheckboxStub
    });

    fireEvent.click(container.querySelector('.checkbox-button'), true);

    expect(onChangeEBCheckboxStub).toHaveBeenCalled();
  });

  const createComponent = (props = {}, formOptions = {}) => {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);
    const defaultProps = {
      passenger,
      onClickIneligibleLabel: () => {},
      onChangeEBCheckbox: () => {}
    };

    return render(
      <MockedForm initialFormData={{ ebPaxCheckBox: true }} onSubmit={() => {}}>
        <EarlyBirdPassengerCheckbox fieldName="ebPaxCheckBox" {...defaultProps} {...props} />
      </MockedForm>
    );
  };
});
