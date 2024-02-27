import {
  transformToNonChargeableAncillaryProducts,
  transformNonAncillaryToFormData
} from 'src/shared/transformers/nonChargeableAncillaryProductsTransformer';

context('transformToNonChargeableAncillaryProducts', () => {
  it('should map boolean fields when boolean fields are passed as true', () => {
    const specialAssistanceAllFields = {
      DEAF: true,
      BLIND: true,
      COGNITIVE_AND_DEVELOPMENTAL_SSR: true,
      ASSISTANCE_ANIMAL: true,
      PEANUT_DUST_ALLERGY: true,
      PORTABLE_OXYGEN_CONCENTRATOR: true
    };

    const expectedResults = [
      { ancillaryType: 'DEAF' },
      { ancillaryType: 'BLIND' },
      { ancillaryType: 'COGNITIVE_AND_DEVELOPMENTAL_SSR' },
      { ancillaryType: 'ASSISTANCE_ANIMAL' },
      { ancillaryType: 'PEANUT_DUST_ALLERGY' },
      { ancillaryType: 'PORTABLE_OXYGEN_CONCENTRATOR' }
    ];

    const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

    expect(results).to.deep.equal(expectedResults);
  });

  it('should not map fields when boolean fields are passed as false', () => {
    const specialAssistanceAllFields = {
      DEAF: false,
      BLIND: false,
      COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
      ASSISTANCE_ANIMAL: false,
      PEANUT_DUST_ALLERGY: false,
      PORTABLE_OXYGEN_CONCENTRATOR: false
    };

    const expectedResults = [];

    const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

    expect(results).to.deep.equal(expectedResults);
  });

  it('should not map fields when boolean fields are undefined', () => {
    const specialAssistanceAllFields = {};

    const expectedResults = [];

    const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

    expect(results).to.deep.equal(expectedResults);
  });

  context('WHEELCHAIR_ASSISTANCE', () => {
    it('should map WHEELCHAIR_ASSISTANCE field when AISLE_CHAIR is selected', () => {
      const specialAssistanceAllFields = { WHEELCHAIR_ASSISTANCE: 'AISLE_CHAIR' };
      const expectedResults = [{ ancillaryType: 'AISLE_CHAIR' }];

      const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

      expect(results).to.deep.equal(expectedResults);
    });

    it('should map WHEELCHAIR_ASSISTANCE field when AIRPORT_WHEELCHAIR is selected', () => {
      const specialAssistanceAllFields = { WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR' };
      const expectedResults = [{ ancillaryType: 'AIRPORT_WHEELCHAIR' }];

      const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

      expect(results).to.deep.equal(expectedResults);
    });

    it('should not map WHEELCHAIR_ASSISTANCE field when NONE is selected', () => {
      const specialAssistanceAllFields = { WHEELCHAIR_ASSISTANCE: 'NONE' };
      const expectedResults = [];

      const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

      expect(results).to.deep.equal(expectedResults);
    });
  });

  context('WHEELCHAIR_STOWAGE', () => {
    it('should map WHEELCHAIR_STOWAGE field when NONE is selected', () => {
      const specialAssistanceAllFields = { WHEELCHAIR_STOWAGE: 'NONE' };
      const expectedResults = [];

      const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

      expect(results).to.deep.equal(expectedResults);
    });

    it('should map WHEELCHAIR_STOWAGE field when MANUAL_WHEELCHAIR is selected', () => {
      const specialAssistanceAllFields = { WHEELCHAIR_STOWAGE: 'MANUAL_WHEELCHAIR' };
      const expectedResults = [{ ancillaryType: 'MANUAL_WHEELCHAIR' }];

      const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

      expect(results).to.deep.equal(expectedResults);
    });

    it('should map WHEELCHAIR_STOWAGE field when WET_CELL_BATTERY_WHEELCHAIR is selected', () => {
      const specialAssistanceAllFields = {
        WHEELCHAIR_STOWAGE: 'WET_CELL_BATTERY_WHEELCHAIR',
        WET_BATTERIES: '3'
      };

      const expectedResults = [
        {
          ancillaryType: 'WET_CELL_BATTERY_WHEELCHAIR',
          details: ['3']
        }
      ];

      const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

      expect(results).to.deep.equal(expectedResults);
    });

    it('should map WHEELCHAIR_STOWAGE field when DRY_CELL_BATTERY_WHEELCHAIR is selected', () => {
      const specialAssistanceAllFields = {
        WHEELCHAIR_STOWAGE: 'DRY_CELL_BATTERY_WHEELCHAIR',
        DRY_BATTERIES: '1'
      };

      const expectedResults = [
        {
          ancillaryType: 'DRY_CELL_BATTERY_WHEELCHAIR',
          details: ['1']
        }
      ];

      const results = transformToNonChargeableAncillaryProducts(specialAssistanceAllFields);

      expect(results).to.deep.equal(expectedResults);
    });
  });
});

context('transformNonAncillaryToFormData', () => {
  it('should convert nonChargeableAncillaryProducts with WET_CELL_BATTERY_WHEELCHAIR data to a formData object', () => {
    const nonChargeableAncillaryProducts = [
      { ancillaryType: 'DEAF' },
      { ancillaryType: 'BLIND' },
      { ancillaryType: 'COGNITIVE_AND_DEVELOPMENTAL_SSR' },
      { ancillaryType: 'ASSISTANCE_ANIMAL' },
      { ancillaryType: 'PEANUT_DUST_ALLERGY' },
      { ancillaryType: 'AIRPORT_WHEELCHAIR' },
      { ancillaryType: 'WET_CELL_BATTERY_WHEELCHAIR', details: ['1'] }
    ];

    const expectedResults = {
      DEAF: true,
      BLIND: true,
      COGNITIVE_AND_DEVELOPMENTAL_SSR: true,
      ASSISTANCE_ANIMAL: true,
      PEANUT_DUST_ALLERGY: true,
      PORTABLE_OXYGEN_CONCENTRATOR: false,
      WHEELCHAIR_ASSISTANCE: 'AIRPORT_WHEELCHAIR',
      WHEELCHAIR_STOWAGE: 'WET_CELL_BATTERY_WHEELCHAIR',
      WET_BATTERIES: '1',
      DRY_BATTERIES: null
    };

    const results = transformNonAncillaryToFormData(nonChargeableAncillaryProducts);

    expect(results).to.deep.equal(expectedResults);
  });

  it('should convert nonChargeableAncillaryProducts with DRY_CELL_BATTERY_WHEELCHAIR data to a formData object', () => {
    const nonChargeableAncillaryProducts = [{ ancillaryType: 'DRY_CELL_BATTERY_WHEELCHAIR', details: ['4'] }];

    const expectedResults = {
      DEAF: false,
      BLIND: false,
      COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
      ASSISTANCE_ANIMAL: false,
      PEANUT_DUST_ALLERGY: false,
      PORTABLE_OXYGEN_CONCENTRATOR: false,
      WHEELCHAIR_ASSISTANCE: 'NONE',
      WHEELCHAIR_STOWAGE: 'DRY_CELL_BATTERY_WHEELCHAIR',
      WET_BATTERIES: null,
      DRY_BATTERIES: '4'
    };

    const results = transformNonAncillaryToFormData(nonChargeableAncillaryProducts);

    expect(results).to.deep.equal(expectedResults);
  });

  it('should convert nonChargeableAncillaryProducts when wet batteries not provided to a formData object', () => {
    const nonChargeableAncillaryProducts = [{ ancillaryType: 'WET_CELL_BATTERY_WHEELCHAIR' }];

    const expectedResults = {
      DEAF: false,
      BLIND: false,
      COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
      ASSISTANCE_ANIMAL: false,
      PEANUT_DUST_ALLERGY: false,
      PORTABLE_OXYGEN_CONCENTRATOR: false,
      WHEELCHAIR_ASSISTANCE: 'NONE',
      WHEELCHAIR_STOWAGE: 'WET_CELL_BATTERY_WHEELCHAIR',
      WET_BATTERIES: null,
      DRY_BATTERIES: null
    };

    const results = transformNonAncillaryToFormData(nonChargeableAncillaryProducts);

    expect(results).to.deep.equal(expectedResults);
  });

  it('should convert nonChargeableAncillaryProducts when dry batteries not provided to a formData object', () => {
    const nonChargeableAncillaryProducts = [{ ancillaryType: 'DRY_CELL_BATTERY_WHEELCHAIR' }];

    const expectedResults = {
      DEAF: false,
      BLIND: false,
      COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
      ASSISTANCE_ANIMAL: false,
      PEANUT_DUST_ALLERGY: false,
      PORTABLE_OXYGEN_CONCENTRATOR: false,
      WHEELCHAIR_ASSISTANCE: 'NONE',
      WHEELCHAIR_STOWAGE: 'DRY_CELL_BATTERY_WHEELCHAIR',
      WET_BATTERIES: null,
      DRY_BATTERIES: null
    };

    const results = transformNonAncillaryToFormData(nonChargeableAncillaryProducts);

    expect(results).to.deep.equal(expectedResults);
  });
});
