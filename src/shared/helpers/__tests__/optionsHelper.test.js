import {
  getOptionsByMeta,
  getCountryOptions,
  getStatesOfUS,
  keyMirror,
  getOptionsByValueList,
  getNameSuffixOptions,
  getAssociatedAdultsOptions
} from 'src/shared/helpers/optionsHelper';

jest.mock('src/shared/constants/nameSuffixes', () => ({ nameSuffixes: ['SR'] }));

describe('optionsHelper', () => {
  describe('getOptionsByMeta', () => {
    it(`should convert meta object to option's label and value`, () => {
      const metaObj = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      };

      const result = getOptionsByMeta(metaObj);

      expect(result).toMatchObject([
        {
          label: 'value1',
          value: 'key1'
        },
        {
          label: 'value2',
          value: 'key2'
        },
        {
          label: 'value3',
          value: 'key3'
        }
      ]);
    });
  });

  describe('getCountryOptions', () => {
    it('should get option array for country', () => {
      const result = getCountryOptions();
      const firstItem = result[0];
      const secondItem = result[1];

      expect(firstItem).toMatchObject({
        label: 'United States of America - US',
        value: 'US'
      });
      expect(secondItem).toMatchObject({
        label: 'Afghanistan - AF',
        value: 'AF'
      });
    });
  });

  describe('getStatesOfUS', () => {
    it('should get option array for states of US', () => {
      const result = getStatesOfUS();
      const firstItem = result[0];
      const secondItem = result[1];

      expect(firstItem).toMatchObject({
        label: 'Alabama',
        value: 'AL'
      });
      expect(secondItem).toMatchObject({
        label: 'Alaska',
        value: 'AK'
      });
    });
  });

  describe('keyMirror', () => {
    it('should get object witch key and value all equal inputted key of the source object', () => {
      const sourceObject = {
        testKeyA: 'testValueA',
        testKeyB: 'testValueB'
      };

      expect(keyMirror(sourceObject)).toMatchObject({
        testKeyA: 'testKeyA',
        testKeyB: 'testKeyB'
      });
    });
  });

  describe('getOptionsByValueList', () => {
    it('should transform the value list to an object list and add a label property to the object', () => {
      const valueList = ['valueA', 'valueB'];

      const transformedObject = getOptionsByValueList(valueList);

      expect(transformedObject).toMatchObject([
        {
          label: 'valueA',
          value: 'valueA'
        },
        {
          label: 'valueB',
          value: 'valueB'
        }
      ]);
    });
  });

  describe('getNameSuffixOptions', () => {
    it('should suffix the name of the option', () => {
      const nameSuffixOptions = getNameSuffixOptions();
      const expectedObject = [
        { label: 'Suffix (optional)', value: '' },
        { label: 'SR', value: 'SR' }
      ];

      expect(nameSuffixOptions).toMatchObject(expectedObject);
    });
  });

  describe('getAssociatedAdultsOptions', () => {
    const adultInfo = [
      {
        passengerInfo: {
          firstName: 'First',
          middleName: '',
          lastName: 'Passenger',
          suffix: '',
          dateOfBirth: '1960-05-10'
        },
        passengerReference: 2
      },
      {
        passengerInfo: {
          firstName: 'Second',
          middleName: '',
          lastName: 'Passenger',
          suffix: '',
          dateOfBirth: '1960-05-10'
        },
        passengerReference: 3
      }
    ];

    const lapChildInfo = [
      {
        departureDate: '2022-05-10',
        passengerInfo: {
          firstName: 'Child',
          lastName: 'One'
        },
        passengerReference: 3,
        type: 'lapChild'
      }
    ];

    it('should default to passenger name if there is only one adult', () => {
      const adultInfo = [
        {
          passengerInfo: {
            firstName: 'First',
            middleName: '',
            lastName: 'Passenger',
            suffix: ''
          },
          passengerReference: 2
        }
      ];

      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [{ label: 'First Passenger', value: 2 }];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });

    it('should show middle name if passenger has middle name', () => {
      const adultInfo = [
        {
          passengerInfo: {
            firstName: 'First',
            middleName: 'Middle',
            lastName: 'Passenger',
            suffix: ''
          },
          passengerReference: 2
        }
      ];

      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [{ label: 'First Middle Passenger', value: 2 }];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });

    it('should show suffix if passenger has suffix', () => {
      const adultInfo = [
        {
          passengerInfo: {
            firstName: 'First',
            middleName: '',
            lastName: 'Passenger',
            suffix: 'IV'
          },
          passengerReference: 2
        }
      ];

      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [{ label: 'First Passenger IV', value: 2 }];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });

    it('should show suffix and middle name if passenger has suffix and middle name', () => {
      const adultInfo = [
        {
          passengerInfo: {
            firstName: 'First',
            middleName: 'Middle',
            lastName: 'Passenger',
            suffix: 'IV'
          },
          passengerReference: 2
        }
      ];

      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [{ label: 'First Middle Passenger IV', value: 2 }];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });

    it('should present dropdown option if there are two or more adults', () => {
      const lapChildInfo = [
        {
          departureDate: '2022-05-10',
          passengerInfo: {
            firstName: 'Child',
            lastName: 'One',
            associatedAdult: '2'
          },
          passengerReference: 4,
          type: 'lapChild'
        },
        {
          departureDate: '2022-05-10',
          passengerInfo: {
            firstName: 'Child',
            lastName: 'Two',
            associatedAdult: '3'
          },
          passengerReference: 5,
          type: 'lapChild'
        }
      ];
      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [
        { label: 'Associated Adult', value: '' },
        { label: 'First Passenger', value: 2, disabled: true },
        { label: 'Second Passenger', value: 3, disabled: true }
      ];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });

    describe('lap child(ren) are in booking', () => {
      const lapChildInfo = [
        {
          departureDate: '2022-05-10',
          passengerInfo: {
            firstName: 'Child',
            lastName: 'One',
            associatedAdult: '2'
          },
          passengerReference: 4,
          type: 'lapChild'
        },
        {
          departureDate: '2022-05-10',
          passengerInfo: {
            firstName: 'Child',
            lastName: 'Two',
            associatedAdult: '3'
          },
          passengerReference: 5,
          type: 'lapChild'
        }
      ];

      it('should not disable lap childs associated adult while in edit mode', () => {
        const formData = {
          associatedAdult: '2'
        };
        const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo, formData, true);
        const expectedObject = [
          { label: 'Associated Adult', value: '' },
          { label: 'First Passenger', value: 2, disabled: false },
          { label: 'Second Passenger', value: 3, disabled: true }
        ];

        expect(associatedAdultsOptions).toMatchObject(expectedObject);
      });

      it('should not disable already selected adult while selecting a new adult', () => {
        const formData = {
          firstName: 'Child',
          middleName: '',
          lastName: 'Two',
          suffix: '',
          associatedAdult: ''
        };
        const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo, formData, true);
        const expectedObject = [
          { label: 'Associated Adult', value: '' },
          { label: 'First Passenger', value: 2, disabled: true },
          { label: 'Second Passenger', value: 3, disabled: false }
        ];

        expect(associatedAdultsOptions).toMatchObject(expectedObject);
      });

      it('should not disable already selected adult while selecting a new adult', () => {
        const formData = {
          firstName: 'Child',
          middleName: '',
          lastName: 'Two',
          suffix: '',
          associatedAdult: '4'
        };
        const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo, formData, true);
        const expectedObject = [
          { label: 'Associated Adult', value: '' },
          { label: 'First Passenger', value: 2, disabled: true },
          { label: 'Second Passenger', value: 3, disabled: false }
        ];

        expect(associatedAdultsOptions).toMatchObject(expectedObject);
      });
    });

    it('should disable adult that is less than 12 years old', () => {
      const adultInfo = [
        {
          passengerInfo: {
            firstName: 'First',
            middleName: '',
            lastName: 'Passenger',
            suffix: '',
            dateOfBirth: '1960-05-10'
          },
          passengerReference: 2
        },
        {
          departureDate: '2022-05-10',
          passengerInfo: {
            firstName: 'Second',
            middleName: '',
            lastName: 'Passenger',
            suffix: '',
            dateOfBirth: '2017-05-10'
          },
          passengerReference: 3
        }
      ];
      const lapChildInfo = [
        {
          departureDate: '2022-05-10',
          passengerInfo: {
            firstName: 'Child',
            lastName: 'One',
            associatedAdult: '2'
          },
          passengerReference: 4,
          type: 'lapChild'
        }
      ];
      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [
        { label: 'Associated Adult', value: '' },
        { label: 'First Passenger', value: 2, disabled: true },
        { label: 'Second Passenger', value: 3, disabled: true }
      ];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });

    it('should remove adult name from dropdown if middle name contains extra seat value', () => {
      const adultInfo = [
        {
          passengerInfo: {
            firstName: 'First',
            middleName: '',
            lastName: 'Passenger'
          },
          passengerReference: 2
        },
        {
          passengerInfo: {
            firstName: 'Second',
            middleName: 'XS',
            lastName: 'Passenger'
          },
          passengerReference: 3
        },
        {
          passengerInfo: {
            firstName: 'Third',
            middleName: 'ixs',
            lastName: 'Passenger'
          },
          passengerReference: 4
        },
        {
          passengerInfo: {
            firstName: 'Fourth',
            middleName: 'DXS',
            lastName: 'Passenger'
          },
          passengerReference: 5
        },
        {
          passengerInfo: {
            firstName: 'Fifth',
            middleName: 'james ixs',
            lastName: 'Passenger'
          },
          passengerReference: 6
        },
        {
          passengerInfo: {
            firstName: 'Sixth',
            middleName: 'superlongxsmiddlename',
            lastName: 'Passenger'
          },
          passengerReference: 7
        }
      ];

      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [
        { label: 'Associated Adult', value: '' },
        { label: 'First Passenger', value: 2, disabled: false },
        { label: 'Sixth superlongxsmiddlename Passenger', value: 7, disabled: false }
      ];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });

    it('should not remove adult name from dropdown if middle name is returned as undefined or null', () => {
      const adultInfo = [
        {
          passengerInfo: {
            dateOfBirth: 1990,
            firstName: 'First',
            middleName: '',
            lastName: 'Passenger'
          },
          passengerReference: 2
        },
        {
          passengerInfo: {
            dateOfBirth: 1990,
            firstName: 'Second',
            middleName: undefined,
            lastName: 'Passenger'
          },
          passengerReference: 3
        }
      ];
      const associatedAdultsOptions = getAssociatedAdultsOptions(adultInfo, lapChildInfo);
      const expectedObject = [
        { label: 'Associated Adult', value: '' },
        { label: 'First Passenger', value: 2, disabled: false },
        { label: 'Second Passenger', value: 3, disabled: false }
      ];

      expect(associatedAdultsOptions).toMatchObject(expectedObject);
    });
  });
});
