import React from 'react';
import LoadingShimmer from 'src/shared/components/loadingShimmer';
import { mount } from 'enzyme';

describe('LoadingShimmer', () => {
  const childWithSize = <div id="test-div" style={{ height: '1px', width: '1px' }} />;

  describe('when shouldDisplay is true', () => {
    it('should render with height and width', () => {
      const wrapper = createComponent({ styles: { height: '1px', width: '1px' } });

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when shouldDisplay is false', () => {
    it('should not render animate and effect elements', () => {
      const wrapper = createComponent({ shouldDisplay: false }, childWithSize);

      expect(wrapper).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}, children = <div />) => {
    const defaultProps = { shouldDisplay: true };
    const finalProps = { ...defaultProps, ...props };

    return mount(<LoadingShimmer {...finalProps}>{children}</LoadingShimmer>);
  };
});
