import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import FeaturesList from 'src/shared/components/featuresList';

describe('FeaturesList', () => {
  it('should render correct styles without icon ', () => {
    const { container } = createComponent([
      {
        icon: 'wrong',
        label: 'The Feature'
      }
    ]);

    expect(container).toMatchSnapshot();
  });

  it('should render correct styles with icon ', () => {
    const { container } = createComponent([
      {
        icon: 'check',
        label: 'The Feature'
      }
    ]);

    expect(container).toMatchSnapshot();
  });

  it('should render without suffix', () => {
    const { container } = createComponent([
      {
        icon: 'circle',
        label: 'The Feature'
      }
    ]);

    expect(container.querySelector('.icon_bullet')).not.toBeNull();
    expect(container.querySelector('.features-list--text').textContent).toEqual('The Feature');
  });

  it('should render with suffix', () => {
    const { container } = createComponent([
      {
        icon: 'plus',
        label: 'The Feature',
        suffix: '2'
      }
    ]);

    expect(container.querySelector('.icon_plus')).not.toBeNull();
    expect(container.querySelector('.features-list--text').textContent).toEqual('The Feature2');
  });
});

const createComponent = (features) => render(<FeaturesList {...{ features }} />);
