import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import TravelAdvisoryNavItem from 'src/homeAndNav/components/travelAdvisoryNavItem';

describe('TravelAdvisoryNavItem', () => {
  let onClickMock;

  beforeEach(() => {
    onClickMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function createComponent(props) {
    const finalProps = { ...props, onClick: onClickMock };

    return render(<TravelAdvisoryNavItem {...finalProps} />);
  }

  it('should render all icons with right class', () => {
    const { container } = createComponent({ travelAdvisories: [{ title: 'test' }] });

    expect(container.querySelector('i.icon_travel-alert')).not.toBeNull();
    expect(container.querySelector('i.icon_keyboard-arrow-right')).not.toBeNull();
  });

  it('should return "Travel Advisory" component when the travelAdvisories has 1 travel advisory', () => {
    const { container } = createComponent({ travelAdvisories: [{ title: 'test' }] });

    expect(container.querySelector('.travel-advisory-nav-item--content').textContent).toEqual(
      i18n('HOME_AND_NAV__TRAVEL_ADVISORY_TITLE')
    );
  });

  it('should return "Travel Advisory (2)" component when the travelAdvisories has 1 travel advisory', () => {
    const { container } = createComponent({ travelAdvisories: [{ title: 'test' }, { title: 'test2' }] });
    const content = container.querySelector('.travel-advisory-nav-item--content');

    expect(content.textContent).toEqual(`${i18n('HOME_AND_NAV__TRAVEL_ADVISORY_TITLE')} (2)`);
  });

  it('should trigger onClick callback after user click the item', () => {
    const { container } = createComponent({ travelAdvisories: [{ title: 'test' }] });

    fireEvent.click(container.querySelector('.travel-advisory-nav-item'));

    expect(onClickMock).toHaveBeenCalled();
  });

  it('should render "Travel Advisory" component with the correct data-a attribute for analytics', () => {
    const { container } = createComponent({ travelAdvisories: [{ title: 'test' }] });

    expect(container.querySelector('[data-a="TRVLADV"]')).not.toBeNull();
  });
});
