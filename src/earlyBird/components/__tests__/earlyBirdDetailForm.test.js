import { render, fireEvent } from '@testing-library/react';
import EarlyBirdDetailForm from 'src/earlyBird/components/earlyBirdDetailForm';
import i18n from '@swa-ui/locale';
import { Provider } from 'react-redux';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';
import EarlyBirdDetailFormDataBuilder from 'test/builders/formData/earlyBirdDetailFormDataBuilder';
import React from 'react';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('EarlyBirdDetailForm', () => {
  let form;
  let onSubmitMock;

  beforeEach(() => {
    onSubmitMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should display EarlyBirdBoundDetailCard', () => {
    form = createEarlyBirdDetailForm();
    expect(form.querySelectorAll('.early-bird-origin-destination-card').length).toBe(2);
  });

  it('should display have selected early bird tips message', () => {
    form = createEarlyBirdDetailForm();
    expect(form.querySelector('.early-bird-detail--message').textContent).toEqual(
      i18n('EARLY_BIRD_HAVE_SELECTED_EARLY_BIRD_TIPS')
    );
  });

  it('should display EarlyBirdPriceSubtotal', () => {
    form = createEarlyBirdDetailForm();
    expect(form.querySelectorAll('.early-bird-price-subtotal').length).toBe(2);
  });

  it('should display EarlyBirdPriceFooter', () => {
    form = createEarlyBirdDetailForm();
    expect(form.querySelector('.early-bird-price-footer')).not.toBeNull();
  });

  it('should submit the correct form data when submit the form', () => {
    form = createEarlyBirdDetailForm({
      initialFormData: new EarlyBirdDetailFormDataBuilder().withNoEBSelected().build()
    });

    fireEvent.click(form.querySelectorAll('.field .checkbox-button')[0]);
    fireEvent.submit(form);

    expect(onSubmitMock).toHaveBeenCalledWith({
      bound_0_ebPaxCheckBox_0: true,
      bound_1_ebPaxCheckBox_0: false
    });
  });

  function getDefaultProps(earlyBirdBounds, initialFormData) {
    return {
      formId: 'ebForm',
      onSubmit: onSubmitMock,
      earlyBirdBounds: earlyBirdBounds,
      initialFormData: initialFormData,
      onClickIneligibleLabel: () => {},
      onChangeEBCheckbox: () => {}
    };
  }

  const createEarlyBirdDetailForm = (props = {}) => {
    const earlyBirdBounds = new EarlyBirdBoundsBuilder().build();
    const initialFormData = new EarlyBirdDetailFormDataBuilder().build();
    const defaultProps = getDefaultProps(earlyBirdBounds, initialFormData);
    const finalProps = { ...defaultProps, ...props };
    const { container } = createComponent(finalProps);

    return container.querySelector('form');
  };

  function createComponent(props) {
    return render(
      <Provider store={createMockedFormStore()}>
        <EarlyBirdDetailForm {...props} />
      </Provider>
    );
  }
});
