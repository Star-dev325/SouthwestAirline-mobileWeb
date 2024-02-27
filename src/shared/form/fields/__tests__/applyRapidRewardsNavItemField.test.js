import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import ApplyRapidRewardsNavItemField from 'src/shared/form/fields/applyRapidRewardsNavItemField';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('ApplyRapidRewardsNavItemField', () => {
  it("should display 'Select (optional)' if there are no rapid rewards points being applied", () => {
    const { container } = createComponent({ rapidRewardsApplied: false });
    
    expect(container).toMatchSnapshot();
  });

  it("should display 'Points applied' if rapid rewards points are being applied", () => {
    const { container } = createComponent({ rapidRewardsApplied: true });
    
    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    name: "applyRapidRewards",
    onNavItemClick: () => {}
  };
  const finalProps = {
    ...defaultProps,
    ...props
  };
  
  const mockFormStore = createMockedFormStore();
  const MockedForm = createMockedForm(mockFormStore, {});

  return render(
    <MockedForm initialFormData={{}} onSubmit={() => {}}>
      <ApplyRapidRewardsNavItemField {...finalProps} />
    </MockedForm>
  );
};
