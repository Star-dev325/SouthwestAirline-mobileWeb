import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import HighlightedFeatures from 'src/shared/components/highlightedFeatures';
import { highlightedFeatures } from 'mocks/templates/productDefinitions';

describe('HighlightedFeatures', () => {
  describe('render', () => {
    it('should create a highlighted features component with two features', () => {
      const { container } = render(<HighlightedFeatures highlightedFeatures={highlightedFeatures} />);

      expect(container.querySelector('.highlighted-features')).not.toBeNull();
      expect(container.querySelectorAll('[data-qa="highlighted-feature"]')).toHaveLength(2);
      expect(container.querySelectorAll('[data-qa="highlighted-feature"]')[0]).toHaveTextContent(
        'First 2 Bags Fly Free®*'
      );
      expect(container.querySelectorAll('[data-qa="feature-icon"]')[0]).toHaveClass('feature-icon--suitcase');
      expect(container.querySelectorAll('[data-qa="highlighted-feature"]')[1]).toHaveTextContent('No Change Fees**');
      expect(container.querySelectorAll('[data-qa="feature-icon"]')[1]).toHaveClass('feature-icon--dollar-circle');
    });

    it('should still render the component but show no icons when icon is null or not an accepted icon type', () => {
      highlightedFeatures[0].icon = null;
      highlightedFeatures[1].icon = 'asdf';
      const { container } = render(<HighlightedFeatures highlightedFeatures={highlightedFeatures} />);

      expect(container.querySelector('.highlighted-features')).not.toBeNull();
      expect(container.querySelectorAll('[data-qa="highlighted-feature"]')).toHaveLength(2);
      expect(container.querySelectorAll('[data-qa="highlighted-feature"]')[0]).toHaveTextContent(
        'First 2 Bags Fly Free®*'
      );
      expect(container.querySelectorAll('[data-qa="highlighted-feature"]')[1]).toHaveTextContent('No Change Fees**');
      expect(container.querySelector('[data-qa="feature-icon"]')).toBeNull();
    });

    it('should not have any contents if array empty', () => {
      const { container } = render(<HighlightedFeatures highlightedFeatures={[]} />);

      expect(container.querySelector('.highlighted-features')).not.toBeNull();
      expect(container.querySelector('[data-qa="highlighted-feature"]')).toBeNull();
    });
  });
});
