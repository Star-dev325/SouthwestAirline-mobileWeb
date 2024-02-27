import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import HomeNavGridItem from 'src/homeAndNav/components/homeNavGridItem';

describe('HomeNavGridItem', () => {
  const onClickMock = jest.fn();

  it('should render correct icon classname', () => {
    const { container } = createComponent({
      iconType: 'airplane-depart'
    });

    expect(container.querySelector('i.home-nav-grid-item--icon')).toHaveAttribute(
      'class',
      'home-nav-grid-item--icon icon icon_airplane-depart'
    );
  });

  it('should include correct label', () => {
    const { container } = createComponent({
      label: 'CHECK IN'
    });

    expect(container.querySelector('span').textContent).toContain('CHECK IN');
  });

  it('should trigger onClick callback when click item', () => {
    const { container } = createComponent({
      label: 'CHECK IN'
    });

    fireEvent.click(container.querySelector('.home-nav-grid-item'));

    expect(onClickMock).toHaveBeenCalled();
  });

  describe('data-a attribute for analytics', () => {
    it('should render with data-a attribute, if provided', () => {
      const { container } = createComponent({
        label: 'CHECK IN',
        data_a: 'CHKIN'
      });

      expect(container.querySelector('.home-nav-grid-item')).toHaveAttribute('data-a', 'CHKIN');
    });

    it('should not render with data-a attribute, if one was not provided', () => {
      const { container } = createComponent({
        label: 'CHECK IN'
      });

      expect(container.querySelector('.home-nav-grid-item')).not.toHaveAttribute('data-a');
    });
  });

  describe('data-qa attribute for automation tests', () => {
    it('should render with data-qa attribute, if provided', () => {
      const { container } = createComponent({
        label: 'CHECK IN',
        dataQa: 'home-nav-check-in'
      });

      expect(container.querySelector('.home-nav-grid-item')).toHaveAttribute('data-qa', 'home-nav-check-in');
    });

    it('should not render with data-qa attribute, if one was not provided', () => {
      const { container } = createComponent({
        label: 'CHECK IN'
      });

      expect(container.querySelector('.home-nav-grid-item')).not.toHaveAttribute('data-qa');
    });
  });

  const createComponent = (props) => {
    const finalProps = { ...props, onClick: onClickMock };

    return render(<HomeNavGridItem {...finalProps} />);
  };
});
