import React from 'react';
import { FeatureTogglePage } from 'src/shared/featureToggle/featureTogglePage';
import { fireEvent, render } from '@testing-library/react';

describe('FeatureTogglePage', () => {
  const checkboxQuery = '.checkbox-button_checked';
  const currentBuildTime = process.env.BUILD_TIME;
  const mockBuildTime = 'Tue, 21 Feb 2023 22:00:00 GMT';
  const updateToggleFnStub = jest.fn();

  beforeEach(() => {
    process.env.BUILD_TIME = mockBuildTime;
  });

  afterEach(() => {
    process.env.BUILD_TIME = currentBuildTime;
    jest.clearAllMocks();
  });

  const createComponent = () => {
    const props = {
      toggles: { ToggleOne: true },
      updateToggleFn: updateToggleFnStub
    };

    return render(<FeatureTogglePage {...props} />);
  };

  describe('when initializing', () => {
    it('should render checkBoxButton with default state', () => {
      const { container } = createComponent();

      expect(container.querySelectorAll(checkboxQuery).length).toEqual(1);
    });

    it('should render jenkins build time', () => {
      const { getByText } = createComponent();

      expect(getByText(mockBuildTime)).not.toBeNull();
    });
  });

  describe('when clicking checkbox', () => {
    it('should call updateToggle action', () => {
      const { container } = createComponent();
      const checkBoxButton = container.querySelector(checkboxQuery);

      fireEvent.click(checkBoxButton);

      expect(updateToggleFnStub).toHaveBeenCalledWith('ToggleOne', false);
    });
  });
});
