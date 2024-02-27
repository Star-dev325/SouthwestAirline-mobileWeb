import { ContentLink } from 'src/shared/components/contentLink';
import { shallow, mount } from 'enzyme';
import React from 'react';
import _ from 'lodash';

const fareRulesWithLinks =
  'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.';
const baseProps = {
  className: 'mock-class',
  id: 'mock-id',
  dataQa: 'mock-data-qa'
};

describe('ContentLink', () => {
  context('default', () => {
    it('should render with href', () => {
      const comp = shallow(
        <ContentLink {...baseProps} href="/link">
          This is a link
        </ContentLink>
      );

      expect(comp).toMatchSnapshot();
    });

    it('should render with provided target', () => {
      const comp = shallow(
        <ContentLink {...baseProps} href="/link" target="_self">
          This is a link
        </ContentLink>
      );

      expect(comp).toMatchSnapshot();
    });

    it('should render with raw html', () => {
      const comp = mount(<ContentLink raw={fareRulesWithLinks}>This is a link</ContentLink>);

      expect(comp.text()).to.equal('Please read fare rules associated with purchase.');
      expect(comp.html()).to.contain('https://mobile.southwest.com/fare-rules');
      expect(comp.html()).to.contain('_blank');
    });

    it('should not render anchor when hidden', () => {
      const comp = shallow(
        <ContentLink href="/link" hidden>
          This is a link
        </ContentLink>
      );

      expect(comp.text()).to.equal('');
      expect(comp.find('a')).not.to.exist;
    });

    it('should render only text when missing required href', () => {
      const comp = shallow(<ContentLink {...baseProps}>This is a link</ContentLink>);

      expect(comp).toMatchSnapshot();
    });

    it('should render button with onClick', () => {
      const comp = shallow(
        <ContentLink {...baseProps} onClick={_.noop}>
          This is a link
        </ContentLink>
      );

      expect(comp).toMatchSnapshot();
    });

    it('should not render anchor when missing required props', () => {
      const comp = shallow(<ContentLink />);

      expect(comp.text()).to.equal('');
      expect(comp.find('a')).not.to.exist;
    });
  });

  context('with web view', () => {
    it('should render with href', () => {
      const comp = shallow(
        <ContentLink {...baseProps} href="/link" isWebView>
          This is a link
        </ContentLink>
      );

      expect(comp).toMatchSnapshot();
    });

    it('should render with raw and open in new tab', () => {
      const comp = shallow(
        <ContentLink raw={fareRulesWithLinks} isWebView shouldOpenLinkInSelf={false}>
          This is a link
        </ContentLink>
      );

      expect(comp).toMatchSnapshot();
    });

    it('should render with raw html', () => {
      const comp = mount(
        <ContentLink raw={fareRulesWithLinks} isWebView>
          This is a link
        </ContentLink>
      );

      expect(comp.text()).to.equal('Please read fare rules associated with purchase.');
      expect(comp.html()).to.contain('https://mobile.southwest.com/fare-rules');
      expect(comp.html()).to.contain('_self');
    });

    it('should not render anchor when hidden', () => {
      const comp = shallow(
        <ContentLink {...baseProps} href="/link" hidden isWebView>
          This is a link
        </ContentLink>
      );

      expect(comp.text()).to.equal('');
      expect(comp.find('a')).not.to.exist;
    });

    it('should render only text when missing required href', () => {
      const comp = shallow(
        <ContentLink {...baseProps} isWebView>
          This is a link
        </ContentLink>
      );

      expect(comp).toMatchSnapshot();
    });
  });
});
