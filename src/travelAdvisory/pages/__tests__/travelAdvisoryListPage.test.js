import React from 'react';
import { render } from '@testing-library/react';

import { TravelAdvisoryListPage } from 'src/travelAdvisory/pages/travelAdvisoryListPage';

describe('TravelAdvisoryListPage', () => {
  let getTravelAdvisoriesFnStub;
  let pushStub;

  beforeEach(() => {
    getTravelAdvisoriesFnStub = jest.fn().mockResolvedValue();
    pushStub = jest.fn();
  });

  it('should render 3 items with title when there are 3 advisories', () => {
    const { container } = createComponent({
      travelAdvisories: [
        {
          id: 'idnumber1',
          advisoryTitle: 'title1',
          advisoryInfo: 'info1'
        },
        {
          id: 'idnumber2',
          advisoryTitle: 'title2',
          advisoryInfo: 'info2'
        },
        {
          id: 'idnumber3',
          advisoryTitle: 'title3',
          advisoryInfo: 'info3'
        }
      ]
    });

    expect(container).toMatchSnapshot();
  });

  it('should render no items when there are no advisories', () => {
    const { container } = createComponent({ travelAdvisories: [] });
    const items = container.querySelectorAll('.travel-advisory-item--title');

    expect(items.length).toEqual(0);
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      getTravelAdvisoriesFn: getTravelAdvisoriesFnStub,
      push: pushStub
    };

    const travelAdvisoryProps = { ...defaultProps, ...props };

    return render(<TravelAdvisoryListPage { ...travelAdvisoryProps}  />);
  };
});
