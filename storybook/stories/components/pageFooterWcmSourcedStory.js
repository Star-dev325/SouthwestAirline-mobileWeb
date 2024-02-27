import React from 'react';
import { storiesOf } from '@storybook/react';
import homeNavMenu from 'mocks/templates/content-delivery/homeNavMenu';
import PageFooterWcmSourced from 'src/shared/components/pageFooterWcmSourced';
import StoryRouter from 'storybook-router';
import configureMockStore from 'redux-mock-store';
import { StoryReduxProvider } from 'storybook/libs/storyReduxProvider';
import { withFakeClock } from 'storybook/libs/withFakeClock';

const store = {
  app: {
    webView: {
      isWebView: false
    }
  }
};

const footerLinkRows = homeNavMenu.results.footer.content.placement.linkRows;

storiesOf('components/pageFooterWcmSourced', module)
  .addDecorator(StoryReduxProvider(configureMockStore()(store)))
  .addDecorator(withFakeClock('2021-03-22'))
  .addDecorator(StoryRouter())
  .add('default', () => {
    return <PageFooterWcmSourced footerLinkRows={footerLinkRows} />;
  });
