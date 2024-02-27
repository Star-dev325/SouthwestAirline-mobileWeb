import { render } from '@testing-library/react';
import React from 'react';
import BasicBanner from 'src/shared/components/basicBanner';

describe('basicBanner', () => {
  it('should render shopping message banner when it is available', () => {
    const props = {
      message: 'test message',
      title: 'test title'
    };

    const { container } = render(<BasicBanner {...props} />);

    expect(container.querySelector('.banner-container--title').textContent).toEqual('test title');
    expect(container.querySelector('.banner-container--subtitle').textContent).toEqual('test message');
  });

  it('should have custom className applied to the container when className is set', () => {
    const props = {
      className: 'some-test-class',
      message: 'test message',
      title: 'test title'
    };

    const { container } = render(<BasicBanner {...props} />);

    expect(container.querySelector('.some-test-class')).not.toBeNull();
  });

  it('should show icon when icon prop is available', () => {
    const props = {
      icon: 'WARNING',
      message: 'test message',
      title: 'test title'
    };

    const { container } = render(<BasicBanner {...props} />);

    expect(container.querySelector('.icon_exclamation-circle')).not.toBeNull();
  });

  it('should not show icon when icon prop is not available', () => {
    const props = {
      message: 'test message',
      title: 'test title'
    };

    const { container } = render(<BasicBanner {...props} />);

    expect(container.querySelector('.icon')).toBeNull();
  });

  it('should show warning icon by default when icon type is unknown', () => {
    const props = {
      icon: 'TEST',
      message: 'test message',
      title: 'test title'
    };

    const { container } = render(<BasicBanner {...props} />);

    expect(container.querySelector('.icon_exclamation-circle')).not.toBeNull();
  });
});
