jest.mock('src/shared/helpers/deviceInfo', () => ({
  os: {
    name: 'Android'
  }
}));
import { render } from '@testing-library/react';
import React from 'react';
import HomeNavList from 'src/homeAndNav/components/homeNavList';
import deviceInfo from 'src/shared/helpers/deviceInfo';

describe('HomeNavList', () => {
  let homepagePromotions;

  beforeEach(() => {
    homepagePromotions = [
      {
        alt: '',
        description: '',
        id: '',
        image: 'image',
        link_type: 'link_type',
        'promotion-image': '',
        target: 'target',
        title: 'Flying Southwest'
      },
      {
        alt: '',
        description: '',
        id: '',
        image: 'image',
        link_type: 'link_type',
        'promotion-image': '',
        target: 'target',
        title: 'Book a car with us'
      }
    ];
  });

  afterEach(() => {
    jest.clearAllMocks();
    deviceInfo.os = { name: 'Android' };
  });

  describe('nav list items', () => {
    it('should render 2 list items when device is not android or ios', () => {
      deviceInfo.os = { name: 'Windows' };

      const { container } = createComponent({ homepagePromotions });

      expect(container.querySelectorAll('.rich-nav-item')).toHaveLength(2);
      expect(container.querySelectorAll('.rich-nav-item--title')[0].textContent).toEqual('Flying Southwest');
      expect(container.querySelectorAll('.rich-nav-item--title')[1].textContent).toEqual('Book a car with us');
    });

    it('should render GetTheAppNavItem when device is android or ios', () => {
      deviceInfo.os = { name: 'iOS' };

      const { container } = createComponent({ homepagePromotions });

      expect(container.querySelector('.rich-nav-item')).not.toBeNull();
    });
  });

  function createComponent(props) {
    return render(<HomeNavList {...props} />);
  }
});
