import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import FormNavItemField from 'src/shared/form/fields/formNavItemField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('formNavItemField', () => {
  let onSubmitStub;
  let onNavItemClickStub;

  it('should provide icon and iconClassName to NavItemLink', () => {
    const { container } = createComponent({ icon: 'a', iconClassName: 'class' });

    expect(container).toMatchSnapshot();
  });

  describe('when has value', () => {
    it('should display the placeholder', () => {
      const { container } = createComponent();

      expect(container.querySelector('a.nav-item-field').textContent).toContain('placeholder');
    });

    it('should display the value', () => {
      const { container } = createComponent();

      expect(container.querySelector('[data-qa="nav-item-field-value"]').textContent).toContain('nav item value');
    });
  });

  describe('when value is empty', () => {
    it('should not display the empty string', () => {
      const { container } = createComponent({}, '');

      expect(container.querySelector('[data-qa="nav-item-field-value"]').textContent).toEqual('');
    });
  });

  it('should not display the value when shouldShowDisplayValue is false', () => {
    const { container } = createComponent({ shouldShowDisplayValue: false });

    expect(container.querySelector('[data-qa="nav-item-field-value"]').textContent).toEqual('');
  });

  describe('when disabled', () => {
    it('should not call onNavItemClick method when pass disabled is true', () => {
      const { container } = createComponent({ disabled: true });

      fireEvent.click(container.querySelector('.nav-item-field'));

      expect(onNavItemClickStub).not.toHaveBeenCalled();
    });

    it('should render a disabled link', () => {
      const { container } = createComponent({ disabled: true });

      expect(container.querySelector('.nav-item-link_disabled')).not.toBeNull();
    });
  });

  describe('when enabled', () => {
    it('should call onNavItemClick method', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.nav-item-field'));

      expect(onNavItemClickStub).toHaveBeenCalled();
    });
  });

  function createComponent(props = {}, initialValue = 'nav item value', formOptions = {}) {
    onSubmitStub = jest.fn();
    onNavItemClickStub = jest.fn();
    const defaultProps = {
      onNavItemClick: onNavItemClickStub,
      placeholder: 'placeholder'
    };
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return render(
      <MockedForm initialFormData={{ navItem: initialValue }} onSubmit={onSubmitStub}>
        <FormNavItemField name="navItem" {...defaultProps} {...props} />
      </MockedForm>
    );
  }
});
