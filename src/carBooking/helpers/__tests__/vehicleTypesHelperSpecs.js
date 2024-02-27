import * as VehicleTypesHelper from 'src/carBooking/helpers/vehicleTypesHelper';

describe('vehicleTypesHelper', () => {
  context('#labelToType', () => {
    it('should return the type for a given label', () => {
      expect(VehicleTypesHelper.labelToType('Full-size SUV')).to.equal('FULLSIZE_SUV');
    });
  });

  context('#typeToLabel', () => {
    it('should return the label for a given type need map', () => {
      expect(VehicleTypesHelper.typeToLabel('FULL_SIZE_SUV')).to.equal('Full-size SUV');
    });

    it('should return the label for a given type without map', () => {
      expect(VehicleTypesHelper.typeToLabel('FULLSIZE_SUV')).to.equal('Full-size SUV');
    });
  });

  context('#allLabels', () => {
    it('should return all labels', () => {
      const expected = [
        'Economy',
        'Compact',
        'Mid-size',
        'Full-size',
        'Premium',
        'Luxury',
        'Convertible',
        'Pick-up Truck',
        'Jeep/All Terrain',
        'Compact SUV',
        'Mid-size SUV',
        'Standard SUV',
        'Full-size SUV',
        'Minivan',
        'Premium SUV',
        'Std. Elite SUV',
        'Full-size Van'
      ];

      expect(VehicleTypesHelper.allLabels()).to.deep.equal(expected);
    });
  });

  context('#mapTypes', () => {
    it('should map vehicle type to expected one', () => {
      const type = 'VAN';

      expect(VehicleTypesHelper.mapType(type)).to.be.equal('FULLSIZE_VAN');
    });
  });
});
