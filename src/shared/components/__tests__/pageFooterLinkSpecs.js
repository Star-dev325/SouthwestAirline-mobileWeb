import React from 'react';
import { shallow } from 'enzyme';
import PageFooterLink from 'src/shared/components/pageFooterLink';

describe('PageFooterLink', () => {
  context('default', () => {
    it('should render a browser link', () => {
      const pageFooterLink = createComponent({
        linkText: 'Link Text',
        linkType: 'browser',
        linkTarget: 'theUrl'
      });

      expect(pageFooterLink).toMatchSnapshot();
    });

    it('should render an app link', () => {
      const pageFooterLink = createComponent({
        linkText: 'Link Text',
        linkType: 'app',
        linkTarget: 'theUrl'
      });

      expect(pageFooterLink).toMatchSnapshot();
    });

    it('should render a webview link', () => {
      const pageFooterLink = createComponent({
        linkText: 'Link Text',
        linkType: 'webview',
        linkTarget: 'theUrl'
      });

      expect(pageFooterLink).toMatchSnapshot();
    });

    it('should render a link with a separator when showSeparator is true', () => {
      const pageFooterLink = createComponent({
        linkText: 'Link Text',
        linkType: 'browser',
        linkTarget: 'theUrl',
        showSeparator: true
      });

      expect(pageFooterLink).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => shallow(<PageFooterLink {...props} />);
});
