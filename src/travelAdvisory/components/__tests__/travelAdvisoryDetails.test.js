import React from 'react';
import { render } from '@testing-library/react';
import TravelAdvisoryDetails from 'src/travelAdvisory/components/travelAdvisoryDetails';

describe('TravelAdvisoryDetails', () => {
  it('should render item title & info', () => {
    const mockTravelAdvisory = {
      id: 'idnumber',
      advisoryTitle: 'title1',
      advisoryInfo: 'info'
    };
    const { container } = render(<TravelAdvisoryDetails travelAdvisory={mockTravelAdvisory} />);

    expect(container).toMatchSnapshot();
  });

  it('should not render stations when there is no stationInfo', () => {
    const mockTravelAdvisory = {
      id: 'idnumber',
      advisoryTitle: 'title1',
      advisoryInfo: 'info'
    };
    const { container } = render(<TravelAdvisoryDetails travelAdvisory={mockTravelAdvisory} />);
    const stations = container.querySelectorAll('.travel-advisory-detail--station-title');

    expect(stations.length).toEqual(0); 
  });

  it('should render stations info when there are 2 stationInfos', () => {
    const mockTravelAdvisory = {
      id: 'idnumber',
      advisoryTitle: 'title1',
      advisoryInfo: 'info',
      stationInfo: [
        {
          station: 'station1',
          stationDetails: 'stationDetails1'
        },
        {
          station: 'station2',
          stationDetails: 'stationDetails2'
        }
      ]
    };
    const { container } = render(<TravelAdvisoryDetails travelAdvisory={mockTravelAdvisory} />);
    const stationTitles = container.querySelectorAll('.travel-advisory-detail--station-title');

    expect(stationTitles[0].textContent).toEqual('station1');
    expect(stationTitles[1].textContent).toEqual('station2');
  });
});
