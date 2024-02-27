import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Fields from 'src/shared/components/fields';

describe('Fields', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display label if passed in', () => {
    const { container } = createComponent({ label: 'passedInLabel' });

    expect(container).toMatchSnapshot();
  });

  it('should display secondaryLabel if passed in', () => {
    const { container } = createComponent({ secondaryLabel: 'passedInSecondaryLabel' });

    expect(container).toMatchSnapshot();
  });

  it('should add className to div className if passed in', () => {
    const { container } = createComponent({ className: 'classPassedIn' });

    expect(container.querySelector('div')).toMatchSnapshot();
  });

  describe('divided className', () => {
    it('should set to true if passed in', () => {
      const { container } = createComponent({ divided: true });

      expect(container.querySelector('div')).toMatchSnapshot();
    });

    it('should set to false if passed in', () => {
      const { container } = createComponent({ divided: false });

      expect(container.querySelector('div')).toMatchSnapshot();
    });

    it('should set to false if not passed in', () => {
      const { container } = createComponent({});

      expect(container.querySelector('div')).toMatchSnapshot();
    });
  });

  it('should add class object if type passed in', () => {
    const { container } = createComponent({ type: 'row' });

    expect(container.querySelector('div')).toMatchSnapshot();
  });

  it('should render any children', () => {
    const { container } = render(
      <Fields>
        <h1>Test</h1>
      </Fields>
    );

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}) => render(<Fields {...props} />);
});
