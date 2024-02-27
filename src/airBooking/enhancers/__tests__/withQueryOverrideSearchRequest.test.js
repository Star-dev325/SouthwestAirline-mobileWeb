jest.mock('src/shared/helpers/urlHelper', () => ({
  isOnOldRoute: jest.fn().mockReturnValue(true)
}));

import React from 'react';
import { render } from '@testing-library/react';
import withQueryOverrideSearchRequest from 'src/airBooking/enhancers/withQueryOverrideSearchRequest';

describe('withQueryOverrideSearchRequest', () => {
  it('should pass search request if url query has the search request', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(
      mockComponent,
      {
        fromCity: 'CAK',
        departDate: '08/23/2016',
        returnDate: '08/25/2016',
        tripType: 'RT'
      },
      {
        destination: 'ATL'
      }
    );
    const { searchRequest } = mockComponent.mock.calls[0][0];

    expect(searchRequest.origin).toEqual('CAK');
    expect(searchRequest.destination).toEqual('ATL');
  });

  it('should not override the searchRequest if original search request from form is changed', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);
   
    createComponent(
      mockComponent,
      {
        fromCity: 'CAK',
        toCity: 'ATL',
        departDate: '08/23/2016',
        returnDate: '08/25/2016',
        tripType: 'RT'
      },
      {
        origin: 'DAL',
        destination: 'MDW'
      }
    );
    const { searchRequest } = mockComponent.mock.calls[0][0];

    expect(searchRequest.origin).toEqual('DAL');
    expect(searchRequest.destination).toEqual('MDW');
  });

  const createComponent = (mockComponent, query = {}, searchRequest = {}) => {
    const WrappedComponent = withQueryOverrideSearchRequest(mockComponent);

    return render(<WrappedComponent query={query} searchRequest={searchRequest} />);
  };
});
