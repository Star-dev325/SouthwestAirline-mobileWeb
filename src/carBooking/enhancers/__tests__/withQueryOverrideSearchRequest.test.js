import { render } from '@testing-library/react';
import React from 'react';
import withQueryOverrideSearchRequest from 'src/carBooking/enhancers/withQueryOverrideSearchRequest';
import * as CarVendorsBuilder from 'test/builders/model/carVendorsBuilder';

describe('carBooking withQueryOverrideSearchRequest', () => {
  it('should pass search request if url query has the search request', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      pickUpDate: '2022-12-10',
      pickUpLocation: 'DFW',
      pickUpTime: '00:00',
      returnDate: '2022-12-13',
      returnLocation: 'DAL',
      returnTime: '18:00'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.pickUpTime).toEqual('12:00AM');
    expect(selectedSearchRequest.dropOffTime).toEqual('6:00PM');
  });

  it('should include car booking promo query in search request', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      'carCode-0': 'promoCode1',
      'carCodeType-0': 'PROMOTIONAL_CODE',
      'carCodeVendor-0': 'AVIS',
      'carCode-1': 'promoCode2',
      'carCodeType-1': 'CORPORATE_RATE',
      'carCodeVendor-1': 'ZA'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.carCode1).toEqual('promoCode1');
    expect(selectedSearchRequest.carCodeType1).toEqual('PROMOTIONAL_CODE');
    expect(selectedSearchRequest.carCodeVendor1).toEqual('AVIS');
    expect(selectedSearchRequest.carCode2).toEqual('promoCode2');
  });

  it('carCodeType should be false if query has invalid car promo code type', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      'carCode-0': 'promoCode1',
      'carCode-1': 'promoCode2',
      'carCodeType-0': 'RATE_CODE',
      'carCodeType-1': 'CORPORATE_RATE',
      'carCodeVendor-0': 'AVIS',
      'carCodeVendor-1': 'ZA'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.carCodeType1).toEqual(null);
  });

  it('should include vendors in search request if single vendor is passed', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      vendors: 'AVIS'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.vendors).toEqual([
      {
        vendorId: 'AVIS'
      }
    ]);
  });

  it('should include vendors in search request if multiple vendors passed as string with comma separator', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      vendors: 'AVIS,DOLLAR'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.vendors).toEqual([
      {
        vendorId: 'AVIS'
      },
      { vendorId: 'DOLLAR' }
    ]);
  });

  it('should filter out invalid vendors in search request if passed any', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      vendors: 'AVIS,DOLLAR,INVALID_VENDOR'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.vendors).toEqual([
      {
        vendorId: 'AVIS'
      },
      { vendorId: 'DOLLAR' }
    ]);
  });

  it('should include vendors in search request if multiple vendors passed as array', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      vendors: ['AVIS', 'DOLLAR']
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.vendors).toEqual([
      {
        vendorId: 'AVIS'
      },
      { vendorId: 'DOLLAR' }
    ]);
  });

  it('should include vendors in search request if multiple vendors passed as array', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      vendors: [undefined, 'DOLLAR']
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.vendors).toEqual([{ vendorId: 'DOLLAR' }]);
  });

  it('should filter out invalid car booking promo query params in search request', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      'carCode-0': 'promoCode1',
      'carCodeType-0': 'promoCodeType1',
      'carCodeVendor-0': 'promoCodeVendor1',
      'carCode-1': 'promoCode2',
      'carCodeType-1': 'promoCodeType2',
      'carCodeVendor-1': 'promoCodeVendor2'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.carCode1).toEqual('promoCode1');
    expect(selectedSearchRequest.carCodeType1).toEqual(null);
    expect(selectedSearchRequest.carCodeVendor1).toEqual(undefined);
    expect(selectedSearchRequest.carCode2).toEqual('promoCode2');
  });

  it('the default format time should be 12:00AM', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(mockComponent, {
      pickUpDate: '2022-12-10',
      pickUpLocation: 'DFW',
      returnDate: '2022-12-13',
      returnLocation: 'DAL'
    });
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.pickUpTime).toEqual('12:00AM');
  });

  it('should not override the selectedSearchRequest if original search request from form is changed', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(
      mockComponent,
      {
        pickUpDate: '2022-12-10'
      },
      {
        pickUpDate: '2022-12-11'
      }
    );
    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest.pickUpDate).toEqual('2022-12-11');
  });

  it('should return an empty object if no valid query parameters are present', () => {
    const mockComponent = jest.fn().mockReturnValue(<div>Mock Component</div>);

    createComponent(
      mockComponent,
      {
        cleanFlow: true,
        clk: 'GNAVBKCAR'
      }
    );

    const { selectedSearchRequest } = mockComponent.mock.calls[0][0];

    expect(selectedSearchRequest).toEqual({});
  });

  const createComponent = (mockComponent, query = {}, selectedSearchRequest = {}) => {
    const WrappedComponent = withQueryOverrideSearchRequest(mockComponent);
    const carVendors = CarVendorsBuilder.build();

    return render(
      <WrappedComponent carVendors={carVendors} selectedSearchRequest={selectedSearchRequest} query={query} />
    );
  };
});
