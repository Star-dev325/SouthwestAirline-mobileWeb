import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';

import { PageHeader } from 'src/shared/components/pageHeader';

describe('PageHeader', () => {
  const createComponent = (props = {}) => {
    const defaultProps = {
      isWebView: false
    };
    const mergedProps = _.merge({}, defaultProps, props);

    return shallow(
      <PageHeader {...mergedProps}>
        <div>Hello world!</div>
      </PageHeader>
    );
  };

  context('when given children', () => {
    it('should show those children', () => {
      const pageHeader = createComponent();

      expect(pageHeader).toMatchSnapshot();
    });
  });

  context('when props.hidden is false', () => {
    it('should display page header', () => {
      const pageHeader = createComponent({ hidden: false });

      expect(pageHeader).toMatchSnapshot();
    });
  });

  context('when props.hidden is true', () => {
    it('should not display page header', () => {
      const pageHeader = createComponent({ hidden: true });

      expect(pageHeader).toMatchSnapshot();
    });
  });

  context('when props.noBottomPadding is true', () => {
    context('when isWebView true', () => {
      it('should add classname page-header--no-bottom-padding when isWebView true', () => {
        const pageHeader = createComponent({ noBottomPadding: true, isWebView: true });

        expect(pageHeader).toMatchSnapshot();
      });
    });

    context('when isWebView true', () => {
      it('should not add classname page-header--no-bottom-padding when isWebView false', () => {
        const pageHeader = createComponent({ noBottomPadding: true, isWebView: false });

        expect(pageHeader).toMatchSnapshot();
      });
    });
  });

  context('when props.noBottomPadding is false', () => {
    const pageHeader = createComponent({ noBottomPadding: false, isWebView: true });

    expect(pageHeader).toMatchSnapshot();
  });

  context('when isWebView is true', () => {
    it('should have webview-page-header id and it should have sticky header padding', () => {
      const pageHeader = createComponent({ isWebView: true });

      expect(pageHeader).toMatchSnapshot();
    });
  });

  context('when isWebView is false', () => {
    it('should not have webview-page-header id', () => {
      const pageHeader = createComponent({ isWebView: false });

      expect(pageHeader).toMatchSnapshot();
    });
  });
});
