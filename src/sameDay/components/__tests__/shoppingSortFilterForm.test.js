import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ShoppingSortFilterForm from 'src/sameDay/components/shoppingSortFilterForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('SameDayRefundMethod', () => {
  describe('when rendering', () => {
    it('should show shopping sort/filter form', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });
  });
  
  const createComponent = (props = {}) => (
    render(
      <Provider store={createMockedFormStore()}>
        <ShoppingSortFilterForm {...props} />
      </Provider>
    )
  );
});