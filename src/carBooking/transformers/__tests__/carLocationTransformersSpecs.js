import CarLocationTransformers from 'src/carBooking/transformers/carLocationTransformers';

describe('CarLocationTransformers', () => {
  it('should transform the car locations api response to airport list', () => {
    const locationsResponse = [
      {
        airport: { code: 'ABR', airportName: 'Aberdeen, SD - ABR' },
        airportName: 'Aberdeen, SD - ABR',
        code: 'ABR',
        city: 'Aberdeen',
        state: 'SD'
      }
    ];

    expect(CarLocationTransformers.transformToAirportList(locationsResponse)).to.deep.equal([
      {
        airport: { code: 'ABR', airportName: 'Aberdeen, SD - ABR' },
        airportName: 'Aberdeen, SD - ABR',
        code: 'ABR',
        city: 'Aberdeen',
        state: 'SD',
        airportFullName: 'Aberdeen, SD - ABR'
      }
    ]);
  });
});
