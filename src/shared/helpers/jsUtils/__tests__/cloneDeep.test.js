import { cloneDeep } from 'src/shared/helpers/jsUtils';

describe('cloneDeep', () => {
  const testNonObject = 'test';

  const testObject = {
    layer1: {
      data1: '1',
      layer2: {
        data2: '2',
        array: ['data3', 'data4']
      },
      date: new Date(),
      regExp: /test/gi,
      set: new Set(['data5', 'data6']),
      map: new Map([
        ['data7', '7'],
        ['data8', '8']
      ])
    }
  };

  const testCircularRefObject = { prop: {} };

  const testArray = [{ data1: 1 }, { data2: 2 }];

  const testFn = function () {
    console.log('howdy, world!');
  };

  const testDate = new Date();

  const testRegExp = /test/gi;

  const testSet = new Set();

  testSet.add('data1');

  testSet.add('data2');

  const testMap = new Map();

  testMap.set('key1', 'data1');

  testMap.set('key2', 'data2');

  it('should return the passed in value when a null value is passed', () => {
    const clonedNullValue = cloneDeep(null);

    expect(clonedNullValue).toEqual(null);
  });

  it('should return the passed in value when a non-object is passed', () => {
    const clonedNonObject = cloneDeep(testNonObject);

    expect(clonedNonObject).toEqual(testNonObject);
  });

  it('should prevent infinite loops', () => {
    testCircularRefObject.prop.circularRef = testCircularRefObject;

    const clonedCircularRefObject = cloneDeep(testCircularRefObject);

    expect(clonedCircularRefObject).toEqual(testCircularRefObject);
  });

  it('should clone a nested object', () => {
    const clonedObject = cloneDeep(testObject);

    expect(clonedObject).toEqual(testObject);
    expect(clonedObject).not.toBe(testObject);
  });

  it('should clone a nested array', () => {
    const clonedArray = cloneDeep(testArray);

    expect(clonedArray).toEqual(testArray);
    expect(clonedArray).not.toBe(testArray);
  });

  it('should return an empty object when a function is passed in', () => {
    const clonedStringFn = cloneDeep(testFn);

    expect(clonedStringFn).toEqual({});
  });

  it('should clone a date', () => {
    const clonedDate = cloneDeep(testDate);

    expect(clonedDate.getDate()).toEqual(testDate.getDate());
    expect(clonedDate).toEqual(testDate);
    expect(clonedDate).not.toBe(testDate);
  });

  it('should clone a regular expression', () => {
    const clonedRegEx = cloneDeep(testRegExp);

    expect(clonedRegEx.flags).toEqual(testRegExp.flags);
    expect(clonedRegEx).toEqual(testRegExp);
    expect(clonedRegEx).not.toBe(testRegExp);
  });

  it('should clone a set', () => {
    const clonedSet = cloneDeep(testSet);

    expect(clonedSet).toEqual(testSet);
    expect(clonedSet).not.toBe(testSet);
  });

  it('should clone a map', () => {
    const clonedMap = cloneDeep(testMap);

    expect(clonedMap).toEqual(testMap);
    expect(clonedMap).not.toBe(testMap);
  });
});
