import React from 'react';
import { shallow } from 'enzyme';
import CheckboxButton from 'src/shared/components/checkboxButton';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

describe('CheckboxButton', () => {
  let containerWrapper;

  it('should checked when defaultChecked is true', () => {
    containerWrapper = createComponent({ defaultChecked: true });

    expect(containerWrapper.find('.checkbox-button_checked')).to.be.present();
  });

  it('should not checked when defaultChecked is false', () => {
    containerWrapper = createComponent({ defaultChecked: false });

    expect(containerWrapper.find('.checkbox-button_checked')).to.not.be.present();
  });

  it('should disabled when disabled is true', () => {
    containerWrapper = createComponent({ disabled: true });

    expect(containerWrapper.find('.invisible')).to.be.present();
  });

  it('should not disabled when disabled is false', () => {
    containerWrapper = createComponent({ disabled: false });

    expect(containerWrapper.find('.invisible')).to.not.be.present();
  });

  it('should checked after click checkbox button and defaultChecked is false', () => {
    containerWrapper = createComponent({ defaultChecked: false });
    click(containerWrapper);

    expect(containerWrapper.find('.checkbox-button_checked')).to.be.present();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      defaultChecked: false,
      disabled: false
    };

    return shallow(
      <CheckboxButton {...defaultProps} {...props}>
        CheckboxButton
      </CheckboxButton>
    );
  };
});
