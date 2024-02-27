import deviceInfo from 'src/shared/helpers/deviceInfo';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GetTheAppNavItem from 'src/homeAndNav/components/getTheAppNavItem';

jest.mock('src/shared/helpers/deviceInfo');

describe('getTheAppNavItem', () => {
  const onClickMock = jest.fn();
  const originalDeviceOS = deviceInfo.os;

  beforeEach(() => {
    deviceInfo.os = { name: 'iOS' };
  });

  afterEach(() => {
    deviceInfo.os = originalDeviceOS;
    jest.clearAllMocks();
  });

  it('should render image for get the app nav item', () => {
    const { container } = createComponent();

    expect(container.querySelector('.image-promo--swa-app')).not.toBeNull();
  });

  it('should render title and description for get the app nav item', () => {
    const { container } = createComponent();

    expect(container.textContent).toContain('Get the app');
    expect(container.textContent).toContain('Retrieve reservation, checkin for upcoming flights & more');
  });

  it('should trigger onClick prop when user click it', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelector('a'));

    expect(onClickMock).toHaveBeenCalledWith({
      link_type: 'browser',
      target: 'https://itunes.apple.com/us/app/southwest-airlines/id344542975'
    });
  });

  it('should trigger onClick prop with android link when user use Android device', () => {
    deviceInfo.os = { name: 'Android' };

    const { container } = createComponent();

    fireEvent.click(container.querySelector('a'));

    expect(onClickMock).toHaveBeenCalledWith({
      link_type: 'browser',
      target: 'https://play.google.com/store/apps/details?id=com.southwestairlines.mobile&hl=en'
    });
  });

  it('should return null when device is not android or ios', () => {
    deviceInfo.os = { name: 'Windows' };

    const { container } = createComponent();

    expect(container).not.toBeNull();
  });

  const createComponent = () => render(<GetTheAppNavItem onClick={onClickMock} />);
});
