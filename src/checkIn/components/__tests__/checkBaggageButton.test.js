jest.mock('@swa-ui/encryption', () => ({
  useHref: jest.fn().mockReturnValue({ href: 'mock_href' })
}));
jest.mock('src/shared/api/apiRoutes', () => ({
  environment: jest.fn().mockReturnValue('mockEnvironment')
}));
jest.mock('src/shared/helpers/browserObject', () => ({
  window: { open: jest.fn() }
}));

import { useHref } from '@swa-ui/encryption';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import CheckBaggageButton from 'src/checkIn/components/checkBaggageButton';
import BrowserObject from 'src/shared/helpers/browserObject';

const mockCheckInRequestBody = {
  firstName: 'mockFirstName',
  lastName: 'mockLastName',
  recordLocator: 'mockRecordLocator'
};
const mockComponentName = 'mockComponent';
const mockFeatureName = 'mockFeature';
const mockHref = 'mock_href';

describe('checkBaggageButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render check standard bags now button with labelText value', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should render check standard bags now button with padding-top', () => {
      const { container } = createComponent({ classNames: 'pt5' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('buttonClassName', () => {
    it('should render check standard bags now button with default buttonClassName', () => {
      const { container } = createComponent({ buttonClassName: undefined });

      expect(container).toMatchSnapshot();
    });

    it('should render check standard bags now button with provided buttonClassName', () => {
      const { container } = createComponent({ buttonClassName: 'test-button-className' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('icon', () => {
    it('should render button with icon if icon prop has been passed', () => {
      const { container } = createComponent({ icon: 'ic-external-link' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('aria label', () => {
    it('should render aria label if feature is trackCheckedBags', () => {
      const { container } = createComponent({ feature: 'trackCheckedBags' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('buttonSize', () => {
    it('should render check standard bags now button with default buttonSize', () => {
      const { container } = createComponent({ buttonSize: undefined });

      expect(container).toMatchSnapshot();
    });

    it('should render check standard bags now button with provided buttonSize', () => {
      const { container } = createComponent({ buttonSize: 'large' });

      expect(container).toMatchSnapshot();
    });
  });

  describe('useHref', () => {
    const { firstName, lastName, recordLocator } = mockCheckInRequestBody;
    const mockDataToEncrypt = {
      first_name: firstName,
      last_name: lastName,
      record_locator: recordLocator
    };

    it('should be called with correct data', () => {
      createComponent();

      expect(useHref).toHaveBeenCalledWith(mockDataToEncrypt, mockHref, mockComponentName, mockFeatureName);
    });

    it('should be called with default data', () => {
      const mockDefaultDataToEncrypt = {
        first_name: '',
        last_name: '',
        record_locator: ''
      };

      createComponent({ checkInRequest: undefined });

      expect(useHref).toHaveBeenCalledWith(mockDefaultDataToEncrypt, mockHref, mockComponentName, mockFeatureName);
    });

    it('should use default value when empty string is returned', () => {
      useHref.mockImplementationOnce(() => '');

      createComponent();

      expect(useHref).toHaveBeenCalledWith(mockDataToEncrypt, mockHref, mockComponentName, mockFeatureName);
    });
  });

  describe('button click', () => {
    it('should open using provided url', () => {
      createComponent();

      fireEvent.click(screen.getByText(/Check standard bags now/i));

      expect(BrowserObject.window.open).toHaveBeenCalledWith('mock_href', '_self');
    });

    it('should add click code to href if click code is passed as a prop', () => {
      const queryParams = {
        clk: 'CHECKIN'
      };

      createComponent({ queryParams: queryParams });

      fireEvent.click(screen.getByText(/Check standard bags now/i));

      expect(BrowserObject.window.open).toHaveBeenCalledWith('mock_href?clk=CHECKIN', '_self');
    });

    it('should not add clickCode if no value is passed in props', () => {
      createComponent({ clickCode: undefined });

      fireEvent.click(screen.getByText(/Check standard bags now/i));

      expect(BrowserObject.window.open).toHaveBeenCalledWith('mock_href', '_self');
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      buttonClassName: '',
      buttonSize: 'larger',
      checkedBagsData: {
        labelText: 'Check standard bags now',
        url: mockHref
      },
      checkInRequest: {
        body: {
          ...mockCheckInRequestBody
        }
      },
      classNames: '',
      component: mockComponentName,
      feature: mockFeatureName,
      queryParams: {}
    };

    return render(<CheckBaggageButton {...defaultProps} {...props} />);
  };
});
