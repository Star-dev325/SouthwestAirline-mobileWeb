jest.mock('branch-sdk');
jest.mock('src/shared/enhancers/withConnectedReactRouter', () => jest.fn((comp) => comp));

// eslint-disable-next-line
import branch from 'branch-sdk';
import BranchRedirectPage from 'src/branch/pages/branchRedirectPage';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const mockDataParsed = {
  '^destination': 'view_reservation',
  '^record_locator': 'U3FITG',
  '^first_name': 'Ron',
  '^last_name': 'Biggs'
};
const mockData = jest.fn((callback) => {
  callback(null, {
    data_parsed: { ...mockDataParsed }
  });
});

describe('BranchRedirectPage', () => {
  beforeAll(() => {
    branch.data = mockData;

    jest.clearAllMocks();
  });

  const noop = () => {};

  it('should redirect to view reservation detail page when get data from branch', () => {
    const replaceStub = jest.fn(noop);

    render(<BranchRedirectPage replace={replaceStub} />);

    expect(replaceStub).toBeCalledWith('/view-reservation/trip-details/U3FITG', null, null, {
      firstName: 'Ron',
      lastName: 'Biggs'
    });
  });

  it('should redirect to home page when destination do not match', () => {
    const replaceStub = jest.fn(noop);

    changeBranchDestinationOnce('NOT_VIEW');

    render(<BranchRedirectPage replace={replaceStub} />);

    expect(replaceStub).toBeCalledWith('/');
  });

  const changeBranchDestinationOnce = (destinationValue) => {
    mockData.mockImplementationOnce((callback) => callback(null, {
      data_parsed: {
        ...mockDataParsed,
        '^destination': destinationValue
      }
    }));
  };
});
