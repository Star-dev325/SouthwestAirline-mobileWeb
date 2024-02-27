import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { TravelAdvisoryDetailsPage } from 'src/travelAdvisory/pages/travelAdvisoryDetailsPage';

describe('TravelAdvisoryDetailsPage', () => {
  let getTravelAdvisoriesFnStub;
  let pushStub;

  beforeEach(() => {
    getTravelAdvisoriesFnStub = jest.fn().mockResolvedValue();
    pushStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render travelAdvisory', () => {
    const { container } = createComponent();
    const travelAdvisoryDetail = container.querySelector('.travel-advisory-detail');

    expect(travelAdvisoryDetail).not.toBeNull();
  });

  it('should render route items', () => {
    const { container } = createComponent();
 
    expect(container).toMatchSnapshot();
  });

  it('should transition to flight status when flightStatus be clicked', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelectorAll('div.travel-advisory-detail--route-item')[0]);
    
    expect(pushStub).toHaveBeenCalledWith('/flight-status');
  });

  it('should transition to my trips when flightStatus be clicked', () => {
    const { container } = createComponent();

    fireEvent.click(container.querySelectorAll('div.travel-advisory-detail--route-item')[1]);

    expect(pushStub).toHaveBeenCalledWith('/my-account/upcoming-trips');
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      params: {
        number: '0'
      },
      getTravelAdvisoriesFn: getTravelAdvisoriesFnStub,
      travelAdvisories: [
        {
          id: 'idnumber',
          advisoryTitle: 'title1',
          advisoryInfo: 'info'
        }
      ],
      push: pushStub
    };

    const travelAdvisoryProps = { ...defaultProps, ...props };

    return render(<TravelAdvisoryDetailsPage {...travelAdvisoryProps} />);
  };
});
