import React from 'react';
import { storiesOf } from '@storybook/react';
import configureMockStore from 'redux-mock-store';
import HomeHero from 'src/homeAndNav/components/homeHero';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';

const heroContents = [
  {
    displayType: 'mobile_hero',
    imageForegroundAltText: 'Test Hero 01',
    promoImageBackground: '/content/mkt/images/hero_shots/test-hero-01-background.png',
    linkType: 'app',
    target: 'test01'
  },
  {
    displayType: 'mobile_hero',
    promoImageForeground: '/content/mkt/images/hero_shots/test-hero-02-foreground.png',
    imageForegroundAltText: 'Test Hero 02',
    promoImageBackground: '/content/mkt/images/hero_shots/test-hero-02-background.jpg',
    linkType: 'app',
    target: 'text02'
  }
];

storiesOf('components/HomeHero', module)
  .addDecorator(StoryReduxProvider(configureMockStore()({})))
  .add('default', () => {
    return <HomeHero heroContents={heroContents} />;
  });
