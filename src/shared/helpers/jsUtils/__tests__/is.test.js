import {
  isEmpty,
  isFunction,
  isObject
} from 'src/shared/helpers/jsUtils';

describe('isFunction', () => {
  it('should return true if passed paramater is a function', () => {
    const handler = () => 'testing';

    const result = isFunction(handler);

    expect(result).toEqual(true);
  });

  it('should return false if passed paramater is not a function', () => {
    const result = isFunction('testing');

    expect(result).toEqual(false);
  });
});

describe('isEmpty', () => {
  it('should detect an empty array', () => {
    expect(isEmpty([])).toEqual(true);
  });

  it('should detect a non-empty array', () => {
    expect(isEmpty([1])).toEqual(false);
  });

  it('should detect an empty object', () => {
    expect(isEmpty({})).toEqual(true);
  });

  it('should detect an empty object', () => {
    expect(isEmpty({ test: 1 })).toEqual(false);
  });

  it('should detect an empty string', () => {
    expect(isEmpty('')).toEqual(true);
  });

  it('should detect a non-empty string', () => {
    expect(isEmpty('a')).toEqual(false);
  });

  it('should detect an empty set', () => {
    expect(isEmpty(new Set())).toEqual(true);
  });

  it('should detect a non-empty set', () => {
    expect(isEmpty(new Set([1]))).toEqual(false);
  });

  it('should identify a function as empty', () => {
    expect(isEmpty(() => {})).toEqual(true);
  });

  it('should identify a number as empty', () => {
    expect(isEmpty(1)).toEqual(true);
  });

  it('should identify undefined as empty', () => {
    expect(isEmpty(undefined)).toEqual(true);
  });

  it('should identify null as empty', () => {
    expect(isEmpty(null)).toEqual(true);
  });
});

describe('isObject', () => {
  it('should return true if passed parameter is an object', () => {
    expect(isObject({ test: 1 })).toEqual(true);
  });

  it('should return false if passed parameter is not an object', () => {
    expect(isObject('test')).toEqual(false);
  });

  it('should return false if passed parameter is not an object', () => {
    expect(isObject(1)).toEqual(false);
  });

  it('should return false if passed parameter is not an object', () => {
    expect(isObject(undefined)).toEqual(false);
  });

  it('should return false if passed parameter is not an object', () => {
    expect(isObject(null)).toEqual(false);
  });

  it('should return false if passed parameter is not an object', () => {
    expect(isObject(['test'])).toEqual(false);
  });
});