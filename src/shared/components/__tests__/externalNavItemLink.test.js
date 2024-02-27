import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import ExternalNavItemLink from 'src/shared/components/externalNavItemLink';

describe('ExternalNavItemLink', () => {
  describe('render', () => {
    it('should have correct props', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });
});

function createComponent() {
  return render(
    <ExternalNavItemLink className={'className'} disabled href="test-href">
      <div>
        <span>Hi</span>
      </div>
    </ExternalNavItemLink>
  );
}
