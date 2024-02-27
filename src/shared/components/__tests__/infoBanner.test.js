import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import InfoBanner from 'src/shared/components/infoBanner';
import * as uiHelper from 'src/shared/helpers/uiHelper';

describe('InfoBanner', () => {
  const scrollToTopMock = jest.spyOn(uiHelper, 'scrollToTop');
  const componentDidUpdateProps = {
    body: 'new body',
    header: 'newHeader'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render banner with header and body', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should not call scrollToTop on componentDidUpdate if shouldScrollToTop is falsy', () => {
    createComponent(componentDidUpdateProps);

    expect(scrollToTopMock).not.toHaveBeenCalled();
  });

  it('should call scrollToTop on componentDidUpdate if shouldScrollToTop is set to true', () => {
    const instance = React.createRef();

    createComponent({
      body: 'new body',
      header: 'newHeader',
      shouldScrollToTop: true,
      ref: instance
    });

    instance.current.componentDidUpdate(instance.current.props);

    expect(scrollToTopMock).toHaveBeenCalled();
  });

  it('should render with className is one is passed in', () => {
    const { container } = createComponent({ className: 'test-classname' });

    expect(container).toMatchSnapshot();
  });

  it('should render learn more link if one is passed in', () => {
    const { container } = createComponent({ learnMoreUrl: 'mock-url' });

    expect(container).toMatchSnapshot();
  });

  it('should render icon that is passed in as iconType', () => {
    const { container } = createComponent({ iconType: 'check-circle' });

    expect(container).toMatchSnapshot();
  });

  it('should render icon color that is passed in', () => {
    const { container } = createComponent({ iconTypeColor: 'error' });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      header: 'This is a header',
      body: 'This is a body',
      learnMoreUrl: null,
      iconTypeColor: null
    };
    const finalProps = { ...defaultProps, ...props };

    return render(<InfoBanner {...finalProps} />);
  };
});
