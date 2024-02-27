import React from 'react';
import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import HomeNavGrid from 'src/homeAndNav/components/homeNavGrid';

describe('HomeNavGrid', () => {
  let onNavGridItemClickMock;

  beforeEach(() => {
    onNavGridItemClickMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render 6 HomeNavGridItems', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('.home-nav-grid-item')).toHaveLength(6);
  });

  it('should render child item with correct iconType and label', () => {
    const { container } = createComponent();

    expect(container.querySelector('.icon_airplane-depart')).not.toBeNull();
    expect(container.querySelector('.home-nav-grid-item').textContent).toEqual(i18n('HOME_AND_NAV__BOOK_A_FLIGHT'));
  });

  describe('special offer', () => {
    it('should transition to responsive southwest.com special offers page', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelectorAll('.home-nav-grid-item')[2]);

      expect(onNavGridItemClickMock).toHaveBeenCalledWith(
        'https://www.southwest.com/html/specialoffers/air-offers.html',
        true
      );
    });
  });

  it('should render each child item with correct props', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  function createComponent() {
    return render(<HomeNavGrid onNavGridItemClick={onNavGridItemClickMock} />);
  }
});
